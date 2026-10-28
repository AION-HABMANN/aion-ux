import { CourseBar } from '@/original/components/chrome/CourseBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AION UX · Module 6 · Inclusive Design Patterns',
  description:
    'Learning playground for neurodiversity in UX: learn the eight categories, practise spotting barriers, and analyse four frozen assessment cases.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day13.css`} />
      </head>
      <body>
        <CourseBar />{children}</body>
    </html>
  );
}
