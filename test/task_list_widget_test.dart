import 'package:cadence/domain/coursework/planner_task.dart';
import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

Finder completionCheckbox(Finder row) =>
    find.descendant(of: row, matching: find.byType(ShadCheckbox));

void main() {
  for (final size in [const Size(800, 600), const Size(400, 320)]) {
    testWidgets('Tasks exposes both tasks at $size without layout errors', (
      WidgetTester tester,
    ) async {
      await tester.binding.setSurfaceSize(size);
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());

      expect(find.text('Cadence'), findsOneWidget);
      final heading = find.byElementPredicate(
        (element) =>
            element.widget is Text &&
            (element.widget as Text).data == '任务' &&
            element.findAncestorWidgetOfExactType<ListTile>() == null,
      );
      expect(heading, findsOneWidget);
      final reportRow = find.widgetWithText(ListTile, '提交课程报告');
      final reviewRow = find.widgetWithText(ListTile, '复习线性代数');
      expect(reportRow, findsOneWidget);
      expect(find.text('提交课程报告').hitTestable(), findsOneWidget);
      expect(
        find.descendant(of: reportRow, matching: find.text('未完成')),
        findsOneWidget,
      );

      // SliverList.builder may not build off-screen rows until scrolling.
      // Verify that the second task is reachable, rather than requiring both
      // rows to exist simultaneously in a small viewport.
      await tester.scrollUntilVisible(
        reviewRow,
        40,
        scrollable: find.descendant(
          of: find.byType(CustomScrollView),
          matching: find.byElementPredicate(
            (element) =>
                element.widget is Scrollable &&
                element.findAncestorWidgetOfExactType<Scrollable>() == null,
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(reviewRow, findsOneWidget);
      expect(find.text('复习线性代数').hitTestable(), findsOneWidget);
      expect(
        find.descendant(of: reviewRow, matching: find.text('已完成')),
        findsOneWidget,
      );
      await tester.tap(completionCheckbox(reviewRow));
      await tester.pump();
      expect(
        find.descendant(of: reviewRow, matching: find.text('未完成')),
        findsOneWidget,
      );
      expect(tester.takeException(), isNull);
    });
  }

  testWidgets('TaskRow reports completion and delete separately', (
    WidgetTester tester,
  ) async {
    final completionValues = <bool>[];
    var deleteCount = 0;
    final task = PlannerTask(id: 'callback-task', title: '回调练习');

    await tester.pumpWidget(
      ShadApp(
        home: Scaffold(
          body: TaskRow(
            task: task,
            onCompletionChanged: (value) {
              completionValues.add(value);
            },
            onDelete: () {
              deleteCount += 1;
            },
          ),
        ),
      ),
    );

    expect(completionValues, isEmpty);
    expect(deleteCount, 0);
    await tester.tap(find.text('回调练习'));
    await tester.pump();
    expect(completionValues, isEmpty);
    await tester.tap(find.byType(ShadCheckbox));
    await tester.pump();
    expect(completionValues, [true]);
    expect(deleteCount, 0);
    await tester.tap(find.byTooltip('删除任务'));
    await tester.pump();
    expect(deleteCount, 1);
    expect(completionValues, [true]);
    expect(tester.takeException(), isNull);
  });
}
