# Product scope

Updated: 2026-11-11. Cadence is a **general-purpose local time planner** for personal life, work, study and other daily commitments. Personal plans, tasks, Today and Week are the core. Courses are optional. No account, school identity, semester or organization is required. [ADR-007](adr/007-general-purpose-local-planner.md) records this direction and replaces the earlier university-centered scope and school gate for general Web deployment.

## Current state

The teaching app supports validated task addition, completion toggling, empty-list feedback, deletion and single-level undo in memory. It does not yet save data or manage schedules. The website is a concept presentation, not a working planner. Current lesson results and pending manual checks belong in the [project README](../README.md) and [learning log](LEARNING.md).

The learner writes core code through small lessons. The assistant maintains delegated documentation, artwork and website work, teaches, reviews and prepares tests/templates. A design update does not implement a future lesson.

## First useful local product

| Area | Planned behavior |
|------|------------------|
| Tasks | Create, edit, complete, reopen and delete tasks; optional deadlines; undo where supported |
| Personal plans | Timed and all-day entries, optional categories and bounded weekly repeats |
| Today | Today's tasks and plans, separate overdue/undated groups and the next entry |
| Week | One view of timed entries and all-day plans, with clear dates and overlap warnings |
| Saving | First-use choice between saving on this device and temporary use; no business persistence before consent |
| Recovery | Confirmed local writes, input retained on failure, restart recovery, private export/import and explicit clearing |
| Use | Offline local planning without login, a server, school connection or telemetry |
| Interface | Keyboard access, readable resizable desktop layouts, Japanese/English/Chinese controls |

The first release must make these basic flows dependable before adding specialized modules. A task deadline does not reserve a calendar interval. A repeat always has a bounded range. [REDESIGN.md](REDESIGN.md) defines behavior and [ROADMAP.md](ROADMAP.md) separates implementation stages from release gates.

On first use, explain **Save on this device** and **Temporary use**. Until the user chooses saving, keep business data in memory and explain loss on close. Remembering an explicit choice is allowed. Temporary mode does not open an old private database or write recoverable drafts/automatic backups. Saving does not imply encryption, cloud sync or backup. The detailed transitions are in [APPLICATION.md](APPLICATION.md#retention-mode-and-session-transitions).

## Platforms and visual direction

Desktop is primary: Windows first, then Linux and macOS after each passes native acceptance. No Android/iOS product is planned; Android is legacy scaffolding. Web and multi-device sync are optional later extensions, not promised parts of the first release.

Keep Flutter and the selected shadcn_ui direction, which is not installed yet. Use a quiet paper-and-ink interface with the existing independent C mark, muted wine `#7C394B`, warm paper `#F6F5F1` and sage `#6F877C`. Everyday examples should include work and personal life as well as study. The brand has no university affiliation. See [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) and [DESIGN.md](DESIGN.md).

## Optional later work

| Extension | Scope and decision boundary |
|-----------|-----------------------------|
| Courses | Semesters, periods, teaching weeks, multiple rules, single class changes and filtered timetable sharing; not required to use personal plans/tasks |
| Review and reminders | Local planned-time review and opt-in native reminders with tested platform limits; not actual-time tracking |
| Assisted import | Local CSV/paste and screenshot drafts using RapidOCR; optional cloud AI with personal API keys and multiple provider profiles; review before saving; see [QUICK_IMPORT.md](QUICK_IMPORT.md) |
| Web | Reuse proven local behavior only after browser storage, lifecycle, accessibility and hosting checks; no school permission is required for a general planner |
| Sync | Separate user consent, identity, cloud copies, conflicts, deletion, security and operating ownership under [ADR-006](adr/006-optional-multi-client-sync.md) and [SYNC.md](SYNC.md) |
| External connections | Only supported, authorized sources; each connection has its own data-access and retention rules |

If Web is chosen, its first candidate is browser-local: memory until explicit saving, an evaluated IndexedDB adapter, Today/Week/tasks, bounded repeats and strict private JSON transfer. The candidate limits remain 1 MiB UTF-8 and 2,000 total records, with preview before whole-data replacement. Browser storage is not encrypted storage or a durable backup. Initial Web would exclude backend/accounts, sync, school APIs, CSV, notifications and single-occurrence changes. This is an extension design, not a committed delivery stage.

If sync is chosen, login must not upload independent local data automatically. Local-only use remains available. A school identity provider is not a general requirement; any particular provider's approval and data terms apply only when that integration is used.

## Connections and independence

General development and release do not need university approval. School authentication, timetable reads, local retention and exports still require the relevant permission when a school connection is pursued. [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md) are optional reference material, not the main delivery path.

Do not collect school passwords, scrape without permission or imply institutional endorsement. A declined or unavailable connection must leave the independent local planner useful.

## Success and exclusions

Success means a person can record a commitment, understand today and the week, finish a task, recover their own data and find help without the developer's assistance. Test different routines and accessibility needs rather than one institution's timetable. Desktop releases initially use GitHub Releases and list only verified platforms/features.

Mobile apps, required cloud accounts, live collaboration, enrollment/grade operations, social feeds, payroll and unrelated dashboards remain outside the core scope. Assisted import is accepted optional work after editing and recovery. Local import needs no API key. Cloud help is opt-in, uses the user's provider and may cost the user money; Cadence supplies no shared paid service. Success means less total effort than manual entry, including review and correction, while keeping the final schedule correct. No accuracy or time-saving result has been measured. New integrations or services need separate acceptance. Broader audience does not mean adding more infrastructure before local use works.
