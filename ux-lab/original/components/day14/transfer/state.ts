'use client';

import type { QuadrantId } from '@/original/data/day14/transfer';

export type MatrixItem = { id: string; label: string; quadrant: QuadrantId | null };

export type DecisionCard = { domain: string; body: string };

export type TransferNotes = {
  anchors: string[];
  vision: string;
  decisions: DecisionCard[];
  matrix: MatrixItem[];
  risks: Record<string, string>;
  governance: Record<string, string>;
  escalation: string;
  uncertainty: Record<string, string>;
  statement: Record<string, string>;
};

export const EMPTY_NOTES: TransferNotes = {
  anchors: [],
  vision: '',
  decisions: [
    { domain: '', body: '' },
    { domain: '', body: '' },
    { domain: '', body: '' },
  ],
  matrix: [],
  risks: {},
  governance: {},
  escalation: '',
  uncertainty: {},
  statement: {},
};
