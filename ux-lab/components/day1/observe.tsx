"use client";

import { AppSim, ChatbotSim, SafeHomeSim, WebsiteSim } from "@/components/day1/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 1 · Route 2 · "Observe the company for real". The four touchpoints of the brief (website, customer portal, app, chatbot), what customers say in their own words
 * and what the company records. The brief's facts only: users are lost between channels, complaints rise, conversion stagnates, the data is partial (support, web
 * analytics, sales). No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Complaints and messages from customers, as the service centre and the feedback inbox show them.")}
      voices={[
        { who: "Petra", meta: tt("customer · household contents"), device: tt("Laptop"), page: "/service", channel: tt("Phone"), text: tt("I started on the website, was sent to the portal, had to log in again, and then I could not find where to report the water damage. In the end I called.") },
        { who: "Okan", meta: tt("customer · liability"), device: tt("Phone"), channel: tt("App review"), text: tt("The app lets me report an incident, but for the photos it sends me to the web portal. Why not in the app?") },
        { who: "Ruth", meta: tt("customer · buildings"), channel: tt("E-mail"), text: tt("The chatbot told me to use the damage report, the app calls it an incident and the website says notify us of a loss. I was not sure it was the same thing.") },
        { who: tt("A service centre agent"), meta: tt("our own team"), text: tt("Many callers have already tried online. They usually ask where they are in the process and whether their report arrived.") },
        { who: tt("A sales agent"), meta: tt("our own team"), text: tt("Interested people leave when they are asked for the same details a second time in another channel.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today. Each department records its own part.")}
      reports={[
        { name: tt("Support · reasons for calls"), head: [tt("Reason"), tt("Recorded?")], rows: [[tt("Damage report"), tt("yes")], [tt("Where is my report"), tt("yes")], [tt("Login problems"), tt("yes")]], note: tt("Support records the reason for a call, not which channel the customer tried before.") },
        { name: tt("Web analytics · page views"), note: tt("Page views of the website are recorded. The portal, the app and the chatbot are not connected to it.") },
        { name: tt("Sales · signed contracts"), note: tt("Sales records signed contracts, not the channel in which a person stopped.") },
        { name: tt("The path a customer takes across channels"), note: tt("Not recorded.") },
        { name: tt("Customer satisfaction"), note: tt("No survey is run. The complaints in “What customers say” reached the company by themselves.") },
      ]}
    />
  );
}

export function ObserveDay1() {
  const views: ObserveView[] = [
    { id: "web", name: tt("The website"), node: <WebsiteSim /> },
    { id: "portal", name: tt("The customer portal (SafeHome Online)"), node: <SafeHomeSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "bot", name: tt("The chatbot"), node: <ChatbotSim /> },
    { id: "voices", name: tt("What customers say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="SafeHome" views={views} />;
}
