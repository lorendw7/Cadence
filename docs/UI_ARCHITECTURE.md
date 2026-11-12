# UI components and page design

Updated: 2026-11-12. Status: accepted design; the learning app has a task surface and a basic desktop shell with a selected Tasks marker. The form and task list share one scrolling area. Today, Week and page switching remain planned. [ADR-007](adr/007-general-purpose-local-planner.md) defines a general local planner centered on personal plans and tasks. The product keeps Flutter shadcn_ui and a shared theme under [ADR-008](adr/008-small-free-local-product.md). Desktop, Web, Android and iOS are targets under [ADR-010](adr/010-open-multiplatform-free-first.md). Complete the free local edition first. Cloud sync and optional ads wait for review after store launch. External academic systems remain excluded. See the [project README](../README.md) and [learning log](LEARNING.md) for current in-memory task behavior and acceptance. The website presents concepts.

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

The task-surface proposal targets an 800-unit maximum content width, 32-unit wide-window gutters, 16-unit compact gutters and an 8-unit spacing rhythm. These units are Flutter logical pixels. Align the heading, quick entry and task list. Keep practice controls visible but secondary. Preserve text scaling and allow control height to follow its content. The existing learning shell has a sidebar in wide windows. Its Tasks marker has no page-switching action. This visual proposal adds no new navigation, saving or task requirements. [LEARNING.md](LEARNING.md) records actual implementation and verification separately.

The [v2 artwork library](../assets/README.md) supplies 56 interface icons at 24 × 24, ten text-free state illustrations, brand variants and platform exports. The website and Windows/macOS launcher references use it. Flutter pages have not adopted these assets or an SVG dependency. For a future top bar, propose the existing 64 px brand PNG at about 28 logical pixels beside the wordmark. It would be decorative because the adjacent wordmark names the app. Do not bundle assets until a lesson uses them. Keep localized text, accessible button names and correct state semantics.

Use `empty-tasks` for an empty list, `all-done` when every task is complete and `save-error` for a failed save. An illustration does not replace an explanation or recovery action. Dark brand assets do not mean a dark UI has passed acceptance. See the [asset catalogue](../assets/catalog.html) for files and sizes.

## Pages and navigation

The learner accepted this layout on 2026-11-11: a light sidebar, a two-column Today page, a wide Week calendar and editors that open on demand. Keep three main destinations: **Today / Week / Tasks**, with Settings at the bottom of the sidebar. Add Courses and Weekly Review as optional later entries from Week. No semester, institution or account setup is required. A narrow layout changes presentation, not access to core pages. The website's previews remain concepts and may not yet match every planned interaction.

| Page or action | Planned interaction | Required visible state |
|----------------|---------------------|------------------------|
| Application shell | Main destinations, language and data controls | Current page, date and return path |
| Today | Personal plans and tasks for the day; optional courses later | Empty state, completion, time and location |
| Week | Browse dates and open entries | Week range, repeats and editing entry points |
| Schedule editor | Title, time, optional location/notes and bounded repeats | Validation, save/cancel and deletion scope |
| Tasks | Add, complete, reopen and edit tasks | Completion and empty-list state |
| Data controls | Saving choice, JSON preview, export and clear | Storage mode, failed saves and replacement scope |

Business components receive data and callbacks. Shared validation and schedule expansion remain separately testable; do not repeat them inside controls. Create files with working features rather than empty architecture folders.

### Today

Place the date, today's pending-task count and a New action above the content. Start with roughly 40% task space and 60% timeline space, excluding the sidebar. Adjust these proportions after checking long text and actual windows.

- Left: quick task entry, tasks due today, a separate overdue section, and collapsible undated and completed sections. Overdue and undated items do not increase today's pending count. Follow [Today rules](TODAY.md).
- Right: a compact next-commitment summary with time and location, then the day's timeline. Position entries by actual time, show a current-time marker and leave free intervals visible.
- A deadline alone never becomes a duration block. Scheduling task work requires an explicit timed plan.
- Keep summaries compact. Do not add a row of statistics cards above the work area.

### Week

Use a toolbar with previous/next week, the week range, This week and New. Below it, give the seven-day time grid most of the available space, with an all-day band above the timed rows. A collapsible task tray sits on the right.

The first desktop layout keeps readable day columns in a bounded horizontal scroll area when space is limited. Keep the toolbar reachable, show a scroll cue and align all-day and timed columns. A separate day view is later work if trials show a need. Do not constrain Week to the task list's proposed 800-unit content width.

Show plan title and optional location on readable blocks, with restrained category color and text. Open details only after selection. If course support is added, its entries reuse the time grid; Courses and Weekly Review stay secondary actions. Dragging a task into the calendar is optional later work, not a first-version requirement; explicit start/end editing comes first.

### Tasks and editing

Use one focused list with quick entry at the top and lightweight filters and section headings. Completion has its own checkbox on the left. Once editing exists, selecting the title opens the editor; it no longer toggles completion. Dates stay secondary; course metadata appears only with the optional extension. Keep delete discoverable in an accessible actions menu and available without hover.

The learning app now uses a completion checkbox and a visible delete button. Selecting the title does not yet open an editor. A visual migration must preserve addition, validation, completion, deletion and latest-only undo.

Simple edits may stay inline. Full editing opens a right-side overlay, not another permanent column beside Today's tasks and timeline. Closing returns focus to the opening control and preserves the browsing position. Keep unsaved input according to [editing rules](EDITING.md).

### Window sizes and staged delivery

Collapse navigation when space is limited, stack Today's sections and let the editor use the available width. For desktop Week, use the bounded calendar scroll described above. Do not squeeze three or four panels into a narrow window. Choose breakpoints from translated text, keyboard use and 200% text scaling, rather than a device name. Preserve dates, selection and input across resize. A narrow layout alone does not establish Android or iOS support; test touch, keyboard, safe areas, lifecycle and file operations on each target.

Lessons 11–16 establish the theme, task controls and shell layout. They do not by themselves deliver a planner. Expose functional destinations as their data and behavior arrive. Do not present placeholder pages or invented entries as working features. Reliable local tasks come first, then personal plans and Today/Week; course tools are optional later work. Later lesson numbers and estimates live in [the curriculum](CURRICULUM.md).

### Design references

These products inform specific interaction choices. Cadence keeps its own visual identity and feature scope.

| Reference | Useful idea | Cadence decision |
|---|---|---|
| [Things](https://culturedcode.com/things/features/) | Calm task lists, headings and details revealed when needed | Lightweight list sections and focused editing |
| [Structured](https://structured.app/) | A visible daily timeline | Today's right column shows actual time and free intervals |
| [Morgen](https://www.morgen.so/tasks-and-monotasking) | Tasks alongside calendar planning | Week has an optional task tray; explicit scheduling comes first |
| [MyStudyLife](https://mystudylife.com/tour/) | Optional course, task and academic-context reference | Consider for a later course extension; no academic setup in core onboarding |

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

## Implementation and acceptance

Follow [LEARNING.md](LEARNING.md) for current lessons. Introduce task behavior, navigation, the shared theme, saving and error feedback step by step. Website visuals are useful for discussion but do not prove storage or recovery behavior.

Test Japanese, English and Chinese, input methods, keyboard access, long text, text scaling, screen readers, storage failures and invalid imports. Web acceptance also covers reloads, resource paths, browser-data clearing and the actual deployment. Compilation does not prove reliable storage or security; follow [SECURITY.md](SECURITY.md).
