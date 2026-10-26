import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): TravelEase as the plan describes it, the three HealthConnect designs of Block 1.2 on the same
 * platform, SecureLife as it is today, and the insurer's website and app. Every link and button opens a real page. The plan's clues of colour and type are set with the
 * blocks' `css` and colours exactly as the plan names them (four strong colours without a system, warnings, buttons and boxes in similar tones, decorative headings like
 * body text, important notes in small grey, modern but hard-to-read sections, links, buttons and status alike; strong brand colours with low contrast, factual high
 * contrast, elegant small type with faint navigation; blues, greens and reds without a function, buttons like boxes, status by colour only, small dense text,
 * inconsistent hierarchy, calls to action lost among text) and nothing is added that changes the answer. The names and contents are made up; nothing is marked right or
 * wrong, and no figure is printed that the plan does not print.
 */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

/* ------------------------------------------------------------------ TravelEase, a customer portal for travel bookings and rebookings */

const ORANGE = "#E8590C";
const PURPLE = "#7048E8";
const TEAL = "#0B8A6B";
const AMBER = "#D97706";
const DECO = { fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400, fontSize: 15 } as const;
const GREY_NOTE = { color: "#A0A6AD" } as const;
const MODERN = { fontWeight: 300, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 11, color: "#7A828C", lineHeight: 1.9 } as const;

const teHome = (): PPage => ({
  title: tt("TravelEase"),
  blocks: [
    { t: "links", grid: 2, mark: 1, items: [{ label: tt("My trips"), go: "trips", color: ORANGE }, { label: tt("Rebook"), go: "rebook", color: PURPLE }, { label: tt("Offers"), go: "offers", color: TEAL }, { label: tt("Help"), go: "help", color: AMBER }] },
    { t: "note", mark: 2, title: tt("Your flight time has changed"), text: tt("Your outbound flight to Porto now departs later than planned."), go: { label: tt("Show the change"), go: "changed" }, css: { background: "#FFE8D6", borderColor: "#FFC9A3" } },
    { t: "links", items: [{ label: tt("Rebook now"), go: "rebook", color: AMBER }] },
    { t: "note", title: tt("Tip: online check-in"), text: tt("Check in online from the day before departure."), go: { label: tt("To the check-in"), go: "checkin" }, css: { background: "#FFE8D6", borderColor: "#FFC9A3" } },
    { t: "h", text: tt("Your next journey"), mark: 3, css: DECO },
    { t: "p", text: tt("Porto, 3 nights, 2 travellers. Flight and hotel booked.") },
    { t: "p", text: tt("Rebookings are free of charge until the day before departure; after that a fee applies and the new fare may differ."), size: 10.5, mark: 4, css: GREY_NOTE },
    { t: "h", text: tt("Discover more"), css: DECO },
    { t: "p", text: tt("Explore hand-picked city breaks and beach escapes with flexible conditions for the whole family."), mark: 5, css: MODERN },
    { t: "meta", mark: 6, items: [tt("Confirmed"), tt("Changed"), tt("Check-in open")], colors: [TEAL, AMBER, PURPLE] },
    { t: "links", small: true, items: [{ label: tt("Booking conditions"), go: "conditions" }, { label: tt("Manage travellers"), go: "travellers" }] },
  ],
});

