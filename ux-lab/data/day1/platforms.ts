import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { lessonKeys } from "@/components/sim/platformKit";
import { COURSE_NAME, courseAbout, courseHero, courseOutcomes, courseOutline, footerOf, richLessonPages, shellNav, shellPages } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): CarePath as the plan describes it, the three SkillFlow start pages of Block 1.2 on the same
 * learning platform, and SafeHome Online as it is today. Every tile, link and button opens a real page. The plan's clues are kept exactly (nine equally strong tiles,
 * a red warning without an acute problem, three button colours with no system, very small type, moving elements, data next to advertising; the dense, the sober and
 * the image-led start page; text blocks and legal notices, no emphasis, no progress, warning colours on neutral information, an off-putting upload, actions below
 * long texts) and nothing is added that changes the answer. The names and contents are made up; nothing is marked right or wrong, and no figure is printed that the
 * plan does not print.
 */

/** The footer of a product that is not a course (the course footer of courseKit names a teacher and reviews). */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);

/* ------------------------------------------------------------------ CarePath, a health app */

const RED = "#C62828";
const GREEN = "#2E7D32";
const BLUE = "#1565C0";
const ORANGE = "#E65100";

/** The nine tiles of the start page, all the same size and weight. */
const tiles = (): Item[] => [
  { label: tt("Appointments"), go: "appointments" },
  { label: tt("Medication"), go: "medication" },
  { label: tt("My doctors"), go: "doctors" },
  { label: tt("Messages"), go: "messages" },
  { label: tt("Lab results"), go: "labs" },
  { label: tt("Prescriptions"), go: "prescriptions" },
  { label: tt("Vaccinations"), go: "vaccinations" },
  { label: tt("Insurance card"), go: "card" },
  { label: tt("Health tips"), go: "tips" },
];

const backHome: Blk = { t: "links", small: true, items: [{ label: tt("Start page"), go: "home" }] };

const careHome = (): PPage => ({
  title: tt("CarePath"),
  blocks: [
    { t: "links", items: [{ label: tt("⚠ Important notice · please read now"), go: "notice", color: RED }], mark: 2 },
    { t: "links", small: true, items: [{ label: tt("New: video consultations"), go: "tips", pulse: true }, { label: tt("Tip of the day: drink water"), go: "tips", pulse: true }, { label: tt("Update your app"), go: "update", pulse: true }], mark: 5 },
    { t: "h", text: tt("Good morning, Ms Keller") },
    { t: "links", grid: 3, items: tiles(), mark: 1 },
    { t: "p", text: tt("Your next appointment: Tue 09:40, Dr Aydin, general practice. Bring your insurance card. Take Cardiolin in the morning, not on an empty stomach."), size: 10.5, mark: 4 },
    { t: "links", small: true, items: [{ label: tt("Book"), go: "appointments", color: GREEN }, { label: tt("Repeat prescription"), go: "prescriptions", color: BLUE }, { label: tt("Message my doctor"), go: "messages", color: ORANGE }], mark: 3 },
    { t: "cards", mark: 6, items: [
      { tag: tt("Your data"), title: tt("Blood pressure, last 7 days"), text: tt("Last measured yesterday evening. Open to see your values."), go: "labs" },
      { tag: tt("Ad"), title: tt("VitaPlus capsules, on offer this week"), text: tt("For more energy in everyday life. Order now."), go: "ad" },
      { tag: tt("Your data"), title: tt("Medication plan"), text: tt("Your medicines and the next intake."), go: "medication" },
      { tag: tt("Ad"), title: tt("Sleep better with DreamWell"), text: tt("The app that helps you sleep. Try it free."), go: "ad" },
    ] },
  ],
});

