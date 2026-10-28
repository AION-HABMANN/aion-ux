'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { cardInfo } from '@/original/data/day9/materi';
import { openCard } from '@/original/components/day9/learn/InlineCard';

/**
 * The old address of a card (/day/9/original/learn/<slug>/). Cards now open in place on their route page
 * (UX-STANDARD 2.11), so this sends anyone with an old link or bookmark to the right card there.
 */
export function CardRedirect() {
  const slug = useParams<{ slug: string }>()?.slug ?? '';
  const info = cardInfo(slug);
  const router = useRouter();
  const target = info ? `/day/9/original/${info.route.slug}/#mat-${info.code}` : '';

  useEffect(() => {
    if (!info) return;
    openCard(slug);
    router.replace(target);
  }, [info, slug, router, target]);

  if (!info) notFound();
  return (
    <p className="text-16">
      Cards now open on their route page.{' '}
      <Link href={target} className="underline underline-offset-2">
        Go to card {info.code}
      </Link>
      .
    </p>
  );
}
