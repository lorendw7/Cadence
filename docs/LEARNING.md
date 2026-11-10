# Learning Cadence

Updated: 2026-11-11. Lessons 1–10 are implemented and have passed automated checks. All 26 active tests pass. The app reads and validates titles, adds tasks, toggles completion, shows an empty list, deletes tasks, and undoes the latest deletion once. Data stays in memory.

The learner confirmed the empty-list, addition, completion and actual-window deletion/undo flows. Manual title-validation confirmation is still pending. A later cleanup removed nested setState calls from deletion without changing behavior.

## Who does what

The learner knows other languages but is new to Dart and Flutter. Explain syntax and framework concepts before asking for code. Do not assume knowledge of named parameters, constructor shortcuts, widgets, lifecycles, or callbacks.

The learner writes core features in lib/main.dart and the modules used by each lesson. The assistant explains, reviews, runs checks, prepares useful tests, and maintains delegated documents, artwork, the website, and the repository. The assistant does not write future core features in advance.

Each lesson has one small goal: explain the concepts, let the learner write code, run checks, explain failures, and let the learner fix them. Do not weaken tests to accept incorrect behavior.

All repository documentation uses plain English. Product translations remain Japanese, English, and Chinese. Follow [the project workflow](PROJECT_WORKFLOW.md).

## Learn tools when needed

Cadence is mainly for students, but teachers and others can use it without a school identity. Desktop comes first. Web is a later target that needs school permission before deployment. Mobile apps are outside scope.

| Tool | Purpose | When to introduce it |
|---|---|---|
| Dart | Data, decisions, and calculations | Lesson 1 |
| Flutter and Material widgets | Basic interface and layout | After the first model lessons |
| shadcn_ui | Selected product UI components | UI stage, after compatibility checks |
| setState | Rebuild a page after state changes | Early lists and forms |
| Riverpod | Share state between pages | When pages need shared data |
| SQLite and drift | Save and query local data | Persistence lessons |
| Local notification adapter | Ask the OS to show reminders | After saved schedules and permission handling |
| flutter_test | Check models and UI behavior | Throughout the course |
| Dart calculations and Flutter charts | Show a local weekly review | After schedule and task data are stable |
| HTML, CSS, and JavaScript | Run the separate concept website | Maintained by the assistant |

Use Flutter 3.44.4 / Dart 3.12.2. shadcn_ui, Riverpod, and drift are not installed. [pubspec.yaml](../pubspec.yaml) records installed packages. Add them only when their lessons need them.

See [UI design](UI_ARCHITECTURE.md), [workflow](PROJECT_WORKFLOW.md), and [curriculum](CURRICULUM.md). Official references: [Flutter desktop](https://docs.flutter.dev/platform-integration/desktop), [Riverpod](https://riverpod.dev/), and [drift](https://drift.simonbinder.eu/).

## Learning order

Each item is a stage, not one lesson. Split stages into 20–45 minute lessons of explanation and guidance; practice takes extra time.

1. Task data: classes, fields, constructors, updates, and validation.
2. A small in-memory list: display, input, addition, completion, deletion, and undo.
3. Desktop UI, then saving: async work, storage boundaries, restart recovery, drafts, failed writes, and shared state.
4. Today and personal plans: counts, date changes, start/end times, editing, deletion, and repeats.
5. Week and courses: single events, semesters, periods, teaching weeks, and individual class changes.
6. Task deadlines, course links, and exams.
7. Full backup/restore, filtered course sharing, and fixed-template import. Basic recovery checks start during persistence.
8. Weekly review: planned time, overlap removal, task counts, and the previous week.
9. Reminders: running-app behavior first, background behavior checked per platform.
10. Windows pilot checks, then Linux/macOS runtime checks and release work.

Language support, keyboard access, protection, and tests apply throughout. Arbitrary school-table and screenshot recognition are not starting requirements. [CSV/paste import](QUICK_IMPORT.md) follows stable models and native import. Web and school connections have separate acceptance and permission requirements. Documents, artwork, and website work do not count as core lessons.

## Tests and templates

[Historical templates](../lessons/README.md) are not active tests. Do not copy them over current tests or count them twice. Future templates may keep a .txt suffix until their implementation exists.

| Lesson | Active checks |
|---|---|
| 1 | [Task model](../test/domain/coursework/planner_task_test.dart) |
| 2 | [Immutable copy](../test/domain/coursework/planner_task_copy_with_test.dart) |
| 3 and 5 | [List and callbacks](../test/task_list_widget_test.dart), including scrolling at narrow sizes |
| 4 | [Practice counter](../test/practice_counter_widget_test.dart) |
| 6 | [Task completion](../test/task_toggle_widget_test.dart) |
| 7 and 8 | [Input and addition](../test/task_title_input_widget_test.dart): IDs, clearing, rebuilds, and controller disposal |
| 9 | [Validation](../test/task_title_validation_widget_test.dart) at two sizes |
| 10 | [Deletion](../test/task_delete_widget_test.dart) and [undo](../test/task_undo_delete_widget_test.dart) |

Lesson 9 ended with 19 tests. Lesson 10 brought the total to 26. Its checks cover deleting the last task, adding again, equal titles, separate delete/toggle callbacks, and restoring the original object, position, and state. Older notes keep historical test counts.

## Estimates and next step

The baseline is 64 lessons for a small Windows pilot and 80–100 for broader desktop validation. A basic Web version was estimated to add 8–16 lessons after reusable desktop behavior exists, or 88–116 overall. Later offline and storage requirements need a new estimate at that stage.

These totals start at lesson 1 and are teaching estimates, not release promises. The old 80–140 hour estimate covered a smaller scope and no longer applies. Estimate implementation, trials, school coordination, and maintenance separately; approval time is not coding time. Review the plan about every eight lessons.

Next: [lesson 11](lessons/11-theme.md), shared theme constants and the paper/wine direction. This lesson is assigned, not implemented. Explain the syntax before the learner edits the application. The accepted [layout](UI_ARCHITECTURE.md#pages-and-navigation) and detailed [lessons 11–16](CURRICULUM.md#lessons-1116-desktop-ui-foundations) guide the desktop UI stage. Lesson 12 introduces shadcn_ui after compatibility checks. Keep [lesson 9](lessons/09-validation.md)'s title-validation manual confirmation open; lesson 10's actual-window deletion/undo flow is confirmed.
