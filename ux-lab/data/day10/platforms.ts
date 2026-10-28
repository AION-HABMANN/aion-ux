import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60). SmartAssist as the plan describes it (Block 1.1), the three CareerNavigator designs
 * (Block 1.2), CareGuide as it is today (Block 2.1), and the provider's app and service platform (Block 3.1). Every link and button opens a real page. The plan's
 * clues are kept exactly (recommendations that differ by usage history, next steps without a reason, content that partly fits and partly seems random, automatic
 * help without clear control, simple standard processes and unclear complex ones, rules and AI indistinguishable; strong opaque personalisation against an
 * explainable, controllable design with less comfort against adaptive situational support with optional intervention; partly fitting recommendations, no why, no
 * hint of personalisation depth, limited control, quick simple cases, unclear exceptions) and nothing is added that changes the answer.
 *
 * Shown for real (user rule 2026-10-28): CareerNavigator's Variant A is built as a convincing, eager recommender: it greets you by name, says it knows what you
 * need, enrols you in a course you did not choose, ranks a "match score" without saying from what, and has no way to say "not for me", so the learner meets
 * over-personalisation and loss of control instead of reading about them. Match scores and counts are interface labels of a made-up app, not figures about users.
 * The names and contents are made up; nothing is marked right or wrong.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

/* ------------------------------------------------------------------ SmartAssist, a service platform for insurance matters */

