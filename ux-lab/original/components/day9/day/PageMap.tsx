'use client';

import { useEffect, useRef, useState } from 'react';
import { jumpTo } from './jump';
import { useFoldStore } from '@/original/components/day9/learn/Fold';

export interface MapEntry {
  /** Anchor id of the part on the page. */
  id: string;
  /** Short code on the pill: A1, T1, … */
  code: string;
  /** Full name, shown on hover, on focus and in the small-screen list. */
  label: string;
  group: string;
  /** "Filled in" or "read": never "correct". */
  done?: boolean;
  /** Core is on the shortest path to the route's deliverable; Optional is folded and needed by no task. */
  optional?: boolean;
  /** The fold that holds this part; a jump opens it first. */
  foldKey?: string;
  /** Place on the route's path (1 to stepTotal); an Optional part has none. */
  step?: number;
  /** Draft minutes for the part (a card or a task). */
  minutes?: number;
}

/**
 * The page map of a route (UX-STANDARD 2.8, from DL #28): every Materi card and every task
 * block one click away. A slim column on wide screens; a "Jump to" button on small ones.
 * A done mark is a dot AND text, never colour alone.
 */
export function PageMap({ entries, stepTotal }: { entries: MapEntry[]; stepTotal?: number }) {
  const [current, setCurrent] = useState(entries[0]?.id ?? '');
  const [open, setOpen] = useState(false);
  const clicked = useRef(false);

  // the part in view = the last one whose top has passed ~45% of the screen
  useEffect(() => {
    const onScroll = () => {
      if (clicked.current) return;
      const line = window.innerHeight * 0.45;
      let cur = entries[0]?.id ?? '';
      for (const e of entries) {
        const el = document.getElementById(e.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        // a part inside a closed fold has no box; it is never the part in view
        if (r.width === 0 && r.height === 0) continue;
        if (r.top <= line) cur = e.id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = entries[entries.length - 1]?.id ?? cur;
      setCurrent(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [entries]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    clicked.current = true;
    setCurrent(id);
    setOpen(false);
    const fk = entries.find((e) => e.id === id)?.foldKey;
    if (fk) useFoldStore.getState().openKey(fk);
    window.setTimeout(() => jumpTo(id, { block: 'start', focus: false }), fk ? 80 : 0);
    window.setTimeout(() => (clicked.current = false), 900);
  };

  const onPath = entries.filter((e) => e.step);
  const done = onPath.filter((e) => e.done).length;
  const groups = Array.from(new Set(entries.map((e) => e.group)));
  const here = entries.find((e) => e.id === current);
  const label = here ? `${here.step && stepTotal ? `Step ${here.step} of ${stepTotal} · ` : ''}${here.code} ${here.label}` : '';

  return (
    <>
      {/* wide screens: a slim column on the right edge */}
      <nav aria-label="Page map" className="no-print fixed right-3 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {groups.map((g) => (
          <div key={g} className="flex flex-col items-end gap-1">
            <span className="mono-label text-[10px]">{g}</span>
            {entries
              .filter((e) => e.group === g)
              .map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => go(e.id)}
                  aria-current={e.id === current ? 'true' : undefined}
                  aria-label={`${e.label}${e.done ? ', done' : ''}`}
                  className={`group relative flex items-center gap-1 rounded border px-2 py-1 font-mono text-12 ${e.optional ? 'border-dashed' : ''} ${
                    e.id === current ? 'border-ink bg-ink text-white' : 'border-hairline bg-paper text-ink hover:bg-black/[0.05]'
                  }`}
                >
                  {e.done ? <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-integrity" /> : null}
                  {e.code}
                  <span className="text-[10px] opacity-70">{e.optional ? 'Optional' : e.id.startsWith('mat-') ? 'Core' : ''}</span>
                  <span className="pointer-events-none absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-12 text-white group-hover:block group-focus:block">
                    {e.step ? `Step ${e.step} · ` : ''}
                    {e.label}
                    {e.optional ? ' · optional' : e.id.startsWith('mat-') ? ' · core' : ''}
                    {e.minutes ? ` · about ${e.minutes} min` : ''}
                    {e.done ? ' · done' : ''}
                  </span>
                </button>
              ))}
          </div>
        ))}
      </nav>

      {/* smaller screens: one button, one list */}
      <div className="no-print xl:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="fixed bottom-20 right-3 z-20 rounded-full border border-ink bg-ink px-4 py-2 text-14 text-white shadow-lifted"
        >
          ☰ {label} · {done}/{onPath.length} done
        </button>
        {open ? (
          <div role="dialog" aria-label="Jump to" className="fixed bottom-32 right-3 z-20 max-h-[60vh] w-72 overflow-y-auto rounded border border-hairline bg-raised p-2 shadow-lifted">
            {groups.map((g) => (
              <div key={g}>
                <p className="mono-label px-2 pt-2">{g}</p>
                <ul>
                  {entries
                    .filter((e) => e.group === g)
                    .map((e) => (
                      <li key={e.id}>
                        <button type="button" onClick={() => go(e.id)} className={`flex min-h-[40px] w-full items-center justify-between gap-2 rounded px-2 text-left text-14 ${e.id === current ? 'bg-ink text-white' : 'hover:bg-black/[0.05]'}`}>
                          <span>
                            <span className="font-mono text-12">{e.step ? `${e.step} · ` : ''}{e.code}</span> {e.label}{' '}
                            <span className="text-12 opacity-70">{e.optional ? 'optional' : e.id.startsWith('mat-') ? 'core' : ''}{e.minutes ? ` · ${e.minutes} min` : ''}</span>
                          </span>
                          {e.done ? <span className="font-mono text-12">done</span> : null}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
