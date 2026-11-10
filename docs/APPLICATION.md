# Application contracts and recovery

[ADR-007](adr/007-general-purpose-local-planner.md) makes personal plans and tasks the local core, without an account or school dependency. Explicit saving, offline use and coordinated clearing remain required. Courses, Web, sync and school sources below are optional extension contracts; the independent product has no school-permission gate.

Updated: 2026-11-11. **Target design; not implemented.** This remains a learner-led implementation plan. This document makes the boundaries in [ARCHITECTURE.md](ARCHITECTURE.md) concrete. Introduce contracts with saving/shared views; the current in-memory task screen does not need the entire design. Optional external sources need approved access and a known interface. Product behavior remains in [REDESIGN.md](REDESIGN.md).

## Contract introduction and ownership

The initial in-memory task lesson needs a plain model, a list and local widget state; it does not implement this entire document. [ADR-003](adr/003-incremental-modular-client.md) defines how the modular client grows. Introduce the following contracts only when the corresponding behavior begins:

| Trigger | Minimum application responsibility |
|---------|------------------------------------|
| First saved task | Explicit retention choice; one task read operation and desired-state write; injected storage; loading/pending/failure states; restart recovery |
| Revision-aware edits | Check the saved revision and return a typed stale/deleted result; keep unsaved input |
| Recoverable editor | Ordered draft writes and atomic promotion; distinguish draft-saved from formal-record-saved |
| Multiple views | One shared query owner or identified read snapshots; invalidate from confirmed writes; reject stale responses |
| Personal plans and schedule views | One bounded occurrence projector with explicit time, scope and consistent reads; optional courses extend it later |
| Structural edits/import | Reviewable change set, dependency recheck and atomic commit |
| Backup/restore and reminders | Exclusive restore and stale-work invalidation; reminders reconcile after saved changes |
| Approved external source or Web decision | Only the relevant conditional contracts later in this document |

Use plain functions/classes with concrete operations. Do not add a command bus, generic use-case base class, global service registry or a repository method for every database table. A port describes what its consuming feature needs, such as reading tasks or saving a validated task; the adapter owns SQL and row mapping. It can remain alongside that capability until another feature actually shares it.

After persistence exists, confirmed records come from storage/query results. A feature controller owns input/loading/write status, not a second permanent task or course database. Keep UI-only selection and focus local. Shared async state may use Riverpod as described in [ARCHITECTURE.md](ARCHITECTURE.md); it cannot replace transactional checks or become a second source of confirmed records.

For the first saved flow, show a pending state until the adapter confirms the write. Preserve input on failure, expose a useful retry and keep last loaded data visibly distinct from newly saved data. Either consume the confirmed command result or refresh the subscribed query in a coordinated way; do not add the same item twice when both complete. If the command's result is uncertain, reload before retrying rather than duplicating an add. Optimistic UI is not required for the initial persisted slice.

## Retention mode and session transitions

Select the session's storage adapter before reading business data. On first use, explain and offer Save on this device or Temporary use. Until an explicit saving choice, read and write only memory; do not open an existing private database, persist drafts or create automatic backups. A previous explicit local choice may be remembered through minimal non-sensitive operational settings. If that choice cannot be read, stay temporary and explain the problem instead of assuming consent. A user-initiated private export remains available in either mode.

| Transition | Required result |
|------------|-----------------|
| Temporary → save here, no existing local data | Freeze a reviewed memory snapshot, validate it and commit it through the local writer; activate local mode only after acknowledgement |
| Temporary → save here, existing local data | Show separate choices to open the saved copy or explicitly replace it after preview and recovery/export options; never silently merge or overwrite |
| Local → temporary, keep saved copy | Resolve pending writes and stop that session's reminders, close the local session and start a fresh empty memory session; the retained copy is unchanged and is not displayed automatically |
| Local → temporary, clear saved copy | Run the coordinated clear below; report any incomplete cleanup before claiming the old copy was removed |
| Save or mode change fails before the data commit | Keep the current visible data/input and last confirmed mode; expose retry or export without claiming durability |

