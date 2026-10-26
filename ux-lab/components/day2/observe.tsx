"use client";

import { AppSim, CampusNowSim, SupportSim, WebsiteSim } from "@/components/day2/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 2 · Route 2 · "Observe the organisation for real". The four touchpoints of the brief (website, self-service portal, app, support area), what users say in their own
 * words and what the organisation records. The brief's facts only: users do not finish tasks efficiently, the inside discusses colours and layouts, the data is only partly
 * reliable. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from support, as the feedback inbox and the support tickets show them.")}
      voices={[
        { who: "Jonas", meta: tt("learner · booked once"), device: tt("Phone"), page: "/booking", channel: tt("Contact form"), text: tt("On my phone the course list does not fit. I scrolled sideways to find the Book link and then it asked for a participant number I don't have.") },
        { who: "Mira", meta: tt("learner · needs a certificate"), channel: tt("E-mail"), text: tt("I looked under Certificates, then Examinations Office, then Certificate Service. Three names for one thing. In the end I wrote to you.") },
        { who: "Paul", meta: tt("learner · new"), device: tt("Laptop"), page: "/", text: tt("The start page tells me about the annual report and the examination regulations. I only wanted to find an English course.") },
        { who: tt("A support agent"), meta: tt("our own team"), text: tt("Most questions are “where do I find …”. The answer is always there in the portal; people just don't see it.") },
        { who: tt("A department head"), meta: tt("Department III"), text: tt("Our unit needs its own box on the start page, otherwise nobody knows we exist.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the organisation's systems can show today. Each one records its own part.")}
      reports={[
        { name: tt("Support · subjects of questions"), head: [tt("Subject"), tt("Recorded?")], rows: [[tt("Where do I find …"), tt("yes")], [tt("Booking problems"), tt("yes")], [tt("Access data"), tt("yes")]], note: tt("Support records the subject, not on which device or page the person got stuck.") },
        { name: tt("Website · page views and searches"), note: tt("Page views and search terms of the website are recorded. The portal and the app are not connected to it.") },
        { name: tt("Portal · bookings"), note: tt("Finished bookings are recorded; started bookings that were abandoned are recorded only partly.") },
        { name: tt("Phone against desktop"), note: tt("Not recorded separately.") },
        { name: tt("Which task a user came for"), note: tt("Not recorded.") },
      ]}
    />
  );
}

export function ObserveDay2() {
  const views: ObserveView[] = [
    { id: "web", name: tt("The website"), node: <WebsiteSim /> },
    { id: "portal", name: tt("The self-service portal (CampusNow)"), node: <CampusNowSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "support", name: tt("The support area"), node: <SupportSim /> },
    { id: "voices", name: tt("What users say"), node: <Voices /> },
    { id: "records", name: tt("What the organisation records"), node: <Records /> },
  ];
  return <ObserveButton company="CampusNow" views={views} />;
}
