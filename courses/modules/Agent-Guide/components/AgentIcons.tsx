export type IconKind =
  | 'chat' | 'agent' | 'target' | 'eye' | 'brain' | 'wrench' | 'memory' | 'play'
  | 'check' | 'warn' | 'refresh' | 'arrow' | 'calendar' | 'search' | 'mail' | 'calc'
  | 'database' | 'code' | 'users' | 'shield' | 'close' | 'clock' | 'coin' | 'layers'
  | 'doc' | 'flag' | 'route' | 'key' | 'spark' | 'loop' | 'branch' | 'bolt';

const paths: Record<IconKind, string> = {
  chat: 'M4 5h16v11H9l-5 4V5Z',
  agent: 'M12 3v3M6 9h12v11H6zM6 13H3v5h3M18 13h3v5h-3M10 14v2M14 14v2',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  eye: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Zm10-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
  brain: 'M9.5 4a3 3 0 0 0-3 3A3 3 0 0 0 5 10a3 3 0 0 0 .6 1.8A3 3 0 0 0 6 17a3 3 0 0 0 3.5 3V4ZM14.5 4a3 3 0 0 1 3 3A3 3 0 0 1 19 10a3 3 0 0 1-.6 1.8A3 3 0 0 1 18 17a3 3 0 0 1-3.5 3V4ZM12 4v16',
  wrench: 'M14.5 3a5.5 5.5 0 0 0-4.4 8.8L3 19l2 2 7.2-7.1A5.5 5.5 0 0 0 20 9.5L17 12l-2.5-2.5 2.5-3A5.5 5.5 0 0 0 14.5 3Z',
  memory: 'M7 6h10v12H7zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h4M3 15h4M17 9h4M17 15h4M10 10h4v4h-4z',
  play: 'M8 5v14l11-7L8 5Z',
  check: 'm4 12.5 5 5L20 6.5',
  warn: 'M12 3 2.5 20h19L12 3Zm0 5v6M12 17v.5',
  refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5',
  arrow: 'M4 12h15M13 6l6 6-6 6',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  calc: 'M5 3h14v18H5zM8 7h8M8 12h2M12 12h2M16 12h.01M8 16h2M12 16h2M16 16h.01',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  code: 'm8 7-5 5 5 5M16 7l5 5-5 5M13 4l-2 16',
  users: 'M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 0 1 0 6.9M17 14.3c2.9.5 5 3 5 5.7',
  shield: 'M12 3 5 6v6c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z',
  close: 'm6 6 12 12M18 6 6 18',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l4 2',
  coin: 'M12 3a9 5 0 1 0 0 10 9 5 0 0 0 0-10ZM3 8v6c0 2.8 4 5 9 5s9-2.2 9-5V8',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5',
  doc: 'M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6',
  flag: 'M5 21V4M5 4h11l-1.5 4L16 12H5',
  route: 'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 15c0-5 10-2 10-6',
  key: 'M14 4a5 5 0 1 0 4.6 7H21v3h-2v2h-3v-2.4A5 5 0 0 1 14 4Zm-1.5 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  spark: 'M12 3v5M12 16v5M4.5 7.5l3.5 3.5M16 13l3.5 3.5M3 12h5M16 12h5M4.5 16.5 8 13M16 11l3.5-3.5',
  loop: 'M4 9a8 8 0 0 1 14-3M20 15a8 8 0 0 1-14 3M18 3v4h-4M6 21v-4h4',
  branch: 'M6 4v10a4 4 0 0 0 4 4h8M18 4v4M15 5h6M15 16l3 3-3 3M6 4a2 2 0 1 0 0-.01',
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
};

export function Icon({ kind, size = 20, className }: { kind: IconKind; size?: number; className?: string }) {
  return (
    <span className={`ag-icon${className ? ` ${className}` : ''}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[kind]} />
      </svg>
    </span>
  );
}
