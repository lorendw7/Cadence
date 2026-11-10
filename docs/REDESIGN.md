# Product design

Updated: 2026-11-11. Status: staged product plan. The teaching app supports in-memory task input, validation, addition, completion, empty-list feedback, deletion and single-level undo. Persistence and course management are not implemented. Current acceptance and pending manual checks live in the [project README](../README.md) and [learning log](LEARNING.md). shadcn_ui is selected but not installed; Web remains a future target. The website shows concepts.

## Purpose and scope

Cadence is a time planner primarily for students and also suitable for teachers and other people. Courses, meetings, research, work and personal plans belong in one schedule. It helps answer three questions: what is happening today, where, and what needs to be finished. No school identity is required. The academic-journal identity is independent; it does not copy Kyushu University's brand or claim its endorsement or system permission.

Target Windows, Linux and macOS. Complete a usable Windows flow first, validate each other platform on its native host, and distribute tested packages through GitHub Releases. No Android/iOS product is planned; the Android project is legacy scaffolding.

Web is a confirmed future target, separate from the static website. **Public deployment of the Web planner requires explicit school permission**, including a version with no school API. This is the user's project release condition. The selected UI is Flutter shadcn_ui, with muted wine `#7C394B`, warm paper `#F6F5F1` and sage `#6F877C`; see [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) and [ADR-004](adr/004-shadcn-web-direction.md). [ADR-005](adr/005-local-offline-and-school-gated-web.md) refines saving and deployment: default to memory, use the proposed IndexedDB adapter only after explicit choice, and reserve localStorage for small non-sensitive preferences. Validate storage and imports under [SECURITY.md](SECURITY.md).

Manual desktop planning requires neither a school account nor a network connection. Web needs hosted resources on first use; offline reload is not promised before its own acceptance. School authentication, read-only access to the user's timetable and reviewed source updates are separate optional capabilities. Each needs permission and a supported data channel. A supervisor may help find a university contact but cannot substitute for approval. See [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

The longer-term local product covers courses, personal plans, tasks and exams. Courses and personal plans share Today and Week. A task deadline does not reserve a calendar interval. Personal plans are independent entries with their own editing and repeats, not course notes.

Excluded from the current scope: mobile apps, unapproved school scraping, school-password collection, enrollment or grade access, Google/Outlook integration, online ICS, screenshot extraction, AI, live collaboration, automatic cloud sync, habits, payroll and focus tracking. Optional sync has a separate proposal in [ADR-006](adr/006-optional-multi-client-sync.md). Do not turn the planner into a campus social or commerce platform.

## Representative use and wider release

Use voluntary trials with students, teachers and other planners, including undergraduate and graduate students, international students, different departments and people using assistive technology. Record what was actually tested. One developer's timetable or one class does not establish university-wide coverage.

- Check semesters, quarters, intensive courses and irregular dates. Use editable configurations with a stated source; do not invent a universal university timetable.
- Locations may include campus and building. Cross-campus entries are allowed; automatic travel-time calculation is not a first-stage claim.
- Give Japanese, English and Chinese equal behavior in onboarding, errors, previews and privacy text. Test keyboard access, screen readers and large text.
- New users should be able to create a semester, add/import entries, handle moved classes and restore a backup without school login.
- Before wider release, assign support, maintenance, recovery, upgrades and eventual handover. Do not promise user counts or response times without evidence.

## First Web version

Plan manual course/personal-entry creation, editing and deletion; bounded weekly repeats; tasks and completion; Today/Week views; and three-language controls. Use memory by default and browser-local saving only after explicit choice. JSON files have a 1 MiB UTF-8 limit and at most 2,000 combined records. Validate, preview and confirm whole-data replacement. Offer private export and clear; failure preserves the original data. This export is not the filtered timetable-sharing format below.

Initial Web scope excludes backend/accounts, sync, CSV, system notifications, single-occurrence changes and the full semester model. The course, exception, recoverable-draft and sharing contracts below are longer-term designs. The learner implements core features; the assistant maintains delegated documentation/website work, teaches, reviews and prepares tests/templates. Use [SCHOOL_DEMO.md](SCHOOL_DEMO.md) with fictional data only after its features pass acceptance. Desktop manual planning can progress independently; public Web deployment still follows the release condition above.

