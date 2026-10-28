"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { COURSE, dayHref, dayOf, extraHref, hasExtra, parsePath, routeHref } from "@/data/course";
import type { RouteNo } from "@/data/course";
import { tt } from "@/lib/lang";

const ROUTE_SHORT = (r: RouteNo) => (r === 1 ? tt("Analyse and choose", "Analysieren und wählen") : tt("Decide", "Entscheiden"));

/** Persistent top bar: the site name, the current day, its two routes and, for a day with an original idea, Route 3 · Extra. Nothing is locked: every route is always reachable. The EN | DE switch of
 * Digital Learning comes back when the German texts are written (UX-STANDARD decision 4: English first). */
export function TopBar() {
  const pathname = usePathname() ?? "";
  const { day, route, extra } = parsePath(pathname);
  const meta = day ? dayOf(day) : undefined;
  return (
    <header className="sticky top-0 z-40 h-12 bg-slate text-paper print:hidden">
      <div className="mx-auto flex h-full w-full max-w-[1100px] items-center gap-3 px-4 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <span aria-hidden className="grid h-6 w-6 place-items-center rounded bg-gold text-caption font-black text-ink">
            N
          </span>
          <span className="truncate text-caption md:text-body">{COURSE.site}</span>
        </Link>
        {meta && (
          <Link href={dayHref(meta.n)} aria-current={route === null && !extra ? "page" : undefined} className={clsx("hidden rounded-full px-3 py-1.5 text-caption font-semibold transition-colors sm:block", route === null && !extra ? "bg-paper/15 text-paper" : "text-paper/80 hover:bg-paper/10 hover:text-paper")}>
            {tt("Day", "Tag")} {meta.n}
          </Link>
        )}
        <div className="ml-auto flex items-center gap-2">
          {meta && (
            <nav aria-label={tt("Routes", "Routen")}>
              <ol className="flex items-center gap-1">
                {([1, 2] as RouteNo[]).map((r) => (
                  <li key={r}>
                    <Link
                      href={routeHref(meta.n, r)}
                      aria-current={route === r ? "page" : undefined}
                      className={clsx("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-semibold transition-colors", route === r ? "bg-gold text-ink" : "text-paper/80 hover:bg-paper/10 hover:text-paper")}
                    >
                      <span className="tnum">{r}</span>
                      <span className="hidden md:inline">{ROUTE_SHORT(r)}</span>
                    </Link>
                  </li>
                ))}
                {hasExtra(meta.n) && (
                  <li>
                    <Link
                      href={extraHref(meta.n)}
                      aria-current={extra ? "page" : undefined}
                      className={clsx("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-caption font-semibold transition-colors", extra ? "bg-gold text-ink" : "text-paper/80 hover:bg-paper/10 hover:text-paper")}
                    >
                      <span className="tnum">3</span>
                      <span className="hidden md:inline">{tt("Extra", "Extra")}</span>
                    </Link>
                  </li>
                )}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
