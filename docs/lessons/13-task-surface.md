# Lesson 13: coherent task surface

Updated: 2026-11-11. Status: implemented; actual-window interaction checks pending.

## Goal

Turn the working in-memory task flow into a clearer desktop task surface without changing its data lifetime. Preserve addition, validation, completion, deletion and latest-only undo while migrating the controls that now have a real product role.

## Implemented surface

- The page heading uses the shared shadcn_ui text theme.
- Quick entry uses `ShadInput` and a primary `ShadButton`.
- Blank-title feedback stays beside the input and uses the theme's destructive color.
- A `LayoutBuilder` keeps quick entry in a row when its content has at least 360 logical pixels. It stacks the input and full-width button below that limit.
- Each task has an explicit `ShadCheckbox`. Selecting the title no longer changes completion, which leaves title selection available for a later editor.
- Completed titles use the muted theme style and a line-through decoration. Titles show at most two lines and then use an ellipsis.
- Delete uses one ghost `ShadIconButton` with a `Tooltip`. There is no nested button or duplicate accessible label.
- Undo uses an outline `ShadButton`. A null callback keeps it disabled until a deletion can be restored.

The practice counter remains temporary teaching code. Lesson 16 removes it after the desktop shell and state owner are clear.

## Concepts learned

A Widget is an immutable description of part of the interface. Widgets compose through `child` and `children`; a button must not contain another interactive button. Flutter keeps mounted locations and mutable State separately from these descriptions.

`ShadTheme.of(context)` reads the nearest shadcn_ui theme from the widget tree. Local variables reuse that result inside one build method. Theme text and color roles avoid repeating fixed values. `copyWith` derives a completed-title style without changing the shared theme.

The collection `if` includes the error Widget only when an error exists. Named constructors select variants such as `ShadButton.outline` and `ShadIconButton.ghost`. A method name such as `undoDelete` passes a callback; `undoDelete()` would call it immediately.

Row and Column use different axes. `CrossAxisAlignment.start` means top alignment in a Row and start-side alignment in a Column. `CrossAxisAlignment.stretch` makes the narrow Column's children use its available width.

`LayoutBuilder` reports the space offered by the parent. The 360-pixel content breakpoint came from working layouts, not a device category. At the tested 400 x 320 surface, the content remains horizontal so the temporary counter, quick entry and list fit without vertical overflow. At 350 x 600, quick entry stacks. Lesson 15 revisits responsive behavior with the desktop shell, long text and text scaling.

## Automated checks

- Dart formatting completed without changes.
- Flutter analysis passed with fatal infos and warnings enabled.
- All 27 tests passed.
- The responsive quick-entry test checks an 800-pixel row, a 400 x 320 row without overflow, a 350 x 600 stack and retained input across resizing.
- Existing tests still cover task identity, input clearing, controller disposal, validation, completion, deletion, duplicate titles and latest-only undo.
- The Windows debug build passed and produced `build/windows/x64/runner/Debug/cadence.exe`.

## Manual checks still needed

In an actual Windows window, resize across the quick-entry breakpoint. Confirm that the input survives, the button changes between side-by-side and stacked placement, and no control becomes unreachable. Use the pointer and keyboard to add, complete, delete and undo a task. Confirm the completed-title style, delete tooltip and visible focus. These checks do not change the fact that all task data is still memory-only.

Next, lesson 14 introduces the desktop shell and puts the real task flow in Tasks. Do not expose empty Today or Week destinations as working pages.
