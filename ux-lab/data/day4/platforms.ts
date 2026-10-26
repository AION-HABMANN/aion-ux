import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): ServicePoint as the plan describes it, the three WorkFlow Hub navigation variants of Block 1.2,
 * MyEnergy as it is today, and the energy supplier's app and service platform. Every menu item, link and button opens a real page. The plan's clues are kept exactly
 * (many equal menu items, the main functions hidden, steps to remember, internal terms, new choices after every step, no feedback; very many options, a reduced
 * navigation with rare functions deeper, interactive elements with changing patterns; too many equal items, unprioritised main tasks, invisible process logic,
 * technical language, information to remember, unclear feedback) and nothing is added that changes the answer. The names and contents are made up; nothing is marked
 * right or wrong, and no figure is printed that the plan does not print.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });
const choose = (items: Item[], mark?: number): Blk => ({ t: "links", items, mark });

/* ------------------------------------------------------------------ ServicePoint, a self-service portal */

const SP_MENU = (): Item[] => [
  { label: tt("Contract object management"), go: "vom" },
  { label: tt("Document centre"), go: "docs" },
  { label: tt("Account data"), go: "account" },
  { label: tt("Tariff information"), go: "tariffs" },
  { label: tt("Payment data"), go: "payment" },
  { label: tt("Notifications"), go: "notes" },
  { label: tt("Partner services"), go: "partner" },
  { label: tt("Product catalogue"), go: "catalogue" },
  { label: tt("Consumption data"), go: "consumption" },
  { label: tt("Service request"), go: "sr" },
  { label: tt("Data protection"), go: "privacy" },
  { label: tt("Legal notices"), go: "legal" },
];

