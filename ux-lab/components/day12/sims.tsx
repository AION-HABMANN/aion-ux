"use client";

import { LearnAccess, Portal } from "@/components/day12/portals";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { cityWebsite, customerPortal } from "@/data/day12/platforms";

/**
 * Day 12 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.8. PublicAccess (Block 1.1) and CitizenConnect (Block 2.1) are portals with the plan's
 * barriers built in (components/day12/portals.tsx), the three LearnAccess redesigns (Block 1.2) are real lesson pages, and the organisation's website and customer
 * portal for Route 2 run on the shared mini-platform. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const PublicAccessSim = () => <Portal kind="publicaccess" />;
export const CitizenConnectSim = () => <Portal kind="citizenconnect" />;
export const LearnAccessSim = ({ variant }: { variant: "A" | "B" | "C" }) => <LearnAccess variant={variant} />;
export const WebsiteSim = () => <PlatformSim cfg={cityWebsite()} />;
export const CustomerPortalSim = () => <PlatformSim cfg={customerPortal()} />;
