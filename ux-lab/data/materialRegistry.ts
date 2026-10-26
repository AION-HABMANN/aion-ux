import { MATS as D1 } from "@/data/day1/materials";
import { MATS as D2 } from "@/data/day2/materials";
import { MATS as D3 } from "@/data/day3/materials";
import { MATS as D4 } from "@/data/day4/materials";
import { MATS as D5 } from "@/data/day5/materials";
import { MATS as D6 } from "@/data/day6/materials";
import { MATS as D7 } from "@/data/day7/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";

/**
 * One lookup for the study cards of every built day. The shared components (the material card, the "Draws on" chips, the reference list) ask for the cards of
 * the day the page belongs to, so none of them forks per day. A day adds its module here when it is built.
 */
export type DayMaterials = {
  MATERIALS: MaterialMeta[];
  MATERIAL_BY_ID: Record<MaterialId, MaterialMeta>;
  MATERIAL_PLAIN: Record<MaterialId, PlainExplain>;
  materialAnchorId: (id: MaterialId) => string;
  readKey: (id: MaterialId) => string;
};

const EMPTY: DayMaterials = { MATERIALS: [], MATERIAL_BY_ID: {} as Record<MaterialId, MaterialMeta>, MATERIAL_PLAIN: {} as Record<MaterialId, PlainExplain>, materialAnchorId: (id) => `mat-${id}`, readKey: (id) => `d0:${id}` };

const BY_DAY: Record<number, DayMaterials> = { 1: D1, 2: D2, 3: D3, 4: D4, 5: D5, 6: D6, 7: D7 };

export const materialsOf = (day: number): DayMaterials => BY_DAY[day] ?? EMPTY;
