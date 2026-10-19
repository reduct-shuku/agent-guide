import { useState } from 'react';
import { RangeControl, Typography } from '@shared/react';
import { AgentPage, Takeaway } from '../components/AgentPage';
import { Icon, type IconKind } from '../components/AgentIcons';
import './WhatCountsPage.css';

const conditions: Array<{ icon: IconKind; title: string; text: string; ask: string }> = [
  { icon: 'target', title: '有明确目标', text: '目标可以被验收：做完与没做完有清楚的区别。', ask: '怎么判断这件事完成了？' },
  { icon: 'eye', title: '能感知环境', text: '能读到环境的变化：文件、接口、页面、用户反馈。', ask: '它从哪里知道现在发生了什么？' },
  { icon: 'route', title: '能自主选择', text: '在一定范围内自己决定下一步，而不是每一步都由人指定。', ask: '下一步是谁决定的？' },
];

const bands = [
  { id: 'tool', min: 0, max: 32, name: '工具', control: '人决定每一步', example: '翻译器、格式转换、表单校验', risk: '只能处理预期内的输入' },
  { id: 'assistant', min: 33, max: 66, name: '助手', control: '人设定流程，模型在流程内选择', example: '客服问答、代码补全、写作助手', risk: '超出流程范围就退回人工' },
  { id: 'agent', min: 67, max: 100, name: 'Agent', control: '模型决定下一步，人设定目标与边界', example: '线上排障、旅行规划、自动调研', risk: '成本、越权与难以复现' },
];

const examples = [
  { name: '翻译器', value: 8 },
  { name: '表单校验', value: 15 },
  { name: '代码补全', value: 38 },
  { name: '客服问答', value: 51 },
  { name: '旅行规划', value: 74 },
  { name: '线上排障', value: 90 },
];

export function WhatCountsPage() {
  const [value, setValue] = useState(74);
  const band = bands.find(item => value >= item.min && value <= item.max) ?? bands[2];

  return (
    <AgentPage
      title="什么才算 Agent：目标、环境与自主性"
      subtitle="不必先记定义。用三个问题筛一遍，再看“自主”到底交给了谁。"
    >
      <div className="wc-main">
        <section className="wc-conditions" aria-label="三个判断条件">
          {conditions.map((item, index) => (
            <div className="wc-condition" key={item.title}>
              <span className="wc-condition-icon"><Icon kind={item.icon} size={22} /></span>
              <div className="wc-condition-copy">
                <Typography variant="h3" tone="main">{`${index + 1}. ${item.title}`}</Typography>
                <Typography variant="bodySmall" tone="muted">{item.text}</Typography>
              </div>
              <Typography as="span" variant="bodySmall" tone="accent" className="wc-condition-ask">{item.ask}</Typography>
            </div>
          ))}
          <div className="wc-counter">
            <Typography variant="bodySmall" tone="muted">用这三个问题看几个常见系统：</Typography>
            <div className="wc-counter-row">
              <Typography as="span" variant="bodySmall" tone="main">聊天机器人</Typography>
              <Typography as="span" variant="bodySmall" tone="muted">缺目标：没有可验收的完成条件</Typography>
            </div>
            <div className="wc-counter-row">
              <Typography as="span" variant="bodySmall" tone="main">自动化脚本</Typography>
              <Typography as="span" variant="bodySmall" tone="muted">缺自主：每一步都被写死</Typography>
            </div>
            <div className="wc-counter-row">
              <Typography as="span" variant="bodySmall" tone="main">搜索引擎</Typography>
              <Typography as="span" variant="bodySmall" tone="muted">缺行动：只返回候选，不改变环境</Typography>
            </div>
          </div>
          <div className="wc-verdict">
            <Icon kind="check" size={18} />
            <Typography variant="bodySmall" tone="main">三个条件不必都很强，但<strong>缺一个就不是 Agent</strong>：没有目标只是工具，读不到环境只能空想，不能选择就只是脚本。</Typography>
          </div>
        </section>

        <section className="wc-spectrum" aria-label="自主性光谱">
          <div className="wc-spectrum-head">
            <div>
              <Typography variant="bodySmall" tone="muted" className="wc-eyebrow">自主性光谱</Typography>
              <Typography variant="h3" tone="accent" className="wc-band-name">{band.name}</Typography>
            </div>
            <span className={`wc-band-badge wc-band-${band.id}`}>
              <Typography as="span" variant="bodySmall" tone="inherit">{`${band.min}–${band.max}`}</Typography>
            </span>
          </div>

          <div className="wc-slider">
            <RangeControl
              label="自主性"
              min={0}
              max={100}
              step={1}
              value={value}
              onChange={event => setValue(Number(event.target.value))}
              suffix=" / 100"
            />
            <div className="wc-track-labels" aria-hidden="true">
              <Typography as="span" variant="bodySmall" tone="muted">固定映射</Typography>
              <Typography as="span" variant="bodySmall" tone="muted">有限选择</Typography>
              <Typography as="span" variant="bodySmall" tone="muted">自主循环</Typography>
            </div>
          </div>

          <div className="wc-detail">
            <div className="wc-detail-row">
              <Typography as="span" variant="bodySmall" tone="muted">控制权</Typography>
              <Typography as="span" variant="body" tone="main">{band.control}</Typography>
            </div>
            <div className="wc-detail-row">
              <Typography as="span" variant="bodySmall" tone="muted">典型系统</Typography>
              <Typography as="span" variant="body" tone="main">{band.example}</Typography>
            </div>
            <div className="wc-detail-row">
              <Typography as="span" variant="bodySmall" tone="muted">主要代价</Typography>
              <Typography as="span" variant="body" tone="main">{band.risk}</Typography>
            </div>
          </div>

          <div className="wc-examples">
            <Typography variant="bodySmall" tone="muted">把常见系统放到光谱上：</Typography>
            <div className="wc-example-row">
              {examples.map(item => (
                <button
                  key={item.name}
                  type="button"
                  className={`wc-example${item.value === value ? ' is-active' : ''}`}
                  onClick={() => setValue(item.value)}
                >
                  <Typography as="span" variant="bodySmall" tone="inherit">{item.name}</Typography>
                </button>
              ))}
            </div>
          </div>
          <div className="wc-tip">
            <Typography variant="bodySmall" tone="muted">
              自主性由<strong>任务</strong>决定，不由产品名决定。同一个助手，一旦开放工具与循环，就可能跨过 Agent 的边界。
            </Typography>
          </div>
        </section>
      </div>

      <Takeaway>
        “是不是 Agent”不是一个是非题，而是<strong>目标、环境、自主性</strong>三者的组合；自主性越高，能力越强，代价也越大。
      </Takeaway>
    </AgentPage>
  );
}
