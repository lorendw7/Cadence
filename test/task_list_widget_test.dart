import 'package:cadence/domain/coursework/planner_task.dart';
import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  for (final size in [const Size(800, 600), const Size(400, 320)]) {
    testWidgets('Today exposes both tasks at $size without layout errors', (
      WidgetTester tester,
    ) async {
      await tester.binding.setSurfaceSize(size);
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());

      expect(find.text('Cadence'), findsOneWidget);
      expect(find.text('今天'), findsOneWidget);
      final reportRow = find.widgetWithText(ListTile, '提交课程报告');
      final reviewRow = find.widgetWithText(ListTile, '复习线性代数');
      expect(reportRow, findsOneWidget);
      expect(find.text('提交课程报告').hitTestable(), findsOneWidget);
      expect(
        find.descendant(of: reportRow, matching: find.text('未完成')),
        findsOneWidget,
      );

      // ListView.builder may not build off-screen rows until scrolling.
      // Verify that the second task is reachable, rather than requiring both
      // rows to exist simultaneously in a small viewport.
      await tester.scrollUntilVisible(
        reviewRow,
        40,
        scrollable: find.descendant(
          of: find.byType(ListView),
          matching: find.byType(Scrollable),
        ),
      );
      await tester.pumpAndSettle();
      expect(reviewRow, findsOneWidget);
      expect(find.text('复习线性代数').hitTestable(), findsOneWidget);
      expect(
        find.descendant(of: reviewRow, matching: find.text('已完成')),
        findsOneWidget,
      );
      await tester.tap(find.text('复习线性代数'));
      await tester.pump();
      expect(
        find.descendant(of: reviewRow, matching: find.text('未完成')),
        findsOneWidget,
      );
      expect(tester.takeException(), isNull);
    });
  }

  testWidgets('TaskRow reports a tap through its callback', (
    WidgetTester tester,
  ) async {
    var toggleCount = 0;
    final task = PlannerTask(id: 'callback-task', title: '回调练习');

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: TaskRow(
            task: task,
            onToggle: () {
              toggleCount += 1;
            },
          ),
        ),
      ),
    );

    expect(toggleCount, 0);
    await tester.tap(find.text('回调练习'));
    await tester.pump();
    expect(toggleCount, 1);
  });
}
