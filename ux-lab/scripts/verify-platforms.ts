/**
 * Verification of the mini-platforms (ported from Digital Learning, DL-STANDARD v1.8, section 4): for every day, every platform, every link leads to a page that exists,
 * every page is reachable from the start or the menu, no page is empty, and no text prints a price. Run with `npm run verify:platforms`. It needs no browser.
 */
import { platformIssues } from "../components/sim/PlatformSim";
import type { PlatformCfg } from "../components/sim/PlatformSim";
import * as d1 from "../data/day1/platforms";
import * as d2 from "../data/day2/platforms";
import * as d3 from "../data/day3/platforms";
import * as d4 from "../data/day4/platforms";
import { setCurrentLang } from "../lib/lang";

const DAYS: Record<string, Record<string, () => PlatformCfg>> = {
  "Day 1": { carePath: d1.carePath, skillFlowA: d1.skillFlowA, skillFlowB: d1.skillFlowB, skillFlowC: d1.skillFlowC, safeHome: d1.safeHome, website: d1.insurerWebsite, app: d1.insurerApp, chatbot: d1.insurerChatbot },
  "Day 2": { cityDesk: d2.cityDesk, eduFlexA: d2.eduFlexA, eduFlexB: d2.eduFlexB, eduFlexC: d2.eduFlexC, campusNow: d2.campusNow, campusPhone: d2.campusNowPhone, website: d2.orgWebsite, app: d2.orgApp, support: d2.supportArea },
  "Day 3": { travelEase: d3.travelEase, healthA: d3.healthA, healthB: d3.healthB, healthC: d3.healthC, secureLife: d3.secureLife, website: d3.insurerWeb3, app: d3.insurerApp3 },
  "Day 4": { servicePoint: d4.servicePoint, workflowA: d4.workflowA, workflowB: d4.workflowB, workflowC: d4.workflowC, myEnergy: d4.myEnergy, app: d4.energyApp, service: d4.servicePlatform },
};

let bad = 0;
const ok = (m: string) => console.log("ok    " + m);
const fail = (m: string) => { bad++; console.log("FAIL  " + m); };

setCurrentLang("en");
for (const [day, cfgs] of Object.entries(DAYS)) {
  for (const [name, make] of Object.entries(cfgs)) {
    const cfg = make();
    const issues = platformIssues(cfg);
    const text = JSON.stringify(cfg);
    if (/€|undefined|\[object/.test(text)) issues.push(`${day} ${name}: prints a price or an undefined value`);
    if (issues.length) issues.forEach((i) => fail(`${day} ${name}: ${i}`));
    else ok(`${day} · ${name}: ${Object.keys(cfg.pages).length} pages, every link leads to a page, every page is reachable`);
  }
}
console.log(bad ? `\n${bad} check(s) failed` : "\nAll checks passed");
process.exit(bad ? 1 : 0);
