import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): BankDirect as the plan describes it, on the desktop and on a phone, the three AdminFlow navigation
 * variants of Block 1.2, MoveEasy as it is today, on the desktop and on a phone, and the mobility provider's service app and administration interface. Every link and
 * button opens a real page. The plan's clues are kept exactly (14 equal menu options, "start transfer" as a small top-right link, similar buttons packed close together,
 * crowded forms, numbers and options to remember, small mobile buttons; all functions at once, central tasks large with rare ones deeper, a minimal layout with many
 * steps; small, badly placed booking buttons, too many options, tariffs to remember, long lists of similar options, equal choices in each step, small touch targets)
 * with the target sizes set through the items' `css`, and nothing is added that changes the answer. The names and contents are made up; nothing is marked right or
 * wrong, and no figure is printed that the plan does not print.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });
/** A small target the plan names: a link or button that is hard to hit. */
const TINY = { minHeight: 20, padding: "0 4px", fontSize: 10 } as const;
/** Buttons packed with no space between them. */
const PACKED = { gap: 0 } as const;

/* ------------------------------------------------------------------ BankDirect, a banking portal */

const BD_MENU = (): Item[] => [
  { label: tt("Accounts"), go: "accounts" }, { label: tt("Cards"), go: "cards" }, { label: tt("Standing orders"), go: "standing" }, { label: tt("Direct debits"), go: "debits" },
  { label: tt("Statements"), go: "statements" }, { label: tt("Savings"), go: "savings" }, { label: tt("Loans"), go: "loans" }, { label: tt("Insurance"), go: "insurance" },
  { label: tt("Investments"), go: "investments" }, { label: tt("Contracts"), go: "contracts" }, { label: tt("Mailbox"), go: "mailbox" }, { label: tt("Limits"), go: "limits" },
  { label: tt("Security"), go: "security" }, { label: tt("Settings"), go: "settings" },
];

