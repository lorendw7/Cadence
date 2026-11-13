// Standalone console exercise. No files, database or network are used.
// ignore_for_file: avoid_print

Future<void> main() async {
  print('Scenario: success');
  await showTitle(shouldFail: false);

  print('\nScenario: failure');
  await showTitle(shouldFail: true);
}

// Assistant-provided operation: completes with a title or an error.
Future<String> fakeLoadTitle({required bool shouldFail}) async {
  await Future<void>.delayed(const Duration(milliseconds: 300));

  if (shouldFail) {
    throw Exception('Example load failed');
  }

  return 'Read a book';
}

// Learner-owned function. Write its complete body for lesson 17.
Future<void> showTitle({required bool shouldFail}) async {
  // TODO: Print Starting, await the operation, handle its result or error,
  // then print Finished after either handled outcome.
  try {
    final title = await fakeLoadTitle(shouldFail: shouldFail);
    print(title);
  } catch (error) {
    print('Operation failed: $error');
  }
}
