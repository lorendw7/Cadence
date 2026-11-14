# Product design

The limits in [ADR-008](adr/008-small-free-local-product.md) still apply: one workspace, explicit Save, memory-only unsaved forms, ordinary SQLite and private unencrypted JSON backups. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) refines the earlier import direction: deliver direct general planning and phone access, defer academic-access research and implementation, and add screenshot import only if later need justifies it. Minimum recurring-entry corrections remain in the baseline; advanced course rules remain conditional.

Updated: 2026-11-15. Status: staged product plan under [ADR-007](adr/007-general-purpose-local-planner.md), with Android self-use first under [ADR-015](adr/015-android-self-use-first.md). The bounded desktop focus offer from ADR-014 is later work. The teaching app supports in-memory task input, validation, addition, completion, empty-list feedback, deletion and single-level undo. Saving and schedule views are not implemented. Current acceptance and pending manual checks live in the [learning log](LEARNING.md). The product keeps the selected shadcn_ui direction under [ADR-008](adr/008-small-free-local-product.md). The website shows concepts.

## Purpose and scope

Cadence is a local time planner for everyday work, personal life, study and other commitments. Personal plans and tasks are the core. It helps answer three questions: what is happening today, when there is time this week, and what needs to be finished. No account, school, organization or semester is required. The paper-and-ink identity is independent and uses ordinary daily examples, not an institution's brand.

The core loop is to enter commitments, inspect available intervals, choose work and reserve an explicit plan, use Today, then adjust plans without changing task deadlines. General time management and phone viewing guide the first useful product. Any later timetable import joins the same loop after review.

Keep desktop, Web, Android and iOS as targets under [ADR-010](adr/010-open-multiplatform-free-first.md). Use Windows as the development host and retain desktop regressions. Build shared saving and recovery, then validate direct editing and Today/Week on the Android self-use target. A complete Windows release, desktop focus, music and Steam are not prerequisites. Validate iOS when a native host and devices are available. The [free-edition design](FREE_EDITION.md) and [ROADMAP.md](ROADMAP.md) own platform gates. Existing platform folders do not prove support.

An official read-only academic API or calendar feed is a deferred option under [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md), including feasibility research. Availability and permission are not established; no school login, scraping or connection implementation is approved. Direct in-app editing is the delivery baseline. Users do not need to create a table or supply a screenshot. Cloud sync and optional ads remain for review after store launch. Follow ADR-014 for private-development status and desktop purchase validation; LICENSE remains MIT. Desktop and Web stay ad-free; only mobile may pilot ads later. The desktop focus stage follows the Android self-use milestone and has separate lifecycle checks. The first Android trial is ad-free; a later mobile ad pilot needs a useful mobile release and an ad-free usage baseline. Keep Flutter shadcn_ui, wine #7C394B, pure white #FFFFFF and graphite text; see [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md).

Core planning needs no account, backend or runtime network connection. Any later academic retrieval is an optional network action; saved permitted snapshots must remain useful when disconnected. Do not require login, connection setup or a semester wizard before the first task or personal plan. Screenshot recognition has a separate conditional design and does not add a first-release dependency.

Personal plans have their own editing and repeats. Tasks may have deadlines, but a deadline does not reserve a calendar interval. Imported timetable entries join the same views without owning general task onboarding. Ask for a term range or period table only when the selected input needs it.

Excluded from the first planning baseline (before the bounded Android focus phase in [ROADMAP.md](ROADMAP.md)): required accounts, live collaboration, automatic cloud sync, advertising, billing, habits, payroll and focus tracking. The next Android phase adds only the accepted task-linked countdown and modest local session history after reliable planning and initial self-use. The later desktop package remains separate. External calendar or academic retrieval needs separate approval, scope and acceptance; it is not a local release gate. Screenshot recognition is optional and unscheduled under [QUICK_IMPORT.md](QUICK_IMPORT.md). CSV/table import is deferred unless useful real export files justify it. Cloud AI is not a dependency. School-password collection, academic scraping and enrollment/grade operations remain excluded. [CLOUD_SYNC.md](CLOUD_SYNC.md) defines the accepted later personal-sync design; its implementation remains deferred.

## Direction after the timetable survey

