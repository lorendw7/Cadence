// Standalone exercise. The reader simulates a resource entirely in memory.
// ignore_for_file: avoid_print

import '../17_async_errors/await_errors.dart' show fakeLoadTitle;

class ExampleReader {
  ExampleReader({required this.shouldFail});

  final bool shouldFail;
  int _releaseCount = 0;

  int get releaseCount => _releaseCount;

  Future<String> readTitle() => fakeLoadTitle(shouldFail: shouldFail);

  void release() {
    _releaseCount += 1;
  }
}

// Learner-owned caller. Write the complete body for lesson 18.
Future<bool> tryReadTitle(ExampleReader reader) async {
  throw UnimplementedError('Write the body of tryReadTitle.');
}

Future<void> main() async {
  var allPassed = true;

  for (final shouldFail in [false, true]) {
    final reader = ExampleReader(shouldFail: shouldFail);
    final scenario = shouldFail ? 'Failed read' : 'Successful read';
    final expectedResult = !shouldFail;

    final bool result;
    try {
      result = await tryReadTitle(reader);
    } on UnimplementedError {
      print('Exercise ready. Write tryReadTitle, then run this file again.');
      return;
    }

    final passed = result == expectedResult && reader.releaseCount == 1;
    final status = passed ? 'PASS' : 'FAIL';
    print('$status $scenario: result=$result, releases=${reader.releaseCount}');
    allPassed = allPassed && passed;
  }

  if (!allPassed) {
    throw StateError('Check the result and release count for each read.');
  }
}
