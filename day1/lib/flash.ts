/**
 * Jump to a part of the page and flash it so the eye finds it (CLAUDE.md #2). A part inside a closed fold is opened first by the
 * caller. Reduced motion keeps the flash as a static outline (styles/globals.css).
 */
export function jumpTo(id: string, opts: { focus?: boolean; block?: ScrollLogicalPosition } = {}): void {
  const el = document.getElementById(id) as HTMLElement | null;
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ block: opts.block ?? 'center', behavior: reduce ? 'auto' : 'smooth' });
  if (opts.focus !== false && 'focus' in el) el.focus({ preventScroll: true });
  el.classList.remove('anim-flash-warn');
  void el.offsetWidth;
  el.classList.add('anim-flash-warn');
  window.setTimeout(() => el.classList.remove('anim-flash-warn'), 1400);
}
