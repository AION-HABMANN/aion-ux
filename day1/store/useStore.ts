'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

/**
 * One persisted slice for the whole day (nothing is sent anywhere): the participant's name (used only for the export file name),
 * the answers, and which cards are marked read. "Read" means filled in, never "correct" (DL #28).
 */
interface DayState {
  name: string;
  answers: Record<string, string>;
  read: Record<string, boolean>;
  setName: (n: string) => void;
  setAnswer: (key: string, v: string) => void;
  fill: (a: Record<string, string>) => void;
  clear: (keys: string[]) => void;
  markRead: (id: string, v?: boolean) => void;
}

export const useStore = create<DayState>()(
  persist(
    (set) => ({
      name: '',
      answers: {},
      read: {},
      setName: (name) => set({ name }),
      setAnswer: (key, v) => set((s) => ({ answers: { ...s.answers, [key]: v } })),
      fill: (a) => set((s) => ({ answers: { ...s.answers, ...a } })),
      clear: (keys) =>
        set((s) => {
          const answers = { ...s.answers };
          for (const k of keys) delete answers[k];
          return { answers };
        }),
      markRead: (id, v = true) => set((s) => ({ read: { ...s.read, [id]: v } })),
    }),
    { name: 'aion-ux-day1', version: 1 },
  ),
);

/** True once the persisted state has been read on the client (avoids a hydration mismatch). */
export function useHydrated(): boolean {
  const [h, setH] = useState(false);
  useEffect(() => {
    const done = () => setH(true);
    if (useStore.persist.hasHydrated()) done();
    const off = useStore.persist.onFinishHydration(done);
    return off;
  }, []);
  return h;
}

/** Session-only state, never saved: the mentor passcode (CLAUDE.md #7) and which folds and cards are open. */
interface SessionState {
  unlocked: boolean;
  unlock: (code: string) => boolean;
  lock: () => void;
  open: Record<string, boolean>;
  toggle: (k: string) => void;
  openKey: (k: string) => void;
}
export const useSession = create<SessionState>()((set) => ({
  unlocked: false,
  unlock: (code) => {
    const ok = code === 'muchson123';
    if (ok) set({ unlocked: true });
    return ok;
  },
  lock: () => set({ unlocked: false }),
  open: {},
  toggle: (k) => set((s) => ({ open: { ...s.open, [k]: !s.open[k] } })),
  openKey: (k) => set((s) => ({ open: { ...s.open, [k]: true } })),
}));