const carePages = (): Record<string, PPage> => ({
  home: careHome(),
  notice: { title: tt("Notice"), blocks: [{ t: "h", text: tt("Important notice") }, { t: "p", text: tt("We have updated our terms of use. Nothing changes for you. You do not need to do anything.") }, backHome] },
  update: { title: tt("Update"), blocks: [{ t: "h", text: tt("Update your app") }, { t: "p", text: tt("A new version of CarePath is available in your app store. Your data stays the same.") }, backHome] },
  appointments: {
    title: tt("Appointments"),
    blocks: [
      { t: "h", text: tt("Appointments") },
      { t: "table", head: [tt("When"), tt("Who"), tt("Where")], rows: [[tt("Tue 09:40"), tt("Dr Aydin"), tt("General practice")], [tt("Mon, in 3 weeks, 14:00"), tt("Dr Brandt"), tt("Cardiology")]] },
      { t: "form", fields: [tt("Doctor"), tt("Preferred day"), tt("Reason for the visit")], button: tt("Request an appointment"), msg: tt("Request sent. The practice confirms by message.") },
      backHome,
    ],
  },
  medication: {
    title: tt("Medication"),
    blocks: [
      { t: "h", text: tt("My medication") },
      { t: "table", head: [tt("Medicine"), tt("When")], rows: [[tt("Cardiolin"), tt("Morning")], [tt("Glucarin"), tt("Morning and evening, with food")], [tt("Vitamin D"), tt("Once a week")]] },
      { t: "p", text: tt("Important: Glucarin must be taken with a meal. Tell your doctor about it before any examination."), size: 10.5 },
      { t: "toggle", label: tt("Remind me before each intake"), on: tt("Reminders on"), off: tt("Reminders off") },
      backHome,
    ],
  },
  doctors: { title: tt("My doctors"), blocks: [{ t: "h", text: tt("My doctors") }, { t: "person", name: "Dr Selin Aydin", role: tt("General practice · Lindenstraße 4"), text: tt("Mon to Fri, 8 to 12 and 15 to 18.") }, { t: "person", name: "Dr Jonas Brandt", role: tt("Cardiology · City clinic"), text: tt("By appointment.") }, { t: "links", small: true, items: [{ label: tt("Message my doctor"), go: "messages", color: ORANGE }] }, backHome] },
  messages: { title: tt("Messages"), blocks: [{ t: "h", text: tt("Messages") }, { t: "p", text: tt("No new messages.") }, { t: "chat", intro: tt("Write to your practice. Answers usually come within two working days."), label: tt("Your message"), reply: tt("Thank you. Your practice has received your message.") }, backHome] },
  labs: { title: tt("Lab results"), blocks: [{ t: "h", text: tt("Lab results") }, { t: "table", head: [tt("Value"), tt("Result"), tt("Date")], rows: [[tt("Blood pressure"), tt("Result available"), tt("Yesterday")], [tt("Blood sugar, long-term"), tt("Result available"), tt("Last month")]] }, { t: "p", text: tt("Your doctor will discuss the results with you at your next appointment."), size: 10.5 }, backHome] },
  prescriptions: { title: tt("Prescriptions"), blocks: [{ t: "h", text: tt("Prescriptions") }, { t: "list", items: [tt("Cardiolin · running low"), tt("Glucarin · running low")] }, { t: "form", fields: [tt("Medicine")], button: tt("Request a repeat prescription"), msg: tt("Request sent to Dr Aydin.") }, backHome] },
  vaccinations: { title: tt("Vaccinations"), blocks: [{ t: "h", text: tt("Vaccinations") }, { t: "table", head: [tt("Vaccine"), tt("Last given")], rows: [[tt("Tetanus"), tt("6 years ago")], [tt("Influenza"), tt("Last autumn")]] }, backHome] },
  card: { title: tt("Insurance card"), blocks: [{ t: "h", text: tt("Insurance card") }, { t: "p", text: tt("Show this screen at the reception if you forgot your card.") }, { t: "meta", items: [tt("Insured: Petra Keller"), tt("Card valid")] }, backHome] },
  tips: { title: tt("Health tips"), blocks: [{ t: "h", text: tt("Health tips") }, { t: "cards", items: [{ tag: tt("Tip"), title: tt("Drink enough water"), text: tt("Drinking regularly through the day helps your circulation.") }, { tag: tt("Ad"), title: tt("VitaPlus capsules, on offer this week"), text: tt("For more energy in everyday life."), go: "ad" }, { tag: tt("New"), title: tt("Video consultations"), text: tt("Ask your practice whether it offers them.") }] }, backHome] },
  ad: { title: tt("Advertisement"), blocks: [{ t: "h", text: tt("VitaPlus capsules") }, { t: "p", text: tt("An advertisement from a partner of CarePath. Order now while the offer lasts.") }, { t: "form", fields: [tt("Quantity")], button: tt("Order"), msg: tt("Thank you for your order.") }, backHome] },
});

