'use client';

import { usePersistentState, STORAGE_KEYS } from '@/original/lib/day14/storage';
import { W1FlatVsSpatial } from './W1FlatVsSpatial';
import { W2ArOverlay } from './W2ArOverlay';
import { W3TechnologyMap } from './W3TechnologyMap';
import { W4CognitiveLoad } from './W4CognitiveLoad';
import { W5IntensifyOrOverwhelm } from './W5IntensifyOrOverwhelm';
import { W6DecisionStrip } from './W6DecisionStrip';
import { W7LinkedDiagram } from './W7LinkedDiagram';
import { W8FascinationVsImpact } from './W8FascinationVsImpact';
import { W9Ethics } from './W9Ethics';
import { W10Reputation } from './W10Reputation';

type SectionId = 'l1' | 'l2' | 'l3';

const SECTIONS: Array<{ id: SectionId; level: string; title: string; blurb: string }> = [
  {
    id: 'l1',
    level: 'L1',
    title: 'Knowledge',
    blurb: 'What immersive technologies are, and what they do to attention.',
  },
  {
    id: 'l2',
    level: 'L2',
    title: 'Application',
    blurb: 'How to judge whether an immersive idea has earned its place.',
  },
  {
    id: 'l3',
    level: 'L3',
    title: 'Management Decision',
    blurb: 'Deciding by impact, and owning what the decision costs.',
  },
];

export function LearnTab() {
  const [open, setOpen] = usePersistentState<SectionId | null>(STORAGE_KEYS.learnSection, 'l1');

  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">Learn</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy/75">
          Every concept here ships with a small widget. Try the widget first — the bullets underneath
          are captions for what you just did, not a substitute for doing it. One section opens at a
          time.
        </p>
      </div>

      {SECTIONS.map((section) => {
        const isOpen = open === section.id;
        return (
          <section key={section.id} className="aion-card overflow-hidden">
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`learn-${section.id}`}
                onClick={() => setOpen(isOpen ? null : section.id)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-lilac/50 sm:px-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple text-sm font-bold text-white">
                  {section.level}
                </span>
                <span className="flex-1">
                  <span className="block text-base font-bold text-navy">{section.title}</span>
                  <span className="block text-sm text-navy/60">{section.blurb}</span>
                </span>
                <span aria-hidden className="text-xl leading-none text-purple">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h2>

            {isOpen && (
              <div id={`learn-${section.id}`} className="flex flex-col gap-4 border-t border-lilac bg-lilac/25 p-3 sm:p-5">
                {section.id === 'l1' && (
                  <>
                    <W1FlatVsSpatial />
                    <W2ArOverlay />
                    <W3TechnologyMap />
                    <W4CognitiveLoad />
                    <W5IntensifyOrOverwhelm />
                  </>
                )}
                {section.id === 'l2' && (
                  <>
                    <W6DecisionStrip />
                    <W7LinkedDiagram />
                  </>
                )}
                {section.id === 'l3' && (
                  <>
                    <W8FascinationVsImpact />
                    <W9Ethics />
                    <W10Reputation />
                  </>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
