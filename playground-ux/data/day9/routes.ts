/**
 * The shape of Day 9 (UX-STANDARD 2.8): a home, two routes and an Extra shelf.
 * One data file so the home, the routes, the navigation and verify:day9 read the same truth.
 */
import type { TaskDef } from './tasks';

export interface RouteDef {
  no: 1 | 2;
  slug: 'route-1' | 'route-2';
  /** Short label in the navigation bar. */
  navLabel: string;
  levels: string;
  verb: string;
  question: string;
  /** "You finish with: <deliverable>". */
  deliverable: string;
  /** Used in the export file name: 1-{name}-day9-l1l2-activation-analysis. */
  fileTag: string;
  taskIds: TaskDef['id'][];
  /** Concept levels (data/day9/concepts.ts) that form this route's Materi. */
  materiLevels: number[];
  materiName: string;
  /** Which plan rows the route carries, in the plan's order. */
  planRows: string;
  intro: string;
}

export const ROUTES: RouteDef[] = [
  {
    no: 1,
    slug: 'route-1',
    navLabel: '1 Analyse and decide',
    levels: 'Levels 1 + 2',
    verb: 'Analyse and decide',
    question:
      'Where do SkillRise and MoveWell lose their users, which of three activation logics suits HealthJourney, and which four measures come first for MoveWell?',
    deliverable: 'the Activation Analysis File',
    fileTag: 'l1l2-activation-analysis',
    taskIds: ['t1', 't2', 't3'],
    materiLevels: [1, 2],
    materiName: 'Materi A',
    planRows: 'Wissen (Levels 1 and 2) · Arbeitsauftrag 1 · Arbeitsauftrag 2 · Fallstudie',
    intro:
      'Read the material first, then work the three cases in the order of the plan. Each case has its interactive version as a work surface; your answers go into the fields below it.',
  },
  {
    no: 2,
    slug: 'route-2',
    navLabel: '2 Decide',
    levels: 'Level 3',
    verb: 'Decide',
    question:
      'As a Chief Experience Officer, UX architect, division head, product manager or strategy consultant, which activation and retention architecture do you propose, which risks remain, and what do you decide with data you do not have yet?',
    deliverable: 'the Activation Strategy Memo',
    fileTag: 'l3-activation-strategy',
    taskIds: ['t4'],
    materiLevels: [3],
    materiName: 'Materi B',
    planRows: 'Wissen (Level 3) · Transferprojekt',
    intro:
      'Read the Level 3 material, then write the strategy. The board brief of the Activation Lab is the work surface for the decision; your answers go into the fields below it.',
  },
];

export const ROUTE_BY_TASK = Object.fromEntries(ROUTES.flatMap((r) => r.taskIds.map((id) => [id, r]))) as Record<TaskDef['id'], RouteDef>;

export interface ExtraItem {
  title: string;
  href: string;
  text: string;
}

/** Things the author built that match no plan item (UX-STANDARD decision 8). */
export const EXTRAS: ExtraItem[] = [
  {
    title: 'The studio brief',
    href: '/day/9/extra/studio-brief/',
    text: 'The original start page of the Activation Lab: the framing story, your studio name and a way back to where you left off.',
  },
  {
    title: 'Playground: three client briefs',
    href: '/day/9/playground/',
    text: 'The three interactive cases (SkillRise, HealthJourney, MoveWell) with their instruments, as free practice. Each task also links to its own case.',
  },
  {
    title: 'Progress',
    href: '/day/9/progress/',
    text: 'What you have covered in the field manual and the playground. It counts what you opened, not what you answered.',
  },
  {
    title: 'Inspector',
    href: '/day/9/inspector/',
    text: 'A reference that names the mechanics behind what you see in Day 9.',
  },
];

/** The URL prefixes that keep a navigation entry highlighted. */
export const NAV_ACTIVE: Record<string, string[]> = {
  home: [],
  'route-1': ['/day/9/route-1', '/day/9/learn', '/day/9/playground'],
  'route-2': ['/day/9/route-2', '/day/9/capstone'],
  extra: ['/day/9/extra', '/day/9/progress', '/day/9/inspector'],
};
