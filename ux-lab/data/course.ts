import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";
import { FREE_SPECS } from "@/data/free/registry";

/**
 * The course registry of the AION UX class (psychological UX design and neuro-design): sixteen days in seven modules, from the plan
 * (Strukturplan, sheet "hanya kurikulum Strukturplan_DE_EN_ID"; see ../PLAN-MAP.md). One Next.js project holds Days 1 to 8, built to the Digital
 * Learning standard (UX-STANDARD.md). A day is built when its spec is registered in `data/free/registry.ts`; a day that is not built yet keeps its
 * page as a placeholder (CLAUDE.md #12), so the shape of the site never changes when a day is filled in. Days 9 to 16 also keep their original
 * idea, as first built, under `/day/N/original/` (see ORIGINALS).
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

/**
 * The original idea of Days 9 to 16: each day as it was first built (moved here from `playground-ux`, code in `original/` and
 * `app/(original-*)`). It is not on the lab standard; it stays reachable next to the lab version of the day, also once that is built.
 */
type OriginalExtra = { title: Tx; what: Tx; href: string };
type Original = { name: Tx; what: Tx; extras?: { 1: OriginalExtra[]; 2: OriginalExtra[] } };
const x = (title: string, what: string, href: string): OriginalExtra => ({ title: t(title), what: t(what), href });

