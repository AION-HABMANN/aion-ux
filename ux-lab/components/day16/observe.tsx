"use client";

import { CustomerAppSim, InnovationWikiSim, NextWorldSim } from "@/components/day16/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 16 · Route 2 · "Observe the company for real". The company's channels (the innovation wiki, the customer app, the decision board), what customers and staff
 * say in their own words and what the company records. The brief's facts only: several prototypes and pilots, no portfolio logic, incomplete data on use, effect
 * and acceptance, reputational and investment risks. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own staff, as the service inbox, the staff survey and the meeting notes show them.")}
      voices={[
        { who: "Ingrid", meta: tt("customer"), channel: tt("App review"), text: tt("The new features all look different. I never know which part of the app I'm in.") },
        { who: "Omar", meta: tt("customer"), channel: tt("Chat"), text: tt("Was I talking to a person or a bot? It never said.") },
        { who: tt("A staff academy trainer"), meta: tt("our own staff"), text: tt("The emotion-adaptive module slowed down whenever I frowned at my coffee. Colleagues found it creepy.") },
        { who: tt("An IT lead"), meta: tt("our own staff"), text: tt("Five lines, five vendors. Every update breaks something.") },
        { who: tt("The innovation lead"), meta: tt("our own staff"), text: tt("If we cut lines now, we lose the momentum we built.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Project reporting"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("What each project spent"), tt("yes")], [tt("What each project achieved, on one scale"), tt("no")], [tt("Repeat use of each feature"), tt("for the chat only")]], note: tt("Each project reports in its own format.") },
        { name: tt("Ethics and data protection"), note: tt("Reviews were done for one of five lines; no rule says when a review is needed.") },
        { name: tt("Stopping"), note: tt("No project has ever been stopped; there is no process for it.") },
        { name: tt("Market acceptance"), note: tt("No customer survey on the new features yet.") },
      ]}
    />
  );
}

export function ObserveDay16() {
  const views: ObserveView[] = [
    { id: "board", name: tt("The decision board (NextWorld UX)"), node: <NextWorldSim /> },
    { id: "wiki", name: tt("The innovation wiki"), node: <InnovationWikiSim /> },
    { id: "app", name: tt("The customer app"), node: <CustomerAppSim /> },
    { id: "voices", name: tt("What customers and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="NextWorld" views={views} />;
}
