/** CONTENT_PACK §7 — capstone content. */

export const capstoneMeta = {
  title:
    'Developing a strategic activation and retention architecture for digital user experiences.',
  situation:
    'A company with an app, customer portal and digital service offering finds that many users start but only some remain active long-term. The offerings are seen as professionally good but not very motivating and hardly binding. Internally there is debate about whether stronger gamification is the answer, without clarity on which mechanics fit the brand, target group and usage situation. Management expects a robust strategy for how activation, storytelling and retention can be designed systematically and responsibly.',
  role: 'Chief Experience Officer, UX architect, division head, product manager, or strategy consultant. Your task is not the selection of individual game mechanics, but the development of a viable decision architecture.',
};

export type PullSource =
  | 'modules-3-9'
  | 'healthjourney-decision'
  | 'movewell-allocation'
  | 'healthjourney-risks'
  | 'module-10'
  | 'unprepared-entries'
  | 'everything';

export interface CapstoneSection {
  n: number;
  id: string;
  title: string;
  prompt: string;
  wordBudget: number;
  pullLabel: string;
  pullSource: PullSource;
}

export const capstoneSections: CapstoneSection[] = [
  {
    n: 1,
    id: 'principle',
    title: 'Guiding principle',
    prompt:
      'In one paragraph: what motivation and what usage experience will this organisation systematically create — and what will it refuse to do to get there?',
    wordBudget: 120,
    pullLabel: 'Modules 03 and 09',
    pullSource: 'modules-3-9',
  },
  {
    n: 2,
    id: 'decisions',
    title: 'Three strategic decisions',
    prompt:
      'Name three decisions on progress, reinforcement, gamification depth, storytelling and long-term retention. For each: what you decided, and what it rules out.',
    wordBudget: 180,
    pullLabel: 'HealthJourney decision and conflicts',
    pullSource: 'healthjourney-decision',
  },
  {
    n: 3,
    id: 'priority',
    title: 'Priority architecture',
    prompt: 'Which journeys, functions or touchpoints improve first, and why those?',
    wordBudget: 150,
    pullLabel: 'MoveWell allocation and decision receipt',
    pullSource: 'movewell-allocation',
  },
  {
    n: 4,
    id: 'risk',
    title: 'Risk analysis',
    prompt:
      'Which false assumptions about motivation, target group and mechanics would be most critical here?',
    wordBudget: 150,
    pullLabel: 'HealthJourney residual risks and your Dark Pattern reflection',
    pullSource: 'healthjourney-risks',
  },
  {
    n: 5,
    id: 'governance',
    title: 'Governance model',
    prompt:
      'Who owns activation principles, and how are conflicts between brand, user interest and commercial pressure decided?',
    wordBudget: 150,
    pullLabel: 'Module 10 decision tree output',
    pullSource: 'module-10',
  },
  {
    n: 6,
    id: 'uncertainty',
    title: 'Decision under uncertainty',
    prompt:
      'Make at least one prioritised decision despite incomplete data, and justify it responsibly.',
    wordBudget: 120,
    pullLabel: 'Any case where you proceeded without full information',
    pullSource: 'unprepared-entries',
  },
  {
    n: 7,
    id: 'statement',
    title: 'Management statement',
    prompt:
      'A recommendation to the executive board with clear prioritisation and strategic justification.',
    wordBudget: 150,
    pullLabel: 'All of the above',
    pullSource: 'everything',
  },
];

export const capstoneSectionIds = capstoneSections.map((s) => s.id);

/** Words the mechanic checker looks for, mapped to registry IDs. */
export const MECHANIC_KEYWORDS: Record<string, string[]> = {
  streaks: ['streak', 'streaks', 'daily counter'],
  points: ['point', 'points', 'xp', 'currency'],
  badges: ['badge', 'badges'],
  levels: ['level', 'levels', 'tier'],
  challenges: ['challenge', 'challenges', 'daily challenge'],
  'social-comparison': ['leaderboard', 'leaderboards', 'ranking', 'rank users'],
  'status-display': ['status', 'status tier'],
  'visible-progress': ['progress bar', 'progress ring', 'visible progress', 'remainder'],
  milestone: ['milestone', 'milestones'],
  'narrative-framing': ['narrative', 'story', 'storytelling', 'stage name', 'stages'],
  'completion-feedback': ['feedback', 'confirmation', 'competence feedback'],
  'unexpected-recognition': ['recognition', 'recognise', 'recognize'],
  'loss-aversion': ['loss aversion', 'lose your', 'at risk of losing'],
  'artificial-scarcity': ['countdown', 'scarcity', 'spots left', 'limited time'],
};

/** Extra conditions the checker looks for before clearing a conditional mechanic. */
export const MECHANIC_CONDITIONS: Record<string, { needs: string[]; missing: string }> = {
  streaks: {
    needs: ['recovery', 'freeze', 'forgiv', 'no punishment', 'no-punishment'],
    missing: 'Your text does not mention a recovery path.',
  },
  points: {
    needs: ['exchange', 'redeem', 'aggregate', 'feeds into'],
    missing: 'Your text does not say what the points feed into.',
  },
  'narrative-framing': {
    needs: ['true', 'actually happens', 'real process', 'describes'],
    missing: 'Ship it, provided the stages describe what actually happens.',
  },
  'social-comparison': {
    needs: ['opt-in', 'small team', 'closed group'],
    missing: 'Ranking the target population is the failure mode this domain cannot absorb.',
  },
};
