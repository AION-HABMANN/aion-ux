"use client";

// Every numbered stop uses this shell, so all six feel like one course:
// a header, then FEEL IT / SEE IT / CARRY IT blocks, then a link onward.
// Opening a stop is also what marks it explored in localStorage.

import Link from "next/link";
import { useEffect } from "react";
import { getNextStop } from "@/lib/navigation";
import { useProgress } from "@/lib/storage";

export function SectionHeader({
  stopId,
  title,
  intro,
}: {
  stopId: number;
  title: string;
  intro: string;
}) {
  const { markVisited } = useProgress();

  useEffect(() => {
    markVisited(stopId);
  }, [stopId, markVisited]);

  return (
    <header className="mb-8 max-w-3xl">
      <p className="aion-label">Stop {stopId}</p>
      <h1 className="mt-1 text-2xl font-semibold leading-tight text-navy sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-navy/75">{intro}</p>
    </header>
  );
}

export function Block({
  kind,
  title,
  children,
}: {
  kind: "feel" | "see" | "carry";
  title: string;
  children: React.ReactNode;
}) {
  const kindLabel = kind === "feel" ? "Feel it" : kind === "see" ? "See it" : "Carry it";
  return (
    <section className="mb-10">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="aion-label">{kindLabel}</span>
        <h2 className="text-lg font-semibold text-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Short explanation panel. Kept deliberately small — 3-5 sentences, no more. */
export function ExplainPanel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="aion-card-soft max-w-3xl">
      {title && <h3 className="mb-2 text-sm font-semibold text-navy">{title}</h3>}
      <div className="space-y-2 text-sm leading-relaxed text-navy/80">{children}</div>
    </div>
  );
}

export function NextStop({ stopId }: { stopId: number }) {
  const next = getNextStop(stopId);
  if (!next) {
    return (
      <div className="mt-12 border-t border-navy/10 pt-6">
        <p className="text-sm text-navy/70">
          That's the whole path. You can go back to any stop from the sidebar at any
          time — your notes are still there.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-12 border-t border-navy/10 pt-6">
      <p className="text-sm text-navy/60">Next up</p>
      <Link href={next.href} className="aion-btn mt-2">
        {next.id}. {next.label}
      </Link>
    </div>
  );
}
