import type { Category, CategoryDef } from '../types';

/** CONTENT_PACK §4 — SkillRise (Case 1: diagnose by annotation). */

export const skillriseBrief = {
  client: 'SkillRise',
  subtitle: 'Professional development platform, ~14,000 enrolled learners across 40 corporate clients.',
  body: 'The platform offers learning paths, assignments and certificates, but very little visible progress. After completing a step, users receive only a neutral system message. There are no motivating intermediate goals or recognisable milestones. The learning path makes sense in terms of content, but feels barely activating. Elements that make personal development or achievements visible are missing. The platform feels functional, but hardly binding or motivating.',
  job: 'Work out where activation is being lost, before anyone proposes a solution.',
};

/** The six diagnostic categories (CONTENT_PACK §4.3). */
export const CATEGORIES: CategoryDef[] = [
  {
    id: 'motivation',
    label: 'Motivation',
    question: 'Why would the user want to continue?',
    tone: 'activation',
  },
  {
    id: 'progress',
    label: 'Progress',
    question: 'Can the user see where they are?',
    tone: 'activation',
  },
  {
    id: 'recognition',
    label: 'Recognition',
    question: 'Does anything notice what they did?',
    tone: 'activation',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    question: 'Does the user know their action counted?',
    tone: 'integrity',
  },
  {
    id: 'retention',
    label: 'Retention',
    question: 'Is there a reason to come back tomorrow?',
    tone: 'integrity',
  },
  {
    id: 'self-efficacy',
    label: 'Self-efficacy',
    question: 'Does the user feel more capable than before?',
    tone: 'integrity',
  },
];

export type ScreenId =
  | 'dashboard'
  | 'path'
  | 'module'
  | 'assignment'
  | 'completion'
  | 'certificate'
  | 'profile';

/**
 * CONTENT_PACK §4.2 — mock UI screen copy.
 * This text is deliberately flat. Do NOT improve it: the flatness is the
 * teaching material.
 */
export const mockScreens: {
  id: ScreenId;
  navLabel: string;
  title: string;
  lines: string[];
  action?: string;
  moduleRows?: { label: string; status: string }[];
}[] = [
  {
    id: 'dashboard',
    navLabel: 'Dashboard',
    title: 'My learning',
    lines: ['Assigned paths: 3', 'In progress: 1', 'Completed: 0'],
    action: 'Continue',
  },
  {
    id: 'path',
    navLabel: 'Learning path',
    title: 'Path: Data Literacy for Managers',
    lines: ['Modules: 8', 'Status: In progress'],
    moduleRows: [
      { label: 'Module 1', status: 'Complete' },
      { label: 'Module 2', status: 'Complete' },
      { label: 'Module 3', status: 'Complete' },
      { label: 'Module 4', status: 'Not started' },
      { label: 'Module 5', status: 'Not started' },
      { label: 'Module 6', status: 'Not started' },
      { label: 'Module 7', status: 'Not started' },
      { label: 'Module 8', status: 'Not started' },
    ],
  },
  {
    id: 'module',
    navLabel: 'Module page',
    title: 'Module 4: Working with distributions',
    lines: ['Estimated duration: 45 min', 'Materials: 1 video, 1 reading, 1 assignment'],
    action: 'Start module',
  },
  {
    id: 'assignment',
    navLabel: 'Assignment',
    title: 'Assignment submitted.',
    lines: ['Status: Received'],
  },
  {
    id: 'completion',
    navLabel: 'Module complete',
    title: 'Module 4 complete.',
    lines: ['Proceed to Module 5.'],
  },
  {
    id: 'certificate',
    navLabel: 'Certificate',
    title: 'Certificate of completion',
    lines: ['Data Literacy for Managers', 'Issued: 14.03.2026'],
    action: 'Download PDF',
  },
  {
    id: 'profile',
    navLabel: 'Profile',
    title: 'Profile',
    lines: ['Name: [user]', 'Enrolled: 02.02.2026', 'Paths completed: 0'],
  },
];

/**
 * CONTENT_PACK §4.4 — expected findings.
 * Used for the graded hint system and the Pattern Spotter badge.
 * NEVER shown as an answer key.
 */
