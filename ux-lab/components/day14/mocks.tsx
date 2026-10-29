"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the drawn screens of the study cards (CLAUDE.md #52): Brewline, a made-up maker of coffee machines with an app, so no task is answered here. The real 3D
 * machine is in the diagrams (components/day14/diagrams.tsx, the bundled retail-product model); these HTML phones show the AR camera view in a calm and a
 * stressful moment, and the measures as thumbnails. Labels of a made-up product.
 */
const BRAND = "#6B3E26";
const INK = "#1D2733";

export function Phone({ children, label, title = "Brewline · AR" }: { children: ReactNode; label: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-[#111827] shadow-md">
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: BRAND }}>
          <span>10:24</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: BRAND }}>{title}</div>
        <div className="relative min-h-[270px] p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

/** A drawn coffee machine on a kitchen counter, as the camera sees it. */
const Machine = () => (
  <svg aria-hidden viewBox="0 0 240 200" className="w-full">
    <rect x="0" y="150" width="240" height="50" fill="#5B4636" />
    <rect x="0" y="0" width="240" height="150" fill="#2B3440" />
    <rect x="70" y="40" width="100" height="110" rx="8" fill="#D6D3D1" />
    <rect x="80" y="30" width="80" height="16" rx="4" fill="#A8A29E" />
    <rect x="105" y="85" width="30" height="10" fill="#57534E" />
    <rect x="90" y="135" width="60" height="8" fill="#78716C" />
    <circle cx="155" cy="60" r="5" fill="#0EA5E9" />
  </svg>
);
const Tag = ({ x, y, children, warn }: { x: string; y: string; children: ReactNode; warn?: boolean }) => (
  <div className="absolute whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold shadow" style={{ left: x, top: y, background: warn ? "#FEF3C7" : "#FFFFFF", color: warn ? "#78350F" : INK }}>{children}</div>
);

export function DescaleMock({ stress }: { stress: boolean }) {
  return (
    <Phone label={stress ? tt("The AR descaling guide in a stressful moment: a beeping machine, a crying child, a weak connection, and six labels at once") : tt("The AR descaling guide on a quiet Sunday: one label on the water tank, step 1 of 4")}>
      <Machine />
      {!stress ? (
        <>
          <Tag x="32%" y="12%">1 · {tt("Fill the tank with descaler")}</Tag>
          <div className="mt-2 rounded bg-white/95 p-2 text-[11px]">{tt("Step 1 of 4 · Next: place a cup under the spout")}</div>
        </>
      ) : (
        <>
          <div className="absolute left-3 right-3 top-3 rounded bg-[#B91C1C] px-2 py-0.5 text-[10.5px] font-bold text-white">{tt("🔔 BEEP · descaling needed · 🔔")}</div>
          <Tag x="30%" y="20%">1 · {tt("Fill the tank")}</Tag>
          <Tag x="55%" y="36%" warn>⚠ {tt("Hot water!")}</Tag>
          <Tag x="10%" y="40%" warn>{tt("Tip: use Brewline descaler")}</Tag>
          <Tag x="40%" y="50%">2 · {tt("Cup under spout")}</Tag>
          <Tag x="62%" y="58%" warn>{tt("Order descaler 🛒")}</Tag>
          <Tag x="18%" y="62%">3 · {tt("Press both buttons")}</Tag>
          <div className="mt-2 rounded bg-white/95 p-2 text-[11px]">{tt("👶 crying in the next room · 📶 weak signal: labels lag behind the camera")}</div>
        </>
      )}
    </Phone>
  );
}

export function MeasureThumb({ kind }: { kind: "descale" | "showroom" | "eye" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Brewline</div>
      <div className="space-y-1 p-1.5">
        {kind === "descale" && <><div>📱 AR: descale in 4 steps</div><div className="h-1 rounded bg-[#6B3E26]" /></>}
        {kind === "showroom" && <div>🥽 VR café showroom · trade fair</div>}
        {kind === "eye" && <div>👁 Eye-tracking ads in the app</div>}
      </div>
    </div>
  );
}
