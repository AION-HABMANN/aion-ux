"use client";

import { useState } from "react";
import { MeasureThumb } from "@/components/day6/mocks";
import { MatrixStory } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { DisclosureLab, GestaltLab, HierarchyLab, PatternLab } from "@/components/day6/labs";

/**
 * Day 6 · the teaching diagrams of Materi A and B. Example: Seabird Ferries, a made-up ferry operator, with Elif and Noah (passengers), Greta (design-system lead) and
 * Malte (product owner); never OfficeSphere, CareAssist or CitizenFlow, so no task is answered here. Interactive ones carry "The point" and an always-visible "What this
 * shows"; the story of each card is its pixel comic (data/day6/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · Gestalt laws (interactive) */

export function GestaltFig() {
  return <GestaltLab />;
}

/* ------------------------------------------------------------------ A2 · visual hierarchy (interactive) */

export function HierarchyFig() {
  return <HierarchyLab />;
}

/* ------------------------------------------------------------------ A3 · progressive disclosure (interactive) */

export function DisclosureFig() {
  return <DisclosureLab />;
}

/* ------------------------------------------------------------------ A4 · consistency across areas (interactive) */

export function PatternFig() {
  return <PatternLab />;
}

/* ------------------------------------------------------------------ A5 · from law to screen (static) and three measures (interactive) */

