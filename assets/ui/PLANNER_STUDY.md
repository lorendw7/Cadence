# Planner interface study

Updated: 2026-11-13. Status: proposed product design with fictional samples, not a working planner or a release. Open the [local preview](planner-study.html). The current Flutter app still has in-memory tasks only; [LEARNING.md](../../docs/LEARNING.md) owns implementation status.

## Review the preview

From the repository root:

```sh
python -m http.server 8013 --bind 127.0.0.1
```

Open `http://127.0.0.1:8013/assets/ui/planner-study.html`. The page also works as a local HTML file, but an HTTP preview is preferred for the shared SVG sprite. No packages, accounts or external assets are needed.

Open Preview settings from the top-right of the app frame to compare Chinese, Japanese and English samples, a compact frame, 100% or 200% sample text, and four scenarios. The same screen holds the review guide, design references and fictional-data explanation. The main view starts with the planner rather than a review toolbar. A short Design preview label stays visible. These controls belong to the design viewer, not the future application's data and language settings.

Product strings live in the JavaScript translation table. The sample clock is fixed at Friday, 13 November 2026, 09:30 in Asia/Tokyo. It is not a live clock. Changing a review option does not turn sample data into saved records.

Navigation, weekday selection, expandable task groups and editor previews work. Editors show read-only samples. The save-failure button changes the displayed example; it never attempts a write. Checkboxes are drawn states, not completion controls. Reloading resets the viewer. The study uses no storage, network data service or real personal records.

## Reference-led refinement

