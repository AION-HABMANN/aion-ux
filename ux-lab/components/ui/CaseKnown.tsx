/**
 * "What is known and what is open" (DL-STANDARD section 14): a box in a case brief that settles, as qualitative Case assumptions, what an
 * experienced participant would otherwise ask the facilitator, and lists what stays open on purpose. Three columns: the plan's own facts, what is
 * clear (a Case assumption), what is open. Never a figure, never the cause the model solution finds. Used by Day 2 and Day 3 and by the free-form
 * engine (`brief.known` in a day's spec).
 */
export type KnownColumn = { title: string; items: string[] };

export function CaseKnown({ id, title, columns, note }: { id: string; title: string; columns: KnownColumn[]; note: string }) {
  return (
    <div id={id} className="rounded-lg border border-line bg-canvas p-3 text-caption">
      <p className="smallcaps">{title}</p>
      <div className={`mt-2 grid gap-3 ${columns.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="font-semibold text-ink">{c.title}</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
              {c.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-2 text-ash">{note}</p>
    </div>
  );
}
