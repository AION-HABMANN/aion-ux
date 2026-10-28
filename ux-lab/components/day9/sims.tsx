"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { hjA, hjB, hjC, moveWell, mwPortal, mwService, skillRise } from "@/data/day9/platforms";

/**
 * Day 9 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. SkillRise as the plan describes it (Block 1.1), the three HealthJourney designs (Block 1.2),
 * MoveWell today (Block 2.1) and the provider's portal and service offer (Block 3.1). The pages are data (data/day9/platforms.ts) run by the shared mini-platform, so
 * every link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const SkillRiseSim = () => <PlatformSim cfg={skillRise()} />;
export const MoveWellSim = () => <PlatformSim cfg={moveWell()} />;
export const PortalSim = () => <PlatformSim cfg={mwPortal()} />;
export const ServiceSim = () => <PlatformSim cfg={mwService()} />;

export function JourneySim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? hjA() : variant === "B" ? hjB() : hjC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "skillrise" | "movewell" | "hjA" | "hjB" | "hjC"; page: string; marks?: boolean }) {
  const cfg = which === "skillrise" ? skillRise() : which === "movewell" ? moveWell() : which === "hjA" ? hjA() : which === "hjB" ? hjB() : hjC();
  return <PlatformShot cfg={cfg} page={page} marks={marks} />;
}
