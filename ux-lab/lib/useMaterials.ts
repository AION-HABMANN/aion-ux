"use client";

import { materialsOf } from "@/data/materialRegistry";
import type { DayMaterials } from "@/data/materialRegistry";
import { useDay } from "@/lib/dayContext";

/** The study cards of the day the page belongs to (see lib/dayContext.tsx). */
export const useMaterials = (): DayMaterials => materialsOf(useDay());
