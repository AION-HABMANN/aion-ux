"use client";

import type { ReactNode } from "react";
import { DARK, LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the drawn screens of the study cards (CLAUDE.md #52): Brightwater, a made-up leisure centre with a pool, a gym and courses, so no task is answered here.
 * Each mock is the same screen in different states; the figure around it (components/day2/diagrams.tsx) says what changes and what it does to the person. Own greys only.
 */

const W = 320;
const H = 210;
const ACC = "#1F6F8B";
const EYE = "#E07A1F";

function Page({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[440px]">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="1" y="1" width={W - 2} height="22" rx="8" fill={LITE} />
      <Txt x={12} y={16} size={10} bold>
        Brightwater
      </Txt>
      {children}
    </Svg>
  );
}

/** A numbered orange dot: where the eye goes, in order. */
function Eye({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" fill={EYE} />
      <Txt x={x} y={y + 3.5} size={9} bold anchor="middle" fill="#FFFFFF">{String(n)}</Txt>
    </g>
  );
}

const bar = (x: number, y: number, w: number, fill = LITE, h = 5) => <rect x={x} y={y} width={w} height={h} rx="2" fill={fill} />;
/** `bar` inside a list, with its key. */
const barK = (k: number, x: number, y: number, w: number, fill = LITE, h = 5) => <g key={k}>{bar(x, y, w, fill, h)}</g>;

/* ------------------------------------------------------------------ A1 · the same start page from the provider's side or the user's side */

export function HomeMock({ kind }: { kind: "provider" | "user" }) {
  const provider = [tt("Department of Sport"), tt("Facilities Management"), tt("Course Administration"), tt("Customer Office"), tt("Press"), tt("About us")];
  return (
    <Page label={kind === "provider" ? tt("A Brightwater start page with a menu named after six departments and a welcome text from the management") : tt("The same start page with three large buttons for what visitors come to do: book a swim, find a course, opening hours")}>
      {kind === "provider" ? (
        <g>
          {provider.map((p, i) => (
            <g key={p}>
              <rect x={10 + (i % 3) * 102} y={32 + Math.floor(i / 3) * 24} width="96" height="18" rx="3" fill={LITE} />
              <Txt x={58 + (i % 3) * 102} y={44 + Math.floor(i / 3) * 24} size={7.5} anchor="middle">{p}</Txt>
            </g>
          ))}
          <Txt x={12} y={96} size={10} bold>{tt("A word from our management")}</Txt>
          {[0, 1, 2, 3, 4].map((i) => barK(i, 12, 104 + i * 9, 290 - (i % 2) * 40, MID, 4))}
          <Txt x={12} y={168} size={7} fill="#777777">{tt("Book a swim: see Customer Office › Bookings › Pool")}</Txt>
        </g>
      ) : (
        <g>
          <Txt x={12} y={44} size={11} bold>{tt("What would you like to do?")}</Txt>
          {[tt("Book a swim"), tt("Find a course"), tt("Opening hours")].map((l, i) => (
            <g key={l}>
              <rect x={12 + i * 101} y="56" width="94" height="44" rx="6" fill={i === 0 ? ACC : "#FFFFFF"} stroke={ACC} strokeWidth="1.5" />
              <Txt x={59 + i * 101} y={82} size={10} bold anchor="middle" fill={i === 0 ? "#FFFFFF" : ACC}>{l}</Txt>
            </g>
          ))}
          <Txt x={12} y={124} size={9} bold>{tt("Today: pool open 7 to 21")}</Txt>
          {bar(12, 132, 220, LITE, 4)}
          <Txt x={12} y={186} size={7} fill="#777777">{tt("About us · Press · Jobs")}</Txt>
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A2 · where the scan lands: a dense block or a page built for scanning */

export function ScanMock({ kind }: { kind: "dense" | "scan" }) {
  return (
    <Page label={kind === "dense" ? tt("A Brightwater course page as one long block of text; orange dots show the eye scanning across the top and down the left edge") : tt("The same course page with a heading, three short labelled facts and a Book button; orange dots show the eye landing on the heading, the facts and the button")}>
      {kind === "dense" ? (
        <g>
          <Txt x={12} y={40} size={10} bold>{tt("Swimming for adults")}</Txt>
          {Array.from({ length: 13 }, (_, i) => barK(i, 12, 50 + i * 10, 296 - (i % 3) * 30, MID, 4))}
          <Eye x={40} y={40} n={1} />
          <Eye x={150} y={62} n={2} />
          <Eye x={22} y={96} n={3} />
          <Eye x={22} y={140} n={4} />
          <Txt x={160} y={200} size={7} anchor="middle" fill="#777777">{tt("The dates and the price are in line 9; the booking link is in line 12")}</Txt>
        </g>
      ) : (
        <g>
          <Txt x={12} y={42} size={12} bold>{tt("Swimming for adults")}</Txt>
          {[[tt("When"), tt("Tuesdays, 18:00")], [tt("Level"), tt("Beginners")], [tt("Length"), tt("8 weeks")]].map(([k, v], i) => (
            <g key={k}>
              <Txt x={12} y={66 + i * 20} size={9} bold>{k}</Txt>
              <Txt x={70} y={66 + i * 20} size={9}>{v}</Txt>
            </g>
          ))}
          <rect x="12" y="132" width="120" height="28" rx="5" fill={ACC} />
          <Txt x={72} y={150} size={10} bold anchor="middle" fill="#FFFFFF">{tt("Book a place")}</Txt>
          {bar(150, 136, 150, LITE, 4)}
          {bar(150, 146, 120, LITE, 4)}
          <Eye x={150} y={38} n={1} />
          <Eye x={150} y={80} n={2} />
          <Eye x={140} y={146} n={3} />
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A3 · contrast, grouping and structure switched on one at a time */

export function GuideMock({ contrast, grouping, structure }: { contrast: boolean; grouping: boolean; structure: boolean }) {
  const items = [tt("Pool"), tt("Sauna"), tt("Gym"), tt("Yoga"), tt("Swim course"), tt("Kids' course")];
  const pos = (i: number) => {
    if (structure) return { x: 12 + (i < 3 ? 0 : 156), y: 58 + (i % 3) * 30 };
    const scatter = [[20, 40], [170, 52], [90, 92], [230, 120], [30, 140], [150, 168]];
    return { x: scatter[i][0], y: scatter[i][1] };
  };
  return (
    <Page label={tt("A Brightwater page with six offers, a Book button and, depending on the switches, strong contrast for the button, the offers grouped into Facilities and Courses, and a clear two-column structure")}>
      {structure && (
        <g>
          <Txt x={12} y={46} size={9} bold>{tt("Facilities")}</Txt>
          <Txt x={168} y={46} size={9} bold>{tt("Courses")}</Txt>
        </g>
      )}
      {grouping && (
        <g>
          <rect x={structure ? 6 : 12} y={structure ? 50 : 30} width={structure ? 146 : 296} height={structure ? 92 : 70} rx="6" fill="none" stroke={MID} strokeDasharray={structure ? undefined : "4 3"} />
          {structure && <rect x="162" y="50" width="146" height="92" rx="6" fill="none" stroke={MID} />}
        </g>
      )}
      {items.map((l, i) => {
        const p = pos(i);
        const tint = grouping ? (i < 4 ? "#DCEBF1" : "#F3E3D3") : ["#F6D6D6", "#D6F0E0", "#E8D6F3", "#F6EDC9", "#D6E4F6", "#F3D6E8"][i];
        return (
          <g key={l}>
            <rect x={p.x} y={p.y} width="120" height="22" rx="4" fill={tint} />
            <Txt x={p.x + 8} y={p.y + 15} size={8.5}>{l}</Txt>
          </g>
        );
      })}
      <rect x="196" y="176" width="112" height="24" rx="5" fill={contrast ? ACC : LITE} />
      <Txt x={252} y={192} size={9.5} bold anchor="middle" fill={contrast ? "#FFFFFF" : "#8A8A8A"}>{tt("Book now")}</Txt>
      {!grouping && !structure && <rect x="250" y="30" width="60" height="18" rx="3" fill="#F6D6D6" />}
    </Page>
  );
}

/* ------------------------------------------------------------------ A4 · one start page at three densities */

export function DensityMock({ kind }: { kind: "crowded" | "balanced" | "sparse" }) {
  return (
    <Page label={kind === "crowded" ? tt("A Brightwater start page crowded with twelve boxes, banners and text") : kind === "balanced" ? tt("A Brightwater start page with three clear tasks, today's hours and one news item") : tt("A Brightwater start page with only a large photo and one Menu button")}>
      {kind === "crowded" && (
        <g>
          <rect x="10" y="28" width="300" height="16" rx="3" fill="#E9B7B7" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={10 + (i % 4) * 76} y={50 + Math.floor(i / 4) * 34} width="70" height="28" rx="3" fill={["#D6E4F6", "#F6EDC9", "#D6F0E0", "#F3D6E8"][i % 4]} />
          ))}
          {[0, 1, 2].map((i) => barK(i, 10, 158 + i * 9, 300, MID, 4))}
          <rect x="250" y="184" width="60" height="18" rx="3" fill={LITE} />
          <Txt x={280} y={196} size={7} anchor="middle" fill="#8A8A8A">{tt("Book")}</Txt>
        </g>
      )}
      {kind === "balanced" && (
        <g>
          {[tt("Book a swim"), tt("Find a course"), tt("Opening hours")].map((l, i) => (
            <g key={l}>
              <rect x={12 + i * 101} y="40" width="94" height="40" rx="6" fill={i === 0 ? ACC : "#FFFFFF"} stroke={ACC} strokeWidth="1.5" />
              <Txt x={59 + i * 101} y={64} size={9.5} bold anchor="middle" fill={i === 0 ? "#FFFFFF" : ACC}>{l}</Txt>
            </g>
          ))}
          <Txt x={12} y={106} size={9} bold>{tt("Today: pool 7 to 21, sauna 12 to 22")}</Txt>
          <rect x="12" y="120" width="296" height="50" rx="5" fill={LITE} />
          <Txt x={22} y={140} size={8.5} bold>{tt("News: new yoga course in May")}</Txt>
          {bar(22, 150, 200, MID, 4)}
        </g>
      )}
      {kind === "sparse" && (
        <g>
          <rect x="10" y="28" width="300" height="150" rx="4" fill={MID} />
          <Txt x={160} y={108} size={14} bold anchor="middle" fill="#FFFFFF">{tt("Feel the water")}</Txt>
          <rect x="250" y="184" width="60" height="18" rx="3" fill={LITE} />
          <Txt x={280} y={196} size={8} anchor="middle">{tt("Menu ≡")}</Txt>
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A5 · the thumbnails of Brightwater's three measures */

export function MeasureThumb({ kind }: { kind: "tasks" | "search" | "hours" }) {
  const label = kind === "tasks" ? tt("Three large task buttons at the top of the start page") : kind === "search" ? tt("A search box at the top of every page") : tt("Opening hours as a short list instead of a paragraph");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "tasks" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 62} y="14" width="56" height="34" rx="5" fill={i === 0 ? ACC : LITE} />)}
          {[0, 1, 2].map((i) => <rect key={i} x="10" y={62 + i * 12} width="176" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "search" && (
        <g>
          <rect x="10" y="12" width="150" height="20" rx="10" fill="#FFFFFF" stroke={ACC} strokeWidth="2" />
          <circle cx="174" cy="22" r="8" fill={ACC} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="10" y={46 + i * 14} width="176" height="7" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "hours" && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="12" y={16 + i * 20} width="50" height="9" rx="2" fill={DARK} />
              <rect x="74" y={16 + i * 20} width="80" height="9" rx="2" fill={MID} />
            </g>
          ))}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three EduFlex start pages */

export function EduThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: many boxes, lists and banners directly visible") : kind === "B" ? tt("Variant B: a short, clearly structured page with three entry points") : tt("Variant C: one large image, a slogan and small, faded links");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="8" y="8" width="184" height="12" rx="2" fill="#E9B7B7" />
          {Array.from({ length: 9 }, (_, i) => <rect key={i} x={8 + (i % 3) * 62} y={24 + Math.floor(i / 3) * 22} width="58" height="18" rx="2" fill={["#D6E4F6", "#F6EDC9", "#D6F0E0"][i % 3]} />)}
          {[0, 1].map((i) => <rect key={i} x="8" y={94 + i * 6} width="184" height="3" rx="1" fill={MID} />)}
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="12" y="12" width="100" height="9" rx="2" fill={DARK} />
          {[0, 1, 2].map((i) => <rect key={i} x={12 + i * 60} y="34" width="54" height="34" rx="4" fill="#FFFFFF" stroke={ACC} strokeWidth="1.5" />)}
          <rect x="12" y="82" width="120" height="5" rx="2" fill={LITE} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="8" y="8" width="184" height="80" rx="4" fill="#5D6D7E" />
          <rect x="24" y="40" width="100" height="10" rx="2" fill="#FFFFFF" />
          {[0, 1, 2].map((i) => <rect key={i} x={120 + i * 24} y="96" width="20" height="4" rx="1" fill={LITE} />)}
        </g>
      )}
    </Thumb>
  );
}
