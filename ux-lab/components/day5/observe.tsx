"use client";

import { AdminSim, AppSim, MoveEasyPhoneSim } from "@/components/day5/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 5 · Route 2 · "Observe the company for real". The three interfaces of the brief (customer portal, service app, administration interface), what customers and staff
 * say in their own words and what the company records. The brief's facts only: processes work but are slow, error-prone and hard for first-time users; mobile use grows;
 * the user data is partial. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from customers and from the company's own staff, as the feedback inbox and the service tickets show them.")}
      voices={[
        { who: "Hanna", meta: tt("customer · month ticket"), device: tt("Phone"), page: "/book", channel: tt("App review"), text: tt("I wanted a day ticket and got a month ticket 9 am. The buttons are so small and so close that I tapped the one next to it.") },
        { who: "Erik", meta: tt("customer · occasional"), device: tt("Phone"), channel: tt("Contact form"), text: tt("On the confirmation page it asks whether the conditions apply, but the conditions were on the page before. I went back three times.") },
        { who: "Leyla", meta: tt("customer · first time"), page: "/start", channel: tt("E-mail"), text: tt("Where do I actually book? I saw four offers and a tiny word “Book” in the corner.") },
        { who: tt("A service desk agent"), meta: tt("our own staff"), text: tt("Refund, Reissue and Block sit side by side and look the same. Last week a colleague blocked a card instead of reissuing it.") },
        { who: tt("Product team"), meta: tt("our own team"), text: tt("Next quarter we want to add a carbon calculator and a loyalty programme.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Service · subjects of contacts"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("Wrong ticket booked"), tt("yes")], [tt("Tapped by mistake"), tt("yes")], [tt("Refund request"), tt("yes")]], note: tt("The subject is recorded; the element the customer tapped is not.") },
        { name: tt("Portal · completed bookings"), note: tt("Completed bookings are recorded, by device. Abandoned bookings are not.") },
        { name: tt("Mis-taps and corrections"), note: tt("Not recorded in any system.") },
        { name: tt("Which functions are used"), note: tt("Not measured.") },
      ]}
    />
  );
}

export function ObserveDay5() {
  const views: ObserveView[] = [
    { id: "portal", name: tt("The customer portal on a phone (MoveEasy)"), node: <MoveEasyPhoneSim /> },
    { id: "app", name: tt("The service app"), node: <AppSim /> },
    { id: "admin", name: tt("The administration interface"), node: <AdminSim /> },
    { id: "voices", name: tt("What customers and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="MoveEasy" views={views} />;
}