/** SmartAssist as the plan describes it: history-based recommendations, unexplained next steps, partly random content, automatic help without control, simple and complex claims, rules or AI unknown. */
export const smartAssist = (): PlatformCfg => ({
  name: "SmartAssist",
  start: "home",
  color: "#1F4E79",
  nav: [{ label: tt("Overview"), go: "home" }, { label: tt("My contracts"), go: "contracts" }, { label: tt("Claims"), go: "claims" }, { label: tt("Assistant"), go: "assistant" }],
  pages: {
    home: { title: tt("Overview"), section: "home", blocks: [
      { t: "h", text: tt("Good morning, Ms Keller") },
      { t: "note", mark: 2, title: tt("Your assistant suggests"), text: tt("Next step: upload your documents now."), go: { label: tt("Do it now"), go: "upload" } },
      { t: "sub", text: tt("Recommended for you") },
      { t: "cards", mark: 1, items: [
        { title: tt("Increase your household cover"), text: tt("Your household insurance could be adjusted to your current situation."), tag: tt("Recommendation"), go: "rec1" },
        { title: tt("Travel insurance for your next trip"), text: tt("Travel safely, worldwide, from tomorrow."), tag: tt("Recommendation"), go: "rec2" },
        { title: tt("Pet liability for dog owners"), text: tt("Protect yourself against damage caused by your dog."), tag: tt("Recommendation"), go: "rec3" },
      ] },
      { t: "links", grid: 2, items: [{ label: tt("Report a claim"), go: "claims" }, { label: tt("My contracts"), go: "contracts" }] },
    ] },
    rec1: { title: tt("Household cover"), section: "home", blocks: [
      { t: "h", text: tt("Increase your household cover") },
      { t: "p", text: tt("Your household insurance could be adjusted to your current situation. Adjust the sum insured in two steps.") },
      { t: "form", fields: [tt("New sum insured")], button: tt("Request adjustment"), msg: tt("Your request has been received.") },
      back("home", tt("Overview")),
    ] },
    rec2: { title: tt("Travel insurance"), section: "home", blocks: [
      { t: "h", text: tt("Travel insurance for your next trip") },
      { t: "p", mark: 3, text: tt("Travel safely, worldwide, from tomorrow. Annual or single trip.") },
      { t: "links", items: [{ label: tt("Take out now"), go: "rec2done" }] },
      back("home", tt("Overview")),
    ] },
    rec2done: { title: tt("Travel insurance"), section: "home", blocks: [{ t: "p", text: tt("Thank you. Your offer will be sent by e-mail.") }, back("home", tt("Overview"))] },
    rec3: { title: tt("Pet liability"), section: "home", blocks: [
      { t: "h", text: tt("Pet liability for dog owners") },
      { t: "p", text: tt("Protect yourself against damage caused by your dog.") },
      back("home", tt("Overview")),
    ] },
    upload: { title: tt("Upload documents"), section: "home", blocks: [
      { t: "h", text: tt("Upload documents") },
      { t: "p", text: tt("Please upload the requested documents.") },
      { t: "form", fields: [tt("Document")], button: tt("Upload"), msg: tt("Document received.") },
      back("home", tt("Overview")),
    ] },
    contracts: { title: tt("My contracts"), section: "contracts", blocks: [
      { t: "h", text: tt("My contracts") },
      { t: "table", head: [tt("Contract"), tt("Number"), tt("Status")], rows: [[tt("Household"), "HH-221804", tt("active")], [tt("Personal liability"), "PL-118233", tt("active")], [tt("Car"), "KF-550712", tt("active")]] },
      { t: "p", text: tt("Based on your contracts, we recommend: Travel insurance.") },
    ] },
    claims: { title: tt("Claims"), section: "claims", blocks: [
      { t: "h", text: tt("Report a claim") },
      { t: "p", text: tt("What happened?") },
      { t: "links", items: [{ label: tt("My phone is broken"), go: "simple" }, { label: tt("Water damage, also in my neighbour's flat"), go: "complex" }] },
    ] },
    simple: { title: tt("Phone damage"), section: "claims", blocks: [
      { t: "h", text: tt("Phone damage") },
      { t: "p", mark: 4, text: tt("We have filled in your details from your contract. Please check them.") },
      { t: "wizard", mark: 5, steps: 3, text: tt("Report your phone damage in three steps."), field: tt("What happened?"), doneText: tt("Done. Claim CL-30381 received. You will receive a decision within 2 working days.") },
    ] },
    complex: { title: tt("Water damage"), section: "claims", blocks: [
      { t: "h", text: tt("Water damage") },
      { t: "p", mark: 6, text: tt("For questions about your claim, please see our frequently asked questions.") },
      { t: "faq", items: [
        { q: tt("What is water damage?"), a: tt("Water damage is damage caused by escaping tap water.") },
        { q: tt("Which documents do I need?"), a: tt("Please upload the requested documents.") },
        { q: tt("How long does processing take?"), a: tt("Processing depends on the individual case.") },
      ] },
      { t: "links", small: true, items: [{ label: tt("Ask the assistant"), go: "assistant" }] },
    ] },
    assistant: { title: tt("Assistant"), section: "assistant", blocks: [
      { t: "h", text: tt("Your assistant") },
      { t: "chat", label: tt("Ask a question"), intro: tt("Hello! How can I help you today?"), reply: tt("Assistant: I recommend that you upload your documents now. Is there anything else I can do for you?") },
      { t: "toggle", label: tt("Automatic help"), on: tt("Automatic help is on."), off: tt("Automatic help is on.") },
    ] },
  },
  footer: productFooter("SmartAssist"),
});

/* ------------------------------------------------------------------ CareerNavigator, a platform for professional development: three designs */

