/** CONTENT_PACK §8 — Dark Pattern Mode content. */

export const DARK_PATTERN_SECONDS = 90;

export const darkPatternContent = {
  banner: "SIMULATION — this is the pattern you're learning to recognise",
  toasts: [
    { at: 3, text: 'Opened the app! +10 XP', mechanicId: 'reward-inflation' },
    { at: 9, text: 'Scrolled a page! +5 XP', mechanicId: 'reward-inflation' },
    { at: 15, text: 'Curious! +2 XP', mechanicId: 'reward-inflation' },
    { at: 33, text: 'Still here! +5 XP', mechanicId: 'reward-inflation' },
    { at: 62, text: 'Read three words! +8 XP', mechanicId: 'reward-inflation' },
  ],
  modals: [
    {
      at: 20,
      title: 'Your streak dies in 4 hours',
      body: 'Keep it alive. You have come too far to lose it now.',
      cta: 'Save my streak',
      mechanicId: 'loss-aversion',
    },
    {
      at: 50,
      title: "Only 3 spots left in this week's challenge",
      body: 'Join before the counter runs out.',
      cta: 'Claim my spot',
      mechanicId: 'artificial-scarcity',
    },
  ],
  statusLine: "You're falling behind 847 users this week",
  /** XP is inflated 10x, then 100x, so the number stops meaning anything. */
  inflationSteps: [
    { at: 0, multiplier: 10 },
    { at: 45, multiplier: 100 },
  ],
  reflectionPrompt:
    "Which of those five mechanics felt effective for a moment? Write it down — the ones that work on you are the ones you'll be tempted to ship.",
  badgeReason: 'you ran the manipulation and then wrote down what it did to you',
  mechanicsUsed: ['reward-inflation', 'loss-aversion', 'artificial-scarcity', 'social-comparison', 'status-display'],
};
