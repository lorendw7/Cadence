# 第四节：状态、按钮与界面重建

更新：2026-11-10。状态：学习者实现完成，自动验收通过；学习者已在实际运行中确认热重载为 3、热重启与完全重启均为 0。下一节学习提取任务行组件。

## 本节完成的内容

学习者将 `TodayPage` 转为 `StatefulWidget`，在 `_TodayPageState` 的 `build` 外声明 `int practiceCount = 0;`。页面通过字符串插值显示练习次数，“加1”按钮增加计数，“归零”按钮将计数设为零。两种修改都在 `setState` 回调内完成。

`TodayPage` 是不可变的页面配置，`_TodayPageState` 保存页面运行中的可变状态。`createState` 创建状态对象；`build` 根据当前数据描述界面。`setState` 执行状态修改并安排界面重建，不负责保存到磁盘。

状态字段在同一 State 对象存活期间保留。若将计数初始化放进 `build`，每次执行方法都会创建新的局部值，不适合保留这次练习的修改。当前 `tasks` 仍是 `build` 内重新创建的只读演示列表；本节没有实现任务完成/撤销或持久化。

## 按钮的区别

| 组件 | 外观与用途 |
|------|------------|
| ElevatedButton | 有背景与抬升效果，本节用于“加1” |
| TextButton | 普通状态主要显示文字，视觉强调较弱，本节用于“归零” |
| FilledButton | 明显填充背景，通常用于保存、确认等重要操作 |
| OutlinedButton | 有边框，适合需要明确可见的次要操作 |

按钮外观不决定业务操作，`onPressed` 中的回调决定点击行为。`child` 描述按钮内的文字或图标。当前学习阶段仍使用 Material；产品选定的 shadcn_ui 尚未引入。

## 热重载与重启实验

在项目根目录运行 `flutter run -d windows`。以下按键输入到运行 Flutter 的终端，而不是应用窗口。

| 操作 | 学习者执行与实际结果 | 原因 |
|------|--------------------|------|
| 小写 r：热重载 | 计数到 3，修改按钮文字并保存；热重载后仍为 3 | 更新代码并重建界面，保留现有状态 |
| 大写 R：热重启 | 重启后为 0 | Dart 应用状态重新初始化 |
| q 退出后再次运行 | 完全重启后为 0 | 重新启动整个应用，创建新的状态对象 |

热重载不会重新运行 `main` 或已有状态的 `initState`。热重载/热重启属于开发调试能力；原生代码等变更可能需要完全重启。用户已确认本节三种结果，不把这些手动观察冒充自动测试。

## 自动验收

[计数交互测试](../../test/practice_counter_widget_test.dart) 检查：初始为 0，连续三次点击为 1/2/3，归零后为 0，再次点击为 1；两条原有任务及其状态不变，操作后没有 Flutter 异常。

本次执行结果：

- `dart format --output=none --set-exit-if-changed lib test`：通过，未改变文件。
- `flutter analyze --no-pub --fatal-infos --fatal-warnings`：通过。
- `flutter test --no-pub`：全部 10 项通过，包含已有模型与列表回归测试。

功能代码由学习者完成；助手只审阅、补充验收测试和文档。本节证明内存状态能驱动界面更新，不代表任务交互、数据库、离线恢复或多端同步已经实现。

## 下一节

第五节目标：将任务行提取为接收数据与回调的组件，理解父页面与子组件分工。按一个小步骤推进，先检查现有 `ListTile`，不提前实现整套任务编辑或同步。

参考：[Flutter StatefulWidget](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html)、[热重载](https://docs.flutter.dev/tools/hot-reload)、[ElevatedButton](https://api.flutter.dev/flutter/material/ElevatedButton-class.html)、[TextButton](https://api.flutter.dev/flutter/material/TextButton-class.html)、[FilledButton](https://api.flutter.dev/flutter/material/FilledButton-class.html)、[OutlinedButton](https://api.flutter.dev/flutter/material/OutlinedButton-class.html)。
