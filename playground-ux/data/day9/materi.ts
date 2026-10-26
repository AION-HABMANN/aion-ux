/**
 * The Materi of Day 9, made simple (UX-STANDARD 2.10; DL CLAUDE.md #22, #35, #37, #40).
 * No card text was removed: this file adds the short layer on top of the ten existing modules.
 *
 *   PLAIN   "In plain words": the idea in everyday words, written from the card's own core idea.
 *   DRAWS   which tasks draw on the card. A card a task draws on is Core for that route; a card no
 *           task draws on is Optional (folded, one line, never needed to answer anything).
 */
import { concepts, conceptBySlug } from './concepts';
import { ROUTES, type RouteDef } from './routes';
import type { TaskDef } from './tasks';

type TaskId = TaskDef['id'];

export const PLAIN: Record<string, string[]> = {
  'what-gamification-is-not': [
    'Gamification means using ideas from games, such as progress, goals and recognition, in a product that is not a game.',
    'It is not the same as making something look playful, and it is not building a game. The three take very different amounts of time and people and carry very different risks.',
  ],
  'why-users-respond': [
    'People do not respond to rewards as such. They respond to knowing where they stand: how far they have come, whether their last step counted, and what is left.',
    'Progress, feedback, recognition and challenge are all ways of giving that one piece of information.',
  ],
  'motivation-mechanisms': [
    'Every game mechanic pulls on something underneath it, such as reward, the feeling of being capable, or comparison with others.',
    'The mechanic is what you see; the lever is what moves people. Choose the lever first, or you may end up with a leaderboard where nobody wants to be compared.',
  ],
  'the-toolbox': [
    'Points, badges, levels, challenges, streaks and status each do one job, take some effort to build, and stop working in a certain way.',
    'Adding more of them does not add more motivation. Past a point, each new one makes the others mean less.',
  ],
  'when-it-backfires': [
    'Gamification can fail in four ways: manipulation, overload, reward inflation and damaged trust.',
    'Overload can be fixed by taking things away, and inflation only slowly. Damaged trust does not repair: once users think the signals are meant to steer them, they doubt every signal.',
  ],
  'story-plus-mechanics': [
    'Progress tells people where they are; a story tells them why it matters.',
    'A story makes the mechanics you already have mean more without adding new ones, so it is a low-effort upgrade. It goes wrong when the story promises more than the product can deliver.',
  ],
  'spike-vs-retention': [
    'Heavy mechanics usually win the launch week and lose the quarter, because what spikes fastest also fades fastest.',
    'Activation and retention are different goals and often pull against each other. The time window you measure over decides which strategy looks better.',
  ],
  'intrinsic-and-emotional': [
    'When you reward people for something they already did for its own sake, you can change what the behaviour is about.',
    'Taking the reward away later does not undo that. It is easy to miss, because everything looks like it is working while it happens.',
  ],
  'credible-in-serious-domains': [
    'Where users must trust the organisation, the question is not what raises engagement but what raises it without changing what users believe about your intentions.',
    'So credible gamification is a different selection of mechanics, not a quieter version of the consumer kind.',
  ],
  'who-owns-activation': [
    'Mechanics pile up because adding one needs a champion and removing one needs a business case. Left alone, that produces overstimulation that no one decided on.',
    'Governance corrects it: a named owner, a written principle, a way to remove things, and a rule for conflicts between brand, user interest and money.',
  ],
};

export const DRAWS: Record<string, TaskId[]> = {
  'what-gamification-is-not': ['t1'],
  'why-users-respond': ['t1', 't3'],
  'motivation-mechanisms': ['t1', 't2'],
  'the-toolbox': ['t2'],
  'when-it-backfires': ['t2'],
  'story-plus-mechanics': ['t2', 't3'],
  'spike-vs-retention': ['t3'],
  'intrinsic-and-emotional': [],
  'credible-in-serious-domains': ['t4'],
  'who-owns-activation': ['t4'],
};

