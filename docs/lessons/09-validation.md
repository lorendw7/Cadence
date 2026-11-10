# Lesson 9: title validation and empty lists

Updated: 2026-11-11. Both behaviors are implemented. The learner confirmed the empty-list prompt, its removal after adding a task, and completion changes for that task, then restored the two samples.

Title validation first passed with 19 tests. Lesson 10 later added automatic empty-list coverage and brought the total to 26. Separate manual title-validation confirmation remains pending.

## Validation

Read titleController.text.trim() and reject isEmpty. State holds a nullable String? titleError, initially null. InputDecoration.errorText displays it. Because the decoration now reads runtime state, it cannot be const.

On failure, setState sets the error, then return from the outer onPressed callback. Do not create a task, consume an ID, or clear input. A valid submission adds the task, resets titleError to null, and clears the controller.

trim returns a new string with leading/trailing whitespace removed; it does not change the field and keeps internal spaces. isEmpty is a property. null and an empty string are different. A return inside setState would only leave that inner callback, so the submission's early return must be outside it.

Validation happens on submission. The error clears after a valid submission, not on every keystroke.

## Acceptance and test corrections

The [validation tests](../../test/task_title_validation_widget_test.dart) use 800 × 600 and 400 × 320 windows. They check empty input, ordinary spaces, tabs, and full-width spaces; visible error text; no task or ID on failure; preserved input; correction and successful addition; and trimmed edges with internal spaces kept.

Two test assumptions were corrected. Error text is not a tap target, so its actual bounds determine visibility. A single-line TextField filters newlines, so preservation compares the actual controller value before and after submission. Feature code was not changed to satisfy faulty test assumptions.

Formatting, analysis, and 19 tests passed at the original validation stage. The learner also corrected InputDecoration formatting.

## Empty lists

Inside Expanded, tasks.isEmpty selects a centered prompt or the original ListView.builder. An empty list differs from a list of completed tasks.

The learner temporarily removed samples and restarted to check the empty-list/addition flow, then restored the samples. [Lesson 10](10-delete-undo.md) now provides a normal delete-to-empty path. Its tests check deleting all tasks, rejecting a blank title, adding again, and toggling completion at both sizes.
