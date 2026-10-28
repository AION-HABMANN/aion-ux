"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { careGuide, cgApp, cgService, cnA, cnB, cnC, smartAssist } from "@/data/day10/platforms";

/**
 * Day 10 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. SmartAssist as the plan describes it (Block 1.1), the three CareerNavigator designs
 * (Block 1.2), CareGuide today (Block 2.1) and the provider's app and service platform (Block 3.1). The pages are data (data/day10/platforms.ts) run by the shared
 * mini-platform, so every link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const SmartAssistSim = () => <PlatformSim cfg={smartAssist()} />;
export const CareGuideSim = () => <PlatformSim cfg={careGuide()} />;
export const AppSim = () => <PlatformSim cfg={cgApp()} />;
export const ServiceSim = () => <PlatformSim cfg={cgService()} />;

export function NavigatorSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? cnA() : variant === "B" ? cnB() : cnC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "smartassist" | "careguide"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "smartassist" ? smartAssist() : careGuide()} page={page} marks={marks} />;
}
