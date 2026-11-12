import 'package:flutter/material.dart';
import 'package:cadence/domain/coursework/planner_task.dart';
import 'package:shadcn_ui/shadcn_ui.dart';

const Color cadenceWine = Color(0xFF7C394B);
const Color cadenceWineWash = Color(0xFFF5EEF0);
const Color cadencePaper = Color(0xFFFFFFFF);
const Color cadenceSurface = Color(0xFFFAFAFA);
const Color cadenceInk = Color(0xFF2F3033);
const Color cadenceMuted = Color(0xFF6B6B70);
const Color cadenceRule = Color(0xFFE8E8EB);
const Color cadenceInputBoundary = Color(0xFF87838A);
const cadenceFontFallback = [
  'Microsoft YaHei',
  'PingFang SC',
  'Hiragino Sans',
  'Noto Sans CJK SC',
  'Noto Sans CJK JP',
];

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
        textTheme: ShadTextTheme(
          family: 'Segoe UI',
        ).apply(fontFamilyFallback: cadenceFontFallback),
        colorScheme: const ShadZincColorScheme.light(
          background: cadencePaper,
          foreground: cadenceInk,
          primary: cadenceWine,
          primaryForeground: cadencePaper,
          secondary: cadenceSurface,
          secondaryForeground: cadenceInk,
          muted: cadenceSurface,
          mutedForeground: cadenceMuted,
          accent: cadenceWineWash,
          accentForeground: cadenceInk,
          border: cadenceRule,
          input: cadenceInputBoundary,
          ring: cadenceWine,
        ),
      ),
      appBuilder: (context) {
        return MaterialApp(
          title: 'Cadence',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            fontFamily: 'Segoe UI',
            fontFamilyFallback: cadenceFontFallback,
            colorScheme: ColorScheme.fromSeed(seedColor: cadenceWine).copyWith(
              primary: cadenceWine,
              onPrimary: cadencePaper,
              surface: cadencePaper,
              onSurface: cadenceInk,
              onSurfaceVariant: cadenceMuted,
              outline: cadenceInputBoundary,
              outlineVariant: cadenceRule,
              surfaceTint: Colors.transparent,
            ),
            scaffoldBackgroundColor: cadencePaper,
            dividerTheme: const DividerThemeData(
              color: cadenceRule,
              thickness: 1,
              space: 1,
            ),
            appBarTheme: const AppBarTheme(
              backgroundColor: cadencePaper,
              foregroundColor: cadenceInk,
              surfaceTintColor: Colors.transparent,
              elevation: 0,
              scrolledUnderElevation: 0,
              titleSpacing: 24,
              titleTextStyle: TextStyle(
                color: cadenceInk,
                fontSize: 20,
                fontWeight: FontWeight.w600,
                fontFamily: 'Segoe UI',
                letterSpacing: -0.5,
              ),
            ),
          ),
          localizationsDelegates: const [GlobalShadLocalizations.delegate],
          builder: (context, child) {
            return ShadAppBuilder(child: child!);
          },
          home: const TasksPage(),
        );
      },
    );
  }
}

class TasksPage extends StatefulWidget {
  const TasksPage({super.key});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
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
    final taskHeader = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '任务',
          style: theme.textTheme.h2.copyWith(
            color: cadenceInk,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 24),
        LayoutBuilder(
          builder: (context, constraints) {
            final titleInput = Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ShadInput(
                  controller: titleController,
                  placeholder: const Text('任务标题'),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 14,
                  ),
                ),
                if (titleError != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Text(
                      titleError!,
                      style: TextStyle(color: theme.colorScheme.destructive),
                    ),
                  ),
              ],
            );

            final addButton = ShadButton(
              height: 0,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
              onPressed: addTask,
              child: const Text('添加任务', style: TextStyle(height: 1.5)),
            );

            if (constraints.maxWidth < 360) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [titleInput, const SizedBox(height: 12), addButton],
              );
            }

            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: titleInput),
                const SizedBox(width: 12),
                addButton,
              ],
            );
          },
        ),
        const SizedBox(height: 24),
        const Divider(),
      ],
    );

    final taskFooter = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        const SizedBox(height: 24),
        ShadButton.ghost(
          height: 0,
          foregroundColor: cadenceWine,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          onPressed: lastDeletedTask == null ? null : undoDelete,
          child: const Text('撤销删除'),
        ),
        const SizedBox(height: 32),
      ],
    );

    final taskContent = CustomScrollView(
      slivers: [
        SliverToBoxAdapter(child: taskHeader),
        if (tasks.isEmpty)
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 48),
              child: Text('暂无任务，添加一条吧'),
            ),
          )
        else
          SliverList.builder(
            itemCount: tasks.length,
            itemBuilder: (context, index) {
              final task = tasks[index];
              return TaskRow(
                task: task,
                onCompletionChanged: (bool isCompleted) {
                  setState(() {
                    tasks[index] = task.copyWith(isCompleted: isCompleted);
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
        SliverToBoxAdapter(child: taskFooter),
      ],
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Cadence'),
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(),
        ),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Row(
            children: [
              if (constraints.maxWidth >= 640)
                Container(
                  width: 184,
                  height: double.infinity,
                  decoration: const BoxDecoration(
                    color: cadencePaper,
                    border: Border(right: BorderSide(color: cadenceRule)),
                  ),
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 32,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Text('工作区', style: theme.textTheme.muted),
                        const SizedBox(height: 12),
                        Material(
                          color: Colors.transparent,
                          child: ListTile(
                            contentPadding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 4,
                            ),
                            minLeadingWidth: 20,
                            horizontalTitleGap: 12,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(6),
                            ),
                            leading: const Icon(Icons.task_alt, size: 20),
                            title: const Text('任务'),
                            selected: true,
                            selectedTileColor: cadenceWineWash,
                            selectedColor: theme.colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              Expanded(
                child: Align(
                  alignment: Alignment.topCenter,
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 840),
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(
                        constraints.maxWidth >= 720 ? 32 : 16,
                        constraints.maxWidth >= 720 ? 32 : 24,
                        constraints.maxWidth >= 720 ? 32 : 16,
                        0,
                      ),
                      child: taskContent,
                    ),
                  ),
                ),
              ),
            ],
          );
        },
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
    return DecoratedBox(
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: cadenceRule)),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 0, vertical: 12),
        minLeadingWidth: 24,
        horizontalTitleGap: 16,
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
            foregroundColor: cadenceMuted,
            icon: const Icon(Icons.delete_outline, size: 20),
          ),
        ),
      ),
    );
  }
}
