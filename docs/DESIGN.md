# Cadence design system

Updated: 2026-11-11. Cadence is a general-purpose local time planner with a **quiet journal** visual style. Work, study and personal life share the same planning space. Courses are an optional kind of commitment. [ADR-007](adr/007-general-purpose-local-planner.md) sets the current scope. Cadence has its own identity and does not imply endorsement by a school or other institution.

The product UI uses Flutter shadcn_ui under [ADR-008](adr/008-small-free-local-product.md). Preserve the journal style and integrate the selected controls gradually without extra wrapper layers. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) defines component responsibilities. The core is an offline desktop app without accounts. External academic systems, school login, Web delivery and sync are outside the current plan under [ADR-009](adr/009-local-focus-without-school-connections.md); mobile apps are excluded.

## Palette

| Token | Value | Use |
|-------|-------|-----|
| Muted wine | `#7C394B` | Primary actions, selected navigation, restrained brand emphasis |
| Warm paper | `#F6F5F1` | Main canvas |
| Sage | `#6F877C` | Secondary accent and personal-plan decoration |
| Dark sage | `#415A4E` | Green labels and icons on light surfaces |
| Ink | `#2F3033` | Main light-surface text |
| Muted ink | `#666761` | Secondary labels on warm paper |
| Rule | `#DDDCD5` | Dividers and calendar guides |

These are independent project colors, not a reconstruction of a university palette. Earlier wine/paper tokens are superseded. The 2026-11-11 artwork update supplies matching v2 brand assets, interface icons, empty-state graphics and platform exports. Windows/macOS launcher references and the website use v2. Lessons 11–13 apply the initial Flutter theme and task surface; the full shell and planning views remain future learner work. Historical artwork is retained. See the [artwork library](../assets/README.md).

Error, warning and success use semantic labels/icons. Color is never the only signal for completion or conflict. Validate actual contrast pairs; no compliance follows automatically from the palette. Dark mode, if offered, requires checked surface/text combinations and is not presumed finished in the initial MVP.

### Color pairs

These ratios use the exact solid colors on warm paper `#F6F5F1`. Opacity, images and different surfaces change the result. Check final controls and focus states in context.

| Foreground | Contrast on paper | Use |
|---|---:|---|
| Ink `#2F3033` | 12.10:1 | Body text and headings |
| Muted ink `#666761` | 5.23:1 | Secondary text |
| Wine `#7C394B` | 7.57:1 | Links, selected labels and focus |
| Dark sage `#415A4E` | 6.88:1 | Green text and meaningful icons |
| Sage `#6F877C` | 3.54:1 | Decoration; do not use for normal small text |
| Rule `#DDDCD5` | 1.26:1 | Decorative separators; not the only control boundary |

Keep the light sage accent for the illustration family. Dark sage provides readable green labels without changing that artwork. Do not lower text opacity to create a muted state; use a checked solid color and a text or icon label when the state matters.

## Typography and density

Use readable system fallbacks for Japanese, English and Chinese. Dates and times should scan quickly, with weight used for hierarchy. Test 200% text scaling. Decorative handwriting and paper textures must not impair readability or inflate downloads.

Use an 8-unit rhythm, light separators and modest rounding. Show the current date/range, relevant commitments and one clear creation action before secondary controls. Accommodate long course names, locations and translations.

## Page composition

The layout below was accepted on 2026-11-11. It is a product design, not an implemented screen. Today, Week and Tasks share a light sidebar and one planning state. Put Settings at the bottom and open Weekly Review from Week. Course tools belong to the optional course extension rather than the main navigation for everyone.

On wide windows, Today has a task column on the left and a daily timeline on the right, starting at roughly 40% / 60% of the content width. Its header shows the date, today's pending count and New. Week gives most space to a seven-day calendar, with a task tray that can be collapsed. Tasks uses a focused list. Full editors open in a right-side overlay only when needed.

Use fine rules and whitespace to separate sections. Avoid a dashboard of summary cards, a permanent details column and decorative notebook controls. Preserve the quiet-journal character through typography, paper color, restrained accents and clear dates. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md#pages-and-navigation) defines the page interactions and responsive behavior.

Narrow windows collapse navigation and stack Today's sections. Keep Week readable through a bounded calendar scroll area or a clearly labelled day view. Editors fit the available window. Preserve selection, drafts, scroll position and focus when resizing or closing an editor.

Meetings, study sessions, errands and personal arrangements are peers. Use category names/icons and restrained accents. Deadline-only tasks do not occupy calendar time. Optional course tools can add teaching weeks and course exceptions without changing the core task/event model. Advertise only tested behavior.

Empty states teach the next local action. Core planning has no login requirement. Editing needs validation, cancel and truthful results. Import replacement/clearing explains scope; small routine changes do not all need confirmation dialogs.

## Identity and artwork

Keep **Cadence** in Latin letters in every language. Retain the independent C/clock mark; never replace it with a university crest. `assets/brand/cadence-icon-v2.svg` is the current master; `website/assets/icon-v2.svg` is its deployment copy. The original mark geometry remains recognizable. Use the 24-unit, 1.75-stroke interface set consistently, with semantic labels and generous click targets. Decorative artwork never replaces text, validation or status feedback. The [catalogue](../assets/catalog.html) previews the complete asset family; [usage and generation instructions](../assets/README.md) describe platform exports and staged application integration.

Keep editable artwork separate from delivery exports. Preserve the editorial PNG master and use the generated 480/960/1536 px WebP files on the website. The asset manifest records source paths, dimensions and byte budgets; `python tools/check_artwork.py` checks them. Choose responsive image sizes from the displayed layout and reserve the aspect ratio to avoid shifts while loading.

## Privacy in the interface

On first use, offer **Save on this device** and **Temporary use** before opening any saved planning data. Explain that local saving keeps records on this device, while temporary use keeps them in the current session and loses them on close. Do not infer a saving choice from app launch or sign-in. Label the active mode and explain any later switch, including whether an existing saved copy is kept or cleared.

The same choice applies if a browser client is later built. Show truthful write results and backup/clearing guidance. Private JSON backup is separate from filtered sharing. Import preview explains replacement scope. No account, backend or cloud-saved state is implied; optional sync needs a separate opt-in.

All demos use fictional entries. External academic-system connections, including Kyushu adapters, are removed from the current scope. The school research remains historical reference only. See [SECURITY.md](SECURITY.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md).

## Language, access and motion

Japanese, English and Chinese provide equal features and limitations. Keep the website's Japanese default and explicit switch. Check keyboard order, focus, input methods, screen-reader labels, narrow windows and long text; do not rely on hover or color alone.

Use brief restrained transitions and respect reduced motion. Task completion and data operations need clear feedback, not decorative animation.

## Website and Web planner

The project website explains the product and links only to actual accepted deliverables. The future Flutter planner will be a separate application even if delivered beside the website. Never put private planning data into public assets. Sharing an origin also shares storage/script trust; different URL paths do not create isolation.

The website uses this quiet-journal palette and fictional illustrations with accurate status. Distinguish the current teaching task list with a practice counter, concept website, planned local desktop application and optional later clients. Do not invent endorsement, adoption, download availability or privacy guarantees. A general desktop or Web release does not depend on school permission; only the relevant school extension does.
