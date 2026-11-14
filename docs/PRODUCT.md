# Product scope

Updated: 2026-11-15. Cadence is a **local time-management and planning app for work, study and daily life**. Tasks, deadlines, personal plans, Today and Week are central. Direct editing is the first delivery route. Optional approved timetable access could later reduce setup work. Clear phone views make the same information easier to use during the day.

[ADR-015](adr/015-android-self-use-first.md) makes the ad-free Android self-use edition the first delivery target. Windows remains the development host. Shared saving and recovery come first, followed by direct planning and native phone checks in small slices. Desktop focus, music integration and the Steam purchase experiment are later work. Desktop and Web stay ad-free. School access, screenshots and cloud services remain separate later work.

## Current state

The teaching app supports validated task addition, completion, empty-list feedback, deletion and latest-delete undo in memory. Saving, calendars, import, occurrence corrections and phone support are not implemented. The website is a concept presentation. [LEARNING.md](LEARNING.md) owns actual progress and pending manual checks.

The learner writes core features through small lessons in lib/main.dart. The assistant maintains delegated documentation, artwork and website work, teaches and reviews. A priority change does not complete a lesson or authorize feature code as documentation work.

## Problem and value to test

A person needs to see commitments, understand available time, choose what to work on and revise plans when circumstances change. Cadence brings classes, personal appointments and work sessions into one local view, with tasks and deadlines beside them.

The main loop is **record commitments -> inspect Today and Week -> reserve work time -> act and adjust -> review remaining work**. A report due Friday is a task. Thursday's writing session is a plan. Moving the session does not change the deadline or complete the task. Planned time does not measure actual work. Direct entry serves this loop first; any later import joins it after review.

A timetable is one input, not the whole product. Work, errands and personal time need no course, school identity or semester. A brief daily review is optional; no compulsory ritual, streak or productivity score is required.

### Competitive goal for Android

Planning recommendation, 2026-11-15. First make the selected local routine dependable enough to use daily. Then test whether it is easier than the person's current method. Matching every feature in a mature planner is outside the Android self-use milestone. [The official-source comparison](COMPETITIVE_REVIEW.md#android-competitive-benchmark) supplies references, not evidence that Cadence has reached their quality.

The first user remains the maintainer. A later audience to test is people who manage deadlines and personal commitments on an Android phone, accept manual entry, and value use without an account or network. People who require automatic school changes, team assignment or device sync are not served by this first scope. Do not count them as satisfied by a polished local interface.

Build competitiveness through three concrete qualities:

- **Dependable records.** A confirmed save survives restart. A failed change preserves input and old data. Backup and restore work on the phone. These are basic requirements, not a claim of unique privacy or encrypted storage.
- **A short daily routine.** Capture a title, read Today, reserve a separate work interval in Week, then start focus from an existing task when stage H exists. Keep deadline, planned time and recorded timer time distinct. The baseline has no automatic task-to-plan link; measure the cost of separate entry.
- **Calm, readable presentation.** Keep the original journal identity, clear dates and locations, three-language controls, large text and reachable phone actions. Use visual polish to improve reading and correction. More scenes or music do not repair a slow or confusing core flow.

