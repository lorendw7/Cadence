# Lesson 6: toggle task completion

Completed: 2026-11-10. The learner wrote the feature. Formatting, analysis, and all 13 tests passed. The learner confirmed that completion changes appear immediately and survive counter-button rebuilds.

## Data flow

The tasks list moved from build into a _TodayPageState field. TaskRow still receives task and onToggle. The parent callback uses copyWith to create a task with the opposite completion state, replaces the list entry, and calls setState.

A tap calls the parent callback; the list receives a new object; setState schedules a rebuild; TaskRow receives and shows the new data. This lesson uses row taps, not checkboxes.

## Concepts

A State field survives rebuilds. A local list initialized in build does not preserve edits. final prevents assigning another list to the field but permits changing its elements.

Task fields are final, so copyWith creates a new object. The ! operator flips a boolean. A plain list assignment does not tell Flutter to rebuild; setState performs the change and schedules that work.

The callback captures task and index from itemBuilder. This historical lesson had no addition, deletion, or sorting, so an index was sufficient. Later operations use stable IDs where needed.

## Debugging

The first implementation omitted setState. The interaction test failed because the completed label did not appear after a tap: 12 tests passed and one failed. The counter-rebuild test passed because the counter button happened to trigger a rebuild that revealed the earlier data change.

The assistant explained the failure. The learner added setState and formatted the code. All 13 tests then passed without weakening assertions.

## Acceptance

The [completion tests](../../test/task_toggle_widget_test.dart) check completing and reopening each task, leaving the other task unchanged, and keeping edits after counter increment/reset. Existing model, display, callback, and counter tests passed.

Formatting and analysis passed. The learner confirmed the actual window behavior. This also showed that the parent/child callback path worked; it did not retroactively confirm lesson 5's old logging experiment.

No persistence was added and no restart experiment was claimed for this lesson. Next: [title input](07-title-input.md).
