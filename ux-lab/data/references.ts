import { bi } from "@/lib/lang";
import type { Tx } from "@/lib/lang";
import { REFS_D1 } from "@/data/refs/day1";
import { REFS_D2 } from "@/data/refs/day2";
import { REFS_D3 } from "@/data/refs/day3";
import { REFS_D4 } from "@/data/refs/day4";
import { REFS_D5 } from "@/data/refs/day5";
import { REFS_D6 } from "@/data/refs/day6";
import { REFS_D7 } from "@/data/refs/day7";
import { REFS_D8 } from "@/data/refs/day8";
import { REFS_D9 } from "@/data/refs/day9";
import { REFS_D10 } from "@/data/refs/day10";
import { REFS_D11 } from "@/data/refs/day11";
import { REFS_D12 } from "@/data/refs/day12";
import { REFS_D13 } from "@/data/refs/day13";

/**
 * The reference list of the course (CURRICULUM-GUIDE §4): every source a card cites by name is an entry here. A day keeps its sources in
 * `data/refs/dayN.ts` and adds them below; its cards cite the keys, and each Materi block's accordion lists the union of its cards' keys. The text after
 * the title says what the source is used for. Check every source and the current edition before teaching from it.
 */
const RAW = { ...REFS_D1, ...REFS_D2, ...REFS_D3, ...REFS_D4, ...REFS_D5, ...REFS_D6, ...REFS_D7, ...REFS_D8, ...REFS_D9, ...REFS_D10, ...REFS_D11, ...REFS_D12, ...REFS_D13 };

export type RefKey = keyof typeof RAW;
export type Reference = { key: RefKey; chip: string; full: string };

export const REFERENCES: Record<RefKey, Reference> = bi(
  Object.fromEntries(Object.entries(RAW).map(([key, v]) => [key, { key, chip: v.chip, full: v.full }])) as Record<RefKey, { key: RefKey; chip: string; full: Tx }>,
) as unknown as Record<RefKey, Reference>;
export const refFull = (k: RefKey) => REFERENCES[k].full;
export const REFERENCE_ORDER = Object.keys(REFERENCES) as RefKey[];
