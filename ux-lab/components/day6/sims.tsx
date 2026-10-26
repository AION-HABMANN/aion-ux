"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { careA, careB, careC, citizenApp, citizenFlow, officeSphere, staffInterface } from "@/data/day6/platforms";

/**
 * Day 6 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. OfficeSphere as the plan describes it (Block 1.1), the three CareAssist structures (Block 1.2),
 * CitizenFlow today (Block 2.1) and the administration's app and staff interface (Block 3.1). The pages are data (data/day6/platforms.ts) run by the shared
 * mini-platform, so every link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const OfficeSphereSim = () => <PlatformSim cfg={officeSphere()} />;
export const CitizenFlowSim = () => <PlatformSim cfg={citizenFlow()} />;
export const AppSim = () => <PlatformSim cfg={citizenApp()} />;
export const StaffSim = () => <PlatformSim cfg={staffInterface()} />;

export function CareSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? careA() : variant === "B" ? careB() : careC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "officesphere" | "citizenflow"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "officesphere" ? officeSphere() : citizenFlow()} page={page} marks={marks} />;
}
