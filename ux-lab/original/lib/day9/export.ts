import { capstoneSections } from '@/original/data/day9/capstone';
import { measureById, BUDGET_TOTAL, TOTAL_WEEKS } from '@/original/data/day9/cases/movewell';
import { variantById } from '@/original/data/day9/cases/healthjourney';
import { badgeById, levelDef } from './progression';
import type { Store } from './store';

/** BUILD_PROMPT §12 — export. No backend; everything is produced client-side. */

export function sessionToJson(state: Store): string {
  const payload = {
    exportedAt: new Date().toISOString(),
    learner: state.learner,
    progression: {
      xp: state.progression.xp,
      level: state.progression.level,
      levelTitle: levelDef(state.progression.level).title,
      badges: state.progression.badges.map((id) => ({
        id,
        name: badgeById[id]?.name,
        reason: badgeById[id]?.reason,
      })),
      streak: state.progression.streak,
    },
    learn: state.learn,
    cases: state.cases,
    capstone: state.capstone,
    flags: state.flags,
    gauges: state.gauges,
  };
  return JSON.stringify(payload, null, 2);
}

export function downloadJson(state: Store) {
  const blob = new Blob([sessionToJson(state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  const who = state.learner.name ? state.learner.name.replace(/\s+/g, '-').toLowerCase() : 'session';
  a.href = url;
  a.download = `activation-lab-${who}-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Derived figures used by the receipt, the brief and the one-pager ────────

export interface AllocationSummary {
  spent: number;
  remaining: number;
  weeksUsed: number;
  shipped: number;
  deferredCount: number;
  overBudget: boolean;
  overTime: boolean;
  strongestBet: string;
  biggestExposure: string;
  deferredNames: { name: string; reason: string }[];
}

export function summariseAllocation(state: Store): AllocationSummary {
  const { allocation, deferred } = state.cases.movewell;
  const placed = allocation
    .map((a) => ({ ...a, measure: measureById[a.measureId] }))
    .filter((a) => a.measure);

  const spent = placed.reduce((sum, a) => sum + a.measure.cost, 0);
  const weeksUsed = placed.reduce(
    (max, a) => Math.max(max, a.startWeek + a.measure.weeks - 1),
    0
  );

  const byImpact = [...placed].sort((a, b) => b.measure.impact - a.measure.impact);
  const byRisk = [...placed].sort((a, b) => b.measure.risk - a.measure.risk);

  return {
    spent,
    remaining: BUDGET_TOTAL - spent,
    weeksUsed,
    shipped: placed.length,
    deferredCount: deferred.length,
    overBudget: spent > BUDGET_TOTAL,
    overTime: weeksUsed > TOTAL_WEEKS,
    strongestBet: byImpact[0]?.measure.name ?? '—',
    biggestExposure:
      byRisk[0] && byRisk[0].measure.risk >= 3
        ? byRisk[0].measure.name
        : 'No user testing before week 9',
    deferredNames: deferred.map((d) => ({
      name: measureById[d.measureId]?.name ?? d.measureId,
      reason: d.reason,
    })),
  };
}

export function formatEuro(n: number): string {
  return `€${n.toLocaleString('en-GB')}`;
}

/** Sections still missing a real answer — drives `error.incomplete`. */
export function incompleteCapstoneSections(state: Store): string[] {
  return capstoneSections
    .filter((s) => (state.capstone[s.id] ?? '').trim().split(/\s+/).filter(Boolean).length < 25)
    .map((s) => s.title);
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Rough page count for the "your brief is now {pages} pages" copy. */
export function briefPageCount(state: Store): number {
  const words = capstoneSections.reduce(
    (sum, s) => sum + countWords(state.capstone[s.id] ?? ''),
    0
  );
  return Math.max(1, Math.ceil(words / 420));
}

/** The one-page summary printed alongside the brief: priorities, reasoning, deferral. */
export function onePagerLines(state: Store): {
  priorities: string[];
  reasoning: string;
  deferred: string;
  decision: string;
} {
  const summary = summariseAllocation(state);
  const placed = state.cases.movewell.allocation
    .map((a) => measureById[a.measureId])
    .filter(Boolean)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3)
    .map((m) => m.name);

  const decision = state.cases.healthjourney.decision;

  return {
    priorities: placed.length ? placed : ['No allocation committed yet'],
    reasoning: state.capstone.principle || state.cases.movewell.recommendation || '',
    deferred: summary.deferredNames.length
      ? `${summary.deferredNames[0].name} — ${summary.deferredNames[0].reason}`
      : 'Nothing deferred yet',
    decision: decision
      ? `${variantById[decision].name} (${variantById[decision].label})`
      : 'No variant committed yet',
  };
}
