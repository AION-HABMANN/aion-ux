import { SPEC as D1 } from "@/data/day1/free";
import { SPEC as D2 } from "@/data/day2/free";
import { SPEC as D3 } from "@/data/day3/free";
import { SPEC as D4 } from "@/data/day4/free";
import { SPEC as D5 } from "@/data/day5/free";
import type { FreeSpec } from "@/lib/dayFree/spec";

/**
 * The days of the course, each built to the free-form standard (DL-STANDARD v1.8): each day's data in one spec (data/dayN/free.ts). A day is added here when its
 * spec exists; the store (empty slices, the mentor fill, reset), the day pages, the course list and the verify script all read this registry, so a day is wired
 * in one place.
 */
export const FREE_SPECS: Record<number, FreeSpec> = { 1: D1, 2: D2, 3: D3, 4: D4, 5: D5 };
export const FREE_DAYS = Object.keys(FREE_SPECS).map(Number);
