import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Footer, MentorBar, ParticipantStrip, TopBar } from '@/components/chrome/Chrome';

export const metadata: Metadata = {
  title: 'Neuro-UX Lab · Day 1',
  description: 'Day 1 of the UX course: psychological UX design and neuro design in the interface. Study cards, the plan’s tasks as free answers, and two working documents.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <MentorBar />
        <TopBar />
        <main id="main" className="mx-auto w-full max-w-[1100px] flex-1 px-4 pb-8 md:px-6">
          <ParticipantStrip />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
