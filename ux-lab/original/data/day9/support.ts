/**
 * Support content for the Day 9 tasks (DL-STANDARD 2 and CLAUDE.md #7, #19, #23):
 *   HELP     "How to build the answer" under every item: how to go about it, never the answer.
 *   KEY      the mentor's model answer for every field. Behind the mentor bar, never exported.
 *   GLOSSARY plain-words explanations of the technical terms the tasks use.
 *
 * Sources. Task 3 follows the plan's own Musterlösung (Kernlogik) for MoveWell, put into English.
 * Tasks 1, 2 and 4 have no model solution in the plan: their model answers are DRAFTS written
 * from the case facts the plan prints (nothing else is used). They must be reviewed before they are
 * relied on (see KEY_SOURCE).
 */

export const KEY_SOURCE: Record<'t1' | 't2' | 't3' | 't4', { from: 'plan' | 'draft'; note: string }> = {
  t1: { from: 'draft', note: 'Draft written from the six lines of the SkillRise description. The plan gives no model solution for this task.' },
  t2: { from: 'draft', note: 'Draft written from the variants and conditions in the plan. The plan gives no model solution for this task.' },
  t3: { from: 'plan', note: 'The plan’s Musterlösung (Kernlogik) for MoveWell, in English. Item 2 and item 5 are drawn from its sections A and C.' },
  t4: { from: 'draft', note: 'Draft written from the scenario and conditions in the plan. The plan gives no model solution for this task.' },
};

/** Key: `${taskId}-${itemNumber}`. */
export const HELP: Record<string, string[]> = {
  't1-1': [
    'Start from the six lines of the description. Which of them would a user notice first?',
    'Say what a user does or feels because of it: starts, carries on, stops.',
    'Finish with the likely effect on motivation and on staying.',
  ],
  't1-2': [
    'Go through the description line by line; each line usually holds one place.',
    'For each place, write what it does to activation or retention, and whether it weakens or supports it.',
    'Find at least five. One place per line.',
  ],
  't1-3': [
    'Take each place from item 2 and ask which of the six categories it is about.',
    'Write it under that heading. A place belongs to one category.',
    'An empty category is fine: it shows what the case does not tell you.',
  ],
  't1-4': [
    'Pick the three points that matter most to a user.',
    'Continue the sentence with a consequence for the user, not a feature of the platform.',
    'Use behaviour you can picture: they skip, they doubt, they leave.',
  ],
  't1-5': [
    'Look at your statements from item 4: which two would hurt activation most?',
    'Put the biggest first.',
    'A few words each; the reason can follow in the same line.',
  ],
  't2-1': [
    'Take one variant at a time and go through the five criteria: motivation, credibility, long-term retention, clarity, user acceptance.',
    'Use the conditions: the target group, the need to stay serious, the limited budget, no user tests yet.',
    'Write what you can say for each variant, and where you cannot judge yet.',
  ],
  't2-2': [
    'Choose the variant that works under all the conditions together, not the one you like best.',
    'Give the reason in the words of the conditions.',
  ],
  't2-3': [
    'Name what activation costs in seriousness, and what it costs in the user’s freedom to set their own pace.',
    'Say which side marketing stands on and which side the specialist department stands on.',
  ],
  't2-4': [
    'Ask what could still go wrong with the variant you chose.',
    'Think of what you cannot know yet (there are no user tests) and of the 10 weeks.',
  ],
  't2-5': [
    'Write for the project lead, who has not read your analysis: the decision first, then the main reason, then the main risk.',
    'Keep it short enough to say out loud in a meeting.',
  ],
  't3-1': [
    'Read the six observed problems and ask what they have in common.',
    'Say what is missing for the user, not what is wrong with the screens.',
    'Link the deficits to activation and to retention separately.',
  ],
  't3-2': [
    'Take each problem and ask which of the six categories it is about.',
    'Write it under that heading. An empty category is fine.',
  ],
  't3-3': [
    'Each measure should answer at least one problem from item 1.',
    'Put the one you would start with first.',
    'Stay inside the conditions: no full relaunch, limited technical resources, partly available data.',
  ],
  't3-4': [
    'For each measure say its effect on users, whether it is feasible with the budget and the technical resources, its risk, and how the 12 weeks affect it.',
    'You can go measure by measure or write one paragraph.',
  ],
  't3-5': [
    'Decide what you start with, what comes next and what waits, inside the first 12 weeks.',
    'Say why in one or two lines.',
  ],
  't3-6': [
    'Write for the division head: the decision, the main reason, the expected effect.',
    'Name the one thing you are not doing yet, and why.',
  ],
  't4-1': [
    'In two or three sentences: which motivation and which experience of use should the company create, and what should it not become?',
    'Write it so that every later decision can be checked against it.',
  ],
  't4-2': [
    'Take three of the five areas: progress, reinforcement, depth of gamification, storytelling, long-term retention.',
    'For each, write a decision, not a topic: “We will …”.',
  ],
  't4-3': [
    'Name the journeys, functions or touchpoints, in the order you would improve them.',
    'Say why those come first: where users leave, what is visible soon, what the limited budget allows.',
    'Remember that not all systems can be extended at once.',
  ],
  't4-4': [
    'List the assumptions your plan rests on: about motivation, about the target group, about the mechanics.',
    'Mark the ones that would do the most harm if they were wrong.',
  ],
  't4-5': [
    'Name one owner for the activation principles.',
    'Say who else has a say, and how a conflict between brand, user interest and profitability gets decided.',
  ],
  't4-6': [
    'Pick one decision you will take now although the data is incomplete.',
    'Say what you do not know, why you decide anyway, and when you would look again.',
  ],
  't4-7': [
    'Write for the managing director: the priority first, then the reasoning.',
    'Make it something the director could repeat in one breath.',
  ],
};

