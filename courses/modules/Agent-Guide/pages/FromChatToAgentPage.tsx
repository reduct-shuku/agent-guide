import { useState } from 'react';
import { Typography } from '@shared/react';
import { AgentPage, Takeaway } from '../components/AgentPage';
import { Icon } from '../components/AgentIcons';
import './FromChatToAgentPage.css';

interface Task {
  id: string;
  label: string;
  icon: 'calendar' | 'search' | 'warn';
  request: string;
  reply: string;
  steps: string[];
}

const tasks: Task[] = [
  {
    id: 'book',
    label: '订一张高铁票',
    icon: 'calendar',
    request: '帮我订一张下周三去上海的高铁票，靠窗。',
    reply: '你可以打开 12306，选择下周三的车次，勾选靠窗座位并完成支付。',
    steps: ['读取日历，确认下周三没有冲突', '查询车次与余票', '筛选靠窗座位', '填写乘车人信息', '提交订单并完成支付', '返回订单号与行程'],
  },
  {
    id: 'research',
    label: '整理竞品资料',
    icon: 'search',
    request: '把这三家竞品的定价和最近更新整理成一页。',
    reply: '建议从官网、定价页和更新日志三处收集，再按价格、功能、更新时间做成表格。',
    steps: ['打开三家竞品官网', '抓取定价页与套餐', '记录更新日志日期', '去重并核对口径', '生成对比表', '标注缺失与待确认项'],
  },
  {
    id: 'ops',
    label: '排查线上告警',
    icon: 'warn',
    request: '支付接口 5xx 突然升高，看一下。',
    reply: '可能的原因有连接池耗尽、下游超时或发布引入的问题，建议依次排查。',
    steps: ['拉取近 30 分钟错误日志', '定位到下游超时', '对比最近一次发布记录', '回滚相关配置', '观察错误率是否回落', '输出结论与后续动作'],
  },
];

export function FromChatToAgentPage() {
  const [activeId, setActiveId] = useState(tasks[0].id);
  const task = tasks.find(item => item.id === activeId) ?? tasks[0];

  return (
    <AgentPage
      title="同一个请求，聊天机器人和 Agent 交出不同的东西"
      subtitle="问法完全一样。一个停在建议，一个把建议变成结果——差别不在回答质量，而在是否为结果负责。"
    >
      <div className="fca-main">
        <section className="fca-tasks" aria-label="选择任务">
          <Typography variant="bodySmall" tone="muted" className="fca-section-label">选择一个任务</Typography>
          {tasks.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`fca-task${item.id === activeId ? ' is-active' : ''}`}
              onClick={() => setActiveId(item.id)}
              aria-pressed={item.id === activeId}
            >
              <span className="fca-task-index"><Typography as="span" variant="bodySmall" tone="inherit">{String(index + 1).padStart(2, '0')}</Typography></span>
              <Icon kind={item.icon} size={20} />
              <Typography as="span" variant="body" tone="inherit" className="fca-task-name">{item.label}</Typography>
              <Icon kind="arrow" size={16} className="fca-task-arrow" />
            </button>
          ))}
          <div className="fca-side-note">
            <Typography variant="bodySmall" tone="muted">两者可以调用同一个大模型。差异来自模型之外：有没有工具、有没有状态、能不能进入下一轮。</Typography>
          </div>
        </section>

        <section className="fca-stage" aria-live="polite">
          <div className="fca-panel fca-panel-chat">
            <header className="fca-panel-head">
              <span className="fca-panel-icon"><Icon kind="chat" size={20} /></span>
              <div>
                <Typography variant="h3" tone="main">聊天机器人</Typography>
                <Typography as="span" variant="bodySmall" tone="muted">生成一段回应</Typography>
              </div>
            </header>
            <div className="fca-request">
              <Typography as="span" variant="bodySmall" tone="muted">用户</Typography>
              <Typography variant="body" tone="main">{task.request}</Typography>
            </div>
            <div className="fca-bubble" key={`reply-${task.id}`}>
              <Typography variant="body" tone="inherit">{task.reply}</Typography>
            </div>
            <div className="fca-chat-trace">
              <div className="fca-trace-row">
                <Icon kind="check" size={15} />
                <Typography as="span" variant="bodySmall" tone="muted">理解请求</Typography>
              </div>
              <div className="fca-trace-row">
                <Icon kind="check" size={15} />
                <Typography as="span" variant="bodySmall" tone="muted">生成一段可读的建议</Typography>
              </div>
              <div className="fca-trace-row fca-trace-stop">
                <Icon kind="close" size={15} />
                <Typography as="span" variant="bodySmall" tone="danger">执行任务：没有工具与状态，无法继续</Typography>
              </div>
            </div>
            <div className="fca-status">
              <span className="ag-tag ag-tag-orange">停在建议</span>
              <Typography as="span" variant="bodySmall" tone="muted">接下来要你自己去做</Typography>
            </div>
          </div>

          <div className="fca-divider" aria-hidden="true">
            <Icon kind="arrow" size={20} />
          </div>

          <div className="fca-panel fca-panel-agent">
            <header className="fca-panel-head">
              <span className="fca-panel-icon fca-panel-icon-agent"><Icon kind="agent" size={20} /></span>
              <div>
                <Typography variant="h3" tone="main">Agent</Typography>
                <Typography as="span" variant="bodySmall" tone="muted">执行、观察、继续</Typography>
              </div>
            </header>
            <div className="fca-request">
              <Typography as="span" variant="bodySmall" tone="muted">同一句请求</Typography>
              <Typography variant="body" tone="main">{task.request}</Typography>
            </div>
            <ol className="fca-steps" key={`steps-${task.id}`}>
              {task.steps.map((step, index) => (
                <li key={step} className="fca-step ag-rise" style={{ animationDelay: `${index * 70}ms` }}>
                  <span className="fca-step-dot"><Typography as="span" variant="bodySmall" tone="inherit">{index + 1}</Typography></span>
                  <Typography as="span" variant="body" tone="main" className="fca-step-text">{step}</Typography>
                  {index === task.steps.length - 1 && <Icon kind="check" size={17} className="fca-step-check" />}
                </li>
              ))}
            </ol>
            <div className="fca-status">
              <span className="ag-tag ag-tag-green">交付结果</span>
              <Typography as="span" variant="bodySmall" tone="muted">成功、失败、代价，都由它承担</Typography>
            </div>
          </div>
        </section>
      </div>

      <Takeaway>
        Agent 与聊天机器人的分界线不是“更聪明”，而是<strong>是否进入行动—观察的循环，并对结果负责</strong>。
      </Takeaway>
    </AgentPage>
  );
}
