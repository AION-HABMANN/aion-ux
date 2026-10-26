import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): StartSmart as the plan describes it, the three FutureSkills journeys of Block 1.2, the GreenHome
 * onboarding as it is today, and the provider's website and self-service flows. Every link and button opens a real page. The plan's clues are kept exactly (much
 * information without a journey, an entry about functions, no transitions or stopovers, no visible progress or milestones, help that does not connect, successful
 * steps not picked up; factual and efficient with little motivation, strongly narrative with more text and longer guidance, balanced with visible progress; an entry
 * without benefit or goal, an administrative sequence, barely visible progress, help that explains but does not motivate, finished steps that do not feel like
 * progress, a form instead of a journey) and nothing is added that changes the answer. The names and contents are made up; nothing is marked right or wrong, and no
 * figure is printed that the plan does not print.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });
/** Small grey text, as the plan's "barely visible" progress. */
const FAINT = { fontSize: 11, color: "#6B7280" } as const;

/* ------------------------------------------------------------------ StartSmart, a platform for start-up advice and funding applications */

const ssPages = (): Record<string, PPage> => ({
  start: { title: tt("StartSmart"), section: "start", blocks: [
    { t: "h", mark: 2, text: tt("StartSmart · functions") },
    { t: "p", text: tt("StartSmart offers: legal forms, business plan templates, funding programmes, a funding application, tax information, a glossary, events and contact.") },
    { t: "links", grid: 3, mark: 1, items: [{ label: tt("Legal forms"), go: "legal" }, { label: tt("Business plan"), go: "plan" }, { label: tt("Funding programmes"), go: "programmes" }, { label: tt("Funding application"), go: "app1" }, { label: tt("Tax information"), go: "tax" }, { label: tt("Glossary"), go: "glossary" }, { label: tt("Events"), go: "events" }, { label: tt("Help"), go: "help" }, { label: tt("Contact"), go: "contact" }] },
  ] },
  app1: { title: tt("Funding application"), section: "app", blocks: [
    { t: "h", mark: 4, text: tt("Funding application") },
    { t: "form", fields: [tt("Name of the business"), tt("Legal form"), tt("Planned start")], button: tt("Save"), msg: tt("Saved.") },
    { t: "links", small: true, mark: 3, items: [{ label: tt("Next"), go: "app2" }, { label: tt("Help"), go: "help" }] },
  ] },
  app2: { title: tt("Funding application"), section: "app", blocks: [
    { t: "h", text: tt("Funding application") },
    { t: "form", fields: [tt("Investment sum"), tt("Own funds"), tt("Bank loan"), tt("Requested funding")], button: tt("Save"), msg: tt("Saved.") },
    { t: "links", small: true, items: [{ label: tt("Next"), go: "app3" }] },
  ] },
  app3: { title: tt("Funding application"), section: "app", blocks: [
    { t: "h", text: tt("Funding application") },
    { t: "form", fields: [tt("Business plan (upload)"), tt("Declaration of de minimis aid")], button: tt("Submit"), msg: tt("Submitted.") },
    { t: "links", small: true, items: [{ label: tt("Next"), go: "done" }] },
  ] },
  done: { title: tt("Funding application"), section: "app", blocks: [
    { t: "p", mark: 6, text: tt("Your data has been saved.") },
    back("start", tt("Start")),
  ] },
  help: { title: tt("Help"), section: "start", blocks: [
    { t: "note", mark: 5, title: tt("Note on the funding application"), text: tt("Applications must be submitted before the start of the project. Funding is granted in accordance with the applicable guidelines. Incomplete applications cannot be processed.") },
    back("start", tt("Start")),
  ] },
  legal: { title: tt("Legal forms"), section: "start", blocks: [{ t: "table", head: [tt("Legal form"), tt("Liability")], rows: [[tt("Sole trader"), tt("unlimited")], [tt("Limited company"), tt("limited")]] }, back("start", tt("Start"))] },
  plan: { title: tt("Business plan"), section: "start", blocks: [{ t: "list", items: [tt("Template: business plan.docx"), tt("Template: financial plan.xlsx")] }, back("start", tt("Start"))] },
  programmes: { title: tt("Funding programmes"), section: "start", blocks: [{ t: "list", items: [tt("Start-up grant"), tt("Innovation voucher"), tt("Micro-loan")] }, back("start", tt("Start"))] },
  tax: { title: tt("Tax information"), section: "start", blocks: [{ t: "p", text: tt("Information on registering with the tax office, VAT and bookkeeping obligations.") }, back("start", tt("Start"))] },
  glossary: { title: tt("Glossary"), section: "start", blocks: [{ t: "faq", items: [{ q: tt("De minimis aid"), a: tt("Small amounts of state aid that do not need approval.") }, { q: tt("Own funds"), a: tt("The money the founder brings in.") }] }, back("start", tt("Start"))] },
  events: { title: tt("Events"), section: "start", blocks: [{ t: "list", items: [tt("Founders' evening"), tt("Funding consultation day")] }, back("start", tt("Start"))] },
  contact: { title: tt("Contact"), section: "start", blocks: [{ t: "chat", intro: tt("Contact form."), label: tt("Your question"), reply: tt("Your message has been sent.") }, back("start", tt("Start"))] },
});

