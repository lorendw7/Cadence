# Product design

The limits in [ADR-008](adr/008-small-free-local-product.md) still apply: one workspace, explicit Save, memory-only unsaved forms, ordinary SQLite and private unencrypted JSON backups. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) refines the earlier import direction: deliver direct general planning and phone access, defer academic-access research and implementation, and add screenshot import only if later need justifies it. Minimum recurring-entry corrections remain in the baseline; advanced course rules remain conditional.

Updated: 2026-11-13. Status: staged product plan under [ADR-007](adr/007-general-purpose-local-planner.md). The teaching app supports in-memory task input, validation, addition, completion, empty-list feedback, deletion and single-level undo. Saving and schedule views are not implemented. Current acceptance and pending manual checks live in the [learning log](LEARNING.md). The product keeps the selected shadcn_ui direction under [ADR-008](adr/008-small-free-local-product.md). The website shows concepts.

## Purpose and scope

Cadence is a local time planner for everyday work, personal life, study and other commitments. Personal plans and tasks are the core. It helps answer three questions: what is happening today, when there is time this week, and what needs to be finished. No account, school, organization or semester is required. The paper-and-ink identity is independent and uses ordinary daily examples, not an institution's brand.

The core loop is to enter commitments, inspect available intervals, choose work and reserve an explicit plan, use Today, then adjust plans without changing task deadlines. General time management and phone viewing guide the first useful product. Any later timetable import joins the same loop after review.

Keep desktop, Web, Android and iOS as targets under [ADR-010](adr/010-open-multiplatform-free-first.md). Build the manual editor, local saving and Today/Week on Windows. Design phone views now, then validate Android without waiting for complete macOS/Linux releases, screenshots or school approval. Validate iOS when a native host and devices are available. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) own platform gates. Existing platform folders do not prove support.

An official read-only academic API or calendar feed is a deferred option under [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md), including feasibility research. Availability and permission are not established; no school login, scraping or connection implementation is approved. Direct in-app editing is the delivery baseline. Users do not need to create a table or supply a screenshot. Cloud sync and optional ads remain for review after store launch. Continue MIT open-source development. Keep Flutter shadcn_ui, wine #7C394B, pure white #FFFFFF and graphite text; see [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md).

Core planning needs no account, backend or runtime network connection. Any later academic retrieval is an optional network action; saved permitted snapshots must remain useful when disconnected. Do not require login, connection setup or a semester wizard before the first task or personal plan. Screenshot recognition has a separate conditional design and does not add a first-release dependency.

Personal plans have their own editing and repeats. Tasks may have deadlines, but a deadline does not reserve a calendar interval. Imported timetable entries join the same views without owning general task onboarding. Ask for a term range or period table only when the selected input needs it.

Excluded from the first local release: required accounts, live collaboration, automatic cloud sync, advertising, billing, habits, payroll and focus tracking. External calendar or academic retrieval needs separate approval, scope and acceptance; it is not a local release gate. Screenshot recognition is optional and unscheduled under [QUICK_IMPORT.md](QUICK_IMPORT.md). CSV/table import is deferred unless useful real export files justify it. Cloud AI is not a dependency. School-password collection, academic scraping and enrollment/grade operations remain excluded. [CLOUD_SYNC.md](CLOUD_SYNC.md) defines the accepted later personal-sync design; its implementation remains deferred.

## Direction after the timetable survey

The user selected easier timetable setup and phone viewing in [ADR-012](adr/012-import-first-phone-planner.md), informed by the small [timetable survey](SURVEY_FINDINGS.md). The latest [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) makes direct planning the delivery baseline and screenshots optional. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) keeps the alternatives and tradeoffs. Conditional academic-access research does not approve a connection or prove broad demand.

Prioritize a complete flow: choose storage, directly enter fixed commitments, inspect Today/Week, then reserve time for a task and adjust it as needed. Repeated classes need individual corrections whether entered manually or imported later. On a phone, put the current or next commitment with time and optional room/location above the agenda; it may concern study, work or home. Keep title-only task capture and independent personal plans. Compare the planning loop with a person's current method; the [competitor review](COMPETITIVE_REVIEW.md) supplies references, not demand evidence. An optional future input route must reduce total setup effort after review and correction.

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

