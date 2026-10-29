"use client";

import { CitizenConnectSim, CustomerPortalSim, WebsiteSim } from "@/components/day12/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 12 · Route 2 · "Observe the organisation for real". The three channels of the brief (website, customer portal, digital service processes), what citizens and
 * staff say in their own words and what the organisation records. The brief's facts only: systems that formally work but are not equally accessible, rising
 * complaints about legibility, operability and comprehensibility, accessibility seen inside as compliance, incomplete data on real barriers. No total, no verdict,
 * no figure the plan does not print.
 */
function Voices() {
  return (
    <VoicesView
      intro={tt("Messages from citizens and from the organisation's own staff, as the complaints inbox and the phone notes show them.")}
      voices={[
        { who: "Margarete", meta: tt("citizen · 79"), device: tt("Tablet"), channel: tt("Phone note"), text: tt("The grey writing is too light. My grandson does my applications now, and I do not like that.") },
        { who: "Yusuf", meta: tt("citizen · 34 · blind"), device: tt("Laptop with screen reader"), channel: tt("E-mail"), text: tt("I can open the appointment page but cannot choose a time: my screen reader says nothing. I had to call.") },
        { who: "Ines", meta: tt("citizen · 22 · dyslexia"), channel: tt("Complaints inbox"), text: tt("The housing benefit form took me two hours. I still don't know if I filled it in right.") },
        { who: tt("A citizen service agent"), meta: tt("our own staff"), text: tt("Half of my calls are people who could not finish an online form.") },
        { who: tt("The legal team"), meta: tt("our own staff"), text: tt("We publish the accessibility statement every year. Legally we are covered.") },
      ]}
    />
  );
}

function Records() {
  return (
    <RecordsView
      intro={tt("What the organisation's systems can show today.")}
      reports={[
        { name: tt("Complaints"), head: [tt("Data"), tt("Recorded?")], rows: [[tt("Number of complaints"), tt("yes")], [tt("Which barrier"), tt("no, free text")], [tt("Which page"), tt("sometimes")]], note: tt("Complaints are counted; which barrier caused them is not sorted.") },
        { name: tt("Last year's audit"), note: tt("A long list of failures by an external auditor; nobody owns the list.") },
        { name: tt("Templates"), note: tt("An agency builds the page templates; the contract does not name an accessibility level.") },
        { name: tt("Tests"), note: tt("No test with disabled citizens is on record.") },
      ]}
    />
  );
}

export function ObserveDay12() {
  const views: ObserveView[] = [
    { id: "portal", name: tt("The service portal (CitizenConnect)"), node: <CitizenConnectSim /> },
    { id: "web", name: tt("The website"), node: <WebsiteSim /> },
    { id: "account", name: tt("The customer portal"), node: <CustomerPortalSim /> },
    { id: "voices", name: tt("What citizens and staff say"), node: <Voices /> },
    { id: "records", name: tt("What the organisation records"), node: <Records /> },
  ];
  return <ObserveButton company="CitizenConnect" views={views} />;
}
