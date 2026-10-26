import { LESSON_TEXTS } from "@/components/sim/lessonText";
import type { Blk, Item, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/** Pages for the lessons of a made-up course (the eight lessons of `lessonText.ts`), so a lesson in a list opens a real lesson and "Next" leads to the next one (DL-STANDARD v1.7). */
export function lessonPages(n: number, o: { prefix?: string; size?: number; leading?: number; back: string; extra?: (i: number) => Blk[] }): Record<string, PPage> {
  const p = o.prefix ?? "lesson";
  const texts = LESSON_TEXTS();
  const out: Record<string, PPage> = {};
  for (let i = 0; i < n; i++) {
    const links: Item[] = [];
    if (i + 1 < n) links.push({ label: tt(`Next: ${texts[i + 1].title}`, `Weiter: ${texts[i + 1].title}`), go: `${p}${i + 1}` });
    links.push({ label: tt("Back to the course", "Zurück zum Kurs"), go: o.back });
    out[`${p}${i}`] = {
      title: texts[i].title,
      crumb: texts[i].title,
      blocks: [{ t: "h", text: texts[i].title }, { t: "p", text: texts[i].text, size: o.size, leading: o.leading }, ...(o.extra ? o.extra(i) : []), { t: "links", items: links, size: o.size }],
    };
  }
  return out;
}

/** The list entries that open those lessons, ticked once visited. */
export function lessonItems(n: number, o: { prefix?: string; sub?: string } = {}): Item[] {
  const p = o.prefix ?? "lesson";
  return LESSON_TEXTS().slice(0, n).map((l, i) => ({ label: `${i + 1}. ${l.title}`, go: `${p}${i}`, track: true, sub: o.sub }));
}

export const lessonKeys = (n: number, prefix = "lesson") => Array.from({ length: n }, (_, i) => `${prefix}${i}`);