Mode switches freeze new edits while draining pending work; failure stops the transition. Do not claim atomicity across business storage and the remembered mode preference. If data commits but remembering the choice fails, say that a local copy was saved but startup mode was not remembered; keep the current local session and retry only the preference write. A restart without a confirmed preference stays temporary and offers an explicit path to open the saved copy. An uncertain business commit is read back before retrying, never blindly inserted again.

Switching back to temporary use must also confirm the remembered startup choice. If that preference write fails, report the transition as incomplete rather than promising that the next launch will remain temporary. The user may retry or cancel; do not silently retain a local-startup preference after reporting a completed temporary-mode switch.

Each session has a fresh runtime identity. Commands, draft writes, previews and asynchronous results capture that identity; they may act only while it remains current. Mode changes, restore and clear retire the old identity even if record IDs and revisions are unchanged. For cross-tab/process protection, the adapter also checks a persistent storage identity and clear generation inside the write transaction; a missing or changed identity rejects an old writer. A new store gets a new identity even if its generation starts at the same number. Opening or recreating storage is an explicit startup/enable action, never a fallback inside a stale write callback. Runtime identity rejects work from obsolete sessions; `data_generation` detects changes within the active dataset.

Clear enters exclusive maintenance, stops new writes/requests/reminders, invalidates old sessions and coordinates other instances before removing business data, drafts, application-managed recovery copies and local credentials. First persist the cleanup intent and temporary startup choice in operational settings with no private payload; if that fails, do not begin deletion. Keep the cleanup record until every required step succeeds; startup resumes an interrupted clear before opening private data. Database, filesystem, credential-store and OS cleanup are separate operations with recorded results and retry. Never report complete deletion after only the database succeeds. Exported files and OS/user backups are outside application-managed cleanup. [ADR-005](adr/005-local-offline-and-school-gated-web.md) defines the full scope.

School connectivity is a separate setting. A temporary school view stays outside the saved planning snapshot even when personal planning uses local mode. Only permitted fields with separate retention consent may enter the normal writer, drafts, exports or recovery copies. Changing general storage mode cannot grant school retention permission.

## Queries: one saved snapshot

A schedule request carries a bounded half-open window `[start, end)` and display timezone. Core queries need no semester or course scope. If the optional course feature is present, pass its selected scope separately; personal plans remain independent of it. Validate query/recurrence limits before expansion; return an actionable error if exceeded, never a silently truncated result labelled complete.

The repository adapter reads plans, repeat rules and exceptions in one consistent snapshot; course/period tables join only when that optional feature exists. Expand in each source timezone, apply exceptions, filter by final overlap and deduplicate by `(source kind, rule/plan ID, original local date)`. A move keeps its original identity. Sort by start, end and identity for stable rendering. Read moved-in exceptions by replacement interval, including their referenced rules outside the original query window.

Each persisted schedule result carries its window, timezone, scope and `data_generation`. The application assigns request IDs and a runtime generation; only the latest matching request may update a controller. A slow previous-week query cannot replace the newly selected week. Restore invalidates every pre-restore request. A simple task list does not need a fabricated schedule window or occurrence object to use the same stale-request principle.

Today, Week, review and conflict checking use the same pure domain projector with their declared scopes. Conflict previews include personal arrangements even if a display filter hides them. Review states its scope; reminders consider all eligible records, not just the visible semester. File export preserves canonical rules through a separate allowlisted codec.

Task grouping captures `now` once for both counts and lists. An incomplete exact-time task becomes overdue when `now >= deadline`; a date-only task becomes overdue at the following local midnight. Schedule the next refresh at the next incomplete exact deadline or local midnight, and reschedule on committed writes, timezone/clock changes and foreground/sleep resume. Use an injected clock; do not depend on a widget rebuilding, fixed 24-hour increments or startup-only date capture. See [TODAY.md](TODAY.md).

