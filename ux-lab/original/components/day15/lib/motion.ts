import type { Transition, Variants } from 'framer-motion'

/**
 * Motion contract for the module.
 *
 * Two rules govern everything here:
 *  1. Nothing jumps. Meters and bars move on a spring, so the learner reads a
 *     value as a *movement between states*, not as a replaced number.
 *  2. `prefers-reduced-motion` never removes a beat — it removes the physics.
 *     Sequential reveals still happen, they just stop staggering.
 */

export const SPRING: Transition = { type: 'spring', stiffness: 120, damping: 18 }
export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 90, damping: 20 }
export const FADE: Transition = { duration: 0.15, ease: 'easeOut' }

export const springOr = (reduced: boolean): Transition => (reduced ? FADE : SPRING)
export const stagger = (reduced: boolean, seconds: number) => (reduced ? 0 : seconds)

/**
 * Swap the content of a panel when a selection changes: 240ms fade + 8px slide,
 * keyed on the selection so it remounts and animates in.
 *
 * Enter-only on purpose. An exit animation here has to win a race against the
 * next click, and when it loses, the incoming content is left mounted at
 * opacity 0 — an invisible panel that is fully present in the DOM. Nothing in
 * this module is worth that failure mode.
 */
export const swapIn = (reduced: boolean) => ({
  initial: { opacity: 0, y: reduced ? 0 : 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: reduced ? 0.15 : 0.24, ease: [0.22, 0.61, 0.36, 1] as const },
})

/** Container that reveals its children one after another. */
export const revealList = (reduced: boolean, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger(reduced, 0.08),
      delayChildren: reduced ? 0 : delay,
    },
  },
})

export const revealItem = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduced ? FADE : { duration: 0.42, ease: [0.22, 0.61, 0.36, 1] },
  },
})

/** Card hover lift. Disabled under reduced motion. */
export const hoverLift = (reduced: boolean) =>
  reduced ? {} : { y: -4, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
