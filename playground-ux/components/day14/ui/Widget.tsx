import type { ReactNode } from 'react';

export function Widget({
  index,
  title,
  tool,
  children,
  captions,
}: {
  index: number;
  title: string;
  tool: string;
  children: ReactNode;
  captions?: readonly string[];
}) {
  return (
    <section className="aion-card p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="aion-label">Widget {index}</span>
        <h3 className="text-lg font-bold text-navy">{title}</h3>
        <span className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy/60">
          {tool}
        </span>
      </div>
      {children}
      {captions && captions.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-lilac pt-4 text-sm text-navy/75">
          {captions.map((caption) => (
            <li key={caption} className="flex gap-2">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
              <span>{caption}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function SectionNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl bg-lilac px-3 py-2 text-sm text-navy/75">{children}</p>
  );
}
