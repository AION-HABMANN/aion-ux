'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useWebglCapability } from '@/original/lib/day14/webgl';

let loaderPromise: Promise<unknown> | null = null;

/** Registers the locally bundled custom element exactly once. No CDN involved. */
function loadModelViewer() {
  if (!loaderPromise) {
    loaderPromise = import('@google/model-viewer');
  }
  return loaderPromise;
}

export type ModelStageProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  /** Rendered inside <model-viewer>; use slot="hotspot-…" elements for anchored labels. */
  children?: ReactNode;
  /** Rendered beneath the static image so fallback users get the same information. */
  fallbackContent?: ReactNode;
  cameraOrbit?: string;
  minCameraOrbit?: string;
  maxCameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  /** CSS aspect-ratio for the stage; portrait objects need more vertical room. */
  aspect?: string;
  className?: string;
};

export function ModelStage({
  src,
  alt,
  fallbackSrc,
  children,
  fallbackContent,
  cameraOrbit = '20deg 78deg 3.4m',
  minCameraOrbit = '-20deg 78deg 3.4m',
  maxCameraOrbit = '60deg 78deg 3.4m',
  cameraTarget = '0m 0.9m 0m',
  fieldOfView = '32deg',
  aspect = '4 / 3',
  className = '',
}: ModelStageProps) {
  const capability = useWebglCapability();
  const [ready, setReady] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (capability !== 'supported') return;
    let cancelled = false;
    loadModelViewer().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [capability]);

  if (capability === 'unsupported') {
    return (
      <div className={className}>
        <div className="overflow-hidden rounded-card border border-lilac bg-lilac/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fallbackSrc} alt={alt} className="h-full w-full object-contain" />
        </div>
        <p className="mt-2 text-xs text-navy/55">
          Static view shown — this device does not support the interactive 3D viewer. The information
          below is identical.
        </p>
        {fallbackContent}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        ref={hostRef}
        className="relative overflow-hidden rounded-card border border-lilac bg-gradient-to-b from-lilac/60 to-white"
        style={{ aspectRatio: aspect }}
      >
        {ready ? (
          <model-viewer
            src={src}
            alt={alt}
            camera-controls
            disable-zoom
            disable-pan
            disable-tap
            touch-action="pan-y"
            interaction-prompt="none"
            camera-orbit={cameraOrbit}
            min-camera-orbit={minCameraOrbit}
            max-camera-orbit={maxCameraOrbit}
            camera-target={cameraTarget}
            field-of-view={fieldOfView}
            min-field-of-view={fieldOfView}
            max-field-of-view={fieldOfView}
            shadow-intensity="0.55"
            environment-image="neutral"
            exposure="1.05"
            loading="eager"
            reveal="auto"
          >
            {children}
          </model-viewer>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-navy/45">
            Preparing 3D view…
          </div>
        )}
      </div>
    </div>
  );
}
