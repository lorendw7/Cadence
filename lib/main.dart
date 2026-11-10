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

class TodayPage extends StatefulWidget {
  const TodayPage({super.key});

  @override
  State<TodayPage> createState() => _TodayPageState();
}

class _TodayPageState extends State<TodayPage> {
  int practiceCount = 0;

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
          Text('练习次数：$practiceCount'),
          TextButton(
            onPressed: () {
              setState(() {
                practiceCount = 0;
              });
            },
            child: Text("归零"),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                practiceCount += 1;
              });
            },
            child: const Text("加1"),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) {
                final task = tasks[index];
                return TaskRow(
                  task: task,
                  onToggle: () {
                    debugPrint('点击了任务: ${task.title}');
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class TaskRow extends StatelessWidget {
  const TaskRow({super.key, required this.task, required this.onToggle});

  final PlannerTask task;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(task.title),
      subtitle: Text(task.isCompleted ? "已完成" : "未完成"),
      onTap: onToggle,
    );
  }
}
