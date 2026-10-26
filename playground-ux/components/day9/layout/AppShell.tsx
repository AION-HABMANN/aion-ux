'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { copy } from '@/data/day9/copy';
import { useStore } from '@/lib/day9/store';
import { InspectorProvider, useInspector } from '@/components/day9/inspector/InspectorProvider';
import { InspectorPanel } from '@/components/day9/inspector/InspectorPanel';
import { MotivationConsole } from '@/components/day9/console/MotivationConsole';
import { Notifier } from '@/components/day9/gamification/Notifier';
import { DarkPatternLayer } from '@/components/day9/gamification/DarkPatternLayer';
import { cx } from '@/components/day9/ui';
import { MentorBar } from '@/components/day9/layout/MentorBar';
import { NAV_ACTIVE, ROUTES } from '@/data/day9/routes';

const HOME = '/day/9/';

/** The bar has exactly these entries (UX-STANDARD 2.8): the day, the two routes, and Extra. */
const NAV = [
  { key: 'home', href: HOME, label: 'Day 9' },
  { key: 'route-1', href: '/day/9/route-1/', label: ROUTES[0].navLabel },
  { key: 'route-2', href: '/day/9/route-2/', label: ROUTES[1].navLabel },
  { key: 'extra', href: '/day/9/extra/', label: 'Extra' },
];

function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-paper/85 backdrop-blur no-print">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <Link href={HOME} className="shrink-0">
          <span className="font-display text-16 font-semibold tracking-tight">
            {copy.app.title}
          </span>
        </Link>
        <nav aria-label="Primary" className="flex-1 overflow-x-auto scrollbar-thin">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                item.key === 'home'
                  ? pathname.replace(/\/$/, '') === HOME.replace(/\/$/, '')
                  : NAV_ACTIVE[item.key].some((prefix) => pathname.startsWith(prefix));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      'block whitespace-nowrap rounded px-3 py-1.5 text-14 transition-colors',
                      active
                        ? 'bg-ink text-white'
                        : 'text-ink-soft hover:bg-black/[0.04] hover:text-ink'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link
          href="/day/9/inspector"
          className="hidden shrink-0 font-mono text-12 uppercase tracking-wider sm:block"
          style={{ color: 'var(--inspect-text)' }}
        >
          ⌕ {copy.nav.inspector}
        </Link>
      </div>
    </header>
  );
}

function InspectorBody({ children }: { children: ReactNode }) {
  const { enabled } = useInspector();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-inspector', enabled ? 'on' : 'off');
  }, [enabled]);

  return <>{children}</>;
}

/** Records where the learner was, so the resume line can be specific (§5.3 #23). */
function RouteMemory() {
  const pathname = usePathname();
  const setLastRoute = useStore((s) => s.setLastRoute);
  useEffect(() => {
    setLastRoute(pathname);
  }, [pathname, setLastRoute]);
  return null;
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <InspectorProvider>
      <InspectorBody>
        <RouteMemory />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {copy.nav.skipToContent}
        </a>
        <MentorBar />
        <Header />
        <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          {children}
        </main>
        <MotivationConsole />
        <InspectorPanel />
        <Notifier />
        <DarkPatternLayer />
      </InspectorBody>
    </InspectorProvider>
  );
}