Keep three meanings of time distinct: calendar dates for all-day ranges and original occurrence identity, wall times plus a named timezone for repeating plans, and instants for overlap/notification delivery. A task deadline is not an occupied interval. Time ranges are half-open. Optional teaching weeks come from the semester anchor rather than ISO week numbers. Display-timezone changes must not rewrite stored source times or occurrence identities. These invariants belong to the shared domain projector, not individual page controllers.

## Commands: validate, transact, then notify

The data adapter owns the SQLite transaction. The application use case requests its scope and performs all related reads/writes through that scope. Do not open an independent repository connection midway through a command. File dialogs, file writes and notification calls stay outside the database transaction.

Mutable aggregate roots have a positive local `revision`. Changing course rules/weeks/exceptions increments the course revision. A semester configuration change increments its semester revision; a course preview checks both dependencies. A singleton `data_generation` increments once per successful formal-data transaction, including import and restore. Draft saves and reminder delivery bookkeeping do not invalidate schedule results. These values are local concurrency controls, not remote sync versions.

| Command | Required precondition | Atomic result |
|---------|-----------------------|---------------|
| Set task completion | ID, expected revision, desired state, captured time | Update completion/time and revision; return saved record |
| Save personal plan or later optional course | Validated draft, expected root/dependency revisions | Save root/children, advance generation and remove submitted draft |
| Move/cancel/restore occurrence | Stable occurrence key and expected root revision | Validate against current rule; upsert/delete exactly one override |
| Apply structural edit or import | Validated preview, resolutions and preview generation | Recheck references and versions, apply all changes once |
| Restore backup | Validated staging data and verified pre-restore backup | Replace logical records exclusively; invalidate earlier work |

Recheck preview dependencies **inside the commit transaction**. If data changed, refresh the preview before committing. The first implementation may invalidate on any formal-data generation change. This conservative rule also catches an appointment created after the user reviewed a conflict warning.

Outcomes distinguish validation issues, stale/deleted records, unsupported files and storage failures. The UI preserves input and offers correction, refresh or retry. Unexpected programming failures must not become successful empty results.

Commands express desired state, not blind toggles. If a result is uncertain, reload the record/provenance before retrying. A stale revision response alone cannot prove whether the earlier command succeeded. Never replay a toggle or bulk import just because its spinner timed out.

## Draft ordering

Recoverable drafts exist only in local-saving mode and only for data permitted to be retained. Temporary editor input remains in memory and is never labelled recoverable after restart. Draft storage status is separate from formal-record status. Serialize saves per draft and attach an increasing `edit_sequence`. An acknowledgement for sequence 3 cannot mark sequence 4 saved. Only an acknowledged latest write shows “draft saved”; failure leaves input and retry available.

Submit freezes a specific draft version, validates it, checks root/dependency revisions and promotes that version in one transaction. Failed promotion leaves the original formal records and recoverable draft intact. New input cannot slip into an already validated submission.

Close/discard/submit stops accepting writes from that editor session, cancels its debounce timer and drains queued saves before deleting/promoting the draft. This prevents a late autosave from recreating a discarded draft. Keep the ordering in the application coordinator, not widget disposal alone. Recovery opens a draft for review and never silently submits it. See [EDITING.md](EDITING.md).

## Reminder reconciliation

After a successful formal commit, invalidate queries and request reconciliation. Compute desired reminders from saved data, compare delivery state and call the platform adapter. A dispatch failure leaves the schedule saved and marks reminders pending/failed separately. Startup and resume reconcile again, covering a crash between commit and dispatch.

Use stable reminder keys and recheck current revisions before scheduling. OS acceptance and SQLite bookkeeping cannot be atomic: a crash after OS acceptance leaves an uncertain result. Query/cancel using stable IDs where supported; otherwise surface the capability limit. Do not promise exactly-once delivery or equate OS acceptance with the user seeing a notification. See [NOTIFICATIONS.md](NOTIFICATIONS.md).

