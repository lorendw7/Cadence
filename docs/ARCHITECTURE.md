# Architecture

Updated: 2026-11-13. Status: planned, not implemented. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) keeps time management central, develops direct editing first and retains phone viewing. Screenshot import is optional only if needed; academic access is a deferred extension. Build the first working flow on Windows, then validate Android. Other platform targets remain under ADR-010. [ADR-011](adr/011-optional-sync-service.md) selects a later optional sync service. Preserve the small local structure under ADR-008. Current code and acceptance belong in [LEARNING.md](LEARNING.md). The learner writes features through lib/main.dart; this document creates no code layers.

## Selected structure and when it grows

Use one Flutter application and one local workspace. Keep the selected shadcn_ui direction and shared journal theme. Integrate it gradually; existing Material controls may remain during lessons. Avoid a second component framework. Use setState and ordinary Flutter state sharing while ownership is clear. Riverpod is a possible response to demonstrated complexity, not a lesson or release gate.

Introduce one drift/SQLite adapter when persistent saving is taught. Keep one writer and a short queue of writes. A second desktop process must not write the same store. No event bus, plugin framework, service locator, remote outbox or multi-package workspace is needed.

| Stage | Add only what the working feature needs |
|---|---|
| Current task exercise | Existing model, widgets and screen state |
| Saved tasks | One small store API, memory and SQLite implementations, save/error state |
| Today and Week | Shared confirmed records, bounded repeats and single-occurrence corrections |
| Backup and import review | Separate backup replacement and additive draft confirmation; internal sample drafts can test preview and atomic commit |
| Optional import, only when selected | A separately accepted source, editable draft and atomic confirmation; no import layer is required for direct editing |

## Dependencies after persistence is introduced

The flow is widgets → task/plan operations → local store. Date calculations and validation are pure Dart functions shared by the views. Widgets do not write SQL or parse import files. Store code does not navigate pages. Small operations may live together; do not create a class and interface for every button.

## State ownership and mutation flow

Keep one owner of confirmed records. Editors own unsaved input in memory. Save validates input, waits for the local write, then updates the confirmed state. A failed write keeps the editor open and its input available. Prevent duplicate submission while a write is pending.

Use a small in-memory change counter to reject outdated previews and a session token to reject callbacks after clear, restore or mode change. Each local workspace has one writer. Test mobile suspension and process termination without adding a background writer. Before Web release, define and test single-writer tab ownership and stale-callback rejection; do not assume desktop process rules protect browser tabs. Read back uncertain results before retrying an add.

## Source organization

Keep the current teaching files. Add a file when it has working code and a clear responsibility. A few files for tasks, plans, storage and shared controls are enough at first. A six-layer folder tree is not a required destination. Keep a replaceable storage boundary for meaningful failure tests, without a generic repository framework.

## Schedule projection

Save plans and bounded weekly rules. Derive the occurrences needed by Today and Week with one shared calculation. Read related records from one consistent snapshot. Reject an old query if the user has changed the viewed week.

Imported timetable entries and personal plans contribute to the same time view. Calculate visible available intervals within the stated day range after applying corrections; a deadline alone does not reserve time. Reserving task work creates an independent personal plan with explicit start/end. Moving that plan must not change the task's deadline or completion. No course or semester object is required for these general planning actions.

Before broader timetable use, the editor must distinguish one occurrence from the whole series. A single correction keeps the original occurrence identity and overrides only its time or room, or marks it cancelled. Moving it suppresses the original slot and adds the corrected slot exactly once. Restoring a cancelled occurrence is explicit. [DATABASE.md](DATABASE.md) defines the small exception record; introduce it with that lesson, not as an unused layer. Advanced teaching-week rules remain outside the first supported import unless samples and tests justify them.

## Time boundaries

Use one workspace timezone, initially copied from the system. Show it in Settings and retain it if the system timezone changes. A timezone change needs an explicit preview of affected dates; defer the change control if it cannot be implemented safely. Do not add per-plan zones or a travel dashboard to the first release.

