'use client';

import type { PracticeItem } from '@/data/day14/training';

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-lilac pt-3 first:border-t-0 first:pt-0">
      <p className="aion-label">{label}</p>
      <div className="mt-1 text-sm text-navy/85">{children}</div>
    </div>
  );
}

export function RevealCard({ item }: { item: PracticeItem }) {
  const { reveal } = item;
  const { fix } = reveal;

  return (
    <div className="mt-4 space-y-3 rounded-card border border-purple/30 bg-lilac/45 p-4">
      <Block label="1 · Verdict">
        <span className="inline-flex rounded-full bg-purple px-3 py-1 text-xs font-bold text-white">
          {reveal.verdict}
        </span>
      </Block>

      <Block label="2 · What">{reveal.what}</Block>

      <Block label="3 · Who it affects">
        <span className="font-semibold text-navy">{reveal.who}.</span> {reveal.whoDetail}
      </Block>

      <Block label="4 · Category">
        <span className="font-semibold text-navy">{reveal.category}.</span> {reveal.categoryWhy}
      </Block>

      <Block label="5 · Fix (before → after)">
        <div className="mt-1 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-navy/20 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-navy/60">{fix.before.label}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fix.before.elements.map((element) => (
                <span
                  key={element}
                  className="rounded-md bg-navy/10 px-2 py-1 text-[11px] font-semibold text-navy/75"
                >
                  {element}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-navy/70">{fix.before.note}</p>
          </div>

          <div className="rounded-xl border border-purple/40 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-purple">{fix.after.label}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fix.after.elements.map((element) => (
                <span
                  key={element}
                  className="rounded-md bg-purple/15 px-2 py-1 text-[11px] font-semibold text-purple"
                >
                  {element}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-navy/70">{fix.after.note}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-navy/55">
          {fix.before.elements.length} simultaneous elements → {fix.after.elements.length}. Lighter, and
          easier to justify.
        </p>
      </Block>
    </div>
  );
}
