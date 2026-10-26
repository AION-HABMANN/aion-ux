import { getLang } from "@/lib/lang";
import { GLOSSARY_D1 } from "@/data/gloss/day1";
import { GLOSSARY_D2 } from "@/data/gloss/day2";
import { GLOSSARY_D3 } from "@/data/gloss/day3";

/**
 * Plain-language glossary (CLAUDE.md #19, #49): every technical term, abbreviation or foreign word that the material or a task uses is an entry here. In the
 * text it becomes a dotted link; a click opens the explanation. Written for someone who is not an expert: short sentences, everyday words, one example where it
 * helps. A day keeps its entries in `data/gloss/dayN.ts`; a term is entered once, by the first day that uses it. English first; `de` when it is written.
 * An all-capitals match ("UX") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [...GLOSSARY_D1, ...GLOSSARY_D2, ...GLOSSARY_D3];

// --- lookup (unchanged from Digital Learning) ---------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const keys = [...lookup.keys()];
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${(keys.length ? keys : ["\u0000"])
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
