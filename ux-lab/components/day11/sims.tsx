"use client";

import { PlatformSim } from "@/components/sim/PlatformSim";
import { VoiceSim } from "@/components/sim/VoiceSim";
import { cityApp, cityPortal } from "@/data/day11/platforms";
import { TRY, careVoiceA, careVoiceB, careVoiceC, cityHelp, homeAssist } from "@/data/day11/voices";

/**
 * Day 11 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. HomeAssist Voice (Block 1.1), the three CareVoice designs (Block 1.2) and CityHelp Voice
 * (Block 2.1) are voice assistants you can talk to (components/sim/VoiceSim.tsx, scripts in data/day11/voices.ts); the city's portal and app for Route 2 run on
 * the shared mini-platform. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const HomeAssistSim = () => <VoiceSim cfg={homeAssist()} tryThese={TRY.homeAssist()} />;
export const CityHelpSim = ({ hints = true }: { hints?: boolean }) => <VoiceSim cfg={cityHelp()} tryThese={hints ? TRY.cityHelp() : undefined} />;
export const PortalSim = () => <PlatformSim cfg={cityPortal()} />;
export const AppSim = () => <PlatformSim cfg={cityApp()} />;

export function CareVoiceSim({ variant }: { variant: "A" | "B" | "C" }) {
  const cfg = variant === "A" ? careVoiceA() : variant === "B" ? careVoiceB() : careVoiceC();
  return <VoiceSim cfg={cfg} tryThese={TRY.careVoice()} />;
}
