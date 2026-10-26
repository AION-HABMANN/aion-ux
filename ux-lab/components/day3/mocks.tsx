"use client";

import type { ReactNode } from "react";
import { LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the drawn screens of the study cards (CLAUDE.md #52): Kettle & Co, a made-up online grocery shop, so no task is answered here. Each mock is the same screen in
 * different states; the figure around it (components/day3/diagrams.tsx) says what changes and what it does to the person. The shop's own colours are used on purpose,
 * because colour is the subject; text in the mocks keeps a readable contrast except where a state shows low contrast as the problem.
 */

const W = 320;
const H = 210;
const BRAND = "#2E7D4F";
const ACTION = "#1F5FA8";
const WARN = "#B3261E";
const OK = "#2E7D32";
const LOUD = ["#E8590C", "#7048E8", "#0CA678", "#F08C00"];

function Page({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[440px]">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="1" y="1" width={W - 2} height="22" rx="8" fill={BRAND} />
      <Txt x={12} y={16} size={10} bold fill="#FFFFFF">
        Kettle &amp; Co
      </Txt>
      {children}
    </Svg>
  );
}

function Box({ x, y, w, h, fill, text, tc = "#1B1B1F", bold }: { x: number; y: number; w: number; h: number; fill: string; text: string; tc?: string; bold?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={fill} />
      <Txt x={x + w / 2} y={y + h / 2 + 3.5} size={9} bold={bold} anchor="middle" fill={tc}>{text}</Txt>
    </g>
  );
}

/* ------------------------------------------------------------------ A1 · three colour switches on one order page */

export function ColourMock({ accent, warn, areas }: { accent: boolean; warn: boolean; areas: boolean }) {
  const areaFill = (i: number) => (areas ? ["#E6F2EA", "#E8EEF8", "#F6EFE3"][i] : LOUD[i]);
  const areaText = (i: number) => (areas ? "#1B1B1F" : "#FFFFFF");
  return (
    <Page label={tt("A Kettle & Co order page with three areas (fruit, dairy, bakery), a delivery notice and a Pay button; the switches change how colour is used")}>
      {[tt("Fruit"), tt("Dairy"), tt("Bakery")].map((l, i) => <Box key={l} x={12 + i * 101} y={32} w={94} h={26} fill={areaFill(i)} text={l} tc={areaText(i)} bold />)}
      <Box x={12} y={70} w={296} h={24} fill={warn ? "#EEF2F6" : WARN} text={warn ? tt("Delivery on Saturday between 8 and 12") : tt("ATTENTION: delivery on Saturday")} tc={warn ? "#1B1B1F" : "#FFFFFF"} />
      <Txt x={12} y={114} size={9}>{tt("3 items · free delivery")}</Txt>
      <Box x={12} y={150} w={140} h={32} fill={accent ? ACTION : LITE} text={tt("Pay now")} tc={accent ? "#FFFFFF" : "#555555"} bold />
      <Box x={168} y={150} w={140} h={32} fill={accent ? "#FFFFFF" : LOUD[3]} text={tt("Keep shopping")} tc={accent ? ACTION : "#FFFFFF"} />
      {accent && <rect x="168" y="150" width="140" height="32" rx="5" fill="none" stroke={ACTION} strokeWidth="1.5" />}
    </Page>
  );
}

/* ------------------------------------------------------------------ A2 · decorative against functional colour */

export function FunctionMock({ kind }: { kind: "decorative" | "functional" }) {
  const deco = kind === "decorative";
  return (
    <Page label={deco ? tt("A Kettle & Co order list in which a link, a button, an information box and a status are all in the same bright tones") : tt("The same order list in which action is blue, warning red, information grey, and every status has a word and a symbol")}>
      <Txt x={12} y={40} size={10} bold>{tt("Your orders")}</Txt>
      {[[tt("Order 1042"), deco ? LOUD[0] : OK, deco ? "" : tt("✓ Delivered")], [tt("Order 1043"), deco ? LOUD[2] : "#8A6D00", deco ? "" : tt("◷ On its way")], [tt("Order 1044"), deco ? LOUD[1] : WARN, deco ? "" : tt("! Payment failed")]].map(([o, c, w], i) => (
        <g key={o as string}>
          <rect x="12" y={50 + i * 28} width="296" height="22" rx="4" fill="#F5F6F8" />
          <Txt x={22} y={65 + i * 28} size={9}>{o as string}</Txt>
          <circle cx={deco ? 290 : 200} cy={61 + i * 28} r="6" fill={c as string} />
          {!deco && <Txt x={212} y={65 + i * 28} size={9} bold fill={c as string}>{w as string}</Txt>}
        </g>
      ))}
      <Box x={12} y={142} w={140} h={28} fill={deco ? LOUD[1] : ACTION} text={tt("Order again")} tc="#FFFFFF" bold />
      <Box x={168} y={142} w={140} h={28} fill={deco ? LOUD[0] : "#EEF2F6"} text={tt("New: summer fruit")} tc={deco ? "#FFFFFF" : "#1B1B1F"} />
      <Txt x={12} y={190} size={8} fill={deco ? LOUD[2] : ACTION}>{tt("Change delivery address")}</Txt>
    </Page>
  );
}

/* ------------------------------------------------------------------ A3 · four levers of readable type */

export function TypeMock({ size, spacing, contrast, structure }: { size: boolean; spacing: boolean; contrast: boolean; structure: boolean }) {
  const fs = size ? 10.5 : 7.2;
  const gap = (spacing ? 1.7 : 1.15) * fs;
  const fill = contrast ? "#222222" : "#A6A6A6";
  const lines = structure
    ? [tt("Your delivery: Saturday, 8 to 12."), "", tt("Please be at home. If you are not,"), tt("we leave the box with a neighbour."), "", tt("To change the time: Orders › Delivery.")]
    : [tt("Your delivery is planned for Saturday between 8 and 12 o'clock;"), tt("please make sure that someone is at home, otherwise the box"), tt("is left with a neighbour or at the nearest pick-up point, and to"), tt("change the time go to Orders and then Delivery in your account.")];
  return (
    <Page label={tt("A Kettle & Co delivery notice; the switches change the type size, the line spacing, the contrast of the text and the structure of the paragraph")}>
      <Txt x={12} y={42} size={11} bold>{tt("Delivery notice")}</Txt>
      {lines.map((l, i) => (l ? <Txt key={i} x={12} y={62 + i * gap} size={fs} fill={fill}>{l}</Txt> : null))}
    </Page>
  );
}

/* ------------------------------------------------------------------ A4 · a help page flat, with a hierarchy, or with too many styles */

export function HierMock({ kind }: { kind: "flat" | "clear" | "over" }) {
  const label = kind === "flat" ? tt("A Kettle & Co help page where the headings look like the body text") : kind === "clear" ? tt("The same help page with one page heading, three section headings and body text") : tt("The same help page with many sizes, colours and styles that compete");
  const sections = [tt("Delivery"), tt("Returns"), tt("Payment")];
  return (
    <Page label={label}>
      {kind === "flat" && (
        <g>
          <Txt x={12} y={40} size={8.5}>{tt("Help")}</Txt>
          {sections.map((s, i) => (
            <g key={s}>
              <Txt x={12} y={60 + i * 44} size={8.5}>{s}</Txt>
              <rect x="12" y={66 + i * 44} width="280" height="4" rx="2" fill={MID} />
              <rect x="12" y={74 + i * 44} width="240" height="4" rx="2" fill={MID} />
            </g>
          ))}
        </g>
      )}
      {kind === "clear" && (
        <g>
          <Txt x={12} y={44} size={15} bold>{tt("Help")}</Txt>
          {sections.map((s, i) => (
            <g key={s}>
              <Txt x={12} y={72 + i * 42} size={11} bold fill={BRAND}>{s}</Txt>
              <rect x="12" y={78 + i * 42} width="280" height="4" rx="2" fill={MID} />
              <rect x="12" y={86 + i * 42} width="220" height="4" rx="2" fill={MID} />
            </g>
          ))}
        </g>
      )}
      {kind === "over" && (
        <g>
          <Txt x={12} y={44} size={16} bold fill={LOUD[1]}>{tt("HELP!")}</Txt>
          {sections.map((s, i) => (
            <g key={s}>
              <Txt x={12 + (i % 2) * 30} y={72 + i * 42} size={[13, 9, 12][i]} bold fill={LOUD[i]}>{s}</Txt>
              <rect x="12" y={78 + i * 42} width="280" height="4" rx="2" fill={[LOUD[2], MID, LOUD[0]][i]} />
              <Txt x={200} y={72 + i * 42} size={8} fill={LOUD[3]}>{tt("NEW!")}</Txt>
            </g>
          ))}
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A5 · the thumbnails of Kettle & Co's three measures */

export function MeasureThumb({ kind }: { kind: "status" | "action" | "size" }) {
  const label = kind === "status" ? tt("A word and a symbol next to every status colour") : kind === "action" ? tt("One action colour for every button that does something") : tt("Larger body text with more line spacing");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "status" && (
        <g>
          {[OK, "#8A6D00", WARN].map((c, i) => (
            <g key={c}>
              <circle cx="22" cy={24 + i * 28} r="7" fill={c} />
              <rect x="36" y={20 + i * 28} width="70" height="8" rx="2" fill={c} />
            </g>
          ))}
        </g>
      )}
      {kind === "action" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x="14" y={14 + i * 30} width="110" height="20" rx="5" fill={ACTION} />)}
          {[0, 1, 2].map((i) => <rect key={`t${i}`} x="134" y={20 + i * 30} width="50" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "size" && (
        <g>
          {[0, 1, 2, 3].map((i) => <rect key={i} x="14" y={16 + i * 22} width={170 - (i % 2) * 30} height="9" rx="2" fill="#555555" />)}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three HealthConnect designs */

export function HealthThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: strong brand colours, white text on a light brand colour") : kind === "B" ? tt("Variant B: black text on white, plain and high in contrast") : tt("Variant C: an elegant thin typeface, small text and faint navigation");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="8" y="8" width="184" height="94" rx="4" fill="#7FD1C7" />
          {[0, 1, 2].map((i) => <rect key={i} x="18" y={22 + i * 22} width={150 - i * 20} height="8" rx="2" fill="#E8FAF7" />)}
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="14" y="14" width="110" height="11" rx="2" fill="#111111" />
          {[0, 1, 2].map((i) => <rect key={i} x="14" y={38 + i * 18} width="170" height="8" rx="2" fill="#333333" />)}
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="14" y="14" width="120" height="6" rx="1" fill="#555555" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="14" y={34 + i * 12} width="170" height="2.5" rx="1" fill="#777777" />)}
          {[0, 1, 2].map((i) => <rect key={`n${i}`} x={130 + i * 20} y="94" width="14" height="3" rx="1" fill="#DDDDDD" />)}
        </g>
      )}
    </Thumb>
  );
}
