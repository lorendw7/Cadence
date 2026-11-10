# Lesson 1: describe a task

Status: completed. This is the original model exercise. Current progress and test totals are in [LEARNING.md](../LEARNING.md).

The goal was to describe a task in Dart. Allow about 20–40 minutes for explanation and practice. The learner writes the model; no new package or UI change is needed.

## Three concepts

A class describes the shape of an object. A task needs an ID, title, and completion state. An object is one task made from that description.

Fields hold information. String holds text; bool holds true or false. A final field cannot be assigned a different value after initialization. Later lessons update tasks by creating new objects.

A constructor creates an object and fills its fields. Named parameters make the caller write each parameter's name. required means the caller must supply it.

```dart
class Book {
  final String name;

  Book({required this.name});
}

final book = Book(name: 'Learning Dart');
```

Here, this.name stores the supplied name in the field. Braces make the parameters named. An optional field can have a default, such as this.isBorrowed = false, after that field has been declared.

## Exercise

Create PlannerTask in [planner_task.dart](../../lib/domain/coursework/planner_task.dart).

| Field | Type | Rule |
|---|---|---|
| id | String | Required; stable identity, not a list position |
| title | String | Required; preserve Japanese, English, and Chinese text |
| isCompleted | bool | Defaults to false; also accepts true |

Make all three fields final. Do not add blank-title validation, a database, deadlines, completion timestamps, or Flutter imports in this lesson.

Example use:

```dart
final task = PlannerTask(id: 'task-1', title: 'Submit homework');
// The title is preserved and isCompleted is false.
```

## Acceptance

The [active model tests](../../test/domain/coursework/planner_task_test.dart) check identity and title, the default incomplete state, and an explicitly completed task. The [original template](../../lessons/01_task/planner_task_test.dart.txt) is kept for reference; do not copy it over current tests.

Passing this model exercise did not add task input or saving to the app. Continue with [lesson 2](02-copy-with.md).
