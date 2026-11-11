# Application contracts

Updated: 2026-11-11. Planned behavior under [ADR-008](adr/008-small-free-local-product.md), not implemented. Start with one desktop workspace and one writer. These contracts protect local data without requiring the earlier draft-recovery, multi-tab or sync machinery.

## Contract introduction and ownership

Introduce save, load and delete operations only with the relevant feature. One state owner publishes confirmed records. Editors hold input in memory. Save validates, writes through the local store, then reports success. Failed writes retain input and the old confirmed data. Task completion sets a desired state rather than blindly replaying a toggle.

A short write queue and disabled duplicate submission are enough for the first flow. Read back an uncertain write before retrying. Do not add generic command buses or persistent operation receipts.

## Retention mode and session transitions

On first use, offer Save on this device and Temporary use. Do not read saved planner data before an explicit or remembered saving choice. Temporary mode starts empty and uses memory. It creates no database, saved drafts or automatic backups. User-requested export is allowed in either mode.

Remember only a small storage preference outside the planner database. If it cannot be read, start temporary and explain the problem. Show the active mode. Use one session token to reject old callbacks after mode changes, restore or clear.

The first version can require closing the current session to change mode. Resolve pending writes and ask whether to save or discard unsaved forms. Do not build a live merge wizard. Offer export before leaving a temporary session. Starting local mode with an existing copy opens that copy only after an explicit choice; importing temporary work uses the normal reviewed restore flow.

Changing to temporary mode keeps the existing local copy unless the user separately chooses Clear local data. A failed preference write must not be reported as a completed mode change. Explain what is saved and what the next launch will do.

Clear stops writes, invalidates callbacks and removes the app's planning data and app-managed recovery files. Record a small cleanup marker so interruption can be retried before opening saved data. Report incomplete deletion; do not claim to remove user-exported files or physically erase disk sectors. Optional saved API keys have a separate clear choice and result.

## Queries: one saved snapshot

Today and Week use the same confirmed records and bounded date calculations. Counts and lists capture the same current time. Refresh at relevant deadlines, midnight, resume and confirmed changes; see [TODAY.md](TODAY.md). A task deadline does not occupy a calendar interval.

A query carries its viewed range and request identity. Discard old results after navigation or a new session. The first version uses one workspace timezone and no occurrence overrides. Consistent reads and a runtime change counter are sufficient; no persistent global generation table is required.

## Commands: validate, transact, then notify

Validate field lengths, IDs, dates and repeats before writing. Use transactions for multi-record changes. Advance the runtime change counter after a confirmed change. A preview captures that counter; if it is stale, rebuild it before confirmation. Keep validation inside the commit path as well as the form.

Keep only one active editor for a record. If it was removed or changed while open, preserve input and request review. Record revisions may be added when actual concurrent editing needs them; a revision system is not a prerequisite for a single task screen.

## Draft ordering

The first release has no persistent editor drafts. Unsaved input stays in one editor session. Closing a changed editor offers Save, Discard or Cancel. Save failure leaves the editor open. Closing the app warns about unsaved input where the OS allows; a crash can still lose it. Explain that limit. Import previews also stay in memory and never imply a saved schedule.

## Startup and exclusive restore

In local mode, acquire single-writer ownership, complete interrupted cleanup, open or migrate the database, then load confirmed records. Migration failure must preserve the old copy and offer recovery. Never create an empty replacement to hide failure. Temporary startup does not open or migrate an old private database.

For restore: validate the file and references → preview replacement → finish pending writes → preserve a verified recovery copy in local mode → replace records in one transaction → retire old callbacks and reload. Abort if any required step fails. Temporary restore replaces only memory and creates no automatic disk copy. Do not copy over a live SQLite file.

## Acceptance scenarios

- Saving survives restart offline; temporary startup cannot reveal an old saved workspace.
- Invalid input and failed writes preserve form input and confirmed records.
- Rapid double confirmation cannot add a task or import batch twice.
- Closing a changed form offers Save, Discard and Cancel; crash recovery of that form is not promised.
- Restore failure leaves the old dataset usable; old callbacks cannot undo a restore or clear.
- A second writer is refused; process-crash release is tested on the supported OS.
- Interrupted clearing is reported and retried before reading saved data.
- Date boundaries, repeats and Today counts agree across the views.

These are planned checks, not current test results.

## Later feature contracts

Reminders, single-occurrence changes, saved drafts and advanced course rules each need their own small lesson and acceptance. Do not add their storage or scheduling machinery beforehand.

School source access follows [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). Its output is an import draft, never a direct database write. Web and synchronization are considered only when that connection needs them. The earlier [sync study](SYNC.md) is not a core dependency or a promised service.
