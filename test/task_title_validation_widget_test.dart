import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void main() {
  for (final size in [const Size(800, 600), const Size(400, 320)]) {
    testWidgets('Blank titles can be corrected and resubmitted at $size', (
      WidgetTester tester,
    ) async {
      await tester.binding.setSurfaceSize(size);
      addTearDown(() => tester.binding.setSurfaceSize(null));
      await tester.pumpWidget(const CadenceApp());
      final input = find.byType(ShadInput);
      final addButton = find.widgetWithText(ShadButton, '添加任务');

      expect(find.text('请输入任务标题'), findsNothing);
      for (final blank in ['', '   ', '\t \n', '\u3000']) {
        await tester.enterText(input, blank);
        // Single-line fields strip newlines before the submit callback runs.
        final enteredText = tester.widget<ShadInput>(input).controller!.text;
        await tester.tap(addButton);
        await tester.pumpAndSettle();
        expect(find.text('请输入任务标题'), findsOneWidget);
        // Error text is informational, not an interactive hit target.
        final errorBounds = tester.getRect(find.text('请输入任务标题'));
        expect(errorBounds.width, greaterThan(0));
        expect(errorBounds.height, greaterThan(0));
        expect(errorBounds.top, greaterThanOrEqualTo(0));
        expect(errorBounds.bottom, lessThanOrEqualTo(size.height));
        expect(errorBounds.left, greaterThanOrEqualTo(0));
        expect(errorBounds.right, lessThanOrEqualTo(size.width));
        expect(tester.widget<ShadInput>(input).controller!.text, enteredText);
        expect(
          tester
              .widget<ListView>(find.byType(ListView))
              .childrenDelegate
              .estimatedChildCount,
          2,
        );
        expect(tester.takeException(), isNull);
      }

      await tester.enterText(input, '  复习  Dart  ');
      await tester.tap(addButton);
      await tester.pumpAndSettle();
      expect(find.text('请输入任务标题'), findsNothing);
      expect(tester.widget<ShadInput>(input).controller!.text, isEmpty);
      expect(
        tester
            .widget<ListView>(find.byType(ListView))
            .childrenDelegate
            .estimatedChildCount,
        3,
      );

      final newRow = find.byWidgetPredicate(
        (widget) => widget is TaskRow && widget.task.title == '复习  Dart',
      );
      await tester.scrollUntilVisible(
        newRow,
        40,
        scrollable: find.descendant(
          of: find.byType(ListView),
          matching: find.byType(Scrollable),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('复习  Dart').hitTestable(), findsOneWidget);
      final task = tester.widget<TaskRow>(newRow).task;
      expect(task.id, 'local-1');
      expect(task.isCompleted, isFalse);
      expect(tester.takeException(), isNull);
    });
  }
}
