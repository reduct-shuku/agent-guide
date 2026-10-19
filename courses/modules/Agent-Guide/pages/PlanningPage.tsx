import { useState } from 'react';
import { Button, Typography, ValueTile } from '@shared/react';
import { AgentPage } from '../components/AgentPage';
import { Icon } from '../components/AgentIcons';
import './PlanningPage.css';

interface PlanNode {
  id: string;
  title: string;
  slot: string;
  hours: number;
  deps: string[];
  output: string;
  x: number;
  y: number;
  parallel: boolean;
}

const nodes: PlanNode[] = [
  { id: 'goal', title: '明确评审目标', slot: '本周一', hours: 0.5, deps: [], output: '一页评审目标与成功标准', x: 130, y: 215, parallel: false },
  { id: 'data', title: '收集使用数据', slot: '周二', hours: 1.5, deps: ['明确评审目标'], output: '近 30 天核心指标与异常点', x: 330, y: 105, parallel: true },
  { id: 'feedback', title: '整理客户反馈', slot: '周二', hours: 1, deps: ['明确评审目标'], output: '按主题归类的 12 条反馈', x: 330, y: 325, parallel: true },
  { id: 'deck', title: '制作评审材料', slot: '周三', hours: 2, deps: ['收集使用数据', '整理客户反馈'], output: '20 页评审稿与数据附录', x: 530, y: 215, parallel: false },
  { id: 'rehearsal', title: '内部预演', slot: '周四', hours: 1, deps: ['制作评审材料'], output: '问题清单与修改记录', x: 720, y: 105, parallel: true },
  { id: 'send', title: '发送会议材料', slot: '周四', hours: 0.2, deps: ['制作评审材料'], output: '会议邀请与预读包', x: 720, y: 325, parallel: true },
];

const edges: Array<[string, string]> = [['goal', 'data'], ['goal', 'feedback'], ['data', 'deck'], ['feedback', 'deck'], ['deck', 'rehearsal'], ['deck', 'send']];

export function PlanningPage() {
  const [parallel, setParallel] = useState(false);
  const [selected, setSelected] = useState('deck');
  const active = nodes.find(node => node.id === selected) ?? nodes[3];
  const byId = (id: string) => nodes.find(node => node.id === id)!;

  return (
    <AgentPage
      title="规划：把目标拆成可执行的步骤"
      subtitle="好的计划不是步骤清单，而是带依赖关系的图：先做什么、什么能同时做、做到哪一步算完成。"
    >
      <div className="pl-main">
        <section className="pl-graph" aria-label="任务依赖图">
          <div className="pl-toolbar">
            <div className="pl-modes">
              <Button active={!parallel} onClick={() => setParallel(false)}>顺序执行</Button>
              <Button active={parallel} onClick={() => setParallel(true)}>允许并行</Button>
            </div>
            <span className={`ag-tag${parallel ? ' ag-tag-green' : ''}`}>{parallel ? '关键路径 5.2 小时' : '总耗时 6.2 小时'}</span>
          </div>
          <div className="pl-canvas">
            <svg viewBox="0 0 800 430" className="pl-lines" aria-hidden="true">
              <defs>
                <marker id="pl-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0 0 8 4 0 8Z" fill="#9fb3ca" />
                </marker>
              </defs>
              {edges.map(([from, to]) => {
                const a = byId(from);
                const b = byId(to);
                const x1 = a.x + 80;
                const y1 = a.y;
                const x2 = b.x - 80;
                const y2 = b.y;
                const highlight = parallel && ((a.parallel && b.parallel) || from === 'goal' || to === 'deck');
                return <path key={`${from}-${to}`} d={`M${x1} ${y1} C${x1 + 40} ${y1} ${x2 - 40} ${y2} ${x2} ${y2}`} fill="none" stroke={highlight ? '#6f9fd6' : '#cbd8e8'} strokeWidth={highlight ? 2 : 1.4} markerEnd="url(#pl-arrow)" />;
              })}
            </svg>
            {nodes.map((node, index) => {
              const isActive = node.id === selected;
              return (
                <button
                  key={node.id}
                  type="button"
                  className={`pl-node${isActive ? ' is-active' : ''}${parallel && node.parallel ? ' is-parallel' : ''}`}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => setSelected(node.id)}
                  aria-pressed={isActive}
                >
                  <span className="pl-node-index"><Typography as="span" variant="bodySmall" tone="inherit">{String(index + 1).padStart(2, '0')}</Typography></span>
                  <Typography as="span" variant="bodySmall" tone="main" className="pl-node-title">{node.title}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted" className="pl-node-meta">{node.slot} · {node.hours}h</Typography>
                </button>
              );
            })}
            <div className="pl-stage pl-stage-1"><Typography as="span" variant="bodySmall" tone="light">明确目标</Typography></div>
            <div className="pl-stage pl-stage-2"><Typography as="span" variant="bodySmall" tone="light">并行收集</Typography></div>
            <div className="pl-stage pl-stage-3"><Typography as="span" variant="bodySmall" tone="light">汇总制作</Typography></div>
            <div className="pl-stage pl-stage-4"><Typography as="span" variant="bodySmall" tone="light">收尾</Typography></div>
          </div>
        </section>

        <section className="pl-detail" aria-live="polite">
          <div className="pl-time">
            <ValueTile label={parallel ? '并行后总耗时' : '顺序执行总耗时'} value={parallel ? '5.2 h' : '6.2 h'} tone={parallel ? 'success' : 'blue'} />
            <div className="pl-time-note">
              <Icon kind={parallel ? 'check' : 'clock'} size={18} />
              <Typography variant="bodySmall" tone="muted">
                {parallel ? '收集数据与整理反馈互不依赖，可同时进行，节省 1 小时。' : '每一步都要等上一步结束，收集阶段多花 1 小时。'}
              </Typography>
            </div>
          </div>

          <div className="pl-card">
            <header className="pl-card-head">
              <Typography variant="h3" tone="accent" className="pl-card-title">{active.title}</Typography>
              <span className="ag-tag">{`${active.hours} 小时`}</span>
            </header>
            <div className="pl-row">
              <Typography as="span" variant="bodySmall" tone="muted">前置条件</Typography>
              <Typography as="span" variant="body" tone="main">{active.deps.length ? active.deps.join('、') : '无，可以立即开始'}</Typography>
            </div>
            <div className="pl-row">
              <Typography as="span" variant="bodySmall" tone="muted">产出</Typography>
              <Typography as="span" variant="body" tone="main">{active.output}</Typography>
            </div>
            <div className="pl-row">
              <Typography as="span" variant="bodySmall" tone="muted">可并行</Typography>
              <Typography as="span" variant="body" tone="main">{active.parallel ? '是，与同阶段的另一步同时进行' : '否，必须在关键路径上'}</Typography>
            </div>
          </div>

          <div className="pl-hint">
            <Typography variant="bodySmall" tone="muted">
              计划要能被修改。执行结果经常推翻假设，<strong>重排步骤</strong>和<strong>放弃某条分支</strong>都应该是计划的一部分。
            </Typography>
          </div>
        </section>
      </div>
    </AgentPage>
  );
}
