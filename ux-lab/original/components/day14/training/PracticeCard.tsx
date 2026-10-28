'use client';

import { useState } from 'react';
import { ModelStage } from '@/original/components/day14/ui/ModelStage';
import { ALL_CATEGORIES } from '@/original/data/day14/categories';
import { VERDICTS, type PracticeItem, type Verdict } from '@/original/data/day14/training';
import { RevealCard } from './RevealCard';

export type AttemptResult = {
  itemId: string;
  category: string;
  verdictMatched: boolean;
  categoryMatched: boolean;
};

export function PracticeCard({
  item,
  index,
  revealed,
  onAttempt,
}: {
  item: PracticeItem;
  index: number;
  revealed: boolean;
  onAttempt: (result: AttemptResult) => void;
}) {
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [category, setCategory] = useState<string>('');
  const [open, setOpen] = useState(revealed);

  const handleReveal = () => {
    setOpen(true);
    onAttempt({
      itemId: item.id,
      category: item.reveal.category,
      verdictMatched: verdict === item.reveal.verdict,
      categoryMatched: category === item.reveal.category,
    });
  };

  return (
    <article className="aion-card p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="aion-label">Practice {index + 1}</span>
        <span className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-semibold text-navy/60">
          {item.domain}
        </span>
      </div>
      <h3 className="mt-1 text-base font-bold text-navy">{item.title}</h3>

      <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <ul className="space-y-1.5 text-sm text-navy/80">
          {item.scenario.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {item.model && (
          <ModelStage
            className="w-full lg:w-64"
            src={item.model.src}
            alt={item.model.alt}
            fallbackSrc={item.model.fallback}
            cameraOrbit="25deg 74deg 2.2m"
            minCameraOrbit="0deg 74deg 2.2m"
            maxCameraOrbit="50deg 74deg 2.2m"
            cameraTarget="0m 0.33m 0m"
            fieldOfView="24deg"
            aspect="1 / 1"
          >
            <div
              slot="hotspot-tank"
              data-position="0 0.46 0.19"
              data-normal="0 0 1"
              className="pointer-events-none -translate-x-1/2 rounded-md border border-purple/40 bg-white/95 px-2 py-1 text-[10px] font-bold text-purple shadow-soft"
            >
              Water tank
            </div>
            <div
              slot="hotspot-filter"
              data-position="0.15 0.3 0.2"
              data-normal="0 0 1"
              className="pointer-events-none -translate-x-1/2 rounded-md border border-purple/40 bg-white/95 px-2 py-1 text-[10px] font-bold text-purple shadow-soft"
            >
              Filter
            </div>
          </ModelStage>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="aion-label">Your verdict</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {VERDICTS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setVerdict(option)}
                className={[
                  'aion-chip text-xs',
                  verdict === option ? 'aion-chip-active' : 'hover:border-purple/40',
                ].join(' ')}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor={`cat-${item.id}`} className="aion-label">
            Your category
          </label>
          <select
            id={`cat-${item.id}`}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="aion-input mt-2"
          >
            <option value="">Choose a category…</option>
            {ALL_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="aion-btn" onClick={handleReveal} disabled={open}>
          {open ? 'Revealed' : 'Reveal'}
        </button>
        {open && (
          <button
            type="button"
            className="text-xs font-semibold text-purple underline underline-offset-4"
            onClick={() => setOpen(false)}
          >
            Hide the reveal
          </button>
        )}
        {!open && (
          <span className="text-xs text-navy/55">
            Pick what you can — XP is awarded for attempting either way.
          </span>
        )}
      </div>

      {open && <RevealCard item={item} />}
    </article>
  );
}
