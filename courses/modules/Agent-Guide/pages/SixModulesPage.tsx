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

export function SixModulesPage() {
  const [activeId, setActiveId] = useState(modules[0].id);
  const active = modules.find(item => item.id === activeId) ?? modules[0];
  const centerX = 300;
  const centerY = 292;
  const radiusX = 214;
  const radiusY = 196;

  return (
    <AgentPage
      title="一个 Agent 的六个基本模块"
      subtitle="把循环按职责切开，会得到六个模块。它们是职责划分，不要求对应六个独立服务。"
    >
      <div className="six-main">
        <section className="six-map" aria-label="模块关系图">
          <svg className="six-links" viewBox="0 0 600 590" aria-hidden="true">
            <circle cx={centerX} cy={centerY} r="150" fill="none" stroke="#d4e0ee" strokeDasharray="5 7" />
            {modules.map((item, index) => {
              const angle = (-90 + index * 60) * Math.PI / 180;
              const x = centerX + Math.cos(angle) * radiusX;
              const y = centerY + Math.sin(angle) * radiusY;
              return <line key={item.id} x1={centerX} y1={centerY} x2={x} y2={y} stroke={item.id === activeId ? '#8fb4e0' : '#dfe7f2'} strokeWidth={item.id === activeId ? 2 : 1.2} />;
            })}
          </svg>
          <div className="six-core">
            <Icon kind="target" size={24} />
            <Typography as="span" variant="h3" tone="accent" className="six-core-title">目标</Typography>
            <Typography as="span" variant="bodySmall" tone="muted">可验收的完成条件</Typography>
          </div>
          {modules.map((item, index) => {
            const angle = (-90 + index * 60) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * radiusX;
            const y = centerY + Math.sin(angle) * radiusY;
            return (
              <button
                key={item.id}
                type="button"
                className={`six-node${item.id === activeId ? ' is-active' : ''}`}
                style={{ left: x, top: y }}
                onClick={() => setActiveId(item.id)}
                aria-pressed={item.id === activeId}
              >
                <span className="six-node-icon"><Icon kind={item.icon} size={19} /></span>
                <span className="six-node-copy">
                  <Typography as="span" variant="bodySmall" tone="inherit" className="six-node-name">{item.name}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted" className="six-node-en">{item.en}</Typography>
                </span>
              </button>
            );
          })}
        </section>

        <section className="six-detail" aria-live="polite">
          <header className="six-detail-head">
            <span className="six-detail-icon"><Icon kind={active.icon} size={26} /></span>
            <div>
              <Typography variant="h3" tone="accent" className="six-detail-name">{active.name}</Typography>
              <Typography variant="bodySmall" tone="muted" className="six-detail-en">{active.en}</Typography>
            </div>
            <span className="ag-tag six-detail-index">{`0${modules.findIndex(item => item.id === active.id) + 1} / 06`}</span>
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
