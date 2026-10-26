/**
 * Teaching content for the Learn tab. Bullets are CAPTIONS for the widgets —
 * never the main content — so each list stays at three items or fewer.
 */

export const FLAT_VS_SPATIAL_CAPTIONS = [
  'A classic interface is a surface you look AT — one plane, one viewing direction.',
  'An immersive interface is a space you are INSIDE — content sits around and in front of you.',
  'The shift changes orientation, presence, and embodiment, not just the visual style.',
] as const;

export const AR_OVERLAY_CAPTIONS = [
  'AR anchors the information to the object instead of to a separate document.',
  'Spatial guidance replaces the read-and-map step: no translating a page onto a machine.',
  'Every anchored label is also a stimulus — the count matters as much as the content.',
] as const;

export const TECHNOLOGY_MAP = [
  {
    id: 'ar',
    name: 'Augmented Reality',
    definition:
      'Digital information is placed into the view of the real environment, which stays visible and dominant.',
    useCase: 'Use case: step-by-step guidance shown on the equipment a worker is already looking at.',
  },
  {
    id: 'vr',
    name: 'Virtual Reality',
    definition:
      'The real environment is replaced by a fully synthetic one that the user is inside of.',
    useCase: 'Use case: rehearsing a rare or hazardous procedure without occupying real equipment.',
  },
  {
    id: 'mr',
    name: 'Mixed Reality',
    definition:
      'Real and virtual elements coexist and react to one another, including spatial anchoring and occlusion.',
    useCase: 'Use case: a virtual layout placed into a real room so both can be judged together.',
  },
  {
    id: 'spatial',
    name: 'Spatial Interfaces',
    definition:
      'Interface elements are positioned in three-dimensional space and addressed by position, distance, and direction.',
    useCase: 'Use case: arranging parallel information sources around the user instead of in tabs.',
  },
  {
    id: 'sensory',
    name: 'Sensory Interaction',
    definition:
      'Input and feedback run through several senses — gaze, gesture, voice, touch, sound, haptics.',
    useCase: 'Use case: confirming a completed action through a short haptic signal rather than a dialog.',
  },
  {
    id: 'adaptive',
    name: 'Context-Adaptive Systems',
    definition:
      'The system changes what it shows based on situation, task state, location, or the user’s current load.',
    useCase: 'Use case: reducing displayed detail automatically while a time-critical step is running.',
  },
] as const;

export const COGNITIVE_LOAD_CAPTIONS = [
  'Attention is a limited resource: more simultaneous stimuli does not mean more understanding.',
  'Perceptual guidance decides which stimulus wins — without it, processing cost rises fast.',
  'Past the threshold, decision behaviour degrades: users slow down, skip steps, or disengage.',
] as const;

export const LOAD_ZONES = [
  {
    id: 'underload',
    label: 'Underload',
    range: '1–3 stimuli',
    readout:
      'Too little to work with. The user has spare capacity but not enough signal, so they search for context that the interface never provides.',
  },
  {
    id: 'optimal',
    label: 'Optimal',
    range: '4–6 stimuli',
    readout:
      'Enough guidance to act, few enough elements to keep priority visible. Attention is spent on the task rather than on sorting the display.',
  },
  {
    id: 'overload',
    label: 'Overload',
    range: '7–10 stimuli',
    readout:
      'Stimuli compete. Comprehension falls even though more information is present, and users start to skip, guess, or stop.',
  },
] as const;

export const OPPORTUNITIES = [
  {
    id: 'visualisation',
    label: 'Better visualisation',
    example: 'A spatial relationship that a drawing flattens can be shown at its real scale and position.',
  },
  {
    id: 'situational',
    label: 'Situational support',
    example: 'Guidance appears at the moment and place of the action instead of being looked up beforehand.',
  },
  {
    id: 'training',
    label: 'Training',
    example: 'A procedure can be rehearsed repeatedly without occupying live equipment or risking damage.',
  },
  {
    id: 'complex-content',
    label: 'Experiencing complex content',
    example: 'An abstract process becomes walkable, so its sequence and scale are understood rather than memorised.',
  },
  {
    id: 'interaction',
    label: 'New forms of interaction',
    example: 'Gaze, gesture, or voice free the hands that the actual task already needs.',
  },
] as const;

export const RISKS = [
  {
    id: 'overload',
    label: 'Stimulus overload',
    example: 'Several anchored elements compete for attention at exactly the moment the task gets difficult.',
  },
  {
    id: 'disorientation',
    label: 'Disorientation',
    example: 'A user loses track of where they are or which step they are on once the view changes around them.',
  },
  {
    id: 'acceptance',
    label: 'Low acceptance',
    example: 'Staff experience the device as extra effort imposed on a routine they already perform reliably.',
  },
  {
    id: 'technical',
    label: 'Technical hurdles',
    example: 'Tracking, lighting, or connectivity behave differently in the real environment than in the demo room.',
  },
  {
    id: 'effort',
    label: 'High implementation effort',
    example: 'Content must be authored and maintained per variant, and it ages every time the process changes.',
  },
] as const;

