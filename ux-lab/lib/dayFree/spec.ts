import type { MaterialId } from "@/data/materialTypes";
import type { ReactNode } from "react";
import type { ComponentType } from "react";
import { bi } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/** The same shape as a resolved spec, but any string may be a `t(en, de)`: a day writes its data like this and `defineSpec` resolves it. */
export type Raw<T> = T extends string ? string | Tx : T extends readonly (infer U)[] ? Raw<U>[] : T extends object ? { [K in keyof T]: Raw<T[K]> } : T;

/**
 * The shape of a "free-form day" (DL-STANDARD v1.1; Days 4 to 6 and later). A day is described once, as data, in `data/dayN/free.ts`, with every text written
 * as `t(en, de)` and the whole object wrapped in `bi(...)`, so every string below is the text of the active language at read time (CLAUDE.md #32). The shared
 * engine (components/dayFree, lib/dayFree) draws both routes, derives the missing lists, the progress ring, the export documents, the mentor fill, the answer
 * keys and the worked answers from it. The pictures and simulations of a day stay in `components/dayN` and are plugged in through `slots`.
 */

export type Guide = { example: string; why: string; lookFor: string[]; pitfalls?: string[] };

/**
 * The guidance of a guided table (DL-STANDARD section 15): a hint for every column (`first` for the row header), one grey example row from another company
 * (never the case's answer) and optional suggestions per column. The engine adds the title and the label of the example in both languages.
 */
export type GuideSpec = {
  hints: Record<string, string>;
  example: { first?: string; cells: Record<string, string> };
  suggest?: Record<string, { values: { id: string; label: string }[]; note: string }>;
};
type Col = { key: string; label: string; /** a column that holds a short answer by design ("Yes", "Users"): two characters count */ short?: boolean };

/**
 * A text field that can also be answered as a guided table (section 15): `rows` is a list of items the learner adds to (the data you need, a roadmap,
 * the risks), `frame` is a decision in fixed parts (what you decide, what you do not know, when you would reverse it). The text stays the default;
 * both layouts are kept and only the chosen one counts and is exported.
 */
export type TextTable =
  | {
      kind: "rows";
      help: string;
      cols: Col[];
      numbered?: boolean;
      orderHead?: string;
      guide: GuideSpec;
      model: Record<string, string>[];
      /** "name the data you need in at least two complete rows": what is missing when fewer than two rows are complete */
      missing: string;
      /** "data row": the name of a row in "finish data row 3 or clear it" */
      rowWord: string;
    }
  | {
      kind: "frame";
      help: string;
      head: string;
      cols: Col[];
      rows: { key: string; label: string }[];
      guide: GuideSpec;
      /** one record per row, in the order of `rows` */
      model: Record<string, string>[];
      /** the shortest cell that counts (a sentence: 20) */
      minCell: number;
      missing: string;
    };
export type Ref = { label: string; value: string; target: string; card?: MaterialId };

type Base = {
  id: string;
  label: string;
  help: string;
  /** "How to build the answer": two or three steps (CLAUDE.md #55 section 1). */
  steps: string[];
  refs?: Ref[];
  /** "Question 1 of 3", written by the day. */
  qLabel?: string;
  /** The name of a slot (a picture or a simulation) rendered just above this field. */
  slot?: string;
};

export type TextField = Base & {
  kind: "text";
  min: number;
  rows: number;
  placeholder?: string;
  /** What is missing, as a sentence without the block prefix and without the length: "say why you prefer it". */
  missing: string;
  model: string;
  guide: Guide;
  /** The heading of this answer in the export. */
  doc?: string;
  /** The guided table offered through the quiet link (section 15). */
  table?: TextTable;
};

/** A list of N items, one text box by default (one item per line) or a table through a quiet link; both layouts are kept and only the chosen one counts. */
export type ListsField = Base & {
  kind: "lists";
  n: number;
  lists: { id: string; label: string; help: string; placeholder?: string; missing: string; model: string; guide: Guide; doc: string }[];
  table: { help: string; cols: { key: string; label: string }[]; model: Record<string, string>[]; doc?: string; guide?: GuideSpec };
};

