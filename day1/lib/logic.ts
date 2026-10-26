import { anchors, type Block, type Field, type Item } from '@/data/day1';

export type Answers = Record<string, string>;

export interface Missing {
  block: string;
  n: number;
  /** A concrete, named item, never a generic "complete the required fields" (CLAUDE.md #1). */
  text: string;
  /** Where a click on it jumps (CLAUDE.md #2). */
  target: string;
}

const lineCount = (v: string) => v.split('\n').filter((l) => l.trim().length > 0).length;

/** Is one field filled in enough? Completeness only: a choice that differs from the model is never "missing" (CLAUDE.md #38). */
export function fieldDone(f: Field, v: string): boolean {
  const s = (v ?? '').trim();
  if (f.kind === 'pick') return s.length > 0;
  if (f.kind === 'lines') return lineCount(s) >= f.min;
  return s.length >= f.min;
}

/** What is still missing in one question, or null when it is complete. */
export function itemMissing(item: Item, answers: Answers): string | null {
  if (item.anyOf) {
    return item.fields.some((f) => (answers[f.key] ?? '').trim().length >= f.min) ? null : 'write at least one problem under a category';
  }
  const open = item.fields.filter((f) => !fieldDone(f, answers[f.key] ?? ''));
  if (!open.length) return null;
  return open
    .map((f) => {
      const v = (answers[f.key] ?? '').trim();
      if (f.kind === 'pick') return `choose ${f.label.toLowerCase()}`;
      if (f.kind === 'lines') return `${f.label.toLowerCase().replace(/, one per line|, most important first/, '')}: write at least ${f.min} lines, one per line (${lineCount(v)} so far)`;
      return v ? `${f.label}: a little more, please` : `${f.label}`;
    })
    .join('; ');
}

export function blockMissing(block: Block, answers: Answers): Missing[] {
  return block.items.flatMap((item) => {
    const why = itemMissing(item, answers);
    if (!why) return [];
    const first = item.anyOf ? item.fields[0] : item.fields.find((f) => !fieldDone(f, answers[f.key] ?? '')) ?? item.fields[0];
    return [{ block: block.id, n: item.n, text: `Block ${block.id}, question ${item.n}: ${why}`, target: anchors.field(first.key) }];
  });
}

export const routeMissing = (blocks: Block[], answers: Answers): Missing[] => blocks.flatMap((b) => blockMissing(b, answers));

export function totals(blocks: Block[], answers: Answers): { done: number; total: number } {
  const total = blocks.reduce((n, b) => n + b.items.length, 0);
  return { total, done: total - routeMissing(blocks, answers).length };
}

export const keysOf = (blocks: Block[]): string[] => blocks.flatMap((b) => b.items.flatMap((i) => i.fields.map((f) => f.key)));

/** The mentor's model answers for the given blocks, as one object to merge into the answers. */
export function modelAnswers(blocks: Block[]): Answers {
  const out: Answers = {};
  for (const b of blocks) for (const i of b.items) for (const f of i.fields) out[f.key] = i.model[f.key] ?? '';
  return out;
}
