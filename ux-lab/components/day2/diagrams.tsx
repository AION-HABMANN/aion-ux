"use client";

import { useState } from "react";
import { MeasureThumb } from "@/components/day2/mocks";
import { MatrixStory } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { DensityLab, GuideLab, ScanLab, SideLab } from "@/components/day2/labs";

/**
 * Day 2 · the teaching diagrams of Materi A and B. Example: Brightwater, a made-up leisure centre with a pool, a gym and courses, with Ana and Felix (visitors), Lea (UX
 * lead) and Omar (product owner); never CityDesk, EduFlex or CampusNow, so no task is answered here. Interactive ones carry "The point" and an always-visible "What this
 * shows"; the story of each card is its pixel comic (data/day2/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · provider's side against user's side (interactive) */

export function SideFig() {
  return <SideLab />;
}

/* ------------------------------------------------------------------ A2 · the four steps of a scan (static) and where the scan lands (interactive) */

export function ScanChainFig() {
  return (
    <ChainFig
      label={tt("How people take in a screen: four steps in a second or two")}
      steps={[
        { h: tt("1 · Scan"), b: tt("The eye jumps over the page instead of reading it line by line."), kind: "m" },
        { h: tt("2 · Select"), b: tt("It stops on what stands out and what looks relevant to the goal: headings, words, buttons."), kind: "a" },
        { h: tt("3 · Prioritise"), b: tt("It ranks what it found: this first, that later, the rest not at all."), kind: "a" },
        { h: tt("4 · Act"), b: tt("The person clicks, reads on, or leaves."), kind: "s" },
      ]}
      caption={tt("What the scan does not select is, for the user, not on the page. A UI decision is a decision about what the scan will catch.")}
    />
  );
}

export function ScanFig() {
  return <ScanLab />;
}

/* ------------------------------------------------------------------ A3 · contrast, grouping, structure switched on one at a time (interactive) */

export function GuideFig() {
  return <GuideLab />;
}

/* ------------------------------------------------------------------ A4 · one start page at three densities (interactive) */

export function DensityFig() {
  return <DensityLab />;
}

/* ------------------------------------------------------------------ A5 · three measures weighed on four criteria (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "tasks",
      name: tt("Three large task buttons on the start page"),
      cells: {
        effect: { level: 3, reason: tt("Most visitors come to book a swim, find a course or check the hours; all three are seen at once.") },
        effort: { level: 1, reason: tt("One designer and one editor rearrange one page in a few days.") },
        risk: { level: 1, reason: tt("Nothing is removed; the other links move one step down.") },
        timely: { level: 3, reason: tt("Visitors notice it the day it goes live.") },
      },
    },
    {
      id: "search",
      name: tt("A visible search box on every page"),
      cells: {
        effect: { level: 2, reason: tt("It helps visitors who know what they want, about a part of all visitors.") },
        effort: { level: 2, reason: tt("The developers place it in the page frame and connect the course list; a few weeks.") },
        risk: { level: 2, reason: tt("If it finds nothing for common words, people trust it less than before.") },
        timely: { level: 2, reason: tt("It needs testing with the course names first, so it comes a little later.") },
      },
    },
    {
      id: "hours",
      name: tt("Opening hours as a short list"),
      cells: {
        effect: { level: 2, reason: tt("Everyone who checks the hours finds them at a glance.") },
        effort: { level: 1, reason: tt("One editor, one afternoon.") },
        risk: { level: 1, reason: tt("The same information, in a different form.") },
        timely: { level: 3, reason: tt("Live the same day.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Brightwater weighs three measures on effect on users, effort, risk and timeliness · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Weigh every measure on the same four questions and write the reason next to each rating. Effort is time and people. A measure with a high effect, little effort, low risk and a quick result usually comes first; a larger one can still be started early when it matters for the whole system.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["tasks", "search", "hours"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Brightwater · three measures for the website")}
          caption={tt("Three measures for Brightwater (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "effort", label: tt("Effort: time and people") },
            { id: "risk", label: tt("Risk") },
            { id: "timely", label: tt("Timeliness") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · inside logic against user logic (static) */

