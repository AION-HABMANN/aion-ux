import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, Public_Sans } from 'next/font/google';
import { CourseBar } from '@/components/chrome/CourseBar';
import '@/styles/globals.css';

/**
 * Typography (§4). Self-hosted at build time, so there is no render-blocking
 * request to a third party and no flash of fallback type.
 *   Display — Bricolage Grotesque, used sparingly
 *   Body    — Public Sans, all running text
 *   Mono    — IBM Plex Mono, Inspector labels and every number
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display-face',
  display: 'swap',
});

const body = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body-face',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono-face',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AION UX class',
  description:
    'Psychological UX and neuro-design: study material and playgrounds, Days 1 to 16.',
};

export const viewport: Viewport = {
  themeColor: '#0B1220',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-inspector="off"
      data-darkpattern="off"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      style={
        {
          '--font-display': `var(--font-display-face), ui-sans-serif, system-ui, sans-serif`,
          '--font-body': `var(--font-body-face), ui-sans-serif, system-ui, sans-serif`,
          '--font-mono': `var(--font-mono-face), ui-monospace, SFMono-Regular, monospace`,
        } as React.CSSProperties
      }
    >
      <body>
        <CourseBar />
        {children}
      </body>
    </html>
  );
}
