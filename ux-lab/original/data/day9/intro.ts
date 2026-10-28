/**
 * The home page of Day 9 (UX-STANDARD 2.8, from DL #27). Every fact comes from the plan
 * (Strukturplan, day 9) or from the day's own cases; no figure, no promise the day does not keep.
 */

export const INTRO = {
  eyebrow: 'Module 4 · Day 3 of 3',
  title: 'Day 9 · Gamification strategies',
  deck: 'Gamification strategies for user activation and retention, and how storytelling and gamification work together.',
  about: [
    'Today is about how a digital offer gets people to start and to stay. You learn which mechanics (points, badges, levels, challenges, streaks, feedback) help and which only give short-lived stimuli, why users respond to progress, feedback, recognition and challenge, and what makes gamification credible in a serious field. You also see where it backfires: manipulation, overload, reward inflation, loss of trust.',
    'Three cases run through the day, in the order of the plan: SkillRise, a learning platform with little visible progress; HealthJourney, three ways to activate the users of a prevention platform; and MoveWell, a health provider whose users drop out. The puzzle stays the same: how do you raise activation and retention without losing seriousness and credibility?',
  ],
  storyHeading: 'One story, two routes',
  closing:
    'The plan runs in this order: material, two short tasks, a case study, then the transfer project. Route 1 takes you through the first four; Route 2 is the transfer project.',
  wiifm: {
    heading: 'What’s in it for you',
    lede: 'Each skill below is one you can use at your own desk next week, not only in these cases.',
    items: [
      {
        route: 1,
        skill: 'Tell motivation from plain functionality',
        payoff:
          'Naming where a product weakens or supports activation (progress, feedback, recognition) turns “it feels flat” into something a team can fix, for any product you review.',
      },
      {
        route: 1,
        skill: 'Say what a weakness means for the user',
        payoff:
          'A sentence that starts “For users, this could mean that …” moves a discussion from taste to effect, in any design review.',
      },
      {
        route: 1,
        skill: 'Weigh gamification options against seriousness',
        payoff:
          'Comparing options on motivation, credibility, long-term retention, clarity and acceptance is a way to decide between any set of ideas without choosing the one that looks most attractive.',
      },
      {
        route: 1,
        skill: 'Prioritise measures under a budget and a deadline',
        payoff:
          'Ranking four measures by user impact, feasibility, risk and time pressure is a method you can reuse in any planning round.',
      },
      {
        route: 2,
        skill: 'Design an activation and retention architecture',
        payoff:
          'A guiding vision, three guiding decisions, a prioritised plan, the risks and who decides: the parts of a strategy you can lay out for any product.',
      },
      {
        route: 2,
        skill: 'Decide before the data exists, and leave with two documents',
        payoff:
          'Stating what you decide, which risks remain and why, is how to act responsibly with incomplete data. You keep the Activation Analysis File and the Activation Strategy Memo as templates for your own product.',
      },
    ],
  },
} as const;
