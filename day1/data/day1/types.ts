/**
 * The shapes of a day (UX-STANDARD, from DL-STANDARD v1.8): the plan's numbered questions are the tasks, as free answers,
 * in the plan's order and close to its words. Every block is Core. Checks are completeness only, never correctness.
 */

export type FieldKind = 'text' | 'lines' | 'pick';

export interface Field {
  key: string;
  label: string;
  kind: FieldKind;
  /** text: least characters; lines: least number of lines. */
  min: number;
  /** pick: the plan's own options. */
  options?: string[];
  /** Shown in front of the answer, as the plan words it. */
  prefix?: string;
}

export interface Item {
  /** Number inside the block, as in the plan. */
  n: number;
  /** The plan's wording. */
  prompt: string;
  /** One short caption under the question (CLAUDE.md #8). */
  help?: string;
  fields: Field[];
  /** Categories: at least one box must have text; a category may stay empty (DL "anyOf"). */
  anyOf?: boolean;
  /** "How to build the answer": two or three steps, collapsed (CLAUDE.md #55). */
  steps: string[];
  /** The Materi cards this question draws on (CLAUDE.md #11). */
  refs: string[];
  /** The mentor's model answer, per field key. Shown only behind the mentor passcode. */
  model: Record<string, string>;
  /** An example answer on ANOTHER company (CLAUDE.md #23): shows the shape, never the answer to this case. */
  example: string;
}

export interface CaseGroup {
  heading: string;
  points: string[];
}

export interface Block {
  id: '1.1' | '1.2' | '2.1' | '3.1';
  title: string;
  /** The plan row this block answers. */
  planRow: string;
  level: 1 | 2 | 3;
  /** The name of the plan's case. */
  caseName: string;
  intro: string;
  groups: CaseGroup[];
  items: Item[];
  /** The plan's "Ziel", in plain words. */
  aim: string;
  /** DRAFT estimate (DL: tasks 15, 15, 20 min). */
  minutes: number;
}

export interface Card {
  id: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'B1' | 'B2';
  route: 1 | 2;
  title: string;
  /** One line: what the card is about. */
  scan: string;
  /** DRAFT estimate; the route's cards add up to its hour or say what the rest is. */
  minutes: number;
  /** "In plain words" (CLAUDE.md #22), three parts. */
  plain: { words: string[]; why: string; read: string };
  /** The plan's own bullets this card carries, rephrased and explained; nothing the plan does not name. */
  body: { heading: string; points: string[] }[];
  /** "How to decide when this comes up in the task" (CLAUDE.md #11). */
  rules: string[];
  /** Real sources; to be checked by a person before a course run. */
  sources: string[];
  /** The plan bullet(s) this card covers (German, as in the plan). */
  planRef: string;
}

export interface GlossEntry {
  term: string;
  /** Other written forms that should link to the same entry. */
  match?: string[];
  plain: string;
  example?: string;
}

export interface FacilitatorCard {
  id: string;
  after: string;
  openLabel: string;
  sections: { kicker: string; items: string[] }[];
}
