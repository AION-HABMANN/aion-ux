"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { HashFlash } from "@/components/chrome/HashFlash";
import { PageNav } from "@/components/chrome/PageNav";
import type { NavGroup } from "@/components/chrome/PageNav";
import { SectionRail } from "@/components/chrome/SectionRail";
import { OriginalExtra } from "@/components/day/OriginalExtra";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { ResetRoute } from "@/components/ui/ResetRoute";
import type { RailSection } from "@/data/materialTypes";
import { dayOf, routeHref } from "@/data/course";
import type { RouteNo } from "@/data/course";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";
import type { Persisted } from "@/store/useStore";

/**
 * The page frames shared by the days built after Day 1 (Day 2, Day 3, …): a day's home page (CLAUDE.md #27) and its two routes (#28, #30).
 * A day supplies its content in one `DayConfig` (components/day/dayConfigs.tsx); the frame never knows what a day teaches. Day 1 keeps its own
 * pages (components/day1/Pages.tsx), which this was copied from.
 */
export type RoutePlan = { title: string; blurb: string; plan: { label: string; minutes: number }[]; optional: string; export: string };
export type DayIntro = {
  about: string;
  caseLine: string;
  story: { route: RouteNo; verb: string; question: string; output: string }[];
  wiifm: { route: RouteNo; skill: string; payoff: string }[];
};

export type DayConfig = {
  n: number;
  /** The day's own heading on its home page, in the active language. */
  heading: () => string;
  intro: DayIntro;
  routeCard: (route: RouteNo) => RoutePlan;
  railSections: (route: RouteNo) => RailSection[];
  pageNav: (route: RouteNo) => NavGroup[];
  /** An optional layer at the top of each route where the day practises its topic (UX-STANDARD 2.15). */
  experience?: (route: RouteNo) => React.ReactNode;
  MateriA: ComponentType;
  MateriB: ComponentType;
  Task1: ComponentType;
  Task2: ComponentType;
  progress: (p: Persisted, route: RouteNo) => { done: number; total: number };
  taskBlocks: (p: Persisted) => Record<string, boolean>;
  routeHeading: (route: RouteNo) => { kicker: string; h1: string; order: string };
};

/* ------------------------------------------------------------------ the day's home page */

