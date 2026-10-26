/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options: the expected answer and a reason per option,
 * including why each rejected option is rejected, plus a teaching note wherever more than one answer defends. The blocks themselves are
 * built per day (lib/dayN/answerKey.ts). Never exported and never shown to a learner; mentor tools stay English (CLAUDE.md #32).
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };
