"use client";

import { useId } from "react";
import type { ReactNode } from "react";

/**
 * Drawing primitives for the mock screens and pictures of the days after Day 3 (CLAUDE.md #52). Mock screens use their own neutral greys, plus
 * colour only where the problem needs it; the site's blue, teal and rust never colour the evidence (#15, #49). Every picture has a viewBox and a
 * one-string `<title>` (and a `<desc>` where it is large), so it reads at 380 px and for a screen reader (#10).
 */
export const BG = "#F6F6F6";
export const LINE = "#8E8E8E";
export const DARK = "#3A3A3A";
export const MID = "#BDBDBD";
export const LITE = "#E2E2E2";
export const TXT = "#333333";
export const FONT = "system-ui,sans-serif";

export function Svg({ viewBox, label, desc, className, children }: { viewBox: string; label: string; desc?: string; className?: string; children: ReactNode }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox={viewBox} className={className ?? "h-auto w-full"} role="img" aria-labelledby={desc ? `${uid}-t ${uid}-d` : `${uid}-t`}>
      <title id={`${uid}-t`}>{label}</title>
      {desc && <desc id={`${uid}-d`}>{desc}</desc>}
      {children}
    </svg>
  );
}

export function Lines({ x, y, n, w, gap = 7, h = 3.4, fill = LINE, short = 0.6 }: { x: number; y: number; n: number; w: number; gap?: number; h?: number; fill?: string; short?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * short : w} height={h} rx={h / 2} fill={fill} />
      ))}
    </>
  );
}

export function Arrow({ x1, y1, x2, y2, color = DARK, dash }: { x1: number; y1: number; x2: number; y2: number; color?: string; dash?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 5;
  const p = (da: number) => `${x2 - s * Math.cos(a + da)},${y2 - s * Math.sin(a + da)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 2 * Math.cos(a)} y2={y2 - 2 * Math.sin(a)} stroke={color} strokeWidth="1.8" strokeDasharray={dash} />
      <polygon points={`${x2},${y2} ${p(0.45)} ${p(-0.45)}`} fill={color} />
    </g>
  );
}

/** A window of 240 × 170 with a title bar. */
export function Frame({ children, w = 232, h = 162 }: { children: ReactNode; w?: number; h?: number }) {
  return (
    <>
      <rect x="4" y="4" width={w} height={h} rx="6" fill="#FFFFFF" stroke={LINE} strokeWidth="1.5" />
      <rect x="4" y="4" width={w} height="12" rx="6" fill={LITE} stroke={LINE} strokeWidth="1.5" />
      {children}
    </>
  );
}

export function Txt({ x, y, size = 8, bold, anchor = "start", fill = TXT, children }: { x: number; y: number; size?: number; bold?: boolean; anchor?: "start" | "middle" | "end"; fill?: string; children: string }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={bold ? 700 : 400} textAnchor={anchor} fontFamily={FONT} fill={fill}>
      {children}
    </text>
  );
}

export function MiniPage({ x, y, w, h, n = 0, fill = "#FFFFFF" }: { x: number; y: number; w: number; h: number; n?: number; fill?: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={LINE} />
      {n > 0 && <Lines x={x + 5} y={y + 7} n={n} w={w - 10} gap={Math.min(7, (h - 12) / n)} h={3} />}
    </>
  );
}

/** A small person: head, body, arms, legs. */
export function Person({ x, y, s = 1, fill = "#FFFFFF" }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="7" fill={fill} stroke={DARK} strokeWidth="1.6" />
      <path d="M0 7 v16 M-9 13 h18 M0 23 l-7 12 M0 23 l7 12" fill="none" stroke={DARK} strokeWidth="1.7" strokeLinecap="round" />
    </g>
  );
}

/** A tick in a circle (a done step), drawn without any colour meaning. */
export function Tick({ x, y, r = 6, fill = "#FFFFFF" }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={DARK} strokeWidth="1.5" />
      <path d={`M${x - r * 0.5} ${y} l${r * 0.4} ${r * 0.45} l${r * 0.7} ${-r * 0.8}`} fill="none" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/** A numbered dark marker that points at a place a fact describes; it carries no label saying whether something is a problem. */
export function Marker({ x, y, n }: { x: number; y: number; n: number | string }) {
  return (
    <g aria-hidden>
      <circle cx={x} cy={y} r="9.5" fill="#17212E" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">
        {n}
      </text>
    </g>
  );
}

/** A thumbnail card around a small drawing, so a list of options can show what each one is. */
export function Thumb({ label, children, vb = "0 0 200 110" }: { label: string; children: ReactNode; vb?: string }) {
  return (
    <Svg viewBox={vb} label={label}>
      <rect x="1" y="1" width="198" height="108" rx="5" fill={BG} stroke={MID} />
      {children}
    </Svg>
  );
}
