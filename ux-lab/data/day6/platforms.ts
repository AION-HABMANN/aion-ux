import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): OfficeSphere as the plan describes it, the three CareAssist structures of Block 1.2, CitizenFlow as
 * it is today, and the administration's app and internal staff interface. Every link and button opens a real page. The plan's clues are kept exactly (much
 * information without grouping, similar functions designed differently, primary and secondary actions equally strong, every form field at once, competing notices,
 * status and navigation, different patterns for similar tasks; everything visible and dense, central content first with more step by step, reduced with context
 * hidden too deep; page types grouped differently, unseparated actions, every field at once, varying navigation patterns, unprioritised help and warnings, users who
 * must work out what is relevant) and nothing is added that changes the answer. The names and contents are made up; nothing is marked right or wrong, and no figure is
 * printed that the plan does not print.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });
/** Equally strong buttons for actions of different weight, as the plan names them. */
const EQUAL = { background: "#546E7A", color: "#fff", borderColor: "#546E7A" } as const;

/* ------------------------------------------------------------------ OfficeSphere, an internal administration portal */

const osPages = (): Record<string, PPage> => ({
  start: { title: tt("OfficeSphere"), blocks: [
    { t: "p", mark: 1, text: tt("News · New parking rules from Monday · The canteen is closed on Friday · Your open requests: 2 · Approvals waiting: 3 · Travel policy updated · IT maintenance on Saturday · Team event on the 14th") },
    { t: "links", small: true, mark: 5, items: [{ label: tt("⚠ Notice: password expires"), go: "notice", color: "#C62828" }, { label: tt("● 3 approvals waiting"), go: "approvals", color: "#BF360C" }, { label: tt("Requests"), go: "requests" }, { label: tt("Approvals"), go: "approvals" }, { label: tt("Documents"), go: "docs" }, { label: tt("Directory"), go: "directory" }] },
    { t: "cards", mark: 2, items: [
      { tag: tt("Requests"), title: tt("Request leave"), text: tt("Plan your holidays."), go: "leave" },
      { tag: tt("HR · Travel"), title: tt("TRAVEL REQUEST"), text: tt("Submit a business trip for approval."), go: "travel" },
      { tag: tt("Approvals"), title: tt("approve requests »"), text: tt("Requests of your team."), go: "approvals" },
    ] },
  ] },
  leave: { title: tt("Leave"), section: "requests", blocks: [
    { t: "h", text: tt("Request leave") },
    { t: "form", mark: 4, fields: [tt("From"), tt("To"), tt("Type of leave"), tt("Deputy"), tt("Special leave reason (special leave only)"), tt("Doctor's certificate (sick leave only)"), tt("Cost centre (part-time only)"), tt("Remarks")], button: tt("Check entries"), msg: tt("Entries checked.") },
    { t: "links", small: true, mark: 3, items: [{ label: tt("Submit"), go: "submitted", css: EQUAL }, { label: tt("Save draft"), go: "draft", css: EQUAL }, { label: tt("Print"), go: "printed", css: EQUAL }, { label: tt("Cancel"), go: "start", css: EQUAL }] },
  ] },
  travel: { title: tt("Travel"), section: "requests", blocks: [
    { t: "links", small: true, items: [{ label: tt("Next ›"), go: "travel2" }], mark: 6 },
    { t: "p", text: tt("Business trip · step 1") },
    { t: "form", fields: [tt("Destination"), tt("Dates")], button: tt("Save"), msg: tt("Saved.") },
  ] },
  travel2: { title: tt("Travel"), section: "requests", blocks: [{ t: "p", text: tt("Business trip · step 2") }, { t: "form", fields: [tt("Reason"), tt("Estimated costs")], button: tt("Send for approval"), msg: tt("Sent for approval.") }, back("travel", tt("Back"))] },
  submitted: { title: tt("Submitted"), blocks: [{ t: "p", text: tt("Your leave request has been submitted.") }, back("start", tt("Start"))] },
  draft: { title: tt("Draft"), blocks: [{ t: "p", text: tt("Your request has been saved as a draft. It has not been submitted.") }, back("start", tt("Start"))] },
  printed: { title: tt("Print"), blocks: [{ t: "p", text: tt("The request is being printed.") }, back("start", tt("Start"))] },
  requests: { title: tt("Requests"), section: "requests", blocks: [{ t: "h", text: tt("My requests") }, { t: "list", items: [tt("Leave · draft"), tt("Travel · waiting")] }, { t: "links", items: [{ label: tt("Request leave"), go: "leave" }, { label: tt("Travel request"), go: "travel" }] }, back("start", tt("Start"))] },
  approvals: { title: tt("Approvals"), section: "approvals", blocks: [{ t: "h", text: tt("Approvals") }, { t: "table", head: [tt("Request"), tt("From"), tt("Action")], rows: [[tt("Leave"), "A. Kaya", { label: tt("Open"), go: "approve1" }], [tt("Travel"), "J. Lind", { label: tt("Open"), go: "approve1" }]] }, back("start", tt("Start"))] },
  approve1: { title: tt("Approval"), section: "approvals", blocks: [{ t: "p", text: tt("Leave request of A. Kaya.") }, { t: "links", small: true, items: [{ label: tt("Approve"), go: "approved", css: EQUAL }, { label: tt("Reject"), go: "rejected", css: EQUAL }, { label: tt("Forward"), go: "approvals", css: EQUAL }] }] },
  approved: { title: tt("Approved"), blocks: [{ t: "p", text: tt("Approved.") }, back("approvals", tt("Approvals"))] },
  rejected: { title: tt("Rejected"), blocks: [{ t: "p", text: tt("Rejected.") }, back("approvals", tt("Approvals"))] },
  notice: { title: tt("Notice"), blocks: [{ t: "p", text: tt("Your password expires in the coming weeks. You can change it in the IT portal.") }, back("start", tt("Start"))] },
  docs: { title: tt("Documents"), section: "docs", blocks: [{ t: "list", items: [tt("Travel policy"), tt("Leave policy")] }, back("start", tt("Start"))] },
  directory: { title: tt("Directory"), section: "directory", blocks: [{ t: "person", name: "Anna Kaya", role: tt("Team assistant"), text: tt("Room 2.14") }, back("start", tt("Start"))] },
});

