/**
 * The shapes of a day's study cards, shared by every day (in DL they live in Day 1's materials file; here they have their own file so no day owns them).
 * Materi A (Route 1, Levels 1 and 2) and Materi B (Route 2, Level 3); a card's id is its block letter and number.
 */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "B1" | "B2" | "B3";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };
export type RailSection = { id: string; label: string; sub: string; minutes: number };
/** "In plain words" (CLAUDE.md #22): the idea, why it matters for the task, and how to read the picture. */
export type PlainExplain = { idea: string; why: string; picture?: string };
