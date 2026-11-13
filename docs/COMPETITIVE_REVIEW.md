# Learning from other planners

Source review: 2026-11-13. This is desk research from official product guides and pages. It is not a hands-on comparison, a market ranking or proof of user demand. The observations below describe the other products; the proposed adaptations are our own design choices to test.

Cadence's current app is an in-memory task exercise. Saving, Today, Week and personal plans are still planned. [PRODUCT.md](PRODUCT.md) owns scope, [REDESIGN.md](REDESIGN.md) owns interaction rules and [ROADMAP.md](ROADMAP.md) owns delivery gates. This review does not implement or release those features.

## Reference workflows

| Reference | What its official guide describes | Possible lesson for Cadence | What to leave out of the first release |
|---|---|---|---|
| Todoist | Quick Add starts in the task-name field. The plus action reveals optional details such as a description. Its date and deadline fields have different meanings. See [Quick Add](https://www.todoist.com/help/todoist/features/use-task-quick-add-in-todoist-va4Lhpzz) and [deadlines](https://www.todoist.com/help/todoist/features/introduction-to-deadlines-in-todoist-uMqbSLM6U). | Capture a title first. Reveal deadline and notes when requested. Keep a deadline distinct from reserved work time. | Natural-language date parsing, a second task scheduling date and a global capture shortcut. These need separate language, date and platform tests. |
| Things | Today, Upcoming, Anytime and Someday organize attention by when work can be done. Its date controls distinguish a start date from a deadline. See [scheduling](https://culturedcode.com/things/support/articles/2803579/) and [date controls](https://culturedcode.com/things/support/articles/9780167/). | Show a clear daily view and keep undated work available. Explain why an item appears in each group. | Copying its entire list structure, adding projects and areas, or treating an undated task as overdue. Cadence's current design uses Today, Week and Tasks. |
| Structured | Its [getting-started guide](https://help.structured.app/en/articles/380546) puts dates above the daily timeline and keeps undated tasks in an Inbox. Its [task editor guide](https://help.structured.app/en/articles/338050) offers entry from a free slot and starts with the selected day. | Make the phone date selector and time/location easy to scan. Show the length of a recorded gap, with an explicit Add plan action that keeps its date and interval. | Requiring every task to have a time, copying the whole Inbox model, drag interaction, AI planning and duration guesses. A Cadence gap only means no commitment is recorded. |
| Morgen | Its [due-date guide](https://www.morgen.so/guides/how-to-see-due-dates-in-your-calendar) distinguishes deadline markers from working blocks. It offers task-panel and calendar actions for reserving work time. Deadline markers do not mark a calendar as busy. | Keep task deadlines visible beside Week while choosing a separate work interval. Give the person an explicit plan editor and preserve the original deadline. | Linked session automation, automatic due-date changes, external-service writeback and AI scheduling. Cadence tasks and personal plans remain independent records. |
| TickTick | Task lists show tasks, schedules and details. Calendar choices include weekly and agenda views. Its broader feature set includes habits and a focus timer. See [official features](https://ticktick.com/features). | Test the planned Week task tray beside reserved time, so a person can inspect both while planning. | Multiple extra calendar modes, habits, timers, category systems and productivity dashboards. They add setup and maintenance before the main routine is proven. |
| Sunsama | Its original guided planning flow reviews work, chooses tasks, checks estimated workload and finalizes the day. Timeboxing creates a calendar working session for a task. See [legacy daily planning](https://help.sunsama.com/docs/usage-guides/daily-planning/legacy/) and [timeboxing](https://help.sunsama.com/docs/usage-guides/timeboxing/). | Test a brief review of commitments and available time. A Cadence user can reserve a separate personal plan before a task deadline. | An obligatory daily ritual, automatic scheduling, workload predictions, time tracking and linked task/session behavior. Planned blocks do not measure actual work. |
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

The source products make different choices about paid features, accounts and automation. Those choices do not change Cadence's one free feature set, local saving choice or independent task/plan model. Keep the white-and-wine journal identity and original artwork; reuse interaction ideas rather than their branded screens.

## Decisions for Cadence

The following principles guide the planned local desktop core. They may also inform later concepts, but the survey does not validate general-purpose task planning or establish that these interfaces are usable.

1. **Capture before organizing.** Require a task title. Let the person add notes or a deadline when needed. Do not require a project, category, account or planning tutorial first.
2. **Explain time clearly.** A deadline says when something must be finished. A personal plan reserves time. Creating or moving one must not silently change the other.
3. **Keep the daily view readable.** Separate overdue, due-today, undated and completed tasks. Keep planned times visually distinct. Counts and lists must use the same date rules.
4. **Make recovery part of usefulness.** Show the chosen storage mode and confirmed save state. Preserve input after an error. Test restart and backup recovery before promising reliability.
5. **Let people use their own routine.** Today, Week and Tasks should work without mandatory review steps, streaks or notifications. Keep keyboard use and readable text central.

The planned free local core must work without login or a network. A later optional Google account is for an approved sync service, not for opening a local task list. Advertising and cloud design must not decide what the user sees while editing a commitment. The design gives every user the same free feature set and published service limits.

## Three bounded design options

This comparison records the B plus C goals from [ADR-012](adr/012-import-first-phone-planner.md), refined by [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). General planning remains central, and Windows development comes first. Screenshot import is optional on demonstrated need. Authorized academic access is a deferred extension, not an approved connection. These are not three products to build. The [survey findings](SURVEY_FINDINGS.md) report 10 responses to a course-planning questionnaire. Seven responses chose a phone as the main viewing device. Five chose clearer time and room information as the main pain, and four chose less semester setup. These are separate answer totals; they do not identify the same people. [DESIGN_OPTIONS.md](DESIGN_OPTIONS.md) owns the full comparison and decision process.

| Option | Main question and starting screen | Useful first routine | Tradeoff and evidence needed |
|---|---|---|---|
| A. General local desktop planner | "What needs attention, and when can it fit?" Keep Today, Tasks and Week as core functions in the Windows-first shared product. | Capture a commitment, add a real deadline, reserve a separate work block and recover saved data. | Keeps delivery stable. This course survey does not validate work and daily-life demand, and only two respondents chose a computer. Observe those broader routines separately before claiming a market fit. |
| B. Easier timetable setup | "Can I set up my timetable with less typing?" Build direct editing first and assess possible approved input routes separately. | In an optional source prototype, inspect supplied times and rooms, correct mistakes and accept a reviewed draft. A mock source must be labelled. | Four responses required initial import before accepting manual updates; two accepted manual entry. A manual release does not meet the former condition. Study official read-only access and permission before a connected pilot. Screenshots and CSV are not required delivery steps; no scraping or live-update promise. |
| C. Phone-first timetable viewer | "Where and when is my next class?" Test a readable phone agenda and week view. | In a concept prototype, find the next room and time, view the week and inspect a manually corrected entry. | Better matches the preferred device in this small sample: seven chose a phone. This does not establish demand for an installed app or for sync. Design compact views now, then adapt and validate Android after the working Windows flow. The maintainer retained desktop development first. |

The competitor patterns can inform capture, daily attention and readable calendars across these options. They do not resolve the main survey tension: some responses require easier initial setup, while others require continuing course changes. The local release does not provide continuous institutional updates, and access research does not establish that a school offers them. Copying a polished planner interface would not solve that requirement.

Follow the adopted [development order](ROADMAP.md): a useful Windows planning flow, then Android adaptation without waiting for all desktop releases, screenshots or school approval. Compare the workflow with the person's current method. Keep tasks, deadlines, personal plans and available time central; any later timetable import is one input. [PRODUCT.md](PRODUCT.md) owns implementation scope.

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
