# Lesson 8: add a task

Completed: 2026-11-11. The learner wrote the feature and all 17 tests passed at that stage. The learner confirmed repeated additions, cleared input, and completion changes for new tasks.

## Implementation

State stores nextTaskNumber, starting at one. Addition reads the title and creates an incomplete PlannerTask. Its ID uses the local- prefix and the counter. Inside setState, tasks.add appends it and the counter increases. The controller is cleared after the title has been read.

List.add changes the existing list and its length. final does not forbid this. The task counter is separate from the practice counter, so resetting the practice count cannot reuse IDs. local- IDs do not clash with demo- sample IDs.

This ID scheme is only for the memory exercise. Revisit it before persistence or import. clear notifies the TextField through its controller; list changes still need setState.

## Acceptance

The first implementation kept the old button label. Behavior tests passed but the label test failed. The learner corrected it; formatting, analysis, and all 17 tests passed.

The [input/addition tests](../../test/task_title_input_widget_test.dart) replaced old print-output assertions. They cover repeated additions, separate IDs for equal titles, no ID reuse after counter reset, input clearing, independent completion changes, and controller disposal.

The learner confirmed real-window behavior separately. This lesson initially accepted blank titles; [lesson 9](09-validation.md) added validation. Nothing is saved to disk.
