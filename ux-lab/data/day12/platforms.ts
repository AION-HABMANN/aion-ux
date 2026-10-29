import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the organisation's other channels for Route 2 (the portals with real barriers are in components/day12/portals.tsx). The brief: a website, a customer
 * portal and digital service processes that formally work but are not equally accessible. Case assumption (marked “Clear” in the brief): every department writes
 * its own content and an agency builds the templates. The website is drawn in washed-out colours (`dim`), as the complaints about legibility describe; every link
 * opens a real page. The names and contents are made up and nothing is marked right or wrong.
 */
const footer = tt("© City of Westbrook · Imprint · Privacy · Accessibility statement · Simulation: the names and the contents are made up");
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const cityWebsite = (): PlatformCfg => ({
  name: "City website",
  start: "home",
  color: "#2F5D8A",
  dim: true,
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("News"), go: "news" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [
      { t: "hero", kicker: tt("CITY OF WESTBROOK"), title: tt("Living in Westbrook"), text: tt("Everything about services, events and life in our city.") },
      { t: "links", grid: 2, items: [{ label: tt("Citizen services"), go: "services" }, { label: tt("Waste and recycling"), go: "waste" }, { label: tt("News"), go: "news" }, { label: tt("Accessibility statement"), go: "statement" }] },
    ] },
    services: { title: tt("Citizen services"), section: "home", blocks: [{ t: "p", text: tt("Appointments and applications are handled in the CitizenConnect portal.") }, back("home", tt("Home"))] },
    waste: { title: tt("Waste"), section: "home", blocks: [{ t: "p", text: tt("The collection calendar is available as a PDF download.") }, back("home", tt("Home"))] },
    news: { title: tt("News"), section: "news", blocks: [{ t: "list", items: [tt("Road works on Main Street"), tt("New opening hours of the citizens' office"), tt("Summer festival in the park")] }] },
    statement: { title: tt("Accessibility statement"), section: "home", blocks: [{ t: "p", text: tt("This website is partially compliant with the accessibility requirements. Non-accessible content: some PDF documents, some forms. Last reviewed: last year.") }, back("home", tt("Home"))] },
  },
  footer,
});

export const customerPortal = (): PlatformCfg => ({
  name: "Customer portal",
  start: "home",
  color: "#24496D",
  nav: [{ label: tt("My account"), go: "home" }],
  pages: {
    home: { title: tt("My account"), section: "home", blocks: [
      { t: "h", text: tt("My account") },
      { t: "table", head: [tt("Service"), tt("Status")], rows: [[tt("Parking permit"), tt("active")], [tt("Dog licence"), tt("payment due")]] },
      { t: "links", items: [{ label: tt("Pay"), go: "pay" }] },
    ] },
    pay: { title: tt("Pay"), section: "home", blocks: [{ t: "form", fields: [tt("IBAN"), tt("Account holder")], button: tt("Pay"), msg: tt("Payment received.") }, back("home", tt("My account"))] },
  },
  footer,
});
