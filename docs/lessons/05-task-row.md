# Lesson 5: task rows and callbacks

Completed: 2026-11-10. The learner wrote and formatted the feature. Formatting, analysis, and all 11 tests passed. The old click-log experiment was not manually confirmed.

[Lesson 6](06-task-toggle.md) replaced logging with completion changes and passed manual checks. Do not repeat the old log experiment against the current app. This document keeps the historical result.

## Implementation

TaskRow was extracted from ListTile inside lib/main.dart. The parent supplies a PlannerTask through task and a callback through onToggle. The row displays the title and state and passes onToggle to ListTile.onTap.

At this stage, the callback only logged the clicked task title. Its name described its later purpose. The tasks list was still local to the parent's build method.

## Concepts

- TaskRow extends StatelessWidget and builds from external input without holding mutable state.
- final PlannerTask task is an instance field assigned once.
- required this.task is a required named parameter that initializes the field.
- super.key passes the key to the parent constructor.
- A const constructor allows constant objects when its arguments qualify. Ordinary calls do not require const.
- @override marks a method that replaces an inherited method.
- build returns a Widget that describes the interface.
- VoidCallback means void Function(): no arguments and no returned value.
- An anonymous function can capture its task through a closure.
- onTap: onToggle passes a function to run later. onToggle() calls it immediately.

Data flows from parent to child. A user action calls the function supplied by the parent. Extracting the row must keep its display and the practice counter unchanged.

## Acceptance

The [list and callback tests](../../test/task_list_widget_test.dart) kept checks at two window sizes. A standalone TaskRow test verified that building calls the callback zero times and one tap calls it once. The [counter test](../../test/practice_counter_widget_test.dart) still passed.

The learner practiced dart format lib/main.dart. Formatting, analysis, and 11 tests passed. Manual logging would have required tapping each row and checking its title in the terminal; that historical check was not confirmed.

Next, lesson 6 moves tasks into State and uses copyWith plus setState to change completion. Data still stays in memory.