export const ORIGINALS = bi({
  9: {
    name: t("Activation Lab"),
    what: t("A gamification lab with three interactive cases (SkillRise, HealthJourney, MoveWell), a capstone, progress and an inspector. Already partly upgraded: two routes with the plan's tasks, writing help, model answers and an export."),
    extras: {
      1: [
        x("The ten original concept cards, with live demos", "The first version of the Materi: the three-panel comparison, the five drivers, the lever sliders, the mechanic tray, the reward-inflation slider, the overjustification tile game and the reporting-window chooser, each with a self-check.", "/day/9/original/learn/"),
        x("SkillRise, the original interactive case", "Find the activation hotspots on the screen and read the insight radar.", "/day/9/original/playground/skillrise/"),
        x("HealthJourney, the original prototypes", "The three variants as clickable prototypes, with a trade-off compass and a stakeholder meter.", "/day/9/original/playground/healthjourney/"),
        x("MoveWell, the original budget allocator", "Spend the 12 weeks and the budget on measures and get a decision receipt.", "/day/9/original/playground/movewell/"),
        x("The Inspector and the dark-pattern layer", "A reference that names the mechanics behind what you see, and a switch that shows what manipulative versions would look like.", "/day/9/original/inspector/"),
      ],
      2: [
        x("The original capstone", "The transfer project as the first version built it: guiding principle, three decisions, a priority architecture, with meters.", "/day/9/original/capstone/"),
        x("The studio brief", "The original start page of the Activation Lab: the framing story and your studio name.", "/day/9/original/extra/studio-brief/"),
        x("The original Route 2", "The transfer project's questions with their writing help and the original model answers behind the mentor bar.", "/day/9/original/route-2/"),
        x("Progress, gamified", "How the first version gamified its own learners: points, rings and milestones for what you opened. Useful to discuss: did it motivate you, or push you?", "/day/9/original/progress/"),
      ],
    },
  },
  10: {
    name: t("Companion page"),
    what: t("A companion page on intelligent interfaces and four Word worksheets on real AI tools (not yet on the plan's cases)."),
    extras: {
      1: [
        x("The original companion page", "The first version of the Materi: “the one thing this day is about”, the three kinds of system behind the UX with “which type is this?”, nine real AI tools to look at, and help for each task.", "/day/10/original/"),
        x("Worksheet 1 · Direct observation of AI patterns (Word)", "Watch real AI tools at work and note where they suggest, adapt or act on their own.", "/day10/worksheets/task1-direct-observation-of-ai-patterns.docx"),
        x("Worksheet 2 · Classifying the system behind the UX (Word)", "Decide for real products whether a rule, the situation or learning is behind what you see.", "/day10/worksheets/task2-classifying-the-system-behind-the-ux.docx"),
        x("Worksheet 3 · Deep AI-UX audit of one tool (Word)", "Audit one real tool with the three questions: can I see why, change it, undo it?", "/day10/worksheets/task3-deep-ai-ux-audit.docx"),
      ],
      2: [
        x("Worksheet 4 · The strategic AI-UX decision (Word)", "The original management task: decide where a company should use AI in its interfaces, and how far.", "/day10/worksheets/task4-strategic-ai-ux-decision.docx"),
        x("The original main material (Word)", "The companion page's content as a Word document, with the real references the first version recommended.", "/day10/worksheets/main-material-interactive-website.docx"),
      ],
    },
  },
  11: {
    name: t("CityHelp Voice"),
    what: t("A voice-assistant playground in six stops: meet CityHelp, six moments, six lenses, three ways, why your brain reacts, prove it works."),
    extras: {
      1: [
        x("Meet CityHelp Voice: free play", "The first version's sandbox: talk to the assistant before anyone explains it, and note after each answer whether it helped or confused you.", "/day/11/original/meet-cityhelp/"),
        x("Six moments, six lessons", "Six recorded dialogues to replay, where the assistant helps or wastes time, each with its lesson.", "/day/11/original/six-moments/"),
        x("The six lenses", "The original vocabulary for judging a voice dialogue, with a sorting game on real lines.", "/day/11/original/six-lenses/"),
        x("Why your brain reacts", "Demonstrations of cognitive load, predictability and relief, felt rather than described.", "/day/11/original/why-your-brain-reacts/"),
      ],
      2: [
        x("Three ways to build it", "The same task in three interaction styles, side by side, with what each costs.", "/day/11/original/three-ways/"),
        x("Prove it works", "Pick a prototype for a question, sort tests by risk, and decide where voice belongs.", "/day/11/original/prove-it-works/"),
      ],
    },
  },
  12: {
    name: t("Accessibility Playground"),
    what: t("One page with thirteen widgets, a Training Ground and three cases on accessibility and neurodiversity."),
    extras: {
      1: [
        x("The Accessibility Playground: Learn and Training Ground", "The first version on one page with tabs: thirteen widgets (contrast slider, focus order, alt text, plain language, error tolerance, consistency, modern against accessible and more), and a Training Ground where you spot the barriers on a mock club page. Open the tabs “Learn” and “Training Ground”.", "/day/12/original/"),
      ],
      2: [
        x("The original cases and task map", "The same page's tabs for PublicAccess, LearnAccess and CitizenConnect as the first version built them, with reveals, and the task map.", "/day/12/original/#cases"),
      ],
    },
  },
  13: {
    name: t("Inclusive Design Patterns"),
    what: t("One page with the learning levels, a Training Ground and four cases."),
    extras: {
      1: [
        x("Inclusive Design Patterns: Learn and Training Ground", "The first version on one page: the Stimulus Dial, the Predictability Toggle, the Readability Lab, the Profile Lens, the Category Sorter, the Pattern Fix Simulator and the Assistive Tech Strip, and a Training Ground to practise on. Open the tabs “Learn” and “Training Ground”.", "/day/13/original/"),
      ],
      2: [
        x("The original cases and Test Plan Builder", "The same page's case tabs (StudyPath, JobAccess, LifeGuide and an enterprise context), the Prioritisation Grid and the Test Plan Builder, as the first version built them.", "/day/13/original/#cases"),
      ],
    },
  },
  14: {
    name: t("Immersive Technologies"),
    what: t("Ten widgets and three cases with 3D scenes (three.js and model-viewer)."),
    extras: {
      1: [
        x("Immersive Technologies: the ten widgets", "The first version's Learn tab: flat against spatial, an AR overlay on a 3D machine, the technology map, cognitive load, intensify or overwhelm, fascination against impact, ethics and reputation, each with its 3D scene. Open the tab “Learn”.", "/day/14/original/"),
      ],
      2: [
        x("The original cases and the IndustryXR 3D scene", "The same page's case tabs, including IndustryXR's three.js training space with hotspots, and the transfer project, as the first version built them.", "/day/14/original/#cases"),
      ],
    },
  },
  15: {
    name: t("Eye-tracking decision lab"),
    what: t("An executive decision lab on eye-tracking, gaze behaviour, neurofeedback and brain-computer interfaces (the former Vite app; its pages are hash addresses)."),
    extras: {
      1: [
        x("The foundations and the limits, as the first version taught them", "One recording seen three ways, which visualisation you are shown, “one pattern, three readings” and the interpretation ladder. Each page opens on its own.", "/day/15/original/#/learn/foundations"),
        x("Neurofeedback and BCI at their actual altitude", "The first version's maturity exercise: place six technologies where you think they are, then compare.", "/day/15/original/#/learn/neuro"),
        x("Ethics and data protection: rank five, then see what the top one costs", "Consent as a design variable, four differences before any regulation, and reputation risk with a slow fuse.", "/day/15/original/#/learn/ethics"),
        x("The three playgrounds: FocusSense, LearningPulse, VisionMind", "The first version's decision games for the three cases, with meters and a constraint display. Start with FocusSense.", "/day/15/original/#/play/focussense"),
      ],
      2: [
        x("Leadership: the sentence you will hear, and the four ways out", "Operative or strategic, the four roles, and the standard, not the study, as the first version put them.", "/day/15/original/#/learn/leadership"),
        x("The debrief", "The first version's closing page that collects your decisions from the playgrounds.", "/day/15/original/#/debrief"),
      ],
    },
  },
  16: {
    name: t("Immersive prototyping"),
    what: t("The Ladder, the Test Bench, the Portfolio Room and NextWorld UX: immersive prototyping, future strategy and ethics."),
    extras: {
      1: [
        x("The Ladder: CityPass from concept to scale", "The first version's AR wayfinding for a station concourse, climbed rung by rung with wireframes, a 3D arrow overlay, a pilot dashboard and a go/no-go meeting. Open the tab “The Ladder”.", "/day/16/original/"),
        x("The Test Bench", "Six test aspects as cards, an evidence grader and a six-criteria console, as the first version built them. Open the tab “The Test Bench”.", "/day/16/original/"),
      ],
      2: [
        x("The Portfolio Room", "A product board, tension sliders, a governance model and a quarter log with events that test your portfolio. Open the tab “The Portfolio Room”.", "/day/16/original/"),
        x("The original NextWorld UX case", "The first version's case tab with track dossiers and a decision console. Open the tab “NextWorld UX”.", "/day/16/original/"),
      ],
    },
  },
} as Record<number, Original>);
export const originalOf = (n: number): { name: string; what: string } | undefined => ORIGINALS[n];
/** The Extra shelf of a route (UX-STANDARD decision 8): the parts of the original idea that belong to that route, never part of a task, the missing list or the export. */
export const originalExtras = (n: number, route: RouteNo): { title: string; what: string; href: string }[] => ORIGINALS[n]?.extras?.[route] ?? [];
/** `/day/9/original/` */
export const originalHref = (day: number) => `/day/${day}/original/`;

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
export function parsePath(pathname: string): { day: number | null; route: RouteNo | null; extra: boolean } {
  const m = pathname.match(/^\/day\/(\d+)(?:\/route-([123]))?/);
  if (!m) return { day: null, route: null, extra: false };
  const r = m[2] ? Number(m[2]) : null;
  return { day: Number(m[1]), route: r === 1 || r === 2 ? (r as RouteNo) : null, extra: r === 3 };
}
/** Route 3 · Extra (user request 2026-10-28): the original idea of a day, on a route of its own, never on the day home or in Routes 1 and 2. */
export const extraHref = (day: number) => `/day/${day}/route-3/`;
export const hasExtra = (day: number) => originalExtras(day, 1).length + originalExtras(day, 2).length > 0;
