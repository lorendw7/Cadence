# Cadence design system

Updated: 2026-11-12. Cadence is a general-purpose local time planner with a **quiet journal** visual style. Work, study and personal life share the same planning space. Courses are an optional kind of commitment. [ADR-007](adr/007-general-purpose-local-planner.md) sets the current scope. Cadence has its own identity and does not imply endorsement by a school or other institution.

This document describes the target design. The user selected wine and pure white. A later explicit request authorized the assistant to remove the practice counter and align the existing application's colors: white canvas and sidebar, wine actions, wine-wash selection and hover, neutral text and visible input boundaries. Other proposed layout and artwork details below remain design work, not a release. [LEARNING.md](LEARNING.md) remains the source for actual behavior and checks.

The product UI uses Flutter shadcn_ui under [ADR-008](adr/008-small-free-local-product.md). Preserve the journal style and integrate the selected controls gradually without extra wrapper layers. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) defines component responsibilities. Target a free local edition for desktop, Web, Android and iOS under [ADR-010](adr/010-open-multiplatform-free-first.md). No account or ad view is required for the free core. Review cloud sync and optional ads after store launch. External academic systems remain excluded.

## Palette

The user selected the original wine accent on 2026-11-12. Keep a pure white software canvas, fewer accent colors and clear whitespace. Use the original C mark and rhythm dot without recoloring the artwork family.

| Token | Value | Use |
|-------|-------|-----|
| White | `#FFFFFF` | Main app canvas and top bar |
| Soft neutral | `#FAFAFA` | Quiet secondary surfaces |
| Muted wine | `#7C394B` | Primary action, selected navigation and focus |
| Wine wash | `#F5EEF0` | Selected navigation and subtle control hover |
| Ink | `#2F3033` | Main light-surface text |
| Muted ink | `#6B6B70` | Secondary labels |
| Rule | `#E8E8EB` | Decorative dividers and calendar guides |
| Input boundary | `#87838A` | Visible input edge on white |

These are independent project colors, not a reconstruction of a university palette. Warm paper `#F6F5F1`, sage `#6F877C` and dark sage `#415A4E` remain part of the artwork and website concepts. They do not define the new app canvas. The 2026-11-11 artwork update supplies v2 brand assets, interface icons, empty-state graphics and platform exports. Windows/macOS launcher references and the website use v2. Lessons 11–13 record the initial warm-paper theme and task surface; their historical results remain unchanged. The learning app also has a basic Tasks shell; full planning views remain future learner work. See the [artwork library](../assets/README.md).

Error, warning and success use semantic labels/icons. Color is never the only signal for completion or conflict. Validate actual contrast pairs; no compliance follows automatically from the palette. Dark mode, if offered, requires checked surface/text combinations and is not presumed finished in the initial MVP.

### Color pairs

These calculated ratios use the exact solid colors on white `#FFFFFF`. Opacity, images and different surfaces change the result. They are palette calculations, not an accessibility acceptance result. Check final controls and focus states in context.

| Foreground | Contrast on white | Use |
|---|---:|---|
| Ink `#2F3033` | 13.20:1 | Body text and headings |
| Muted ink `#6B6B70` | 5.30:1 | Secondary text |
| Wine `#7C394B` | 8.26:1 | Links, selected labels and focus |
| Rule `#E8E8EB` | 1.22:1 | Decorative separators; not the only control boundary |

Keep the sage accents in the illustration family. Do not lower text opacity to create a muted state; use a checked solid color and a text or icon label when the state matters.

## Typography and density

Use readable system fallbacks for Japanese, English and Chinese. Dates and times should scan quickly, with weight used for hierarchy. Test 200% text scaling. Decorative handwriting and paper textures must not impair readability or inflate downloads.

Use an 8-unit rhythm, light separators and modest rounding. Show the current date/range, relevant commitments and one clear creation action before secondary controls. Accommodate long course names, locations and translations.

For the proposed task surface, target an 800-unit maximum content width, with 32-unit gutters in wide windows and 16-unit gutters in compact windows. These are Flutter logical pixels. Align the heading, entry form and list. Keep the practice counter and its controls visually secondary while they remain part of the lessons. Let controls grow with text and keep the form and list in one scrolling area. These are design targets, not changes to the current code.

### Proposed type and spacing

