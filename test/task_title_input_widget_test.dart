import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

Finder completionCheckbox(Finder row) =>
    find.descendant(of: row, matching: find.byType(ShadCheckbox));

void main() {
  testWidgets('Add action is labelled as adding a task', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());
    expect(find.widgetWithText(ShadButton, '添加任务'), findsOneWidget);
    expect(find.text('读取标题'), findsNothing);
  });

  testWidgets('Quick add stacks only when its content is too narrow', (
    WidgetTester tester,
  ) async {
    await tester.binding.setSurfaceSize(const Size(800, 600));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(const CadenceApp());

    final input = find.byType(ShadInput);
    final addButton = find.widgetWithText(ShadButton, '添加任务');
    var inputBounds = tester.getRect(input);
    var buttonBounds = tester.getRect(addButton);
    expect(buttonBounds.left, greaterThan(inputBounds.right));
    expect(buttonBounds.top, closeTo(inputBounds.top, 1));

    await tester.enterText(input, '缩放时保留输入');
    await tester.binding.setSurfaceSize(const Size(400, 320));
    await tester.pumpAndSettle();

    inputBounds = tester.getRect(input);
    buttonBounds = tester.getRect(addButton);
    expect(buttonBounds.left, greaterThan(inputBounds.right));
    expect(buttonBounds.top, closeTo(inputBounds.top, 1));
    expect(find.text('缩放时保留输入'), findsOneWidget);
    expect(tester.takeException(), isNull);

    await tester.binding.setSurfaceSize(const Size(350, 600));
    await tester.pumpAndSettle();

    inputBounds = tester.getRect(input);
    buttonBounds = tester.getRect(addButton);
    expect(buttonBounds.top, greaterThan(inputBounds.bottom));
    expect(buttonBounds.left, closeTo(inputBounds.left, 1));
    expect(buttonBounds.right, closeTo(inputBounds.right, 1));
    expect(find.text('缩放时保留输入'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets(
    'Adding tasks clears input and preserves unique task identities',
    (WidgetTester tester) async {
      await tester.binding.setSurfaceSize(const Size(800, 900));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());

      final expectedTitles = ['提交课程报告', '复习线性代数'];
      final initialRows = tester
          .widgetList<TaskRow>(find.byType(TaskRow))
          .toList();
      final seenIds = initialRows.map((row) => row.task.id).toSet();
      final addedIds = <String>[];
      for (final title in ['准备报告', '准备报告', '復習 Dart 2']) {
        await tester.enterText(find.byType(ShadInput), title);
        await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
        await tester.pump();

        expectedTitles.add(title);
        final rows = tester.widgetList<TaskRow>(find.byType(TaskRow)).toList();
        expect(rows.map((row) => row.task.title).toList(), expectedTitles);
        final newTask = rows.last.task;
        expect(newTask.isCompleted, isFalse);
        expect(newTask.id, isNotEmpty);
        expect(seenIds.add(newTask.id), isTrue);
        addedIds.add(newTask.id);
        expect(
          tester.widget<ShadInput>(find.byType(ShadInput)).controller!.text,
          isEmpty,
        );

        await tester.tap(find.widgetWithText(ShadButton, '加1'));
        await tester.pump();
        await tester.tap(find.widgetWithText(TextButton, '归零'));
        await tester.pump();
      }

      final firstAddedRow = find.byWidgetPredicate(
        (widget) => widget is TaskRow && widget.task.id == addedIds.first,
      );
      for (final completed in [true, false]) {
        await tester.tap(completionCheckbox(firstAddedRow));
        await tester.pump();
        final rows = tester.widgetList<TaskRow>(find.byType(TaskRow)).toList();
        expect(rows.map((row) => row.task.title).toList(), expectedTitles);
        expect(rows.map((row) => row.task.id).toSet(), seenIds);
        expect(rows.map((row) => row.task.isCompleted).toList(), [
          false,
          true,
          completed,
          false,
          false,
        ]);
      }
      expect(tester.takeException(), isNull);
    },
  );

  testWidgets('Input survives counter and task state rebuilds', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());
    await tester.enterText(find.byType(ShadInput), '准备课程报告');

    for (final target in [
      find.widgetWithText(ShadButton, '加1'),
      find.widgetWithText(TextButton, '归零'),
      completionCheckbox(find.widgetWithText(ListTile, '提交课程报告')),
    ]) {
      await tester.tap(target);
      await tester.pump();
      expect(find.text('准备课程报告'), findsOneWidget);
    }
    expect(tester.takeException(), isNull);
  });

  testWidgets('Page releases its text controller when removed', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());
    final controller = tester
        .widget<ShadInput>(find.byType(ShadInput))
        .controller!;
    await tester.enterText(find.byType(ShadInput), '临时输入');
    await tester.pumpWidget(const SizedBox.shrink());
    expect(tester.takeException(), isNull);

    void listener() {}
    try {
      expect(() => controller.addListener(listener), throwsFlutterError);
    } finally {
      controller.removeListener(listener);
    }
  });
}
