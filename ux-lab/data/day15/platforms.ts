import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the company's other channels for Route 2 (the research board and the gaze study are in components/day15/portals.tsx). The brief: complex digital
 * products, UX research to be extended with eye-tracking, neurofeedback and later BCI-near approaches, innovation leads who see differentiation, data protection,
 * ethics and maturity unstructured. Case assumption (marked “Clear” in the brief): a research team of three that runs classic usability tests, and a management
 * that wants to present “neuro-UX” to customers. Every link opens a real page; the names and contents are made up and nothing is marked right or wrong.
 */
const footer = tt("© VisionMind · Imprint · Privacy · Simulation: the names and the contents are made up");
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const servicePortal = (): PlatformCfg => ({
  name: "VisionMind · Customer service portal",
  start: "home",
  color: "#0F3D5E",
  nav: [{ label: tt("Service"), go: "home" }, { label: tt("My contracts"), go: "contracts" }, { label: tt("Help"), go: "help" }],
  pages: {
    home: { title: tt("Service"), section: "home", blocks: [
      { t: "h", text: tt("What would you like to do?") },
      { t: "links", grid: 2, items: [{ label: tt("Change my tariff"), go: "tariff" }, { label: tt("Report a problem"), go: "problem" }, { label: tt("Documents"), go: "docs" }, { label: tt("Move house"), go: "move" }, { label: tt("Payment details"), go: "pay" }, { label: tt("More services (14)"), go: "more" }] },
      { t: "note", title: tt("New: our portal adapts to you (beta)"), text: tt("Soon, smart technology will notice when a page is too much for you."), go: { label: tt("Learn more"), go: "beta" } },
    ] },
    tariff: { title: tt("Change my tariff"), section: "home", blocks: [{ t: "p", text: tt("Step 1 of 6: choose the contract. Step 2: check your usage. Step 3: compare. Step 4: options. Step 5: confirm. Step 6: identity check.") }, { t: "form", fields: [tt("Contract number"), tt("Customer number")], button: tt("Next"), msg: tt("Please enter the contract number without spaces.") }, back("home", tt("Service"))] },
    problem: { title: tt("Report a problem"), section: "home", blocks: [{ t: "form", fields: [tt("Category"), tt("Sub-category"), tt("Describe the problem")], button: tt("Send"), msg: tt("Received. Ticket number 0-4471-22.") }, back("home", tt("Service"))] },
    docs: { title: tt("Documents"), section: "home", blocks: [{ t: "list", items: [tt("Invoice March.pdf"), tt("Invoice February.pdf"), tt("General terms (48 pages).pdf")] }, back("home", tt("Service"))] },
    move: { title: tt("Move house"), section: "home", blocks: [{ t: "p", text: tt("Please call us or use the form under Help → Forms → Contract → Change of address.") }, back("help", tt("Help"))] },
    pay: { title: tt("Payment details"), section: "home", blocks: [{ t: "p", text: tt("Changes to payment details take effect from the next billing period.") }, back("home", tt("Service"))] },
    more: { title: tt("More services"), section: "home", blocks: [{ t: "list", items: [tt("Meter reading"), tt("Second address"), tt("Contract transfer"), tt("Letters of confirmation"), tt("Blocking"), tt("Reminders")] }, back("home", tt("Service"))] },
    beta: { title: tt("Adaptive portal (beta)"), section: "home", blocks: [{ t: "p", text: tt("Our research lab is working on a portal that notices overload. No date or details have been decided yet.") }, back("home", tt("Service"))] },
    contracts: { title: tt("My contracts"), section: "contracts", blocks: [{ t: "table", head: [tt("Contract"), tt("Status")], rows: [[tt("Home 200"), tt("active")], [tt("Mobile S"), tt("active")]] }] },
    help: { title: tt("Help"), section: "help", blocks: [{ t: "links", items: [{ label: tt("Forms"), go: "move" }, { label: tt("Frequently asked questions"), go: "docs" }] }] },
  },
  footer,
});

export const researchNews = (): PlatformCfg => ({
  name: "VisionMind Lab · News",
  start: "home",
  color: "#6D28D9",
  nav: [{ label: tt("News"), go: "home" }],
  pages: {
    home: { title: tt("News"), section: "home", blocks: [
      { t: "hero", kicker: tt("VISIONMIND LAB"), title: tt("We can now see what our customers think 🧠"), text: tt("Eye-tracking, EEG and soon brain-computer interfaces: the future of our portal is neuro.") },
      { t: "cards", items: [{ title: tt("First heatmap of the home page"), text: tt("The banner gets the most attention!"), tag: tt("Study"), go: "d1" }, { title: tt("EEG headband test"), text: tt("Tried by 6 colleagues over lunch."), tag: tt("Demo"), go: "d2" }, { title: tt("Control the portal by thought"), text: tt("A concept for the customer event."), tag: tt("Idea"), go: "d3" }] },
    ] },
    d1: { title: tt("First heatmap"), section: "home", blocks: [{ t: "p", text: tt("Eight colleagues looked at the home page for ten seconds each. Question asked: none. Next step: show it to marketing.") }, back("home", tt("News"))] },
    d2: { title: tt("EEG headband test"), section: "home", blocks: [{ t: "p", text: tt("Six colleagues wore a consumer headband while using the portal. The app showed a focus score. Data stored: on the vendor's cloud.") }, back("home", tt("News"))] },
    d3: { title: tt("Control the portal by thought"), section: "home", blocks: [{ t: "p", text: tt("Status: idea for the customer event. User problem: open.") }, back("home", tt("News"))] },
  },
  footer,
});
