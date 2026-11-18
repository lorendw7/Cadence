# Lesson 17: await and errors

To resume, open the [current checkpoint](../LEARNING.md#current-learning-checkpoint). For a syntax reminder, use the [guided reading of the copy callback](../DART_GUIDE.md#reading-an-async-callback).

This note keeps the original exercise and its reviews on 2026-11-13. The learner implemented the console caller, clipboard action and guarded SnackBar feedback, explained the lifetime check and confirmed seeing the message in the actual window. The original console start and end messages remained absent.

## Goal

Wait for one asynchronous result and handle its error. A Future represents an operation's completion with a value or an error. Await pauses the current asynchronous function until that completion. It does not block the entire application or move expensive calculations to a background thread.

A failed awaited operation transfers control to a matching catch. Statements after that await inside the try block are skipped. After a catch handles the error without returning or throwing, execution continues after the try/catch. A try block around a call without awaiting its Future does not catch an error that arrives later from that Future.

Use [Dart's asynchronous tutorial](https://dart.dev/libraries/async/async-await) for the language explanation. Cleanup with finally belongs to lesson 18.

## Work split

The [exercise file](../../lessons/17_async_errors/await_errors.dart) is a standalone console exercise. The Flutter application still starts in lib/main.dart. This file neither reads nor saves application data.

The assistant supplies main and fakeLoadTitle. The latter waits briefly, then returns a fictional title or throws an Exception. The main function runs the success and failure cases in sequence. The delay only makes waiting visible.

The learner writes the complete body of showTitle. Its required named argument, shouldFail, selects the case. Future<void> says the asynchronous function has no result value for its caller; its completion can still be awaited. The async keyword allows await in the body.

## Exercise

1. Print Starting when showTitle begins.
2. Call fakeLoadTitle with the received shouldFail value and await its result.
3. On success, print Title: followed by the returned title. Use the actual result, not a hard-coded replacement.
4. Catch an error and print Failed: followed by the error.
5. Print Finished after either handled outcome. Keep this statement after the try/catch for this exercise.

Predict whether the failure case prints a title and whether it reaches Finished before running. Keep the supplied operation and driver unchanged. Write a small complete caller, rather than replacing the fake operation with an always-successful value.

From the repository root:

```sh
dart lessons/17_async_errors/await_errors.dart
```

During preparation on 2026-11-13, the empty caller produced only the driver's two scenario labels. Formatting, targeted analysis and the unfinished driver passed with Dart 3.12.2 at D:/Software/Flutter/flutter/bin/cache/dart-sdk/bin/dart.exe. The PATH wrapper produced no output and was stopped. Repository documentation and diff checks passed. Flutter tests and native builds were outside that preparation run. Later, the [caller review](../LEARNING.md#lesson-17-caller-review-on-2026-11-13) recorded the learner's actual output.

## Review

Review the learner's caller, run both cases, and explain the execution order. A success must print the returned title; a failure must print the error without a success message; both handled paths reach Finished. Then make one small independent variation. Automated assertion syntax is scheduled for lesson 19; no application test or saving feature is added here.

## Real-code variation: copy a task title

At the learner's request, apply await/catch to one real operation in lib/main.dart. Use Flutter's built-in [Clipboard.setData](https://api.flutter.dev/flutter/services/Clipboard/setData.html), which returns Future<void>. [ClipboardData](https://api.flutter.dev/flutter/services/ClipboardData/ClipboardData.html) carries the text. No package or storage layer is needed.

The learner adds the flutter/services.dart import and writes Future<bool> copyTaskTitle(PlannerTask task) inside _TasksPageState. Await copying task.title, return true only after completion, and return false if the operation throws. Preserve task records and draft input. Do not log the copied title. The function does not need setState because it changes no page state.

The learner explicitly asked to write core Flutter UI as well. The learner therefore owns the first copy button, TaskRow callback contract, parent handler, awaited operation and visible result. Split this into small exchanges: first connect the child button to its parent callback, then implement copying, then introduce guarded feedback. Explain the new UI lifetime concept before the feedback step. The assistant owns visual polish, repeated controls and relevant platform-call/interaction tests. Until implementation and checks exist, the app has no copy action. This is a small lesson variation, not a new release gate, persistence or backup.

The first UI step adds a required VoidCallback named onCopy to TaskRow, places a labelled copy button beside the existing delete action, and passes a temporary parent callback that logs only a fixed action message. Preserve deletion and completion behavior. A compact Row uses MainAxisSize.min so the actions take only the width they need. This intermediate step verifies event wiring; it must not display a success message or claim that copying works yet. Replace the temporary callback with real copying in the next step.

### Copy-button review on 2026-11-13

The learner implemented the button and callback but omitted MainAxisSize.min on the trailing Row. The focused TaskRow widget test reproduces a full-width trailing-widget assertion. The assistant updated the existing callback test to supply onCopy and verify separation of all three callbacks. Analysis of lib and test and formatting of the changed test pass; the widget test does not. The learner's UI source was not changed by the review.

Next, the learner corrects that Row and implements copyTaskTitle. The parent onCopy callback awaits its boolean result and initially logs a fixed success or failure message. No setState is needed for a clipboard write. Visible feedback follows in a separate small step after the UI lifetime rule is explained. Native clipboard paste and failure behavior remain unverified.

### Clipboard review and UI feedback step on 2026-11-13

The learner corrected the Row and implemented the clipboard function. The final test run passes all 35 tests, including delayed successful and failing platform-call simulations. Formatting passes. Analysis reports one avoid_print info at print(e); remove that print while retaining the failure result. No native clipboard paste or new native build was verified.

Next, the learner replaces the onCopy debug message with a SnackBar. The callback awaits the result, returns early if context.mounted is false, chooses a success or retry message, and calls ScaffoldMessenger.of(context).showSnackBar with a SnackBar containing Text. The context inside itemBuilder is local: guard that same context, rather than an unrelated State's mounted flag. Do not show feedback during build or put the async operation inside setState. The existing MaterialApp and Scaffold provide the presentation structure.

The lifetime check prevents UI access after removal; it does not cancel a completed clipboard write. Keep copyTaskTitle responsible for the operation and its result, and keep the callback responsible for presentation. The assistant will adapt regression tests to visible feedback and test late completion after removal once the learner implements it. The current tests cover debug feedback only.

References: [BuildContext.mounted](https://api.flutter.dev/flutter/widgets/BuildContext/mounted.html), [ScaffoldMessenger.of](https://api.flutter.dev/flutter/material/ScaffoldMessenger/of.html), [showSnackBar](https://api.flutter.dev/flutter/material/ScaffoldMessengerState/showSnackBar.html).

### Visible-feedback review on 2026-11-13

The learner's messages and post-await guard are correct. The assistant removed the remaining debug print and updated tests to assert the visible SnackBar. All 39 tests pass, including six clipboard cases covering both outcomes, pending work, page removal and deletion of one task while waiting. Existing task behavior still passes its regressions. No native paste, actual-window visual inspection or new Windows build was performed.

Correction to the earlier explanation: the itemBuilder context belongs to the SliverList element, not each built row. Deleting one row does not necessarily unmount that context. The mounted guard prevents use of a removed context; it does not test whether a task still exists or cancel a copy already in progress. The initial row-removal test assumed otherwise and was corrected after inspecting the installed Flutter source. Whole-page removal correctly suppresses feedback.

### Windows paste check on 2026-11-18

The learner copied a task title from the Windows app, pasted it into Notepad and reported an exact match. This completes the Windows clipboard check. The earlier console exercise keeps its recorded output. [Current progress](../LEARNING.md#current-learning-checkpoint)
