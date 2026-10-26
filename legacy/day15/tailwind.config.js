/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Literal values, not var() references: Tailwind's `/opacity` modifier
      // cannot slice an alpha channel out of a CSS custom property. The same
      // tokens are mirrored as CSS variables in index.css for hand-written CSS
      // and for inline SVG fills.
      colors: {
        deep: '#0A0E14',
        panel: '#131A24',
        elevated: '#1B242F',
        subtle: '#263243',
        ink: '#E8EDF3',
        muted: '#8A99AC',
        signal: '#4CC9F0',
        valid: '#52D9A5',
        warn: '#F5B841',
        risk: '#EF5D6B',
        neuro: '#A78BFA',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.7' }],
      },
      boxShadow: {
        bloom: '0 18px 40px -18px rgba(76, 201, 240, 0.35), 0 2px 10px -4px rgba(0,0,0,0.6)',
        panel: '0 1px 0 0 rgba(255,255,255,0.02) inset, 0 12px 30px -22px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        grid: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(82, 217, 165, 0.45)' },
          '100%': { boxShadow: '0 0 0 14px rgba(82, 217, 165, 0)' },
        },
        'risk-bloom': {
          '0%, 100%': { boxShadow: 'inset 3px 0 0 0 rgba(239, 93, 107, 0.35)' },
          '50%': { boxShadow: 'inset 3px 0 0 0 rgba(239, 93, 107, 0.95), 0 0 30px -10px rgba(239,93,107,0.55)' },
        },
        'draw-in': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 400ms ease-out',
        'risk-bloom': 'risk-bloom 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
