/**
 * The four tasks of Day 9, taken from the plan (Strukturplan, day 9: Aufgabe 1,
 * Aufgabe 2, Fallstudie, Transferprojekt) in the plan's order and close to its words.
 * Every numbered item of the plan is one `TaskItem`; nothing is added to it and no
 * figure is invented. English first; the plan is German (UX-STANDARD decision 4).
 */

export type FieldKind = 'text' | 'lines' | 'pick';

export interface TaskField {
  /** Stable key; also the DOM id of the input. */
  key: string;
  label: string;
  kind: FieldKind;
  /** 'text': minimum characters (default 15). 'lines': minimum non-empty lines. */
  min?: number;
  /** Shown in front of the answer, e.g. "For users, this could mean that ...". */
  prefix?: string;
  options?: string[];
}

export interface TaskItem {
  /** The plan's number, 1 to N. */
  n: number;
  prompt: string;
  hint?: string;
  fields: TaskField[];
  /** The item is complete when at least one field is filled (assigning to categories). */
  anyOf?: boolean;
}

export interface TaskDef {
  id: 't1' | 't2' | 't3' | 't4';
  level: 1 | 2 | 3;
  /** The plan row: Arbeitsauftrag 1, Arbeitsauftrag 2, Fallstudie, Transferprojekt. */
  planRow: string;
  title: string;
  caseName: string;
  /** The interactive version of the case in this day, if there is one. */
  caseHref?: string;
  /** Text of the link to the work surface (default: "open the interactive case"). */
  caseLinkLabel?: string;
  intro: string;
  brief: { heading: string; points: string[] }[];
  items: TaskItem[];
  goal: string;
}

const lines = (key: string, label: string, min: number): TaskField => ({ key, label, kind: 'lines', min });
const text = (key: string, label: string, min = 15): TaskField => ({ key, label, kind: 'text', min });

const T1_CATEGORIES = ['Motivation', 'Progress', 'Recognition', 'Feedback', 'Retention', 'Self-efficacy'];
const T3_CATEGORIES = ['Progress', 'Feedback', 'Motivation', 'Self-efficacy', 'Credibility', 'Long-term retention'];

