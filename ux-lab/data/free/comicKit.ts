import { t } from "@/lib/lang";

/**
 * Builders for the story comics of a day (DL-STANDARD.md section 13): a panel and a comic are written as compact pairs `[en, de]`, both languages by hand
 * (CLAUDE.md #32), and become the `Comic` the modal shows once the day wraps them in `bi(...)`. The drawings are in the day's `comicScenes.tsx`.
 */
/** A text: a plain English string, or a pair `[en, de]` once a German version is written. */
export type P = string | [en: string, de?: string];
const tx = (p: P) => (typeof p === "string" ? t(p) : t(p[0], p[1]));
type Say = [by: string, text: P, think?: boolean];

export const panel = (o: { art: string; scene: P; say: Say[]; tag: ["plain" | "teal" | "ink", P]; means: P; look?: P }) => ({
  art: o.art,
  scene: tx(o.scene),
  speech: o.say.map(([by, text, think]) => ({ by, text: tx(text), ...(think ? { think: true } : {}) })),
  tag: { tone: o.tag[0], text: tx(o.tag[1]) },
  means: tx(o.means),
  ...(o.look ? { look: tx(o.look) } : {}),
});

export const comicOf = (o: { id: string; title: P; teaser: P; note: P; names: Record<string, P>; panels: ReturnType<typeof panel>[] }) => ({
  id: o.id,
  pixel: true as const,
  title: tx(o.title),
  teaser: tx(o.teaser),
  note: tx(o.note),
  names: Object.fromEntries(Object.entries(o.names).map(([k, v]) => [k, tx(v)])),
  panels: o.panels,
});