The target is comparable quality in this bounded routine, followed by a measured reason to choose Cadence. It is not full feature parity, proven demand or a revenue forecast. [VALIDATION.md](VALIDATION.md#android-workflow-benchmark) defines proposed measurements. [ROADMAP.md](ROADMAP.md#work-packages-and-review-points) keeps implementation and release acceptance separate.

### First buyer to test

This is the later desktop purchase hypothesis, not the current delivery audience. The first user is the maintainer on their Android phone. Test quick capture, daily lookup, plan changes and recovery through self-use; do not treat that use as independent demand. Desktop purchase research resumes only when that separate stage is selected.

The first commercial research group is narrower than the product's general uses: people who do substantial writing, coding or exam preparation on Windows, have real deadlines, and repeatedly switch between a task list, calendar and timer. Recruit for that recent behavior, not for liking music or being a student. The earlier timetable survey does not validate this buyer. Phone-first users who need automatic course changes are a different group.

For that later offer, test this benefit: **Choose an existing task, start work without copying its title, and return to a clear local record.** A deadline, calendar block, daily pin and music choice are optional. They must not become prerequisites for starting focus. Today, Week and Tasks remain central. This hypothesis does not add a timer or desktop package to the first Android self-use scope.

The maintainer's recovery objective includes development time as well as cash. [The full-cost model](STEAM_SALES_PLAN.md#recover-cash-and-working-time) therefore governs commercial reviews. A small cash surplus does not mean the project has paid for the work. Price, purchases and channel acceptance remain unproven.

## Three views of one plan

Each main destination answers a different question. They show the same records; changing pages never creates another copy.

| Destination | Question | Main action | Keep separate |
|---|---|---|---|
| Today | What is happening now or next, and what is due today? | Open the next commitment or act on a due task | Overdue, due today and undated task groups; all-day and timed commitments |
| Week | Where can I reserve time before a deadline? | Choose a date and create or edit a plan with explicit start/end times | Recorded commitments and gaps; task deadlines do not occupy time |
| Tasks | What still needs to be finished? | Capture a title, then add details when useful | Completion state and optional deadline; scheduling is a separate action |

An empty interval means **nothing recorded**, not a guarantee that the person is free. Keep the visible date range and workspace timezone clear. A deadline may be date-only; an appointment needs a date and interval, or an explicit all-day choice. These are different types of information, not two names for the same record.

Keep the next useful action close to its content. Tasks needs a quick title field. Today needs readable time, location and due tasks. Week needs enough room for commitments and access to tasks. A permanent statistics dashboard, project hierarchy or setup wizard would add work before this loop is useful.

The [local planner study](../assets/ui/planner-study.html) makes this proposed hierarchy reviewable. Its [handoff](../assets/ui/PLANNER_STUDY.md) separates simulated controls from future application behavior. The design is a hypothesis: verify that people can identify the next commitment, reserve time and explain the difference between a deadline and a plan. A polished preview does not establish demand or release readiness.

## Survey-informed design direction

The [survey](SURVEY_FINDINGS.md) contains ten responses per question. Phone viewing received 7/10 selections. Clearer times and rooms were the largest current pain at 5/10; less entry received 4/10. Only 2/10 explicitly accepted fully manual entry, while 4/10 required semester import. These are separate small-sample totals, not adoption or retention results.

The maintainer adopted easier setup and phone access, while retaining general time management. ADR-015 now selects Android self-use first, with Windows as the development host. That selection comes from the maintainer's available device, not an Android preference measured by the survey. Direct editing remains the delivery route; school access and screenshot import remain deferred. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) records the decisions. The survey did not test generic work/life planning or personal cloud sync. The [competitor review](COMPETITIVE_REVIEW.md) supplies workflow ideas, not proof that users will switch.

## Design decisions at a glance

| Question | Accepted direction | Evidence needed next |
|---|---|---|
| Who is it for? | General planning, with the maintainer's Android self-use as the first bounded trial | Personal usefulness and defects first; external demand remains unproven |
| What is the main benefit? | Less entry, clear commitments and useful planning of available time | Lower total setup effort, correct dates and a routine completed without help |
| What is developed first? | Safe shared tasks, then direct plans, Today and Week for Android self-use | Native saving, date rules, recovery and an installable self-use build |
| When does phone work start? | Fictional device checks early; safe task use after persistence/recovery, then planning slices | No complete Windows package, desktop focus or Steam prerequisite |
| Why would it need a server? | Later optional personal sync; a school connector only if an approved protocol requires one | Separate costs, data permissions and operating duties for each service |
| How is access funded? | No revenue assumed for self-use; mobile ads and desktop purchase remain separate later experiments | Actual use, full costs and measured receipts before commercial expansion |

## Feature priorities

P0 protects real private data. P1 delivers the Android self-use planner. P2 adds bounded Android focus, then prepares public mobile release after native acceptance. P3 is separately selected later work. These are priorities, not released features or paid tiers.

| Priority | Work | Purpose |
|---|---|---|
| P0 | Local/temporary choice, confirmed saves, task editing, date validation, backup/restore and clear | Protect records and make failures recoverable |
| P1 | Personal appointments, bounded repeats, task deadlines, Today, Week and visible free intervals | Keep time management central beyond classes |
| P1 | Clear times/rooms and one-occurrence time/room changes, cancellation and restoration | Keep repeating commitments useful when plans change |
| P1 | Android device installation, native recovery, touch, Back, text scaling and three-language controls | Make each safe slice useful on the maintainer's actual phone |
| P1 | Two-week self-use after the planning flow passes; fix loss, duplicate entry and blocked actions | Learn from real use without claiming external demand |
| P2 | One Android task-linked countdown, manual breaks and small local session history | Help start work after reliable planning; validate native interruptions and saving before broader release |
| P2 | Android public packaging, update/recovery, support, privacy and applicable store testing | Separate private installation from a public release |
| P3 | Desktop countdown, compact mode, pins, timer review and accepted existing media | Retain the bounded later Windows offer without blocking Android |
| P3 | Steam eligibility and a desktop purchase offer | Establish channel fit and purchase evidence when selected; no final price |
| P3 | iOS, macOS/Linux and Web with suitable hosts and devices | Reuse shared rules while testing each target separately |
| Later extension | School research, application and read-only timetable access, only if selected later | No current milestone, application task or release dependency |
| P3 | Opt-in local reminders, task title search and a next-plan widget | Evidence-selected Android improvements in roadmap I; none blocks the first local release |
| P3 | Optional screenshot import, review summaries and advanced scheduling | Add only from observed need; no scheduled screenshot milestone |
| P3 | Google personal sync and mobile-only ads, with separate reviews after useful releases | Do not depend on future revenue to fund a server |

Build useful direct editors first. Screenshot recognition and CSV/table import are not first-release requirements or prerequisites for phone support. Reconsider either only if actual users need it. School research and application preparation are deferred alongside integration. Revisit them only when a later scope decision selects the extension. Do not automatically replace a delayed school connection with an OCR project.

The [first public version boundary](ROADMAP.md#first-public-version-and-later-competitive-quality) distinguishes mandatory delivery from later competitive improvements. The public Android version includes the local planning baseline, native acceptance, bounded focus and release/help/recovery preparation in A-C, D, H and F. Earlier safe task-only and planning self-use milestones remain smaller. No account or runtime backend is required. Reachable support, accurate privacy/help materials and tested upgrades are part of public delivery, not optional polish. [Service readiness](ROADMAP.md#service-readiness-and-continuing-maintenance) owns continuing duties; [stage estimates](ROADMAP.md#working-estimate-at-10-15-hours-per-week) own hours and reserves.

## First useful local product

Build this baseline in the shared Flutter app and validate its slices on Android. Windows remains a development and regression surface. Safe tasks may be used before calendar and recurrence work is complete, with missing functions clearly absent. The complete planning trial includes the baseline below. Every behavior needs acceptance under [ROADMAP.md](ROADMAP.md).

| Area | Planned behavior | Current implementation |
|---|---|---|
| Tasks | Title-only capture; edit, complete, reopen and delete; optional notes and date-only/exact deadline | In-memory addition, validation, completion, deletion and latest-delete undo only |
| Personal plans | Timed/all-day appointments and work sessions; optional location/notes; bounded weekly repeats | Not implemented |
| Planning | Today shows the next commitment, daily agenda and tasks; Week shows commitments, free intervals and a task tray/list | Not implemented |
| Timetable entry | Directly create and edit a weekly class, time and room; ordinary plans do not require semester setup | Not implemented |
| Corrections | Clear occurrence/series scope; single time/room change, cancellation and restoration without duplicate display | Not implemented |
| Saving | Local or temporary choice; explicit Save; retained input on failure; restart recovery of saved records | Memory only |
| Recovery | Versioned private JSON export, validated replacement preview, safe restore and truthful clear | Not implemented |
| Access and help | Japanese/English/Chinese, keyboard/pointer access, readable scaling, storage details, version/support | Full acceptance pending |

Start with dates, times, rooms and bounded weekly recurrence. Add teaching-week or odd/even rules only when an accepted use case needs them. Unsupported patterns remain visible for correction or rejection. Do not silently simplify them. Import is outside the local release baseline; any future source must pass its own review and save checks.

Use one local workspace, one active writer and one workspace timezone, initially the system timezone. There is no commercial task limit; finite file/record limits protect reliability. Local SQLite and initial private JSON backups are unencrypted. Unsaved forms stay in memory; crash recovery of unfinished forms is not promised.

On first use, explain Save on this device and Temporary use. Temporary mode does not open an old private database or create automatic recoverable copies. Explicit export is allowed. A task or personal plan needs no login, network or semester. See [APPLICATION.md](APPLICATION.md).

## Desktop focus stage

Deferred under ADR-015. This is the later Windows candidate, not a dependency of Android self-use or the first public mobile planner. No desktop compact-window, player, scene or Steam work is scheduled in the active Android milestone. The bounded phone timer is a separate active phase after planning.

The [first-release candidate](DESKTOP_V1.md) follows the maintainer's cost-control decision: reuse existing tools and assets, with no fal top-up or paid generation. Keep one configurable focus/break countdown, compact mode in the same window, up to three daily pins, title search, local session review, one static illustrated surface and a plain option. Audition the 12 existing music drafts and ship only accepted tracks through one local player. Aim to select 8-12, but let listening quality and the actual offer decide the final count; no purchase is justified by a numerical quota. The [sales plan](STEAM_SALES_PLAN.md) defines the evidence needed before expanding spending.

Count-up, automatic cycles, named profiles, checklists, ambient mixing, extra scenes/themes, animation and Wallpaper Engine work are deferred. The purchase hypothesis is a smooth planning-to-focus routine with reliable local data and a calm presentation. Do not expand the content catalogue while that routine is unproven. [Prepared media](../assets/focus-pack/README.md) remains separate from implemented playback.

After the reliable local baseline, test this planned loop: choose a task, start a focus interval, pause or end it, take a break and review recorded timer time. Keep Today, Week and Tasks central. Do not add a large statistics dashboard or require a new daily ritual.

The learner must define timing and state transitions before implementation. Specify pause/resume, sleep, clock changes, app exit, restart, duplicate callbacks and save failure. Do not count suspended or unknown time silently. A completed timer never completes a task or moves its deadline. Logged timer time is not proof of attention. Keep uncertain or interrupted sessions visible; local/temporary storage rules still apply.

Start with one timer and a small local session history. No timer, session table, background service or notification guarantee exists yet. Confirm a bounded lifecycle and retention contract in the lesson before extending the data model or backup format. Mobile background behavior needs its own acceptance.

Wallpaper Engine is a possible post-launch integration, outside first-release work. If selected later, use documented local controls with the user's chosen installation and opt-in actions. It requires the user's own installed copy. Cadence's core planner and timer must remain useful when it is missing, stopped or fails. Test manual wallpaper changes and multi-monitor behavior before promising restoration. Do not bundle third-party wallpapers, imply partnership or promise an overlay on arbitrary wallpapers. See [official commands](https://help.wallpaperengine.io/en/functionality/cli.html).

## Platforms and visual direction

Use one Flutter codebase. Share models, date rules, validation and application behavior. Android is the first self-use target; Windows is the development host. Introduce import drafts only when an accepted source requires them. Design readable phone views and test each slice on a real device. iOS, macOS/Linux and Web need separate later acceptance. A narrow Windows window is not a tested phone client.

Desktop keeps the sidebar, wide Week and focused editors. Phone Today makes the next commitment, time and location easy to read; Tasks and Week remain first-class destinations. A next commitment may be a class, meeting or personal appointment. Keep the journal identity, wine #7C394B, white #FFFFFF and graphite text, with shadcn_ui introduced gradually.

The concept website remains on GitHub Pages. See [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md), [DESIGN.md](DESIGN.md) and [FREE_EDITION.md](FREE_EDITION.md). No second marketing site is needed.

## Optional later work

| Extension | Boundary |
|---|---|
| School connection | Deferred, including research and application preparation; revisit scope, permission and estimates only when selected later |
| Screenshot or file import | Unscheduled; add only for a demonstrated need and supported samples, with reviewed drafts and safe saving |
| Review and reminders | Local planned-time summaries and opt-in reminders; no inferred actual work or guaranteed closed-app delivery |
| Advanced course/calendar rules | Broader rotations, holiday helpers and filtered sharing beyond the first supported input |
| Personal-key cloud AI | Optional assistance; never required for import or used as an automatic fallback |
| Personal cloud sync | Google login with Node.js, TypeScript, Fastify and PostgreSQL under [CLOUD_SYNC.md](CLOUD_SYNC.md) |
| Advertising | Android/iOS pilot only after mobile release; no desktop/Web ads, forced ads or capacity unlocks |

Drag scheduling, automatic scheduling, linked task/session automation, complex projects, habits, custom categories, a month view, persistent drafts and encrypted storage are not first-release requirements. Explicit task and plan editing comes first.

### Competitive gaps to review later

These are P3 candidates, not additions to the A-C, D, H and F first-version gates. [Roadmap I](ROADMAP.md#i--later-android-competitive-improvements) records their provisional hours and later quality work. Review actual planning and focus use before selecting any one. Repair loss, incorrect dates and blocked actions first. A selected candidate needs a fresh estimate, learner-owned rules and native acceptance; no implementation is authorized by this table.

| Observed problem to seek | Smallest candidate to assess | Acceptance question |
|---|---|---|
| A recorded commitment is missed because the person does not reopen the app | I1: opt-in local reminders under [NOTIFICATIONS.md](NOTIFICATIONS.md) | Are permissions, changed or cancelled events, restart and delivery limits handled honestly on the phone? |
| Finding an existing task repeatedly takes long scrolling | I2: title search, then only a needed simple filter beyond the initial open/completed views | Do results use the same confirmed records, completion states and dates as the list? |
| Frequent app launches are only to check the next item | I3: an Android home-screen widget for the next commitment | Does it stay correct after edits and date changes, disclose stale data, and respect local/temporary mode? |

These are hypotheses, not reported defects. Prefer the smallest fix for the most frequent costly problem. Repeated task-to-plan entry is also worth measuring, but automatic linking changes the data model and is not a routine shortcut. Do not add cloud sync, AI scheduling, import, complex recurrence or more timer modes merely because a competitor lists them. Their existing deferrals remain in force.

<a id="removed-connections-and-independence"></a>

## Conditional connections and independence

School-access feasibility and application preparation are deferred under ADR-013. No application, permission, usable API or school login is confirmed. [The connection study](UNIVERSITY_INTEGRATION.md) owns the questions and gates. Prefer an official read-only API or calendar feed if the school offers and approves it. Start with a user-requested snapshot, review and save; continuous change tracking needs a separate contract and acceptance.

School passwords, logged-in scraping, course-registration writes, grades and other students' data stay outside this plan. Google identity for personal sync does not grant school access. Local retention, backup and cloud transfer of school data must each be permitted. General releases do not wait for school approval.

<a id="android-first-option-under-review"></a>

## Accepted Android self-use scope

On 2026-11-15 the maintainer explicitly selected **Android self-use first, advertising later** in [ADR-015](adr/015-android-self-use-first.md). They have an Android phone and no external trial users. Safe shared tasks lead into direct planning and Today/Week, then a lightweight task-linked focus timer or simple Pomodoro flow. Desktop presentation and Steam preparation are deferred. This is an accepted plan, not an implemented mobile release.

Start with quick task capture, a readable Today agenda and a selected-day Week view. Keep tasks, deadlines and reserved intervals separate. Preserve local/temporary choice and recovery. Reuse Flutter rules; native process termination, touch, Back and file access need real-device checks. Bounded repeats and occurrence corrections follow simple direct plans. The current checkpoint remains learner-owned; this decision adds no feature code. The [active estimate](ROADMAP.md#maintenance-and-estimates) excludes the later desktop package.

After the planning self-use check, [Android focus](ROADMAP.md#h--android-focus-self-use) adds one countdown, explicit pause/resume/end, manually started breaks and a small task-labelled local history. No music, desktop window mode, streak, score or automatic cycle is needed. Timer completion does not complete a task. Define backgrounding, screen lock, process death, unknown time and failed writes before implementation. Keep focus as a secondary route from a task rather than a fourth main tab.

Android-first does not mean ads-first. Keep the first self-use build ad-free. After a useful mobile release and an ad-free usage baseline, consider the single optional review-screen placement in [FREE_EDITION.md](FREE_EDITION.md#placement-and-data-boundaries). Ads stay outside task rows, Today/Week controls, capture, editing and active focus; ad failure or refusal must not block planning. No rewarded unlocks, required account or server is added. [The comparison](STEAM_SALES_PLAN.md#android-first-and-advertising) separates reach, revenue and store requirements. Actual order remains owned by [ROADMAP.md](ROADMAP.md).

## Free edition and open source

This heading is retained for existing links. Under ADR-015, the Android self-use core has no ads or charge. Later mobile ads and a one-time desktop purchase remain models to validate, not decided revenue or released offers. No subscription, paid capacity, paid priority or ad-based unlock is planned. All desktop packages, the concept site and the future Web planner stay ad-free.

Private development is selected. The remote visibility change remains pending because the existing GitHub Pages site must survive it. Keep the current [MIT license](../LICENSE) and notices unchanged. Private development does not retract copies already distributed under MIT. A future license decision is separate from the purchase experiment.

Local use and recovery need no Cadence account or network. If a paid desktop release is adopted, store acquisition and licensing terms must be stated separately from offline runtime behavior. [FREE_EDITION.md](FREE_EDITION.md) owns the access policy. [ADR-011](adr/011-optional-sync-service.md) retains the later JPY 2,500 monthly service planning budget; neither desktop sales nor mobile ads guarantee it can be funded.

## First-release limits

State supported date rules before release and name import formats only if that capability is actually included. Minimum occurrence correction is included; a complete academic management system is not. One workspace, one timezone, explicit saves, memory-only drafts and unencrypted backups remain the baseline. No required accounts, live collaboration, screenshot recognition or automatic school updates are promised in the first local release. The later desktop focus offer has its own acceptance stage before commercial distribution.

## Success and exclusions

Success is a complete routine: record commitments, understand available time, reserve work before a deadline, find the next commitment, correct a change, restart and recover a backup without developer help. Test study, work and personal examples. Measure setup/correction effort, lookup speed and voluntary return use.

Publish only tested features and platforms. Store acceptance, native runtime checks and useful planning are distinct from passing builds. No questionnaire count proves retention, advertising income or a sustainable hosted service.
