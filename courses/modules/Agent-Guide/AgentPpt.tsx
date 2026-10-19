import '@shared/react/styles.css';
import '@shared/react/ui-kit.css';
import './AgentGuide.css';
import { SceneDeck, type DeckDefinition } from '@shared/react/presentation';
import { FromChatToAgentPage } from './pages/FromChatToAgentPage';
import { WhatCountsPage } from './pages/WhatCountsPage';
import { TheLoopPage } from './pages/TheLoopPage';
import { ModelIsNotAllPage } from './pages/ModelIsNotAllPage';
import { SixModulesPage } from './pages/SixModulesPage';
import { PerceptionPage } from './pages/PerceptionPage';
import { PlanningPage } from './pages/PlanningPage';
import outline from './outlines.json';

const sections = ['从聊天到行动', '从聊天到行动', '运行闭环', '模块框架', '模块框架', '模块拆解', '模块拆解'];

export const deck: DeckDefinition = {
  id: outline.id,
  title: outline.title,
  subtitle: `Agent 概念入门 · ${outline.pages.length} 页`,
  scenes: [
    { id: 'from-chat-to-agent', title: outline.pages[0].title, section: sections[0], render: () => <FromChatToAgentPage /> },
    { id: 'what-counts', title: outline.pages[1].title, section: sections[1], render: () => <WhatCountsPage /> },
    { id: 'the-loop', title: outline.pages[2].title, section: sections[2], render: () => <TheLoopPage /> },
    { id: 'model-is-not-all', title: outline.pages[3].title, section: sections[3], render: () => <ModelIsNotAllPage /> },
    { id: 'six-modules', title: outline.pages[4].title, section: sections[4], render: () => <SixModulesPage /> },
    { id: 'perception', title: outline.pages[5].title, section: sections[5], render: () => <PerceptionPage /> },
    { id: 'planning', title: outline.pages[6].title, section: sections[6], render: () => <PlanningPage /> },
  ],
};

export const getPptNotes = (sceneId: string) => [
  {
    text: outline.pages.find(page => page.id === sceneId)?.snippet ?? '',
    selectors: ['.ag-page'],
  },
];

export function AgentPpt() {
  return (
    <SceneDeck
      catalog={[deck]}
      moduleId={outline.id}
      assetId="6a0b31af-d41f-476f-86cb-af9ec7ba5f03"
      progressKey="lesson-flow:agent-guide-v1"
      getNotes={getPptNotes}
    />
  );
}
