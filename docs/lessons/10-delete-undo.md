# 第十节：删除与单次撤销

更新：2026-11-11。学习者实现删除与撤销最近一次删除；格式、静态分析及全部 26 项测试通过。实际窗口删除／撤销尚待学习者确认。后续仓库整理将删除回调简化为一层 setState；新增功能仍由学习者完成。

## 已实现行为

TaskRow 接收必填 VoidCallback onDelete。ListTile.trailing 放置 IconButton，以 Icons.delete_outline 显示删除图标，tooltip 为“删除任务”，onPressed 调用父页面回调。点击删除不会同时切换完成状态。

第一小步使用 removeWhere 按 ID 删除，区分同名任务。撤销小步改为 indexWhere 查找 ID，找不到时返回 -1；removeAt 删除并返回原对象，同时记录下标。State 保存 PlannerTask? lastDeletedTask 和 lastDeletedIndex。

undoDelete 将可空字段复制到 final 局部变量，经 null 检查和提前返回后，Dart 将其类型提升为非空任务。在 setState 中 insert 到原位置，再清空删除记录。恢复保留原对象、ID、标题和完成状态，不消耗新任务编号。

撤销按钮的 onPressed 在没有记录时为 null，呈禁用状态。只支持最近一次删除：连续删除 A、B 后只能恢复 B；恢复后按钮再次禁用。期间新增任务追加到末尾，不使已记录的恢复位置越界。此结论依赖当前没有排序、批量删除或多级撤销。

## 验收

- `dart format --output=none --set-exit-if-changed lib test`：12 个文件无需调整。
- `flutter analyze --no-pub --fatal-infos --fatal-warnings`：通过。
- `flutter test --no-pub`：全部 26 项通过。
- [回调测试](../../test/task_list_widget_test.dart)：完成和删除回调互不串用。
- [删除测试](../../test/task_delete_widget_test.dart)：两种窗口删空、重新添加、同名任务区分，剩余任务可切换。
- [撤销测试](../../test/task_undo_delete_widget_test.dart)：两种窗口连续删除后只恢复最近一条、不能重复恢复；首尾任务恢复原位置与原对象，期间新增及计数重建不破坏撤销，不消耗新 ID。

## 仓库整理与实际确认

初版删除回调曾嵌套 setState。2026-11-11 仓库整理后，查找和 -1 检查位于 setState 外，只有保存删除记录与移除元素在一层 setState 内完成；保持业务行为不变。外层 return 明确结束 onDelete。

实际运行需确认删除、恢复原位置与完成状态、连续删除只恢复最后一条以及撤销按钮禁用。数据与删除记录都只在内存中，重启不保存。确认后进入第十一节桌面 UI 阶段，仍由学习者编写功能代码。
