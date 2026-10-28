import type { Domain, DomainVerdict, Mechanic } from './types';

/**
 * CONTENT_PACK §3 — the mechanics registry.
 * Every gamified element in this app must reference an ID from this list.
 * Adding a mechanic without an entry here violates BUILD_PROMPT §0.5.
 */
export const mechanics: Mechanic[] = [
  {
    id: 'visible-progress',
    name: 'Visible progress ring',
    levers: ['progress-experience', 'competence'],
    whyItWorks:
      'Users calibrate effort against a visible remainder. An unknown remainder is processed as an infinite one.',
    riskIfOverused:
      'Progress theatre — rings that move without the user advancing. Trust cost is permanent.',
    fits: ['health', 'finance', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Learn hub', 'Concept sidebar', 'SkillRise radar', 'MoveWell timeline'],
    survivesExplanation: true,
  },
  {
    id: 'milestone',
    name: 'Named milestone',
    levers: ['progress-experience', 'narrative-meaning'],
    whyItWorks: 'Converts an arithmetic position into a threshold that means something.',
    riskIfOverused: 'Milestone inflation — everything marked as significant, so nothing is.',
    fits: ['health', 'finance', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Learn Mastery Map', 'MoveWell timeline', 'HealthJourney Variant C'],
    survivesExplanation: true,
  },
  {
    id: 'completion-feedback',
    name: 'Reinforcing completion feedback',
    levers: ['competence', 'recognition'],
    whyItWorks: 'Answers "did that count" in the user\'s terms rather than the system\'s.',
    riskIfOverused: 'Frequency dilution — confirmation so constant it stops carrying information.',
    fits: ['health', 'finance', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Every section completion', 'Self-check results'],
    survivesExplanation: true,
  },
  {
    id: 'self-efficacy-statement',
    name: '"You can now…" capability card',
    levers: ['competence', 'autonomy'],
    whyItWorks:
      'Names a capability the user did not have before, which raises the probability of a next attempt after failure.',
    riskIfOverused:
      'Hollow praise if the capability was not actually acquired. Users detect this quickly.',
    fits: ['health', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['End of every concept module', 'Level-up sheet'],
    survivesExplanation: true,
  },
  {
    id: 'points',
    name: 'Experience points',
    levers: ['reward', 'progress-experience'],
    whyItWorks: 'A universal accumulator that aggregates small actions into a visible total.',
    riskIfOverused: 'Reward inflation. Currency asymptotically approaches zero meaning.',
    fits: ['corporate-learning'],
    doesntFit: ['finance', 'public-service'],
    seenIn: ['XP meter in Motivation Console'],
    survivesExplanation: true,
  },
  {
    id: 'badges',
    name: 'Scarce named badges',
    levers: ['recognition', 'competence'],
    whyItWorks:
      'Value comes from scarcity and specificity — a badge names exactly what was achieved.',
    riskIfOverused:
      'More than about twelve, or one awarded for showing up, and all of them stop meaning anything.',
    fits: ['corporate-learning'],
    doesntFit: ['finance'],
    seenIn: ['9 badges total', '/day/9/original/progress'],
    survivesExplanation: true,
  },
  {
    id: 'levels',
    name: 'Capability levels',
    levers: ['competence', 'autonomy'],
    whyItWorks: 'Gives the user a noun for themselves — an identity shift, not a score.',
    riskIfOverused: 'Levels naming activity rather than ability read as flattery.',
    fits: ['corporate-learning'],
    doesntFit: [],
    seenIn: ['Observer / Analyst / Architect / Advisor'],
    survivesExplanation: true,
  },
  {
    id: 'challenges',
    name: 'Bounded time-limited task',
    levers: ['activation-trigger', 'reward'],
    whyItWorks: 'Excellent at starting a behaviour; the deadline supplies the activation energy.',
    riskIfOverused: 'Creates obligation the user never accepted. Poor at sustaining anything.',
    fits: [],
    doesntFit: ['finance', 'public-service'],
    seenIn: ['HealthJourney Variant A only'],
    survivesExplanation: true,
  },
  {
    id: 'streaks',
    name: 'Consistency counter',
    levers: ['loss-aversion', 'progress-experience'],
    whyItWorks:
      'The strongest retention mechanic available — consistency becomes something to protect.',
    riskIfOverused:
      'Ethically loaded. Its power comes from loss aversion; in health or learning, obligation becomes guilt. Use only for genuinely daily behaviour.',
    fits: [],
    doesntFit: ['finance', 'public-service'],
    seenIn: ['Motivation Console', 'HealthJourney Variant A'],
    survivesExplanation: true,
    survivesNote: 'Barely. It survives the test, but only where the behaviour is genuinely daily.',
  },
  {
    id: 'status-display',
    name: 'Persistent visible position',
    levers: ['social-validation'],
    whyItWorks: 'Effective for the visible few; position becomes an identity.',
    riskIfOverused:
      'In a large population most positions are unflattering, and the users it demotivates are usually the target audience.',
    fits: [],
    doesntFit: ['health', 'public-service'],
    seenIn: ['HealthJourney Variant A', 'Dark Pattern Mode'],
    survivesExplanation: true,
  },
  {
    id: 'social-comparison',
    name: 'Leaderboard / ranking',
    levers: ['social-validation'],
    whyItWorks: 'Strong short-term lift through visibility and competition.',
    riskIfOverused:
      'Ranks the target population last. Raises average engagement while damaging mission outcomes.',
    fits: [],
    doesntFit: ['health', 'finance', 'public-service'],
    seenIn: ['HealthJourney Variant A', 'Dark Pattern Mode (as objects of study)'],
    survivesExplanation: true,
  },
  {
    id: 'recognition-signal',
    name: 'System noticing an achievement',
    levers: ['recognition', 'competence'],
    whyItWorks: 'Recognition does not need to be social — the system noticing is often sufficient.',
    riskIfOverused: 'Recognition for trivial acts devalues recognition for real ones.',
    fits: ['health', 'finance', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Hotspot logging', 'Radar completion'],
    survivesExplanation: true,
  },
  {
    id: 'narrative-framing',
    name: 'Narrative stage naming',
    levers: ['narrative-meaning', 'competence'],
    whyItWorks:
      'Makes existing mechanics mean more without adding any new mechanics. Lowest-effort quality upgrade available.',
    riskIfOverused: 'Fiction that outruns the product becomes the thing users cite when they leave.',
    fits: ['health', 'corporate-learning'],
    doesntFit: [],
    seenIn: ['App-wide studio framing', 'HealthJourney Variant C'],
    survivesExplanation: true,
  },
  {
    id: 'unexpected-recognition',
    name: 'After-the-fact quality recognition',
    levers: ['competence', 'recognition'],
    whyItWorks:
      'Unexpected and quality-based rewards displace intrinsic motivation far less than announced contingent ones.',
    riskIfOverused: 'Loses its character if it becomes predictable — then it is just a reward.',
    fits: ['health', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Recovery bonus after a corrected self-check'],
    survivesExplanation: true,
  },
  {
    id: 'recovery-bonus',
    name: 'Higher reward for corrected error',
    levers: ['competence', 'autonomy'],
    whyItWorks:
      'Rewards recovery over correctness, which is what actually predicts continuation after failure.',
    riskIfOverused: 'Could be gamed by deliberate wrong answers — cap at one per check.',
    fits: ['health', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Self-checks, all 10 modules'],
    survivesExplanation: true,
  },
  {
    id: 'loss-aversion',
    name: 'Framing around what is at risk',
    levers: ['loss-aversion'],
    whyItWorks:
      'Losses are weighted more heavily than equivalent gains, producing strong short-term compliance.',
    riskIfOverused:
      'The clearest candidate for manipulation. In serious domains this is a strategic decision, not a team one.',
    fits: [],
    doesntFit: ['health', 'finance', 'corporate-learning', 'public-service'],
    seenIn: ['Dark Pattern Mode only, explicitly labelled'],
    survivesExplanation: false,
    survivesNote: 'Fails the test. Explained honestly, it stops producing compliance.',
  },
  {
    id: 'artificial-scarcity',
    name: 'Manufactured urgency / fake countdown',
    levers: ['activation-trigger'],
    whyItWorks: 'Urgency raises immediate action rates.',
    riskIfOverused:
      'Works only while the user does not understand it. Once noticed, generalises to every other signal.',
    fits: [],
    doesntFit: ['health', 'finance', 'corporate-learning', 'public-service'],
    seenIn: ['Dark Pattern Mode only, explicitly labelled'],
    survivesExplanation: false,
    survivesNote: 'Fails the test. A countdown you explain is a countdown nobody hurries for.',
  },
  {
    id: 'reward-inflation',
    name: 'Escalating reward levels',
    levers: ['reward'],
    whyItWorks: 'Restores engagement briefly by resetting the baseline.',
    riskIfOverused: 'The mechanism of its own failure. Each escalation buys less than the last.',
    fits: [],
    doesntFit: ['health', 'finance', 'corporate-learning', 'public-service'],
    seenIn: ['Dark Pattern Mode', 'Module 05 simulator'],
    survivesExplanation: false,
    survivesNote:
      'Fails the test. "We keep raising this because it stops working" persuades nobody.',
  },
  {
    id: 'governance-marker',
    name: 'Visible decision ownership',
    levers: ['autonomy'],
    whyItWorks:
      'Showing the user who decided something and why is itself trust-building in regulated domains.',
    riskIfOverused: 'Rarely overused — most organisations underuse it to zero.',
    fits: ['health', 'finance', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['Inspector panel', 'Module 10', 'Capstone Section 5'],
    survivesExplanation: true,
  },
  {
    id: 'constraint-visibility',
    name: 'Visible budget / time limits',
    levers: ['competence', 'autonomy'],
    whyItWorks:
      'Making constraints visible turns an arbitrary refusal into a comprehensible trade-off.',
    riskIfOverused: 'If constraints are visible but not real, users learn the whole frame is theatre.',
    fits: ['health', 'finance', 'corporate-learning', 'public-service'],
    doesntFit: [],
    seenIn: ['MoveWell budget bar and week ruler'],
    survivesExplanation: true,
  },
];

export const mechanicById = Object.fromEntries(mechanics.map((m) => [m.id, m])) as Record<
  string,
  Mechanic
>;

export const DOMAIN_LABELS: Record<Domain, string> = {
  health: 'Health',
  finance: 'Finance',
  'corporate-learning': 'Corporate learning',
  'public-service': 'Public service',
};

export const DOMAINS: Domain[] = ['health', 'finance', 'corporate-learning', 'public-service'];

export const LEVER_LABELS: Record<string, string> = {
  competence: 'Competence',
  autonomy: 'Autonomy',
  relatedness: 'Relatedness',
  'progress-experience': 'Progress experience',
  'social-validation': 'Social validation',
  reward: 'Reward',
  'activation-trigger': 'Activation trigger',
  'narrative-meaning': 'Narrative meaning',
  'loss-aversion': 'Loss aversion',
  recognition: 'Recognition',
};

/** CONTENT_PACK §3, domain fit table — drives the Module 09 demo and /inspector. */
export interface DomainFitRow {
  mechanicId: string;
  label: string;
  verdicts: Record<Domain, { verdict: DomainVerdict; note?: string }>;
}

export const domainFit: DomainFitRow[] = [
  {
    mechanicId: 'points',
    label: 'Points',
    verdicts: {
      health: { verdict: 'conditional' },
      finance: { verdict: 'do-not' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'do-not' },
    },
  },
  {
    mechanicId: 'badges',
    label: 'Badges',
    verdicts: {
      health: { verdict: 'conditional' },
      finance: { verdict: 'do-not' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'conditional' },
    },
  },
  {
    mechanicId: 'levels',
    label: 'Levels',
    verdicts: {
      health: { verdict: 'conditional' },
      finance: { verdict: 'conditional' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'conditional' },
    },
  },
  {
    mechanicId: 'challenges',
    label: 'Challenges',
    verdicts: {
      health: { verdict: 'conditional', note: 'Opt-in only.' },
      finance: { verdict: 'do-not' },
      'corporate-learning': { verdict: 'conditional' },
      'public-service': { verdict: 'do-not' },
    },
  },
  {
    mechanicId: 'streaks',
    label: 'Streaks',
    verdicts: {
      health: { verdict: 'conditional', note: 'Daily behaviour only.' },
      finance: { verdict: 'do-not' },
      'corporate-learning': { verdict: 'conditional' },
      'public-service': { verdict: 'do-not' },
    },
  },
  {
    mechanicId: 'social-comparison',
    label: 'Leaderboards',
    verdicts: {
      health: { verdict: 'do-not' },
      finance: { verdict: 'do-not' },
      'corporate-learning': { verdict: 'conditional', note: 'Small teams only.' },
      'public-service': { verdict: 'do-not' },
    },
  },
  {
    mechanicId: 'status-display',
    label: 'Status tiers',
    verdicts: {
      health: { verdict: 'do-not' },
      finance: { verdict: 'conditional', note: 'Tiers only.' },
      'corporate-learning': { verdict: 'conditional' },
      'public-service': { verdict: 'do-not' },
    },
  },
  {
    mechanicId: 'visible-progress',
    label: 'Progress bars',
    verdicts: {
      health: { verdict: 'ship' },
      finance: { verdict: 'ship' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'ship' },
    },
  },
  {
    mechanicId: 'milestone',
    label: 'Milestones',
    verdicts: {
      health: { verdict: 'ship' },
      finance: { verdict: 'ship' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'ship' },
    },
  },
  {
    mechanicId: 'narrative-framing',
    label: 'Narrative stages',
    verdicts: {
      health: { verdict: 'ship' },
      finance: { verdict: 'conditional' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'conditional' },
    },
  },
  {
    mechanicId: 'completion-feedback',
    label: 'Competence feedback',
    verdicts: {
      health: { verdict: 'ship' },
      finance: { verdict: 'ship' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'ship' },
    },
  },
  {
    mechanicId: 'unexpected-recognition',
    label: 'Unexpected recognition',
    verdicts: {
      health: { verdict: 'ship' },
      finance: { verdict: 'conditional' },
      'corporate-learning': { verdict: 'ship' },
      'public-service': { verdict: 'ship' },
    },
  },
];

/**
 * CONTENT_PACK §2 M09 demo — the reason and the stakeholder sentence for each
 * cell of the domain fit matrix. Cells not listed fall back to a line built
 * from the mechanic's own risk text.
 */
export const domainFitDetail: Record<string, { reason: string; stakeholderSentence: string }> = {
  'social-comparison:health': {
    reason:
      'Ranks the users the programme exists for at the bottom, weekly, in a domain where being at the bottom already carries shame.',
    stakeholderSentence:
      'It will lift our average engagement and lower engagement among the people we are funded to reach. I can show you which of those two numbers we report on.',
  },
  'streaks:health': {
    reason:
      'Powerful for a genuinely daily behaviour, and a guilt engine for anything less. Some of this population is on medical leave.',
    stakeholderSentence:
      'I will ship the streak the day we can say the behaviour is daily for most users, and only with a freeze nobody has to ask for.',
  },
  'points:finance': {
    reason:
      'Attaching a currency to financial decisions changes what the decision is about, and a regulator reads that as an incentive to act.',
    stakeholderSentence:
      'Points here would mean we are paying customers to transact. That is a product we would have to defend line by line.',
  },
  'narrative-framing:health': {
    reason:
      'The real process already has stages, causality and stakes. Naming them truthfully is free and cannot embarrass the brand.',
    stakeholderSentence:
      'The story is what actually happens in week two. We are not inventing anything, so there is nothing to be caught inventing.',
  },
  'visible-progress:public-service': {
    reason:
      'A citizen waiting on a decision needs to know where the case stands. A visible remainder is the highest-trust thing we can show.',
    stakeholderSentence:
      'Every complaint we receive about waiting is really a complaint about not knowing. This answers that directly.',
  },
  'challenges:public-service': {
    reason:
      'A deadline creates obligation, and citizens did not opt into an obligation when they applied for a service they are entitled to.',
    stakeholderSentence:
      'We cannot put a countdown on an entitlement. If the deadline is real, it is a rule; if it is not, it is pressure.',
  },
  'badges:finance': {
    reason:
      'A badge in a financial product recognises a behaviour we profit from, which makes recognition read as marketing.',
    stakeholderSentence:
      'The badge names something we wanted them to do. That is not recognition, it is a receipt for compliance.',
  },
  'levels:corporate-learning': {
    reason:
      'Enough accumulated behaviour exists to compress into a capability name, and the name is defensible against a real skills framework.',
    stakeholderSentence:
      'The level says what someone can now do. If we cannot write that sentence, we do not ship the level.',
  },
};

export function domainFitKey(mechanicId: string, domain: Domain): string {
  return `${mechanicId}:${domain}`;
}

export const VERDICT_LABEL: Record<DomainVerdict, string> = {
  ship: 'Ship it',
  conditional: 'Conditional',
  'do-not': 'Do not ship',
};
