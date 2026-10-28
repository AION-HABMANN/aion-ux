import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, Public_Sans } from 'next/font/google';
import { CourseBar } from '@/original/components/chrome/CourseBar';

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
  title: 'Original idea · Neuro-UX Lab',
  description:
    'Days 9 and 10 of the AION UX class as they were first built, kept next to the Neuro-UX Lab.',
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
      <head>
        {/* Day 9's own stylesheet (original/tailwind/day9.config.ts), built by `npm run build:css`, as for Days 11 to 16. */}
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/css/day9.css`} />
      </head>
      <body>
        <CourseBar />
        {children}
      </body>
    </html>
  );
}
