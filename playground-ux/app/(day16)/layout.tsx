import { CourseBar } from '@/components/chrome/CourseBar';
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/day16/shell/Header";
import { Footer } from "@/components/day16/shell/Footer";

export const metadata: Metadata = {
  title: "AION Day 16 — Immersive Prototyping, Future Strategy & Ethics",
  description:
    "A teaching instrument for Module 7 Day 3: the maturity ladder, the test bench, the portfolio room and the NextWorld UX assessment case.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day16.css`} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-navy">
        <CourseBar />
        <ColourVisionFilter />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

/**
 * Deterministic deuteranopia matrix used by stress test S1. Inline so the app
 * makes no network request for any asset.
 */
function ColourVisionFilter() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
      <defs>
        <filter id="aion-cvd-deuteranopia" colorInterpolationFilters="linearRGB">
          <feColorMatrix
            type="matrix"
            values="0.625 0.375 0 0 0
                    0.700 0.300 0 0 0
                    0     0.300 0.700 0 0
                    0     0     0     1 0"
          />
        </filter>
      </defs>
    </svg>
  );
}
