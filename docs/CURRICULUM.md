# Curriculum and estimates

Updated: 2026-11-11. Lessons 1–10 are implemented, with 26 tests passing at the last application check. The learner confirmed the empty-list flow and deletion/undo in the actual window. Title-validation manual confirmation remains pending. The accepted academic-journal layout is planned, not implemented. See [current progress](LEARNING.md).

The learner writes new core features. Each lesson has about 20–45 minutes of explanation and guidance; coding, debugging, and review take extra time. Explain Dart and Flutter even when the learner knows another language.

## Baseline

Plan for 64 lessons to reach a small Windows pilot, then 16–36 for feedback, wider platform checks, and maintenance. The desktop total is 80–100 lessons from lesson 1.

These are estimates. Saving, courses, import, recovery, protection, and trial checks must pass before a pilot. Wider use also needs representative feedback and maintenance capacity. Increase the estimate when needed instead of lowering acceptance.

After lesson 10, roughly 54 lessons remain in the Windows baseline. A smaller task app that saves and restores after restart is planned around lesson 26, or about 16 more lessons. It does not include the full timetable, statistics, or reminders.

Web was provisionally estimated at 8–16 extra lessons after reusable desktop behavior, or 88–116 overall. That does not guarantee coverage of later offline-start and concurrent-clear requirements in [ADR-005](adr/005-local-offline-and-school-gated-web.md). Re-estimate before Web starts. School integration, backend work, and cloud sync are separate. Mobile apps are excluded.

## First 64 lessons

| Lessons | Count | Work | Result |
|---|---|---|---|
| 1–2 | 2 | Models, constructors, final, copyWith | Basic task model |
| 3–10 | 8 | Lists, components, state, input, completion, validation, deletion, undo | In-memory task flow |
| 11–16 | 6 | shadcn_ui compatibility and setup, theme, components, navigation, window sizes, state ownership | Desktop UI structure; Riverpod only when needed |
| 17–26 | 10 | Async work, storage boundaries, drift/SQLite, migrations, drafts, failed writes | Restart recovery, preserved input, basic backup/restore checks |
| 27–34 | 8 | Deadlines, Today groups, clock, personal plans, repeats, conflicts | Small personal-planning flow |
| 35–46 | 12 | Semesters, periods, teaching weeks, course rules, exceptions, occurrence expansion | Week timetable, moved classes, restore, conflicts |
| 47–54 | 8 | Course links, exams, sharing allowlists, import/backup, CSV/paste | Reviewable exchange and full recovery |
| 55–58 | 4 | Weekly review, calculation rules, overlap removal, boundaries | Planned-time and completion statistics |
| 59–64 | 6 | Windows running-app reminders, language checks, protection review, pilot package | Small pilot after actual acceptance |
| **Total** | **64** | Excludes Web and school integration | Desktop pilot baseline |

Each row reserves capacity; it is not one lesson. Languages, keyboard access, data safety, and tests apply throughout. Linux/macOS compile checks can start early; full native interaction checks follow later.

## Lessons 3–10

| Lesson | Goal | Acceptance |
|---|---|---|
| 3 | Display two tasks | Titles and states match at two window sizes |
| 4 | Learn StatefulWidget and setState | Counter changes rebuild the UI; explain memory-only state |
| 5 | Extract a task row | Parent keeps the list and passes callbacks |
| 6 | Toggle completion | Replace the right object; automatic and manual checks passed |
| 7 | Read a title | Input survives rebuilds; controller is disposed |
| 8 | Add a task | Unique session IDs, new row, cleared input; automatic and manual checks passed |
| 9 | Reject blank titles; show an empty list | Automatic checks passed; empty-list flow confirmed |
| 10 | Delete and undo once | Restore original object, position, and state; automated checks passed and actual-window deletion/undo confirmed |

The learner has confirmed [lesson 10](lessons/10-delete-undo.md)'s actual-window deletion/undo flow. Continue with lesson 11; retain the separate title-validation manual check in the learning log.

## Lessons 11–16: desktop UI foundations

