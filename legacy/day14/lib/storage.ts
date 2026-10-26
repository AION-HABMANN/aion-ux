'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Typed localStorage helpers. localStorage is the ONLY persistence layer in
 * this playground — there is no backend, no database and no account system.
 */

const PREFIX = 'aion.m7d1.';

export const STORAGE_KEYS = {
  activeTab: `${PREFIX}activeTab`,
  learnSection: `${PREFIX}learn.section`,
  training: `${PREFIX}training.progress`,
  buildVisionHint: `${PREFIX}buildvision.hintDismissed`,
  industryChecklist: `${PREFIX}industryxr.checklist`,
  transfer: `${PREFIX}transfer.notes`,
} as const;

export function readValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeValue<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — the playground still works, it just forgets */
  }
}

export function clearValue(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * State backed by localStorage. The first client render intentionally uses the
 * fallback so server-rendered markup and client markup match; the stored value
 * is adopted immediately afterwards.
 */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const hydrated = useRef(false);

  useEffect(() => {
    setValue(readValue<T>(key, initial));
    hydrated.current = true;
    // The key is stable per widget; `initial` is a literal default.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated.current) return;
    writeValue(key, value);
  }, [key, value]);

  const reset = useCallback(() => {
    clearValue(key);
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue, reset, hydrated.current] as const;
}
