"use client";

import { AppSim, SecureLifeSim, WebsiteSim } from "@/components/day3/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 3 · Route 2 · "Observe the company for real". The three touchpoints of the brief (website, customer portal, app), what customers say in their own words and what the
 * company records. The brief's facts only: colours changed by campaign, type set by each team, users who find their way with difficulty, rising support requests, partly
 * incomplete data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own teams, as the feedback inbox and the support tickets show them.")}
      voices={[
        { who: "Helga", meta: tt("customer · household contents"), device: tt("Laptop"), page: "/reports", channel: tt("Phone"), text: tt("There is a red dot next to my report. Does red mean rejected? Nobody told me anything, so I called.") },
        { who: "Daniel", meta: tt("customer · liability"), device: tt("Phone"), channel: tt("App review"), text: tt("In the app the button is purple, on the website orange, in the portal blue. I never know what to press.") },
        { who: "Sevgi", meta: tt("customer · new"), page: "/start", channel: tt("E-mail"), text: tt("The text in the portal is so small and close together that I gave up reading and wrote to you instead.") },
        { who: tt("A support agent"), meta: tt("our own team"), text: tt("Half my calls are “has my report arrived?” and “what do I have to do now?”. The answer is on the screen, in a colour.") },
        { who: tt("Marketing"), meta: tt("our own team"), text: tt("The summer campaign needs its orange on the buttons, otherwise nobody notices it.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Support · subjects of requests"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("State of a damage report"), tt("yes")], [tt("What to do next"), tt("yes")], [tt("Login problems"), tt("yes")]], note: tt("Support records the subject, not the screen or the element the customer misread.") },
        { name: tt("Web analytics · page views"), note: tt("Page views of the website are recorded; clicks on buttons are not.") },
        { name: tt("Portal · reports submitted"), note: tt("Submitted reports are recorded; reports started and not submitted are not.") },
        { name: tt("Which colours and type styles each channel uses"), note: tt("Not documented. Each team keeps its own files.") },
      ]}
    />
  );
}

export function ObserveDay3() {
  const views: ObserveView[] = [
    { id: "web", name: tt("The website"), node: <WebsiteSim /> },
    { id: "portal", name: tt("The customer portal (SecureLife)"), node: <SecureLifeSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "voices", name: tt("What customers say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="SecureLife" views={views} />;
}
