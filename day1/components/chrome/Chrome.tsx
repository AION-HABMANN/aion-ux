'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BLOCKS, ROUTE_BLOCKS, ROUTES, anchors } from '@/data/day1';
import { jumpTo } from '@/lib/flash';
import { keysOf, modelAnswers } from '@/lib/logic';
import { useHydrated, useSession, useStore } from '@/store/useStore';

const NAV = [
  { href: '/', label: 'Day 1' },
  { href: '/route-1/', label: 'Route 1 · Analyse and decide' },
  { href: '/route-2/', label: 'Route 2 · Decide' },
];

export function TopBar() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-12 max-w-[1100px] items-center justify-between gap-4 px-4 md:px-6">
        <span className="shrink-0 whitespace-nowrap font-semibold">Neuro-UX Lab</span>
        <nav aria-label="Main" className="flex gap-1 overflow-x-auto">
          {NAV.map((n) => {
            const on = n.href === '/' ? path === '/' : path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={on ? 'page' : undefined} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-caption ${on ? 'bg-ink text-paper' : 'text-ink hover:bg-canvas'}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/** The participant's name: used only for the export file name, saved only on this device. */
export function ParticipantStrip() {
  const hydrated = useHydrated();
  const name = useStore((s) => s.name);
  const setName = useStore((s) => s.setName);
  return (
    <div className="no-print flex flex-wrap items-center gap-2 py-3 text-caption">
      <label htmlFor="participant" className="smallcaps">
        Your full name
      </label>
      <input id="participant" className="field max-w-xs" value={hydrated ? name : ''} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      <span className="text-ash">Used only for the file name of your export. It stays on this device.</span>
    </div>
  );
}

/**
 * The mentor bar (CLAUDE.md #7): one quiet line above the navigation. With the passcode a reviewer can fill every model answer in
 * one go, open the facilitator cards and check both routes end to end. A convenience gate, not security.
 */
export function MentorBar() {
  const path = usePathname();
  const unlocked = useSession((s) => s.unlocked);
  const unlock = useSession((s) => s.unlock);
  const lock = useSession((s) => s.lock);
  const fill = useStore((s) => s.fill);
  const clear = useStore((s) => s.clear);
  const name = useStore((s) => s.name);
  const setName = useStore((s) => s.setName);
  const route: 1 | 2 | null = path.startsWith('/route-1') ? 1 : path.startsWith('/route-2') ? 2 : null;
  const [asking, setAsking] = useState(false);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const btn = 'rounded border border-line px-2 py-0.5 text-caption hover:bg-canvas';
  return (
    <div className="no-print border-b border-line bg-paper text-caption">
      <div className="mx-auto flex min-h-[28px] max-w-[1100px] flex-wrap items-center gap-x-3 gap-y-1 px-4 py-1 md:px-6">
        <span className="smallcaps">Mentor</span>
        {!unlocked && !asking ? (
          <button type="button" className="underline underline-offset-2" onClick={() => setAsking(true)}>
            Enter passcode to fill all model answers
          </button>
        ) : null}
        {!unlocked && asking ? (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setMsg(unlock(code) ? '' : 'Wrong passcode.');
              if (useSession.getState().unlocked) setAsking(false);
              setCode('');
            }}
          >
            <label htmlFor="mentor-code" className="sr-only">
              Mentor passcode
            </label>
            <input id="mentor-code" type="password" value={code} onChange={(e) => setCode(e.target.value)} autoFocus autoComplete="off" className="w-36 rounded border border-line bg-paper px-2 py-0.5" />
            <button type="submit" className={btn}>
              Go
            </button>
            <button type="button" className={btn} onClick={() => { setAsking(false); setMsg(''); }}>
              Cancel
            </button>
          </form>
        ) : null}
        {unlocked ? (
          <>
            <button
              type="button"
              className={btn}
              onClick={() => {
                fill(modelAnswers(BLOCKS));
                if (!name) setName('Demo participant');
                setMsg('Model answers filled. They are drafts, except block 2.1, which follows the plan’s Musterlösung.');
              }}
            >
              Fill all model answers
            </button>
            {route ? (
              <>
                <button type="button" className={btn} onClick={() => jumpTo(anchors.export(route), { block: 'start', focus: false })}>
                  Jump to this route’s export
                </button>
                <button
                  type="button"
                  className={btn}
                  onClick={() => {
                    clear(keysOf(ROUTE_BLOCKS[route]));
                    setMsg(`Route ${route} cleared.`);
                  }}
                >
                  Clear this route
                </button>
              </>
            ) : null}
            <button type="button" className={btn} onClick={lock}>
              Lock
            </button>
          </>
        ) : null}
        <span role="status" aria-live="polite" className="text-ash">
          {msg}
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="no-print mt-8 border-t border-line bg-paper py-4 text-caption text-ash">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        {ROUTES[1].deliverable} and {ROUTES[2].deliverable}. The cases are fictional; their figures are the plan’s own. Your answers stay on this device.
      </div>
    </footer>
  );
}
