"use client";

// The ordered learning path plus the "n / 6 explored" counter.
// Collapses behind a menu button on small screens.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STOPS } from "@/original/lib/day11/navigation";
import { useProgress, resetAllProgress } from "@/original/lib/day11/storage";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { visited, count, total } = useProgress();

  function handleReset() {
    const ok = window.confirm(
      "Reset my progress? This clears your visited stops, your notes and your saved reactions from this browser."
    );
    if (ok) resetAllProgress();
  }

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-navy/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        aria-label="Learning path"
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-navy/10 bg-white transition-transform",
          "lg:sticky lg:top-[57px] lg:z-0 lg:h-[calc(100vh-57px)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3 lg:hidden">
          <span className="text-sm font-semibold">Learning path</span>
          <button
            type="button"
            onClick={onClose}
            className="aion-btn-ghost px-2.5 py-1"
            aria-label="Close the learning path menu"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-2 pb-2 aion-label">Learning path</p>
          <ol className="space-y-1">
            {STOPS.map((stop) => {
              const active = pathname.replace(/\/$/, "") === stop.href.replace(/\/$/, "");
              const done = stop.id > 0 && visited.includes(stop.id);
              return (
                <li key={stop.href}>
                  <Link
                    href={stop.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-card border px-3 py-2.5 transition-colors",
                      active
                        ? "border-purple bg-lilac"
                        : "border-transparent hover:border-navy/15 hover:bg-lilac/50",
                    ].join(" ")}
                  >
                    <span className="flex items-baseline gap-2">
                      <span
                        className={[
                          "shrink-0 text-xs font-semibold",
                          active ? "text-purple" : "text-navy/50",
                        ].join(" ")}
                      >
                        {stop.id}
                      </span>
                      <span className="text-sm font-medium leading-snug text-navy">
                        {stop.label}
                      </span>
                      {done && (
                        <span
                          className="ml-auto shrink-0 text-xs text-purple"
                          aria-label="Explored"
                          title="Explored"
                        >
                          ✓
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="border-t border-navy/10 px-4 py-4">
          <p className="aion-label">Progress</p>
          <p className="mt-1 text-sm text-navy" aria-live="polite">
            {count} / {total} explored
          </p>
          <div
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-lilac"
            role="progressbar"
            aria-valuenow={count}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Stops explored"
          >
            <div
              className="h-full bg-purple transition-all"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 text-xs text-navy/60 underline underline-offset-2 hover:text-purple"
          >
            Reset my progress
          </button>
        </div>
      </nav>
    </>
  );
}
