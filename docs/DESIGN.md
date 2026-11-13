# Cadence design system

Updated: 2026-11-13. Cadence is a general-purpose local time planner with a **quiet journal** visual style. Work, study and personal life share the same planning space. Tasks, deadlines, personal plans, Today and Week stay central. Direct editing and phone access are the first product flow under [ADR-013](adr/013-local-planner-and-conditional-academic-access.md). A timetable is one source of commitments, not a required setup or identity. Cadence has its own identity and does not imply endorsement by a school or other institution.

This document describes the target design. The user selected wine and pure white. A later explicit request authorized the assistant to remove the practice counter and align the existing application's colors: white canvas and sidebar, wine actions, wine-wash selection and hover, neutral text and visible input boundaries. Other proposed layout and artwork details below remain design work, not a release. [LEARNING.md](LEARNING.md) remains the source for actual behavior and checks.

The product UI uses Flutter shadcn_ui under [ADR-008](adr/008-small-free-local-product.md). Preserve the journal style and integrate the selected controls gradually without extra wrapper layers. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) defines component responsibilities. Build the first complete local flow on Windows, then Android without waiting for every macOS/Linux release. Design phone-sized views from the start. Other native targets need separate acceptance; iOS depends on host/device readiness and Web is later. No account or ad view is required for the free core. Review cloud sync and optional ads after store launch. Academic access remains a deferred extension, with no approved integration.

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

Use hierarchy to make the next decision easy. The page heading names the destination. The date sets its context. A commitment's title and time are primary content; location and repeat scope support them. Keep deadline labels attached to tasks, never styled as duration blocks. Use consistent time alignment and tabular numerals where the font supports them. Keep task metadata compact; repeat explanations belong in details. Avoid a large greeting or quotation above the day's work.

For the proposed task surface, target an 800-unit maximum content width, with 32-unit gutters in wide windows and 16-unit gutters in compact windows. These are Flutter logical pixels. Align the heading, entry form and list. Let controls grow with text and keep the form and list in one scrolling area. These are design targets, not changes to the current code.

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
- Use a 30-unit task heading and one wine Add action. A task title is enough; reveal optional deadline and notes through a labelled details control. Do not make a short capture form look like a full appointment editor.
- Give task titles more weight than their status labels. Completed tasks keep their text label and strike-through. Keep the labelled delete control visible, including without hover.
- Keep undo reachable after list changes. The current prototype must explain that tasks last only for this session. This notice does not implement the planned saving choice; the practice counter was retired in lesson 16.
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

For the later Week view, keep labels on every event. Wine can mark the selected event and current-time indicator. Other entries use white or a very light neutral surface. Mark the current date with a Today label; use a separate outline or wash for the selected date. Selecting Thursday must not make Thursday look like today. Add more category colors only if labels and grouping prove insufficient; the artwork's sage does not require green controls throughout the app.

### Design acceptance still to perform

Compare Tasks, Today, Week and single-occurrence editing at wide desktop and compact phone sizes before coding them. Then verify the learner's implementation with actual fonts, keyboard focus, long Chinese/Japanese/English labels, 200% text scaling, empty and completed lists, validation errors and reachable undo. Check control contrast on its actual surface. None of these future checks is established by this document or by the earlier website checks.

## Page composition

