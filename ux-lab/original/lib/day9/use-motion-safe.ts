'use client';

import { useEffect, useState } from 'react';
import { DUR, EASE } from './motion';

/**
 * Reduced-motion handling (§5.5). When the user prefers reduced motion, every
 * transform / scale / particle is replaced by an opacity fade of <=150ms,
 * confetti is suppressed, and gauges jump straight to their target value.
 *
 * No feature is removed — only the movement.
 */
export function useMotionSafe() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /** Duration for a given motion token, collapsed when reduced motion is on. */
  const dur = (seconds: number) => (reduced ? Math.min(seconds, 0.15) : seconds);

  /** A framer-motion transition object honouring the preference. */
  const transition = (seconds: number, ease: readonly number[] = EASE.out) =>
    reduced
      ? { duration: 0.15, ease: 'linear' as const }
      : { duration: seconds, ease: ease as number[] };

  /**
   * Swaps a transform-based entrance for a plain fade.
   * `motionProps` is used as-is when motion is allowed.
   */
  const enter = (motionProps: {
    initial: Record<string, unknown>;
    animate: Record<string, unknown>;
    exit?: Record<string, unknown>;
  }) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
      : motionProps;

  return { reduced, dur, transition, enter, DUR };
}