export function SystemChainFig() {
  return (
    <ChainFig
      label={tt("From a UX law to every screen built from it")}
      steps={[
        { h: tt("A UX law"), b: tt("For example: people see things in one frame as a group (common region)."), kind: "m" },
        { h: tt("A principle"), b: tt("“Every page type groups related content in framed sections.”"), kind: "a" },
        { h: tt("A component and a pattern"), b: tt("A section component and a page pattern that use it."), kind: "a" },
        { h: tt("Every screen"), b: tt("Built from the pattern, so it follows the law without anyone having to remember it."), kind: "s" },
      ]}
      caption={tt("UX laws matter for components, patterns and standards, not only for single screens. Built in once, they hold everywhere.")}
    />
  );
}

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "groups",
      name: tt("Group the booking page into framed sections"),
      cells: {
        effect: { level: 2, reason: tt("Passengers find tickets and travel information at a glance.") },
        feasibility: { level: 3, reason: tt("Spacing, frames and labels on one page type.") },
        risk: { level: 1, reason: tt("Nothing is removed.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "form",
      name: tt("Show only the current step of the booking form"),
      cells: {
        effect: { level: 3, reason: tt("Every booking gets lighter; foot passengers see three fields instead of twelve.") },
        feasibility: { level: 2, reason: tt("The form logic has to know which fields apply; the developers need a few weeks.") },
        risk: { level: 2, reason: tt("Rules hidden too deep would turn reduction into hiding; they must sit next to their field.") },
        time: { level: 2, reason: tt("It takes two releases.") },
      },
    },
    {
      id: "component",
      name: tt("One shared booking-form component for tickets and freight"),
      cells: {
        effect: { level: 3, reason: tt("Tickets and freight work the same; what passengers learn once works everywhere.") },
        feasibility: { level: 1, reason: tt("Both teams have to move to the component; it needs time from both and from the design-system lead.") },
        risk: { level: 2, reason: tt("The freight team has special fields; the component must allow them.") },
        time: { level: 1, reason: tt("It takes longer than a quarter, but every later form benefits.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Seabird weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A quick fix on one page and a shared component can both be right; they differ in feasibility and time. Weigh each on the same four questions, with the reason next to each rating, and remember that the component keeps the quick fixes in place.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["groups", "form", "component"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Seabird · three measures for the website")}
          caption={tt("Three measures for Seabird (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · teams' own patterns against one design system (static) */

export function SystemFig() {
  return (
    <CompareFig
      label={tt("Seabird's teams building their own patterns, or building from one design system")}
      left={tt("Each team its own patterns")}
      right={tt("One design system")}
      rows={[
        [tt("Tickets, freight and the app each build their own form."), tt("One form component, used by every team.")],
        [tt("A fix to the ticket form does nothing for freight."), tt("A fix to the component reaches every form at once.")],
        [tt("Passengers relearn each area."), tt("Passengers learn once and predict everywhere.")],
        [tt("Every new screen starts from scratch."), tt("New screens are built faster from ready parts.")],
      ]}
      caption={tt("Consistency, scale and steering: a design system turns UX principles into the easy path for every team.")}
    />
  );
}

export function LayersFig() {
  return (
    <ChainFig
      label={tt("What a design system holds, from principles to screens")}
      steps={[
        { h: tt("Principles"), b: tt("Group related content; one primary action per step; disclose step by step."), kind: "m" },
        { h: tt("Foundations"), b: tt("Spacing, colours, type levels, sizes."), kind: "a" },
        { h: tt("Components"), b: tt("Buttons, form fields, sections, status labels."), kind: "a" },
        { h: tt("Patterns and screens"), b: tt("Page types and flows assembled from the components."), kind: "s" },
      ]}
      caption={tt("Leaders steer at the left: the principles and who owns them. Teams build at the right, from what the system gives them.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · conflicts in a matrix (interactive) */

export function ConflictFig() {
  return (
    <MatrixStory
      label={tt("Five Seabird approaches by standardisation and how fast teams deliver · Exploratory · Case assumption")}
      point={tt("Short-term speed and long-term consistency pull against each other, but a good design system can serve both: when the shared component is the easy path, teams deliver faster and stay consistent. The aim is standardised and fast.")}
      title={tt("Seabird approaches")}
      xLabel={tt("Standardisation and consistency")}
      yLabel={tt("Teams deliver fast")}
      quads={[tt("Fast, inconsistent"), tt("Fast and consistent: the aim"), tt("Slow and inconsistent"), tt("Consistent, but slow")]}
      points={[
        { id: "p1", letter: "A", name: tt("Every team builds its own"), x: 0.12, y: 0.75, reading: tt("Fast today, but every area differs and every fix is done three times. Speed against system quality.") },
        { id: "p2", letter: "B", name: tt("A shared system that is easy to use"), x: 0.8, y: 0.8, reading: tt("Teams take ready components and deliver faster, and everything stays consistent. Close to the aim.") },
        { id: "p3", letter: "C", name: tt("A strict system with no exceptions"), x: 0.92, y: 0.25, reading: tt("Consistent, but a team with a special case waits months. Standardisation against flexibility.") },
        { id: "p4", letter: "D", name: tt("A system on paper only"), x: 0.4, y: 0.35, reading: tt("Rules exist but no components, so teams keep building their own. Neither consistent nor fast.") },
        { id: "p5", letter: "E", name: tt("A shared system with documented exceptions"), x: 0.7, y: 0.6, reading: tt("Teams may deviate with a reason and a review. Flexibility within consistency.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Seabird (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Seabird")}
      boxes={[
        [tt("What we decide"), tt("We build the booking form as one shared component with step-by-step disclosure and move tickets to it first, freight next.")],
        [tt("What we do not know"), tt("Which fields confuse passengers most; nobody records where a booking is abandoned.")],
        [tt("When we would reverse it"), tt("If the calls about luggage rules and wrong fields do not drop, or more bookings arrive with missing information.")],
        [tt("What we give up"), tt("The freight team's own form, and the design-system lead's time for new features this quarter.")],
      ]}
      rule={[
        [tt("Who owns the design system"), tt("The design-system lead owns the principles and components; each team uses them and may propose new ones.")],
        [tt("How a conflict is decided"), tt("The principles decide first; then how many teams need a component; the product owner settles a tie.")],
      ]}
      caption={tt("Missing visual order becomes an organisational problem when no one owns the patterns across teams. That is why the decision names the owner and says when it will be checked.")}
    />
  );
}
