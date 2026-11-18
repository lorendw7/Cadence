# Core learning plan

Updated: 2026-11-18. This is a teaching plan. [LEARNING.md](LEARNING.md) records completed work and open checks. [PRODUCT.md](PRODUCT.md) owns product scope. [ROADMAP.md](ROADMAP.md) owns release gates and delivery estimates.

## Goal

Learn as much lasting software knowledge as possible while building Cadence. Dart and Flutter are the tools. The lasting knowledge is how to model data, trace execution, own state, handle failure, store data safely, test, debug and deliver.

The learner asked on 2026-11-18 for a plan that teaches the most. This revision makes three changes.

1. **The learner writes more.** From lesson 19 the learner writes at least one test in every lesson. From lesson 27 the learner makes the Git commit for the lesson. The learner also does the first refactor, the first translation wiring and the first phone run.
2. **More topics are taught, not delegated.** Typed errors, sealed classes, equality, keys, debugging, Git, localization, platform theming, navigation, CI, serialization, file I/O, streams, interfaces, shared state, accessibility, profiling and release builds each get a lesson.
3. **Known defects become exercises.** A review on 2026-11-18 found small defects in the app. Each one is a lesson below. The assistant does not fix them first. [Defects used as exercises](#defects-used-as-exercises)

Lessons 1-18 keep their numbers and records. Lessons 19-66 replace the earlier provisional 19-44 list. Planned numbers may still change; completed numbers never do.

Under [ADR-015](adr/015-android-self-use-first.md), Android is the first self-use target and Windows is the development host. This plan follows that order. It does not approve a feature, a package or a release.

## Division of work

Choose the split by what is new to learn. If an idea is new, the learner writes it. If the learner has already written and explained the same pattern, the assistant may repeat it.

| Work | Learner writes or decides | Assistant completes |
|---|---|---|
| Data and rules | Every model, validation rule and identity decision | Repeated mappings that reuse a reviewed rule |
| Dart control flow | Each complete function, including async success and failure | The runnable exercise setup and sample inputs |
| Flutter interaction | The first input, callback, state update and visible result of each kind | Similar controls after that flow is explained |
| Flutter layout and lifetime | One real layout change and each controller or State lifetime decision | Spacing, icons and the same pattern in similar views |
| Tests | At least one test per lesson: choose the case, state the expected result, write the assertion | Fixtures, broader regressions and repeated check runs |
| Debugging | Reproduce the failure, form one guess, find the cause | Environment and toolchain problems |
| Git | Read the diff, write the commit message, commit the lesson | Commits for documents, artwork and tools |
| Refactoring and structure | The first extraction of each kind, with tests kept green | Mechanical repeats of the same extraction |
| Translation | The first localized strings and the lookup in a widget | The remaining Japanese, English and Chinese strings |
| Storage | The first query, save decision, failure rule and transaction boundary | Adapter setup, generated code and platform paths |
| Delivery | Run the app on the phone, read the CI result, explain one complete flow | Documentation, artwork, repository checks and build preparation |

A new state owner, callback lifetime, validation rule or data-loss risk is learning-critical even inside a small helper. The assistant explains it and reserves a learner exercise. The assistant must not decide it silently as wiring.

The standing delegation covers supporting work in the active lesson. The assistant states the boundary and proceeds. The delegation does not cover future features, packages added in advance, remote publishing or the learner's reserved work.

## How a lesson works

Aim for 30-60 minutes. One topic may take one to three sessions. Use the [current checkpoint](LEARNING.md#current-learning-checkpoint) to resume.

1. **Predict.** Read the goal and say what will happen before running anything.
2. **Write.** The learner writes the complete function or widget. The assistant explains new syntax first, using an example from a different problem.
3. **Test.** The learner writes one test for the main case. From lesson 23 the test comes before the code when the rule is clear.
4. **Break it.** Change one input or remove one line. Predict the failure, then read the real error message or stack trace.
5. **Explain.** Say in one or two sentences why it works and where it would fail.
6. **Commit.** From lesson 27 the learner reads the diff and commits the lesson.

The assistant then adds wider tests, finishes agreed repetition and writes one short entry in [LEARNING.md](LEARNING.md). The entry says what the learner did alone, what help was needed and what the checks showed.

Manual checks are recorded one by one. Lesson 32 repeats the earlier behavior checks on the phone and on Windows, using the [checklist](LEARNING.md#manual-check-decision-on-2026-11-18). A check that is not done stays open.

## Working sequence

| Unit | Lessons | The learner can afterwards |
|---|---|---|
| 1. Work that takes time | 17-22 | Trace success, failure, cleanup and late results, and test them |
| 2. A stronger task model | 23-27 | Put rules in the model, compare values, fix an identity defect, debug and commit |
| 3. Structure, language and phone | 28-34 | Split code safely, localize, theme per platform, run on Android, navigate and read CI |
| 4. Reliable local data | 35-48 | Serialize, write files, use SQL, save, load, watch, migrate, back up and restore |
| 5. Time and algorithms | 49-56 | Model deadlines and intervals, sort, detect overlaps, find free time, build Today and Week |
| 6. Shared state and quality | 57-62 | Share state without a package first, model repeats, check accessibility and performance |
| 7. Android focus | 63-66 | Build a timer with a controlled clock, handle app lifecycle, save sessions, make a release build |

Move on when the learner can explain the idea, change one condition and handle one failure case. A fixed lesson count is not the target.

## Numbered lesson plan

Each row is one topic. **New knowledge** names what is learned. **Learner writes** is the reserved exercise.

### Unit 1: work that takes time (17-22)

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 17 | Awaited errors | Future, await, try and catch | Done. One gap remains: add the Starting and Finished messages to the console exercise |
| [18](lessons/18-async-cleanup.md) | Cleanup | finally, early return | `tryReadTitle`, releasing the reader once on both paths |
| 19 | The first own test | `test`, `expect`, async tests, `throwsA` | Two tests for `tryReadTitle`, one per outcome |
| 20 | Errors as types | Exception and Error, a custom exception class, `on`, `rethrow` | A caller that handles one error type and lets another pass |
| 21 | Operation states | sealed classes, exhaustive `switch`, pattern matching | Idle, pending, success and failure states, and a guard against a second tap |
| 22 | Late results | `State.mounted`, `context.mounted`, which context a builder receives | A late result that arrives after the page closes, with a widget test |

Lessons 20-22 use a fictional operation. It is not saving and must not look like saving in the app.

### Unit 2: a stronger task model (23-27)

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 23 | The model owns its rule | Factory constructors, invariants, test first | Title validation inside `PlannerTask`, and `copyWith` that can change the title |
| 24 | Value equality | `==`, `hashCode`, `const`, `identical`, records | Equality for `PlannerTask` and a test that two tasks with one title stay distinct |
| 25 | Identity over position | Keys, closures that capture a value, stale indexes | A test for the completion toggle that targets a task by ID, then the change that finds the task by ID |
| 26 | Input lifecycle | `onChanged`, listeners, `FocusNode`, dispose order | Clear the title error while typing, without leaking a listener |
| 27 | Debugger and Git | Breakpoints, stack frames, branch, diff, commit, revert | Find a seeded defect with the debugger, then commit the fix on a branch |

### Unit 3: structure, language and phone (28-34)

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 28 | Extract a widget and a file | Imports, private names, const widgets, refactoring with tests | Move `TaskRow` to its own file with no behavior change |
| 29 | Collections and functions | `map`, `where`, `fold`, comparators, Map and Set | A pure function that counts open tasks, with tests, shown on the page |
| 30 | Localization | ARB files, generated lookups, Locale | The first three localized strings in Japanese, English and Chinese |
| 31 | Theme and platform | Inherited theme lookup, `ThemeExtension`, `MediaQuery`, platform fonts | Replace the fixed Windows font with a choice per platform |
| 32 | First phone run | adb, debug and release modes, hot reload and restart, Back, soft keyboard, safe areas | Run the app on the phone and record what works and what does not |
| 33 | Navigation and a draft editor | Navigator, returning a result, draft and confirmed data | A task editor page that returns a changed title or nothing |
| 34 | CI and lints | Workflow files, analysis options, reading a failed run | Break one test on a branch, read the CI failure, then repair it |

The localization package is added when lesson 30 starts, not before. Lesson 32 is a launch check with fictional tasks. It is not storage acceptance.

### Unit 4: reliable local data (35-48)

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 35 | Serialization | `toJson`, `fromJson`, `jsonEncode`, rejecting bad input | A round trip for `PlannerTask` and a test with a broken record |
| 36 | Files | `dart:io`, paths, I/O errors, write to a temporary file then rename | A console exercise that saves and loads fictional tasks |
| 37 | SQL | Tables, primary keys, constraints, SELECT, INSERT, UPDATE, DELETE | One task table and four queries in a console exercise |
| 38 | The storage adapter | drift, generated code, what the build step does | One table and one query through the adapter |
| 39 | Local saving or temporary use | A first-use choice that changes what may be opened | The branch that decides whether saved records are opened |
| 40 | The first confirmed write | Confirmed and unconfirmed state, retained input | Save one new task and keep the typed title when the write fails |
| 41 | Loading and restart | `FutureBuilder`, empty store and failed load | Load saved tasks and show three distinct states |
| 42 | Streams | Stream, `await for`, `StreamBuilder`, cancelling a subscription | Watch the task table and stop watching on dispose |
| 43 | Interfaces and fakes | `abstract interface class`, passing a dependency in | A failing fake store and a test that uses it |
| 44 | Transactions | Commit, rollback, the write boundary | Delete and undo as changes that succeed or fail together |
| 45 | Schema migration | Versioned structure, old fixtures | One added column and a check against an older database |
| 46 | Backup export | Format versions, validation | A versioned backup of tasks |
| 47 | Restore | Preview before replace, keeping old data on failure | Validate a backup, then replace records only when it is valid |
| 48 | Clearing and mode changes | Guarded destructive actions | One clear action with a cancel path |

Lesson 36 is a disposable exercise under `lessons/`. It is not the app's storage. Use fictional records through this unit. Real tasks wait for phone checks of saving, restart, backup and restore. The storage packages are added when lesson 38 starts.

### Unit 5: time and algorithms (49-56)

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 49 | Deadline meanings | `DateTime`, date-only values, enums or sealed types | No deadline, a date deadline and an exact deadline |
| 50 | Plans and intervals | `Duration`, time zones, overnight intervals | An interval model with start and end validation |
| 51 | A plan editor | Forms, pickers, field validation | Start and end input with a visible error |
| 52 | Sorting and cost | Comparators, grouping, how work grows with input size | A sorted and grouped task view, with the cost explained |
| 53 | Overlaps | Boundary cases, hand calculation before code | An overlap rule, including equal boundaries |
| 54 | Free time | Merging intervals | Gaps between plans without counting overlaps twice |
| 55 | Today | An explicit clock as input | A daily view derived from records and a given date |
| 56 | Week | Selected-day state shared by two widgets | Day selection on the phone layout |

### Unit 6: shared state and quality (57-62)

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 57 | Sharing state | Lifting state, `InheritedWidget`, `ChangeNotifier`, `ListenableBuilder` | One shared value moved out of a page, then a written decision on whether a package is needed |
| 58 | Bounded repeats | Generating occurrences in a date range | One repeat rule |
| 59 | One changed occurrence | Stable occurrence identity | Change, cancel and restore one occurrence |
| 60 | Accessibility | Semantics, focus order, screen reader, large text | Fix one real focus or label problem found on the phone |
| 61 | Performance | DevTools, rebuild counts, list builders | Measure one screen, then make one justified change |
| 62 | Independent review | Everything so far | A small feature alone: plan, test, implement, debug, commit and explain |

Riverpod stays conditional. Lesson 57 teaches the built-in tools first and ends with a decision.

### Unit 7: Android focus (63-66)

This unit follows accepted planning self-use. The [roadmap focus stage](ROADMAP.md#h--android-focus-self-use) owns the delivery order.

| Lesson | Topic | New knowledge | Learner writes |
|---|---|---|---|
| 63 | A timer | `Timer`, `Stopwatch`, a clock passed in for tests | Start, pause, resume and end for one task-linked countdown |
| 64 | App lifecycle | `AppLifecycleListener`, background and return | What the timer does when the app is hidden or closed |
| 65 | Session records | Retry without duplicate records | Save one session and handle a failed write |
| 66 | A release build | Signing, build modes, package size | A signed build installed on the learner's own phone |

No background alarm is promised. The timer never completes a task by itself.

## Defects used as exercises

The review on 2026-11-18 found these points. Automated checks pass, so none blocks the current lesson. Each stays open until its lesson.

| Finding | Lesson |
|---|---|
| The lesson 17 console exercise lacks its Starting and Finished messages and still has a TODO comment | 17 gap, with lesson 19 |
| Title validation lives in the page. `PlannerTask` accepts an empty title and `copyWith` cannot change a title | 23 |
| The completion toggle uses a captured list index. Delete finds the task by ID. No wrong result has been reproduced | 25 |
| The title error stays visible while the learner types a correction | 26 |
| Interface text is fixed Chinese in `lib/main.dart`. Tests search for that text | 30 |
| The theme names a Windows font that Android does not have | 31 |
| No behavior has been checked on a phone | 32 |
| The app starts with two fixed demo tasks | 41 |

## Evidence of learning

Track evidence briefly in [LEARNING.md](LEARNING.md).

| Evidence | What it shows | What it does not show |
|---|---|---|
| Explanation and prediction | The learner can reason about the rule | Ability to build a large feature alone |
| A learner-written test | The learner can state expected behavior | That every case is covered |
| Small independent variation | The idea works beyond the guided example | Knowledge of every related API |
| Diagnosis of a failure | The learner can read an error and find a cause | Platform or release acceptance |
| Automated check | The checked case passes | Learner mastery or real-device usability |
| Phone or actual-window check | The checked native action worked | Other platforms or untested cases |

Use official documentation while working. Independence does not mean memorizing APIs. Work that the assistant repaired stays recorded as assisted until the learner adapts the idea alone.

## What to defer

Isolates, code generation beyond the storage adapter, custom painting, animation and platform channels wait for a concrete need. Cloud services, sign-in, sync, ads, text recognition and school connections stay outside this plan. Do not add a package before its lesson.

## Earlier lessons and estimates

Lessons 1-2 introduced models and immutable updates. Lessons 3-10 built the in-memory task flow. Lessons 11-16 introduced the desktop UI, layout, state ownership and cleanup. Their notes keep their recorded results. See [the lesson index](README.md#lesson-records) and [historical templates](../lessons/README.md).

Older totals of 44, 64, 80-100 and 88-116 lessons were estimates for earlier scope. They no longer apply. The 66 topics here are a map, not a time promise. Website, artwork and document work do not count as lessons.

## Official references

Read only the section a lesson needs. Check APIs against the installed SDK.

| Topic | Reference |
|---|---|
| Async and errors | [Dart asynchronous programming](https://dart.dev/libraries/async/async-await), [Dart error handling](https://dart.dev/language/error-handling) |
| Classes and patterns | [Dart language guide](https://dart.dev/language) |
| Tests | [Flutter testing overview](https://docs.flutter.dev/testing/overview) |
| Layout and state | [Layout constraints](https://docs.flutter.dev/ui/layout/constraints), [State class](https://api.flutter.dev/flutter/widgets/State-class.html), [simple state management](https://docs.flutter.dev/data-and-backend/state-mgmt/simple) |
| Transactions | [SQLite transactions](https://sqlite.org/lang_transaction.html) |

[DART_GUIDE.md](DART_GUIDE.md) is a short local syntax reference. [SETUP.md](SETUP.md) lists the checkout's commands.