/** CarePath as the plan describes it: nine equally strong tiles, a red warning without an acute problem, three button colours with no system, very small type, moving elements and notices, and health data next to advertising. */
export const carePath = (): PlatformCfg => ({ name: "CarePath", start: "home", color: "#5B6B7A", nav: [{ label: tt("Start"), go: "home" }, { label: tt("Messages"), go: "messages" }], header: () => tt("Patient app"), pages: carePages(), footer: productFooter("CarePath Health GmbH") });

/* ------------------------------------------------------------------ SkillFlow, a learning platform: three start pages */

const LESSONS = 6;
const sfCourse = (): PPage => ({
  title: COURSE_NAME(),
  section: "course",
  blocks: [...courseHero({}, LESSONS), courseOutline(LESSONS, {}), ...courseOutcomes({}), ...courseAbout({})],
});
const sfBase = (): Record<string, PPage> => ({ course: sfCourse(), ...richLessonPages(LESSONS, { back: "course", section: "course" }), ...shellPages({}, "course") });

/** Variant A: modern, strongly animated, emotionally activating, but dense with information. */
export const skillFlowA = (): PlatformCfg => ({
  name: "SkillFlow",
  start: "start",
  color: "#6A1B9A",
  nav: [{ label: tt("Start"), go: "start" }, { label: tt("My course"), go: "course" }, ...shellNav()],
  header: (v) => tt(`🔥 ${Math.min(v.length, 9)}-day streak`),
  pages: {
    ...sfBase(),
    start: {
      title: tt("Start"),
      section: "start",
      blocks: [
        { t: "hero", kicker: tt("Your career, your pace"), title: tt("Level up today!"), text: tt("Join thousands of professionals who learn something new every day. Your next skill is one click away."), button: { label: tt("Keep my streak"), go: "lesson0" } },
        { t: "links", small: true, items: [{ label: tt("🔥 Daily challenge"), go: "lesson1", pulse: true }, { label: tt("⭐ 3 new badges"), go: "account", pulse: true }, { label: tt("🎉 Live webinar today"), go: "catalog", pulse: true }, { label: tt("🏆 Weekly ranking"), go: "account", pulse: true }] },
        { t: "meta", items: [tt("Your courses in progress"), tt("New courses this month"), tt("Certificates waiting"), tt("Friends online now")] },
        { t: "cards", items: [
          { tag: tt("Trending"), title: COURSE_NAME(), text: tt("The most popular course this week."), go: "course" },
          { tag: tt("New"), title: tt("Time management"), text: tt("Plan your week in ten minutes."), go: "catalog" },
          { tag: tt("For you"), title: tt("Leading meetings"), text: tt("Run a meeting that ends on time."), go: "catalog" },
          { tag: tt("Hot"), title: tt("Presenting with confidence"), text: tt("Speak in front of a group without notes."), go: "catalog" },
        ] },
        { t: "links", grid: 3, items: [{ label: tt("Continue"), go: "lesson0" }, { label: tt("Catalogue"), go: "catalog" }, { label: tt("Badges"), go: "account" }, { label: tt("Community"), go: "help" }, { label: tt("Events"), go: "catalog" }, { label: tt("Settings"), go: "account" }] },
      ],
    },
  },
  footer: footerOf("SkillFlow"),
});

