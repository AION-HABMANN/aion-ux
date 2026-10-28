'use client';

import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import { useMemo, useRef, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import {
  MECHANIC_CONDITIONS,
  MECHANIC_KEYWORDS,
  capstoneMeta,
  capstoneSections,
  type CapstoneSection,
  type PullSource,
} from '@/original/data/day9/capstone';
import { variantById } from '@/original/data/day9/cases/healthjourney';
import { measureById } from '@/original/data/day9/cases/movewell';
import { conceptBySlug } from '@/original/data/day9/concepts';
import { domainFit, mechanicById } from '@/original/data/day9/mechanics';
import {
  briefPageCount,
  countWords,
  downloadJson,
  incompleteCapstoneSections,
  onePagerLines,
  summariseAllocation,
  formatEuro,
} from '@/original/lib/day9/export';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { playCue } from '@/original/lib/day9/sound';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Card, Meter, Mono, PageHeader, TextArea, cx } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

export default function CapstonePage() {
  const [activeId, setActiveId] = useState(capstoneSections[0].id);
  const active = capstoneSections.find((s) => s.id === activeId)!;

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="LEVEL 3 · BOARD BRIEF" title={capstoneMeta.title} />

      <Card className="border-dashed no-print">
        <Mono className="text-ink-soft">{copy.capstone.situationLabel}</Mono>
        <p className="mt-2 max-w-3xl text-14">{capstoneMeta.situation}</p>
        <p className="mt-3 max-w-3xl text-14 text-ink-soft">{copy.capstone.role}</p>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5 no-print">
          <Outline activeId={activeId} onSelect={setActiveId} />
          <SectionEditor section={active} />
        </div>
        <BriefPreview />
      </div>

      <ExportBar />
    </div>
  );
}

