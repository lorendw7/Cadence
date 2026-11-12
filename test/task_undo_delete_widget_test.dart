import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

Finder rowWithId(String id) => find.byWidgetPredicate(
  (widget) => widget is TaskRow && widget.task.id == id,
);

Finder completionCheckbox(Finder row) =>
    find.descendant(of: row, matching: find.byType(ShadCheckbox));

Future<void> reveal(WidgetTester tester, Finder target) async {
  final pageScroll = find.descendant(
    of: find.byType(CustomScrollView),
    matching: find.byElementPredicate(
      (element) =>
          element.widget is Scrollable &&
          element.findAncestorWidgetOfExactType<Scrollable>() == null,
    ),
  );
  // Search from the top when moving back from the footer to lazy task rows.
  tester.state<ScrollableState>(pageScroll).position.jumpTo(0);
  await tester.pumpAndSettle();
  await tester.scrollUntilVisible(target, 40, scrollable: pageScroll);
  await tester.pumpAndSettle();
  expect(target.hitTestable(), findsOneWidget);
}

Future<void> deleteTask(WidgetTester tester, String id) async {
  final delete = find.descendant(
    of: rowWithId(id),
    matching: find.byTooltip('删除任务'),
  );
  await reveal(tester, delete);
  await tester.tap(delete);
  await tester.pumpAndSettle();
}

void main() {
  final undo = find.widgetWithText(ShadButton, '撤销删除');
  for (final size in [const Size(800, 600), const Size(400, 320)]) {
    testWidgets('Only the latest deletion can be undone once at $size', (
      WidgetTester tester,
    ) async {
      await tester.binding.setSurfaceSize(size);
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());
      await reveal(tester, undo);
      expect(tester.widget<ShadButton>(undo).onPressed, isNull);
      await deleteTask(tester, 'demo-1');
      await reveal(tester, undo);
      expect(tester.widget<ShadButton>(undo).onPressed, isNotNull);
      await deleteTask(tester, 'demo-2');
      await reveal(tester, find.text('暂无任务，添加一条吧'));
      expect(find.text('暂无任务，添加一条吧'), findsOneWidget);
      await reveal(tester, undo);
      await tester.tap(undo);
      await tester.pumpAndSettle();
      await reveal(tester, rowWithId('demo-2'));
      expect(find.text('暂无任务，添加一条吧'), findsNothing);
      expect(find.byType(TaskRow), findsOneWidget);
      final restored = tester.widget<TaskRow>(find.byType(TaskRow)).task;
      expect(restored.id, 'demo-2');
      expect(restored.title, '复习线性代数');
      expect(restored.isCompleted, isTrue);
      await reveal(tester, undo);
      expect(tester.widget<ShadButton>(undo).onPressed, isNull);
      await tester.tap(undo);
      await tester.pump();
      await reveal(tester, rowWithId('demo-2'));
      expect(find.byType(TaskRow), findsOneWidget);
      expect(rowWithId('demo-1'), findsNothing);
      final checkbox = completionCheckbox(rowWithId('demo-2'));
      await reveal(tester, checkbox);
      await tester.tap(checkbox);
      await tester.pump();
      expect(
        tester.widget<TaskRow>(rowWithId('demo-2')).task.isCompleted,
        isFalse,
      );
      expect(tester.takeException(), isNull);
    });
  }

  for (final deletedId in ['demo-1', 'demo-2']) {
    testWidgets('Undo restores $deletedId at its position after an addition', (
      WidgetTester tester,
    ) async {
      await tester.binding.setSurfaceSize(const Size(800, 900));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());
      // Change state first so restoring defaults instead of the original fails.
      await tester.tap(completionCheckbox(rowWithId(deletedId)));
      await tester.pump();
      final original = tester.widget<TaskRow>(rowWithId(deletedId)).task;
      await deleteTask(tester, deletedId);
      await tester.enterText(find.byType(ShadInput), '新增任务');
      await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
      await tester.pump();
      // Validation rebuilds must also preserve the pending undo record.
      await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
      await tester.pump();
      expect(find.text('请输入任务标题'), findsOneWidget);
      await tester.tap(undo);
      await tester.pump();
      final rows = tester.widgetList<TaskRow>(find.byType(TaskRow)).toList();
      expect(rows.map((row) => row.task.id).toList(), [
        'demo-1',
        'demo-2',
        'local-1',
      ]);
      final restored = tester.widget<TaskRow>(rowWithId(deletedId)).task;
      expect(restored, same(original));
      expect(restored.title, original.title);
      expect(restored.isCompleted, original.isCompleted);
      expect(tester.widget<ShadButton>(undo).onPressed, isNull);
      // Restoration must not consume the ID of a new task.
      await tester.enterText(find.byType(ShadInput), '下一条任务');
      await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
      await tester.pump();
      expect(rowWithId('local-2'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  }
}
