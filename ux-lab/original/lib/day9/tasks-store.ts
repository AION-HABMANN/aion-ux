'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { keysOf, type Answers } from './tasks-logic';
import type { TaskDef } from '../../data/day9/tasks';

/**
 * The learner's written answers for Day 9, kept on this device only.
 * A separate store from the Activation Lab one (key `activation-lab`) so the existing
 * persisted shape is untouched; to be merged into one course store later
 * (UX-STANDARD section 1, "one persisted store, one slice per day").
 */
interface TasksState {
  answers: Answers;
  hydrated: boolean;
  setAnswer: (key: string, value: string) => void;
  clearAll: () => void;
  /** Mentor fill: writes many answers at once. */
  fillAll: (answers: Answers) => void;
  /** Clears the answers of the given tasks only (one route). */
  clearTasks: (ids: readonly TaskDef['id'][]) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      answers: {},
      hydrated: false,
      setAnswer: (key, value) => set((s) => ({ answers: { ...s.answers, [key]: value } })),
      clearAll: () => set({ answers: {} }),
      fillAll: (a) => set((s) => ({ answers: { ...s.answers, ...a } })),
      clearTasks: (ids) =>
        set((s) => {
          const drop = new Set(keysOf(ids));
          return { answers: Object.fromEntries(Object.entries(s.answers).filter(([k]) => !drop.has(k))) };
        }),
    }),
    {
      name: 'aion-ux-day9-tasks',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ answers: s.answers }) as unknown as TasksState,
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
        useTasksStore.setState({ hydrated: true });
      },
    },
  ),
);
