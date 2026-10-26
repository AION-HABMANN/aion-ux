'use client';

import { useEffect, useRef, useState } from 'react';
import { jumpTo } from '@/lib/flash';

export interface MapEntry {
  id: string;
  code: string;
  label: string;
  group: string;
  /** "Filled in" or "read", never "correct". */
  done?: boolean;
  minutes?: number;
}

/**
 * The page map (CLAUDE.md #28): every card and every block of the route, one click away. A slim column on wide screens, one
 * "Jump to" button on small ones. Core is written on the pill itself, never only in a tooltip (#35); a done mark is text, not colour alone.
 */
export function PageMap({ entries }: { entries: MapEntry[] }) {
  const [current, setCurrent] = useState(entries[0]?.id ?? '');
  const [open, setOpen] = useState(false);
  const clicked = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (clicked.current) return;
      const line = window.innerHeight * 0.4;
      let cur = entries[0]?.id ?? '';
      for (const e of entries) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top <= line) cur = e.id;
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
    jumpTo(id, { block: 'start', focus: false });
    window.setTimeout(() => (clicked.current = false), 900);
  };

  const groups = Array.from(new Set(entries.map((e) => e.group)));
  const doneCount = entries.filter((e) => e.done).length;
  const here = entries.find((e) => e.id === current);
  const coreWord = (e: MapEntry) => (e.group === 'Materi' || e.group === 'Tasks' ? 'Core' : '');

  return (
    <>
      <nav aria-label="Page map" className="no-print fixed right-3 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {groups.map((g) => (
          <div key={g} className="flex flex-col items-end gap-1">
            <span className="text-micro font-semibold uppercase text-ash">{g}</span>
            {entries
              .filter((e) => e.group === g)
              .map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => go(e.id)}
                  aria-current={e.id === current ? 'true' : undefined}
                  aria-label={`${e.label}${coreWord(e) ? ', core' : ''}${e.minutes ? `, about ${e.minutes} minutes` : ''}${e.done ? ', done' : ''}`}
                  className={`group relative flex items-center gap-1 rounded border px-2 py-1 text-caption ${e.id === current ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ash'}`}
                >
                  {e.done ? <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal" /> : null}
                  {e.code}
                  <span className="text-micro opacity-70">{coreWord(e)}</span>
                  <span className="pointer-events-none absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-caption text-paper group-hover:block group-focus:block">
                    {e.label}
                    {e.minutes ? ` · about ${e.minutes} min` : ''}
                    {e.done ? ' · done' : ''}
                  </span>
                </button>
              ))}
          </div>
        ))}
      </nav>

      <div className="no-print xl:hidden">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="fixed bottom-4 right-3 z-20 max-w-[85vw] rounded-full border border-ink bg-ink px-4 py-2 text-caption text-paper shadow-lg">
          ☰ {here ? `${here.code} ${here.label}` : 'Jump to'} · {doneCount}/{entries.length} done
        </button>
        {open ? (
          <div role="dialog" aria-label="Jump to" className="fixed bottom-16 right-3 z-20 max-h-[60vh] w-72 overflow-y-auto rounded-lg border border-line bg-paper p-2 shadow-lg">
            {groups.map((g) => (
              <div key={g}>
                <p className="smallcaps px-2 pt-2">{g}</p>
                <ul>
                  {entries
                    .filter((e) => e.group === g)
                    .map((e) => (
                      <li key={e.id}>
                        <button type="button" onClick={() => go(e.id)} className={`flex min-h-[40px] w-full items-center justify-between gap-2 rounded px-2 text-left text-caption ${e.id === current ? 'bg-ink text-paper' : 'hover:bg-canvas'}`}>
                          <span>
                            <strong>{e.code}</strong> {e.label} <span className="opacity-70">{coreWord(e).toLowerCase()}{e.minutes ? ` · ${e.minutes} min` : ''}</span>
                          </span>
                          {e.done ? <span>done</span> : null}
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
