"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import type { Persisted } from "@/store/useStore";

/** The persisted slice as one stable object, for the pure helpers (missing lists, export bodies) that take it whole. */
export function usePersisted(): Persisted {
  const participant = useStore((s) => s.participant);
  const ui = useStore((s) => s.ui);
  const d1 = useStore((s) => s.d1);
  const d2 = useStore((s) => s.d2);
  const d3 = useStore((s) => s.d3);
  const d4 = useStore((s) => s.d4);
  const d5 = useStore((s) => s.d5);
  const d6 = useStore((s) => s.d6);
  const d7 = useStore((s) => s.d7);
  const d8 = useStore((s) => s.d8);
  const d9 = useStore((s) => s.d9);
  const d10 = useStore((s) => s.d10);
  return useMemo(() => ({ participant, ui, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10 }), [participant, ui, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10]);
}
