import type { ReactNode } from "react";
import { pixelLabel } from "@/components/comic/pixelLabels";

/**
 * The pixel-art kit of the story comics (DL-STANDARD.md section 13). Everything is drawn on a 160 by 90 grid of "pixels" and shown crisp
 * (`shape-rendering: crispEdges`): chunky sprites with a one-pixel black outline, flat colours, a small palette, big heads, and a face made of a few
 * pixels. People are original characters of the course (never someone else's). A sprite is built from rectangles, so it stays sharp at any size,
 * works in light and dark mode (it sits on its own background) and needs no image file. Speech is never drawn: it is HTML beside the picture
 * (so it wraps in both languages), and the drawings carry only numerals and one-word labels.
 */

export const K = "#1B1B1F";
const SKIN = "#F2C9A0";
const SHOE = "#4A3426";

export type Face = "neutral" | "worried" | "happy" | "sad" | "think" | "surprised";
export type Pose = "down" | "up" | "point";
export type Look = { hair: string; shirt: string; skin?: string; pants?: string; long?: boolean; glasses?: boolean; cap?: string };

/** The cast of the course. A day adds its own people with `LOOK.name = {...}` in its scene file. */
export const LOOK: Record<string, Look> = {
  sofia: { hair: "#5A3A22", shirt: "#7A4DE8", long: true },
  ana: { hair: "#1F1F24", shirt: "#0B8A82", glasses: true },
  lena: { hair: "#9B4A1E", shirt: "#E07A1F", long: true },
  tom: { hair: "#2B2B2B", shirt: "#2E9E6B", skin: "#C68A5A" },
  boss: { hair: "#8A8A90", shirt: "#33415C", glasses: true },
  coach: { hair: "#3B2A20", shirt: "#B5372E", skin: "#E0B088" },
};
export const KID_COLOURS = ["#2E9E6B", "#F59E0B", "#3D7BD9", "#D9534F", "#8A63D2", "#0B8A82"];

function R({ x, y, w, h, c }: { x: number; y: number; w: number; h: number; c: string }) {
  return <rect x={x} y={y} width={w} height={h} fill={c} />;
}

/** A pixel bitmap: each character of a row is one pixel, coloured by `map` (a missing key is transparent). */
export function Bits({ x, y, rows, map }: { x: number; y: number; rows: string[]; map: Record<string, string> }) {
  const out: ReactNode[] = [];
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) {
      const c = map[row[i]];
      if (c) out.push(<rect key={`${i}-${j}`} x={x + i} y={y + j} width={1} height={1} fill={c} />);
    }
  });
  return <g>{out}</g>;
}

/* ------------------------------------------------------------------ the stage */

export type Bg = "office" | "class" | "outside" | "plain" | "night";

