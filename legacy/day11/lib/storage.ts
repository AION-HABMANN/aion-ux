"use client";

// Tiny localStorage layer. No backend, no login — everything the learner does
// here lives only in their browser, and "reset my progress" wipes exactly
// these keys and nothing else.

import { useCallback, useEffect, useState } from "react";

const PREFIX = "aion-d11";

export const STORAGE_KEYS = {
  progress: `${PREFIX}-progress`, // which stops (1-6) have been opened
  notes: `${PREFIX}-notes`, // per-moment free-text notes
  reactions: `${PREFIX}-reactions`, // Stop 1 gut-reaction log
  lensChoices: `${PREFIX}-lens-choices`, // Stop 2 lens picks per moment
} as const;

export const TOTAL_STOPS = 6;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return safeParse<T>(window.localStorage.getItem(key), fallback);
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  // Let other components in the same tab (e.g. the sidebar progress bar)
  // know something changed, since the storage event doesn't fire same-tab.
  window.dispatchEvent(new CustomEvent("aion-storage", { detail: { key } }));
}

function useStorageSignal(key: string, onChange: () => void) {
  useEffect(() => {
    function handle(e: Event) {
      const custom = e as CustomEvent<{ key: string | null }>;
      // A null key means "everything was reset" — always reload in that case.
      const changed = custom.detail?.key;
      if (changed == null || changed === key) onChange();
    }
    window.addEventListener("aion-storage", handle);
    window.addEventListener("storage", handle);
    return () => {
      window.removeEventListener("aion-storage", handle);
      window.removeEventListener("storage", handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/** Tracks which of the six numbered stops (1-6) the learner has opened. */
export function useProgress() {
  const [visited, setVisited] = useState<number[]>([]);

  const load = useCallback(() => {
    setVisited(readJSON<number[]>(STORAGE_KEYS.progress, []));
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  useStorageSignal(STORAGE_KEYS.progress, load);

  const markVisited = useCallback((stopId: number) => {
    const current = readJSON<number[]>(STORAGE_KEYS.progress, []);
    if (!current.includes(stopId)) {
      writeJSON(STORAGE_KEYS.progress, [...current, stopId].sort());
    }
  }, []);

  return { visited, count: visited.length, total: TOTAL_STOPS, markVisited };
}

/** A single note box, persisted per moment/stop id. */
export function useNote(noteId: string) {
  const [value, setValue] = useState("");

  const load = useCallback(() => {
    const all = readJSON<Record<string, string>>(STORAGE_KEYS.notes, {});
    setValue(all[noteId] ?? "");
  }, [noteId]);

  useEffect(() => {
    load();
  }, [load]);
  useStorageSignal(STORAGE_KEYS.notes, load);

  const save = useCallback(
    (next: string) => {
      setValue(next);
      const all = readJSON<Record<string, string>>(STORAGE_KEYS.notes, {});
      writeJSON(STORAGE_KEYS.notes, { ...all, [noteId]: next });
    },
    [noteId]
  );

  return [value, save] as const;
}

export interface ReactionLogEntry {
  prompt: string;
  reaction: "helped" | "confusing";
  at: number;
}

export function useReactionLog() {
  const [log, setLog] = useState<ReactionLogEntry[]>([]);

  const load = useCallback(() => {
    setLog(readJSON<ReactionLogEntry[]>(STORAGE_KEYS.reactions, []));
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  useStorageSignal(STORAGE_KEYS.reactions, load);

  const addReaction = useCallback((entry: ReactionLogEntry) => {
    const current = readJSON<ReactionLogEntry[]>(STORAGE_KEYS.reactions, []);
    writeJSON(STORAGE_KEYS.reactions, [...current, entry]);
  }, []);

  return { log, addReaction };
}

/** Per-moment lens pick, so Stop 2 remembers what the learner chose. */
export function useLensChoice(momentId: string) {
  const [choice, setChoiceState] = useState<{
    lens: string;
    direction: string;
  } | null>(null);

  const load = useCallback(() => {
    const all = readJSON<Record<string, { lens: string; direction: string }>>(
      STORAGE_KEYS.lensChoices,
      {}
    );
    setChoiceState(all[momentId] ?? null);
  }, [momentId]);

  useEffect(() => {
    load();
  }, [load]);
  useStorageSignal(STORAGE_KEYS.lensChoices, load);

  const setChoice = useCallback(
    (lens: string, direction: string) => {
      setChoiceState({ lens, direction });
      const all = readJSON<Record<string, { lens: string; direction: string }>>(
        STORAGE_KEYS.lensChoices,
        {}
      );
      writeJSON(STORAGE_KEYS.lensChoices, {
        ...all,
        [momentId]: { lens, direction },
      });
    },
    [momentId]
  );

  return [choice, setChoice] as const;
}

/** Wipes every key this app owns. Used by the "reset my progress" control. */
export function resetAllProgress() {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
  window.dispatchEvent(new CustomEvent("aion-storage", { detail: { key: null } }));
}
