# 第七节：输入框与控制器

更新：2026-11-11。实现与自动验收完成，当时全部 16 项测试通过。当前读取按钮已由第八节的添加按钮取代，最新覆盖数量见 LEARNING.md。

## 实现与概念

学习者在 State 中创建 TextEditingController，将它传给 TextField，通过控制器的 text 属性读取标题。InputDecoration 的 labelText 标注“任务标题”；初版按钮读取后打印到终端。控制器保存在实例字段中，重建时仍使用同一个对象。

State 的 dispose 方法在该状态结束使用时调用，先执行 titleController.dispose()，再调用 super.dispose()。普通 build 重建不会调用 dispose。final 限制控制器变量重新赋值，不禁止控制器内容变化。

## 调试与验收

首次实现遗漏 dispose，生命周期测试失败，学习者补上后通过。输入及读取正常，计数和任务状态重建后输入仍保留。

加入输入框后，小窗口列表高度不足以同时展示两行。学习者将两个计数按钮放进 Row，减少垂直占用。助手发现原测试把“两个 ListTile 同时被创建”当作要求，不适合 ListView.builder 的按需创建，于是改为验证首行内容、滚动至第二行并点击切换。两种窗口尺寸通过，未放宽状态或可达性要求。

本节自动验收为格式、静态分析及 16 项测试通过。独立的旧版打印日志手动结果未确认；第八节已实际确认后续输入、添加及状态切换。当前测试见 [输入测试](../../test/task_title_input_widget_test.dart) 与 [列表测试](../../test/task_list_widget_test.dart)。

下一节：[添加任务](08-add-task.md)。
