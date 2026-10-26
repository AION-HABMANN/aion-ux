"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { ghSelfService, ghWebsite, greenHome, skillsA, skillsB, skillsC, startSmart } from "@/data/day8/platforms";

/**
 * Day 8 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. StartSmart as the plan describes it (Block 1.1), the three FutureSkills journeys (Block
 * 1.2), the GreenHome onboarding today (Block 2.1) and the provider's website and self-service flows (Block 3.1). The pages are data (data/day8/platforms.ts) run by
 * the shared mini-platform, so every link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const StartSmartSim = () => <PlatformSim cfg={startSmart()} />;
export const GreenHomeSim = () => <PlatformSim cfg={greenHome()} />;
export const WebsiteSim = () => <PlatformSim cfg={ghWebsite()} />;
export const SelfServiceSim = () => <PlatformSim cfg={ghSelfService()} />;

export function SkillsSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? skillsA() : variant === "B" ? skillsB() : skillsC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "startsmart" | "greenhome"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "startsmart" ? startSmart() : greenHome()} page={page} marks={marks} />;
}
