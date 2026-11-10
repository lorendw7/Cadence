import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Practice counter increments, resets and preserves task rows', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());

    expect(find.text('练习次数：0'), findsOneWidget);
    final increment = find.widgetWithText(ElevatedButton, '加1');
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
    expect(find.byType(ListTile), findsNWidgets(2));
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
