import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";
import { FREE_SPECS } from "@/data/free/registry";

/**
 * The course registry of the AION UX class (psychological UX design and neuro-design): sixteen days in seven modules, from the plan
 * (Strukturplan, sheet "hanya kurikulum Strukturplan_DE_EN_ID"; see ../PLAN-MAP.md). One Next.js project holds Days 1 to 8, built to the Digital
 * Learning standard (UX-STANDARD.md). A day is built when its spec is registered in `data/free/registry.ts`; a day that is not built yet keeps its
 * page as a placeholder (CLAUDE.md #12), so the shape of the site never changes when a day is filled in. Days 9 to 16 still run in `playground-ux`.
 */
export const COURSE = bi({
  site: t("Neuro-UX Lab"),
  course: t("AION UX class · psychological UX design and neuro-design"),
  provider: "AION · Habmann",
});

type DayDef = { n: number; module: Tx; part: Tx; short: Tx; topic: Tx };

const DAY_DEFS: DayDef[] = [
  { n: 1, module: t("Module 1"), part: t("Day 1 of 1"), short: t("Psychological UX and neuro-design"), topic: t("Introduction to psychological UX design, the neural basics of visual perception, and an overview of neuro-design in the interface") },
  { n: 2, module: t("Module 2"), part: t("Day 1 of 2"), short: t("Visual perception and colour"), topic: t("Foundations of visual perception in interface design, colour psychology and the strategic use of colour") },
  { n: 3, module: t("Module 2"), part: t("Day 2 of 2"), short: t("Typography and layout"), topic: t("Typography for readability and UX, design principles and layout optimisation, and putting them into practice") },
  { n: 4, module: t("Module 3"), part: t("Day 1 of 3"), short: t("UX laws and cognition"), topic: t("Foundations of UX laws and cognitive perception: Fitts's law, Hick's law and Miller's rule") },
  { n: 5, module: t("Module 3"), part: t("Day 2 of 3"), short: t("UX laws in practice"), topic: t("Fitts's law, Hick's law and Miller's rule applied to navigation, interaction and interface elements (the plan's title for this day names Gestalt laws, visual hierarchy and progressive disclosure, which its knowledge cell teaches on Day 6)") },
  { n: 6, module: t("Module 3"), part: t("Day 3 of 3"), short: t("Gestalt, hierarchy and design systems"), topic: t("Gestalt laws and visual hierarchy, cognitive load and progressive disclosure, and integrating and evaluating UX laws in design systems") },
  { n: 7, module: t("Module 4"), part: t("Day 1 of 3"), short: t("Emotional bonding"), topic: t("Foundations of emotional bonding in design, psychology and neuro-design") },
  { n: 8, module: t("Module 4"), part: t("Day 2 of 3"), short: t("Storytelling"), topic: t("Storytelling in UX/UI design and narrative user experiences") },
  { n: 9, module: t("Module 4"), part: t("Day 3 of 3"), short: t("Gamification"), topic: t("Gamification strategies, and the integration of storytelling and gamification") },
  { n: 10, module: t("Module 5"), part: t("Day 1 of 2"), short: t("Intelligent interfaces"), topic: t("Foundations of intelligent interfaces and AI-assisted interaction, voice user interface design") },
  { n: 11, module: t("Module 5"), part: t("Day 2 of 2"), short: t("Voice and adaptive journeys"), topic: t("Adaptive user journeys and personalised experiences, neuro-design for intelligent interfaces, prototyping and testing AI interfaces") },
  { n: 12, module: t("Module 6"), part: t("Day 1 of 2"), short: t("Accessibility and neurodiversity"), topic: t("Accessibility and accessibility standards, neurodiversity (ADHD, autism, dyslexia)") },
  { n: 13, module: t("Module 6"), part: t("Day 2 of 2"), short: t("Inclusive design patterns"), topic: t("Inclusive design patterns, assistive technology and integration, a practice project (start)") },
  { n: 14, module: t("Module 7"), part: t("Day 1 of 3"), short: t("Immersive technologies"), topic: t("Introduction to immersive technologies and the neuroscience foundations of UX") },
  { n: 15, module: t("Module 7"), part: t("Day 2 of 3"), short: t("Eye-tracking, neurofeedback and BCI"), topic: t("Eye-tracking and gaze behaviour, neurofeedback and brain-computer interfaces") },
  { n: 16, module: t("Module 7"), part: t("Day 3 of 3"), short: t("Immersive prototyping, strategy and ethics"), topic: t("Immersive prototyping and testing, future strategies and ethical aspects") },
];

export const DAYS = bi(DAY_DEFS.map((d) => ({ ...d, built: isBuilt(d.n) })));
export type DayMeta = (typeof DAYS)[number];
export const dayOf = (n: number): DayMeta | undefined => DAYS.find((d) => d.n === n);
/** A day is built when its spec is registered. */
export function isBuilt(n: number): boolean {
  return Boolean(FREE_SPECS[n]);
}

/** The two routes of every day (CLAUDE.md #30). */
export type RouteNo = 1 | 2;
export const ROUTE_LEVEL = bi({
  1: t("Levels 1 and 2 · Knowledge and application"),
  2: t("Level 3 · Management decision"),
});

/** `/day/1/route-2/#id` */
export const routeHref = (day: number, route: RouteNo) => `/day/${day}/route-${route}/`;
export const dayHref = (day: number) => `/day/${day}/`;

/** The day and route a pathname points at, for the top bar and the mentor bar. */
export function parsePath(pathname: string): { day: number | null; route: RouteNo | null } {
  const m = pathname.match(/^\/day\/(\d+)(?:\/route-([12]))?/);
  if (!m) return { day: null, route: null };
  return { day: Number(m[1]), route: m[2] ? (Number(m[2]) as RouteNo) : null };
}
