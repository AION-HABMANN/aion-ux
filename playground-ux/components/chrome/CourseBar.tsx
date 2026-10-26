import Link from 'next/link';

/**
 * The slim bar above every day: one way back to the sixteen days.
 * Styled inline on purpose: every day ships its own stylesheet (its own Tailwind
 * config), so this bar must not depend on any day's classes.
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
  alignItems: 'center',
  gap: 12,
  maxWidth: 1280,
  margin: '0 auto',
  padding: '8px 16px',
};
const link: React.CSSProperties = { color: 'inherit', textDecoration: 'none' };

export function CourseBar() {
  return (
    <div style={bar} className="no-print">
      <div style={inner}>
        <Link href="/" style={{ ...link, fontWeight: 600 }}>
          AION UX class
        </Link>
        <span aria-hidden="true" style={{ opacity: 0.4 }}>
          /
        </span>
        <Link href="/" style={{ ...link, opacity: 0.8 }}>
          All days
        </Link>
      </div>
    </div>
  );
}
