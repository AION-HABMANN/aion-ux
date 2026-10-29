"use client";

import { FutureHub, NextWorld, RealityFlow } from "@/components/day16/portals";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { customerApp, innovationWiki } from "@/data/day16/platforms";

/**
 * Day 16 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. RealityFlow (Block 1.1) shows three prototypes with real 3D, FutureInteraction Hub's
 * three options (Block 1.2) are the plans each would put on the table, and NextWorld UX (Block 2.1) is the decision board (components/day16/portals.tsx); the
 * company's innovation wiki and customer app for Route 2 run on the shared mini-platform. The content is made up and nothing here is marked right or wrong.
 */
export const RealityFlowSim = () => <RealityFlow />;
export const NextWorldSim = () => <NextWorld />;
export const FutureHubSim = ({ option }: { option: "A" | "B" | "C" }) => <FutureHub option={option} />;
export const InnovationWikiSim = () => <PlatformSim cfg={innovationWiki()} />;
export const CustomerAppSim = () => <PlatformSim cfg={customerApp()} />;
