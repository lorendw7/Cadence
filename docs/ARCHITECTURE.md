# Architecture

Updated: 2026-11-11. Status: planned, not implemented. [ADR-008](adr/008-small-free-local-product.md) narrows the design to a free local desktop planner. Current code and acceptance belong in [LEARNING.md](LEARNING.md). The learner writes features through lib/main.dart; this document creates no code layers.

## Selected structure and when it grows

Use one Flutter application and one local workspace. Keep the selected shadcn_ui direction and shared journal theme. Integrate it gradually; existing Material controls may remain during lessons. Avoid a second component framework. Use setState and ordinary Flutter state sharing while ownership is clear. Riverpod is a possible response to demonstrated complexity, not a lesson or release gate.

Introduce one drift/SQLite adapter when persistent saving is taught. Keep one writer and a short queue of writes. A second desktop process must not write the same store. No event bus, plugin framework, service locator, remote outbox or multi-package workspace is needed.

| Stage | Add only what the working feature needs |
|---|---|
| Current task exercise | Existing model, widgets and screen state |
| Saved tasks | One small store API, memory and SQLite implementations, save/error state |
| Today and Week | Shared confirmed records and pure date/repeat functions |
| Backup and import | One validated format, preview and batch commit |
| Screenshot import | A bounded local OCR worker and editable candidates |

## Dependencies after persistence is introduced

The flow is widgets → task/plan operations → local store. Date calculations and validation are pure Dart functions shared by the views. Widgets do not write SQL or parse import files. Store code does not navigate pages. Small operations may live together; do not create a class and interface for every button.

## State ownership and mutation flow

Keep one owner of confirmed records. Editors own unsaved input in memory. Save validates input, waits for the local write, then updates the confirmed state. A failed write keeps the editor open and its input available. Prevent duplicate submission while a write is pending.

Use a small in-memory change counter to reject outdated previews and a session token to reject callbacks after clear, restore or mode change. No persistent cross-tab generation protocol is needed for one desktop writer. Read back uncertain results before retrying an add.

## Source organization

Keep the current teaching files. Add a file when it has working code and a clear responsibility. A few files for tasks, plans, storage and shared controls are enough at first. A six-layer folder tree is not a required destination. Keep a replaceable storage boundary for meaningful failure tests, without a generic repository framework.

## Schedule projection

Save plans and bounded weekly rules. Derive the occurrences needed by Today and Week with one shared calculation. Read related records from one consistent snapshot. Reject an old query if the user has changed the viewed week.

The first repeated-plan editor changes or deletes the whole series and labels that scope. Single-occurrence moves, cancellations and school-week rules are later features. Do not create their tables now.

## Time boundaries

Use one workspace timezone, initially copied from the system. Show it in Settings and retain it if the system timezone changes. A timezone change needs an explicit preview of affected dates; defer the change control if it cannot be implemented safely. Do not add per-plan zones or a travel dashboard to the first release.

Use dates for all-day plans and date-only deadlines. Timed intervals end exclusively, so adjacent events do not overlap. Weekly repeats follow local calendar time, with a finite end date. Handle ambiguous or missing daylight-saving times explicitly; a simpler interface does not justify wrong dates.

## Files and data safety

Local saving uses ordinary SQLite, not an encrypted vault. The first backup is a private, unencrypted, versioned JSON file. Explain these limits. Keep records under the user's app-data directory. Validate files before preview, preserve a verified recovery copy before replacement and apply changes in one transaction. No source screenshot or API key belongs in a backup.

The [application contract](APPLICATION.md) defines mode changes and failed writes. The [data model](DATABASE.md) lists only the tables needed by each stage. Encryption and persistent editor drafts are deferred under [DATA_PROTECTION.md](DATA_PROTECTION.md).

## Optional import boundary

[QUICK_IMPORT.md](QUICK_IMPORT.md) uses RapidOCR for screenshots and optional direct cloud requests with user-provided keys. Both produce editable candidates. Neither writes planning records. Keep the provider setup in optional settings; no account or network request belongs in local startup. No PDF library is planned.

## Platform boundary

Windows is the first release target. Linux/macOS follow native file, storage, input and package checks. Keep existing runners and artwork, but do not add mobile work. The static GitHub Pages site stays a concept site. Do not create a second site or a Web planner as part of the local release.

## External services: outside scope

[ADR-009](adr/009-local-focus-without-school-connections.md) removes school connections, Web delivery and sync from the active plan. Earlier browser and connection designs are historical reference, not a reason to add remote fields, adapters or services.

## Optional university integration

[UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) retains historical source research. It is not an implementation contract. Manual entry and any later user-chosen local import use the same validated local writer.
