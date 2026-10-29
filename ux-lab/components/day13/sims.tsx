"use client";

import { JobAccess, LifeGuide, StudyPath } from "@/components/day13/portals";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { lgApp, lgWebsite } from "@/data/day13/platforms";

/**
 * Day 13 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. StudyPath (Block 1.1), the three JobAccess designs (Block 1.2) and LifeGuide (Block 2.1)
 * are built with the plan's load factors (components/day13/portals.tsx); the organisation's website and app for Route 2 run on the shared mini-platform. Own
 * colours only; the content is made up and nothing here is marked right or wrong.
 */
export const StudyPathSim = () => <StudyPath />;
export const LifeGuideSim = () => <LifeGuide />;
export const JobAccessSim = ({ variant }: { variant: "A" | "B" | "C" }) => <JobAccess variant={variant} />;
export const WebsiteSim = () => <PlatformSim cfg={lgWebsite()} />;
export const AppSim = () => <PlatformSim cfg={lgApp()} />;
