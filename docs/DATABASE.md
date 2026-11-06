# Local data model

Status: schema proposal, not implemented. This replaces the earlier general-purpose calendar/cloud-sync proposals. Implement migrations alongside the features in [ROADMAP.md](ROADMAP.md).

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
| settings | key, versioned value; locale, theme, display timezone, selected semester |

Do not store OAuth accounts, access tokens, external event bindings, sync cursors or an outbox.

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

## Timetable format

`*.cadence-timetable.json` has an envelope with `format: "cadence-timetable"`, integer `version`, `export_id`, `exported_at`, semester metadata, periods, selected courses/rules/weeks and explicitly selected exceptions.

The export schema allowlists instructional fields: course name, teacher, room, color and schedule. It excludes course private_notes, personal_plans, tasks, completed states and settings. The preview must match the exact serialized content.

New local IDs are allocated at import and references remapped consistently. Duplicate import detection uses export/source identities, never only course titles. A modified export with a new export_id is a new candidate, not an automatic overwrite. Users resolve likely duplicates in preview.

When importing into a new semester with a different anchor, remap occurrence dates by teaching-week/day offsets and move targets by their relative date offsets; show all changes. Existing-semester imports require explicit period mapping and validation of week membership.

## Full backup format

`*.cadence-backup.json` uses a different `format` value, its own integer schema version and a complete logical data snapshot including provenance. Keep stable IDs for a full restore. This file contains private data and is never offered by the timetable-sharing shortcut.

Check version, references, duplicate IDs, sizes, date constraints and recurrence limits before a restore. Reject unknown future versions rather than guessing. Back up the current database first, then restore atomically. On failure the original state remains usable.

## Migration policy

Version every schema change; test migration from the previous supported version with representative course exceptions, overnight plans, tasks and imports. Keep user data outside install/build directories. No application upgrade or uninstall behavior may be assumed to erase or migrate data without explicit implementation.
