"use client";

import Link from "next/link";
import { COURSE, DAYS, dayHref } from "@/data/course";
import { tt } from "@/lib/lang";

/** The course home: the sixteen days of the plan. Only a built day is a link; the others keep their place (CLAUDE.md #12). Nothing is locked. */
export default function Home() {
  return (
    <div className="space-y-8 pt-6">
      <header className="space-y-2">
        <p className="smallcaps text-accent">{COURSE.provider}</p>
        <h1 className="text-display">{COURSE.site}</h1>
        <p className="max-w-prose text-body text-ash">
          {tt(
            `${COURSE.course}. Sixteen days, eight modules. Each day has two routes: Levels 1 and 2 on one case, and Level 3 as a management decision. You study on your own, work a document from the case and export it.`,
            `${COURSE.course}. Sechzehn Tage, acht Module. Jeder Tag hat zwei Routen: Level 1 und 2 an einem Fall und Level 3 als Managemententscheidung. Sie lernen selbst, erarbeiten aus dem Fall ein Dokument und exportieren es.`,
          )}
        </p>
      </header>
      <section aria-labelledby="days-h" className="space-y-3">
        <h2 id="days-h" className="text-h2">
          {tt("The days", "Die Tage")}
        </h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {DAYS.map((d) => {
            const body = (
              <>
                <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="smallcaps text-accent">
                    {tt("Day", "Tag")} {d.n}
                  </span>
                  <span className="text-micro font-semibold uppercase text-ash">
                    {d.module} · {d.part}
                  </span>
                </p>
                <p className="mt-1 font-semibold text-ink">{d.short}</p>
                <p className="mt-1 text-caption text-ash">{d.built ? tt("Open · two routes, two documents", "Offen · zwei Routen, zwei Dokumente") : tt("Not built yet", "Noch nicht gebaut")}</p>
              </>
            );
            return (
              <li key={d.n}>
                {d.built ? (
                  <Link href={dayHref(d.n)} className="card block h-full p-4 transition-shadow hover:shadow-md">
                    {body}
                  </Link>
                ) : (
                  <Link href={dayHref(d.n)} className="block h-full rounded-xl border border-dashed border-line bg-mist/40 p-4 transition-colors hover:border-accent">
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
