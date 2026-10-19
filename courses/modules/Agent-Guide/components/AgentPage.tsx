import type { ReactNode } from 'react';
import { ContentBlock, Typography } from '@shared/react';
import './AgentPage.css';

export interface AgentPageProps {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/** Shared 1600×900 canvas for every page of this course. */
export function AgentPage({ title, subtitle, children, className, contentClassName }: AgentPageProps) {
  return (
    <article className={`ag-page${className ? ` ${className}` : ''}`}>
      <ContentBlock className="ag-block" title={title} subtitle={subtitle}>
        <div className={`ag-content${contentClassName ? ` ${contentClassName}` : ''}`}>{children}</div>
      </ContentBlock>
    </article>
  );
}

export function Takeaway({ label = '本页要点', children }: { label?: string; children: ReactNode }) {
  return (
    <div className="ag-takeaway">
      <Typography as="span" variant="bodySmall" tone="accent" className="ag-takeaway-label">{label}</Typography>
      <Typography as="span" variant="bodySmall" tone="main" className="ag-takeaway-text">{children}</Typography>
    </div>
  );
}
