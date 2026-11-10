# 仓库导航与维护

更新：2026-11-11。目录保持原有路径，避免破坏教学引用和平台工程。当前学习进度以 [LEARNING.md](LEARNING.md) 为准，课时以 [CURRICULUM.md](CURRICULUM.md) 为准；各课笔记保留当时的测试数量，不代表最新总数。

| 目录 | 内容与维护边界 |
|---|---|
| `lib/` | 学习者实现的 Flutter 入口和任务模型；按课推进，不预建空架构 |
| `test/` | 正在执行的模型与界面测试；`flutter test` 的覆盖来源 |
| [lessons/](../lessons/README.md) | 历史练习模板，非活动测试，不覆盖当前测试 |
| `docs/lessons/` | 第一至十节教学与验收记录 |
| `docs/`、`docs/adr/` | 进度、产品规划、设计取舍与验收要求；规划不等于已实现 |
| [assets/](../assets/README.md) | 可编辑美术源文件、导出素材和目录；历史标志保留 |
| [website/](../website/README.md) | 三语静态概念官网；独立于尚未实现的 Web 规划应用 |
| [tools/](../tools/README.md) | 素材生成工具与只读链接/语法检查 |
| `windows/`、`linux/`、`macos/` | 原生桌面工程；编译支持不等于各平台实际运行已验收 |
| `android/` | 保留的旧脚手架，不代表有手机产品计划 |
| `.github/workflows/` | Flutter 检查和三桌面构建；官网仅发布 website 目录 |

## 日常检查

```sh
node tools/check_repository.cjs
dart format --output=none --set-exit-if-changed lib test
flutter analyze --no-pub --fatal-infos --fatal-warnings
flutter test --no-pub
```

首次拉取或依赖发生变化时先按 [SETUP.md](SETUP.md) 执行 flutter pub get。Windows 主机可另运行 `flutter build windows --debug --no-pub`；其他桌面系统在对应主机或 CI 验证。只读脚本检查本地文件目标和 JS 语法，不代替浏览器、远程链接或锚点验证。

## 文件保留规则

构建缓存、IDE 本地配置和凭据由 .gitignore 排除；不为清理工作区而删除用户文件。四个 Flutter 插件注册生成文件在 .gitattributes 中固定 LF，以减少跨平台换行噪声。它们仍受版本控制。

素材源文件、官网部署副本和平台图标虽有重复，但用途不同，不能作为冗余文件直接删除。再生成顺序见素材库说明。目录整理不重新发布素材或创建新网站。

## 当前边界

应用已形成内存待办闭环：输入、校验、添加、完成切换、删空提示、删除和最近一次撤销。重启后任务和撤销记录丢失。数据库、正式页面主题与导航、课表、日程、备份、通知和 Web 应用仍待课程实现；美术素材就绪不表示这些功能已完成。

## 本次整理验收

2026-11-11：536 个本地 Markdown/HTML 文件链接与项目 JavaScript 语法检查通过；Dart 格式检查、静态分析和全部 26 项测试通过；Windows 调试构建成功。未在本机验收 Linux/macOS 运行，未将调试构建宣称为正式安装包。本次未改动官网展示行为，未重复宣称浏览器验收结果。
