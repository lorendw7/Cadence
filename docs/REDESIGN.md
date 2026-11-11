# Product design

Current first-release limits are in [ADR-008](adr/008-small-free-local-product.md): one workspace, explicit Save, memory-only unsaved forms, ordinary SQLite and private unencrypted JSON backups. Detailed course rules below are later reference material, not first-release work.

Updated: 2026-11-11. Status: staged product plan under [ADR-007](adr/007-general-purpose-local-planner.md). The teaching app supports in-memory task input, validation, addition, completion, empty-list feedback, deletion and single-level undo. Saving and schedule views are not implemented. Current acceptance and pending manual checks live in the [project README](../README.md) and [learning log](LEARNING.md). The first release keeps themed Material controls under [ADR-008](adr/008-small-free-local-product.md). The website shows concepts.

## Purpose and scope

Cadence is a local time planner for everyday work, personal life, study and other commitments. Personal plans and tasks are the core. It helps answer three questions: what is happening today, when there is time this week, and what needs to be finished. No account, school, organization or semester is required. The paper-and-ink identity is independent and uses ordinary daily examples, not an institution's brand.

Target Windows, Linux and macOS. Complete a usable Windows flow first, validate each other platform on its native host, and distribute tested packages through GitHub Releases. No Android/iOS product is planned; the Android project is legacy scaffolding.

Web and synchronization are considered only when a school connection needs them. Neither is a general local-product delivery track. General development and release, including a possible general Web planner, require no school approval. School or other third-party connections still need their own permissions. The UI uses themed Flutter Material controls, with muted wine #7C394B, warm paper #F6F5F1 and sage #6F877C; see [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md).

Core desktop planning needs no account, backend or runtime network connection. Once installed, it can use chosen local data offline. A download and any optional network service have separate delivery needs. Do not require login, connection setup or a semester wizard before the first task or plan.

Personal plans have their own editing and repeats. Tasks may have deadlines, but a deadline does not reserve a calendar interval. Courses and exams can later extend the same views without owning the core data model or onboarding.

Excluded from the core scope: mobile apps, mandatory cloud accounts, external calendar integration, online ICS, live collaboration, automatic cloud sync, habits, payroll and focus tracking. Local screenshot import with RapidOCR, plus optional cloud help using personal API keys, is accepted extension work under [QUICK_IMPORT.md](QUICK_IMPORT.md). It is not implemented or required for the first local release. Its goal is less manual entry and correction work, with review before saving. School-password collection, unauthorized scraping and enrollment/grade operations are not product features. Optional sync has a separate proposal in [ADR-006](adr/006-optional-multi-client-sync.md).

## First use and saving

On first use, offer **Save on this device** and **Temporary use**, explaining restart behavior. Until the user chooses saving, keep business data in memory. A previous explicit choice may be remembered. Temporary mode does not read an existing private database or write business data, recovery drafts or automatic backups.

