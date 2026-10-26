"use client";

import { AppSim, CitizenFlowSim, StaffSim } from "@/components/day6/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 6 · Route 2 · "Observe the administration for real". The three channels of the brief (citizen portal, app, internal administration interface), what citizens and
 * staff say in their own words and what the administration records. The brief's facts only: teams with their own patterns, breaks, uncertainty and searching, partly
 * incomplete data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from citizens and from the administration's own staff, as the feedback inbox and the support tickets show them.")}
      voices={[
        { who: "Ilse", meta: tt("citizen · residence certificate"), device: tt("Laptop"), page: "/residents/certificate", channel: tt("Phone"), text: tt("The form asked for my residence permit number. I am German. I did not know whether I had to fill it in, so I called.") },
        { who: "Dario", meta: tt("citizen · parking permit"), device: tt("Phone"), channel: tt("App review"), text: tt("In the app the button is at the top, on the website at the bottom. Every service works differently.") },
        { who: "Maren", meta: tt("citizen · first time"), page: "/residents", channel: tt("E-mail"), text: tt("I pressed Save instead of Send and waited two weeks for nothing.") },
        { who: tt("A case worker"), meta: tt("our own staff"), text: tt("Many applications come in with fields filled that do not apply, or without the one that does. We spend our time sorting that out.") },
        { who: tt("A team lead, vehicles"), meta: tt("our own staff"), text: tt("We built our pages the way our process works. We would happily use shared components, but there are none.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the administration's systems can show today.")}
      reports={[
        { name: tt("Support · subjects of contacts"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("Which fields do I fill in?"), tt("yes")], [tt("Where do I send it?"), tt("yes")], [tt("Status of my application"), tt("yes")]], note: tt("The subject is recorded, not the page or the field.") },
        { name: tt("Portal · submitted applications"), note: tt("Submitted applications are recorded; saved but unsent ones and abandoned steps are not.") },
        { name: tt("Case desk · returned applications"), note: tt("Applications sent back for missing information are counted by each team in its own way.") },
        { name: tt("Shared components"), note: tt("None exist; each team keeps its own.") },
      ]}
    />
  );
}

export function ObserveDay6() {
  const views: ObserveView[] = [
    { id: "portal", name: tt("The citizen portal (CitizenFlow)"), node: <CitizenFlowSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "staff", name: tt("The internal administration interface"), node: <StaffSim /> },
    { id: "voices", name: tt("What citizens and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the administration records"), node: <Records /> },
  ];
  return <ObserveButton company="CitizenFlow" views={views} />;
}
