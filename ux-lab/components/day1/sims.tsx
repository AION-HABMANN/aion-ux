"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { carePath, insurerApp, insurerChatbot, insurerWebsite, safeHome, skillFlowA, skillFlowB, skillFlowC } from "@/data/day1/platforms";

/**
 * Day 1 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. CarePath as the plan describes it (Block 1.1), the three SkillFlow start pages (Block 1.2),
 * SafeHome Online today (Block 2.1) and the insurer's other touchpoints (Block 3.1). The pages are data (data/day1/platforms.ts) run by the shared mini-platform, so
 * every tile, link and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const CarePathSim = () => <PlatformSim cfg={carePath()} />;
export const SafeHomeSim = () => <PlatformSim cfg={safeHome()} />;
export const WebsiteSim = () => <PlatformSim cfg={insurerWebsite()} />;
export const AppSim = () => <PlatformSim cfg={insurerApp()} />;
export const ChatbotSim = () => <PlatformSim cfg={insurerChatbot()} />;

export function SkillFlowSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? skillFlowA() : variant === "B" ? skillFlowB() : skillFlowC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "carepath" | "safehome"; page: string; marks?: boolean }) {
  return <PlatformShot cfg={which === "carepath" ? carePath() : safeHome()} page={page} marks={marks} />;
}
