"use client";

import Link from "next/link";
import { originalExtras, originalHref, originalOf } from "@/data/course";
import type { RouteNo } from "@/data/course";
import { tt } from "@/lib/lang";

/**
 * The Extra shelf of a route (UX-STANDARD decision 8, user request 2026-10-28): for a day that was first built in another form (Days 9 to 16), the parts of that
 * original idea that belong to this route, after the task. Never part of a task, the missing list, the progress ring or the export. Each link opens the original
 * page in its own look (a separate root layout, so a full page load); its top bar leads back to the lab.
 */
export function OriginalExtra({ day, route }: { day: number; route: RouteNo }) {
  const items = originalExtras(day, route);
  const orig = originalOf(day);
  if (!orig || items.length === 0) return null;
  return (
    <section id="extra" aria-labelledby="extra-h" className="card space-y-3 border-dashed p-4 md:p-6">
      <div className="space-y-1">
        <p className="smallcaps text-signal">{tt("Extra · optional", "Extra · optional")}</p>
        <h2 id="extra-h">{tt(`The original idea: ${orig.name}`, `Die ursprüngliche Idee: ${orig.name}`)}</h2>
        <p className="max-w-prose text-caption text-ash">
          {tt(
            "The first version of this day, kept as it was built. Not part of the task: nothing here is counted, missing or exported. Each page opens in its own look; its top bar leads back here.",
            "Die erste Fassung dieses Tages, so erhalten, wie sie gebaut wurde. Nicht Teil der Aufgabe: Hier wird nichts gezählt, nichts fehlt und nichts wird exportiert. Jede Seite öffnet sich in ihrem eigenen Aussehen; die obere Leiste führt hierher zurück.",
          )}
        </p>
      </div>
      <ul className="grid gap-2 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="block h-full rounded-lg border border-line bg-paper p-3 transition-colors hover:border-accent hover:bg-accentSoft/40">
              <span className="block font-semibold text-accent">{it.title} →</span>
              <span className="mt-1 block text-caption text-ash">{it.what}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-caption">
        <Link href={originalHref(day)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Open the whole original idea", "Die ganze ursprüngliche Idee öffnen")}
        </Link>
      </p>
    </section>
  );
}
