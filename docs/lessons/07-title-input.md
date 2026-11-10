# Lesson 7: input and controllers

Completed: 2026-11-11. Implementation and automated checks passed, with 16 tests at that stage. Lesson 8 replaced the old read-title button with addition. Current totals are in [LEARNING.md](../LEARNING.md).

## Implementation

The learner created a TextEditingController as a State field, passed it to TextField, and read its text property. InputDecoration.labelText labels the field as the task title. The first button printed the value to the terminal.

The controller remains the same object across rebuilds. final prevents replacing its variable, not changing its text. State.dispose calls titleController.dispose() before super.dispose(). A normal rebuild does not call dispose.

## Debugging and acceptance

The first implementation omitted disposal, so the lifecycle test failed. The learner added it. Input remained available after counter and task-state rebuilds.

Adding the input reduced list height in the narrow test window. The learner put the two counter buttons in a Row to save space. The old test incorrectly required both ListTiles to be built at once. ListView.builder creates rows only as needed, so the test was changed to inspect the first row, scroll to the second, and tap it. State and reachability checks were retained.

Formatting, analysis, and 16 tests passed. The historical print-output manual check was not confirmed. Lesson 8 later confirmed input, addition, and completion in the real window.

See [input tests](../../test/task_title_input_widget_test.dart) and [list tests](../../test/task_list_widget_test.dart). Next: [add tasks](08-add-task.md).