export function Stage({ label, bg = "office", children }: { label: string; bg?: Bg; children?: ReactNode }) {
  const wall = bg === "outside" ? "#BFE3F7" : bg === "class" ? "#E8E2CC" : bg === "plain" ? "#EEF1F6" : bg === "night" ? "#2A3350" : "#DBE6F3";
  const floor = bg === "outside" ? "#8FC27A" : bg === "plain" ? "#EEF1F6" : bg === "night" ? "#3A3F58" : "#B9A687";
  const tile = bg === "outside" ? "#7DB168" : bg === "night" ? "#323650" : "#A89574";
  return (
    <svg viewBox="0 0 160 90" className="block h-auto w-full" shapeRendering="crispEdges" role="img" aria-label={label}>
      <title>{label}</title>
      <R x={0} y={0} w={160} h={64} c={wall} />
      {bg !== "plain" && (
        <>
          <R x={0} y={64} w={160} h={26} c={floor} />
          <R x={0} y={64} w={160} h={1} c={K} />
          {Array.from({ length: 16 }, (_, i) => (
            <R key={i} x={i * 10 + 5} y={70 + (i % 2) * 6} w={5} h={1} c={tile} />
          ))}
        </>
      )}
      {bg === "outside" && (
        <>
          <R x={110} y={8} w={14} h={8} c="#FFFFFF" />
          <R x={116} y={5} w={14} h={8} c="#FFFFFF" />
          <R x={20} y={14} w={12} h={6} c="#FFFFFF" />
        </>
      )}
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ people */

const FACE: Record<Face, (x: number, y: number) => ReactNode> = {
  neutral: (x, y) => <R x={x + 6} y={y + 8} w={3} h={1} c={K} />,
  worried: (x, y) => (
    <>
      <R x={x + 4} y={y + 4} w={2} h={1} c={K} />
      <R x={x + 9} y={y + 4} w={2} h={1} c={K} />
      <R x={x + 6} y={y + 8} w={3} h={1} c={K} />
      <R x={x + 5} y={y + 9} w={1} h={1} c={K} />
      <R x={x + 9} y={y + 9} w={1} h={1} c={K} />
    </>
  ),
  happy: (x, y) => (
    <>
      <R x={x + 5} y={y + 8} w={1} h={1} c={K} />
      <R x={x + 9} y={y + 8} w={1} h={1} c={K} />
      <R x={x + 6} y={y + 9} w={3} h={1} c={K} />
    </>
  ),
  sad: (x, y) => (
    <>
      <R x={x + 6} y={y + 9} w={3} h={1} c={K} />
      <R x={x + 5} y={y + 8} w={1} h={1} c={K} />
      <R x={x + 9} y={y + 8} w={1} h={1} c={K} />
      <R x={x + 5} y={y + 7} w={1} h={2} c="#7FB8FF" />
    </>
  ),
  think: (x, y) => (
    <>
      <R x={x + 4} y={y + 4} w={2} h={1} c={K} />
      <R x={x + 7} y={y + 8} w={3} h={1} c={K} />
    </>
  ),
  surprised: (x, y) => (
    <>
      <R x={x + 4} y={y + 3} w={2} h={1} c={K} />
      <R x={x + 9} y={y + 3} w={2} h={1} c={K} />
      <R x={x + 7} y={y + 8} w={2} h={2} c={K} />
    </>
  ),
};

/** A person, 14 wide and 24 tall, standing with its feet at y + 24. `who` is a key of `LOOK`, or give a `look`. */
export function Person({ x, y, who = "sofia", look, face = "neutral", pose = "down", flip = false }: { x: number; y: number; who?: string; look?: Look; face?: Face; pose?: Pose; flip?: boolean }) {
  const l = { ...(LOOK[who] ?? LOOK.sofia), ...look };
  const skin = l.skin ?? SKIN;
  const pants = l.pants ?? "#2F5D9E";
  const arms: [number, number, number, number, string][] =
    pose === "up"
      ? [[0, 6, 2, 8, l.shirt], [12, 11, 2, 6, l.shirt], [0, 3, 2, 3, skin], [12, 17, 2, 2, skin]]
      : pose === "point"
        ? [[0, 11, 2, 6, l.shirt], [12, 11, 8, 2, l.shirt], [20, 11, 2, 2, skin], [0, 17, 2, 2, skin]]
        : [[0, 11, 2, 6, l.shirt], [12, 11, 2, 6, l.shirt], [0, 17, 2, 2, skin], [12, 17, 2, 2, skin]];
  const parts: [number, number, number, number, string][] = [
    [3, 0, 8, 3, l.hair],
    [3, 3, 8, 7, skin],
    [2, 10, 10, 8, l.shirt],
    ...arms,
    [3, 18, 8, 4, pants],
    [3, 22, 3, 2, SHOE],
    [8, 22, 3, 2, SHOE],
  ];
  if (l.long) parts.push([2, 3, 1, 11, l.hair], [11, 3, 1, 11, l.hair]);
  if (l.cap) parts.push([2, 0, 10, 2, l.cap]);
  const g = (
    <g>
      {parts.map((p, i) => (
        <R key={`b${i}`} x={x + p[0] - 1} y={y + p[1] - 1} w={p[2] + 2} h={p[3] + 2} c={K} />
      ))}
      {parts.map((p, i) => (
        <R key={`f${i}`} x={x + p[0]} y={y + p[1]} w={p[2]} h={p[3]} c={p[4]} />
      ))}
      <R x={x + 5} y={y + 5} w={1} h={2} c={K} />
      <R x={x + 9} y={y + 5} w={1} h={2} c={K} />
      {l.glasses && (
        <>
          <R x={x + 4} y={y + 4} w={3} h={1} c={K} />
          <R x={x + 8} y={y + 4} w={3} h={1} c={K} />
          <R x={x + 4} y={y + 7} w={3} h={1} c={K} />
          <R x={x + 8} y={y + 7} w={3} h={1} c={K} />
        </>
      )}
      {FACE[face](x, y)}
    </g>
  );
  return flip ? <g transform={`translate(${2 * (x + 7)},0) scale(-1,1)`}>{g}</g> : g;
}

/** A small figure for a crowd (a learner), 6 wide and 13 tall. */
export function Kid({ x, y, c = "#2E9E6B", flip = false, sad = false }: { x: number; y: number; c?: string; flip?: boolean; sad?: boolean }) {
  const parts: [number, number, number, number, string][] = [
    [1, 0, 4, 2, "#3B2A20"],
    [1, 2, 4, 3, SKIN],
    [0, 5, 6, 5, c],
    [1, 10, 2, 3, "#2F5D9E"],
    [3, 10, 2, 3, "#2F5D9E"],
  ];
  const g = (
    <g>
      {parts.map((p, i) => (
        <R key={`b${i}`} x={x + p[0] - 1} y={y + p[1] - 1} w={p[2] + 2} h={p[3] + 2} c={K} />
      ))}
      {parts.map((p, i) => (
        <R key={`f${i}`} x={x + p[0]} y={y + p[1]} w={p[2]} h={p[3]} c={p[4]} />
      ))}
      <R x={x + 2} y={y + 3} w={1} h={1} c={K} />
      <R x={x + 4} y={y + 3} w={1} h={1} c={K} />
      {sad && <R x={x + 2} y={y + 4} w={3} h={1} c={K} />}
    </g>
  );
  return flip ? <g transform={`translate(${2 * (x + 3)},0) scale(-1,1)`}>{g}</g> : g;
}

/* ------------------------------------------------------------------ furniture and props */

export function Table({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={6} c={K} />
      <R x={x} y={y} w={w} h={4} c="#6D5A3E" />
      <R x={x + 3 - 1} y={y + 4} w={6} h={11} c={K} />
      <R x={x + w - 7} y={y + 4} w={6} h={11} c={K} />
      <R x={x + 3} y={y + 4} w={4} h={10} c="#5A4A32" />
      <R x={x + w - 6} y={y + 4} w={4} h={10} c="#5A4A32" />
    </g>
  );
}

export function Board({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: ReactNode }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={h + 2} c={K} />
      <R x={x} y={y} w={w} h={h} c="#FFFFFF" />
      {children}
    </g>
  );
}

export function Door({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={24} h={44} c={K} />
      <R x={x} y={y} w={22} h={42} c="#8A5A2B" />
      <R x={x + 3} y={y + 3} w={16} h={16} c="#A06A35" />
      <R x={x + 3} y={y + 23} w={16} h={16} c="#A06A35" />
      <R x={x + 16} y={y + 21} w={2} h={2} c="#F5C542" />
    </g>
  );
}

/** A monitor or a framed screen with content drawn inside (use `Lines`, `Bar`, `Chip` and `Icon` as children). */
export function Mon({ x, y, w, h, bar = "#4C2FBF", children }: { x: number; y: number; w: number; h: number; bar?: string | null; children?: ReactNode }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={h + 2} c={K} />
      <R x={x} y={y} w={w} h={h} c="#FFFFFF" />
      {bar && <R x={x} y={y} w={w} h={4} c={bar} />}
      {children}
    </g>
  );
}
export function Lines({ x, y, w, n, gap = 3, c = "#9AA5B5" }: { x: number; y: number; w: number; n: number; gap?: number; c?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <R key={i} x={x} y={y + i * gap} w={i % 3 === 2 ? Math.round(w * 0.6) : w} h={1} c={c} />
      ))}
    </g>
  );
}
export function Bar({ x, y, w, p, c = "#F59E0B" }: { x: number; y: number; w: number; p: number; c?: string }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={4} c={K} />
      <R x={x} y={y} w={w} h={2} c="#E9E6F5" />
      <R x={x} y={y} w={Math.round(w * p)} h={2} c={c} />
    </g>
  );
}
export function Chip({ x, y, w = 8, h = 5, c = "#B5D4F4" }: { x: number; y: number; w?: number; h?: number; c?: string }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={h + 2} c={K} />
      <R x={x} y={y} w={w} h={h} c={c} />
    </g>
  );
}