The [competitive review](../../docs/COMPETITIVE_REVIEW.md#design-refinements-from-this-review) records the official source observations. This revision tests three adaptations within Cadence's existing scope:

| Reference pattern | Cadence adaptation | Tradeoff to review |
|---|---|---|
| Things and Todoist keep extra task details out of initial capture | Show the title first and expose optional fields on request | Details need a clear label so they are discoverable without adding a compulsory step |
| Structured uses a readable timeline and entry from a gap | Show gap start, end and duration; open the matching date and interval | A blank interval is not guaranteed availability, and measured gaps must account for overlapping entries |
| Morgen places task information near calendar planning | Keep a collapsible task tray beside the wide Week grid, with separate plan entry | The tray must not squeeze the calendar or imply that a plan changes task completion or deadline |

The shared Week ruler, restrained event surfaces, explicit current-day marker and responsive side sheet are Cadence design choices. They are not claims that these products use the same layout. Keep the original white-and-wine identity and artwork. No vendor screenshot or branding is copied into the preview.

These changes aim to reduce repeated reading and loss of context. They do not establish better usability without a person trying the review tasks. The preview remains a design handoff; it adds no Flutter feature, data service, automatic scheduling or task-to-plan link.

## Screen responsibilities

| Screen | Question | Design choice |
|---|---|---|
| Today | What is next, and what is due? | Current date, due-today and overdue counts, next commitment, agenda and task groups |
| Week | Where could work fit? | A shared time axis on wide screens; seven-day selection and a daily agenda on phones |
| Tasks | What still needs finishing? | Title-first capture, separate deadline groups, an independent completion state and details on demand |
| Editor | What exactly will change? | Labelled title, deadline or time interval, optional location and explicit occurrence scope |

A report deadline stays in Tasks. A writing session is a separate plan. There is no automatic link, deadline movement, completion or inferred work measurement. A blank calendar interval means no plan has been recorded; it does not guarantee availability. The all-day community workshop is an explicit plan, not a task converted into an event.

Today keeps tasks on the left and the agenda on the right in a wide frame. Below 850 CSS pixels, the next commitment and agenda come first. Below 600 pixels, the sidebar becomes a compact navigation row, and Week uses its selected-day agenda. These are study breakpoints, not accepted Flutter device thresholds. The date, due-today count and all three destinations remain visible.

Week's wide calendar covers 09:00–18:00 for this fixture. It is not a proposal to hide earlier, later or overnight plans in the app. A single shared ruler replaces repeated hour labels. The fictional week has work, study and personal plans across Monday through Saturday, with an empty Sunday. The current day and selected day have distinct labels. All-day information is outside the time axis. Events use actual start/end positions. Overlaps use separate lanes. Truncated grid titles remain named in the accessible button and can be read in the editor or selected-day agenda. At 200% text, the bounded calendar scroll area grows its day widths and time rows. The rest of the page must not require horizontal scrolling.

The task tray is beside the calendar when space allows and can be collapsed. It starts closed on the first narrow view. Toggling it preserves the selected day and calendar scroll, within the available scroll range. A work-plan example carries the source task as context while keeping the two records independent. A new task editor starts with its title and collapsed optional details. Existing task editors expose their details. Editors use a right-side sheet on desktop and the available width on compact layouts.

## States and interaction boundaries

| Sample | What to inspect | What it does not prove |
|---|---|---|
| A planned Friday | Two due-today tasks, one overdue task, separate undated/completed groups and matching Friday events | Live dates, saving, task completion or recurrence expansion |
| Starting empty | Clear task/plan entry, no invented next event and no forced setup wizard | First-use storage selection or database creation |
| Overlapping commitments | Both entries remain visible; exact overlap appears in text | Automatic conflict detection or series-wide checks |
| Save failure | A single-occurrence class editor keeps its sample input visible and distinguishes unsaved input from the saved record | A real write, retry, backup or recovery operation |

Select a weekday, then open New plan to review that date. The visible gap action opens a plan for that exact gap. Gap duration uses the combined occupied intervals, so a pair of overlapping commitments cannot create a false free slot. Task details distinguish no deadline, date-only and exact-time deadlines. Open the Friday class to inspect single-occurrence scope. Close an editor with its button or Escape; focus returns to the opening control. Resizing does not rebuild the open editor. The Today marker is fixed at 09:30 for this sample; the compact agenda uses readable list rows rather than proportional time spacing.

The final application still needs editable forms, Save/Cancel, dirty-form confirmation, a saving choice, current-time updates, cancellation/restore, backup/restore, native keyboard handling and platform acceptance. Do not add placeholders for these as working product controls. Their contracts remain in [UI_ARCHITECTURE.md](../../docs/UI_ARCHITECTURE.md), [EDITING.md](../../docs/EDITING.md) and [ROADMAP.md](../../docs/ROADMAP.md).

## Visual choices

Keep the independent journal identity: the existing C mark, serif wordmark, white canvas, graphite text, wine selection and quiet rules. Use the serif face for identity, not task text. Avoid a dashboard of decorative statistics cards. Give the date, next commitment and task titles clear hierarchy. Place time and location beside the relevant entry.

Buttons use at least 44 CSS pixels of height in the ordinary layout. Text may increase height. Focus has a visible wine outline. Errors, selected navigation and overdue items have text or semantics as well as color. Existing SVGs are referenced at their original paths. No artwork sources, exports or manifest entries were regenerated.

## Review tasks before implementation

1. Find the next commitment, start time and location without opening another view.
2. Explain why two tasks are due today while an overdue task is separate.
3. Find an unrecorded interval and inspect its new-plan date and time.
4. Explain why moving a writing session must not move the report deadline.
5. Read both overlapping plans and inspect one occurrence of the weekly class.
6. Open the failure sample and identify what was retained and what was not saved.

These are review prompts, not user-study results. Record errors and hesitation before changing the product scope. The [product design](../../docs/REDESIGN.md) defines the larger routine and evidence to collect.

## Maintenance and verification

The editable sources are [HTML](planner-study.html), [CSS](planner-study.css) and [JavaScript](planner-study.js). Keep the earlier [Tasks study](README.md) at its stable path as a historical lesson handoff. The new planner study covers future screens and does not replace that record. The existing Pages workflow publishes only `website/`; this is not another hosted site.

Run the three read-only checks from [tools/README.md](../../tools/README.md). Review all three pages, languages and sample sizes after layout changes. Check dialog dismissal and return focus, day selection, empty and overlap samples, and retained failure text. Source checks alone do not prove browser or native behavior.

### Initial browser review on 2026-11-13

These results describe the initial study before the reference-led refinement. Later results must be recorded separately; they do not inherit these passes.

The in-app browser checked 54 normal-layout combinations: Today, Week and Tasks; Chinese, Japanese and English; viewport widths 390, 850 and 1440 pixels; sample text at 100% and 200%. None had page-wide horizontal overflow or horizontal clipping in the inspected heading, task-title, day-selector, next-item, top-bar and task-tray containers. The calendar's own horizontal scroll is intentional.

The desktop Chinese Today view and the Japanese compact editor at 200% text were visually inspected. A further 42 checks covered empty and overlap samples on all three pages at 200% text in all three languages at 390 and 1440 pixels, plus each save-failure dialog. No page or dialog horizontal overflow was found. The English overlap calendar was visually inspected. Monday plan creation showed 9 November; the Friday gap showed 11:00-13:00. The failure sample retained those values, and Escape restored focus to Add plan. The browser reported no warnings or errors. These are browser design checks, not Flutter acceptance. Full browser zoom, other browser engines, screen readers, native fonts, phone keyboards and real storage remain untested.

### Reference and settings revision review on 2026-11-13

After the reference-led changes, 54 page-layout combinations and 42 empty, overlap and error combinations had no detected horizontal page or dialog overflow. The wide Week view and its task tray were visually reviewed. Interaction checks confirmed one hour ruler, distinct current/selected dates, preserved calendar scroll when the tray changed, and focus returning to the original calendar header or plan action. A Thursday work-plan example kept the Friday deadline visible and unchanged. In the overlap sample, the gap started at 11:30 and ended at 13:00; those values stayed in the failure example.

The maintainer then asked to move the review toolbar into settings. The final page starts directly with Cadence and keeps the review options in Preview settings. A further 72 combinations covered the settings sheet and all three pages, three languages, 100%/200% text and effective viewport widths of 390, 850 and 1440 pixels. None had horizontal page or settings-sheet overflow. The final Chinese desktop landing was visually inspected.

Changing language in settings kept Week and the selected Thursday. Escape returned focus to the visible settings button. Selecting Save failure closed settings before opening the editor; only the editor was modal and focus stayed inside it. Closing that editor returned focus to settings. No browser warnings or errors were recorded. New task optional details start collapsed and expose the no-deadline explanation when opened. Empty Week has no task-tray toggle with a missing target.

The repository, website and artwork source checks are required separately. These browser checks still do not establish native behavior, user-study success, real saving or accessibility acceptance. The untested limits listed above remain.
