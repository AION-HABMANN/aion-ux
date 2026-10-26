'use client';

import { useState } from 'react';
import { ModelStage } from '@/components/day14/ui/ModelStage';
import { STORAGE_KEYS, usePersistentState } from '@/lib/day14/storage';
import {
  BUILDVISION_CHECKLIST,
  BUILDVISION_HOTSPOTS,
  BUILDVISION_SUPPORT_MODE_DETAIL,
  BUILDVISION_SUPPORT_MODE_LABEL,
} from '@/data/day14/buildvision';

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className="relative h-7 w-14 shrink-0 rounded-full border border-lilac transition-colors"
        style={{ backgroundColor: checked ? '#5624D0' : '#EEE9F9' }}
      >
        <span
          aria-hidden
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-[left] duration-300"
          style={{ left: checked ? '2rem' : '0.25rem' }}
        />
        <span className="sr-only">{label}</span>
      </button>
      <span className="text-sm font-semibold text-navy">{label}</span>
    </div>
  );
}

/**
 * Every learner gets the identical starting camera on every load: clamped
 * horizontal arc, no zoom, no auto-rotate. Overlay labels are neutral and
 * descriptive — they never judge, score, categorise, or hint.
 */
export function ModelViewerStage() {
  const [arGuidance, setArGuidance] = useState(true);
  const [supportMode, setSupportMode] = useState(false);
  const [hintDismissed, setHintDismissed] = usePersistentState<boolean>(
    STORAGE_KEYS.buildVisionHint,
    false,
  );

  return (
    <div className="aion-card p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <Toggle
          checked={arGuidance}
          onChange={() => setArGuidance((v) => !v)}
          label={arGuidance ? 'AR guidance' : 'PDF checklist'}
        />
        <Toggle
          checked={supportMode}
          onChange={() => setSupportMode((v) => !v)}
          label={supportMode ? 'Support mode on' : 'Support mode off'}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="relative">
          <ModelStage
            src="/day14/models/service-device.glb"
            alt="A generic service and maintenance device"
            fallbackSrc="/day14/fallback/service-device.svg"
            cameraOrbit="18deg 76deg 5.2m"
            minCameraOrbit="-8deg 76deg 5.2m"
            maxCameraOrbit="44deg 76deg 5.2m"
            cameraTarget="0m 0.92m 0m"
            fieldOfView="28deg"
            aspect="1 / 1"
            fallbackContent={
              <ul className="mt-3 space-y-2">
                {BUILDVISION_HOTSPOTS.map((hotspot) => (
                  <li key={hotspot.id} className="rounded-xl border border-lilac bg-white p-3 text-sm">
                    <p className="font-semibold text-navy">
                      {hotspot.step} — {hotspot.label}
                    </p>
                    <p className="text-navy/70">{hotspot.detail}</p>
                  </li>
                ))}
              </ul>
            }
          >
            {arGuidance &&
              BUILDVISION_HOTSPOTS.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  slot={hotspot.slot}
                  data-position={hotspot.position}
                  data-normal={hotspot.normal}
                  className="pointer-events-none flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-purple/40 bg-white/95 py-1 pl-1 pr-2.5 shadow-card"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-[11px] font-semibold leading-none text-navy">
                    {hotspot.label}
                  </span>
                </div>
              ))}
          </ModelStage>

          {supportMode && (
            <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-purple/40 bg-white/95 px-3 py-1.5 shadow-card">
              <p className="flex items-center gap-2 text-[11px] font-bold text-purple">
                <span aria-hidden className="h-2 w-2 rounded-full bg-purple" />
                {BUILDVISION_SUPPORT_MODE_LABEL}
              </p>
            </div>
          )}

          {!hintDismissed && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-purple/40 bg-white/95 px-3 py-1.5 shadow-card">
              <span className="text-xs font-semibold text-purple">Try me — drag to turn the device</span>
              <button
                type="button"
                onClick={() => setHintDismissed(true)}
                className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-bold text-navy/70"
              >
                Got it
              </button>
            </div>
          )}
        </div>

        <div className="rounded-card border border-lilac bg-lilac/40 p-4">
          {arGuidance ? (
            <>
              <p className="aion-label">AR guidance</p>
              <p className="mt-2 text-sm text-navy/70">
                The four maintenance steps are marked on the device itself.
              </p>
              <ol className="mt-3 space-y-2 text-sm text-navy/80">
                {BUILDVISION_HOTSPOTS.map((hotspot, index) => (
                  <li key={hotspot.id} className="flex gap-2 rounded-lg bg-white px-3 py-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <span>
                      <span className="font-semibold text-navy">{hotspot.label}. </span>
                      {hotspot.detail}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <>
              <p className="aion-label">PDF checklist</p>
              <ol className="mt-2 space-y-2 text-sm text-navy/80">
                {BUILDVISION_CHECKLIST.map((line) => (
                  <li key={line} className="rounded-lg border border-lilac bg-white px-3 py-2">
                    {line}
                  </li>
                ))}
              </ol>
            </>
          )}

          {supportMode && (
            <p className="mt-4 border-t border-lilac pt-3 text-sm text-navy/80">
              <span className="font-semibold text-navy">{BUILDVISION_SUPPORT_MODE_LABEL}.</span>{' '}
              {BUILDVISION_SUPPORT_MODE_DETAIL}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