export function Paper({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const g = "#8A8574";
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={h + 2} c={K} />
      <R x={x} y={y} w={w} h={h} c="#FBF6E6" />
      <R x={x + 3} y={y + 3} w={w - 6} h={1} c={g} />
      <R x={x + 3} y={y + 6} w={w - 6} h={1} c={g} />
      <R x={x + 3} y={y + 3} w={1} h={4} c={g} />
      <R x={x + w - 4} y={y + 3} w={1} h={4} c={g} />
      <R x={x + 3} y={y + 9} w={w - 6} h={1} c={g} />
      <R x={x + 3} y={y + 12} w={w - 6} h={1} c={g} />
      <R x={x + 3} y={y + 9} w={1} h={4} c={g} />
      <R x={x + w - 4} y={y + 9} w={1} h={4} c={g} />
    </g>
  );
}

export function Calendar({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <R x={x - 1} y={y - 1} w={w + 2} h={h + 2} c={K} />
      <R x={x} y={y} w={w} h={h} c="#FFFFFF" />
      <R x={x} y={y} w={w} h={7} c="#D9534F" />
      {[17, 24, 31].map((d) => (
        <R key={d} x={x + 4} y={y + d - 8} w={w - 8} h={1} c="#C9C9C9" />
      ))}
    </g>
  );
}

