"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { energyApp, myEnergy, servicePlatform, servicePoint, workflowA, workflowB, workflowC } from "@/data/day4/platforms";

/**
 * Day 4 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. ServicePoint as the plan describes it (Block 1.1), the three WorkFlow Hub navigation variants
 * (Block 1.2), MyEnergy today (Block 2.1) and the energy supplier's app and service platform (Block 3.1). The pages are data (data/day4/platforms.ts) run by the shared
 * mini-platform, so every menu item, link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const ServicePointSim = () => <PlatformSim cfg={servicePoint()} />;
export const MyEnergySim = () => <PlatformSim cfg={myEnergy()} />;
export const AppSim = () => <PlatformSim cfg={energyApp()} />;
export const ServiceSim = () => <PlatformSim cfg={servicePlatform()} />;

export function WorkflowSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? workflowA() : variant === "B" ? workflowB() : workflowC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "servicepoint" | "myenergy"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "servicepoint" ? servicePoint() : myEnergy()} page={page} marks={marks} />;
}