const bdPages = (): Record<string, PPage> => ({
  start: { title: tt("BankDirect"), blocks: [
    { t: "links", small: true, mark: 2, css: { justifyContent: "flex-end" }, items: [{ label: tt("Start transfer"), go: "transfer1", css: TINY }, { label: tt("Log out"), go: "start", css: TINY }] },
    { t: "h", text: tt("Your overview") },
    { t: "links", grid: 3, mark: 1, items: BD_MENU() },
    { t: "table", head: [tt("Account"), tt("Type")], rows: [[tt("Current account"), tt("Private")], [tt("Savings account"), tt("Private")]] },
  ] },
  transfer1: { title: tt("Transfer"), blocks: [
    { t: "h", text: tt("New transfer") },
    { t: "p", text: tt("From account: Current account. To: enter the recipient's IBAN, the BIC, the name, the reference and the amount. Optional: execution date, standing order, template, notification, category.") },
    { t: "form", mark: 4, fields: [tt("Recipient name"), tt("IBAN"), tt("BIC"), tt("Reference"), tt("Amount"), tt("Execution date"), tt("Category"), tt("Save as template")], button: tt("Continue"), msg: tt("Please check your entries on the next page.") },
    { t: "links", small: true, items: [{ label: tt("Continue to the check"), go: "transfer2" }, { label: tt("Cancel"), go: "start" }] },
  ] },
  transfer2: { title: tt("Transfer"), blocks: [
    { t: "h", text: tt("Check and confirm"), mark: 5 },
    { t: "p", text: tt("Please enter the TAN from your app and the last four digits of the recipient's IBAN you entered on the previous page, and choose the execution option.") },
    { t: "form", fields: [tt("TAN"), tt("Last four digits of the IBAN"), tt("Option: today / date / standing")], button: tt("Confirm"), msg: tt("Transfer confirmed.") },
    { t: "links", small: true, mark: 3, css: PACKED, items: [{ label: tt("Send"), go: "sent", css: TINY }, { label: tt("Save"), go: "saved", css: TINY }, { label: tt("Save as template"), go: "saved", css: TINY }, { label: tt("Back"), go: "transfer1", css: TINY }] },
  ] },
  sent: { title: tt("Sent"), blocks: [{ t: "p", text: tt("The transfer has been sent.") }, back("start", tt("Overview"))] },
  saved: { title: tt("Saved"), blocks: [{ t: "p", text: tt("The transfer has been saved and not sent.") }, back("start", tt("Overview"))] },
  accounts: { title: tt("Accounts"), blocks: [{ t: "table", head: [tt("Account"), tt("Type")], rows: [[tt("Current account"), tt("Private")], [tt("Savings account"), tt("Private")]] }, back("start", tt("Overview"))] },
  cards: { title: tt("Cards"), blocks: [{ t: "h", text: tt("Cards") }, { t: "links", small: true, css: PACKED, items: [{ label: tt("Block card"), go: "blocked", css: TINY }, { label: tt("Block online use"), go: "blocked", css: TINY }, { label: tt("Order a new card"), go: "ordered", css: TINY }] }, back("start", tt("Overview"))] },
  blocked: { title: tt("Blocked"), blocks: [{ t: "p", text: tt("The card has been blocked.") }, back("cards", tt("Cards"))] },
  ordered: { title: tt("Ordered"), blocks: [{ t: "p", text: tt("A new card has been ordered.") }, back("cards", tt("Cards"))] },
  standing: { title: tt("Standing orders"), blocks: [{ t: "p", text: tt("No standing orders.") }, back("start", tt("Overview"))] },
  debits: { title: tt("Direct debits"), blocks: [{ t: "p", text: tt("Direct debits of the last months.") }, back("start", tt("Overview"))] },
  statements: { title: tt("Statements"), blocks: [{ t: "p", text: tt("Your account statements.") }, back("start", tt("Overview"))] },
  savings: { title: tt("Savings"), blocks: [{ t: "p", text: tt("Your savings products.") }, back("start", tt("Overview"))] },
  loans: { title: tt("Loans"), blocks: [{ t: "p", text: tt("Your loans.") }, back("start", tt("Overview"))] },
  insurance: { title: tt("Insurance"), blocks: [{ t: "p", text: tt("Insurance from our partners.") }, back("start", tt("Overview"))] },
  investments: { title: tt("Investments"), blocks: [{ t: "p", text: tt("Your securities account.") }, back("start", tt("Overview"))] },
  contracts: { title: tt("Contracts"), blocks: [{ t: "p", text: tt("Your contract documents.") }, back("start", tt("Overview"))] },
  mailbox: { title: tt("Mailbox"), blocks: [{ t: "p", text: tt("No new messages.") }, back("start", tt("Overview"))] },
  limits: { title: tt("Limits"), blocks: [{ t: "form", fields: [tt("Daily limit")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Overview"))] },
  security: { title: tt("Security"), blocks: [{ t: "toggle", label: tt("Login notification"), on: tt("On"), off: tt("Off") }, back("start", tt("Overview"))] },
  settings: { title: tt("Settings"), blocks: [{ t: "toggle", label: tt("Paper statements"), on: tt("On"), off: tt("Off") }, back("start", tt("Overview"))] },
});

/** BankDirect as the plan describes it: 14 equal options, a small top-right transfer link, similar buttons packed together, crowded forms, numbers to remember, small mobile buttons. */
export const bankDirect = (): PlatformCfg => ({ name: "BankDirect", start: "start", color: "#0D47A1", nav: [{ label: tt("Overview"), go: "start" }], pages: bdPages(), footer: productFooter("BankDirect AG") });
export const bankDirectPhone = (): PlatformCfg => ({ ...bankDirect(), phone: true });

/* ------------------------------------------------------------------ AdminFlow, an administration platform: three navigation variants */

const AF_ALL = (): Item[] => [
  { label: tt("Users"), go: "users" }, { label: tt("Requests"), go: "requests" }, { label: tt("Approvals"), go: "approvals" }, { label: tt("Reports"), go: "reports" },
  { label: tt("Roles"), go: "roles" }, { label: tt("Groups"), go: "groups" }, { label: tt("Licences"), go: "licences" }, { label: tt("Devices"), go: "devices" },
  { label: tt("Audit"), go: "audit" }, { label: tt("Imports"), go: "imports" }, { label: tt("Exports"), go: "exports" }, { label: tt("Templates"), go: "templates" },
  { label: tt("Integrations"), go: "integrations" }, { label: tt("Billing"), go: "billing" }, { label: tt("Settings"), go: "settings" }, { label: tt("Help"), go: "help" },
];

function afPages(): Record<string, PPage> {
  const p = (key: string, title: string, blocks: Blk[]): PPage => ({ title, section: key, blocks: [{ t: "h", text: title }, ...blocks] });
  return {
    users: p("users", tt("Users"), [{ t: "table", head: [tt("Name"), tt("Role")], rows: [["A. Kaya", tt("Editor")], ["J. Lind", tt("Viewer")]] }, { t: "form", fields: [tt("Name"), tt("E-mail")], button: tt("Add user"), msg: tt("User added.") }]),
    requests: p("requests", tt("Requests"), [{ t: "list", items: [tt("Access to the finance folder"), tt("New laptop")] }, { t: "finish", label: tt("Mark the first request as done"), task: tt("Access to the finance folder"), feedback: [tt("Request closed.")] }]),
    approvals: p("approvals", tt("Approvals"), [{ t: "finish", label: tt("Approve the request"), task: tt("Access to the finance folder"), feedback: [tt("Approved.")] }]),
    reports: p("reports", tt("Reports"), [{ t: "list", items: [tt("Monthly users"), tt("Open requests")] }]),
    roles: p("roles", tt("Roles"), [{ t: "list", items: [tt("Admin"), tt("Editor"), tt("Viewer")] }]),
    groups: p("groups", tt("Groups"), [{ t: "list", items: [tt("Finance"), tt("Sales")] }]),
    licences: p("licences", tt("Licences"), [{ t: "p", text: tt("Licences in use and free.") }]),
    devices: p("devices", tt("Devices"), [{ t: "p", text: tt("Registered devices.") }]),
    audit: p("audit", tt("Audit"), [{ t: "p", text: tt("A record of changes.") }]),
    imports: p("imports", tt("Imports"), [{ t: "form", fields: [tt("File")], button: tt("Import"), msg: tt("Imported.") }]),
    exports: p("exports", tt("Exports"), [{ t: "p", text: tt("Export users and requests.") }]),
    templates: p("templates", tt("Templates"), [{ t: "list", items: [tt("New employee"), tt("Leaver")] }]),
    integrations: p("integrations", tt("Integrations"), [{ t: "toggle", label: tt("Directory sync"), on: tt("On"), off: tt("Off") }]),
    billing: p("billing", tt("Billing"), [{ t: "p", text: tt("Invoices of your organisation.") }]),
    settings: p("settings", tt("Settings"), [{ t: "toggle", label: tt("E-mail alerts"), on: tt("On"), off: tt("Off") }]),
    help: p("help", tt("Help"), [{ t: "faq", items: [{ q: tt("How do I add a user?"), a: tt("Open Users and fill in the form.") }] }]),
  };
}

/** Variant A: all functions visible at a glance, a high access to functions, but many options at once. */
export const adminA = (): PlatformCfg => ({
  name: "AdminFlow", start: "home", color: "#263238",
  nav: AF_ALL().map((i) => ({ label: i.label, go: i.go! })),
  pages: { ...afPages(), home: { title: tt("Home"), blocks: [{ t: "links", grid: 3, items: AF_ALL().map((i) => ({ ...i, css: TINY })) }] } },
  footer: productFooter("AdminFlow"),
});

/** Variant B: the central tasks are large and easy to reach, rare functions lie deeper in submenus. */
export const adminB = (): PlatformCfg => ({
  name: "AdminFlow", start: "home", color: "#37474F",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Users"), go: "users" }, { label: tt("Requests"), go: "requests" }, { label: tt("Approvals"), go: "approvals" }, { label: tt("More"), go: "more" }],
  pages: {
    ...afPages(),
    home: { title: tt("Home"), section: "home", blocks: [{ t: "links", grid: 2, items: AF_ALL().slice(0, 4).map((i) => ({ ...i, css: { minHeight: 64, fontSize: 15 } })) }, { t: "links", small: true, items: [{ label: tt("More functions"), go: "more" }] }] },
    more: { title: tt("More"), section: "more", blocks: [{ t: "h", text: tt("More functions") }, { t: "links", grid: 2, items: AF_ALL().slice(4) }] },
  },
  footer: productFooter("AdminFlow"),
});

/** Variant C: a modern, minimalist layout with few visible options, but many steps to the actual action. */
export const adminC = (): PlatformCfg => ({
  name: "AdminFlow", start: "home", color: "#4A148C",
  nav: [{ label: tt("Home"), go: "home" }],
  pages: {
    ...afPages(),
    home: { title: tt("Home"), section: "home", blocks: [{ t: "hero", title: tt("What would you like to manage?"), text: tt("Start here."), button: { label: tt("Start"), go: "c1" } }] },
    c1: { title: tt("Area"), section: "home", blocks: [{ t: "p", text: tt("Choose an area.") }, { t: "links", items: [{ label: tt("People"), go: "c2" }, { label: tt("Work"), go: "c3" }, { label: tt("System"), go: "c4" }] }] },
    c2: { title: tt("People"), section: "home", blocks: [{ t: "p", text: tt("Choose a topic.") }, { t: "links", items: [{ label: tt("Accounts"), go: "c5" }, { label: tt("Roles"), go: "roles" }, { label: tt("Groups"), go: "groups" }] }] },
    c5: { title: tt("Accounts"), section: "home", blocks: [{ t: "p", text: tt("Choose an action.") }, { t: "links", items: [{ label: tt("View accounts"), go: "users" }, { label: tt("Import accounts"), go: "imports" }] }] },
    c3: { title: tt("Work"), section: "home", blocks: [{ t: "p", text: tt("Choose a topic.") }, { t: "links", items: [{ label: tt("Requests"), go: "requests" }, { label: tt("Approvals"), go: "approvals" }, { label: tt("Reports"), go: "reports" }, { label: tt("Templates"), go: "templates" }] }] },
    c4: { title: tt("System"), section: "home", blocks: [{ t: "p", text: tt("Choose a topic.") }, { t: "links", items: [{ label: tt("Licences"), go: "licences" }, { label: tt("Devices"), go: "devices" }, { label: tt("Audit"), go: "audit" }, { label: tt("Exports"), go: "exports" }, { label: tt("Integrations"), go: "integrations" }, { label: tt("Billing"), go: "billing" }, { label: tt("Settings"), go: "settings" }, { label: tt("Help"), go: "help" }] }] },
  },
  footer: productFooter("AdminFlow"),
});

/* ------------------------------------------------------------------ MoveEasy, a mobility provider's booking and management portal */

const TICKETS = (): Item[] => [
  { label: tt("Single ticket"), go: "book2" }, { label: tt("Return ticket"), go: "book2" }, { label: tt("Day ticket"), go: "book2" }, { label: tt("Group day ticket"), go: "book2" },
  { label: tt("Week ticket"), go: "book2" }, { label: tt("Month ticket"), go: "book2" }, { label: tt("Month ticket 9 am"), go: "book2" }, { label: tt("Student month ticket"), go: "book2" },
  { label: tt("Senior ticket"), go: "book2" }, { label: tt("Bike ticket"), go: "book2" }, { label: tt("Short trip"), go: "book2" }, { label: tt("Airport ticket"), go: "book2" },
];

const mvPages = (): Record<string, PPage> => ({
  start: { title: tt("MoveEasy"), blocks: [
    { t: "links", small: true, mark: 1, css: { justifyContent: "flex-end" }, items: [{ label: tt("Book"), go: "book1", css: TINY }] },
    { t: "cards", mark: 2, items: [
      { tag: tt("Offer"), title: tt("Weekend city pass"), text: tt("Explore the city all weekend."), go: "offer" },
      { tag: tt("New"), title: tt("Bike and ride"), text: tt("Combine your ticket with a bike."), go: "offer" },
      { tag: tt("Offer"), title: tt("Airport express"), text: tt("To the airport in comfort."), go: "offer" },
      { tag: tt("Tip"), title: tt("Car sharing"), text: tt("Our partners near you."), go: "offer" },
    ] },
    { t: "links", grid: 3, items: [{ label: tt("My tickets"), go: "mytickets" }, { label: tt("Timetable"), go: "timetable" }, { label: tt("Payment data"), go: "payment" }, { label: tt("Support"), go: "support" }, { label: tt("Lost property"), go: "support" }, { label: tt("Subscriptions"), go: "mytickets" }] },
  ] },
  book1: { title: tt("Book"), blocks: [
    { t: "h", text: tt("Choose your ticket"), mark: 5 },
    { t: "links", grid: 3, mark: 6, items: TICKETS().map((i) => ({ ...i, css: TINY })) },
    { t: "p", mark: 3, text: tt("Conditions: the single ticket is valid for one journey in one direction; the day ticket until the end of the operating day; the month ticket 9 am from 9 o'clock on working days; the group day ticket for up to five people; student and senior tickets only with proof; the bike ticket only together with a ticket for a person. Please note the conditions; you will need them when you confirm.") },
  ] },
  book2: { title: tt("Book"), blocks: [
    { t: "h", text: tt("Zones and options") },
    { t: "links", items: [{ label: tt("Zone A"), go: "book3", css: TINY }, { label: tt("Zones A and B"), go: "book3", css: TINY }, { label: tt("Zones A, B and C"), go: "book3", css: TINY }, { label: tt("Whole network"), go: "book3", css: TINY }], mark: 4 },
  ] },
  book3: { title: tt("Book"), blocks: [
    { t: "h", text: tt("Confirm") },
    { t: "p", text: tt("Please confirm that the conditions of the chosen ticket apply to your journey (see the previous page).") },
    { t: "form", fields: [tt("Travel date"), tt("Number of travellers"), tt("I accept the conditions (yes/no)")], button: tt("Book with obligation to pay"), msg: tt("Booking received.") },
    { t: "links", small: true, css: PACKED, items: [{ label: tt("Book"), go: "booked", css: TINY }, { label: tt("Change"), go: "book1", css: TINY }, { label: tt("Cancel"), go: "start", css: TINY }] },
  ] },
  booked: { title: tt("Booked"), blocks: [{ t: "p", text: tt("Your ticket is in My tickets.") }, back("start", tt("Start"))] },
  mytickets: { title: tt("My tickets"), blocks: [{ t: "h", text: tt("My tickets") }, { t: "list", items: [tt("Month ticket · valid"), tt("Day ticket · used")] }, { t: "links", small: true, items: [{ label: tt("Cancel a subscription"), go: "cancelsub", css: TINY }, { label: tt("Change a subscription"), go: "cancelsub", css: TINY }] }, back("start", tt("Start"))] },
  cancelsub: { title: tt("Subscription"), blocks: [{ t: "form", fields: [tt("Subscription number"), tt("Reason")], button: tt("Send"), msg: tt("Your request has been received.") }, back("mytickets", tt("My tickets"))] },
  timetable: { title: tt("Timetable"), blocks: [{ t: "form", fields: [tt("From"), tt("To"), tt("When")], button: tt("Search"), msg: tt("Three connections found.") }, back("start", tt("Start"))] },
  payment: { title: tt("Payment data"), blocks: [{ t: "h", text: tt("Payment data") }, { t: "form", fields: [tt("Payment method"), tt("Account holder"), tt("Valid from")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Start"))] },
  support: { title: tt("Support"), blocks: [{ t: "chat", intro: tt("Write to us."), label: tt("Your message"), reply: tt("Thank you. We will answer as soon as possible.") }, back("start", tt("Start"))] },
  offer: { title: tt("Offer"), blocks: [{ t: "p", text: tt("Find out more about our offers.") }, back("start", tt("Start"))] },
});

/** MoveEasy today: small, badly placed booking buttons, too many options, tariffs and conditions to remember, long lists of similar options, equal choices in each step, small touch targets. */
export const moveEasy = (): PlatformCfg => ({ name: "MoveEasy", start: "start", color: "#00695C", nav: [{ label: tt("Start"), go: "start" }, { label: tt("My tickets"), go: "mytickets" }], header: () => tt("Portal"), pages: mvPages(), footer: productFooter("MoveEasy Mobility GmbH") });
export const moveEasyPhone = (): PlatformCfg => ({ ...moveEasy(), phone: true });

/* ------------------------------------------------------------------ The provider's service app and administration interface (Route 2) */

/**
 * The brief of Route 2: a customer portal, a service app and an administration interface, processes that work but are slow, error-prone and hard for first-time users.
 * Case assumption (marked “Clear” in the brief): each team builds its buttons, lists and forms its own way; there are no shared interaction standards.
 */
export const mobilityApp = (): PlatformCfg => ({
  name: "MoveEasy app",
  start: "home",
  color: "#004D40",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Tickets"), go: "tickets" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "links", grid: 3, items: [{ label: tt("Buy"), go: "buy", css: TINY }, { label: tt("Plan"), go: "plan", css: TINY }, { label: tt("Report"), go: "report", css: TINY }, { label: tt("Offers"), go: "plan", css: TINY }, { label: tt("News"), go: "plan", css: TINY }, { label: tt("Help"), go: "report", css: TINY }] }] },
    buy: { title: tt("Buy"), section: "home", blocks: [{ t: "links", items: TICKETS().slice(0, 8).map((i) => ({ ...i, go: "paid" })) }] },
    paid: { title: tt("Paid"), section: "home", blocks: [{ t: "p", text: tt("Ticket bought.") }, back("home", tt("Home"))] },
    plan: { title: tt("Plan"), section: "home", blocks: [{ t: "form", fields: [tt("From"), tt("To")], button: tt("Search"), msg: tt("Connections found.") }, back("home", tt("Home"))] },
    report: { title: tt("Report"), section: "home", blocks: [{ t: "form", fields: [tt("What happened")], button: tt("Send"), msg: tt("Sent.") }, back("home", tt("Home"))] },
    tickets: { title: tt("Tickets"), section: "tickets", blocks: [{ t: "list", items: [tt("Month ticket · valid")] }] },
  },
});

export const adminInterface = (): PlatformCfg => ({
  name: "MoveEasy admin",
  start: "home",
  color: "#3E2723",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Customers"), go: "customers" }, { label: tt("Refunds"), go: "refunds" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "h", text: tt("Service desk") }, { t: "links", small: true, css: PACKED, items: [{ label: tt("Refund"), go: "refunds", css: TINY }, { label: tt("Reissue"), go: "customers", css: TINY }, { label: tt("Block"), go: "customers", css: TINY }, { label: tt("Unblock"), go: "customers", css: TINY }] }] },
    customers: { title: tt("Customers"), section: "customers", blocks: [{ t: "form", fields: [tt("Customer number"), tt("Ticket number"), tt("Action code")], button: tt("Run"), msg: tt("Done.") }, back("home", tt("Home"))] },
    refunds: { title: tt("Refunds"), section: "refunds", blocks: [{ t: "form", fields: [tt("Booking number"), tt("Reason code"), tt("Tariff code")], button: tt("Refund"), msg: tt("Refund started.") }, back("home", tt("Home"))] },
  },
});
