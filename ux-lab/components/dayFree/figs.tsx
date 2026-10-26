"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The teaching figures of the free-form days (DL-STANDARD v1.4): "The point", the picture with the learner's own controls, and an always-visible "What this shows"
 * (CLAUDE.md #20, #36). The story of a card is its pixel comic (DL-STANDARD section 13), so these figures carry no walk-through. A weighing figure rates a measure
 * on three questions with a reason and prints no cost (section 6: no effort rule by cost).
 */
const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ one picture with several states, chosen by buttons (exclusive) */

export type FigState = { id: string; button: string; picture: ReactNode; insight: string };

export function StateFig({ label, point, states, caption }: { label: string; point: string; states: FigState[]; caption?: ReactNode }) {
  const [cur, setCur] = useState(states[0].id);
  const st = states.find((s) => s.id === cur) ?? states[0];
  return (
    <Diagram label={label} caption={caption}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <div role="radiogroup" aria-label={tt("Choose a version", "Wählen Sie eine Fassung")} className="flex flex-wrap gap-2">
          {states.map((s) => (
            <Btn key={s.id} on={cur === s.id} onClick={() => setCur(s.id)}>
              {s.button}
            </Btn>
          ))}
        </div>
        <div className="mx-auto max-w-[440px]">{st.picture}</div>
        <Insight>{st.insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ one picture with several switches (each on or off) */

export type FigSwitch = { id: string; label: string };

export function SwitchFig({
  label,
  point,
  switches,
  start,
  picture,
  insight,
  caption,
}: {
  label: string;
  point: string;
  switches: FigSwitch[];
  start: Record<string, boolean>;
  picture: (on: Record<string, boolean>) => ReactNode;
  insight: (on: Record<string, boolean>) => string;
  caption?: ReactNode;
}) {
  const [on, setOn] = useState<Record<string, boolean>>(start);
  return (
    <Diagram label={label} caption={caption}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <div role="group" aria-label={tt("Switch each part on or off", "Schalten Sie jeden Teil ein oder aus")} className="flex flex-wrap gap-2">
          {switches.map((s) => (
            <Btn key={s.id} on={!!on[s.id]} onClick={() => setOn((o) => ({ ...o, [s.id]: !o[s.id] }))}>
              <span aria-hidden className="mr-1.5">{on[s.id] ? "☑" : "☐"}</span>
              {s.label}
            </Btn>
          ))}
        </div>
        <div className="mx-auto max-w-[440px]">{picture(on)}</div>
        <Insight>{insight(on)}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ a worked example: three measures weighed (A5 of every day) */

export type Level = 1 | 2 | 3;
export type WeighItem = {
  id: string;
  name: string;
  thumb?: ReactNode;
  impact: { level: Level; reason: string; note?: string };
  risk: { level: Level; reason: string };
  effort: { level: Level; reason: string };
};

/** The example company weighs three measures on user impact, risk and effort, each with a reason. Nothing is printed as a cost. */
export function WeighFig({ label, point, company, context, impactLabel, items, order = ["impact", "risk", "effort"] }: { label: string; point: string; company: string; context: string; impactLabel: string; items: WeighItem[]; /** the order of the three columns, as the day's task asks them */ order?: ("impact" | "risk" | "effort")[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = items.map((it) => ({
    id: it.id,
    name: it.name,
    cells: {
      impact: { level: it.impact.level, reason: it.impact.reason, note: it.impact.note },
      risk: { level: it.risk.level, reason: it.risk.reason },
      effort: { level: it.effort.level, reason: it.effort.reason },
    },
  }));
  return (
    <Diagram label={label}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        {items.some((i) => i.thumb) && (
          <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
            {items.map((it) => (
              <div key={it.id}>
                {it.thumb}
                <p className="mt-1 text-caption font-semibold text-ink">{it.name}</p>
              </div>
            ))}
          </div>
        )}
        <OptionGrid
          label={`${company} · ${context}`}
          caption={tt(`Three measures for ${company} (Case assumption, example company)`, `Drei Maßnahmen für ${company} (Fallannahme, Beispielunternehmen)`)}
          rows={rows}
          cols={order.map((id) => ({ id, label: id === "impact" ? impactLabel : id === "risk" ? tt("Risk", "Risiko") : tt("Effort", "Aufwand") }))}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ a two-axis matrix */

export function MatrixStory({ label, point, title, xLabel, yLabel, quads, points }: { label: string; point: string; title: string; xLabel: string; yLabel: string; quads: [string, string, string, string]; points: MatrixPoint[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const cur = points.find((p) => p.id === sel);
  return (
    <Diagram label={label}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <MatrixFig title={title} xLabel={xLabel} yLabel={yLabel} quads={quads} points={points} selected={sel} onSelect={setSel} spot={null} />
        <Insight>
          {cur
            ? tt(`In plain words: ${cur.letter} · ${cur.name}. ${cur.reading}`, `In einfachen Worten: ${cur.letter} · ${cur.name}. ${cur.reading}`)
            : tt("Select a point to read why it sits where it does. A position is a reading of this example company, not a score.", "Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Eine Position ist eine Lesart dieses Beispielunternehmens, keine Note.")}
        </Insight>
      </div>
    </Diagram>
  );
}