The [local product baseline](PRODUCT.md#first-useful-local-product) defines the required features. Windows is the first implementation host; phone design shapes the shared flow now. These are specifications for future lessons, not new application behavior.

Keep **Today / Week / Tasks** as the main destinations. Show Import only after a route is implemented and accepted; no placeholder is needed. Phones use compact navigation, a readable daily agenda and a selected-day list within Week. Wide windows retain the light sidebar, two-column Today and seven-day calendar with a collapsible task tray. Settings stays secondary. Course management and Weekly Review do not need extra main tabs. See [the layout specification](UI_ARCHITECTURE.md#pages-and-navigation).

A global New action offers only implemented entry types, named Task and Plan. A simple task needs only a title; date and notes are optional. If Import is added later, keep direct entry available. Course-specific context appears only when needed by a timetable. Completion uses a checkbox; selecting the title opens editing once the editor exists.

| Page | Main content | First-use guidance |
|------|--------------|--------------------|
| Today | Current/next commitment with time and room/location, daily agenda and separate task groups | Create a task/plan; see [TODAY.md](TODAY.md) |
| Week | All commitments and available intervals; selected-day agenda on phones, time grid on wide windows | Reach tasks, reserve an explicit plan and return to this week |
| Import, only if enabled later | Approved source response or supported local input, editable draft and real-date preview | Explain source limits; correct uncertainty before confirmation; offer direct editing |
| Course details, when used | Entry source context, bounded repeats and individual corrections | Ask for term/period context only when the chosen format requires it |
| Tasks | Personal/work/study tasks, optional deadlines and completion | A task may have no deadline or schedule entry |
| Settings | Saving choice, language, backup, restore, clear and help | Explain current storage and recovery; no connection setup is required |
| Weekly Review, optional | Planned time, daily distribution, completion, overdue tasks and week comparison | Open from Week; explain how to add data, without scores |

This table lists functional pages, not extra main-navigation items. Calculate review data locally without tracking or a server. Show planned time, not inferred actual study time. Scope, overlap and cross-day rules are in [STATISTICS.md](STATISTICS.md).

Place entries by actual time. Optional course-period labels are an extra guide; personal plans work at any time without a period table. Show overlapping entries beside one another with separate open actions. Use text/icons as well as color. Explain deletion scope and offer an available undo; clear and backup restore require their own confirmation.

Plan Japanese, English and Chinese together as each feature is added. The website defaults to Japanese with manual language selection. The app may initially follow the system language and offer a settings override.

### Design review loop

Use the [local planner study](../assets/ui/planner-study.html) with its [review guide](../assets/ui/PLANNER_STUDY.md). It explores the planned product, while the earlier Tasks study records the teaching exercise. Neither implements Flutter features or saves private planning data.

| Review step | Proposed behavior | Evidence to collect |
|---|---|---|
| Find the next commitment | Today leads with title, time and location on compact screens | Can the person name when and where to go without opening another page? |
| Capture an obligation | A title is enough; the editor reveals optional deadline and notes | Can the person add a task without inventing a date or plan? |
| Reserve work time | Week keeps tasks within reach and opens a plan form with explicit times | Can the person reserve time before the deadline and explain that the task remains incomplete? |
| Correct a change | Open a commitment, show occurrence/series scope, then edit and save | Does the person predict which dates will change? |
| Recover from a failed save | Keep the editor and input visible; place the error beside Save | Can the person retry or return to editing without losing the draft? |

Record confusion, mistaken actions and requests for help. Compare the loop with each person's current method. These questions test the design; they are not claims of improved speed. Restart recovery, storage isolation and backup restore require the implemented app and separate release checks.

The [official-product comparison](COMPETITIVE_REVIEW.md) informs the next design pass. Test whether title-first capture with optional details reduces hesitation; whether a labelled current-time marker and gap duration make the day easier to read; and whether a task tray beside Week avoids unnecessary page switching. Use several days of work, study and personal examples. Ask the person to distinguish today from the selected date, and a task's deadline from an interval reserved for work. Keep the journal identity and current scope while testing these choices.

For manual planning, opening a plan from a task may copy its title into an unsaved form. The person still chooses and confirms the interval. Keep the deadline visible as context where available. The resulting task and plan remain independent: moving or deleting the plan does not edit or complete the task. Automatic links, scheduling suggestions and drag scheduling stay deferred.

### Desktop design priorities

| Area | First desktop design | Deferred choice |
|---|---|---|
| Navigation | Today, Week and Tasks; show only working destinations | Optional import routes, extra course-management pages and Weekly Review |
| Visual hierarchy | White canvas, wine selection and primary actions, graphite text, fine rules and clear dates; preserve the independent C mark | Additional category colors and dark mode |
| Task entry | A title is enough; a labelled disclosure reveals optional notes and deadline; existing details remain visible during editing | Rich text, subtasks and advanced search |
| Plan entry | Explicit start/end or all-day dates; bounded weekly repeats; timetable occurrences can change time/room or be cancelled | Drag creation, series splitting and repeat patterns not needed by the chosen format |
| Editing | Open a right-side sheet on desktop or full-width editor on a phone, with Save and Cancel; return focus to the opening control | A permanent details column and persistent drafts |
| Feedback | Empty guidance, field errors, saving/failure and temporary-session labels near the relevant work | Decorative summary cards and activity feeds |
| Settings | Language; storage mode and location; backup/restore and clear; version/help | Account, sync, ads and appearance controls without working options |

On wide windows, keep Today's task list and timeline side by side. On compact screens, show the current/next commitment first, then the agenda and reachable task groups. Keep the due-today count visible near the date. Tasks keeps a focused content width; Week uses the available width. Do not apply the task-list width limit to the calendar. Avoid fixed control heights that clip translated labels or large text.

For desktop Week, use one shared hour ruler and bounded horizontal scrolling when seven readable day columns cannot fit. Keep the toolbar and a visible scroll cue available. The task tray sits beside the grid only when both remain readable; otherwise stack it or use an expandable section. A second desktop day-grid mode remains deferred. The phone path requires a readable selected-day agenda rather than squeezed columns. All-day and timed entries must keep their dates aligned in either layout. Mark today separately from the selected day.

Keep core actions usable without drag, hover or a custom shortcut. Use ordinary focus traversal and each control's standard keyboard activation. A changed editor must follow the same Save, Discard or Cancel flow when closing by pointer or keyboard. Resizing must not discard the editor, selected date or input. See [editing rules](EDITING.md).

Lesson 16 removed the practice counter under the learner's explicit delegation. Preserve the task and undo behavior recorded in [LEARNING.md](LEARNING.md). That cleanup does not mean saving, navigation or the full planner is implemented.

### One complete desktop scenario

Use fictional data to review the design: choose local saving, add a report due Friday, add a Thursday writing session and an all-day appointment, then check Today and Week. Complete the report, edit the appointment, restart, export a private backup, preview a restore and clear local data. Repeat the relevant flow in temporary mode and confirm that a restart retains no temporary records. The [roadmap](ROADMAP.md) owns acceptance and required failure checks; this scenario is not evidence that they passed.

## Personal plans

Personal plans need no semester or account. They have a required title, optional location and notes, an optional display color. A custom category manager is deferred. Support one timed interval, an all-day range, or simple weekly repeats with an end date.

- Timed plans use the workspace timezone and explicit start/end; end is later than start, including overnight plans.
- All-day plans use date ranges and do not participate in hard timed-overlap checks.
- Basic weekly repeats choose weekdays and an inclusive end date. Other repeat intervals wait for a demonstrated need.
- The ordinary repeat editor changes the whole series. Timetable maintenance also needs one-occurrence time/room changes and cancellation with restore. These use explicit exception identity; do not silently rewrite the whole series.
- Use one workspace timezone, initially the system timezone. Keep it stable after a system timezone change. Defer per-plan zones and travel controls; handle ambiguous or missing daylight-saving times explicitly.
- Expand only within a bounded query window; do not generate an infinite stored series.

Meals, medical visits, clubs, work shifts and study sessions can all be personal plans. A category does not introduce payroll, attendance or another business module.

## Tasks and conflicts

Tasks have a required title, optional notes and date or exact-time deadline, and completion state. A course link is optional metadata, not a task prerequisite. A date-only deadline becomes overdue after that date ends. Completed tasks leave the upcoming group. The default upcoming range is seven days; overdue tasks are separate.

An exam can be a timed personal plan and participates in conflicts. A course link can be added where needed. A separate revision task is allowed, but do not store two competing copies of the exam time.

Compare actual timed intervals using `[start, end)`: an entry ending at 10:00 does not conflict with one starting at 10:00. Exclude cancellations, task deadline points and all-day markers. Warn before saving a course/personal-plan conflict, but allow the user to record a real overlap.

Display and conflict checks use the same occurrence rules for personal plans and imported timetable entries. State the checked range, such as a term or repeat's end date. A current-week check cannot claim that an entire series is conflict-free.

## Private backup and clearing

Provide private export/import for tasks, personal plans, imported entries and their corrections before a real-data trial. A full backup is different from adding a timetable or the optional filtered sharing format. Version the file, bound size and records, validate references and dates, and show what will be replaced before confirmation.

In local-saving mode, preserve a verified current backup before a full replacement. Temporary-mode import stays in memory and must not silently enable saving or create an automatic disk backup. Drain pending writes, recheck the reviewed data version and reject stale work after restore. Failure leaves existing records usable.

The first JSON export is unencrypted; explain this before export. Application-level encryption is deferred. Private backup files can reveal routines and locations. Users choose where to save them; the core flow has no upload. Exclude credentials and operational session/sync metadata. Restoring a backup does not restore login, change the local-saving choice or cancel unfinished cleanup.

Show the local data location and an explicit clear action. Clearing includes application-managed recovery copies and private temporary files, reports incomplete steps and can resume after interruption. It cannot retract exports or promise physical disk erasure. Uninstall may leave data behind; updates must not overwrite the user-data directory. Detailed contracts are in [APPLICATION.md](APPLICATION.md) and [DATABASE.md](DATABASE.md).

## Optional course model

Using courses remains optional for each user. Any later import route needs only the rules in its declared supported format: start with bounded weekly entries and individual time/room/cancellation corrections. Do not require semester setup for tasks or personal plans. Teaching-week, period and odd/even rules below are conditional; implement them only if the selected real input requires them, otherwise flag them as unsupported.

### Semesters and teaching weeks

- Each semester has a name, the Monday of teaching week 1, an end date, a fixed timezone and a period table. Even if teaching starts on Wednesday, use that week's Monday as the week anchor.
- Number teaching weeks from 1 using calendar-date differences; a new week starts on Monday. Holidays do not pause numbering. Clip a short final week at the semester end date.
- Odd/even rules use teaching-week numbers, not ISO calendar week numbers. Normalize selected weeks to a valid set of teaching-week numbers.
- Keep multiple semesters. Changing the selected semester changes the view, not stored history or independent personal plans. Overlapping semesters are allowed, with clear course ownership.
- Before changing the anchor, timezone, end date or periods, preview affected courses and exceptions. Do not silently change an already moved class.

### Courses and rules

A timetable entry needs a title, explicit time and bounded dates or weekly rule; room and teacher may be supplied. Keep missing optional text visible as missing rather than inventing it. More advanced course groups may later collect several rules, such as Monday periods 1–2 and Wednesday period 3 in even weeks. Implement such rules only when required by the chosen supported input. Ambiguous or unsupported data must not produce guessed dates.

For the conditional teaching-week extension, a rule contains weekday, active weeks, either start/end periods or custom start/end times, and optional room/teacher overrides. Period mode refers to the semester's period table. Custom times do not change with that table. A rule cannot use both input modes.

Periods are same-day, ordered and non-overlapping. A class spanning periods shows its actual start/end interval, including the breaks between them. The first course model does not cross midnight; overnight personal plans use the separate plan model.

### Single cancellations, moves and room changes

Identify a class occurrence by its parent series or rule ID plus its original scheduled local date and start time. Keep this key after a move. Editing offers this occurrence or the whole rule. Cancelling retains any time/room correction; restoring a cancellation returns those prior effective values after preview. Resetting to series values is a separate named action if offered. Follow [DATABASE.md](DATABASE.md#single-occurrence-corrections). Do not add series splitting from this occurrence onward in the first version.

- Cancellation stores an exception while preserving original identity.
- Moving stores the replacement date/time. Remove the original position and show exactly one replacement.
- A room change overrides only that occurrence's room.
- Restore clears cancellation and retains the previous time/room overrides; it does not create a new course. Resetting overrides to the series values is a separate named action if offered.
- A class moved into another week remains editable by its original identity. Queries must include exceptions moved into the requested week.
- After a whole-rule edit, retain valid exceptions. Preview exceptions excluded by the new rule and let the user remove them or convert them to independent personal plans; do not leave orphaned records.

Holidays are reference markers. University calendars and public holidays differ; a public holiday does not cancel a class automatically. A later bulk vacation action may generate cancellation candidates after preview. The first flow supports an explicit individual cancellation or move. See [HOLIDAYS.md](HOLIDAYS.md).

## Optional timetable sharing and source import

Reviewed source import is a conditional extension. The [academic-access study](UNIVERSITY_INTEGRATION.md) does not establish an available or approved source. The [screenshot design](QUICK_IMPORT.md) is retained for a demonstrated future need, with no scheduled stage. The filtered native sharing format below remains optional and separate from required private recovery.

Any later user-chosen screenshot, approved source response or separately enabled native file needs validation, preview and confirmation. A file or read-only retrieval produces a snapshot. A refresh or continuous update requires its own scope, permission, change handling and tests; none is promised by the local release.

Timetable sharing and full backup have separate actions and formats:

| File | Contents | Purpose |
|------|----------|---------|
| `*.cadence-timetable.json` | Selected semester, periods, selected courses/rules and explicitly selected exceptions | Share a timetable |
| `*.cadence-backup.json` | Local courses, plans, tasks, exceptions and exportable settings; no credentials | Restore private data |

Show course names, rooms and teachers in the sharing preview. The timetable format always excludes private notes, personal plans, tasks and completion state. Adding fields later requires an explicit format/UI change. School-source fields also obey their retention and export permission.

Optional native timetable-sharing import: choose file → validate version and size → preview semester, periods, courses and exceptions → choose a new semester or map to an existing one → review conflicts and duplicates → commit in a transaction. This is separate from screenshot recognition and academic access. Do not replace existing periods automatically. Different periods need explicit mapping or a new semester. A changed week anchor previews date/exception remapping before confirmation.

Files include export and source-record IDs. Allocate new local IDs on timetable import and keep source mappings. Skip already imported records when the same file is repeated. Names alone do not identify a course. A changed file needs another preview; the first version does not silently merge updates or delete local courses.

Validate backup format, references and version before full restore. In local-saving mode, create a current backup before transactional replacement; temporary-mode import stays in memory under [APPLICATION.md](APPLICATION.md). Failure preserves original data. The first JSON export is unencrypted; explain this before export. Application-level encryption is deferred. Even a timetable file may reveal a person's location. Users choose when and where to save or send files; the basic flow uses no Cadence server. Exclude school passwords, tokens and sessions from every export. Restoring a backup does not restore login.

Do not promise that uninstall removes desktop data. Offer the data location and an explicit clear-local-data action. Updates must not overwrite user data directories.

## Optional browser-local version

Keep the existing static concept site. The Web planner is a planned free browser-local application, with explicit storage choice, quota/eviction handling, export/restore, tab coordination and tested reload behavior. Browser-local storage does not imply cloud backup. Follow [FREE_EDITION.md](FREE_EDITION.md); no school interface is involved.

## Technology and implementation limits

Keep Flutter shadcn_ui and the shared theme; integrate controls gradually. Introduce one drift/SQLite adapter with saving. Add Riverpod only if ordinary state sharing becomes hard to maintain. Establish manual editing, date rules, storage and recovery. Reuse these rules on Android while testing file access, storage and lifecycle separately. Add an import draft, parser or OCR bridge only when that extension is selected and its scope is clear. No CSV prerequisite, unused package or empty layer is needed.

Complete local behavior first. Later platform storage and any separately approved identity service use the application boundary, but no account service, network layer or sync queue belongs in the core by default. Browser storage, lifecycle and file handling need separate acceptance. Until sync is implemented, transfer between devices uses explicit backups rather than a shared live database file.

Reminders remain separate work; see [NOTIFICATIONS.md](NOTIFICATIONS.md) for permission and platform limits. Closed-process reminders require native acceptance. Academic-access research and implementation remain deferred. Do not start screenshot work without demonstrated need. Connect any later import to real records only after explicit editors, validation and recovery are ready; see [EDITING.md](EDITING.md) and [QUICK_IMPORT.md](QUICK_IMPORT.md).

Treat locations, private plans and backups as sensitive. Minimize fields, validate untrusted input, isolate credentials where used, redact diagnostics and test deletion/recovery. A later backend needs object-level authorization, session security and cross-user isolation. These are requirements, not implemented safeguards; see [SECURITY.md](SECURITY.md). Architecture and data constraints are in [ARCHITECTURE.md](ARCHITECTURE.md) and [DATABASE.md](DATABASE.md).

Academic access is a conditional [feasibility study](UNIVERSITY_INTEGRATION.md), not an implementation instruction. Prefer a school-approved read-only API or calendar feed if offered. Obtain the interface, permitted fields and authentication requirements before planning a connected pilot. Do not implement from historical notes or collect school passwords.

## Delivery and acceptance

1. Follow [LEARNING.md](LEARNING.md) one small learner-written feature at a time. Establish local/temporary choice, confirmed saving, restart recovery, failed-save input retention, private backup and clearing. Review phone concepts during local work. Academic-access feasibility is deferred.
2. Build the first working Windows flow around direct in-app editing: bounded weekly entries, Today/Week and individual time/room/cancellation corrections. General tasks, deadlines, available-time inspection and explicit personal plans are equally required. Do not require a CSV file, screenshot parser or semester setup.
3. Trial the manual planner, repair important failures and prepare its tested Windows release. School approval and screenshot support are not release gates. A separate mock academic-source prototype must use clearly labelled fictional data; a connected pilot needs documented permission, a real interface and separate acceptance.
4. Adapt the shared local flow to Android, testing phone readability, touch, safe areas, file access, local saving, restart and recovery on a native target. Do not wait for complete macOS/Linux releases. Validate iOS when the necessary host and devices are available.
5. Validate retained desktop targets and later Web separately. Publish only tested platforms with recovery and support guidance. Review cloud sync and optional ads only after store launch. Reconsider screenshots only if observed unmet entry effort justifies the separate work.

The learner continues Windows lessons and builds the shared flow in small steps. Phone design can proceed during desktop work; academic-access research remains deferred. Use fictional or permitted anonymized data and state real limits. No application code, external application submission or school connection is authorized by this document update.

Acceptance means tested behavior works on the target system, not that a folder exists or a build succeeds. See [ROADMAP.md](ROADMAP.md) for stages and estimates.

Core example: choose local saving, add a meeting, a personal appointment and a task, then restart without a network. Today and Week show confirmed plans; task completion updates the same count/list. Export a private backup, test a rejected invalid import and recover the valid backup without an account.

Timetable example: enter a weekly class directly, save it, then move one Monday occurrence to Tuesday evening and change its room. The original disappears, exactly one replacement appears, and a simultaneous dinner shows a conflict. Cancel and restore that occurrence without changing the rest of the series. Check the same dates in phone Today/Week. Optional source import, screenshots, odd/even patterns and filtered sharing need their own later checks if enabled.
