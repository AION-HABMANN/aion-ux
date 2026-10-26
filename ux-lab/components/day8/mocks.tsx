"use client";

import type { ReactNode } from "react";
import { LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the drawn screens of the study cards (CLAUDE.md #52): Lantern Kitchens, a made-up kitchen maker with an online planner and an app, so no task is answered
 * here. Each mock is the same screen in different states; the figure around it (components/day8/diagrams.tsx) says what changes and what it does to the person. Own
 * greys and one accent only.
 */

const W = 320;
const H = 220;
const ACC = "#8A4B1F";
const SOFT = "#F6EDE4";

function Page({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[440px]">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="1" y="1" width={W - 2} height="22" rx="8" fill={ACC} />
      <Txt x={12} y={16} size={10} bold fill="#FFFFFF">Lantern Kitchens</Txt>
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

const STAGES = () => [tt("Your room"), tt("Your style"), tt("Your layout"), tt("Your offer")];

function Path({ y, at, done }: { y: number; at: number; done?: boolean }) {
  const s = STAGES();
  return (
    <g>
      <line x1="30" y1={y} x2="290" y2={y} stroke={MID} strokeWidth="3" />
      {s.map((l, i) => (
        <g key={l}>
          <circle cx={30 + i * 86.6} cy={y} r="8" fill={i < at || done ? ACC : i === at ? "#FFFFFF" : LITE} stroke={ACC} strokeWidth={i === at ? 2.5 : 1} />
          <Txt x={30 + i * 86.6} y={y + 20} size={7.5} anchor="middle" bold={i === at} fill="#333333">{l}</Txt>
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ A1 · a list of functions and a journey */

export function PlannerMock({ kind }: { kind: "list" | "journey" }) {
  return (
    <Page label={kind === "list" ? tt("The Lantern Kitchens planner start page as a list of six functions") : tt("The same start page showing the goal, a kitchen planned and offered, and the path of four stages")}>
      {kind === "list" ? (
        <g>
          <Txt x={14} y={44} size={10} bold>{tt("Kitchen planner · functions")}</Txt>
          {[tt("Room dimensions"), tt("Cabinet catalogue"), tt("Worktop materials"), tt("Appliance list"), tt("Price calculator"), tt("Saved plans")].map((f, i) => (
            <g key={f}>
              <rect x={14 + (i % 2) * 150} y={56 + Math.floor(i / 2) * 32} width="142" height="24" rx="4" fill={LITE} />
              <Txt x={22 + (i % 2) * 150} y={72 + Math.floor(i / 2) * 32} size={8.5}>{f}</Txt>
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="14" y="32" width="292" height="56" rx="8" fill={SOFT} />
          <Txt x={24} y={52} size={12} bold>{tt("Your new kitchen, planned with you")}</Txt>
          <Txt x={24} y={72} size={9} fill="#333333">{tt("Four stages. At the end you have a plan and an offer.")}</Txt>
          <Path y={116} at={0} />
          <Btn x={14} y={170} w={160} text={tt("Start with your room")} strong />
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A2 · a goal, visible progress and a resolution */

export function JourneyMock({ goal, progress, resolution }: { goal: boolean; progress: boolean; resolution: boolean }) {
  return (
    <Page label={tt("The Lantern Kitchens planner at the end of stage 3; the switches add the goal, a visible path and a real ending")}>
      {goal && <Txt x={14} y={42} size={9} fill={ACC} bold>{tt("Goal: your kitchen plan and offer")}</Txt>}
      {progress ? <Path y={66} at={resolution ? 4 : 3} done={resolution} /> : <Txt x={14} y={70} size={9} fill="#777777">{tt("Layout")}</Txt>}
      {resolution ? (
        <g>
          <rect x="14" y="102" width="292" height="60" rx="8" fill={SOFT} />
          <Txt x={24} y={124} size={11} bold>{tt("Your plan is ready")}</Txt>
          <Txt x={24} y={142} size={9} fill="#333333">{tt("Here it is, with your offer. A planner will call you.")}</Txt>
          <Btn x={14} y={176} w={150} text={tt("See my plan")} strong />
        </g>
      ) : (
        <g>
          <rect x="14" y="102" width="292" height="40" rx="4" fill={LITE} />
          <Txt x={24} y={126} size={9} fill="#555555">{tt("Data saved.")}</Txt>
          <Btn x={14} y={176} w={120} text={tt("Next")} />
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A3 · the moment between two steps, three ways */

export function TransitionMock({ kind }: { kind: "bare" | "staged" | "short" }) {
  return (
    <Page label={kind === "bare" ? tt("Between two steps only a Next button") : kind === "staged" ? tt("Between two steps a long illustrated scene about a family's dream kitchen before the next step") : tt("Between two steps one line: your room is in, next your style, it takes a few choices")}>
      <Txt x={14} y={44} size={9} fill="#555555">{tt("Step 1 · Your room · done")}</Txt>
      {kind === "bare" && <Btn x={14} y={120} w={120} text={tt("Next")} />}
      {kind === "staged" && (
        <g>
          <rect x="14" y="56" width="292" height="90" rx="8" fill="#EADBCB" />
          <circle cx="60" cy="100" r="22" fill="#D2B79C" />
          <circle cx="110" cy="96" r="18" fill="#C9A98A" />
          <Txt x={140} y={84} size={8.5} fill="#333333">{tt("Imagine a Sunday morning…")}</Txt>
          <Txt x={140} y={100} size={8.5} fill="#333333">{tt("The smell of coffee, the light…")}</Txt>
          <Txt x={140} y={116} size={8.5} fill="#333333">{tt("This is where memories are made.")}</Txt>
          <Txt x={140} y={132} size={8.5} fill="#333333">{tt("Scroll to continue ↓")}</Txt>
          <Btn x={14} y={164} w={150} text={tt("Continue the story")} />
        </g>
      )}
      {kind === "short" && (
        <g>
          <rect x="14" y="56" width="292" height="54" rx="8" fill={SOFT} />
          <Txt x={24} y={78} size={10} bold>{tt("Your room is in.")}</Txt>
          <Txt x={24} y={96} size={9} fill="#333333">{tt("Next: your style. A few choices, all changeable.")}</Txt>
          <Btn x={14} y={124} w={150} text={tt("Choose your style")} strong />
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ B2 · three journeys of different weight */

export function WeightMock({ kind }: { kind: "reorder" | "fitting" | "plan" }) {
  return (
    <Page label={kind === "reorder" ? tt("Reordering a spare handle: one screen with the part and Order") : kind === "fitting" ? tt("Booking the fitting day: three steps with a short line between them") : tt("Planning a whole kitchen: four stages with a goal, a path and an ending")}>
      {kind === "reorder" && (
        <g>
          <Txt x={14} y={46} size={10} bold>{tt("Reorder a part")}</Txt>
          <rect x="14" y="58" width="292" height="40" rx="4" fill={LITE} />
          <Txt x={24} y={82} size={9}>{tt("Handle, brushed steel · as before")}</Txt>
          <Btn x={14} y={112} w={120} text={tt("Order")} strong />
          <Txt x={14} y={170} size={8.5} fill="#555555">{tt("No story needed: it is done in one step.")}</Txt>
        </g>
      )}
      {kind === "fitting" && (
        <g>
          <Txt x={14} y={46} size={10} bold>{tt("Book your fitting day")}</Txt>
          {[tt("Date"), tt("Access"), tt("Confirm")].map((s, i) => (
            <g key={s}>
              <circle cx={40 + i * 120} cy="80" r="8" fill={i === 0 ? ACC : LITE} stroke={ACC} />
              <Txt x={40 + i * 120} y={100} size={8} anchor="middle">{s}</Txt>
            </g>
          ))}
          <Txt x={14} y={130} size={9} fill="#333333">{tt("Date chosen. Next: how our fitters get in.")}</Txt>
          <Txt x={14} y={170} size={8.5} fill="#555555">{tt("A little guidance: steps and short transitions.")}</Txt>
        </g>
      )}
      {kind === "plan" && (
        <g>
          <Txt x={14} y={44} size={9} fill={ACC} bold>{tt("Goal: your kitchen plan and offer")}</Txt>
          <Path y={72} at={2} />
          <Txt x={14} y={130} size={9} fill="#333333">{tt("Your style is set. Next: where everything goes.")}</Txt>
          <Txt x={14} y={170} size={8.5} fill="#555555">{tt("Full guidance: a goal, a path, transitions, an ending.")}</Txt>
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A5 · the thumbnails of Lantern Kitchens's three measures */

export function MeasureThumb({ kind }: { kind: "goal" | "path" | "film" }) {
  const label = kind === "goal" ? tt("A start screen that shows the goal and the first step") : kind === "path" ? tt("A path of four stages with the current one marked") : tt("A brand film before the planner starts");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "goal" && (
        <g>
          <rect x="12" y="14" width="176" height="40" rx="5" fill={SOFT} />
          <rect x="22" y="24" width="120" height="8" rx="2" fill="#333333" />
          <rect x="22" y="38" width="90" height="5" rx="2" fill={MID} />
          <rect x="12" y="70" width="90" height="18" rx="5" fill={ACC} />
        </g>
      )}
      {kind === "path" && (
        <g>
          <line x1="24" y1="55" x2="176" y2="55" stroke={MID} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={24 + i * 50.6} cy="55" r="9" fill={i < 2 ? ACC : i === 2 ? "#FFFFFF" : LITE} stroke={ACC} strokeWidth={i === 2 ? 3 : 1} />)}
        </g>
      )}
      {kind === "film" && (
        <g>
          <rect x="20" y="14" width="160" height="80" rx="4" fill="#3A2A1E" />
          <polygon points="90,38 90,70 116,54" fill="#FFFFFF" />
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three FutureSkills journeys */

export function JourneyThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: a short list of clear numbered steps") : kind === "B" ? tt("Variant B: long story text with pictures between the steps") : tt("Variant C: clear steps with a short motivating line and a progress bar");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && [0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="22" cy={22 + i * 22} r="7" fill={MID} />
          <rect x="36" y={18 + i * 22} width="140" height="8" rx="2" fill={LITE} />
        </g>
      ))}
      {kind === "B" && (
        <g>
          <rect x="12" y="10" width="70" height="44" rx="4" fill="#D9C6E8" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="90" y={12 + i * 9} width="98" height="5" rx="2" fill={MID} />)}
          {[0, 1, 2, 3].map((i) => <rect key={`b${i}`} x="12" y={62 + i * 9} width="176" height="5" rx="2" fill={MID} />)}
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="12" y="12" width="176" height="8" rx="4" fill={LITE} />
          <rect x="12" y="12" width="96" height="8" rx="4" fill="#2E7D5B" />
          <rect x="12" y="32" width="130" height="8" rx="2" fill="#333333" />
          <rect x="12" y="46" width="100" height="5" rx="2" fill={MID} />
          <rect x="12" y="70" width="90" height="18" rx="5" fill="#2E7D5B" />
        </g>
      )}
    </Thumb>
  );
}
