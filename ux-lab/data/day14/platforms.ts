import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the company's other channels for Route 2 (the pilot board and the 3D demo are in components/day14/portals.tsx). The brief: digital service, training and
 * support solutions; AR and VR seen as a great chance; no priorities, criteria or governance. Case assumption (marked “Clear” in the brief): an innovation lab
 * whose projects end as demos. Every link opens a real page; the names and contents are made up and nothing is marked right or wrong.
 */
const footer = tt("© IndustryXR · Imprint · Privacy · Simulation: the names and the contents are made up");
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const servicePortal = (): PlatformCfg => ({
  name: "IndustryXR · Service portal",
  start: "home",
  color: "#1E293B",
  nav: [{ label: tt("Service"), go: "home" }, { label: tt("Training"), go: "training" }],
  pages: {
    home: { title: tt("Service"), section: "home", blocks: [
      { t: "h", text: tt("Service and support") },
      { t: "links", grid: 2, items: [{ label: tt("Report a fault"), go: "fault" }, { label: tt("Manuals (PDF)"), go: "manuals" }, { label: tt("Book a technician"), go: "book" }, { label: tt("Training courses"), go: "training" }] },
      { t: "note", title: tt("New: AR support (beta)"), text: tt("Coming soon for selected machines."), go: { label: tt("Learn more"), go: "ar" } },
    ] },
    fault: { title: tt("Report a fault"), section: "home", blocks: [{ t: "form", fields: [tt("Machine number"), tt("What happened?")], button: tt("Send"), msg: tt("Received. A technician will call you.") }, back("home", tt("Service"))] },
    manuals: { title: tt("Manuals"), section: "home", blocks: [{ t: "list", items: [tt("SV-22 Maintenance procedure.pdf (38 pages)"), tt("Safety instructions.pdf")] }, back("home", tt("Service"))] },
    book: { title: tt("Book a technician"), section: "home", blocks: [{ t: "form", fields: [tt("Site"), tt("Preferred date")], button: tt("Book"), msg: tt("Booked. Travel time is charged separately.") }, back("home", tt("Service"))] },
    ar: { title: tt("AR support"), section: "home", blocks: [{ t: "p", text: tt("AR support is being piloted by our innovation lab. No date has been set for general availability.") }, back("home", tt("Service"))] },
    training: { title: tt("Training"), section: "training", blocks: [{ t: "table", head: [tt("Course"), tt("Format")], rows: [[tt("Safety basics"), tt("Classroom, 1 day")], [tt("SV-22 maintenance"), tt("On site, 2 days")]] }] },
  },
  footer,
});

export const labNews = (): PlatformCfg => ({
  name: "Innovation lab · News",
  start: "home",
  color: "#7C3AED",
  nav: [{ label: tt("News"), go: "home" }],
  pages: {
    home: { title: tt("News"), section: "home", blocks: [
      { t: "hero", kicker: tt("INNOVATION LAB"), title: tt("The future is spatial 🚀"), text: tt("Our latest demos: holographic assembly, VR safety walk, AR glasses for the canteen menu.") },
      { t: "cards", items: [{ title: tt("Holographic assembly"), text: tt("Shown at the summer fair."), tag: tt("Demo"), go: "d1" }, { title: tt("VR safety walk"), text: tt("Tested with 6 volunteers."), tag: tt("Demo"), go: "d1" }, { title: tt("AR canteen menu"), text: tt("Fun for the whole team!"), tag: tt("Demo"), go: "d1" }] },
    ] },
    d1: { title: tt("Demo"), section: "home", blocks: [{ t: "p", text: tt("Status: demo finished. Next steps: open.") }, back("home", tt("News"))] },
  },
  footer,
});