Explicit export is a separate action. Switching back to temporary use must explain whether the saved copy is kept or cleared. Never silently merge or overwrite memory and saved copies. Show saved status only after confirmation; preserve input and offer retry on failure. See [application contracts](APPLICATION.md) and [visible states](UI_ARCHITECTURE.md#saving-and-connection-states).

## Representative use and wider release

Use voluntary trials with people who plan different work, home and study routines, including people using assistive technology. Record what was actually tested. One developer's routine does not establish broad usability.

- Test meetings, appointments, errands, personal projects and study plans without creating a semester or account.
- Locations are optional plain text. Automatic travel-time calculation is not a first-stage claim.
- Give Japanese, English and Chinese equal behavior in onboarding, errors, previews and privacy text. Test keyboard access, screen readers and large text.
- New users should be able to choose storage, add plans/tasks, inspect their week and restore a backup without developer assistance.
- Before wider release, assign support, maintenance, recovery, upgrades and eventual handover. Do not promise user counts or response times without evidence.

## Pages and interaction

The accepted paper-and-ink layout uses **Today / Week / Tasks** in a light sidebar, with Settings at the bottom. Add Courses and Weekly Review as optional later entries from Week; neither is required for core planning. On wide windows, Today combines a left task list with a larger right daily timeline; Week prioritizes a seven-day calendar and a collapsible task tray; Tasks uses a focused list. Full editors open in an overlay on selection. Narrow windows collapse navigation and stack content. See [the layout specification](UI_ARCHITECTURE.md#pages-and-navigation) for interactions, references and staged delivery.

A global New action offers the entry types that have been implemented. The core product creates a personal plan or task without first navigating elsewhere. Add Course only with that optional feature. A simple task needs only a title; date and notes are optional. Course links appear only when course support exists. Completion uses a checkbox; selecting the title opens editing once the editor exists.

| Page | Main content | First-use guidance |
|------|--------------|--------------------|
| Today | Task counts, overdue/undated groups, plans and next entry | Create the first task or plan directly; see [TODAY.md](TODAY.md) |
| Week | Monday–Sunday timeline and all-day area | Select a week, return to today and open each plan |
| Courses, optional | Semesters, teaching weeks, periods, courses and rules | Create semester → set periods → add manually or preview import; core onboarding stays independent |
| Tasks | Personal/work/study tasks, optional deadlines and completion | A task may have no deadline or schedule entry |
| Settings | Saving choice, language, appearance, transfer, backup and clear | Explain current storage and recovery; no connection setup is required |
| Weekly Review, optional | Planned time, daily distribution, completion, overdue tasks and week comparison | Open from Week; explain how to add data, without scores |

This table lists functional pages, not extra main-navigation items. Calculate review data locally without tracking or a server. Show planned time, not inferred actual study time. Scope, overlap and cross-day rules are in [STATISTICS.md](STATISTICS.md).

Place entries by actual time. Optional course-period labels are an extra guide; personal plans work at any time without a period table. Show overlapping entries beside one another with separate open actions. Use text/icons as well as color. Explain deletion scope and offer an available undo; clear and backup restore require their own confirmation.

Plan Japanese, English and Chinese together as each feature is added. The website defaults to Japanese with manual language selection. The app may initially follow the system language and offer a settings override.

## Personal plans

Personal plans need no semester or account. They have a required title, optional location and notes, an optional display color. A custom category manager is deferred. Support one timed interval, an all-day range, or simple weekly repeats with an end date.

- Timed plans use the workspace timezone and explicit start/end; end is later than start, including overnight plans.
- All-day plans use date ranges and do not participate in hard timed-overlap checks.
- Basic weekly repeats choose weekdays and an inclusive end date. Other repeat intervals wait for a demonstrated need.
- The first repeat editor changes the whole series. Single cancellations and moves are later work; do not offer them before their data rules are implemented.
- Use one workspace timezone, initially the system timezone. Keep it stable after a system timezone change. Defer per-plan zones and travel controls; handle ambiguous or missing daylight-saving times explicitly.
- Expand only within a bounded query window; do not generate an infinite stored series.

Meals, medical visits, clubs, work shifts and study sessions can all be personal plans. A category does not introduce payroll, attendance or another business module.

## Tasks and conflicts

Tasks have a required title, optional notes and date or exact-time deadline, and completion state. A course link is optional later metadata, not a task prerequisite. A date-only deadline becomes overdue after that date ends. Completed tasks leave the upcoming group. The default upcoming range is seven days; overdue tasks are separate.

In the optional course feature, an exam is a timed personal plan that may link to a course and participates in conflicts. A separate revision task is allowed, but do not store two competing copies of the exam time.

Compare actual timed intervals using `[start, end)`: an entry ending at 10:00 does not conflict with one starting at 10:00. Exclude cancellations, task deadline points and all-day markers. Warn before saving a course/personal-plan conflict, but allow the user to record a real overlap.

Display and conflict checks use the same occurrence rules for personal plans and any later courses. State the checked range, such as the semester end or a repeat's end date. A current-week check cannot claim that an entire series is conflict-free.

## Private backup and clearing

Provide private export/import for core tasks and personal plans before a real-data desktop trial. A full backup is different from the optional filtered timetable-sharing format. Version the file, bound size and records, validate references and dates, and show what will be replaced before confirmation.

In local-saving mode, preserve a verified current backup before a full replacement. Temporary-mode import stays in memory and must not silently enable saving or create an automatic disk backup. Drain pending writes, recheck the reviewed data version and reject stale work after restore. Failure leaves existing records usable.

The first JSON export is unencrypted; explain this before export. Application-level encryption is deferred. Private backup files can reveal routines and locations. Users choose where to save them; the core flow has no upload. Exclude credentials and operational session/sync metadata. Restoring a backup does not restore login, change the local-saving choice or cancel unfinished cleanup.

Show the local data location and an explicit clear action. Clearing includes application-managed recovery copies and private temporary files, reports incomplete steps and can resume after interruption. It cannot retract exports or promise physical disk erasure. Uninstall may leave data behind; updates must not overwrite the user-data directory. Detailed contracts are in [APPLICATION.md](APPLICATION.md) and [DATABASE.md](DATABASE.md).

## Optional course model

These rules are retained for a later course feature. They are not prerequisites for tasks, personal plans, the first desktop trial or general release.

### Semesters and teaching weeks

- Each semester has a name, the Monday of teaching week 1, an end date, a fixed timezone and a period table. Even if teaching starts on Wednesday, use that week's Monday as the week anchor.
- Number teaching weeks from 1 using calendar-date differences; a new week starts on Monday. Holidays do not pause numbering. Clip a short final week at the semester end date.
- Odd/even rules use teaching-week numbers, not ISO calendar week numbers. Normalize selected weeks to a valid set of teaching-week numbers.
- Keep multiple semesters. Changing the selected semester changes the view, not stored history or independent personal plans. Overlapping semesters are allowed, with clear course ownership.
- Before changing the anchor, timezone, end date or periods, preview affected courses and exceptions. Do not silently change an already moved class.

### Courses and rules

A course has a name, teacher, default room, color and private notes; locations may include campus and building. A course may have several rules, such as Monday periods 1–2 every week and Wednesday period 3 in even weeks. Represent irregular courses through supported explicit dates/rules. Ambiguous school data must not produce guessed dates; block unsupported imports with correction guidance.

A rule contains weekday, active weeks, either start/end periods or custom start/end times, and optional room/teacher overrides. Period mode refers to the semester's period table. Custom times do not change with that table. A rule cannot use both input modes.

Periods are same-day, ordered and non-overlapping. A class spanning periods shows its actual start/end interval, including the breaks between them. The first course model does not cross midnight; overnight personal plans use the separate plan model.

### Single cancellations, moves and room changes

Identify a class occurrence by rule ID and original local date. Editing offers this occurrence or the whole rule. Do not add series splitting from this occurrence onward in the first version.

- Cancellation stores an exception while preserving original identity.
- Moving stores the replacement date/time. Remove the original position and show exactly one replacement.
- A room change overrides only that occurrence's room.
- Restore removes the exception; it does not create a new course.
- A class moved into another week remains editable by its original identity. Queries must include exceptions moved into the requested week.
- After a whole-rule edit, retain valid exceptions. Preview exceptions excluded by the new rule and let the user remove them or convert them to independent personal plans; do not leave orphaned records.

Holidays are reference markers. University calendars and public holidays differ; a public holiday does not cancel a class automatically. A vacation range can generate cancellation candidates after preview. A make-up class identifies the original occurrence and its replacement date. See [HOLIDAYS.md](HOLIDAYS.md).

## Optional timetable sharing and source import

This section adds course-specific sharing to the private recovery flow. Do not require it for the first general local planner.

Files from classmates, templates and future approved school sources all need validation, preview and confirmation. A file is a snapshot, not a subscription. Approved school refresh shows source, age and changes; it preserves private notes and local edits until conflicts are resolved. Failed or incomplete responses do not mean cancellation or deletion.

Timetable sharing and full backup have separate actions and formats:

| File | Contents | Purpose |
|------|----------|---------|
| `*.cadence-timetable.json` | Selected semester, periods, selected courses/rules and explicitly selected exceptions | Share a timetable |
| `*.cadence-backup.json` | Local courses, plans, tasks, exceptions and exportable settings; no credentials | Restore private data |

Show course names, rooms and teachers in the sharing preview. The timetable format always excludes private notes, personal plans, tasks and completion state. Adding fields later requires an explicit format/UI change. School-source fields also obey their retention and export permission.

Import flow: choose file → validate version and size → preview semester, periods, courses and exceptions → choose a new semester or map to an existing one → review conflicts and duplicates → commit in a transaction. Do not replace existing periods automatically. Different periods need explicit mapping or a new semester. Default a new semester to the source week anchor; a changed anchor previews date/exception remapping by week offsets.

Files include export and source-record IDs. Allocate new local IDs on timetable import and keep source mappings. Skip already imported records when the same file is repeated. Names alone do not identify a course. A changed file needs another preview; the first version does not silently merge updates or delete local courses.

Validate backup format, references and version before full restore. In local-saving mode, create a current backup before transactional replacement; temporary-mode import stays in memory under [APPLICATION.md](APPLICATION.md). Failure preserves original data. The first JSON export is unencrypted; explain this before export. Application-level encryption is deferred. Even a timetable file may reveal a person's location. Users choose when and where to save or send files; the basic flow uses no Cadence server. Exclude school passwords, tokens and sessions from every export. Restoring a backup does not restore login.

Do not promise that uninstall removes desktop data. Offer the data location and an explicit clear-local-data action. Updates must not overwrite user data directories.

## Optional browser-local version

There is no general Web planner delivery track. Keep the existing static concept site. Consider a Web surface only when a concrete school connection needs one. Do not assume this means a full browser planner, cloud database or bidirectional sync. Define scope and permission from that school's interface first; see [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

## Technology and implementation limits

Keep Flutter Material controls and the shared theme. Introduce one drift/SQLite adapter with saving. Add Riverpod only if ordinary state sharing becomes hard to maintain. Build task saving and personal-plan rules before optional course modules. Test date handling, bounded expansion and overlap rules before connecting multiple views. Do not install unused packages or create empty layers.

Complete local behavior first. Future identity/source adapters use the application boundary, but no account service, network layer or sync queue belongs in the core by default. Browser storage, lifecycle and file handling need separate acceptance. Until sync is implemented, transfer between devices uses explicit backups rather than a shared live database file.

Optional desktop reminders may run while the process is active; the first Web candidate excludes them. See [NOTIFICATIONS.md](NOTIFICATIONS.md) for permission and platform limits. Closed-process reminders require separate acceptance. Build explicit editors and reliable recovery of confirmed records before assisted import; see [EDITING.md](EDITING.md) and [QUICK_IMPORT.md](QUICK_IMPORT.md).

Treat locations, private plans and backups as sensitive. Minimize fields, validate untrusted input, isolate credentials where used, redact diagnostics and test deletion/recovery. A later backend needs object-level authorization, session security and cross-user isolation. These are requirements, not implemented safeguards; see [SECURITY.md](SECURITY.md). Architecture and data constraints are in [ARCHITECTURE.md](ARCHITECTURE.md) and [DATABASE.md](DATABASE.md).

School connections are optional adapters. Authentication, timetable reads, retention and exports need their relevant permissions under [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md). A declined connection never blocks general product development, release or independent local use.

## Delivery and acceptance

1. Follow [LEARNING.md](LEARNING.md) one small learner-written feature at a time. Complete task basics, explicit temporary/local choice, confirmed saving, restart recovery, failed-save input retention and clearing.
2. Add personal timed/all-day plans, shared Today/Week, bounded repeats, task deadlines and overlap warnings without semester setup.
3. Complete private export/import, tested recovery, migrations, accessible three-language controls and clear storage explanations.
4. Run a Windows trial across different daily routines, then validate Linux/macOS on native hosts. Publish only tested packages with support and upgrade/recovery guidance.
5. Select local extensions from trial feedback. Consider Web or synchronization only for a school connection that needs them; estimate and validate that connection separately.

The learner continues desktop work; Web is not a required lesson or release milestone. Use fictional data in demonstrations and state real feature limits. School discussions apply only to an optional school connection and do not gate the independent product.

Acceptance means tested behavior works on the target system, not that a folder exists or a build succeeds. See [ROADMAP.md](ROADMAP.md) for stages and estimates.

Core example: choose local saving, add a meeting, a personal appointment and a task, then restart without a network. Today and Week show confirmed plans; task completion updates the same count/list. Export a private backup, test a rejected invalid import and recover the valid backup without an account.

Optional course example: move an odd-week class from Monday periods 1–2 in teaching week 3 to Tuesday evening. The original disappears, exactly one replacement appears, and a simultaneous dinner shows a conflict. Restore the class and leave dinner unchanged. Share the timetable and confirm that the file excludes dinner and private assignments.
