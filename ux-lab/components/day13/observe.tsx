"use client";

import { AppSim, LifeGuideSim, WebsiteSim } from "@/components/day13/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 13 · Route 2 · "Observe the organisation for real". The three channels of the brief (website, portal, app), what users and staff say in their own words and
 * what the organisation records. The brief's facts only: formally accessible but not usable enough for different cognitive and sensory needs, complaints about
 * overload, unclarity and reading difficulties, a debate about options against a new base, patchy test data. No total, no verdict, no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from users and from the organisation's own staff, as the feedback inbox, the app reviews and the support notes show them.")}
      voices={[
        { who: "Jannik", meta: tt("user · 27 · ADHD"), device: tt("Phone"), channel: tt("App review"), text: tt("Every time I open the app something new blinks at me. I came to book a session and ended up reading a quiz.") },
        { who: "Frieda", meta: tt("user · 41 · autistic"), channel: tt("E-mail"), text: tt("The booking page looks different from the offers page, and the button says something different each time. I never know what will happen when I press it.") },
        { who: "Paula", meta: tt("carer · 56"), channel: tt("Feedback inbox"), text: tt("I read the offers text three times. My son has dyslexia; he gave up after the first line.") },
        { who: tt("A support worker"), meta: tt("our own staff"), text: tt("People call to ask what the error message means. It says their session expires, and they panic.") },
        { who: tt("The product team"), meta: tt("our own staff"), text: tt("We could ship an easy mode switch this quarter. That would answer the complaints.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the organisation's systems can show today.")}
      reports={[
        { name: tt("Complaints"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Complaints about overload, unclarity, reading"), tt("yes, counted")], [tt("Which journey"), tt("sometimes")], [tt("Whether the person is neurodivergent"), tt("no, and should not be asked")]], note: tt("Complaints are counted; they are not sorted by journey or by kind of hurdle.") },
        { name: tt("Tests"), note: tt("No usability test with neurodivergent users on record.") },
        { name: tt("Design system"), note: tt("Exists, but nobody owns it; each product changes it.") },
        { name: tt("Abandoned forms"), note: tt("The booking form is started more often than it is sent; why is not known.") },
      ]}
    />
  );
}

export function ObserveDay13() {
  const views: ObserveView[] = [
    { id: "portal", name: tt("The portal (LifeGuide)"), node: <LifeGuideSim /> },
    { id: "web", name: tt("The website"), node: <WebsiteSim /> },
    { id: "app", name: tt("The app"), node: <AppSim /> },
    { id: "voices", name: tt("What users and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the organisation records"), node: <Records /> },
  ];
  return <ObserveButton company="LifeGuide" views={views} />;
}
