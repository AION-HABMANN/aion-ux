"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the drawn screens of the study cards (CLAUDE.md #52): Hearth Energy, a made-up energy supplier with an app, so no task is answered here. Each mock is the
 * same screen in different states; the figure around it (components/day13/diagrams.tsx) says what changes and for whom.
 *
 * Shown for real (user rule 2026-10-28): the overloaded start page is drawn as busy as such apps are, the inconsistent pages really move their menu and rename
 * their button, so the load is met, not described. Amounts and dates are labels of a made-up app. No element flashes.
 */
const BRAND = "#9A3412";
const INK = "#1D2733";

export function Phone({ children, label, title = "Hearth Energy", bar = BRAND }: { children: ReactNode; label: string; title?: string; bar?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-[#FAF7F4] shadow-md">
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: bar }}>
          <span>08:12</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: bar }}>{title}</div>
        <div className="min-h-[250px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const Main = ({ children }: { children: ReactNode }) => <div className="rounded-lg py-2 text-center font-semibold text-white" style={{ background: BRAND }}>{children}</div>;

/* ------------------------------------------------------------------ A1 · one start page, three lenses */

/* ------------------------------------------------------------------ A2 · from calm to overloaded */

export const STIM_NAMES = () => [tt("Calm"), tt("A banner"), tt("Badges and offers"), tt("Movement and chat"), tt("Everything at once")];

/* ------------------------------------------------------------------ A2 · one long form, or steps */

export function FormMock({ steps }: { steps: boolean }) {
  return (
    <Phone label={steps ? tt("Moving house as three short steps with a progress line and one question per screen") : tt("Moving house as one long form with twelve required fields")}>
      <div className="font-bold">{tt("Moving house")}</div>
      {steps ? (
        <>
          <div className="flex gap-1" aria-hidden>{[0, 1, 2].map((i) => <div key={i} className="h-1.5 flex-1 rounded" style={{ background: i === 0 ? BRAND : "#E7DED6" }} />)}</div>
          <div className="text-[10.5px] font-semibold">{tt("Step 1 of 3 · When do you move?")}</div>
          <div className="rounded border border-[#CFC6BD] bg-white px-2 py-1.5">14.11.2026</div>
          <Main>{tt("Next: your new address")}</Main>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-1 text-[9.5px]">
          {[tt("Customer no.*"), tt("Meter no.*"), tt("Move-out date*"), tt("Reading old*"), tt("New street*"), tt("No.*"), tt("Postcode*"), tt("City*"), tt("Move-in date*"), tt("Reading new*"), tt("Payment*"), tt("Consent*")].map((f) => <div key={f} className="rounded border border-[#CFC6BD] bg-white px-1 py-1">{f}</div>)}
        </div>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A3 · consistent or not */

/* ------------------------------------------------------------------ A5 · the same content through assistive technology */

export const AT_TEXT = () => tt("Your meter reading is due by 31 October. You can send it in the app or by phone. It takes about two minutes.");

/* ------------------------------------------------------------------ A5 · measures, as thumbnails */

export function MeasureThumb({ kind }: { kind: "calm" | "easy" | "steps" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Hearth Energy</div>
      <div className="space-y-1 p-1.5">
        {kind === "calm" && <><div className="font-semibold">Your next step</div><div className="rounded bg-[#9A3412] px-1 text-white">Send meter reading</div></>}
        {kind === "easy" && <><div className="rounded bg-[#FDE68A] px-1">⚡ Offers · 🔔 4 · 🎁</div><div className="text-[#6B6560]">Settings › Easy mode (off)</div></>}
        {kind === "steps" && <><div>Step 1 of 3</div><div className="h-1 rounded bg-[#9A3412]" /></>}
      </div>
    </div>
  );
}
