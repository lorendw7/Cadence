# Local data model

Updated: 2026-11-10. Status: local-core schema proposal, not implemented. It supports the local-first university-wide direction in [ADR-002](adr/002-university-wide-product.md); it does not assume a hosted account database or cloud synchronization. Implement migrations alongside the features in [ROADMAP.md](ROADMAP.md). Conditional university-source metadata is described below as requirements, not tables to create now.

## Tables

All entities use stable local IDs. Store dates as ISO calendar dates, times as validated local times, and timezone identifiers explicitly. Audit timestamps describe edits, not the meaning of scheduled times.

| Table | Main fields and constraints |
|-------|-----------------------------|
| semesters | id, name, week_one_monday, end_date, timezone; anchor must be Monday, end must not precede anchor |
| periods | id, semester_id, ordinal, label, start_time, end_time; unique ordinal per semester, positive same-day duration, no overlapping periods |
| courses | id, semester_id, name, teacher, room, color, private_notes, archived |
| course_rules | id, course_id, weekday, time_mode, start_period_id/end_period_id OR start_time/end_time; exactly one mode, same-semester period references |
| course_rule_weeks | rule_id, week_number; composite primary key; week >= 1 and within semester |
| course_exceptions | id, rule_id, original_date, action, replacement_start/end, replacement_timezone, room_override, teacher_override; unique rule_id + original_date |
| personal_plans | id, title, location, notes, color, kind, optional course_id, time_kind, date/time interval, timezone, optional repeat configuration |
| personal_repeat_days | plan_id, weekday; composite primary key, used only for bounded weekly repetition |
| personal_exceptions | id, plan_id, original_date, action, overridden interval/location; unique plan_id + original_date |
| tasks | id, title, optional course_id, notes, due_kind, optional due_date/time/timezone, completed_at |
| import_batches | export_id, format_version, source_semester_id, destination_semester_id, imported_at |
| import_items | export_id, source_entity_type, source_entity_id, local_entity_id; unique source identity within the export |
| edit_drafts | id, target_type/id, base_revision, draft_payload, draft_version, saved_at; excluded from formal schedule projections |
| reminder_preferences | target_type/id, enabled, lead_minutes, optional date-only reminder clock, privacy mode |
| reminder_deliveries | stable occurrence/reminder identity, record_revision, trigger_at, dispatch_state; reconcile on startup |
| settings | key, versioned value; locale, theme, display timezone, selected semester |
| local_state | singleton row with monotonic data_generation; local operational metadata, not imported from backups |

Mutable roots (`semesters`, `courses`, `personal_plans`, `tasks`) also carry a positive integer `revision`. Child writes increment their owning root in the same transaction: periods belong to a semester; rules/weeks/exceptions belong to a course; personal exceptions/repeat days belong to a plan. Course edit previews include the semester revision as a dependency. Revisions are local edit guards, not sync metadata.

`edit_drafts` additionally carries an increasing `edit_sequence` and expected dependency revisions. `draft_version` versions its payload schema, not edit order. Commands serialize writes per editor session; closing or promoting a draft drains queued saves before removing it. See [APPLICATION.md](APPLICATION.md).

Drafts and notification metadata are local only. Drafts may be incomplete; validate before promotion to formal records in one transaction. Full backups include recoverable drafts and reminder preferences, but OS handles/delivery state are rebuilt on restore, not blindly replayed. Timetable exports exclude drafts, notification settings and task statistics.

The local-core schema contains no account/session tables, remote cursors or synchronization outbox. Do not add speculative remote fields during the current lessons. Passwords and session secrets must never be stored in the ordinary schedule database or serialized into either export format. If an approved university protocol later needs persistent credentials on desktop, keep them behind platform secure storage with an explicit deletion policy. Browser storage is not an equivalent credential vault; a web-session design needs a separate security review.

## Storage boundaries and web candidate

The tables above describe logical data implemented initially through desktop SQLite. A web application is a candidate, with no current runner or persistence adapter. IndexedDB-backed storage may be evaluated, but a browser does not supply the same filesystem, writer locks, durability or backup behavior as desktop SQLite. Preserve invariants and transaction outcomes through an explicit adapter contract; do not promise that an ordinary SQLite database file can be shared with the browser.

Test quota/transaction failures, cleared or evicted data, private-browsing behavior, concurrent tabs, migrations and recovery from interruption. A successful write does not establish permanent browser retention. Explain these limits and provide explicit portable exports before treating browser storage as the user's only copy. Desktop local storage likewise does not by itself imply encryption or protection against another process with access to the user's files.

Keep privacy categories separate: shareable instructional fields, private plans/tasks/notes, private import provenance, and authentication secrets. Backups of the first three remain private user files; school secrets never enter them. If a server is later selected, the logical schema additionally needs enforced ownership and object-level authorization for all student data, explicit retention/deletion and controlled recovery. These server tables are not part of the current schema proposal. See [SECURITY.md](SECURITY.md).

## Future university-source provenance

No school API or authorization is assumed. Design a source-specific migration only after the approved contract and representative timetable samples are available; see [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). The existing `import_batches`/`import_items` keys describe Cadence file import and must not be reinterpreted silently as university account or course identifiers.

