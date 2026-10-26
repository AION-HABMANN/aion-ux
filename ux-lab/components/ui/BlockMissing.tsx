"use client";

import { jumpTo } from "@/components/ui/MissingList";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";

/**
 * A live, rust "still missing" note under one answer block: every still-open item of that block, named concretely (CLAUDE.md #1), each
 * clickable to its exact field (#2). It filters the same MissingEntry list the Export bar's notice uses by the block's label prefix
 * ("Block X.Y:"), so nothing is computed twice. It reports presence, length or count, never whether a choice is right (#4, #16), so it is
 * never an answer. It disappears the instant the block's own requirement is met and reappears if a value is cleared again. An Optional
 * block's fields are already excluded from the missing computation, so it renders nothing there.
 */
export function BlockMissing({ block, missing }: { block: string; missing: MissingEntry[] }) {
  const lead = `Block ${block}`;
  const items = missing.filter((m) => m.label.startsWith(`${lead}:`));
  if (items.length === 0) return null;
  return (
    <div className="fade-in rounded-md border border-rust/40 bg-rustSoft p-3" role="status">
      <p className="smallcaps text-rust">{tt(`Still missing in ${lead}`, `Noch offen in ${lead}`)}</p>
      <ul className="mt-1.5 space-y-1">
        {items.map((m, i) => (
          <li key={`${m.id}-${i}`}>
            <button type="button" onClick={() => jumpTo(m)} className="text-left text-caption text-ink underline decoration-dotted underline-offset-2 hover:text-rust">
              {m.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
