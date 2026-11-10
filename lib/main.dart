import 'package:flutter/material.dart';
import 'package:cadence/domain/coursework/planner_task.dart';

void main() {
  runApp(const CadenceApp());
}

class CadenceApp extends StatelessWidget {
  const CadenceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cadence',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.red),
      ),
      home: const TodayPage(),
    );
  }
}

class TodayPage extends StatelessWidget {
  const TodayPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tasks = <PlannerTask>[
      PlannerTask(id: 'demo-1', title: '提交课程报告', isCompleted: false),
      PlannerTask(id: 'demo-2', title: '复习线性代数', isCompleted: true),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Cadence')),
      body: Column(
        children: [
          Text("今天"),
          Expanded(
            child: ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) {
                final task = tasks[index];
                return ListTile(
                  title: Text(task.title),
                  subtitle: task.isCompleted ? Text("已完成") : Text("未完成"),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
