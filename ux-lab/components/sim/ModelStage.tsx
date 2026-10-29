"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * A 3D object you can turn (UX Day 14, "show it real"), drawn by the locally bundled @google/model-viewer web component, loaded only when the stage mounts. Labels
 * are HTML hotspots anchored to the model (children with slot="hotspot-…", data-position and data-normal). With `ar`, phones that support it get a “View in your
 * space” button that places the object in the room through the system's own AR viewer. Without WebGL the stage shows a static picture and the same information.
 * The models are the generic, made-up objects the original Day 14 bundled (public/day14/models).
 */
let loader: Promise<unknown> | null = null;
const loadViewer = () => (loader ??= import("@google/model-viewer"));

/** model-viewer gives every stage the same "Live announcements" region; naming it after the object keeps landmarks unique when a page has several stages. */
function nameLiveRegion(el: HTMLElement | null, alt: string) {
  const region = el?.shadowRoot?.querySelector('[role="region"][aria-label="Live announcements"]');
  region?.setAttribute("aria-label", `Live announcements: ${alt}`);
}

function webgl(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ModelStage({
  src,
  alt,
  fallback,
  children,
  orbit = "20deg 76deg auto",
  target = "auto auto auto",
  autoRotate = false,
  ar = false,
  aspect = "4 / 3",
  note,
}: {
  src: string;
  alt: string;
  fallback: string;
  children?: ReactNode;
  orbit?: string;
  target?: string;
  autoRotate?: boolean;
  ar?: boolean;
  aspect?: string;
  note?: ReactNode;
}) {
  const [state, setState] = useState<"probe" | "ready" | "flat">("probe");
  useEffect(() => {
    if (!webgl()) {
      setState("flat");
      return;
    }
    let live = true;
    loadViewer().then(() => live && setState("ready"), () => live && setState("flat"));
    return () => {
      live = false;
    };
  }, []);
  const extra: Record<string, unknown> = {};
  if (autoRotate) extra["auto-rotate"] = true;
  if (ar) {
    extra.ar = true;
    extra["ar-modes"] = "webxr scene-viewer quick-look";
  }
  return (
    <div className="space-y-1">
      <div className="relative overflow-hidden rounded-lg border border-line bg-gradient-to-b from-[#EEF1F5] to-white" style={{ aspectRatio: aspect }}>
        {state === "ready" ? (
          <model-viewer
            ref={(el: HTMLElement | null) => nameLiveRegion(el, alt)}
            src={src}
            alt={alt}
            camera-controls
            disable-zoom
            touch-action="pan-y"
            interaction-prompt="none"
            camera-orbit={orbit}
            camera-target={target}
            shadow-intensity="0.6"
            environment-image="neutral"
            exposure="1.05"
            loading="eager"
            style={{ width: "100%", height: "100%" }}
            {...extra}
          >
            {children}
          </model-viewer>
        ) : state === "flat" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fallback} alt={alt} className="h-full w-full object-contain" />
        ) : (
          <div className="flex h-full items-center justify-center text-caption text-ash">{tt("Preparing the 3D view …")}</div>
        )}
      </div>
      <p className="text-micro text-ash">
        {state === "flat" ? tt("This device cannot show 3D here, so a picture is shown; the information is the same.") : tt("Drag to turn the object.")}
        {ar && state === "ready" ? tt(" On a phone that supports AR, the cube button places it in your room.") : ""}
      </p>
      {note}
    </div>
  );
}