export function Cloud({ x, y, w = 24, h = 12 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <R x={x - 1} y={y + 2} w={w + 2} h={h - 3} c={K} />
      <R x={x + 3} y={y - 1} w={w - 6} h={4} c={K} />
      <R x={x} y={y + 3} w={w} h={h - 5} c="#FFFFFF" />
      <R x={x + 4} y={y} w={w - 8} h={4} c="#FFFFFF" />
    </g>
  );
}

/** Small round-cornered square icons, 9 by 9. */
const ICON: Record<string, { bg: string; fg: string; rows: string[] }> = {
  check: { bg: "#2E9E6B", fg: "#FFFFFF", rows: [".......#.", "......##.", "#....##..", "##..##...", ".####....", "..##....."] },
  cross: { bg: "#D9534F", fg: "#FFFFFF", rows: ["#.....#", ".#...#.", "..#.#..", "...#...", "..#.#..", ".#...#.", "#.....#"] },
  up: { bg: "#2E9E6B", fg: "#FFFFFF", rows: ["...#...", "..###..", ".#####.", "...#...", "...#...", "...#...", "...#..."] },
  down: { bg: "#D9534F", fg: "#FFFFFF", rows: ["...#...", "...#...", "...#...", "...#...", ".#####.", "..###..", "...#..."] },
  clock: { bg: "#3D7BD9", fg: "#FFFFFF", rows: ["..###..", ".#...#.", "#..#..#", "#..##.#", "#.....#", ".#...#.", "..###.."] },
  warn: { bg: "#F2A900", fg: K, rows: ["...#...", "..###..", "..#.#..", ".#.#.#.", ".#...#.", "#######", "......."] },
  ask: { bg: "#8A63D2", fg: "#FFFFFF", rows: [".#####.", "#.....#", "......#", "...###.", "...#...", ".......", "...#..."] },
  idea: { bg: "#F2A900", fg: K, rows: ["..###..", ".#...#.", ".#...#.", "..###..", "..#.#..", "..###..", "...#..."] },
  eye: { bg: "#3D7BD9", fg: "#FFFFFF", rows: [".......", "..###..", ".#.#.#.", "#.###.#", ".#.#.#.", "..###..", "......."] },
  lock: { bg: "#555B66", fg: "#FFFFFF", rows: ["..###..", ".#...#.", ".#...#.", "#######", "#######", "###.###", "#######"] },
  chart: { bg: "#0B8A82", fg: "#FFFFFF", rows: ["......#", ".....##", "..#.###", "..#.###", "#.#.###", "#.#.###", "#######"] },
  book: { bg: "#B5372E", fg: "#FFFFFF", rows: ["#######", "#..#..#", "#..#..#", "#..#..#", "#..#..#", "#######", "......."] },
  heart: { bg: "#D9534F", fg: "#FFFFFF", rows: [".##.##.", "#######", "#######", ".#####.", "..###..", "...#...", "......."] },
  gear: { bg: "#555B66", fg: "#FFFFFF", rows: ["#.###.#", ".#####.", "###.###", "###.###", "###.###", ".#####.", "#.###.#"] },
  play: { bg: "#3D7BD9", fg: "#FFFFFF", rows: ["#......", "###....", "#####..", "#######", "#####..", "###....", "#......"] },
  pencil: { bg: "#F2A900", fg: K, rows: ["....##.", "...###.", "..###..", ".###...", "###....", "##.....", "#......"] },
};
export function Icon({ x, y, name }: { x: number; y: number; name: keyof typeof ICON | string }) {
  const i = ICON[name] ?? ICON.ask;
  return (
    <g>
      <R x={x - 1} y={y - 1} w={11} h={11} c={K} />
      <R x={x} y={y} w={9} h={9} c={i.bg} />
      <Bits x={x + 1} y={y + 1} rows={i.rows} map={{ "#": i.fg }} />
    </g>
  );
}

