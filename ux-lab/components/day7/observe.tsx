"use client";

import { AppSim, LifeSupportSim, WebsiteSim } from "@/components/day7/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 7 · Route 2 · "Observe the company for real". The three channels of the brief (website, customer portal, app), what customers and staff say in their own words
 * and what the company records. The brief's facts only: functionally solid offers, little emotional bond, emotion seen as marketing, partial data on emotional effect.
 * No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own staff, as the feedback inbox, the app reviews and the support tickets show them.")}
      voices={[
        { who: "Birgit", meta: tt("customer · results"), device: tt("Laptop"), page: "/results", channel: tt("Phone"), text: tt("It said some values were outside the range and to contact my physician “if required”. Is it required? I did not sleep that night.") },
        { who: "Kemal", meta: tt("customer · booking"), device: tt("Phone"), channel: tt("App review"), text: tt("Works, but it feels like talking to a machine. After booking I was not even sure it had worked.") },
        { who: "Ute", meta: tt("customer · first check-up"), page: "/", channel: tt("E-mail"), text: tt("Your website says you are with me every step of the way. The portal does not feel like that.") },
        { who: tt("A support agent"), meta: tt("our own staff"), text: tt("Much of my day is people asking whether their booking worked or whether something is wrong with their results.") },
        { who: tt("A marketing manager"), meta: tt("our own staff"), text: tt("We made the campaign warm and personal. What happens in the portal is not ours to decide.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Support · subjects of contacts"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("Did my booking work?"), tt("yes")], [tt("Is something wrong with my results?"), tt("yes")], [tt("Upload problems"), tt("yes")]], note: tt("The subject is recorded, not how the customer felt.") },
        { name: tt("Portal · use"), note: tt("Logins and bookings are counted; why people stop using it is not known.") },
        { name: tt("App store reviews"), note: tt("The only written source on how people feel; nobody reads them regularly.") },
        { name: tt("Emotional effect"), note: tt("Never measured; there is no survey and no test.") },
      ]}
    />
  );
}

export function ObserveDay7() {
  const views: ObserveView[] = [
    { id: "website", name: tt("The website"), node: <WebsiteSim /> },
    { id: "portal", name: tt("The customer portal (LifeSupport)"), node: <LifeSupportSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "voices", name: tt("What customers and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="LifeSupport" views={views} />;
}
