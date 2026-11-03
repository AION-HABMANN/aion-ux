import common from "./common.json";
import d1 from "./day1.json";
import d2 from "./day2.json";
import d3 from "./day3.json";
import d4 from "./day4.json";
import d5 from "./day5.json";
import d6 from "./day6.json";
import d7 from "./day7.json";
import d8 from "./day8.json";
import d9 from "./day9.json";
import d10 from "./day10.json";
import d11 from "./day11.json";
import d12 from "./day12.json";
import d13 from "./day13.json";
import d14 from "./day14.json";
import d15 from "./day15.json";
import d16 from "./day16.json";

/** English text -> German text, for every text that is written in English only in the code (UX-STANDARD 2.20). Merged once, common first and the days after it. */
export const DE: Record<string, string> = Object.assign({}, common, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
