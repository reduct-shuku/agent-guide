import { useState } from 'react';
import { Button, Switch, Typography } from '@shared/react';
import { AgentPage, Takeaway } from '../components/AgentPage';
import { Icon, type IconKind } from '../components/AgentIcons';
import './ModelIsNotAllPage.css';

const plainSteps: Array<{ icon: IconKind; title: string; text: string }> = [
  { icon: 'doc', title: '请求', text: '“订下周三去上海的高铁，靠窗。”' },
  { icon: 'brain', title: '模型', text: '生成一段回复' },
  { icon: 'chat', title: '文本', text: '“请打开 12306 选择车次……”' },
];

const fullSteps: Array<{ icon: IconKind; title: string; text: string }> = [
  { icon: 'doc', title: '请求', text: '同一句话' },
  { icon: 'brain', title: '模型', text: '决定先读日历' },
  { icon: 'wrench', title: '工具', text: 'calendar.read()' },
  { icon: 'refresh', title: '观察', text: '下周三 14:00 空闲' },
  { icon: 'brain', title: '模型', text: '决定查车次并下单' },
  { icon: 'check', title: '结果', text: '订单号 + 行程' },
];

export function ModelIsNotAllPage() {
  const [connected, setConnected] = useState(false);
  const [run, setRun] = useState(0);

  return (
    <AgentPage
      title="大模型是大脑，但不是 Agent 的全部"
      subtitle="同一个模型，放在聊天框里只能给建议；接上工具与状态，才可能把建议变成结果。"
    >
      <div className="mna-main">
        <section className={`mna-lane${connected ? ' is-dim' : ''}`} aria-label="只有模型的链路">
          <header className="mna-lane-head">
            <span className="mna-lane-icon"><Icon kind="brain" size={18} /></span>
            <Typography variant="h3" tone="main">只有模型</Typography>
            <span className="ag-tag ag-tag-orange mna-lane-tag">停在文本</span>
          </header>
          <div className="mna-flow" key={`plain-${run}`}>
            {plainSteps.map((item, index) => (
              <div className="mna-step-wrap" key={item.title}>
                <div className="mna-step mna-step-plain" style={{ animationDelay: `${index * 80}ms` }}>
                  <Icon kind={item.icon} size={20} />
                  <Typography as="span" variant="bodySmall" tone="main" className="mna-step-title">{item.title}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted" className="mna-step-text">{item.text}</Typography>
                </div>
                {index < plainSteps.length - 1 && <span className="mna-arrow"><Icon kind="arrow" size={16} /></span>}
              </div>
            ))}
          </div>
          <div className="mna-stop">
            <Icon kind="close" size={15} />
            <Typography as="span" variant="bodySmall" tone="danger">中断：无法读取日历，也无法下单</Typography>
            <Typography as="span" variant="bodySmall" tone="muted" className="mna-stop-note">模型只能把步骤写给你</Typography>
          </div>
        </section>

        <section className={`mna-lane${connected ? ' is-on' : ' is-off'}`} aria-label="接上模块后的链路">
          <header className="mna-lane-head">
            <span className="mna-lane-icon mna-lane-icon-agent"><Icon kind="agent" size={18} /></span>
            <Typography variant="h3" tone="main">模型 + 工具与状态</Typography>
            <span className="ag-tag ag-tag-green mna-lane-tag">闭环</span>
          </header>
          <div className={`mna-flow mna-flow-full${connected ? '' : ' is-gated'}`} key={`full-${run}-${connected}`}>
            {fullSteps.map((item, index) => (
              <div className="mna-step-wrap" key={`${item.title}-${index}`}>
                <div className={`mna-step${connected ? ' mna-step-live' : ''}`} style={{ animationDelay: `${index * 90}ms` }}>
                  <Icon kind={item.icon} size={20} />
                  <Typography as="span" variant="bodySmall" tone="main" className="mna-step-title">{item.title}</Typography>
                  <Typography as="span" variant="bodySmall" tone="muted" className="mna-step-text">{item.text}</Typography>
                </div>
                {index < fullSteps.length - 1 && <span className="mna-arrow"><Icon kind="arrow" size={16} /></span>}
              </div>
            ))}
          </div>
          {!connected && (
            <div className="mna-gate">
              <Icon kind="key" size={15} />
              <Typography as="span" variant="bodySmall" tone="muted">工具与状态尚未接入，链路停在这里</Typography>
            </div>
          )}
        </section>
      </div>

      <div className="mna-controls">
        <Switch
          label={<Typography as="span" variant="bodySmall" tone="main">接上工具、状态与结果回传</Typography>}
          checked={connected}
          onChange={event => setConnected(event.target.checked)}
        />
        <Button variant="primary" onClick={() => setRun(value => value + 1)}>运行一次</Button>
        <div className="mna-result" aria-live="polite">
          <Typography as="span" variant="bodySmall" tone={connected ? 'success' : 'danger'}>
            {connected
              ? '任务完成：模型做了 4 次决策，执行器做了 4 次动作，最终返回订单号。'
              : '任务中断：模型知道要查日历，但没有接口能读到日历，只能把步骤写给你。'}
          </Typography>
        </div>
      </div>

      <Takeaway>
        模型负责<strong>决定做什么</strong>，工具、状态与反馈负责<strong>让它做得到、看得见</strong>。缺了后者，再强的模型也只是顾问。
      </Takeaway>
    </AgentPage>
  );
}
