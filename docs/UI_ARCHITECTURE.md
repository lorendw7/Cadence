# UI components and page design

Updated: 2026-11-15. Status: planned UI under the accepted product direction; most screens are not implemented. The learning app has a task surface and a basic desktop shell with a selected Tasks marker. Today, Week, import and page switching remain planned. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) prioritizes useful direct planning and phone access. Screenshot import is optional on demonstrated need, with no scheduled delivery gate. [ADR-015](adr/015-android-self-use-first.md) makes Android the first self-use target after shared saving and recovery. Windows remains the development host and regression target. A Windows release, desktop focus, music and Steam are not prerequisites. Validate iOS when a native host and devices are available. Keep Flutter shadcn_ui, the shared theme and MIT development. Cloud sync and optional ads remain later work. Academic-access research and implementation are deferred; no school connection or login is approved. See [LEARNING.md](LEARNING.md) for actual behavior. The website presents concepts.

## Library and teaching boundaries

Use Flutter shadcn_ui as selected in [ADR-004](adr/004-shadcn-web-direction.md). ADR-008 simplifies the surrounding design, not this library choice. Lesson 12 adds ShadApp.custom around the existing MaterialApp so both control families can coexist during migration. Introduce one used control at a time and preserve working Material controls. Keep shared colors, spacing and text styles without a second wrapper framework. The learner implements the accepted layout.

Installed dependencies are defined by `pubspec.yaml` and its lockfile. Riverpod and drift serve state and storage needs; they are not UI libraries. Add them only when needed. The assistant maintains delegated documentation and website work, teaches, reviews and prepares tests/templates. The learner writes core application features.

## Planned component mapping

| Product role | Candidate component | Requirement |
|--------------|---------------------|-------------|
| Shared theme | Shared shadcn_ui theme | Define brand, surface, text and semantic colors once |
| Create, save and secondary actions | shadcn_ui buttons | Make action priority, disabled state and pending work clear |
| Title, location and other fields | shadcn_ui inputs and forms | Place errors beside fields and retain input on failure |
| Date selection | shadcn_ui date picker | Validate the date range; keep time and recurrence rules in domain code |
| Task completion | shadcn_ui checkbox | Keep pointer, keyboard and screen-reader state in agreement |
| Editors and high-impact confirmation | Dialog or editor overlay | Use for focused editing, whole-data replacement and clearing; avoid routine confirmation dialogs |
| Views within one page | Tabs where needed | Preserve selection and keyboard focus |
| Errors and results | Inline error and result text | Keep persistent errors near the affected content; a toast is not recovery guidance |

Reuse working controls; do not create a parallel component framework. A date picker does not provide a weekly scheduler. Cadence owns its time grid, schedule blocks, repeat rules and conflict display.

## Visual direction and assets

This section specifies a proposed visual update only. The user asked for design documents, not assistant-written application code. The learner will implement accepted changes in small lessons. Do not treat this specification as implemented behavior or advance lesson acceptance because the document changed.

The user selected the original wine accent and white software UI on 2026-11-12. Keep the independent journal style with a white `#FFFFFF` canvas, subtle `#FAFAFA` surfaces, ink `#2F3033`, muted text `#6B6B70` and fine rules `#E8E8EB`. Use wine `#7C394B` sparingly for the primary action, focus and selection, with `#F5EEF0` behind selected navigation. Warm paper and sage remain within the artwork. Clear dates, whitespace and restrained corners keep attention on time. Use ordinary work, home and study examples. Categories need text or icons as well as color. Do not imply an institution's affiliation or show invented login, rankings or cloud-save status. See [DESIGN.md](DESIGN.md).

The task-surface proposal targets an 800-unit maximum content width, 32-unit wide-window gutters, 16-unit compact gutters and an 8-unit spacing rhythm. These units are Flutter logical pixels. Align the heading, quick entry and task list. Keep current task actions clear and reachable. Preserve text scaling and allow control height to follow its content. The existing learning shell has a sidebar in wide windows. Its Tasks marker has no page-switching action. This visual proposal adds no new navigation, saving or task requirements. [LEARNING.md](LEARNING.md) records actual implementation and verification separately.

