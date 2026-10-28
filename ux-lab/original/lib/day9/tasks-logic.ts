/**
 * Completeness of the Day 9 task answers. Pure functions, no React.
 * Checks are for completeness only: an empty field, a list with too few lines, an answer
 * that is too short. A choice that differs from anyone's model is never "missing", and
 * nothing is marked right or wrong (UX-STANDARD section 1, DL-STANDARD section 1).
 */
import { TASKS, type TaskDef, type TaskField, type TaskItem } from '../../data/day9/tasks';

export type Answers = Record<string, string>;

export interface Missing {
  task: TaskDef['id'];
  item: number;
  /** DOM id of the first field that is not complete (the jump target). */
  fieldKey: string;
  /** Plain words, e.g. "Task 1, item 2: 3 of 5 points". */
  text: string;
}

export const DEFAULT_MIN_CHARS = 15;

export const lineCount = (v: string | undefined): number => (v ?? '').split('\n').filter((l) => l.trim().length > 0).length;

export function fieldDone(f: TaskField, answers: Answers): boolean {
  const v = (answers[f.key] ?? '').trim();
  if (f.kind === 'pick') return v.length > 0;
  if (f.kind === 'lines') return lineCount(v) >= (f.min ?? 1);
  return v.length >= (f.min ?? DEFAULT_MIN_CHARS);
}

const where = (task: TaskDef, item: TaskItem) => `Task ${task.id.slice(1)}, item ${item.n}`;

export function itemMissing(task: TaskDef, item: TaskItem, answers: Answers): Missing | null {
  if (item.anyOf) {
    if (item.fields.some((f) => fieldDone(f, answers))) return null;
    return { task: task.id, item: item.n, fieldKey: item.fields[0].key, text: `${where(task, item)}: assign at least one observation to a category` };
  }
  const bad = item.fields.find((f) => !fieldDone(f, answers));
  if (!bad) return null;
  let why = 'write a little more';
  if (bad.kind === 'pick') why = 'choose one';
  else if (bad.kind === 'lines') why = `${lineCount(answers[bad.key])} of ${bad.min ?? 1} points`;
  else if ((answers[bad.key] ?? '').trim().length === 0) why = `“${bad.label}” is empty`;
  return { task: task.id, item: item.n, fieldKey: bad.key, text: `${where(task, item)}: ${why}` };
}

export function taskMissing(task: TaskDef, answers: Answers): Missing[] {
  return task.items.map((i) => itemMissing(task, i, answers)).filter((m): m is Missing => m !== null);
}

const only = (ids?: readonly TaskDef['id'][]) => (ids ? TASKS.filter((t) => ids.includes(t.id)) : TASKS);

/** What is missing, for all tasks or only for the given ones (a route). */
export function allMissing(answers: Answers, ids?: readonly TaskDef['id'][]): Missing[] {
  return only(ids).flatMap((t) => taskMissing(t, answers));
}

export function totals(answers: Answers, ids?: readonly TaskDef['id'][]): { done: number; total: number } {
  const total = only(ids).reduce((n, t) => n + t.items.length, 0);
  return { total, done: total - allMissing(answers, ids).length };
}

/** Every answer key that belongs to the given tasks. */
export function keysOf(ids: readonly TaskDef['id'][]): string[] {
  return only(ids).flatMap((t) => t.items.flatMap((i) => i.fields.map((f) => f.key)));
}
