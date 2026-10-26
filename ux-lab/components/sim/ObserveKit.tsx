"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Avatar } from "@/components/sim/DeskSim";
import { SimButton } from "@/components/sim/SimFrame";
import { tt } from "@/lib/lang";

/**
 * "Observe the platform for real" (user request 2026-10-18, for the Digital Learning days, Route 2; DL-STANDARD section 4 "Route 2 windows"): beside the desk (a mail client), an optional window
 * onto the case platform as it is today, so the analysis can rest on something the learner has seen, not only on text. A window has tabs and each tab is a tool that looks like the real
 * one: the product itself (the same simulation as in Route 1, or another view of it), a support tool with the users' own words and what each ticket captured, an analytics console whose
 * reports show figures as bars or say that nothing is recorded, and, where the brief has competitors, a public page with a demo. Nothing is marked, nothing is ranked and no verdict is
 * shown; every view is a Case assumption made up from the brief's facts, and the figures appear only here, never in a task. The text of the task stays sufficient: the window is never required.
 */
export type ObserveView = { id: string; name: string; node: ReactNode };

function Tabs({ views }: { views: ObserveView[] }) {
  const [cur, setCur] = useState(views[0].id);
  const v = views.find((x) => x.id === cur) ?? views[0];
  return (
    <div className="text-[#26323F]">
      <div role="tablist" aria-label={tt("What you can look at", "Was Sie ansehen können")} className="flex flex-wrap gap-1 border-b border-[#D9DEE6] bg-[#F4F6F9] px-3 py-2">
        {views.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={cur === x.id} onClick={() => setCur(x.id)} className={clsx("min-h-[38px] rounded px-3 text-[13px]", cur === x.id ? "bg-[#3F4A58] font-semibold text-white" : "bg-white text-[#26323F] hover:bg-[#E8ECF2]")}>
            {x.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" key={v.id}>{v.node}</div>
    </div>
  );
}

/** The button under the desk that opens the window. `company` is the case platform; `views` come from the day. */
export function ObserveButton({ company, views }: { company: string; views: ObserveView[] }) {
  return (
    <SimButton
      label={tt("Observe the platform for real · optional", "Die Plattform wirklich beobachten · optional")}
      sub={tt(`Look around ${company} as it is today: the product, the support tickets, the admin reports. If the text is enough for you, skip this and write your answers.`, `Sehen Sie sich ${company} so an, wie es heute ist: das Produkt, die Support-Tickets, die Admin-Berichte. Wenn Ihnen der Text genügt, überspringen Sie das und schreiben Sie Ihre Antworten.`)}
      url={`observe.${company.toLowerCase()}.example/today`}
      title={tt(`Simulation: ${company} today`, `Simulation: ${company} heute`)}
      note={tt("Simulation · Case assumption: everything here, figures included, is made up from the brief's facts, except a tab marked “Real”, which shows a real company's own public page · nothing is marked, ranked or added up for you · you do not need it to answer.", "Simulation · Fallannahme: Alles hier, auch die Zahlen, ist aus den Fakten des Auftrags erfunden, außer einem Tab mit „Echt“, der die eigene öffentliche Seite eines echten Unternehmens zeigt · nichts wird für Sie markiert, eingestuft oder zusammengezählt · Sie brauchen es nicht, um zu antworten.")}
    >
      {() => <Tabs views={views} />}
    </SimButton>
  );
}

/* ------------------------------------------------------------------ what users say: a support ticket tool */

export type Voice = { who: string; meta: string; text: string; channel?: string; device?: string; page?: string; time?: string };

const CHANNELS = () => [tt("Contact form", "Kontaktformular"), tt("E-mail", "E-Mail"), tt("Chat", "Chat")];
const AGO = () => [tt("2 h ago", "vor 2 Std."), tt("yesterday", "gestern"), tt("2 days ago", "vor 2 Tagen"), tt("3 days ago", "vor 3 Tagen"), tt("last week", "letzte Woche")];

/**
 * The messages of users in their own words, as a support tool shows them: a list of tickets, the message with its time, and a context box with what the tool captured about it (channel,
 * device, page). What was not captured says "not captured": the learner sees what a ticket does and does not tell. Different voices, no summary, no verdict.
 */
export function VoicesView({ intro, voices }: { intro: string; voices: Voice[] }) {
  const [cur, setCur] = useState(0);
  const [read, setRead] = useState<number[]>([0]);
  const v = voices[cur];
  const ch = CHANNELS();
  const ago = AGO();
  const none = tt("not captured", "nicht erfasst");
  return (
    <div>
      <p className="border-b border-[#E3E6EC] bg-[#F7F8FA] px-3 py-2 text-[12px] text-[#5F5E5A]">{intro}</p>
      <div className="grid gap-0 md:grid-cols-[240px_minmax(0,1fr)]">
        <ul className="border-b border-[#D9DEE6] md:border-b-0 md:border-r" aria-label={tt("Tickets", "Tickets")}>
          {voices.map((x, i) => (
            <li key={x.who + i}>
              <button
                type="button"
                aria-current={cur === i}
                onClick={() => {
                  setCur(i);
                  setRead((r) => (r.includes(i) ? r : [...r, i]));
                }}
                className={clsx("flex min-h-[60px] w-full items-start gap-2 border-b border-[#E3E6EC] px-3 py-2 text-left", cur === i ? "bg-[#EEF1F5]" : "hover:bg-[#F7F8FA]")}
              >
                <Avatar name={x.who} size={30} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className={clsx("truncate text-[13px]", read.includes(i) ? "" : "font-bold")}>{x.who}</span>
                    <span className="shrink-0 text-[11px] text-[#5F6675]">{x.time ?? ago[i % ago.length]}</span>
                  </span>
                  <span className="block truncate text-[12px] text-[#5F5E5A]">{x.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="grid gap-3 p-3 lg:grid-cols-[1fr_190px]" aria-live="polite">
          <div className="space-y-2">
            <p className="text-[12px] text-[#5F5E5A]">{tt("Ticket", "Ticket")} #{1040 + cur} · <span className="rounded bg-[#E9EDF3] px-1.5 py-0.5 text-[11px]">{tt("Open", "Offen")}</span></p>
            <div className="flex gap-2">
              <Avatar name={v.who} size={34} />
              <div className="min-w-0 flex-1 rounded-lg rounded-tl-none border border-[#D9DEE6] bg-white p-3">
                <p className="text-[12px] text-[#5F5E5A]"><span className="font-semibold text-[#26323F]">{v.who}</span> · {v.time ?? ago[cur % ago.length]}</p>
                <p className="mt-1 text-[14px] leading-relaxed">“{v.text}”</p>
              </div>
            </div>
          </div>
          <dl className="space-y-1 self-start rounded border border-[#D9DEE6] bg-[#F7F8FA] p-2 text-[12px]">
            <dt className="font-semibold text-[#5F5E5A]">{tt("Context captured by the tool", "Vom Tool erfasster Kontext")}</dt>
            <dd><span className="text-[#5F6675]">{tt("Account", "Konto")}:</span> {v.meta}</dd>
            <dd><span className="text-[#5F6675]">{tt("Channel", "Kanal")}:</span> {v.channel ?? ch[cur % ch.length]}</dd>
            <dd><span className="text-[#5F6675]">{tt("Device", "Gerät")}:</span> {v.device ?? none}</dd>
            <dd><span className="text-[#5F6675]">{tt("Page", "Seite")}:</span> {v.page ?? none}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ what the platform records: an analytics console */

export type Bar = { label: string; value: number | null };
export type Report = { name: string; head?: string[]; rows?: string[][]; bars?: Bar[]; unit?: string; max?: number; note?: string };

/**
 * An analytics console: a list of reports, each opened on its own. A report that exists shows its figures as bars with the number at the end and, where it is a log, its rows as they are
 * (never added up for the reader); a report the platform does not have is greyed in the list and says so in one plain sentence. The learner sees what can and cannot be known. The figures
 * are made up for the case and printed only here, never in a task.
 */
export function RecordsView({ intro, reports }: { intro: string; reports: Report[] }) {
  const [cur, setCur] = useState(0);
  const r = reports[cur];
  const has = (x: Report) => !!(x.rows || x.bars);
  const max = r.bars ? (r.max ?? Math.max(...r.bars.map((b) => b.value ?? 0), 1)) : 1;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#2E3A4B] px-4 py-2 text-white">
        <span className="text-[14px] font-semibold">{tt("Admin console · Reports", "Admin-Konsole · Berichte")}</span>
        <span className="text-[12px] text-white/75">{tt("Period: last 30 days · figures are a Case assumption", "Zeitraum: letzte 30 Tage · Zahlen sind eine Fallannahme")}</span>
      </div>
      <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
        <div className="border-b border-[#D9DEE6] bg-[#F7F8FA] p-2 sm:border-b-0 sm:border-r">
          <p className="px-1 pb-1 text-[12px] text-[#5F5E5A]">{intro}</p>
          <ul aria-label={tt("Reports", "Berichte")}>
            {reports.map((x, i) => (
              <li key={x.name}>
                <button type="button" aria-current={cur === i} onClick={() => setCur(i)} className={clsx("flex min-h-[40px] w-full items-center justify-between gap-2 rounded px-2 py-1 text-left text-[13px]", cur === i ? "bg-white font-semibold shadow-sm" : "hover:bg-white", !has(x) && "text-[#5F6675]")}>
                  <span>{x.name}</span>
                  {!has(x) && <span className="shrink-0 rounded bg-[#E9EDF3] px-1.5 text-[10px] font-normal">{tt("no data", "keine Daten")}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 space-y-3 p-3">
          <h3 className="text-[15px] font-semibold">{r.name}</h3>
          {r.bars && (
            <ul className="space-y-1.5" aria-label={r.name}>
              {r.bars.map((b) => (
                <li key={b.label} className="grid grid-cols-[minmax(90px,170px)_1fr_auto] items-center gap-2 text-[13px]">
                  <span className="truncate">{b.label}</span>
                  <span className="h-4 rounded bg-[#EDF0F4]">{b.value !== null && <span className="block h-4 rounded bg-[#4A6FA5]" style={{ width: `${Math.max(2, Math.round((b.value / max) * 100))}%` }} />}</span>
                  <span className="w-24 text-right tabular-nums text-[#26323F]">{b.value === null ? tt("not recorded", "nicht erfasst") : `${b.value.toLocaleString()}${r.unit ? " " + r.unit : ""}`}</span>
                </li>
              ))}
            </ul>
          )}
          {r.rows && r.head && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F1F3F6] text-left">
                    {r.head.map((h) => (
                      <th key={h} className="border border-[#D9DEE6] px-2 py-1.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {r.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((c, j) => (
                        <td key={j} className="border border-[#D9DEE6] px-2 py-1.5">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!has(r) && <p className="rounded border border-dashed border-[#B8C0CC] bg-[#FAFBFC] px-3 py-4 text-[14px]">{r.note ?? tt("No data source is connected to this report: the platform does not record this.", "An diesen Bericht ist keine Datenquelle angeschlossen: Die Plattform erfasst das nicht.")}</p>}
          {has(r) && r.note && <p className="text-[12px] text-[#5F5E5A]">{r.note}</p>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ a competitor's public site */

/** A competitor as its public page shows it: a name and a promise, a few claims, a customer quote, and the demo it offers. The claims are the vendor's own; nothing is checked or marked. */
export function CompetitorSite({ name, tagline, points, quote, children }: { name: string; tagline: string; points: string[]; quote: string; children?: ReactNode }) {
  return (
    <div className="text-[#26323F]">
      <div className="bg-gradient-to-r from-[#1F5F5B] to-[#2E8A83] px-5 py-6 text-white">
        <p className="font-serif text-[20px] font-bold">{name}</p>
        <p className="mt-1 max-w-prose text-[15px]">{tagline}</p>
        <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-[#1F5F5B]">{tt("Try the demo ↓", "Demo ausprobieren ↓")}</span>
      </div>
      <ul className="grid gap-2 border-b border-[#E3E6EC] bg-[#F7FAFA] p-3 sm:grid-cols-3">
        {points.map((p) => (
          <li key={p} className="rounded border border-[#D3E3E1] bg-white px-3 py-2 text-[13px]">{p}</li>
        ))}
      </ul>
      <p className="border-b border-[#E3E6EC] px-4 py-3 text-[13px] italic text-[#4A5160]">“{quote}”</p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ a real competitor, live (v1.8) */

export type RealSite = {
  /** The real company and the page shown, e.g. "Duolingo" and "Blog: How leaderboards and leagues work". */
  name: string;
  page: string;
  url: string;
  /** Why this page belongs to the day: one sentence in the day's terms. */
  why: string;
  /** What to look at: neutral prompts in the terms of the task, never a verdict. */
  look: string[];
  /** The site allows being shown inside another page (checked 2026-10-22): shown live. Otherwise `shot` is a screenshot of the page. */
  embed: boolean;
  shot?: { src: string; date: string; phone?: boolean };
};

/**
 * A real platform beside the case's made-up competitor (user request 2026-10-22, DL-STANDARD v1.8 section 4): an optional tab, only on days whose brief has competitors. The page
 * is the real company's own public page, live where the site allows it and otherwise a dated screenshot, always with a button that opens the real site in a new browser tab. It is
 * not part of the case: nothing in it is a fact of the case, the course makes no claim about the company, and the learner who wants a real comparison looks and notes what they see.
 */
export function RealSiteView({ site }: { site: RealSite }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <div className="text-[#26323F]">
      <div className="space-y-1 border-b border-[#E3D9B8] bg-[#FBF6E6] px-4 py-3 text-[13px]">
        <p className="font-semibold">{tt(`A real platform: ${site.name} · not part of the case`, `Eine echte Plattform: ${site.name} · nicht Teil des Falls`)}</p>
        <p>{site.why}</p>
        <p className="text-[12px] text-[#5F5E5A]">{tt("This is the company's own public page. Nothing on it is a fact of the case, and the course makes no claim about the company. Look at it if you want a real comparison; you do not need it to answer.", "Das ist die eigene öffentliche Seite des Unternehmens. Nichts darauf ist eine Tatsache des Falls, und der Kurs stellt keine Behauptung über das Unternehmen auf. Sehen Sie sie sich an, wenn Sie einen echten Vergleich möchten; zum Antworten brauchen Sie sie nicht.")}</p>
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0 border-b border-[#D9DEE6] lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b border-[#D9DEE6] bg-[#F4F6F9] px-3 py-1.5">
            <span className="min-w-0 flex-1 truncate rounded bg-white px-2 py-1 text-[12px] text-[#5F5E5A]">{site.url}</span>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded bg-[#3F4A58] px-3 py-1.5 text-[12px] font-semibold text-white underline-offset-2 hover:underline">
              {tt("Open the real site ↗", "Echte Seite öffnen ↗")}
            </a>
          </div>
          {site.embed ? (
            <iframe src={site.url} title={`${site.name} · ${site.page}`} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" className="block h-[560px] w-full bg-white" />
          ) : site.shot ? (
            <figure className="bg-[#EEF1F5] p-3">
              {/* A dated screenshot: the site does not allow being shown inside another page. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}${site.shot.src}`} alt={tt(`Screenshot of ${site.name}: ${site.page}`, `Screenshot von ${site.name}: ${site.page}`)} className={clsx("mx-auto block rounded border border-[#C9D0DA] bg-white", site.shot.phone ? "max-h-[560px] w-auto max-w-[300px]" : "w-full")} />
              <figcaption className="mt-2 text-center text-[12px] text-[#5F5E5A]">
                {tt(`Screenshot of ${site.page}, taken on ${site.shot.date}. ${site.name} does not allow its site to be shown inside another page, so open it in a new tab to use it.`, `Screenshot von ${site.page}, aufgenommen am ${site.shot.date}. ${site.name} erlaubt nicht, die Seite in einer anderen Seite anzuzeigen; öffnen Sie sie in einem neuen Tab, um sie zu nutzen.`)}
              </figcaption>
            </figure>
          ) : null}
          {site.embed && <p className="px-3 py-1.5 text-[12px] text-[#5F5E5A]">{tt("Shown live. If the page stays empty, the site has stopped allowing this: open it in a new tab.", "Live angezeigt. Bleibt die Seite leer, erlaubt die Website das nicht mehr: Öffnen Sie sie in einem neuen Tab.")}</p>}
        </div>
        <div className="space-y-2 p-3 text-[13px]">
          <p className="font-semibold">{tt("What to look at", "Worauf Sie achten können")}</p>
          <ul className="list-disc space-y-1 pl-4">{site.look.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="text-[12px] text-[#5F5E5A]">{tt("Compare it with the made-up competitor in the tab before, and with your own case. Note what you see, not what you guess.", "Vergleichen Sie sie mit dem erfundenen Wettbewerber im Tab davor und mit Ihrem eigenen Fall. Notieren Sie, was Sie sehen, nicht was Sie vermuten.")}</p>
        </div>
      </div>
    </div>
  );
}
