# Lesson 18. Cleanup after an awaited read

A reader is already open when your function starts. Reading can return a title or throw an error. In either case, the reader needs to be released. In Dart, a `finally` block runs when control leaves its `try` block, including after an early return from `try` or `catch`. When cleanup finishes normally, the pending return value reaches the caller. [Dart error handling](https://dart.dev/language/error-handling#finally)

## Write one function

Open the [exercise file](../../lessons/18_async_cleanup/async_cleanup.dart). The assistant provides the reader and the driver that runs both cases. You write the full body of `tryReadTitle`.

- `reader.readTitle()` returns a `Future<String>`. Await the read so its error can reach your `catch`.
- Return `true` if the read succeeds and `false` if it throws.
- Call `reader.release()` exactly once on either path. This fake release only counts calls.

Before coding, predict what happens to a cleanup statement written below the whole `try` and `catch` if the catch block returns early. Then write your caller with that prediction in mind.

## Check both results

Run this command from the repository root.

```powershell
dart lessons/18_async_cleanup/async_cleanup.dart
```

If the Dart command stalls on the current Windows host, use the installed executable directly.

```powershell
& 'D:/Software/Flutter/flutter/bin/cache/dart-sdk/bin/dart.exe' lessons/18_async_cleanup/async_cleanup.dart
```

The driver prints a ready message before you write the body. After your change, look for one pass per case.

```text
PASS Successful read: result=true, releases=1
PASS Failed read: result=false, releases=1
```

If a failed read reports zero releases, follow the path from the error through the early return. If it reports success, find the statement that chose the returned value. For review, explain what runs between the early return and the caller receiving `false`. [Current progress](../LEARNING.md#current-learning-checkpoint)
