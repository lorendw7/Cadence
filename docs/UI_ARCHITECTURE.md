# UI components and page design

Updated: 2026-11-13. Status: planned UI under the accepted product direction; most screens are not implemented. The learning app has a task surface and a basic desktop shell with a selected Tasks marker. Today, Week, import and page switching remain planned. [ADR-013](adr/013-local-planner-and-conditional-academic-access.md) prioritizes useful direct planning and phone access. Screenshot import is optional on demonstrated need, with no scheduled delivery gate. Build the first working Windows flow, then Android without waiting for all desktop platforms. Design phones now; validate iOS when a native host and devices are available. Keep Flutter shadcn_ui, the shared theme and MIT development. Cloud sync and optional ads remain later work. Academic-access research and implementation are deferred; no school connection or login is approved. See [LEARNING.md](LEARNING.md) for actual behavior. The website presents concepts.

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

The selected [design direction](DESIGN_OPTIONS.md) aims to reduce entry effort and support phone viewing while keeping time management central. The core loop is: enter commitments, see available time, choose work and reserve an explicit plan, use Today, then adjust the plan without changing a task's deadline. Any future timetable import joins the same views after review. The small [survey](SURVEY_FINDINGS.md) does not validate every part of this wider loop.

Retain the desktop layout accepted on 2026-11-11: a light sidebar, two-column Today, a wide Week calendar and editors on demand. Keep **Today / Week / Tasks** on every layout. Direct in-app entry is the foundation. Do not show a placeholder screenshot or school-connection action in the first product. If an import route is selected and accepted later, make it reachable from Week with clear source and support limits. Users do not need a table or CSV. Phones use compact navigation and full-width editors. Settings stays secondary. No account or semester is required for tasks or personal plans. Ask for term context only when an enabled input needs it. Website previews may not yet match every planned interaction.

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

Use one primary creation action in each context. Today and Week can offer New with Task and Plan choices. Tasks uses title-only Add task. A page switch changes the view, not the record or deadline. Keep the same task names and dates when reviewing different screens; independent sample datasets would hide inconsistencies.

### Today

On phones, show the date and a compact current/next commitment with its time and optional room/location first. It may be a class, appointment or work session. Follow it with the daily agenda, due-today task count and reachable task groups. Keep a visible New action. A person must be able to choose a task and reserve a separate plan without searching through course controls. See [TODAY.md](TODAY.md).

On wide windows, retain roughly 40% task space and 60% timeline space, excluding the sidebar. Adjust after checking real windows and long text.

- Left: quick task entry, tasks due today, a separate overdue section, and collapsible undated and completed sections. Overdue and undated items do not increase today's pending count. Follow [Today rules](TODAY.md).
- Right: a compact next-commitment summary with time and location, then the day's timeline. Position entries by actual time and show one labelled current-time marker. Give gaps their start/end times and duration. A gap action opens an unsaved plan with that date and interval for review.
- A deadline alone never becomes a duration block. Scheduling task work requires an explicit timed plan.
- Keep summaries compact. Do not add a row of statistics cards above the work area.
- A cancelled class does not occupy free time or become the next commitment. A moved class appears once at its new time. Keep current and next items distinct when entries overlap.

Label the summary Now while a commitment is active, and Next for a later one. If several commitments are active, show them as separate choices with an overlap label. If nothing remains today, say so and retain the agenda and task groups. Do not replace the whole page with an all-done illustration while overdue or undated tasks remain.