/** One answer per item (an option) on the same terms, as a box each or a table row. */
export type AssessField = Base & {
  kind: "assess";
  helpText: string;
  helpTable: string;
  firstCol: string;
  itemWord: string;
  items: { id: string; label: string }[];
  cols: { key: string; label: string }[];
  minText: number;
  /** the hints, the example row and the suggestions of the table layout (section 15) */
  tableGuide?: GuideSpec;
  missing: string;
  modelText: Record<string, string>;
  modelRows: Record<string, Record<string, string>>;
  guide: Guide;
  doc: string;
};

/** A choice among the plan's own options (platform A or B, option A, B or C, yes, partly or no). */
export type PickField = Base & {
  kind: "pick";
  options: { id: string; label: string; expected: boolean; why: string }[];
  cols?: 1 | 2;
  optionsLabel: string;
  missing: string;
  model: string;
  keyTitle: string;
  teaching: string;
  doc: string;
};

export type FreeField = TextField | ListsField | AssessField | PickField;

export type BlockSpec = {
  /** "1.1" */
  id: string;
  title: string;
  findIt: string;
  refs: MaterialId[];
  minutes: number;
  /** A short paragraph under the title (what you see and what to do). */
  lead?: string;
  /** Slots rendered before the first field, in order. */
  slots?: string[];
  fields: FreeField[];
  /** The heading of this block in the exported file. */
  doc: string;
};

export type FacilitatorSpec = {
  id: string;
  /** Rendered after the block with this id, or right after the case brief when it is "brief". */
  after: string;
  ariaLabel: string;
  openLabel: string;
  hideLabel: string;
  sections: { kicker: string; items?: string[]; qa?: { q: string; a: string }[] }[];
};

export type Brief = {
  heading: string;
  readTime: string;
  paragraph: string;
  /** The limits and conditions of the plan, as a list. */
  conditions: { title: string; items: string[] };
  runTitle: string;
  run: string[];
  /** "What is known and what is open" (DL-STANDARD section 14): the plan's facts, what is clear (a Case assumption) and what is open on purpose. */
  known?: { title: string; columns: { title: string; items: string[] }[]; note: string };
  assumption: string;
};

export type FreeSpec = {
  day: number;
  caseName: string;
  role: string;
  heading: string;
  intro: {
    about: string;
    caseLine: string;
    story: { route: 1 | 2; verb: string; question: string; output: string }[];
    wiifm: { route: 1 | 2; skill: string; payoff: string }[];
  };
  route1: { title: string; blurb: string; kicker: string; h1: string; order: string; materiSub: string; part1: { title: string; level: string }; part2: { title: string; level: string }; part2Before: string };
  route2: { title: string; blurb: string; kicker: string; h1: string; order: string; materiSub: string; subject: string; to: string };
  brief1: Brief;
  brief2: Brief;
  /** Route 1: the blocks in order; `part2Before` of route1 names the block id where Part 2 starts. */
  blocks1: BlockSpec[];
  /** Route 2: one block. */
  block2: BlockSpec;
  cards: FacilitatorSpec[];
  /** Route 2's soft pointer: the Route 1 field it quotes (a pick) and the words around it. */
  pointer?: { block: string; field: string; lead: string; open: string; none: string; docLead: string };
};

/** What a day's component folder hands the engine: its study cards and its pictures and simulations. */
export type FreeKit = {
  MateriA: ComponentType;
  MateriB: ComponentType;
  slots: Record<string, () => ReactNode>;
};

/** A day writes its spec with `t(en, de)` and wraps it here, so every string is the text of the active language at read time (CLAUDE.md #32). */
export const defineSpec = (raw: Raw<FreeSpec>): FreeSpec => bi(raw) as unknown as FreeSpec;

