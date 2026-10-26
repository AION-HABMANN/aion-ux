import type { ReactNode } from "react";
import { Board, Icon, K, Person, Stage, Txt } from "@/components/comic/PixelKit";
import type { Bg, Face, Pose } from "@/components/comic/PixelKit";

/**
 * Building blocks for the pixel drawings of the story comics (DL-STANDARD.md section 13). A day's `comicScenes.tsx` composes its panels from these and from
 * the kit in PixelKit.tsx, so a panel is one or two lines and every drawing keeps the same grid, outline and label sizes. Labels inside a drawing are short
 * capital words; each one needs a German entry in pixelLabels.ts.
 */
export type Actor = { who: string; face?: Face; pose?: Pose };

/** Two people at the edges (the left one faces right, the right one faces left) and whatever happens between them. */
export function Duo({ label, bg, left, right, y = 40, children }: { label: string; bg?: Bg; left?: Actor; right?: Actor; y?: number; children?: ReactNode }) {
  return (
    <Stage label={label} bg={bg}>
      {children}
      {left && <Person x={4} y={y} who={left.who} face={left.face} pose={left.pose} />}
      {right && <Person x={142} y={y} who={right.who} face={right.face} pose={right.pose} flip />}
    </Stage>
  );
}

export type Item = { icon?: string; text: string; c?: string; tick?: boolean; cross?: boolean };

/** A board with an optional title and rows of short labels, each with an optional icon, tick or cross. */
export function Notes({ x, y, w, title, items, sub }: { x: number; y: number; w: number; title?: string; items: Item[]; sub?: string }) {
  const top = title ? 13 : 5;
  const h = top + items.length * 11 + (sub ? 8 : 2);
  return (
    <Board x={x} y={y} w={w} h={h}>
      {title && (
        <Txt x={x + 4} y={y + 8} size={4.4} c="#556274">
          {title}
        </Txt>
      )}
      {items.map((it, i) => {
        const ry = y + top + i * 11;
        return (
          <g key={`${it.text}-${i}`}>
            {it.icon && <Icon x={x + 3} y={ry} name={it.icon} />}
            {it.tick && <rect x={x + 3} y={ry + 2} width={4} height={4} fill="#2E9E6B" />}
            {it.cross && <rect x={x + 3} y={ry + 2} width={4} height={4} fill="#D9534F" />}
            <Txt x={x + (it.icon ? 15 : it.tick || it.cross ? 11 : 4)} y={ry + 7} size={4.2} c={it.c ?? K}>
              {it.text}
            </Txt>
          </g>
        );
      })}
      {sub && (
        <Txt x={x + 4} y={y + h - 3} size={3.6} c="#556274">
          {sub}
        </Txt>
      )}
    </Board>
  );
}

/** A rating board: rows of a label and three squares (1 to 3 filled) and a word. Keep it 56 high and the rows at 38, 46 and 54. */
export function Rate({ x, y, w = 104, title, rows }: { x: number; y: number; w?: number; title: string; rows: [label: string, n: 1 | 2 | 3, word: string][] }) {
  return (
    <Board x={x} y={y} w={w} h={56}>
      <Txt x={x + 4} y={y + 8} size={4.4}>
        {title}
      </Txt>
      {rows.map(([label, n, word], i) => {
        const ry = y + 22 + i * 10;
        return (
          <g key={label}>
            <Txt x={x + 4} y={ry} size={4.2} c="#556274">
              {label}
            </Txt>
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x + 34 + k * 6} y={ry - 4} width={4} height={4} fill={k < n ? "#3D7BD9" : "#E0E4EB"} />
            ))}
            <Txt x={x + 56} y={ry} size={4.2}>
              {word}
            </Txt>
          </g>
        );
      })}
    </Board>
  );
}

/** A small screen with a title bar and a few labelled blocks (a mock platform page). Each block is a coloured rectangle with a short label. */
export function Page({ x, y, w, h, title, blocks }: { x: number; y: number; w: number; h: number; title: string; blocks: { text: string; c?: string; h?: number; tc?: string }[] }) {
  let cy = y + 7;
  return (
    <Board x={x} y={y} w={w} h={h}>
      <rect x={x} y={y} width={w} height={5} fill="#3F4A58" />
      <Txt x={x + 2} y={y + 4} size={3.4} c="#FFFFFF">
        {title}
      </Txt>
      {blocks.map((b, i) => {
        const bh = b.h ?? 8;
        const ry = cy;
        cy += bh + 2;
        return (
          <g key={`${b.text}-${i}`}>
            <rect x={x + 3} y={ry} width={w - 6} height={bh} fill={b.c ?? "#E4E8EE"} />
            <Txt x={x + 5} y={ry + Math.min(bh - 2, 6)} size={3.6} c={b.tc ?? K}>
              {b.text}
            </Txt>
          </g>
        );
      })}
    </Board>
  );
}
