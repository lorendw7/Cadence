import 'package:cadence/main.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('App opens the Today placeholder', (WidgetTester tester) async {
    await tester.pumpWidget(const CadenceApp());

    expect(find.text('Cadence'), findsOneWidget);
    expect(find.text('今天'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
