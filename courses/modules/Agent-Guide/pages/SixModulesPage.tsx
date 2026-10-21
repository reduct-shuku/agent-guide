import { useState } from 'react';
import { Typography } from '@shared/react';
import { AgentPage } from '../components/AgentPage';
import { Icon, type IconKind } from '../components/AgentIcons';
import './SixModulesPage.css';

interface ModuleInfo {
  id: string;
  name: string;
  en: string;
  icon: IconKind;
  role: string;
  input: string;
  output: string;
  failure: string;
  example: string;
  practice: string;
}

const modules: ModuleInfo[] = [
  { id: 'perception', name: '感知', en: 'Perception', icon: 'eye', role: '把外部输入变成可处理的结构化状态。', input: '文本、文件、页面、事件、传感器读数', output: '目标、对象、时间、约束、缺失项', failure: '听不懂隐含条件，答非所问，反复确认已经说过的信息', example: '把“下周三之前把预算压一压”拆成时间、对象、约束，并标出“压多少”没有说。', practice: '意图识别、实体抽取、OCR、语音转写' },
  { id: 'planning', name: '规划', en: 'Planning', icon: 'route', role: '把目标拆成带依赖的步骤，并维护终止条件。', input: '结构化目标与当前状态', output: '步骤、依赖关系、优先级、退出条件', failure: '走一步看一步，反复尝试同一动作，任务永远做不完', example: '先确认预算口径，再收集数据，最后出表；三步有先后依赖。', practice: '任务分解、依赖图、ReAct、计划重排' },
  { id: 'tools', name: '工具', en: 'Tools', icon: 'wrench', role: '把决策意图变成真实世界中的操作。', input: '工具名、参数、调用时机', output: '外部数据、写入结果、副作用', failure: '只能说不能做；或者选错工具、把参数填进错误的字段', example: '调日历确认空闲，调订票接口下单，再调邮件接口发送行程。', practice: 'function calling、REST API、浏览器、代码执行' },
  { id: 'memory', name: '记忆', en: 'Memory', icon: 'memory', role: '保存并取回跨轮、跨任务需要的信息。', input: '新事实、历史结果、用户偏好', output: '相关片段、约束提醒、可复用结论', failure: '反复询问同一件事，忘记关键约束，把过时信息当成事实', example: '记住“靠窗”这个偏好，下次订票不必再问。', practice: '向量检索、摘要压缩、键值存储、偏好表' },
  { id: 'execution', name: '执行', en: 'Execution', icon: 'bolt', role: '校验参数、调用工具、捕获异常并把结果写回。', input: '模型给出的调用请求', output: '结构化结果、错误码、耗时与副作用记录', failure: '静默失败，错误被吞掉，模型只能靠猜继续下一步', example: '校验日期格式，捕获“无余票”，把错误码交回模型而不是吞掉。', practice: '参数校验、超时与重试、沙箱、操作审计' },
  { id: 'reflection', name: '反思', en: 'Reflection', icon: 'check', role: '按可检查的标准核对输出，再决定是否交付。', input: '初稿与验收标准', output: '问题清单、修订稿、置信度', failure: '低级错误直接交付，数据和结论互相矛盾', example: '对照“三篇且覆盖缺口”逐条检查摘要，发现少一篇就退回检索。', practice: '规则检查、自检清单、二次评审、单元测试' },
];

/** 竖直主链上四个步骤模块的位置（620×700 画布坐标）。 */
const flow = [
  { id: 'perception', top: 90 },
  { id: 'planning', top: 230 },
  { id: 'execution', top: 370 },
  { id: 'reflection', top: 510 },
];

const NODE_H = 56;
const NODE_W = 200;
const NODE_X = 200;
const NODE_CENTER = NODE_X + NODE_W / 2;
const rowCenter = (id: string) => (flow.find(item => item.id === id)?.top ?? 0) + NODE_H / 2;

/** 主链上相邻两段的信息流说明。 */
const links = [
  { from: 'perception', to: 'planning', label: '结构化目标' },
  { from: 'planning', to: 'execution', label: '步骤与依赖' },
  { from: 'execution', to: 'reflection', label: '结果与产出' },
];

