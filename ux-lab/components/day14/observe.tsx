"use client";

import { IndustryXRSim, LabNewsSim, ServicePortalSim } from "@/components/day14/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 14 · Route 2 · "Observe the company for real". The company's channels (the service portal, the innovation lab's news, the pilot board), what customers and
 * staff say in their own words and what the company records. The brief's facts only: AR and VR seen as a great chance, no priorities, criteria or governance,
 * maturity varying by use case, patchy acceptance data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own staff, as the service inbox, the lab's survey and the meeting notes show them.")}
      voices={[
        { who: "Marek", meta: tt("customer · service technician"), channel: tt("Service inbox"), text: tt("I don't need holograms. I need the right manual page when I'm standing at the machine with greasy hands.") },
        { who: "Birte", meta: tt("customer · training lead"), channel: tt("E-mail"), text: tt("We tried a VR safety demo at your fair. Two of my people felt sick after five minutes.") },
        { who: tt("A service engineer"), meta: tt("our own staff"), text: tt("Half of my trips are to explain something a video call could show. Remote help would save days.") },
        { who: tt("The innovation lab"), meta: tt("our own staff"), text: tt("We have five great demos. We just need budget to take them further.") },
        { who: tt("Finance"), meta: tt("our own staff"), text: tt("Nobody can tell me what any of the demos saved or earned.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Service trips"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Trips per month"), tt("yes")], [tt("Trips that a remote call could have replaced"), tt("no")], [tt("Repeat visits"), tt("yes")]], note: tt("Trips are counted; why they were needed is not.") },
        { name: tt("Innovation lab"), note: tt("Five demos in two years; no success measures were set; none reached daily use.") },
        { name: tt("Acceptance"), note: tt("One informal survey at a fair; no tests in daily work.") },
        { name: tt("Network"), note: tt("Halls have Wi-Fi; outdoor and customer sites often do not.") },
      ]}
    />
  );
}

export function ObserveDay14() {
  const views: ObserveView[] = [
    { id: "board", name: tt("The pilot board (IndustryXR)"), node: <IndustryXRSim /> },
    { id: "portal", name: tt("The service portal"), node: <ServicePortalSim /> },
    { id: "lab", name: tt("The innovation lab's news"), node: <LabNewsSim /> },
    { id: "voices", name: tt("What customers and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="IndustryXR" views={views} />;
}
