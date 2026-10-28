/** CONTENT_PACK §5 — HealthJourney (Case 2: experience, then compare). */

export type Variant = 'A' | 'B' | 'C';

export type Dimension =
  | 'motivation'
  | 'credibility'
  | 'retention'
  | 'clarity'
  | 'acceptance';

export const healthjourneyBrief = {
  client: 'HealthJourney',
  subtitle: 'Digital health prevention platform.',
  body: 'Target group: adults aged 25 to 65. The company wants to motivate, but to remain serious and trustworthy. Budget for technical extensions is limited. No user tests are available yet. Ten weeks until release. Marketing is demanding high activation; the subject-matter department is warning against an overly playful approach.',
  job: 'Choose one activation logic and be able to defend what you gave up.',
};

/** Shown permanently in the side panel — the pressure has to be felt (§9). */
export const healthjourneyConstraints = [
  'Audience: adults 25–65',
  'The company wants to motivate but stay serious and trustworthy',
  'Budget for technical extensions is limited',
  'No user testing available yet',
  '10 weeks until release',
  'Marketing demands high activation; the subject leads warn against playfulness',
];

export const MIN_SECONDS_IN_VARIANT = 60;

export interface VariantSpec {
  id: Variant;
  name: string;
  label: string;
  summary: string;
  /** Console gauge targets while the learner is inside this prototype. */
  gauges: { motivation: number; credibility: number; progress: number };
  mechanics: string[];
}

export const variants: VariantSpec[] = [
  {
    id: 'A',
    name: 'Variant A',
    label: 'Heavy gamification',
    summary: 'Points, badges, a daily challenge, a leaderboard and a streak. Energetic and a little noisy.',
    gauges: { motivation: 84, credibility: 38, progress: 71 },
    mechanics: ['points', 'badges', 'challenges', 'streaks', 'social-comparison', 'status-display'],
  },
  {
    id: 'B',
    name: 'Variant B',
    label: 'Restrained',
    summary: 'A progress bar, milestones, reinforcing feedback. Calm, clear, slightly flat.',
    gauges: { motivation: 58, credibility: 86, progress: 79 },
    mechanics: ['visible-progress', 'milestone', 'completion-feedback'],
  },
  {
    id: 'C',
    name: 'Variant C',
    label: 'Narrative',
    summary: 'Six themed stages. Progress lives inside the story; classic rewards are almost invisible. Warm, slow.',
    gauges: { motivation: 72, credibility: 81, progress: 54 },
    mechanics: ['narrative-framing', 'milestone', 'completion-feedback'],
  },
];

export const variantById = Object.fromEntries(variants.map((v) => [v.id, v])) as Record<
  Variant,
  VariantSpec
>;

/** §5.2 — Variant A prototype content. */
export const variantA = {
  greeting: 'Good morning! 🔥 4-day streak — keep it alive!',
  challenge: "Today's challenge: 20 minutes of movement.",
  challengePoints: '+150 pts',
  rank: "You're #12 this week. Two more sessions to reach top 10.",
  leaderboard: [
    { rank: 1, name: 'M. Brandt', score: 4820 },
    { rank: 2, name: 'S. Okonkwo', score: 4610 },
    { rank: 3, name: 'T. Vasquez', score: 4455 },
    { rank: 4, name: 'A. Lindqvist', score: 4201 },
    { rank: 5, name: 'J. Bauer', score: 3990 },
    { rank: 12, name: 'You', score: 2140, isUser: true },
  ],
  badges: ['Early Bird', 'Weekend Warrior', 'Streak Keeper', 'Century Club'],
  onComplete: '+150 points!  Streak extended to 5!  Two badges within reach!',
  cta: 'Log today’s session',
};

/** §5.3 — Variant B prototype content. */
export const variantB = {
  week: 'Week 2 of your 12-week programme.',
  sessions: 'Three sessions this week. Your target is three.',
  nextMilestone:
    'Next milestone: 6 weeks — the point where most people notice the effort dropping.',
  totalSegments: 12,
  filledSegments: 2,
  milestoneWeeks: [4, 6, 8, 12],
  onComplete: "Logged. That's this week's third — you've met the target three weeks running.",
  cta: 'Log today’s session',
};

/** §5.4 — Variant C prototype content. */
export const variantC = {
  stages: [
    'Finding your starting point',
    "Deciding what you're actually aiming at",
    'Week 2 — your body starts noticing',
    'Week 4 — the point most people stop',
    'Week 6 — it costs less effort now',
    'Week 8 — this is a habit, not a programme',
  ],
  currentStage: 2,
  onComplete:
    "That's week 2 done — the one where the body starts noticing. Week 4 is the one to watch for.",
  cta: 'Log today’s session',
  note: 'Progress is embedded in the stage, not shown as a number. No points. No badges. No leaderboard.',
};

/** §5.5 — scoring dimensions. */
export const dimensions: { id: Dimension; label: string; question: string }[] = [
  {
    id: 'motivation',
    label: 'Motivation',
    question: 'Would this get someone to act this week?',
  },
  {
    id: 'credibility',
    label: 'Credibility',
    question: 'Would a 52-year-old on a company programme trust this?',
  },
  {
    id: 'retention',
    label: 'Long-term retention',
    question: 'Would this still be working in month four?',
  },
  {
    id: 'clarity',
    label: 'Clarity',
    question: 'Can a user tell where they are without being taught?',
  },
  {
    id: 'acceptance',
    label: 'User acceptance',
    question: 'Would this population choose this if given the option?',
  },
];

