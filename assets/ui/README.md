# Tasks interface study

Updated: 2026-11-12. This is a design handoff for the existing in-memory task exercise. Open the [local study](task-study.html) and the [artwork catalogue](../catalog.html). It follows the wine-and-white direction in the [design system](../../docs/DESIGN.md).

The learner writes the Flutter UI. This handoff does not change `lib/main.dart`, declare an asset bundle, install a package or implement another lesson. The sample language controls belong to the design viewer, not the application. [Learning progress](../../docs/LEARNING.md) owns implemented behavior and pending native checks.

## Review the design

From the repository root, run:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/assets/ui/task-study.html`. Choose a wide or compact frame, a sample language, and one of four states: a task list, an empty list, missing title feedback or a pending undo. The drawn task controls are static. Only the review selectors work. With JavaScript disabled, the initial Chinese sample stays visible.

This page is local design documentation. The existing Pages workflow still publishes only `website/`. Keep the study out of product navigation and release claims. The HTML, CSS and JavaScript here are editable sources; they are not generated from Dart.

## Composition

| Area | Proposed treatment | Why |
|---|---|---|
| Top bar | Original C mark at 36 px and a 24 px serif wordmark; white canvas | Keep the project identity without a large banner |
| Navigation | 184 px white sidebar; one Tasks marker on a wine wash | Show only the current implemented destination |
| Content | Maximum width 800 px including gutters; 32 px wide gutters and 16 px compact gutters | Align heading, entry field and task list |
| Heading | 30 px sans-serif, medium weight; one short introduction | Separate page context from task content |
| Entry | Visible title label, outlined field and one wine Add action | Make the main action easy to find |
| Task row | 16 px title, 12 px state, 20 px symbol in a 44 px target | Keep titles readable and actions reachable |
| Completion | Checked control, text label and strike-through | Communicate state without relying on color |
| Undo | Directly after the list; show the deleted title in the deletion study | Keep recovery near the affected content |
| Session notice | Small memory icon and clear text | Explain the current lack of saving |
| Practice | Neutral footer below the session notice | Keep the lesson controls, with less visual weight |

Use 8, 16, 24 and 32 px spacing and 6 px corners. The proposed sidebar hides below 640 px. Stack the entry field and Add action when the content area is narrower than 360 px. At larger text sizes, allow earlier wrapping. Text must set control height; do not clip labels to fixed heights. All task content belongs in one scroll area in the Flutter implementation.

The study expands vertically to show all content. It does not simulate a fixed-height native viewport or prove that the Flutter scroll area works. Keep the app's existing state, callbacks and learning structure when implementing visual changes. Do not add Today, Week, saving, category filters or a working language switch as part of this handoff.

## Color roles

| Role | Color | Use |
|---|---|---|
| Canvas | `#FFFFFF` | Top bar, sidebar and task surface |
| Soft neutral | `#FAFAFA` | Supporting surfaces |
| Wine | `#7C394B` | Primary action, current page and focus |
| Wine wash | `#F5EEF0` | Selected navigation and subtle hover |
| Ink | `#2F3033` | Titles and body text |
| Muted ink | `#6B6B70` | Supporting text; no opacity reduction |
| Rule | `#E8E8EB` | Decorative separators |
| Input boundary | `#87838A` | Input and unchecked control edges |

The input boundary has about 3.72:1 contrast on white. Wine has about 8.26:1; muted ink has about 5.30:1. These are solid-color calculations, not accessibility acceptance. Reserve fading for disabled controls. Use a visible wine focus outline with a gap, and preserve the existing focus when resizing. The study's review selectors demonstrate a focus outline; the drawn task controls do not accept focus.

## Small artwork set

Reuse source files rather than copying icons into new folders. The catalogue marks this subset and the manifest records each `appUse`. SVG means a scalable vector image; the files remain editable and contain no product-language text.

| Source | Display size | Proposed use |
|---|---|---|
| [Wine C mark](../brand/cadence-mark-wine.svg) | 36 px | Top bar, with a separate text wordmark |
| [Tasks](../icons/tasks.svg) | 20 px | Current page marker |
| [Add](../icons/add.svg) | 20 px | Add task beside its label |
| [Delete](../icons/delete.svg) | 20 px | Visible delete action with a localized name |
| [Undo](../icons/undo.svg) | 20 px | Undo beside its label |
| [Memory](../icons/memory.svg) | 16 px | Decorative support for the session notice |
| [Compact empty list](../illustrations/empty-tasks-compact.svg) | 96 × 72 px | Empty list with a real instruction |

The original [empty-tasks illustration](../illustrations/empty-tasks.svg) remains available for larger editorial layouts. The compact version uses white, wine and neutral rules. Its blank boxes mean an empty list; it has no success check. Do not use [all-done](../illustrations/all-done.svg) for an empty list. Sage, paper textures and the editorial painting remain part of the same artwork family without becoming application backgrounds.

The selected navigation and primary button use the shared [sprite](../icons/sprite.svg) with their host color. A standalone SVG shown as an image does not inherit surrounding text color. The study references the sprite directly; it does not duplicate its paths. Future Flutter integration needs a deliberate rendering choice in a lesson. No dependency or asset declaration is needed for this documentation.

## Maintenance and checks

The compact SVG is generated by `tools/build_artwork.py`. `tools/artwork_catalog.py` owns its description, application subset and palette metadata. Follow [the artwork regeneration order](../README.md#regeneration) after editing them. The full library previews include the compact source and record their input fingerprints.

Run the three read-only [repository checks](../../tools/README.md). Review the study at narrow and wide widths, around the 640 px sidebar threshold, in all sample states and languages. Use the 200% sample text option to inspect wrapping. This is a CSS text-size preview, not browser zoom or Flutter system scaling. Check catalogue search, combined filters, empty results, reset focus, starter shortcuts and a download after changing its controls.

### Browser review on 2026-11-12

Checked with the in-app browser and a local HTTP server. These results describe the design viewer only.

| Check | Result |
|---|---|
| 96 combinations: 320, 390, 721 and 1440 px viewports; three languages; four states; two text sizes | No page-wide horizontal overflow or reported horizontal clipping in visible sample elements. Each state showed the expected number of rows. |
| Sidebar boundary | A 639 px inner frame hid the sidebar; a 640 px inner frame showed it. Viewer gutters make frame width different from browser width. |
| Frame selectors | Desktop measured 1040 px and compact measured 360 px in a wide browser. Compact hid navigation. |
| Visual review | Chinese desktop list, compact empty list, and Japanese title-error state at 200% text were inspected. The original mark and shared sprite rendered correctly. |
| Browser log | No warnings or errors were recorded. |
| Repository checks | Repository, website and artwork checks passed. Generated preview fingerprints match the sources. |

JavaScript-disabled browsing, full browser zoom, other browser engines and screen-reader announcements were not tested. Native font appearance, keyboard traversal, input methods, long task data and short-window scrolling remain learner acceptance checks. No Flutter checks or native builds were run for this design-only change.
