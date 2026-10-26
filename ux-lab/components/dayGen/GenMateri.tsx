"use client";

import type { ComponentType, ReactNode } from "react";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import type { RefKey } from "@/data/references";
import type { DayMaterials } from "@/data/materialRegistry";
import type { MaterialId } from "@/data/materialTypes";
import { tt } from "@/lib/lang";
import { useCardMore } from "@/store/useCardMore";

/** What a generic day gives its Materi: the cards, the references of each block, the two intro lines and the reason the Optional card is folded. */
export type MateriCfg = {
  mats: DayMaterials;
  cards: Record<MaterialId, () => ReactNode>;
  refsA: RefKey[];
  refsB: RefKey[];
  /** Heading and lead of each block, in the active language (called on render). */
  texts: () => { headA: string; leadA: string; headB: string; leadB: string; optionalReason: string };
};

const NOTE = () =>
  tt(
    "Check every source before you teach from it: figures and models were checked in abstracts and summaries, not in the full works, and page numbers differ between printings.",
    "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Zahlen und Modelle wurden in Zusammenfassungen geprüft, nicht in den vollständigen Werken, und Seitenzahlen unterscheiden sich zwischen Auflagen.",
  );

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: ReactNode }) {
  const all = useCardMore((s) => s.all);
  const setAll = useCardMore((s) => s.setAll);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
        <button type="button" aria-pressed={all} onClick={() => setAll(!all)} className="btn-ghost btn-sm">
          {all ? tt("Hide the extra explanations", "Zusatzerklärungen ausblenden") : tt("Show every extra explanation and rule", "Alle Zusatzerklärungen und Regeln zeigen")}
        </button>
      </header>
      {children}
    </section>
  );
}

export function makeMateri(cfg: MateriCfg): { MateriA: ComponentType; MateriB: ComponentType } {
  const Cards = ({ block }: { block: "A" | "B" }) => (
    <>
      {cfg.mats.MATERIALS.filter((m) => m.block === block).map((m) =>
        m.optional ? (
          <OptionalSection key={m.id} id={cfg.mats.materialAnchorId(m.id)} title={`${m.id} · ${m.title}`} minutes={m.minutes} reason={cfg.texts().optionalReason}>
            {cfg.cards[m.id]()}
          </OptionalSection>
        ) : (
          <div key={m.id}>{cfg.cards[m.id]()}</div>
        ),
      )}
    </>
  );
  const MateriA = () => {
    const x = cfg.texts();
    return (
      <Block id="materi-a" title={tt("Materi A · 60 minutes, facilitator-led", "Materi A · 60 Minuten, moderiert")} intro={x.headA}>
        <p className="max-w-prose text-body text-ash">{x.leadA}</p>
        <Cards block="A" />
        <ReferencesAccordion block="A" keys={cfg.refsA} note={NOTE()} />
      </Block>
    );
  };
  const MateriB = () => {
    const x = cfg.texts();
    return (
      <Block id="materi-b" title={tt("Materi B · 60 minutes, facilitator-led", "Materi B · 60 Minuten, moderiert")} intro={x.headB}>
        <p className="max-w-prose text-body text-ash">{x.leadB}</p>
        <Cards block="B" />
        <ReferencesAccordion block="B" keys={cfg.refsB} note={NOTE()} />
      </Block>
    );
  };
  return { MateriA, MateriB };
}