function Outline({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const capstone = useStore((s) => s.capstone);
  const incomplete = incompleteCapstoneSections(useStore((s) => s));

  return (
    <Inspectable mechanicId="visible-progress">
      <ol className="flex flex-wrap gap-1.5">
        {capstoneSections.map((s) => {
          const words = countWords(capstone[s.id] ?? '');
          const missing = incomplete.includes(s.title);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(s.id)}
                aria-current={activeId === s.id ? 'true' : undefined}
                className={cx(
                  'rounded border px-2.5 py-1.5 text-12',
                  activeId === s.id
                    ? 'border-ink bg-ink text-white'
                    : 'border-hairline hover:border-ink'
                )}
                style={
                  missing && activeId !== s.id ? { borderColor: 'var(--risk)' } : undefined
                }
              >
                <span className="font-mono">{s.n}</span> {s.title}
                {words > 0 ? <span className="ml-1 font-mono opacity-60">{words}w</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </Inspectable>
  );
}

function SectionEditor({ section }: { section: CapstoneSection }) {
  const text = useStore((s) => s.capstone[section.id] ?? '');
  const setSection = useStore((s) => s.setCapstoneSection);
  const words = countWords(text);
  const over = words > section.wordBudget;

  return (
    <div className="space-y-3">
      <div>
        <Mono style={{ color: 'var(--activation-text)' }}>SECTION {section.n}</Mono>
        <h2 className="mt-1 text-26">{section.title}</h2>
        <p className="mt-1 text-14 text-ink-soft">{section.prompt}</p>
      </div>

      <PullPanel section={section} />

      <TextArea
        value={text}
        onChange={(v) => setSection(section.id, v)}
        rows={10}
        ariaLabel={section.title}
      />

      {/* Word budget as a meter, not a raw counter — senior writing is short. */}
      <div>
        <div className="flex items-baseline justify-between">
          <Mono className="text-ink-soft">
            {fmt(copy.capstone.wordBudget, { n: words, budget: section.wordBudget })}
          </Mono>
          {over ? (
            <Mono style={{ color: 'var(--risk-text)' }}>
              {fmt(copy.capstone.wordOver, { n: words, budget: section.wordBudget })}
            </Mono>
          ) : null}
        </div>
        <Meter
          value={Math.min(words, section.wordBudget * 1.3)}
          max={section.wordBudget}
          accent={over ? 'var(--risk)' : 'var(--integrity)'}
          pulse={over}
          label={copy.capstone.wordBudget}
        />
      </div>

      <MechanicCheck text={text} />
    </div>
  );
}

/** Pull from your work — the learner synthesises, never starts blank (§11). */
function PullPanel({ section }: { section: CapstoneSection }) {
  const state = useStore((s) => s);
  const setSection = useStore((s) => s.setCapstoneSection);
  const [open, setOpen] = useState(false);

  const items = useMemo(() => collectPulls(section.pullSource, state), [section.pullSource, state]);

  return (
    <div className="rounded border border-hairline bg-raised">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-3 py-2 text-left"
      >
        <span className="text-14 font-medium">{copy.capstone.pull}</span>
        <Mono className="text-ink-soft">{section.pullLabel}</Mono>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DUR.quick, ease: EASE.out }}
            className="overflow-hidden border-t border-hairline"
          >
            {items.length === 0 ? (
              <p className="px-3 py-3 text-14 text-ink-soft">{copy.capstone.pullEmpty}</p>
            ) : (
              <ul className="divide-y divide-hairline">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start justify-between gap-3 px-3 py-2">
                    <p className="text-14">{item}</p>
                    <Button
                      size="sm"
                      variant="quiet"
                      onClick={() => {
                        const current = state.capstone[section.id] ?? '';
                        setSection(section.id, current ? `${current}\n\n${item}` : item);
                      }}
                    >
                      {copy.capstone.pullInsert}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function collectPulls(source: PullSource, state: ReturnType<typeof useStore.getState>): string[] {
  const hj = state.cases.healthjourney;
  const mw = state.cases.movewell;
  const summary = summariseAllocation(state);

  switch (source) {
    case 'modules-3-9':
      return ['motivation-mechanisms', 'credible-in-serious-domains']
        .filter((slug) => state.learn[slug]?.completed)
        .map((slug) => `You can now ${conceptBySlug[slug].canNow}.`);

    case 'healthjourney-decision':
      return [
        hj.decision
          ? `We committed to ${variantById[hj.decision].name} (${variantById[hj.decision].label}).`
          : '',
        ...Object.values(hj.conflicts).filter(Boolean),
        Object.values(hj.recommendation).filter(Boolean).length
          ? `The decisive factor was ${hj.recommendation.factor ?? '…'}, and we accepted ${hj.recommendation.tradeoff ?? '…'}.`
          : '',
      ].filter(Boolean);

    case 'movewell-allocation':
      return [
        mw.allocation.length
          ? `We committed ${formatEuro(summary.spent)} across ${summary.shipped} measures in ${summary.weeksUsed} weeks.`
          : '',
        ...mw.allocation
          .map((a) => measureById[a.measureId])
          .filter(Boolean)
          .map((m) => `${m.name} — impact ${m.impact}/5, reputation risk ${m.risk}/5.`),
        ...summary.deferredNames.map((d) => `Deliberately deferred: ${d.name} — ${d.reason}`),
      ].filter(Boolean);

    case 'healthjourney-risks':
      return [
        ...hj.residualRisks.filter((r) => r.trim()),
        state.flags.darkPatternReflection
          ? `From the manipulation simulation: ${state.flags.darkPatternReflection}`
          : '',
      ].filter(Boolean);

    case 'module-10':
      return state.flags.governanceStatements;

    case 'unprepared-entries':
      return state.flags.enteredCaseUnprepared.map(
        (c) => `We proceeded on ${c} without the full background, and decided anyway.`
      );

    case 'everything':
      return [
        hj.decision ? `Activation logic: ${variantById[hj.decision].label}.` : '',
        mw.allocation.length
          ? `Programme: ${formatEuro(summary.spent)} over ${summary.weeksUsed} weeks, strongest bet ${summary.strongestBet}.`
          : '',
        summary.deferredNames.length
          ? `Deferred on purpose: ${summary.deferredNames[0].name}.`
          : '',
        state.capstone.principle ? `Guiding principle: ${state.capstone.principle}` : '',
      ].filter(Boolean);

    default:
      return [];
  }
}

/** `Check my mechanics` runs the text against the Inspector registry (§11). */
function MechanicCheck({ text }: { text: string }) {
  const [result, setResult] = useState<
    { id: string; verdict: 'ship' | 'conditional' | 'do-not'; note: string }[] | null
  >(null);

  function run() {
    const lower = text.toLowerCase();
    const proposed = Object.entries(MECHANIC_KEYWORDS)
      .filter(([, words]) => words.some((w) => lower.includes(w)))
      .map(([id]) => id);

    setResult(
      proposed.map((id) => {
        const row = domainFit.find((r) => r.mechanicId === id);
        const verdict = row?.verdicts.health.verdict ?? 'conditional';
        const condition = MECHANIC_CONDITIONS[id];
        const satisfied = condition ? condition.needs.some((n) => lower.includes(n)) : true;

        if (verdict === 'do-not') {
          return {
            id,
            verdict,
            note: mechanicById[id]?.riskIfOverused ?? 'Not defensible in this domain.',
          };
        }
        if (verdict === 'conditional' && !satisfied && condition) {
          return { id, verdict, note: condition.missing };
        }
        return { id, verdict: 'ship' as const, note: 'No conditions outstanding.' };
      })
    );
  }

  return (
    <div>
      <Button size="sm" onClick={run}>
        ⌕ {copy.capstone.checkMechanics}
      </Button>

      {result ? (
        <div className="mt-3 rounded border border-hairline bg-raised p-3">
          <Mono className="text-ink-soft">{copy.capstone.checkTitle} · domain: health</Mono>
          {result.length === 0 ? (
            <p className="mt-2 text-14 text-ink-soft">
              No mechanics named yet. A strategy that names none is a principle, not a plan.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {result.map((r) => (
                <li key={r.id} className="text-14">
                  <span
                    style={{
                      color: r.verdict === 'ship' ? 'var(--integrity)' : 'var(--risk)',
                    }}
                  >
                    {r.verdict === 'ship' ? '✓' : '⚠'}
                  </span>{' '}
                  <strong>{mechanicById[r.id]?.name ?? r.id}</strong> — {r.note}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** The live document. Watching it grow IS the progress mechanic (§11). */
function BriefPreview() {
  const state = useStore((s) => s);
  const capstone = useStore((s) => s.capstone);
  const name = useStore((s) => s.learner.name);
  const { reduced } = useMotionSafe();
  const pages = briefPageCount(state);
  const onePager = onePagerLines(state);

  const written = capstoneSections.filter((s) => countWords(capstone[s.id] ?? '') >= 25);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="mb-2 flex items-baseline justify-between no-print">
        <Mono className="text-ink-soft">{copy.capstone.previewLabel}</Mono>
        <Mono className="text-ink-soft">
          {written.length
            ? fmt(copy.capstone.section, { n: written.length, pages })
            : copy.empty.capstone}
        </Mono>
      </div>

      <article className="print-sheet max-h-[70vh] overflow-y-auto rounded-lg border border-hairline bg-raised p-6 scrollbar-thin">
        <header className="border-b border-hairline pb-3">
          <h1 className="font-display text-20">{capstoneMeta.title}</h1>
          <p className="mt-1 font-mono text-12 text-ink-soft">
            {name || 'Unsigned'} · acting Experience Lead · {new Date().toLocaleDateString('en-GB')}
          </p>
        </header>

        <AnimatePresence initial={false}>
          {capstoneSections.map((s) => {
            const body = capstone[s.id] ?? '';
            if (!body.trim()) return null;
            return (
              <motion.section
                key={s.id}
                layout
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : DUR.base, ease: EASE.out }}
                className="mt-4"
              >
                <h2 className="font-mono text-12 uppercase tracking-wider text-ink-soft">
                  {s.n}. {s.title}
                </h2>
                <p className="mt-1 whitespace-pre-wrap text-14">{body}</p>
              </motion.section>
            );
          })}
        </AnimatePresence>

        {/* The one-page summary printed alongside the brief (§11). */}
        <section className="print-break mt-6 border-t border-hairline pt-4">
          <h2 className="font-mono text-12 uppercase tracking-wider text-ink-soft">
            {copy.capstone.onePager}
          </h2>
          <dl className="mt-2 space-y-2 text-14">
            <div>
              <dt className="font-medium">Priorities</dt>
              <dd className="text-ink-soft">{onePager.priorities.join(' · ')}</dd>
            </div>
            <div>
              <dt className="font-medium">Activation logic</dt>
              <dd className="text-ink-soft">{onePager.decision}</dd>
            </div>
            <div>
              <dt className="font-medium">Deferred on purpose</dt>
              <dd className="text-ink-soft">{onePager.deferred}</dd>
            </div>
          </dl>
        </section>
      </article>
    </div>
  );
}

/** The one and only confetti in the whole app (§5.4, Ceremony #4). */
function ExportBar() {
  const state = useStore((s) => s);
  const markExported = useStore((s) => s.markExported);
  const grantBadge = useStore((s) => s.grantBadge);
  const soundOn = useStore((s) => s.settings.sound);
  const { reduced } = useMotionSafe();
  const [sealed, setSealed] = useState(false);
  const fired = useRef(false);

  const incomplete = incompleteCapstoneSections(state);

  function exportBrief() {
    if (incomplete.length > 0) return;
    if (!fired.current) {
      fired.current = true;
      markExported();
      grantBadge('board-ready');
      playCue('seal', soundOn);
      if (!reduced) {
        confetti({ particleCount: 240, spread: 78, origin: { y: 0.7 }, ticks: 260 });
      }
    }
    setSealed(true);
  }

  return (
    <Card className="no-print">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={exportBrief} disabled={incomplete.length > 0}>
          {copy.capstone.exportBrief}
        </Button>
        <Button onClick={() => window.print()}>{copy.capstone.print}</Button>
        <Button onClick={() => downloadJson(state)}>{copy.capstone.exportJson}</Button>
      </div>

      {incomplete.length > 0 ? (
        <p className="mt-3 text-14" style={{ color: 'var(--risk-text)' }}>
          {fmt(copy.error.incompleteN, { n: incomplete.length })}
        </p>
      ) : null}

      <AnimatePresence>
        {sealed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-4"
          >
            <Seal />
            <p className="text-16" style={{ color: 'var(--integrity-text)' }}>
              {copy.capstone.exported}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
}

/** An embossed stamp drawn on over 1.1s. */
function Seal() {
  const { reduced } = useMotionSafe();
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="var(--integrity)"
        strokeWidth="2"
        initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
        animate={reduced ? { opacity: 1 } : { pathLength: 1 }}
        transition={{ duration: reduced ? 0.15 : 1.1, ease: EASE.out }}
      />
      <motion.path
        d="M 20 33 L 29 42 L 45 23"
        fill="none"
        stroke="var(--integrity)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
        animate={reduced ? { opacity: 1 } : { pathLength: 1 }}
        transition={{ duration: reduced ? 0.15 : 0.6, delay: reduced ? 0 : 0.5 }}
      />
    </svg>
  );
}