/** Variant B: very sober and factual, clearly structured, but not very motivating. */
export const skillFlowB = (): PlatformCfg => ({
  name: "SkillFlow",
  start: "start",
  color: "#455A64",
  nav: [{ label: tt("Start"), go: "start" }, { label: tt("My course"), go: "course" }, ...shellNav()],
  pages: {
    ...sfBase(),
    start: {
      title: tt("Start"),
      section: "start",
      blocks: [
        { t: "h", text: tt("Start") },
        { t: "p", text: tt(`Your course: ${COURSE_NAME()}. You opened lesson 1 of ${LESSONS}.`) },
        { t: "links", items: [{ label: tt("Continue with lesson 2"), go: "lesson1" }, { label: tt("Open the course page"), go: "course" }, { label: tt("Find another course"), go: "catalog" }, { label: tt("Help"), go: "help" }] },
        { t: "progress", label: tt("Lessons visited"), of: lessonKeys(LESSONS) },
      ],
    },
  },
  footer: footerOf("SkillFlow"),
});

/** Variant C: visually high quality, strong imagery, a reduced navigation, but less transparent about the next steps. */
export const skillFlowC = (): PlatformCfg => ({
  name: "SkillFlow",
  start: "start",
  color: "#1A237E",
  nav: [{ label: tt("Discover"), go: "start" }, { label: tt("Me"), go: "account" }],
  pages: {
    ...sfBase(),
    start: {
      title: tt("Discover"),
      section: "start",
      blocks: [
        { t: "hero", kicker: tt("SkillFlow"), title: tt("Grow into who you want to be."), text: tt("Beautiful courses, made by people who love what they teach."), button: { label: tt("Discover"), go: "gallery" } },
        { t: "cards", items: [
          { title: tt("The art of negotiating"), text: tt("A story in six chapters."), go: "course" },
          { title: tt("Calm in the storm"), text: tt("Leadership when it matters."), go: "catalog" },
          { title: tt("The quiet presenter"), text: tt("Find your voice."), go: "catalog" },
        ] },
      ],
    },
    gallery: { title: tt("Discover"), section: "start", blocks: [{ t: "hero", title: tt("Explore the collection"), text: tt("Swipe through our featured stories."), button: { label: tt("Explore"), go: "catalog" } }, { t: "cards", items: [{ title: tt("The art of negotiating"), text: tt("Six chapters."), go: "course" }, { title: tt("Calm in the storm"), text: tt("Five chapters."), go: "catalog" }] }, { t: "links", small: true, items: [{ label: tt("Help"), go: "help" }] }] },
  },
  footer: footerOf("SkillFlow"),
});

/* ------------------------------------------------------------------ SafeHome Online, an insurer's self-service portal */

const LEGAL = () =>
  tt(
    "Notice pursuant to the general insurance conditions: The policyholder is obliged to notify the insurer of any loss without undue delay and to provide all information required for the assessment of the claim. Breaches of these obligations may result in the partial or complete loss of insurance cover. The processing of personal data takes place on the basis of the applicable data protection provisions; further information is available in the data protection notice.",
  );
const RED_NEUTRAL = "#B71C1C";

const shStart = (): PPage => ({
  title: tt("SafeHome Online"),
  blocks: [
    { t: "h", text: tt("Welcome to SafeHome Online"), mark: 1 },
    { t: "p", text: LEGAL(), size: 12, mark: 1 },
    { t: "links", items: [{ label: tt("⚠ Notice on data processing"), go: "privacy", color: RED_NEUTRAL }, { label: tt("⚠ Our opening hours have changed"), go: "contact", color: RED_NEUTRAL }], mark: 4 },
    { t: "p", text: tt("Please note that claims must be reported in full. Incomplete reports cannot be processed. Supporting documents must be submitted in the formats specified. The insurer reserves the right to request further documents. Information on deadlines can be found in your policy documents and in the general insurance conditions."), size: 12 },
    { t: "p", text: tt("Information on the processing of claims: Claims are processed in the order in which they are received. The processing time depends on the completeness of the documents submitted and on any assessments that may be required."), size: 12 },
    { t: "links", small: true, items: [{ label: tt("Report damage"), go: "claim1" }, { label: tt("My contracts"), go: "contracts" }, { label: tt("Documents"), go: "documents" }, { label: tt("Contact"), go: "contact" }, { label: tt("Privacy"), go: "privacy" }, { label: tt("Imprint"), go: "privacy" }], mark: 2 },
  ],
});

