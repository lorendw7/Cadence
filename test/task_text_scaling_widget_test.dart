import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

Finder pageScroll() => find.descendant(
  of: find.byType(CustomScrollView),
  matching: find.byElementPredicate(
    (element) =>
        element.widget is Scrollable &&
        element.findAncestorWidgetOfExactType<Scrollable>() == null,
  ),
);

Future<void> reveal(WidgetTester tester, Finder target) async {
  // Start from the top so lazily built rows can be found in either direction.
  tester.state<ScrollableState>(pageScroll()).position.jumpTo(0);
  await tester.pumpAndSettle();
  await tester.scrollUntilVisible(
    target,
    60,
    scrollable: pageScroll(),
    maxScrolls: 40,
  );
  await tester.pumpAndSettle();
  expect(target.hitTestable(), findsOneWidget);
  expect(tester.takeException(), isNull);
}

void expectLabelFits(WidgetTester tester, Finder button, String label) {
  final buttonBounds = tester.getRect(button);
  final labelBounds = tester.getRect(
    find.descendant(of: button, matching: find.text(label)),
  );
  expect(labelBounds.width, greaterThan(0));
  expect(labelBounds.height, greaterThan(0));
  expect(buttonBounds.inflate(0.1).contains(labelBounds.topLeft), isTrue);
  expect(buttonBounds.inflate(0.1).contains(labelBounds.bottomRight), isTrue);
}

Future<void> openScaledApp(WidgetTester tester, Size size) async {
  await tester.binding.setSurfaceSize(size);
  tester.platformDispatcher.textScaleFactorTestValue = 2;
  addTearDown(() => tester.binding.setSurfaceSize(null));
  addTearDown(tester.platformDispatcher.clearTextScaleFactorTestValue);
  await tester.pumpWidget(const CadenceApp());
  expect(tester.takeException(), isNull);
}

void main() {
  for (final size in [
    const Size(800, 600),
    const Size(400, 320),
    const Size(350, 280),
  ]) {
    testWidgets('System 200% text keeps controls readable at $size', (
      WidgetTester tester,
    ) async {
      await openScaledApp(tester, size);
      final input = find.byType(ShadInput);
      await reveal(tester, input);
      expect(MediaQuery.textScalerOf(tester.element(input)).scale(16), 32);

      for (final label in ['添加任务', '撤销删除']) {
        final button = find.widgetWithText(ShadButton, label);
        await reveal(tester, button);
        expectLabelFits(tester, button, label);
      }

      final firstRow = find.byWidgetPredicate(
        (widget) => widget is TaskRow && widget.task.id == 'demo-1',
      );
      await reveal(
        tester,
        find.descendant(of: firstRow, matching: find.byType(ShadCheckbox)),
      );
      await reveal(
        tester,
        find.descendant(of: firstRow, matching: find.byTooltip('删除任务')),
      );
    });
  }

  testWidgets('200% text preserves task actions and drafts in a short window', (
    WidgetTester tester,
  ) async {
    await openScaledApp(tester, const Size(350, 280));
    final input = find.byType(ShadInput);
    final add = find.widgetWithText(ShadButton, '添加任务');
    final undo = find.widgetWithText(ShadButton, '撤销删除');

    await reveal(tester, input);
    await tester.enterText(input, 'Scaled task');
    await reveal(tester, add);
    await tester.tap(add);
    await tester.pumpAndSettle();

    final addedRow = find.byWidgetPredicate(
      (widget) => widget is TaskRow && widget.task.id == 'local-1',
    );
    final checkbox = find.descendant(
      of: addedRow,
      matching: find.byType(ShadCheckbox),
    );
    await reveal(tester, checkbox);
    await tester.tap(checkbox);
    await tester.pumpAndSettle();
    expect(tester.widget<TaskRow>(addedRow).task.isCompleted, isTrue);
    final completedTask = tester.widget<TaskRow>(addedRow).task;

    await reveal(tester, input);
    expect(tester.widget<ShadInput>(input).controller!.text, isEmpty);
    await tester.enterText(input, 'Keep this draft');

    final delete = find.descendant(
      of: addedRow,
      matching: find.byTooltip('删除任务'),
    );
    await reveal(tester, delete);
    await tester.tap(delete);
    await tester.pumpAndSettle();
    expect(addedRow, findsNothing);
    await reveal(tester, undo);
    expect(tester.widget<ShadButton>(undo).onPressed, isNotNull);
    await tester.tap(undo);
    await tester.pumpAndSettle();
    await reveal(tester, checkbox);
    expect(tester.widget<TaskRow>(addedRow).task, same(completedTask));

    await reveal(tester, input);
    expect(tester.widget<ShadInput>(input).controller!.text, 'Keep this draft');
    expect(tester.takeException(), isNull);
  });
}