/** Key: field key. Behind the mentor bar. */
export const KEY: Record<string, string> = {
  // Task 1: SkillRise (draft)
  't1-1':
    'The offer is useful but flat. Users complete steps and get only neutral system messages, so they cannot see how far they have come or that their effort is noticed. Motivation is likely to fade after the first weeks, and users may leave before they reach the certificate. The platform works, but it gives little reason to come back.',
  't1-2':
    'Little visible progress along the learning paths (weakens activation)\nNeutral system messages after completed steps (weakens feedback)\nNo motivating intermediate goals or milestones (weakens motivation)\nNothing makes personal development or achievements visible (weakens self-efficacy)\nLearning paths, tasks and certificates give a sensible route (supports retention)\nThe content itself is meaningful (supports the reason to stay)',
  't1-3-motivation': 'No motivating intermediate goals; the learning path makes sense but is hardly activating.',
  't1-3-progress': 'Little visible progress along the learning paths; no recognisable milestones.',
  't1-3-recognition': 'Nothing shows achievements or personal development.',
  't1-3-feedback': 'Only neutral system messages after completed steps.',
  't1-3-retention': 'The platform is functional but hardly binding; paths and certificates give some structure.',
  't1-3-self-efficacy': 'Users cannot see their own growth, so they cannot feel that they are getting better.',
  't1-4-1': 'they finish a step and feel nothing, so the next step is easy to skip.',
  't1-4-2': 'they cannot tell whether they are getting better, so they doubt that the effort is worth it.',
  't1-4-3': 'they see a long path with no stops on the way, so the certificate feels too far away to keep going.',
  't1-5-1': 'Progress is barely visible: no milestones, no intermediate goals.',
  't1-5-2': 'Feedback after completed steps is neutral, so achievements are not recognised.',

  // Task 2: HealthJourney (draft)
  't2-1-a':
    'Variant A (points, badges, daily challenges, leaderboards): strong short-term motivation, but weak credibility for a prevention platform used by adults of 25 to 65, and a risk of reward inflation. Long-term retention depends on the rewards. Clear to use, but acceptance is uncertain without user tests. Marketing would like it.',
  't2-1-b':
    'Variant B (progress displays, milestones, confirming feedback): moderate motivation, high credibility, supports long-term retention through visible progress, very clear, and likely to be accepted by adults. The least effort, which fits the limited budget.',
  't2-1-c':
    'Variant C (narrative journey with stages): motivating stages and emotional involvement, good for retention if the story fits. Credibility depends on the tone. Clarity can suffer if the story hides progress. Acceptance is unknown without user tests, and it may take more effort within 10 weeks.',
  't2-2-pick': 'Variant B',
  't2-2-why':
    'Variant B fits the conditions best: it motivates through progress and confirmation without turning a health service into a game, it keeps the company serious and trustworthy, it is the least effort for a limited budget and 10 weeks, and narrative stages can be added later once user tests show what the target group accepts.',
  't2-3':
    'Activation against seriousness: the more rewards and competition, the faster people start, but the less serious a health offer feels. Activation against autonomy: challenges and leaderboards put pressure on users, while milestones and feedback leave the pace to them. Marketing wants high activation and the specialist department wants seriousness, so the decision has to say which one leads.',
  't2-4':
    'There are no user tests, so we do not know how adults of 25 to 65 will react. Variant B may feel too quiet to marketing and give less activation than hoped. The 10 weeks may cut quality. The risk is reduced by testing early and by keeping the option to add narrative stages.',
  't2-5':
    'We recommend Variant B for the first release: visible progress, milestones and confirming feedback. It balances activation with credibility, fits the budget and the 10 weeks, and leaves room for narrative stages once user tests show what the target group accepts.',

  // Task 3: MoveWell (the plan's Musterlösung)
  't3-1':
    'Missing experience of progress weakens motivation.\nSuccesses are not made visible as personal development.\nFeedback is too technical and not encouraging enough.\nMotivating stages and connectable intermediate goals are missing.\nUse stays functional, but is not experienced and not binding.',
  't3-2-progress': 'Progress is only weakly visible; motivating intermediate goals and stages are missing.',
  't3-2-feedback': 'Successes are hardly fed back or emotionally reinforced; feedback is technical and not very engaging.',
  't3-2-motivation': 'The user journey is functional but not very activating.',
  't3-2-self-efficacy': 'No clear link between individual development and the experience of using the platform.',
  't3-2-credibility': 'Not a deficit in the case but a condition: the brand has to stay trustworthy and close to health.',
  't3-2-long-term-retention': 'Many users drop out after a short time; the platform is seen as sensible but not very motivating.',
  't3-3':
    'Introduce a visible progress logic with stages and milestones\nDesign encouraging feedback and positive reinforcement\nBuild a narrative framing of the user journey\nIntegrate restrained, serious gamification elements',
  't3-4':
    'Measures 1 and 2 act directly on motivation and return. Measure 3 strengthens emotional connection and relevance. Measure 4 allows activation without risk to the reputation. None of them needs a relaunch, so they fit the conditions.',
  't3-5':
    'Start with measures 1 and 2, because they act directly on motivation and return. Build measure 3 next. Add measure 4 last and keep it restrained, with the focus on self-efficacy rather than on rewards.',
  't3-6':
    'We recommend using gamification not as a superficial game system but as a targeted activation and retention architecture. Visible progress, credible reinforcement and a narrative framing of the user journey have priority, because at a reasonable effort they have the greatest effect on motivation, self-efficacy and long-term retention.',

  // Task 4: Transfer project (draft)
  't4-1':
    'A product in which people feel their own progress and are recognised for it, in a tone that stays serious and trustworthy. People should come back because the offer helps them, not because of short-lived stimuli.',
  't4-2-1': 'Progress first: make progress and milestones visible before adding any game element.',
  't4-2-2': 'Reinforce with credible feedback in the brand’s own serious voice; no points or badges that do not mean something.',
  't4-2-3': 'Keep gamification shallow and the narrative light; add depth only where tests show that the target group accepts it.',
  't4-3':
    'Improve first the journeys where users start but leave: the way from sign-up to the first milestone, and the first weeks of use. Then the feedback after completed steps in the portal and the app. Touchpoints that show personal development come later. These come first because that is where users drop out, the changes are visible soon, and the budget is limited, so not all systems can be extended at once.',
  't4-4':
    'Assumptions that would be most harmful if wrong: that users want rewards when they may want clarity; that one mechanic fits every target group; that more gamification means more retention; that short-term activation turns into long-term retention. Each could damage motivation, trust and how the brand is seen.',
  't4-5':
    'One owner, for example the Chief Experience Officer, is responsible for the activation principles. Product, brand and the department that guards trust and data decide conflicts between brand, user interest and profitability together, against agreed principles and a fixed review date.',
  't4-6':
    'Although the data is incomplete, we decide to start with visible progress and confirming feedback in the main journey. It is the lowest risk for credibility, it can be shown in the short term, and we review it with the first usage data before adding anything more.',
  't4-7':
    'We recommend building activation as a system, not as a set of game mechanics. The priority is visible progress and credible reinforcement in the journeys where users leave, because they raise motivation and retention at an acceptable effort without risking the brand. Gamification stays restrained; narrative framing follows once data confirms it.',
};

