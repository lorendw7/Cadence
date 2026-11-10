# Lesson 2: update an immutable task

Completed: 2026-11-09. The learner wrote the feature; the assistant supplied tests and review. The [three copy tests](../../test/domain/coursework/planner_task_copy_with_test.dart) passed. Together with three model tests and the home-page test, the historical total was seven. The [original template](../../lessons/02_copy_with/planner_task_copy_with_test.dart.txt) remains for reference.

## Why create a new object?

Like a final field in Java, task.isCompleted cannot be reassigned. Return a new object with the same ID and title and a new completion state. Keep the original unchanged.

copyWith is a naming convention, not a Dart keyword or an automatically generated method.

## Syntax

- bool? accepts true, false, or null. bool cannot be null.
- An omitted optional named parameter is null unless it has another default.
- a ?? b uses a when it is not null; otherwise it uses b. false is not null.
- When a parameter and field share a name, isCompleted refers to the parameter and this.isCompleted refers to the field.

## Exercise

Add this instance method to PlannerTask:

```dart
PlannerTask copyWith({bool? isCompleted})
```

Return a new PlannerTask. Keep id and title. Use the supplied state, or keep the old state if no value is supplied. Keep the fields final; do not add setters or change constructor defaults.

```dart
final task = PlannerTask(id: 'task-1', title: 'Submit homework');
final completed = task.copyWith(isCompleted: true);
final reopened = completed.copyWith(isCompleted: false);
final unchanged = completed.copyWith();
```

The four objects are distinct but have the same task ID. Their states are incomplete, complete, incomplete, and complete.

## Review notes

The first method body was correct, but fields lacked final and parameters lacked braces. The completed implementation was:

```dart
final bool isCompleted;

PlannerTask copyWith({bool? isCompleted}) {
  return PlannerTask(
    id: id,
    title: title,
    isCompleted: isCompleted ?? this.isCompleted,
  );
}
```

copyWith(bool? isCompleted) requires a positional argument, even when that argument may be null. copyWith({bool? isCompleted}) accepts an optional named argument. A question mark allows null; it does not make an argument optional.

In id: id, the left side is the constructor parameter and the right side is the field. No same-named method parameter hides id, so this. is unnecessary there. It is needed for this.isCompleted.

Tests cover completing, reopening, keeping the old value when omitted, preserving ID/title, returning a new object, and leaving the original unchanged. This lesson added model behavior, not UI interaction, saving, or reminders. Next: [display a list](03-task-list.md).
