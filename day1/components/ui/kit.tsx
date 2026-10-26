'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useSession } from '@/store/useStore';

/** A text box that grows with what is typed: no clipped answer, no inner scrollbar (DL-STANDARD 2). */
export function AutoTextarea({
  id,
  value,
  onChange,
  rows = 3,
  describedBy,
  labelledBy,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  describedBy?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      value={value}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      onChange={(e) => onChange(e.target.value)}
      className="field resize-none overflow-hidden"
    />
  );
}

/** One quiet dashed "＋ Show …" row (CLAUDE.md #37): 40 px tall, keyboard-operable, `aria-expanded`. Nothing is deleted and nothing is gated. */
export function ShowMore({ id, label, children, defaultOpen = false }: { id: string; label: string; children: ReactNode; defaultOpen?: boolean }) {
  const open = useSession((s) => s.open[id] ?? defaultOpen);
  const toggle = useSession((s) => s.toggle);
  const bodyId = `${id}-body`;
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => toggle(id)}
        className="no-print flex min-h-[40px] w-full items-center gap-2 rounded-lg border border-dashed border-line px-3 text-left text-caption text-ash hover:border-ash hover:text-ink"
      >
        <span aria-hidden>{open ? '－' : '＋'}</span>
        {open ? 'Hide' : 'Show'} {label}
      </button>
      <div id={bodyId} hidden={!open} className="mt-3">
        {children}
      </div>
    </div>
  );
}

export const Pill = ({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'core' | 'draft' }) => (
  <span className={`pill ${tone === 'core' ? 'border-signal/50 bg-signalSoft text-signal' : tone === 'draft' ? 'border-gold/60 bg-accentSoft text-accent' : 'border-line bg-paper text-ash'}`}>{children}</span>
);
