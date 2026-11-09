# 第二节：更新 final 字段组成的对象

更新：2026-11-09。本节已完成，由你编写功能、助手提供测试和审阅。[本节 3 项测试](../../test/domain/coursework/planner_task_copy_with_test.dart) 已通过；连同第一节 3 项模型测试和首页测试，共 7 项通过。[原始测试模板](../../lessons/02_copy_with/planner_task_copy_with_test.dart.txt) 保留供回顾。

## 与 Java 对照

和 Java 的 final 字段一样，不能直接给 `task.isCompleted` 重新赋值。做法是返回一个新对象，保留编号和标题，让新对象携带新的完成状态。原对象不变，以后可用于撤销。

`copyWith` 是常用方法命名约定，不是 Dart 关键字，也不会由语言自动生成。

## 本节新语法

- `bool?` 可以是 true、false 或 null；`bool` 不能是 null。
- 可选命名参数未提供且没有显式默认值时，值为 null，因此类型需要允许 null。
- `a ?? b`：a 非 null 就取 a，否则取 b。false 不是 null，不会触发回退。
- 参数与字段同名时，`isCompleted` 指参数，`this.isCompleted` 指当前对象字段。

## 你的任务

在已有 PlannerTask 类中增加实例方法，签名为：

```dart
PlannerTask copyWith({bool? isCompleted})
```

自己填写方法体：创建并返回一个新的 PlannerTask。保留当前 id 和 title；传入完成状态就使用它，未传则沿用当前完成状态。保留三个字段的 final，不增加 setter，也不修改构造函数的默认值。

以下调用应成立：

```dart
final task = PlannerTask(id: 'task-1', title: '提交作业');
final completed = task.copyWith(isCompleted: true);
final reopened = completed.copyWith(isCompleted: false);
final unchanged = completed.copyWith();
```

task 仍为未完成；completed 为完成；reopened 为未完成；unchanged 为完成。它们是不同对象，但仍代表同一任务，因此 id 相同。

## 验收

测试覆盖完成、撤销完成、未传参数保留原值，以及新对象保留 id/title、原对象不变。测试已启用到 `test/domain/coursework/` 并通过完整测试。

## 本次练习回顾

初稿的方法体正确，但字段缺少 `final`，方法参数缺少花括号。修正后的核心代码如下：

```dart
final bool isCompleted;

PlannerTask copyWith({bool? isCompleted}) {
  return PlannerTask(
    id: id,
    title: title,
    isCompleted: isCompleted ?? this.isCompleted,
  );
}
```

- `copyWith(bool? isCompleted)` 是必填位置参数，必须调用 `copyWith(true)` 或 `copyWith(null)`。`?` 只允许值为 null，不允许省略实参。
- `copyWith({bool? isCompleted})` 是可选命名参数，可以调用 `copyWith(isCompleted: true)`，也可以调用 `copyWith()`；省略时参数为 null。
- 字段上的 `final` 防止直接赋值。`copyWith` 返回一个新对象，因此不需要修改旧对象字段；新对象保持同一任务 ID。
- `??` 只在左侧为 null 时回退。传入 false 会使用 false，可以撤销完成。
- `id: id` 左边是构造函数参数名，右边是当前对象字段；`title` 同理。这里没有同名方法参数，因此省略 `this.` 即可。教程曾用显式 `this.` 便于讲解，实际代码按静态检查要求省略多余限定符。
- `isCompleted` 在方法体里优先指方法参数；`this.isCompleted` 才是旧对象字段，因此此处保留 `this.`。

这节只增加数据模型能力，不涉及界面勾选、数据库或通知。
