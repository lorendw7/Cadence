import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void main() {
  testWidgets('Sidebar resizing preserves tasks, draft and pending undo', (
    WidgetTester tester,
  ) async {
    await tester.binding.setSurfaceSize(const Size(800, 600));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(const CadenceApp());

    final input = find.byType(ShadInput);
    final undo = find.widgetWithText(ShadButton, '撤销删除');
    await tester.enterText(input, 'Keep this task');
    await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
    await tester.pumpAndSettle();

    final firstRow = find.byWidgetPredicate(
      (widget) => widget is TaskRow && widget.task.id == 'demo-1',
    );
    await tester.tap(
      find.descendant(of: firstRow, matching: find.byType(ShadCheckbox)),
    );
    await tester.pumpAndSettle();
    final deletedTask = tester.widget<TaskRow>(firstRow).task;
    expect(deletedTask.isCompleted, isTrue);
    await tester.tap(
      find.descendant(of: firstRow, matching: find.byTooltip('删除任务')),
    );
    await tester.pumpAndSettle();
    final remainingTasks = tester
        .widgetList<TaskRow>(find.byType(TaskRow))
        .map((row) => row.task)
        .toList();
    await tester.enterText(input, 'Unsubmitted draft');

    for (final width in [800.0, 640.0, 639.0, 350.0, 800.0]) {
      await tester.binding.setSurfaceSize(Size(width, 600));
      await tester.pumpAndSettle();

      expect(find.text('工作区'), width >= 640 ? findsOneWidget : findsNothing);
      final currentPage = find.widgetWithText(ListTile, '任务');
      expect(currentPage, width >= 640 ? findsOneWidget : findsNothing);
      if (width >= 640) {
        expect(tester.widget<ListTile>(currentPage).selected, isTrue);
        expect(
          tester.getRect(currentPage).right,
          lessThan(tester.getRect(input).left),
        );
      }
      expect(find.text('Unsubmitted draft'), findsOneWidget);
      expect(
        tester.widgetList<TaskRow>(find.byType(TaskRow)).map((row) => row.task),
        orderedEquals(remainingTasks),
      );
      expect(tester.widget<ShadButton>(undo).onPressed, isNotNull);
      expect(tester.takeException(), isNull);
    }

    await tester.tap(undo);
    await tester.pumpAndSettle();
    final restoredTasks = tester
        .widgetList<TaskRow>(find.byType(TaskRow))
        .map((row) => row.task)
        .toList();
    expect(restoredTasks, orderedEquals([deletedTask, ...remainingTasks]));
    expect(restoredTasks.first.isCompleted, isTrue);
    expect(find.text('Unsubmitted draft'), findsOneWidget);
    expect(tester.widget<ShadButton>(undo).onPressed, isNull);
    expect(tester.takeException(), isNull);
  });
}
