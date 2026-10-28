"use client";

import { AppSim, CityHelpSim, PortalSim } from "@/components/day11/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 11 · Route 2 · "Observe the company for real". The three channels of the brief (the voice assistant on the phone line, the service portal, the app with its
 * voice search pilot), what citizens and staff say in their own words and what the company records. The brief's facts only: comfort gains, misunderstandings, loss
 * of control and low acceptance in sensitive situations; voice seen inside as an innovation signal; limited test data. No total, no verdict, no figure the plan
 * does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from citizens and from the company's own staff, as the feedback inbox, the app reviews and the call notes show them.")}
      voices={[
        { who: "Erika", meta: tt("citizen · 74"), device: tt("Landline"), channel: tt("Call note"), text: tt("Booked my appointment in a minute at 10 pm. I didn't think a machine could do that.") },
        { who: "Deniz", meta: tt("citizen · 38"), device: tt("Phone"), channel: tt("Feedback inbox"), text: tt("I said I had moved and it said “Error 422”. What is that supposed to mean?") },
        { who: "Paul", meta: tt("citizen · 52"), channel: tt("E-mail"), text: tt("It read out my benefit decision on the loudspeaker in the office kitchen. Never again.") },
        { who: tt("A citizen service agent"), meta: tt("our own staff"), text: tt("We get the calls the assistant could not finish, and the callers are angrier than before.") },
        { who: tt("The digital team"), meta: tt("our own staff"), text: tt("Other cities have voice in every channel. We should be first in our region, not last.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Phone line · CityHelp Voice"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Calls started"), tt("yes")], [tt("Calls finished by voice"), tt("yes")], [tt("Why a call failed"), tt("no")]], note: tt("Finished calls are counted; the reason a call failed is not.") },
        { name: tt("Tests"), note: tt("Two sessions with a few dozen citizens; no sensitive requests were tested on purpose.") },
        { name: tt("App · voice search"), note: tt("A pilot; searches are counted, whether the result helped is not.") },
        { name: tt("Principles"), note: tt("No written voice principles or test standards exist; each vendor writes its own prompts.") },
      ]}
    />
  );
}

export function ObserveDay11() {
  const views: ObserveView[] = [
    { id: "voice", name: tt("The phone line (CityHelp Voice)"), node: <CityHelpSim hints={false} /> },
    { id: "portal", name: tt("The service portal"), node: <PortalSim /> },
    { id: "app", name: tt("The app (voice search pilot)"), node: <AppSim /> },
    { id: "voices", name: tt("What citizens and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="CityHelp" views={views} />;
}