/** OfficeSphere as the plan describes it: no grouping, similar functions designed differently, equal actions, every form field at once, competing elements, different patterns. */
export const officeSphere = (): PlatformCfg => ({ name: "OfficeSphere", start: "start", color: "#37474F", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Requests"), go: "requests" }, { label: tt("Approvals"), go: "approvals" }, { label: tt("Documents"), go: "docs" }, { label: tt("Directory"), go: "directory" }], pages: osPages(), footer: productFooter("Internal portal") });

/* ------------------------------------------------------------------ CareAssist, a service platform: three structures */

const CARE_INFO = () => ({
  plan: tt("Your care plan: physiotherapy twice a week; next appointment Thursday."),
  costs: tt("Costs: covered by your insurance up to the agreed limit; a co-payment applies for extra sessions."),
  rules: tt("Cancellation: please cancel at least one working day before, or the session counts as used."),
  contact: tt("Your care coordinator: M. Berg, reachable on working days."),
});

function careBase(): Record<string, PPage> {
  const i = CARE_INFO();
  return {
    book: { title: tt("Book"), section: "start", blocks: [{ t: "h", text: tt("Book a session") }, { t: "form", fields: [tt("Day"), tt("Time")], button: tt("Book"), msg: tt("Booked.") }, back("start", tt("Start"))] },
    contact: { title: tt("Contact"), section: "start", blocks: [{ t: "p", text: i.contact }, { t: "chat", intro: tt("Write to your coordinator."), label: tt("Your message"), reply: tt("Thank you. Your coordinator will answer soon.") }, back("start", tt("Start"))] },
  };
}

/** Variant A: all information and options directly visible, a high transparency, but a strong density of information. */
export const careA = (): PlatformCfg => {
  const i = CARE_INFO();
  return {
    name: "CareAssist", start: "start", color: "#00695C",
    nav: [{ label: tt("Start"), go: "start" }],
    pages: { ...careBase(), start: { title: tt("Start"), section: "start", blocks: [
      { t: "p", text: i.plan, size: 12 }, { t: "p", text: i.costs, size: 12 }, { t: "p", text: i.rules, size: 12 }, { t: "p", text: i.contact, size: 12 },
      { t: "links", grid: 3, items: [{ label: tt("Book a session"), go: "book" }, { label: tt("Contact"), go: "contact" }, { label: tt("Documents"), go: "contact" }, { label: tt("Exercises"), go: "contact" }, { label: tt("Reports"), go: "contact" }, { label: tt("Insurance"), go: "contact" }] },
      { t: "table", head: [tt("Session"), tt("Status"), tt("Note")], rows: [[tt("Last Monday"), tt("Done"), tt("Good progress")], [tt("Last Thursday"), tt("Done"), tt("Knee exercise added")], [tt("This Thursday"), tt("Booked"), tt("Bring the exercise sheet")]] },
      { t: "faq", items: [{ q: tt("What is covered?"), a: i.costs }, { q: tt("How do I cancel?"), a: i.rules }] },
    ] } },
    footer: productFooter("CareAssist"),
  };
};

/** Variant B: central content clearly prioritised, additional information only shown step by step. */
export const careB = (): PlatformCfg => {
  const i = CARE_INFO();
  return {
    name: "CareAssist", start: "start", color: "#00796B",
    nav: [{ label: tt("Start"), go: "start" }],
    pages: { ...careBase(), start: { title: tt("Start"), section: "start", blocks: [
      { t: "h", text: tt("Your next session: Thursday") },
      { t: "links", items: [{ label: tt("Book a session"), go: "book" }] },
      { t: "p", text: tt("Cancel at least one working day before.") },
      { t: "faq", title: tt("More about your care"), items: [{ q: tt("Your care plan"), a: i.plan }, { q: tt("What is covered"), a: i.costs }, { q: tt("Cancellation rules"), a: i.rules }, { q: tt("Your care coordinator"), a: i.contact }] },
      { t: "links", small: true, items: [{ label: tt("Contact your coordinator"), go: "contact" }] },
    ] } },
    footer: productFooter("CareAssist"),
  };
};

/** Variant C: a modern, reduced layout with strong compression, but important context information partly hidden too deep. */
export const careC = (): PlatformCfg => {
  const i = CARE_INFO();
  return {
    name: "CareAssist", start: "start", color: "#263238",
    nav: [{ label: tt("Home"), go: "start" }, { label: tt("Me"), go: "me" }],
    pages: {
      ...careBase(),
      start: { title: tt("Home"), section: "start", blocks: [{ t: "hero", title: tt("Feel better, step by step."), text: tt("Your care, simply."), button: { label: tt("Book"), go: "book" } }] },
      me: { title: tt("Me"), section: "me", blocks: [{ t: "links", items: [{ label: tt("Settings"), go: "settings" }, { label: tt("Contact"), go: "contact" }] }] },
      settings: { title: tt("Settings"), section: "me", blocks: [{ t: "links", items: [{ label: tt("Account"), go: "account" }, { label: tt("Notifications"), go: "account" }] }] },
      account: { title: tt("Account"), section: "me", blocks: [{ t: "links", small: true, items: [{ label: tt("Terms and conditions"), go: "terms" }] }] },
      terms: { title: tt("Terms"), section: "me", blocks: [{ t: "p", text: `${i.costs} ${i.rules}`, size: 11 }, back("start", tt("Home"))] },
    },
    footer: productFooter("CareAssist"),
  };
};

/* ------------------------------------------------------------------ CitizenFlow, a public self-service platform */

const cfPages = (): Record<string, PPage> => ({
  start: { title: tt("CitizenFlow"), blocks: [
    { t: "h", text: tt("Citizen services online") },
    { t: "links", grid: 2, items: [{ label: tt("Residents"), go: "residents" }, { label: tt("Vehicles"), go: "vehicles" }, { label: tt("Family"), go: "family" }, { label: tt("Business"), go: "business" }] },
    { t: "links", small: true, items: [{ label: tt("Status of my application"), go: "status" }, { label: tt("Book an appointment"), go: "appt" }, { label: tt("Help"), go: "help" }] },
  ] },
  // Page type "service area", four times, each grouped and laid out differently (mark 1, mark 4).
  residents: { title: tt("Residents"), section: "residents", blocks: [
    { t: "h", text: tt("Residents"), mark: 1 },
    { t: "p", text: tt("Residence certificate · Registration · Change of address · Identity documents · Help with forms · Opening hours of the citizens' office · Fees · Data protection") },
    { t: "links", small: true, items: [{ label: tt("Apply for a residence certificate"), go: "cert1" }, { label: tt("Register a move"), go: "cert1" }] },
  ] },
  vehicles: { title: tt("Vehicles"), section: "vehicles", blocks: [
    { t: "links", small: true, items: [{ label: tt("Continue to the services ›"), go: "vehicles2" }], mark: 4 },
    { t: "cards", items: [{ title: tt("Parking permit"), text: tt("For residents of a parking zone."), go: "vehicles2" }, { title: tt("Registration"), text: tt("Register a vehicle."), go: "vehicles2" }] },
  ] },
  vehicles2: { title: tt("Vehicles"), section: "vehicles", blocks: [{ t: "form", fields: [tt("Registration number"), tt("Address")], button: tt("Apply"), msg: tt("Application received.") }, back("vehicles", tt("Back"))] },
  family: { title: tt("Family"), section: "family", blocks: [{ t: "table", head: [tt("Service"), tt("Online")], rows: [[{ label: tt("Child benefit"), go: "cert1" }, tt("yes")], [{ label: tt("Birth certificate"), go: "cert1" }, tt("yes")]] }] },
  business: { title: tt("Business"), section: "business", blocks: [{ t: "faq", items: [{ q: tt("Register a trade"), a: tt("Use the trade registration form.") }, { q: tt("Market permit"), a: tt("Apply in good time before the market.") }] }, { t: "links", items: [{ label: tt("Trade registration form"), go: "cert1" }] }] },
  // The application form: every field at once, help and warnings not prioritised, primary and secondary actions not separated (marks 2, 3, 5, 6).
  cert1: { title: tt("Application"), section: "residents", blocks: [
    { t: "h", text: tt("Application for a residence certificate") },
    { t: "note", mark: 5, title: tt("Notice"), text: tt("Applications without a valid identity document cannot be processed. For extended certificates a separate fee applies. Data protection information is available below."), css: { background: "#FFF3E0", borderColor: "#FFB74D" } },
    { t: "form", mark: 3, fields: [tt("Surname"), tt("First name"), tt("Date of birth"), tt("Address"), tt("Nationality (foreign residents only)"), tt("Residence permit number (foreign residents only)"), tt("Company name (companies only)"), tt("Commercial register number (companies only)"), tt("Purpose of the certificate"), tt("Extended certificate (yes/no)"), tt("Delivery address if different")], button: tt("Check the application"), msg: tt("Please check the fields that apply to you.") },
    { t: "p", mark: 6, text: tt("Help: the fields to fill in depend on your situation. Fields for foreign residents and companies only need to be completed if they apply. Please also read the data protection information and the fee schedule.") },
    { t: "links", small: true, mark: 2, items: [{ label: tt("Send"), go: "sent", css: EQUAL }, { label: tt("Save"), go: "saved", css: EQUAL }, { label: tt("Print"), go: "printed", css: EQUAL }, { label: tt("Reset"), go: "cert1", css: EQUAL }] },
  ] },
  sent: { title: tt("Sent"), blocks: [{ t: "p", text: tt("Your application has been received. You can follow it under Status of my application.") }, back("start", tt("Start"))] },
  saved: { title: tt("Saved"), blocks: [{ t: "p", text: tt("Your application has been saved. It has not been sent.") }, back("start", tt("Start"))] },
  printed: { title: tt("Print"), blocks: [{ t: "p", text: tt("The application is being printed.") }, back("start", tt("Start"))] },
  status: { title: tt("Status"), blocks: [{ t: "form", fields: [tt("Application number")], button: tt("Show status"), msg: tt("Status: in progress.") }, back("start", tt("Start"))] },
  appt: { title: tt("Appointment"), blocks: [{ t: "form", fields: [tt("Service"), tt("Preferred day")], button: tt("Book"), msg: tt("Appointment requested.") }, back("start", tt("Start"))] },
  help: { title: tt("Help"), blocks: [{ t: "faq", items: [{ q: tt("Which fields do I have to fill in?"), a: tt("It depends on your situation; see the notes in each form.") }, { q: tt("Where do I send the application?"), a: tt("Use the Send button at the end of the form.") }] }, back("start", tt("Start"))] },
});

/** CitizenFlow today: page types grouped differently, unseparated actions, every field at once, varying navigation, unprioritised help and warnings, users who must work out what is relevant. */
export const citizenFlow = (): PlatformCfg => ({ name: "CitizenFlow", start: "start", color: "#1A237E", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Residents"), go: "residents" }, { label: tt("Vehicles"), go: "vehicles" }, { label: tt("Family"), go: "family" }, { label: tt("Business"), go: "business" }], header: () => tt("City services"), pages: cfPages(), footer: productFooter("City administration") });

/* ------------------------------------------------------------------ The administration's app and staff interface (Route 2) */

/**
 * The brief of Route 2: a customer portal, an app and an internal administration interface, teams with their own patterns for navigation, page structure, status
 * displays and forms. Case assumption (marked “Clear” in the brief): a shared logo and palette, but no shared components.
 */
export const citizenApp = (): PlatformCfg => ({
  name: "City app",
  start: "home",
  color: "#283593",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("My cases"), go: "cases" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "cards", items: [{ title: tt("Appointments"), text: tt("Book and manage."), go: "appt" }, { title: tt("Documents"), text: tt("Your certificates."), go: "docs" }] }] },
    cases: { title: tt("My cases"), section: "cases", blocks: [{ t: "meta", items: [tt("Residence certificate"), tt("Parking permit")], colors: ["#2E7D32", "#F9A825"] }] },
    appt: { title: tt("Appointments"), section: "home", blocks: [{ t: "links", small: true, items: [{ label: tt("Next ›"), go: "appt2" }] }, { t: "p", text: tt("Choose a service.") }] },
    appt2: { title: tt("Appointments"), section: "home", blocks: [{ t: "form", fields: [tt("Service"), tt("Day")], button: tt("OK"), msg: tt("Requested.") }, back("home", tt("Home"))] },
    docs: { title: tt("Documents"), section: "home", blocks: [{ t: "p", text: tt("Certificates can be downloaded in the web portal.") }, back("home", tt("Home"))] },
  },
});

export const staffInterface = (): PlatformCfg => ({
  name: "Case desk",
  start: "queue",
  color: "#4E342E",
  nav: [{ label: tt("Queue"), go: "queue" }, { label: tt("Search"), go: "search" }],
  pages: {
    queue: { title: tt("Queue"), section: "queue", blocks: [{ t: "table", head: [tt("Case"), tt("Type"), tt("State"), tt("Open")], rows: [["2041", tt("Residence"), tt("new"), { label: tt("Open"), go: "case" }], ["2042", tt("Parking"), tt("waiting"), { label: tt("Open"), go: "case" }]] }] },
    case: { title: tt("Case"), section: "queue", blocks: [{ t: "p", text: tt("Residence certificate · missing: nationality field filled in by mistake.") }, { t: "links", small: true, items: [{ label: tt("Approve"), go: "queue", css: EQUAL }, { label: tt("Request info"), go: "queue", css: EQUAL }, { label: tt("Reject"), go: "queue", css: EQUAL }] }] },
    search: { title: tt("Search"), section: "search", blocks: [{ t: "form", fields: [tt("Case number"), tt("Name")], button: tt("Search"), msg: tt("One case found.") }] },
  },
});