/** Tiny marks that sit above a head: sweat, a question, an exclamation. */
export function Mark({ x, y, kind }: { x: number; y: number; kind: "sweat" | "ask" | "bang" | "zzz" }) {
  if (kind === "sweat")
    return (
      <g>
        <R x={x} y={y} w={1} h={2} c="#7FB8FF" />
        <R x={x + 3} y={y + 3} w={1} h={2} c="#7FB8FF" />
      </g>
    );
  if (kind === "bang") return <Bits x={x} y={y} rows={["#", "#", "#", "#", ".", "#"]} map={{ "#": "#D9534F" }} />;
  if (kind === "zzz") return <Bits x={x} y={y} rows={["####", "..#.", ".#..", "####"]} map={{ "#": "#556274" }} />;
  return <Bits x={x} y={y} rows={[".###.", "#...#", "....#", "..##.", "..#..", ".....", "..#.."]} map={{ "#": "#8A63D2" }} />;
}

/** A dotted path of footsteps from one point to another (a learner walking away). */
export function Steps({ x, y, n = 4, dx = 4 }: { x: number; y: number; n?: number; dx?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <R key={i} x={x + i * dx} y={y + (i % 2)} w={2} h={1} c="#8A7A5C" />
      ))}
    </g>
  );
}

export function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <R x={x + 5} y={y + 14} w={4} h={10} c={K} />
      <R x={x + 6} y={y + 14} w={2} h={10} c="#7A5230" />
      <R x={x - 1} y={y - 1} w={16} h={16} c={K} />
      <R x={x} y={y} w={14} h={14} c="#3F8F4A" />
      <R x={x + 3} y={y + 3} w={4} h={3} c="#5CB064" />
    </g>
  );
}

/** A label inside a picture: numerals and one-word labels only, in a chunky monospace so it matches the pixels. */
export function Txt({ x, y, children, size = 5, c = K, anchor = "start", bold = true }: { x: number; y: number; children: ReactNode; size?: number; c?: string; anchor?: "start" | "middle" | "end"; bold?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} fill={c} textAnchor={anchor} fontWeight={bold ? 700 : 400} fontFamily="ui-monospace, Menlo, Consolas, monospace" style={{ shapeRendering: "auto" }}>
      {typeof children === "string" ? pixelLabel(children) : children}
    </text>
  );
}

/** A tiny tick and a tiny cross, 4 by 3 and 3 by 3, that sit above a head or beside a line. */
export function Tick({ x, y, c = "#2E9E6B" }: { x: number; y: number; c?: string }) {
  return <Bits x={x} y={y} rows={["...#", "#.#.", ".#.."]} map={{ "#": c }} />;
}
export function Cross({ x, y, c = "#D9534F" }: { x: number; y: number; c?: string }) {
  return <Bits x={x} y={y} rows={["#.#", ".#.", "#.#"]} map={{ "#": c }} />;
}

/** A stack of coins, `n` high. */
export function Coins({ x, y, n = 4, w = 14 }: { x: number; y: number; n?: number; w?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <R x={x - 1} y={y - i * 4 - 1} w={w + 2} h={6} c={K} />
          <R x={x} y={y - i * 4} w={w} h={4} c="#F5C542" />
          <R x={x + 2} y={y - i * 4 + 1} w={w - 4} h={1} c="#FFE48A" />
        </g>
      ))}
    </g>
  );
}

/** A right arrow, 5 by 3. */
export function Arrow({ x, y, c = K }: { x: number; y: number; c?: string }) {
  return <Bits x={x} y={y} rows={["..#..", "#####", "..#.."]} map={{ "#": c }} />;
}
