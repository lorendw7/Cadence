# Local data model

Scope update (2026-11-13): [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps tasks, deadlines, personal plans, Today and Week central. Build useful direct editors and reliable local saving on Windows, then validate Android without waiting for all macOS/Linux releases. Other platforms need separate acceptance. Screenshot import is optional work only if demonstrated demand justifies it; it has no scheduled release gate. CSV/table import remains deferred. Academic-system access is a deferred, unscheduled extension. Research, application preparation and integration are outside the current delivery milestone. Local release does not wait for school approval. Everyone receives the same free functions. Cloud sync and optional ads remain for review after store launch. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates.

Updated: 2026-11-13. Planned under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md), not implemented. Add tables with learner-written features. Use ordinary drift/SQLite for one local workspace after the user chooses saving. Temporary use stays in memory. The shared model serves time management on Windows and phones; importing a timetable is one way to add fixed commitments.

## Core tables and later extensions

| Record | First fields |
|---|---|
| Tasks | Stable ID, title, completion state; add notes and date/time deadline with their editor |
| Personal plans | Stable ID, title, optional location/notes, timed or all-day interval |
| Weekly repeat | Add weekdays and a finite end date to the plan only when repeat behavior exists |
| Occurrence correction | Stable ID, parent plan ID, original occurrence key, cancellation flag and supported time/room overrides |
| Settings | Language and one workspace timezone; add other preferences only when used |

Use stable IDs rather than names as identity. Add fields only as their lessons need them. One-off plans have no repeat values. A basic weekly rule repeats every week. Bounded occurrence corrections are required before broader timetable use; arbitrary recurrence and teaching-week rules remain separate work.

Tasks and personal plans are first-class records, independent of courses, semesters and import. A task deadline does not occupy time. A reserved work session is an independent personal plan; creating or moving it changes no task deadline or completion state. Today and Week derive available intervals from the confirmed timed commitments in a bounded viewing range; available intervals are calculated results, not new stored records. Their display must state which hours and all-day assumptions are included.

There is no draft table, persistent global generation, sync queue, account table or course schema in the first release. Keep the storage choice and interrupted-cleanup marker outside the planning database. They are not restored from backups. Use a runtime session token and change counter for stale callbacks/previews under [APPLICATION.md](APPLICATION.md).

## Single-occurrence corrections

An occurrence key identifies the original scheduled date and start within its parent series. It remains the same when that occurrence moves. Allow one correction per parent and original key. A change stores only the supported overridden time and room; a cancellation marks that original occurrence inactive while retaining those overrides. Restoring a cancellation explicitly returns the previous effective time and room after preview. Resetting an override to the series value is a separate named action if offered.

Projection suppresses the original occurrence before applying its correction. Include corrections moved into the requested range even when their original date is outside it. Never show or count both the original and moved occurrence. Cancelled occurrences remain recoverable records but do not count as active time commitments. A whole-series edit must preview how its corrections map to the new rule and reject unresolved or orphaned corrections.

Preserve local record and occurrence identities through backup and restore. A source image region or import batch may be identified in the draft when needed for review, but it is not a school account or live source link. Reimport compares candidates and existing records for review; it does not overwrite manual corrections by matching a title or image position.

## Important invariants

- Titles are nonempty and bounded. Completion does not delete a task.
- Timed plans require end after start, including overnight entries.
- All-day ranges use dates and an exclusive end date.
- Weekly repeats have selected weekdays and an explicit final date. Expand only a bounded view or preview range.
- All records use the workspace timezone. System timezone changes do not rewrite stored plans.
- Date-only deadlines become overdue after the date ends. A timed deadline is not a scheduled duration.
- Validate daylight-saving gaps and ambiguous times instead of silently changing them.
- Enforce IDs, references and uniqueness with database constraints and domain checks.
- A correction references an existing repeated plan and a valid original occurrence; reject duplicate keys and unsupported overrides.
- A selected import format must represent its advertised date and repeat rules without silent flattening. Reject unsupported semester, odd/even-week or single-class rules.

## Indexes and transactions

Use one writer process and serialize writes. Read related records from one consistent snapshot. Apply a bulk import or replacement in one transaction. Show success only after commit. Add indexes for actual queries; do not prebuild every optional index.

Do not copy a live database's main file without its pending journal data. Use logical export or a tested database snapshot method for recovery. File dialogs and network requests stay outside database transactions.

## Full backup format

Use one versioned `cadence-backup` JSON format for supported tasks, plans, occurrence corrections and settings. It is an unencrypted private file, not public timetable sharing. Include stable IDs and a format version. Exclude keys, source images, raw import files, unsaved editors, runtime counters and storage-mode preferences. Test moves, cancellations and restored occurrences through a complete round trip.

Set finite byte, record and recurrence limits during the backup lesson and test their boundaries. Validate versions, IDs, references and business rules before showing a replacement preview. Reject unsupported future versions. Keep a verified recovery copy before replacement in local mode; temporary-mode restore stays in memory. Failure leaves the old dataset usable.

## Migration policy

Keep data outside installation and source directories. Version schema changes and test upgrades from the prior supported version. Preserve a recovery copy before migration. Do not silently downgrade, erase or replace a damaged database. Clear app-managed recovery copies when the user explicitly clears local data.

The first version uses ordinary SQLite, not an encrypted database. [DATA_PROTECTION.md](DATA_PROTECTION.md) explains its limits. Encrypted storage is later work, not a missing runtime engine to bypass silently.

## Optional timetable format

No timetable input is required for the first local release. Direct editors create the confirmed plan records. An optional import selected later must create a review draft, then save the accepted records through the same writer. Screenshot and CSV/table work remain demand-led; no parser or source table is needed to teach local saving.

If screenshot import is later selected, source images, text boxes and recognition confidence belong to temporary review state, not permanent attachments or extra core tables. Save only confirmed planning data and necessary recurrence identity. Manual editing can satisfy the local product gate without OCR. Advanced course rules, teaching-week membership and filtered sharing remain later migrations. [REDESIGN.md](REDESIGN.md) and [HOLIDAYS.md](HOLIDAYS.md) retain those references. Do not require course tables to save tasks or personal plans. A future sharing format must exclude private plans, notes and keys and remain distinct from full backup.

## Future university-source provenance

Conditional academic-access research does not authorize school source IDs or adapter tables. An approved source would need a separate schema review before implementation. The free edition shares task/plan meaning across native and browser stores; choose and test each storage implementation in its platform lesson. Do not add remote identities, sync queues or billing records now. [CLOUD_SYNC.md](CLOUD_SYNC.md) holds the selected later personal sync design; its implementation remains deferred after store launch. [SYNC.md](SYNC.md) is historical.
