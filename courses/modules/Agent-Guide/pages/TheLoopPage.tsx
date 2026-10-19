import { useState } from 'react';
import { Button, Typography } from '@shared/react';
import { AgentPage } from '../components/AgentPage';
import { Icon } from '../components/AgentIcons';
import './TheLoopPage.css';

const phases = [
  { key: 'sense', label: '感知', icon: 'eye' as const },
  { key: 'think', label: '思考', icon: 'brain' as const },
  { key: 'act', label: '行动', icon: 'wrench' as const },
  { key: 'observe', label: '观察', icon: 'refresh' as const },
];

const rounds = [
  {
    title: '第 1 轮 · 找到起点',
    cells: ['任务：找三篇 RAG 论文并总结', '还不知道有哪些论文，先检索', 'search("retrieval augmented generation")', '返回 12 条结果，3 篇高相关'],
    context: '1.4k',
  },
  {
    title: '第 2 轮 · 读原文',
    cells: ['12 条结果，3 篇候选', '先读摘要，确认是否切题', 'fetch(3 个链接)', '2 篇可读，1 篇在付费墙后'],
    context: '3.1k',
  },
  {
    title: '第 3 轮 · 补证据',
    cells: ['两篇全文，仍缺一个综述性结论', '信息不足，换关键词找综述', 'search("RAG survey 2024")', '找到 1 篇综述，覆盖缺口'],
    context: '5.8k',
  },
  {
    title: '第 4 轮 · 交付',
    cells: ['综述 + 两篇论文', '证据足够，可以总结', 'write_summary()', '自检通过，返回结果'],
    context: '7.2k',
  },
];

const TOTAL = rounds.length * 4;

