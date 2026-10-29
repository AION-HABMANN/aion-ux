import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the company's other channels for Route 2 (the decision board and the prototypes are in components/day16/portals.tsx). The brief: experimental future
 * projects, several prototypes and pilots on immersive, AI-supported and neuro-based interaction, no portfolio logic. Case assumption (marked “Clear” in the
 * brief): five lines of innovation and a management that wants a headline at the spring trade fair. Every link opens a real page; the names and contents are made
 * up and nothing is marked right or wrong.
 */
const footer = tt("© NextWorld · Imprint · Privacy · Simulation: the names and the contents are made up");
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const innovationWiki = (): PlatformCfg => ({
  name: "NextWorld · Innovation wiki",
  start: "home",
  color: "#155E75",
  nav: [{ label: tt("Projects"), go: "home" }, { label: tt("How we work"), go: "how" }],
  pages: {
    home: { title: tt("Projects"), section: "home", blocks: [
      { t: "h", text: tt("Our future projects") },
      { t: "links", grid: 2, items: [{ label: tt("AR advice in branches"), go: "ar" }, { label: tt("VR safety training"), go: "vr" }, { label: tt("Neuro-informed shop study"), go: "neuro" }, { label: tt("AI chat assistant"), go: "chat" }, { label: tt("Emotion-adaptive learning"), go: "emo" }] },
      { t: "note", title: tt("Each project page uses its own template"), text: tt("Teams were free to report as they liked.") },
    ] },
    ar: { title: tt("AR advice in branches"), section: "home", blocks: [{ t: "p", text: tt("Status: “Customers love it!” 14 quotes collected at the opening week. Follow-up visits: not tracked.") }, back("home", tt("Projects"))] },
    vr: { title: tt("VR safety training"), section: "home", blocks: [{ t: "table", head: [tt("Measure"), tt("Value")], rows: [[tt("Trainings completed"), tt("42")], [tt("Felt unwell during a session"), tt("6")], [tt("Errors on the real machines afterwards"), tt("not measured")]] }, back("home", tt("Projects"))] },
    neuro: { title: tt("Neuro-informed shop study"), section: "home", blocks: [{ t: "p", text: tt("Eye-tracking heatmaps of the online shop with 10 colleagues. Consent form: “to be added”.") }, back("home", tt("Projects"))] },
    chat: { title: tt("AI chat assistant"), section: "home", blocks: [{ t: "p", text: tt("Live in the app for 3 months. Answers a quarter of service questions. The app does not say it is an AI.") }, back("home", tt("Projects"))] },
    emo: { title: tt("Emotion-adaptive learning"), section: "home", blocks: [{ t: "p", text: tt("The staff academy's prototype reads facial expressions through the webcam and slows down when learners look frustrated. Pilot with 20 employees planned.") }, back("home", tt("Projects"))] },
    how: { title: tt("How we work"), section: "how", blocks: [{ t: "list", items: [tt("Anyone can start a project with a sponsor."), tt("Projects report when they have news."), tt("There is no process for stopping a project.")] }] },
  },
  footer,
});

export const customerApp = (): PlatformCfg => ({
  name: "NextWorld · Customer app",
  start: "home",
  color: "#0F172A",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("Help"), go: "help" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [
      { t: "hero", kicker: tt("NEW"), title: tt("Try our future features ✨"), text: tt("AR advice, a chat assistant and more. Some are in beta.") },
      { t: "cards", items: [{ title: tt("AR advice"), text: tt("Point your camera at a product."), tag: tt("Beta"), go: "ar" }, { title: tt("Chat with us"), text: tt("Ask anything, any time."), tag: tt("New"), go: "chat" }] },
    ] },
    ar: { title: tt("AR advice"), section: "home", blocks: [{ t: "p", text: tt("Point your camera at a product to see tips. This feature looks and works differently from the rest of the app.") }, back("home", tt("Home"))] },
    chat: { title: tt("Chat"), section: "home", blocks: [{ t: "p", text: tt("“Hi, I'm Nova! How can I help?” (No mention that Nova is an AI.)") }, back("home", tt("Home"))] },
    help: { title: tt("Help"), section: "help", blocks: [{ t: "links", items: [{ label: tt("Contact"), go: "chat" }] }] },
  },
  footer,
});
