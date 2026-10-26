'use client';

import { useEffect, type ReactNode } from 'react';
import { create } from 'zustand';

/**
 * Less text by default (UX-STANDARD 2.10, from DL #37): what no task needs is one quiet
 * "＋ Show …" row away. Nothing is deleted and nothing is locked. State is for this visit only
 * (not saved); "all" opens every fold on the page.
 */
interface FoldState {
  all: boolean;
  open: Record<string, boolean>;
  toggle: (key: string) => void;
  openKey: (key: string) => void;
  setAll: (v: boolean) => void;
}

export const useFoldStore = create<FoldState>()((set) => ({
  all: false,
  open: {},
  toggle: (key) => set((s) => ({ open: { ...s.open, [key]: !s.open[key] } })),
  openKey: (key) => set((s) => ({ open: { ...s.open, [key]: true } })),
  setAll: (v) => set({ all: v }),
}));

/** One button that opens or closes every fold of the page. */
export function ShowEverything() {
  const all = useFoldStore((s) => s.all);
  const setAll = useFoldStore((s) => s.setAll);
  return (
    <button
      type="button"
      aria-pressed={all}
      onClick={() => setAll(!all)}
      className="no-print rounded border border-hairline bg-raised px-3 py-1.5 text-14 hover:bg-black/[0.04]"
    >
      {all ? 'Hide the extra explanations' : 'Show every extra explanation'}
    </button>
  );
}

export function Fold({ foldKey, anchor, label, children }: { foldKey: string; anchor: string; label: string; children: ReactNode }) {
  const isOpen = useFoldStore((s) => s.all || Boolean(s.open[foldKey]));
  const toggle = useFoldStore((s) => s.toggle);
  const openKey = useFoldStore((s) => s.openKey);

  // a jump to this part (the side list, a link, the address) opens it first, then lands on it
  useEffect(() => {
    const check = () => {
      if (window.location.hash === `#${anchor}`) openKey(foldKey);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [anchor, foldKey, openKey]);

  const bodyId = `${foldKey.replace(/[^a-z0-9]+/gi, '-')}-body`;
  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={() => toggle(foldKey)}
        className="no-print flex min-h-[40px] w-full items-center gap-2 rounded border border-dashed border-hairline px-3 text-left text-14 text-ink-soft hover:border-ink hover:text-ink"
      >
        <span aria-hidden>{isOpen ? '－' : '＋'}</span>
        {isOpen ? 'Hide' : 'Show'} {label}
      </button>
      <div id={bodyId} hidden={!isOpen} className="mt-4">
        {children}
      </div>
    </div>
  );
}