const tePages = (): Record<string, PPage> => ({
  home: teHome(),
  trips: { title: tt("My trips"), section: "trips", blocks: [{ t: "h", text: tt("My trips"), css: DECO }, { t: "table", head: [tt("Trip"), tt("Date"), tt("Status")], rows: [[{ label: tt("Porto"), go: "trip1" }, tt("in 3 weeks"), tt("Changed")], [{ label: tt("Vienna"), go: "trip2" }, tt("in 2 months"), tt("Confirmed")]] }, back("home", tt("Start"))] },
  trip1: { title: tt("Porto"), section: "trips", blocks: [{ t: "h", text: tt("Porto"), css: DECO }, { t: "meta", items: [tt("Changed"), tt("2 travellers")], colors: [AMBER, TEAL] }, { t: "p", text: tt("Outbound flight: now later than planned. Hotel: unchanged.") }, { t: "p", text: tt("If the new time does not suit you, you can rebook free of charge or cancel the flight."), size: 10.5, css: GREY_NOTE }, { t: "links", items: [{ label: tt("Rebook"), go: "rebook", color: AMBER }, { label: tt("Show the change"), go: "changed", color: ORANGE }] }, back("trips", tt("My trips"))] },
  trip2: { title: tt("Vienna"), section: "trips", blocks: [{ t: "h", text: tt("Vienna"), css: DECO }, { t: "meta", items: [tt("Confirmed")], colors: [TEAL] }, { t: "p", text: tt("Train and hotel booked. Tickets are sent 2 weeks before departure.") }, back("trips", tt("My trips"))] },
  changed: { title: tt("The change"), blocks: [{ t: "h", text: tt("Your flight time has changed"), css: DECO }, { t: "p", text: tt("The airline has changed the departure time of your outbound flight. Your hotel booking is not affected.") }, { t: "p", text: tt("You may accept the change, rebook free of charge or cancel the flight with a refund."), size: 10.5, css: GREY_NOTE }, { t: "links", items: [{ label: tt("Accept the change"), go: "accepted", color: TEAL }, { label: tt("Rebook"), go: "rebook", color: AMBER }] }, back("home", tt("Start"))] },
  accepted: { title: tt("Accepted"), blocks: [{ t: "p", text: tt("Thank you. The new time is confirmed.") }, back("home", tt("Start"))] },
  rebook: { title: tt("Rebook"), section: "rebook", blocks: [{ t: "h", text: tt("Rebook a trip"), css: DECO }, { t: "p", text: tt("Choose a new date. The fare is shown before you confirm."), size: 10.5, css: GREY_NOTE }, { t: "form", fields: [tt("Booking number"), tt("New outbound date"), tt("New return date")], button: tt("Search new connections"), msg: tt("Two connections found. Select one to see the fare.") }, back("home", tt("Start"))] },
  offers: { title: tt("Offers"), section: "offers", blocks: [{ t: "h", text: tt("Offers"), css: DECO }, { t: "p", text: tt("Seasonal city breaks and beach escapes for every taste."), css: MODERN }, { t: "cards", items: [{ tag: tt("City"), title: tt("Lisbon"), text: tt("Three nights near the old town.") }, { tag: tt("Beach"), title: tt("Mallorca"), text: tt("A week by the sea.") }] }, back("home", tt("Start"))] },
  help: { title: tt("Help"), section: "help", blocks: [{ t: "h", text: tt("Help"), css: DECO }, { t: "faq", items: [{ q: tt("How do I rebook?"), a: tt("Open My trips, choose the trip and press Rebook.") }, { q: tt("Is rebooking free?"), a: tt("Until the day before departure. After that a fee applies.") }] }, back("home", tt("Start"))] },
  checkin: { title: tt("Check-in"), blocks: [{ t: "h", text: tt("Online check-in"), css: DECO }, { t: "form", fields: [tt("Booking number"), tt("Last name")], button: tt("Check in"), msg: tt("Check-in opens the day before departure.") }, back("home", tt("Start"))] },
  conditions: { title: tt("Conditions"), blocks: [{ t: "h", text: tt("Booking conditions"), css: DECO }, { t: "p", text: tt("Changes and cancellations are governed by the conditions of the respective airline and hotel. Fees may apply."), size: 10.5, css: GREY_NOTE }, back("home", tt("Start"))] },
  travellers: { title: tt("Travellers"), blocks: [{ t: "h", text: tt("Manage travellers"), css: DECO }, { t: "list", items: [tt("Anna Berger"), tt("Jonas Berger")] }, back("home", tt("Start"))] },
});

/** TravelEase as the plan describes it: four strong colours without a system, similar tones for warnings, buttons and boxes, decorative headings, small grey notes, modern but hard-to-read sections, and links, buttons and status alike. */
export const travelEase = (): PlatformCfg => ({ name: "TravelEase", start: "home", color: "#1E2A3A", nav: [{ label: tt("Start"), go: "home" }, { label: tt("My trips"), go: "trips" }, { label: tt("Rebook"), go: "rebook" }, { label: tt("Offers"), go: "offers" }, { label: tt("Help"), go: "help" }], pages: tePages(), footer: productFooter("TravelEase GmbH") });

