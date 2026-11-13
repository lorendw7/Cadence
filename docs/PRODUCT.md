# Product scope

Updated: 2026-11-13. Cadence is a **local time-management and planning app for work, study and daily life**. Tasks, deadlines, personal plans, Today and Week are central. Direct editing is the first delivery route. Optional approved timetable access could later reduce setup work. Clear phone views make the same information easier to use during the day.

[ADR-013](adr/013-local-planner-and-conditional-academic-access.md) retains general planning and phone access, defers screenshots until needed, and defers school access to a later extension. Build the complete flow on Windows, then adapt and validate Android without waiting for all macOS/Linux releases. Other platforms keep separate acceptance gates.

## Current state

The teaching app supports validated task addition, completion, empty-list feedback, deletion and latest-delete undo in memory. Saving, calendars, import, occurrence corrections and phone support are not implemented. The website is a concept presentation. [LEARNING.md](LEARNING.md) owns actual progress and pending manual checks.

The learner writes core features through small lessons in lib/main.dart. The assistant maintains delegated documentation, artwork and website work, teaches and reviews. A priority change does not complete a lesson or authorize feature code as documentation work.

## Problem and value to test

A person needs to see commitments, understand available time, choose what to work on and revise plans when circumstances change. Cadence brings classes, personal appointments and work sessions into one local view, with tasks and deadlines beside them.

The main loop is **record commitments -> inspect Today and Week -> reserve work time -> act and adjust -> review remaining work**. A report due Friday is a task. Thursday's writing session is a plan. Moving the session does not change the deadline or complete the task. Planned time does not measure actual work. Direct entry serves this loop first; any later import joins it after review.

A timetable is one input, not the whole product. Work, errands and personal time need no course, school identity or semester. A brief daily review is optional; no compulsory ritual, streak or productivity score is required.

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

The maintainer adopted easier setup and phone access, while retaining general time management and Windows development first. The latest decision makes direct editing the first delivery route and school access a deferred extension. Screenshot import has no scheduled milestone. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) records that selection. The survey did not test generic work/life planning or personal cloud sync; test those needs separately. The [competitor review](COMPETITIVE_REVIEW.md) supplies bounded workflow ideas, not proof that users will switch.

## Design decisions at a glance

| Question | Accepted direction | Evidence needed next |
|---|---|---|
| Who is it for? | People managing time across study, work and daily life; timetable users are the initial research group | Concrete planning examples outside classes |
| What is the main benefit? | Less entry, clear commitments and useful planning of available time | Lower total setup effort, correct dates and a routine completed without help |
| What is developed first? | The shared local flow on Windows, with direct editing and general planning | Saving, date rules, corrections, recovery and a usable Windows package |
| When does phone work start? | After the working Windows flow; Android first for practical validation | Real-device file, storage, lifecycle, touch and readability checks |
| Why would it need a server? | Later optional personal sync; a school connector only if an approved protocol requires one | Separate costs, data permissions and operating duties for each service |
| How is access funded? | One free feature set; ads are possible later income | Supported placements, acceptable user impact and actual revenue |

## Feature priorities

P0 is the foundation before real private data. P1 is the first useful product on Windows. P2 adapts that flow to phones and other targets. P3 is later work. These priorities are not release claims or paid tiers.

| Priority | Work | Purpose |
|---|---|---|
| P0 | Local/temporary choice, confirmed saves, task editing, date validation, backup/restore and clear | Protect records and make failures recoverable |
| P1 | Personal appointments, bounded repeats, task deadlines, Today, Week and visible free intervals | Keep time management central beyond classes |
| P1 | Clear times/rooms and one-occurrence time/room changes, cancellation and restoration | Keep repeating commitments useful when plans change |
| P1 | Windows flow, three-language controls, keyboard access and readable compact layouts | Develop desktop first while preparing phone presentation |
| P2 | Android adaptation, manual backup transfer, native recovery and touch checks | Deliver phone use without waiting for every desktop release |
| P2 | iOS, macOS/Linux and Web in bounded stages with suitable hosts and devices | Reuse shared rules while testing platform behavior |
| Later extension | School research, application and read-only timetable access, only if selected later | No current milestone, application task or release dependency |
| P3 | Optional screenshot import, reminders/review summaries and advanced scheduling | Add only from observed need; no scheduled screenshot milestone |
| P3 | Google personal sync and possible ads, reviewed after store launch | Keep recurring service work out of local delivery |

Build useful direct editors first. Screenshot recognition and CSV/table import are not first-release requirements or prerequisites for phone support. Reconsider either only if actual users need it. School research and application preparation are deferred alongside integration. Revisit them only when a later scope decision selects the extension. Do not automatically replace a delayed school connection with an OCR project.

## First useful local product

This baseline is implemented on Windows first, then adapted to phones. Every planned behavior needs acceptance under [ROADMAP.md](ROADMAP.md).

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

## Platforms and visual direction

Use one Flutter codebase. Share models, date rules, validation and application behavior. Introduce import drafts only when an accepted source requires them. Windows gets the first complete flow. Design compact layouts alongside desktop views, then validate Android. iOS needs its own host/device and release work. macOS/Linux native validation and Web follow bounded plans. A narrow Windows window is not a tested phone client.

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
| Advertising | Later platform-specific review; no forced ads or capacity unlocks |

Drag scheduling, automatic scheduling, linked task/session automation, complex projects, habits, focus timers, custom categories, a month view, persistent drafts and encrypted storage are not first-release requirements. Explicit task and plan editing comes first.

<a id="removed-connections-and-independence"></a>

## Conditional connections and independence

School-access feasibility and application preparation are deferred under ADR-013. No application, permission, usable API or school login is confirmed. [The connection study](UNIVERSITY_INTEGRATION.md) owns the questions and gates. Prefer an official read-only API or calendar feed if the school offers and approves it. Start with a user-requested snapshot, review and save; continuous change tracking needs a separate contract and acceptance.

School passwords, logged-in scraping, course-registration writes, grades and other students' data stay outside this plan. Google identity for personal sync does not grant school access. Local retention, backup and cloud transfer of school data must each be permitted. General releases do not wait for school approval.

## Free edition and open source

Continue under the existing [MIT license](../LICENSE). Everyone receives the same free feature set. There is no paid tier, subscription, paid expansion or paid priority. Any future cloud service uses the same published quota rules for everyone. Ads are the only possible future revenue model and do not unlock features or capacity.

Local planning, import and recovery remain useful without ads or a service. [ADR-011](adr/011-optional-sync-service.md) retains the later backend and **JPY 2,500 monthly** planning budget. Implementation and operation wait for review after store launch. The figure is not a purchase, hard billing cap or capacity promise.

## First-release limits

State supported date rules before release and name import formats only if that capability is actually included. Minimum occurrence correction is included; a complete academic management system is not. One workspace, one timezone, explicit saves, memory-only drafts and unencrypted backups remain the baseline. No required accounts, live collaboration, screenshot recognition or automatic school updates are promised in the first local release.

## Success and exclusions

Success is a complete routine: record commitments, understand available time, reserve work before a deadline, find the next commitment, correct a change, restart and recover a backup without developer help. Test study, work and personal examples. Measure setup/correction effort, lookup speed and voluntary return use.

Publish only tested features and platforms. Store acceptance, native runtime checks and useful planning are distinct from passing builds. No questionnaire count proves retention, advertising income or a sustainable hosted service.
