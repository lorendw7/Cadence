# Curriculum and estimates

Updated: 2026-11-11. Lessons 1–10 are accepted. Lesson 11's shared theme and lesson 12's shadcn_ui root integration and first ShadButton are implemented, with analysis, all 26 tests and a Windows debug build passing. Manual title-validation, theme appearance and keyboard confirmation remain pending. See [current progress](LEARNING.md).

The learner writes core features. Each lesson includes about 20–45 minutes of explanation and guidance; coding, debugging, and review take extra time. Explain Dart and Flutter even when the learner knows another language.

## Current plan

Cadence now focuses on a general-purpose local planner. Work, study, and daily life share Today, Week, and Tasks. School connections, including Kyushu, are optional extensions. [ADR-007](adr/007-general-purpose-local-planner.md) replaces the earlier school-centered scope.

Keep the next UI and persistence lessons. Remove education-specific work from the core release path and re-estimate later stages once the saving flow works.

| Stage | Work | Expected result |
|---|---|---|
| Lessons 1–2 | Models, constructors, final, copyWith | Completed task model |
| Lessons 3–10 | Lists, components, state, input, completion, validation, deletion, undo | Completed in-memory task flow |
| Lessons 11–16 | Theme, gradual shadcn_ui integration, components, navigation, window sizes, state ownership | A clear desktop task interface |
| Lessons 17–26 | Async work, explicit storage choice, drift/SQLite, migrations, explicit Save, failed writes | Restart recovery when saving is enabled, preserved input, basic backup/restore checks |
| Lessons 27–34 | Deadlines, date changes, personal plans, bounded repeats, conflicts | A small Today and personal-planning flow |
| Re-estimate after persistence | Seven-day Week view, data controls, tested backup/restore, languages, keyboard use, package checks | A small general local-planner pilot |
| Optional later lessons | Review, reminders, advanced repeats, education tools; school interfaces and Web/sync only if needed | Separately scoped extensions |

These are capacity estimates, not completion promises. The task app with restart recovery is still provisionally planned around lesson 26. A working package, safe recovery, and actual user checks determine release readiness.

Languages, keyboard access, and data protection apply throughout. Linux/macOS compilation can be checked early; runtime support needs native-host checks.

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

The learner has confirmed [lesson 10](lessons/10-delete-undo.md)'s actual-window deletion/undo flow. Lesson 11 passed automated checks. Continue lesson 12 with one real shadcn_ui control; retain the separate title-validation and theme appearance checks in the learning log.

## Lessons 11–16: desktop UI foundations

Use the accepted [layout specification](UI_ARCHITECTURE.md#pages-and-navigation). Explain each new Dart or Flutter construct before the exercise. The learner writes the application changes; review one small step before continuing. A numbered lesson may need several exchanges.

| Lesson | Concepts and exercise | Acceptance |
|---|---|---|
| 11 | Theme basics: top-level constants, Color, hexadecimal ARGB and named theme arguments. Apply paper and wine through the existing Material theme. | Implemented; formatting, analysis and 26 tests pass. Actual-window color confirmation remains. See [lesson 11](lessons/11-theme.md). |
| 12 | Check shadcn_ui 0.59.0 compatibility, add its root theme bridge and introduce one used control. Keep working Material controls during the transition. | Root integration and the first ShadButton pass analysis, 26 tests and a Windows debug build. Actual-window checks remain. See [lesson 12](lessons/12-shadcn-foundation.md). |
| 13 | Build a coherent task surface: spacing, text hierarchy, input, buttons and an explicit completion checkbox. Introduce each needed component API before use. | Add, validate, complete, delete and undo still work; keyboard labels and narrow-window controls remain usable. Keep title editing deferred until an editor exists. |
| 14 | Introduce the desktop shell: sidebar layout, selection and state ownership. Put the real task flow in Tasks. | The sidebar reflects the current page. Rebuilds preserve tasks, input and undo. Add Today/Week destinations when their real features arrive; no fake calendar pages. |
| 15 | Explain layout constraints and responsive choices. Adapt the shell and list to narrow windows, long text and keyboard focus. | No unreachable controls or overflow in agreed test sizes; test 200% text scaling and visible focus. |
| 16 | Review component responsibilities and state lifetime; remove the practice counter after its teaching role ends and update its tests deliberately. | One clear owner for task state; all applicable task regressions pass. Introduce Riverpod only if actual shared-state needs justify it. |

By lesson 16, expect a themed desktop task application with a usable shell. The full Today timeline, weekly calendar, course editor and persistence are later milestones. Website mockups do not count toward these results.

## Completing the local planner

Lessons 17–26 add explicit local saving or temporary use, restart recovery, and failure handling. Lessons 27–34 add deadlines and personal plans, then the Today layout, next-plan summary, clock updates, and an editor. Introduce Week when real timed plans can populate it.

The general pilot needs working Today, Week, and Tasks; bounded repeats; full backup and recovery; understandable data controls; keyboard and language checks; and a tested desktop package. It does not require semesters, exams, school APIs, cloud accounts, or sync.

Keep seven-day and narrow-window behavior testable. Drag-to-schedule is optional. Introduce a shared-state library only when the app's real ownership needs justify it.

## Optional work

Course rules, teaching weeks, class exceptions and filtered course sharing form an education extension. [Assisted import](QUICK_IMPORT.md) covers local CSV/paste and screenshots, with optional personal API keys for cloud help. It follows editing and recovery; only course input depends on the education extension. Kyushu and other school connections need their own permission and interface checks. They do not block general releases. These plans do not advance the current lesson or authorize assistant-written core features.

Local review and reminders can follow a reliable core. Check reminders after app exit per platform before promising them. Web and synchronization are considered only when a school connection needs them, with separate scope, maintenance, storage and security decisions.

## Earlier estimates

The earlier course-heavy plan reserved 64 lessons for a Windows pilot and 80–100 for broader desktop validation. Its later Web estimate added 8–16 lessons, or 88–116 overall. These are historical estimates, not the new core budget.

Do not claim a shorter schedule simply because school features moved out. Reliable saving, recovery, calendar behavior, accessibility, and package checks still need time. Review progress about every eight lessons and estimate the next stage from actual learning and rework.

A lesson is not a release, and a planned check is not a passed check. Documentation, art, and website maintenance do not increase the completed core lesson count. Follow [the workflow](PROJECT_WORKFLOW.md), [product scope](PRODUCT.md), and [roadmap](ROADMAP.md).
