# Local data model

Updated: 2026-11-11. Proposal under [ADR-008](adr/008-small-free-local-product.md), not implemented. Add tables with learner-written features. Use ordinary drift/SQLite for one local workspace after the user chooses saving. Temporary use stays in memory.

## Core tables and later extensions

| Record | First fields |
|---|---|
| Tasks | Stable ID, title, completion state; add notes and date/time deadline with their editor |
| Personal plans | Stable ID, title, optional location/notes, timed or all-day interval |
| Weekly repeat | Add weekdays and a finite end date to the plan only when repeat behavior exists |
| Settings | Language and one workspace timezone; add other preferences only when used |

Use stable IDs rather than names as identity. Start with task fields only. One-off plans have no repeat values. A basic weekly rule repeats every week; other intervals and single-occurrence exceptions wait for a demonstrated need.

There is no draft table, persistent global generation, sync queue, account table or course schema in the first release. Keep the storage choice and interrupted-cleanup marker outside the planning database. They are not restored from backups. Use a runtime session token and change counter for stale callbacks/previews under [APPLICATION.md](APPLICATION.md).

## Important invariants

- Titles are nonempty and bounded. Completion does not delete a task.
- Timed plans require end after start, including overnight entries.
- All-day ranges use dates and an exclusive end date.
- Weekly repeats have selected weekdays and an explicit final date. Expand only a bounded view or preview range.
- All records use the workspace timezone. System timezone changes do not rewrite stored plans.
- Date-only deadlines become overdue after the date ends. A timed deadline is not a scheduled duration.
- Validate daylight-saving gaps and ambiguous times instead of silently changing them.
- Enforce IDs, references and uniqueness with database constraints and domain checks.

## Indexes and transactions

Use one writer process and serialize writes. Read related records from one consistent snapshot. Apply a bulk import or replacement in one transaction. Show success only after commit. Add indexes for actual queries; do not prebuild every optional index.

Do not copy a live database's main file without its pending journal data. Use logical export or a tested database snapshot method for recovery. File dialogs and network requests stay outside database transactions.

## Full backup format

Use one versioned `cadence-backup` JSON format for supported tasks, plans and settings. It is an unencrypted private file, not public timetable sharing. Include stable IDs and a format version. Exclude keys, source images, unsaved editors, runtime counters and storage-mode preferences.

Set finite byte, record and recurrence limits during the backup lesson and test their boundaries. Validate versions, IDs, references and business rules before showing a replacement preview. Reject unsupported future versions. Keep a verified recovery copy before replacement in local mode; temporary-mode restore stays in memory. Failure leaves the old dataset usable.

## Migration policy

Keep data outside installation and source directories. Version schema changes and test upgrades from the prior supported version. Preserve a recovery copy before migration. Do not silently downgrade, erase or replace a damaged database. Clear app-managed recovery copies when the user explicitly clears local data.

The first version uses ordinary SQLite, not an encrypted database. [DATA_PROTECTION.md](DATA_PROTECTION.md) explains its limits. Encrypted storage is later work, not a missing runtime engine to bypass silently.

## Optional timetable format

Course rules, teaching-week membership, exceptions and filtered sharing are later migrations. [REDESIGN.md](REDESIGN.md) and [HOLIDAYS.md](HOLIDAYS.md) retain the course reference. Do not add these tables to save independent tasks or personal plans. A future timetable-sharing format must exclude private plans, notes and keys and remain distinct from full backup.

## Future university-source provenance

A school adapter may need source IDs and a small accepted baseline to explain updates. Decide these fields from a real permitted source, not a guessed universal schema. The [source contract](UNIVERSITY_INTEGRATION.md) produces reviewed candidates. No school secret belongs in the database or backup. Web and synchronization add tables only if that school's connection requires them; [SYNC.md](SYNC.md) is reference material.
