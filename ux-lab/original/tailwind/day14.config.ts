import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/(original-14)/**/*.{ts,tsx}', './original/components/day14/**/*.{ts,tsx}', './original/data/day14/**/*.{ts,tsx}', './original/lib/day14/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#231A45',
        purple: '#5624D0',
        lilac: '#EEE9F9',
        // Muted amber + muted teal are permitted for Training Ground badges only.
        amber: { muted: '#B7791F' },
        teal: { muted: '#2C7A7B' },
      },
      fontFamily: {
        sans: [
          'Calibri',
          'Carlito',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(35,26,69,0.06), 0 6px 18px rgba(35,26,69,0.06)',
        soft: '0 1px 3px rgba(35,26,69,0.08)',
      },
      maxWidth: {
        shell: '1120px',
      },
    },
  },
  plugins: [],
};

export default config;
