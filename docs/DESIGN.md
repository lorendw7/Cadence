# Cadence design system

Updated: 2026-11-10. Direction: an **academic journal for time planning**, primarily for students and also useful to teachers and others. Courses are one kind of commitment. Cadence has its own identity; do not copy Kyushu University's official image or imply endorsement.

The selected product UI is Flutter [shadcn_ui](https://pub.dev/packages/shadcn_ui), not installed or implemented yet. The learner entry may retain Material. [UI_ARCHITECTURE.md](UI_ARCHITECTURE.md) defines component responsibilities. Web is a confirmed development target, not an existing application; mobile apps are excluded.

## Palette

| Token | Value | Use |
|-------|-------|-----|
| Muted wine | `#7C394B` | Primary actions, selected navigation, restrained brand emphasis |
| Warm paper | `#F6F5F1` | Main canvas |
| Sage | `#6F877C` | Secondary accent and personal-plan decoration |
| Ink | `#2F3033` | Main light-surface text |
| Muted ink | `#666761` | Secondary labels; check actual contrast |
| Rule | `#DDDCD5` | Dividers and calendar guides |

These are independent project colors, not a reconstruction of a university palette. Earlier wine/paper tokens are superseded. This documentation/website update applies the new palette to the public site only. Existing application artwork in `assets/brand/` is retained for the learner to migrate during the later app-design stage; no application asset migration is claimed.

Error, warning and success use semantic labels/icons. Color is never the only signal for completion or conflict. Validate actual contrast pairs; no compliance follows automatically from the palette. Dark mode, if offered, requires checked surface/text combinations and is not presumed finished in the initial MVP.

## Typography and density

Use readable system fallbacks for Japanese, English and Chinese. Dates and times should scan quickly, with weight used for hierarchy. Test 200% text scaling. Decorative handwriting and paper textures must not impair readability or inflate downloads.

Use an 8-unit rhythm, light separators and modest rounding. Show the current date/range, relevant commitments and one clear creation action before secondary controls. Accommodate long course names, locations and translations.

## Page composition

Today, Week and Tasks share one shell and one planning state. Wide windows may use side navigation; narrow desktop windows use accessible single-column navigation and dialogs. Details open when needed instead of leaving an empty panel.

Courses, meetings, study and personal arrangements are peers. Use category names/icons and restrained accents. Deadline-only tasks do not occupy calendar time. The future full timetable adds explicit conflicts and course exceptions; the MVP advertises only tested behavior.

Empty states teach the next local action instead of prompting school login. Editing needs validation, cancel and truthful results. Import replacement/clearing explains scope; small routine changes do not all need confirmation dialogs.

## Identity and artwork

Keep **Cadence** in Latin letters in every language. The independent C/clock mark can remain; never replace it with a university crest. `assets/brand/` holds the earlier application artwork; `website/assets/icon.svg` is the independently themed website rendition for this update. Retain recognizable geometry while documenting this temporary palette difference. Reconcile application assets when the learner reaches the app-design stage, rather than changing core assets during a documentation/website task.

## Privacy in the interface

The planned first Web version defaults to memory mode. Browser saving is explicit and labelled local, with backup/clearing guidance. Private JSON export is distinct from future filtered timetable sharing. Import preview explains whole-data replacement. No account, backend or cloud-saved state is implied.

School demos use fictional entries. No Kyushu affiliation is required. See [SECURITY.md](SECURITY.md) and [SCHOOL_DEMO.md](SCHOOL_DEMO.md).

## Language, access and motion

Japanese, English and Chinese provide equal features and limitations. Keep the website's Japanese default and explicit switch. Check keyboard order, focus, input methods, screen-reader labels, narrow windows and long text; do not rely on hover or color alone.

Use brief restrained transitions and respect reduced motion. Task completion and data operations need clear feedback, not decorative animation.

## Website and Web planner

The project website explains the product and links only to actual accepted deliverables. The future Flutter planner will be a separate application even if delivered beside the website. Never put private planning data into public assets. Sharing an origin also shares storage/script trust; different URL paths do not create isolation.

The website uses this academic-journal palette and fictional illustrations with accurate status. Distinguish the current teaching task list with a practice counter, concept website and planned desktop/Web application. Do not invent school endorsement, adoption, download availability or privacy guarantees.