An authorized read adapter will need minimal non-secret metadata for the source and student context, the academic-period scope, stable source record identity, its local-record mapping, the last accepted source baseline and the last successful check. Keep the baseline separate from locally edited values so a refresh can explain changes without overwriting private notes or accepted local overrides. Do not overload a local root `revision` with the source's version; the two have different meanings.

Whether and how the source identifies a student and provides completeness/version information must be established before enabling repeated updates. Do not invent globally stable course IDs, assume a missing row is a deletion, or store a complete raw portal response for convenience. Distinguish a complete empty source snapshot from a partial response or access failure. Unknown identity or scope requires review instead of destructive reconciliation.

Timetable-sharing files exclude school account identifiers, connection metadata and source-access material. A future versioned private backup may include only the minimum non-secret provenance needed to preserve local records; disclose that personal data in the backup preview. Authentication material is always excluded. Restoring provenance cannot restore a connection: require reauthorization and a verified matching student context before using it for further reads. Incompatible or unverifiable bindings leave the restored timetable usable as local data.

Campus/faculty/academic-period presets need source, version and applicability metadata when implemented. The schema must not force every Kyushu student into one timetable or period table. Validate whether the existing semester/rule representation covers the intended pilot groups before adding fields or claiming university-wide academic coverage.

## Important invariants

- A course may have multiple rules. Explicit week membership represents all/odd/even/custom week choices without relying on calendar week numbering.
- Course time intervals resolve from periods or explicit times. Period IDs belong to the same semester as the course. Deleting referenced periods requires resolving dependent rules first.
- Exception original_date must identify an occurrence of the rule. A moved instance retains that original identity even when the target date is outside the original week or term. Surface such moves in the preview.
- Personal timed plans require end > start; all-day plans require exclusive end_date > start_date. One-off plans have no recurrence fields. Weekly plans require positive interval_weeks, selected weekdays and an inclusive repeat_until date.
- Timed repeated plans preserve local start/end clock times and the end-day offset for overnight plans. Expand each occurrence using its timezone rather than adding fixed UTC seconds.
- Cancellation has no replacement interval. Movement requires a valid replacement interval. A room/location-only override retains the original time.
- Exams use personal_plans with kind=exam and optional course_id; they are not duplicated in tasks.
- A task's due_kind is none/date/datetime and determines which fields are valid. Completion does not delete the task.
- Foreign keys and uniqueness constraints are enforced by SQLite. Cross-row and recurrence rules are checked by the domain layer inside the same transaction.
- Archiving a course hides it from active course lists without deleting history. Hard deletion previews its rules/exceptions and offers explicit handling of linked tasks/plans; surviving linked items become unlinked rather than being silently deleted.

## Indexes and transactions

Index rules by course, courses/periods by semester, exception original identity and moved dates, personal plans by time/date range, tasks by completion/deadline and import provenance by source identity. Profile actual bounded-week queries before adding more indexes.

Create/edit a course and its rules/weeks in one transaction. Importing a timetable, changing period mappings and resolving orphaned exceptions must each be atomic. Use a tested database backup/snapshot mechanism rather than copying only a SQLite main file while its WAL is active.

Compare expected revisions and preview generation inside the write transaction, then increment affected roots and `local_state.data_generation` once per formal-data commit. Never increment it for draft-only saves or notification dispatch bookkeeping. Schedule query adapters read all related tables from one consistent snapshot, then publish invalidation after commit. File dialogs and OS effects cannot participate in SQLite transactions.

## Timetable format

`*.cadence-timetable.json` has an envelope with `format: "cadence-timetable"`, integer `version`, `export_id`, `exported_at`, semester metadata, periods, selected courses/rules/weeks and explicitly selected exceptions.

The export schema allowlists instructional fields: course name, teacher, room, color and schedule. It excludes course private_notes, personal_plans, tasks, completed states, settings and any university account/connection metadata. The preview must match the exact serialized content.

New local IDs are allocated at import and references remapped consistently. Duplicate import detection uses export/source identities, never only course titles. A modified export with a new export_id is a new candidate, not an automatic overwrite. Users resolve likely duplicates in preview.

When importing into a new semester with a different anchor, remap occurrence dates by teaching-week/day offsets and move targets by their relative date offsets; show all changes. Existing-semester imports require explicit period mapping and validation of week membership.

## Full backup format

`*.cadence-backup.json` uses a different `format` value, its own integer schema version and a logical snapshot of user planning data including supported non-secret provenance. Keep stable IDs for a full restore. Session secrets and OS operational handles are excluded. This file contains private data and is never offered by the timetable-sharing shortcut.

Check version, references, duplicate IDs, sizes, date constraints and recurrence limits before a restore. Reject unknown future versions rather than guessing. Back up the current database first, then restore atomically. On failure the original state remains usable.

Restoration requires exclusive application maintenance after pending writes and drafts are drained. Preserve logical IDs and entity revisions from the backup, but advance the current local generation and replace the runtime generation so pre-restore requests cannot apply. Rebuild OS delivery state from saved preferences. One writer process owns the data directory; a second instance cannot migrate, restore or dispatch reminders concurrently. Startup and failure ordering are specified in [APPLICATION.md](APPLICATION.md).

## Migration policy

Version every schema change; test migration from the previous supported version with representative course exceptions, overnight plans, tasks and imports. Keep user data outside install/build directories. No application upgrade or uninstall behavior may be assumed to erase or migrate data without explicit implementation.
