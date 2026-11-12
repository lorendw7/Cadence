import 'package:cadence/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('App opens the Tasks page', (WidgetTester tester) async {
    await tester.pumpWidget(const CadenceApp());

    expect(find.text('Cadence'), findsOneWidget);
    final heading = find.byElementPredicate(
      (element) =>
          element.widget is Text &&
          (element.widget as Text).data == '任务' &&
          element.findAncestorWidgetOfExactType<ListTile>() == null,
    );
    expect(heading, findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
