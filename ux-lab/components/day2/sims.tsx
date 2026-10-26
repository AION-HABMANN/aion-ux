"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { campusNow, campusNowPhone, cityDesk, eduFlexA, eduFlexB, eduFlexC, orgApp, orgWebsite, supportArea } from "@/data/day2/platforms";

/**
 * Day 2 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. CityDesk as the plan describes it (Block 1.1), the three EduFlex start pages (Block 1.2),
 * CampusNow today on the desktop and on a phone (Block 2.1) and the organisation's other touchpoints (Block 3.1). The pages are data (data/day2/platforms.ts) run by the
 * shared mini-platform, so every menu item, link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const CityDeskSim = () => <PlatformSim cfg={cityDesk()} />;
export const CampusNowSim = () => <PlatformSim cfg={campusNow()} />;
export const CampusPhoneSim = () => <PlatformSim cfg={campusNowPhone()} />;
export const WebsiteSim = () => <PlatformSim cfg={orgWebsite()} />;
export const AppSim = () => <PlatformSim cfg={orgApp()} />;
export const SupportSim = () => <PlatformSim cfg={supportArea()} />;

export function EduFlexSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? eduFlexA() : variant === "B" ? eduFlexB() : eduFlexC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "citydesk" | "campusnow" | "campusphone"; page: string; marks?: boolean }) {
  const cfg = which === "citydesk" ? cityDesk() : which === "campusnow" ? campusNow() : campusNowPhone();
  return <PlatformShot cfg={cfg} page={page} marks={marks} />;
}
