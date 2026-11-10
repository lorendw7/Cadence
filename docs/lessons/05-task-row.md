# 第五节：任务行组件与回调

更新：2026-11-10。状态：学习者完成实现与格式化，格式检查、静态分析和全部 11 项测试通过。实际窗口点击日志尚待学习者确认；自动测试不代替手动观察。

后续进度：第六节已将日志回调改为状态切换，并通过实际窗口验收。本文保留第五节历史实现与测试数量；当前行为见[第六节](06-task-toggle.md)，不再要求运行旧版日志实验。

## 本节目标与实现

将原来的 ListTile 提取到 `lib/main.dart` 中的 TaskRow。父页面从演示列表取出任务，通过 `task` 参数传给子组件；TaskRow 根据任务标题与完成状态显示一行。父页面同时通过 `onToggle` 参数传入匿名函数，TaskRow 把函数交给 ListTile 的 `onTap`。

点击时，父页面的回调执行 `debugPrint('点击了任务: ${task.title}')`。当前名称 onToggle 表示后续用途，本节只打印标题，不修改完成状态。tasks 仍是父页面 build 中创建的局部演示列表，尚未成为持久的页面状态。

## 本节语法与概念

学习者有其他语言基础，Dart 与 Flutter 从零开始。教学已解释以下内容：

- `class TaskRow extends StatelessWidget`：定义继承 Flutter 无状态组件的类；它根据外部输入构建界面，自身不保存可变状态。
- `final PlannerTask task`：只能赋值一次的实例字段。
- `required this.task`：必填命名参数，并将传入值保存到实例字段；`super.key` 将 key 传给父类构造函数。
- `const` 构造函数允许在满足常量条件时创建常量对象；普通调用不要求加 const。
- `@override`：声明覆盖父类方法；`Widget build(BuildContext context)` 返回描述界面的组件。
- `VoidCallback` 等价于 `void Function()`，表示无参数、无返回值的函数类型。
- `() { ... }` 是匿名函数；本节回调通过闭包访问对应的 task，`${task.title}` 是字符串插值。
- `onTap: onToggle` 传递函数引用，点击后才调用；`onToggle()` 则立即执行函数。

父组件传数据给子组件，子组件在点击时调用父组件提供的函数。组件拆分后，两条任务的标题、完成状态和练习计数行为保持一致。

## 验收

[列表与回调测试](../../test/task_list_widget_test.dart) 保留两种窗口尺寸下的任务展示检查，并增加 TaskRow 独立测试：初次构建回调次数为 0，点击一次后为 1。[计数测试](../../test/practice_counter_widget_test.dart) 继续覆盖加一、归零和任务行不变。

- `dart format --output=none --set-exit-if-changed lib test`：通过。
- `flutter analyze --no-pub --fatal-infos --fatal-warnings`：通过。
- `flutter test --no-pub`：全部 11 项通过。

功能代码由学习者编写，助手补充回调测试与文档。学习者已练习 `dart format lib/main.dart` 并完成格式化。

实际运行时，在项目根目录执行 `flutter run -d windows`，分别点击两条任务，在终端确认对应标题；此时完成状态应保持不变。该手动结果尚未确认。

## 下一节

第六节学习将任务列表放入 State，在回调中使用 copyWith 替换任务，再用 setState 更新界面，实现完成与撤销；仍不保存到磁盘。按一个小步骤推进，由学习者实现。
