/**
 * The module's own category vocabulary. These are the ONLY taxonomies used for
 * analysis anywhere in the playground. They must not be merged, renamed, or
 * replaced by an external framework.
 */

export const TASK1_CATEGORIES = [
  'User Value',
  'Orientation',
  'Cognitive Load',
  'Maturity',
  'Acceptance',
  'Feasibility',
] as const;

export const TASK2_CRITERIA = [
  'User Value',
  'Degree of Innovation',
  'Maturity',
  'Acceptance',
  'Risk',
  'Economic Viability',
] as const;

export const TASK3_CATEGORIES = [
  'User Value',
  'Maturity',
  'Acceptance',
  'Overload',
  'Economic Viability',
  'Scalability',
] as const;

/** Every distinct label across the three graded sets, used for practice badges. */
export const ALL_CATEGORIES = [
  'User Value',
  'Orientation',
  'Cognitive Load',
  'Maturity',
  'Acceptance',
  'Feasibility',
  'Degree of Innovation',
  'Risk',
  'Economic Viability',
  'Overload',
  'Scalability',
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];

/**
 * Single permitted reference to an external framework, shown once in Learn.
 * It is never the graded taxonomy.
 */
export const EXTERNAL_FRAMEWORK_NOTE =
  'Reference note only: general accessibility frameworks such as WCAG / POUR exist alongside this module — the categories above remain the vocabulary used for every task in Module 7.';
