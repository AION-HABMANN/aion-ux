"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FREE_SPECS } from "@/data/free/registry";
import { freeRouteKey } from "@/lib/dayFree/mentor";
import { emptyFreeDay, emptyFreeDayRoute } from "@/store/dayTypesStd";
import type { FreeState } from "@/store/dayTypesFree";
import type { RouteNo } from "@/data/course";
import { materialsOf } from "@/data/materialRegistry";

/**
 * One persisted store for the whole course (one Next.js project, Days 1 to 12), as in Digital Learning (CLAUDE.md #9): one slice per day (`d1` … `d12`), each
 * holding its two routes (`r1`, `r2`) in the free-form shape (store/dayTypesFree.ts). A change to the persisted shape bumps `version`, adds a step to
 * `migratePersisted` and is covered by the deep `merge`. Nothing leaves the browser.
 */
export const STORAGE_KEY = "ux-lab-v1";
export const PERSIST_VERSION = 1;

/** 0 means not chosen yet; 1 Low, 2 Mid, 3 High. */
export type Score = 0 | 1 | 2 | 3;

export const UX_DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type DayKey = `d${(typeof UX_DAYS)[number]}`;

export type Persisted = {
  participant: { name: string };
  ui: { bannerDismissed: Record<string, boolean>; sectionsRead: Record<string, boolean>; lang: "en" | "de" };
} & Record<DayKey, FreeState>;

type Session = { mentorUnlocked: boolean; resetCount: number };
type Patch<T> = Partial<T> | ((s: T) => Partial<T>);

type Actions = {
  setParticipant: (patch: Partial<Persisted["participant"]>) => void;
  dismissBanner: (key: string) => void;
  toggleRead: (cardKey: string, value?: boolean) => void;
  setLang: (l: "en" | "de") => void;
  patchStd: (day: number, route: RouteNo, p: Patch<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  setMentorUnlocked: (v: boolean) => void;
  mentorFill: (day: number) => void;
  resetRoute: (day: number, route: RouteNo | null) => void;
};

export const emptyPersisted = (): Persisted =>
  ({
    participant: { name: "" },
    ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" },
    ...Object.fromEntries(UX_DAYS.map((d) => [`d${d}`, emptyFreeDay(d)])),
  }) as Persisted;

const resolve = <T,>(p: Patch<T>, cur: T): Partial<T> => (typeof p === "function" ? (p as (s: T) => Partial<T>)(cur) : p);
const isPlain = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && Object.getPrototypeOf(v) === Object.prototype;

/**
 * A deep merge of a saved value onto the defaults: every field an older or partial blob lacks comes from the defaults, a value of the wrong type is dropped,
 * and an empty default array or object takes what was saved (rows a learner added to a guided table are kept).
 */
export function mergeDefaults<T>(base: T, saved: unknown): T {
  if (saved === undefined || saved === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(saved)) return base;
    if (base.length === 0) return saved as T;
    return Array.from({ length: Math.max(base.length, saved.length) }, (_, i) => mergeDefaults(base[Math.min(i, base.length - 1)], saved[i])) as T;
  }
  if (isPlain(base)) {
    if (!isPlain(saved)) return base;
    const keys = Object.keys(base);
    if (keys.length === 0) return { ...saved } as T;
    const out: Record<string, unknown> = { ...(saved as Record<string, unknown>) };
    for (const k of keys) out[k] = mergeDefaults((base as Record<string, unknown>)[k], (saved as Record<string, unknown>)[k]);
    return out as T;
  }
  return typeof saved === typeof base || base === null ? (saved as T) : base;
}

/** Version 1 is the first shape; a later version adds its step here. A blob that lacks a day gets an empty one. */
export function migratePersisted(persisted: unknown): Persisted {
  const p = (persisted ?? {}) as Partial<Persisted>;
  return mergeDefaults(emptyPersisted(), p);
}

