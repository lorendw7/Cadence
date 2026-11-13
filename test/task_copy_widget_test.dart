import 'dart:async';

import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

void main() {
  for (final fails in [false, true]) {
    testWidgets('Copy awaits the platform and preserves data (fails: $fails)', (
      tester,
    ) async {
      final completion = Completer<void>();
      final calls = <MethodCall>[];
      final messenger =
          TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
      messenger.setMockMethodCallHandler(SystemChannels.platform, (call) async {
        if (call.method == 'Clipboard.setData') {
          calls.add(call);
          await completion.future;
          if (fails) {
            throw PlatformException(code: 'clipboard_unavailable');
          }
        }
        return null;
      });
      addTearDown(() {
        messenger.setMockMethodCallHandler(SystemChannels.platform, null);
      });

      await tester.pumpWidget(const CadenceApp());
      await tester.enterText(find.byType(ShadInput), 'Keep this draft');
      final before = tester
          .widgetList<TaskRow>(find.byType(TaskRow))
          .map((row) => row.task)
          .toList();
      final selected = fails ? before.last : before.first;
      final row = find.byWidgetPredicate(
        (widget) => widget is TaskRow && widget.task.id == selected.id,
      );
      await tester.tap(
        find.descendant(of: row, matching: find.byTooltip('复制任务标题')),
      );
      await tester.pump();

      expect(calls, hasLength(1));
      expect(calls.single.arguments, {'text': selected.title});
      expect(find.byType(SnackBar), findsNothing);

      completion.complete();
      await tester.pumpAndSettle();
      expect(find.byType(SnackBar), findsOneWidget);
      expect(
        find.descendant(
          of: find.byType(SnackBar),
          matching: find.text(fails ? '复制失败，请重试' : '已复制任务标题'),
        ),
        findsOneWidget,
      );
      expect(find.text(fails ? '已复制任务标题' : '复制失败，请重试'), findsNothing);
      expect(calls, hasLength(1));
      expect(
        tester.widgetList<TaskRow>(find.byType(TaskRow)).map((row) => row.task),
        orderedEquals(before),
      );
      expect(find.text('Keep this draft'), findsOneWidget);
      final undo = tester.widget<ShadButton>(
        find.widgetWithText(ShadButton, '撤销删除'),
      );
      expect(undo.onPressed, isNull);
      expect(tester.takeException(), isNull);
    });

    for (final removePage in [false, true]) {
      testWidgets(
        'Late copy respects list lifetime (fails: $fails, remove page: $removePage)',
        (tester) async {
          final completion = Completer<void>();
          var copyCalls = 0;
          final messenger =
              TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
          messenger.setMockMethodCallHandler(SystemChannels.platform, (
            call,
          ) async {
            if (call.method == 'Clipboard.setData') {
              copyCalls += 1;
              await completion.future;
              if (fails) {
                throw PlatformException(code: 'clipboard_unavailable');
              }
            }
            return null;
          });
          addTearDown(() {
            messenger.setMockMethodCallHandler(SystemChannels.platform, null);
          });

          await tester.pumpWidget(const CadenceApp());
          final listContext = tester.element(find.byType(SliverList));
          final lastRow = find.byType(TaskRow).last;
          await tester.tap(
            find.descendant(of: lastRow, matching: find.byTooltip('复制任务标题')),
          );
          await tester.pump();
          expect(copyCalls, 1);
          expect(find.byType(SnackBar), findsNothing);

          if (removePage) {
            await tester.pumpWidget(
              const MaterialApp(home: Scaffold(body: Text('Replacement page'))),
            );
          } else {
            // The builder receives the list element's context, not the row's.
            // Removing one task does not cancel copying its captured title.
            await tester.tap(
              find.descendant(of: lastRow, matching: find.byTooltip('删除任务')),
            );
          }
          await tester.pumpAndSettle();
          if (removePage) {
            expect(find.byType(TasksPage), findsNothing);
            expect(listContext.mounted, isFalse);
          } else {
            expect(find.byType(TasksPage), findsOneWidget);
            expect(find.byType(TaskRow), findsOneWidget);
            expect(listContext.mounted, isTrue);
          }

          completion.complete();
          await tester.pumpAndSettle();
          if (removePage) {
            expect(find.byType(SnackBar), findsNothing);
          } else {
            expect(find.byType(SnackBar), findsOneWidget);
            expect(find.text(fails ? '复制失败，请重试' : '已复制任务标题'), findsOneWidget);
            expect(find.byType(TaskRow), findsOneWidget);
          }
          expect(copyCalls, 1);
          expect(tester.takeException(), isNull);
        },
      );
    }
  }
}
