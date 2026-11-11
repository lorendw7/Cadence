# Dart guide for Cadence

This is a short reference for the current lessons. The learner knows other languages but is new to Dart and Flutter. Read the relevant part when a lesson needs it. Examples are explanations, not permission to implement future features.

Current progress is in [LEARNING.md](LEARNING.md). Scope and ordering are in [PRODUCT.md](PRODUCT.md) and [CURRICULUM.md](CURRICULUM.md).

## Values and types

| Concept | Dart | Meaning |
|---|---|---|
| Text | String | A text value |
| Whole number | int | A whole-number value |
| Decimal number | double | A floating-point value |
| Boolean | bool | true or false |
| Inferred type | var count = 0; | Type is inferred; the value may change |
| Assign once | final title = readTitle(); | Value may be calculated at runtime |
| Compile-time constant | const limit = 10; | Value must be known at compile time |
| Nullable type | String? | A string or null |
| List | List<PlannerTask> | An ordered group of tasks |

Semicolons end statements. Dart also supports top-level functions and variables. main is the program entry point.

final does not make an object deeply immutable. A final List variable can still have elements added or replaced unless the list itself is immutable.

## Classes and constructors

A class defines fields and behavior. A constructor initializes an instance.

```dart
class Book {
  final String title;
  final bool isBorrowed;

  const Book({required this.title, this.isBorrowed = false});
}
```

Braces define named parameters. required means the caller must supply that parameter. this.title initializes the field from the argument. const allows constant construction when the arguments qualify; it does not require every call to use const.

## Null and optional parameters

A nullable type permits null; it does not by itself make a parameter optional. These signatures differ:

```dart
void requiredValue(bool? value) {}
void optionalValue({bool? value}) {}
```

The first needs an argument. The second can be called without one. value ?? oldValue uses the old value only when value is null. false is a real value and does not trigger that fallback.

The current PlannerTask uses copyWith to return a new task while keeping its ID. Read [lesson 2](lessons/02-copy-with.md) for the learner's implementation.

## Widgets and state

Flutter describes UI with widgets. build returns the widget tree for the current inputs and state. StatelessWidget reads its inputs; StatefulWidget has a separate State object for values that change while it is mounted.

Keep persistent page state outside build. Call setState for synchronous state changes that should rebuild the page. Do not put asynchronous work inside its callback. Saving to disk is separate from rebuilding.

Parent widgets pass data down and callbacks to invoke on user actions. VoidCallback means void Function(). Passing onTap: onToggle gives Flutter a function to call later; onToggle() calls it now.

## Layout and lists

Row arranges children horizontally; Column arranges them vertically. Expanded gives a child the remaining bounded space on the main axis.

ListView.builder creates rows when needed. A narrow window may not build all rows at once. Tests should scroll to reach off-screen content. A list position is not a stable task ID.

## Input and lifetime

TextEditingController holds input text. Store it in State so rebuilds reuse it. Read the text before clearing it. Dispose of the controller when its State is disposed.

trim returns a new string without leading and trailing whitespace. It does not edit the field. Keep failed input, show an error, and return from the outer submission callback before creating a task.

## Async work, later

Future<T> represents one result or error that may arrive later. async/await lets code wait without blocking the event loop. Stream<T> can deliver a sequence of values or errors; it is not a Future that repeatedly completes.

Introduce shared-state and database libraries only when the lessons need them. drift is planned for saving. Riverpod is optional if ordinary Flutter state sharing becomes hard to maintain. Their generated APIs and commands must be checked against the version introduced at that time.

## Debugging

Read the first relevant error before the long stack trace. Compare the actual value, state update, and widget rebuild separately. Use the widget inspector for layout problems. Share the error and the smallest relevant code; the learner makes the correction.

Hot reload usually keeps existing state. Hot restart and a full restart initialize it again. Neither proves that data is saved. See [lesson 4](lessons/04-state.md) for the observed experiment.

## References

- [Dart language](https://dart.dev/language)
- [Flutter layout](https://docs.flutter.dev/ui/layout)
- [Flutter hot reload](https://docs.flutter.dev/tools/hot-reload)
- [Riverpod](https://riverpod.dev/)
- [drift](https://drift.simonbinder.eu/)
