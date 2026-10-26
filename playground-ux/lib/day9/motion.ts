/**
 * SINGLE SOURCE OF TRUTH for every animation duration and easing in the app.
 * BUILD_PROMPT §5.5 — no component may hardcode a duration.
 */

export const DUR = {
  instant: 0.12,
  micro: 0.2, // hover, focus
  quick: 0.32, // toast in, cross-fade
  base: 0.42, // card enter, sheet slide
  gauge: 0.62, // needle movement
  fill: 0.7, // progress bar / budget bar
  draw: 0.9, // SVG path draw-on, radar sweep
  seal: 1.1, // emboss stamp
  ceremony: 2.4,

  // Named moments from §5.3. Kept here so no component invents a number.
  shake: 0.2, // wrong self-check, ±3px, once
  checkmark: 0.38, // SVG tick draw-on
  bounce: 0.4, // over-budget card returning to the deck
  flip: 0.46, // observation card flying to the panel
  pulse: 0.5, // threshold node marking itself
  particles: 0.64, // badge unlock burst
  cell: 0.2, // matrix cell scale-in
  receiptLine: 0.24, // one printed line of the decision receipt
  segment: 0.3, // one segment of a segmented bar
  stage: 0.32, // one narrative stage entering
  band: 0.42, // one band of a layered diagram
  meterPulse: 0.9, // budget bar pulsing past the limit
} as const;

export const EASE: Record<'out' | 'inOut' | 'needle' | 'settle', number[]> = {
  out: [0.22, 1, 0.36, 1], // default out — use for nearly everything
  inOut: [0.65, 0, 0.35, 1],
  needle: [0.34, 1.32, 0.64, 1], // slight overshoot — GAUGES ONLY
  settle: [0.16, 1, 0.3, 1], // for elements that "land"
};

export const SPRING = {
  badge: { type: 'spring', stiffness: 260, damping: 18 },
  bubble: { type: 'spring', stiffness: 400, damping: 26 },
  stamp: { type: 'spring', stiffness: 320, damping: 20 },
} as const;

export const STAGGER = {
  hair: 0.01, // rows of a dense matrix
  micro: 0.02, // segments inside one bar
  tight: 0.045, // the twelve week markers locking
  quick: 0.06, // list items, level-up words
  base: 0.08, // cards, receipt lines, matrix columns
  wide: 0.09, // matrix columns
  loose: 0.12, // landing lines, diagram bands
  band: 0.14, // concentric governance bands
} as const;

/**
 * Intensity tiers (§5.4). Ceremony is hard-capped at 4 across the whole
 * journey — the app obeys the reward-inflation lesson it teaches.
 */
export type Tier = 'whisper' | 'nod' | 'mark' | 'ceremony';

export const TIER_CEILING: Record<Tier, number> = {
  whisper: DUR.quick,
  nod: 0.5,
  mark: 0.7,
  ceremony: DUR.ceremony,
};

/** The four Ceremony moments. Adding a fifth is a spec violation. */
export const CEREMONY_MOMENTS = [
  'level-up-2',
  'level-up-3',
  'level-up-4',
  'capstone-export',
] as const;

export type CeremonyMoment = (typeof CEREMONY_MOMENTS)[number];
