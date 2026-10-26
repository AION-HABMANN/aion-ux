'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Category } from '@/data/day9/types';
import type { Dimension, Variant } from '@/data/day9/cases/healthjourney';
import type { JustificationField } from '@/data/day9/cases/movewell';
import {
  advanceStreak,
  isoDay,
  levelFromXp,
  XP,
  type BadgeId,
  type LevelNumber,
  type StreakState,
  type XpAction,
} from './progression';

// ── State shape (BUILD_PROMPT §12) ──────────────────────────────────────────

export interface Observation {
  id: string;
  screen: string;
  /** Percentage coordinates inside the mock screen, so it survives resizing. */
  x: number;
  y: number;
  text: string;
  category: Category;
  effect: 'strengthens' | 'weakens';
  /** True if the learner opened a hint before logging this one. */
  hintUsed: boolean;
  createdAt: string;
}

export interface Allocation {
  measureId: string;
  startWeek: number;
}

export interface Deferred {
  measureId: string;
  reason: string;
}

export type Justification = Partial<Record<JustificationField, string>>;

export interface ConceptProgress {
  sectionsDone: string[];
  demoUsed: boolean;
  checks: Record<string, { correct: boolean; recovered: boolean; attempts: number }>;
  completed: boolean;
}

/** Live gauge targets. The console animates towards whatever is set here. */
export interface Gauges {
  motivation: number;
  credibility: number;
  progress: number;
}

export interface Notice {
  id: string;
  kind: 'xp' | 'toast' | 'badge' | 'levelup' | 'banked';
  title?: string;
  body: string;
  amount?: number;
  badgeId?: BadgeId;
  level?: LevelNumber;
  mechanicId?: string;
}

interface StoreState {
  hydrated: boolean;

  learner: { name: string; startedAt: string };
  settings: { sound: boolean; inspector: boolean };

  progression: {
    xp: number;
    level: LevelNumber;
    badges: BadgeId[];
    streak: StreakState;
    /** Anti-farming ledger — every banked action key. */
    banked: string[];
  };

  learn: Record<string, ConceptProgress>;

  cases: {
    skillrise: {
      briefAccepted: boolean;
      exploreStartedAt: string | null;
      firstImpression: string;
      observations: Observation[];
      hintsTaken: number[];
      impactStatements: string[];
      priorities: [string, string];
      priorityReason: string;
    };
    healthjourney: {
      briefAccepted: boolean;
      timeInVariant: Record<Variant, number>;
      scores: Record<Variant, Record<Dimension, number>>;
      scored: Variant[];
      rebalances: number;
      decision: Variant | null;
      decisionHistory: Variant[];
      conflicts: Record<string, string>;
      residualRisks: string[];
      recommendation: Record<string, string>;
    };
    movewell: {
      briefAccepted: boolean;
      categorisation: Record<string, Category>;
      allocation: Allocation[];
      deferred: Deferred[];
      justifications: Record<string, Justification>;
      recommendation: string;
      receiptIssued: boolean;
    };
  };

  capstone: Record<string, string>;

  flags: {
    darkPatternTried: boolean;
    darkPatternReflection: string;
    enteredCaseUnprepared: string[];
    governanceStatements: string[];
    exported: boolean;
    lastRoute: string;
  };

  gauges: Gauges;
  /** Set while inside a HealthJourney prototype; null restores baseline. */
  gaugeOverride: Gauges | null;

  notices: Notice[];
}

interface StoreActions {
  setName: (name: string) => void;
  toggleSound: () => void;
  toggleInspector: () => void;
  setLastRoute: (route: string) => void;

  /**
   * The one entry point for XP. `key` is the anti-farming ledger entry: an
   * action already banked pays nothing and explains why (§5.2).
   */
  award: (action: XpAction, key: string, opts?: { body?: string; silent?: boolean }) => boolean;
  grantBadge: (id: BadgeId) => void;
  pushNotice: (n: Omit<Notice, 'id'>) => void;
  dismissNotice: (id: string) => void;
  touchStreak: () => void;

  setGauges: (g: Partial<Gauges>) => void;
  setGaugeOverride: (g: Gauges | null) => void;
  recomputeGauges: () => void;