/* ------------------------------------------------------------------ HealthConnect, a health platform: three designs */

type Look = { brand: string; head?: Record<string, string | number>; central?: Record<string, string | number>; body?: Record<string, string | number>; navSize?: number };

function hcPages(l: Look): Record<string, PPage> {
  const h = (text: string): Blk => ({ t: "h", text, css: l.head });
  const p = (text: string, central = false): Blk => ({ t: "p", text, css: central ? l.central : l.body });
  const nav: Blk = { t: "links", small: true, size: l.navSize, items: [{ label: tt("Appointments"), go: "appointments" }, { label: tt("Messages"), go: "messages" }, { label: tt("Results"), go: "results" }, { label: tt("Find a doctor"), go: "doctors" }] };
  return {
    start: { title: tt("Start"), section: "start", blocks: [
      h(tt("Good morning")),
      { t: "note", title: tt("Your next appointment"), text: tt("Thursday, 10:30 · Dr Lehmann · Please bring your medication list."), go: { label: tt("Details"), go: "appointments" }, css: l.central },
      p(tt("New message from your practice: your test results are available."), true),
      nav,
      p(tt("HealthConnect brings your appointments, messages and results together in one place.")),
    ] },
    appointments: { title: tt("Appointments"), section: "start", blocks: [h(tt("Appointments")), { t: "table", head: [tt("When"), tt("Who")], rows: [[tt("Thursday, 10:30"), tt("Dr Lehmann")], [tt("In 4 weeks"), tt("Dr Okafor")]] }, p(tt("Please bring your medication list and your insurance card."), true), { t: "form", fields: [tt("Practice"), tt("Preferred day")], button: tt("Request an appointment"), msg: tt("Request sent. The practice will confirm.") }, back("start", tt("Start"))] },
    messages: { title: tt("Messages"), section: "start", blocks: [h(tt("Messages")), p(tt("Your test results are available. Please discuss them at your next appointment."), true), { t: "chat", intro: tt("Write to your practice."), label: tt("Your message"), reply: tt("Thank you. Your practice will answer within two working days.") }, back("start", tt("Start"))] },
    results: { title: tt("Results"), section: "start", blocks: [h(tt("Results")), p(tt("Blood test from last week: available. Your doctor will explain the values."), true), back("start", tt("Start"))] },
    doctors: { title: tt("Find a doctor"), section: "start", blocks: [h(tt("Find a doctor")), { t: "form", fields: [tt("Speciality"), tt("Town")], button: tt("Search"), msg: tt("Practices found near you: Dr Lehmann, Dr Okafor and two more.") }, back("start", tt("Start"))] },
  };
}

/** Variant A: strong brand colours and a high recognition value, but low contrast on central information. */
export const healthA = (): PlatformCfg => ({
  name: "HealthConnect",
  start: "start",
  color: "#10A99A",
  nav: [{ label: tt("Start"), go: "start" }, { label: tt("Appointments"), go: "appointments" }, { label: tt("Messages"), go: "messages" }],
  pages: hcPages({ brand: "#10A99A", head: { color: "#10A99A", fontSize: 19 }, central: { background: "#7FD1C7", color: "#E8FAF7", borderColor: "#7FD1C7" } }),
  footer: productFooter("HealthConnect"),
});

/** Variant B: very factual and high in contrast, highly readable, but little emotional appeal. */
export const healthB = (): PlatformCfg => ({
  name: "HealthConnect",
  start: "start",
  color: "#222222",
  nav: [{ label: tt("Start"), go: "start" }, { label: tt("Appointments"), go: "appointments" }, { label: tt("Messages"), go: "messages" }],
  pages: hcPages({ brand: "#222222", head: { color: "#111111", fontSize: 18 }, central: { color: "#111111", fontWeight: 600 }, body: { color: "#222222" } }),
  footer: productFooter("HealthConnect"),
});

