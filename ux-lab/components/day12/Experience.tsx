"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ACCESS } from "@/data/day12/experience";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route: settings that really change this page (larger text, more spacing for
 * readers with dyslexia, stronger contrast, calm without motion), opt-in "barrier glasses" that show the page as some people meet it (blurred, faded, a red-green
 * colour vision deficiency, or the mouse switched off so only the keyboard works), and an Inspector that says what the lab does for access and what it does not
 * do yet. The settings are kept in this browser only (a convenience, not progress); nothing scores an answer or enters the missing list or the export.
 */
type Route = 1 | 2;
type Glass = "none" | "blur" | "faint" | "deut" | "nomouse";
type Settings = { size: 0 | 1 | 2; space: boolean; contrast: boolean; calm: boolean };
const KEY = "ux-d12-access";
const START: Settings = { size: 0, space: false, contrast: false, calm: false };

const CSS = `
html.d12-size-1 main { zoom: 1.15; }
html.d12-size-2 main { zoom: 1.3; }
html.d12-space main p, html.d12-space main li, html.d12-space main label, html.d12-space main td, html.d12-space main th { line-height: 1.9 !important; letter-spacing: 0.05em !important; word-spacing: 0.16em !important; text-align: left !important; }
html.d12-contrast main, html.d12-contrast main .text-ash, html.d12-contrast main .text-ink { color: #000 !important; }
html.d12-contrast main .border-line { border-color: #3F4A55 !important; }
html.d12-calm *, html.d12-calm *::before, html.d12-calm *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
html.d12-glass-blur main { filter: blur(1.8px); }
html.d12-glass-faint main { filter: contrast(0.4) brightness(1.2); }
html.d12-glass-deut main { filter: url(#d12-deut); }
html.d12-glass-nomouse main { pointer-events: none; cursor: none; }
`;
const ALL = ["d12-size-1", "d12-size-2", "d12-space", "d12-contrast", "d12-calm", "d12-glass-blur", "d12-glass-faint", "d12-glass-deut", "d12-glass-nomouse"];

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash")}>
      {on ? "✓ " : ""}
      {children}
    </button>
  );
}

export function Day12Experience({ route }: { route: Route }) {
  const [s, setS] = useState<Settings>(START);
  const [glass, setGlass] = useState<Glass>("none");
  const [inspect, setInspect] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setS({ ...START, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      /* no storage: defaults */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const h = document.documentElement;
    ALL.forEach((c) => h.classList.remove(c));
    if (s.size) h.classList.add(`d12-size-${s.size}`);
    if (s.space) h.classList.add("d12-space");
    if (s.contrast) h.classList.add("d12-contrast");
    if (s.calm) h.classList.add("d12-calm");
    if (glass !== "none") h.classList.add(`d12-glass-${glass}`);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s, glass, mounted]);

  useEffect(() => () => ALL.forEach((c) => document.documentElement.classList.remove(c)), []);

  useEffect(() => {
    if (glass === "none") return;
    const off = (e: KeyboardEvent) => e.key === "Escape" && setGlass("none");
    window.addEventListener("keydown", off);
    return () => window.removeEventListener("keydown", off);
  }, [glass]);

  const set = (patch: Partial<Settings>) => setS((v) => ({ ...v, ...patch }));
  const glasses: [Glass, string, string][] = [
    ["blur", tt("Blurred vision"), tt("The page as it looks to someone with low vision without magnification.")],
    ["faint", tt("Faded contrast"), tt("The page on a phone in bright sunlight, or with cataracts.")],
    ["deut", tt("Red-green colour vision"), tt("The page with a red-green colour vision deficiency (deuteranopia), as a filter approximates it.")],
    ["nomouse", tt("Mouse off"), tt("The mouse no longer works on the page. Use Tab, Shift + Tab, Enter and the arrow keys. Press Escape to stop.")],
  ];
  const current = glasses.find((g) => g[0] === glass);

  return (
    <section aria-labelledby="access-h" className="card space-y-3 p-4">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="smallcaps text-accent">{tt("Today you learn accessibility by using it")}</p>
          <h2 id="access-h" className="text-h3">{tt("Make this page work for you")}</h2>
        </div>
        <button type="button" aria-pressed={inspect} onClick={() => setInspect((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", inspect ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash")}>
          {inspect ? tt("⚙ Hide what this page does") : tt("⚙ What does this page do for access?")}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={tt("Reading settings for this page")}>
        <span className="text-caption text-ash">{tt("Text size")}</span>
        {([0, 1, 2] as const).map((n) => (
          <Toggle key={n} on={s.size === n} onClick={() => set({ size: n })}>{n === 0 ? tt("Normal") : n === 1 ? tt("Larger") : tt("Largest")}</Toggle>
        ))}
        <Toggle on={s.space} onClick={() => set({ space: !s.space })}>{tt("More spacing")}</Toggle>
        <Toggle on={s.contrast} onClick={() => set({ contrast: !s.contrast })}>{tt("Stronger contrast")}</Toggle>
        <Toggle on={s.calm} onClick={() => set({ calm: !s.calm })}>{tt("No motion")}</Toggle>
      </div>
      <p className="text-caption text-ash">{tt("These change this page now and are remembered in this browser. More spacing follows what helps many readers with dyslexia; no motion helps people who are easily distracted or get dizzy.")}</p>

      <div className="space-y-2 rounded-lg border border-dashed border-line p-3">
        <p className="text-caption font-semibold text-ink">{tt("Barrier glasses · a demonstration: see this page as some people meet it")}</p>
        <div className="flex flex-wrap gap-2">
          {glasses.map(([g, label]) => (
            <Toggle key={g} on={glass === g} onClick={() => setGlass(glass === g ? "none" : g)}>{label}</Toggle>
          ))}
        </div>
        {current && <p className="text-caption text-ink" aria-live="polite">{current[2]} {tt("A filter can only approximate what people experience; it is a reminder, not a simulation of a life.")}</p>}
      </div>

      {inspect && (
        <div className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
          <p className="font-semibold">{tt("What the lab's pages do for access")}</p>
          <ul className="list-disc space-y-0.5 pl-5">{ACCESS.does.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="font-semibold">{tt("What they do not do yet")}</p>
          <ul className="list-disc space-y-0.5 pl-5">{ACCESS.doesNot.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="text-ash">{tt(`This is the honest version of an accessibility statement (card B3), for Route ${route} of Day 12.`)}</p>
        </div>
      )}

      {mounted &&
        createPortal(
          <>
            <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
              <filter id="d12-deut">
                <feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" />
              </filter>
            </svg>
            {glass !== "none" && (
              <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-line bg-paper px-3 py-2 shadow-lg">
                <button type="button" onClick={() => setGlass("none")} className="btn btn-sm min-h-[40px] border border-accent bg-accentSoft text-ink">
                  {tt(`Take the glasses off (${current?.[1] ?? ""}) · Escape`)}
                </button>
              </div>
            )}
          </>,
          document.body,
        )}
    </section>
  );
}
