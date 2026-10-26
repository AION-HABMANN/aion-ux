"use client";

import { AppSim, MyEnergySim, ServiceSim } from "@/components/day4/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 4 · Route 2 · "Observe the company for real". The three touchpoints of the brief (customer portal, app, service platform), what customers say in their own words
 * and what the company records. The brief's facts only: most tasks can be done, but with much searching, uncertainty and support; the inside discusses new functions;
 * the user data is partial. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own teams, as the feedback inbox and the service tickets show them.")}
      voices={[
        { who: "Ingrid", meta: tt("customer · electricity"), device: tt("Laptop"), page: "/meter", channel: tt("Phone"), text: tt("It said “your entry has been processed”. Processed how? Did it arrive? I called to be sure.") },
        { who: "Malik", meta: tt("customer · gas and electricity"), device: tt("Phone"), channel: tt("App review"), text: tt("In the app it is “payment schedule”, on the website “instalment adjustment”. I thought these were two different things.") },
        { who: "Ruth", meta: tt("customer · new"), page: "/start", channel: tt("E-mail"), text: tt("I had to find my meter number on an old bill, go back, and start the form again. Twice.") },
        { who: tt("A service agent"), meta: tt("our own team"), text: tt("Half my calls are people who did the task online and are not sure it worked.") },
        { who: tt("Product team"), meta: tt("our own team"), text: tt("Next quarter we want to launch the smart home dashboard and an energy coach.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Service · subjects of contacts"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("Did my entry arrive?"), tt("yes")], [tt("Where do I change my instalment?"), tt("yes")], [tt("Where is my meter number?"), tt("yes")]], note: tt("The subject is recorded; the step where the customer got stuck is not.") },
        { name: tt("Portal · finished processes"), note: tt("Finished meter readings and instalment changes are recorded; abandoned ones are not.") },
        { name: tt("App · crashes"), note: tt("Crashes are recorded; abandoned steps are not.") },
        { name: tt("Which functions customers never use"), note: tt("Not measured.") },
      ]}
    />
  );
}

export function ObserveDay4() {
  const views: ObserveView[] = [
    { id: "portal", name: tt("The customer portal (MyEnergy)"), node: <MyEnergySim /> },
    { id: "app", name: tt("The mobile app"), node: <AppSim /> },
    { id: "service", name: tt("The service platform"), node: <ServiceSim /> },
    { id: "voices", name: tt("What customers say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="MyEnergy" views={views} />;
}
