"use client";

import { FocusSense, LearningPulse, VisionMind } from "@/components/day15/portals";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { researchNews, servicePortal } from "@/data/day15/platforms";

/**
 * Day 15 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. FocusSense (Block 1.1) is a gaze recording you can replay and re-read, LearningPulse's
 * three approaches (Block 1.2) are the screens each would show, and VisionMind Lab (Block 2.1) is the research board with its first heatmap and an overload
 * detector demo (components/day15/portals.tsx); the company's service portal and lab news for Route 2 run on the shared mini-platform. The content is made up and
 * nothing here is marked right or wrong.
 */
export const FocusSenseSim = () => <FocusSense />;
export const VisionMindSim = () => <VisionMind />;
export const LearningPulseSim = ({ variant }: { variant: "A" | "B" | "C" }) => <LearningPulse variant={variant} />;
export const ServicePortalSim = () => <PlatformSim cfg={servicePortal()} />;
export const ResearchNewsSim = () => <PlatformSim cfg={researchNews()} />;