export function TheLoopPage() {
  const [step, setStep] = useState(0);
  const done = step >= TOTAL;
  const roundIndex = Math.min(rounds.length - 1, Math.floor(step / 4));
  const phase = step % 4;
  const round = rounds[roundIndex];
  const activePhase = done ? -1 : phase;

  return (
    <AgentPage
      title="基本闭环：感知、思考、行动、观察"
      subtitle="Agent 不是一次生成，而是一轮轮把结果变成下一步的输入。点“下一步”，跟着一次文献调研走完四轮。"
    >
      <div className="tl-main">
        <section className="tl-diagram" aria-label="循环示意图">
          <div className="tl-ring">
            <svg className="tl-ring-lines" viewBox="0 0 470 470" aria-hidden="true">
              <circle cx="235" cy="235" r="210" fill="none" stroke="#ccdaea" strokeWidth="1.6" strokeDasharray="7 8" />
              <path d="M235 14v11M235 445v11M14 235h11M445 235h11" stroke="#b9c9dd" strokeWidth="1.6" />
              <path d="m392 96 8-5-1 9" fill="none" stroke="#b9c9dd" strokeWidth="1.6" />
            </svg>
            {phases.map((item, index) => {
              const pos = [
                { left: '50%', top: '10%' },
                { left: '90%', top: '50%' },
                { left: '50%', top: '90%' },
                { left: '10%', top: '50%' },
              ][index];
              return (
                <div
                  key={item.key}
                  className={`tl-node${activePhase === index ? ' is-active' : ''}${done ? ' is-done' : ''}`}
                  style={pos}
                >
                  <Icon kind={item.icon} size={20} />
                  <Typography as="span" variant="bodySmall" tone="inherit">{item.label}</Typography>
                </div>
              );
            })}
            <div className="tl-center">
              <Typography as="span" variant="bodySmall" tone="muted">{done ? '循环结束' : '当前轮次'}</Typography>
              <Typography as="span" variant="h3" tone="accent" className="tl-center-round">{done ? '4 / 4' : `${roundIndex + 1} / 4`}</Typography>
              <Typography as="span" variant="bodySmall" tone="muted">{done ? '目标达成' : `第 ${phase + 1} 步`}</Typography>
            </div>
          </div>
          <div className="tl-context">
            <div className="tl-context-head">
              <Typography as="span" variant="bodySmall" tone="muted">上下文占用</Typography>
              <Typography as="span" variant="bodySmall" tone="accent" className="ag-mono">{done ? '7.2k / 8k' : `${round.context} / 8k`}</Typography>
            </div>
            <div className="tl-context-track">
              <div className="tl-context-fill" style={{ width: done ? '90%' : `${(parseFloat(round.context) / 8) * 100}%` }} />
            </div>
          </div>
        </section>

        <section className="tl-detail" aria-live="polite">
          <header className="tl-detail-head">
            <div>
              <Typography variant="bodySmall" tone="muted" className="tl-eyebrow">{done ? '运行结束' : round.title}</Typography>
              <Typography variant="h3" tone="main">{done ? '四次循环后，目标达成' : '这一轮发生了什么'}</Typography>
            </div>
            <span className="ag-tag">{done ? '4 轮 · 8 次工具调用' : `步骤 ${Math.min(step + 1, TOTAL)} / ${TOTAL}`}</span>
          </header>

          <ol className="tl-cells" key={done ? 'done' : roundIndex}>
            {(done ? rounds[rounds.length - 1] : round).cells.map((text, index) => {
              const visible = done || index <= phase;
              const isActive = !done && index === phase;
              return (
                <li key={phases[index].key} className={`tl-cell${visible ? ' is-visible' : ' is-hidden'}${isActive ? ' is-active' : ''}`}>
                  <span className="tl-cell-phase">
                    <Icon kind={phases[index].icon} size={16} />
                    <Typography as="span" variant="bodySmall" tone="inherit">{phases[index].label}</Typography>
                  </span>
                  <Typography as="span" variant="body" tone={visible ? 'main' : 'muted'} className={`tl-cell-text${phases[index].key === 'act' ? ' ag-mono' : ''}`}>
                    {visible ? text : '等待上一步的结果'}
                  </Typography>
                </li>
              );
            })}
          </ol>

          <div className="tl-why">
            <Typography variant="bodySmall" tone="muted">每轮只前进一步：先拿到候选，再验证可读，再补缺口。跳步会浪费检索预算。</Typography>
          </div>

          <div className="tl-state">
            <div className="tl-state-row">
              <Typography as="span" variant="bodySmall" tone="muted">可用工具</Typography>
              <Typography as="span" variant="bodySmall" tone="main" className="ag-mono">search · fetch · write_summary</Typography>
            </div>
            <div className="tl-state-row">
              <Typography as="span" variant="bodySmall" tone="muted">终止条件</Typography>
              <Typography as="span" variant="bodySmall" tone="main">找到至少 3 篇并覆盖综述缺口</Typography>
            </div>
            <div className="tl-state-row">
              <Typography as="span" variant="bodySmall" tone="muted">已完成步数</Typography>
              <Typography as="span" variant="bodySmall" tone="main">{done ? '12 / 16' : `${Math.min(step, TOTAL)} / 16`}</Typography>
            </div>
          </div>

          <div className="tl-log">
            <Typography as="span" variant="bodySmall" tone="muted">已完成的轮次</Typography>
            <div className="tl-log-lines">
              {rounds.slice(0, done ? 4 : roundIndex).map(item => (
                <div className="tl-log-line" key={item.title}>
                  <Typography as="span" variant="bodySmall" tone="main">{item.title}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted">{item.cells[3]}</Typography>
                </div>
              ))}
              {roundIndex === 0 && !done && (
                <Typography as="span" variant="bodySmall" tone="light">还没有完成的轮次</Typography>
              )}
            </div>
          </div>

          <div className="tl-controls">
            <Button variant="primary" onClick={() => setStep(value => Math.min(TOTAL, value + 1))} disabled={done}>下一步</Button>
            <Button onClick={() => setStep(0)}>重置</Button>
            {done && (
              <span className="tl-exit">
                <Icon kind="flag" size={16} />
                <Typography as="span" variant="bodySmall" tone="success">终止条件：目标达成</Typography>
              </span>
            )}
          </div>
        </section>
      </div>
    </AgentPage>
  );
}