| Element | Starting size | Treatment |
|---|---|---|
| Cadence wordmark | 24 | Serif, regular weight; retain the Latin brand name |
| Page heading | 28–30 | Sans-serif, medium weight; one clear title |
| Task title and input | 15–16 | Sans-serif; prioritize legibility over decorative style |
| Status and supporting text | 12–14 | Solid muted ink; never low-opacity body text |
| Main spacing | 8, 16, 24, 32 | Use consistent gaps rather than large empty regions |
| Controls | At least 44 high where practical | Allow more height at large text sizes |
| Corners | 6 | Quiet rounding; reserve pills for brief state labels |

Sizes are starting points in logical pixels. Verify real fonts, long titles and 200% text scaling before accepting them. Use serif text only for the brand or a small editorial heading. Keep task content, dates, labels and buttons in the readable system sans-serif family.

### Proposed Tasks screen

- Keep the original C mark beside a small serif Cadence wordmark. Use readable sans-serif text for controls and task content. Georgia is a possible wordmark font where available, with a system fallback and no required font download.
- Keep the top bar, sidebar and task canvas white. Use a fine rule to separate navigation. Only the current Tasks marker receives a wine wash. Do not add links to pages that are not implemented.
- Use a 30-unit task heading, a short muted introduction and one wine Add action. Avoid a large promotional heading inside the working app.
- Give task titles more weight than their status labels. Completed tasks keep their text label and strike-through. Keep the labelled delete control visible, including without hover.
- Keep practice actions below the list and visually secondary. Explain that tasks last only for this session. This notice does not implement the planned saving choice.
- For an empty list, propose a small note icon and an instruction. Keep large editorial illustrations on the concept website rather than inside the working task list.

### Color and interaction states

| State | Proposed appearance | Required cue besides color |
|---|---|---|
| Primary action | Wine fill and white text | A clear verb, such as Add task |
| Current navigation | Wine text/icon on a wine wash | Selected semantics and a visible page title |
| Unchecked task | White fill with a visible outline | An unchecked control state |
| Completed task | Wine check, muted title and strike-through | Checked semantics and a completion label |
| Keyboard focus | Wine ring with visible separation from the control | Preserve focus during resizing and validation |
| Hover | A subtle wine wash on secondary controls | Keep all actions available without hover |
| Disabled action | Quiet neutral treatment | Disabled semantics; never rely only on fading |
| Validation error | Local error text near the relevant field | Explain how to correct it; retain the draft |

Use one visual priority per area. Wine should identify the main action or current state, not fill every heading, icon and divider. Use neutral rules for structure. Avoid large wine panels, gradients, heavy shadows and a grid of decorative cards. Fine rules are decorative; controls still need visible boundaries.

For the later Week view, keep labels on every event. Wine can mark the selected event and current-time indicator. Other entries use white or a very light neutral surface. Add more category colors only if labels and grouping prove insufficient; the artwork's sage does not require green controls throughout the app.

### Design acceptance still to perform

Compare the proposed Tasks, Today and Week layouts at wide and narrow desktop widths before coding them. Then verify the learner's implementation with actual fonts, keyboard focus, long Chinese/Japanese/English labels, 200% text scaling, empty and completed lists, validation errors and reachable undo. Check control contrast on its actual surface. None of these future checks is established by this document or by the earlier website checks.

## Page composition

