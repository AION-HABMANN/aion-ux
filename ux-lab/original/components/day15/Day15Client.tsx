'use client';

import dynamic from 'next/dynamic';

// Day 15 was a Vite app with a HashRouter; it is mounted here on the client only,
// as it was, so /day/15/#/learn/... works from one static page.
const Day15App = dynamic(() => import('./Day15App'), {
  ssr: false,
  loading: () => <p style={{ padding: 24 }}>Loading Neuro-UX Lab…</p>,
});

export function Day15Client() {
  return <Day15App />;
}
