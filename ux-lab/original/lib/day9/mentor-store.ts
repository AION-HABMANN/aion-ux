'use client';

import { create } from 'zustand';

/**
 * The mentor gate (CLAUDE.md #7): a convenience so that a reviewer can check the day end to end
 * without typing the answers. The passcode lives in client code, so this is NOT security and the UI
 * never says it is. The flag is session-only (not persisted): a reload locks it again.
 */
const PASSCODE = 'muchson123';

interface MentorState {
  unlocked: boolean;
  unlock: (code: string) => boolean;
  lock: () => void;
}

export const useMentorStore = create<MentorState>()((set) => ({
  unlocked: false,
  unlock: (code) => {
    const ok = code === PASSCODE;
    if (ok) set({ unlocked: true });
    return ok;
  },
  lock: () => set({ unlocked: false }),
}));