/** Variant A: strong personalisation from past use, automatic recommendations, little transparency, built as eager as such products are. */
export const cnA = (): PlatformCfg => ({
  name: "CareerNavigator",
  start: "home",
  color: "#B42318",
  phone: true,
  header: (v) => (v.includes("enrolled") ? tt("✓ 1 course auto-enrolled") : tt("🤖 Personalised for you")),
  nav: [{ label: tt("For you"), go: "home" }, { label: tt("My courses"), go: "mine" }],
  pages: {
    home: { title: tt("For you"), section: "home", blocks: [
      { t: "hero", kicker: tt("PICKED FOR YOU BY OUR AI"), title: tt("Hi Jonas, we know what you need next. 🚀"), text: tt("Based on everything you've done, we've built your perfect path. Just follow it."), button: { label: tt("Start my path"), go: "enrolled" } },
      { t: "meta", items: [tt("98% match"), tt("94% match"), tt("91% match")], colors: ["#B42318", "#C2410C", "#B45309"] },
      { t: "cards", items: [
        { title: tt("Advanced Excel for Controllers"), text: tt("Because you watched one Excel video in March."), tag: tt("98% match"), go: "c1" },
        { title: tt("Leading Without Authority"), text: tt("People like you also took this."), tag: tt("94% match"), go: "c2" },
        { title: tt("Agile Fundamentals"), text: tt("Trending in your company."), tag: tt("91% match"), go: "c2" },
      ] },
      { t: "note", title: tt("✨ We enrolled you automatically"), text: tt("To save you time, we added “Advanced Excel for Controllers” to your courses. It starts Monday."), go: { label: tt("See my courses"), go: "mine" } },
    ] },
    enrolled: { title: tt("Your path"), section: "home", blocks: [
      { t: "h", text: tt("✅ Your path is ready!") },
      { t: "list", items: [tt("1. Advanced Excel for Controllers · starts Monday"), tt("2. Leading Without Authority · starts in 3 weeks"), tt("3. Agile Fundamentals · starts in 6 weeks")] },
      { t: "p", text: tt("Our AI will keep optimising your path as you learn. Sit back. 🤖") },
      back("home", tt("For you")),
    ] },
    c1: { title: tt("Course"), section: "home", blocks: [
      { t: "h", text: tt("Advanced Excel for Controllers") },
      { t: "meta", items: [tt("98% match"), tt("6 weeks")] },
      { t: "p", text: tt("Pivot tables, forecasting models and macros for financial controlling.") },
      { t: "links", items: [{ label: tt("Enrol"), go: "enrolled" }, { label: tt("Show me something else"), go: "more" }] },
    ] },
    c2: { title: tt("Course"), section: "home", blocks: [
      { t: "h", text: tt("Leading Without Authority") },
      { t: "meta", items: [tt("94% match"), tt("4 weeks")] },
      { t: "p", text: tt("Influence colleagues and stakeholders you do not manage.") },
      { t: "links", items: [{ label: tt("Enrol"), go: "enrolled" }, { label: tt("Show me something else"), go: "more" }] },
    ] },
    more: { title: tt("More for you"), section: "home", blocks: [
      { t: "h", text: tt("More picked for you") },
      { t: "cards", items: [
        { title: tt("Excel Power Query"), text: tt("Because you looked at Excel courses."), tag: tt("97% match"), go: "c1" },
        { title: tt("Excel Dashboards"), text: tt("Because you looked at Excel courses."), tag: tt("96% match"), go: "c1" },
        { title: tt("Excel for Beginners"), text: tt("Because you looked at Excel courses."), tag: tt("95% match"), go: "c1" },
      ] },
      back("home", tt("For you")),
    ] },
    mine: { title: tt("My courses"), section: "mine", blocks: [
      { t: "h", text: tt("My courses") },
      { t: "table", head: [tt("Course"), tt("Added by"), tt("Starts")], rows: [[tt("Advanced Excel for Controllers"), tt("Automatically"), tt("Monday")]] },
      { t: "p", text: tt("Courses are managed by your personal AI.") },
    ] },
  },
  footer: productFooter("CareerNavigator"),
});

