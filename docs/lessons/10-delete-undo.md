# Lesson 10: delete and undo once

Updated: 2026-11-11. The learner implemented deletion and undo of the latest deletion. Formatting, analysis, and all 26 tests passed at the application review. The learner subsequently confirmed deletion/undo in the actual window. A later maintenance change removed nested setState calls without changing behavior.

## Behavior and concepts

TaskRow receives a required VoidCallback named onDelete. ListTile.trailing contains an IconButton with Icons.delete_outline, a delete-task tooltip, and the parent callback. Deleting must not also toggle completion.

The first step used removeWhere with the task ID, which distinguishes equal titles. Undo required indexWhere to find the ID, a guard for -1, and removeAt to return the original object. State stores that object in PlannerTask? lastDeletedTask and its position in lastDeletedIndex.

undoDelete copies the nullable field to a final local variable. After a null check and early return, Dart treats it as non-null. setState inserts it at the original position and clears the deletion record.

Restoration keeps the same object, ID, title, and completion state. It does not consume a new ID. The undo button uses a null onPressed when there is no record.

Only the latest deletion is recoverable: after deleting A and B, undo restores B once. Adding a task appends at the end and leaves the stored restore position valid. This reasoning depends on the current absence of sorting, bulk deletion, and multi-level undo.

## Acceptance

- Dart formatting checked 12 files without changes.
- Flutter analysis passed with fatal infos and warnings.
- All 26 tests passed.
- [Callback tests](../../test/task_list_widget_test.dart) keep toggle and delete callbacks separate.
- [Deletion tests](../../test/task_delete_widget_test.dart) cover both sizes, empty lists, addition, equal titles, and completion of remaining tasks.
- [Undo tests](../../test/task_undo_delete_widget_test.dart) cover latest-only undo, disabled/reused undo, original object and position at both ends, additions between delete and undo, counter rebuilds, and no new ID.

## Cleanup and manual confirmation

The first delete callback nested setState. The 2026-11-11 cleanup moved lookup and the -1 guard outside one setState. Only recording and removing the task happen inside it. The outer return clearly ends onDelete.

The learner reported that deletion/undo worked in the actual window. Automated checks above cover the detailed restoration cases; the manual report is a flow confirmation, not a separate report for every edge case. Data and the undo record disappear on restart.

Continue to [lesson 11](11-theme.md)'s shared theme exercise. The learner still writes new feature code.