## Startup and exclusive restore

The first desktop persistence implementation allows one writer process per data directory. A second desktop launch activates the first instance where supported or reports that the directory is in use; it cannot independently run writers/reminders. Acquire ownership before migration, and test crash release on every desktop host. Any future browser adapter must prove equivalent coordination across tabs/workers using supported browser mechanisms; it cannot assume a local filesystem lock exists.

Startup first resolves the explicit/remembered retention choice and any interrupted cleanup from non-sensitive operational settings. Temporary mode wires a memory adapter and exposes an empty session without opening private storage or reconciling its old reminders. Local mode follows: locate data directory → acquire ownership → finish any pending cleanup → open/migrate database → wire adapters → load settings/timezone → expose usable UI → offer permitted draft recovery and reconcile reminders. Migration failure offers recovery without silently opening a fresh empty database.

Restore in local mode enters exclusive maintenance: stop accepting writes, flush/drain drafts and commands, verify a current backup, then commit the validated staged replacement. If draining or backup fails, keep the original usable and abort restoration. Keep the local generation monotonic rather than importing the backup's operational generation. A supported restore/import in temporary mode replaces only memory after preview, preserves the old in-memory snapshot until success, and never enables local saving or automatic on-disk backup.

On success, advance a new runtime generation, drop stale controllers/previews, reload settings and rebuild reminders. Old callbacks must not write into restored data even if entity IDs/revisions match. SQLite rollback preserves original records on failure. Never overwrite a live WAL database with an arbitrary file copy. See [DATABASE.md](DATABASE.md).

## Acceptance scenarios

Use fixed clocks and pure Dart fixtures for projections; temporary databases for transactions and migration; fake platform adapters for failure paths.

| Scenario | Required observable result |
|----------|----------------------------|
| Start temporary with an old local database present | No private records are read, shown, migrated or silently copied into memory |
| Enable saving while an old local copy exists | Explicit open/replace choice; cancel leaves both copies unchanged |
| Commit data but fail to remember storage mode | Saved copy remains; preference-only retry creates no duplicate records; next startup does not infer consent |
| Fail to remember a switch back to temporary mode | Show an incomplete transition; do not promise a temporary next startup or begin clearing without durable cleanup intent |
| Clear while another tab has an old writer | Old transaction is rejected; it cannot recreate storage or restore removed records |
| Cleanup fails after database deletion | Show incomplete cleanup and retry; restart resumes cleanup before opening private data |
| View a school timetable without retention consent | No source content appears in drafts, automatic backups or private exports |
| Move a repeated plan, or later a class, into another week | No origin instance; exactly one destination instance with the same identity; restoring removes the override |
| Two edits use the same revision | First commits; second keeps its input and requests refresh |
| Switch weeks while a query is slow | The old response cannot replace the selected week |
| Discard with autosave queued | The draft does not reappear |
| Fail draft promotion | Original plan/task record and recoverable draft remain intact |
| Add an appointment after conflict preview | Commit rejects the stale preview and recomputes conflicts |
| Fail optional reminder dispatch after save | Plan remains saved; reminder retry/reconciliation is available |
| Fail import/restore midway | No partial records; original data remains usable |
| Restore while old work is queued | Old commands cannot mutate restored records or show stale results |

These are future implementation gates, not claims of passing coverage. Add tests when each behavior is implemented, as required by [QUALITY.md](QUALITY.md).

For a future approved university adapter, additionally verify: repeated snapshots create no duplicates; partial/unavailable responses remove nothing; local edits survive a conflicting refresh until resolved; an account switch/disconnect discards old responses; restored data cannot resume an old session; and credentials never appear in sharing, backups or diagnostics. These gates do not block delivery of the independent local core.

## Optional Web contract checks

Later multi-client synchronization follows [SYNC.md](SYNC.md): business writes and outbox entries are atomic locally, server writes/logs/receipts are atomic remotely, retries reuse stable operation IDs, and incoming data never overwrites pending local edits silently. Restore/clear/account-switch invalidate sync work as well as local callbacks. This conditional extension is not part of the initial no-backend Web contract below.