/** Widget 6 — deliberately a generic sample use case, unrelated to any graded case. */
export const DECISION_GATES = [
  {
    id: 'gate-1',
    question: 'Is there a real user problem?',
    yesNote: 'A problem the user already has, stated in their words, not a capability looking for a home.',
    failVerdict:
      'Without a stated user problem, the idea is a demonstration. It may still be interesting to build, but nothing yet justifies it.',
  },
  {
    id: 'gate-2',
    question: 'Does immersion solve it better than a classic interface?',
    yesNote: 'The advantage has to come from space, presence, or anchoring — not from novelty.',
    failVerdict:
      'If a list, a form, or a photo does the same job, immersion is added cost. The idea may still be interesting, but it is not yet justified.',
  },
  {
    id: 'gate-3',
    question: 'Is the technology mature enough for this context?',
    yesNote: 'Maturity is judged in the real environment, with its lighting, noise, connectivity, and shift patterns.',
    failVerdict:
      'Immature in this context means unreliable in front of real users. The idea may still be interesting, but it is not yet justified.',
  },
  {
    id: 'gate-4',
    question: 'Is it viable to run and scale?',
    yesNote: 'Content authoring, device handling, and updates continue long after the pilot ends.',
    failVerdict:
      'A one-off that cannot be run or scaled stays a pilot. The idea may still be interesting, but it is not yet justified.',
  },
] as const;

export const DECISION_SAMPLE_CASE =
  'Sample use case (generic, for practice): a company is considering an immersive onboarding walkthrough of its own office building for new starters.';

export const DECISION_PASS_VERDICT =
  'All four gates hold for this sample. The idea has earned a place in the portfolio — which is the start of planning, not the end of it.';

export const LINKED_NODES = [
  {
    id: 'innovation',
    label: 'Innovation',
    role: 'The new capability itself: what the technology now makes possible that was not possible before.',
    weakLink:
      'When this link is weak, the effort produces something familiar at higher cost — there is nothing to justify the change.',
  },
  {
    id: 'need',
    label: 'Need',
    role: 'The user-side or organisational pull: the problem that someone actually wants solved.',
    weakLink:
      'When this link is weak, adoption stalls. The build succeeds technically and is then used by nobody.',
  },
  {
    id: 'maturity',
    label: 'Maturity',
    role: 'How dependably the technology performs in this specific context, not in a lab.',
    weakLink:
      'When this link is weak, every failure is read as a failure of the idea, and trust is spent before value arrives.',
  },
  {
    id: 'market-fit',
    label: 'Market Fit',
    role: 'Whether the value can be delivered, paid for, and repeated at the scale intended.',
    weakLink:
      'When this link is weak, the pilot works and never becomes a product — cost per user never falls.',
  },
] as const;

export const FASCINATION_CARDS = [
  {
    id: 'fascination',
    title: 'Fascination-driven decision',
    optimisedFor: 'Optimised for: visible novelty, internal excitement, a strong demo moment.',
    measured: 'Measured by: attention received — reactions, coverage, how impressive the first showing was.',
    goesWrong:
      'Typically goes wrong when: the demo succeeds and the process does not change. Effort was spent where it was most visible rather than where it mattered.',
  },
  {
    id: 'impact',
    title: 'Impact-oriented decision',
    optimisedFor: 'Optimised for: an effect on a real task, at a defensible cost, with risk that is owned.',
    measured: 'Measured by: change in the work itself — errors, time, confidence, sustained use after week one.',
    goesWrong:
      'Typically goes wrong when: the discipline turns into caution and nothing visible ships, so the organisation stops funding the work.',
  },
] as const;

export const FASCINATION_NOTE =
  'The responsibility of specialists and leaders is to prioritise future technologies by impact, viability, and accountability rather than by fascination.';

export const ETHICS_CARDS = [
  {
    id: 'manipulation',
    title: 'Perceptual manipulation and attention steering',
    question:
      'Guiding question: when we direct where someone looks, are we serving their task — or our own metric?',
  },
  {
    id: 'strain',
    title: 'Sensory and psychological strain',
    question:
      'Guiding question: who notices, and who is accountable, when the strain of the format only shows after prolonged use?',
  },
  {
    id: 'sensing',
    title: 'Data and behavioural sensing',
    question:
      'Guiding question: immersive systems can sense gaze, movement, and hesitation — what would a user assume is not being recorded?',
  },
  {
    id: 'inclusion',
    title: 'Inclusion and heterogeneous user groups',
    question:
      'Guiding question: who is excluded by this format by default, and is that exclusion visible in our success measures?',
  },
] as const;

export const REPUTATION_READOUTS = [
  {
    id: 'maturity-leads',
    label: 'Usage maturity clearly leads rollout',
    readout:
      'Rollout follows evidence. Reputational risk is low and mostly internal, but the competitive advantage is small — others may reach the market first with a rougher version.',
  },
  {
    id: 'balanced',
    label: 'Roughly balanced',
    readout:
      'Visible steps and evidence advance together. Advantage and risk are both moderate, and the balance has to be re-checked at each release rather than set once.',
  },
  {
    id: 'rollout-leads',
    label: 'Rollout clearly leads usage maturity',
    readout:
      'The advantage is immediate and visible. So is the exposure: failures happen in front of users, and innovation becomes reputational risk the moment the experience is worse than what it replaced.',
  },
] as const;
