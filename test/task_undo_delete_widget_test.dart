import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

Finder rowWithId(String id) => find.byWidgetPredicate(
  (widget) => widget is TaskRow && widget.task.id == id,
);

Finder completionCheckbox(Finder row) =>
    find.descendant(of: row, matching: find.byType(ShadCheckbox));

Future<void> deleteTask(WidgetTester tester, String id) async {
  final row = rowWithId(id);
  await tester.scrollUntilVisible(
    row,
    40,
    scrollable: find.descendant(
      of: find.byType(ListView),
      matching: find.byType(Scrollable),
    ),
  );
  await tester.pumpAndSettle();
  await tester.tap(find.descendant(of: row, matching: find.byTooltip('删除任务')));
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
      expect(tester.widget<ShadButton>(undo).onPressed, isNull);
      await deleteTask(tester, 'demo-1');
      expect(tester.widget<ShadButton>(undo).onPressed, isNotNull);
      await deleteTask(tester, 'demo-2');
      expect(find.text('暂无任务，添加一条吧'), findsOneWidget);
      await tester.tap(undo);
      await tester.pumpAndSettle();
      expect(find.text('暂无任务，添加一条吧'), findsNothing);
      expect(find.byType(TaskRow), findsOneWidget);
      final restored = tester.widget<TaskRow>(find.byType(TaskRow)).task;
      expect(restored.id, 'demo-2');
      expect(restored.title, '复习线性代数');
      expect(restored.isCompleted, isTrue);
      expect(tester.widget<ShadButton>(undo).onPressed, isNull);
      await tester.tap(undo);
      await tester.pump();
      expect(find.byType(TaskRow), findsOneWidget);
      expect(rowWithId('demo-1'), findsNothing);
      await tester.tap(completionCheckbox(rowWithId('demo-2')));
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
      await tester.tap(find.widgetWithText(ShadButton, '加1'));
      await tester.pump();
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
