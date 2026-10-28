import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the screens of the city's service company for Route 2 (the voice assistants themselves are in data/day11/voices.ts). The brief: a company with an app, a
 * service portal and digital assistants; prototypes with comfort gains and problems with misunderstandings, loss of control and acceptance in sensitive situations.
 * Case assumption (marked “Clear” in the brief): the prototypes are CityHelp Voice on the phone line and a voice search in the app. Every link opens a real page;
 * the names and contents are made up and nothing is marked right or wrong.
 */
const footer = tt("© City service company · Imprint · Privacy · Accessibility · Simulation: the names and the contents are made up");
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const cityPortal = (): PlatformCfg => ({
  name: "City service portal",
  start: "home",
  color: "#1D4E89",
  nav: [{ label: tt("Services"), go: "home" }, { label: tt("My requests"), go: "mine" }],
  pages: {
    home: { title: tt("Services"), section: "home", blocks: [
      { t: "h", text: tt("What do you need today?") },
      { t: "links", grid: 2, items: [{ label: tt("Book an appointment"), go: "appt" }, { label: tt("Report damage in public space"), go: "report" }, { label: tt("Housing benefit"), go: "benefit" }, { label: tt("Register a move"), go: "move" }] },
      { t: "note", title: tt("New: CityHelp Voice"), text: tt("Call 115 and talk to our voice assistant, day and night.") },
    ] },
    appt: { title: tt("Appointment"), section: "home", blocks: [{ t: "form", fields: [tt("Office"), tt("Date")], button: tt("Book"), msg: tt("Booked. Reference B-2291.") }, back("home", tt("Services"))] },
    report: { title: tt("Report"), section: "home", blocks: [{ t: "form", fields: [tt("Where"), tt("What")], button: tt("Send"), msg: tt("Thank you. Reference 4471.") }, back("home", tt("Services"))] },
    benefit: { title: tt("Housing benefit"), section: "home", blocks: [{ t: "p", text: tt("Apply online or at the social services office. Decisions are sent by letter.") }, back("home", tt("Services"))] },
    move: { title: tt("Register a move"), section: "home", blocks: [{ t: "p", text: tt("Register within two weeks of moving, online with your ID card or at the citizens' office.") }, back("home", tt("Services"))] },
    mine: { title: tt("My requests"), section: "mine", blocks: [{ t: "table", head: [tt("Request"), tt("Status")], rows: [[tt("ID card"), tt("in production")], [tt("Streetlight, Lindenstraße"), tt("received")]] }] },
  },
  footer,
});

export const cityApp = (): PlatformCfg => ({
  name: "City app",
  start: "home",
  color: "#2B5F9E",
  phone: true,
  nav: [{ label: tt("Home"), go: "home" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [
      { t: "hero", kicker: tt("PILOT · VOICE SEARCH"), title: tt("Just say what you need 🎙"), text: tt("Tap the microphone and ask anything about the city.") },
      { t: "chat", label: tt("Say or type"), intro: tt("Listening …"), reply: tt("I found 37 results. Result 1: Waste collection calendar. Result 2: Dog licence. Result 3: Opening hours of swimming pools. Shall I continue?") },
      { t: "links", items: [{ label: tt("All services"), go: "all" }] },
    ] },
    all: { title: tt("All services"), section: "home", blocks: [{ t: "list", items: [tt("Appointments"), tt("Reports"), tt("Waste calendar"), tt("Parking")] }, back("home", tt("Home"))] },
  },
  footer,
});