const shPages = (): Record<string, PPage> => ({
  start: shStart(),
  claim1: {
    title: tt("Damage report"),
    blocks: [
      { t: "h", text: tt("Damage report"), mark: 3 },
      { t: "p", text: tt("By submitting this form the policyholder confirms that all information is complete and correct. Incorrect information may lead to the loss of cover."), size: 12 },
      { t: "form", fields: [tt("Policy number"), tt("Date of the loss"), tt("Type of loss")], button: tt("Continue"), msg: tt("Saved. Continue with the description below.") },
      { t: "links", small: true, items: [{ label: tt("Continue to the description"), go: "claim2" }, { label: tt("Cancel"), go: "start" }] },
    ],
  },
  claim2: {
    title: tt("Damage report"),
    blocks: [
      { t: "h", text: tt("Damage report") },
      { t: "p", text: tt("Describe the course of events in detail. Information that is not provided cannot be taken into account in the assessment of the claim."), size: 12 },
      { t: "form", fields: [tt("What happened"), tt("Where it happened"), tt("Estimated amount of the damage")], button: tt("Save"), msg: tt("Saved.") },
      { t: "links", small: true, items: [{ label: tt("Continue to the documents"), go: "claim3" }, { label: tt("Back"), go: "claim1" }] },
    ],
  },
  claim3: {
    title: tt("Damage report"),
    blocks: [
      { t: "h", text: tt("Upload of supporting documents"), mark: 5 },
      { t: "p", text: tt("Failure to submit the required supporting documents in full may result in the rejection of the claim. Documents must be submitted in PDF or JPG format. The insurer accepts no liability for documents that cannot be read."), size: 12 },
      { t: "links", items: [{ label: tt("⚠ Notice on file formats"), go: "formats", color: RED_NEUTRAL }] },
      { t: "form", fields: [tt("File 1"), tt("File 2")], button: tt("Upload"), msg: tt("Upload received.") },
      { t: "p", text: tt("Information pursuant to the data protection provisions: Uploaded documents are stored for the duration of the processing of the claim and for the statutory retention periods thereafter."), size: 12 },
      { t: "links", small: true, items: [{ label: tt("Submit the damage report"), go: "claimDone" }, { label: tt("Back"), go: "claim2" }] },
    ],
  },
  claimDone: { title: tt("Damage report"), blocks: [{ t: "h", text: tt("Damage report submitted") }, { t: "p", text: tt("Your report has been received. Processing will take place in the order of receipt."), size: 12 }, { t: "links", small: true, items: [{ label: tt("Back to the start"), go: "start" }] }] },
  formats: { title: tt("File formats"), blocks: [{ t: "h", text: tt("Notice on file formats") }, { t: "p", text: tt("PDF and JPG files are accepted."), size: 12 }, { t: "links", small: true, items: [{ label: tt("Back to the upload"), go: "claim3" }] }] },
  contracts: { title: tt("My contracts"), blocks: [{ t: "h", text: tt("My contracts") }, { t: "p", text: LEGAL(), size: 12 }, { t: "table", head: [tt("Contract"), tt("Number"), tt("Status")], rows: [[tt("Household contents"), "HR-204-118", tt("Active")], [tt("Personal liability"), "PL-551-907", tt("Active")]] }, { t: "links", small: true, items: [{ label: tt("Back to the start"), go: "start" }] }] },
  documents: { title: tt("Documents"), blocks: [{ t: "h", text: tt("Documents") }, { t: "p", text: tt("Documents are provided for download. Please check them for completeness."), size: 12 }, { t: "links", items: [{ label: tt("Policy household contents (PDF)"), go: "downloaded" }, { label: tt("General insurance conditions (PDF)"), go: "downloaded" }, { label: tt("Annual statement (PDF)"), go: "downloaded" }] }, { t: "links", small: true, items: [{ label: tt("Back to the start"), go: "start" }] }] },
  downloaded: { title: tt("Download"), blocks: [{ t: "p", text: tt("The document is being downloaded."), size: 12 }, { t: "links", small: true, items: [{ label: tt("Back to the documents"), go: "documents" }] }] },
  contact: { title: tt("Contact"), blocks: [{ t: "h", text: tt("Contact") }, { t: "p", text: tt("Service centre: Mon to Fri, 8 to 18. Please have your policy number ready."), size: 12 }, { t: "form", fields: [tt("Policy number"), tt("Your question")], button: tt("Send"), msg: tt("Your request has been received.") }, { t: "links", small: true, items: [{ label: tt("Back to the start"), go: "start" }] }] },
  privacy: { title: tt("Privacy"), blocks: [{ t: "h", text: tt("Data protection notice") }, { t: "p", text: tt("Personal data is processed for the purpose of the performance of the insurance contract. Further information on your rights can be requested from the data protection officer."), size: 12 }, { t: "links", small: true, items: [{ label: tt("Back to the start"), go: "start" }] }] },
});

