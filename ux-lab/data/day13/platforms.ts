import type { Blk, PlatformCfg } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the organisation's other channels for Route 2 (LifeGuide itself is in components/day13/portals.tsx). The brief: a website, a portal and an app that are
 * formally accessible but not usable enough for different cognitive and sensory needs. Case assumption (marked “Clear” in the brief): marketing wants the app to
 * stay lively; the product team proposes an “easy mode” switch. Every link opens a real page; the names and contents are made up and nothing is marked right or
 * wrong.
 */
const footer = tt("© LifeGuide · Imprint · Privacy · Accessibility · Simulation: the names and the contents are made up");
const back = (go: string, label: string): Blk => ({ t: "links", small: true, items: [{ label, go }] });

export const lgWebsite = (): PlatformCfg => ({
  name: "LifeGuide · Website",
  start: "home",
  color: "#0E7490",
  nav: [{ label: tt("Home"), go: "home" }, { label: tt("About us"), go: "about" }],
  pages: {
    home: { title: tt("Home"), section: "home", blocks: [
      { t: "hero", kicker: tt("HEALTH · COUNSELLING · SUPPORT"), title: tt("We are there when life gets hard."), text: tt("Information, counselling and support offers for you and your family."), button: { label: tt("Find support"), go: "find" } },
      { t: "cards", items: [{ title: tt("Stories"), text: tt("People tell their story."), tag: tt("Magazine"), go: "about" }, { title: tt("Events"), text: tt("Talks and groups near you."), tag: tt("Calendar"), go: "about" }, { title: tt("Donate"), text: tt("Support our work."), tag: tt("Help"), go: "about" }] },
    ] },
    find: { title: tt("Find support"), section: "home", blocks: [{ t: "p", text: tt("Support offers are listed in the LifeGuide portal. Please log in or register.") }, back("home", tt("Home"))] },
    about: { title: tt("About us"), section: "about", blocks: [{ t: "p", text: tt("LifeGuide is a non-profit network of health, counselling and support services.") }, back("home", tt("Home"))] },
  },
  footer,
});

export const lgApp = (): PlatformCfg => ({
  name: "LifeGuide · App",
  start: "home",
  color: "#7C3AED",
  phone: true,
  header: () => tt("🔔 5"),
  nav: [{ label: tt("Today"), go: "home" }, { label: tt("Settings"), go: "settings" }],
  pages: {
    home: { title: tt("Today"), section: "home", blocks: [
      { t: "hero", kicker: tt("GOOD MORNING ☀️"), title: tt("Your wellbeing journey"), text: tt("3 new tips, 2 events and a story picked for you!") },
      { t: "meta", items: [tt("🔥 3-day streak"), tt("🎯 Daily goal"), tt("💬 2 messages")], colors: ["#DC2626", "#7C3AED", "#0E7490"] },
      { t: "links", grid: 2, items: [{ label: tt("Tips"), go: "tips" }, { label: tt("My appointment"), go: "appt" }] },
    ] },
    tips: { title: tt("Tips"), section: "home", blocks: [{ t: "list", items: [tt("Drink water"), tt("Take a walk"), tt("Call a friend")] }, back("home", tt("Today"))] },
    appt: { title: tt("My appointment"), section: "home", blocks: [{ t: "p", text: tt("Counselling · Thursday 15:00 · Room 2.14") }, back("home", tt("Today"))] },
    settings: { title: tt("Settings"), section: "settings", blocks: [{ t: "toggle", label: tt("Notifications"), on: tt("Notifications on."), off: tt("Notifications off.") }, { t: "p", text: tt("Easy mode: coming soon.") }] },
  },
  footer,
});
