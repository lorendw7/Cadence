# Learning Cadence

Updated: 2026-11-12. Lessons 1–10 are implemented and accepted. Lessons 11–14 are implemented, with their remaining actual-window checks listed below. Lesson 15 is in progress. Formatting and analysis pass, all 30 active tests pass, and the Windows debug build passes for the current scrolling step. The app reads and validates titles, adds tasks, toggles completion, shows an empty list, deletes tasks, and undoes the latest deletion once. Data stays in memory.

The learner confirmed the empty-list, addition, completion and actual-window deletion/undo flows. Manual title-validation, lesson 11–12 theme and keyboard confirmation, and lesson 13 responsive and keyboard confirmation are still pending. Windows debug builds pass after symbolic-link support was enabled.

In lesson 14, the learner renamed TodayPage and its State to TasksPage, changed the heading to Tasks, and moved the task surface into a local taskContent variable. A Row now gives the task surface the remaining width. A 160-pixel sidebar appears at widths of at least 640 logical pixels. It has a workspace label and a selected ListTile for Tasks. This marks the current page; there is no page-switching action. Task data, input and undo still belong to the same State. Tests distinguish the page heading from the sidebar label and task rows from navigation rows. All 28 tests pass, including checks of the selected marker and resizing across 640 and 639 pixels while preserving tasks, draft input and pending undo. The Windows debug build passes. Actual-window appearance, resizing and keyboard confirmation remain pending. Lesson 15 will address wider text, narrow windows and focus.

Lesson 15's first step is implemented: the counter and undo buttons use Wrap with 8-pixel horizontal and row gaps. A regression checks a single row at 800 x 700 and wrapping at 200 x 700, then exercises increment, reset and pending undo after resizing. All 29 tests pass. This is a targeted layout check, not a supported minimum-window claim. No new native build or actual-window check was run for this step. Short windows, 200% text scaling and keyboard focus still need checks.

A separate temporary probe at 350 x 280 found a 30-pixel bottom overflow. The learner began the scrolling exercise and requested direct repair. The assistant moved taskContent out of the input builder into the page build method, kept taskHeader limited to the form, and replaced the inner Expanded and ListView with a CustomScrollView, SliverToBoxAdapter, SliverList and empty-state SliverFillRemaining. Task callbacks remain intact. The header and tasks now scroll together. Tests target the outer page scroll area separately from the input's own scroll area. A new active regression covers the previously failing size, reachable form and task controls, retained draft input, the empty state, undo and addition. All 30 tests and the Windows debug build pass. Actual-window confirmation, 200% text scaling and keyboard checks remain pending.

## Who does what

The learner knows other languages but is new to Dart and Flutter. Explain syntax and framework concepts before asking for code. Do not assume knowledge of named parameters, constructor shortcuts, widgets, lifecycles, or callbacks.

The learner writes core features in lib/main.dart and the modules used by each lesson. The assistant explains, reviews, runs checks, prepares useful tests, and maintains delegated documents, artwork, the website, and the repository. The assistant does not write future core features in advance.

Each lesson has one small goal: explain the concepts, let the learner write code, run checks, explain failures, and let the learner fix them. Do not weaken tests to accept incorrect behavior.

All repository documentation uses plain English. Product translations remain Japanese, English, and Chinese. Follow [the project workflow](PROJECT_WORKFLOW.md).

## Learn tools when needed

Cadence is a local planner for work, study, and daily life. The desktop core needs no account, school identity, or network connection. Desktop, Web, Android and iOS are planned targets under [ADR-010](adr/010-open-multiplatform-free-first.md). Complete the free local edition first. Cloud sync, paid capacity and supplementary ads wait for review after store launch. External academic systems remain excluded.

| Tool | Purpose | When to introduce it |
|---|---|---|
| Dart | Data, decisions, and calculations | Lesson 1 |
| Flutter and Material widgets | Basic interface and layout | After the first model lessons |
| shadcn_ui | Selected product UI controls | UI lessons, one working control at a time |
| setState | Rebuild a page after state changes | Early lists and forms |
| Riverpod | Possible later shared-state tool | Only if ordinary Flutter state sharing becomes hard to maintain |
| SQLite and drift | Save and query local data | Persistence lessons |
| Local notification adapter | Ask the OS to show reminders | After saved schedules and permission handling |
| flutter_test | Check models and UI behavior | Throughout the course |
| Dart calculations and Flutter charts | Show a local weekly review | After schedule and task data are stable |
| HTML, CSS, and JavaScript | Run the separate concept website | Maintained by the assistant |

