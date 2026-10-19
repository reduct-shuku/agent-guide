# Agent 概念入门 · 课程内容

本目录是「Agent概念入门」的课程内容根目录，同时作为 Shuku 课程包根目录。

```text
courses/
├── README.md               课程库使用说明
├── SKILL.md                Shuku Agent 使用入口
├── shuku.json              Shuku 元数据、版本与更新来源
├── CONTRIBUTING.md         课程贡献与发布流程
├── modules/
│   └── Agent-Guide/        课程实现
│       ├── outlines.json   大纲、页面顺序、入口和签名身份
│       ├── AgentGuide.tsx  Guide 入口，导出同名组件
│       ├── AgentPpt.tsx    PPT 适配器，导出 deck
│       ├── pages/          7 个核心页面及其 CSS
│       └── components/     课程专属图示与模拟组件
└── assets/<签名UUID>/      图片、视频、模型和缩略图
```

课程画布固定为 1600×900，Guide 与 PPT 共享同一批页面。课程 URL 为 `/modules/agent-guide`，课堂播放器为 `/scenedeck/?deck=agent-guide`。

## 内容结构

当前为首个阶段版本，共 7 页核心内容：

- **概念建立（1–5 页）**：从聊天机器人到 Agent 的行为差异，给出目标、环境、自主性三个判断条件，说明大模型只是决策内核，并建立六模块总览。
- **模块拆解（6–7 页）**：用感知与规划两页，展示一个模块的输入、输出、典型做法与失败症状。

后续阶段将补齐工具、记忆、执行与观察、反思，以及完整运行、失败模式与评估页面。

交互均为浏览器内教学模拟，只用于呈现机制，不调用真实模型、检索或外部工具。

## 本地预览

在仓库根目录执行：

```powershell
.\environment\install.ps1
.\runtime\start.ps1
```

打开 http://127.0.0.1:5173/modules/agent-guide 连续阅读，或打开 http://127.0.0.1:5173/scenedeck/?deck=agent-guide 逐页演示。

公共能力通过 `@shared/react` 导入；课程页面、数据、讲稿和专属 CSS 留在 `modules/Agent-Guide/`。素材统一通过 `moduleAssetUrl` 引用。完整创作规范见 [creater-skills/SKILL.md](../../creater-skills/SKILL.md)。
