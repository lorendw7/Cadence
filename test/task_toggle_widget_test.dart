import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void expectTaskStatus(String title, String status) {
  final row = find.widgetWithText(ListTile, title);
  expect(row, findsOneWidget);
  expect(find.descendant(of: row, matching: find.text(status)), findsOneWidget);
}

Finder completionCheckbox(String title) => find.descendant(
  of: find.widgetWithText(ListTile, title),
  matching: find.byType(ShadCheckbox),
);

void main() {
  testWidgets('Tasks toggle independently and can undo completion changes', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());

    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '已完成');

    await tester.tap(completionCheckbox('提交课程报告'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '已完成');
    expectTaskStatus('复习线性代数', '已完成');

    await tester.tap(completionCheckbox('提交课程报告'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '已完成');

    await tester.tap(completionCheckbox('复习线性代数'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '未完成');

    await tester.tap(completionCheckbox('复习线性代数'));
    await tester.pump();
    expectTaskStatus('提交课程报告', '未完成');
    expectTaskStatus('复习线性代数', '已完成');
    expect(tester.takeException(), isNull);
  });

  testWidgets('Changed task states survive validation and task addition', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const CadenceApp());
    await tester.tap(completionCheckbox('提交课程报告'));
    await tester.pump();
    await tester.tap(completionCheckbox('复习线性代数'));
    await tester.pump();

    await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
    await tester.pump();
    expect(find.text('请输入任务标题'), findsOneWidget);
    expectTaskStatus('提交课程报告', '已完成');
    expectTaskStatus('复习线性代数', '未完成');

    await tester.enterText(find.byType(ShadInput), 'Another task');
    await tester.tap(find.widgetWithText(ShadButton, '添加任务'));
    await tester.pump();
    expectTaskStatus('Another task', '未完成');
    expectTaskStatus('提交课程报告', '已完成');
    expectTaskStatus('复习线性代数', '未完成');
    expect(tester.takeException(), isNull);
  });
}
