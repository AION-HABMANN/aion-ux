import Link from 'next/link';
import { dayByNumber } from '@/original/data/course';

const WORKSHEETS = [
  ['Main material (Word)', 'main-material-interactive-website.docx'],
  ['Task 1: Direct observation of AI patterns', 'task1-direct-observation-of-ai-patterns.docx'],
  ['Task 2: Classifying the system behind the UX', 'task2-classifying-the-system-behind-the-ux.docx'],
  ['Task 3: Deep AI-UX audit of one tool', 'task3-deep-ai-ux-audit.docx'],
  ['Task 4: The strategic AI-UX decision', 'task4-strategic-ai-ux-decision.docx'],
] as const;

export const metadata = { title: 'Day 10 · Intelligent interfaces · AION UX class' };

export default function Day10() {
  const d = dayByNumber(10);
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <p className="font-mono text-12 uppercase tracking-wider text-ink-soft">
        Day 10 · Module 5 (1 of 2)
      </p>
      <h1 className="mt-2 font-display text-34 font-semibold tracking-tight">{d?.title}</h1>
      <p className="mt-4 max-w-3xl text-16 text-ink-soft">{d?.topic}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px,1fr]">
        <aside className="space-y-4">
          <section className="rounded-lg border border-hairline bg-raised p-4 text-14">
            <h2 className="font-display text-20 font-semibold">Worksheets</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {WORKSHEETS.map(([label, file]) => (
                <li key={file}>
                  <a className="underline underline-offset-2" href={`${base}/day10/worksheets/${file}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-ink-soft">
              The author&rsquo;s tasks on real AI tools. They are not yet written on the plan&rsquo;s
              cases (SmartAssist, CareerNavigator, CareGuide); see UX-STANDARD, decision 2.
            </p>
          </section>
          <p className="text-14">
            <Link href="/" className="underline underline-offset-2">
              Back to all days
            </Link>
          </p>
        </aside>

        <section aria-label="Day 10 companion page">
          <iframe
            // A static host (Vercel) serves the page only at its folder address `/day10/companion/`; `next dev` serves
            // `public/` files only by their file name. One address per mode.
            src={`${base}/day10/companion/${process.env.NODE_ENV === 'development' ? 'index.html' : ''}`}
            title="Day 10 companion page"
            className="h-[85vh] w-full rounded-lg border border-hairline bg-white"
          />
        </section>
      </div>
    </main>
  );
}
