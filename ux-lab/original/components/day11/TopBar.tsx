// Slim top bar, present on every page. Part of the AION house style.

export default function TopBar({ onToggleMenu }: { onToggleMenu?: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-purple bg-white">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {onToggleMenu && (
            <button
              type="button"
              onClick={onToggleMenu}
              className="aion-btn-ghost px-2.5 py-1.5 lg:hidden"
              aria-label="Open the learning path menu"
            >
              <span aria-hidden="true" className="text-base leading-none">
                ≡
              </span>
            </button>
          )}
          <span className="text-sm font-semibold text-navy">
            AION · Intelligent Interfaces
          </span>
        </div>
        <span className="text-sm text-navy/60">Day 11 · Module 5</span>
      </div>
    </header>
  );
}