const spPages = (): Record<string, PPage> => ({
  start: { title: tt("ServicePoint"), blocks: [
    { t: "h", text: tt("Self-service · contract object administration"), mark: 4 },
    { t: "links", grid: 3, items: SP_MENU(), mark: 1 },
    { t: "p", text: tt("Welcome to ServicePoint. Here you can manage your contract objects, retrieve documents and submit service requests."), mark: 2 },
  ] },
  vom: { title: tt("Contract object management"), blocks: [{ t: "h", text: tt("Contract object management") }, { t: "p", text: tt("Please select the desired function.") }, choose([{ label: tt("Change contract object"), go: "change1" }, { label: tt("Master data of the contract object"), go: "master" }, { label: tt("Consumption point"), go: "consumption" }, { label: tt("Contract partner"), go: "account" }]), back("start", tt("Start"))] },
  change1: { title: tt("Change"), blocks: [{ t: "h", text: tt("Change contract object"), mark: 3 }, { t: "p", text: tt("Your contract object ID: VO-48213-K. Please keep this ID ready; it is required in a later step.") }, { t: "p", text: tt("Select the type of change.") }, choose([{ label: tt("Change of product variant"), go: "change2" }, { label: tt("Change of term"), go: "term" }, { label: tt("Change of billing cycle"), go: "cycle" }], 5), back("vom", tt("Back"))] },
  change2: { title: tt("Change"), blocks: [{ t: "h", text: tt("Change of product variant") }, { t: "p", text: tt("Select the new product variant.") }, choose([{ label: tt("Variant S"), go: "change3" }, { label: tt("Variant M"), go: "change3" }, { label: tt("Variant L"), go: "change3" }, { label: tt("Variant XL"), go: "change3" }]), back("change1", tt("Back"))] },
  change3: { title: tt("Change"), blocks: [{ t: "h", text: tt("Request for change") }, { t: "p", text: tt("Please enter the contract object ID and the desired effective date.") }, { t: "form", fields: [tt("Contract object ID"), tt("Effective date")], button: tt("Submit"), msg: tt("Request recorded."), mark: 6 }, back("change2", tt("Back"))] },
  term: { title: tt("Term"), blocks: [{ t: "p", text: tt("Changes of term are processed by the responsible department.") }, choose([{ label: tt("Submit a service request"), go: "sr" }]), back("change1", tt("Back"))] },
  cycle: { title: tt("Billing cycle"), blocks: [{ t: "p", text: tt("Select the new billing cycle.") }, choose([{ label: tt("Monthly"), go: "change3" }, { label: tt("Quarterly"), go: "change3" }, { label: tt("Annually"), go: "change3" }]), back("change1", tt("Back"))] },
  master: { title: tt("Master data"), blocks: [{ t: "table", head: [tt("Field"), tt("Value")], rows: [[tt("Contract object ID"), "VO-48213-K"], [tt("Product variant"), tt("Variant M")]] }, back("vom", tt("Back"))] },
  sr: { title: tt("Service request"), blocks: [{ t: "h", text: tt("Service request") }, { t: "p", text: tt("Select the service request type.") }, choose([{ label: tt("Type A · technical"), go: "sr2" }, { label: tt("Type B · commercial"), go: "sr2" }, { label: tt("Type C · other"), go: "sr2" }]), back("start", tt("Start"))] },
  sr2: { title: tt("Service request"), blocks: [{ t: "p", text: tt("Select the category.") }, choose([{ label: tt("Category 1"), go: "sr3" }, { label: tt("Category 2"), go: "sr3" }, { label: tt("Category 3"), go: "sr3" }]), back("sr", tt("Back"))] },
  sr3: { title: tt("Service request"), blocks: [{ t: "form", fields: [tt("Contract object ID"), tt("Description")], button: tt("Submit"), msg: tt("Recorded.") }, back("sr2", tt("Back"))] },
  docs: { title: tt("Document centre"), blocks: [{ t: "links", items: [{ label: tt("Contract documents"), go: "downloaded" }, { label: tt("Invoices"), go: "downloaded" }] }, back("start", tt("Start"))] },
  downloaded: { title: tt("Download"), blocks: [{ t: "p", text: tt("The document is being downloaded.") }, back("docs", tt("Back"))] },
  account: { title: tt("Account data"), blocks: [{ t: "form", fields: [tt("Name"), tt("Address"), tt("E-mail")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Start"))] },
  tariffs: { title: tt("Tariff information"), blocks: [{ t: "list", items: [tt("Variant S"), tt("Variant M"), tt("Variant L"), tt("Variant XL")] }, back("start", tt("Start"))] },
  payment: { title: tt("Payment data"), blocks: [{ t: "form", fields: [tt("Account holder"), tt("Payment method")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Start"))] },
  notes: { title: tt("Notifications"), blocks: [{ t: "p", text: tt("No new notifications.") }, back("start", tt("Start"))] },
  partner: { title: tt("Partner services"), blocks: [{ t: "p", text: tt("Offers from our partners.") }, back("start", tt("Start"))] },
  catalogue: { title: tt("Product catalogue"), blocks: [{ t: "p", text: tt("Our products at a glance.") }, back("start", tt("Start"))] },
  consumption: { title: tt("Consumption data"), blocks: [{ t: "p", text: tt("Consumption data is shown for the current billing period.") }, back("start", tt("Start"))] },
  privacy: { title: tt("Data protection"), blocks: [{ t: "p", text: tt("Information on the processing of personal data.") }, back("start", tt("Start"))] },
  legal: { title: tt("Legal notices"), blocks: [{ t: "p", text: tt("Imprint and terms of use.") }, back("start", tt("Start"))] },
});

/** ServicePoint as the plan describes it: many equal menu items, main functions hidden, steps to remember, internal terms, new choices after every step, no feedback. */
export const servicePoint = (): PlatformCfg => ({ name: "ServicePoint", start: "start", color: "#455A64", nav: [{ label: tt("Start"), go: "start" }], pages: spPages(), footer: productFooter("ServicePoint GmbH") });

/* ------------------------------------------------------------------ WorkFlow Hub, a work platform: three navigation variants */

const WF_ALL = (): Item[] => [
  { label: tt("My tasks"), go: "tasks" }, { label: tt("Projects"), go: "projects" }, { label: tt("Documents"), go: "documents" }, { label: tt("Calendar"), go: "calendar" },
  { label: tt("Time tracking"), go: "time" }, { label: tt("Reports"), go: "reports" }, { label: tt("Approvals"), go: "approvals" }, { label: tt("Expenses"), go: "expenses" },
  { label: tt("Team directory"), go: "team" }, { label: tt("Templates"), go: "templates" }, { label: tt("Integrations"), go: "integrations" }, { label: tt("Archive"), go: "archive" },
  { label: tt("Audit log"), go: "audit" }, { label: tt("Settings"), go: "settings" },
];

function wfBase(style: "plain" | "mixed"): Record<string, PPage> {
  const area = (key: string, title: string, blocks: Blk[]): PPage => ({ title, section: key, blocks: [{ t: "h", text: title }, ...blocks] });
  const mixed = style === "mixed";
  return {
    tasks: area("tasks", tt("My tasks"), mixed
      ? [{ t: "tabs", tabs: [{ label: tt("Today"), fields: [tt("New task")] }, { label: tt("This week"), fields: [tt("New task")] }], button: tt("Add"), msg: tt("Task added.") }, { t: "finish", label: tt("Mark “Send the report” as done"), task: tt("Send the report"), feedback: [tt("Done.")] }]
      : [{ t: "list", items: [tt("Send the report"), tt("Prepare the meeting")] }, { t: "form", fields: [tt("New task")], button: tt("Add task"), msg: tt("Task added.") }]),
    projects: area("projects", tt("Projects"), mixed
      ? [{ t: "cards", items: [{ title: tt("Website relaunch"), text: tt("Swipe to see the milestones.") }, { title: tt("Office move"), text: tt("Tap and hold to open.") }] }]
      : [{ t: "table", head: [tt("Project"), tt("Lead")], rows: [[tt("Website relaunch"), "M. Vogt"], [tt("Office move"), "A. Kaya"]] }]),
    documents: area("documents", tt("Documents"), mixed
      ? [{ t: "toggle", label: tt("Show as grid"), on: tt("Grid view"), off: tt("List view") }, { t: "links", small: true, items: [{ label: tt("Upload ⇪"), go: "uploaded" }] }]
      : [{ t: "list", items: [tt("Budget plan"), tt("Meeting notes")] }, { t: "links", items: [{ label: tt("Upload a document"), go: "uploaded" }] }]),
    uploaded: { title: tt("Uploaded"), blocks: [{ t: "p", text: tt("Document uploaded.") }, back("documents", tt("Documents"))] },
    calendar: area("calendar", tt("Calendar"), [{ t: "table", head: [tt("When"), tt("What")], rows: [[tt("Tuesday 10:00"), tt("Team meeting")]] }]),
    time: area("time", tt("Time tracking"), [{ t: "form", fields: [tt("Project"), tt("Hours")], button: mixed ? tt("⏱") : tt("Book time"), msg: tt("Time booked.") }]),
    reports: area("reports", tt("Reports"), mixed ? [{ t: "quotes", items: [{ who: tt("Weekly report"), role: tt("auto-generated"), text: tt("Drag a widget here to build your report.") }] }] : [{ t: "list", items: [tt("Weekly report"), tt("Project status")] }]),
    approvals: area("approvals", tt("Approvals"), [{ t: "p", text: tt("No approvals waiting.") }]),
    expenses: area("expenses", tt("Expenses"), [{ t: "form", fields: [tt("Amount"), tt("Reason")], button: tt("Submit"), msg: tt("Expense submitted.") }]),
    team: area("team", tt("Team directory"), [{ t: "person", name: "Mira Vogt", role: tt("Project lead"), text: tt("Website relaunch") }]),
    templates: area("templates", tt("Templates"), [{ t: "list", items: [tt("Meeting agenda"), tt("Project brief")] }]),
    integrations: area("integrations", tt("Integrations"), [{ t: "toggle", label: tt("Calendar sync"), on: tt("On"), off: tt("Off") }]),
    archive: area("archive", tt("Archive"), [{ t: "p", text: tt("Archived projects and documents.") }]),
    audit: area("audit", tt("Audit log"), [{ t: "p", text: tt("A record of changes in your workspace.") }]),
    settings: area("settings", tt("Settings"), [{ t: "toggle", label: tt("E-mail notifications"), on: tt("On"), off: tt("Off") }]),
  };
}

/** Variant A: very many options directly visible, a large scope of functions, but a complex first impression. */
export const workflowA = (): PlatformCfg => ({
  name: "WorkFlow Hub",
  start: "home",
  color: "#283593",
  nav: WF_ALL().map((i) => ({ label: i.label, go: i.go! })),
  pages: { ...wfBase("plain"), home: { title: tt("Home"), blocks: [{ t: "h", text: tt("Good morning") }, { t: "links", grid: 3, items: WF_ALL() }] } },
  footer: productFooter("WorkFlow Hub"),
});

/** Variant B: a reduced navigation with a clear focus on the main tasks, but some rare functions lie deeper in the system. */
export const workflowB = (): PlatformCfg => ({
  name: "WorkFlow Hub",
  start: "home",
  color: "#37474F",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("My tasks"), go: "tasks" }, { label: tt("Projects"), go: "projects" }, { label: tt("Documents"), go: "documents" }, { label: tt("Calendar"), go: "calendar" }, { label: tt("All functions"), go: "all" }],
  pages: {
    ...wfBase("plain"),
    home: { title: tt("Home"), section: "home", blocks: [{ t: "h", text: tt("Good morning") }, { t: "links", items: [{ label: tt("My tasks"), go: "tasks" }, { label: tt("Projects"), go: "projects" }, { label: tt("Documents"), go: "documents" }] }] },
    all: { title: tt("All functions"), section: "all", blocks: [{ t: "h", text: tt("All functions") }, { t: "links", grid: 2, items: WF_ALL().slice(4) }] },
  },
  footer: productFooter("WorkFlow Hub"),
});

/** Variant C: a modern presentation with interactive elements, but patterns that change between the areas. */
export const workflowC = (): PlatformCfg => ({
  name: "WorkFlow Hub",
  start: "home",
  color: "#4A148C",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Tasks"), go: "tasks" }, { label: tt("Projects"), go: "projects" }, { label: tt("Docs"), go: "documents" }, { label: tt("More ⋯"), go: "more" }],
  pages: {
    ...wfBase("mixed"),
    home: { title: tt("Home"), section: "home", blocks: [{ t: "hero", kicker: tt("WorkFlow Hub"), title: tt("Your day, your flow."), text: tt("Swipe, drag and tap your way through work."), button: { label: tt("Start my day"), go: "tasks" } }, { t: "cards", items: [{ title: tt("Projects"), text: tt("Tap and hold to open."), go: "projects" }, { title: tt("Docs"), text: tt("Switch to grid view."), go: "documents" }] }] },
    more: { title: tt("More"), section: "more", blocks: [{ t: "cards", items: WF_ALL().slice(3).map((i) => ({ title: i.label, text: tt("Open"), go: i.go })) }] },
  },
  footer: productFooter("WorkFlow Hub"),
});

/* ------------------------------------------------------------------ MyEnergy, an energy supplier's portal */

const ME_MENU = (): Item[] => [
  { label: tt("Tariff management"), go: "tariff" },
  { label: tt("Instalment adjustment"), go: "instal" },
  { label: tt("Meter reading submission"), go: "meter1" },
  { label: tt("Bill archive"), go: "bills" },
  { label: tt("Contract account"), go: "contract" },
  { label: tt("Customer master data"), go: "master" },
  { label: tt("Bank details"), go: "bank" },
  { label: tt("Consumption analysis"), go: "analysis" },
  { label: tt("Energy tips"), go: "tips" },
  { label: tt("Smart home"), go: "smart" },
  { label: tt("Moving service"), go: "moving" },
  { label: tt("Contact"), go: "contact" },
];

const mePages = (): Record<string, PPage> => ({
  start: { title: tt("MyEnergy"), blocks: [
    { t: "hero", kicker: tt("New"), title: tt("Smart home: save energy automatically"), text: tt("Discover our new smart home packages."), button: { label: tt("Learn more"), go: "smart" }, mark: 2 },
    { t: "links", grid: 3, items: ME_MENU(), mark: 1 },
    { t: "p", text: tt("Please submit your meter reading by the end of the month. Your contract account number and the meter point designation are shown on your last bill."), mark: 4 },
  ] },
  meter1: { title: tt("Meter reading"), blocks: [{ t: "h", text: tt("Meter reading submission") }, { t: "p", text: tt("Select the meter point.") }, choose([{ label: tt("Electricity · meter point DE000-4471"), go: "meter2" }, { label: tt("Gas · meter point DE000-9930"), go: "meter2" }], 3), back("start", tt("Start"))] },
  meter2: { title: tt("Meter reading"), blocks: [{ t: "h", text: tt("Meter reading submission"), mark: 5 }, { t: "p", text: tt("Enter the meter number exactly as it appears on the meter. It is also shown on your last bill in the Bill archive.") }, { t: "form", fields: [tt("Meter number"), tt("Reading (kWh)"), tt("Date of reading")], button: tt("Send"), msg: tt("Your entry has been processed."), mark: 6 }, { t: "links", small: true, items: [{ label: tt("Bill archive"), go: "bills" }] }, back("meter1", tt("Back"))] },
  instal: { title: tt("Instalment"), blocks: [{ t: "h", text: tt("Instalment adjustment") }, { t: "p", text: tt("Select the contract account.") }, choose([{ label: tt("Contract account 2004 1187"), go: "instal2" }]), back("start", tt("Start"))] },
  instal2: { title: tt("Instalment"), blocks: [{ t: "p", text: tt("Enter the new instalment amount and the month from which it applies. The amount must be within the permitted range.") }, { t: "form", fields: [tt("New instalment"), tt("From month")], button: tt("Submit"), msg: tt("The adjustment has been recorded.") }, back("instal", tt("Back"))] },
  bills: { title: tt("Bills"), blocks: [{ t: "h", text: tt("Bill archive") }, { t: "table", head: [tt("Bill"), tt("Meter number"), tt("Open")], rows: [[tt("Last year"), "1ESY 1160 4421", { label: tt("Open"), go: "downloaded" }], [tt("Year before"), "1ESY 1160 4421", { label: tt("Open"), go: "downloaded" }]] }, back("start", tt("Start"))] },
  downloaded: { title: tt("Download"), blocks: [{ t: "p", text: tt("The bill is being downloaded.") }, back("bills", tt("Bill archive"))] },
  tariff: { title: tt("Tariff"), blocks: [{ t: "h", text: tt("Tariff management") }, choose([{ label: tt("Tariff Basic"), go: "tariff2" }, { label: tt("Tariff Green"), go: "tariff2" }, { label: tt("Tariff Flex"), go: "tariff2" }]), back("start", tt("Start"))] },
  tariff2: { title: tt("Tariff"), blocks: [{ t: "p", text: tt("Confirm the tariff change. The change takes effect at the next possible date.") }, { t: "form", fields: [tt("Contract account number")], button: tt("Confirm"), msg: tt("Processed.") }, back("tariff", tt("Back"))] },
  contract: { title: tt("Contract account"), blocks: [{ t: "table", head: [tt("Field"), tt("Value")], rows: [[tt("Contract account number"), "2004 1187"], [tt("Meter point designation"), "DE000-4471"]] }, back("start", tt("Start"))] },
  master: { title: tt("Master data"), blocks: [{ t: "form", fields: [tt("Name"), tt("Address")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Start"))] },
  bank: { title: tt("Bank details"), blocks: [{ t: "form", fields: [tt("Account holder"), tt("Payment method")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Start"))] },
  analysis: { title: tt("Consumption"), blocks: [{ t: "p", text: tt("Your consumption by month, based on your meter readings.") }, back("start", tt("Start"))] },
  tips: { title: tt("Energy tips"), blocks: [{ t: "list", items: [tt("Switch devices off fully"), tt("Wash at lower temperatures")] }, back("start", tt("Start"))] },
  smart: { title: tt("Smart home"), blocks: [{ t: "p", text: tt("Our smart home packages help you use less energy.") }, back("start", tt("Start"))] },
  moving: { title: tt("Moving service"), blocks: [{ t: "form", fields: [tt("New address"), tt("Moving date")], button: tt("Register"), msg: tt("Registered.") }, back("start", tt("Start"))] },
  contact: { title: tt("Contact"), blocks: [{ t: "chat", intro: tt("Write to our service."), label: tt("Your message"), reply: tt("Thank you. We will reply as soon as possible.") }, back("start", tt("Start"))] },
});

/** MyEnergy today: too many equal items, main tasks not prioritised, invisible process logic, technical language, information to remember across steps, unclear feedback. */
export const myEnergy = (): PlatformCfg => ({ name: "MyEnergy", start: "start", color: "#E65100", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Contact"), go: "contact" }], header: () => tt("Customer portal"), pages: mePages(), footer: productFooter("Stadtenergie AG") });

/* ------------------------------------------------------------------ The energy supplier's app and service platform (Route 2) */

/**
 * The brief of Route 2: a customer portal, a mobile app and a service platform, tasks done with much searching, uncertainty and support. Case assumption (marked “Clear”
 * in the brief): each department adds its functions to the channels it owns, and nobody owns the flow of a task across channels.
 */
export const energyApp = (): PlatformCfg => ({
  name: "MyEnergy app",
  start: "home",
  color: "#BF360C",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Services"), go: "services" }, { label: tt("Me"), go: "me" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "hero", title: tt("New: smart home"), text: tt("Save energy automatically."), button: { label: tt("Discover"), go: "smart" } }, { t: "links", items: [{ label: tt("Energy tips"), go: "tips" }, { label: tt("Offers"), go: "smart" }] }] },
    services: { title: tt("Services"), section: "services", blocks: [{ t: "links", items: [{ label: tt("Meter reading"), go: "meter" }, { label: tt("Payment schedule"), go: "schedule" }, { label: tt("Documents"), go: "docs" }] }] },
    meter: { title: tt("Meter reading"), section: "services", blocks: [{ t: "form", fields: [tt("Meter ID"), tt("Value")], button: tt("Send"), msg: tt("Sent.") }, back("services", tt("Services"))] },
    schedule: { title: tt("Payment schedule"), section: "services", blocks: [{ t: "p", text: tt("Changes to your payment schedule can be made in the web portal.") }, back("services", tt("Services"))] },
    docs: { title: tt("Documents"), section: "services", blocks: [{ t: "p", text: tt("Bills are available in the web portal.") }, back("services", tt("Services"))] },
    smart: { title: tt("Smart home"), section: "home", blocks: [{ t: "p", text: tt("Our smart home packages.") }, back("home", tt("Home"))] },
    tips: { title: tt("Tips"), section: "home", blocks: [{ t: "list", items: [tt("Switch devices off fully")] }, back("home", tt("Home"))] },
    me: { title: tt("Me"), section: "me", blocks: [{ t: "toggle", label: tt("Reminders for meter readings"), on: tt("On"), off: tt("Off") }] },
  },
});

export const servicePlatform = (): PlatformCfg => ({
  name: "Stadtenergie service",
  start: "help",
  color: "#4E342E",
  nav: [{ label: tt("Help"), go: "help" }, { label: tt("Contact form"), go: "form" }],
  pages: {
    help: { title: tt("Help"), section: "help", blocks: [{ t: "h", text: tt("How can we help?") }, { t: "faq", items: [{ q: tt("How do I submit my meter reading?"), a: tt("Under Meter reading submission in the customer portal, or under Services › Meter reading in the app.") }, { q: tt("How do I change my instalment?"), a: tt("Under Instalment adjustment in the customer portal. In the app this is called Payment schedule.") }, { q: tt("Did my meter reading arrive?"), a: tt("If you saw “Your entry has been processed”, it was received.") }] }] },
    form: { title: tt("Contact form"), section: "form", blocks: [{ t: "form", fields: [tt("Topic"), tt("Contract account number"), tt("Your message")], button: tt("Send"), msg: tt("Your request has been received.") }] },
  },
});
