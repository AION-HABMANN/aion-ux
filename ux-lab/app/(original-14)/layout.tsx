import { CourseBar } from '@/original/components/chrome/CourseBar';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'AION UX · Module 7 Day 1 — Immersive Technologies & Neuroscience UX Foundations',
  description:
    'A learning playground for immersive-technology UX concepts: explore the ideas, then work the frozen case material in your worksheets.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#231A45',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day14.css`} />
      </head>
      <body>
        <CourseBar />{children}</body>
    </html>
  );
}