export const TASKS: TaskDef[] = [
  {
    id: 't1',
    level: 1,
    planRow: 'Arbeitsauftrag 1',
    title: 'Recognise activation and retention potential in a digital offer',
    caseName: 'SkillRise',
    caseHref: '/day/9/playground/skillrise/',
    intro: 'You receive the description of a fictional learning and development platform, “SkillRise”, for professional training.',
    brief: [
      {
        heading: 'Description',
        points: [
          'The platform offers learning paths, tasks and certificates, but little visible progress.',
          'After completed steps, users only receive neutral system messages.',
          'There are no motivating intermediate goals or recognisable milestones.',
          'The learning path makes sense in content but is hardly activating.',
          'Elements that make personal development or achievements visible are missing.',
          'The platform looks functional, but hardly engaging or motivating.',
        ],
      },
    ],
    items: [
      { n: 1, prompt: 'Describe spontaneously what effect the offer could have on motivation and retention.', fields: [text('t1-1', 'Your description')] },
      { n: 2, prompt: 'Name at least 5 places where activation or retention is weakened or supported.', hint: 'One place per line.', fields: [lines('t1-2', 'Places, one per line', 5)] },
      {
        n: 3,
        prompt: `Assign the observations to the categories ${T1_CATEGORIES.join(', ')}.`,
        hint: 'Write each observation under the category it belongs to. A category can stay empty.',
        anyOf: true,
        fields: T1_CATEGORIES.map((c) => ({ key: `t1-3-${c.toLowerCase().replace(/[^a-z]+/g, '-')}`, label: c, kind: 'text' as const, min: 3 })),
      },
      {
        n: 4,
        prompt: 'For three points, write an impact statement: “For users, this could mean that …”',
        fields: [1, 2, 3].map((i) => ({ key: `t1-4-${i}`, label: `Impact statement ${i}`, kind: 'text' as const, min: 10, prefix: 'For users, this could mean that …' })),
      },
      { n: 5, prompt: 'Prioritise the two biggest weaknesses regarding user activation.', fields: [text('t1-5-1', 'Weakness 1', 5), text('t1-5-2', 'Weakness 2', 5)] },
    ],
    goal: 'Recognise motivation and retention mechanisms systematically and tell them apart from plain functionality.',
  },
  {
    id: 't2',
    level: 1,
    planRow: 'Arbeitsauftrag 2',
    title: 'Evaluate gamification under conflicting goals',
    caseName: 'HealthJourney',
    caseHref: '/day/9/playground/healthjourney/',
    intro: 'You receive three variants, described in text, for the activation logic of a health-prevention platform, “HealthJourney”.',
    brief: [
      {
        heading: 'The variants',
        points: [
          'Variant A: strong gamification with points, badges, daily challenges and leaderboards.',
          'Variant B: a restrained activation logic with progress displays, milestones and confirming feedback.',
          'Variant C: a narratively embedded user journey with motivating stages, but less visible classic reward elements.',
        ],
      },
      {
        heading: 'Conditions',
        points: [
          'Target group: adults between 25 and 65.',
          'The company wants to motivate but stay serious and trustworthy.',
          'The budget for technical extensions is limited.',
          'No user tests exist yet.',
          'Time to release: 10 weeks.',
          'Marketing demands high activation; the specialist department warns against an approach that is too playful.',
        ],
      },
    ],
    items: [
      {
        n: 1,
        prompt: 'Evaluate each variant on motivation, credibility, long-term retention, clarity and user acceptance.',
        fields: [text('t2-1-a', 'Variant A'), text('t2-1-b', 'Variant B'), text('t2-1-c', 'Variant C')],
      },
      {
        n: 2,
        prompt: 'Decide which variant is the most viable under the given conditions.',
        fields: [{ key: 't2-2-pick', label: 'Your choice', kind: 'pick', options: ['Variant A', 'Variant B', 'Variant C'] }, text('t2-2-why', 'Why')],
      },
      { n: 3, prompt: 'Name the trade-offs between activation, seriousness and user autonomy.', fields: [text('t2-3', 'The trade-offs')] },
      { n: 4, prompt: 'Which risks remain despite your decision?', fields: [text('t2-4', 'Remaining risks')] },
      { n: 5, prompt: 'Write a recommendation to the project lead.', fields: [text('t2-5', 'Your recommendation')] },
    ],
    goal: 'Evaluate gamification approaches strategically and not only by how attractive they are.',
  },
  {
    id: 't3',
    level: 2,
    planRow: 'Fallstudie',
    title: 'Activation strategy for a digital prevention programme',
    caseName: 'MoveWell',
    caseHref: '/day/9/playground/movewell/',
    intro:
      'A health provider runs a digital platform for exercise, prevention and personal health goals. The offer is of high quality in content, but many users drop out after a short time. The platform is seen as sensible but not very motivating. The company wants to raise activation and retention without losing seriousness or credibility.',
    brief: [
      {
        heading: 'Observed problems',
        points: [
          'Progress is only weakly visible.',
          'Successes are hardly fed back or emotionally reinforced.',
          'Motivating intermediate goals and stages are missing.',
          'The user journey is functional but not very activating.',
          'There is no clear link between individual development and the experience of using the platform.',
          'Feedback so far is worded in a technical and unengaging way.',
        ],
      },
      {
        heading: 'Conditions',
        points: [
          'Budget: €150,000.',
          'Time to implement: 12 weeks.',
          'The brand has to stay trustworthy and close to health.',
          'A full relaunch is ruled out.',
          'Technical resources for complex features are limited.',
          'User data is only partly available.',
        ],
      },
    ],
    items: [
      { n: 1, prompt: 'Analyse the central deficits in activation and retention.', fields: [text('t3-1', 'Your analysis')] },
      {
        n: 2,
        prompt: `Assign the problems to the categories ${T3_CATEGORIES.join(', ')}.`,
        hint: 'Write each problem under the category it belongs to. A category can stay empty.',
        anyOf: true,
        fields: T3_CATEGORIES.map((c) => ({ key: `t3-2-${c.toLowerCase().replace(/[^a-z]+/g, '-')}`, label: c, kind: 'text' as const, min: 3 })),
      },
      {
        n: 3,
        prompt: 'Develop 4 prioritised measures for improvement.',
        hint: 'One measure per line, most important first.',
        fields: [lines('t3-3', 'Measures, one per line', 4)],
      },
      { n: 4, prompt: 'Justify your selection by user impact, feasibility, risk and time pressure.', fields: [text('t3-4', 'Your justification')] },
      { n: 5, prompt: 'Make a prioritisation decision for the first 12 weeks.', fields: [text('t3-5', 'Your decision')] },
      { n: 6, prompt: 'Write a recommendation to the division head.', fields: [text('t3-6', 'Your recommendation')] },
    ],
    goal: 'Analyse, find causes, develop measures, prioritise and justify, under the stated budget and time.',
  },
  {
    id: 't4',
    level: 3,
    planRow: 'Transferprojekt',
    title: 'A strategic activation and retention architecture for digital user experiences',
    caseName: 'Transfer project',
    caseHref: '/day/9/capstone/',
    caseLinkLabel: 'open the board brief to work out your decision',
    intro:
      'A company with an app, a customer portal and a digital service offer finds that many users start but only some stay active in the long term. The offers are seen as good in content but not very motivating and hardly binding. Internally it is discussed whether stronger gamification is the answer, without it being clear which mechanics fit the brand, the target group and the situation of use. The management expects a robust strategy for how activation, storytelling and retention can be designed systematically and responsibly.',
    brief: [
      {
        heading: 'Your role',
        points: [
          'You take the view of a Chief Experience Officer, UX architect, division head, product manager or strategy consultant.',
          'Your task is not to pick single game mechanics but to develop a sound decision architecture for motivation, the experience of progress, narrative activation and lasting retention.',
        ],
      },
      {
        heading: 'Conditions',
        points: [
          'The budget is limited.',
          'Different stakeholders pursue different goals.',
          'The brand must not lose credibility.',
          'Not all systems can be extended at the same time.',
          'The data is partly incomplete.',
          'First improvements have to be visible in the short term.',
          'Wrong decisions can harm motivation, trust and how the brand is seen.',
        ],
      },
      {
        heading: 'What is expected of senior-level thinking',
        points: [
          'Away from isolated game mechanics, towards a systemic activation logic.',
          'Away from short-term stimuli, towards a lasting retention architecture.',
          'Away from reproducing knowledge, towards strategic decision responsibility.',
          'Away from a claim to perfection, towards responsible prioritisation under uncertainty.',
        ],
      },
    ],
    items: [
      { n: 1, prompt: 'Guiding vision for activation and retention: which motivation and which experience of use should be created systematically?', fields: [text('t4-1', 'Your guiding vision')] },
      {
        n: 2,
        prompt: 'Three strategic guiding decisions on progress, reinforcement, depth of gamification, storytelling and long-term retention.',
        fields: [text('t4-2-1', 'Guiding decision 1'), text('t4-2-2', 'Guiding decision 2'), text('t4-2-3', 'Guiding decision 3')],
      },
      { n: 3, prompt: 'Prioritised architecture of measures: which journeys, functions or touchpoints are improved first, and why?', fields: [text('t4-3', 'Your architecture of measures')] },
      { n: 4, prompt: 'Risk analysis: which wrong assumptions about motivation, target group and game mechanics would be especially critical?', fields: [text('t4-4', 'Your risk analysis')] },
      { n: 5, prompt: 'Governance model: who is responsible for the activation principles, and how are conflicts between brand, user interest and profitability decided?', fields: [text('t4-5', 'Your governance model')] },
      { n: 6, prompt: 'Decision under uncertainty: make at least one prioritised decision despite incomplete data and justify it responsibly.', fields: [text('t4-6', 'Your decision and its justification')] },
      { n: 7, prompt: 'Management statement: a recommendation to the managing director with a clear priority and strategic reasoning.', fields: [text('t4-7', 'Your management statement')] },
    ],
    goal: 'Think about gamification strategically, shape motivation and retention responsibly, steer conflicts between activation, ethics and credibility.',
  },
];

export const TASK_BY_ID = Object.fromEntries(TASKS.map((t) => [t.id, t])) as Record<TaskDef['id'], TaskDef>;