Calculate gaps from the combined occupied intervals, after occurrence changes and cancellations. Overlapping entries must not create a false gap between them. Describe the result as no recorded plan, not guaranteed availability. The local study uses a fixed sample clock; the application must follow the live refresh rules in [TODAY.md](TODAY.md#refresh-while-the-page-stays-open).

### Week

Use previous/next week, the week range, This week and New. Add Import only when a source route is implemented and accepted; screenshot work does not block this screen. On phones, show a readable seven-day selector and the selected day's agenda with time, title and optional room/location. Include visible free intervals between timed commitments. All-day entries stay separate. Provide an accessible Tasks action or expandable tray from this view; selecting a task does not turn its deadline into a calendar block.

On wide windows, give the seven-day time grid most of the space, with one shared hour ruler, an all-day band above timed rows and a collapsible task tray on the right. Personal plans and imported timetable entries share the same time axis. Keep the ruler and date headings readable while scrolling; all-day and timed entries must stay under the same dates.

The tray shows task titles and their actual deadlines without turning them into calendar blocks. Opening it must preserve the selected date and calendar position. Its explicit plan action may open an unsaved form with the task title and selected date as context. The person still chooses and confirms the time. The plan and task remain independent. Stack the tray or use an expandable section when there is not enough width beside the calendar; do not leave phone tasks behind a desktop-only panel.

The desktop layout may use bounded horizontal scrolling when seven readable columns cannot fit. Keep the toolbar reachable and all-day/timed columns aligned. Phone viewing uses the selected-day agenda rather than seven squeezed columns. This readable phone path is part of the selected direction. Do not constrain the wide calendar to the task list's proposed 800-unit width.

Label gaps as No plans recorded, with their start/end times and duration. They describe recorded intervals only. Keep the selected day distinct from the current day in both text and semantics. Give every date selector a full accessible date, including month and year. New plan may prefill the selected date, but the user chooses and confirms its times. A gap is not an automatic schedule recommendation.

Show title and optional location on readable entries, with text as well as restrained color. Selection opens details. A timetable entry offers individual time/room correction, cancellation and restore; explain its scope before saving. Advanced course management and Weekly Review stay secondary. Drag scheduling and automatic task-plan links remain deferred; explicit start/end editing is enough for the core planning loop.

### Tasks and editing

Use one focused list with quick entry at the top and lightweight filters and section headings. Require only the title for capture. A labelled details disclosure reveals optional deadline and notes without clearing the title. When editing an existing task, show any populated details rather than hiding a known deadline. Completion has its own checkbox on the left. Once editing exists, selecting the title opens the editor; it no longer toggles completion. Dates stay secondary; course metadata appears only when the user has supplied that context. Keep delete discoverable in an accessible actions menu and available without hover.

The learning app now uses a completion checkbox and a visible delete button. Selecting the title does not yet open an editor. A visual migration must preserve addition, validation, completion, deletion and latest-only undo.

Simple edits may stay inline. Full editing uses an on-demand right-side sheet on wide windows and a full-width page or sheet on phones. Keep the origin visible on desktop without making it interactive behind a modal editor. Keep Save/Cancel reachable above the keyboard and within safe areas. Closing returns focus to the opening control and preserves browsing position. Keep unsaved input according to [editing rules](EDITING.md).

Use explicit labels: Deadline on task forms, and Starts/Ends on plan forms. Keep title first. Task capture reveals dates and notes on request; plan forms show their required interval before optional location/notes. Show recurrence only when requested. When a recurring occurrence is opened, show the original occurrence date and the chosen edit scope above the fields. An ordinary plan and a task do not need academic fields.

### State and recovery review

Review these states alongside the populated screens. They are required behavior for the planned app, not features supplied by the local HTML study.

| State | Visible response | Recovery or next action |
|---|---|---|
| No records | A short explanation within the empty section | Add task or New plan; no login or import requirement |
| No deadline | Plain No date label or group | Keep the task visible; do not invent urgency |
| Invalid interval | Error beside Ends explaining that it must follow Starts | Keep all other fields and focus the field that needs correction |
| Overlapping plans | Names and times of the conflicting entries; checked date range | Allow a deliberate save because real commitments can overlap |
| Saving | Pending state next to Save; no duplicate submission | Keep the editor open until the result is known |
| Save failed | Persistent error in the editor with the draft intact | Retry or return to editing; never show Saved first |
| Changed editor is closed | Save, Discard and Cancel with clear meanings | Cancel keeps the editor; discard returns to the same place |
| Task deleted | Name the affected task and show the available undo | Restore using the supported undo scope; do not promise a history |

Announce meaningful state changes without moving focus unnecessarily. After closing a dialog, return focus to its opener if it still exists; otherwise use the nearby section heading or creation control. In a modal editor, keep keyboard focus within the editor until it closes. Large text and a visible keyboard must not hide the error or the next action.

### Window sizes and staged delivery

Collapse navigation when space is limited, stack Today's sections and let the editor use the available width. Do not squeeze several panels into a phone. Choose breakpoints from translated text, keyboard use and 200% text scaling. Preserve dates, selection and input across resize. Shared Flutter views and date rules do not establish Android or iOS support; test touch, safe areas, lifecycle, file pickers, storage and any local recognition on each target.

Lessons 11–16 establish the theme, task controls and shell layout; they do not deliver a planner. Build manual plan/timetable editing, date rules, saving, recovery and Today/Week on Windows. Android follows the useful Windows flow without waiting for macOS/Linux or screenshot import; iOS follows native host/device availability. Academic-source research and demonstration work remain deferred. Any future concept must use clearly labelled fictional data and must not imply a working connection. Add import drafts or OCR lessons only when that feature is selected. CSV/table import stays deferred. Expose only working destinations. Later lessons live in [the curriculum](CURRICULUM.md).

### Design references

These products inform specific interaction choices. Cadence keeps its own visual identity and feature scope. The dated [competitive review](COMPETITIVE_REVIEW.md) owns verified official-source observations and their limits. The refinements here test simpler capture, readable gaps and planning without leaving the calendar. They do not add automatic scheduling, task/session links or mandatory daily review. A competitor's interface is not evidence of demand for Cadence or native acceptance.

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

Plan the free Web client with browser-local saving, temporary use, explicit export and tested tab coordination. Phone clients use the same main destinations with compact navigation and accessible editors. [FREE_EDITION.md](FREE_EDITION.md) defines platform acceptance. No login, cloud quota, upgrade or ad controls belong in the first free edition. Keep the concept website separate from private planner storage.

For the later [Google sync design](CLOUD_SYNC.md), keep identity, local saving and remote sync as distinct states. Signing in does not upload a workspace. Show the selected identity and transfer scope before explicit enablement; show pending sync separately from "Saved on this device". Personal sync cannot supply school timetable changes. These controls stay out of the current task exercise.

If academic access is approved later, show the source and the last successful retrieval separately from local save and personal-sync status. A read-only import produces a reviewed snapshot. Do not label it live or up to date without an accepted update mechanism and evidence. No school-password form or unapproved login control belongs in the prototype. See [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md).

## Implementation and acceptance

Follow [LEARNING.md](LEARNING.md) for current lessons. Introduce task behavior, navigation, the shared theme, saving and error feedback step by step. Website visuals are useful for discussion but do not prove storage or recovery behavior.

Test Japanese, English and Chinese, input methods, keyboard/touch access, long text, text scaling, screen readers, storage failures and invalid imports. Verify the loop from fixed commitments through available time to an explicit work plan and later adjustment without deadline changes. Phone checks include next-commitment time/room, selected-day Week, foreground recovery and file permissions. Web acceptance separately covers reloads, resource paths, browser-data clearing and the deployment. Compilation does not prove reliable storage or security; follow [SECURITY.md](SECURITY.md).
