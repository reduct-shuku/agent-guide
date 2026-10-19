import { useState } from 'react';
import { Button, Typography } from '@shared/react';
import { AgentPage, Takeaway } from '../components/AgentPage';
import { Icon } from '../components/AgentIcons';
import './PerceptionPage.css';

interface Field {
  key: string;
  label: string;
  value: string;
  status: 'clear' | 'assume' | 'missing';
  why: string;
  ask: string;
}

const fields: Field[] = [
  { key: 'goal', label: '目标', value: '把方案预算调低', status: 'clear', why: '决定后续所有动作的方向。', ask: '' },
  { key: 'object', label: '对象', value: '“上次那个方案”', status: 'assume', why: '指代不明确，可能指上周的版本，也可能指客户看到的那一版。', ask: '是上周发客户的那版方案，还是内部最新版？' },
  { key: 'time', label: '时间', value: '下周三之前', status: 'clear', why: '决定截止时间与可用的执行步数。', ask: '' },
  { key: 'constraint', label: '约束', value: '预算只能降，不能升', status: 'clear', why: '来自“压一压”的常识推断，需要确认是否还有下限。', ask: '预算有没有不能低于的底线？' },
  { key: 'missing', label: '缺失信息', value: '降低幅度、审批人', status: 'missing', why: '没有幅度就无法判断方案是否达标；没有审批人无法收尾。', ask: '希望压到多少？改完后由谁确认？' },
  { key: 'next', label: '候选动作', value: '定位方案 → 查当前预算 → 出 3 档方案', status: 'clear', why: '把目标转成下一步可执行的动作，而不是直接改数字。', ask: '' },
];

const statusMeta = {
  clear: { text: '明确', className: 'is-clear' },
  assume: { text: '需确认', className: 'is-assume' },
  missing: { text: '缺失', className: 'is-missing' },
};

export function PerceptionPage() {
  const [parsed, setParsed] = useState(false);
  const [selected, setSelected] = useState(1);

  return (
    <AgentPage
      title="感知：把世界变成可处理的输入"
      subtitle="用户的意图往往藏在模糊的表达里。感知先把它拆成字段，再决定哪些要追问、哪些可以先假设。"
    >
      <div className="pc-main">
        <section className="pc-source">
          <div className="pc-source-head">
            <Icon kind="chat" size={18} />
            <Typography as="span" variant="bodySmall" tone="muted">用户原话</Typography>
          </div>
          <div className={`pc-quote${parsed ? ' is-parsed' : ''}`}>
            <Typography variant="h3" tone="main" className="pc-quote-text">
              “下周三之前把<span className="pc-mark pc-mark-time">上次那个方案</span>的预算再<span className="pc-mark pc-mark-goal">压一压</span>，顺便问问老李有没有空。”
            </Typography>
          </div>
          <Button variant="primary" onClick={() => setParsed(true)} disabled={parsed}>
            {parsed ? '已解析为 6 个字段' : '解析这句话'}
          </Button>
          <div className="pc-steps">
            {[
              ['01', '抽取', '把时间、对象、约束从原话里取出来'],
              ['02', '对齐', '把指代和上下文对上：是哪个方案、哪位老李'],
              ['03', '标缺失', '明确哪些字段没有说，决定追问还是假设'],
            ].map(([index, title, text]) => (
              <div className="pc-step" key={index}>
                <span className="pc-step-index"><Typography as="span" variant="bodySmall" tone="inherit">{index}</Typography></span>
                <span className="pc-step-copy">
                  <Typography as="span" variant="bodySmall" tone="main" className="pc-step-title">{title}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted">{text}</Typography>
                </span>
              </div>
            ))}
          </div>
          <div className="pc-source-note">
            <Typography variant="bodySmall" tone="muted">
              同一句话里，至少混着<strong>目标、对象、时间、约束</strong>和两个没有说出口的量。感知不是“读懂文本”，而是抽出可执行的结构。
            </Typography>
          </div>
          <div className="pc-legend">
            <span className="pc-legend-item"><i className="pc-dot pc-dot-goal" /><Typography as="span" variant="bodySmall" tone="muted">目标</Typography></span>
            <span className="pc-legend-item"><i className="pc-dot pc-dot-time" /><Typography as="span" variant="bodySmall" tone="muted">指代 / 时间</Typography></span>
          </div>
        </section>

        <section className="pc-result" aria-live="polite">
          <header className="pc-result-head">
            <Typography variant="h3" tone="main">结构化状态</Typography>
            <span className={`ag-tag${parsed ? '' : ' ag-tag-orange'}`}>{parsed ? '6 个字段 · 2 项待确认' : '等待解析'}</span>
          </header>
          <div className="pc-fields">
            {fields.map((field, index) => {
              const meta = statusMeta[field.status];
              return (
                <button
                  key={field.key}
                  type="button"
                  className={`pc-field ${parsed ? 'is-revealed' : 'is-hidden'}${field.key === fields[selected].key ? ' is-active' : ''}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                  onClick={() => parsed && setSelected(index)}
                  aria-pressed={field.key === fields[selected].key}
                >
                  <Typography as="span" variant="bodySmall" tone="muted" className="pc-field-label">{field.label}</Typography>
                  <Typography as="span" variant="body" tone={parsed ? 'main' : 'light'} className="pc-field-value">
                    {parsed ? field.value : '——'}
                  </Typography>
                  <span className={`pc-status ${meta.className}`}>
                    <Typography as="span" variant="bodySmall" tone="inherit">{meta.text}</Typography>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pc-detail">
            <Typography as="span" variant="bodySmall" tone="accent" className="pc-detail-label">
              {fields[selected].label}
            </Typography>
            <Typography variant="bodySmall" tone="main">{fields[selected].why}</Typography>
            {fields[selected].ask && (
              <div className="pc-ask">
                <Icon kind="chat" size={14} />
                <Typography as="span" variant="bodySmall" tone="muted">{fields[selected].ask}</Typography>
              </div>
            )}
          </div>
        </section>
      </div>

      <Takeaway>
        感知的产出不是“理解了”，而是一份<strong>可以继续执行、也可以被质疑的结构</strong>；缺失项要么追问，要么带着明确的假设继续。
      </Takeaway>
    </AgentPage>
  );
}
