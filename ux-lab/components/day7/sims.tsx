"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { careerA, careerB, careerC, lifeSupport, lsApp, lsWebsite, wellTrack } from "@/data/day7/platforms";

/**
 * Day 7 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. WellTrack as the plan describes it (Block 1.1), the three CareerPath designs (Block 1.2),
 * LifeSupport today (Block 2.1) and the provider's website and app (Block 3.1). The pages are data (data/day7/platforms.ts) run by the shared mini-platform, so every
 * link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const WellTrackSim = () => <PlatformSim cfg={wellTrack()} />;
export const LifeSupportSim = () => <PlatformSim cfg={lifeSupport()} />;
export const WebsiteSim = () => <PlatformSim cfg={lsWebsite()} />;
export const AppSim = () => <PlatformSim cfg={lsApp()} />;

export function CareerSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? careerA() : variant === "B" ? careerB() : careerC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "welltrack" | "lifesupport"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "welltrack" ? wellTrack() : lifeSupport()} page={page} marks={marks} />;
}