/** §5.6 — stakeholder reactions. */
export type StakeholderId = 'marketing' | 'subject' | 'user';
export type ReactionTrigger =
  | 'A-highest'
  | 'B-highest'
  | 'C-highest'
  | 'credibility-over-motivation'
  | 'streaks-high'
  | 'many-rebalances';

export interface Stakeholder {
  id: StakeholderId;
  name: string;
  role: string;
  wants: string;
  lines: Partial<Record<ReactionTrigger, string>>;
  /** Which dimension the stakeholder's confidence tracks. */
  tracks: Dimension;
  /** Variant this stakeholder is happiest with. */
  favours: Variant;
}

export const stakeholders: Stakeholder[] = [
  {
    id: 'marketing',
    name: 'Petra',
    role: 'Marketing Lead',
    wants: 'Pushes activation, does not care about credibility.',
    tracks: 'motivation',
    favours: 'A',
    lines: {
      'A-highest': "Finally. That's a launch we can put a number against in week one.",
      'B-highest': 'Restrained is a word that shows up in post-mortems. What is our week-one story?',
      'C-highest': "It's lovely. Lovely doesn't get me an activation figure for the board.",
      'credibility-over-motivation':
        "I'm not arguing that it's credible. I'm arguing that nobody will see it.",
    },
  },
  {
    id: 'subject',
    name: 'Dr. Hausmann',
    role: 'Subject Matter Lead',
    wants: 'Warns against an overly playful tone.',
    tracks: 'credibility',
    favours: 'B',
    lines: {
      'A-highest': 'A leaderboard in prevention ranks the people we exist for at the bottom. Every week.',
      'B-highest': 'This one I could defend to a works council without preparing.',
      'C-highest': 'The stage names are true statements about the body. I can live with that.',
      'streaks-high':
        'Streaks in a population that includes people on medical leave. Think about who that punishes.',
    },
  },
  {
    id: 'user',
    name: 'Marcus, 52',
    role: 'A user',
    wants: 'Does not care about the leaderboard at all.',
    tracks: 'acceptance',
    favours: 'C',
    lines: {
      'A-highest': "I don't want to be twelfth at anything. I signed up because my doctor mentioned it.",
      'B-highest': "It's clear. I know what I'm supposed to do this week.",
      'C-highest': "Week four is the one I'd quit. It's oddly reassuring that it says so.",
      'many-rebalances':
        "You've been adjusting this for a while. I've already stopped opening it.",
    },
  },
];

export const REBALANCE_INTERVENTION_AT = 4;

/** §5.7 — conflict prompts (Step 5). */
export const conflictPrompts = [
  {
    id: 'activation-seriousness',
    label: 'Activation ↔ seriousness',
    prompt: 'What did you accept as less activating in order to stay credible?',
  },
  {
    id: 'activation-autonomy',
    label: 'Activation ↔ user autonomy',
    prompt: 'Where does your choice push a user toward a behaviour they did not ask for?',
  },
  {
    id: 'marketing-subject',
    label: 'Marketing ↔ subject matter',
    prompt: 'Whose objection did you overrule, and what evidence would change your mind?',
  },
];

/** §5.8 — residual risk prompts (Step 6). */
export const residualRiskPrompts = [
  'What is most likely to be true in month four that you cannot see now?',
  'Which user segment is worst served by this choice?',
  'What would the first complaint sound like?',
];

/** §5.9 — recommendation scaffold (Step 7). */
export const recommendationScaffold = [
  { id: 'variant', before: 'We recommend ', placeholder: 'the variant', after: ' for the 10-week release.' },
  { id: 'factor', before: 'The decisive factor was ', placeholder: 'the factor', after: ',' },
  { id: 'reason', before: 'because ', placeholder: 'the reason', after: '.' },
  { id: 'tradeoff', before: 'We are accepting ', placeholder: 'the trade-off', after: ',' },
  { id: 'consequence', before: 'which will show up as ', placeholder: 'the consequence', after: '.' },
  { id: 'rejected', before: 'We are not accepting ', placeholder: 'what we rejected', after: ',' },
  { id: 'rejectionReason', before: 'because ', placeholder: 'why we rejected it', after: '.' },
  { id: 'condition', before: 'If ', placeholder: 'a condition', after: ' proves true after release,' },
  { id: 'revisit', before: 'we would revisit ', placeholder: 'the decision to revisit', after: '.' },
];

export const healthjourneySteps = [
  { n: 1, id: 'experience', title: 'Step into each variant' },
  { n: 2, id: 'score', title: 'Score them' },
  { n: 3, id: 'stakeholders', title: 'Stakeholder reactions' },
  { n: 4, id: 'commit', title: 'Commit' },
  { n: 5, id: 'conflicts', title: 'Name the conflicts' },
  { n: 6, id: 'risks', title: 'Residual risks' },
  { n: 7, id: 'recommend', title: 'Recommendation to project lead' },
] as const;