The [v2 artwork library](../assets/README.md) supplies 56 interface icons at 24 × 24, ten text-free state illustrations, brand variants and platform exports. The website and Windows/macOS launcher references use it. Flutter pages have not adopted these assets or an SVG dependency. For a future top bar, propose the existing 64 px brand PNG at about 28 logical pixels beside the wordmark. It would be decorative because the adjacent wordmark names the app. Do not bundle assets until a lesson uses them. Keep localized text, accessible button names and correct state semantics.

Use `empty-tasks` for an empty list, `all-done` when every task is complete and `save-error` for a failed save. An illustration does not replace an explanation or recovery action. Dark brand assets do not mean a dark UI has passed acceptance. See the [asset catalogue](../assets/catalog.html) for files and sizes.

## Pages and navigation

The selected design direction aims to reduce entry effort and support phone viewing while keeping time management central. The core loop is: enter commitments, see available time, choose work and reserve an explicit plan, use Today, then adjust the plan without changing a task's deadline. Any future timetable import joins the same views after review. The small [survey](SURVEY_FINDINGS.md) does not validate every part of this wider loop.

Retain the desktop layout accepted on 2026-11-11 for later native acceptance: a light sidebar, two-column Today, a wide Week calendar and editors on demand. Use **Today / Tasks / Week** in that fixed order for Android bottom navigation. The earlier desktop study may retain Today / Week / Tasks in its sidebar; both layouts read the same records. Direct in-app entry is the foundation. Do not show a placeholder screenshot or school-connection action in the first product. If an import route is selected and accepted later, make it reachable from Week with clear source and support limits. Users do not need a table or CSV. The first Android flow uses compact navigation and full-width editors. Quick task capture requires only a title; deadlines and notes remain optional. Settings stays secondary. No account or semester is required for tasks or personal plans. Ask for term context only when an enabled input needs it. Website previews may not yet match every planned interaction.

| Page or action | Planned interaction | Required visible state |
|----------------|---------------------|------------------------|
| Application shell | Main destinations, language and data controls | Current page, date and return path |
| Today | Current/next commitment, daily agenda and task groups | Class/work/home title, time and optional room/location; deadlines distinct from plans |
| Week | All commitments, available intervals and accessible tasks | Week/day selection, overlaps and explicit plan entry; show an import action only after that route is implemented and accepted |
| Import, only if enabled later | Retrieve an approved read-only source or select a supported local input, then review a draft | Source and retrieval time, supported rules, uncertain fields, real dates, duplicate review and cancellation; no implied live updates |
| Schedule editor | Title, time, optional location/notes and bounded repeats | Save/cancel; whole-series or individual time/room/cancellation scope |
| Tasks | Add, complete, reopen and edit tasks | Completion and empty-list state |
| Data controls | Saving choice, JSON preview, export and clear | Storage mode, failed saves and replacement scope |

Business components receive data and callbacks. Shared validation and schedule expansion remain separately testable; do not repeat them inside controls. Create files with working features rather than empty architecture folders.

The [planner study](../assets/ui/planner-study.html) provides a local preview of the proposed destinations. Its [handoff](../assets/ui/PLANNER_STUDY.md) owns the viewer controls, sample states and browser review results. It uses fictional records. Keep a short Design preview label visible and place review controls in the separate Preview settings screen. This keeps the main view readable without implying a working planner. Sample scenario, frame and text controls are design tools, not the planned application settings.

Use one primary creation action in each context. On Android, Today and Tasks use a reachable New task action that opens title-only capture. Week uses New plan for its selected date, with a secondary Task action. Wide windows may retain New with Task and Plan choices. A page switch changes the view, not the record or deadline. Keep the same task names and dates when reviewing different screens; independent sample datasets would hide inconsistencies.

### Android screen composition

This is the concrete phone specification for the first planning flow and the later bounded focus phase. It is planned, not a claim about the current task exercise. Use 16 logical pixels at the content edges and an 8-pixel spacing rhythm as starting values. Flutter logical pixels are layout units independent of screen density. Let text and system insets determine final heights.