The user selected easier timetable setup and phone viewing in [ADR-012](adr/012-import-first-phone-planner.md), informed by the small [timetable survey](SURVEY_FINDINGS.md). [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) made direct planning the baseline and screenshots optional. [ADR-015](adr/015-android-self-use-first.md) now puts Android self-use first because the maintainer has a phone for daily use. This does not turn the timetable survey into Android or purchase evidence. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) keeps the alternatives and tradeoffs. Conditional academic-access research does not approve a connection or prove broad demand.

Prioritize a complete flow: choose storage, directly enter fixed commitments, inspect Today/Week, then reserve time for a task and adjust it as needed. Repeated classes need individual corrections whether entered manually or imported later. On a phone, put the current or next commitment with time and optional room/location above the agenda; it may concern study, work or home. Keep title-only task capture and independent personal plans. Compare the planning loop with a person's current method; the [competitor review](COMPETITIVE_REVIEW.md) supplies references, not demand evidence. An optional future input route must reduce total setup effort after review and correction.

## First use and saving

On first use, offer **Save on this device** and **Temporary use**, explaining restart behavior. Until the user chooses saving, keep business data in memory. A previous explicit choice may be remembered. Temporary mode does not read an existing private database or write business data, recovery drafts or automatic backups.

Explicit export is a separate action. Switching back to temporary use must explain whether the saved copy is kept or cleared. Never silently merge or overwrite memory and saved copies. Show saved status only after confirmation; preserve input and offer retry on failure. See [application contracts](APPLICATION.md) and [visible states](UI_ARCHITECTURE.md#saving-and-connection-states).

## Representative use and wider release

Start with the maintainer's Android self-use because no external testers are available. Once shared saving and recovery are accepted, use ordinary tasks and plans for two weeks and record friction privately. Before that gate, use fictional data. Add voluntary external trials when people are available, including people using assistive technology. Record what was actually tested. One developer's routine does not establish broad usability, demand or advertising income.

- Test meetings, appointments, errands, personal projects and study plans without creating a semester or account.
- Locations are optional plain text. Automatic travel-time calculation is not a first-stage claim.
- Give Japanese, English and Chinese equal behavior in onboarding, errors, previews and privacy text. Test keyboard access, screen readers and large text.
- New users should be able to choose storage, add plans/tasks, inspect their week and restore a backup without developer assistance.
- Before wider release, assign support, maintenance, recovery, upgrades and eventual handover. Do not promise user counts or response times without evidence.

## Pages and interaction

The [local product baseline](PRODUCT.md#first-useful-local-product) defines the required features. Windows remains the development host; Android is the first self-use target. Use title-first capture, readable Today and a selected-day Week agenda on the phone. These are specifications for future lessons, not new application behavior.

Keep **Today / Tasks / Week** in fixed left-to-right order in the Android bottom navigation. The existing desktop study can retain its earlier Today / Week / Tasks sidebar order; this changes layout, not record ownership. Show Import only after a route is implemented and accepted; no placeholder is needed. Phones use compact navigation, a readable daily agenda and a selected-day list within Week. Wide windows retain the light sidebar, two-column Today and seven-day calendar with a collapsible task tray. Settings stays secondary. Course management and Weekly Review do not need extra main tabs. See [the layout specification](UI_ARCHITECTURE.md#pages-and-navigation).

On Android, Today and Tasks offer New task above the bottom navigation; Week offers New plan for the selected day and a secondary Task action. A global New menu on wide windows offers only implemented entry types, named Task and Plan. A simple task needs only a title; date and notes are optional. If Import is added later, keep direct entry available. Course-specific context appears only when needed by a timetable. Completion uses a checkbox; selecting the title opens editing once the editor exists.

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

### Three-view planning walkthrough

Written design revision: 2026-11-15. This pass refines Today, Tasks and Week without changing app or prototype code. The [reference mapping](COMPETITIVE_REVIEW.md#three-view-reference-mapping) records the official observations. The [screen rules](UI_ARCHITECTURE.md#shared-rules-for-the-three-views) own layout, controls and return behavior. Existing HTML samples cover only the interactions listed in their handoff; they do not demonstrate all the new written states below.

Use this fixed fictional example when comparing designs: Thursday, 12 November 2026, 09:30 in Asia/Tokyo. A Design review is scheduled for 10:00-11:00 in Meeting room B. The existing task Send the report has a deadline of Friday, 13 November at 17:00. The person adds Choose a weekend book during the capture step below. These are design fixtures, not records to insert into the application.

| Step | Person's intent and action | Expected screen and meaning |
|---|---|---|
| 1. Check the morning | Open Today and find the next commitment | See Design review, 10:00-11:00 and Meeting room B without opening details. The report's future deadline is in Tasks, not counted as due today. |
| 2. Capture a thought | Use New task to record Choose a weekend book with only a title | A confirmed result identifies No date. Today keeps its current context and offers a route to the task. No deadline or work interval is inferred. |
| 3. Inspect the obligation | Open Tasks and inspect Send the report | Read the full Friday deadline. Opening details does not change completion or create a calendar block. |
| 4. Find room for work | Open Week, select Thursday, then open its task tray | Keep Thursday's agenda visible and the report's Friday deadline available as context. The tray does not claim to know which tasks are already scheduled. |
| 5. Reserve an interval | Choose Create work plan for the report and set Thursday 13:00-14:00 | Review the title, date and interval before saving. After confirmation, Week shows a separate plan. The task remains incomplete and due Friday at 17:00. |
| 6. Adjust the day | Open that plan and change it to 13:30-14:30 | Today and Week show the new interval after confirmation. The task deadline is unchanged. Returning preserves the selected Thursday and the browsing context. |
| 7. Review a failure | Repeat the time edit with a simulated failed save | The editor keeps the proposed values and a retry path. The confirmed plan keeps its old time. Back uses the existing changed-form choices. This is a review state, not proof of working recovery. |
| 8. Finish the obligation | Mark the report complete explicitly in Tasks | Relevant task groups and counts agree. The reserved plan remains a plan; it is not deleted or converted into measured work. Reopen remains available from Completed. |

For the failure branch, start again from the confirmed 13:00-14:00 plan before attempting 13:30-14:30. Keep the two times visibly distinct in the review. Test local-saving and temporary wording separately: Saved on this device and Kept for this session have different promises under [EDITING.md](EDITING.md).

The later focus phase may add a recorded timer duration to this example. That duration stays separate from both the report deadline and the reserved interval. This design pass adds no focus page or extra navigation destination.

#### Review the design without writing code

Make three low-detail screen sketches from this example, then show the editor and its return state. Use paper or a design tool. Start with content order, control labels and results; apply the existing white, graphite and wine style after the flow is understandable. Reuse the same fixture across drafts so changed sample data does not hide a design problem.

| Review prompt | Evidence to note | Initial target, still unverified |
|---|---|---|
| Find the next commitment on Today | Correct title, time and location; hesitation or extra navigation | Correct answer within five seconds at ordinary text size |
| Record an undated thought | Required fields, actions, help needed and ability to find it again | Title-only capture within ten seconds in an interactive version; a paper review can only check the steps |
| Reserve work time from Week | Selected date, copied context and explicit confirmation | No mistaken date, accidental duplicate or belief that the deadline moved |
| Move the work plan | Person explains the changed interval and unchanged deadline | Correct explanation without coaching |
| Recover from a failed save | Person identifies the retained draft and original confirmed record | A clear retry or cancel path without re-entering the title |

Add variants for an empty day with existing tasks, an empty selected day in a busy week, no open tasks but completed records, overlapping commitments, a long translated title and 200% text. Every variant needs a useful next action and a clear return path. Keep large-text checks separate from ordinary-size timing targets.

Record findings as Observed, Proposed change and Still untested. Until another person can review it, the maintainer can walk through the sketches and record uncertainty, but this is self-review rather than a usability study. No paid tester, store account or recruitment work is needed for this documentation step. Native storage, Back, keyboard and lifecycle acceptance remain separate future checks. Core rules and representative Flutter implementations remain learner-owned.

### Android self-use priorities

The first target is a safe daily planning routine on the maintainer's phone. These priorities guide the learner's small implementations; they do not implement new application behavior.

The concrete [phone composition](UI_ARCHITECTURE.md#android-screen-composition) uses a stable Today / Tasks / Week bottom bar. Today and Tasks keep New task within thumb reach above that bar; Week starts a plan for the selected day. Settings stays secondary. Editors and the later focus screen are routes from these pages, not extra permanent tabs. Keep one clear primary action in each context.

| Priority | Phone design | Acceptance question |
|---|---|---|
| Data safety first | Explain local saving versus temporary use, keep explicit Save and show confirmed or failed writes | Can the person restart and recover confirmed records without mistaking an unfinished form for saved data? |
| Fast capture | Require only a task title; reveal optional deadline and notes without a project or category setup | Can the person record a task with the on-screen keyboard and find it again? |
| Today | Show the current date, next commitment, readable agenda and separate due/overdue/undated task groups | Can the person find the next action and its time or place without opening multiple screens? |
| Week | Use a date selector and selected-day agenda; keep all-day plans separate and tasks reachable | Can the person reserve an explicit interval without changing a task deadline? |
| Native editing | Keep Save/Cancel above the keyboard and follow the dirty-form contract on Android Back | Can the person cancel, return or recover after interruption without losing confirmed work? |
| Daily use | Retain the independent journal style, readable text and three product languages; keep ads and focus media absent | Does the phone routine remain usable offline and at large text sizes? |

Use the same fictional task to review the full phone journey: choose local or temporary use, record a title, add an optional deadline, reserve a separate plan in Week, and return to Today. Then inspect a failed save with the draft still present. In the later focus phase, open Start focus from that task and review its recorded duration without changing completion. Review empty screens as carefully as populated ones; never invent a commitment or success state to fill space.

The quality target is a coherent daily tool: consistent spacing and action emphasis, dates that agree across pages, clear storage state, readable translated text and predictable return paths. Apply the [Android quality checks](UI_ARCHITECTURE.md#android-quality-acceptance) for touch size, 200% text, TalkBack, keyboard, Back, failure states and measured response time. None of those checks passes because a mockup looks polished. The first representative widgets, state changes and lifecycle decisions remain learner-owned.

### Android focus after the first planning trial

Roadmap stage H is the next planned Android phase after reliable planning and initial self-use. Keep **Today / Tasks / Week** as the fixed Android bottom navigation. Expose Start focus on the chosen task only when implemented. Carry the task title into one countdown; do not ask for another title, a daily pin or a reserved time block.

Provide explicit start, pause, resume and end actions, plus a manually started break. Show a modest local session list with the task label, recorded timer duration and truthful save status. Finishing a countdown does not complete a task or move its deadline. Recorded duration is not proof of attention. Temporary mode keeps its existing retention limits.

The learner must define and test screen lock, background/foreground transitions, interruption, process death, clock changes, duplicate callbacks and save failure. Do not promise closed-app alarms or uninterrupted background counting without native acceptance. The initial phone phase needs no desktop compact window, daily pins, music player, scene or school connection. Keep ads outside active focus and all core editing. This scope does not delay the first safe planning trial or implement a timer in the current lesson.

### Android return use and optional review

Design proposal, 2026-11-15. Improve the accepted routine before adding modules. The [competitive goal](PRODUCT.md#competitive-goal-for-android) is a dependable local planner with short actions and readable dates. A journal-style screen and a timer are not evidence of an advantage by themselves.

| Moment | Proposed interaction | Evidence to seek |
|---|---|---|
| A thought arrives | A visible title-first capture action in Tasks; optional details stay secondary | Save the sample title without choosing a category or date |
| The person checks the day | Today leads with the next commitment, time and location, then due work | Identify the next action without opening each row |
| A deadline needs work time | Week keeps the selected date, recorded gaps and task context available | Reserve a separate plan without changing the deadline; record repeated-entry friction |
| A plan changes | The editor states whether the change affects one occurrence or the series | Correct one time or room without changing other dates or losing context |
| Work begins | Start focus from the existing task, with no required plan or extra title | Reach the countdown in at most two actions using the default duration |
| The person wants to review | An optional recent-session view shows task labels, times, duration and interrupted/unsaved states | Understand what was recorded without confusing timer time with proven attention |

Keep Today, Tasks and Week as the phone's main destinations. Reach recent sessions from the focus surface and a secondary menu. Do not add a fourth advertising or statistics tab. Review must remain useful without ads. Do not open it automatically after a task save or timer completion, and do not add a badge, streak or notification to increase ad visits.

The initial self-use and public core remain ad-free. A later review-screen pilot follows [the placement proposal](FREE_EDITION.md#review-screen-ad-proposal). Compare one separate slot after brief useful record context and before detailed history with the original end-of-review slot. Keep return controls available and away from the creative. Do not place ads between individual records or style them as tasks, recommendations or messages from Cadence. The same daily routine must remain available when the person never opens review. More natural review visits are a usefulness hypothesis, not a reason to route users through this screen.

Measure the [existing workflow targets](VALIDATION.md#android-workflow-benchmark) and repeated outside-tool workarounds. Prioritize a needed reminder, search or widget through the existing later-gap review. Broader themes, music, automation and cloud sync do not enter the Android baseline through this design proposal.

### Desktop design priorities

Retain this wide-layout specification for later desktop acceptance. It does not gate the Android self-use milestone.

| Area | Later desktop design | Deferred choice |
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

### Planning-to-focus design review

This review retains the later [bounded desktop candidate](DESKTOP_V1.md). Android uses the smaller focus scope described above after its first planning self-use milestone. The desktop additions are not phone prerequisites or current teaching-app behavior. The existing planner study covers planning only. A separate fictional focus demonstration cannot establish a working timer or saved records.

| Surface | Proposed change | Check with a person |
|---|---|---|
| Today | Keep the date, next commitment and due groups readable. Put Start focus beside the chosen task; reserve strong emphasis for that action. Daily pins are optional. | Start on an existing task without visiting Week, Settings or a pin editor. |
| Week | Keep the task tray and explicit plan editor. Opening from a task may copy its title into the draft; confirm the interval separately. | Move a work block and explain why its task deadline and completion did not change. |
| Focus | Keep the same task title and a clear countdown. Put duration choices nearby, with music secondary and silence fully usable. | Begin without entering a second title or choosing a track. |
| Compact mode | Keep current task, time, pause/end and mute in the same window. Retain a visible return to the planner. | Identify the task while working in another app, then return without a second timer. |
| Review | Show this session first, then the small local history. Label recorded timer time separately from planned time. Keep task completion an independent action. | Explain that a finished timer does not prove attention or finish the task. |
| Saving feedback | Keep the selected storage mode and confirmed/failed save status near the affected record. Never cover an error with artwork or a success animation. | Tell whether a session is saved, pending or temporary, and find the recovery action. |

The shortest path is **choose a task -> Start focus -> compact view if useful -> review**. Reserving time, pinning, music and a break are optional branches. Preserve the journal typography, white canvas, wine actions and readable panels. Keep the existing room illustration on the focus surface; do not let it displace task controls. No extra navigation destination, onboarding ritual, productivity score or content purchase is needed.

Use the same fictional task in each view. As proposed usability checks, seek a first focus start within one minute of opening the prepared task list, and no repeated title entry, unintended task completion or lost deadline context. Include an undated, unpinned task. These are test criteria, not measured gains. Timer, storage and lifecycle rules remain learner-owned lessons; a mockup does not close their release gates.

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
2. Build the shared direct-editing flow and validate it on Android: tasks and optional deadlines, personal plans, Today and a selected-day Week agenda. Add bounded repeats and their corrections through the relevant lessons. Do not require a CSV file, screenshot parser or semester setup.
3. Use the safe Android build daily for two weeks, record friction and repair important failures. No external test group is available; maintainer use is not independent demand evidence. School approval, screenshot support and a complete Windows release are not prerequisites.
4. Test phone readability, touch, Back, safe areas, file access, local saving, process termination, restart and recovery on the actual Android device. Before public release, complete platform quality and applicable store testing requirements; self-use cannot replace them.
5. After reliable planning and initial Android self-use, add the bounded Android focus phase described above. Then assess public release and only later an optional ad pilot. Revisit desktop focus and purchase work separately. Validate retained desktop targets, iOS and later Web separately. Ads remain absent from the first trial and may be reviewed only after a useful mobile release and an ad-free usage baseline. Cloud sync and screenshots keep separate later gates.

The learner continues the current lesson on the Windows development host and builds the shared flow in small steps for Android self-use. Desktop regressions remain useful; academic-access research remains deferred. Use fictional or permitted anonymized data and state real limits. No application code, external application submission or school connection is authorized by this document update.

Acceptance means tested behavior works on the target system, not that a folder exists or a build succeeds. See [ROADMAP.md](ROADMAP.md) for stages and estimates.

Core example: choose local saving, add a meeting, a personal appointment and a task, then restart without a network. Today and Week show confirmed plans; task completion updates the same count/list. Export a private backup, test a rejected invalid import and recover the valid backup without an account.

Timetable example: enter a weekly class directly, save it, then move one Monday occurrence to Tuesday evening and change its room. The original disappears, exactly one replacement appears, and a simultaneous dinner shows a conflict. Cancel and restore that occurrence without changing the rest of the series. Check the same dates in phone Today/Week. Optional source import, screenshots, odd/even patterns and filtered sharing need their own later checks if enabled.