/** SafeHome Online today: text blocks and legal notices on the entry page, primary actions not emphasised, no visible progress, warning colours on neutral information, an off-putting upload, actions below long texts. */
export const safeHome = (): PlatformCfg => ({ name: "SafeHome Online", start: "start", color: "#37474F", nav: [{ label: tt("Start"), go: "start" }, { label: tt("Contracts"), go: "contracts" }, { label: tt("Documents"), go: "documents" }, { label: tt("Contact"), go: "contact" }], header: () => tt("Customer portal"), pages: shPages(), footer: productFooter("SafeHome Versicherung AG") });

/* ------------------------------------------------------------------ The insurer's other touchpoints (Route 2): website, app and chatbot */

/**
 * The brief of Route 2: a website, the customer portal, an app and a chatbot, and users are lost between them. Case assumption (marked “Clear” in the brief): each
 * channel was built by a different team, so each one names and orders the same thing in its own way. Nothing else is added; no channel is shown as the better one.
 */
const backTo = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const insurerWebsite = (): PlatformCfg => ({
  name: "SafeHome Versicherung",
  start: "home",
  color: "#00695C",
  nav: [{ label: tt("Insurance"), go: "products" }, { label: tt("Service"), go: "service" }, { label: tt("About us"), go: "about" }],
  pages: {
    home: { title: tt("Home"), blocks: [
      { t: "hero", kicker: tt("SafeHome Versicherung"), title: tt("Protection for your home, made simple."), text: tt("Household contents, liability and buildings insurance from one provider."), button: { label: tt("Find your insurance"), go: "products" } },
      { t: "links", grid: 3, items: [{ label: tt("Notify us of a loss"), go: "service" }, { label: tt("Log in to the customer area"), go: "login" }, { label: tt("Download the app"), go: "appinfo" }] },
    ] },
    products: { title: tt("Insurance"), section: "products", blocks: [{ t: "h", text: tt("Our insurance") }, { t: "cards", items: [{ title: tt("Household contents"), text: tt("For everything in your home.") }, { title: tt("Personal liability"), text: tt("When something happens to others.") }, { title: tt("Buildings"), text: tt("For the house itself.") }] }, backTo("home", tt("Home"))] },
    service: { title: tt("Service"), section: "service", blocks: [{ t: "h", text: tt("Notify us of a loss") }, { t: "p", text: tt("Losses are reported in the customer area or by phone.") }, { t: "links", items: [{ label: tt("To the customer area"), go: "login" }, { label: tt("Call us"), go: "phone" }] }, backTo("home", tt("Home"))] },
    login: { title: tt("Customer area"), blocks: [{ t: "h", text: tt("Customer area") }, { t: "p", text: tt("The customer area opens in a new window: SafeHome Online. Please log in again there.") }, { t: "form", fields: [tt("Customer number"), tt("Password")], button: tt("Log in"), msg: tt("You are being forwarded to SafeHome Online.") }, backTo("home", tt("Home"))] },
    phone: { title: tt("Phone"), blocks: [{ t: "h", text: tt("Service centre") }, { t: "p", text: tt("Mon to Fri, 8 to 18. Please have your policy number ready.") }, backTo("service", tt("Back"))] },
    appinfo: { title: tt("App"), blocks: [{ t: "h", text: tt("The SafeHome app") }, { t: "p", text: tt("Available in the app stores. Log in with your app PIN.") }, backTo("home", tt("Home"))] },
    about: { title: tt("About us"), section: "about", blocks: [{ t: "h", text: tt("About us") }, { t: "p", text: tt("A mid-sized insurer for private households.") }, backTo("home", tt("Home"))] },
  },
  footer: productFooter("SafeHome Versicherung AG"),
});

