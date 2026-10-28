import type { Category } from '../types';

/** CONTENT_PACK §6 — MoveWell (Case 3: allocate under constraints). */

export const movewellBrief = {
  client: 'MoveWell',
  subtitle: 'Digital platform for movement, prevention and personal health goals, run by a health provider.',
  body: 'Professionally the offering is high quality, but many users drop out after a short time. The platform is experienced as sensible but not motivating. The company wants to increase activation and retention without losing seriousness or credibility.',
  job: 'Decide what ships in twelve weeks, what it costs, and what you deliberately hold back.',
};

/** Hard constraints — rendered as an instrument panel, never as prose. */
export const BUDGET_TOTAL = 150_000;
export const TOTAL_WEEKS = 12;

export const movewellConstraints = [
  { label: 'Budget', value: '€150,000', note: 'Cannot be exceeded' },
  { label: 'Timeline', value: '12 weeks', note: 'Implementation window' },
  { label: 'Brand', value: 'Trustworthy, health-adjacent', note: 'Must survive intact' },
  { label: 'Relaunch', value: 'Excluded', note: 'A full rebuild is off the table' },
  { label: 'Tech capacity', value: 'Limited', note: 'Complex features are expensive here' },
  { label: 'User data', value: 'Partial', note: 'Only some behaviour is measurable' },
];

/** §6.2 — the six observed problems, for the categorisation step. */
export interface ObservedProblem {
  id: string;
  problem: string;
  correct: Category[];
}

export const observedProblems: ObservedProblem[] = [
  { id: 'p1', problem: 'Progress is only weakly visible', correct: ['progress'] },
  {
    id: 'p2',
    problem: 'Successes are barely fed back or emotionally reinforced',
    correct: ['feedback'],
  },
  { id: 'p3', problem: 'Motivating intermediate goals and stages are missing', correct: ['motivation'] },
  {
    id: 'p4',
    problem: 'The user journey is functional but hardly designed to activate',
    correct: ['motivation'],
  },
  {
    id: 'p5',
    problem: 'No clear link between individual development and the usage experience',
    correct: ['self-efficacy'],
  },
  {
    id: 'p6',
    problem: 'Existing feedback is technical and unengaging',
    correct: ['feedback', 'recognition'],
  },
];

/**
 * §6.3 — the measure deck.
 * m1–m4 match the reference solution; m5–m10 are tempting distractors.
 * NOTHING in the UI marks which is which.
 */
export interface Measure {
  id: string;
  name: string;
  cost: number;
  weeks: number;
  impact: 1 | 2 | 3 | 4 | 5;
  risk: 1 | 2 | 3 | 4 | 5;
  techLoad: 1 | 2 | 3 | 4 | 5;
  touches: Category[];
  /** Not rendered. Used only for the trainer-side export and hint grading. */
  referenceSolution: boolean;
  mechanicId: string;
}

