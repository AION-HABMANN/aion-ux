"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { adminA, adminB, adminC, adminInterface, bankDirect, bankDirectPhone, mobilityApp, moveEasy, moveEasyPhone } from "@/data/day5/platforms";

/**
 * Day 5 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. BankDirect as the plan describes it, on the desktop and on a phone (Block 1.1), the three
 * AdminFlow variants (Block 1.2), MoveEasy today, on the desktop and on a phone (Block 2.1), and the provider's service app and administration interface (Block 3.1). The
 * pages are data (data/day5/platforms.ts) run by the shared mini-platform, so every link and button opens a real page. Own colours only; the content is made up and
 * nothing here is marked right or wrong.
 */
export const BankDirectSim = () => <PlatformSim cfg={bankDirect()} />;
export const BankDirectPhoneSim = () => <PlatformSim cfg={bankDirectPhone()} />;
export const MoveEasySim = () => <PlatformSim cfg={moveEasy()} />;
export const MoveEasyPhoneSim = () => <PlatformSim cfg={moveEasyPhone()} />;
export const AppSim = () => <PlatformSim cfg={mobilityApp()} />;
export const AdminSim = () => <PlatformSim cfg={adminInterface()} />;

export function AdminFlowSim({ variant }: { variant: "A" | "B" | "C" }) {
  return <PlatformSim cfg={variant === "A" ? adminA() : variant === "B" ? adminB() : adminC()} />;
}

/** One page as a picture (not clickable), with the dark numbered markers of the plan's clues. */
export function ShotOf({ which, page, marks = true }: { which: "bankdirect" | "bankphone" | "moveeasy" | "movephone"; page: string; marks?: boolean }) {
  const cfg = which === "bankdirect" ? bankDirect() : which === "bankphone" ? bankDirectPhone() : which === "moveeasy" ? moveEasy() : moveEasyPhone();
  return <PlatformShot cfg={cfg} page={page} marks={marks} />;
}
