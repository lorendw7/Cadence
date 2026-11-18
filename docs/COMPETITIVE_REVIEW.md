# Learning from other planners

Planner workflow review: 2026-11-13. Android benchmark update: 2026-11-15. This is desk research from official product guides and pages. It is not a hands-on comparison, a market ranking or proof of user demand. The observations below describe the other products; the proposed adaptations are our own design choices to test.

Cadence's current app is an in-memory task exercise. Saving, Today, Week and personal plans are still planned. [PRODUCT.md](PRODUCT.md) owns scope, [REDESIGN.md](REDESIGN.md) owns interaction rules and [ROADMAP.md](ROADMAP.md) owns delivery gates. This review does not implement or release those features.

## Android competitive benchmark

Checked on 2026-11-15. Compare the quality of a small daily routine before comparing total feature counts. These pages describe product capabilities; they do not establish equal availability across platforms or paid plans. No competitor app was installed or timed in this review.

| Reference | Verified product pattern | Cadence's development response |
|---|---|---|
| [TickTick features](https://ticktick.com/features) | Tasks, reminders, calendar views, phone widgets and Pomodoro sit in one product. | Task, calendar and timer integration is already a category pattern. Deliver the accepted local routine reliably; reminders and widget access remain gaps to evaluate later. |
| [Todoist features](https://www.todoist.com/features) | Quick Add, recurring due dates, reminders, Today/Upcoming, organization and device sync support everyday task use. | Make title capture and finding existing work easy. A local Android edition will not replace a workflow that requires shared projects or automatic device sync. |
| [Structured getting started](https://help.structured.app/en/articles/380546) and [task editing](https://help.structured.app/en/articles/338050) | A daily timeline, undated Inbox and entry from a free slot keep time visible. The getting-started guide says its weekly view is not yet available on Android. | Test readable day selection and explicit gaps in Cadence's planned Week view. Verify the exact Android competitor version before claiming an advantage; Cadence's own Week is not implemented either. |
| [Forest overview](https://www.forestapp.cc/) | A focus timer uses growing trees and session feedback to support return use. | Make starting and reviewing a task-linked session easy. Cadence's calm journal identity is a design choice to test; a game, streak or collection system is outside the selected scope. |

The proposed position is a calm local Android planner for people willing to enter and maintain their own commitments. The combined task, plan and focus flow is not unique by itself. Offline use, recovery, readable editing and original visual design must produce an observable benefit for that person. The survey does not establish this audience, and self-use cannot establish market demand.

Use [PRODUCT.md](PRODUCT.md#competitive-goal-for-android) for the target and known gaps, [ROADMAP.md](ROADMAP.md#work-packages-and-review-points) for implementation order, and [the workflow benchmark](VALIDATION.md#android-workflow-benchmark) for measurement. A feature checklist, store description or attractive concept screen cannot close those checks.

## Reference workflows

| Reference | What its official guide describes | Possible lesson for Cadence | What to leave out of the first release |
|---|---|---|---|
| Todoist | Quick Add starts in the task-name field. The plus action reveals optional details such as a description. Its date and deadline fields have different meanings. See [Quick Add](https://www.todoist.com/help/todoist/features/use-task-quick-add-in-todoist-va4Lhpzz) and [deadlines](https://www.todoist.com/help/todoist/features/introduction-to-deadlines-in-todoist-uMqbSLM6U). | Capture a title first. Reveal deadline and notes when requested. Keep a deadline distinct from reserved work time. | Natural-language date parsing, a second task scheduling date and a global capture shortcut. These need separate language, date and platform tests. |
| Things | Today, Upcoming, Anytime and Someday organize attention by when work can be done. Its date controls distinguish a start date from a deadline. See [scheduling](https://culturedcode.com/things/support/articles/2803579/) and [date controls](https://culturedcode.com/things/support/articles/9780167/). | Show a clear daily view and keep undated work available. Explain why an item appears in each group. | Copying its entire list structure, adding projects and areas, or treating an undated task as overdue. Cadence's current design uses Today, Week and Tasks. |
| Structured | Its [getting-started guide](https://help.structured.app/en/articles/380546) puts dates above the daily timeline and keeps undated tasks in an Inbox. Its [task editor guide](https://help.structured.app/en/articles/338050) offers entry from a free slot and starts with the selected day. | Make the phone date selector and time/location easy to scan. Show the length of a recorded gap, with an explicit Add plan action that keeps its date and interval. | Requiring every task to have a time, copying the whole Inbox model, drag interaction, AI planning and duration guesses. A Cadence gap only means no commitment is recorded. |
| Morgen | Its [due-date guide](https://www.morgen.so/guides/how-to-see-due-dates-in-your-calendar) distinguishes deadline markers from working blocks. It offers task-panel and calendar actions for reserving work time. Deadline markers do not mark a calendar as busy. | Keep task deadlines visible beside Week while choosing a separate work interval. Give the person an explicit plan editor and preserve the original deadline. | Linked session automation, automatic due-date changes, external-service writeback and AI scheduling. Cadence tasks and personal plans remain independent records. |
| TickTick | Task lists show tasks, schedules and details. Calendar choices include weekly and agenda views. Its broader feature set includes habits and a focus timer. See [official features](https://ticktick.com/features). | Test the planned Week task tray beside reserved time, so a person can inspect both while planning. | Extra calendar and timer modes, habits, category systems and productivity dashboards. One bounded task-linked countdown follows reliable planning and initial Android self-use in roadmap stage H. Desktop media and compact-window features remain later work. |
| Sunsama | Its original guided planning flow reviews work, chooses tasks, checks estimated workload and finalizes the day. Timeboxing creates a calendar working session for a task. See [legacy daily planning](https://help.sunsama.com/docs/usage-guides/daily-planning/legacy/) and [timeboxing](https://help.sunsama.com/docs/usage-guides/timeboxing/). | Test a brief review of commitments and available time. A Cadence user can reserve a separate personal plan before a task deadline. | An obligatory daily ritual, automatic scheduling, workload predictions and automatic activity tracking or task/plan changes. Explicit task-labelled timer records belong to the next bounded Android focus phase and later desktop offer; planned blocks do not measure actual work. |
| MyStudyLife | Its [official overview](https://mystudylife.com/) describes classes, homework and exams together; Web, iPhone and Android access; weekly and rotating timetables; and timetable setup by typing or photo. | For timetable concepts, make time and room readable on a phone. Test direct setup first; evaluate other entry routes only against observed effort. | Photo import as a mandatory delivery stage, an AI coach and a full student suite. The overview does not establish import accuracy, school access or compatibility with this sample's files. Those need separate evidence. |

These references show useful patterns, not a requirement to match every feature. Cadence should keep its own journal-style layout, wording and artwork. The comparison does not establish that users will switch or return.

## Design refinements from this review

Reviewed again on 2026-11-13 using the official guides linked above. Todoist's Quick Add page reports an update on 2026-11-11; the Structured editor page reports 2026-09-02. This is a reading of published workflows, not a claim that every platform has identical behavior. No paid plan, account or integration was tested.

These are Cadence design choices to review in the [local planner study](../assets/ui/planner-study.html). They refine the existing scope rather than add a new release stage. The [study handoff](../assets/ui/PLANNER_STUDY.md) records which examples and interactions are actually present, with browser results kept separate from Flutter acceptance.

| Existing design friction | Reference and proposed adaptation | Review question |
|---|---|---|
| A capture action can open more fields than a simple thought needs | Use Todoist's progressive detail pattern: title first, optional deadline and notes on request. Keep a visible label and a clear close path. | Can a person record a title without choosing a date or mistaking a placeholder for saved content? |
| Repeated metadata makes short task lists harder to scan | Use Things' separation of attention and date information: keep group headings and concise deadline text. Preserve distinct overdue, due-today and undated groups. | Can the person explain each count and find undated work without reading every row twice? |
| A blank gap requires mental subtraction before planning | Use Structured's direct entry from a gap: show start, end and duration, then open the matching plan sample. Keep the statement that unrecorded time may still be occupied. | Can the person find a suitable interval and verify the editor has the same date and times? |
| Week can hide the tasks that motivated opening the calendar | Use Morgen's nearby task-panel pattern: keep a small, collapsible task tray alongside a wide calendar; use a reachable disclosure on phones. Reserve a separate plan explicitly. | Can the person inspect a deadline and an interval without losing either context? |
| A dense calendar can hide full event names and locations | Use Structured's selected-day reading path alongside the broad weekly overview. Keep a clear selected date and a readable agenda rather than shrinking seven columns onto a phone. | Can the person reach every day and read a full title and room at large text sizes? |

The proposed advantages are hypotheses. Measure completion without help, mistaken dates, lost context and unnecessary actions. Keep the same fictional routine across revisions so a more attractive screen is not confused with better task performance.

The source products make different choices about paid features, accounts and automation. Cadence's later desktop purchase hypothesis follows ADR-014. [ADR-015](adr/015-android-self-use-first.md) now prioritizes ad-free Android self-use; local saving and the independent task/plan model remain central. Keep the white-and-wine journal identity and original artwork; reuse interaction ideas rather than their branded screens.

## Three-view reference mapping

Checked on 2026-11-15 for the documentation-only refinement of Today, Tasks and Week. The maintainer requested design documents, with no code changes. The table separates published product behavior from Cadence's proposed adaptation. It adds no implementation result or release commitment.

| Official observation | Cadence design choice | Tradeoff to review |
|---|---|---|
| [Todoist Quick Add](https://www.todoist.com/help/todoist/features/use-task-quick-add-in-todoist-va4Lhpzz) begins with the task name and reveals further actions and a description when requested. | Keep title-only capture in reach from Today and Tasks. Reveal optional deadline and notes; keep populated details visible when editing. | People may miss collapsed fields. Use a descriptive disclosure label and test whether they can add a deadline without help. Natural-language parsing stays deferred. |
| [Structured's start guide](https://help.structured.app/en/articles/380546) places day selection above a timeline and separates undated work into an Inbox. | Today emphasizes the current or next commitment. Phone Week shows one selected day's agenda. Cadence keeps undated work in Tasks instead of adding another main destination. | A long agenda can hide due tasks. Add compact count shortcuts in Today and retain a reachable task tray in Week. |
| [Structured's editor guide](https://help.structured.app/en/articles/338050) supports starting from a free slot and uses the date being viewed. | A gap action opens a plan draft with that exact date and interval. A general New plan action uses the selected date and explicit time fields. | A recorded gap is not proof of availability. Explain the context and let the person review the interval before saving. |
| [TickTick's feature page](https://ticktick.com/features) describes task details beside lists, calendar views and a focus timer within one product. | Keep task context near Week planning and preserve the return path after editing. The later bounded focus route starts from an existing task. | More panels can crowd a phone. Keep the tray optional and editors focused. Additional calendar modes, habits and timer modes remain outside this pass. |

The detailed decisions live in [shared view rules](UI_ARCHITECTURE.md#shared-rules-for-the-three-views), [Today](UI_ARCHITECTURE.md#today-reading-order-and-actions), [Tasks](UI_ARCHITECTURE.md#task-list-and-capture-details) and [Week](UI_ARCHITECTURE.md#week-selection-and-planning-context). The [planning walkthrough](REDESIGN.md#three-view-planning-walkthrough) tests the same task and plan across those views. Keep those owners rather than duplicating a second screen specification here.

These are adaptations of interaction patterns, not copies of branded screens or proof of better usability. The Structured start guide still states that its weekly view is unavailable on Android. Product pages may cover several platforms and paid plans. Verify the installed version before any direct comparison, and do not claim Cadence's planned Week as a shipped advantage. No competitor app was installed, timed or purchased for this review.

## Decisions for Cadence

The following principles guide the planned shared local core and first Android self-use flow. They may also inform later concepts, but the survey does not validate general-purpose task planning or establish that these interfaces are usable.

1. **Capture before organizing.** Require a task title. Let the person add notes or a deadline when needed. Do not require a project, category, account or planning tutorial first.
2. **Explain time clearly.** A deadline says when something must be finished. A personal plan reserves time. Creating or moving one must not silently change the other.
3. **Keep the daily view readable.** Separate overdue, due-today, undated and completed tasks. Keep planned times visually distinct. Counts and lists must use the same date rules.
4. **Make recovery part of usefulness.** Show the chosen storage mode and confirmed save state. Preserve input after an error. Test restart and backup recovery before promising reliability.
5. **Let people use their own routine.** Today, Week and Tasks should work without mandatory review steps, streaks or notifications. Keep keyboard use and readable text central.

The planned local runtime must work without login or a network. The first Android self-use build is free and ad-free under ADR-015. Desktop purchase and later mobile ads remain unproven revenue hypotheses. A later optional Google account is for an approved sync service, not for opening a local task list. Advertising and cloud design must not decide what the user sees while editing a commitment. Any later service retains common published quota rules.

## Three bounded design options

This comparison records the B plus C goals from [ADR-012](adr/012-import-first-phone-planner.md), refined by [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). General planning remains central. Windows remains the development host, while ADR-015 selects Android as the first self-use target. Screenshot import is optional on demonstrated need. Authorized academic access is a deferred extension, not an approved connection. These are not three products to build. The [survey findings](SURVEY_FINDINGS.md) report 10 responses to a course-planning questionnaire. Seven responses chose a phone as the main viewing device. Five chose clearer time and room information as the main pain, and four chose less semester setup. These are separate answer totals; they do not identify the same people. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) owns the full comparison and decision process.

| Option | Main question and starting screen | Useful first routine | Tradeoff and evidence needed |
|---|---|---|---|
| A. General local desktop planner | "What needs attention, and when can it fit?" Keep Today, Tasks and Week as core functions in the shared product; Android self-use now comes first. | Capture a commitment, add a real deadline, reserve a separate work block and recover saved data. | Keeps delivery stable. This course survey does not validate work and daily-life demand, and only two respondents chose a computer. Observe those broader routines separately before claiming a market fit. |
| B. Easier timetable setup | "Can I set up my timetable with less typing?" Build direct editing first and assess possible approved input routes separately. | In an optional source prototype, inspect supplied times and rooms, correct mistakes and accept a reviewed draft. A mock source must be labelled. | Four responses required initial import before accepting manual updates; two accepted manual entry. A manual release does not meet the former condition. Study official read-only access and permission before a connected pilot. Screenshots and CSV are not required delivery steps; no scraping or live-update promise. |
| C. Phone-first timetable viewer | "Where and when is my next class?" Test a readable phone agenda and week view. | In a concept prototype, find the next room and time, view the week and inspect a manually corrected entry. | Better matches the preferred device in this small sample: seven chose a phone. This does not establish demand for an installed app or for sync. The maintainer now selects Android self-use for practical daily feedback under ADR-015. The choice does not establish Android demand in this survey. |

The competitor patterns can inform capture, daily attention and readable calendars across these options. They do not resolve the main survey tension: some responses require easier initial setup, while others require continuing course changes. The local release does not provide continuous institutional updates, and access research does not establish that a school offers them. Copying a polished planner interface would not solve that requirement.

Follow the adopted [development order](ROADMAP.md): shared saving and recovery, Android planning self-use, bounded Android focus, then public-release review and later platform or commercial work. No desktop focus package, screenshots or school approval gate the phone trial. Compare the workflow with the person's current method. Keep tasks, deadlines, personal plans and available time central; any later timetable import is one input. [PRODUCT.md](PRODUCT.md) owns implementation scope.

## Three routines to test

These are proposed walkthroughs for option A and the planned local edition. They are not survey results or evidence for choosing A over B or C. Use a prototype where the behavior is not implemented, and label it clearly. Use the import and compact-view tests in [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) to refine the adopted workflow.

### 1. Capture an ordinary commitment

Choose local saving or a temporary session with a clear explanation. Add "Return the library book" using only a title. Find it again, then add a real deadline if one exists. Confirm what will survive closing the app.

Observe whether the person can finish without help, where optional fields slow them down, and whether they understand the storage choice. Do not interpret a correct click as proof that the explanation was understood.

### 2. Reserve time before a deadline

Create "Finish the report" with a Friday deadline. Inspect Thursday's appointments and add a separate writing plan from 14:00 to 15:00. Check Today and Week. Explain which entry marks the deadline and which reserves time.

Observe whether the person creates unwanted duplicates or mistakes the writing block for completion. There is no automatic task-to-plan link in the baseline; ask whether maintaining separate entries causes real friction before proposing one.

### 3. Change a week and return later

Move an appointment without changing a task's deadline. Complete and reopen a task. In local saving mode, restart and find the confirmed saved entries. Export a backup and use a separate test copy to try the restore preview.

Observe whether changes are predictable, whether the person trusts the saved state and whether they can recover without developer guidance. In temporary mode, instead check that loss on close and explicit export are understood.

The examples span daily life, work and study. Replace the sample commitments with each participant's own non-sensitive examples when possible. Keep private notes and responses outside the public repository.

## Evidence still needed

The Forms owner summary was reviewed on 2026-11-13. It contains 10 responses to six single-choice questions. [SURVEY_FINDINGS.md](SURVEY_FINDINGS.md) records the anonymous totals and limits. The available summary does not show how one person's answers combine, and the sample cannot establish demand across students or the wider public.

Use [VALIDATION.md](VALIDATION.md) to record the next evidence:

- What the respondent currently uses and the last concrete planning failure, not just features they like.
- Which option addresses that failure with the least extra setup, and whether it improves on a screenshot, paper or an existing app.
- Whether an authorized input route exists, what setup effort remains and whether a reviewed draft would reduce it; evaluate screenshots only if a real unmet need remains.
- Whether a phone concept helps find a time and room without needing a full planning application.
- Where a person needs help, misreads a date, loses an entry or cannot recover.
- Whether the person returns for another real planning session, and their reason for returning or stopping.
- Whether sync solves a repeated multi-device problem after local use is dependable.

The survey's automatic-update questions concern changes to institutional course information. They do not measure demand for syncing a person's own Cadence records between devices. Survey preferences can select a prototype to test; they do not prove retention, advertising income or demand for a hosted service. Update the product scope only with an explicit decision after reviewing the evidence.

## Desktop focus market evidence

Checked on 2026-11-15 through official Steam pages. These are store-page observations, not audited sales, profit, market size or hands-on performance tests. English review counts are not all-language totals and can change.

| Product | Observed offer and signal | Limit for Cadence |
|---|---|---|
| [Spirit City: Lofi Sessions](https://store.steampowered.com/app/2113850/Spirit_City_Lofi_Sessions/) | Paid focus product with to-do and timer tools, music, customization and collectibles; about 9,200 English reviews and 97% positive at review time | Evidence that this broader category has paying users; not proof that a plain planner will sell or that Cadence can match its content budget |
| [Virtual Cottage](https://store.steampowered.com/app/1369320/Virtual_Cottage/) | Free base product with a focus atmosphere and separately offered music DLC; about 7,400 English reviews and 97% positive | Strong free alternative; interest in a timer does not by itself establish willingness to buy Cadence |

The inference to test is a practical Windows niche: tasks, deadlines, time blocks and focus in one quiet local workflow. Wallpaper controls remain outside the first offer. Avoid assuming that a lower price alone beats established free products. Do not infer sales with a review multiplier or treat a competitor's visible success as Cadence's revenue forecast. Use [purchase validation](VALIDATION.md#desktop-demand-and-purchase-test) before expanding.

### Steam focus products to compare

Official store pages checked on 2026-11-18. The comparison describes the features presented on those pages. The Japanese prices below are listed base prices from the fetched pages and can change. Hands-on trials remain open.

| Product | Offer shown on Steam | Question for Cadence |
|---|---|---|
| [Cozy Time](https://store.steampowered.com/app/2054740/Cozy_Time/) | Paid base app at JPY 350. To-do list, Pomodoro, music and a calendar that shows daily, weekly and monthly focus records. | Can people clearly tell when work is due, when they plan to do it and how much timer time they recorded? Test this before refining history charts. |
| [Chill Pulse](https://store.steampowered.com/app/2826180/Chill_Pulse/) | Paid base app with a JPY 580 list price. Pomodoro, to-do lists and varied focus scenes with ambient sound. | Does starting a timer from an existing deadline task save effort for someone who already uses several tools? |
| [Spirit City: Lofi Sessions](https://store.steampowered.com/app/2113850/Spirit_City_Lofi_Sessions/) | Paid base app and optional DLC. Timer, to-do list, habits, journal, music and unlockable cosmetics and creatures. | Does the plain Cadence workflow earn repeat use before adding any media? Keep the prepared scene optional and test it after the silent routine. |
| [On Track](https://store.steampowered.com/app/2836290/) | Free base app with a timer and to-do list in a changing train scene. It offers a separate supporter add-on. | Why would a person pay for Cadence when task capture and a timer are available for free? Ask about repeated planning work and recovery needs. |

These listings establish examples of paid and free focus products. They leave demand for Cadence and its Steam eligibility open. Compare against the participant's current setup too, such as a calendar, simple to-do list and phone timer. [The revised workflow](REDESIGN.md#from-deadline-to-focus) defines what to test. [Steam onboarding](https://partner.steamgames.com/doc/gettingstarted/onboarding) defines the separate category question.

### Visual references for the focus screen

Style descriptions are based on official store descriptions, store tags and available studio material. The live Steam galleries did not load during review. These notes describe broad visual approaches from the accessible sources.

| Product | Visual approach | Design idea to test |
|---|---|---|
| Cozy Time | Hand-drawn 2D cartoon style with a quiet setting and selectable weather. [Steam listing](https://store.steampowered.com/app/2054740/Cozy_Time/) | A calm base scene can carry the mood alongside simple controls. |
| Chill Pulse | Pixel art uses contrasting settings, including a cyberpunk city, an ancient landscape and a modern cabin. [Steam listing](https://store.steampowered.com/app/2826180/Chill_Pulse/) | Give the desktop focus scene a recognizable light and palette. |
| Spirit City: Lofi Sessions | Cozy stylized rooms with an avatar and collectible creatures. Decor, lighting and idle animations help users set a mood. [Studio press kit](https://mooncubegames.com/home/spirit-city-lofi-sessions-press-kit/) | Treat the Windows focus view as a place a person can settle into. Keep Cadence's room static and its controls on a readable panel. |
| On Track | Stylized 3D train interior with changing scenery outside the window. [Steam listing](https://store.steampowered.com/app/2836290/On_Track/) | One clear setting can communicate the character of a focus product. |

Cadence can test an optional illustrated focus view alongside a plain planner. Its existing room and Android state illustrations already support the distinct surfaces described in the [design system](DESIGN.md#artwork-on-android-and-windows).