export function SixModulesPage() {
  const [activeId, setActiveId] = useState(modules[0].id);
  const active = modules.find(item => item.id === activeId) ?? modules[0];
  const index = (id: string) => modules.findIndex(item => item.id === id);
  const nodeOf = (id: string) => modules.find(item => item.id === id) as ModuleInfo;

  const retryY = rowCenter('reflection');
  const planY = rowCenter('planning');
  const memoryTop = 90;
  const memoryBottom = rowCenter('execution') + NODE_H / 2;
  const toolTop = 470;

  return (
    <AgentPage
      title="一个 Agent 的六个基本模块"
      subtitle="把循环按职责切开，会得到六个模块。它们是职责划分，不要求对应六个独立服务。"
    >
      <div className="six-main">
        <section className="six-map" aria-label="模块关系图">
          <svg className="six-links" viewBox="0 0 620 700" aria-hidden="true">
            <defs>
              <marker id="six-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill="#7ba4d4" />
              </marker>
              <marker id="six-arrow-soft" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill="#aec4da" />
              </marker>
              <marker id="six-arrow-retry" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill="#c8763f" />
              </marker>
            </defs>

            {/* 外部输入进入感知 */}
            <line x1={NODE_CENTER} y1="57" x2={NODE_CENTER} y2="84" stroke="#aec4da" strokeWidth="2" markerEnd="url(#six-arrow-soft)" />

            {/* 主循环：相邻模块之间的信息流 */}
            {links.map(link => {
              const y1 = (flow.find(item => item.id === link.from)?.top ?? 0) + NODE_H;
              const y2 = flow.find(item => item.id === link.to)?.top ?? 0;
              return (
                <line
                  key={link.from}
                  x1={NODE_CENTER}
                  y1={y1 + 4}
                  x2={NODE_CENTER}
                  y2={y2 - 4}
                  stroke="#7ba4d4"
                  strokeWidth="2.2"
                  markerEnd="url(#six-arrow)"
                />
              );
            })}

            {/* 达标出口 */}
            <line x1={NODE_CENTER} y1={rowCenter('reflection') + NODE_H / 2 + 4} x2={NODE_CENTER} y2="584" stroke="#7ba4d4" strokeWidth="2.2" markerEnd="url(#six-arrow)" />

            {/* 记忆：贯穿感知、规划、执行的共享上下文 */}
            {['perception', 'planning', 'execution'].map(id => (
              <line
                key={id}
                x1="154"
                y1={rowCenter(id)}
                x2="196"
                y2={rowCenter(id)}
                stroke="#b3c6dc"
                strokeWidth="1.6"
                strokeDasharray="4 5"
                markerStart="url(#six-arrow-soft)"
                markerEnd="url(#six-arrow-soft)"
              />
            ))}

            {/* 执行与工具的调用回路 */}
            <path
              d={`M196 ${rowCenter('execution')} H181 Q175 ${rowCenter('execution')} 175 ${rowCenter('execution') + 6} V${toolTop + 24} Q175 ${toolTop + 31} 169 ${toolTop + 31} H158`}
              fill="none"
              stroke="#b3c6dc"
              strokeWidth="1.6"
              strokeDasharray="4 5"
              markerStart="url(#six-arrow-soft)"
              markerEnd="url(#six-arrow-soft)"
            />

            {/* 反思不达标时退回规划 */}
            <path
              d={`M404 ${retryY} H462 Q470 ${retryY} 470 ${retryY - 8} V${planY + 8} Q470 ${planY} 462 ${planY} H404`}
              fill="none"
              stroke="#c8763f"
              strokeWidth="1.8"
              strokeDasharray="6 6"
              markerEnd="url(#six-arrow-retry)"
            />
          </svg>

          <div className="six-chip six-chip-input">
            <Typography as="span" variant="bodySmall" tone="muted">用户请求 / 环境事件</Typography>
          </div>

          {flow.map(item => {
            const info = nodeOf(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={`six-node${item.id === activeId ? ' is-active' : ''}`}
                style={{ top: item.top }}
                onClick={() => setActiveId(item.id)}
                aria-pressed={item.id === activeId}
              >
                <span className="six-node-icon"><Icon kind={info.icon} size={20} /></span>
                <span className="six-node-copy">
                  <Typography as="span" variant="bodySmall" tone="inherit" className="six-node-name">{info.name}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted" className="six-node-en">{info.en}</Typography>
                </span>
              </button>
            );
          })}

          {links.map(link => {
            const y1 = (flow.find(item => item.id === link.from)?.top ?? 0) + NODE_H;
            const y2 = flow.find(item => item.id === link.to)?.top ?? 0;
            return (
              <Typography
                key={link.label}
                as="span"
                variant="bodySmall"
                tone="muted"
                className="six-link-label"
                // 标签贴在箭头右侧，垂直居中于两节点之间
                style={{ top: (y1 + y2) / 2 - 11 }}
              >
                {link.label}
              </Typography>
            );
          })}

          <button
            type="button"
            className={`six-rail${activeId === 'memory' ? ' is-active' : ''}`}
            style={{ top: memoryTop, height: memoryBottom - memoryTop }}
            onClick={() => setActiveId('memory')}
            aria-pressed={activeId === 'memory'}
          >
            <span className="six-rail-icon"><Icon kind="memory" size={26} /></span>
            <Typography as="span" variant="body" tone="inherit" className="six-rail-name">记忆</Typography>
            <Typography as="span" variant="bodySmall" tone="muted" className="six-rail-en">Memory</Typography>
            <span className="six-rail-divider" />
            <Typography as="span" variant="bodySmall" tone="muted" className="six-rail-note">
              读：历史事实与偏好
            </Typography>
            <Typography as="span" variant="bodySmall" tone="muted" className="six-rail-note">
              写：本轮结果与结论
            </Typography>
          </button>

          <button
            type="button"
            className={`six-tool${activeId === 'tools' ? ' is-active' : ''}`}
            style={{ top: toolTop }}
            onClick={() => setActiveId('tools')}
            aria-pressed={activeId === 'tools'}
          >
            <span className="six-tool-icon"><Icon kind="wrench" size={19} /></span>
            <span className="six-node-copy">
              <Typography as="span" variant="bodySmall" tone="inherit" className="six-node-name">工具</Typography>
              <Typography as="span" variant="bodySmall" tone="muted" className="six-node-en">Tools</Typography>
            </span>
          </button>

          <div className="six-world-label">
            <Typography as="span" variant="bodySmall" tone="muted" className="six-world-kicker">外部世界</Typography>
            <Typography as="span" variant="bodySmall" tone="muted" className="six-world-list">日历 · 订票 · 邮件 · 代码</Typography>
          </div>

          <div className="six-chip six-chip-output">
            <Typography as="span" variant="bodySmall" tone="accent">达标：交付或明确失败</Typography>
          </div>

          <div className="six-retry-label">
            <Typography as="span" variant="bodySmall" className="six-retry-strong">不达标</Typography>
            <Typography as="span" variant="bodySmall" tone="muted">退回规划重排</Typography>
          </div>

          <div className="six-legend" aria-hidden="true">
            <span className="six-legend-item"><i className="six-legend-line is-solid" /><Typography as="span" variant="bodySmall" tone="muted" className="six-legend-text">主循环</Typography></span>
            <span className="six-legend-item"><i className="six-legend-line is-dash" /><Typography as="span" variant="bodySmall" tone="muted" className="six-legend-text">读写上下文</Typography></span>
            <span className="six-legend-item"><i className="six-legend-line is-retry" /><Typography as="span" variant="bodySmall" tone="muted" className="six-legend-text">退回重排</Typography></span>
          </div>
        </section>

        <section className="six-detail" aria-live="polite">
          <header className="six-detail-head">
            <span className="six-detail-icon"><Icon kind={active.icon} size={26} /></span>
            <div>
              <Typography variant="h3" tone="accent" className="six-detail-name">{active.name}</Typography>
              <Typography variant="bodySmall" tone="muted" className="six-detail-en">{active.en}</Typography>
            </div>
            <span className="ag-tag six-detail-index">{`0${index(active.id) + 1} / 06`}</span>
          </header>
          <div className="six-role">
            <Typography variant="body" tone="main">{active.role}</Typography>
          </div>
          <div className="six-rows">
            <div className="six-row">
              <Typography as="span" variant="bodySmall" tone="muted">输入</Typography>
              <Typography as="span" variant="body" tone="main">{active.input}</Typography>
            </div>
            <div className="six-row">
              <Typography as="span" variant="bodySmall" tone="muted">输出</Typography>
              <Typography as="span" variant="body" tone="main">{active.output}</Typography>
            </div>
            <div className="six-row six-row-fail">
              <Typography as="span" variant="bodySmall" tone="danger">缺少时</Typography>
              <Typography as="span" variant="body" tone="main">{active.failure}</Typography>
            </div>
          </div>
          <div className="six-example">
            <Typography as="span" variant="bodySmall" tone="accent" className="six-example-label">在订票任务里</Typography>
            <Typography variant="body" tone="main">{active.example}</Typography>
          </div>
          <div className="six-practice">
            <Typography as="span" variant="bodySmall" tone="muted">常见做法</Typography>
            <Typography as="span" variant="bodySmall" tone="main">{active.practice}</Typography>
          </div>
          <div className="six-note">
            <Typography variant="bodySmall" tone="muted">
              模块是<strong>职责</strong>，不是部署单元。一个几十行的脚本，也可能同时承担感知、规划与执行。
            </Typography>
          </div>
        </section>
      </div>
    </AgentPage>
  );
}
