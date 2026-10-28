'use client';

import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import { useEffect } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { DUR, EASE, SPRING } from '@/original/lib/day9/motion';
import { badgeById, levelDef } from '@/original/lib/day9/progression';
import { playCue } from '@/original/lib/day9/sound';
import { useStore, type Notice } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';

/**
 * Single host for every reward moment (§5.3, §5.4).
 * Tiers: XP + toast = Nod, badge = Mark, level-up = Ceremony.
 * There is exactly one Ceremony per level and one for the export — four total.
 */
export function Notifier() {
  const notices = useStore((s) => s.notices);
  const dismiss = useStore((s) => s.dismissNotice);
  const soundOn = useStore((s) => s.settings.sound);
  const { reduced, transition } = useMotionSafe();

  const levelNotice = notices.find((n) => n.kind === 'levelup');
  const badgeNotice = notices.find((n) => n.kind === 'badge');
  // Restraint has a number: at most three Nod-tier notices on screen at once.
  // Anything beyond that is the reward inflation this module teaches against.
  const transient = notices
    .filter((n) => n.kind === 'xp' || n.kind === 'toast' || n.kind === 'banked')
    .slice(-3);

  // Nod-tier notices clear themselves within the 3.2s ceiling. The effect keys
  // off the ids, not the filtered array, so the timers are not reset on every
  // unrelated re-render.
  const transientKey = transient.map((n) => n.id).join(',');

  useEffect(() => {
    if (!transientKey) return;
    const current = useStore
      .getState()
      .notices.filter((n) => n.kind === 'xp' || n.kind === 'toast' || n.kind === 'banked');
    const timers = current.map((n) =>
      setTimeout(() => dismiss(n.id), n.kind === 'banked' ? 5200 : 3200)
    );
    return () => timers.forEach(clearTimeout);
  }, [transientKey, dismiss]);

  useEffect(() => {
    if (badgeNotice) playCue('unlock', soundOn);
  }, [badgeNotice, soundOn]);

  useEffect(() => {
    if (levelNotice) playCue('seal', soundOn);
  }, [levelNotice, soundOn]);

  return (
    <>
      {/* aria-live region: XP and badge changes are announced (§13). */}
      <div aria-live="polite" className="sr-only">
        {transient.map((n) => (
          <span key={n.id}>{describe(n)}</span>
        ))}
      </div>

      {/* Nod tier — small, bottom-right, above the console. */}
      <div className="pointer-events-none fixed bottom-[calc(var(--console-h)+16px)] right-4 z-40 flex w-full max-w-xs flex-col gap-2">
        <AnimatePresence initial={false}>
          {transient.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={transition(DUR.quick)}
              className="pointer-events-auto rounded border border-hairline bg-raised px-3 py-2 shadow-raised"
            >
              <TransientBody notice={n} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mark tier — badge unlock. */}
      <AnimatePresence>
        {badgeNotice ? (
          <BadgeUnlock notice={badgeNotice} onDismiss={() => dismiss(badgeNotice.id)} />
        ) : null}
      </AnimatePresence>

      {/* Ceremony tier — level up. */}
      <AnimatePresence>
        {levelNotice ? (
          <LevelUpSheet notice={levelNotice} onDismiss={() => dismiss(levelNotice.id)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function describe(n: Notice): string {
  if (n.kind === 'xp' && n.amount) return fmt(copy.xp.announce, { n: n.amount, total: '' });
  if (n.kind === 'banked') return copy.xp.banked;
  return n.body;
}

function TransientBody({ notice }: { notice: Notice }) {
  if (notice.kind === 'banked') {
    return (
      <p className="text-14" style={{ color: 'var(--risk-text)' }}>
        {copy.xp.banked}
      </p>
    );
  }

  if (notice.kind === 'toast') {
    const text =
      notice.body === 'frozen'
        ? copy.streak.frozen
        : notice.body === 'broken'
          ? copy.streak.broken
          : notice.body;
    return <p className="text-14 text-ink">{text}</p>;
  }

  return (
    <div className="flex items-baseline gap-2">
      <XPBurst amount={notice.amount ?? 0} />
      {notice.body ? <p className="text-14 text-ink-soft">{notice.body}</p> : null}
    </div>
  );
}

/** The XP burst — a small mono figure rising and fading (§5.3 #2). */
export function XPBurst({ amount }: { amount: number }) {
  const { reduced } = useMotionSafe();
  return (
    <motion.span
      className="font-mono text-14 font-semibold tabular-nums"
      style={{ color: 'var(--activation-text)' }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : DUR.quick, ease: EASE.out as number[] }}
    >
      {fmt(copy.xp.gained, { n: amount })}
    </motion.span>
  );
}

/** Mark tier: scale 0.6→1.08→1 spring, 14 radial particles, backdrop dim 0.35. */
function BadgeUnlock({ notice, onDismiss }: { notice: Notice; onDismiss: () => void }) {
  const { reduced, transition } = useMotionSafe();
  const badge = notice.badgeId ? badgeById[notice.badgeId] : null;
  if (!badge) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition(DUR.quick)}
      role="dialog"
      aria-label={copy.badge.label}
    >
      <div className="absolute inset-0 bg-ink/35" onClick={onDismiss} aria-hidden />
      <motion.div
        className="relative w-full max-w-sm rounded-xl border border-hairline bg-raised p-6 text-center shadow-lifted"
        initial={reduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { scale: [0.6, 1.08, 1], opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { scale: 0.94, opacity: 0 }}
        transition={reduced ? { duration: 0.15 } : (SPRING.badge as never)}
      >
        {!reduced ? <Particles /> : null}
        <p className="mono-label" style={{ color: 'var(--activation-text)' }}>
          {copy.badge.label}
        </p>
        <p className="mt-2 font-display text-26">{badge.name}</p>
        <p className="mt-2 text-14 text-ink-soft">{badge.reason}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-5 rounded border border-hairline px-4 py-2 text-14 hover:border-ink"
        >
          {copy.badge.dismiss}
        </button>
      </motion.div>
    </motion.div>
  );
}

/** 14 particles — the Mark-tier ceiling is 16 (§5.4). */
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 block h-1 w-1 rounded-full"
            style={{ background: i % 2 ? 'var(--activation)' : 'var(--integrity)' }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * 110,
              y: Math.sin(angle) * 110,
              opacity: 0,
            }}
            transition={{ duration: DUR.particles, ease: EASE.out as number[] }}
          />
        );
      })}
    </div>
  );
}

