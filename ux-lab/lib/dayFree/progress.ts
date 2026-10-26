import { blockComplete, blockKey, blocksOf, sliceOf } from "@/lib/dayFree/model";
import type { FreeSpec } from "@/lib/dayFree/spec";
import type { MaterialMeta } from "@/data/materialTypes";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

/** Which task blocks of a free-form day are complete: filled in, never correct (CLAUDE.md #28). Keyed "b11", "b12", … */
export function freeTaskBlocks(p: Persisted, spec: FreeSpec): Record<string, boolean> {
  const s = sliceOf(p, spec.day);
  const out: Record<string, boolean> = {};
  for (const b of blocksOf(spec, 1)) out[blockKey(b.id)] = blockComplete(b, s.r1);
  out[blockKey(spec.block2.id)] = blockComplete(spec.block2, s.r2);
  return out;
}

/** Dossier progress for one route: its Core cards marked read + its task blocks completed (every block is Core). */
export function freeDossier(p: Persisted, spec: FreeSpec, materials: MaterialMeta[], route: RouteNo): { done: number; total: number } {
  const cards = materials.filter((m) => m.block === (route === 1 ? "A" : "B") && !m.optional);
  const read = cards.filter((m) => p.ui.sectionsRead[`d${spec.day}:${m.id}`]).length;
  const tb = freeTaskBlocks(p, spec);
  const units = blocksOf(spec, route).map((b) => blockKey(b.id));
  return { done: read + units.filter((k) => tb[k]).length, total: cards.length + units.length };
}

export const route1Minutes = (spec: FreeSpec) => spec.blocks1.reduce((s, b) => s + b.minutes, 0);
export const route2Minutes = (spec: FreeSpec) => spec.block2.minutes;
