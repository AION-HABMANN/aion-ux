import { useReducedMotion } from 'framer-motion'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** framer-motion returns `boolean | null` before hydration; we want a plain boolean. */
export function useReduced(): boolean {
  return useReducedMotion() ?? false
}

export const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Rough word count used by the writing coverage checkers. Never a score. */
export const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0)

/** Case-insensitive "does this text touch any of these signals" test. */
export function matchesAny(text: string, signals: string[]): boolean {
  const t = text.toLowerCase()
  return signals.some((s) => t.includes(s.toLowerCase()))
}

export const euro = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
