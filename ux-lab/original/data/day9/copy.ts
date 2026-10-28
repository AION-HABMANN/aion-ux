/**
 * SINGLE SOURCE OF TRUTH for every user-facing string (BUILD_PROMPT §6).
 * No component may hardcode display text. To translate the app, copy this file
 * to `src/content/i18n/{locale}/copy.ts` and swap the import in `useCopy`.
 *
 * Voice rules: sentence case; at most one exclamation mark per page (ideally
 * zero); active, specific verbs; every confirmation names what changed FOR THE
 * LEARNER, not what the system did. Never praise without content.
 */

export const copy = {
  app: {
    title: 'Activation Lab',
    tagline: 'Learn how motivation is designed — by being inside a design that motivates you.',
    description:
      'A learning and decision playground for gamification, storytelling, activation and retention.',
  },

  nav: {
    start: 'Start',
    learn: 'Learn',
    playground: 'Playground',
    capstone: 'Capstone',
    progress: 'Progress',
    inspector: 'Inspector',
    skipToContent: 'Skip to the main content',
  },

  landing: {
    eyebrow: 'STUDIO BRIEF · DAY ONE',
    line1: 'You have just been made Experience Lead.',
    line2: 'Three clients are waiting. Each one wants people to keep coming back.',
    line3: 'None of them wants to look like a game.',
    deck: 'The field manual is on the left. The briefs are on the right. The instrument strip at the bottom of the screen is yours — it moves when you decide something.',
    namePrompt: 'What should the studio call you?',
    namePlaceholder: 'Your name',
    nameHelp: 'Used on your decision receipt and your board brief. Stored on this device only.',
    nameSubmit: 'Take the post',
    nameSkip: 'Start without a name',
    resume: 'Pick up where you left off',
    howItWorks: 'How this works',
    ratio:
      'Roughly six parts learning to four parts deciding. Read the manual first — the cases assume it.',
    steps: [
      {
        title: 'Learn',
        body: 'Ten modules, each with a demo you can operate. Reading alone will not get you through the cases.',
      },
      {
        title: 'Decide',
        body: 'Three client briefs: diagnose one platform, choose between three prototypes, allocate a fixed budget.',
      },
      {
        title: 'Defend',
        body: 'One board brief you can print and present in five minutes, including the decision you deliberately deferred.',
      },
    ],
  },

  console: {
    label: 'Motivation console',
    motivation: 'Motivation',
    credibility: 'Credibility',
    progressGauge: 'Progress',
    inspector: 'Inspector',
    inspectorOn: 'Inspector on',
    inspectorOff: 'Inspector off',
    sound: 'Sound',
    expand: 'Show the gauges',
    collapse: 'Hide the gauges',
    levelPrefix: 'LVL',
    xpSuffix: 'XP',
    toNext: '{n} XP to {title}',
    atCeiling: 'Top level. Nothing left to unlock.',
  },

  progress: {
    section: 'Section {n} of {total} behind you.',
    resume: 'Welcome back. You left off halfway through the {case} allocation.',
    resumeGeneric: 'Welcome back. Your gauges are where you left them.',
    ringLabel: 'Reading progress',
    sectionsRead: '{done} of {total} sections read',
  },

  xp: {
    banked:
      "You've already banked this one. Repeating it doesn't add value — that's reward inflation, and you'll read about it in Module 5.",
    gained: '+{n} XP',
    announce: '{n} experience points added. Total {total}.',
  },

  check: {
    prompt: 'Self-check',
    correct: "That's it. {capability}",
    wrong:
      'Not quite — and this is the exact confusion the module was built for. Reread {section}, then try again.',
    recovered: "Recovered. That's a stronger memory than getting it right the first time.",
    retry: 'Try again',
    hintLabel: 'Where to look',
    answered: 'Answered',
  },

  canNow: 'You can now {capability}.',
  canNowLabel: 'You can now…',
  canNowLink: 'Use this in {case}',

  learn: {
    hubTitle: 'The field manual',
    hubDeck:
      'Ten modules. Each one ends with a capability, not a completion. The map lights up as you cover them.',
    mapLabel: 'Mastery map',
    mapHelp: 'Nodes light when a module is finished. Lines draw themselves once the prerequisite is covered.',
    supportsLabel: 'Supports',
    inspectPage: 'Inspect this page',
    sectionsLabel: 'On this page',
    nextModule: 'Next module',
    prevModule: 'Previous module',
    backToHub: 'Back to the manual',
    demoLabel: 'Live demo',
    demoInsight: 'What participants usually find',
    hook: 'The hook',
    coreIdea: 'The core idea',
    mechanism: 'The mechanism',
    seriousDomain: 'In a serious domain',
    curriculumRef: 'Curriculum reference',
    moduleDone: 'Module covered',
    markDone: 'Mark this module covered',
  },

  playground: {
    hubTitle: 'Three client briefs',
    hubDeck:
      'Each case asks a different question and gives you a different instrument. Do them in order if you can — each one hands something to the next.',
    readiness: 'Readiness',
    readinessMeter: '{done} of {total} supporting modules covered',
    open: 'Open the brief',
    reopen: 'Reopen this case',
    stepLabel: 'Step {n}',
    stepOf: 'Step {n} of {total}',
    briefFrom: 'Brief from the client',
    yourJob: 'Your job',
    constraints: 'Constraints',
    accept: 'Accept the brief',
    caseComplete: 'Case closed',
    exportSheet: 'Export this sheet',
  },

  readiness: {
    low: "You can start now. Three concepts behind this case aren't covered yet — you'll likely get stuck at the trade-off step.",
    coverFirst: 'Cover them first',
    goAnyway: 'Go in anyway',
    overridden:
      "You decided without the background. That's a real-world move. Here's what you'd have seen differently.",
    missingLabel: 'Not covered yet',
  },

  hotspot: {
    logged: 'Logged. {finding} — that’s one of six categories.',
    prompt: 'What do you see here?',
    placeholder: 'Describe what you notice, in your words',
    strengthens: 'Strengthens activation',
    weakens: 'Weakens activation',
    categoryLabel: 'Category',
    save: 'Log this observation',
    cancel: 'Discard this one',
    remove: 'Remove observation',
    modeOn: 'Annotate mode on — click anywhere in the mock',
    modeOff: 'Annotate mode off',
    keyboardHint: 'Keyboard: tab to a screen region and press Enter to annotate it.',
  },

  radar: {
    label: 'Insight radar',
    complete: "All six categories covered. You're now reading the platform, not just using it.",
    hint: 'Nothing tagged under {category} yet. {nudge}',
  },

  variant: {
    entered: '60 seconds inside {variant}. Notice what your attention does.',
    remaining: '{n}s inside {variant}',
    done: 'You can leave {variant} whenever you like now.',
    enter: 'Step into {variant}',
    leave: 'Step out',
    scoreIt: 'Score this variant',
  },

  tradeoff: {
    label: 'Trade-off compass',
    moved: 'Motivation up. Credibility down. That’s the trade, not a bug.',
    flatWarning:
      "All three scored above 70 on everything. Either one of them is genuinely better, or the scale isn't doing any work. Try pulling two of them apart.",
    ghostLabel: 'Already scored',
  },

  stakeholder: {
    label: 'Stakeholder reactions',
    confidence: 'Confidence',
    rebalanceWarning:
      "You've rebalanced four times. Three stakeholders, one product. Pick who you're willing to disappoint, and say why.",
    impossible: 'Keeping all three above 70 is not arithmetically possible. That is the lesson.',
  },

  decision: {
    committed: 'Committed to {variant}. Now name what you gave up.',
    commit: 'Commit to {variant}',
    reopen: 'Reopen the decision',
    reopened: 'Decision reopened. The first commitment stays on the record.',
    locked: 'Committed',
  },

  conflicts: {
    label: 'Name the conflicts',
    intro: 'Three tensions were in the room. Say how each one resolved.',
  },

  risks: {
    label: 'Residual risks',
    intro: "You decided. Deciding doesn't remove risk — it chooses which risk you keep.",
    add: 'Add a residual risk',
    placeholder: 'The risk you are choosing to keep',
  },

  budget: {
    over: '€{spent} of €{total}. Something has to move to phase two.',
    overWeeks: 'Week {n}. You have twelve. Which measure starts in phase two?',
    valid: '€{spent} committed. €{remaining} unspent — that is buffer, not failure.',
    nothingDeferred:
      "Nothing is in the deferred slot. A plan with no deferral usually means the constraints weren't real.",
    highRisk:
      '{measure} carries a 5/5 reputation risk in a prevention context. You can ship it — name why in the justification.',
    locked: '12 weeks planned. €{spent} committed. {n} measure deferred on purpose.',
    label: 'Committed budget',
    weeksLabel: 'Weeks used',
    remaining: 'Remaining',
    deferSlot: 'Deliberately deferred',
    deferReason: 'Why this one waits',
    place: 'Place in week {n}',
    removeMeasure: 'Take this back off the timeline',
  },

  receipt: {
    title: 'DECISION RECEIPT — MoveWell activation programme',
    committed: 'COMMITTED',
    timeline: 'TIMELINE',
    shipped: 'MEASURES SHIPPED',
    deferred: 'DEFERRED',
    strongest: 'STRONGEST BET',
    exposure: 'BIGGEST EXPOSURE',
    signed: 'Signed: {name}, acting Experience Lead',
    print: 'Print this receipt',
  },

  levelup: '{title}. You can now {capability}.',
  levelupEyebrow: 'Level {n}',
  levelupDismiss: 'Back to work',

  badge: {
    unlocked: '{name} — {reason}',
    label: 'Badge unlocked',
    dismiss: 'Noted',
    whyNoLogin:
      "Because you didn't do anything. Badges for presence are the fastest way to make badges meaningless.",
    whyNoLoginQuestion: 'Why is there no badge for logging in?',
  },

  streak: {
    label: '{n}-day streak',
    broken: "Streak reset. Your progress didn't.",
    frozen:
      "Streak held. You get one of these a week, automatically — you don't have to earn it.",
    none: 'No streak yet',
  },

  capstone: {
    title: 'Developing a strategic activation and retention architecture for digital user experiences.',
    role: 'Your role: Chief Experience Officer, UX architect, division head, product manager or strategy consultant. Your task is not the selection of individual game mechanics, but the development of a viable decision architecture.',
    situationLabel: 'The situation',
    section: 'Section {n} written. Your board brief is now {pages} pages.',
    exported:
      'Board brief ready. Print it, present it in five minutes, defend one deferred decision.',
    pull: 'Pull from your work',
    pullEmpty: 'Nothing to pull yet — this section draws on work you have not done.',
    pullInsert: 'Insert into the section',
    checkMechanics: 'Check my mechanics',
    checkTitle: 'Mechanic check',
    wordBudget: '{n} of {budget} words',
    wordOver: '{n} words. The budget is {budget}. Senior writing is shorter, not longer.',
    previewLabel: 'Board brief — live preview',
    print: 'Print my brief',
    exportJson: 'Download my session (JSON)',
    exportBrief: 'Export board statement',
    onePager: 'One-page summary',
  },

  empty: {
    observations: 'Nothing logged yet. Open the SkillRise brief and mark the first weak spot.',
    badges: "No badges yet. They're earned for judgement, not for showing up.",
    capstone: 'Seven sections, all blank. Section 1 is the one that makes the other six easier.',
    scores: 'No variant scored yet. Step into one for a minute first — scoring from the description is guessing.',
    allocation: 'The timeline is empty. Drag a measure onto week 1, or select one and press Enter.',
    impact: 'No impact statements yet. Write the first one about a user, not about a screen.',
  },

  error: {
    incomplete:
      'Three sections still need an answer before this can be exported. They’re marked in the outline.',
    incompleteN:
      '{n} sections still need an answer before this can be exported. They’re marked in the outline.',
    tooShort: 'That is one clause. Give it a sentence — the board brief quotes this verbatim.',
    needTwo: 'Two residual risks is the minimum. One risk is a decision that has not been examined.',
    needBoth: 'Both priority slots need a card before the reasoning field opens.',
  },

  impact: {
    template: 'For users, this could mean that ______.',
    prefix: 'For users, this could mean that',
    nudge:
      "That describes the interface. What happens inside the user's head next Tuesday, when nothing is due?",
    example:
      'For users, this could mean that finishing a module feels the same as abandoning one — so there is no felt difference between the two.',
    exampleLabel: 'One written well',
    accepted: 'Impact statement logged. It names a consequence, not a feature.',
  },

  priorities: {
    label: 'Prioritise the two biggest',
    first: '#1',
    second: '#2',
    reason: 'Why these two, ahead of the rest',
    set: 'Two priorities named. In the next case you’ll find out what it costs to act on them.',
  },

  handoff: {
    toHealthJourney:
      'SkillRise told you what was missing. HealthJourney will ask you to choose what to add — with three stakeholders who want different things.',
    toMoveWell:
      'HealthJourney asked you to choose. MoveWell will ask you to pay for it, in a budget you cannot argue with.',
    toCapstone:
      'Three cases decided. The capstone asks the question none of them did: what does this organisation refuse to do?',
  },

  darkpattern: {
    banner: "SIMULATION — this is the pattern you're learning to recognise",
    start: 'Run the manipulation for 90 seconds',
    running: 'Simulation running — {n}s left',
    stop: 'End the simulation early',
    reflectionPrompt:
      "Which of those five mechanics felt effective for a moment? Write it down — the ones that work on you are the ones you'll be tempted to ship.",
    reflectionSave: 'Save this into my risk analysis',
    reflectionSaved: 'Saved into capstone section 4. It arrives there in your words.',
    toggleTitle: 'Dark Pattern Mode',
    toggleBody:
      'Ninety seconds of the manipulative version of this app. It shuts itself off. Nothing you do in it is recorded as progress.',
  },

  inspector: {
    title: 'Gamification inspector',
    deck:
      'Every mechanic used in this app, what it pulls on, and what it costs when it is overused. This is your reference while you work the cases.',
    mechanic: 'MECHANIC',
    lever: 'MOTIVATION LEVER',
    why: 'WHY IT WORKS',
    risk: 'RISK IF OVERUSED',
    fits: 'FITS',
    doesntFit: "DOESN'T FIT",
    seenIn: 'SEEN IN THIS APP',
    survives: 'SURVIVES EXPLANATION',
    survivesYes: 'Yes — it still works when you describe it honestly',
    survivesNo: 'No — it only works while the user does not understand it',
    close: 'Close the panel',
    filterLever: 'Filter by lever',
    filterDomain: 'Filter by domain fit',
    filterRisk: 'Filter by the plain-language test',
    filterAll: 'All',
    count: '{n} mechanics registered',
    domainTable: 'Domain fit',
    tagAria: 'Inspect the {name} mechanic',
  },

  progressPage: {
    title: 'Where you stand',
    deck: 'Your level, your badges, the route you took, and everything you have written — exportable.',
    xpLabel: 'Experience',
    levelLabel: 'Level',
    badgesLabel: 'Badges',
    journeyLabel: 'Journey map',
    reset: 'Reset session',
    resetConfirm:
      'This clears every answer, badge and gauge on this device. Trainers use it between batches. There is no undo.',
    resetConfirmYes: 'Clear everything',
    resetConfirmNo: 'Keep my session',
    resetDone: 'Session cleared. The gauges are back at zero and so is the brief.',
    exportJson: 'Download my session (JSON)',
    printBrief: 'Print my brief',
    antiFarming: 'Why XP stops',
    antiFarmingBody:
      'Every action banks its XP once. Repeating it pays nothing. That rule is in here because a currency you can mint by repetition is a currency worth nothing — which is the whole of Module 5.',
  },

  common: {
    save: 'Save',
    saved: 'Saved to your session',
    next: 'Next',
    back: 'Back',
    continue: 'Continue',
    close: 'Close',
    optional: 'Optional',
    required: 'Needed before the next step',
    characters: '{n} characters',
    loading: 'Bringing your session back',
  },
} as const;

export type Copy = typeof copy;

/** Fills `{token}` placeholders. Missing tokens are left visible on purpose. */
export function fmt(template: string, values: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
