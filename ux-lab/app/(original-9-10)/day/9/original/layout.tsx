import type { ReactNode } from 'react';
import { AppShell } from '@/original/components/day9/layout/AppShell';

export default function Day9Layout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
