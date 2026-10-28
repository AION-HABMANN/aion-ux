import Link from 'next/link';
import { EXTRAS } from '@/original/data/day9/routes';
import { Eyebrow } from '@/original/components/day9/ui';

/** The Extra shelf of Day 9 (UX-STANDARD 2.8, decision 8): what the author built that matches no plan item. */
export default function ExtraShelf() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <Eyebrow>Extra</Eyebrow>
        <h1 className="mt-2 text-34 sm:text-46">More to explore</h1>
        <p className="mt-3 text-16 text-ink-soft">
          Practice and tools that are not part of the tasks. Nothing here is in your answers, in the list of what is missing or in your export. Use it when you want to try a mechanic, or to come back to a case.
        </p>
        <p className="mt-3 text-14">
          <Link href="/day/9/original/" className="underline underline-offset-2">
            Back to the day
          </Link>
        </p>
      </header>
      <ul className="grid gap-4 md:grid-cols-2">
        {EXTRAS.map((e) => (
          <li key={e.href}>
            <Link href={e.href} className="card block h-full p-5 hover:shadow-lifted">
              <h2 className="text-20">{e.title}</h2>
              <p className="mt-2 text-14 text-ink-soft">{e.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
