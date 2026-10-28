"use client";

import { MoveWellSim, PortalSim, ServiceSim } from "@/components/day9/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 9 · Route 2 · "Observe the company for real". The three channels of the brief (app, customer portal, service offer), what members and staff say in their own
 * words and what the company records. The brief's facts only: many start, only some stay; good content but little motivation; a debate about more gamification;
 * partly incomplete data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from members and from the company's own staff, as the feedback inbox, the app reviews and the coaching notes show them.")}
      voices={[
        { who: "Doris", meta: tt("member · 58"), device: tt("Phone"), page: "/log", channel: tt("App review"), text: tt("Good articles. But I log my walks and it just says “Entry stored”. After three weeks I stopped. Why bother?") },
        { who: "Jan", meta: tt("member · 31"), device: tt("Phone"), channel: tt("E-mail"), text: tt("I'd like to see if I'm actually getting fitter. The history is a table of dates.") },
        { who: "Birgit", meta: tt("member · 47"), channel: tt("Feedback inbox"), text: tt("Please no games. I have a heart condition, not a hobby.") },
        { who: tt("A prevention coach"), meta: tt("our own staff"), text: tt("On the phone people light up when I tell them what their walks already do for their blood pressure. The app never says that.") },
        { who: tt("A marketing manager"), meta: tt("our own staff"), text: tt("Competitors have badges and challenges. We look old-fashioned.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("App · logins"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Logins per member"), tt("yes")], [tt("Activities logged"), tt("yes")], [tt("Why a member stops"), tt("no")]], note: tt("Logins and entries are counted; the reason someone stops is not.") },
        { name: tt("Customer portal"), note: tt("Downloads of documents are counted; nobody links them to the app.") },
        { name: tt("Coaching calls"), note: tt("Booked calls are counted; what members say is in free-text notes only.") },
        { name: tt("Tests"), note: tt("No game element has been tested with members.") },
      ]}
    />
  );
}

export function ObserveDay9() {
  const views: ObserveView[] = [
    { id: "app", name: tt("The app (MoveWell)"), node: <MoveWellSim /> },
    { id: "portal", name: tt("The customer portal"), node: <PortalSim /> },
    { id: "service", name: tt("The service offer"), node: <ServiceSim /> },
    { id: "voices", name: tt("What members and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="MoveWell" views={views} />;
}