/** StartSmart as the plan describes it: much information without a journey, an entry about functions, no transitions, no progress, help that does not connect, steps not picked up. */
export const startSmart = (): PlatformCfg => ({ name: "StartSmart", start: "start", color: "#1F4E79", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Funding application"), go: "app1" }, { label: tt("Help"), go: "help" }], pages: ssPages(), footer: productFooter("StartSmart") });

/* ------------------------------------------------------------------ FutureSkills, a further-training platform: three journeys */

const STEPS = () => ({ goal: tt("Your goal"), course: tt("Your course"), time: tt("Your time"), done: tt("Enrolled") });

/** Variant A: factual and efficient, clear steps, but little emotional embedding or motivation. */
export const skillsA = (): PlatformCfg => {
  const s = STEPS();
  return {
    name: "FutureSkills", start: "s1", color: "#37474F",
    nav: [{ label: tt("Enrol"), go: "s1" }],
    pages: {
      s1: { title: tt("Step 1"), section: "s1", blocks: [{ t: "h", text: `1 · ${s.goal}` }, { t: "form", fields: [tt("Area")], button: tt("Save"), msg: tt("Saved.") }, { t: "links", small: true, items: [{ label: tt("Step 2"), go: "s2" }] }] },
      s2: { title: tt("Step 2"), section: "s1", blocks: [{ t: "h", text: `2 · ${s.course}` }, { t: "list", items: [tt("Project management basics"), tt("Data analysis basics")] }, { t: "links", small: true, items: [{ label: tt("Step 3"), go: "s3" }] }] },
      s3: { title: tt("Step 3"), section: "s1", blocks: [{ t: "h", text: `3 · ${s.time}` }, { t: "form", fields: [tt("Start date")], button: tt("Save"), msg: tt("Saved.") }, { t: "links", small: true, items: [{ label: tt("Enrol"), go: "s4" }] }] },
      s4: { title: tt("Done"), section: "s1", blocks: [{ t: "p", text: tt("Enrolment received.") }, back("s1", tt("Start"))] },
    },
    footer: productFooter("FutureSkills"),
  };
};

/** Variant B: strongly narrative and emotionally activating, but with more text and longer guidance. */
export const skillsB = (): PlatformCfg => {
  const s = STEPS();
  return {
    name: "FutureSkills", start: "intro", color: "#5B3A8C",
    nav: [{ label: tt("Your story"), go: "intro" }],
    pages: {
      intro: { title: tt("Your story"), section: "intro", blocks: [
        { t: "hero", kicker: tt("Chapter 1 · The beginning"), title: tt("Every great career begins with a single step."), text: tt("Think back to the moment you first knew what you wanted to become. Do you remember how it felt? That spark is still there. Let's find it together.") },
        { t: "p", text: tt("Maybe your days are full. Maybe you have wondered whether there is more. You are not alone: so many people stand exactly where you stand now, at the edge of something new. This journey is about you, your strengths and the future you are about to write.") },
        { t: "links", items: [{ label: tt("Begin my journey"), go: "ch2" }] },
      ] },
      ch2: { title: tt("Chapter 2"), section: "intro", blocks: [
        { t: "h", text: tt("Chapter 2 · Your dream") },
        { t: "p", text: tt("Close your eyes for a moment. Picture yourself a year from now, confident, capable, proud. What are you doing? Who is around you? Hold on to that picture; it will guide every choice you make on this path.") },
        { t: "form", fields: [s.goal], button: tt("This is my dream"), msg: tt("What a wonderful dream. Let's make it real.") },
        { t: "links", items: [{ label: tt("Continue the story"), go: "ch3" }] },
      ] },
      ch3: { title: tt("Chapter 3"), section: "intro", blocks: [
        { t: "h", text: tt("Chapter 3 · Your path") },
        { t: "p", text: tt("Every hero needs the right companions. These courses have helped others take the very step you are about to take. Read their stories, and choose the one that speaks to you.") },
        { t: "quotes", items: [{ who: "Tanja", role: tt("now team lead"), text: tt("It changed how I see myself.") }, { who: "Malik", role: tt("now data analyst"), text: tt("I finally found my direction.") }] },
        { t: "list", items: [tt("Project management basics"), tt("Data analysis basics")] },
        { t: "links", items: [{ label: tt("Choose my companion"), go: "ch4" }] },
      ] },
      ch4: { title: tt("Chapter 4"), section: "intro", blocks: [
        { t: "h", text: tt("Chapter 4 · The moment") },
        { t: "p", text: tt("This is it. The moment you decide. Choose when your new chapter begins.") },
        { t: "form", fields: [tt("Start date")], button: tt("I'm ready"), msg: tt("Your new chapter has begun! 🌟") },
        back("intro", tt("Back to the beginning")),
      ] },
    },
    footer: productFooter("FutureSkills"),
  };
};

/** Variant C: a balanced mix of clarity, motivating address and visible progress, but with a somewhat higher implementation effort. */
export const skillsC = (): PlatformCfg => {
  const s = STEPS();
  const ALL = ["s1", "s2", "s3", "s4"];
  return {
    name: "FutureSkills", start: "s1", color: "#2E6B57",
    nav: [{ label: tt("Enrol"), go: "s1" }],
    pages: {
      s1: { title: s.goal, section: "s1", blocks: [{ t: "progress", label: tt("Your enrolment"), of: ALL }, { t: "h", text: tt("What do you want to be able to do?") }, { t: "p", text: tt("In three short steps you will be enrolled in a course that fits your goal and your week.") }, { t: "form", fields: [tt("Area")], button: tt("Save my goal"), msg: tt("Goal saved.") }, { t: "links", items: [{ label: tt("Next: your course"), go: "s2" }] }] },
      s2: { title: s.course, section: "s1", blocks: [{ t: "progress", label: tt("Your enrolment"), of: ALL }, { t: "h", text: tt("Two courses fit your goal") }, { t: "list", items: [tt("Project management basics · evenings"), tt("Data analysis basics · weekends")] }, { t: "links", items: [{ label: tt("Next: your time"), go: "s3" }] }] },
      s3: { title: s.time, section: "s1", blocks: [{ t: "progress", label: tt("Your enrolment"), of: ALL }, { t: "h", text: tt("When does it suit you?") }, { t: "form", fields: [tt("Start date")], button: tt("Save"), msg: tt("Saved.") }, { t: "links", items: [{ label: tt("Enrol"), go: "s4" }] }] },
      s4: { title: s.done, section: "s1", blocks: [{ t: "progress", label: tt("Your enrolment"), of: ALL }, { t: "h", text: tt("You're enrolled") }, { t: "p", text: tt("Your first session is in your calendar. Well done for taking the step.") }, back("s1", tt("Start"))] },
    },
    footer: productFooter("FutureSkills"),
  };
};

/* ------------------------------------------------------------------ GreenHome, the onboarding of a sustainable-energy provider */

const SECTIONS = () => [tt("Section A · Property data"), tt("Section B · Consumption data"), tt("Section C · Product selection"), tt("Section D · Funding data"), tt("Section E · Declarations")];

const ghPages = (): Record<string, PPage> => {
  const sec = SECTIONS();
  return {
    start: { title: tt("GreenHome"), section: "start", blocks: [
      { t: "h", mark: 1, text: tt("GreenHome onboarding") },
      { t: "p", text: tt("Functions: energy advice, product selection (heat pump, solar, storage), funding support, document upload.") },
      { t: "list", items: sec },
      { t: "p", mark: 6, text: tt("All sections must be completed.") },
      { t: "links", items: [{ label: tt("Begin"), go: "a" }] },
    ] },
    a: { title: tt("Section A"), section: "flow", blocks: [
      { t: "p", mark: 3, text: tt("Page 1"), css: FAINT },
      { t: "h", mark: 2, text: sec[0] },
      { t: "form", fields: [tt("Type of building"), tt("Year of construction"), tt("Living area"), tt("Heating system"), tt("Roof orientation")], button: tt("Check entries"), msg: tt("Entries valid.") },
      { t: "note", mark: 4, title: tt("Note"), text: tt("The year of construction is required to determine eligibility under the applicable funding guidelines. The living area refers to the heated area according to the relevant standard.") },
      { t: "links", small: true, items: [{ label: tt("Submit section"), go: "adone" }] },
    ] },
    adone: { title: tt("Section A"), section: "flow", blocks: [
      { t: "p", mark: 5, text: tt("Section A completed. Continue with Section B.") },
      { t: "links", small: true, items: [{ label: tt("Continue"), go: "b" }] },
    ] },
    b: { title: tt("Section B"), section: "flow", blocks: [{ t: "p", text: tt("Page 2"), css: FAINT }, { t: "h", text: sec[1] }, { t: "form", fields: [tt("Annual electricity consumption"), tt("Annual heating consumption"), tt("Number of residents")], button: tt("Check entries"), msg: tt("Entries valid.") }, { t: "links", small: true, items: [{ label: tt("Submit section"), go: "c" }] }] },
    c: { title: tt("Section C"), section: "flow", blocks: [{ t: "p", text: tt("Page 3"), css: FAINT }, { t: "h", text: sec[2] }, { t: "table", head: [tt("Product"), tt("Select")], rows: [[tt("Heat pump"), { label: tt("Select"), go: "d" }], [tt("Solar system"), { label: tt("Select"), go: "d" }], [tt("Battery storage"), { label: tt("Select"), go: "d" }]] }] },
    d: { title: tt("Section D"), section: "flow", blocks: [{ t: "p", text: tt("Page 4"), css: FAINT }, { t: "h", text: sec[3] }, { t: "form", fields: [tt("Funding programme"), tt("Previous funding received"), tt("Bank details")], button: tt("Check entries"), msg: tt("Entries valid.") }, { t: "links", small: true, items: [{ label: tt("Submit section"), go: "e" }] }] },
    e: { title: tt("Section E"), section: "flow", blocks: [{ t: "p", text: tt("Page 5"), css: FAINT }, { t: "h", text: sec[4] }, { t: "toggle", label: tt("I confirm the accuracy of my data"), on: tt("Confirmed."), off: tt("Not confirmed.") }, { t: "links", small: true, items: [{ label: tt("Submit"), go: "summary" }] }] },
    summary: { title: tt("Summary"), section: "flow", blocks: [{ t: "p", text: tt("Your onboarding data has been transmitted. Reference: GH-ONB-20718.") }, back("start", tt("Start"))] },
  };
};

/** GreenHome today: an entry without benefit or goal, an administrative sequence, barely visible progress, help that does not motivate, steps that do not feel like progress, a form. */
export const greenHome = (): PlatformCfg => ({ name: "GreenHome", start: "start", color: "#33691E", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Onboarding"), go: "a" }], pages: ghPages(), footer: productFooter("GreenHome") });

/* ------------------------------------------------------------------ The provider's website and self-service flows (Route 2) */

/**
 * The brief of Route 2: a website, an advisory platform and self-service flows that work but feel administrative, interchangeable and not very motivating; inside,
 * storytelling is seen as communication. Case assumption (marked “Clear” in the brief): marketing tells the brand's story on the website; the product teams build the
 * flows from the specialist logic.
 */
export const ghWebsite = (): PlatformCfg => ({
  name: "GreenHome",
  start: "home",
  color: "#2E7D32",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Our story"), go: "story" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "hero", kicker: tt("Your home, your future"), title: tt("Together towards a home that gives back."), text: tt("From the first idea to your own clean energy: we walk the way with you."), button: { label: tt("Start your journey"), go: "portal" } }] },
    story: { title: tt("Our story"), section: "story", blocks: [{ t: "p", text: tt("We started with one belief: every home can be part of the energy transition. Today we help families find their way, step by step.") }, back("home", tt("Home"))] },
    portal: { title: tt("Advisory platform"), section: "home", blocks: [{ t: "p", text: tt("Please log in to the advisory platform to begin the onboarding.") }, back("home", tt("Home"))] },
  },
  footer: productFooter("GreenHome"),
});

export const ghSelfService = (): PlatformCfg => ({
  name: "GreenHome self-service",
  start: "home",
  color: "#455A64",
  phone: true,
  nav: [{ label: tt("Services"), go: "home" }],
  pages: {
    home: { title: tt("Services"), section: "home", blocks: [{ t: "links", items: [{ label: tt("Change tariff"), go: "tariff" }, { label: tt("Report meter reading"), go: "meter" }, { label: tt("Apply for funding"), go: "funding" }] }] },
    tariff: { title: tt("Tariff"), section: "home", blocks: [{ t: "form", fields: [tt("Contract number"), tt("New tariff")], button: tt("Submit"), msg: tt("Request received.") }, back("home", tt("Services"))] },
    meter: { title: tt("Meter reading"), section: "home", blocks: [{ t: "form", fields: [tt("Meter number"), tt("Reading")], button: tt("Submit"), msg: tt("Reading stored.") }, back("home", tt("Services"))] },
    funding: { title: tt("Funding"), section: "home", blocks: [{ t: "p", text: tt("Form F-1 of 4. Complete all forms to submit your application.") }, { t: "form", fields: [tt("Applicant"), tt("Address"), tt("Programme")], button: tt("Next form"), msg: tt("Form saved.") }, back("home", tt("Services"))] },
  },
});
