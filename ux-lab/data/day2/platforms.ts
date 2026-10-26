import type { Blk, Item, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { COURSE_NAME, courseAbout, courseHero, courseOutcomes, courseOutline, footerOf, richLessonPages, shellNav, shellPages } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the working simulations (DL-STANDARD v1.8, CLAUDE.md #60): CityDesk as the plan describes it, the three EduFlex start pages of Block 1.2 on the same
 * platform, CampusNow as it is today on the desktop and on a phone, and the organisation's other touchpoints. Every menu item, tile, link and button opens a real page.
 * The plan's clues are kept exactly (12 menu items of similar weight, the main services not emphasised, very dense text, competing boxes, colours and lines, an
 * inconspicuous search, forms only after long scrolling; much content and little calm, a clear structure with more clicks, image-led with the functions in the
 * background; an overloaded start page, navigation named after the organisation, functions not prioritised, a different structure per page type, long text blocks,
 * searching instead of guidance) and nothing is added that changes the answer. The names and contents are made up; nothing is marked right or wrong, and no figure is
 * printed that the plan does not print.
 */

/** The footer of a product that is not a course (the course footer of courseKit names a teacher and reviews). */
const productFooter = (company: string) => tt(`© ${company} · Imprint · Privacy · Terms of use · Simulation: the names and the contents are made up`);
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

/* ------------------------------------------------------------------ CityDesk, a booking portal for municipal services */

const DENSE = () =>
  tt(
    "The citizens' services of the city administration are available to residents and businesses within the framework of the applicable statutes. Appointments for registration matters, identity documents, residence matters and certificates can be arranged online, by telephone or in person, whereby the online arrangement of appointments is recommended in order to reduce waiting times. Please note that for certain services the documents required must be presented in the original and that fees are payable at the time of the appointment. Changes to the opening hours are announced in good time.",
  );
const DENSE2 = () =>
  tt(
    "Information on parking permits for residents: Residents' parking permits are issued for the parking zone in which the main residence is registered. The application must be accompanied by proof of the registration of the vehicle in the name of the applicant or a declaration of use by the vehicle owner. Permits are valid for a period of up to two years. Applications for renewal should be submitted no earlier than four weeks before expiry.",
  );

const CD_MENU = (): Item[] => [
  { label: tt("Citizens' office"), go: "office" },
  { label: tt("Vehicles and parking"), go: "parking" },
  { label: tt("Building and housing"), go: "building" },
  { label: tt("Family and social"), go: "family" },
  { label: tt("Waste and recycling"), go: "waste" },
  { label: tt("Business and trade"), go: "business" },
  { label: tt("Culture and leisure"), go: "culture" },
  { label: tt("Schools and childcare"), go: "schools" },
  { label: tt("Environment"), go: "environment" },
  { label: tt("Politics and council"), go: "council" },
  { label: tt("Jobs at the city"), go: "jobs" },
  { label: tt("Press and news"), go: "press" },
];

const cdHome = (): PPage => ({
  title: tt("CityDesk"),
  blocks: [
    { t: "links", grid: 3, items: CD_MENU(), mark: 1 },
    { t: "cards", mark: 4, items: [
      { tag: tt("News"), title: tt("The council meets on Thursday"), text: tt("The agenda is published in the council information system."), go: "council" },
      { tag: tt("Notice"), title: tt("Roadworks on Market Street"), text: tt("Diversions apply until further notice."), go: "press" },
      { tag: tt("Culture"), title: tt("Summer concerts in the park"), text: tt("Every Sunday from June."), go: "culture" },
      { tag: tt("Service"), title: tt("Appointments and forms"), text: tt("Services of the citizens' office."), go: "office" },
    ] },
    { t: "h", text: tt("Welcome to the online services of the city") },
    { t: "p", text: DENSE(), size: 11, leading: 1.25, mark: 3 },
    { t: "p", text: DENSE2(), size: 11, leading: 1.25 },
    { t: "links", small: true, items: [{ label: tt("search"), go: "search" }], size: 10, mark: 5 },
    { t: "p", text: tt("Waste collection: the collection calendar for the coming year is available in the section Waste and recycling. Bulky waste can be registered online. Glass containers may only be used on working days between 7 and 20 o'clock."), size: 11, leading: 1.25 },
    { t: "p", text: tt("Data protection: personal data that you transmit in the context of an online service is processed exclusively for the purpose of the respective procedure in accordance with the applicable data protection regulations."), size: 11, leading: 1.25 },
    { t: "h", text: tt("Forms"), mark: 6 },
    { t: "links", small: true, items: [{ label: tt("Book an appointment at the citizens' office"), go: "book" }, { label: tt("Apply for a residents' parking permit"), go: "permit" }, { label: tt("Register a change of address"), go: "address" }, { label: tt("Register bulky waste"), go: "waste" }], mark: 2 },
  ],
});

const topic = (title: string, text: string, links: Item[] = []): PPage => ({ title, blocks: [{ t: "h", text: title }, { t: "p", text, size: 11, leading: 1.25 }, ...(links.length ? [{ t: "links", small: true, items: links } as Blk] : []), back("home", tt("Start page"))] });

const cdPages = (): Record<string, PPage> => ({
  home: cdHome(),
  office: topic(tt("Citizens' office"), DENSE(), [{ label: tt("Book an appointment"), go: "book" }, { label: tt("Register a change of address"), go: "address" }]),
  parking: topic(tt("Vehicles and parking"), DENSE2(), [{ label: tt("Apply for a residents' parking permit"), go: "permit" }]),
  building: topic(tt("Building and housing"), tt("Building permits, housing benefit and the land register are dealt with by the building department. Applications can be submitted in writing.")),
  family: topic(tt("Family and social"), tt("Child benefit, parental allowance and social services: the responsible offices and their consultation hours.")),
  waste: topic(tt("Waste and recycling"), tt("The collection calendar, the recycling centres and the registration of bulky waste."), [{ label: tt("Register bulky waste"), go: "bulky" }]),
  bulky: { title: tt("Bulky waste"), blocks: [{ t: "h", text: tt("Register bulky waste") }, { t: "form", fields: [tt("Address"), tt("Items"), tt("Preferred week")], button: tt("Register"), msg: tt("Registration received. You will receive a collection date by letter.") }, back("waste", tt("Back"))] },
  business: topic(tt("Business and trade"), tt("Trade registration, permits for markets and events, and the business development office.")),
  culture: topic(tt("Culture and leisure"), tt("Museums, the library, the summer concerts and the swimming pools of the city.")),
  schools: topic(tt("Schools and childcare"), tt("School enrolment, childcare places and school transport.")),
  environment: topic(tt("Environment"), tt("Tree protection, noise and air quality, and the climate plan of the city.")),
  council: topic(tt("Politics and council"), tt("The council, its committees, the agendas and the minutes.")),
  jobs: topic(tt("Jobs at the city"), tt("Current vacancies and apprenticeships at the city administration.")),
  press: topic(tt("Press and news"), tt("Press releases and notices of the city administration.")),
  search: { title: tt("Search"), blocks: [{ t: "h", text: tt("Search") }, { t: "form", fields: [tt("Search term")], button: tt("Search"), msg: tt("3 results: Book an appointment · Citizens' office · Change of address") }, { t: "links", small: true, items: [{ label: tt("Book an appointment"), go: "book" }, { label: tt("Citizens' office"), go: "office" }, { label: tt("Register a change of address"), go: "address" }] }, back("home", tt("Start page"))] },
  book: { title: tt("Appointment"), blocks: [{ t: "h", text: tt("Book an appointment at the citizens' office") }, { t: "form", fields: [tt("Service (e.g. identity card)"), tt("Preferred day"), tt("Name"), tt("E-mail")], button: tt("Book the appointment"), msg: tt("Your appointment request has been received. You will receive a confirmation by e-mail.") }, back("home", tt("Start page"))] },
  permit: { title: tt("Parking permit"), blocks: [{ t: "h", text: tt("Apply for a residents' parking permit") }, { t: "form", fields: [tt("Registration number"), tt("Address"), tt("Name")], button: tt("Apply"), msg: tt("Application received.") }, back("home", tt("Start page"))] },
  address: { title: tt("Change of address"), blocks: [{ t: "h", text: tt("Register a change of address") }, { t: "form", fields: [tt("Old address"), tt("New address"), tt("Moving date")], button: tt("Register"), msg: tt("Change of address received. Please bring your identity card to your next appointment.") }, back("home", tt("Start page"))] },
});

/** CityDesk as the plan describes it: 12 menu items of similar weight, the main services not emphasised, very dense text, competing boxes, an inconspicuous search, forms only after long scrolling. */
export const cityDesk = (): PlatformCfg => ({ name: "CityDesk", start: "home", color: "#6D4C41", nav: [{ label: tt("Start"), go: "home" }, { label: tt("Contact"), go: "office" }], header: () => tt("City online services"), pages: cdPages(), footer: productFooter("City administration") });

/* ------------------------------------------------------------------ EduFlex, a further-education platform: three start pages */

const LESSONS = 5;
const efCourse = (): PPage => ({ title: COURSE_NAME(), section: "course", blocks: [...courseHero({}, LESSONS), courseOutline(LESSONS, {}), ...courseOutcomes({}), ...courseAbout({})] });
const efBase = (): Record<string, PPage> => ({ course: efCourse(), ...richLessonPages(LESSONS, { back: "course", section: "course" }), ...shellPages({}, "course") });

/** Variant A: much content directly visible and a high volume of information, but little visual calm. */
export const eduFlexA = (): PlatformCfg => ({
  name: "EduFlex",
  start: "start",
  color: "#AD1457",
  nav: [{ label: tt("Start"), go: "start" }, { label: tt("My course"), go: "course" }, ...shellNav()],
  pages: {
    ...efBase(),
    start: {
      title: tt("Start"),
      section: "start",
      blocks: [
        { t: "links", small: true, items: [{ label: tt("New: 40 courses this month"), go: "catalog" }, { label: tt("Webinar today at 12"), go: "catalog" }, { label: tt("Your certificates"), go: "account" }, { label: tt("Community"), go: "help" }] },
        { t: "hero", kicker: tt("Learn more, every day"), title: tt("Your further education in one place"), text: tt("Courses, webinars, certificates and a community of learners. Everything you need, right here."), button: { label: tt("Continue my course"), go: "lesson0" } },
        { t: "cards", items: [
          { tag: tt("In progress"), title: COURSE_NAME(), text: tt("Lesson 1 of 5 opened."), go: "course" },
          { tag: tt("New"), title: tt("Time management"), text: tt("Plan your week in ten minutes."), go: "catalog" },
          { tag: tt("Popular"), title: tt("Leading meetings"), text: tt("Run a meeting that ends on time."), go: "catalog" },
          { tag: tt("Recommended"), title: tt("Presenting with confidence"), text: tt("Speak in front of a group."), go: "catalog" },
        ] },
        { t: "meta", items: [tt("Courses in progress"), tt("Certificates"), tt("Webinars this week"), tt("Learners online")] },
        { t: "list", items: [tt("Tip: set a weekly learning goal"), tt("Your team lead approves new courses"), tt("Download the app for learning on the go"), tt("New categories: leadership, digital, communication")] },
        { t: "links", grid: 3, items: [{ label: tt("Catalogue"), go: "catalog" }, { label: tt("Webinars"), go: "catalog" }, { label: tt("Certificates"), go: "account" }, { label: tt("Community"), go: "help" }, { label: tt("Help"), go: "help" }, { label: tt("Settings"), go: "account" }] },
        { t: "p", text: tt("EduFlex brings together courses from many providers. Courses can be booked individually or as part of a learning path. Certificates are issued after a course is completed and can be downloaded from your account.") },
      ],
    },
  },
  footer: footerOf("EduFlex"),
});

/** Variant B: a clear structure and less information, but more clicks to the goal. */
export const eduFlexB = (): PlatformCfg => ({
  name: "EduFlex",
  start: "start",
  color: "#37474F",
  nav: [{ label: tt("Start"), go: "start" }, ...shellNav()],
  pages: {
    ...efBase(),
    start: { title: tt("Start"), section: "start", blocks: [{ t: "h", text: tt("What would you like to do?") }, { t: "links", items: [{ label: tt("Continue learning"), go: "mine" }, { label: tt("Find a course"), go: "find" }, { label: tt("My certificates"), go: "account" }] }] },
    mine: { title: tt("Continue learning"), section: "start", blocks: [{ t: "h", text: tt("Continue learning") }, { t: "p", text: tt("Choose the course you want to continue.") }, { t: "links", items: [{ label: COURSE_NAME(), go: "course" }] }, back("start", tt("Back"))] },
    find: { title: tt("Find a course"), section: "start", blocks: [{ t: "h", text: tt("Find a course") }, { t: "p", text: tt("Choose an area.") }, { t: "links", items: [{ label: tt("Communication"), go: "catalog" }, { label: tt("Leadership"), go: "catalog" }, { label: tt("Self-management"), go: "catalog" }] }, back("start", tt("Back"))] },
  },
  footer: footerOf("EduFlex"),
});

/** Variant C: strongly image-led and modern, but the central functions recede into the background. */
export const eduFlexC = (): PlatformCfg => ({
  name: "EduFlex",
  start: "start",
  color: "#263238",
  nav: [{ label: tt("Discover"), go: "start" }],
  pages: {
    ...efBase(),
    start: {
      title: tt("Discover"),
      section: "start",
      blocks: [
        { t: "hero", kicker: tt("EduFlex"), title: tt("Become who you want to be."), text: tt("Learning that inspires. Stories of growth, made by people who care."), button: { label: tt("Get inspired"), go: "stories" } },
        { t: "cards", items: [{ title: tt("Lead with calm"), text: tt("A story of change."), go: "catalog" }, { title: tt("Find your voice"), text: tt("A story of courage."), go: "catalog" }] },
        { t: "links", small: true, items: [{ label: tt("my courses"), go: "course" }, { label: tt("search"), go: "catalog" }, { label: tt("account"), go: "account" }, { label: tt("help"), go: "help" }], size: 10 },
      ],
    },
    stories: { title: tt("Stories"), section: "start", blocks: [{ t: "hero", title: tt("Stories of growth"), text: tt("Swipe through people who changed their careers."), button: { label: tt("Explore"), go: "catalog" } }, back("start", tt("Back"))] },
  },
  footer: footerOf("EduFlex"),
});

/* ------------------------------------------------------------------ CampusNow, the portal of an education organisation */

const LONG = () =>
  tt(
    "The Department of Continuing Education offers a broad range of courses for professional and personal development. Courses are organised by the respective specialist units in cooperation with the Central Course Office. Registration is binding and takes place via the course booking system; the general terms and conditions of participation apply. Participants receive a confirmation of registration by e-mail. Certificates are issued by the Examinations Office after successful completion and can be requested via the Certificate Service. Learning materials are provided via the Learning Platform of the Media Centre. Dates for courses, examinations and information events are published in the Event Calendar of the Communications Unit.",
  );

const CN_NAV = () => [
  { label: tt("Dept. III · Continuing Education"), go: "dept3" },
  { label: tt("Central Course Office"), go: "courseoffice" },
  { label: tt("Examinations Office"), go: "exams" },
  { label: tt("Media Centre"), go: "media" },
  { label: tt("Communications Unit"), go: "comms" },
];

const cnStart = (): PPage => ({
  title: tt("CampusNow"),
  section: "start",
  blocks: [
    { t: "h", text: tt("Welcome to CampusNow"), mark: 1 },
    { t: "p", text: LONG(), mark: 5 },
    { t: "cards", mark: 1, items: [
      { tag: tt("News"), title: tt("New guidelines for examinations"), text: tt("The examination regulations have been amended."), go: "exams" },
      { tag: tt("Media Centre"), title: tt("Maintenance of the learning platform"), text: tt("The platform will be unavailable on Saturday."), go: "media" },
      { tag: tt("Events"), title: tt("Information evening"), text: tt("Presentation of the new course programme."), go: "comms" },
      { tag: tt("Dept. III"), title: tt("Annual report published"), text: tt("The annual report of the department is now available."), go: "dept3" },
      { tag: tt("Course Office"), title: tt("Changes to the terms of participation"), text: tt("Please note the updated terms."), go: "courseoffice" },
      { tag: tt("Service"), title: tt("Certificate Service"), text: tt("Requests for certificates and confirmations."), go: "certs" },
    ] },
    { t: "links", small: true, mark: 3, items: [{ label: tt("Course booking system"), go: "booking" }, { label: tt("Certificate Service"), go: "certs" }, { label: tt("Event Calendar"), go: "calendar" }, { label: tt("Learning Platform"), go: "materials" }, { label: tt("Search"), go: "search" }] },
    { t: "p", text: tt("Please note that changes to bookings can only be made in writing up to 14 days before the start of the course. In the event of later cancellation, the terms and conditions of participation apply. For questions about examinations, please contact the Examinations Office during its opening hours."), mark: 6 },
  ],
});

const cnPages = (): Record<string, PPage> => ({
  start: cnStart(),
  dept3: { title: tt("Dept. III · Continuing Education"), section: "dept3", blocks: [{ t: "h", text: tt("Department III · Continuing Education") }, { t: "p", text: LONG() }, { t: "p", text: tt("The department is divided into the specialist units Languages, Professional Skills, Health and Digital Competences. Each unit is responsible for the planning and quality of its courses.") }, back("start", tt("Start page"))] },
  courseoffice: { title: tt("Central Course Office"), section: "courseoffice", blocks: [{ t: "h", text: tt("Central Course Office") }, { t: "p", text: tt("The Central Course Office is responsible for the administration of course bookings, waiting lists and the terms and conditions of participation. Bookings are made exclusively via the course booking system.") }, { t: "links", small: true, items: [{ label: tt("To the course booking system"), go: "booking" }] }, back("start", tt("Start page"))] },
  exams: { title: tt("Examinations Office"), section: "exams", blocks: [{ t: "h", text: tt("Examinations Office") }, { t: "p", text: tt("The Examinations Office organises examinations and issues certificates. Requests for certificates are submitted via the Certificate Service. Processing takes place in the order of receipt.") }, { t: "links", small: true, items: [{ label: tt("Certificate Service"), go: "certs" }] }, back("start", tt("Start page"))] },
  media: { title: tt("Media Centre"), section: "media", blocks: [{ t: "h", text: tt("Media Centre") }, { t: "p", text: tt("The Media Centre operates the Learning Platform, on which the learning materials of the courses are provided. Access data are sent after booking.") }, { t: "links", small: true, items: [{ label: tt("Learning Platform"), go: "materials" }] }, back("start", tt("Start page"))] },
  comms: { title: tt("Communications Unit"), section: "comms", blocks: [{ t: "h", text: tt("Communications Unit") }, { t: "p", text: tt("The Communications Unit publishes news, the annual report and the Event Calendar.") }, { t: "links", small: true, items: [{ label: tt("Event Calendar"), go: "calendar" }] }, back("start", tt("Start page"))] },
  // Page type 1: a course list, as a table with the booking link at the end of each row (mark 4).
  booking: {
    title: tt("Course booking system"),
    section: "courseoffice",
    blocks: [
      { t: "h", text: tt("Course booking system"), mark: 4 },
      { t: "p", text: tt("Please select the desired course from the list below. By clicking on Book, you accept the terms and conditions of participation. A booking is binding.") },
      { t: "table", head: [tt("Course no."), tt("Title"), tt("Unit"), tt("Start"), tt("Details"), tt("Booking")], rows: [["W-114", tt("Project management basics"), tt("Professional Skills"), tt("Mon, in 3 weeks"), { label: tt("Details"), go: "course114" }, { label: tt("Book"), go: "book114" }], ["S-207", tt("Business English B2"), tt("Languages"), tt("Wed, in 5 weeks"), { label: tt("Details"), go: "course207" }, { label: tt("Book"), go: "book207" }], ["D-031", tt("Spreadsheets for beginners"), tt("Digital Competences"), tt("Tue, in 2 weeks"), { label: tt("Details"), go: "course031" }, { label: tt("Book"), go: "book031" }]] },
      back("start", tt("Start page")),
    ],
  },
  // Page type 2: a course page, laid out differently from the others (mark 4).
  course114: { title: tt("W-114"), section: "courseoffice", blocks: [{ t: "p", text: tt("Course W-114 · Unit Professional Skills · Department III") }, { t: "p", text: tt("This course provides an introduction to the methods and tools of project management. Participants learn to plan, steer and complete projects. The course comprises six sessions of three hours each. Prerequisites: none. Learning materials are provided via the Learning Platform of the Media Centre after booking. A certificate of participation is issued by the Examinations Office upon request.") }, { t: "links", small: true, items: [{ label: tt("Book"), go: "book114" }, { label: tt("Back to the list"), go: "booking" }] }] },
  course207: { title: tt("S-207"), section: "courseoffice", blocks: [{ t: "h", text: tt("Business English B2") }, { t: "table", head: [tt("Unit"), tt("Sessions"), tt("Level")], rows: [[tt("Languages"), tt("10"), tt("B2")]] }, { t: "p", text: tt("Improve your English for meetings, e-mails and presentations.") }, { t: "links", items: [{ label: tt("Book this course"), go: "book207" }] }, back("booking", tt("Back to the list"))] },
  course031: { title: tt("D-031"), section: "courseoffice", blocks: [{ t: "note", title: tt("Spreadsheets for beginners"), text: tt("Unit Digital Competences. Four sessions. Bring your own laptop."), go: { label: tt("Book"), go: "book031" } }, back("booking", tt("Back to the list"))] },
  book114: { title: tt("Booking"), section: "courseoffice", blocks: [{ t: "h", text: tt("Booking W-114") }, { t: "p", text: tt("Please enter your participant number. If you do not have a participant number, please first register with the Central Course Office.") }, { t: "form", fields: [tt("Participant number"), tt("Name"), tt("E-mail")], button: tt("Book with obligation to pay"), msg: tt("Booking received. You will receive a confirmation by e-mail.") }, back("booking", tt("Back to the list"))] },
  book207: { title: tt("Booking"), section: "courseoffice", blocks: [{ t: "h", text: tt("Booking S-207") }, { t: "form", fields: [tt("Participant number"), tt("Name"), tt("E-mail")], button: tt("Book with obligation to pay"), msg: tt("Booking received.") }, back("booking", tt("Back to the list"))] },
  book031: { title: tt("Booking"), section: "courseoffice", blocks: [{ t: "h", text: tt("Booking D-031") }, { t: "form", fields: [tt("Participant number"), tt("Name"), tt("E-mail")], button: tt("Book with obligation to pay"), msg: tt("Booking received.") }, back("booking", tt("Back to the list"))] },
  // Page type 3: the certificate service, as a long form page (mark 4).
  certs: { title: tt("Certificate Service"), section: "exams", blocks: [{ t: "h", text: tt("Certificate Service of the Examinations Office"), mark: 4 }, { t: "p", text: tt("Certificates and confirmations of participation are issued exclusively upon written request. Please fill in all fields of the form completely. Incomplete requests cannot be processed. Processing time depends on the volume of requests.") }, { t: "tabs", tabs: [{ label: tt("Certificate"), fields: [tt("Participant number"), tt("Course no."), tt("Date of the examination")] }, { label: tt("Confirmation of participation"), fields: [tt("Participant number"), tt("Course no.")] }], button: tt("Submit the request"), msg: tt("Your request has been received.") }, back("start", tt("Start page"))] },
  calendar: { title: tt("Event Calendar"), section: "comms", blocks: [{ t: "h", text: tt("Event Calendar") }, { t: "table", head: [tt("Date"), tt("Event"), tt("Organiser")], rows: [[tt("Thursday"), tt("Information evening"), tt("Communications Unit")], [tt("Next month"), tt("Examinations, spring term"), tt("Examinations Office")]] }, back("start", tt("Start page"))] },
  materials: { title: tt("Learning Platform"), section: "media", blocks: [{ t: "h", text: tt("Learning Platform of the Media Centre") }, { t: "p", text: tt("Log in with the access data you received after booking. Learning materials are available for the duration of the course.") }, { t: "form", fields: [tt("User name"), tt("Password")], button: tt("Log in"), msg: tt("Logged in. Your courses: no materials yet.") }, back("start", tt("Start page"))] },
  search: { title: tt("Search"), section: "start", blocks: [{ t: "h", text: tt("Search") }, { t: "form", fields: [tt("Search term")], button: tt("Search"), msg: tt("Results: Central Course Office · Course booking system · Terms of participation") }, { t: "links", small: true, items: [{ label: tt("Central Course Office"), go: "courseoffice" }, { label: tt("Course booking system"), go: "booking" }] }, back("start", tt("Start page"))] },
});

/** CampusNow today, on the desktop: an overloaded start page, navigation named after the organisation, functions not prioritised, a different structure per page type, long text blocks, searching instead of guidance. */
export const campusNow = (): PlatformCfg => ({ name: "CampusNow", start: "start", color: "#4527A0", nav: CN_NAV(), header: () => tt("Portal"), pages: cnPages(), footer: productFooter("Regional Education Organisation") });

/** The same portal on a phone, where the plan says use is especially problematic: the same pages in a narrow frame. */
export const campusNowPhone = (): PlatformCfg => ({ ...campusNow(), phone: true });

/* ------------------------------------------------------------------ The organisation's other touchpoints (Route 2): website, app and support area */

/**
 * The brief of Route 2: a website, the self-service portal, an app and a support area, and users who do not finish their tasks efficiently. Case assumption (marked
 * “Clear” in the brief): each department names and structures its own pages, and nobody owns the structure across touchpoints. Nothing else is added; no channel is
 * shown as the better one.
 */
export const orgWebsite = (): PlatformCfg => ({
  name: "Regional Education Organisation",
  start: "home",
  color: "#283593",
  nav: [{ label: tt("Programme"), go: "programme" }, { label: tt("About us"), go: "about" }, { label: tt("Contact"), go: "contact" }],
  pages: {
    home: { title: tt("Home"), blocks: [
      { t: "hero", kicker: tt("Regional Education Organisation"), title: tt("Learning for every stage of life."), text: tt("Courses in languages, professional skills, health and digital competences."), button: { label: tt("See the programme"), go: "programme" } },
      { t: "links", grid: 3, items: [{ label: tt("Course programme (PDF)"), go: "pdf" }, { label: tt("To the portal CampusNow"), go: "portal" }, { label: tt("Get the app"), go: "appinfo" }] },
    ] },
    programme: { title: tt("Programme"), section: "programme", blocks: [{ t: "h", text: tt("Our programme") }, { t: "cards", items: [{ title: tt("Languages"), text: tt("From A1 to C1.") }, { title: tt("Professional skills"), text: tt("Project management, leadership, communication.") }, { title: tt("Digital competences"), text: tt("From spreadsheets to data protection.") }] }, { t: "p", text: tt("Bookings are made in the portal CampusNow.") }, { t: "links", small: true, items: [{ label: tt("To the portal"), go: "portal" }] }, back("home", tt("Home"))] },
    pdf: { title: tt("Programme"), blocks: [{ t: "p", text: tt("The course programme is being downloaded (PDF, 48 pages).") }, back("home", tt("Home"))] },
    portal: { title: tt("Portal"), blocks: [{ t: "p", text: tt("CampusNow opens in a new window. Please log in there with your participant number.") }, back("home", tt("Home"))] },
    appinfo: { title: tt("App"), blocks: [{ t: "h", text: tt("The app") }, { t: "p", text: tt("Your timetable and your bookings on the go. Log in with your CampusNow access data.") }, back("home", tt("Home"))] },
    about: { title: tt("About us"), section: "about", blocks: [{ t: "h", text: tt("About us") }, { t: "p", text: tt("A regional education organisation with four departments and many specialist units.") }, back("home", tt("Home"))] },
    contact: { title: tt("Contact"), section: "contact", blocks: [{ t: "h", text: tt("Contact") }, { t: "p", text: tt("For bookings: Central Course Office. For certificates: Examinations Office. For access data: Media Centre.") }, back("home", tt("Home"))] },
  },
  footer: productFooter("Regional Education Organisation"),
});

export const orgApp = (): PlatformCfg => ({
  name: "Campus app",
  start: "home",
  color: "#00695C",
  phone: true,
  nav: [{ label: tt("Today"), go: "home" }, { label: tt("Enrolments"), go: "enrol" }, { label: tt("Me"), go: "me" }],
  pages: {
    home: { title: tt("Today"), section: "home", blocks: [{ t: "h", text: tt("Today") }, { t: "p", text: tt("No sessions today.") }, { t: "links", items: [{ label: tt("My enrolments"), go: "enrol" }, { label: tt("Documents"), go: "docs" }] }] },
    enrol: { title: tt("Enrolments"), section: "enrol", blocks: [{ t: "h", text: tt("My enrolments") }, { t: "p", text: tt("New enrolments are made in the portal CampusNow.") }, { t: "list", items: [tt("Business English B2 · enrolled")] }] },
    docs: { title: tt("Documents"), section: "home", blocks: [{ t: "h", text: tt("Documents") }, { t: "p", text: tt("Certificates can be requested in the portal under Certificate Service.") }, back("home", tt("Today"))] },
    me: { title: tt("Me"), section: "me", blocks: [{ t: "h", text: tt("My details") }, { t: "toggle", label: tt("Reminders before a session"), on: tt("On"), off: tt("Off") }] },
  },
});

export const supportArea = (): PlatformCfg => ({
  name: "Help and support",
  start: "help",
  color: "#5D4037",
  nav: [{ label: tt("Help"), go: "help" }, { label: tt("Write to us"), go: "write" }],
  pages: {
    help: { title: tt("Help"), section: "help", blocks: [
      { t: "h", text: tt("Help and support") },
      { t: "faq", items: [
        { q: tt("How do I book a course?"), a: tt("Courses are booked in the course booking system of the Central Course Office.") },
        { q: tt("Where is my certificate?"), a: tt("Certificates are issued by the Examinations Office upon request via the Certificate Service.") },
        { q: tt("I have no access data for the materials."), a: tt("Access data for the Learning Platform are sent by the Media Centre after booking.") },
      ] },
    ] },
    write: { title: tt("Write to us"), section: "write", blocks: [{ t: "h", text: tt("Write to us") }, { t: "form", fields: [tt("Subject"), tt("Your question")], button: tt("Send"), msg: tt("Thank you. Your question has been forwarded to the responsible office.") }] },
  },
});