/** Variant C: modern, elegant typography with a high-quality effect, but smaller type sizes and less visible navigation items. */
export const healthC = (): PlatformCfg => ({
  name: "HealthConnect",
  start: "start",
  color: "#3C3F46",
  nav: [{ label: tt("Start"), go: "start" }],
  pages: hcPages({ brand: "#3C3F46", head: { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontSize: 20, letterSpacing: "0.02em" }, central: { fontWeight: 300, fontSize: 12, color: "#5F6670" }, body: { fontWeight: 300, fontSize: 12, color: "#5F6670" }, navSize: 10 }),
  footer: productFooter("HealthConnect"),
});

/* ------------------------------------------------------------------ SecureLife, an insurer's portal */

const BLUES = ["#1565C0", "#1E88E5", "#0D47A1"];
const GREENS = ["#2E7D32", "#43A047"];
const REDS = ["#C62828", "#E53935"];

const slStart = (): PPage => ({
  title: tt("SecureLife"),
  blocks: [
    { t: "h", text: tt("Welcome to SecureLife"), css: { fontSize: 23 }, mark: 5 },
    { t: "links", grid: 3, mark: 1, items: [{ label: tt("My contracts"), go: "contracts", color: BLUES[0] }, { label: tt("Damage reports"), go: "reports", color: GREENS[0] }, { label: tt("Messages"), go: "messages", color: REDS[1] }, { label: tt("Documents"), go: "documents", color: BLUES[1] }, { label: tt("My details"), go: "details", color: GREENS[1] }, { label: tt("Contact"), go: "contact", color: BLUES[2] }] },
    { t: "note", mark: 2, title: tt("Information on your household insurance"), text: tt("Your annual statement is now available in Documents."), go: { label: tt("Open"), go: "documents" }, css: { background: BLUES[0], color: "#FFFFFF", borderColor: BLUES[0] } },
    { t: "sub", text: tt("The state of your damage reports") },
    { t: "meta", mark: 3, items: [tt("No. 2041"), tt("No. 2042"), tt("No. 2043")], colors: [GREENS[0], BLUES[1], REDS[0]] },
    { t: "p", mark: 4, text: tt("Please note that damage must be reported without undue delay. The documents required for the assessment of the claim must be submitted in full; incomplete reports may delay processing. You will be informed of the outcome of the assessment in writing or in your inbox. For questions about a report please use the message function."), size: 11, leading: 1.25 },
    { t: "p", text: tt("If you would like to report new damage, you can do so online at any time. Please have your policy number and photos of the damage ready."), size: 11, leading: 1.25 },
    { t: "links", small: true, mark: 6, items: [{ label: tt("Report new damage"), go: "report" }, { label: tt("Upload documents"), go: "upload" }] },
    { t: "p", text: tt("Your data is processed in accordance with the applicable data protection regulations."), size: 11, leading: 1.25 },
  ],
});

