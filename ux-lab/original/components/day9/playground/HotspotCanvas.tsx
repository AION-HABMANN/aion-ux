'use client';

import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import { useRef, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { CATEGORIES, mockScreens, type ScreenId } from '@/original/data/day9/cases/skillrise';
import type { Category } from '@/original/data/day9/types';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { playCue } from '@/original/lib/day9/sound';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Mono, TextArea, cx } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

interface Pending {
  screen: ScreenId;
  x: number;
  y: number;
}

/**
 * The SkillRise mock — a clickable, deliberately flat learning platform.
 * Annotate mode turns the cursor into a crosshair; every mark logs an
 * observation and fills an axis of the radar (§8, step 2).
 */
export function HotspotCanvas() {
  const [screen, setScreen] = useState<ScreenId>('dashboard');
  const [annotating, setAnnotating] = useState(true);
  const [pending, setPending] = useState<Pending | null>(null);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('progress');
  const [effect, setEffect] = useState<'strengthens' | 'weakens'>('weakens');
  const [pulse, setPulse] = useState<{ x: number; y: number; key: number } | null>(null);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const observations = useStore((s) => s.cases.skillrise.observations);
  const addObservation = useStore((s) => s.addObservation);
  const removeObservation = useStore((s) => s.removeObservation);
  const startExplore = useStore((s) => s.startExplore);
  const soundOn = useStore((s) => s.settings.sound);
  const { reduced, transition } = useMotionSafe();

  const current = mockScreens.find((s) => s.id === screen)!;
  const onThisScreen = observations.filter((o) => o.screen === screen);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!annotating || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setPending({
      screen,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setText('');
  }

  function save() {
    if (!pending || text.trim().length < 3) return;
    addObservation({
      screen: pending.screen,
      x: pending.x,
      y: pending.y,
      text: text.trim(),
      category,
      effect,
      hintUsed: false,
    });
    playCue('confirm', soundOn);
    setPulse({ x: pending.x, y: pending.y, key: Date.now() });
    setPending(null);
    setText('');
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
      <div>
        {/* Mock navigation */}
        <div className="mb-2 flex flex-wrap gap-1">
          {mockScreens.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setScreen(s.id);
                startExplore();
              }}
              aria-pressed={screen === s.id}
              className={cx(
                'rounded border px-2.5 py-1 text-12',
                screen === s.id ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
              )}
            >
              {s.navLabel}
            </button>
          ))}
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-3">
          <Button
            size="sm"
            variant={annotating ? 'primary' : 'secondary'}
            onClick={() => setAnnotating((v) => !v)}
            aria-pressed={annotating}
          >
            {annotating ? copy.hotspot.modeOn : copy.hotspot.modeOff}
          </Button>
          <Mono className="text-ink-soft">{copy.hotspot.keyboardHint}</Mono>
        </div>

        {/* The mock itself. Its flatness is the teaching material — do not improve it. */}
        <div
          ref={canvasRef}
          onClick={handleClick}
          className={cx(
            'relative min-h-[340px] rounded-lg border border-hairline bg-white p-6',
            annotating && 'cursor-crosshair'
          )}
        >
          <p className="font-mono text-12 uppercase tracking-wider text-[#98A2B3]">SkillRise</p>
          <h3 className="mt-3 text-20 text-[#344054]">{current.title}</h3>
          <div className="mt-2 space-y-1">
            {current.lines.map((line) => (
              <p key={line} className="text-14 text-[#667085]">
                {line}
              </p>
            ))}
          </div>

          {current.moduleRows ? (
            <ul className="mt-4 divide-y divide-[#EAECF0] border-y border-[#EAECF0]">
              {current.moduleRows.map((row) => (
                <li key={row.label} className="flex justify-between py-1.5 text-14 text-[#475467]">
                  <span>{row.label}</span>
                  <span className="text-[#98A2B3]">{row.status}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {current.action ? (
            <button
              type="button"
              className="mt-5 rounded border border-[#D0D5DD] px-3 py-1.5 text-14 text-[#344054]"
              onClick={(e) => e.stopPropagation()}
            >
              {current.action}
            </button>
          ) : null}

          {/* Keyboard alternative: a focusable region per screen (§13). */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPending({ screen, x: 50, y: 50 });
              setText('');
            }}
            className="absolute bottom-3 right-3 rounded border border-dashed border-[#D0D5DD] px-2 py-1 font-mono text-[10px] text-[#98A2B3]"
          >
            Annotate this screen
          </button>

          {/* Logged marks */}
          {onThisScreen.map((o) => (
            <span
              key={o.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${o.x}%`,
                top: `${o.y}%`,
                width: 14,
                height: 14,
                borderColor: o.effect === 'weakens' ? 'var(--risk)' : 'var(--integrity)',
                background: 'var(--raised)',
              }}
              title={o.text}
            />
          ))}

          {/* One pulse ring on log (§5.3 #8) */}
          <AnimatePresence>
            {pulse && !reduced ? (
              <motion.span
                key={pulse.key}
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  left: `${pulse.x}%`,
                  top: `${pulse.y}%`,
                  borderColor: 'var(--activation)',
                }}
                initial={{ width: 14, height: 14, opacity: 0.9 }}
                animate={{ width: 72, height: 72, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.flip, ease: EASE.out }}
                onAnimationComplete={() => setPulse(null)}
              />
            ) : null}
          </AnimatePresence>

          {/* Popover */}
          <AnimatePresence>
            {pending ? (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={transition(DUR.quick)}
                onClick={(e) => e.stopPropagation()}
                className="absolute z-20 w-72 rounded-lg border border-hairline bg-raised p-3 shadow-lifted"
                style={{
                  left: `min(max(${pending.x}%, 8px), calc(100% - 296px))`,
                  top: `min(${pending.y}%, calc(100% - 300px))`,
                }}
              >
                <Mono className="text-ink-soft">{copy.hotspot.prompt}</Mono>
                <TextArea
                  value={text}
                  onChange={setText}
                  rows={2}
                  placeholder={copy.hotspot.placeholder}
                  ariaLabel={copy.hotspot.prompt}
                />

                <div className="mt-2 flex gap-1">
                  {(['weakens', 'strengthens'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setEffect(v)}
                      aria-pressed={effect === v}
                      className={cx(
                        'flex-1 rounded border px-2 py-1 text-12',
                        effect === v ? 'border-ink bg-ink text-white' : 'border-hairline'
                      )}
                    >
                      {v === 'weakens' ? copy.hotspot.weakens : copy.hotspot.strengthens}
                    </button>
                  ))}
                </div>

                <label className="mt-2 block">
                  <Mono className="text-ink-soft">{copy.hotspot.categoryLabel}</Mono>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="mt-1 w-full rounded border border-hairline bg-raised px-2 py-1.5 text-14"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label} — {c.question}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="primary" onClick={save} disabled={text.trim().length < 3}>
                    {copy.hotspot.save}
                  </Button>
                  <Button size="sm" variant="quiet" onClick={() => setPending(null)}>
                    {copy.hotspot.cancel}
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Observation panel — cards fly here on log. */}
      <Inspectable mechanicId="recognition-signal">
        <div className="rounded-lg border border-hairline bg-raised p-4">
          <Mono className="text-ink-soft">
            {fmt('{n} logged', { n: observations.length })}
          </Mono>
          {observations.length === 0 ? (
            <p className="mt-3 text-14 text-ink-soft">{copy.empty.observations}</p>
          ) : (
            <ul className="mt-3 space-y-2">
              <AnimatePresence initial={false}>
                {observations.map((o) => {
                  const cat = CATEGORIES.find((c) => c.id === o.category);
                  return (
                    <motion.li
                      key={o.id}
                      layout
                      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -24, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: reduced ? 0.15 : DUR.flip, ease: EASE.out }}
                      className="rounded border border-hairline p-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Mono
                          style={{
                            color: cat?.tone === 'activation' ? 'var(--activation)' : 'var(--integrity)',
                          }}
                        >
                          {cat?.label}
                        </Mono>
                        <button
                          type="button"
                          onClick={() => removeObservation(o.id)}
                          aria-label={copy.hotspot.remove}
                          className="text-12 text-ink-soft hover:text-risk"
                        >
                          ×
                        </button>
                      </div>
                      <p className="mt-1 text-14">{o.text}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-ink-soft">
                        {o.screen} · {o.effect}
                      </p>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </Inspectable>
    </div>
  );
}
