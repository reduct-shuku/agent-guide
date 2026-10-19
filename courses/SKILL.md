---
name: agent-guide
description: 讲解 AI Agent 的基本概念与基本模块框架，按课程大纲引导学习感知、规划、工具、记忆、执行与反思六个模块，并在配套 course-template 环境中启动课程的 Guide 或 PPT 预览。
---

# Agent 概念入门

本课程回答一个问题：一个能自己完成任务的 Agent，由哪些部分构成，它们又如何串成一个循环。

## Shuku 版本检查

触发时先读取同目录的 [shuku.json](shuku.json)，使用 `repository`、`ref`、`path` 获取对应远程位置的最新 shuku.json，比较三段式语义版本。

- 远程版本更高：展示本地版本、远程版本和 `changes`，询问用户是否更新；经确认后才可覆盖本地文件。
- 版本一致：继续使用。远程版本更低或无法比较：使用本地版本，不自动降级。
- 仓库地址尚未配置或 GitHub 无法访问：说明未完成更新检查，继续使用本地课程。

## 课程内容

课程实现位于 [Agent-Guide](Agent-Guide/README.md)，[outlines.json](Agent-Guide/outlines.json) 是页面索引。当前为首个阶段版本，共 7 页核心内容：

1. 从聊天到行动：同一个请求的两种结果
2. 什么才算 Agent：目标、环境与自主性
3. 基本闭环：感知、思考、行动、观察
4. 大模型是大脑，但不是 Agent 的全部
5. 六个基本模块总览
6. 感知：把世界变成可处理的输入
7. 规划：把目标拆成可执行的步骤

后续阶段将补齐工具、记忆、执行与观察、反思，以及完整运行、失败模式与评估等页面。

页面中的工具调用、检索和指标均为浏览器内教学模拟，不连接真实模型或外部服务；课程不宣称模拟结果来自真实线上 Agent。

## 学习与演示

先根据学习者的问题定位到对应页面，读取该页的 `goal`、`summary` 与 `snippet`，再用页面中的交互说明概念。需要更细的实现细节时，再读取对应页面 TSX。

## 启动互动课程

本课程随 course-template 使用，页面依赖其中的 Shared、Vite 配置和统一素材目录。独立复制本目录不能直接启动网页。

在当前布局中，从本目录向上两级找到包含 `environment/install.ps1`、`runtime/start.ps1` 和 `creater-skills/shared/` 的 course-template 根目录。所有启动命令在该根目录执行：

```powershell
.\environment\install.ps1
.\runtime\start.ps1
```

依赖已安装时直接启动。状态、停止命令为 `./runtime/start.ps1 -Status`、`./runtime/stop.ps1`。

- 连续阅读：http://127.0.0.1:5173/modules/agent-guide
- 课堂演示：http://127.0.0.1:5173/scenedeck/?deck=agent-guide

使用启动命令实际返回的地址；若端口发生变化，同步调整链接。启动失败时查看命令输出和根目录 `runtime/data/` 下的日志。

## 贡献本课程

用户要求贡献、提交、发布修改或创建 Pull Request 时，先读取 [CONTRIBUTING.md](CONTRIBUTING.md)。不要假定安装目录是 Git 仓库。修改课程页面时遵循配套项目 `creater-skills/SKILL.md`，保留现有模块身份和素材 UUID。

## 完成标准

学习请求：解释选定知识点，并依据学习者的问题继续引导。演示请求：确认服务可访问、目标页面渲染及所需交互可用，再提供地址。缺失配套环境或更新来源时，明确说明当前能完成的部分。
