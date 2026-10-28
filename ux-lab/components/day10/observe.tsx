"use client";

import { AppSim, CareGuideSim, ServiceSim } from "@/components/day10/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 10 · Route 2 · "Observe the company for real". The three channels of the brief (customer portal, app, service platform), what members and staff say in their
 * own words and what the company records. The brief's facts only: pilots that users do not understand, that patronise or misfit; AI seen inside as an innovation
 * signal; inconsistent data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from members and from the company's own staff, as the feedback inbox, the app reviews and the hotline notes show them.")}
      voices={[
        { who: "Ömer", meta: tt("member · 44"), device: tt("Laptop"), page: "/home", channel: tt("Feedback inbox"), text: tt("Why does my health portal recommend pregnancy articles to me? What does it think it knows about me?") },
        { who: "Hanne", meta: tt("member · 67"), device: tt("Phone"), channel: tt("App review"), text: tt("“You should drink more water today.” I am 67, not 7. Who decides that?") },
        { who: "Lea", meta: tt("member · 29"), channel: tt("E-mail"), text: tt("The appointment suggestion is great, I booked in ten seconds. Please more of that.") },
        { who: tt("A hotline agent"), meta: tt("our own staff"), text: tt("People call to ask how to switch the tips off. I have to tell them they can't.") },
        { who: tt("The innovation team"), meta: tt("our own staff"), text: tt("Competitors have a chat assistant in every channel. We need one by next year.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the company's systems can show today.")}
      reports={[
        { name: tt("Portal · recommendations"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Recommendations shown"), tt("yes")], [tt("Recommendations clicked"), tt("yes")], [tt("Whether a recommendation fitted"), tt("no")]], note: tt("Clicks are counted; whether a recommendation was right is not.") },
        { name: tt("App · smart tips"), note: tt("Tips are shown to everyone in the pilot; nobody can switch them off, so nobody knows who would.") },
        { name: tt("Data quality"), note: tt("Appointment data is complete; programme data partly; reading history only since the last update.") },
        { name: tt("Principles"), note: tt("No written principles for what the system may suggest exist.") },
      ]}
    />
  );
}

export function ObserveDay10() {
  const views: ObserveView[] = [
    { id: "portal", name: tt("The customer portal (CareGuide)"), node: <CareGuideSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "service", name: tt("The service platform"), node: <ServiceSim /> },
    { id: "voices", name: tt("What members and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the company records"), node: <Records /> },
  ];
  return <ObserveButton company="CareGuide" views={views} />;
}