Use the accepted [layout specification](UI_ARCHITECTURE.md#pages-and-navigation). Explain each new Dart or Flutter construct before the exercise. The learner writes the application changes; review one small step before continuing. A numbered lesson may need several exchanges.

| Lesson | Concepts and exercise | Acceptance |
|---|---|---|
| 11 | Theme basics: top-level constants, Color, hexadecimal ARGB and named theme arguments. Apply paper and wine through the existing Material theme. | The app has the new canvas and primary color direction; task behavior stays intact. No package migration yet. See [lesson 11](lessons/11-theme.md). |
| 12 | Check shadcn_ui compatibility and license, choose and lock a version, explain dependencies and the theme/root adapter, then introduce the package with one used control. | The selected package runs with the pinned SDK; migrated and remaining controls work together, with no unused dependency. |
| 13 | Build a coherent task surface: spacing, text hierarchy, input, buttons and an explicit completion checkbox. Introduce each needed component API before use. | Add, validate, complete, delete and undo still work; keyboard labels and narrow-window controls remain usable. Keep title editing deferred until an editor exists. |
| 14 | Introduce the desktop shell: sidebar layout, selection and state ownership. Put the real task flow in Tasks. | The sidebar reflects the current page. Rebuilds preserve tasks, input and undo. Add Today/Week destinations when their real features arrive; no fake calendar pages. |
| 15 | Explain layout constraints and responsive choices. Adapt the shell and list to narrow windows, long text and keyboard focus. | No unreachable controls or overflow in agreed test sizes; test 200% text scaling and visible focus. |
| 16 | Review component responsibilities and state lifetime; remove the practice counter after its teaching role ends and update its tests deliberately. | One clear owner for task state; all applicable task regressions pass. Introduce Riverpod only if actual shared-state needs justify it. |

By lesson 16, expect a themed desktop task application with a usable shell. The full Today timeline, weekly calendar, course editor and persistence are later milestones. Website mockups do not count toward these results.

## Delivering the rest of the layout

- Lessons 17–26 add explicit saving, restart recovery and failure handling to the task application.
- Lessons 27–34 add real deadlines and personal plans, then the two-column Today page, next-commitment summary, clock behavior and an editor overlay. Introduce a simple Week view when timed personal plans can populate it.
- Lessons 35–46 extend Week with courses, teaching weeks, exceptions, conflicts and the collapsible task tray. Keep seven-day and narrow-window behavior testable.
- Later stages add import, review and reminders through the existing shell. Drag-to-schedule remains optional and is not included in the baseline acceptance.

These allocations are capacity estimates, not a promise that a complex feature fits one exchange. Re-estimate when component migration or calendar work needs more practice.

## After the baseline

Lessons 65–80 focus on student feedback, varied course structures, Linux/macOS runtime behavior, keyboard and screen readers, languages, recovery, upgrades, releases, and maintenance. Lessons 81–100 allow for defects, complex input, performance, and security work.

Decide support for reminders after app exit separately for each platform. Do not claim it on an untested platform.

Review actual learning time, rework, unsupported behavior, and next scope about every eight lessons. At three to five lessons a week, 64 lessons means about 13–22 weeks, and 80–100 means about 16–34 weeks. Practice, breaks, equipment, and trial waiting time change the calendar.

## Later Web work

The provisional Web capacity covers builds and delivery, browser layout and keyboard access, explicit saving, failed storage, strict JSON preview/replace/export/clear, storage-loss notices, browser security, and real deployment checks. It assumes desktop behavior can be reused.

The initial scope excludes accounts, a backend, school APIs, CSV, notifications, and single-occurrence changes. Web deployment requires school permission. Break down and re-estimate this stage before implementation.

Follow [the workflow](PROJECT_WORKFLOW.md) for reviewed changes. A lesson is not a release; a planned test is not a passed test. Documents, artwork, and website work do not advance the core lesson count. [PRODUCT.md](PRODUCT.md) defines scope and [ROADMAP.md](ROADMAP.md) defines acceptance.
