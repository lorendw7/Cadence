# Lesson 12: shadcn_ui foundation

Updated: 2026-11-11. Status: root integration and first control migration implemented; actual-window checks pending.

## Goal

Introduce shadcn_ui without replacing the working task screen at once. Keep MaterialApp for the current Scaffold, text field, list and buttons. Add ShadApp.custom outside it so later shadcn_ui controls can read one shared theme.

The project locks shadcn_ui 0.59.0 in pubspec.yaml. The lockfile records the exact direct and transitive dependency versions. The dependency is used by the root integration, so it is not an unused package.

## Root structure

The widget tree now has three relevant layers:

1. ShadApp.custom owns ShadThemeData and supplies shadcn_ui services.
2. MaterialApp keeps the existing Material navigation, theme and widgets working during migration.
3. ShadAppBuilder is placed in MaterialApp.builder so shadcn_ui overlays and related infrastructure wrap the page built by MaterialApp.

The appBuilder value is a callback. Flutter calls it with a BuildContext that can read the outer shadcn_ui theme. The inner builder receives Widget? child because a builder API may legally provide no child. The current MaterialApp path provides one, so child! asserts that it is non-null. A wrong assertion would fail at runtime; do not use ! merely to silence a type error.

GlobalShadLocalizations.delegate lets shadcn_ui supply its own component text. It does not replace the product's planned Japanese, English and Chinese translations.

The ShadZincColorScheme supplies neutral defaults. Cadence overrides background with warm paper, primary with muted wine and ring with muted wine for focus emphasis. The existing Material ThemeData keeps the same paper and wine direction while both control families coexist.

## Checks

- Dart formatting completed without changes.
- Flutter analysis passed with fatal infos and warnings enabled.
- All 26 tests passed.
- The practice increment action now uses ShadButton. Four test files were updated to locate the new widget type while preserving their counter, input, task-state and undo assertions.
- The Windows debug build passed after symbolic-link support was enabled. The executable was generated at `build/windows/x64/runner/Debug/cadence.exe`.
- Actual-window theme and interaction confirmation remains pending.

The dependency generated Linux and Windows plugin lists through its resolved dependency graph. Keep these generated files with the dependency change.

## Remaining acceptance

In the actual window, confirm the warm-paper background and wine primary button. Activate the increment action with the pointer, then use Tab to reach it and Enter or Space to activate it. The count must change without resetting tasks or input.

Lesson 13 continued the task-surface migration while this actual-window check remained open. Product controls still migrate deliberately; the practice counter remains a temporary teaching control until lesson 16.
