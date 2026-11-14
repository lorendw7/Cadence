# Application contracts

Scope update (2026-11-15): [ADR-015](adr/015-android-self-use-first.md) sets the current route: shared local saving and recovery, Android planning self-use, bounded Android focus, then a useful ad-free mobile release. Windows remains the development host. Desktop focus presentation, media, Steam and a mobile ad pilot are separate later decisions; none blocks the first phone planning build. Desktop, Web and the concept site stay ad-free. School authorization, requests, connections, imports and cloud sync remain deferred. The repository was verified private on 2026-11-15. The Pages site is offline; website source is retained for later server deployment. MIT remains unchanged. [PRODUCT.md](PRODUCT.md) owns scope and [ROADMAP.md](ROADMAP.md) owns delivery gates. These are planned contracts, not implemented behavior.

Updated: 2026-11-15. Planned behavior under [ADR-015](adr/015-android-self-use-first.md), not implemented. Keep one local workspace and one writer in the shared Flutter code. Windows remains the teaching host; Android is the first self-use target. These contracts protect local data without requiring persistent draft recovery, multi-tab or sync machinery. [ADR-011](adr/011-optional-sync-service.md) selects the later service design, not an additional first-launch requirement.

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

Show fixed imported commitments and personal plans together, with available intervals inside a clearly stated day range. Reserving work time uses the normal plan editor with explicit start/end and Save. The result is independent of task completion and deadline. Moving a work plan does not reschedule its task. General tasks and plans need no course, semester or imported timetable.

A query carries its viewed range and request identity. Discard old results after navigation or a new session. Use one workspace timezone. Apply supported occurrence corrections before grouping or counting records. A moved occurrence appears once in its new range and not in its old slot; a cancelled occurrence does not count as an active commitment. Consistent reads and a runtime change counter are sufficient; no persistent global generation table is required.

## Commands: validate, transact, then notify

Validate field lengths, IDs, dates and repeats before writing. Use transactions for multi-record changes. Advance the runtime change counter after a confirmed change. A preview captures that counter; if it is stale, rebuild it before confirmation. Keep validation inside the commit path as well as the form.

Keep only one active editor for a record. If it was removed or changed while open, preserve input and request review. Record revisions may be added when actual concurrent editing needs them; a revision system is not a prerequisite for a single task screen.

For a timetable correction, choose This occurrence or Whole series before preview. One occurrence may change time or room, be cancelled, or be restored. Keep its original occurrence key after a move. Preview the affected date and resulting time/room before Save. Series edits with existing exceptions require a reviewed reconciliation; never silently detach or erase the exceptions. These are local edits, not an academic update feed.

Any later approved import route produces a memory-only draft, not confirmed planner data. Show uncertain or unsupported date rules and possible duplicates. Let the person correct or exclude candidates before committing only the confirmed batch once. Repeated import does not authorize replacement. Full replacement has the separate restore contract below.

Build useful manual editing, saving and date rules first. Screenshot recognition is an optional later route only if user need justifies it; it does not block the local product or phone work. CSV/table input remains deferred. Internal fictional drafts may teach review without a parser. An official academic API or calendar feed would need confirmed access terms and a separately accepted implementation scope before it can produce real candidates.

In local-saving mode, add the selected batch in one database transaction. In temporary mode, add it to a copy of the existing confirmed in-memory records, then swap that complete snapshot once. Preserve all pre-existing records in both modes. Failed confirmation changes no planning data and retains the editable draft; cancellation invalidates pending extraction and preview callbacks.

## Draft ordering

The first release has no persistent editor drafts. Unsaved input stays in one editor session. Closing a changed editor offers Save, Discard or Cancel. Save failure leaves the editor open. Closing the app warns about unsaved input where the OS allows; a crash or mobile process termination can still lose it. Explain that limit. Import previews also stay in memory and never imply a saved schedule. Resuming a suspended app must not silently commit an old preview.

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
- A corrected occurrence appears once; changing its room or time leaves the rest of the series intact.
- Cancel and restore affect the selected occurrence only; series edits with exceptions require a fresh preview.
- For a separately included import route, only the reviewed batch is saved; duplicates and unsupported rules stay visible before commit.
- Android Back, suspension and process termination preserve confirmed records and cannot replay a stale import or correction.

These are planned checks, not current test results.

## Android focus contract

After safe planning self-use, [stage H](ROADMAP.md#h--android-focus-self-use) adds one task-linked countdown, explicit pause/resume/end, a manually started break and local session records. This is planned work. The learner must first define state ownership, elapsed-time measurement, screen lock, app backgrounding, process loss, restart, duplicate callbacks and save failures in a small lesson. Do not assume the desktop lifecycle contract applies unchanged to Android.

Timer completion must not complete a task or change its deadline. Recorded timer time is not proof of attention. Local and temporary modes keep their existing retention boundaries; unknown or interrupted time must not be silently counted. Confirm a record write before showing it as saved and retain a retryable result on failure. Do not promise background operation, closed-app alarms or add services and notifications before the native contract and acceptance justify them.

## Later feature contracts

Reminders, saved drafts and advanced course rules each need their own small lesson and acceptance. The bounded occurrence corrections above belong to the timetable flow; they do not authorize a general recurrence editor or automatic source updates. Do not add unused storage or scheduling machinery beforehand.

[UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) retains reference guidance for a deferred extension. No academic connection is approved or implemented. Do not add school credentials, adapters or source tables during local lessons. A future approved read-only source needs its own data contract; it cannot silently overwrite private edits. The older [sync study](SYNC.md) remains historical. Local clients share task/plan contracts and validate their own storage and lifecycle behavior.

The accepted future personal sync design uses Node.js, TypeScript, Fastify and PostgreSQL with optional Google sign-in. Implementation remains subject to review after store launch. It copies the user's own planning records between devices; it does not fetch institutional course changes. Keep the local contracts above independent of accounts and server availability.

[CLOUD_SYNC.md](CLOUD_SYNC.md#sync-behavior) owns the later protocol contract: bounded incremental records, expected versions, repeat-safe writes, explicit conflicts and deletions. Do not add these mechanisms to the current single-writer lesson. When sync is implemented, distinguish a confirmed local save from a pending remote update and require a separate sync opt-in after sign-in.

Bind each pending operation and callback to the confirmed account and workspace. Before switching accounts, resolve pending work or allow the user to cancel the switch. Local clear must not issue cloud deletion. Local restore must pause sync and enter reviewed recovery, rather than replaying a backup as remote bulk deletion. Follow the [service transition rules](CLOUD_SYNC.md#logout-switching-clear-and-restore) and test isolation, stale callbacks and recovery before a pilot.