Both desktop and future Web distinguish temporary use from saving on this device. Temporary mode does not read an existing private database or write business data, recovery drafts or automatic backups. Explicit export is a separate action. Switching back to temporary use must explain whether the saved copy is kept or cleared. Never silently merge or overwrite memory and saved copies. Show saved status only after confirmation; preserve input and offer retry on failure. See [application contracts](APPLICATION.md) and [visible states](UI_ARCHITECTURE.md#saving-and-connection-states).

## Pages and interaction

The accepted academic-journal layout uses **Today / Week / Tasks** in a light sidebar, with Settings at the bottom. Open Courses and Weekly Review from Week. On wide windows, Today combines a left task list with a larger right daily timeline; Week prioritizes a seven-day calendar and a collapsible task tray; Tasks uses a focused list. Full editors open in an overlay on selection. Narrow windows collapse navigation and stack content. See [the layout specification](UI_ARCHITECTURE.md#pages-and-navigation) for interactions, references and staged delivery.

A global New action offers the entry types that have been implemented. The complete product can create a course, personal plan or task without first navigating elsewhere. A simple task needs only a title; date, course link and notes are optional fields. Completion uses a checkbox; selecting the title opens editing once the editor exists.

| Page | Main content | First-use guidance |
|------|--------------|--------------------|
| Today | Task counts, overdue/undated groups, courses, plans and next entry | Personal plans work without a semester; see [TODAY.md](TODAY.md) |
| Week | Monday–Sunday timeline with courses, plans, exams and an all-day area | Select a week, return to today and filter visible categories |
| Courses | Semesters, teaching weeks, periods, courses and rules | Create semester → set periods → add manually or preview import |
| Tasks | Assignments, other tasks, course links, deadlines and completion | A task may have no deadline |
| Settings | Semester, language, appearance, transfer, backup and clear | Show school connection only after permission and acceptance; explain read scope, last successful check and disconnect |
| Weekly Review | Planned time, daily distribution, completion, overdue tasks and week comparison | Open from Week; explain how to add data, without scores |

This table lists functional pages, not extra main-navigation items. Calculate review data locally without tracking or a server. Show planned time, not inferred actual study time. Scope, overlap and cross-day rules are in [STATISTICS.md](STATISTICS.md).

Place entries by actual time; period labels are an extra guide. Personal plans can occur between classes or in the evening. Show overlapping entries beside one another with separate open actions. Use text/icons as well as color. Explain deletion scope and offer an available undo; clear and backup restore require their own confirmation.

Plan Japanese, English and Chinese together as each feature is added. The website defaults to Japanese with manual language selection. The app may initially follow the system language and offer a settings override.

## Course model

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

## Personal plans

Personal plans do not need a semester. They have a title, location, notes, color and optional category. Support one timed interval, an all-day range, or simple weekly repeats with an end date.

- Timed plans have an explicit timezone and start/end; end is later than start, including overnight plans.
- All-day plans use date ranges and do not participate in hard timed-overlap checks.
- Weekly repeats choose weekdays and a positive interval in weeks. Anchor the interval to Monday of the start-date week; the repeat end date is inclusive.
- Repeats use stable rule/plan ID plus original-date identity for single cancellations, moves and restore.
- System-timezone changes do not rewrite saved semester or plan timezones. Week has an explicit display timezone. Show source timezones when relevant; ask about nonexistent or ambiguous daylight-saving times instead of shifting them silently.
- Expand only within a bounded query window; do not generate an infinite stored series.

Meals, medical visits, clubs, work shifts and study sessions can all be personal plans. A category does not introduce payroll, attendance or another business module.

## Tasks, exams and conflicts

Assignments and general tasks have a title, optional course link, notes, optional date or exact-time deadline, and completion state. A date-only deadline becomes overdue after that date ends. Completed tasks leave the upcoming group. The default upcoming range is seven days; overdue tasks are separate.

An exam is a timed personal plan linked to a course and participates in conflicts. A separate revision task is allowed, but do not store two competing copies of the exam time.

Compare actual timed intervals using `[start, end)`: an entry ending at 10:00 does not conflict with one starting at 10:00. Exclude cancellations, task deadline points and all-day markers. Warn before saving a course/personal-plan conflict, but allow the user to record a real overlap.

Display and conflict checks use the same occurrence rules. State the checked range, such as the semester end or a repeat's end date. A current-week check cannot claim that an entire series is conflict-free.

## Sharing, import and local data

Files from classmates, templates and future approved school sources all need validation, preview and confirmation. A file is a snapshot, not a subscription. Approved school refresh shows source, age and changes; it preserves private notes and local edits until conflicts are resolved. Failed or incomplete responses do not mean cancellation or deletion.

Timetable sharing and full backup have separate actions and formats:

| File | Contents | Purpose |
|------|----------|---------|
| `*.cadence-timetable.json` | Selected semester, periods, selected courses/rules and explicitly selected exceptions | Share a timetable |
| `*.cadence-backup.json` | Local courses, plans, tasks, exceptions and exportable settings; no credentials | Restore private data |

Show course names, rooms and teachers in the sharing preview. The timetable format always excludes private notes, personal plans, tasks and completion state. Adding fields later requires an explicit format/UI change. School-source fields also obey their retention and export permission.

Import flow: choose file → validate version and size → preview semester, periods, courses and exceptions → choose a new semester or map to an existing one → review conflicts and duplicates → commit in a transaction. Do not replace existing periods automatically. Different periods need explicit mapping or a new semester. Default a new semester to the source week anchor; a changed anchor previews date/exception remapping by week offsets.

Files include export and source-record IDs. Allocate new local IDs on timetable import and keep source mappings. Skip already imported records when the same file is repeated. Names alone do not identify a course. A changed file needs another preview; the first version does not silently merge updates or delete local courses.

Validate backup format, references and version before full restore. In local-saving mode, create a current backup before transactional replacement; temporary-mode import stays in memory under [APPLICATION.md](APPLICATION.md). Failure preserves original data. Explain whether an export is encrypted; encryption is not currently implemented. Even a timetable file may reveal a person's location. Users choose when and where to save or send files; the basic flow uses no Cadence server. Exclude school passwords, tokens and sessions from every export. Restoring a backup does not restore login.

Do not promise that uninstall removes desktop data. Offer the data location and an explicit clear-local-data action. Updates must not overwrite user data directories.

## Technology and implementation limits

Keep Flutter. shadcn_ui is the product direction, while early lessons may retain Material. Introduce Riverpod and drift/SQLite as needed; add the browser adapter during its own stage. Test teaching weeks, occurrence expansion, exceptions and conflicts before connecting pages. Do not install unused packages or create empty layers.

Complete local behavior first. Future approved identity/source adapters use the application boundary; do not prebuild account services, network layers or sync queues. Browser storage, lifecycle and file handling need separate acceptance and cannot inherit desktop file assumptions. Until sync is implemented, transfer between devices uses explicit backups, not a shared live database file.

The later desktop plan includes local notifications while the process runs; initial Web does not. See [NOTIFICATIONS.md](NOTIFICATIONS.md) for permissions and platform limits. Closed-process reminders require separate acceptance. Build editors and recoverable drafts before later fixed-template import work; draft rules are in [EDITING.md](EDITING.md).

Treat schedule locations, private plans and backups as sensitive. Minimize fields, validate untrusted input, isolate credentials, redact diagnostics and test deletion/recovery. A later backend needs object-level authorization, session security and cross-user isolation. These are requirements, not implemented safeguards; see [SECURITY.md](SECURITY.md). Architecture and data constraints are in [ARCHITECTURE.md](ARCHITECTURE.md) and [DATABASE.md](DATABASE.md).

## Delivery and acceptance

1. Follow [LEARNING.md](LEARNING.md) one small feature at a time. The learner writes features; the assistant prepares tests. After task basics, complete temporary/local choice, saved tasks, restart recovery, failed-save input retention and clearing before course work.
2. Complete semesters, periods, course rules, teaching weeks and Week; cancel/move/restore one occurrence.
3. Add independent plans, all-day and weekly repeats, shared Today/Week views and conflict warnings.
4. Add linked tasks/exams, sharing previews, repeat-safe import, fixed-template CSV/paste and full backup/restore.
5. Add offline review using the shared projection for planned time and union of occupied intervals, plus task completion times.
6. Run a Windows pilot, then native Linux/macOS checks with representative students and teachers, three languages, accessibility and recovery.
7. Publish only verified packages with installation, support and handover guidance. Audience goals do not establish tested coverage.

The learner continues desktop work and later Web lessons. Demonstrations need tested behavior and honest limits before school discussions. Supervisor advice or voluntary feedback does not grant identity/data access and does not block the manual desktop product.

Acceptance means tested behavior works on the target system, not that a folder exists or a build succeeds. See [ROADMAP.md](ROADMAP.md) for stages and estimates.

Example: move an odd-week class from Monday periods 1–2 in teaching week 3 to Tuesday evening. The original disappears, exactly one replacement appears, and a simultaneous dinner shows a conflict. Restore the class and leave dinner unchanged. Share the timetable and confirm that the file excludes dinner and private assignments.
