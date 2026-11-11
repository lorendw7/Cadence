# Lesson 11: a shared theme

Status: implemented and accepted by automated checks on 2026-11-11. The learner added shared wine and paper constants and applied them to the Material theme. Formatting and analysis passed, and all 26 tests passed. Actual-window color confirmation remains pending.

## Goal

Apply the accepted warm-paper background and wine color through the existing Material theme. This small step teaches shared visual configuration. The selected shadcn_ui direction remains in [ADR-008](../adr/008-small-free-local-product.md); introduce it gradually after this Material theme exercise. The exercise and its historical acceptance status are unchanged.

## Explain before coding

1. A theme provides default visual values to descendant widgets. The current MaterialApp already receives a ThemeData object. Widgets may override those defaults.
2. A top-level declaration sits outside classes and functions. Give shared values clear names rather than repeating a literal inside several widgets.
3. `const` defines a compile-time constant. `final` permits a value calculated at runtime but only allows assignment once. Fixed colors can be constants; a TextEditingController needs runtime construction and uses final.
4. `Color` is a Flutter type. `Color(0xFF7C394B)` constructs a color from an integer. `0x` marks hexadecimal notation, and the eight digits are `AARRGGBB`: alpha, red, green and blue. `FF` alpha is fully opaque. The design's six-digit `#7C394B` becomes `0xFF7C394B`; it is not a string.
5. In `const Color cadenceWine = Color(...)`, the first Color is the variable's type and the second calls the constructor. The constant declaration supplies a constant context, so an extra const before the constructor is unnecessary.
6. Named arguments use `name: value`. `ColorScheme.fromSeed` is a named constructor that generates related color roles from a seed. The generated primary color need not equal the seed exactly. `scaffoldBackgroundColor` sets the default Scaffold canvas; it does not set every surface or AppBar color.

## Exercise

After the imports and before main, add:

```dart
const Color cadenceWine = Color(0xFF7C394B);
const Color cadencePaper = Color(0xFFF6F5F1);
```

Inside CadenceApp.build, replace only the existing theme argument:

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: cadenceWine),
  scaffoldBackgroundColor: cadencePaper,
),
```

Keep the task data, callbacks and current widgets. Do not add packages or create a full palette file yet. Later component work will map exact brand and semantic roles to the selected library.

## Review and acceptance

Format the file and run the current app. Check that the canvas uses warm paper and themed controls follow the wine color direction. Do not expect every surface to become the same color. Check addition, completion and deletion/undo; data still resets on restart.

The assistant reviewed the learner's diff. Formatting required no changes, analysis found no issues, and all 26 existing tests passed. Confirm the actual visual result in a window. Automated widget tests do not prove that the colors look right on the target display.

Next: [lesson 12's shadcn_ui foundation](12-shadcn-foundation.md).
