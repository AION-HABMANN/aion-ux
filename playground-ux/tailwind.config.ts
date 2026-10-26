import type { Config } from 'tailwindcss';

/**
 * Every colour and every type size here maps to a CSS custom property declared
 * in `styles/globals.css`. Components must not invent values outside this
 * scale — see BUILD_PROMPT §4.
 */
export default {
  content: [
    './app/(course)/**/*.{js,ts,jsx,tsx,mdx}',
    './components/day9/**/*.{js,ts,jsx,tsx,mdx}',
    './data/day9/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/day9/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        paper: 'var(--paper)',
        raised: 'var(--raised)',
        console: 'var(--console)',
        'console-fg': 'var(--console-fg)',
        activation: 'var(--activation)',
        integrity: 'var(--integrity)',
        risk: 'var(--risk)',
        'risk-text': 'var(--risk-text)',
        inspect: 'var(--inspect)',
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      // Explicit type scale: 12 / 14 / 16 / 20 / 26 / 34 / 46 / 64
      fontSize: {
        '12': ['0.75rem', { lineHeight: '1.4' }],
        '14': ['0.875rem', { lineHeight: '1.5' }],
        '16': ['1rem', { lineHeight: '1.65' }],
        '20': ['1.25rem', { lineHeight: '1.5' }],
        '26': ['1.625rem', { lineHeight: '1.35' }],
        '34': ['2.125rem', { lineHeight: '1.2' }],
        '46': ['2.875rem', { lineHeight: '1.1' }],
        '64': ['4rem', { lineHeight: '1.02' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        raised: '0 1px 2px rgba(16, 24, 40, 0.06), 0 8px 24px -12px rgba(16, 24, 40, 0.18)',
        lifted: '0 2px 4px rgba(16, 24, 40, 0.08), 0 18px 40px -16px rgba(16, 24, 40, 0.28)',
        stamped: '0 1px 0 rgba(16, 24, 40, 0.18), 0 12px 28px -10px rgba(16, 24, 40, 0.42)',
      },
    },
  },
  plugins: [],
} satisfies Config;
