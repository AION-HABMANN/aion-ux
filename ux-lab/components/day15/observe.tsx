"use client";

import { ResearchNewsSim, ServicePortalSim, VisionMindSim } from "@/components/day15/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 15 · Route 2 · "Observe the company for real". The company's channels (the service portal, the lab's news, the research board), what customers and staff say
 * in their own words and what the company records. The brief's facts only: differentiation and insight hoped for, data protection, ethics and maturity
 * unstructured, high ethical sensitivity, patchy acceptance data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own staff, as the service inbox, an internal survey and the meeting notes show them.")}
      voices={[
        { who: "Henrike", meta: tt("customer"), channel: tt("Service inbox"), text: tt("I read in your newsletter that you can see what customers think. Do you watch me when I use the portal?") },
        { who: "Tomasz", meta: tt("customer"), channel: tt("Phone"), text: tt("I just want to find where to report a move. I've called three times.") },
        { who: tt("A researcher"), meta: tt("our own staff"), text: tt("We've never analysed gaze data. I don't want our first study to become a marketing slide.") },
        { who: tt("A works council member"), meta: tt("our own staff"), text: tt("Colleagues wore headbands at lunch because the boss asked. That is not voluntary.") },
        { who: tt("The innovation lead"), meta: tt("our own staff"), text: tt("Competitors talk about neuro-UX. If we wait, we look old.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Portal analytics"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Page views and clicks"), tt("yes")], [tt("Where people give up in a task"), tt("partly")], [tt("Why they give up"), tt("no")]], note: tt("Clicks are counted; reasons are not.") },
        { name: tt("Research"), note: tt("A team of three runs classic usability tests; no gaze or EEG analysis so far.") },
        { name: tt("Consent"), note: tt("No consent text for gaze or brain data exists; the lunch test had none.") },
        { name: tt("Acceptance"), note: tt("No customer has been asked about measurement of their attention.") },
      ]}
    />
  );
}

export function ObserveDay15() {
  const views: ObserveView[] = [
    { id: "board", name: tt("The research board (VisionMind Lab)"), node: <VisionMindSim /> },
    { id: "portal", name: tt("The customer service portal"), node: <ServicePortalSim /> },
    { id: "news", name: tt("The lab's news"), node: <ResearchNewsSim /> },
    { id: "voices", name: tt("What customers and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="VisionMind" views={views} />;
}
