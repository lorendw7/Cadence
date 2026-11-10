# 第三节：把待办显示成列表

更新：2026-11-10。状态：待你实现，测试仍为模板。目标是在现有“今天”页面显示两条待办；预计 20–45 分钟。你写界面代码，助手负责测试和审阅。

前两节已经有了 `PlannerTask` 和 `copyWith`。这一节只把对象中的数据画出来，不修改完成状态，也不添加输入框、数据库或新依赖。

## 先理解列表

`List<PlannerTask>` 表示“里面放的是 PlannerTask 对象的列表”。和 Java 的泛型列表类似，尖括号说明元素类型。

先看一个文字列表：

```dart
final colors = <String>['红色', '蓝色'];

print(colors.length); // 2：元素数量。
print(colors[0]); // 红色：下标从 0 开始。
print(colors[1]); // 蓝色。
```

`final` 表示不能把 `colors` 变量重新指向另一个列表，并不自动禁止修改列表内容。本节不修改列表，也不把列表下标当作任务 ID。

## 你的第一步：准备两条任务

修改 [lib/main.dart](../../lib/main.dart)，先导入已有模型：

```dart
import 'package:cadence/domain/coursework/planner_task.dart';
```

找到 **TodayPage** 的 `build` 方法。在它的 `return Scaffold(...)` 前，自己创建名为 `tasks` 的 `List<PlannerTask>`，包含下列对象：

| id | title | isCompleted |
|----|-------|-------------|
| `demo-1` | `提交课程报告` | `false` |
| `demo-2` | `复习线性代数` | `true` |

列表字面量用方括号 `[]`，对象的构造函数调用放在里面，以逗号分隔。第一条可以沿用模型默认的未完成状态。

这里的列表是临时的只读演示数据：每次 `build` 执行都会重新创建。它适合这一节的显示练习，**不是以后保存用户修改的方式**。保留 `const TodayPage({super.key})`；无需新增字段或改成有状态组件。

## 从一个元素画出一行

`ListView.builder` 根据需要创建列表中的行：

- `itemCount` 告诉它共有多少行。
- `itemBuilder` 是传给它的函数；Flutter 在需要某一行时调用这个函数。
- 函数的 `index` 是这一行的下标，可以用来取对应元素；`context` 是 Flutter 提供的界面上下文，本节不需要额外操作它。
- 函数必须 `return` 一个 Widget，表示这一行长什么样。

继续用颜色作为例子，下面是一个列表控件片段，不是整个页面：

```dart
ListView.builder(
  itemCount: colors.length,
  itemBuilder: (context, index) {
    return Text(colors[index]);
  },
)
```

你的任务行使用 `ListTile`。它的 `title` 是主要文字，`subtitle` 是下面一行说明，例如：

```dart
ListTile(
  title: Text('Dart 入门'),
  subtitle: Text('借阅中'),
)
```

把示例中的固定文字换成当前任务的数据：主标题显示 `title`，副标题在 `isCompleted` 为 `true` 时显示 **已完成**，否则显示 **未完成**。

可以用条件表达式选择文字。另一个例子是 `isOpen ? '营业中' : '已打烊'`：问号前为 `true` 时取第一个值，否则取冒号后的值。

## 放回“今天”页面

保留 `AppBar` 中的 **Cadence**，并让页面仍有一个可见的 **今天** 标题。只替换原来的占位 `body`：

1. 用 `Column` 上下排列标题和列表。
2. 第一项是显示“今天”的 `Text`。
3. 第二项用 `Expanded` 包住 `ListView.builder`，让列表使用剩余高度。
4. `itemCount` 来自任务列表长度；在 `itemBuilder` 中取出当前任务，返回对应的 `ListTile`。

`Column` 内的滚动列表需要明确的高度范围，`Expanded` 在这里负责把页面剩余高度交给它。不要直接把无高度限制的 `ListView` 放入 `Column`。

原来的 `body: const Center(...)` 是固定内容；新的列表会读取局部变量，不能把整个新 `body` 标为 `const`。固定的“今天”文字仍可单独使用 `const Text(...)`。

这一节的中文标题和示例任务用于学习，产品的日英中三语支持会在后续实现；现在不增加语言系统。

## 怎么验收

运行后应看到：

- 顶部标题 **Cadence**，页面标题 **今天**。
- 两条任务：**提交课程报告 / 未完成**、**复习线性代数 / 已完成**。
- 没有布局异常；任务当前只可查看，点击不需要改变状态。

后续界面测试应检查两条 `ListTile` 各自的标题和完成状态、总行数及启动时没有异常。本次只写明验收要求，不发布测试实现或模板。

你写完后回复“第三节写好了”。助手审阅实现，再准备并启用 `test/task_list_widget_test.dart`，运行格式、静态检查与测试。现有启动测试继续保留；届时将把测试名称中的 “placeholder” 改为符合新界面的描述，保留它对应用标题、“今天”和异常的检查。

第三节尚未实现或通过测试。本节完成也只代表界面能显示演示数据；添加、完成与撤销、保存和恢复属于后续小节。
