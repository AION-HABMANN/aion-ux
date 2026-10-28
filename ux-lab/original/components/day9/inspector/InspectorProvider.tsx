'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useStore } from '@/original/lib/day9/store';

interface InspectorContextValue {
  enabled: boolean;
  openMechanic: string | null;
  open: (mechanicId: string) => void;
  close: () => void;
  toggle: () => void;
}

const InspectorContext = createContext<InspectorContextValue | null>(null);

/**
 * BUILD_PROMPT §5.7 — the Inspector.
 * The provider owns which mechanic panel is open; the on/off state lives in the
 * persisted store so it survives a reload.
 */
export function InspectorProvider({ children }: { children: ReactNode }) {
  const enabled = useStore((s) => s.settings.inspector);
  const toggleInspector = useStore((s) => s.toggleInspector);
  const [openMechanic, setOpenMechanic] = useState<string | null>(null);

  const open = useCallback((id: string) => setOpenMechanic(id), []);
  const close = useCallback(() => setOpenMechanic(null), []);
  const toggle = useCallback(() => {
    toggleInspector();
    setOpenMechanic(null);
  }, [toggleInspector]);

  const value = useMemo(
    () => ({ enabled, openMechanic, open, close, toggle }),
    [enabled, openMechanic, open, close, toggle]
  );

  return <InspectorContext.Provider value={value}>{children}</InspectorContext.Provider>;
}

export function useInspector(): InspectorContextValue {
  const ctx = useContext(InspectorContext);
  if (!ctx) throw new Error('useInspector must be used inside InspectorProvider');
  return ctx;
}
