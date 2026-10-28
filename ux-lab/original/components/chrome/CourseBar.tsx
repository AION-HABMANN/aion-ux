'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * The slim bar above every original day: the way back to the Neuro-UX Lab and to the day's Route 3 · Extra, where the original lives.
 * Styled inline on purpose: every original day ships its own stylesheet (its own Tailwind config), so this bar must
 * not depend on any day's classes. Links into the lab are plain <a>: the lab has another root layout, so the move
 * is a full page load either way.
 */
const bar: React.CSSProperties = {
  background: '#0B1220',
  color: '#C8D4E4',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontSize: 14,
  lineHeight: 1.4,
};
const inner: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
  maxWidth: 1280,
  margin: '0 auto',
  padding: '8px 16px',
};
const link: React.CSSProperties = { color: 'inherit', textDecoration: 'none' };
const tag: React.CSSProperties = {
  marginLeft: 'auto',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: 999,
  padding: '1px 10px',
  fontSize: 12,
};

export function CourseBar() {
  const pathname = usePathname() ?? '';
  const day = pathname.match(/^\/day\/(\d+)\//)?.[1];
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <div style={bar} className="no-print">
      <div style={inner}>
        <a href={`${base}/`} style={{ ...link, fontWeight: 600 }}>
          Neuro-UX Lab
        </a>
        {day && (
          <>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>
              /
            </span>
            <a href={`${base}/day/${day}/route-3/`} style={{ ...link, opacity: 0.85 }}>
              Day {day} · Extra
            </a>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>
              /
            </span>
            <Link href={`/day/${day}/original/`} style={link}>
              Original idea
            </Link>
          </>
        )}
        <span style={tag}>As first built · not yet on the lab standard</span>
      </div>
    </div>
  );
}