| Screen | Top to bottom | Primary action and return path |
|---|---|---|
| Today | Page title and current date with workspace timezone; compact next commitment with time/location; daily agenda; due-today tasks with separate overdue and undated groups | New task sits above the bottom navigation. Selecting a commitment opens its details; selecting a task opens its editor. |
| Tasks | Page title; lightweight status filters; task list with title, optional deadline and completion state | New task stays above the bottom navigation. The row checkbox changes completion; the title opens details. Keep delete in the labelled action menu. |
| Week | Week range with previous/next and This week; seven reachable date choices; selected-date heading; all-day entries; timed agenda and recorded gaps; reachable task tray | New plan uses the selected day as a draft default, not an automatic saved appointment. A secondary Task action opens capture. |
| Task editor | Title first; Details disclosure for optional deadline/notes; any existing details already visible; inline validation | Save and Cancel stay reachable above the keyboard. The form scrolls when space is short. Back follows the same dirty-form confirmation as the close action. |
| Plan editor | Title; explicit date/start/end or all-day choice; optional location/notes; repeat and occurrence scope only when relevant | Save confirms only after a successful write. Cancel returns to the same selected date and browsing position. |
| Focus, next phase | Return control; existing task title and separate deadline context if present; large remaining duration; running/paused/ended state; pause/resume/end controls; manually chosen break; small session list | Start focus is a secondary route from the chosen task. No fourth bottom tab, daily pin, second title entry or plan reservation is required. |

The bottom navigation remains Today / Tasks / Week in all three main views, with an icon, visible label and selected semantics. Put Settings in the header as a secondary action. An editor or focus route may temporarily use its own return control; on return, restore the originating main tab. Do not show nonworking destinations or a large illustration above the first useful action.

Keep creation actions and list content above the bottom navigation and system gesture area. When the keyboard opens, measure its inset and keep the active field, validation and Save/Cancel visible. Do not shrink labels, float buttons over task rows or reserve a fixed-height form that clips translated text. The seven date choices can use a clearly bounded horizontal selector when needed; the selected-day agenda remains a readable vertical list without page-wide horizontal scrolling.

Use distinct labels for Deadline, Planned time and Recorded timer time. Show a date-only deadline as a date, not an invented midnight time. Show the full selected date near the Week agenda and distinguish it from Today. Display the workspace timezone in date context; retain its stable-zone rules from [PRODUCT.md](PRODUCT.md). A blank gap means no plan is recorded, not confirmed free time.

### Shared rules for the three views

