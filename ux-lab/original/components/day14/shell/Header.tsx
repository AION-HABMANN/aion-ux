import { MODULE_SUBTITLE, MODULE_TITLE } from '@/original/data/day14/tabs';

export function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-shell flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple text-base font-bold tracking-tight"
          >
            AI
          </span>
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight">AION UX Class</p>
            <p className="text-xs text-lilac/80">{MODULE_TITLE}</p>
          </div>
        </div>
        <p className="max-w-sm text-sm text-lilac sm:text-right">{MODULE_SUBTITLE}</p>
      </div>
    </header>
  );
}