/** Variant B: restrained personalisation with clear explainability and high user control, but less comfort and less automation. */
export const cnB = (): PlatformCfg => ({
  name: "CareerNavigator",
  start: "home",
  color: "#155E75",
  phone: true,
  nav: [{ label: tt("Search"), go: "home" }, { label: tt("My settings"), go: "settings" }],
  pages: {
    home: { title: tt("Search"), section: "home", blocks: [
      { t: "h", text: tt("Find a course") },
      { t: "p", text: tt("Tell us what you want to develop. We only suggest courses based on what you enter here.") },
      { t: "form", fields: [tt("Topic or skill"), tt("Your experience in it (beginner, some, a lot)"), tt("Time per week")], button: tt("Show courses"), msg: tt("12 courses match your entries. Open the list to see them.") },
      { t: "links", items: [{ label: tt("Open the list"), go: "list" }] },
    ] },
    list: { title: tt("Courses"), section: "home", blocks: [
      { t: "h", text: tt("Courses that match your entries") },
      { t: "table", head: [tt("Course"), tt("Why it is shown"), tt("Length")], rows: [[tt("Negotiation basics"), tt("Matches “negotiation” · beginner"), tt("6 weeks")], [tt("Difficult conversations"), tt("Matches “negotiation” · some experience"), tt("4 weeks")], [tt("Influencing stakeholders"), tt("Matches “negotiation” · 2 h per week"), tt("5 weeks")]] },
      { t: "p", text: tt("Sorted by how well the course matches your entries. You can change the order.") },
      { t: "links", small: true, items: [{ label: tt("Sort by length"), go: "list" }, { label: tt("Change my entries"), go: "home" }] },
    ] },
    settings: { title: tt("My settings"), section: "settings", blocks: [
      { t: "h", text: tt("What CareerNavigator may use") },
      { t: "toggle", label: tt("Use the courses I completed for suggestions"), on: tt("On: completed courses are used."), off: tt("Off: only what you enter is used.") },
      { t: "toggle", label: tt("Use my job title for suggestions"), on: tt("On: your job title is used."), off: tt("Off: your job title is not used.") },
      { t: "p", text: tt("Nothing is enrolled automatically. You decide every course.") },
    ] },
  },
  footer: productFooter("CareerNavigator"),
});

/** Variant C: adaptive support with situational recommendations and optional ways to intervene, but a higher implementation effort. */
export const cnC = (): PlatformCfg => ({
  name: "CareerNavigator",
  start: "home",
  color: "#5B21B6",
  phone: true,
  nav: [{ label: tt("Now"), go: "home" }, { label: tt("Why I see this"), go: "why" }],
  pages: {
    home: { title: tt("Now"), section: "home", blocks: [
      { t: "h", text: tt("You start a new role as team lead next month") },
      { t: "p", text: tt("Two courses many new team leads take in their first weeks:") },
      { t: "cards", items: [
        { title: tt("Your first 90 days as a team lead"), text: tt("Because your profile says: new role, team lead, from next month."), tag: tt("For your situation"), go: "c1" },
        { title: tt("Giving feedback"), text: tt("Because new team leads often have their first reviews within two months."), tag: tt("For your situation"), go: "c1" },
      ] },
      { t: "links", small: true, items: [{ label: tt("Not my situation"), go: "notme" }, { label: tt("Why do I see this?"), go: "why" }, { label: tt("Browse all courses"), go: "all" }] },
    ] },
    c1: { title: tt("Course"), section: "home", blocks: [
      { t: "h", text: tt("Your first 90 days as a team lead") },
      { t: "p", text: tt("Eight short units, one per week, for the first weeks in a new team.") },
      { t: "links", items: [{ label: tt("Add to my plan"), go: "added" }, { label: tt("Not now"), go: "home" }] },
    ] },
    added: { title: tt("Added"), section: "home", blocks: [{ t: "p", text: tt("Added to your plan. You can remove it at any time under My plan.") }, back("home", tt("Now"))] },
    notme: { title: tt("Not my situation"), section: "home", blocks: [
      { t: "h", text: tt("What is your situation?") },
      { t: "links", items: [{ label: tt("I stay in my role and want to deepen it"), go: "all" }, { label: tt("I want to change field"), go: "all" }, { label: tt("No suggestions for now"), go: "off" }] },
    ] },
    off: { title: tt("Suggestions paused"), section: "home", blocks: [{ t: "p", text: tt("Suggestions are paused. You can switch them on again under Why I see this.") }, back("home", tt("Now"))] },
    why: { title: tt("Why I see this"), section: "why", blocks: [
      { t: "h", text: tt("Why you see these suggestions") },
      { t: "list", items: [tt("Your profile: new role as team lead, from next month (entered by you)"), tt("What many people in that situation take (no personal history is used)")] },
      { t: "toggle", label: tt("Situational suggestions"), on: tt("On."), off: tt("Off: you only see the course catalogue.") },
    ] },
    all: { title: tt("All courses"), section: "home", blocks: [
      { t: "h", text: tt("All courses") },
      { t: "list", items: [tt("Negotiation basics"), tt("Data literacy for managers"), tt("Giving feedback"), tt("Your first 90 days as a team lead"), tt("Changing field: a guide")] },
      back("home", tt("Now")),
    ] },
  },
  footer: productFooter("CareerNavigator"),
});

