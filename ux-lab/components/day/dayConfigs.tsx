import type { DayConfig } from "@/components/day/DayPages";
import { makeFreeConfig } from "@/components/dayFree/freeDay";
import { KIT as KIT1 } from "@/components/day1/Free";
import { SPEC as SPEC1 } from "@/data/day1/free";
import { KIT as KIT2 } from "@/components/day2/Free";
import { SPEC as SPEC2 } from "@/data/day2/free";
import { KIT as KIT3 } from "@/components/day3/Free";
import { SPEC as SPEC3 } from "@/data/day3/free";
import { KIT as KIT4 } from "@/components/day4/Free";
import { SPEC as SPEC4 } from "@/data/day4/free";
import { KIT as KIT5 } from "@/components/day5/Free";
import { SPEC as SPEC5 } from "@/data/day5/free";
import { KIT as KIT6 } from "@/components/day6/Free";
import { SPEC as SPEC6 } from "@/data/day6/free";
import { KIT as KIT7 } from "@/components/day7/Free";
import { SPEC as SPEC7 } from "@/data/day7/free";
import { KIT as KIT8 } from "@/components/day8/Free";
import { SPEC as SPEC8 } from "@/data/day8/free";
import { KIT as KIT9 } from "@/components/day9/Free";
import { SPEC as SPEC9 } from "@/data/day9/free";
import { KIT as KIT10 } from "@/components/day10/Free";
import { SPEC as SPEC10 } from "@/data/day10/free";
import { KIT as KIT11 } from "@/components/day11/Free";
import { SPEC as SPEC11 } from "@/data/day11/free";
import { materialsOf } from "@/data/materialRegistry";

/** What each built day hands to the shared page frames (components/day/DayPages.tsx). Every day is a free-form day, built the same way (DL-STANDARD v1.8). */
export const DAY_CONFIGS: Record<number, DayConfig> = {
  1: makeFreeConfig(SPEC1, KIT1, materialsOf(1)),
  2: makeFreeConfig(SPEC2, KIT2, materialsOf(2)),
  3: makeFreeConfig(SPEC3, KIT3, materialsOf(3)),
  4: makeFreeConfig(SPEC4, KIT4, materialsOf(4)),
  5: makeFreeConfig(SPEC5, KIT5, materialsOf(5)),
  6: makeFreeConfig(SPEC6, KIT6, materialsOf(6)),
  7: makeFreeConfig(SPEC7, KIT7, materialsOf(7)),
  8: makeFreeConfig(SPEC8, KIT8, materialsOf(8)),
  9: makeFreeConfig(SPEC9, KIT9, materialsOf(9)),
  10: makeFreeConfig(SPEC10, KIT10, materialsOf(10)),
  11: makeFreeConfig(SPEC11, KIT11, materialsOf(11)),
};