Web is an optional extension, not an implemented platform or required first release. Its first browser-local candidate has a smaller contract than desktop: memory until explicit saving, strict JSON preview/replace/export and clearing, without accounts, backend, school data, CSV, notifications or single exceptions. Reuse domain/application behavior only after an adapter provides equivalent transaction, stale-preview and recovery guarantees. Quota errors or unavailable persistence must retain input and report failure, not a saved record. Explain private-browsing and eviction limits. Offer private export without a hosted account. General Web release has no school-permission gate.

Multiple browser tabs and workers must coordinate the same logical writer and schema version. Test a tab suspended during migration, another tab editing after a preview, and stale callbacks after restore/disconnect. Do not copy the desktop process-lock assumption into a browser or open a transaction across a network request. If required guarantees cannot be met, narrow the Web release's supported behavior and document the limitation before release.

Any future server API must authorize each requested user-owned object using the authenticated server context; UI filters and client-provided owner IDs are not authorization. Treat school responses, imported files and free text as untrusted data at every rendering boundary. Session/CSRF controls, script policy, data retention and diagnostic redaction are specified in [SECURITY.md](SECURITY.md). These requirements do not authorize or imply a backend deployment.

## Optional university-source import and refresh

This section defines future observable behavior, not an available API or a concrete port signature. School authentication and authorization to read timetable data are separate prerequisites; see [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). Manual entry, local queries and local import remain available without either capability.

1. Capture the selected connection context, requested academic period and a request generation. Authenticate only through the approved flow, then read the authorized source outside any database transaction. Do not collect university passwords or request write operations such as registration changes.
2. Validate response completeness, scope and supported source format. Normalize source records into candidates while preserving non-secret source identity and observation metadata. Unknown dates, periods or week mappings need user correction or an actionable unsupported-format result; do not invent enrollment or cancelled classes.
3. Compare candidates with the last accepted source baseline and current local records. Distinguish source additions/changes/removals from the user's local edits. Show candidate changes, mapping issues, duplicates, conflicts and source freshness. Partial or failed reads cannot generate deletions.
4. On confirmation, recheck local revisions, preview generation, connection context, source-snapshot identity and permitted retention scope inside the commit transaction. Apply approved retained changes and their provenance atomically through the normal local writer. Without separate retention consent and permission, keep the source in its temporary view rather than persisting it through a general import action. A repeated successful import must not create duplicate courses; an uncertain result requires checking saved provenance before retrying.
5. Refresh shared queries and reconcile reminders after commit. Label the new last-successful-check time accurately; a failed check leaves the last accepted data and its age visible.

Names alone do not identify source records. Where an approved source has no stable identifiers, the adapter must document an identity strategy and its limitations before repeat updates are enabled. Ambiguous matches require review rather than a claim of automatic deduplication. Keep local notes, tasks and personal plans outside the imported field set. A source removal must offer explicit handling of local modifications and course-linked work, never silently delete them.

Local modifications win until the user accepts a conflicting source change. The preview must make both values visible and allow keeping the local value. Store a source baseline separately from the resulting local value so a later refresh can distinguish an upstream change from a previous local decision. Exact metadata and migration design wait for real approved samples.

Disconnect stops further requests, invalidates in-flight requests/previews and removes locally stored session material; use provider revocation when supported by the approved interface. It leaves imported courses and personal data intact, with a separate explicit deletion option. Switching student context cannot reuse a preview or source binding from the previous context. Restore also invalidates source work; reauthorization and context verification are required before a restored binding can receive updates. An expired session or unavailable service offers reconnection while preserving offline use.

No continuous polling or background import is implied. Such behavior requires a later decision on school access limits, user consent, platform background execution and conflict handling. Never log or export passwords, tokens, cookies or raw authentication responses when diagnosing an integration failure.
