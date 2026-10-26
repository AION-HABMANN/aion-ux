'use client';

import { AnimatePresence, motion } from '@/lib/day9/motion-lite';
import { X } from 'lucide-react';
import { copy } from '@/data/day9/copy';
import { DOMAIN_LABELS, LEVER_LABELS, mechanicById } from '@/data/day9/mechanics';
import { NO_BADGE_ANSWER } from '@/lib/day9/progression';
import { DUR, EASE } from '@/lib/day9/motion';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { useInspector } from './InspectorProvider';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[128px_1fr] gap-3 border-t border-hairline py-3 first:border-0">
      <dt className="mono-label pt-0.5">{label}</dt>
      <dd className="text-14 text-ink">{children}</dd>
    </div>
  );
}

/** The sliding panel behind every Inspector tag (§5.7). */
export function InspectorPanel() {
  const { openMechanic, close } = useInspector();
  const { reduced, transition } = useMotionSafe();
  const mechanic = openMechanic ? mechanicById[openMechanic] : null;

  return (
    <AnimatePresence>
      {mechanic ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition(DUR.quick)}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label={copy.inspector.title}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-hairline bg-raised p-6 pb-24"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={
              reduced ? { duration: 0.15 } : { duration: DUR.base, ease: EASE.out as number[] }
            }
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <p className="mono-label" style={{ color: 'var(--inspect-text)' }}>
                {copy.inspector.title}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label={copy.inspector.close}
                className="rounded p-1 text-ink-soft hover:bg-black/5 hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <dl className="font-mono">
              <Row label={copy.inspector.mechanic}>
                <span className="font-body text-16 font-semibold">{mechanic.name}</span>
              </Row>
              <Row label={copy.inspector.lever}>
                {mechanic.levers.map((l) => LEVER_LABELS[l] ?? l).join(' · ')}
              </Row>
              <Row label={copy.inspector.why}>
                <span className="font-body">{mechanic.whyItWorks}</span>
              </Row>
              <Row label={copy.inspector.risk}>
                <span className="font-body" style={{ color: 'var(--risk-text)' }}>
                  {mechanic.riskIfOverused}
                </span>
              </Row>
              <Row label={copy.inspector.fits}>
                {mechanic.fits.length
                  ? mechanic.fits.map((d) => DOMAIN_LABELS[d]).join(', ')
                  : 'No domain outright — this one is always conditional'}
              </Row>
              <Row label={copy.inspector.doesntFit}>
                {mechanic.doesntFit.length ? mechanic.doesntFit.map((d) => DOMAIN_LABELS[d]).join(', ') : '—'}
              </Row>
              <Row label={copy.inspector.survives}>
                <span
                  className="font-body"
                  style={{ color: mechanic.survivesExplanation ? 'var(--integrity-text)' : 'var(--risk-text)' }}
                >
                  {mechanic.survivesExplanation
                    ? copy.inspector.survivesYes
                    : copy.inspector.survivesNo}
                </span>
                {mechanic.survivesNote ? (
                  <p className="mt-1 font-body text-12 text-ink-soft">{mechanic.survivesNote}</p>
                ) : null}
              </Row>
              <Row label={copy.inspector.seenIn}>
                <span className="font-body">{mechanic.seenIn.join(' · ')}</span>
              </Row>
            </dl>

            {mechanic.id === 'badges' ? (
              <div className="mt-6 rounded border border-hairline bg-paper p-4">
                <p className="text-14 font-semibold">{copy.badge.whyNoLoginQuestion}</p>
                <p className="mt-1 text-14 text-ink-soft">{NO_BADGE_ANSWER}</p>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
