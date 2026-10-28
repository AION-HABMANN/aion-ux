"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { SimDialog } from "@/components/sim/SimFrame";
import { tt } from "@/lib/lang";

/**
 * The reference platform (DL-STANDARD v1.9, section 16): under the case platform of Block 2.1 and in the Level 3 block, a quiet second button opens a real platform that
 * already handles the case's problem, for the class discussion. Three tabs: the real site (a dated screenshot and a link that opens it in a new tab), a table "problem of
 * the case → what the real platform does → where to see it", and discussion prompts. Every row is something observed on the real pages on the date printed; nothing is
 * marked, checked or exported, and the course makes no claim about the company. Content per block comes from `data/dayN/reference.ts`.
 */
export type RefRow = { topic: string; problem: string; did: string; where: string; url: string; shot?: string };
export type ReferenceSpec = {
  /** The real company, e.g. "Khan Academy". */
  name: string;
  /** The date of the visit, printed (German format in both languages, as on the site). */
  visit: string;
  /** What the real platform is and why it is here, in the block's terms. */
  intro: string;
  site: { url: string; page: string; shot: string; note: string; /** The screenshot is a phone screen: shown narrow, not stretched. */ phone?: boolean };
  rows: RefRow[];
  discuss: string[];
};

const base = () => process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function SiteTab({ spec }: { spec: ReferenceSpec }) {
  return (
    <div className="space-y-2 p-3">
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate rounded bg-[#F4F6F9] px-2 py-1 text-[12px] text-[#5F5E5A]">{spec.site.url}</span>
        <a href={spec.site.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded bg-[#3F4A58] px-3 py-2 text-[12px] font-semibold text-white underline underline-offset-2">
          {tt("Open the real site ↗", "Echte Seite öffnen ↗")}
        </a>
      </div>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${base()}${spec.site.shot}`} alt={tt(`Screenshot of ${spec.name}: ${spec.site.page}`, `Screenshot von ${spec.name}: ${spec.site.page}`)} className={spec.site.phone ? "mx-auto block max-h-[560px] w-auto max-w-[300px] rounded border border-[#C9D0DA]" : "w-full rounded border border-[#C9D0DA]"} />
        <figcaption className="mt-1 text-center text-[12px] text-[#5F5E5A]">
          {tt(`Screenshot of ${spec.site.page}, taken on ${spec.visit}.`, `Screenshot von ${spec.site.page}, aufgenommen am ${spec.visit}.`)} {spec.site.note}
        </figcaption>
      </figure>
    </div>
  );
}

function TableTab({ spec }: { spec: ReferenceSpec }) {
  return (
    <div className="p-3">
      <table className="w-full border-collapse text-[13px]">
        <thead className="hidden sm:table-header-group">
          <tr className="bg-[#EEF1F5] text-left">
            <th className="border border-[#D9DEE6] px-2 py-1.5">{tt("Problem of the case", "Problem des Falls")}</th>
            <th className="border border-[#D9DEE6] px-2 py-1.5">{tt(`What ${spec.name} does (observed ${spec.visit})`, `Was ${spec.name} macht (beobachtet am ${spec.visit})`)}</th>
            <th className="border border-[#D9DEE6] px-2 py-1.5">{tt("Where to see it", "Wo Sie es sehen")}</th>
          </tr>
        </thead>
        <tbody>
          {spec.rows.map((r) => (
            <tr key={r.problem} className="block border-b-2 border-[#D9DEE6] sm:table-row sm:border-b-0">
              <td className="block border-[#D9DEE6] px-2 py-1.5 align-top sm:table-cell sm:w-[24%] sm:border">
                <span className="font-semibold">{r.problem}</span>
                <span className="mt-1 block text-[11px] text-[#5F5E5A]">{r.topic}</span>
              </td>
              <td className="block border-[#D9DEE6] px-2 py-1.5 align-top sm:table-cell sm:border">{r.did}</td>
              <td className="block border-[#D9DEE6] px-2 py-1.5 align-top sm:table-cell sm:w-[28%] sm:border">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{r.where} ↗</a>
                {r.shot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${base()}${r.shot}`} alt={tt(`Screenshot: ${r.where}`, `Screenshot: ${r.where}`)} loading="lazy" className="mt-1.5 max-h-[150px] w-full rounded border border-[#D9DEE6] object-cover object-top" />
                ) : (
                  <span className="mt-1 block text-[11px] italic text-[#5F5E5A]">{tt("A text page: open the link.", "Eine Textseite: Öffnen Sie den Link.")}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DiscussTab({ spec }: { spec: ReferenceSpec }) {
  return (
    <div className="space-y-2 p-3 text-[14px]">
      <ol className="list-decimal space-y-2 pl-5">{spec.discuss.map((d) => <li key={d}>{d}</li>)}</ol>
      <p className="text-[12px] text-[#5F5E5A]">{tt("For the live session. There is no field here; nothing is checked or exported.", "Für die gemeinsame Sitzung. Hier gibt es kein Feld; nichts wird geprüft oder exportiert.")}</p>
    </div>
  );
}

function Window({ spec }: { spec: ReferenceSpec }) {
  const [tab, setTab] = useState<"site" | "table" | "discuss">("site");
  const tabs = [
    ["site", tt("1 · The real site", "1 · Die echte Seite")],
    ["table", tt("2 · Problem → what they did → where to see it", "2 · Problem → was sie tun → wo Sie es sehen")],
    ["discuss", tt("3 · Discuss together", "3 · Gemeinsam diskutieren")],
  ] as const;
  return (
    <div className="text-[#26323F]">
      <div className="space-y-1 border-b border-[#E3D9B8] bg-[#FBF6E6] px-4 py-3 text-[13px]">
        <p className="font-semibold">{tt(`A real platform: ${spec.name} · not part of the case`, `Eine echte Plattform: ${spec.name} · nicht Teil des Falls`)}</p>
        <p>{spec.intro}</p>
        <p className="text-[12px] text-[#5F5E5A]">{tt(`The course makes no claim about the company. Everything here was observed on its public pages on ${spec.visit}; the live site may have changed since.`, `Der Kurs stellt keine Behauptung über das Unternehmen auf. Alles hier wurde am ${spec.visit} auf seinen öffentlichen Seiten beobachtet; die Website kann sich seitdem geändert haben.`)}</p>
      </div>
      <div role="tablist" aria-label={tt("Reference platform", "Referenzplattform")} className="flex flex-wrap gap-1 border-b border-[#D9DEE6] bg-[#F4F6F9] px-3 py-2">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={clsx("min-h-[40px] rounded px-3 text-left text-[13px]", tab === id ? "bg-[#3F4A58] font-semibold text-white" : "bg-white hover:bg-[#E8ECF2]")}>
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tab === "site" ? <SiteTab spec={spec} /> : tab === "table" ? <TableTab spec={spec} /> : <DiscussTab spec={spec} />}</div>
    </div>
  );
}

/** The quiet second button under "Open … and try it", and the window it opens. */
export function ReferenceButton({ spec }: { spec: ReferenceSpec }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={opener}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex min-h-[44px] w-full flex-col items-start gap-0.5 rounded-lg border-[1.5px] border-dashed border-accent bg-accentSoft px-3 py-2 text-left hover:bg-paper"
      >
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-accent">{tt("See how a real platform solved this", "Sehen Sie, wie eine echte Plattform das gelöst hat")}</span>
          <span className="rounded border border-accent bg-paper px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">{tt("Reference · for the class discussion", "Referenz · für die Diskussion in der Gruppe")}</span>
        </span>
        <span className="text-caption text-ash">{tt(`${spec.name}, opened together in class. Optional: there is nothing to answer here.`, `${spec.name}, gemeinsam in der Gruppe geöffnet. Optional: Hier ist nichts zu beantworten.`)}</span>
      </button>
      {open && (
        <SimDialog
          url={spec.site.url}
          title={tt(`Reference: ${spec.name}`, `Referenz: ${spec.name}`)}
          note={tt(`Reference · a real platform, not part of the case · observed on ${spec.visit} · nothing here is marked, checked or exported.`, `Referenz · eine echte Plattform, nicht Teil des Falls · beobachtet am ${spec.visit} · hier wird nichts markiert, geprüft oder exportiert.`)}
          onClose={() => {
            setOpen(false);
            window.setTimeout(() => opener.current?.focus(), 0);
          }}
        >
          {() => <Window spec={spec} />}
        </SimDialog>
      )}
    </>
  );
}
