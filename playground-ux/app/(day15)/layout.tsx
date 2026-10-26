import type { Metadata } from 'next';
import { CourseBar } from '@/components/chrome/CourseBar';

export const metadata: Metadata = {
  title: 'Neuro-UX Lab · Module 7 · Day 2',
  description:
    'Module 7 · Day 2: Neuro-UX: eye-tracking, gaze behavior, neurofeedback and brain-computer interfaces. An executive decision lab.',
};

export default function Day15RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day15.css`} />
      </head>
      <body>
        <CourseBar />
        {children}
      </body>
    </html>
  );
}