export function LogicFig() {
  return (
    <CompareFig
      label={tt("The same Brightwater services ordered by the inside logic and by the users' tasks")}
      left={tt("Inside logic")}
      right={tt("User logic")}
      rows={[
        [tt("The menu: Department of Sport, Facilities Management, Course Administration, Customer Office."), tt("The menu: Swim, Courses, Opening hours, My bookings.")],
        [tt("Each department lays out its own pages."), tt("Every course page has the same parts in the same order.")],
        [tt("The words are the centre's: “admission category”, “unit”."), tt("The words are the visitors': “ticket”, “course”.")],
        [tt("Visitors search, guess and call."), tt("Visitors recognise their task and are guided to it.")],
      ]}
      caption={tt("The content is the same on both sides. What changes is whose logic the structure follows.")}
    />
  );
}

export function SystemChainFig() {
  return (
    <ChainFig
      label={tt("From a single screen to the structure behind it")}
      steps={[
        { h: tt("The screen"), b: tt("Colours, layout, a button: what a team usually discusses."), kind: "m" },
        { h: tt("The structure"), b: tt("Page types and their parts, the same everywhere or not."), kind: "a" },
        { h: tt("The information architecture"), b: tt("What is grouped with what, how it is named, how people move through it."), kind: "a" },
        { h: tt("The organisation"), b: tt("Who owns which part, and whose logic wins when they disagree."), kind: "s" },
      ]}
      caption={tt("Organisations tend to build what mirrors their own structure. A problem that keeps coming back on the screen is often settled further to the right.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · conflicts in a matrix (interactive) */

export function ConflictFig() {
  return (
    <MatrixStory
      label={tt("Five Brightwater start pages by how much they show and how easily people find their task · Exploratory · Case assumption")}
      point={tt("More information on the first page does not mean better findability; past a point it means less. The aim is the top left of the right half: enough to see the main tasks, little enough to find them. A common way there is to show the few central tasks first and the rest one step deeper.")}
      title={tt("Brightwater start pages")}
      xLabel={tt("Information shown at once")}
      yLabel={tt("People find their task")}
      quads={[tt("Calm and clear"), tt("Rich and clear: the aim"), tt("Empty and unclear"), tt("Crowded")]}
      points={[
        { id: "p1", letter: "A", name: tt("Everything on the start page"), x: 0.9, y: 0.22, reading: tt("The department is happy that everything is visible; visitors find nothing because everything competes. Abundance against simplicity.") },
        { id: "p2", letter: "B", name: tt("Three tasks, the rest one step deeper"), x: 0.58, y: 0.82, reading: tt("The main tasks are on the page, everything else is one click away. Close to the aim.") },
        { id: "p3", letter: "C", name: tt("One photo and a menu"), x: 0.12, y: 0.3, reading: tt("Calm and modern, but the tasks are hidden behind the menu. Marketing's activation against findability.") },
        { id: "p4", letter: "D", name: tt("One template for every department"), x: 0.5, y: 0.62, reading: tt("IT's standard makes pages predictable, but a page that needs something special has to wait. Standardisation against fit.") },
        { id: "p5", letter: "E", name: tt("Each department its own box"), x: 0.78, y: 0.4, reading: tt("Every department is visible on the start page; visitors still have to know which one they need. Stakeholders against users.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Brightwater (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Brightwater")}
      boxes={[
        [tt("What we decide"), tt("The menu is named after the visitors' tasks on the website and in the booking system, starting with “Swim” and “Courses”.")],
        [tt("What we do not know"), tt("Whether most visitors browse the menu or use the search; the page views and the calls each show only a part.")],
        [tt("When we would reverse it"), tt("If the calls asking where to book do not drop within the first months.")],
        [tt("What we give up"), tt("The departments' own menu items, and a new colour scheme this year.")],
      ]}
      rule={[
        [tt("Who owns the structure"), tt("The head of digital services owns the menu, the names and the page patterns; each department owns its texts; the director settles a tie.")],
        [tt("How to decide next time"), tt("Name the users' task, the conflict and the risk, decide, and say when you will look again.")],
      ]}
      caption={tt("A wrong priority is not neutral: it shows up as calls, questions and dissatisfied visitors. That is why the decision says when it will be checked.")}
    />
  );
}
