/**
 * BUILD_PROMPT §5.2 — the progression engine.
 * Every XP value, level threshold and badge condition lives here. Components
 * never invent an award.
 */

export type LevelNumber = 1 | 2 | 3 | 4;

export interface LevelDef {
  level: LevelNumber;
  title: string;
  xp: number;
  /** What this level opens. Soft — it can be skipped, but it is shown. */
  unlocks: string[];
  /** Goes into the level-up sheet: "{title}. You can now {capability}." */
  capability: string;
}

/** Level names track the curriculum, so progression means competence. */
export const LEVELS: LevelDef[] = [
  {
    level: 1,
    title: 'Observer',
    xp: 0,
    unlocks: ['Learn hub', 'SkillRise'],
    capability: 'read a product for its activation logic instead of its features',
  },
  {
    level: 2,
    title: 'Analyst',
    xp: 600,
    unlocks: ['HealthJourney', 'Trade-off Compass'],
    capability: 'hold two goals in tension without collapsing one into the other',
  },
  {
    level: 3,
    title: 'Architect',
    xp: 1600,
    unlocks: ['MoveWell', 'Budget Allocator'],
    capability: 'commit to a plan under a budget you cannot argue with',
  },
  {
    level: 4,
    title: 'Advisor',
    xp: 3000,
    unlocks: ['Capstone', 'Board Statement export'],
    capability: 'put your name on a decision and name what it cost',
  },
];

export function levelFromXp(xp: number): LevelNumber {
  let current: LevelNumber = 1;
  for (const def of LEVELS) if (xp >= def.xp) current = def.level;
  return current;
}

export function levelDef(level: LevelNumber): LevelDef {
  return LEVELS.find((l) => l.level === level) ?? LEVELS[0];
}

export function nextLevelDef(level: LevelNumber): LevelDef | null {
  return LEVELS.find((l) => l.level === level + 1) ?? null;
}

/** 0–1 progress through the current level band, for the XP meter. */
export function levelProgress(xp: number): number {
  const level = levelFromXp(xp);
  const current = levelDef(level);
  const next = nextLevelDef(level);
  if (!next) return 1;
  return Math.min(1, Math.max(0, (xp - current.xp) / (next.xp - current.xp)));
}

/** BUILD_PROMPT §5.2 — the XP table. Nothing awards XP outside this map. */
export const XP = {
  /** Finish one section of a concept page. */
  section: 15,
  /** A meaningful interaction inside a live demo — once per demo, not per click. */
  demo: 25,
  /** Self-check answered correctly first time. */
  checkCorrect: 40,
  /**
   * Wrong, then right after rereading. Deliberately HIGHER than checkCorrect:
   * this app teaches recovery, not perfection.
   */
  checkRecovered: 45,
  /** One hotspot marked in SkillRise. */
  hotspot: 20,
  /** All six SkillRise categories covered — completion bonus. */
  radarComplete: 120,
  /** One impact statement written. */
  impactStatement: 35,
  /** One HealthJourney variant scored. */
  variantScored: 30,
  /** Decision committed AND residual risk named. */
  decisionWithRisk: 150,
  /** A valid MoveWell allocation. */
  allocationValid: 200,
  /** One capstone section completed. */
  capstoneSection: 90,
  /** The board statement exported. */
  boardExport: 300,
} as const;

export type XpAction = keyof typeof XP;

export type BadgeId =
  | 'pattern-spotter'
  | 'category-thinker'
  | 'impact-translator'
  | 'tradeoff-reader'
  | 'named-the-cost'
  | 'under-budget'
  | 'deferred-on-purpose'
  | 'devils-advocate'
  | 'board-ready';

export interface BadgeDef {
  id: BadgeId;
  name: string;
  /** The condition, in the participant's terms. */
  condition: string;
  /** The single sentence shown at unlock: "{name} — {reason}". */
  reason: string;
}

/**
 * Nine badges in the entire app. Awarded for quality of thinking, never for
 * volume of clicks. There is deliberately NO badge for logging in, opening a
 * page, or spending time — see `NO_BADGE_ANSWER`.
 */
