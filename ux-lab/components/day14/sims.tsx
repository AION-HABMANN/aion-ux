"use client";

import { BuildVision, HealthSpace, IndustryXR } from "@/components/day14/portals";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { labNews, servicePortal } from "@/data/day14/platforms";

/**
 * Day 14 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. BuildVision (Block 1.1) is a real 3D device with AR labels, HealthSpace's three approaches
 * (Block 1.2) are the screens a patient would meet, and IndustryXR (Block 2.1) is the pilot board with a 3D training demo (components/day14/portals.tsx); the
 * company's service portal and lab news for Route 2 run on the shared mini-platform. The content is made up and nothing here is marked right or wrong.
 */
export const BuildVisionSim = () => <BuildVision />;
export const IndustryXRSim = () => <IndustryXR />;
export const HealthSpaceSim = ({ variant }: { variant: "A" | "B" | "C" }) => <HealthSpace variant={variant} />;
export const ServicePortalSim = () => <PlatformSim cfg={servicePortal()} />;
export const LabNewsSim = () => <PlatformSim cfg={labNews()} />;