/**
 * Ceremony tier: full-screen sheet, backdrop blur, word-by-word title reveal,
 * ring closing over 900ms.
 */
function LevelUpSheet({ notice, onDismiss }: { notice: Notice; onDismiss: () => void }) {
  const { reduced, transition } = useMotionSafe();
  const def = levelDef(notice.level ?? 1);
  const words = fmt(copy.levelup, { title: def.title, capability: def.capability }).split(' ');

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition(0.24)}
      role="dialog"
      aria-label={fmt(copy.levelupEyebrow, { n: def.level })}
      style={{ backdropFilter: reduced ? undefined : 'blur(10px)', background: 'rgba(11,18,32,0.72)' }}
    >
      <div className="w-full max-w-xl text-center text-console-fg">
        <motion.div
          className="mx-auto mb-6"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition(DUR.base)}
        >
          <ClosingRing />
        </motion.div>

        <p className="mono-label" style={{ color: 'var(--activation-text)' }}>
          {fmt(copy.levelupEyebrow, { n: def.level })}
        </p>

        <h2 className="mt-3 font-display text-34 leading-tight text-white sm:text-46">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              className="inline-block"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.32, delay: reduced ? 0 : i * 0.06 }}
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </h2>

        <p className="mt-5 text-14 text-console-fg/80">
          {def.unlocks.length ? `Now open: ${def.unlocks.join(' · ')}` : ''}
        </p>

        <button
          type="button"
          onClick={onDismiss}
          className="mt-8 rounded border border-console-fg/40 px-5 py-2.5 text-14 text-console-fg hover:border-console-fg"
        >
          {copy.levelupDismiss}
        </button>
      </div>
    </motion.div>
  );
}

function ClosingRing() {
  const { reduced } = useMotionSafe();
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg width="104" height="104" viewBox="0 0 104 104" className="-rotate-90" aria-hidden>
      <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(200,212,228,0.25)" strokeWidth="4" />
      <motion.circle
        cx="52"
        cy="52"
        r={r}
        fill="none"
        stroke="var(--activation)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: reduced ? 0.15 : DUR.draw, ease: EASE.out as number[] }}
      />
    </svg>
  );
}