Use Flutter 3.44.4 / Dart 3.12.2. [pubspec.yaml](../pubspec.yaml) locks shadcn_ui 0.59.0 as a direct dependency, and the lockfile records its resolved dependency graph. Lesson 12 uses its root theme bridge; migrate one working control at a time. [ADR-008](adr/008-small-free-local-product.md) keeps shadcn_ui as the product UI choice. Add another package only when a working feature needs it.

See [UI design](UI_ARCHITECTURE.md), [workflow](PROJECT_WORKFLOW.md), and [curriculum](CURRICULUM.md). Official references: [Flutter desktop](https://docs.flutter.dev/platform-integration/desktop), [Riverpod](https://riverpod.dev/), and [drift](https://drift.simonbinder.eu/).

## Learning order

Each item is a stage, not one lesson. Split stages into 20–45 minute lessons of explanation and guidance; practice takes extra time.

1. Task data: classes, fields, constructors, updates, and validation.
2. A small in-memory list: display, input, addition, completion, deletion, and undo.
3. Desktop UI, then saving: async work, storage boundaries, restart recovery of confirmed records, explicit Save, failed writes and shared state.
4. Today and personal plans: counts, date changes, start/end times, editing, deletion, and repeats.
5. Week: seven-day plans, bounded repeats, conflicts, and reliable editing.
6. Task deadlines and optional links to personal plans.
7. Full backup/restore and clear data controls. Basic recovery checks start during persistence.
8. Windows pilot and release checks.
9. Validate the free edition on macOS and Linux. Keep optional review and reminders behind the core release work.
10. Validate the free edition on Web, Android and iOS after the shared local flow works; complete each platform release separately. Review services and income after store launch.

Language support, keyboard access, protection, and tests apply throughout. Course semesters, teaching weeks and exams are optional local work after the free core; external school connections remain excluded. [Assisted import](QUICK_IMPORT.md) is a later design for local tables and screenshots, plus optional cloud help with personal API keys. It aims to reduce manual work and is not implemented. Course import waits for course rules; ordinary plans do not require them. These extensions do not block a general release. Cloud sync and monetization need a later decision after store launch. Documents, artwork, and website work do not count as core lessons.

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
| 11 and 12 | Existing regressions run under both theme layers; counter and rebuild checks locate the migrated ShadButton |
| 13 | Task-surface regressions use Shad controls; [input checks](../test/task_title_input_widget_test.dart) verify wide, compact and stacked quick-entry layouts while retaining input |
| 14 | [Shell resize check](../test/desktop_shell_widget_test.dart) covers sidebar visibility, the selected Tasks marker and retained tasks, draft input and pending undo across resizing |
| 15, in progress | [Action wrapping](../test/practice_counter_widget_test.dart) and [short-window scrolling](../test/task_scroll_widget_test.dart) cover reachable controls, draft retention, empty state, undo and addition |

Lesson 9 ended with 19 tests. Lesson 10 brought the total to 26. Lesson 13 brought the total to 27 with an explicit resize check. The suite covers deleting the last task, adding again, equal titles, separate delete/toggle callbacks, restoring the original object, position and state, and preserving input while quick entry changes layout. Older notes keep historical test counts.

## Estimates and next step

The earlier course-heavy plan estimated 64 lessons for a Windows pilot and 80–100 for broader desktop checks, plus 8–16 for Web. Those totals are historical. The current plan completes the free local core before staged desktop, Web and mobile releases; cloud sync waits for review after store launch. Keep the next UI and persistence lessons, then re-estimate the remaining core from actual progress; see [CURRICULUM.md](CURRICULUM.md).

These totals start at lesson 1 and are teaching estimates, not release promises. The old 80–140 hour estimate covered a smaller scope and no longer applies. Estimate implementation, trials, and maintenance separately. Estimate platform trials and store preparation separately; review time is not coding time. Review the plan about every eight lessons.

Next: confirm the scrolling step in an actual window, then continue lesson 15 with 200% text scaling and keyboard focus. Keep lesson 14's actual-window checks and the remaining checks for [lesson 11](lessons/11-theme.md), [lesson 12](lessons/12-shadcn-foundation.md) and [lesson 13](lessons/13-task-surface.md) open, along with [lesson 9](lessons/09-validation.md)'s title-validation confirmation. Lesson 10's actual-window deletion/undo flow is confirmed.
