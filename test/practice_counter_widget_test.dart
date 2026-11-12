import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void main() {
  testWidgets(
    'Undo remains usable after retiring the counter and narrowing the window',
    (WidgetTester tester) async {
      await tester.binding.setSurfaceSize(const Size(800, 700));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());

      final undo = find.widgetWithText(ShadButton, '撤销删除');
      expect(find.text('加1'), findsNothing);
      expect(find.text('归零'), findsNothing);

      final reportRow = find.widgetWithText(TaskRow, '提交课程报告');
      await tester.tap(
        find.descendant(of: reportRow, matching: find.byTooltip('删除任务')),
      );
      await tester.pumpAndSettle();
      await tester.binding.setSurfaceSize(const Size(200, 700));
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      expect(undo.hitTestable(), findsOneWidget);
      await tester.tap(undo);
      await tester.pumpAndSettle();
      expect(reportRow.hitTestable(), findsOneWidget);
      expect(tester.widget<ShadButton>(undo).onPressed, isNull);
      expect(tester.takeException(), isNull);
    },
  );
}
