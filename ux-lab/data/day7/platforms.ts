import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): WellTrack as the plan describes it, the three CareerPath designs of Block 1.2, LifeSupport as it is
 * today, and the provider's website and app. Every link and button opens a real page. The plan's clues are kept exactly (a correct but cool start page, technical
 * error messages, successful actions without positive feedback, sober health information that does not build trust, no hints for orientation, safety or relevance, a
 * professional but unapproachable design; warm and motivating with many emotional stimuli, factual and trustworthy but not inspiring, personal and high quality with
 * unclear feedback in some situations; a factual but distant visual language, technical feedback, critical situations that unsettle, positive experiences not
 * reinforced, a correct but not trust-building tone, functional interaction without a relationship) and nothing is added that changes the answer. The names and
 * contents are made up; nothing is marked right or wrong, and no figure is printed that the plan does not print.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });
/** A grey, technical error box, as the plan describes the error messages. */
const TECH = { background: "#ECEFF1", borderColor: "#90A4AE" } as const;

/* ------------------------------------------------------------------ WellTrack, a health platform for prevention, appointments and recommendations */

const wtPages = (): Record<string, PPage> => ({
  start: { title: tt("WellTrack"), section: "start", blocks: [
    { t: "h", mark: 6, text: tt("WellTrack · Preventive health management"), css: { color: "#37474F", fontWeight: 600 } },
    { t: "p", mark: 1, text: tt("Account active. Available functions: appointment management, recommendations, documents. Select a function.") },
    { t: "links", grid: 3, mark: 5, items: [{ label: tt("Appointments"), go: "book" }, { label: tt("Recommendations"), go: "recs" }, { label: tt("Documents"), go: "docs" }] },
  ] },
  book: { title: tt("Appointments"), section: "book", blocks: [
    { t: "h", text: tt("Appointment request") },
    { t: "form", fields: [tt("Appointment type"), tt("Date"), tt("Time slot")], button: tt("Validate input"), msg: tt("Input valid.") },
    { t: "links", small: true, items: [{ label: tt("Submit request"), go: "err" }] },
  ] },
  err: { title: tt("Error"), section: "book", blocks: [
    { t: "note", mark: 2, title: tt("Error 4012"), text: tt("SLOT_UNAVAILABLE. The request could not be processed."), css: TECH },
    { t: "links", small: true, items: [{ label: tt("Back"), go: "book2" }] },
  ] },
  book2: { title: tt("Appointments"), section: "book", blocks: [
    { t: "h", text: tt("Appointment request") },
    { t: "form", fields: [tt("Date"), tt("Time slot")], button: tt("Validate input"), msg: tt("Input valid.") },
    { t: "links", small: true, items: [{ label: tt("Submit request"), go: "done" }] },
  ] },
  done: { title: tt("Appointments"), section: "book", blocks: [
    { t: "p", mark: 3, text: tt("Request REQ-55190 stored.") },
    back("start", tt("Start")),
  ] },
  recs: { title: tt("Recommendations"), section: "recs", blocks: [
    { t: "h", text: tt("Recommendations") },
    { t: "table", mark: 4, head: [tt("Measure"), tt("Status")], rows: [[tt("Blood pressure check"), tt("due")], [tt("Skin screening"), tt("open")], [tt("Dental check-up"), tt("open")]] },
    { t: "p", text: tt("Recommendations are generated according to the standard prevention catalogue.") },
    back("start", tt("Start")),
  ] },
  docs: { title: tt("Documents"), section: "docs", blocks: [{ t: "list", items: [tt("Findings.pdf"), tt("Referral_dermatology.pdf")] }, back("start", tt("Start"))] },
});