The [desktop feature baseline](PRODUCT.md#first-useful-local-product) owns scope. [Desktop design priorities](REDESIGN.md#desktop-design-priorities) set the first implementation choices. Colors and sizes here describe the target interface; they do not certify the current learning app.

The layout builds on the 2026-11-11 design and the accepted ADR-013 workflow. It is not an implemented screen. Today, Week and Tasks share one planning state, with a light sidebar on wide windows. Keep Settings secondary and open optional Weekly Review from Week. Any later import is an optional entry action into the shared planner, not a compulsory setup step. Screenshot recognition is built only if needed; it does not delay direct editing or phone work.

On wide windows, Today has a task column on the left and a daily timeline on the right, starting at roughly 40% / 60% of the content width. Its header shows the date, today's pending count and New. Use one clear timeline track, a labelled current-time marker and readable gap start/end times and durations. Do not imply that an unrecorded interval is guaranteed free time.

Week gives most space to a seven-day calendar. Use one shared hour ruler instead of repeating it inside every day. Keep the ruler, date headings, all-day band and timed rows aligned. A collapsible task tray sits beside the grid when space allows. It shows task titles and real deadlines while the calendar remains visible. On narrower layouts, stack the tray or let the user expand it without squeezing the date columns. Tasks uses a focused list. Full editors open in a right-side overlay only when needed and use the full available width on phones.

Use fine rules and whitespace to separate sections. Avoid a dashboard of summary cards, a permanent details column and decorative notebook controls. Preserve the quiet-journal character through typography, a white canvas, restrained accents and clear dates. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md#pages-and-navigation) defines the page interactions and responsive behavior.

Narrow windows collapse navigation and stack Today's sections. Put the current/next commitment first, then the daily agenda and reachable task groups; keep the due-today count near the date. The first desktop Week view uses a bounded horizontal calendar scroll area with readable day columns and a visible scroll cue. The compact phone view needs a readable date selector and daily agenda rather than a squeezed seven-column desktop grid. Keep every day reachable from Week. Editors fit the available window. Preserve selection, drafts, scroll position and focus when resizing or closing an editor.

Meetings, study sessions, errands and personal arrangements are peers. Use category names/icons and restrained accents. Deadline-only tasks do not occupy calendar time. Imported classes follow the same planning model. Minimal time/room changes, cancellation and restoration for one occurrence are part of the useful flow. Add teaching-week or odd/even rules only when the supported input requires them; mark unsupported rules before saving. Advertise only tested behavior.

Empty states teach the next local action. Core planning has no login requirement. Editing needs validation, cancel and truthful results. Import always shows a draft before commitment, flags uncertain fields and explains additions or replacement scope. Reject unsupported input without inventing data. Small routine edits do not all need confirmation dialogs, but occurrence versus series scope must stay visible.

### Responsive design review

The [local planner study](../assets/ui/planner-study.html) explores Today, Week and Tasks using fictional data. Read its [handoff and limits](../assets/ui/PLANNER_STUDY.md) before treating an interaction as application behavior. It extends the product design beyond the earlier teaching-exercise study; it does not replace that historical record. The [competitive review](COMPETITIVE_REVIEW.md) records the official references behind simpler capture, visible gaps and tasks beside a calendar. These are bounded design choices to test, not a reason to copy another product's branding or feature set.

| Layout | Keep visible | Adaptation to review |
|---|---|---|
| Wide desktop | Sidebar, date, creation action and current selection | Tasks stays focused; Today places tasks beside time; Week shares a ruler and keeps its optional task tray beside the grid |
| Narrow window | Page title, all three destinations and a clear return path | Stack sections before their text becomes cramped; scroll the calendar only within its own region |
| Phone | Current/next time and place, selected date and reachable tasks | Use a daily agenda and full-width editor; preserve room for the on-screen keyboard |
| Large text | Full labels, validation and action names | Grow controls and wrap content; a decorative fixed-height card must not clip information |

Use the same records across layouts. Include work, study and personal entries across several days so a weekly view can be assessed. Check a long location, an undated task, an exact deadline, an empty day and a failed save. Confirm that the user can tell what is due from what has time reserved, and today from the selected date. Browser layout checks provide design feedback; native keyboard, screen-reader, font and lifecycle checks remain separate. They do not establish user demand.

## Identity and artwork

The [Tasks design handoff](../assets/ui/README.md) adds a local visual study for the current task exercise. It compares four sample states, three sample languages and wide or compact layouts. Its artwork subset and small white-canvas empty state reuse this visual family. This is design documentation; the learner still writes the application UI. Browser results for the study do not close native application acceptance checks.

Keep **Cadence** in Latin letters in every language. Retain the independent C/clock mark; never replace it with a university crest. `assets/brand/cadence-icon-v2.svg` is the current master; `website/assets/icon-v2.svg` is its deployment copy. The original mark geometry remains recognizable. Use the 24-unit, 1.75-stroke interface set consistently, with semantic labels and generous click targets. Decorative artwork never replaces text, validation or status feedback. The [catalogue](../assets/catalog.html) previews the complete asset family; [usage and generation instructions](../assets/README.md) describe platform exports and staged application integration.

Keep editable artwork separate from delivery exports. Preserve the editorial PNG master and use the generated 480/960/1536 px WebP files on the website. The asset manifest records source paths, dimensions and byte budgets; `python tools/check_artwork.py` checks them. Choose responsive image sizes from the displayed layout and reserve the aspect ratio to avoid shifts while loading.

## Multiple platforms and the free edition

Keep the same white-and-wine identity and three main destinations across desktop, phones and later Web. Share Flutter models, validation and planning rules. The first Windows flow includes storage, tasks, deadlines, personal plans, Today/Week, minimal corrections and recovery; Android follows without waiting for all other desktop releases. Adapt layout to available space, touch, keyboard and text scaling. Preserve readable dates and visible actions; do not squeeze a desktop calendar onto a phone. [FREE_EDITION.md](FREE_EDITION.md) defines platform checks and local-data limits. No subscriptions, paid capacity or feature tiers are planned. Everyone receives the same free functions. The optional Google-login sync stack is selected in [ADR-011](adr/011-optional-sync-service.md), with implementation and ads deferred until review after store launch. Do not add service controls to the current local design.

## Privacy in the interface

On first use, offer **Save on this device** and **Temporary use** before opening any saved planning data. Explain that local saving keeps records on this device, while temporary use keeps them in the current session and loses them on close. Do not infer a saving choice from app launch or sign-in. Label the active mode and explain any later switch, including whether an existing saved copy is kept or cleared.

The same choice applies if a browser client is later built. Show truthful write results and backup/clearing guidance. Private JSON backup is separate from filtered sharing. Import preview explains replacement scope. No account, backend or cloud-saved state is implied; optional sync needs a separate opt-in.

All demos use fictional entries. Academic access is a deferred extension, with no approved adapter or real-data connection. A public concept must not imply school endorsement or continuous course updates. See [SECURITY.md](SECURITY.md), [UNIVERSITY_INTEGRATION.md](UNIVERSITY_INTEGRATION.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md).

## Language, access and motion

Japanese, English and Chinese provide equal features and limitations. Keep the website's Japanese default and explicit switch. Check keyboard order, focus, input methods, screen-reader labels, narrow windows and long text; do not rely on hover or color alone.

Use brief restrained transitions and respect reduced motion. Task completion and data operations need clear feedback, not decorative animation.

## Website and Web planner

The project website explains the product and links only to actual accepted deliverables. The future Flutter planner will be a separate application even if delivered beside the website. Never put private planning data into public assets. Sharing an origin also shares storage/script trust; different URL paths do not create isolation.

The website uses a pure white page with color editorial artwork and accurate concept status. Original paper and sage colors remain inside the artwork. The app refresh does not regenerate artwork or change the website. Distinguish the current memory-only teaching task list, concept website, planned complete Windows workflow and follow-on Android client. Lesson 16 retired the practice counter; the design change does not implement planning or import. Do not invent endorsement, adoption, download availability or privacy guarantees. A general desktop or Web release does not depend on school permission; academic-source access still needs its own confirmed permission and implementation gates.
