import type { Metadata, Viewport } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
