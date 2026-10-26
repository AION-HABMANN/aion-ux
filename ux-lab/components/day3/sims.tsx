"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { healthA, healthB, healthC, insurerApp3, insurerWeb3, secureLife, travelEase } from "@/data/day3/platforms";

/**
 * Day 3 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. TravelEase as the plan describes it (Block 1.1), the three HealthConnect designs (Block 1.2),
 * SecureLife today (Block 2.1) and the insurer's website and app (Block 3.1). The pages are data (data/day3/platforms.ts) run by the shared mini-platform, so every link
 * and button opens a real page. The colours and type styles are the plan's clues; the content is made up and nothing here is marked right or wrong.
 */
export const TravelEaseSim = () => <PlatformSim cfg={travelEase()} />;
export const SecureLifeSim = () => <PlatformSim cfg={secureLife()} />;
export const WebsiteSim = () => <PlatformSim cfg={insurerWeb3()} />;
export const AppSim = () => <PlatformSim cfg={insurerApp3()} />;

export function HealthSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? healthA() : variant === "B" ? healthB() : healthC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "travelease" | "securelife"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "travelease" ? travelEase() : secureLife()} page={page} marks={marks} />;
}
