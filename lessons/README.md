# Exercise files

## Current standalone exercise

[Lesson 18](../docs/lessons/18-async-cleanup.md) uses the [cleanup exercise](18_async_cleanup/async_cleanup.dart). The assistant supplies the reader and driver. The learner writes `tryReadTitle`. Run the exercise with Dart from the repository root.

The reader reuses the fake operation from the [lesson 17 console exercise](17_async_errors/await_errors.dart). Both exercises run separately from the Flutter app and its tests. [Lesson 17 record](../docs/lessons/17-await-errors.md)

## Historical templates

These .dart.txt files preserve the original exercises for lessons 1–3. They are not run by flutter test and do not count toward active coverage. These lessons are complete. Do not copy an old template over a current test.

| Template | Current test |
|---|---|
| [Lesson 1](01_task/planner_task_test.dart.txt) | [Task model](../test/domain/coursework/planner_task_test.dart) |
| [Lesson 2](02_copy_with/planner_task_copy_with_test.dart.txt) | [copyWith](../test/domain/coursework/planner_task_copy_with_test.dart) |
| [Lesson 3](03_task_list/task_list_widget_test.dart.txt) | [List and callbacks](../test/task_list_widget_test.dart) |

Lesson notes are in [docs/lessons](../docs/lessons/). Current progress is in [LEARNING.md](../docs/LEARNING.md). Documentation uses plain English; app sample data may use the product languages.
