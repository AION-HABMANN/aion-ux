import type { Block, MaterialId, MaterialMeta, PlainExplain } from "@/data/materialTypes";
import type { DayMaterials } from "@/data/materialRegistry";

/** The material registry of a generic day: the cards (ids, titles, minutes), their "In plain words" boxes, the anchor and the read key. */
export function makeMaterials(day: number, MATERIALS: MaterialMeta[], MATERIAL_PLAIN: Record<MaterialId, PlainExplain>): DayMaterials {
  return {
    MATERIALS,
    MATERIAL_BY_ID: Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>,
    MATERIAL_PLAIN,
    materialAnchorId: (id) => `mat-${id}`,
    readKey: (id) => `d${day}:${id}`,
  };
}
export type { Block };