Design refinement dated 2026-11-15. These are written specifications for future implementation. This pass changes no Flutter code or HTML preview. The reference mapping explains the source ideas. The [shared walkthrough](REDESIGN.md#three-view-planning-walkthrough) gives one example to review across the pages.

- Give each phone page one primary creation action: New task in Today and Tasks, New plan in Week. Keep it above the bottom navigation with its own space. Content must scroll clear of both controls and the system gesture area. Secondary actions stay next to the content they affect.
- Keep the title, date and next useful action ahead of explanations. Use one compact summary, plain list sections and quiet dividers. Reserve wine for selection, the primary action and meaningful emphasis. Completion, overdue and overlap also need words or accessible state. Preserve the [design system](DESIGN.md).
- During the open session, retain each main page's browsing position, task filter and Week selection when switching tabs. Returning from an editor restores its origin. If an edited row has moved groups or disappeared, return to the nearest section heading and explain the result. This does not promise restart recovery for an unsaved form.
- Today always follows the current date in the workspace timezone. Week follows the selected date. Switching tabs must not make Today display the day being browsed in Week. Refresh time-dependent labels when returning to Today.
- New task starts without a deadline, including when opened from Today or Week. A page date is context, not an instruction to give a new task that deadline. New plan from Week uses the selected date; entry from a recorded gap carries that gap's date and interval for review.
- Use the same title, deadline wording and completion meaning everywhere a task appears. Keep the saving or temporary status visible without repeating a large notice in every section. A successful action uses the status appropriate to the chosen storage mode; [EDITING.md](EDITING.md) owns the save contract.

### Today

On phones, show the date and a compact current/next commitment with its time and optional room/location first. It may be a class, appointment or work session. Follow it with the daily agenda, due-today task count and reachable task groups. Keep the bottom New task action reachable. A person must be able to choose a task and reserve a separate plan without searching through course controls. See [TODAY.md](TODAY.md).

On wide windows, retain roughly 40% task space and 60% timeline space, excluding the sidebar. Adjust after checking real windows and long text.

- Left: quick task entry, tasks due today, a separate overdue section, and collapsible undated and completed sections. Overdue and undated items do not increase today's pending count. Follow [Today rules](TODAY.md).
- Right: a compact next-commitment summary with time and location, then the day's timeline. Position entries by actual time and show one labelled current-time marker. Give gaps their start/end times and duration. A gap action opens an unsaved plan with that date and interval for review.
- A deadline alone never becomes a duration block. Scheduling task work requires an explicit timed plan.
- Keep summaries compact. Do not add a row of statistics cards above the work area.
- A cancelled class does not occupy free time or become the next commitment. A moved class appears once at its new time. Keep current and next items distinct when entries overlap.

Label the summary Now while a commitment is active, and Next for a later one. If several commitments are active, show them as separate choices with an overlap label. If nothing remains today, say so and retain the agenda and task groups. Do not replace the whole page with an all-done illustration while overdue or undated tasks remain.

Calculate gaps from the combined occupied intervals, after occurrence changes and cancellations. Overlapping entries must not create a false gap between them. Describe the result as no recorded plan, not guaranteed availability. The local study uses a fixed sample clock; the application must follow the live refresh rules in [TODAY.md](TODAY.md#refresh-while-the-page-stays-open).

#### Today reading order and actions

| Area, in phone reading order | Visible information | Action and result |
|---|---|---|
| Heading | Today, full date, workspace timezone; separate Due today and Overdue counts | Each nonzero count moves to its matching task section in this view. It does not change a task or open an unrelated dashboard. |
| Current or next commitment | Now or Next, title, start/end and optional location | Open that exact plan. A large decorative card must not push both its time and the first agenda entry below the useful reading area. |
| Day agenda | All-day entries, then timed entries in order; a labelled current-time marker and measured recorded gaps | Open a plan to inspect or edit it. Add plan beside a gap opens a draft for that interval. A secondary New plan action also works when no gap is shown. |
| Tasks | Due today, Overdue, then expandable No date and Completed sections | The checkbox controls completion; the title opens details. View all tasks reaches Tasks for future deadlines and the full list. |
| Creation and navigation | Reachable New task above Today / Tasks / Week | Open title-only capture. After a confirmed result, return here with a short status and a route to the added task. |

Keep the count shortcuts compact so the next commitment remains prominent. A task section reached from a count receives keyboard and screen-reader focus. Do not force a scroll jump when a deadline changes while the person is reading. Announce the changed group and keep counts consistent with [TODAY.md](TODAY.md#counting-and-grouping).

Past plans remain inspectable in the day's agenda. A past interval is not proof that its work was done. At large text sizes, grow the summary and rows instead of hiding the title or location to meet a fixed first-screen height.

| Today state | Presentation |
|---|---|
| No records | A small empty-state illustration, one sentence about starting with a task or plan, primary New task and secondary New plan. No sample appointment is inserted. |
| Tasks exist, no timed plans | Say No timed plans today in the agenda. Keep any all-day entries and task groups visible. |
| No more timed plans today | Replace Next with a short status. Keep past entries and unfinished tasks available; do not call the whole day complete. |
| All due-today tasks complete | Acknowledge that section only. Keep overdue and undated work visible with their own counts. |
| Several current plans overlap | Show each title and interval as an openable entry and name the overlap. Do not select one as the only current commitment. |

### Week

Use previous/next week, the week range, This week and New. Add Import only when a source route is implemented and accepted; screenshot work does not block this screen. On phones, show a readable seven-day selector and the selected day's agenda with time, title and optional room/location. Include visible free intervals between timed commitments. All-day entries stay separate. Provide an accessible Tasks action or expandable tray from this view; selecting a task does not turn its deadline into a calendar block.

On wide windows, give the seven-day time grid most of the space, with one shared hour ruler, an all-day band above timed rows and a collapsible task tray on the right. Personal plans and imported timetable entries share the same time axis. Keep the ruler and date headings readable while scrolling; all-day and timed entries must stay under the same dates.

The tray shows task titles and their actual deadlines without turning them into calendar blocks. Opening it must preserve the selected date and calendar position. Its explicit plan action may open an unsaved form with the task title and selected date as context. The person still chooses and confirms the time. The plan and task remain independent. Stack the tray or use an expandable section when there is not enough width beside the calendar; do not leave phone tasks behind a desktop-only panel.

The desktop layout may use bounded horizontal scrolling when seven readable columns cannot fit. Keep the toolbar reachable and all-day/timed columns aligned. Phone viewing uses the selected-day agenda rather than seven squeezed columns. This readable phone path is part of the selected direction. Do not constrain the wide calendar to the task list's proposed 800-unit width.

Label gaps as No plans recorded, with their start/end times and duration. They describe recorded intervals only. Keep the selected day distinct from the current day in both text and semantics. Give every date selector a full accessible date, including month and year. New plan may prefill the selected date, but the user chooses and confirms its times. A gap is not an automatic schedule recommendation.

Show title and optional location on readable entries, with text as well as restrained color. Selection opens details. A timetable entry offers individual time/room correction, cancellation and restore; explain its scope before saving. Advanced course management and Weekly Review stay secondary. Drag scheduling and automatic task-plan links remain deferred; explicit start/end editing is enough for the core planning loop.

#### Week selection and planning context

On a phone, read the page in this order: week range and navigation; seven date choices; full selected-date heading; that date's all-day entries; timed agenda and gaps; optional task tray. Keep the tray toggle near the date controls. The tray starts collapsed on the first phone visit. Expanding it must not replace the agenda or lose the selected date. If it is outside the visible area, move focus to its heading; closing it returns focus to the toggle.

Previous week and Next week move by one week and keep the selected weekday. This week selects today's date. Show month and year at range boundaries. Today's marker and the selected outline must have different text or semantics. If large text requires horizontal scrolling within the date selector, keep the selected date visible and preserve full touch targets. The agenda itself stays a vertical list.

Only the selected day's all-day entries and overlap warnings appear in its phone agenda. Friday's workshop must not appear as an all-day item when Monday is selected. An empty Sunday needs a local No plans recorded state and an action for Sunday, even if the rest of the week has entries. An empty whole week still keeps all seven dates reachable.

| Entry route | Draft context | Result and return |
|---|---|---|
| New plan | Selected date; visible start/end fields or an explicit all-day choice | Save only after review. Return to the same selected date and show the saved entry, or a clear route to its new date if the person changed it. |
| Add plan in a gap | Exact date, start and end from the displayed interval | Allow edits before Save. The interval describes recorded plans, not guaranteed availability. |
| Create work plan from a task | Task title and selected date; show the source deadline as context | Keep start/end explicit. Saving creates a separate plan and leaves the task incomplete with the same deadline. |
| Open an existing plan | Current values; occurrence scope where relevant | Cancel returns without a change. A failed Save keeps the draft and original confirmed plan. |
| Secondary New task | Title only, no inherited deadline or interval | Return to Week and keep its selected date. Offer a route to the added task without silently scheduling it. |

Call the tray Tasks or Choose a task, not Unscheduled tasks. Independent records cannot prove whether a task already has a work plan. Show incomplete tasks with actual deadlines, including undated tasks, and use View all tasks to reach the full list. Copying a title into a plan draft does not create a maintained link. Explain this briefly near the source context: changes to the plan leave the task and deadline unchanged. Do not show a linked badge or automatic scheduled count.

When plans overlap, both remain readable. On the phone, show separate rows and the affected time range; wide calendars may use adjacent lanes. Permit a deliberate save under the existing conflict policy. Do not offer automatic rearrangement. A cancelled repeating occurrence does not block a gap; its detail route still explains cancellation and restoration.

### Tasks and editing

Use one focused list with lightweight filters and section headings. On Android, keep New task above the bottom navigation so capture is within thumb reach; wide windows may retain quick entry at the top. Require only the title for capture. A labelled details disclosure reveals optional deadline and notes without clearing the title. When editing an existing task, show any populated details rather than hiding a known deadline. Completion has its own checkbox on the left. Once editing exists, selecting the title opens the editor; it no longer toggles completion. Dates stay secondary; course metadata appears only when the user has supplied that context. Keep delete discoverable in an accessible actions menu and available without hover.

The learning app now uses a completion checkbox and a visible delete button. Selecting the title does not yet open an editor. A visual migration must preserve addition, validation, completion, deletion and latest-only undo.

Simple edits may stay inline. Full editing uses an on-demand right-side sheet on wide windows and a full-width page or sheet on phones. Keep the origin visible on desktop without making it interactive behind a modal editor. Keep Save/Cancel reachable above the keyboard and within safe areas. Closing returns focus to the opening control and preserves browsing position. Keep unsaved input according to [editing rules](EDITING.md).

Use explicit labels: Deadline on task forms, and Starts/Ends on plan forms. Keep title first. Task capture reveals dates and notes on request; plan forms show their required interval before optional location/notes. Show recurrence only when requested. When a recurring occurrence is opened, show the original occurrence date and the chosen edit scope above the fields. An ordinary plan and a task do not need academic fields.

#### Task list and capture details

Use Open and Completed as the initial status filters, with Open selected on the first visit. In Open, group rows as Overdue, Due today, Later and No date. Today uses its shorter daily subset; Tasks keeps future deadlines reachable. Use the same date rules in both views. Within dated groups, show the earliest deadline first and keep ties stable. Keep a stable order for undated tasks. This is a presentation order, not a new priority field or manual sorting feature.

Each row has three distinct targets: completion checkbox, title/details area, and a labelled actions control. Show the title first and one concise deadline line beneath it. Wrap long titles and let the row grow. Use a small notes indicator only when notes exist. Keep optional school metadata out of an ordinary task row. Delete and Create work plan belong in the actions menu; neither requires a swipe or hover. The plan action opens a separate draft with its date visible for explicit selection.

| Capture or list state | Visible response and return |
|---|---|
| New task | Focus Title. Keep Deadline and notes in a labelled optional disclosure. The keyboard must leave Save and Cancel reachable. |
| Details expanded | Preserve the entered title. Default to No deadline. Offer a date, then an optional exact time; no hidden midnight value is shown as a time choice. |
| Existing task | Show populated details, including any date-only or exact deadline. Opening the editor alone makes no change. |
| Invalid title or deadline | Explain the specific problem near the field and retain other input. Apply the existing validation contract. |
| Saving or failed save | Keep pending/error feedback with the affected editor or row. Prevent duplicate submission and retain input on failure, following [EDITING.md](EDITING.md). |
| Title-only task added | Identify its No date destination. If the active view excludes it, offer View task instead of silently changing the current filter or inventing a deadline. |
| Task completed or reopened | Explain the changed state and update the matching group/count. If the row leaves the filter, keep focus at the nearest row or section. Reopening stays available in Completed. |
| No open tasks but completed tasks exist | Say No open tasks and retain the Completed filter. Do not show first-use guidance as if records were lost. |
| No completed tasks | Say No completed tasks yet, with a route back to Open. Do not encourage creating a completed task to fill the view. |
| No tasks at all | Keep a short title-first explanation and primary New task. Category, project and account setup are unnecessary. |

Keep filter and expanded-group choices while browsing in the current session. Returning from a task editor should reveal its confirmed result or explain where it moved. Closing a changed editor uses the same Save, Discard and Cancel choices on Back and the visible close action. The current learner-owned completion and delete behavior remains unchanged until its own implementation step.

### Android focus entry

After reliable planning and initial self-use, the next bounded phase opens focus from the selected task. Keep the fixed Today / Tasks / Week bottom navigation as the main destinations. The focus surface shows the existing task title, one countdown and clear start, pause, resume and end actions. A break starts only by explicit choice. Keep its small session history readable without adding a statistics dashboard.

Use the [Android focus design](REDESIGN.md#android-focus-after-the-first-planning-trial) for scope. Deadline, reserved plan and recorded timer duration remain distinct. Desktop compact mode, pins, scenes and music are not required. Show only implemented controls; lifecycle and save-failure decisions belong to the learner. No closed-app alarm guarantee follows from the mockup.

### State and recovery review

Review these states alongside the populated screens. They are required behavior for the planned app, not features supplied by the local HTML study.

| State | Visible response | Recovery or next action |
|---|---|---|
| First use | Two clear choices: Save on this device and Temporary use, with what survives closing | Choose before private records are opened; no school sign-in or setup wizard |
| No records | A short explanation within the empty section | Add task or New plan; no login or import requirement |
| Empty Today | No commitment invented; show the selected date and any real tasks that remain | New task and access to Week remain available |
| No deadline | Plain No date label or group | Keep the task visible; do not invent urgency |
| Invalid interval | Error beside Ends explaining that it must follow Starts | Keep all other fields and focus the field that needs correction |
| Overlapping plans | Names and times of the conflicting entries; checked date range | Allow a deliberate save because real commitments can overlap |
| Saving | Pending state next to Save; no duplicate submission | Keep the editor open until the result is known |
| Saved locally | Confirmed local status near the affected editor result or record | Do not imply cloud sync; hide the draft only after the accepted save result |
| Save failed | Persistent error in the editor with the draft intact | Retry or return to editing; never show Saved first |
| Temporary session | A visible Temporary label with loss-on-close meaning | Retain explicit export and the accepted exit behavior; do not display Saved on this device |
| Offline local use | Normal local planner and focus controls remain available | Do not make a connection banner or network retry block local editing; later optional network actions explain their own failure |
| Changed editor is closed | Save, Discard and Cancel with clear meanings | Cancel keeps the editor; discard returns to the same place |
| Task deleted | Name the affected task and show the available undo | Restore using the supported undo scope; do not promise a history |
| Focus running or paused | Task title, remaining time and a written running/paused state, with the matching controls | Pause/resume/end acts on one timer; a break is an explicit next choice |
| Focus ended or interrupted | Recorded duration and confirmed, unsaved or interrupted status in the small session list | Keep task completion separate; do not credit unknown background or closed-app time |

Announce meaningful state changes without moving focus unnecessarily. After closing a dialog, return focus to its opener if it still exists; otherwise use the nearby section heading or creation control. In a modal editor, keep keyboard focus within the editor until it closes. Large text and a visible keyboard must not hide the error or the next action.

### Window sizes and staged delivery

Collapse navigation when space is limited, stack Today's sections and let the editor use the available width. Do not squeeze several panels into a phone. Choose breakpoints from translated text, keyboard use and 200% text scaling. Preserve dates, selection and input across resize. Shared Flutter views and date rules do not establish Android or iOS support; test touch, safe areas, lifecycle, file pickers, storage and any local recognition on each target.

Lessons 11–16 establish the theme, task controls and shell layout; they do not deliver a planner. Build shared date rules, saving and recovery on the Windows development host, then validate manual editing and Today/Week on Android as the first self-use target. Keep the first trial ad-free. After reliable planning and initial self-use, add the bounded Android task-linked countdown and local session history in roadmap stage H. Desktop focus and other platform releases follow separate decisions; iOS depends on native host/device availability. Academic-source research and demonstration work remain deferred. Any future concept must use clearly labelled fictional data and must not imply a working connection. Add import drafts or OCR lessons only when that feature is selected. CSV/table import stays deferred. Expose only working destinations. Later lessons live in [the curriculum](CURRICULUM.md).

### Android quality acceptance

These are proposed checks for implemented slices, not passed results. Use the maintainer's real Android phone and record model, Android version, build, language, text scale and test fixture. Keep screenshots and timings separate from a static design preview.

| Area | Check before calling the slice ready for self-use |
|---|---|
| Touch | Aim for at least 48 by 48 logical pixels for interactive targets, including date cells and icon actions. Targets must not overlap or rely on a precise swipe. |
| Text and layout | Check Japanese, English and Chinese, long titles and 200% system text scaling. Let rows, buttons and editors grow. No clipped labels, hidden Save or page-wide horizontal overflow. |
| Keyboard and Back | Exercise the visible keyboard, safe areas and gesture navigation. Active input, errors and Save/Cancel stay reachable. Back preserves or discards a draft only through the accepted explicit choice. |
| Semantics | With TalkBack, read task title, deadline and completion correctly. Name icon actions, announce selected date/tab and meaningful save failures, and restore focus to the origin after closing an editor. |
| Dates and state | Compare Today, Tasks and Week after changes. Verify date-only and exact deadlines, selected day versus today, workspace timezone and separate planned versus recorded time. |
| Recovery | Exercise empty, editing, saving, failed-save, saved, temporary, offline and interrupted-focus states on the actual device. A polished happy-path screen cannot close the data-safety gate. |
| Responsiveness | Initial candidate budgets: a useful warm-start local view within three seconds, and visible acknowledgement of ordinary taps within 100 milliseconds. Measure on the reference phone with a stated saved-data fixture. Slow writes show pending work rather than false success. Revisit budgets from evidence; they are not published performance promises. |

Record actual startup and interaction timings with repeated runs and the observed range. Report missed budgets, jank and the tested workload; a fast empty screen does not establish a fast populated planner. The learner owns state, date, persistence and lifecycle implementations. These checks guide review without adding an analytics SDK or new runtime feature.

### Design references

These products inform specific interaction choices. Cadence keeps its own visual identity and feature scope. The dated competitive review owns verified official-source observations and their limits. The refinements here test simpler capture, readable gaps and planning without leaving the calendar. They do not add automatic scheduling, automatic task/plan changes or mandatory daily review. The bounded task-linked focus session belongs to its separate learner-owned phase. A competitor's interface is not evidence of demand for Cadence or native acceptance.

| Reference | Useful idea | Cadence decision |
|---|---|---|
| [Things](https://culturedcode.com/things/features/) | Calm task lists, headings and details revealed when needed | Lightweight list sections and focused editing |
| [Structured](https://structured.app/) | A visible daily timeline | Today shows actual scheduled time and available intervals in a layout suited to its width |
| [Morgen](https://www.morgen.so/tasks-and-monotasking) | Tasks alongside calendar planning | Week has an optional task tray; explicit scheduling comes first |
| [MyStudyLife](https://mystudylife.com/tour/) | Readable timetable and setup reference | Review user-supplied input; make time/room clear without mandatory academic setup for general planning |

## Saving and connection states

Storage choice, write status and network connection are separate. Use plain labels that explain the user's current situation:

First use presents **Save on this device** and **Temporary use** with concise restart/retention explanations. Until a choice is made, no business data is persisted. The user can create tasks and plans without login or school setup. A previous explicit saving choice may be remembered; importing a file cannot select it.

| Situation | Visible label and behavior |
|-----------|----------------------------|
| Temporary session | "Temporary use"; explain that closing or refreshing loses data, with explicit save/export actions |
| Local write pending | "Saving..."; keep the input visible and prevent duplicate submissions |
| Latest write confirmed | "Saved on this device"; do not imply cloud sync, encryption or backup |
| Local write failed | "Could not save"; retain input, identify the affected action and offer retry/export |
| Switch back to temporary use | Explain whether the old saved copy is kept or cleared; start an empty temporary session after pending work is resolved |
| Clear partly failed | "Cleanup incomplete"; name the unfinished step and offer retry, never "All data cleared" |
| Network is unavailable | Keep local planning available; describe browser offline-reload limits truthfully; do not imply a cloud copy exists |

Do not use a green icon as the only proof of saving. Announce meaningful status changes without moving focus. After an error, keep the correction or retry action reachable by keyboard. See the [application contracts](APPLICATION.md) for data-flow rules.

## Optional Web data flow

Plan the free Web client with browser-local saving, temporary use, explicit export and tested tab coordination. Phone clients use the same main destinations with compact navigation and accessible editors. FREE_EDITION.md defines platform acceptance. No login, cloud quota, upgrade or ad controls belong in the first free edition. Keep the concept website separate from private planner storage.

For the later Google sync design, keep identity, local saving and remote sync as distinct states. Signing in does not upload a workspace. Show the selected identity and transfer scope before explicit enablement; show pending sync separately from "Saved on this device". Personal sync cannot supply school timetable changes. These controls stay out of the current task exercise.

If academic access is approved later, show the source and the last successful retrieval separately from local save and personal-sync status. A read-only import produces a reviewed snapshot. Do not label it live or up to date without an accepted update mechanism and evidence. No school-password form or unapproved login control belongs in the prototype. See UNIVERSITY_INTEGRATION.md.

## Implementation and acceptance

Follow [LEARNING.md](LEARNING.md) for current lessons. Introduce task behavior, navigation, the shared theme, saving and error feedback step by step. Website visuals are useful for discussion but do not prove storage or recovery behavior.

Test Japanese, English and Chinese, input methods, keyboard/touch access, long text, text scaling, screen readers, storage failures and invalid imports. Verify the loop from fixed commitments through available time to an explicit work plan and later adjustment without deadline changes. Phone checks include next-commitment time/room, selected-day Week, foreground recovery and file permissions. Web acceptance separately covers reloads, resource paths, browser-data clearing and the deployment. Compilation does not prove reliable storage or security; follow [SECURITY.md](SECURITY.md).
