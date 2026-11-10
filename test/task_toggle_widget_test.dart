import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void expectTaskStatus(String title, String status) {
  final row = find.widgetWithText(ListTile, title);
  expect(row, findsOneWidget);
  expect(find.descendant(of: row, matching: find.text(status)), findsOneWidget);
}

void main() {
  testWidgets('Tasks toggle independently and can undo completion changes', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());

    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '已完成');

    await tester.tap(find.text('提交课程报告'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '已完成');
    expectTaskStatus('复习线性代数', '已完成');

    await tester.tap(find.text('提交课程报告'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '已完成');

    await tester.tap(find.text('复习线性代数'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '未完成');

    await tester.tap(find.text('复习线性代数'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '已完成');
    expect(find.text('练习次数：0'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('Changed task states survive counter increment and reset', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());
    await tester.tap(find.text('提交课程报告'));
    await tester.pump();
    await tester.tap(find.text('复习线性代数'));
    await tester.pump();

    await tester.tap(find.widgetWithText(ElevatedButton, '加1'));
    await tester.pump();
    expect(find.text('练习次数：1'), findsOneWidget);
    expectTaskStatus('提交课程报告', '已完成');
    expectTaskStatus('复习线性代数', '未完成');

    await tester.tap(find.widgetWithText(TextButton, '归零'));
    await tester.pump();
    expect(find.text('练习次数：0'), findsOneWidget);
    expectTaskStatus('提交课程报告', '已完成');
    expectTaskStatus('复习线性代数', '未完成');
    expect(tester.takeException(), isNull);
  });
}