The [desktop feature baseline](PRODUCT.md#first-useful-local-product) owns scope. [Desktop design priorities](REDESIGN.md#desktop-design-priorities) set the first implementation choices. Colors and sizes here describe the target interface; they do not certify the current learning app.

The layout below was accepted on 2026-11-11. It is a product design, not an implemented screen. Today, Week and Tasks share a light sidebar and one planning state. Put Settings at the bottom and open Weekly Review from Week. Course tools belong to the optional course extension rather than the main navigation for everyone.

On wide windows, Today has a task column on the left and a daily timeline on the right, starting at roughly 40% / 60% of the content width. Its header shows the date, today's pending count and New. Week gives most space to a seven-day calendar, with a task tray that can be collapsed. Tasks uses a focused list. Full editors open in a right-side overlay only when needed.

Use fine rules and whitespace to separate sections. Avoid a dashboard of summary cards, a permanent details column and decorative notebook controls. Preserve the quiet-journal character through typography, a white canvas, restrained accents and clear dates. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md#pages-and-navigation) defines the page interactions and responsive behavior.

Narrow windows collapse navigation and stack Today's sections. The first desktop Week view uses a bounded horizontal calendar scroll area with readable day columns and a visible scroll cue. A separate day view is deferred until trials show a need. Editors fit the available window. Preserve selection, drafts, scroll position and focus when resizing or closing an editor.

Meetings, study sessions, errands and personal arrangements are peers. Use category names/icons and restrained accents. Deadline-only tasks do not occupy calendar time. Optional course tools can add teaching weeks and course exceptions without changing the core task/event model. Advertise only tested behavior.

Empty states teach the next local action. Core planning has no login requirement. Editing needs validation, cancel and truthful results. Import replacement/clearing explains scope; small routine changes do not all need confirmation dialogs.

## Identity and artwork

The [Tasks design handoff](../assets/ui/README.md) adds a local visual study for the current task exercise. It compares four sample states, three sample languages and wide or compact layouts. Its artwork subset and small white-canvas empty state reuse this visual family. This is design documentation; the learner still writes the application UI. Browser results for the study do not close native application acceptance checks.

Keep **Cadence** in Latin letters in every language. Retain the independent C/clock mark; never replace it with a university crest. `assets/brand/cadence-icon-v2.svg` is the current master; `website/assets/icon-v2.svg` is its deployment copy. The original mark geometry remains recognizable. Use the 24-unit, 1.75-stroke interface set consistently, with semantic labels and generous click targets. Decorative artwork never replaces text, validation or status feedback. The [catalogue](../assets/catalog.html) previews the complete asset family; [usage and generation instructions](../assets/README.md) describe platform exports and staged application integration.

Keep editable artwork separate from delivery exports. Preserve the editorial PNG master and use the generated 480/960/1536 px WebP files on the website. The asset manifest records source paths, dimensions and byte budgets; `python tools/check_artwork.py` checks them. Choose responsive image sizes from the displayed layout and reserve the aspect ratio to avoid shifts while loading.

## Multiple platforms and the free edition

Keep the same white-and-wine identity and three main destinations across desktop, Web and phones. Adapt layout to available space, touch, keyboard and text scaling. Preserve readable dates and visible actions; do not squeeze a desktop calendar onto a phone. [FREE_EDITION.md](FREE_EDITION.md) defines platform checks and local-data limits. No subscriptions, paid capacity or feature tiers are planned. Everyone receives the same free functions. Sync and ads remain later candidates; do not add their controls to the current desktop design.

## Privacy in the interface

On first use, offer **Save on this device** and **Temporary use** before opening any saved planning data. Explain that local saving keeps records on this device, while temporary use keeps them in the current session and loses them on close. Do not infer a saving choice from app launch or sign-in. Label the active mode and explain any later switch, including whether an existing saved copy is kept or cleared.

The same choice applies if a browser client is later built. Show truthful write results and backup/clearing guidance. Private JSON backup is separate from filtered sharing. Import preview explains replacement scope. No account, backend or cloud-saved state is implied; optional sync needs a separate opt-in.

All demos use fictional entries. External academic-system connections, including Kyushu adapters, are removed from the current scope. The school research remains historical reference only. See [SECURITY.md](SECURITY.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md).

## Language, access and motion

Japanese, English and Chinese provide equal features and limitations. Keep the website's Japanese default and explicit switch. Check keyboard order, focus, input methods, screen-reader labels, narrow windows and long text; do not rely on hover or color alone.

Use brief restrained transitions and respect reduced motion. Task completion and data operations need clear feedback, not decorative animation.

## Website and Web planner

The project website explains the product and links only to actual accepted deliverables. The future Flutter planner will be a separate application even if delivered beside the website. Never put private planning data into public assets. Sharing an origin also shares storage/script trust; different URL paths do not create isolation.

The website uses a pure white page with color editorial artwork and accurate concept status. Original paper and sage colors remain inside the artwork. The app refresh does not regenerate artwork or change the website. Distinguish the current teaching task list with a practice counter, concept website, planned local desktop application and optional later clients. Do not invent endorsement, adoption, download availability or privacy guarantees. A general desktop or Web release does not depend on school permission; external academic-system connections remain excluded.
