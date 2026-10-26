'use client';

import { Fragment, useMemo, useState } from 'react';
import { GLOSSARY } from '@/data/day1';

/**
 * Plain-language glossary (CLAUDE.md #19): the first time a term appears in a text it becomes a button that opens a plain
 * explanation right under the text. Automatic, so a new word in a card or a task cannot be forgotten.
 */
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const FORMS = GLOSSARY.flatMap((g) => (g.match ?? [g.term]).map((m) => ({ m, g }))).sort((a, b) => b.m.length - a.m.length);
const RE = new RegExp(`(?<![\\w-])(${FORMS.map((f) => esc(f.m)).join('|')})(?![\\w-])`, 'gi');

export function Gloss({ children, className }: { children: string; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const parts = useMemo(() => {
    const out: { text: string; term?: string }[] = [];
    const seen = new Set<string>();
    let last = 0;
    for (const m of children.matchAll(RE)) {
      const form = FORMS.find((f) => f.m.toLowerCase() === m[0].toLowerCase());
      if (!form || seen.has(form.g.term)) continue;
      seen.add(form.g.term);
      out.push({ text: children.slice(last, m.index) });
      out.push({ text: m[0], term: form.g.term });
      last = (m.index ?? 0) + m[0].length;
    }
    out.push({ text: children.slice(last) });
    return out;
  }, [children]);
  const entry = open ? GLOSSARY.find((g) => g.term === open) : null;
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.term ? (
          <button key={i} type="button" className="gloss" aria-expanded={open === p.term} onClick={() => setOpen(open === p.term ? null : p.term!)}>
            {p.text}
          </button>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
      {entry ? (
        <span role="note" className="insight mt-2 block rounded bg-accentSoft px-3 py-2 text-caption text-ink">
          <strong>{entry.term}.</strong> {entry.plain}
          {entry.example ? <span className="block text-ash">For example: {entry.example}</span> : null}
          <button type="button" className="ml-2 underline" onClick={() => setOpen(null)}>
            Close
          </button>
        </span>
      ) : null}
    </span>
  );
}