  // Learn
  markSection: (slug: string, sectionId: string, total: number) => void;
  markDemoUsed: (slug: string) => void;
  recordCheck: (slug: string, checkId: string, correct: boolean) => 'correct' | 'recovered' | 'wrong';
  completeConcept: (slug: string) => void;

  // SkillRise
  acceptBrief: (caseId: 'skillrise' | 'healthjourney' | 'movewell') => void;
  startExplore: () => void;
  setFirstImpression: (text: string) => void;
  addObservation: (o: Omit<Observation, 'id' | 'createdAt'>) => void;
  removeObservation: (id: string) => void;
  takeHint: (n: number) => void;
  setImpactStatement: (index: number, text: string) => void;
  setPriorities: (p: [string, string]) => void;
  setPriorityReason: (text: string) => void;

  // HealthJourney
  addVariantTime: (v: Variant, seconds: number) => void;
  setScore: (v: Variant, d: Dimension, value: number) => void;
  markScored: (v: Variant) => void;
  commitDecision: (v: Variant) => void;
  reopenDecision: () => void;
  setConflict: (id: string, text: string) => void;
  setResidualRisks: (risks: string[]) => void;
  setRecommendationField: (id: string, text: string) => void;

  // MoveWell
  setCategorisation: (problemId: string, category: Category) => void;
  placeMeasure: (measureId: string, startWeek: number) => void;
  removeMeasure: (measureId: string) => void;
  deferMeasure: (measureId: string, reason: string) => void;
  undeferMeasure: (measureId: string) => void;
  setJustification: (measureId: string, field: JustificationField, text: string) => void;
  setMoveWellRecommendation: (text: string) => void;
  issueReceipt: () => void;

  // Capstone
  setCapstoneSection: (id: string, text: string) => void;
  markExported: () => void;

  // Flags
  setDarkPatternTried: () => void;
  setDarkPatternReflection: (text: string) => void;
  markUnprepared: (caseId: string) => void;
  setGovernanceStatements: (statements: string[]) => void;

  resetSession: () => void;
}

export type Store = StoreState & StoreActions;

const emptyScores = (): Record<Dimension, number> => ({
  motivation: 50,
  credibility: 50,
  retention: 50,
  clarity: 50,
  acceptance: 50,
});

function initialState(): StoreState {
  return {
    hydrated: false,
    learner: { name: '', startedAt: new Date().toISOString() },
    settings: { sound: false, inspector: false },
    progression: {
      xp: 0,
      level: 1,
      badges: [],
      streak: { days: 0, lastActive: '', freezeUsed: false, freezeWeekStart: '' },
      banked: [],
    },
    learn: {},
    cases: {
      skillrise: {
        briefAccepted: false,
        exploreStartedAt: null,
        firstImpression: '',
        observations: [],
        hintsTaken: [],
        impactStatements: ['', '', ''],
        priorities: ['', ''],
        priorityReason: '',
      },
      healthjourney: {
        briefAccepted: false,
        timeInVariant: { A: 0, B: 0, C: 0 },
        scores: { A: emptyScores(), B: emptyScores(), C: emptyScores() },
        scored: [],
        rebalances: 0,
        decision: null,
        decisionHistory: [],
        conflicts: {},
        residualRisks: [],
        recommendation: {},
      },
      movewell: {
        briefAccepted: false,
        categorisation: {},
        allocation: [],
        deferred: [],
        justifications: {},
        recommendation: '',
        receiptIssued: false,
      },
    },
    capstone: {},
    flags: {
      darkPatternTried: false,
      darkPatternReflection: '',
      enteredCaseUnprepared: [],
      governanceStatements: [],
      exported: false,
      lastRoute: '/day/9/',
    },
    gauges: { motivation: 0, credibility: 0, progress: 0 },
    gaugeOverride: null,
    notices: [],
  };
}

