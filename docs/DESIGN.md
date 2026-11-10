# Cadence design system

Updated: 2026-11-11. Direction: an **academic journal for time planning**, primarily for students and also useful to teachers and others. Courses are one kind of commitment. Cadence has its own identity; do not copy Kyushu University's official image or imply endorsement.

The selected product UI is Flutter [shadcn_ui](https://pub.dev/packages/shadcn_ui), not installed or implemented yet. The learner entry may retain Material. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) defines component responsibilities. Web is a confirmed development target, not an existing application; mobile apps are excluded.

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

These are independent project colors, not a reconstruction of a university palette. Earlier wine/paper tokens are superseded. The 2026-11-11 artwork update supplies matching v2 brand assets, interface icons, empty-state graphics and platform exports. Windows/macOS launcher references and the website use v2; Flutter page theming remains a later learner exercise. Historical artwork is retained. See the [artwork library](../assets/README.md).

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

The layout below was accepted on 2026-11-11. It is a product design, not an implemented screen. Today, Week and Tasks share a light sidebar and one planning state. Put Settings at the bottom; open Courses and Weekly Review from Week.

On wide windows, Today has a task column on the left and a daily timeline on the right, starting at roughly 40% / 60% of the content width. Its header shows the date, today's pending count and New. Week gives most space to a seven-day calendar, with a task tray that can be collapsed. Tasks uses a focused list. Full editors open in a right-side overlay only when needed.

Use fine rules and whitespace to separate sections. Avoid a dashboard of summary cards, a permanent details column and decorative notebook controls. Preserve the academic-journal character through typography, paper color, quiet accents and clear dates. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md#pages-and-navigation) defines the page interactions and responsive behavior.

Narrow windows collapse navigation and stack Today's sections. Keep Week readable through a bounded calendar scroll area or a clearly labelled day view. Editors fit the available window. Preserve selection, drafts, scroll position and focus when resizing or closing an editor.

Courses, meetings, study and personal arrangements are peers. Use category names/icons and restrained accents. Deadline-only tasks do not occupy calendar time. The future full timetable adds explicit conflicts and course exceptions; the MVP advertises only tested behavior.

Empty states teach the next local action instead of prompting school login. Editing needs validation, cancel and truthful results. Import replacement/clearing explains scope; small routine changes do not all need confirmation dialogs.

## Identity and artwork

Keep **Cadence** in Latin letters in every language. Retain the independent C/clock mark; never replace it with a university crest. `assets/brand/cadence-icon-v2.svg` is the current master; `website/assets/icon-v2.svg` is its deployment copy. The original mark geometry remains recognizable. Use the 24-unit, 1.75-stroke interface set consistently, with semantic labels and generous click targets. Decorative artwork never replaces text, validation or status feedback. The [catalogue](../assets/catalog.html) previews the complete asset family; [usage and generation instructions](../assets/README.md) describe platform exports and staged application integration.

## Privacy in the interface

The planned first Web version defaults to memory mode. Browser saving is explicit and labelled local, with backup/clearing guidance. Private JSON export is distinct from future filtered timetable sharing. Import preview explains whole-data replacement. No account, backend or cloud-saved state is implied.

School demos use fictional entries. No Kyushu affiliation is required. See [SECURITY.md](SECURITY.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md).

## Language, access and motion

Japanese, English and Chinese provide equal features and limitations. Keep the website's Japanese default and explicit switch. Check keyboard order, focus, input methods, screen-reader labels, narrow windows and long text; do not rely on hover or color alone.

Use brief restrained transitions and respect reduced motion. Task completion and data operations need clear feedback, not decorative animation.

## Website and Web planner

The project website explains the product and links only to actual accepted deliverables. The future Flutter planner will be a separate application even if delivered beside the website. Never put private planning data into public assets. Sharing an origin also shares storage/script trust; different URL paths do not create isolation.

The website uses this academic-journal palette and fictional illustrations with accurate status. Distinguish the current teaching task list with a practice counter, concept website and planned desktop/Web application. Do not invent school endorsement, adoption, download availability or privacy guarantees.
