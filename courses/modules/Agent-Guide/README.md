# Agent 概念入门

7 页核心课程，回答一个问题：一个能自己完成任务的 Agent，由哪些部分构成，它们又如何串成一个循环。

## 页面

| # | 页面 | 主要交互 |
|---|---|---|
| 01 | 同一个请求，聊天机器人和 Agent 交出不同的东西 | 切换订票、竞品调研、排障三个任务，对比单步回应与多步行动链 |
| 02 | 什么才算 Agent：目标、环境与自主性 | 拖动自主性滑杆，查看工具、助手、Agent 三段的控制权与代价 |
| 03 | 基本闭环：感知、思考、行动、观察 | 单步执行一次文献调研，观察四类节点轮流高亮与终止条件 |
| 04 | 大模型是大脑，但不是 Agent 的全部 | 切换“只接模型 / 接上工具与状态”，对比链路中断点 |
| 05 | 一个 Agent 的六个基本模块 | 点击环形图模块，查看职责、输入、输出、缺失症状与常见做法 |
| 06 | 感知：把世界变成可处理的输入 | 解析一句模糊请求，逐项揭示字段并查看应如何追问 |
| 07 | 规划：把目标拆成可执行的步骤 | 点击任务节点查看依赖，切换顺序 / 并行对比总耗时 |

## 实现

- `outlines.json`：页面索引、讲稿与元数据。
- `AgentGuide.tsx`：Guide 入口，按 1600×900 画布纵向拼接，按容器宽度等比缩放。
- `AgentPpt.tsx`：SceneDeck 适配器，7 个 scene 与大纲顺序一致。
- `pages/`：每页的 TSX 与同名 CSS。
- `components/`：`AgentPage` 公共画布与 `Takeaway`、`Icon` 图标集。

页面统一使用 Shared `ContentBlock` 作为标题区，文字通过 `Typography` 渲染，颜色和圆角使用 Shared CSS Token。页面内所有工具调用、检索与指标均为教学模拟，不连接真实模型或外部服务。

## 预览

在仓库根目录执行：

```powershell
.\environment\install.ps1
.\runtime\start.ps1
```

- 连续阅读：http://127.0.0.1:5173/modules/agent-guide
- 课堂演示：http://127.0.0.1:5173/scenedeck/?deck=agent-guide

单页截图可用 `?deck=agent-guide&slide=<页面 id>&scenedeckCapture=1`，页面 id 见 `outlines.json`。