/* ------------------------------------------------------------------ CareGuide today, the portal of a health and prevention provider */

/** CareGuide today: partly fitting recommendations, no why, no hint of depth, limited control, quick simple cases, unclear exceptions. */
export const careGuide = (): PlatformCfg => ({
  name: "CareGuide",
  start: "home",
  color: "#0B6E4F",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Appointments"), go: "appts" }, { label: tt("Documents"), go: "docs" }, { label: tt("Settings"), go: "settings" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [
      { t: "h", text: tt("Welcome back, Mr Aydin") },
      { t: "sub", text: tt("For you") },
      { t: "cards", mark: 1, items: [
        { title: tt("Book your back check-up"), text: tt("It is time for your next appointment."), tag: tt("Recommended"), go: "appts" },
        { title: tt("Pregnancy: what to expect in the first trimester"), text: tt("Information from our doctors."), tag: tt("Recommended"), go: "art2" },
        { title: tt("Quit smoking in 6 weeks"), text: tt("Our programme for a smoke-free life."), tag: tt("Recommended"), go: "art3" },
      ] },
      { t: "p", mark: 2, text: tt("Content selected for you.") },
      { t: "links", grid: 2, items: [{ label: tt("Book an appointment"), go: "appts" }, { label: tt("My documents"), go: "docs" }, { label: tt("My programmes"), go: "prog" }, { label: tt("Contact"), go: "contact" }] },
    ] },
    art2: { title: tt("Article"), section: "home", blocks: [{ t: "h", mark: 3, text: tt("Pregnancy: what to expect in the first trimester") }, { t: "p", text: tt("The first twelve weeks bring many changes. Our doctors explain what is normal and when to call.") }, back("home", tt("Home"))] },
    art3: { title: tt("Programme"), section: "home", blocks: [{ t: "h", text: tt("Quit smoking in 6 weeks") }, { t: "p", text: tt("Six weeks, one call a week with a coach.") }, { t: "links", items: [{ label: tt("Join"), go: "joined" }] }, back("home", tt("Home"))] },
    joined: { title: tt("Programme"), section: "home", blocks: [{ t: "p", text: tt("You have joined the programme.") }, back("home", tt("Home"))] },
    appts: { title: tt("Appointments"), section: "appts", blocks: [
      { t: "h", text: tt("Book an appointment") },
      { t: "p", mark: 5, text: tt("Suggested: back check-up with Dr Neumann, Thursday 9:30.") },
      { t: "links", items: [{ label: tt("Book the suggested time"), go: "booked" }, { label: tt("Choose another time"), go: "other" }] },
    ] },
    booked: { title: tt("Booked"), section: "appts", blocks: [{ t: "p", text: tt("Booked: Thursday 9:30, Dr Neumann. A reminder will follow.") }, back("home", tt("Home"))] },
    other: { title: tt("Other time"), section: "appts", blocks: [{ t: "form", fields: [tt("Date"), tt("Type of appointment")], button: tt("Search"), msg: tt("No free appointments found for this selection.") }, back("appts", tt("Appointments"))] },
    docs: { title: tt("Documents"), section: "docs", blocks: [
      { t: "h", text: tt("My documents") },
      { t: "list", items: [tt("Findings, back check-up, 12.03..pdf"), tt("Programme confirmation, back fitness.pdf"), tt("Privacy notice.pdf")] },
      { t: "p", text: tt("Recommended: “Pregnancy: what to expect in the first trimester”.") },
    ] },
    prog: { title: tt("My programmes"), section: "home", blocks: [
      { t: "h", text: tt("My programmes") },
      { t: "table", head: [tt("Programme"), tt("Status")], rows: [[tt("Back fitness"), tt("active")]] },
      back("home", tt("Home")),
    ] },
    contact: { title: tt("Contact"), section: "home", blocks: [
      { t: "h", text: tt("Contact") },
      { t: "p", text: tt("I care for my mother and manage her appointments as well.") },
      { t: "chat", mark: 6, label: tt("Write your question"), intro: tt("Our digital assistant answers your questions."), reply: tt("Assistant: Recommended for you: “Book your back check-up”.") },
    ] },
    settings: { title: tt("Settings"), section: "settings", blocks: [
      { t: "h", mark: 4, text: tt("Settings") },
      { t: "toggle", label: tt("E-mail reminders"), on: tt("E-mail reminders on."), off: tt("E-mail reminders off.") },
      { t: "p", text: tt("Language: English") },
    ] },
  },
  footer: productFooter("CareGuide"),
});

