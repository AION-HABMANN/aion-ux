"use client";

import type { ReactNode } from "react";
import { LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the drawn screens of the study cards (CLAUDE.md #52): Pedalo, a made-up bike-sharing app, so no task is answered here. Each mock is the same phone screen in
 * different states; the figure around it (components/day4/diagrams.tsx) says what changes and what it does to the person. Own greys and one accent only.
 */

const W = 220;
const H = 300;
const ACC = "#1D6F42";

function Phone({ children, label, title = "Pedalo" }: { children: ReactNode; label: string; title?: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[240px]">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="18" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="2" y="2" width={W - 4} height="30" rx="18" fill={ACC} />
      <Txt x={18} y={22} size={11} bold fill="#FFFFFF">{title}</Txt>
      {children}
    </Svg>
  );
}

function Btn({ x, y, w, h = 30, label, strong, small }: { x: number; y: number; w: number; h?: number; label: string; strong?: boolean; small?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={strong ? ACC : "#FFFFFF"} stroke={strong ? ACC : MID} strokeWidth="1.5" />
      <Txt x={x + w / 2} y={y + h / 2 + 4} size={small ? 8 : 10} bold={strong} anchor="middle" fill={strong ? "#FFFFFF" : "#333333"}>{label}</Txt>
    </g>
  );
}

/* ------------------------------------------------------------------ A1 · looking simple against being intuitive */

export function SimpleMock({ kind }: { kind: "simple" | "intuitive" }) {
  return (
    <Phone label={kind === "simple" ? tt("A Pedalo map screen with four unlabelled round icons and nothing else") : tt("The same map screen with a labelled Scan to unlock button, the nearest bike named and a line that says what happens next")}>
      <rect x="14" y="42" width="192" height="150" rx="8" fill={LITE} />
      {[[60, 90], [120, 120], [160, 80]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={ACC} />)}
      {kind === "simple" ? (
        <g>
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={40 + i * 46} cy={232} r="16" fill="#FFFFFF" stroke={MID} strokeWidth="1.5" />)}
          {["◎", "≡", "☆", "⌂"].map((g, i) => <Txt key={g} x={40 + i * 46} y={236} size={12} anchor="middle">{g}</Txt>)}
        </g>
      ) : (
        <g>
          <Txt x={18} y={212} size={9}>{tt("Nearest bike: Market Square, a short walk")}</Txt>
          <Btn x={18} y={222} w={184} h={36} label={tt("Scan to unlock")} strong />
          <Txt x={110} y={276} size={8} anchor="middle" fill="#555555">{tt("Then ride. Park at any green spot to end.")}</Txt>
        </g>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · twelve equal passes against three recommended ones */

export function PassMock({ kind }: { kind: "many" | "few" }) {
  const many = [tt("Single"), tt("Day"), tt("Weekend"), tt("Week"), tt("Month"), tt("Student"), tt("Senior"), tt("Commuter"), tt("Family"), tt("Night"), tt("Tourist"), tt("Flex")];
  return (
    <Phone label={kind === "many" ? tt("A Pedalo pass page with twelve equal pass buttons in a grid") : tt("The same page with three recommended passes, each with one line on who it is for, and a link to all passes")} title={tt("Choose a pass")}>
      {kind === "many" ? (
        many.map((p, i) => <Btn key={p} x={14 + (i % 3) * 66} y={46 + Math.floor(i / 3) * 40} w={60} label={p} small />)
      ) : (
        <g>
          {[[tt("Single ride"), tt("For one trip now")], [tt("Day pass"), tt("For many trips today")], [tt("Month pass"), tt("For riding every day")]].map(([n, w], i) => (
            <g key={n}>
              <rect x="14" y={48 + i * 58} width="192" height="48" rx="8" fill={i === 0 ? "#E7F3EC" : "#FFFFFF"} stroke={i === 0 ? ACC : MID} strokeWidth="1.5" />
              <Txt x={26} y={68 + i * 58} size={11} bold>{n}</Txt>
              <Txt x={26} y={84 + i * 58} size={8.5} fill="#555555">{w}</Txt>
            </g>
          ))}
          <Txt x={110} y={240} size={9} anchor="middle" fill={ACC}>{tt("All passes ›")}</Txt>
        </g>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A3 · expectation, a large near target, the same pattern */

export function ExpectMock({ expect, near, same }: { expect: boolean; near: boolean; same: boolean }) {
  const y = near ? 236 : 50;
  const h = near ? 40 : 22;
  return (
    <Phone label={tt("A Pedalo ride screen with an End ride button; the switches move it to where people expect it, make it large and near the thumb, and keep the same pattern as the other screens")} title={tt("Riding")}>
      <rect x="14" y={near ? 44 : 80} width="192" height="140" rx="8" fill={LITE} />
      <Txt x={110} y={near ? 120 : 156} size={14} bold anchor="middle">12:04</Txt>
      {expect ? (
        <Btn x={near ? 18 : 120} y={y} w={near ? 184 : 82} h={h} label={tt("End ride")} strong />
      ) : (
        <Txt x={near ? 200 : 196} y={near ? 290 : 62} size={7} anchor="end" fill="#888888">{tt("finish")}</Txt>
      )}
      {!same && <circle cx="36" cy={near ? 210 : 60} r="12" fill="#C0392B" />}
      {!same && <Txt x={36} y={near ? 214 : 64} size={8} anchor="middle" fill="#FFFFFF">{tt("Stop")}</Txt>}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A4 · remember the code, or the system remembers */

export function MemoryMock({ kind }: { kind: "remember" | "carried" }) {
  return (
    <Phone label={kind === "remember" ? tt("A Pedalo unlock step that asks Sam to type the six-character bike code he saw on the previous screen") : tt("The same step where the code from the scan is already filled in and only a Confirm button remains")} title={tt("Unlock · step 2")}>
      <Txt x={18} y={60} size={10} bold>{tt("Enter the bike code")}</Txt>
      <rect x="18" y="70" width="184" height="34" rx="6" fill="#FFFFFF" stroke={MID} strokeWidth="1.5" />
      {kind === "remember" ? (
        <g>
          <Txt x={30} y={92} size={11} fill="#999999">{tt("_ _ _ _ _ _")}</Txt>
          <Txt x={18} y={124} size={8.5} fill="#555555">{tt("The code was on the previous screen.")}</Txt>
          <Btn x={18} y={232} w={184} h={36} label={tt("Unlock")} strong />
        </g>
      ) : (
        <g>
          <Txt x={30} y={92} size={11} bold>{tt("B7K 2Q9")}</Txt>
          <Txt x={18} y={124} size={8.5} fill={ACC}>{tt("✓ Taken from your scan")}</Txt>
          <Btn x={18} y={232} w={184} h={36} label={tt("Confirm and unlock")} strong />
        </g>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A5 · the thumbnails of Pedalo's three measures */

export function MeasureThumb({ kind }: { kind: "few" | "carry" | "big" }) {
  const label = kind === "few" ? tt("Three recommended passes and a link to all passes") : kind === "carry" ? tt("The bike code carried over from the scan") : tt("A large End ride button at the bottom of the screen");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "few" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x="14" y={10 + i * 26} width="170" height="20" rx="4" fill={i === 0 ? "#E7F3EC" : LITE} />)}
          <rect x="120" y="92" width="64" height="6" rx="2" fill={ACC} />
        </g>
      )}
      {kind === "carry" && (
        <g>
          <rect x="14" y="20" width="170" height="26" rx="4" fill="#FFFFFF" stroke={ACC} strokeWidth="2" />
          <rect x="24" y="29" width="70" height="8" rx="2" fill="#333333" />
          <rect x="14" y="70" width="170" height="24" rx="5" fill={ACC} />
        </g>
      )}
      {kind === "big" && (
        <g>
          <rect x="14" y="10" width="170" height="54" rx="4" fill={LITE} />
          <rect x="14" y="72" width="170" height="28" rx="6" fill={ACC} />
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three WorkFlow Hub navigation variants */

export function NavThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: a long sidebar with many equal entries") : kind === "B" ? tt("Variant B: five main entries and an All functions entry") : tt("Variant C: cards and tabs that look different in each area");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          {Array.from({ length: 14 }, (_, i) => <rect key={i} x="8" y={6 + i * 7} width="52" height="5" rx="1" fill={MID} />)}
          <rect x="70" y="8" width="120" height="94" rx="3" fill={LITE} />
        </g>
      )}
      {kind === "B" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="8" y={10 + i * 16} width="52" height="10" rx="2" fill={i === 0 ? ACC : MID} />)}
          <rect x="8" y="94" width="52" height="6" rx="1" fill={LITE} />
          <rect x="70" y="8" width="120" height="94" rx="3" fill={LITE} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="8" y="8" width="88" height="40" rx="8" fill="#DDE7F7" />
          <rect x="104" y="8" width="88" height="14" rx="2" fill={MID} />
          <rect x="104" y="26" width="40" height="22" rx="11" fill="#F7E3DD" />
          <rect x="8" y="56" width="184" height="10" rx="5" fill={LITE} />
          <circle cx="30" cy="88" r="12" fill="#E3F7DD" />
          <rect x="52" y="78" width="140" height="20" rx="2" fill="#F1F1F1" />
        </g>
      )}
    </Thumb>
  );
}