export const insurerApp = (): PlatformCfg => ({
  name: "SafeHome app",
  start: "home",
  color: "#283593",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Policies"), go: "policies" }, { label: tt("Me"), go: "me" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [{ t: "h", text: tt("Hello") }, { t: "links", items: [{ label: tt("Report an incident"), go: "incident" }, { label: tt("My policies"), go: "policies" }, { label: tt("Chat with us"), go: "chatinfo" }] }] },
    incident: { title: tt("Incident"), section: "home", blocks: [{ t: "h", text: tt("Report an incident") }, { t: "form", fields: [tt("What happened"), tt("When")], button: tt("Next"), msg: tt("Photos and documents can only be added in SafeHome Online on the web.") }, backTo("home", tt("Home"))] },
    policies: { title: tt("Policies"), section: "policies", blocks: [{ t: "h", text: tt("My policies") }, { t: "list", items: [tt("Household contents · HR-204-118"), tt("Personal liability · PL-551-907")] }] },
    chatinfo: { title: tt("Chat"), section: "home", blocks: [{ t: "p", text: tt("The chat is available on our website.") }, backTo("home", tt("Home"))] },
    me: { title: tt("Me"), section: "me", blocks: [{ t: "h", text: tt("My details") }, { t: "toggle", label: tt("Notifications"), on: tt("On"), off: tt("Off") }] },
  },
});

export const insurerChatbot = (): PlatformCfg => ({
  name: "SafeHome assistant",
  start: "chat",
  color: "#4E342E",
  pages: {
    chat: { title: tt("Assistant"), blocks: [
      { t: "p", text: tt("Hello, I am the SafeHome assistant. What can I do for you?") },
      { t: "links", items: [{ label: tt("Submit a claim"), go: "claim" }, { label: tt("Change my address"), go: "address" }, { label: tt("Speak to a person"), go: "person" }] },
      { t: "chat", intro: tt("Or type your question."), label: tt("Your question"), reply: tt("I did not understand that. Please choose one of the topics above.") },
    ] },
    claim: { title: tt("Claim"), blocks: [{ t: "p", text: tt("To submit a claim, please use the damage report in SafeHome Online. You will need your policy number.") }, backTo("chat", tt("Back to the topics"))] },
    address: { title: tt("Address"), blocks: [{ t: "p", text: tt("You can change your address in the app under “Me”.") }, backTo("chat", tt("Back to the topics"))] },
    person: { title: tt("Person"), blocks: [{ t: "p", text: tt("Our service centre is available Mon to Fri, 8 to 18.") }, backTo("chat", tt("Back to the topics"))] },
  },
});