const slPages = (): Record<string, PPage> => ({
  start: slStart(),
  contracts: { title: tt("My contracts"), section: "contracts", blocks: [{ t: "h", text: tt("My contracts"), css: { fontSize: 13, fontWeight: 400 } }, { t: "table", head: [tt("Contract"), tt("Number"), tt("Details")], rows: [[tt("Household contents"), "SL-118-204", { label: tt("Open"), go: "contract1" }], [tt("Personal liability"), "SL-552-907", { label: tt("Open"), go: "contract1" }]] }, back("start", tt("Start"))] },
  contract1: { title: tt("Contract"), section: "contracts", blocks: [{ t: "sub", text: tt("Household contents insurance") }, { t: "p", text: tt("Sum insured and conditions according to your policy. Changes to the contract can be requested via the message function."), size: 11, leading: 1.25 }, { t: "note", title: tt("Change your contract"), text: tt("Send us a message with the change you would like."), go: { label: tt("Write a message"), go: "messages" }, css: { background: BLUES[0], color: "#FFFFFF", borderColor: BLUES[0] } }, back("contracts", tt("My contracts"))] },
  reports: { title: tt("Damage reports"), section: "reports", blocks: [{ t: "h", text: tt("Damage reports"), css: { fontSize: 17, color: GREENS[0] } }, { t: "table", head: [tt("Report"), tt("Date"), tt("Open")], rows: [["No. 2041", tt("March"), { label: tt("Open"), go: "r2041" }], ["No. 2042", tt("April"), { label: tt("Open"), go: "r2042" }], ["No. 2043", tt("May"), { label: tt("Open"), go: "r2043" }]] }, { t: "meta", items: [tt("No. 2041"), tt("No. 2042"), tt("No. 2043")], colors: [GREENS[0], BLUES[1], REDS[0]] }, { t: "links", small: true, items: [{ label: tt("Report new damage"), go: "report" }] }, back("start", tt("Start"))] },
  r2041: { title: "No. 2041", section: "reports", blocks: [{ t: "meta", items: [tt("No. 2041")], colors: [GREENS[0]] }, { t: "p", text: tt("Water damage in the kitchen. Assessment carried out."), size: 11, leading: 1.25 }, back("reports", tt("Damage reports"))] },
  r2042: { title: "No. 2042", section: "reports", blocks: [{ t: "meta", items: [tt("No. 2042")], colors: [BLUES[1]] }, { t: "p", text: tt("Broken window. The report is being processed."), size: 11, leading: 1.25 }, back("reports", tt("Damage reports"))] },
  r2043: { title: "No. 2043", section: "reports", blocks: [{ t: "meta", items: [tt("No. 2043")], colors: [REDS[0]] }, { t: "p", text: tt("Stolen bicycle. Documents are missing for the assessment: please upload the purchase receipt."), size: 11, leading: 1.25 }, { t: "links", small: true, items: [{ label: tt("Upload documents"), go: "upload" }] }, back("reports", tt("Damage reports"))] },
  report: { title: tt("New damage"), section: "reports", blocks: [{ t: "sub", text: tt("Report new damage") }, { t: "p", text: tt("Please describe the damage as completely as possible. Information that is missing may delay the assessment."), size: 11, leading: 1.25 }, { t: "form", fields: [tt("Policy number"), tt("Date of the damage"), tt("What happened")], button: tt("Submit the report"), msg: tt("Your report has been received.") }, back("start", tt("Start"))] },
  upload: { title: tt("Upload"), section: "reports", blocks: [{ t: "h", text: tt("Upload documents"), css: { fontSize: 21, color: REDS[0] } }, { t: "form", fields: [tt("Report number"), tt("File")], button: tt("Upload"), msg: tt("Document received.") }, back("start", tt("Start"))] },
  messages: { title: tt("Messages"), section: "messages", blocks: [{ t: "h", text: tt("Messages"), css: { fontSize: 15, color: REDS[1] } }, { t: "chat", intro: tt("Write to the service."), label: tt("Your message"), reply: tt("Thank you. Your message has been received.") }, back("start", tt("Start"))] },
  documents: { title: tt("Documents"), section: "documents", blocks: [{ t: "h", text: tt("Documents"), css: { fontSize: 19 } }, { t: "links", items: [{ label: tt("Annual statement (PDF)"), go: "downloaded", color: BLUES[1] }, { label: tt("Policy household contents (PDF)"), go: "downloaded", color: GREENS[1] }] }, back("start", tt("Start"))] },
  downloaded: { title: tt("Download"), blocks: [{ t: "p", text: tt("The document is being downloaded."), size: 11 }, back("documents", tt("Documents"))] },
  details: { title: tt("My details"), section: "details", blocks: [{ t: "sub", text: tt("My details") }, { t: "form", fields: [tt("Address"), tt("Phone"), tt("E-mail")], button: tt("Save"), msg: tt("Saved.") }, back("start", tt("Start"))] },
  contact: { title: tt("Contact"), section: "contact", blocks: [{ t: "h", text: tt("Contact"), css: { fontSize: 13, fontWeight: 400 } }, { t: "p", text: tt("Service: Mon to Fri, 8 to 18. Please have your policy number ready."), size: 11, leading: 1.25 }, back("start", tt("Start"))] },
});