export const measures: Measure[] = [
  {
    id: 'm1',
    name: 'Visible progress logic with stages and milestones',
    cost: 42_000,
    weeks: 5,
    impact: 4,
    risk: 1,
    techLoad: 2,
    touches: ['progress', 'self-efficacy'],
    referenceSolution: true,
    mechanicId: 'visible-progress',
  },
  {
    id: 'm2',
    name: 'Reinforcing feedback and positive confirmation across the journey',
    cost: 28_000,
    weeks: 3,
    impact: 4,
    risk: 1,
    techLoad: 1,
    touches: ['feedback', 'motivation'],
    referenceSolution: true,
    mechanicId: 'completion-feedback',
  },
  {
    id: 'm3',
    name: 'Narrative framing of the user journey (stage naming, true-to-process)',
    cost: 34_000,
    weeks: 4,
    impact: 3,
    risk: 2,
    techLoad: 2,
    touches: ['motivation', 'retention'],
    referenceSolution: true,
    mechanicId: 'narrative-framing',
  },
  {
    id: 'm4',
    name: 'Restrained, credible gamification focused on self-efficacy',
    cost: 34_000,
    weeks: 4,
    impact: 3,
    risk: 2,
    techLoad: 3,
    touches: ['self-efficacy', 'retention'],
    referenceSolution: true,
    mechanicId: 'self-efficacy-statement',
  },
  {
    id: 'm5',
    name: 'Monthly leaderboard with regional rankings',
    cost: 38_000,
    weeks: 4,
    impact: 4,
    risk: 5,
    techLoad: 3,
    touches: ['motivation'],
    referenceSolution: false,
    mechanicId: 'social-comparison',
  },
  {
    id: 'm6',
    name: 'Full visual redesign of the dashboard',
    cost: 61_000,
    weeks: 8,
    impact: 2,
    risk: 3,
    techLoad: 5,
    touches: [],
    referenceSolution: false,
    mechanicId: 'status-display',
  },
  {
    id: 'm7',
    name: 'Daily challenge engine with push notifications',
    cost: 45_000,
    weeks: 5,
    impact: 4,
    risk: 4,
    techLoad: 4,
    touches: ['motivation'],
    referenceSolution: false,
    mechanicId: 'challenges',
  },
  {
    id: 'm8',
    name: 'Points economy with a rewards catalogue',
    cost: 52_000,
    weeks: 6,
    impact: 3,
    risk: 5,
    techLoad: 4,
    touches: ['motivation'],
    referenceSolution: false,
    mechanicId: 'points',
  },
  {
    id: 'm9',
    name: 'AI-generated personalised coaching messages',
    cost: 58_000,
    weeks: 7,
    impact: 3,
    risk: 4,
    techLoad: 5,
    touches: ['feedback'],
    referenceSolution: false,
    mechanicId: 'recognition-signal',
  },
  {
    id: 'm10',
    name: 'Social feed where users post their sessions',
    cost: 47_000,
    weeks: 6,
    impact: 3,
    risk: 4,
    techLoad: 4,
    touches: ['retention'],
    referenceSolution: false,
    mechanicId: 'social-comparison',
  },
];

export const measureById = Object.fromEntries(measures.map((m) => [m.id, m])) as Record<
  string,
  Measure
>;

/** §6.5 — justification prompts per placed measure. */
export const justificationPrompts = [
  { id: 'userImpact', label: 'User impact', prompt: 'What changes for a user in the week after this ships?' },
  {
    id: 'feasibility',
    label: 'Feasibility',
    prompt: 'What has to be true technically for this to land in {n} weeks?',
  },
  { id: 'risk', label: 'Risk', prompt: 'What is the worst plausible reaction to this?' },
  {
    id: 'timePressure',
    label: 'Time pressure',
    prompt: 'Why this one now, rather than in phase two?',
  },
] as const;

export type JustificationField = (typeof justificationPrompts)[number]['id'];

/** §6.7 — recommendation scaffold, auto-prefilled and then edited. */
export function buildRecommendation(params: {
  measure1: string;
  measure2: string;
  measure3: string;
  deferred: string;
  deferredReason: string;
  risk: string;
  week3: number;
  reviewWeek: number;
}): string {
  return [
    'We recommend using gamification not as a superficial game system but as a targeted activation and retention architecture.',
    '',
    `Priority goes to ${params.measure1} and ${params.measure2}, because they address the diagnosed causes rather than the symptoms, and they deliver the largest effect on motivation, self-efficacy and long-term retention at a defensible cost.`,
    '',
    `${params.measure3} follows in week ${params.week3} to strengthen emotional relevance.`,
    '',
    `We are deliberately deferring ${params.deferred}, because ${params.deferredReason || '…'}.`,
    '',
    `The exposure we are accepting is ${params.risk}. We propose reviewing it at week ${params.reviewWeek}.`,
  ].join('\n');
}

export const movewellSteps = [
  { n: 1, id: 'diagnose', title: 'Diagnose and categorise' },
  { n: 2, id: 'deck', title: 'The measure deck' },
  { n: 3, id: 'timeline', title: 'The 12-week timeline' },
  { n: 4, id: 'justify', title: 'Justify each measure' },
  { n: 5, id: 'receipt', title: 'Decision receipt' },
  { n: 6, id: 'recommend', title: 'Recommendation to division head' },
] as const;