let noticeSeq = 0;
const nextId = () => `n${Date.now().toString(36)}-${(noticeSeq += 1)}`;

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState(),

      setName: (name) => set((s) => ({ learner: { ...s.learner, name: name.trim() } })),

      toggleSound: () => set((s) => ({ settings: { ...s.settings, sound: !s.settings.sound } })),

      toggleInspector: () =>
        set((s) => ({ settings: { ...s.settings, inspector: !s.settings.inspector } })),

      setLastRoute: (route) => set((s) => ({ flags: { ...s.flags, lastRoute: route } })),

      pushNotice: (n) =>
        set((s) => ({ notices: [...s.notices, { ...n, id: nextId() }] })),

      dismissNotice: (id) => set((s) => ({ notices: s.notices.filter((n) => n.id !== id) })),

      award: (action, key, opts) => {
        const state = get();
        if (state.progression.banked.includes(key)) {
          // The anti-farming rule is a teaching moment, not just a guard.
          if (!opts?.silent) {
            get().pushNotice({ kind: 'banked', body: '', mechanicId: 'points' });
          }
          return false;
        }

        const amount = XP[action];
        const xp = state.progression.xp + amount;
        const previousLevel = state.progression.level;
        const level = levelFromXp(xp);

        set((s) => ({
          progression: {
            ...s.progression,
            xp,
            level,
            banked: [...s.progression.banked, key],
          },
        }));

        if (!opts?.silent) {
          get().pushNotice({ kind: 'xp', body: opts?.body ?? '', amount });
        }

        if (level > previousLevel) {
          get().pushNotice({ kind: 'levelup', body: '', level });
        }

        get().touchStreak();
        get().recomputeGauges();
        return true;
      },

      grantBadge: (id) => {
        if (get().progression.badges.includes(id)) return;
        set((s) => ({
          progression: { ...s.progression, badges: [...s.progression.badges, id] },
        }));
        get().pushNotice({ kind: 'badge', body: '', badgeId: id });
      },

      touchStreak: () => {
        const today = isoDay();
        const current = get().progression.streak;
        if (current.lastActive === today) return;
        const { next, event } = advanceStreak(current, today);
        set((s) => ({ progression: { ...s.progression, streak: next } }));
        if (event === 'broken' || event === 'frozen') {
          get().pushNotice({ kind: 'toast', body: event, mechanicId: 'streaks' });
        }
      },

      setGauges: (g) => set((s) => ({ gauges: { ...s.gauges, ...g } })),

      setGaugeOverride: (g) => set({ gaugeOverride: g }),

      /**
       * Baseline gauges reflect what the learner has actually done:
       * - Progress: overall completion across modules, cases and capstone
       * - Motivation: how much activation-heavy work has been engaged with
       * - Credibility: how much of the restraint / risk material is covered
       */
      recomputeGauges: () => {
        const s = get();
        const conceptCount = Object.values(s.learn).filter((c) => c.completed).length;
        const sectionsDone = Object.values(s.learn).reduce(
          (acc, c) => acc + c.sectionsDone.length,
          0
        );
        const caseWork =
          (s.cases.skillrise.observations.length >= 5 ? 1 : 0) +
          (s.cases.healthjourney.decision ? 1 : 0) +
          (s.cases.movewell.allocation.length > 0 ? 1 : 0);
        const capstoneWritten = Object.values(s.capstone).filter((t) => t.trim().length > 30).length;

        const progress = Math.min(
          100,
          Math.round(
            (conceptCount / 10) * 40 +
              (sectionsDone / 80) * 15 +
              (caseWork / 3) * 30 +
              (capstoneWritten / 7) * 15
          )
        );

        const credibilityModules = [
          'when-it-backfires',
          'credible-in-serious-domains',
          'who-owns-activation',
          'spike-vs-retention',
          'intrinsic-and-emotional',
        ];
        const credibilityCovered = credibilityModules.filter(
          (slug) => s.learn[slug]?.completed
        ).length;
        const namedRisks = s.cases.healthjourney.residualRisks.filter((r) => r.trim()).length;
        const deferred = s.cases.movewell.deferred.length;

        const credibility = Math.min(
          100,
          Math.round(
            (credibilityCovered / credibilityModules.length) * 55 +
              Math.min(namedRisks, 3) * 8 +
              Math.min(deferred, 2) * 8 +
              (s.flags.darkPatternTried ? 5 : 0)
          )
        );

        const motivationModules = [
          'why-users-respond',
          'motivation-mechanisms',
          'the-toolbox',
          'story-plus-mechanics',
          'what-gamification-is-not',
        ];
        const motivationCovered = motivationModules.filter((slug) => s.learn[slug]?.completed).length;
        const demosUsed = Object.values(s.learn).filter((c) => c.demoUsed).length;

        const motivation = Math.min(
          100,
          Math.round(
            (motivationCovered / motivationModules.length) * 50 +
              (demosUsed / 10) * 30 +
              Math.min(s.cases.skillrise.observations.length, 6) * 3
          )
        );

        set({ gauges: { motivation, credibility, progress } });
      },

      // ── Learn ─────────────────────────────────────────────────────────────

      markSection: (slug, sectionId, total) => {
        const existing = get().learn[slug] ?? {
          sectionsDone: [],
          demoUsed: false,
          checks: {},
          completed: false,
        };
        if (existing.sectionsDone.includes(sectionId)) return;
        const sectionsDone = [...existing.sectionsDone, sectionId];
        set((s) => ({
          learn: { ...s.learn, [slug]: { ...existing, sectionsDone } },
        }));
        get().award('section', `section:${slug}:${sectionId}`, {
          body: `${sectionsDone.length}/${total}`,
        });
      },

      markDemoUsed: (slug) => {
        const existing = get().learn[slug] ?? {
          sectionsDone: [],
          demoUsed: false,
          checks: {},
          completed: false,
        };
        if (existing.demoUsed) return;
        set((s) => ({ learn: { ...s.learn, [slug]: { ...existing, demoUsed: true } } }));
        get().award('demo', `demo:${slug}`);
      },

      recordCheck: (slug, checkId, correct) => {
        const existing = get().learn[slug] ?? {
          sectionsDone: [],
          demoUsed: false,
          checks: {},
          completed: false,
        };
        const prior = existing.checks[checkId] ?? { correct: false, recovered: false, attempts: 0 };
        const attempts = prior.attempts + 1;

        if (!correct) {
          set((s) => ({
            learn: {
              ...s.learn,
              [slug]: {
                ...existing,
                checks: { ...existing.checks, [checkId]: { ...prior, attempts } },
              },
            },
          }));
          return 'wrong';
        }

        const recovered = attempts > 1;
        set((s) => ({
          learn: {
            ...s.learn,
            [slug]: {
              ...existing,
              checks: {
                ...existing.checks,
                [checkId]: { correct: true, recovered, attempts },
              },
            },
          },
        }));

        if (!prior.correct) {
          get().award(
            recovered ? 'checkRecovered' : 'checkCorrect',
            `check:${slug}:${checkId}`
          );
        }
        return recovered ? 'recovered' : 'correct';
      },

      completeConcept: (slug) => {
        const existing = get().learn[slug];
        if (!existing || existing.completed) return;
        set((s) => ({ learn: { ...s.learn, [slug]: { ...existing, completed: true } } }));
        get().recomputeGauges();
      },

      // ── Cases ─────────────────────────────────────────────────────────────

      acceptBrief: (caseId) =>
        set((s) => ({
          cases: { ...s.cases, [caseId]: { ...s.cases[caseId], briefAccepted: true } },
        })),

      startExplore: () => {
        if (get().cases.skillrise.exploreStartedAt) return;
        set((s) => ({
          cases: {
            ...s.cases,
            skillrise: { ...s.cases.skillrise, exploreStartedAt: new Date().toISOString() },
          },
        }));
      },

      setFirstImpression: (text) =>
        set((s) => ({
          cases: { ...s.cases, skillrise: { ...s.cases.skillrise, firstImpression: text } },
        })),

      addObservation: (o) => {
        const obs: Observation = { ...o, id: nextId(), createdAt: new Date().toISOString() };
        set((s) => ({
          cases: {
            ...s.cases,
            skillrise: {
              ...s.cases.skillrise,
              observations: [...s.cases.skillrise.observations, obs],
            },
          },
        }));
        get().award('hotspot', `hotspot:${obs.id}`, { body: obs.text });
        get().recomputeGauges();
      },

      removeObservation: (id) =>
        set((s) => ({
          cases: {
            ...s.cases,
            skillrise: {
              ...s.cases.skillrise,
              observations: s.cases.skillrise.observations.filter((o) => o.id !== id),
            },
          },
        })),

      takeHint: (n) =>
        set((s) => ({
          cases: {
            ...s.cases,
            skillrise: {
              ...s.cases.skillrise,
              hintsTaken: Array.from(new Set([...s.cases.skillrise.hintsTaken, n])),
            },
          },
        })),

      setImpactStatement: (index, text) =>
        set((s) => {
          const impactStatements = [...s.cases.skillrise.impactStatements];
          impactStatements[index] = text;
          return {
            cases: { ...s.cases, skillrise: { ...s.cases.skillrise, impactStatements } },
          };
        }),

      setPriorities: (p) =>
        set((s) => ({
          cases: { ...s.cases, skillrise: { ...s.cases.skillrise, priorities: p } },
        })),

      setPriorityReason: (text) =>
        set((s) => ({
          cases: { ...s.cases, skillrise: { ...s.cases.skillrise, priorityReason: text } },
        })),

      addVariantTime: (v, seconds) =>
        set((s) => ({
          cases: {
            ...s.cases,
            healthjourney: {
              ...s.cases.healthjourney,
              timeInVariant: {
                ...s.cases.healthjourney.timeInVariant,
                [v]: s.cases.healthjourney.timeInVariant[v] + seconds,
              },
            },
          },
        })),

      setScore: (v, d, value) =>
        set((s) => ({
          cases: {
            ...s.cases,
            healthjourney: {
              ...s.cases.healthjourney,
              scores: {
                ...s.cases.healthjourney.scores,
                [v]: { ...s.cases.healthjourney.scores[v], [d]: value },
              },
              rebalances:
                s.cases.healthjourney.decision !== null
                  ? s.cases.healthjourney.rebalances + 1
                  : s.cases.healthjourney.rebalances,
            },
          },
        })),

      markScored: (v) => {
        if (get().cases.healthjourney.scored.includes(v)) return;
        set((s) => ({
          cases: {
            ...s.cases,
            healthjourney: {
              ...s.cases.healthjourney,
              scored: [...s.cases.healthjourney.scored, v],
              rebalances: s.cases.healthjourney.rebalances + 1,
            },
          },
        }));
        get().award('variantScored', `variant-scored:${v}`);
      },

      commitDecision: (v) => {
        set((s) => ({
          cases: {
            ...s.cases,
            healthjourney: {
              ...s.cases.healthjourney,
              decision: v,
              decisionHistory: [...s.cases.healthjourney.decisionHistory, v],
            },
          },
        }));
        get().recomputeGauges();
      },

      reopenDecision: () =>
        set((s) => ({
          cases: { ...s.cases, healthjourney: { ...s.cases.healthjourney, decision: null } },
        })),

      setConflict: (id, text) =>
        set((s) => ({
          cases: {
            ...s.cases,
            healthjourney: {
              ...s.cases.healthjourney,
              conflicts: { ...s.cases.healthjourney.conflicts, [id]: text },
            },
          },
        })),

      setResidualRisks: (risks) => {
        set((s) => ({
          cases: { ...s.cases, healthjourney: { ...s.cases.healthjourney, residualRisks: risks } },
        }));
        const named = risks.filter((r) => r.trim().length > 8).length;
        if (named >= 2 && get().cases.healthjourney.decision) {
          get().award('decisionWithRisk', 'decision-with-risk');
          get().grantBadge('named-the-cost');
        }
        get().recomputeGauges();
      },

      setRecommendationField: (id, text) =>
        set((s) => ({
          cases: {
            ...s.cases,
            healthjourney: {
              ...s.cases.healthjourney,
              recommendation: { ...s.cases.healthjourney.recommendation, [id]: text },
            },
          },
        })),

      setCategorisation: (problemId, category) =>
        set((s) => ({
          cases: {
            ...s.cases,
            movewell: {
              ...s.cases.movewell,
              categorisation: { ...s.cases.movewell.categorisation, [problemId]: category },
            },
          },
        })),

      placeMeasure: (measureId, startWeek) =>
        set((s) => ({
          cases: {
            ...s.cases,
            movewell: {
              ...s.cases.movewell,
              allocation: [
                ...s.cases.movewell.allocation.filter((a) => a.measureId !== measureId),
                { measureId, startWeek },
              ],
              deferred: s.cases.movewell.deferred.filter((d) => d.measureId !== measureId),
            },
          },
        })),

      removeMeasure: (measureId) =>
        set((s) => ({
          cases: {
            ...s.cases,
            movewell: {
              ...s.cases.movewell,
              allocation: s.cases.movewell.allocation.filter((a) => a.measureId !== measureId),
            },
          },
        })),

      deferMeasure: (measureId, reason) => {
        set((s) => ({
          cases: {
            ...s.cases,
            movewell: {
              ...s.cases.movewell,
              allocation: s.cases.movewell.allocation.filter((a) => a.measureId !== measureId),
              deferred: [
                ...s.cases.movewell.deferred.filter((d) => d.measureId !== measureId),
                { measureId, reason },
              ],
            },
          },
        }));
        if (reason.trim().length > 8) get().grantBadge('deferred-on-purpose');
      },

      undeferMeasure: (measureId) =>
        set((s) => ({
          cases: {
            ...s.cases,
            movewell: {
              ...s.cases.movewell,
              deferred: s.cases.movewell.deferred.filter((d) => d.measureId !== measureId),
            },
          },
        })),

      setJustification: (measureId, field, text) =>
        set((s) => ({
          cases: {
            ...s.cases,
            movewell: {
              ...s.cases.movewell,
              justifications: {
                ...s.cases.movewell.justifications,
                [measureId]: { ...s.cases.movewell.justifications[measureId], [field]: text },
              },
            },
          },
        })),

      setMoveWellRecommendation: (text) =>
        set((s) => ({
          cases: { ...s.cases, movewell: { ...s.cases.movewell, recommendation: text } },
        })),

      issueReceipt: () => {
        if (get().cases.movewell.receiptIssued) return;
        set((s) => ({
          cases: { ...s.cases, movewell: { ...s.cases.movewell, receiptIssued: true } },
        }));
        get().award('allocationValid', 'movewell-allocation');
        get().recomputeGauges();
      },

      // ── Capstone ──────────────────────────────────────────────────────────

      setCapstoneSection: (id, text) => {
        const before = get().capstone[id] ?? '';
        set((s) => ({ capstone: { ...s.capstone, [id]: text } }));
        // A section counts as written once it carries a real paragraph.
        if (before.trim().split(/\s+/).length < 25 && text.trim().split(/\s+/).length >= 25) {
          get().award('capstoneSection', `capstone:${id}`);
        }
        get().recomputeGauges();
      },

      markExported: () => {
        if (get().flags.exported) return;
        set((s) => ({ flags: { ...s.flags, exported: true } }));
        get().award('boardExport', 'board-export');
      },

      setDarkPatternTried: () =>
        set((s) => ({ flags: { ...s.flags, darkPatternTried: true } })),

      setDarkPatternReflection: (text) => {
        set((s) => ({ flags: { ...s.flags, darkPatternReflection: text } }));
        if (text.trim().length > 20) get().grantBadge('devils-advocate');
        get().recomputeGauges();
      },

      markUnprepared: (caseId) =>
        set((s) => ({
          flags: {
            ...s.flags,
            enteredCaseUnprepared: Array.from(
              new Set([...s.flags.enteredCaseUnprepared, caseId])
            ),
          },
        })),

      setGovernanceStatements: (statements) =>
        set((s) => ({ flags: { ...s.flags, governanceStatements: statements } })),

      resetSession: () => {
        const fresh = initialState();
        set({ ...fresh, hydrated: true });
      },
    }),
    {
      name: 'activation-lab',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => {
        // Notices are ephemeral; a stale toast on reload would be noise.
        const { notices: _notices, hydrated: _hydrated, gaugeOverride: _o, ...rest } = s as Store;
        return rest as unknown as Store;
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.hydrated = true;
        // Gauges animate up from 0 to the stored value on re-entry (§5.3 #23).
        state.gauges = { motivation: 0, credibility: 0, progress: 0 };
        setTimeout(() => useStore.getState().recomputeGauges(), 60);
      },
    }
  )
);

/** Convenience: has this learner covered a given concept? */
export function useConceptDone(slug: string): boolean {
  return useStore((s) => Boolean(s.learn[slug]?.completed));
}
