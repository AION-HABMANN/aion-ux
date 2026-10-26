import { CourseBar } from '@/components/chrome/CourseBar';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'AION Day 12 — Accessibility Playground',
  description:
    'Interactive warm-up, learning hub and reference for the AION Day 12 accessibility module: Learn, Training Ground and the assessment cases.',
};

export const viewport: Viewport = {
  themeColor: '#231A45',
  width: 'device-width',
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
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day12.css`} />
      </head>
      <body>
        <CourseBar />{children}</body>
    </html>
  );
}