export const BADGES: BadgeDef[] = [
  {
    id: 'pattern-spotter',
    name: 'Pattern Spotter',
    condition: 'Find all five activation weaknesses in SkillRise without taking a hint',
    reason: 'you found all five weak spots without asking for a hint',
  },
  {
    id: 'category-thinker',
    name: 'Category Thinker',
    condition: 'Classify ten observations across the six categories correctly',
    reason: 'ten observations, six categories, no forcing',
  },
  {
    id: 'impact-translator',
    name: 'Impact Translator',
    condition: 'Write three impact statements that name a user consequence, not a feature',
    reason: 'you wrote about users, not about interfaces',
  },
  {
    id: 'tradeoff-reader',
    name: 'Trade-off Reader',
    condition:
      'Score all three HealthJourney variants with a spread of 30 points or more on at least two dimensions',
    reason: 'you scored three variants far enough apart that the scale did real work',
  },
  {
    id: 'named-the-cost',
    name: 'Named the Cost',
    condition: 'Name at least two residual risks after deciding',
    reason: 'you decided, then named two risks you chose to keep',
  },
  {
    id: 'under-budget',
    name: 'Under Budget',
    condition: 'Finish MoveWell with 10% of budget and at least one week still in hand',
    reason: 'you finished with money and a week still in hand',
  },
  {
    id: 'deferred-on-purpose',
    name: 'Deferred on Purpose',
    condition: 'Explicitly defer one measure, with a reason',
    reason: 'you moved something to phase two and said why',
  },
  {
    id: 'devils-advocate',
    name: "Devil's Advocate",
    condition: 'Run Dark Pattern Mode and then write the critique',
    reason: 'you ran the manipulation and then wrote down what it did to you',
  },
  {
    id: 'board-ready',
    name: 'Board-Ready',
    condition: 'Complete all seven capstone sections',
    reason: 'seven sections, one recommendation, one deferred decision defended',
  },
];

export const badgeById = Object.fromEntries(BADGES.map((b) => [b.id, b])) as Record<
  BadgeId,
  BadgeDef
>;

/** Shown in the Inspector when someone asks why presence is not rewarded. */
export const NO_BADGE_ANSWER =
  "Because you didn't do anything. Badges for presence are the fastest way to make badges meaningless.";

// ── Streak, with ethics ─────────────────────────────────────────────────────

export interface StreakState {
  days: number;
  /** ISO date (YYYY-MM-DD) of the last active calendar day. */
  lastActive: string;
  /** One automatic freeze per week, granted without being asked for. */
  freezeUsed: boolean;
  /** ISO date the current freeze week started. */
  freezeWeekStart: string;
}

export function isoDay(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

export type StreakEvent = 'continued' | 'same-day' | 'frozen' | 'broken' | 'started';

/**
 * Calendar-day streak logic. A broken streak is never punished visually —
 * the copy is "Streak reset. Your progress didn't."
 */
export function advanceStreak(
  state: StreakState,
  today: string = isoDay()
): { next: StreakState; event: StreakEvent } {
  if (!state.lastActive) {
    return {
      next: { days: 1, lastActive: today, freezeUsed: false, freezeWeekStart: today },
      event: 'started',
    };
  }

  const gap = daysBetween(state.lastActive, today);

  // A new week resets the automatic freeze allowance.
  const weekGap = state.freezeWeekStart ? daysBetween(state.freezeWeekStart, today) : 999;
  const freshWeek = weekGap >= 7;
  const freezeUsed = freshWeek ? false : state.freezeUsed;
  const freezeWeekStart = freshWeek ? today : state.freezeWeekStart;

  if (gap <= 0) {
    return { next: { ...state, freezeUsed, freezeWeekStart }, event: 'same-day' };
  }

  if (gap === 1) {
    return {
      next: { days: state.days + 1, lastActive: today, freezeUsed, freezeWeekStart },
      event: 'continued',
    };
  }

  if (gap === 2 && !freezeUsed) {
    // One missed day, absorbed automatically. The learner never has to ask.
    return {
      next: { days: state.days + 1, lastActive: today, freezeUsed: true, freezeWeekStart },
      event: 'frozen',
    };
  }

  return {
    next: { days: 1, lastActive: today, freezeUsed, freezeWeekStart },
    event: 'broken',
  };
}
