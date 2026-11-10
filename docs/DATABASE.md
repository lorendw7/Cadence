# Local data model

[ADR-007](adr/007-general-purpose-local-planner.md) puts independent tasks and personal plans first. Temporary use has no business-data persistence, drafts or automatic backups. Local saving requires an explicit choice. Courses, external-source metadata and sync are later optional migrations. Saving choice and clear-generation metadata are operational settings, not imported records. Add no speculative tables during current lessons.

Updated: 2026-11-11. Status: schema proposal, not implemented. The local core has no account, school or semester dependency. Implement migrations with the selected features in [ROADMAP.md](ROADMAP.md). The optional course/source design below is retained as reference, not required tables for a general planner.

## Core tables and later extensions

All entities use stable local IDs. Store dates as ISO calendar dates, times as validated local times, and timezone identifiers explicitly. Audit timestamps describe edits, not the meaning of scheduled times.

These tables belong to an explicitly selected local session. Temporary mode neither opens them nor creates an empty on-disk substitute. Keep the minimal retention choice and interrupted-cleanup state readable without opening the private business database. They are operational metadata, not portable `settings` records; restoring a backup cannot enable saving or cancel pending cleanup. See [session transitions](APPLICATION.md#retention-mode-and-session-transitions).

| Table | Main fields and constraints |
|-------|-----------------------------|
| tasks | id, title, notes, due_kind, optional due_date/time/timezone, completed_at |
| personal_plans | id, title, location, notes, color, kind, time_kind, date/time interval, timezone, optional repeat configuration |
| personal_repeat_days | plan_id, weekday; composite primary key, used only for bounded weekly repetition |
| personal_exceptions | id, plan_id, original_date, action, overridden interval/location; unique plan_id + original_date |
| edit_drafts | id, target_type/id, base_revision, draft_payload, draft_version, saved_at; excluded from formal schedule projections |
| settings | key, versioned value; locale, theme and display timezone |
| local_state | singleton with data_generation, storage identity and clear generation; local operational metadata, not imported from backups |

Start with only task fields needed by the first saved lesson. Add deadlines, plans, repeats, exceptions and drafts with their behavior. A nullable course field must not force course tables into the first task migration.

| Optional feature | Later tables or fields |
|------------------|------------------------|
| Course management | `semesters`: id, name, week_one_monday, end_date, timezone; Monday anchor and nonnegative date range |
| Course periods | `periods`: id, semester_id, ordinal, label, start_time, end_time; unique ordinal, positive same-day duration, no overlaps |
| Courses | `courses`: id, semester_id, name, teacher, room, color, private_notes, archived |
| Course rules | `course_rules`: id, course_id, weekday, exactly one of period references or explicit times, optional room/teacher override; periods belong to the course's semester |
| Teaching weeks | `course_rule_weeks`: rule_id, week_number; composite primary key, within semester bounds |
| Class exceptions | `course_exceptions`: id, rule_id, original_date, action, replacement_start/end/timezone, room/teacher override; unique rule plus original date |
| Course links | Optional `course_id` on tasks/plans and selected semester preference, added with the course schema; independent records remain valid |
| Timetable import history | `import_batches`: export_id, format_version, source/destination semester, imported_at; `import_items`: export_id, source type/id, local id with a unique source identity |
| Native reminders | `reminder_preferences`: target, enabled, lead time, date-only clock, privacy mode; `reminder_deliveries`: stable identity, revision, trigger time and dispatch state |

Mutable roots (`semesters`, `courses`, `personal_plans`, `tasks`) also carry a positive integer `revision`. Child writes increment their owning root in the same transaction: periods belong to a semester; rules/weeks/exceptions belong to a course; personal exceptions/repeat days belong to a plan. Course edit previews include the semester revision as a dependency. Revisions are local edit guards, not sync metadata.

`edit_drafts` additionally carries an increasing `edit_sequence` and expected dependency revisions. `draft_version` versions its payload schema, not edit order. Commands serialize writes per editor session; closing or promoting a draft drains queued saves before removing it. See [APPLICATION.md](APPLICATION.md).

Drafts and notification metadata are local only. Drafts may be incomplete; validate before promotion to formal records in one transaction. Full backups in local mode include permitted recoverable drafts and reminder preferences, but OS handles/delivery state are rebuilt on restore, not blindly replayed. Timetable exports exclude drafts, notification settings and task statistics. School data without retention/export permission is excluded from drafts and every backup path, even when personal records are saved locally.

The local-core schema contains no account/session tables, remote cursors or synchronization outbox. Do not add speculative remote fields during the current lessons. Passwords and session secrets must never be stored in the ordinary schedule database or serialized into either export format. If an approved university protocol later needs persistent credentials on desktop, keep them behind platform secure storage with an explicit deletion policy. Browser storage is not an equivalent credential vault; a web-session design needs a separate security review.

## Storage boundaries and optional Web snapshots

The tables above are a future desktop SQLite proposal, not current code. Web is an optional extension with no implemented planner or adapter. Its first candidate uses memory until explicit saving and an evaluated IndexedDB adapter for a small versioned snapshot, with JSON limited to 1 MiB UTF-8 and 2,000 combined schedule/task records. Previewed import replaces the snapshot; this private format is not automatically compatible with timetable-sharing or desktop backups. A browser does not supply desktop file, writer-lock, durability or backup semantics. Preserve invariants through an explicit adapter contract; do not share a live desktop database file with the browser.

Test quota/transaction failures, cleared or evicted data, private-browsing behavior, concurrent tabs, migrations and recovery from interruption. A successful write does not establish permanent browser retention. Explain these limits and provide explicit portable exports before treating browser storage as the user's only copy. Desktop local storage likewise does not by itself imply encryption or protection against another process with access to the user's files.

Keep privacy categories separate: shareable instructional fields, private plans/tasks/notes, private import provenance, and authentication secrets. Backups of the first three remain private user files; school secrets never enter them. If a server is later selected, the logical schema additionally needs enforced ownership and object-level authorization for all user data, explicit retention/deletion and controlled recovery. These server tables are not part of the current schema proposal. See [SECURITY.md](SECURITY.md).

## Future university-source provenance

The conditional cloud-sync schema is specified separately in [SYNC.md](SYNC.md): internal users, external identity bindings, owned workspaces, same-workspace references, server versions, operation receipts, change logs and tombstones. Client outbox/baselines/cursors are a later migration, not new fields for the current lesson. Cloud consent and permitted school-data rehosting are distinct from local retention, and local revisions must not be reused as server versions.

No school API or authorization is assumed. Design a source-specific migration only after the approved contract and representative timetable samples are available; see [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). The existing `import_batches`/`import_items` keys describe Cadence file import and must not be reinterpreted silently as university account or course identifiers.

An authorized read adapter will need minimal non-secret metadata for the source and student context, the academic-period scope, stable source record identity, its local-record mapping, the last accepted source baseline and the last successful check. Keep the baseline separate from locally edited values so a refresh can explain changes without overwriting private notes or accepted local overrides. Do not overload a local root `revision` with the source's version; the two have different meanings.

Whether and how the source identifies a student and provides completeness/version information must be established before enabling repeated updates. Do not invent globally stable course IDs, assume a missing row is a deletion, or store a complete raw portal response for convenience. Distinguish a complete empty source snapshot from a partial response or access failure. Unknown identity or scope requires review instead of destructive reconciliation.

Timetable-sharing files exclude school account identifiers, connection metadata and source-access material. A future versioned private backup may include only the minimum non-secret provenance needed to preserve local records; disclose that personal data in the backup preview. Authentication material is always excluded. Restoring provenance cannot restore a connection: require reauthorization and a verified matching student context before using it for further reads. Incompatible or unverifiable bindings leave the restored timetable usable as local data.

Campus/faculty/academic-period presets need source, version and applicability metadata when implemented. The schema must not force every student or teacher into one timetable or period table. Validate whether the existing semester/rule representation covers the intended pilot groups before adding fields or claiming broader academic coverage.

## Important invariants

Apply each rule only to implemented record types. Course-specific checks do not require course tables in the general local core.

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

Also validate the active storage identity and clear generation before every write, including draft and reminder bookkeeping. A recreated store gets a fresh identity; an old callback cannot recreate a missing store or match a reset generation accidentally. Restore invalidates runtime sessions while preserving the current store's operational metadata. These guards complement record revisions and process/tab coordination; they are not remote synchronization versions or imported business fields.

## Optional timetable format

`*.cadence-timetable.json` has an envelope with `format: "cadence-timetable"`, integer `version`, `export_id`, `exported_at`, semester metadata, periods, selected courses/rules/weeks and explicitly selected exceptions.

The export schema allowlists instructional fields: course name, teacher, room, color and schedule. It excludes course private_notes, personal_plans, tasks, completed states, settings and any university account/connection metadata. The preview must match the exact serialized content.

New local IDs are allocated at import and references remapped consistently. Duplicate import detection uses export/source identities, never only course titles. A modified export with a new export_id is a new candidate, not an automatic overwrite. Users resolve likely duplicates in preview.

When importing into a new semester with a different anchor, remap occurrence dates by teaching-week/day offsets and move targets by their relative date offsets; show all changes. Existing-semester imports require explicit period mapping and validation of week membership.

## Full backup format

`*.cadence-backup.json` uses its own `format` value and integer schema version for a logical snapshot of the implemented planning records. The core format can contain tasks, personal plans and exportable settings without any semester/course tables. Later versions may add optional course records and permitted non-secret provenance. Keep stable IDs for a full restore. Session secrets and OS operational handles are excluded. This file contains private data and is never offered by a timetable-sharing shortcut.

Check version, references, duplicate IDs, sizes, date constraints and recurrence limits before a restore. Reject unknown future versions rather than guessing. Back up the current database first, then restore atomically. On failure the original state remains usable.

Restoration requires exclusive application maintenance after pending writes and drafts are drained. Preserve logical IDs and entity revisions from the backup, but advance the current local generation and replace the runtime generation so pre-restore requests cannot apply. Rebuild OS delivery state from saved preferences. One writer process owns the data directory; a second instance cannot migrate, restore or dispatch reminders concurrently. Startup and failure ordering are specified in [APPLICATION.md](APPLICATION.md).

## Migration policy

Developer-side encryption candidates and key lifecycle are specified in [DATA_PROTECTION.md](DATA_PROTECTION.md). drift alone is not encryption. Check the actual cipher-enabled native engine in release builds, protect random per-database keys through verified platform storage, and cover journals/drafts/temp files and recovery copies. Missing keys must not trigger plaintext fallback or replacement with an empty database. Portable encrypted backups need independent recovery, not a plaintext copy of the device key.

Version every schema change; test migration from the previous supported version using the records actually supported, including tasks, overnight plans and later optional course exceptions/imports. Keep user data outside install/build directories. No upgrade or uninstall may be assumed to erase or migrate data without explicit implementation.
