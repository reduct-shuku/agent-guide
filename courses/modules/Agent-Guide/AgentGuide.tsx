import '@shared/react/styles.css';
import '@shared/react/ui-kit.css';
import './AgentGuide.css';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { FromChatToAgentPage } from './pages/FromChatToAgentPage';
import { WhatCountsPage } from './pages/WhatCountsPage';
import { TheLoopPage } from './pages/TheLoopPage';
import { ModelIsNotAllPage } from './pages/ModelIsNotAllPage';
import { SixModulesPage } from './pages/SixModulesPage';
import { PerceptionPage } from './pages/PerceptionPage';
import { PlanningPage } from './pages/PlanningPage';

function GuideCanvas({ children, id }: { children: ReactNode; id: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const node = frame.current;
    if (!node) return;
    const update = () => setScale(Math.min(1, node.clientWidth / 1600));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} id={id} className="ag-guide-frame" style={{ height: 900 * scale }}>
      <div className="ag-guide-surface" style={{ transform: `scale(${scale})` }}>{children}</div>
    </div>
  );
}

export function AgentGuide() {
  return (
    <main className="ag-guide">
      <GuideCanvas id="from-chat-to-agent"><FromChatToAgentPage /></GuideCanvas>
      <GuideCanvas id="what-counts"><WhatCountsPage /></GuideCanvas>
      <GuideCanvas id="the-loop"><TheLoopPage /></GuideCanvas>
      <GuideCanvas id="model-is-not-all"><ModelIsNotAllPage /></GuideCanvas>
      <GuideCanvas id="six-modules"><SixModulesPage /></GuideCanvas>
      <GuideCanvas id="perception"><PerceptionPage /></GuideCanvas>
      <GuideCanvas id="planning"><PlanningPage /></GuideCanvas>
    </main>
  );
}
