"use client";

import Link from "next/link";
import { OriginalExtraPage } from "@/components/day/OriginalExtra";
import { DayHome, DayRoute } from "@/components/day/DayPages";
import { DAY_CONFIGS } from "@/components/day/dayConfigs";
import { dayOf, originalHref, originalOf } from "@/data/course";
import { DayProvider } from "@/lib/dayContext";
import { tt } from "@/lib/lang";

/** The original idea of a day (Days 9 to 16), as it was first built: kept reachable next to the lab version. */
export function OriginalIdea({ n }: { n: number }) {
  const orig = originalOf(n);
  if (!orig) return null;
  return (
    <section aria-labelledby="orig-h" className="card space-y-2 border-l-4 border-l-signal p-5">
      <p className="smallcaps text-signal">{tt("Original idea", "Ursprüngliche Idee")}</p>
      <h2 id="orig-h" className="text-h2">{orig.name}</h2>
      <p className="max-w-prose text-body text-ash">{orig.what}</p>
      <p className="max-w-prose text-caption text-ash">
        {tt(
          "Kept as it was first built, with its own look and its own saved answers. It is not on the lab standard yet. Opening it loads a separate page; its top bar leads back here.",
          "So erhalten, wie es zuerst gebaut wurde, mit eigenem Aussehen und eigenen gespeicherten Antworten. Es folgt noch nicht dem Lab-Standard. Es öffnet sich als eigene Seite; die obere Leiste führt hierher zurück.",
        )}
      </p>
      <Link href={originalHref(n)} className="btn-primary inline-block">
        {tt("Open the original idea", "Die ursprüngliche Idee öffnen")}
      </Link>
    </section>
  );
}

/** A day that is not built yet keeps its place and its address (CLAUDE.md #12). Days 9 to 16 show their original idea here. */
function DayPlaceholder({ n }: { n: number }) {
  const meta = dayOf(n);
  return (
    <div className="space-y-6 pt-6">
      <header className="space-y-2">
        <p className="smallcaps text-accent">{meta ? `${meta.module} · ${meta.part}` : tt("Day", "Tag")}</p>
        <h1 className="text-display">{meta ? `${tt("Day", "Tag")} ${n} · ${meta.short}` : `${tt("Day", "Tag")} ${n}`}</h1>
        {meta && <p className="max-w-prose text-body text-ash">{meta.topic}.</p>}
      </header>
      <section className="card space-y-2 p-5">
        <p className="text-body">
          {n <= 8
            ? tt("This day is planned and is being built to the Digital Learning standard. It will open here with its two routes.", "Dieser Tag ist geplant und wird nach dem Digital-Learning-Standard gebaut. Er öffnet sich hier mit seinen zwei Routen.")
            : tt("The lab version of this day, with its two routes and two documents, is not built yet. Until it is, the original idea below is the day to work with.", "Die Lab-Fassung dieses Tages mit zwei Routen und zwei Dokumenten ist noch nicht gebaut. Bis dahin ist die ursprüngliche Idee unten der Tag, mit dem gearbeitet wird.")}
        </p>
        <Link href="/" className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Back to all days", "Zurück zu allen Tagen")}
        </Link>
      </section>
      <OriginalIdea n={n} />
    </div>
  );
}

/** Picks the content of a day. A day that is not built yet shows its placeholder at the same address (CLAUDE.md #12). */
export function DayView({ n, part }: { n: number; part: "home" | "route-1" | "route-2" | "route-3" }) {
  if (part === "route-3") return <OriginalExtraPage day={n} />;
  const cfg = DAY_CONFIGS[n];
  if (!cfg) return <DayPlaceholder n={n} />;
  // A built day shows only the new version; its original idea lives on Route 3 · Extra (user request 2026-10-28).
  const page = part === "route-1" ? <DayRoute cfg={cfg} route={1} /> : part === "route-2" ? <DayRoute cfg={cfg} route={2} /> : <DayHome cfg={cfg} />;
  return <DayProvider value={n}>{page}</DayProvider>;
}