/** SecureLife today: blues, greens and reds without a functional system, buttons like boxes, status by colour only, small dense text, inconsistent hierarchy, calls to action lost among text. */
export const secureLife = (): PlatformCfg => ({ name: "SecureLife", start: "start", color: "#0D47A1", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Contracts"), go: "contracts" }, { label: tt("Damage reports"), go: "reports" }, { label: tt("Messages"), go: "messages" }], header: () => tt("Customer portal"), pages: slPages(), footer: productFooter("SecureLife Versicherung AG") });

/* ------------------------------------------------------------------ The insurer's website and app (Route 2) */

/**
 * The brief of Route 2: a website, a customer portal and an app, colours changed by campaign, type set differently by each team, interaction elements without a
 * principle. Case assumption (marked “Clear” in the brief): marketing changes the accent colour per campaign and IT builds each channel from its own components.
 */
export const insurerWeb3 = (): PlatformCfg => ({
  name: "SecureLife Versicherung",
  start: "home",
  color: "#0D47A1",
  nav: [{ label: tt("Insurance"), go: "products" }, { label: tt("Service"), go: "service" }],
  pages: {
    home: { title: tt("Home"), blocks: [
      { t: "hero", kicker: tt("Summer campaign"), title: tt("Protected all summer long."), text: tt("Bicycle, travel and household insurance for the warm season."), button: { label: tt("Get a quote"), go: "quote" } },
      { t: "links", grid: 3, items: [{ label: tt("Insurance"), go: "products", color: "#F57C00" }, { label: tt("Report damage"), go: "service", color: "#F57C00" }, { label: tt("To the portal"), go: "portal", color: "#F57C00" }] },
    ] },
    products: { title: tt("Insurance"), section: "products", blocks: [{ t: "h", text: tt("Our insurance"), css: { fontFamily: "Georgia, serif", fontSize: 24 } }, { t: "cards", items: [{ title: tt("Household contents"), text: tt("For everything in your home.") }, { title: tt("Personal liability"), text: tt("When something happens to others.") }] }, back("home", tt("Home"))] },
    service: { title: tt("Service"), section: "service", blocks: [{ t: "h", text: tt("Service"), css: { fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em" } }, { t: "p", text: tt("Damage is reported in the customer portal SecureLife.") }, { t: "links", items: [{ label: tt("To the portal"), go: "portal", color: "#F57C00" }] }, back("home", tt("Home"))] },
    quote: { title: tt("Quote"), blocks: [{ t: "form", fields: [tt("Insurance"), tt("Postcode")], button: tt("Calculate"), msg: tt("Your quote will be sent by e-mail.") }, back("home", tt("Home"))] },
    portal: { title: tt("Portal"), blocks: [{ t: "p", text: tt("The customer portal opens in a new window. Please log in there.") }, back("home", tt("Home"))] },
  },
  footer: productFooter("SecureLife Versicherung AG"),
});

export const insurerApp3 = (): PlatformCfg => ({
  name: "SecureLife app",
  start: "home",
  color: "#6A1B9A",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Claims"), go: "claims" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "h", text: tt("Hi there!"), css: { fontSize: 26, fontWeight: 800 } }, { t: "links", items: [{ label: tt("Report a claim"), go: "claims", color: "#6A1B9A" }, { label: tt("My policies"), go: "policies", color: "#00897B" }] }] },
    claims: { title: tt("Claims"), section: "claims", blocks: [{ t: "h", text: tt("Claims"), css: { fontSize: 12, fontWeight: 400 } }, { t: "meta", items: [tt("2041"), tt("2042"), tt("2043")], colors: ["#00897B", "#6A1B9A", "#E53935"] }, { t: "links", small: true, items: [{ label: tt("New claim"), go: "newclaim" }] }] },
    newclaim: { title: tt("New claim"), section: "claims", blocks: [{ t: "form", fields: [tt("What happened")], button: tt("Next"), msg: tt("Photos can be added in the web portal only.") }, back("claims", tt("Claims"))] },
    policies: { title: tt("Policies"), section: "home", blocks: [{ t: "list", items: [tt("Household contents · SL-118-204"), tt("Personal liability · SL-552-907")] }, back("home", tt("Home"))] },
  },
});
