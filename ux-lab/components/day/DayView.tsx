"use client";

import Link from "next/link";
import { DayHome, DayRoute } from "@/components/day/DayPages";
import { DAY_CONFIGS } from "@/components/day/dayConfigs";
import { dayOf } from "@/data/course";
import { DayProvider } from "@/lib/dayContext";
import { tt } from "@/lib/lang";

/** A day that is not built yet keeps its place and its address (CLAUDE.md #12). Days 9 to 16 still run in the older `playground-ux` project. */
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
            : tt("Days 9 to 16 still run in the older playground-ux project, as they were built. They move here one at a time when they are rebuilt to this standard.", "Die Tage 9 bis 16 laufen noch im älteren Projekt playground-ux, so wie sie gebaut wurden. Sie ziehen einzeln hierher, wenn sie nach diesem Standard neu gebaut werden.")}
        </p>
        <Link href="/" className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Back to all days", "Zurück zu allen Tagen")}
        </Link>
      </section>
    </div>
  );
}

/** Picks the content of a day. A day that is not built yet shows its placeholder at the same address (CLAUDE.md #12). */
export function DayView({ n, part }: { n: number; part: "home" | "route-1" | "route-2" }) {
  const cfg = DAY_CONFIGS[n];
  if (!cfg) return <DayPlaceholder n={n} />;
  const page = part === "route-1" ? <DayRoute cfg={cfg} route={1} /> : part === "route-2" ? <DayRoute cfg={cfg} route={2} /> : <DayHome cfg={cfg} />;
  return <DayProvider value={n}>{page}</DayProvider>;
}
