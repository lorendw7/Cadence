# 第一节：描述一个待办

目标：用 Dart 表示“提交作业”这件事。预计学习与练习 20–40 分钟，不安装新包，不修改界面。功能由你写。

## 三个概念

**类（class）**是一份描述格式。例如一个“待办”需要编号、标题、是否完成。**对象**是按这份格式创建的一条具体待办。

**字段**是对象保存的信息。`String` 保存文字，`bool` 保存 `true`（是）或 `false`（否）。`final` 表示字段赋值后不能直接换成另一个值；之后会学习通过创建新对象来改变任务状态。

**构造函数**负责创建对象并填写字段。Dart 支持写出参数名字来传值；`required` 表示调用时必须提供该参数。

先看一个与作业答案不同的例子：

```dart
class Book {
  final String name;

  Book({required this.name});
}

// Book 是格式；book 是一本文字为“Dart 入门”的具体书。
final book = Book(name: 'Dart 入门');
```

`this.name` 的意思是把传入的 `name` 存到当前对象的同名字段。花括号 `{}` 让参数带名字；可选参数可以写默认值，例如 `this.isBorrowed = false`（需要先定义对应字段）。

## 你的任务

在 `lib/domain/coursework/planner_task.dart` 新建文件，定义 `PlannerTask`。目录不存在时一并新建。

| 字段 | 类型 | 要求 |
|------|------|------|
| `id` | `String` | 必填；代表稳定编号，不是列表序号 |
| `title` | `String` | 必填；原样保留中日英文标题 |
| `isCompleted` | `bool` | 可不填，默认 `false`；也允许显式传入 `true` |

三个字段都用 `final`。这一节不处理空标题、数据库、截止日期或完成时间，也不用导入 Flutter。

写好以后，下面的调用应该成立（它是使用方式，不是类的实现）：

```dart
final task = PlannerTask(id: 'task-1', title: '提交作业');
// task.title 应为“提交作业”，task.isCompleted 应为 false。
```

## 怎么验收

助手已经写好 [待启用测试](../../lessons/01_task/planner_task_test.dart.txt)，会检查编号/标题、默认未完成和显式完成三项。你写完后回复“第一节写好了”，助手启用并运行测试，解释每个失败；暂不进入下一节。

这是数据模型小练习。即使通过，也不代表应用已经支持新增待办或保存数据。
