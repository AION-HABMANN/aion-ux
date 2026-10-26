import type { Concept } from './types';

/**
 * CONTENT_PACK §2 — the ten concept modules, verbatim.
 * Nothing here is invented. `curriculumRef` is the trace back to the original
 * curriculum and must not be removed (CONTENT_PACK §0.5, audit in §10).
 */
export const concepts: Concept[] = [
  // ─────────────────────────────────────────────────────────── MODULE 01 ───
  {
    slug: 'what-gamification-is-not',
    order: 1,
    eyebrow: 'MODULE 01 · KNOWLEDGE LEVEL',
    title: 'Gamification, playful design, and an actual game',
    deck: 'Three things that get called the same name, and take very different amounts of time and people to build.',
    level: 1,
    curriculumRef:
      'Unterschied zwischen Gamification, spielerischer Gestaltung und vollständigem Spielkonzept',
    supports: ['skillrise', 'healthjourney', 'capstone'],
    inspectorTags: ['visible-progress', 'completion-feedback'],
    hook: 'A corporate learning platform gets a redesign brief: "make it more like a game." Three teams interpret it three ways. One adds a progress bar and a completion message. One redraws the whole interface with rounded shapes, playful illustrations and a friendly voice. One builds an actual quest system with characters, levels, and a fail state. All three shipped something. Only one of them was asked for. The effort differed enormously: a few days for one person, many weeks for a whole team.',
    coreIdea:
      'Gamification is the use of *feedback structures* borrowed from games — progress, goals, recognition, challenge — inside a product that is not a game. It is not the same as making something look playful, and it is very far from building a game. The distinction is not aesthetic. It is structural, and it determines effort, risk, and whether the thing works at all.',
    mechanism: [
      'Games do three things at once, and each one can be separated from the others.',
      'The **system layer** creates rules, goals, and consequences — a state you can be in, a state you want to reach, and feedback telling you where you stand. This is what gamification borrows.',
      'The **aesthetic layer** creates tone: colour, shape, illustration, voice. This is playful design, and you can apply it to a tax form without touching a single rule.',
      'The **fiction layer** creates a world with characters, stakes, and a reason to care beyond the task. This is a game, and it takes the most time and the most people, because fiction that does not convince is worse than no fiction at all.',
      'Most failed "gamification" projects were actually attempts at the fiction layer with the time and the team of a system-layer project.',
    ],
    diagram: {
      kind: 'layered-stack',
      spec: 'Three horizontal bands, stacked. System layer widest and least effort, fiction layer narrowest and most effort. Hover a band to dim the others and read a real example.',
    },
    worksLabel: 'When it works',
    backfiresLabel: 'When it backfires',
    whenItWorks: [
      'The task already has a real goal, and the system layer just makes that goal visible',
      'Users repeat the behaviour often enough for progress to accumulate into something',
      'The product can survive a user ignoring every game element and still doing the job',
      'The team can name which layer they are building before they start',
    ],
    whenItBackfires: [
      'The aesthetic layer is applied to a serious task, making it feel like the provider is not taking it seriously',
      'Fiction is attempted without the time and the people to make it convincing, producing something embarrassing',
      'The system layer is bolted onto a behaviour that happens twice a year, so progress never accumulates',
      '"Make it like a game" is accepted as a brief without anyone asking which layer',
    ],
    seriousDomain: {
      title: 'Why insurers can gamify and rarely should look playful',
      body: 'A health insurer can absolutely use the system layer — visible progress toward a prevention goal, milestone confirmation, streaks for a daily behaviour. What it usually cannot risk is the aesthetic layer. The moment a claims interface looks cheerful, users read it as a company that finds their situation less serious than they do. The rule of thumb: borrow structure freely, borrow tone carefully, borrow fiction almost never.',
    },
    demo: {
      component: 'ThreePanelComparator',
      brief:
        'One task — "upload your qualification certificate" — rendered three ways. The underlying task never changes. Below the panels: the effort in time and people, and the reputation risk, per panel.',
      insight:
        'Participants almost always report Panel 1 as the most respectful and Panel 3 as the most memorable — and then discover Panel 3 needs far more time and far more people, and is the only one that could damage the brand.',
    },
    selfChecks: [
      {
        id: 'm1-c1',
        question:
          'A bank adds a four-step indicator to its mortgage application, with a line after each step saying what has been received and what is still outstanding. Nothing else changes. Which layer did they build?',
        hint: 'Reread *The mechanism*. Ask which of the three layers changes what the user knows about their own position.',
        options: [
          {
            id: 'a',
            label: 'The aesthetic layer — they made it friendlier',
            correct: false,
            feedback:
              'Nothing about the tone or the visual language changed. Friendliness would have meant new illustration, softer shapes, a warmer voice. They changed what the user *knows*, not how it *feels* to look at.',
          },
          {
            id: 'b',
            label: 'The system layer — they made state and goal visible',
            correct: true,
            feedback:
              'Exactly. Four steps, a known position, and a stated remainder. That is the whole system layer, and it is usually the least effort on the list.',
          },
          {
            id: 'c',
            label: 'The fiction layer — the application became a journey',
            correct: false,
            feedback:
              'A journey needs a world and stakes beyond the task. A step indicator is not a narrative — it is arithmetic the user can see.',
          },
        ],
      },
      {
        id: 'm1-c2',
        question:
          'A team has ten weeks and a small group of people, and is told to increase engagement on a professional certification platform. Which move carries the worst risk for the effort it takes?',
        hint: 'Reread *When it backfires*. One of these options belongs to a layer that the time and the team cannot carry.',
        options: [
          {
            id: 'a',
            label: 'Adding milestones and a visible remainder to each learning path',
            correct: false,
            feedback:
              'This is system-layer work: little effort, low risk, and it addresses the most common cause of drop-off. It is the safest bet on the list.',
          },
          {
            id: 'b',
            label: 'Rewriting completion messages so they confirm what the learner can now do',
            correct: false,
            feedback:
              'Also system layer, essentially free, and it converts a neutral system message into a competence signal. Low risk.',
          },
          {
            id: 'c',
            label: 'Introducing a character-led quest narrative across all learning paths',
            correct: true,
            feedback:
              'Fiction with the time and the team of a system-layer project. Ten weeks is not enough to make a narrative convincing, and unconvincing fiction on a professional certification product reads as condescension. This is the one that can cost the brand.',
          },
        ],
      },
    ],
    canNow:
      'tell the difference between a request for structure, a request for tone, and a request for a game — and judge the effort of all three, in time and people, before agreeing to any of them',
  },

  // ─────────────────────────────────────────────────────────── MODULE 02 ───
  {
    slug: 'why-users-respond',
    order: 2,
    eyebrow: 'MODULE 02 · KNOWLEDGE LEVEL',
    title: 'Progress, feedback, recognition, challenge, attainment',
    deck: 'Five things people react to, and the one that does most of the work.',
    level: 1,
    curriculumRef:
      'Warum Nutzer auf Fortschritt, Rückmeldung, Anerkennung, Herausforderung und Zielerreichung reagieren',
    supports: ['skillrise', 'movewell'],
    inspectorTags: ['visible-progress', 'milestone', 'completion-feedback', 'recognition-signal'],
    hook: 'Two identical online courses. Same content, same length, same instructor. In the first, learners see a bar that fills as they go. In the second, they see the same lessons as an undifferentiated list. Completion in the first is roughly double. Nothing was added to the teaching. What was added was the ability to know where you are.',
    coreIdea:
      'People do not respond to rewards as such. They respond to **information about their own position** — how far they have come, whether the last thing they did counted, and how much is left. Progress, feedback, recognition, challenge and attainment are all delivery mechanisms for that one piece of information. Get the information right and modest mechanics work. Get it wrong and no amount of points will fix it.',
    mechanism: [
      'Effort is a calculation. Before continuing, a person unconsciously estimates: how much is left, can I do it, and will anyone notice. Each of the five drivers answers one of those questions.',
      '**Progress** answers *how much is left*. An unknown remainder is processed as an infinite remainder, which is why unstructured tasks feel heavier than long ones.',
      '**Feedback** answers *did that count*. A neutral system message ("Step saved") answers a technical question, not this one.',
      '**Recognition** answers *did anyone notice*. It does not need to be social — the system noticing is often enough.',
      '**Challenge** answers *is this worth my attention*. Below a threshold of difficulty, attention withdraws; above it, so does confidence.',
      '**Attainment** answers *was that real*. A finish line that produces nothing is remembered as time spent, not as something achieved.',
      'If you can only build one, build progress. It takes the least effort and it carries the most.',
    ],
    diagram: {
      kind: 'five-lever-panel',
      spec: 'Five vertical levers, each labelled with the question it answers. Behind them an effort line that sags when levers drop. The progress lever is drawn wider: it carries the most weight for the effort it takes.',
    },
    worksLabel: 'When it works',
    backfiresLabel: 'When it backfires',
    whenItWorks: [
      'The remainder is honest — the bar reflects real work left, not a fabricated percentage',
      'Feedback names what the user achieved, not what the system recorded',
      'Recognition arrives close in time to the thing being recognised',
      'Difficulty is visibly calibrated to the individual, not to the average',
    ],
    whenItBackfires: [
      'Progress theatre: a bar that moves without the user actually advancing. Once noticed, every future signal is discounted',
      'Feedback so frequent it stops carrying information',
      'Recognition for things the user knows were trivial, which devalues recognition for things that were not',
      'Challenge tuned for the most capable user, making everyone else read the difficulty as a verdict on themselves',
    ],
    seriousDomain: {
      title: 'Progress in prevention is not the same as progress in learning',
      body: 'In a learning product, progress is real: there is a fixed amount of material and you have covered some of it. In a prevention or health product, there is no finish line — you do not complete cardiovascular health. Borrowing a completion bar here creates a promise the product cannot keep. The honest substitute is *streak, streak-recovery, and consistency over a window* — progress toward a pattern rather than progress toward an end.',
    },
    demo: {
      component: 'FiveLeverBoard',
      brief:
        'A mock task list from a corporate learning platform, plus five toggles — one per driver. All five start ON. Turn them off one at a time and the same list re-renders. A readout tracks a simulated "willingness to continue" score.',
      insight:
        'Turning off Progress alone drops the score more than turning off Recognition and Attainment together. Participants discover the ranking themselves rather than being told it.',
    },
    selfChecks: [
      {
        id: 'm2-c1',
        question:
          'A platform shows "You are 60% complete" but users report the number feels meaningless. What is the most likely cause?',
        hint: 'Reread the *Progress* paragraph in *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'The percentage is not tied to work the user recognises as work',
            correct: true,
            feedback:
              'Right. A remainder is only useful if the user can map it onto effort they understand. 60% of *what*, in *what units*, is the question the bar failed to answer.',
          },
          {
            id: 'b',
            label: 'The number should have been a fraction instead',
            correct: false,
            feedback:
              'Format is not the problem here. "3 of 5 modules" would help only because it names the unit — and naming the unit is the actual fix, not the fraction itself.',
          },
          {
            id: 'c',
            label: 'Users need a reward at 100% for the number to matter',
            correct: false,
            feedback:
              'An end reward changes what happens at the finish. It does not make an uninterpretable number interpretable along the way.',
          },
        ],
      },
      {
        id: 'm2-c2',
        question: 'Which of these is progress theatre?',
        hint: 'Reread *When it backfires*, first bullet.',
        options: [
          {
            id: 'a',
            label: 'A bar that fills as the user completes real steps',
            correct: false,
            feedback: 'This is the honest version. The bar and the work move together.',
          },
          {
            id: 'b',
            label: 'A bar that jumps to 25% simply because the user opened the page',
            correct: true,
            feedback:
              'Correct. Movement without advancement. It works exactly once, and after the user notices, every genuine progress signal in the product is discounted too. That is why the cost is permanent.',
          },
          {
            id: 'c',
            label: 'A bar that stays still because the user has not done anything',
            correct: false,
            feedback:
              'Uncomfortable, but honest. A still bar is information. A lying bar is a withdrawal from a trust account you cannot refill.',
          },
        ],
      },
    ],
    canNow:
      'explain why visible progress outperforms reward frequency, and spot the moment a progress signal stops being information and starts being decoration',
  },

  // ─────────────────────────────────────────────────────────── MODULE 03 ───
  {
    slug: 'motivation-mechanisms',
    order: 3,
    eyebrow: 'MODULE 03 · KNOWLEDGE LEVEL',
    title: 'Reward, competence, self-efficacy, social proof',
    deck: 'The levers underneath the mechanics — and why they cannot all be pulled at once.',
    level: 1,
    curriculumRef:
      'Relevante Motivationsmechanismen: Belohnung, Kompetenzgefühl, Selbstwirksamkeit, soziale Bestätigung, Fortschrittserleben, Aktivierungsreize',
    supports: ['healthjourney', 'capstone'],
    inspectorTags: ['points', 'recognition-signal', 'social-comparison', 'self-efficacy-statement'],
    hook: 'A workplace health programme runs the same campaign in two divisions. In one, employees see how they rank against colleagues. In the other, they see how they are doing against their own previous month. The ranking division has higher week-one participation and lower week-twelve participation. Same campaign. Different lever.',
    coreIdea:
      'Every mechanic pulls on one or more underlying levers: **reward**, **competence**, **self-efficacy**, **social validation**, **progress experience**, or **activation trigger**. The mechanic is the visible part; the lever is what actually moves. Choosing mechanics without naming the lever is how teams end up with a leaderboard in a product where nobody wants to be compared.',
    mechanism: [
      '**Reward** works on anticipation. It is fast, reliable, and it decays — the same reward delivers less each time, which is why reward-led systems require escalation to hold position.',
      '**Competence** works on the feeling of getting better at something. Slower to establish, but it does not decay, because the reference point is the person\'s own earlier ability.',
      '**Self-efficacy** is competence plus belief about the future: *I did that, so I can probably do the next one.* This is the only lever that makes a user more likely to continue after a failure, which makes it the most valuable one in any product where people will fail sometimes.',
      '**Social validation** works on being seen. Extremely strong for the visible top, actively demotivating for everyone below the fold — and in most populations, most people are below the fold.',
      '**Progress experience** works on the reduction of an unknown. Little effort, durable, and the least likely to be resented.',
      '**Activation triggers** work on attention, not motivation. They can start a behaviour they cannot sustain. Treated as motivation, they become nagging.',
    ],
    diagram: {
      kind: 'lever-decay-chart',
      spec: 'Six lever effects over 90 days. Reward decays steeply. Competence holds. Self-efficacy is the only line that recovers after the failure event at day 40. Social validation splits into a rising top decile and a falling remainder.',
    },
    worksLabel: 'When it works',
    backfiresLabel: 'When it backfires',
    whenItWorks: [
      'The lever matches the emotional situation: competence for skill-building, progress for long processes, self-efficacy where failure is likely',
      'Reward is used to start a behaviour and then handed over to competence to sustain it',
      'Social validation is opt-in, or scoped to a small group where nobody is anonymous',
      'Activation triggers are rare enough that they still count as information',
    ],
    whenItBackfires: [
      'Reward is used to sustain rather than to start, requiring constant escalation',
      'Social comparison is applied to a population where being below average is the norm and the norm is fine',
      'Self-efficacy language is used without the user having actually done anything ("You\'re doing great!" after one click)',
      'Triggers are tuned by notification metrics, which optimises for interruption',
    ],
    seriousDomain: {
      title: 'Why leaderboards fail in prevention',
      body: 'In a prevention programme, the users who most need to continue are the ones performing worst. A leaderboard tells exactly those users, weekly, that they are at the bottom — in a domain where being at the bottom is already a source of shame. The mechanic works beautifully on the fittest 10%, who need it least. This is the clearest case in the whole module of a mechanic that increases average engagement while damaging the users it exists for.',
    },
    demo: {
      component: 'MotivationMixer',
      brief:
        'Four sliders — Reward, Competence, Social validation, Activation frequency — beside a persona card for Marcus, 52. Marcus writes a reaction that changes with the mix, and a 90-day retention line moves with it.',
      insight:
        'No mix scores maximum on everything. Pushing Social validation above 60 makes Marcus disengage regardless of the other three — and participants see that the highest week-one number and the highest week-twelve number come from different mixes.',
    },
    selfChecks: [
      {
        id: 'm3-c1',
        question:
          'Which lever is most valuable in a product where users will regularly fail at something?',
        hint: 'Reread the *Self-efficacy* paragraph in *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Reward — it compensates for the frustration',
            correct: false,
            feedback:
              'Reward after failure teaches that failure is compensated, not that it is survivable. It also decays, so the compensation must keep growing.',
          },
          {
            id: 'b',
            label: 'Self-efficacy — it changes what failure means',
            correct: true,
            feedback:
              'Correct. Self-efficacy is the only lever that raises the probability of a *next* attempt, because it reframes the failure as information rather than as a verdict.',
          },
          {
            id: 'c',
            label: 'Social validation — seeing others struggle normalises it',
            correct: false,
            feedback:
              'This works in a small, closed, high-trust group. In an open population it usually delivers the opposite: the user sees others succeeding and reads their own failure as personal.',
          },
        ],
      },
      {
        id: 'm3-c2',
        question:
          'A team notices that reward-led engagement is falling and proposes doubling the points awarded. What is the problem with that plan?',
        hint: 'Reread the *Reward* paragraph, and look ahead to Module 05.',
        options: [
          {
            id: 'a',
            label: 'Doubling the points is too much work to sustain',
            correct: false,
            feedback:
              'Effort is a real constraint, but points are easy to add. The problem is not the work — it is what adding more of them does.',
          },
          {
            id: 'b',
            label: 'It treats a decay problem as a volume problem, so it must escalate forever',
            correct: true,
            feedback:
              'Exactly. Reward decays by design; more of it resets the baseline rather than the effect. Each escalation buys less time than the last, and the currency ends up meaning nothing.',
          },
          {
            id: 'c',
            label: 'Users will not notice the difference',
            correct: false,
            feedback:
              'They will notice — briefly. That brief notice is precisely what makes the plan seductive and why teams keep doing it.',
          },
        ],
      },
    ],
    canNow:
      'name the lever underneath any mechanic someone proposes, and predict whether its effect will decay, hold, or split the user base in two',
  },

  // ─────────────────────────────────────────────────────────── MODULE 04 ───
  {
    slug: 'the-toolbox',
    order: 4,
    eyebrow: 'MODULE 04 · APPLICATION LEVEL',
    title: 'Points, badges, levels, challenges, streaks, status',
    deck: 'What each tool is actually for, how much effort it takes, and where it stops working.',
    level: 2,
    curriculumRef:
      'Chancen und Grenzen von Punkten, Badges, Levels, Challenges, Streaks, Feedback-Mechaniken und Statusanzeigen',
    supports: ['healthjourney', 'movewell'],
    inspectorTags: [
      'points',
      'badges',
      'levels',
      'challenges',
      'streaks',
      'status-display',
      'completion-feedback',
    ],
    hook: 'A product team lists the mechanics they want: points, badges, levels, daily challenges, streaks, a leaderboard, and a status tier. Someone asks what each one is for. The room goes quiet. The list was assembled from products the team admired, not from problems the team had.',
    coreIdea:
      'Each mechanic is a tool with one job, an effort, and a failure mode. Selecting mechanics is a design decision with an implementation effort in time and people, and a reputation risk. **Stacking mechanics does not stack motivation** — past a certain density, each addition reduces the meaning of the others.',
    mechanism: [
      '**Points** — a universal accumulator. Little effort, flexible, and meaningless on their own. Their only real job is to be exchanged for something or aggregated into something. Points that lead nowhere are noise. *Fails when:* minted for trivial actions.',
      '**Badges** — recognition for a specific, named achievement. Their value comes entirely from scarcity and specificity. *Fails when:* there are more than about a dozen, or when one is awarded for showing up.',
      '**Levels** — a compressed summary of accumulated capability. Powerful because they give the user a noun for themselves ("I\'m an Analyst now"). *Fails when:* the level name describes activity rather than ability.',
      '**Challenges** — a bounded task with a deadline. Excellent for starting behaviour, poor for sustaining it. *Fails when:* the deadline creates obligation in a product the user did not sign up to be obliged by.',
      '**Streaks** — a consistency counter. The strongest retention mechanic available and the most ethically loaded, because its power comes from loss aversion. *Fails when:* the behaviour is not genuinely daily, or when breaking the streak is punished.',
      '**Status displays** — a persistent visible position. Effective for the visible few. *Fails when:* the population is large and most positions are unflattering.',
      '**Feedback mechanics** — confirmation that an action registered and mattered. The only item on this list that is close to always worth building. *Fails when:* written by engineers describing system state.',
    ],
    diagram: {
      kind: 'mechanic-effort-matrix',
      spec: 'Seven mechanics rated on build effort, motivation lift, decay speed and reputation risk. Feedback mechanics are marked as the only near-universal yes; streaks carry an "ethically loaded" marker.',
    },
    worksLabel: 'When it works',
    backfiresLabel: 'When it backfires',
    whenItWorks: [
      'Each mechanic on the list can be traced to a named problem',
      'The total count is small enough that each one still carries information',
      "The mechanic matches the behaviour's natural rhythm — streaks for daily, challenges for episodic, levels for long accumulation",
      'Feedback is built first, before any accumulator',
    ],
    whenItBackfires: [
      'Mechanics selected by imitation, then justified afterwards',
      'Points minted for actions the user knows are trivial, teaching the user that the currency is fake',
      'Streaks in a weekly or monthly behaviour, generating guilt for a pattern the product itself made impossible',
      'Everything shipped at once, so nothing can be measured and nothing can be removed',
    ],
    seriousDomain: {
      title: 'What a health product may ship, in order',
      body: 'A defensible order for a prevention platform: (1) feedback mechanics, always; (2) visible progress toward a stated goal; (3) milestones that mark real thresholds; (4) levels only if they name capability, not activity; (5) streaks only for genuinely daily behaviours, and only with a no-punishment recovery path; (6) challenges only as opt-in; (7) status displays and leaderboards — usually not at all. If a stakeholder wants to start at item 7, the conversation is about visibility for the company, not motivation for the user.',
    },
    demo: {
      component: 'MechanicSandbox',
      brief:
        'A mock professional development platform and a tray of seven mechanic cards. Drag mechanics onto the product; it re-renders live. Motivation, Credibility and the implementation effort (time and people) update with each addition.',
      insight:
        'Participants discover the density ceiling by hitting it. Almost everyone stacks first and prunes second — which is the exact behaviour the module is trying to make visible.',
    },
    selfChecks: [
      {
        id: 'm4-c1',
        question: 'Which mechanic is closest to always worth building?',
        hint: 'Reread the last paragraph of *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Points',
            correct: false,
            feedback:
              'Points take the least effort to build and are the emptiest on their own. They only acquire meaning from something they feed into.',
          },
          {
            id: 'b',
            label: 'Feedback mechanics',
            correct: true,
            feedback:
              'Correct. Confirmation that an action registered and mattered is the one item on the list with almost no failure mode, no decay, and no reputation risk. It is also the one most often skipped, because it looks like copywriting rather than product work.',
          },
          {
            id: 'c',
            label: 'Levels',
            correct: false,
            feedback:
              'Levels are strong, but only where there is enough accumulated behaviour to compress. On a product used four times a year, a level is an insult.',
          },
        ],
      },
      {
        id: 'm4-c2',
        question:
          'A team wants to add a daily streak to a platform where the intended behaviour happens roughly twice a week. What is the specific harm?',
        hint: 'Reread the *Streaks* paragraph and the second bullet under *When it backfires*.',
        options: [
          {
            id: 'a',
            label: 'The streak counter will mostly display zero, which looks broken',
            correct: false,
            feedback:
              'Visually awkward, yes — but that is a symptom. The real damage is not aesthetic.',
          },
          {
            id: 'b',
            label:
              'The product generates guilt for a pattern it defined as failure without the user agreeing to it',
            correct: true,
            feedback:
              'Correct. The streak imports an obligation the user never accepted, then marks the normal, healthy usage pattern as a failure. In a health or learning context, that is a trust problem, not a UI problem.',
          },
          {
            id: 'c',
            label: 'Users will find a way to game the streak',
            correct: false,
            feedback:
              "They will — but gaming is a sign the mechanic is mismatched, not the harm itself. The harm lands on the users who *don't* game it.",
          },
        ],
      },
    ],
    canNow:
      'justify or reject any proposed mechanic by naming its job, its decay speed, and the population it would quietly punish',
  },

  // ─────────────────────────────────────────────────────────── MODULE 05 ───
  {
    slug: 'when-it-backfires',
    order: 5,
    eyebrow: 'MODULE 05 · APPLICATION LEVEL',
    title: 'Manipulation, overload, reward inflation, trust damage',
    deck: 'The four ways gamification turns from an asset into a liability — and the one that never repairs.',
    level: 2,
    curriculumRef:
      'Risiken schlechter Gamification: Manipulation, Reizüberladung, Belohnungsinflation, Motivationsverlust, Vertrauensschaden',
    supports: ['healthjourney', 'movewell', 'capstone'],
    inspectorTags: ['reward-inflation', 'loss-aversion', 'artificial-scarcity', 'streaks'],
    hostsDarkPatternToggle: true,
    hook: 'A fitness app raises daily rewards to lift falling engagement. It works for eleven days. Then it works for six days. Then the team doubles the rewards again. Eighteen months later the in-app currency is worth nothing, users have learned to ignore every notification, and the one genuinely important message the product ever sent — a health alert — is ignored along with the rest.',
    coreIdea:
      'Bad gamification fails in four distinct ways, and they are not equally recoverable. **Overload** and **motivation loss** can be fixed by removing things. **Reward inflation** can be fixed slowly and painfully. **Trust damage does not repair** — once a user has concluded that the product\'s signals are designed to move them rather than to inform them, every future signal is read through that conclusion, including the honest ones.',
    mechanism: [
      '**Manipulation** is any mechanic whose effect depends on the user not understanding it. The test is simple and unforgiving: if you explained the mechanic to the user in plain language, would it still work? A progress bar survives that test. A fake countdown does not.',
      '**Overstimulation** happens when signal density exceeds interpretive capacity. The user stops reading individual signals and starts filtering the whole channel. Everything you send afterwards is filtered with it.',
      '**Reward inflation** is the arithmetic consequence of using a decaying lever to sustain rather than to start. Each escalation resets the baseline, so the next escalation must be larger, and the currency asymptotically approaches zero meaning.',
      '**Motivation loss** is the compound effect: the user is now receiving more signals that mean less, about a behaviour they have started to associate with being managed rather than with getting better at something.',
      '**Trust damage** is what the other four leave behind. It is asymmetric — built slowly, destroyed in one noticed lie — and it generalises across the whole product, not just the mechanic that caused it.',
    ],
    diagram: {
      kind: 'trust-asymmetry-chart',
      spec: 'Engagement oscillates upward with each reward escalation and then collapses. Trust rises slowly, drops vertically at the moment the user notices, and never recovers for the rest of the chart.',
    },
    worksLabel: 'When the risk is low',
    backfiresLabel: 'When the risk is high',
    whenItWorks: [
      'Every mechanic would survive being explained to the user in plain language',
      'Signal density is limited, not accumulated — someone owns the total',
      'Reward levels are fixed at launch and never used as a lever for falling numbers',
      'There is a named person who can remove a mechanic without a business case',
    ],
    whenItBackfires: [
      'Engagement metrics are the only reported number, so escalation is always the easiest available response',
      'Mechanics are added by multiple teams, none of whom sees the total',
      'Anything relies on the user misreading a countdown, a scarcity claim, or a social signal',
      'The product operates in a domain where the user has no realistic alternative',
    ],
    seriousDomain: {
      title: 'The asymmetry is worse where the stakes are higher',
      body: 'In a game, a user who concludes they are being manipulated stops playing. In a health, financial, or public service product, they often cannot leave — so instead of churning, they stay and discount everything. That is the worse outcome, because the product now has a population that receives its messages and disbelieves them. Trust damage in a serious domain is not measured in churn. It is measured in the messages that no longer land.',
    },
    demo: {
      component: 'RewardInflationSimulator',
      brief:
        'One slider: rewards per session, 1 to 20. Motivation rises to about 5, plateaus to 8, then falls below the baseline at 20. Trust falls monotonically from about 6 onwards. A reset button labelled "Undo the inflation" restores motivation but not trust.',
      insight:
        'The undo button is the teaching moment. Participants expect it to fix both lines, and the refusal is more memorable than any paragraph.',
    },
    selfChecks: [
      {
        id: 'm5-c1',
        question: 'What is the single most useful test for whether a mechanic is manipulative?',
        hint: 'Reread the *Manipulation* paragraph in *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Whether it increases engagement metrics',
            correct: false,
            feedback:
              'Manipulative mechanics increase engagement metrics — that is exactly why they survive review. The metric cannot detect the problem it is caused by.',
          },
          {
            id: 'b',
            label: 'Whether it would still work if you explained it to the user',
            correct: true,
            feedback:
              'Correct, and it is unforgiving in a useful way. A progress bar survives being explained. A fake countdown, an artificial scarcity claim, and a manufactured social signal all stop working the moment they are described honestly.',
          },
          {
            id: 'c',
            label: 'Whether users complain about it',
            correct: false,
            feedback:
              'Complaints lag badly, and the users most affected by manipulation are the least likely to name it. Absence of complaint is not evidence.',
          },
        ],
      },
      {
        id: 'm5-c2',
        question: 'Which failure mode is the one that does not repair?',
        hint: 'Reread *The core idea*, then look at the flat section of the trust line in the diagram.',
        options: [
          {
            id: 'a',
            label: 'Overstimulation',
            correct: false,
            feedback:
              'Painful and slow, but recoverable. Remove signals, and interpretive capacity returns.',
          },
          {
            id: 'b',
            label: 'Reward inflation',
            correct: false,
            feedback:
              'Very hard to reverse and usually requires a currency reset that users resent — but it is arithmetic, and arithmetic can be redone.',
          },
          {
            id: 'c',
            label: 'Trust damage',
            correct: true,
            feedback:
              'Correct. The other three are quantity problems. This one is a conclusion the user has drawn about your intent, and it generalises to every signal you send afterwards, including the honest ones.',
          },
        ],
      },
    ],
    canNow:
      'run the plain-language test on any proposed mechanic, and explain to a stakeholder why the engagement number they are looking at cannot detect the risk they are taking',
  },

  // ─────────────────────────────────────────────────────────── MODULE 06 ───
  {
    slug: 'story-plus-mechanics',
    order: 6,
    eyebrow: 'MODULE 06 · APPLICATION LEVEL',
    title: 'Where storytelling and gamification meet',
    deck: 'Mechanics tell you where you are. Narrative tells you why that place matters.',
    level: 2,
    curriculumRef:
      'Integration von Storytelling und Gamification in ganzheitliche Erlebnisgestaltung; wie narrative Rahmung, Fortschrittslogik und spielerische Rückmeldung gemeinsam Motivation und Bindung stärken',
    supports: ['healthjourney', 'movewell', 'capstone'],
    inspectorTags: ['narrative-framing', 'milestone', 'visible-progress'],
    hook: 'Two versions of the same six-step onboarding. Version one: "Step 3 of 6 — Set your goals." Version two: "Week 2 — Your body starts noticing." Identical mechanics. Identical steps. Identical timing. The second one produces materially higher completion, and the only thing that changed was what the step was *about*.',
    coreIdea:
      'Progress logic answers *where am I*. Narrative framing answers *why does this position matter*. Neither replaces the other, and the combination is not additive — narrative makes existing mechanics mean more without adding any new ones. This is the lowest-effort quality upgrade available in the whole toolbox, and it is almost always underused because it looks like copywriting.',
    mechanism: [
      'A milestone without a story is an arithmetic marker: you have done four of seven. A milestone with a story is a threshold: you have reached the point where the thing starts working. Same position, different weight.',
      'Narrative does three specific jobs on top of mechanics.',
      'It gives **stages an identity** — "Week 2: your body starts noticing" is a stage a user can hold in mind, remember, and describe to someone else. "Step 3 of 6" is not.',
      'It supplies **a reason for the sequence** — why this before that. Without it, ordering feels arbitrary and users skip.',
      'It converts **feedback into meaning** — the same confirmation message can report an event or mark a passage. "Session logged" reports. "That\'s the third week running — this is the point where it stops being effort" marks.',
      'The failure mode is fiction that outruns the product. If the narrative promises a transformation the product does not deliver, the narrative becomes the thing users cite when they leave.',
    ],
    diagram: {
      kind: 'dual-track-journey',
      spec: 'The same six-node journey drawn twice: a flat numbered track and a narrative track with stage names and uneven spacing. A toggle fades between them. Same mechanics, same timing, different meaning.',
    },
    worksLabel: 'When it works',
    backfiresLabel: 'When it backfires',
    whenItWorks: [
      'The narrative describes something that actually happens to the user, not something invented',
      'Stage names are concrete and short enough to be remembered and repeated',
      "The story frames the user as the one doing the work, not as a character in someone else's plot",
      'It is applied to the sequence the product already has, rather than requiring a new one',
    ],
    whenItBackfires: [
      'The narrative promises outcomes the product cannot deliver, converting drop-off into resentment',
      'Fiction is layered on a professional audience who read it as being talked down to',
      'Stage names are decorative rather than informative, so users cannot tell where they are any more — narrative has replaced the progress logic instead of sitting on top of it',
      'The story requires the user to adopt an identity they did not choose',
    ],
    seriousDomain: {
      title: 'Narrative in health means describing the body, not inventing a quest',
      body: 'The usable narrative in a prevention product is already there and it is true: what happens in week two, what changes at six weeks, why the third session is the hard one. That is storytelling — it has stages, causality, and stakes, and none of it is fiction. Inventing a quest is what teams do when they have not looked closely enough at what the user is actually going through. The best narrative material in a serious domain is almost always the real process, described well.',
    },
    demo: {
      component: 'NarrativeLayerToggle',
      brief:
        'A six-step prevention journey with one toggle. Off: numbered steps. On: stage names describing what actually happens. The mechanics panel underneath stays visibly identical, with a mono readout reading "MECHANICS: unchanged".',
      insight:
        'The "MECHANICS: unchanged" readout is the point of the demo. Participants consistently rate the ON version as more gamified, when in fact zero mechanics were added.',
    },
    selfChecks: [
      {
        id: 'm6-c1',
        question:
          'A team adds narrative stage names and removes the "3 of 6" indicator. What did they get wrong?',
        hint: 'Reread *The core idea*. Two questions, two answers, neither optional.',
        options: [
          {
            id: 'a',
            label: 'Nothing — the stage names carry the progress information',
            correct: false,
            feedback:
              'Stage names carry meaning, not position. A user can know they are at "Week 2 — your body starts noticing" and still not know how much is left.',
          },
          {
            id: 'b',
            label: 'They replaced the progress logic instead of layering on top of it',
            correct: true,
            feedback:
              'Correct. Narrative and progress answer different questions — *why does this matter* and *how much is left*. Removing one to add the other trades a solved problem for a new one.',
          },
          {
            id: 'c',
            label: 'Stage names are always inferior to numbered steps',
            correct: false,
            feedback:
              'Not at all — stage names outperform numbers on meaning and memorability. The error is the removal, not the addition.',
          },
        ],
      },
      {
        id: 'm6-c2',
        question: 'Which narrative choice is safest for a professional audience in a serious domain?',
        hint: 'Reread the *In a serious domain* box.',
        options: [
          {
            id: 'a',
            label: 'A character who guides the user through a quest',
            correct: false,
            feedback:
              'This is the fiction layer from Module 01, on an audience most likely to read it as condescension. High effort, high reputation risk, and it does not address any diagnosed problem.',
          },
          {
            id: 'b',
            label: 'Stage names describing what actually happens at each point in the process',
            correct: true,
            feedback:
              'Correct. It is true, it takes little effort, it requires no new mechanics, and it cannot embarrass the brand — because there is no fiction in it to be embarrassed by.',
          },
          {
            id: 'c',
            label: 'No narrative at all, to preserve seriousness',
            correct: false,
            feedback:
              'Defensible but leaves value on the table. Describing the real process accurately is not a threat to seriousness; it is the same thing a good practitioner would say out loud.',
          },
        ],
      },
    ],
    canNow:
      'raise the perceived quality of an existing mechanic set without adding a single mechanic — and recognise the moment a story starts writing cheques the product cannot cash',
  },

  // ─────────────────────────────────────────────────────────── MODULE 07 ───
  {
    slug: 'spike-vs-retention',
    order: 7,
    eyebrow: 'MODULE 07 · APPLICATION LEVEL',
    title: 'Short-term activation vs sustainable retention',
    deck: 'The strategy with the best launch week is often the one with the worst quarter.',
    level: 2,
    curriculumRef: 'Unterschied zwischen kurzfristiger Aktivierung und nachhaltiger Nutzerbindung',
    supports: ['healthjourney', 'movewell', 'capstone'],
    inspectorTags: ['challenges', 'streaks', 'visible-progress', 'narrative-framing'],
    hook: 'Two activation strategies are tested on the same product. Strategy A produces a 40% lift in week one. Strategy B produces 12%. Strategy A is shipped. At week twelve, Strategy A is performing below the original baseline and Strategy B — still running as a small holdout — is 18% above it. The decision was made on day seven, with the only data that existed on day seven.',
    coreIdea:
      'Activation and retention are different outcomes produced by different levers, and they are frequently in tension. Heavy mechanics reliably win the launch window and reliably lose the quarter, because the levers that spike fastest are the ones that decay fastest. **The measurement window you choose is a strategic decision, not an analytics detail** — it determines which strategy can possibly win.',
    mechanism: [
      'Activation runs on novelty, reward anticipation, and triggers. All three are high-amplitude and short-lived by construction. Retention runs on competence, self-efficacy, and progress experience — low-amplitude, slow to establish, and durable.',
      'This produces a predictable shape. The heavy-mechanic curve rises fast, peaks in weeks 2–4, and then falls, often below baseline — because the population that remains has been trained to expect a reward density the product can no longer supply. The restrained curve rises slowly and holds.',
      'The two curves cross. **Where they cross is the number that matters**, and it is usually somewhere between week 5 and week 9. Any decision made before the crossing point will favour the strategy that loses.',
      'The practical consequence: if a team cannot commit to measuring past the crossing point, it should not run the comparison at all. It will simply be reading noise with a confident face.',
    ],
    diagram: {
      kind: 'crossing-curves',
      spec: 'Ninety days of active users. The heavy-mechanic curve peaks near day 21 and crosses the baseline downward near day 62. The restrained curve is still climbing at day 90. The crossing point near day 48 is marked "THE ONLY DAY THAT SETTLES IT".',
    },
    worksLabel: 'When the spike is the right choice',
    backfiresLabel: 'When the spike is a trap',
    whenItWorks: [
      'The product genuinely has a short life — a campaign, a one-off enrolment window, a seasonal programme',
      'Activation is the actual goal and retention belongs to a different system the user is handed over to',
      'There is a specific, dated event that the spike is timed against',
      'The team has explicitly accepted the post-spike trough and planned for it',
    ],
    whenItBackfires: [
      "The product's value only appears after sustained use, which is true of every learning and prevention product",
      'The reporting cycle is shorter than the crossing point, so the spike will be counted as a success before the damage arrives',
      'The population is finite and cannot be re-activated once burned',
      'Nobody has named who owns the week-twelve number',
    ],
    seriousDomain: {
      title: 'Prevention has no short game',
      body: 'A prevention programme delivers zero value at week two, regardless of how many users are active. The health outcome the product exists for requires months. This makes the activation spike not merely suboptimal but actively misleading — it produces a number that looks like success in a period where success is definitionally impossible. In this domain, week-one engagement should be treated as a leading indicator at best, and never as an outcome.',
    },
    demo: {
      component: 'RetentionCurveLab',
      brief:
        'Choose one of three strategies, then choose a reporting window: 7, 30, 60 or 90 days. The verdict panel declares a winner based on the window. Seven days always crowns heavy mechanics.',
      insight:
        'The demo makes the window the variable rather than the strategy, which is the actual senior-level insight and the one participants carry into the HealthJourney case.',
    },
    selfChecks: [
      {
        id: 'm7-c1',
        question:
          'A team must decide between two activation strategies but can only measure for four weeks. What is the correct move?',
        hint: 'Reread the final paragraph of *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Pick the strategy that wins at four weeks',
            correct: false,
            feedback:
              'At four weeks the heavy strategy is still near its peak. You would be reading the part of the curve that is guaranteed to mislead you.',
          },
          {
            id: 'b',
            label: 'Do not run the comparison as a decision test; use judgement plus a held-back holdout',
            correct: true,
            feedback:
              'Correct. If the window cannot reach the crossing point, the test cannot answer the question. Naming that honestly and deciding on reasoning — while keeping a small holdout running past the window — is the defensible move.',
          },
          {
            id: 'c',
            label: 'Extend the window by shipping faster',
            correct: false,
            feedback:
              'Shipping faster shortens the build, not the decay curve. The crossing point sits where it sits regardless of when you start.',
          },
        ],
      },
      {
        id: 'm7-c2',
        question: 'Why does the heavy-mechanic curve often fall *below* the original baseline?',
        hint: 'Reread the second paragraph of *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Because the novelty wears off and users return to normal',
            correct: false,
            feedback:
              'That explains a return *to* baseline. It does not explain going below it, which is the part that matters.',
          },
          {
            id: 'b',
            label:
              'Because the remaining users were trained to expect a reward density the product can no longer supply',
            correct: true,
            feedback:
              'Correct. The spike does not just fade — it re-sets expectations. Normal service now reads as a downgrade, so some users who would have stayed at the original baseline leave.',
          },
          {
            id: 'c',
            label: 'Because the measurement becomes less accurate over time',
            correct: false,
            feedback:
              'The effect is real, not an artefact. It reproduces across products and is one of the strongest arguments for restraint.',
          },
        ],
      },
    ],
    canNow:
      'identify the crossing point in any activation proposal, and tell a stakeholder — before the test runs — which strategy their chosen reporting window has already selected',
  },

  // ─────────────────────────────────────────────────────────── MODULE 08 ───
  {
    slug: 'intrinsic-and-emotional',
    order: 8,
    eyebrow: 'MODULE 08 · APPLICATION LEVEL',
    title: 'Intrinsic motivation and emotional experience',
    deck: 'How to pay someone for something they were already doing for free, and lose them.',
    level: 2,
    curriculumRef:
      'Zusammenhang zwischen intrinsischer Motivation, emotionalem Erleben und digitaler Interaktion',
    supports: ['healthjourney', 'capstone'],
    inspectorTags: ['points', 'reward-inflation', 'self-efficacy-statement', 'narrative-framing'],
    hook: "A community platform's most active contributors write because they enjoy it. The platform introduces contributor points. Contribution rises for a quarter. The points programme is discontinued when the team's priorities change. Contribution does not return to its original level — it settles below it. The contributors who wrote for enjoyment now know what their writing was worth, and it was not very much.",
    coreIdea:
      '**Extrinsic rewards can displace intrinsic motivation, and the displacement outlasts the reward.** When you attach a reward to a behaviour someone was doing for its own sake, you change what the behaviour is about. Removing the reward later does not change it back — the person now has a reference point they did not have before. This is the single most damaging mistake available in the whole toolbox, because it is invisible during the period when it looks like it is working.',
    mechanism: [
      'Intrinsic motivation comes from three sources: **autonomy** (I chose this), **competence** (I am getting better at this), and **relatedness** (this connects me to people I care about). Every mechanic either supports or erodes each of those.',
      "Points and rewards attack autonomy directly. The behaviour reframes from *something I do* to *something I am being paid for*, and the person's own explanation of their behaviour changes with it. That change is what persists after the reward is removed.",
      'Progress, milestones, and competence feedback are safe, because they report on the person\'s own development rather than putting a reward on it.',
      'Emotional experience sits underneath all of this. A product that produces small, repeated feelings of *getting better* builds motivation that survives interruptions, bad weeks, and failures. A product that produces small, repeated feelings of *being scored* builds motivation that lasts exactly as long as the scoring.',
      'The practical rule: **reward behaviours people were not doing. Report on behaviours they already were.**',
    ],
    diagram: {
      kind: 'overjustification-timeline',
      spec: 'One line across four phases: intrinsic only, reward introduced, reward removed, six months later. The line ends below where it started, against a dashed reference marking "the level you used to have, for free".',
    },
    worksLabel: 'When rewards are safe',
    backfiresLabel: 'When rewards are dangerous',
    whenItWorks: [
      'The behaviour was not happening at all, so there is no intrinsic motivation to displace',
      'The reward is one-off and clearly framed as a start, not as an ongoing exchange',
      'The reward is unexpected rather than promised in advance — unexpected rewards do far less displacement',
      'The reward recognises quality rather than quantity, which reads as competence feedback rather than as payment',
    ],
    whenItBackfires: [
      'The behaviour is already happening for its own sake among the users you most value',
      'The reward is announced in advance and made contingent, which is the form that displaces most strongly',
      'The population is professional, where being paid in points can read as slightly insulting',
      'The reward programme has an end date that users cannot see coming',
    ],
    seriousDomain: {
      title: 'The people you least want to demotivate are the ones most at risk',
      body: 'In corporate learning, health, and public service, the users who engage without being pushed are the intrinsically motivated ones — and they are exactly the population an extrinsic reward layer damages. The users a points programme actually moves are the ones who were not engaging, and those are typically the ones who stop again the moment the points stop. The uncomfortable summary: the reward layer often loses you the users you had and rents you the users you wanted.',
    },
    demo: {
      component: 'OverjustificationDemo',
      brief:
        'A genuinely enjoyable tile-arranging task with no score and no timer. Phase 2 awards points loudly. Phase 3 removes them with a bland message. The app then shows you your own three voluntary durations on the overjustification chart.',
      insight:
        'Because it uses the participant\'s own behaviour rather than a hypothetical, this demo lands harder than any other in the module. If the drop does not happen to you, the app says so honestly — it happens at population scale, which is the level you will be shipping at.',
    },
    selfChecks: [
      {
        id: 'm8-c1',
        question: 'Which reward design does the *least* damage to intrinsic motivation?',
        hint: 'Reread the bullets under *When rewards are safe*.',
        options: [
          {
            id: 'a',
            label: 'A points-per-action system announced in advance',
            correct: false,
            feedback:
              'This is the maximally displacing form: contingent, announced, and per-unit. It converts the behaviour into an exchange before the user has performed it once.',
          },
          {
            id: 'b',
            label: 'An unexpected recognition of something done well, after the fact',
            correct: true,
            feedback:
              "Correct. Unexpected and quality-based rewards are read as competence feedback rather than as payment, which is why they displace far less. The user's own explanation of their behaviour does not have to change.",
          },
          {
            id: 'c',
            label: 'A monthly bonus for the most active users',
            correct: false,
            feedback:
              'Contingent, announced, and quantity-based — plus it targets exactly the intrinsically motivated population you can least afford to reframe.',
          },
        ],
      },
      {
        id: 'm8-c2',
        question:
          'What makes overjustification uniquely damaging compared with other gamification errors?',
        hint: 'Reread *The core idea*, particularly the last sentence.',
        options: [
          {
            id: 'a',
            label: 'It takes more time and people to implement than other mechanics',
            correct: false,
            feedback:
              'Points are among the easiest things to build. The damage does not show in the effort.',
          },
          {
            id: 'b',
            label: 'The damage persists after the mechanic is removed, and it looks like success while it happens',
            correct: true,
            feedback:
              "Correct. Most errors stop when you stop the mechanic. This one changes the user's own account of why they were doing the behaviour, and that account does not revert. It is also invisible during the quarter when the numbers are up.",
          },
          {
            id: 'c',
            label: 'It only affects new users',
            correct: false,
            feedback:
              'The opposite. It disproportionately affects your existing, already-motivated users — the ones you would least choose to experiment on.',
          },
        ],
      },
    ],
    canNow:
      'separate behaviours you may safely reward from behaviours you should only report on — and explain to a stakeholder why a successful points quarter can leave the product weaker than it started',
  },

  // ─────────────────────────────────────────────────────────── MODULE 09 ───
  {
    slug: 'credible-in-serious-domains',
    order: 9,
    eyebrow: 'MODULE 09 · MANAGEMENT LEVEL',
    title: 'Gamification where trust is the product',
    deck: 'The conditions under which a serious organisation can motivate without sounding like it is playing.',
    level: 3,
    curriculumRef: 'Bedingungen für glaubwürdige Gamification in seriösen Anwendungsfeldern',
    supports: ['healthjourney', 'movewell', 'capstone'],
    inspectorTags: [
      'visible-progress',
      'milestone',
      'completion-feedback',
      'badges',
      'social-comparison',
      'streaks',
    ],
    hook: 'A health insurer, a private bank, a corporate academy, and a municipal service portal all ask the same question in the same quarter: can we use gamification without looking unserious? The answer is yes for all four, and the permitted mechanics are different for each — not because of taste, but because of what the user is afraid of in each context.',
    coreIdea:
      'Credible gamification in a serious domain is not a toned-down version of consumer gamification. It is a different selection, made against a different question. The consumer question is *what will increase engagement*. The serious-domain question is **what will increase engagement without changing what the user believes about our intent** — because in these domains, the user\'s belief about your intent is the product.',
    mechanism: [
      'Four conditions determine what a serious organisation can ship.',
      '**Condition 1 — The mechanic must survive being explained.** This is the Module 05 test, and in a serious domain it is not a guideline but a compliance-adjacent requirement. If a mechanic works by the user not understanding it, a regulator, a journalist, or a works council will eventually understand it on the user\'s behalf.',
      '**Condition 2 — The mechanic must not punish the population it exists for.** Any comparison mechanic in a domain where struggling users are the target audience fails this. This eliminates most leaderboards and most public status displays.',
      '**Condition 3 — The tone must match the user\'s emotional state, not the desired one.** A user checking a health result or a loan decision is not in a playful state, and greeting them as though they were reads as the organisation not understanding their situation.',
      '**Condition 4 — Someone must be able to remove it.** Serious domains accumulate mechanics because removal requires a business case and addition does not. Any organisation without a named owner who can delete a mechanic will, over several years, arrive at overstimulation by default.',
    ],
    diagram: {
      kind: 'domain-fit-matrix',
      spec: 'Twelve mechanics across four domains. Filled cells ship, hollow cells are conditional, crossed cells do not ship. Clicking a cell holds the row and column highlight.',
    },
    worksLabel: 'When credibility holds',
    backfiresLabel: 'When credibility breaks',
    whenItWorks: [
      'Every shipped mechanic reports on the user’s own situation rather than comparing them to others',
      'The tone is calibrated to the worst moment a user might be having when they open the product, not the best',
      'Progress claims are auditable — the number reflects something real that could be checked',
      'Mechanics can be removed by a named owner without a business case',
    ],
    whenItBackfires: [
      'A mechanic imported wholesale from a consumer product without asking what the user is afraid of here',
      'Playful tone applied to a moment of anxiety, which permanently changes how the user reads the organisation',
      'Comparison mechanics in a population where most users are below average and know it',
      'Accumulation over years with no removal path, so the product drifts into overstimulation nobody decided on',
    ],
    seriousDomain: {
      title: 'The four questions to answer before any mechanic ships',
      body: '(1) If we explained this mechanic in one plain sentence in our terms of service, would it still work? (2) Which segment of our users does this mechanic quietly rank last, and are they the segment we exist to serve? (3) What is the worst emotional state a user could be in when they encounter this, and does it still read acceptably? (4) Who can delete this next year, and what do they need in order to do it? An answer to all four is the minimum documentation for a mechanic in a regulated or trust-dependent domain.',
    },
    demo: {
      component: 'DomainFitMatrix',
      brief:
        'The full twelve-by-four grid is interactive. Clicking a cell opens the verdict, a two-sentence reason grounded in the four conditions, and a ready-to-use sentence you could say to a stakeholder who wants that mechanic anyway.',
      insight:
        'The stakeholder sentences are the reusable artefact. Participants screenshot them, and several will appear verbatim in the capstone.',
    },
    selfChecks: [
      {
        id: 'm9-c1',
        question: 'Why do leaderboards fail specifically in prevention and public service?',
        hint: 'Reread *Condition 2* in *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Users in these domains are less competitive',
            correct: false,
            feedback:
              'Competitiveness varies by person, not by domain. Plenty of prevention users are highly competitive — that is not what breaks the mechanic.',
          },
          {
            id: 'b',
            label: 'They rank the target population last in a context where that already carries shame',
            correct: true,
            feedback:
              'Correct. The mechanic works on the users who need the product least and applies weekly public failure to the users it was funded to reach. It can raise average engagement while damaging the mission.',
          },
          {
            id: 'c',
            label: 'They are technically difficult to implement fairly',
            correct: false,
            feedback:
              'Fairness is genuinely hard, but a perfectly fair leaderboard would still fail this test — because the problem is who ends up at the bottom, not how they got there.',
          },
        ],
      },
      {
        id: 'm9-c2',
        question:
          "A bank's dashboard greets users with a cheerful animated celebration when they open it. What is the specific risk?",
        hint: 'Reread *Condition 3*, then the *In a serious domain* box.',
        options: [
          {
            id: 'a',
            label: 'The animation slows down page load',
            correct: false,
            feedback:
              'A real cost, but a performance problem, not a credibility problem. Fixing the frame rate would not fix this.',
          },
          {
            id: 'b',
            label:
              'Some users open that dashboard in a moment of financial anxiety and will read the tone as the bank not understanding them',
            correct: true,
            feedback:
              'Correct — this is Condition 3. Tone must be calibrated to the worst state a user might arrive in, not the average one. A celebration meeting anxiety is read as an organisation that does not know what it is holding.',
          },
          {
            id: 'c',
            label: 'Animations are unprofessional in financial products',
            correct: false,
            feedback:
              'Too broad. Motion is fine and often improves comprehension. The problem is the *emotional register*, not the movement.',
          },
        ],
      },
    ],
    canNow:
      'decide which mechanics a trust-dependent organisation may ship, and hand a stakeholder a specific sentence explaining a refusal that does not sound like caution for its own sake',
  },

  // ─────────────────────────────────────────────────────────── MODULE 10 ───
  {
    slug: 'who-owns-activation',
    order: 10,
    eyebrow: 'MODULE 10 · MANAGEMENT LEVEL',
    title: 'The responsibility of the person who ships it',
    deck: 'Activation mechanics are governance decisions. Somebody signs them, whether or not anybody knows who.',
    level: 3,
    curriculumRef:
      'Rolle verantwortlicher Fach- und Führungskräfte: Aktivierungsmechaniken strategisch und ethisch verantworten statt beliebig einsetzen',
    supports: ['movewell', 'capstone'],
    inspectorTags: ['governance-marker', 'reward-inflation', 'streaks', 'social-comparison'],
    prefillsCapstoneSection: 5,
    hook: 'Three years after launch, a platform has fourteen activation mechanics. Nobody in the current team chose more than three of them. There is no document listing them. Two were added by a growth team that no longer exists, one by a campaign that ran for six weeks in 2023, and one nobody can account for at all. Each was individually defensible. The total was never decided by anyone.',
    coreIdea:
      'Activation mechanics accumulate because **adding one requires a champion and removing one requires a business case**. That asymmetry, left alone for a few years, produces overstimulation that no individual decided on. Governance is the correction: a named owner, a written principle, a removal path, and an escalation rule for conflicts between brand, user interest, and commercial pressure.',
    mechanism: [
      'Four governance artefacts, in order of how rarely organisations have them.',
      '**A written activation principle.** One paragraph stating what this organisation will and will not do to motivate users. It exists so that a decision under time pressure can be made against something rather than against whoever is in the room. Almost nobody has this.',
      '**A named owner.** One person accountable for the *total* mechanic load, not for any individual mechanic. Without a total owner, every mechanic has a champion and the sum has nobody.',
      '**A removal path.** An agreed, low-friction way to delete a mechanic. If removal is harder than addition, accumulation is guaranteed — this is arithmetic, not culture.',
      '**An escalation rule.** A stated answer to: when marketing wants more activation and the subject-matter lead wants less, who decides, on what basis, and what evidence ends the argument. Absent this, the decision goes to whoever has more organisational weight that quarter, which produces an activation strategy that is really a record of internal politics.',
      'The senior-level distinction: an operational decision is which milestone copy to use. A strategic decision is whether this organisation uses loss aversion at all. Teams routinely make the second kind by accident while believing they are making the first.',
    ],
    diagram: {
      kind: 'decision-authority-map',
      spec: 'Three concentric bands — team decides, owner decides, escalates — with the real escalation paths drawn across them. Most organisations have the inner band and nothing else.',
    },
    worksLabel: 'When governance holds',
    backfiresLabel: 'When governance fails',
    whenItWorks: [
      'The written principle is short enough to be recalled in a meeting without opening a document',
      'The total-load owner is senior enough to say no to a growth target',
      'Removal happens at least occasionally, which proves the path is real',
      'Escalation criteria are written before the first conflict, not during it',
    ],
    whenItBackfires: [
      'The principle exists as a slide nobody has read since the offsite',
      'Ownership is distributed, which in practice means the mechanic load is owned by nobody',
      'Every conflict is resolved by seniority, so the strategy is a record of who was most senior when',
      'Strategic decisions — loss aversion, social comparison, vulnerable segments — are made inside sprint tickets',
    ],
    seriousDomain: {
      title: 'What a works council, a regulator, or a journalist will ask',
      body: 'All three ask versions of the same question: who decided this, against what principle, and what would have caused a different decision. An organisation that can answer in one paragraph is in a completely different position from one that cannot — regardless of whether the mechanic itself was defensible. In trust-dependent domains, the absence of a decision record is itself the finding. Write the paragraph before anyone asks for it.',
    },
    demo: {
      component: 'GovernanceDecisionTree',
      brief:
        'Five sequential scenarios, each requiring three answers: who decides, what is escalated, what is vetoed outright. Each answer set produces a one-line governance statement.',
      insight:
        'The output is not a score — it is a usable artefact. It pre-fills Section 5 of the capstone, so participants arrive at the capstone with a governance model they wrote rather than a blank field.',
    },
    selfChecks: [
      {
        id: 'm10-c1',
        question: 'Why do activation mechanics accumulate even in well-run organisations?',
        hint: 'Reread *The core idea*, first sentence.',
        options: [
          {
            id: 'a',
            label: 'Teams enjoy building them',
            correct: false,
            feedback:
              'Sometimes true and entirely beside the point. Well-run organisations build plenty of things they do not enjoy building.',
          },
          {
            id: 'b',
            label: 'Adding requires a champion; removing requires a business case',
            correct: true,
            feedback:
              'Correct, and it is arithmetic rather than culture. As long as the two operations have different costs, the load only moves in one direction — no matter how disciplined the team is.',
          },
          {
            id: 'c',
            label: 'Nobody measures the effect of individual mechanics',
            correct: false,
            feedback:
              'Measurement helps, but the asymmetry survives good measurement. You can know a mechanic is weak and still find removal harder than leaving it in place.',
          },
        ],
      },
      {
        id: 'm10-c2',
        question: 'Which of these is a strategic decision rather than an operational one?',
        hint: 'Reread the final paragraph of *The mechanism*.',
        options: [
          {
            id: 'a',
            label: 'Which wording to use in a milestone confirmation',
            correct: false,
            feedback:
              'Operational. Important for quality, reversible in an afternoon, and correctly owned by the team.',
          },
          {
            id: 'b',
            label: 'Whether this organisation uses loss aversion as a retention lever at all',
            correct: true,
            feedback:
              'Correct. It sets a boundary for every future mechanic, it is difficult to reverse once users have adapted, and it is the kind of decision an external party will ask about by name.',
          },
          {
            id: 'c',
            label: 'How many milestones a learning path should have',
            correct: false,
            feedback:
              'Operational, and testable. It affects one journey and can be changed without touching what the organisation stands for.',
          },
        ],
      },
    ],
    canNow:
      'write the governance paragraph an organisation will be asked for, and tell the difference between a decision your team may make and one that has to leave the room',
  },
];

