# Dart Guide (for this project, coming from TypeScript)

You know TypeScript. Dart will feel ~70% familiar — this guide covers the 30% that differs, in the order Cadence needs it. Read each part when its milestone starts, not all up front.

---

## Part 0 — Dart is TypeScript with the guardrails always on (v0.0)

| TypeScript | Dart | Note |
|---|---|---|
| `const x = 5` | `final x = 5;` | `final` = set once. Dart's `const` is stricter: compile-time constant |
| `let y` | `var y;` | Type inferred, like TS |
| `string` / `number` / `boolean` | `String` / `int` `double` / `bool` | Capitalized; `int` and `double` are distinct |
| `string \| null` | `String?` | **Sound null safety**: non-`?` types can never be null — the compiler proves it |
| `x?.y`, `x ?? z` | same | Plus `late` = "will be set before first read, trust me" |
| `Event[]` | `List<Event>` | Also `Map<K,V>`, `Set<T>` |
| `interface` / type alias | `class` | Dart classes are the data carriers; no structural typing |
| arrow fn `=>` | `=>` for one-liners | `int double_(int x) => x * 2;` |
| `JSON.parse` | `jsonDecode` + hand-written `fromJson` | No reflection; drift generates this for DB rows |

Semicolons are **required**. Everything lives in classes/functions — no top-level statements except `main()`.

```dart
void main() {
  final greeting = greet('lorendw7');
  print(greeting);
}

String greet(String name) => 'Hello, $name!';   // $var interpolation, like `${}` in TS
```

---

## Part 1 — Widgets: UI = f(state), but literally (v0.0)

Flutter has no HTML/CSS. **Everything is a widget** — layout, padding, text, the app itself — and the UI is a tree of constructor calls:

```dart
class TodayScreen extends StatelessWidget {
  const TodayScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Today')),
      body: Column(
        children: [
          const Text('Habits'),
          ElevatedButton(
            onPressed: () => print('check in'),   // callbacks, like React props
            child: const Text('Check in'),
          ),
        ],
      ),
    );
  }
}
```

React mapping that makes it click instantly:

| React | Flutter |
|---|---|
| function component | `StatelessWidget.build()` |
| component with `useState` | `StatefulWidget` + `setState()` |
| props | constructor parameters |
| `children` | `child:` / `children:` |
| CSS flexbox | `Row` / `Column` / `Expanded` |
| CSS padding/margin | `Padding(padding: EdgeInsets.all(8), child: …)` |
| conditional render `{x && <A/>}` | `if (x) A()` inside a `children: [ … ]` list |
| list `.map()` | `items.map((e) => Tile(e)).toList()` or `ListView.builder` |

Rebuild model is identical to React: state changes → `build()` runs again → framework diffs the widget tree. Hot reload keeps state while swapping code.

---

## Part 2 — Async: Future = Promise, Stream = the new one (v0.1)

```dart
Future<List<Event>> loadEvents() async {          // Future<T> ≈ Promise<T>
  final rows = await repository.eventsInRange(a, b);
  return rows;
}
```

`async`/`await`/`try-catch` work exactly as in TS. The genuinely new concept is **`Stream<T>`** — a Promise that keeps resolving. drift queries return streams, so the DB pushes updates to the UI:

```dart
Stream<List<Habit>> watchHabits() =>
    (select(habits)..where((h) => h.archived.equals(false))).watch();
```

Subscribe in the UI via Riverpod's `StreamProvider` — every emission rebuilds the watchers. This replaces all manual "refetch after mutation" logic: **write to the DB, and every screen showing that data updates itself.**

---

## Part 3 — Riverpod in 60 seconds (v0.1)

```dart
final habitsProvider = StreamProvider<List<Habit>>(
  (ref) => ref.watch(dbProvider).habitRepo.watchHabits(),
);

class HabitList extends ConsumerWidget {                    // ConsumerWidget = widget + ref
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final habits = ref.watch(habitsProvider);               // rebuilds on every emission
    return habits.when(
      data: (list) => ListView(children: [for (final h in list) HabitTile(h)]),
      loading: () => const CircularProgressIndicator(),
      error: (e, _) => Text('Error: $e'),
    );
  }
}
```

- `ref.watch` in `build` = subscribe. `ref.read` in callbacks = one-shot (don't subscribe inside `onPressed`).
- `AsyncValue.when` forces you to render loading/error states — the UI equivalent of null safety.

---

## Part 4 — Classes, named params, sealed types (v0.1–v0.2)

```dart
class Habit {
  final String id;
  final String title;
  final String? icon;                     // nullable field

  const Habit({required this.id, required this.title, this.icon});

  Habit copyWith({String? title}) =>      // immutable-update pattern (like TS spread)
      Habit(id: id, title: title ?? this.title, icon: icon);
}
```

Named parameters (`{required this.id}`) are why Flutter code reads like labeled JSON. For the event categories, Dart enums carry behavior:

```dart
enum Category {
  class_, meeting, todo;

  bool get supportsPriority => this == Category.todo;
}
```

`switch` on an enum is exhaustive — the compiler errors if you forget a case (the same safety Rust's `match` gives).

---

## Part 5 — What generates code, and why (v0.1)

Dart has no runtime reflection, so libraries generate code at build time:

- **drift**: you declare tables → `dart run build_runner build` generates row classes + typed queries into `*.g.dart` files.
- **intl/ARB**: you write `app_en.arb` etc. → `flutter gen-l10n` generates `AppLocalizations` with a typed getter per string; the UI calls `AppLocalizations.of(context).habitStreak(count)`.

Treat `*.g.dart` as build artifacts: never edit, do commit (or ignore + CI-generate; this project commits them for simplicity).

---

## How to get unstuck

1. Read the error **top line first** — Flutter errors bury the cause above a long widget-tree dump.
2. The widget inspector (VS Code sidebar) shows the live tree — most layout confusion dies there.
3. In chat, paste the full error + the widget — I'll explain 中英文 and point you at the fix; you type it.

## Reading list (free, short)

- Dart language tour: <https://dart.dev/language> — skim in one evening with your TS glasses on.
- Flutter "first app" codelab, then **Layout basics**: <https://docs.flutter.dev/ui/layout>.
- Riverpod docs: <https://riverpod.dev> — read "Providers" and "Reading" pages only, at v0.1.
- drift: <https://drift.simonbinder.eu> — "Getting started" at v0.1.