/** The mentor fill also marks every study card of the day as read, so the progress ring of both routes reaches its total after one fill (CLAUDE.md #7). */
const readUi = (s: { ui: Persisted["ui"] }, day: number): Persisted["ui"] => {
  const m = materialsOf(day);
  return { ...s.ui, sectionsRead: { ...s.ui.sectionsRead, ...Object.fromEntries(m.MATERIALS.map((c) => [m.readKey(c.id), true])) } };
};

export const useStore = create<Persisted & Session & Actions>()(
  persist(
    (set) => ({
      ...emptyPersisted(),
      mentorUnlocked: false,
      resetCount: 0,

      setParticipant: (patch) => set((s) => ({ participant: { ...s.participant, ...patch } })),
      dismissBanner: (key) => set((s) => ({ ui: { ...s.ui, bannerDismissed: { ...s.ui.bannerDismissed, [key]: true } } })),
      toggleRead: (cardKey, value) => set((s) => ({ ui: { ...s.ui, sectionsRead: { ...s.ui.sectionsRead, [cardKey]: value ?? !s.ui.sectionsRead[cardKey] } } })),
      setLang: (l) => set((s) => ({ ui: { ...s.ui, lang: l } })),

      patchStd: (day, route, p) =>
        set((s) => {
          const key = `d${day}` as DayKey;
          const slice = s[key];
          if (!slice) return {};
          const rk = route === 1 ? "r1" : "r2";
          const cur = slice[rk] as unknown as Record<string, unknown>;
          return { [key]: { ...slice, [rk]: { ...cur, ...resolve(p, cur) } } } as Partial<Persisted>;
        }),

      setMentorUnlocked: (v) => set({ mentorUnlocked: v }),

      // Mentor autofill: every model answer of both routes of the day, plus the participant name if it is empty, so each document can be exported at once.
      mentorFill: (day) =>
        set((s) => {
          const spec = FREE_SPECS[day];
          if (!spec) return {};
          const participant = { name: s.participant.name.trim() ? s.participant.name : "Mentor Check" };
          const slice: FreeState = { r1: freeRouteKey(spec, 1), r2: freeRouteKey(spec, 2) };
          return { participant, [`d${day}`]: slice, resetCount: s.resetCount + 1, ui: readUi(s, day) } as Partial<Persisted>;
        }),

      resetRoute: (day, route) =>
        set((s) => {
          const prefix = route === 1 ? `d${day}:A` : route === 2 ? `d${day}:B` : `d${day}:`;
          const sectionsRead = Object.fromEntries(Object.entries(s.ui.sectionsRead).filter(([k]) => !k.startsWith(prefix)));
          const bannerDismissed = { ...s.ui.bannerDismissed };
          if (route === null) {
            delete bannerDismissed[`d${day}r1`];
            delete bannerDismissed[`d${day}r2`];
          } else delete bannerDismissed[`d${day}r${route}`];
          const key = `d${day}` as DayKey;
          const slice = s[key];
          const next: FreeState | undefined = slice
            ? { r1: route === null || route === 1 ? emptyFreeDayRoute(day, 1) : slice.r1, r2: route === null || route === 2 ? emptyFreeDayRoute(day, 2) : slice.r2 }
            : undefined;
          return { ...(next ? { [key]: next } : {}), ui: { bannerDismissed, sectionsRead, lang: s.ui.lang }, resetCount: s.resetCount + 1 } as Partial<Persisted & Session>;
        }),
    }),
    {
      name: STORAGE_KEY,
      version: PERSIST_VERSION,
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ participant: s.participant, ui: s.ui, ...Object.fromEntries(UX_DAYS.map((d) => [`d${d}`, s[`d${d}` as DayKey]])) }),
      migrate: (persisted) => migratePersisted(persisted),
      merge: (persisted, current) => {
        const merged = mergeDefaults(emptyPersisted(), (persisted ?? {}) as Partial<Persisted>);
        merged.ui.lang = "en";
        return { ...current, ...merged };
      },
    },
  ),
);

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => setHydrated(true));
    if (useStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}

export function rehydrateStore() {
  return useStore.persist.rehydrate();
}