/* ------------------------------------------------------------------ The provider's app and service platform (Route 2) */

/**
 * The brief of Route 2: a customer portal (CareGuide), an app and a service platform; pilots that users do not understand, that patronise or misfit. Case assumption
 * (marked “Clear” in the brief): the pilots are content recommendations in the app and an appointment suggestion in the portal.
 */
export const cgApp = (): PlatformCfg => ({
  name: "CareGuide · App",
  start: "home",
  color: "#0F5F48",
  phone: true,
  nav: [{ label: tt("Today"), go: "home" }],
  pages: {
    home: { title: tt("Today"), section: "home", blocks: [
      { t: "hero", kicker: tt("PILOT · SMART TIPS"), title: tt("You should drink more water today."), text: tt("Our smart tips help you live healthier.") },
      { t: "cards", items: [{ title: tt("10,000 steps: you can do it!"), text: tt("You only walked 2,300 steps yesterday."), tag: tt("Tip"), go: "tip" }, { title: tt("Diabetes: early warning signs"), text: tt("Read now."), tag: tt("Tip"), go: "tip" }] },
    ] },
    tip: { title: tt("Tip"), section: "home", blocks: [{ t: "p", text: tt("Tips are selected automatically.") }, back("home", tt("Today"))] },
  },
  footer: productFooter("CareGuide"),
});

export const cgService = (): PlatformCfg => ({
  name: "CareGuide · Service",
  start: "home",
  color: "#334E45",
  nav: [{ label: tt("Service"), go: "home" }],
  pages: {
    home: { title: tt("Service"), section: "home", blocks: [
      { t: "h", text: tt("How can we help?") },
      { t: "links", items: [{ label: tt("Invoices and reimbursement"), go: "inv" }, { label: tt("Hotline"), go: "hotline" }] },
    ] },
    inv: { title: tt("Invoices"), section: "home", blocks: [{ t: "form", fields: [tt("Invoice number"), tt("Amount")], button: tt("Submit"), msg: tt("Received. Processing takes about ten working days.") }, back("home", tt("Service"))] },
    hotline: { title: tt("Hotline"), section: "home", blocks: [{ t: "p", text: tt("Monday to Friday, 8 am to 6 pm.") }, back("home", tt("Service"))] },
  },
  footer: productFooter("CareGuide"),
});
