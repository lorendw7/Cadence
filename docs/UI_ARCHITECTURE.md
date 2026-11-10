# UI components and page design

Updated: 2026-11-11. Status: planned, not implemented. [ADR-007](adr/007-general-purpose-local-planner.md) defines a general local planner centered on personal plans and tasks. Flutter `shadcn_ui` is selected but not installed. Desktop is primary; Web, sync and courses are optional later extensions. General product release requires no school permission. No mobile app is planned. See the [project README](../README.md) and [learning log](LEARNING.md) for current in-memory task behavior and acceptance. The website presents concepts.

## Library and teaching boundaries

Use the [shadcn_ui package on pub.dev](https://pub.dev/packages/shadcn_ui), not `shadcn_flutter` or React shadcn/ui. [ADR-004](adr/004-shadcn-web-direction.md) replaces the earlier Material-only product direction. Existing Material controls can remain during the early lessons. The learner checks compatibility, selects a version and introduces the new library during the UI lessons; do not rewrite the entry point in advance.

Installed dependencies are defined by `pubspec.yaml` and its lockfile. Riverpod and drift serve state and storage needs; they are not UI libraries. Add them only when needed. The assistant maintains delegated documentation and website work, teaches, reviews and prepares tests/templates. The learner writes core application features.

## Planned component mapping

| Product role | Candidate component | Requirement |
|--------------|---------------------|-------------|
| Shared theme | `ShadThemeData`, `ShadColorScheme` | Define brand, surface, text and semantic colors once |
| Create, save and secondary actions | `ShadButton` variants | Make action priority, disabled state and pending work clear |
| Title, location and other fields | `ShadInput`, `ShadForm` | Place errors beside fields and retain input on failure |
| Date selection | `ShadDatePicker` | Validate the date range; keep time and recurrence rules in domain code |
| Task completion | `ShadCheckbox` | Keep pointer, keyboard and screen-reader state in agreement |
| Editors and high-impact confirmation | `ShadDialog` | Use for focused editing, whole-data replacement and clearing; avoid routine confirmation dialogs |
| Views within one page | `ShadTabs` | Preserve selection and keyboard focus |
| Errors and results | `ShadAlert` and the package's toast mechanism | Keep persistent errors near the affected content; a toast is not recovery guidance |

These are design candidates, not verified calls for a locked version. Check constructors, variants and composition during the relevant lesson. A date picker does not provide a weekly scheduler. Cadence owns its time grid, schedule blocks, repeat rules and conflict display.

## Visual direction and assets

Keep the independent paper-and-ink style: muted wine `#7C394B`, warm paper `#F6F5F1`, sage `#6F877C` and graphite text. Clear dates, fine rules, space and restrained corners keep attention on time. Use ordinary work, home and study examples. Categories need text or icons as well as color. Do not imply an institution's affiliation or show invented login, rankings or cloud-save status. See [DESIGN.md](DESIGN.md).

The [v2 artwork library](../assets/README.md) supplies 56 interface icons at 24 × 24, ten text-free state illustrations, brand variants and platform exports. The website and Windows/macOS launcher references use it. Flutter pages have not adopted these assets or an SVG dependency. Declare only the assets used by each implemented feature, with localized text, accessible button names and correct state semantics.

Use `empty-tasks` for an empty list, `all-done` when every task is complete and `save-error` for a failed save. An illustration does not replace an explanation or recovery action. Dark brand assets do not mean a dark UI has passed acceptance. See the [asset catalogue](../assets/catalog.html) for files and sizes.

## Pages and navigation

The learner accepted this layout on 2026-11-11: a light sidebar, a two-column Today page, a wide Week calendar and editors that open on demand. Keep three main destinations: **Today / Week / Tasks**, with Settings at the bottom of the sidebar. Add Courses and Weekly Review as optional later entries from Week. No semester, institution or account setup is required. A narrow layout changes presentation, not access to core pages. The website's previews remain concepts and may not yet match every planned interaction.

| Page or action | Planned interaction | Required visible state |
|----------------|---------------------|------------------------|
| Application shell | Main destinations, language and data controls | Current page, date and return path |
| Today | Personal plans and tasks for the day; optional courses later | Empty state, completion, time and location |
| Week | Browse dates and open entries | Week range, repeats and editing entry points |
| Schedule editor | Title, category, time, location and bounded repeats | Validation, save/cancel and deletion scope |
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

Show plan title and optional location on readable blocks, with restrained category color and text. Open details only after selection. If course support is added, its entries reuse the time grid; Courses and Weekly Review stay secondary actions. Dragging a task into the calendar is optional later work, not a first-version requirement; explicit start/end editing comes first.

### Tasks and editing

Use one focused list with quick entry at the top and lightweight filters and section headings. Completion has its own checkbox on the left. Once editing exists, selecting the title opens the editor; it no longer toggles completion. Dates stay secondary; course metadata appears only with the optional extension. Keep delete discoverable in an accessible actions menu and available without hover.

Retain the current row-tap toggle and visible delete button until their replacements are implemented and tested. A visual migration must preserve addition, validation, completion, deletion and latest-only undo.

Simple edits may stay inline. Full editing opens a right-side overlay, not another permanent column beside Today's tasks and timeline. Closing returns focus to the opening control and preserves the browsing position. Keep unsaved input according to [editing rules](EDITING.md).

### Window sizes and staged delivery

Collapse navigation when space is limited, stack Today's sections and let the editor use the available width. For Week, keep columns readable with an explicitly bounded horizontal scroll area or a labelled day view. Do not squeeze three or four columns into a narrow window. Choose breakpoints from translated text, keyboard use and 200% text scaling, rather than a device name. Preserve dates, selection and input across resize. A narrow layout is not a mobile-app commitment.

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
| Optional external source is offline | Show "Offline copy" and the last successful read time where relevant; this does not change personal-data save status |

Do not use a green icon as the only proof of saving. Announce meaningful status changes without moving focus. After an error, keep the correction or retry action reachable by keyboard. See the [application contracts](APPLICATION.md) for data-flow rules.

## Optional Web data flow

If Web is selected, keep the same explicit temporary/local choice. IndexedDB remains the candidate business-data adapter from [ADR-005](adr/005-local-offline-and-school-gated-web.md); localStorage is only for small non-sensitive preferences. ADR-007 removes the former school gate for general deployment. Test quotas, transaction failures, clearing and coordination between tabs. An offline restart claim also needs tested application-resource caching.

JSON transfer is limited to 1 MiB UTF-8 and 2,000 total records. Validate before showing counts and replacement scope. Replace the full dataset only after confirmation; failure preserves the original. Import cannot change the storage choice or restore a login.

Exports contain private plans and tasks and are not public timetable-sharing files. Clearing describes the application's own saved scope; it cannot retract downloaded or shared files. The first Web candidate excludes backend/accounts, sync, school APIs, CSV, system notifications and single-occurrence changes. Web remains optional learner-led future work, not part of the first desktop release.

## Implementation and acceptance

Follow [LEARNING.md](LEARNING.md) for current lessons. Introduce task behavior, navigation, the shadcn_ui theme, saving and error feedback step by step. Website visuals are useful for discussion but do not prove storage or recovery behavior.

Test Japanese, English and Chinese, input methods, keyboard access, long text, text scaling, screen readers, storage failures and invalid imports. Web acceptance also covers reloads, resource paths, browser-data clearing and the actual deployment. Compilation does not prove reliable storage or security; follow [SECURITY.md](SECURITY.md).
