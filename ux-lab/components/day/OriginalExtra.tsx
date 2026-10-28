"use client";

import Link from "next/link";
import { dayOf, originalExtras, originalHref, originalOf, routeHref } from "@/data/course";
import type { RouteNo } from "@/data/course";
import { tt } from "@/lib/lang";

/**
 * Route 3 · Extra (UX-STANDARD decision 8 and 2.14, user request 2026-10-28): the original idea of a day (Days 9 to 16), on a route of its own. The day home and
 * Routes 1 and 2 show only the new version; inside the day, the top bar's "3 Extra" opens this page with the first version's pages and playgrounds, grouped by the
 * route they belong to. Never part of a task, the missing list, the progress ring or the export. Each link opens the original page in its own look (a separate
 * root layout, so a full page load); its top bar leads back to the lab.
 */
function Group({ day, route }: { day: number; route: RouteNo }) {
  const items = originalExtras(day, route);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={`extra-h-${route}`} className="space-y-2">
      <h2 id={`extra-h-${route}`} className="text-h3">
        {route === 1 ? tt("Beside Route 1 · Analyse and choose", "Neben Route 1 · Analysieren und wählen") : tt("Beside Route 2 · Decide", "Neben Route 2 · Entscheiden")}
      </h2>
      <ul className="grid gap-2 md:grid-cols-2">
        {items.map((it) => {
          const cls = "block h-full rounded-lg border border-line bg-paper p-3 transition-colors hover:border-accent hover:bg-accentSoft/40";
          const body = (
            <>
              <span className="block font-semibold text-accent">{it.title} →</span>
              <span className="mt-1 block text-caption text-ash">{it.what}</span>
            </>
          );
          // A file (a Word worksheet) is a plain download, not a page of the app.
          return (
            <li key={it.href}>
              {/\.\w{2,4}$/.test(it.href) ? <a href={it.href} className={cls}>{body}</a> : <Link href={it.href} className={cls}>{body}</Link>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function OriginalExtraPage({ day }: { day: number }) {
  const orig = originalOf(day);
  const meta = dayOf(day);
  if (!orig) {
    return (
      <div className="space-y-4 pt-6">
        <h1>{tt(`Day ${day} · Route 3 · Extra`, `Tag ${day} · Route 3 · Extra`)}</h1>
        <p className="card p-4 text-body">{tt("This day has no earlier version. Everything is in Routes 1 and 2.", "Dieser Tag hat keine frühere Fassung. Alles ist in Route 1 und 2.")}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6 pt-4">
      <header className="space-y-2">
        <p className="smallcaps text-accent">{tt(`Day ${day} · Route 3 · Extra · optional`, `Tag ${day} · Route 3 · Extra · optional`)}</p>
        <h1>{tt(`The original idea: ${orig.name}`, `Die ursprüngliche Idee: ${orig.name}`)}</h1>
        <p className="max-w-prose text-body text-ash">{orig.what}</p>
        <p className="max-w-prose text-caption text-ash">
          {tt(
            `The first version of ${meta ? `“${meta.short}”` : "this day"}, kept as it was built, with its playgrounds. Not part of the task: nothing here is counted, missing or exported. Each page opens in its own look; its top bar leads back here. The tasks are in Route 1 and Route 2.`,
            "Die erste Fassung dieses Tages, so erhalten, wie sie gebaut wurde, mit ihren Übungsräumen. Nicht Teil der Aufgabe: Hier wird nichts gezählt, nichts fehlt und nichts wird exportiert. Die Aufgaben sind in Route 1 und Route 2.",
          )}
        </p>
      </header>
      <Group day={day} route={1} />
      <Group day={day} route={2} />
      <div className="flex flex-wrap gap-3 text-caption">
        <Link href={originalHref(day)} className="btn-primary inline-block">{tt("Open the whole original idea", "Die ganze ursprüngliche Idee öffnen")}</Link>
        <Link href={routeHref(day, 1)} className="font-semibold text-accent underline decoration-dotted underline-offset-2 self-center">{tt("Back to Route 1", "Zurück zu Route 1")}</Link>
      </div>
    </div>
  );
}
