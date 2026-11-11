import 'package:flutter/material.dart';
import 'package:cadence/domain/coursework/planner_task.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

const Color cadenceWine = Color(0xFF7C394B);
const Color cadencePaper = Color(0xFFF6F5F1);

void main() {
  runApp(const CadenceApp());
}

class CadenceApp extends StatelessWidget {
  const CadenceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ShadApp.custom(
      theme: ShadThemeData(
        brightness: Brightness.light,
        colorScheme: const ShadZincColorScheme.light(
          background: cadencePaper,
          primary: cadenceWine,
          ring: cadenceWine,
        ),
      ),
      appBuilder: (context) {
        return MaterialApp(
          title: 'Cadence',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(seedColor: cadenceWine),
            scaffoldBackgroundColor: cadencePaper,
          ),
          localizationsDelegates: const [GlobalShadLocalizations.delegate],
          builder: (context, child) {
            return ShadAppBuilder(child: child!);
          },
          home: const TodayPage(),
        );
      },
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

  void addTask() {
    final title = titleController.text.trim();

    if (title.isEmpty) {
      setState(() {
        titleError = '请输入任务标题';
      });
      return;
    }

    final newTask = PlannerTask(id: 'local-$nextTaskNumber', title: title);

    setState(() {
      tasks.add(newTask);
      nextTaskNumber += 1;
      titleError = null;
    });

    titleController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final theme = ShadTheme.of(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Cadence')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 24, 16, 8),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text('今天', style: theme.textTheme.h2),
            ),
          ),
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
              ShadButton(
                onPressed: () {
                  setState(() {
                    practiceCount += 1;
                  });
                },
                child: const Text("加1"),
              ),
              ShadButton.outline(
                onPressed: lastDeletedTask == null ? null : undoDelete,
                child: const Text('撤销删除'),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final titleInput = Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ShadInput(
                      controller: titleController,
                      placeholder: const Text('任务标题'),
                    ),
                    if (titleError != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 4),
                        child: Text(
                          titleError!,
                          style: TextStyle(
                            color: theme.colorScheme.destructive,
                          ),
                        ),
                      ),
                  ],
                );

                final addButton = ShadButton(
                  onPressed: addTask,
                  child: const Text('添加任务'),
                );

                if (constraints.maxWidth < 360) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      titleInput,
                      const SizedBox(height: 8),
                      addButton,
                    ],
                  );
                }

                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: titleInput),
                    const SizedBox(width: 8),
                    addButton,
                  ],
                );
              },
            ),
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
                        onCompletionChanged: (bool isCompleted) {
                          setState(() {
                            tasks[index] = task.copyWith(
                              isCompleted: isCompleted,
                            );
                          });
                        },
                        onDelete: () {
                          final deletedIndex = tasks.indexWhere(
                            (item) => item.id == task.id,
                          );

                          if (deletedIndex == -1) {
                            return;
                          }

                          setState(() {
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
    required this.onCompletionChanged,
    required this.onDelete,
  });

  final PlannerTask task;
  final ValueChanged<bool> onCompletionChanged;
  final VoidCallback onDelete;

  @override
  Widget build(BuildContext context) {
    final theme = ShadTheme.of(context);
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      leading: ShadCheckbox(
        value: task.isCompleted,
        onChanged: onCompletionChanged,
      ),
      title: Text(
        task.title,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
        style: task.isCompleted
            ? theme.textTheme.muted.copyWith(
                decoration: TextDecoration.lineThrough,
              )
            : theme.textTheme.p,
      ),
      subtitle: Text(
        task.isCompleted ? '已完成' : '未完成',
        style: theme.textTheme.muted,
      ),
      trailing: Tooltip(
        message: '删除任务',
        child: ShadIconButton.ghost(
          onPressed: onDelete,
          foregroundColor: theme.colorScheme.destructive,
          icon: const Icon(Icons.delete_outline),
        ),
      ),
    );
  }
}
