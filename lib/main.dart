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
  int nextTaskNumber = 1;
  PlannerTask? lastDeletedTask;
  int lastDeletedIndex = 0;

  final titleController = TextEditingController();

  String? titleError;

  final tasks = <PlannerTask>[
    PlannerTask(id: 'demo-1', title: '提交课程报告', isCompleted: false),
    PlannerTask(id: 'demo-2', title: '复习线性代数', isCompleted: true),
  ];

  @override
  void dispose() {
    titleController.dispose();
    super.dispose();
  }

  void undoDelete() {
    final taskToRestore = lastDeletedTask;

    if (taskToRestore == null) {
      return;
    }

    setState(() {
      tasks.insert(lastDeletedIndex, taskToRestore);
      lastDeletedTask = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cadence')),
      body: Column(
        children: [
          Text("今天"),
          Text('练习次数：$practiceCount'),
          Row(
            children: [
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
              TextButton(
                onPressed: lastDeletedTask == null ? null : undoDelete,
                child: const Text('撤销删除'),
              ),
            ],
          ),
          TextField(
            controller: titleController,
            decoration: InputDecoration(
              labelText: '任务标题',
              errorText: titleError,
            ),
          ),
          TextButton(
            onPressed: () {
              final title = titleController.text.trim();
              if (title.isEmpty) {
                setState(() {
                  titleError = '请输入任务标题';
                });

                return;
              }

              final newTask = PlannerTask(
                id: 'local-$nextTaskNumber',
                title: title,
              );

              setState(() {
                tasks.add(newTask);
                nextTaskNumber += 1;
                titleError = null;
              });

              titleController.clear();
            },
            child: const Text('添加任务'),
          ),
          Expanded(
            child: tasks.isEmpty
                ? const Center(child: Text('暂无任务，添加一条吧'))
                : ListView.builder(
                    itemCount: tasks.length,
                    itemBuilder: (context, index) {
                      final task = tasks[index];
                      return TaskRow(
                        task: task,
                        onToggle: () {
                          setState(() {
                            tasks[index] = task.copyWith(
                              isCompleted: !task.isCompleted,
                            );
                          });
                        },
                        onDelete: () {
                          setState(() {
                            final deletedIndex = tasks.indexWhere(
                              (item) => item.id == task.id,
                            );

                            if (deletedIndex == -1) {
                              return;
                            }

                            lastDeletedIndex = deletedIndex;
                            lastDeletedTask = tasks.removeAt(deletedIndex);
                          });
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
  const TaskRow({
    super.key,
    required this.task,
    required this.onToggle,
    required this.onDelete,
  });

  final PlannerTask task;
  final VoidCallback onToggle;
  final VoidCallback onDelete;
  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(task.title),
      subtitle: Text(task.isCompleted ? "已完成" : "未完成"),
      onTap: onToggle,
      trailing: IconButton(
        onPressed: onDelete,
        icon: const Icon(Icons.delete_outline),
        tooltip: '删除任务',
      ),
    );
  }
}
