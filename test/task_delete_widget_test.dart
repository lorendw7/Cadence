import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

Finder completionCheckbox(Finder row) =>
    find.descendant(of: row, matching: find.byType(ShadCheckbox));

void main() {
  for (final size in [const Size(800, 600), const Size(400, 320)]) {
    testWidgets('Deleting all tasks allows starting again at $size', (
      WidgetTester tester,
    ) async {
      await tester.binding.setSurfaceSize(size);
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());

      final pageScroll = find.descendant(
        of: find.byType(CustomScrollView),
        matching: find.byElementPredicate(
          (element) =>
              element.widget is Scrollable &&
              element.findAncestorWidgetOfExactType<Scrollable>() == null,
        ),
      );
      Future<void> reveal(Finder target) async {
        tester.state<ScrollableState>(pageScroll).position.jumpTo(0);
        await tester.pumpAndSettle();
        await tester.scrollUntilVisible(target, 40, scrollable: pageScroll);
        await tester.pumpAndSettle();
        expect(target.hitTestable(), findsOneWidget);
      }

      for (final title in ['提交课程报告', '复习线性代数']) {
        final row = find.widgetWithText(ListTile, title);
        final delete = find.descendant(
          of: row,
          matching: find.byTooltip('删除任务'),
        );
        await reveal(delete);
        await tester.tap(delete);
        await tester.pumpAndSettle();
        expect(find.text(title), findsNothing);
        if (title == '提交课程报告') {
          final survivor = find.widgetWithText(ListTile, '复习线性代数');
          await reveal(survivor);
          expect(
            find.descendant(of: survivor, matching: find.text('已完成')),
            findsOneWidget,
          );
          expect(find.text('暂无任务，添加一条吧'), findsNothing);
        }
      }

      await reveal(find.text('暂无任务，添加一条吧'));
      expect(find.text('暂无任务，添加一条吧'), findsOneWidget);
      expect(find.byType(SliverList), findsNothing);
      expect(find.byType(TaskRow), findsNothing);
      final add = find.widgetWithText(ShadButton, '添加任务');
      await reveal(add);
      await tester.tap(add);
      await tester.pumpAndSettle();
      expect(find.text('请输入任务标题'), findsOneWidget);
      expect(find.text('暂无任务，添加一条吧'), findsOneWidget);
      expect(find.byType(TaskRow), findsNothing);

      final input = find.byType(ShadInput);
      await reveal(input);
      await tester.enterText(input, '重新开始');
      await reveal(add);
      await tester.tap(add);
      await tester.pumpAndSettle();
      expect(find.text('暂无任务，添加一条吧'), findsNothing);
      expect(find.text('请输入任务标题'), findsNothing);
      final restartedRow = find.widgetWithText(ListTile, '重新开始');
      await reveal(restartedRow);
      expect(find.byType(TaskRow), findsOneWidget);
      expect(find.text('未完成'), findsOneWidget);
      final checkbox = completionCheckbox(restartedRow);
      await reveal(checkbox);
      await tester.tap(checkbox);
      await tester.pump();
      expect(find.text('已完成'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  }

  testWidgets('Deleting one duplicate title preserves the other task identity', (
    WidgetTester tester,
  ) async {
    await tester.binding.setSurfaceSize(const Size(800, 900));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(const CadenceApp());
    for (var i = 0; i < 2; i += 1) {
      await tester.enterText(find.byType(ShadInput), '同名任务');
      await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
      await tester.pump();
    }
    final rowsBefore = tester
        .widgetList<TaskRow>(find.byType(TaskRow))
        .toList();
    expect(rowsBefore, hasLength(4));
    final removedId = rowsBefore[2].task.id;
    final survivingIds = rowsBefore
        .where((row) => row.task.id != removedId)
        .map((row) => row.task.id)
        .toList();
    final target = find.byWidgetPredicate(
      (widget) => widget is TaskRow && widget.task.id == removedId,
    );
    await tester.tap(
      find.descendant(of: target, matching: find.byTooltip('删除任务')),
    );
    await tester.pump();
    expect(find.text('同名任务'), findsOneWidget);
    expect(
      tester
          .widgetList<TaskRow>(find.byType(TaskRow))
          .map((row) => row.task.id)
          .toList(),
      survivingIds,
    );
    // The remaining duplicate has shifted index and must still toggle correctly.
    await tester.tap(completionCheckbox(find.widgetWithText(ListTile, '同名任务')));
    await tester.pump();
    final remaining = tester.widgetList<TaskRow>(find.byType(TaskRow)).toList();
    expect(remaining.map((row) => row.task.id).toList(), survivingIds);
    expect(remaining.map((row) => row.task.isCompleted).toList(), [
      false,
      true,
      true,
    ]);
    expect(tester.takeException(), isNull);
  });
}
