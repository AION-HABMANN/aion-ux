import type { FacilitatorCard } from './types';

/** Day 1 of the UX course: Module 1 (day 1 of 1). The plan's topic of the day, in the plan's own words. */
export const DAY = {
  n: 1,
  module: 'Module 1 · Day 1 of 1',
  title: 'Introduction to psychological UX design',
  topic: 'Introduction to psychological UX design · neural basics of visual perception · overview of neuro design in the interface',
  heading: 'Day 1 · Psychological UX design and neuro design',
};

export const INTRO = {
  about:
    'Today you learn to judge a design by what it does to people (what they notice first, understand, feel and do) before you judge it by how it looks. You see how attention, expectations and feelings work in the interface, and you practise on three cases.',
  caseLine:
    'Route 1 has three cases from the plan: the health app CarePath, three start pages for the learning platform SkillFlow, and the insurance portal SafeHome Online. Route 2 is one decision for a whole digital service.',
  story: [
    { route: 1 as const, verb: 'Analyse and decide', question: 'What does a design do to people, and what would you fix first?', output: 'Neuro-UX Analysis File' },
    { route: 2 as const, verb: 'Decide', question: 'Which effect should a whole service create, who decides, and what do you decide when information is missing?', output: 'Neuro-UX Strategy Memo' },
  ],
  wiifm: [
    { route: 1 as const, skill: 'Describe an effect before you judge a design', payoff: 'In a review you can say what a screen does to attention, trust and mental load, instead of saying “I like it” or “I don’t”.' },
    { route: 1 as const, skill: 'Turn an impression into an assumption you can test', payoff: 'A hypothesis such as “this banner could make users uneasy” can be tested; a gut feeling cannot.' },
    { route: 1 as const, skill: 'Sort problems into categories and rank them', payoff: 'You can show a team why one fix comes first instead of listing everything that is wrong.' },
    { route: 1 as const, skill: 'Choose between designs without test data', payoff: 'When there is no time or no data, you can still decide, say what you accept and say what you would check next.' },
    { route: 2 as const, skill: 'Argue for a decision with an effect, a risk and a priority', payoff: 'You can answer a board in its own terms: what it changes for users, what could go wrong and why this first.' },
    { route: 2 as const, skill: 'Set up who decides when goals conflict', payoff: 'Marketing, compliance, IT and sales pull in different directions; a clear rule for who decides saves months of argument.' },
  ],
};

export const ROUTES = {
  1: {
    no: 1 as const,
    levels: 'Levels 1 + 2',
    kicker: 'Route 1 · Levels 1 + 2',
    h1: 'Analyse and decide',
    blurb: 'Read the cards, then work three cases from the plan: describe what an app does to people, choose between three start pages under uncertainty, and redesign an insurance portal.',
    deliverable: 'Neuro-UX Analysis File',
    fileTag: 'l1l2-neuro-ux-analysis',
  },
  2: {
    no: 2 as const,
    levels: 'Level 3',
    kicker: 'Route 2 · Level 3',
    h1: 'Decide',
    blurb: 'Read the two cards, then develop a Neuro-UX strategy for a digital service across several channels, and take a decision although information is missing.',
    deliverable: 'Neuro-UX Strategy Memo',
    fileTag: 'l3-neuro-ux-strategy',
  },
};

/** The plan's two rows without a written deliverable: Coaching (UE4) and the Feedbackrunde (UE7). Hidden until the mentor passcode (DL-STANDARD 3). */
export const FACILITATOR: FacilitatorCard[] = [
  {
    id: 'coaching-card',
    after: '1.2',
    openLabel: 'Coaching · open it with the group',
    sections: [
      {
        kicker: 'Coaching focus: from describing to an accountable UX decision',
        items: [
          'Why is user psychology not a “nice-to-have” but the basis of effective design?',
          'The difference between subjective taste and a reliable effect assumption.',
          'How do I recognise whether a design steers attention or destroys it?',
          'How do I argue against internal preferences when the effect on users speaks against them?',
          'How do I deal with an incomplete data situation?',
          'Which UX decisions have operational effect, and which have strategic reach?',
          'The role of UX leads: executing design, or co-architecting user behaviour?',
        ],
      },
      {
        kicker: 'Reflection · talk it through, nothing is written down',
        items: [
          'Which design decision influences behaviour most?',
          'Where would you, as adviser or product owner, object?',
          'Which false design assumption could become most expensive for a company, the brand or the user?',
        ],
      },
    ],
  },
  {
    id: 'feedback-card',
    after: '2.1',
    openLabel: 'Feedback round · open it with the group',
    sections: [
      {
        kicker: 'Preparation',
        items: [
          'Each group presents its prioritised measures in 5 minutes.',
          'The reasoning is not only about design but runs along effect, risk, priority and responsibility.',
          'Each group must name one measure it deliberately did not prioritise.',
        ],
      },
      {
        kicker: 'Feedback questions',
        items: [
          'Which measure creates the greatest effect in the short term?',
          'Which measure would be strategically most valuable, even if it takes more effort?',
          'Which decision is robust although information is missing?',
          'Where was design still thought of as operational and not as a decision architecture?',
          'Which risks arise if you follow only internal preferences?',
        ],
      },
      {
        kicker: 'Level 3 input · talk it through, nothing is written down',
        items: [
          'Senior level means not only producing solutions but steering effect logics.',
          'Good management decisions in UX balance user interest, feasibility, regulatory requirements, brand impact and resources.',
          'What matters is not perfect information but a prioritisation you can answer for under uncertainty.',
        ],
      },
      {
        kicker: 'Discussion impulse',
        items: ['“When is a UX problem no longer a design problem, but a leadership and decision problem?”'],
      },
    ],
  },
];

/** The plan's eight rows (UE), as the day's agenda. Minutes are not decided yet (DL pending decision 1): the agenda lists rows and parts only. */
export const AGENDA = [
  { ue: 'UE 1', row: 'Wissen', what: 'Read Materi A (5 cards) and, for Route 2, Materi B (2 cards).' },
  { ue: 'UE 2', row: 'Arbeitsauftrag 1', what: 'Block 1.1 · CarePath.' },
  { ue: 'UE 3', row: 'Arbeitsauftrag 2', what: 'Block 1.2 · SkillFlow.' },
  { ue: 'UE 4', row: 'Coaching', what: 'A discussion with the group; the facilitator has a card, nothing is written.' },
  { ue: 'UE 5–6', row: 'Fallstudie', what: 'Block 2.1 · SafeHome Online.' },
  { ue: 'UE 7', row: 'Feedbackrunde', what: 'A group presentation and discussion; the facilitator has a card, nothing is written.' },
  { ue: 'UE 8–10', row: 'Transferprojekt', what: 'Block 3.1 · Route 2.' },
];
