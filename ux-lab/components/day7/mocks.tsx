"use client";

import type { ReactNode } from "react";
import { LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the drawn screens of the study cards (CLAUDE.md #52): Moss & Pine, a made-up garden centre with an online shop and an app, so no task is answered here. Each
 * mock is the same screen in different states; the figure around it (components/day7/diagrams.tsx) says what changes and what it does to the person. Own greys and one
 * accent only.
 */

const W = 320;
const H = 220;
const ACC = "#3F6B3A";
const WARM = "#EEF4EA";

function Page({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[440px]">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="1" y="1" width={W - 2} height="22" rx="8" fill={ACC} />
      <Txt x={12} y={16} size={10} bold fill="#FFFFFF">Moss &amp; Pine</Txt>
      {children}
    </Svg>
  );
}

function Btn({ x, y, w, text, strong }: { x: number; y: number; w: number; text: string; strong?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="24" rx="6" fill={strong ? ACC : "#FFFFFF"} stroke={strong ? ACC : MID} />
      <Txt x={x + w / 2} y={y + 16} size={9} bold anchor="middle" fill={strong ? "#FFFFFF" : "#1B1B1F"}>{text}</Txt>
    </g>
  );
}

/* ------------------------------------------------------------------ A1 · a cold and a warm order confirmation */

/* ------------------------------------------------------------------ A2 · one checkout step with safety, control and recognition */

export function CheckoutMock({ safety, control, recognition }: { safety: boolean; control: boolean; recognition: boolean }) {
  return (
    <Page label={tt("A Moss & Pine checkout step; the switches add a note on what happens next, a way to change or undo, and a word that recognises the customer")}>
      <Txt x={14} y={44} size={10} bold>{tt("Pay for your order")}</Txt>
      {recognition && <Txt x={14} y={60} size={8.5} fill={ACC}>{tt("Welcome back. Your hedge plan is saved.")}</Txt>}
      <rect x="14" y="68" width="292" height="18" rx="3" fill="#FFFFFF" stroke={MID} />
      <Txt x={20} y={80} size={8} fill="#777777">{tt("Card or invoice")}</Txt>
      {safety && <Txt x={14} y={102} size={8.5} fill="#333333">{tt("You pay now; we confirm by e-mail and you can cancel until it ships.")}</Txt>}
      <Btn x={14} y={116} w={140} text={tt("Pay")} strong />
      {control && <Txt x={166} y={132} size={8.5} fill={ACC}>{tt("‹ Change my basket")}</Txt>}
      <rect x="14" y="156" width="292" height="40" rx="6" fill={LITE} />
      <Txt x={22} y={172} size={8} fill="#555555">{tt("Your basket · delivery Thursday")}</Txt>
      <Txt x={22} y={186} size={8} fill="#555555">{tt("Usable in every version: the fields and the button stay the same.")}</Txt>
    </Page>
  );
}

/* ------------------------------------------------------------------ A3 · one error message written three ways */

/* ------------------------------------------------------------------ B2 · one reminder for four situations */

/* ------------------------------------------------------------------ A5 · the thumbnails of Moss & Pine's three measures */

export function MeasureThumb({ kind }: { kind: "errors" | "photos" | "celebrate" }) {
  const label = kind === "errors" ? tt("Error messages rewritten to say what happened and what to do") : kind === "photos" ? tt("New photographs on every product page") : tt("A celebration animation after every order");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "errors" && (
        <g>
          <rect x="12" y="14" width="176" height="44" rx="5" fill={WARM} stroke={MID} />
          <rect x="22" y="24" width="110" height="7" rx="2" fill="#333333" />
          <rect x="22" y="38" width="140" height="5" rx="2" fill={MID} />
          <rect x="12" y="70" width="80" height="18" rx="5" fill={ACC} />
          <rect x="100" y="70" width="80" height="18" rx="5" fill="#FFFFFF" stroke={MID} />
        </g>
      )}
      {kind === "photos" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={12 + i * 62} y="14" width="54" height="56" rx="4" fill="#CFE0C8" />
              <circle cx={39 + i * 62} cy="40" r="12" fill="#7FA36F" />
              <rect x={12 + i * 62} y="78" width="40" height="6" rx="2" fill={MID} />
            </g>
          ))}
        </g>
      )}
      {kind === "celebrate" && (
        <g>
          <rect x="50" y="40" width="100" height="30" rx="6" fill={ACC} />
          {[[30, 20], [160, 24], [44, 86], [150, 84], [100, 16], [176, 60], [22, 60]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6" height="6" fill={["#F59E0B", "#D9534F", "#3D7BD9", "#8A63D2"][i % 4]} transform={`rotate(20 ${x} ${y})`} />)}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three CareerPath designs */

export function CareerThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: a bright, warm start page full of badges, banners and activating messages") : kind === "B" ? tt("Variant B: a calm, factual list of courses with plain headings") : tt("Variant C: a personal, high-quality page with a greeting and tailored suggestions");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="8" y="8" width="184" height="26" rx="5" fill="#F59E0B" />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={22 + i * 22} cy="48" r="8" fill={["#D9534F", "#8A63D2", "#3D7BD9", "#2E9E6B"][i]} />)}
          <rect x="108" y="40" width="84" height="16" rx="8" fill="#D9534F" />
          <rect x="8" y="66" width="88" height="34" rx="4" fill="#FFE2B3" />
          <rect x="104" y="66" width="88" height="34" rx="4" fill="#FFD0D0" />
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="12" y="12" width="100" height="8" rx="2" fill="#333333" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="12" y={30 + i * 18} width="176" height="12" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "C" && (
        <g>
          <circle cx="24" cy="22" r="10" fill="#B9A58C" />
          <rect x="40" y="16" width="100" height="8" rx="2" fill="#333333" />
          <rect x="12" y="42" width="84" height="56" rx="6" fill="#E8E2F4" />
          <rect x="104" y="42" width="84" height="56" rx="6" fill="#E2EEF0" />
          <rect x="20" y="82" width="40" height="10" rx="5" fill="#5B4A8B" />
        </g>
      )}
    </Thumb>
  );
}