export interface ExpectedFinding {
  n: number;
  screen: ScreenId | 'flow';
  finding: string;
  category: Category;
  hint: string;
}

export const expectedFindings: ExpectedFinding[] = [
  {
    n: 1,
    screen: 'path',
    finding:
      'Module list shows binary states only — no partial progress, no visible remainder in effort terms',
    category: 'progress',
    hint: 'Look at the module list again. Can you tell how much work is left, or only how many items?',
  },
  {
    n: 2,
    screen: 'completion',
    finding: '"Module 4 complete. Proceed to Module 5." reports a system event and names no achievement',
    category: 'feedback',
    hint: 'Read the completion message aloud. Who is it written for — the user, or the database?',
  },
  {
    n: 3,
    screen: 'path',
    finding: 'No milestones — module 4 of 8 is the halfway point and nothing marks it',
    category: 'recognition',
    hint: 'Something meaningful happens between module 4 and module 5. Does the product know?',
  },
  {
    n: 4,
    screen: 'dashboard',
    finding: '"Completed: 0" is the first thing a new user sees about themselves',
    category: 'motivation',
    hint: 'What does the dashboard tell a user about themselves on day one?',
  },
  {
    n: 5,
    screen: 'certificate',
    finding: 'The only recognition in the product arrives at the very end, after weeks of nothing',
    category: 'recognition',
    hint: 'How long does a user wait for the first sign that any of this counted?',
  },
  {
    n: 6,
    screen: 'assignment',
    finding: '"Status: Received" — the single most neutral confirmation in the product',
    category: 'feedback',
    hint: 'Find the least encouraging sentence in the whole platform.',
  },
  {
    n: 7,
    screen: 'profile',
    finding: 'Nothing accumulates — the profile shows enrolment facts, not development',
    category: 'self-efficacy',
    hint: 'Open the profile. Is there any evidence here that the user has grown?',
  },
  {
    n: 8,
    screen: 'flow',
    finding: 'No reason to open the product on a day when nothing is due',
    category: 'retention',
    hint: "It's Tuesday, nothing is scheduled. Why would this user open the app?",
  },
  {
    n: 9,
    screen: 'module',
    finding:
      'Estimated duration is given but never compared against actual — no sense of pace or improvement',
    category: 'self-efficacy',
    hint: 'The product knows how long things take. Does the user ever learn anything about themselves from that?',
  },
  {
    n: 10,
    screen: 'path',
    finding: 'Ordering is unexplained, so skipping feels costless',
    category: 'motivation',
    hint: 'Why module 4 before module 5? Does the product ever say?',
  },
];

/** CONTENT_PACK §4.6 — completion copy. */
export const skillriseCompletion = {
  radarFull: "All six categories covered. You're now reading the platform, not just using it.",
  prioritySet: "Two priorities named. In the next case you'll find out what it costs to act on them.",
  handoff:
    'SkillRise told you what was missing. HealthJourney will ask you to choose what to add — with three stakeholders who want different things.',
};

/** Step 1 asks for a spontaneous impression AFTER 90 seconds of exploring. */
export const EXPLORE_SECONDS = 90;

export const skillriseSteps = [
  {
    n: 1,
    id: 'impression',
    title: 'First impression',
    prompt: 'Explore the platform for 90 seconds, then write what it felt like — before you analyse anything.',
    lockedHint: 'Explore first. The analysis field unlocks in {t}.',
    placeholder: 'What did it feel like to be a user of this?',
  },
  {
    n: 2,
    id: 'annotate',
    title: 'Mark the weak spots',
    prompt: 'Click anywhere in the mock. Say what you see, whether it strengthens or weakens activation, and which category it belongs to. Five is the minimum.',
  },
  {
    n: 3,
    id: 'radar',
    title: 'Insight radar',
    prompt: 'Six axes, filled live by your observations. An empty axis is a part of the platform you have not looked at yet.',
  },
  {
    n: 4,
    id: 'impact',
    title: 'Impact statements',
    prompt: 'Three sentences about what this costs a user — not about what the interface does.',
  },
  {
    n: 5,
    id: 'priorities',
    title: 'Prioritise the two biggest',
    prompt: 'Two observations carry more weight than the rest. Say which, and say why.',
  },
] as const;
