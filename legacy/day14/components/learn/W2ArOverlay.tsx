'use client';

import { useState } from 'react';
import { ModelStage } from '@/components/ui/ModelStage';
import { Widget } from '@/components/ui/Widget';
import { AR_OVERLAY_CAPTIONS } from '@/content/learn';

/**
 * Widget 2 — <model-viewer>. A GENERIC teaching object: a low, wide bench
 * machine with a gantry. It is deliberately unlike the tall upright device in
 * the BuildVision case, so no case observation can leak from here.
 * Labels are HTML overlays anchored to hotspots, never 3D geometry.
 */
const LABELS = [
  {
    slot: 'hotspot-panel',
    position: '-0.55 1.03 0.46',
    normal: '0 0 1',
    title: 'Operating panel',
    body: 'Current programme and cycle state.',
  },
  {
    slot: 'hotspot-head',
    position: '0.22 1.47 0.02',
    normal: '0 1 0',
    title: 'Gantry head',
    body: 'Moves along the rail above the work surface.',
  },
  {
    slot: 'hotspot-guard',
    position: '0.2 0.28 0.45',
    normal: '0 0 1',
    title: 'Lower guard',
    body: 'Access point for the drive compartment.',
  },
];

export function W2ArOverlay() {
  const [overlay, setOverlay] = useState(true);

  return (
    <Widget index={2} title="AR Overlay on a Real Object" tool="model-viewer" captions={AR_OVERLAY_CAPTIONS}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={overlay}
            onClick={() => setOverlay((v) => !v)}
            className="relative h-7 w-14 shrink-0 rounded-full border border-lilac transition-colors"
            style={{ backgroundColor: overlay ? '#5624D0' : '#EEE9F9' }}
          >
            <span
              aria-hidden
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-[left] duration-300"
              style={{ left: overlay ? '2rem' : '0.25rem' }}
            />
            <span className="sr-only">Toggle AR overlay</span>
          </button>
          <span className="text-sm font-semibold text-navy">
            AR overlay {overlay ? 'ON' : 'OFF'}
          </span>
          <span className="text-xs text-navy/55">Drag left/right to turn the object slightly.</span>
        </div>

        <ModelStage
          src="/models/industrial-machine.glb"
          alt="A generic low-poly industrial bench machine used as a teaching object"
          fallbackSrc="/fallback/industrial-machine.svg"
          cameraOrbit="25deg 74deg 5.4m"
          minCameraOrbit="-5deg 74deg 5.4m"
          maxCameraOrbit="55deg 74deg 5.4m"
          cameraTarget="0m 0.8m 0m"
          fieldOfView="26deg"
          fallbackContent={
            overlay ? (
              <ul className="mt-3 space-y-2">
                {LABELS.map((label) => (
                  <li key={label.slot} className="rounded-xl border border-purple/25 bg-white p-3 text-sm">
                    <p className="font-semibold text-navy">{label.title}</p>
                    <p className="text-navy/70">{label.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-xl bg-lilac px-3 py-2 text-sm text-navy/70">
                Overlay off — the object alone, with no anchored guidance.
              </p>
            )
          }
        >
          {overlay &&
            LABELS.map((label) => (
              <div
                key={label.slot}
                slot={label.slot}
                data-position={label.position}
                data-normal={label.normal}
                className="pointer-events-none max-w-[170px] -translate-x-1/2 rounded-lg border border-purple/40 bg-white/95 px-2.5 py-1.5 text-left shadow-card"
              >
                <p className="text-[11px] font-bold leading-tight text-purple">{label.title}</p>
                <p className="text-[11px] leading-snug text-navy/75">{label.body}</p>
              </div>
            ))}
        </ModelStage>

        <p className="rounded-xl bg-lilac px-3 py-2 text-sm text-navy/75">
          {overlay
            ? 'With the overlay on, the answer sits where the question is — on the part itself.'
            : 'With the overlay off, the same knowledge exists, but somewhere else: in a document you have to map onto this object yourself.'}
        </p>
      </div>
    </Widget>
  );
}