export const conceptBySlug = Object.fromEntries(concepts.map((c) => [c.slug, c])) as Record<
  string,
  Concept
>;

/** The eight fixed sections of a concept page (§7). */
/**
 * The reading order of a card (UX-STANDARD 2.10): what a task needs first (try it, check yourself,
 * what you can do now), then the parts that are folded until asked for.
 * `fold` is the text of the "＋ Show …" row; a part without one is always open.
 */
export const CONCEPT_SECTIONS = [
  { id: 'demo', label: 'Try it' },
  { id: 'cannow', label: 'You can now…' },
  { id: 'check', label: 'Self-check (optional)', fold: 'the optional self-check (2 questions, not counted)' },
  { id: 'hook', label: 'The story behind it', fold: 'the story behind it' },
  { id: 'core', label: 'The full idea', fold: 'the full idea' },
  { id: 'mechanism', label: 'How it works', fold: 'how it works' },
  { id: 'balance', label: 'Works / backfires', fold: 'when it works and when it backfires' },
  { id: 'serious', label: 'In a serious domain', fold: 'the serious-domain case' },
] as const satisfies readonly { id: string; label: string; fold?: string }[];

export type ConceptSectionId = (typeof CONCEPT_SECTIONS)[number]['id'];

/** Which concepts back which case — drives the readiness meter (§3). */
export function conceptsSupporting(caseId: string): string[] {
  return concepts.filter((c) => c.supports.includes(caseId as never)).map((c) => c.slug);
}
