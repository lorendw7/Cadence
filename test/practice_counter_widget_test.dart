import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void main() {
  testWidgets('Action buttons wrap and remain usable in a narrow window', (
    WidgetTester tester,
  ) async {
    await tester.binding.setSurfaceSize(const Size(800, 700));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(const CadenceApp());

    final increment = find.widgetWithText(ShadButton, '加1');
    final reset = find.widgetWithText(TextButton, '归零');
    final undo = find.widgetWithText(ShadButton, '撤销删除');
    expect(tester.getRect(undo).top, closeTo(tester.getRect(increment).top, 1));

    final reportRow = find.widgetWithText(TaskRow, '提交课程报告');
    await tester.tap(
      find.descendant(of: reportRow, matching: find.byTooltip('删除任务')),
    );
    await tester.pumpAndSettle();
    await tester.binding.setSurfaceSize(const Size(200, 700));
    await tester.pumpAndSettle();

    expect(
      tester.getRect(undo).top,
      greaterThan(tester.getRect(increment).bottom),
    );
    expect(tester.takeException(), isNull);
    await tester.tap(increment);
    await tester.pump();
    expect(find.text('练习次数：1'), findsOneWidget);
    await tester.tap(reset);
    await tester.pump();
    expect(find.text('练习次数：0'), findsOneWidget);
    await tester.tap(undo);
    await tester.pumpAndSettle();
    expect(reportRow.hitTestable(), findsOneWidget);
    expect(tester.widget<ShadButton>(undo).onPressed, isNull);
    expect(tester.takeException(), isNull);
  });

  testWidgets('Practice counter increments, resets and preserves task rows', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());

    expect(find.text('练习次数：0'), findsOneWidget);
    final increment = find.widgetWithText(ShadButton, '加1');
    final reset = find.widgetWithText(TextButton, '归零');

    for (var count = 1; count <= 3; count++) {
      await tester.tap(increment);
      await tester.pump();
      expect(find.text('练习次数：$count'), findsOneWidget);
    }

    await tester.tap(reset);
    await tester.pump();
    expect(find.text('练习次数：0'), findsOneWidget);

    await tester.tap(increment);
    await tester.pump();
    expect(find.text('练习次数：1'), findsOneWidget);
    expect(find.byType(TaskRow), findsNWidgets(2));
    expect(
      find.descendant(
        of: find.widgetWithText(ListTile, '提交课程报告'),
        matching: find.text('未完成'),
      ),
      findsOneWidget,
    );
    expect(
      find.descendant(
        of: find.widgetWithText(ListTile, '复习线性代数'),
        matching: find.text('已完成'),
      ),
      findsOneWidget,
    );
    expect(tester.takeException(), isNull);
  });
}
