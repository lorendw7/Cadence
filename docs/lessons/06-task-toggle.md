# 第六节：任务完成与撤销

更新：2026-11-10。状态：学习者实现完成，格式、静态分析及全部 13 项测试通过。学习者确认实际窗口中任务状态能立即切换，点击计数按钮后保持不变。

## 实现与数据流

在 `lib/main.dart` 中，将 tasks 从 build 局部变量移到 _TodayPageState 的实例字段。TaskRow 仍接收 task 和 onToggle；父页面提供的回调在 setState 内用 copyWith 创建完成状态相反的任务，并替换 tasks[index]。本节使用点击任务行触发切换，未增加复选框。

点击任务行 → 调用父页面回调 → 创建新任务并替换列表元素 → setState 安排重建 → TaskRow 接收新任务并显示最新状态。

## 先解释再实现的知识

- 实例字段在同一 State 对象存活期间保留；build 内的局部初始化会在每次执行 build 时重新创建初始列表。
- final 限制变量重新赋值，不阻止可变列表替换元素。tasks[index] = 新任务合法；tasks = 新列表不合法。
- PlannerTask 的字段是 final，因此通过 copyWith 创建新对象，而不是修改旧对象的 isCompleted。
- 前缀 ! 表示布尔取反，让 true 与 false 互换。
- setState 立即执行回调中的修改，并安排界面重建；普通列表赋值本身不会通知 Flutter 更新界面。
- 匿名函数可以通过闭包访问所在 itemBuilder 调用的 task 和 index。当前没有增删、排序，使用下标定位；后续复杂操作再学习按 ID 定位。

## 调试记录

学习者首次实现遗漏 setState。新增交互测试报告：点击第一条后找不到该行的“已完成”，当时 12 项通过、1 项失败。计数按钮后的状态保留测试通过，因为计数按钮触发了重建，让之前已修改的数据得到显示。

助手解释失败原因，学习者亲自补上 setState 并格式化。复验后全部 13 项通过；未修改或降低测试断言来迁就错误实现。

## 验收证据

[任务切换测试](../../test/task_toggle_widget_test.dart) 验证两条任务各自完成／撤销、另一条不受影响，以及计数加一和归零后修改仍保留。已有模型、列表、回调和计数测试继续通过。

- `dart format --output=none --set-exit-if-changed lib test`：通过，8 个文件无需调整。
- `flutter analyze --no-pub --fatal-infos --fatal-warnings`：通过。
- `flutter test --no-pub`：全部 13 项通过。
- 学习者实际运行确认：任务状态立即切换，点击计数按钮后也保持不变。

本节的实际交互同时确认了父子组件回调通道可用，但不追认第五节旧版 debugPrint 日志曾被手动检查。第六节已用状态更新替代日志输出。数据仍只在内存中；本次没有新增持久化，也没有声称已做第六节重启实验。

## 下一节

第七节读取任务标题：先解释 TextField、TextEditingController、text 属性及 dispose 生命周期，再由学习者实现输入与读取。第八节再接入添加任务，后续单独学习标题校验。
