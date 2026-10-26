import type { RouteNo } from "@/data/course";

/** Lowercase ASCII, spaces to "-", diacritics stripped (ü → u, ß → ss). */
export function slug(input: string): string {
  return input
    .trim()
    .replace(/ß/g, "ss")
    .replace(/æ/gi, "ae")
    .replace(/ø/gi, "o")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The levels a route spans and its deliverable, per day: Route 1 spans Levels 1 and 2, Route 2 is Level 3 (CLAUDE.md #30, CURRICULUM-GUIDE §7). */
const TASK: Record<RouteNo, string> = { 1: "l1l2-ux-analysis", 2: "l3-ux-strategy" };

/** `{route}-{name}-day{N}-{task}`, e.g. `1-muchson-day1-l1l2-ux-analysis`. The file name stays English in both languages. */
export function exportName(name: string, day: number, route: RouteNo): string {
  return `${route}-${slug(name) || "participant"}-day${day}-${TASK[route]}`;
}