/** "Why it matters": plain words part 2 (DL #22), tied to the task that draws on the card. */
export const WHY: Record<string, string> = {
  'what-gamification-is-not': 'Task 1 asks you to judge SkillRise. You first have to tell a playful look, gamification and a game apart, or you will blame the wrong thing.',
  'why-users-respond': 'Tasks 1 and 3 ask where users lose sight of where they stand. This card gives you the signals to look for.',
  'motivation-mechanisms': 'Tasks 1 and 2 ask what a variant really pulls on. Without the levers, every variant just looks motivating.',
  'the-toolbox': 'Task 2 compares variants that are built from these tools. This card says what each one is for and where it stops working.',
  'when-it-backfires': 'Task 2 asks which risks remain after your decision. These four failures are the usual answers.',
  'story-plus-mechanics': 'Variant C in Task 2 and the measures in Task 3 lean on story as well as progress. This card shows how the two work together.',
  'spike-vs-retention': 'Task 3 asks what to do first in 12 weeks. Whether you aim at a launch spike or at lasting use changes the order.',
  'credible-in-serious-domains': 'Task 4 asks for an architecture that keeps the brand credible. This card says what credible means where users must trust you.',
  'who-owns-activation': 'Task 4 asks who is responsible and how conflicts are decided. This card gives the parts such a governance needs.',
};

/**
 * Minutes (DL #37 and CURRICULUM-GUIDE 3: every card says how long it takes, the route says how long in all).
 * These are DRAFT estimates, not measured and not yet agreed with the facilitator: change them here.
 *   card  = 1 plain words + 4 demo (the self-check is optional and counted with the extras)
 *   task  = DL's standing split: Level 1 tasks 15 min, the Level 2 case 20, the Level 3 project 20
 * The folded extras are counted apart (reading speed 200 words a minute), as DL counts an optional video.
 */
export const CARD_MINUTES = 5;
export const TASK_MINUTES: Record<TaskId, number> = { t1: 15, t2: 15, t3: 20, t4: 20 };

export function extraMinutes(slug: string): number {
  const c = conceptBySlug[slug];
  const words = [c.hook, c.coreIdea, ...c.mechanism, ...c.whenItWorks, ...c.whenItBackfires, c.seriousDomain.title, c.seriousDomain.body].join(' ').split(/\s+/).length;
  // reading speed 200 words a minute, plus about 3 minutes for the optional self-check
  return Math.max(1, Math.round(words / 200)) + 3;
}

export function fmtMin(n: number): string {
  if (n < 60) return `${n} min`;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** For an Optional card: one sentence on what it deepens. */
export const OPTIONAL_REASON: Record<string, string> = {
  'intrinsic-and-emotional': 'Deepens why a reward can weaken the thing it rewards. No task question needs it.',
};

export interface CardInfo {
  slug: string;
  route: RouteDef;
  /** A1.. in Route 1, B1.. in Route 2: the order of the cards inside the route. */
  code: string;
  core: boolean;
  tasks: TaskId[];
}

const bySlug: Record<string, CardInfo> = {};
for (const route of ROUTES) {
  const letter = route.no === 1 ? 'A' : 'B';
  concepts
    .filter((c) => route.materiLevels.includes(c.level))
    .sort((a, b) => a.order - b.order)
    .forEach((c, i) => {
      const tasks = (DRAWS[c.slug] ?? []).filter((t) => route.taskIds.includes(t));
      bySlug[c.slug] = { slug: c.slug, route, code: `${letter}${i + 1}`, core: tasks.length > 0, tasks };
    });
}

export const cardInfo = (slug: string): CardInfo | undefined => bySlug[slug];
export const cardsOf = (route: RouteDef): CardInfo[] => Object.values(bySlug).filter((c) => c.route.no === route.no).sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
export const cardsFor = (taskId: TaskId): CardInfo[] => Object.values(bySlug).filter((c) => c.tasks.includes(taskId)).sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));

/**
 * The path through a route (UX-STANDARD 2.11): first all the Core cards, then all the tasks, then the export,
 * as DL does (CLAUDE.md #12 and #30). Steps are numbered across the whole route. Optional cards are off the path.
 */
export interface PathTask {
  taskId: TaskId;
  step: number;
  minutes: number;
}
export interface RoutePath {
  cards: (CardInfo & { step: number })[];
  tasks: PathTask[];
  optional: CardInfo[];
  exportStep: number;
  /** Cards on the path + tasks + the export. */
  total: number;
  materiMinutes: number;
  taskMinutes: number;
}

export function pathOf(route: RouteDef): RoutePath {
  const all = cardsOf(route);
  let step = 0;
  const cards = all.filter((c) => c.core).map((c) => ({ ...c, step: ++step }));
  const tasks = route.taskIds.map((taskId): PathTask => ({ taskId, step: ++step, minutes: TASK_MINUTES[taskId] }));
  return {
    cards,
    tasks,
    optional: all.filter((c) => !c.core),
    exportStep: ++step,
    total: step,
    materiMinutes: cards.length * CARD_MINUTES,
    taskMinutes: tasks.reduce((n, x) => n + x.minutes, 0),
  };
}