Use dates for all-day plans and date-only deadlines. Timed intervals end exclusively, so adjacent events do not overlap. Weekly repeats follow local calendar time, with a finite end date. Handle ambiguous or missing daylight-saving times explicitly; a simpler interface does not justify wrong dates.

## Files and data safety

Local saving uses ordinary SQLite, not an encrypted vault. The first backup is a private, unencrypted, versioned JSON file. Explain these limits. Keep records under the user's app-data directory. Validate files before preview, preserve a verified recovery copy before replacement and apply changes in one transaction. No source screenshot or API key belongs in a backup.

The [application contract](APPLICATION.md) defines mode changes and failed writes. The [data model](DATABASE.md) lists only the tables needed by each stage. Encryption and persistent editor drafts are deferred under [DATA_PROTECTION.md](DATA_PROTECTION.md).

## Optional import boundary

[QUICK_IMPORT.md](QUICK_IMPORT.md) records conditional import choices. Establish manual in-app editing, saving, date rules and recovery first. Screenshot recognition is unscheduled optional work, selected only if actual users need it. CSV/table import is also deferred until real exported files justify it. Neither is a prerequisite for Windows or Android delivery.

Any later input route must produce editable candidates rather than writing records directly. Review dates, times, rooms, repeat limits and duplicates before one additive batch. Small fictional drafts can test this contract without a parser. Unsupported rules remain visible; no guessed schedule is saved.

An approved read-only academic API or official calendar feed is a separate candidate. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) owns feasibility questions and access gates. No offered interface, school approval, authentication route or live-update capability is established. Research does not authorize an adapter or a hosted proxy.

If screenshots are later selected, local text recognition and layout parsing need native packaging, correction-effort and source-to-result checks on every supported target. RapidOCR is only an unverified candidate. Keep source images out of backups. Personal-key cloud AI remains optional later help.

## Platform boundary

Use the existing Windows teaching host for the first working direct-editing, local-data and Today/Week flow. Android compact layout and native validation follow without requiring complete macOS/Linux releases. Schedule iOS when the host and devices are available; Web and other desktop release checks remain later work. This is one Flutter product, not separate desktop and phone implementations.

Share models, date calculations, validation and reviewed-import operations. Storage, file pickers, lifecycle, touch/keyboard behavior and any OCR engine need native acceptance. A shared codebase does not prove those integrations work on another OS. Keep existing runners; add a missing target or adapter only with working feature code in its lesson. The GitHub Pages concept site remains separate from any Web app. See [FREE_EDITION.md](FREE_EDITION.md).

## External services: outside scope

External services remain outside the first local flow. The first free release has no account service, sync queue, billing or advertising. [ADR-011](adr/011-optional-sync-service.md) accepts the later service stack: Node.js with TypeScript and Fastify, PostgreSQL and direct Google login, within a JPY 2,500 monthly planning budget. Implementation and launch remain subject to the post-store review in [ROADMAP.md](ROADMAP.md).

[CLOUD_SYNC.md](CLOUD_SYNC.md) owns the selected service design. It keeps the server database separate from the client's local SQLite store, makes upload an explicit choice and defines ownership, version conflicts, deletion and restore boundaries. One service and database may share the initial small VPS; off-server recovery remains required. Capacity must be measured before a user limit is claimed.

Google login is optional for sync and is not a school identity integration. Local planning stays usable without an account or service. Academic access remains a deferred extension, with no approved integration. Do not create backend fields, packages or empty service folders during local lessons. The older [sync study](SYNC.md) is historical reference only.

## Optional university integration

[UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) now separates historical source research from deferred application preparation. It is not an implementation contract or proof of access. Direct editing remains complete without that track. Any later approved import uses the validated local writer and clearly distinguishes a captured snapshot from a live source refresh.
