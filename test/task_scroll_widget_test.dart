import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void main() {
  testWidgets('Short window can reach the form, tasks, empty state and undo', (
    WidgetTester tester,
  ) async {
    await tester.binding.setSurfaceSize(const Size(350, 280));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(const CadenceApp());
    expect(tester.takeException(), isNull);

    final pageScroll = find.descendant(
      of: find.byType(CustomScrollView),
      matching: find.byElementPredicate(
        (element) =>
            element.widget is Scrollable &&
            element.findAncestorWidgetOfExactType<Scrollable>() == null,
      ),
    );
    Future<void> reveal(Finder target) async {
      // Footer actions may leave lazily built rows above the viewport.
      tester.state<ScrollableState>(pageScroll).position.jumpTo(0);
      await tester.pumpAndSettle();
      await tester.scrollUntilVisible(target, 60, scrollable: pageScroll);
      await tester.pumpAndSettle();
      expect(target.hitTestable(), findsOneWidget);
      expect(tester.takeException(), isNull);
    }

    final input = find.byType(ShadInput);
    await reveal(input);
    await tester.enterText(input, 'Keep this draft');
    for (final title in ['提交课程报告', '复习线性代数']) {
      final row = find.widgetWithText(TaskRow, title);
      await reveal(row);
      final delete = find.descendant(of: row, matching: find.byTooltip('删除任务'));
      await reveal(delete);
      await tester.tap(delete);
      await tester.pumpAndSettle();
    }

    await reveal(find.text('暂无任务，添加一条吧'));
    expect(find.byType(TaskRow), findsNothing);
    await reveal(input);
    expect(tester.widget<ShadInput>(input).controller!.text, 'Keep this draft');

    final undo = find.widgetWithText(ShadButton, '撤销删除');
    await reveal(undo);
    await tester.tap(undo);
    await tester.pumpAndSettle();
    final restoredRow = find.widgetWithText(TaskRow, '复习线性代数');
    await reveal(restoredRow);
    expect(tester.widget<TaskRow>(restoredRow).task.isCompleted, isTrue);
    expect(find.text('暂无任务，添加一条吧'), findsNothing);

    final add = find.widgetWithText(ShadButton, '添加任务');
    await reveal(add);
    await tester.tap(add);
    await tester.pumpAndSettle();
    await reveal(find.widgetWithText(TaskRow, 'Keep this draft'));
    await reveal(input);
    expect(tester.widget<ShadInput>(input).controller!.text, isEmpty);
    expect(tester.takeException(), isNull);
  });
}
