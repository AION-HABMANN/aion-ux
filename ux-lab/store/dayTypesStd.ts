import { FREE_SPECS } from "@/data/free/registry";
import { emptyFreeRoute, fieldsOf } from "@/lib/dayFree/model";
import type { FreeRoute, FreeState } from "@/store/dayTypesFree";

/** The empty state of a free-form day, from its spec (a day that is not built yet has an empty slice, so the store's shape never changes). */
export const emptyFreeDayRoute = (day: number, route: 1 | 2): FreeRoute => emptyFreeRoute(FREE_SPECS[day] ? fieldsOf(FREE_SPECS[day], route) : []);
export const emptyFreeDay = (day: number): FreeState => ({ r1: emptyFreeDayRoute(day, 1), r2: emptyFreeDayRoute(day, 2) });
