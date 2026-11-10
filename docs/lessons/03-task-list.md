# Lesson 3: display a task list

Completed: 2026-11-10. The learner wrote the UI. Formatting, analysis, and all nine tests passed at this stage. The learner later completed the real-window experiment in lesson 4. This note describes the historical read-only list.

The goal was to show two tasks on Today in about 20–45 minutes. Do not add input, completion changes, storage, or dependencies for this exercise.

## Lists

List<PlannerTask> means a list of PlannerTask objects. Its type parameter is similar to a Java generic list.

```dart
final colors = <String>['red', 'blue'];
print(colors.length); // 2
print(colors[0]); // red; indexes start at zero
print(colors[1]); // blue
```

final prevents assigning another list to colors. It does not make the contents immutable. A task ID is not its list index.

## Prepare sample tasks

In [main.dart](../../lib/main.dart), import the existing model. In the historical TodayPage build method, create a local tasks list before returning the Scaffold.

| ID | Meaning of the existing Chinese sample title | Completed |
|---|---|---|
| demo-1 | Submit the course report | false |
| demo-2 | Review linear algebra | true |

Keep the sample titles in the code unchanged. Documentation uses English; this lesson does not translate the app.

A list literal uses square brackets and comma-separated constructor calls. At this stage, build recreates the sample list every time. It is suitable for display practice but cannot keep user changes. Later lessons move it into State.

## Build a row

ListView.builder creates rows as needed. itemCount gives the number of items. itemBuilder is a function Flutter calls with context and an index. It must return a Widget.

```dart
ListView.builder(
  itemCount: colors.length,
  itemBuilder: (context, index) {
    return Text(colors[index]);
  },
)
```

Use ListTile for each task. Its title shows the task title; its subtitle shows the completion state. A conditional expression chooses a value, as in isOpen ? 'Open' : 'Closed'.

## Give the list a height

Keep the Cadence app bar and the Today page title. Use a Column with the title first and an Expanded containing the ListView second. Expanded gives the scrolling list the remaining height. An unconstrained ListView inside Column causes a layout problem.

The body reads local variables, so the whole body cannot be const. Individual fixed Text widgets may still be const.

## Acceptance

Both task titles and completion states should match the data, with no layout exception. Clicking was not required to change state in this lesson.

The [list tests](../../test/task_list_widget_test.dart) checked 800 × 600 and 400 × 320 layouts. Later input controls reduced visible list space, so current tests scroll to reach off-screen rows rather than requiring both rows to exist at once.

The historical checks were Dart formatting, Flutter analysis, and nine passing tests. The learner wrote feature code; the assistant reviewed and maintained tests. Automatic widget tests do not replace manual window checks.

Continue with [lesson 4](04-state.md). Current application behavior is in [LEARNING.md](../LEARNING.md).
