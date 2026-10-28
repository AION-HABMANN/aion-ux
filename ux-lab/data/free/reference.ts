import type { ReferenceSpec } from "@/components/sim/ReferencePlatform";
import { t, tt } from "@/lib/lang";

/**
 * The reference platform of Block 2.1 and the Level 3 block (DL-STANDARD v1.9, section 16), the shared builder for Days 12 and later: a day writes its real platform's rows once
 * (every row observed on the real pages on the date printed) and gets the two windows and the two passcode-gated facilitator cards from one source of text, so they cannot drift.
 * A row that the real pages do not support is not written; nothing is filled in from memory. Days 10 and 11 hold the same shape in their own files.
 */
export type P = [string, string];
export type RefRow = { topic: P; problem: P; did: P; where: P; url: string; shot?: string };
export type RefDef = {
  /** The real company or site, e.g. "Khan Academy". */
  name: string;
  /** The date of the visit, printed on the window. */
  visit: string;
  site: { url: string; page: P; shot: string; note: P; phone?: boolean };
  intro21: P;
  intro31: P;
  rows21: RefRow[];
  rows31: RefRow[];
  discuss21: P[];
  discuss31: P[];
};

const pick = (p: P) => tt(p[0], p[1]);

/**
 * One block's window with its own real platform (UX Day 9: one platform for Block 2.1, another for Block 3.1; section 16 allows one platform per block). English first
 * (UX-STANDARD decision 4): a plain string stands for both languages.
 */
type S = string | P;
const pr = (s: S): P => (typeof s === "string" ? [s, s] : s);
export type BlockRefRow = { topic: S; problem: S; did: S; where: S; url: string; shot?: string };
export function defineBlockReference(block: "2.1" | "3.1", def: { name: string; visit: string; site: { url: string; page: S; shot: string; note: S; phone?: boolean }; intro: S; rows: BlockRefRow[]; discuss: S[] }) {
  const rows: RefRow[] = def.rows.map((r) => ({ topic: pr(r.topic), problem: pr(r.problem), did: pr(r.did), where: pr(r.where), url: r.url, shot: r.shot }));
  const discuss = def.discuss.map(pr);
  const both = defineReference({
    name: def.name,
    visit: def.visit,
    site: { url: def.site.url, page: pr(def.site.page), shot: def.site.shot, note: pr(def.site.note), phone: def.site.phone },
    intro21: pr(def.intro),
    intro31: pr(def.intro),
    rows21: rows,
    rows31: rows,
    discuss21: discuss,
    discuss31: discuss,
  });
  return block === "2.1" ? { REF: both.REF_21, CARD: both.REF_CARD_21 } : { REF: both.REF_31, CARD: both.REF_CARD_31 };
}

export function defineReference(def: RefDef) {
  const spec = (intro: P, rows: RefRow[], discuss: P[]): ReferenceSpec => ({
    name: def.name,
    visit: def.visit,
    intro: pick(intro),
    site: { url: def.site.url, page: pick(def.site.page), shot: def.site.shot, note: pick(def.site.note), phone: def.site.phone },
    rows: rows.map((r) => ({ topic: pick(r.topic), problem: pick(r.problem), did: pick(r.did), where: pick(r.where), url: r.url, shot: r.shot })),
    discuss: discuss.map(pick),
  });
  const card = (id: string, after: string, rows: RefRow[], discuss: P[]) => ({
    id,
    after,
    ariaLabel: t("Reference platform for the facilitator", "Referenzplattform für die Moderation"),
    openLabel: t("Reference platform · the analysis for the discussion", "Referenzplattform · die Analyse für die Diskussion"),
    hideLabel: t("Hide the reference analysis", "Die Referenzanalyse ausblenden"),
    sections: [
      {
        kicker: t(`${def.name} · observed on ${def.visit}: open the live pages before the session, they may have changed`, `${def.name} · beobachtet am ${def.visit}: Öffnen Sie die Live-Seiten vor der Sitzung, sie können sich geändert haben`),
        items: rows.map((r) => t(`${r.problem[0]} → ${r.did[0]} (${r.where[0]})`, `${r.problem[1]} → ${r.did[1]} (${r.where[1]})`)),
      },
      { kicker: t("Discussion prompts", "Diskussionsfragen"), items: discuss.map((d) => t(d[0], d[1])) },
    ],
  });
  return {
    REF_21: (): ReferenceSpec => spec(def.intro21, def.rows21, def.discuss21),
    REF_31: (): ReferenceSpec => spec(def.intro31, def.rows31, def.discuss31),
    REF_CARD_21: card("ref-card-21", "2.1", def.rows21, def.discuss21),
    REF_CARD_31: card("ref-card-31", "3.1", def.rows31, def.discuss31),
  };
}
