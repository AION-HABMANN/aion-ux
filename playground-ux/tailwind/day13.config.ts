import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/(day13)/**/*.{ts,tsx}', './components/day13/**/*.{ts,tsx}', './data/day13/**/*.{ts,tsx}', './lib/day13/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#231A45',
        purple: '#5624D0',
        lilac: '#EEE9F9',
        ink70: '#4A4362',
        line: '#DDD6EE',
        success: '#1E8E5A',
        warn: '#B45309',
      },
      fontFamily: {
        sans: ['Calibri', '"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        chrome: '1120px',
      },
    },
  },
  plugins: [],
};

export default config;
