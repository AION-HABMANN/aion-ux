import { GLOSSARY, type GlossEntry } from '../../data/day9/support';

export interface GlossPart {
  text: string;
  entry?: GlossEntry;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sorted = [...GLOSSARY].sort((a, b) => b.term.length - a.term.length);
// a term may be followed by a plural s ("badges", "leaderboards")
const PATTERN = new RegExp(`\\b(${sorted.map((e) => escape(e.term)).join('|')})s?\\b`, 'gi');

/** Splits a text into plain parts and the first occurrence of each glossary term. */
export function splitGloss(text: string): GlossPart[] {
  const parts: GlossPart[] = [];
  const seen = new Set<string>();
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const entry = sorted.find((e) => e.term === m[1].toLowerCase());
    if (!entry || seen.has(entry.term)) continue;
    seen.add(entry.term);
    if (m.index! > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ text: m[0], entry });
    last = m.index! + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts.length ? parts : [{ text }];
}
