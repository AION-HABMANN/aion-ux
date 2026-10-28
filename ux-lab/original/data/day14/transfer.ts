/**
 * Transfer Project scaffolding content — Level 3.
 *
 * Every string here is STRUCTURAL. None of it supplies strategy content, a
 * model answer, an evaluation, or the curriculum's sample recommendation.
 */

export const TRANSFER_ROLE =
  'Role: Chief Experience Officer / innovation architect / division head / product manager / strategy consultant. The task is not selecting individual trend technologies but developing a viable decision architecture for immersive UX, neuroscience-informed user guidance, and innovation governance.';

export const TRANSFER_CONDITIONS = [
  'Limited budget',
  'Diverging stakeholder goals',
  'Technology maturity varies strongly by use case',
  'Patchy data on real user acceptance',
  'First pilots must be visible soon',
  'Wrong decisions can increase cost, frustration, and reputational damage',
] as const;

export const VALUE_ANCHORS = [
  'user value',
  'innovation signal',
  'risk control',
  'inclusion',
  'measurable impact',
  'maturity discipline',
] as const;

export const VISION_STEM_PREFIX = 'We will pursue immersive UX where it delivers';
export const VISION_STEM_SUFFIX = ', and we will judge every proposal against that standard.';

export const DECISION_DOMAINS = [
  'Technology Deployment',
  'Maturity Assessment',
  'User Value',
  'Innovation Portfolio',
] as const;

export const RISK_DOMAINS = [
  {
    id: 'innovation',
    title: 'Innovation',
    prompt: 'Which critical false assumption could we be making about the innovation itself?',
  },
  {
    id: 'user-behaviour',
    title: 'User Behaviour',
    prompt: 'Which critical false assumption could we be making about how people will actually behave?',
  },
  {
    id: 'market-maturity',
    title: 'Market Maturity',
    prompt: 'Which critical false assumption could we be making about the readiness of the market?',
  },
  {
    id: 'economic-viability',
    title: 'Economic Viability',
    prompt: 'Which critical false assumption could we be making about what this costs and returns?',
  },
] as const;

export const GOVERNANCE_ROLES = [
  'CXO',
  'Innovation architect',
  'Division head',
  'Product management',
  'Specialist departments',
] as const;

export const UNCERTAINTY_QUESTIONS = [
  {
    id: 'true',
    prompt: 'What would have to be true?',
    guidance:
      'Name the assumption the decision rests on, in a form someone could disagree with.',
  },
  {
    id: 'reversible',
    prompt: 'What is reversible here, and what is not?',
    guidance:
      'Separate the parts you could undo next quarter from the parts that commit you for years.',
  },
  {
    id: 'waiting',
    prompt: 'What is the cost of waiting?',
    guidance: 'State what changes — for users, for cost, for position — if this decision is deferred.',
  },
  {
    id: 'smallest-test',
    prompt: 'What is the smallest test that would change the decision?',
    guidance:
      'Describe the cheapest observation whose outcome would genuinely move you off your current answer.',
  },
  {
    id: 'wrong',
    prompt: 'How would we notice we were wrong, and by when?',
    guidance: 'Name the signal and the date by which you expect to see it.',
  },
] as const;

export const STATEMENT_FRAME = [
  { id: 'recommendation', prefix: 'We recommend', placeholder: 'your recommendation' },
  { id: 'priority', prefix: 'as the first priority, because', placeholder: 'your priority reasoning' },
  { id: 'reasoning', prefix: 'The decision rests on', placeholder: 'your reasoning' },
  { id: 'effect', prefix: 'We expect this to produce', placeholder: 'your expected effect' },
] as const;

export const PRIORITY_QUADRANTS = [
  { id: 'high-impact-low-effort', label: 'High impact · Low effort' },
  { id: 'high-impact-high-effort', label: 'High impact · High effort' },
  { id: 'low-impact-low-effort', label: 'Low impact · Low effort' },
  { id: 'low-impact-high-effort', label: 'Low impact · High effort' },
] as const;

export type QuadrantId = (typeof PRIORITY_QUADRANTS)[number]['id'];
