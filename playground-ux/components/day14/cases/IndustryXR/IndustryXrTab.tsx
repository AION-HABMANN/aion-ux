'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { INDUSTRYXR_HOTSPOTS } from '@/data/day14/industryxr';
import { useWebglCapability } from '@/lib/day14/webgl';
import { CaseText } from './CaseText';
import { Checklist } from './Checklist';
import { HotspotLegend } from './HotspotLegend';
import { HotspotPanel } from './HotspotPanel';
import { StaticFallback } from './StaticFallback';

// Three.js is client-only and code-split, so it never enters the other tabs' bundles.
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div
      className="flex w-full items-center justify-center rounded-card border border-lilac bg-lilac/40 text-sm text-navy/45"
      style={{ aspectRatio: '16 / 9' }}
    >
      Preparing the training space…
    </div>
  ),
});

export function IndustryXrTab() {
  const capability = useWebglCapability();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = INDUSTRYXR_HOTSPOTS.find((hotspot) => hotspot.id === activeId) ?? null;

  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">IndustryXR</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy/75">
          Case study for Task 3. Walk the training space, open the four stations, then read the case.
          The camera is fixed to a narrow arc so every learner sees the same room.
        </p>
      </div>

      <div className="aion-card p-3 sm:p-4">
        {capability === 'supported' ? (
          <Scene activeId={activeId} onSelect={setActiveId} />
        ) : capability === 'unsupported' ? (
          <StaticFallback activeId={activeId} onSelect={setActiveId} />
        ) : (
          <div
            className="flex w-full items-center justify-center rounded-card border border-lilac bg-lilac/40 text-sm text-navy/45"
            style={{ aspectRatio: '16 / 9' }}
          >
            Preparing the training space…
          </div>
        )}

        <p className="mt-3 text-xs text-navy/55">
          {capability === 'unsupported'
            ? 'Static view shown — this device does not support the interactive scene. The four stations and their descriptions are identical.'
            : 'Drag left or right for a small change of angle. Click a numbered marker — or a station below — to read what is there.'}
        </p>

        <HotspotLegend activeId={activeId} onSelect={setActiveId} />

        <div className="mt-3">
          {active ? (
            <HotspotPanel hotspot={active} onClose={() => setActiveId(null)} />
          ) : (
            <p className="rounded-card bg-lilac/50 p-4 text-sm text-navy/60">
              Four stations are marked in the space. Open each one to see what exists there.
            </p>
          )}
        </div>
      </div>

      <CaseText />
      <Checklist />
    </div>
  );
}
