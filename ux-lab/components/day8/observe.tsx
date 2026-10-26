"use client";

import { GreenHomeSim, SelfServiceSim, WebsiteSim } from "@/components/day8/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 8 · Route 2 · "Observe the company for real". The three channels of the brief (website, advisory platform, self-service flows), what customers and staff say in
 * their own words and what the company records. The brief's facts only: processes that work, journeys that feel administrative and interchangeable, storytelling seen
 * as communication, partly incomplete data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own staff, as the feedback inbox, the app reviews and the support tickets show them.")}
      voices={[
        { who: "Henrike", meta: tt("customer · onboarding"), device: tt("Laptop"), page: "/onboarding/section-b", channel: tt("Phone"), text: tt("I was at Section B and had no idea how much more there was or what I would get at the end. I stopped.") },
        { who: "Jens", meta: tt("customer · funding"), device: tt("Phone"), channel: tt("App review"), text: tt("The website says “we walk the way with you”. The app gives me Form F-1 and nothing else.") },
        { who: "Aylin", meta: tt("customer · meter reading"), page: "/self-service/meter", channel: tt("E-mail"), text: tt("Works fine. Quick. I don't need more than that.") },
        { who: tt("An energy advisor"), meta: tt("our own staff"), text: tt("When I explain on the phone why we ask for the year of construction, people get it at once. The portal never says why.") },
        { who: tt("A marketing manager"), meta: tt("our own staff"), text: tt("Our story is on the website. The flows are built by the product teams; that is not our area.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Support · subjects of contacts"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("How much more is there?"), tt("yes")], [tt("What do I get at the end?"), tt("yes")], [tt("Why do you need this field?"), tt("yes")]], note: tt("The subject is recorded, not the section where the customer stopped.") },
        { name: tt("Onboarding · starts and completions"), note: tt("Starts and completed onboardings are counted; the section where people stop is not.") },
        { name: tt("Self-service flows"), note: tt("Each flow counts its submissions; nobody compares the flows.") },
        { name: tt("Tests"), note: tt("No journey has been tested with users.") },
      ]}
    />
  );
}

export function ObserveDay8() {
  const views: ObserveView[] = [
    { id: "website", name: tt("The website"), node: <WebsiteSim /> },
    { id: "portal", name: tt("The advisory platform (GreenHome)"), node: <GreenHomeSim /> },
    { id: "self", name: tt("The self-service flows"), node: <SelfServiceSim /> },
    { id: "voices", name: tt("What customers and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="GreenHome" views={views} />;
}