export function DayHome({ cfg }: { cfg: DayConfig }) {
  const meta = dayOf(cfg.n)!;
  const total = ([1, 2] as RouteNo[]).reduce((s, r) => s + cfg.routeCard(r).plan.reduce((t, p) => t + p.minutes, 0), 0);
  return (
    <div className="space-y-8 pt-6">
      <header className="space-y-2">
        <p className="smallcaps text-accent">
          {meta.module} · {meta.part}
        </p>
        <h1 className="text-display">{cfg.heading()}</h1>
        <p className="max-w-prose text-body text-ash">{meta.topic}.</p>
      </header>

      <section aria-labelledby="today-h" className="card space-y-4 p-5">
        <div className="space-y-2">
          <h2 id="today-h" className="text-h2">
            {tt("What today is about", "Worum es heute geht")}
          </h2>
          <p className="max-w-prose text-body text-ink">
            <Gloss>{cfg.intro.about}</Gloss>
          </p>
          <p className="max-w-prose text-body text-ink">
            <Gloss>{cfg.intro.caseLine}</Gloss>
          </p>
        </div>
        <div className="space-y-2">
          <p className="smallcaps">{tt("One story, two routes", "Eine Geschichte, zwei Routen")}</p>
          <ol className="grid gap-3 md:grid-cols-2">
            {cfg.intro.story.map((st) => (
              <li key={st.route}>
                <Link href={routeHref(cfg.n, st.route)} className="block h-full space-y-1.5 rounded-lg border border-line bg-canvas p-3 transition-colors hover:border-accent">
                  <p className="smallcaps text-accent">
                    Route {st.route} · {st.verb}
                  </p>
                  <p className="text-body text-ink">
                    <Gloss>{st.question}</Gloss>
                  </p>
                  <p className="text-caption text-ash">
                    {tt("You finish with:", "Sie schließen ab mit:")} <strong className="text-ink">{st.output}</strong>
                  </p>
                </Link>
              </li>
            ))}
          </ol>
          <p className="text-caption text-ash">
            {tt(
              `${total} minutes in total across both routes, facilitator-led for the material. Every task block is Core, and nothing is locked. You finish with two documents.`,
              `Insgesamt ${total} Minuten über beide Routen, das Material moderiert. Jeder Aufgabenblock ist Kern, und nichts ist gesperrt. Sie schließen mit zwei Dokumenten ab.`,
            )}
          </p>
        </div>
      </section>

      <section aria-labelledby="wiifm-h" className="card space-y-3 border-accent/40 bg-accentSoft p-5">
        <div className="space-y-1">
          <h2 id="wiifm-h" className="text-h2">
            {tt("What's in it for you", "Was Sie davon haben")}
          </h2>
          <p className="max-w-prose text-body text-ink">{tt("Each skill below is one you can use at your own desk next week, not only in this case.", "Jede Fähigkeit unten können Sie nächste Woche an Ihrem eigenen Arbeitsplatz nutzen, nicht nur in diesem Fall.")}</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {cfg.intro.wiifm.map((w) => (
            <li key={w.skill} className="space-y-1 rounded-lg border border-line bg-paper p-3">
              <p className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="font-semibold text-ink">{w.skill}</span>
                <span className="text-micro font-semibold uppercase text-ash">Route {w.route}</span>
              </p>
              <p className="text-caption text-ink">
                <Gloss>{w.payoff}</Gloss>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="routes-h" className="space-y-3">
        <h2 id="routes-h" className="sr-only">
          {tt("Routes", "Routen")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {([1, 2] as RouteNo[]).map((n) => {
            const c = cfg.routeCard(n);
            return (
              <Link key={n} href={routeHref(cfg.n, n)} className="card group block space-y-3 p-5 transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="smallcaps text-accent">Route {n}</span>
                  <span className="text-micro font-semibold uppercase text-ash">{n === 1 ? tt("Levels 1 + 2", "Level 1 + 2") : tt("Level 3", "Level 3")}</span>
                </div>
                <h3 className="text-h2">{c.title}</h3>
                <p className="text-caption text-ash">{c.blurb}</p>
                <table className="w-full text-caption">
                  <caption className="sr-only">{tt(`Time plan for Route ${n}`, `Zeitplan für Route ${n}`)}</caption>
                  <tbody>
                    {c.plan.map((p) => (
                      <tr key={p.label} className="border-t border-line">
                        <td className="py-1.5">{p.label}</td>
                        <td className="tnum py-1.5 text-right text-ash">
                          {p.minutes} {tt("min", "Min.")}
                        </td>
                      </tr>
                    ))}
                    {c.optional && (
                      <tr className="border-t border-line">
                        <td className="py-1.5 text-ash" colSpan={2}>
                          {c.optional}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-ink font-semibold">
                      <td className="py-1.5">{tt("Core total", "Kern gesamt")}</td>
                      <td className="tnum py-1.5 text-right">
                        {c.plan.reduce((s, p) => s + p.minutes, 0)} {tt("min", "Min.")}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span className="inline-block text-caption font-semibold text-accent group-hover:underline">{tt(`Open Route ${n} →`, `Route ${n} öffnen →`)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="how-h" className="card space-y-2 p-5">
        <h2 id="how-h" className="text-h3">
          {tt("How this site works", "So funktioniert diese Seite")}
        </h2>
        <ol className="list-decimal space-y-1 pl-5 text-body">
          <li>{tt("Study, then task, then export: each route ends as one working document, not a quiz score. Route 1 merges Levels 1 and 2 on one case; Route 2 is Level 3.", "Lernen, dann Aufgabe, dann Export: Jede Route endet mit einem Arbeitsdokument, nicht mit einem Quiz-Ergebnis. Route 1 verbindet Level 1 und 2 an einem Fall; Route 2 ist Level 3.")}</li>
          <li>{tt("Nothing is locked. Every section and route stays open, and a suggested order is only a suggestion.", "Nichts ist gesperrt. Jeder Abschnitt und jede Route bleibt offen, und eine empfohlene Reihenfolge ist nur eine Empfehlung.")}</li>
          <li>{tt("The site shows consequences, not verdicts. It marks something only when you press a Check button, and then it gives a question, not the answer.", "Die Seite zeigt Folgen, keine Urteile. Sie markiert etwas nur, wenn Sie eine Prüfen-Schaltfläche drücken, und dann gibt sie eine Frage, nicht die Antwort.")}</li>
          <li>{tt("A different choice with a clear reason still exports: in a decision there is no single right answer.", "Eine andere Wahl mit klarer Begründung lässt sich trotzdem exportieren: Bei einer Entscheidung gibt es keine einzige richtige Antwort.")}</li>
          <li>{tt("The site is in English. A German and an Indonesian version follow; common technical terms will stay in English.", "Die Seite ist auf Englisch. Eine deutsche und eine indonesische Fassung folgen; gängige Fachbegriffe bleiben Englisch.")}</li>
        </ol>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ the two routes */

function useRouteProgress(cfg: DayConfig, route: RouteNo) {
  const p = usePersisted();
  const hydrated = useHydrated();
  const prog = cfg.progress(p, route);
  return { done: hydrated ? prog.done : 0, total: prog.total, blocks: cfg.taskBlocks(p), readCards: p.ui.sectionsRead };
}

export function DayRoute({ cfg, route }: { cfg: DayConfig; route: RouteNo }) {
  const pr = useRouteProgress(cfg, route);
  const h = cfg.routeHeading(route);
  const Materi = route === 1 ? cfg.MateriA : cfg.MateriB;
  const Task = route === 1 ? cfg.Task1 : cfg.Task2;
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{h.kicker}</p>
        <h1>{h.h1}</h1>
      </header>
      <SuggestedOrderBanner routeKey={`d${cfg.n}r${route}`} text={h.order} />
      <SectionRail route={route} sections={cfg.railSections(route)} done={pr.done} total={pr.total} />
      <PageNav route={route} groups={cfg.pageNav(route)} readCards={pr.readCards} blocks={pr.blocks} />
      {cfg.experience?.(route)}
      <Materi />
      <Task />
      <OriginalExtra day={cfg.n} route={route} />
      <ResetRoute day={cfg.n} route={route} />
    </div>
  );
}
