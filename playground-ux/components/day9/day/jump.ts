/** Scroll to a part of the page (or a field), optionally focus it, and flash it so the eye finds it. */
export function jumpTo(id: string, opts: { block?: ScrollLogicalPosition; focus?: boolean } = {}): void {
  const el = document.getElementById(id) as HTMLElement | null;
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ block: opts.block ?? 'center', behavior: reduce ? 'auto' : 'smooth' });
  if (opts.focus !== false && 'focus' in el) el.focus({ preventScroll: true });
  el.classList.add('ring-2', 'ring-risk');
  window.setTimeout(() => el.classList.remove('ring-2', 'ring-risk'), 1600);
}