export interface GlossEntry {
  term: string;
  plain: string;
}

/** Terms are matched case-insensitively; longer terms first so “long-term retention” wins over “retention”. */
export const GLOSSARY: GlossEntry[] = [
  { term: 'long-term retention', plain: 'People keep using the product for months, not only in the first days.' },
  { term: 'activation', plain: 'Getting a person to start using the product and to do the first meaningful things in it.' },
  { term: 'retention', plain: 'People keep coming back and keep using the product over time.' },
  { term: 'gamification', plain: 'Using ideas from games (points, levels, challenges) in something that is not a game, to help people stay motivated.' },
  { term: 'self-efficacy', plain: 'The feeling “I can do this, and I am getting better at it.” It is a strong reason to carry on.' },
  { term: 'milestone', plain: 'A marked stop on the way, such as “first module done”, that shows how far you have come.' },
  { term: 'intermediate goal', plain: 'A smaller goal on the way to the big one, so that success comes sooner than the final certificate.' },
  { term: 'leaderboard', plain: 'A ranking of users by points. It motivates some people and pressures others.' },
  { term: 'badge', plain: 'A small symbol you get for doing something. It only works if it means something to the person.' },
  { term: 'recognition', plain: 'Showing a person that their effort or result has been noticed.' },
  { term: 'storytelling', plain: 'Putting the user’s path into a story, with a beginning, steps along the way and a goal.' },
  { term: 'narrative', plain: 'A story that ties the steps together so that they feel like one journey.' },
  { term: 'credibility', plain: 'How much people believe that the product is serious and can be trusted.' },
  { term: 'governance', plain: 'Who is responsible for decisions, and how disagreements get settled.' },
  { term: 'touchpoint', plain: 'Any place where the user meets the product or the company: an app screen, an email, a portal page.' },
  { term: 'user journey', plain: 'The whole path a person takes with the product, from the first contact to staying or leaving.' },
  { term: 'feedback', plain: 'What the product tells you after you do something, such as “step complete”.' },
];