/** WellTrack as the plan describes it: correct but cool, technical errors, no positive feedback, sober information, no orientation or relevance, unapproachable. */
export const wellTrack = (): PlatformCfg => ({ name: "WellTrack", start: "start", color: "#455A64", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Appointments"), go: "book" }, { label: tt("Recommendations"), go: "recs" }, { label: tt("Documents"), go: "docs" }], pages: wtPages(), footer: productFooter("WellTrack") });

/* ------------------------------------------------------------------ CareerPath, a platform for career development and further training: three designs */

const COURSES = () => ({
  lead: tt("Leading a team for the first time"),
  data: tt("Data skills for your job"),
  talk: tt("Presenting with confidence"),
});

function careerBase(): Record<string, PPage> {
  const c = COURSES();
  return {
    course: { title: tt("Course"), section: "start", blocks: [{ t: "h", text: c.lead }, { t: "p", text: tt("Several evenings, online, with a certificate. For people who lead or will soon lead a team.") }, { t: "links", items: [{ label: tt("Apply"), go: "apply" }] }, back("start", tt("Start"))] },
  };
}

/** Variant A: modern, warm and motivating, but with many emotional stimuli and activating messages. */
export const careerA = (): PlatformCfg => {
  const c = COURSES();
  return {
    name: "CareerPath", start: "start", color: "#BF360C",
    nav: [{ label: tt("Start"), go: "start" }],
    pages: {
      ...careerBase(),
      start: { title: tt("Start"), section: "start", blocks: [
        { t: "hero", kicker: tt("🔥 Your moment is NOW!"), title: tt("Unleash your potential! 🚀"), text: tt("Don't let your career wait. Others are already growing. Are you?"), button: { label: tt("Start growing!"), go: "course" } },
        { t: "meta", items: [tt("🏆 Go-getter"), tt("⭐ Rising star"), tt("💪 Unstoppable"), tt("🎯 On fire")], colors: ["#B71C1C", "#7A4A00", "#6A1B9A", "#AD1457"] },
        { t: "note", title: tt("⚡ Don't miss out!"), text: tt("Spots are filling up fast. Grab yours before it's too late!"), go: { label: tt("Grab my spot!"), go: "course" }, css: { background: "#FFEBEE", borderColor: "#EF5350" } },
        { t: "cards", items: [{ tag: tt("🔥 Hot"), title: c.lead, text: tt("Become the leader you were born to be!"), go: "course" }, { tag: tt("✨ New"), title: c.data, text: tt("Data is the future. Be the future!"), go: "course" }, { tag: tt("💥 Top"), title: c.talk, text: tt("Own every room you walk into!"), go: "course" }] },
      ] },
      apply: { title: tt("Apply"), section: "start", blocks: [{ t: "form", fields: [tt("Name"), tt("E-mail")], button: tt("YES, I'm in! 🎉"), msg: tt("🎉🎉 AMAZING! You're on your way to greatness! 🚀🔥") }, back("start", tt("Start"))] },
    },
    footer: productFooter("CareerPath"),
  };
};

/** Variant B: factual, clear and trustworthy, but not very inspiring or connecting. */
export const careerB = (): PlatformCfg => {
  const c = COURSES();
  return {
    name: "CareerPath", start: "start", color: "#455A64",
    nav: [{ label: tt("Start"), go: "start" }],
    pages: {
      ...careerBase(),
      start: { title: tt("Start"), section: "start", blocks: [
        { t: "h", text: tt("Further training") },
        { t: "p", text: tt("Courses for working people. All courses are online and end with a certificate.") },
        { t: "table", head: [tt("Course"), tt("Format"), tt("Details")], rows: [[c.lead, tt("online, evenings"), { label: tt("Open"), go: "course" }], [c.data, tt("online, evenings"), { label: tt("Open"), go: "course" }], [c.talk, tt("online, evenings"), { label: tt("Open"), go: "course" }]] },
      ] },
      apply: { title: tt("Apply"), section: "start", blocks: [{ t: "form", fields: [tt("Name"), tt("E-mail")], button: tt("Submit application"), msg: tt("Your application has been received. You will receive a confirmation by e-mail.") }, back("start", tt("Start"))] },
    },
    footer: productFooter("CareerPath"),
  };
};

/** Variant C: high quality and personal in feel, but in some situations a little unclear in its interaction feedback. */
export const careerC = (): PlatformCfg => {
  const c = COURSES();
  return {
    name: "CareerPath", start: "start", color: "#4A3B7A",
    nav: [{ label: tt("For you"), go: "start" }, { label: tt("My path"), go: "path" }],
    pages: {
      ...careerBase(),
      start: { title: tt("For you"), section: "start", blocks: [
        { t: "hero", kicker: tt("Welcome back"), title: tt("Where would you like to grow next?"), text: tt("Three courses that fit what you told us about your work.") },
        { t: "cards", items: [{ tag: tt("Fits your goal"), title: c.lead, text: tt("You mentioned taking on a team. This is where many start."), go: "course" }, { tag: tt("Fits your role"), title: c.data, text: tt("Useful in the work you described."), go: "course" }, { tag: tt("A next step"), title: c.talk, text: tt("For the moments that matter."), go: "course" }] },
      ] },
      apply: { title: tt("Apply"), section: "start", blocks: [{ t: "form", fields: [tt("Name"), tt("E-mail")], button: tt("Continue"), msg: tt("✓") }, { t: "links", small: true, items: [{ label: tt("Save to my path"), go: "path" }] }] },
      path: { title: tt("My path"), section: "path", blocks: [{ t: "p", text: tt("Your path is taking shape.") }, { t: "meta", items: [c.lead], colors: ["#7E57C2"] }, back("start", tt("For you"))] },
    },
    footer: productFooter("CareerPath"),
  };
};

/* ------------------------------------------------------------------ LifeSupport, a health-prevention portal for advice, appointments and documents */

const lsPages = (): Record<string, PPage> => ({
  start: { title: tt("LifeSupport"), section: "start", blocks: [
    { t: "h", mark: 1, text: tt("Customer portal"), css: { color: "#263238" } },
    { t: "p", mark: 5, text: tt("Use the functions below to manage your prevention services. Please keep your data up to date.") },
    { t: "links", grid: 3, items: [{ label: tt("Book a check-up"), go: "book" }, { label: tt("My results"), go: "results" }, { label: tt("Documents"), go: "docs" }, { label: tt("Advice"), go: "advice" }, { label: tt("Messages"), go: "messages" }, { label: tt("Profile"), go: "profile" }] },
  ] },
  book: { title: tt("Check-up"), section: "book", blocks: [
    { t: "h", text: tt("Book a check-up") },
    { t: "form", mark: 6, fields: [tt("Type of check-up"), tt("Location"), tt("Date"), tt("Time")], button: tt("Check availability"), msg: tt("Availability checked.") },
    { t: "links", small: true, items: [{ label: tt("Confirm booking"), go: "booked" }] },
  ] },
  booked: { title: tt("Check-up"), section: "book", blocks: [
    { t: "note", mark: 2, title: tt("Booking BK-77214"), text: tt("Status: CONFIRMED. Transaction completed."), css: TECH },
    { t: "p", mark: 4, text: tt("Return to the overview.") },
    back("start", tt("Overview")),
  ] },
  results: { title: tt("Results"), section: "results", blocks: [
    { t: "h", text: tt("My results") },
    { t: "note", mark: 3, title: tt("Notice"), text: tt("Some values are outside the reference range. Contact your physician if required."), css: TECH },
    { t: "table", head: [tt("Value"), tt("Result"), tt("Reference")], rows: [[tt("Blood pressure"), tt("elevated"), tt("normal")], [tt("Cholesterol"), tt("within range"), tt("normal")]] },
    back("start", tt("Overview")),
  ] },
  docs: { title: tt("Documents"), section: "docs", blocks: [
    { t: "h", text: tt("Documents") },
    { t: "form", fields: [tt("Select file")], button: tt("Upload"), msg: tt("Upload failed. Error 413: file exceeds limit.") },
    { t: "list", items: [tt("Check-up report.pdf"), tt("Consent form.pdf")] },
    back("start", tt("Overview")),
  ] },
  advice: { title: tt("Advice"), section: "advice", blocks: [{ t: "p", text: tt("Prevention advice can be requested via the contact form. Processing time depends on volume.") }, { t: "chat", intro: tt("Contact form."), label: tt("Your request"), reply: tt("Request received. Ticket created.") }, back("start", tt("Overview"))] },
  messages: { title: tt("Messages"), section: "messages", blocks: [{ t: "list", items: [tt("System notice: maintenance window"), tt("Your data has been updated")] }, back("start", tt("Overview"))] },
  profile: { title: tt("Profile"), section: "profile", blocks: [{ t: "form", fields: [tt("Address"), tt("Phone")], button: tt("Save"), msg: tt("Data saved.") }, back("start", tt("Overview"))] },
});

/** LifeSupport today: distant visual language, technical feedback, unsettling critical situations, no positive reinforcement, a cold tone, no relationship. */
export const lifeSupport = (): PlatformCfg => ({ name: "LifeSupport", start: "start", color: "#37474F", nav: [{ label: tt("Overview"), go: "start" }, { label: tt("Check-up"), go: "book" }, { label: tt("Results"), go: "results" }, { label: tt("Documents"), go: "docs" }], pages: lsPages(), footer: productFooter("LifeSupport") });

/* ------------------------------------------------------------------ The provider's website and app (Route 2) */

/**
 * The brief of Route 2: a website, a customer portal and an app, functionally solid with little emotional bond; inside, emotion is seen as marketing. Case assumption
 * (marked “Clear” in the brief): marketing writes the website, each product team writes its own messages in the portal and the app.
 */
export const lsWebsite = (): PlatformCfg => ({
  name: "LifeSupport",
  start: "home",
  color: "#2E7D6B",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Our services"), go: "services" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "hero", kicker: tt("Prevention that cares"), title: tt("We're with you, every step of the way."), text: tt("Personal advice, check-ups when they suit you, and a team that listens."), button: { label: tt("Discover our services"), go: "services" } }] },
    services: { title: tt("Our services"), section: "services", blocks: [{ t: "cards", items: [{ title: tt("Check-ups"), text: tt("Book in the customer portal."), go: "portal" }, { title: tt("Advice"), text: tt("Talk to our team."), go: "portal" }] }] },
    portal: { title: tt("Customer portal"), section: "services", blocks: [{ t: "p", text: tt("Please log in to the customer portal to continue.") }, back("home", tt("Home"))] },
  },
  footer: productFooter("LifeSupport"),
});

export const lsApp = (): PlatformCfg => ({
  name: "LifeSupport app",
  start: "home",
  color: "#455A64",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Reminders"), go: "rem" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "links", items: [{ label: tt("Next appointment"), go: "appt" }, { label: tt("Results"), go: "res" }] }] },
    appt: { title: tt("Appointment"), section: "home", blocks: [{ t: "p", text: tt("Appointment status: SCHEDULED.") }, back("home", tt("Home"))] },
    res: { title: tt("Results"), section: "home", blocks: [{ t: "p", text: tt("New document available. Open in the customer portal.") }, back("home", tt("Home"))] },
    rem: { title: tt("Reminders"), section: "rem", blocks: [{ t: "toggle", label: tt("Push notifications"), on: tt("Enabled."), off: tt("Disabled.") }, { t: "list", items: [tt("Reminder: check-up due"), tt("Reminder: update your data")] }] },
  },
});
