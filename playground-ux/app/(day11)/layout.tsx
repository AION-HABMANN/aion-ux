import { CourseBar } from '@/components/chrome/CourseBar';
import type { Metadata } from "next";
import AppShell from "@/components/day11/AppShell";

export const metadata: Metadata = {
  title: "CityHelp Voice · AION Day 11 · Module 5",
  description:
    "An interactive playground for feeling what makes a voice or AI interface help — or get in the way.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day11.css`} />
      </head>
      <body>
        <CourseBar />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
