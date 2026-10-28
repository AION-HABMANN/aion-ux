import { CardRedirect } from '@/original/components/day9/learn/CardRedirect';
import { concepts } from '@/original/data/day9/concepts';

// Static export needs the list of pages up front.
export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export default function Page() {
  return <CardRedirect />;
}
