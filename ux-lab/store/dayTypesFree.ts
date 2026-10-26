/**
 * The persisted state of a "free-form" day (DL-STANDARD v1.1; Days 4 to 6 and later days built to the standard): one route is a set of maps keyed by the
 * field ids of the day's spec (lib/dayFree/spec.ts). Every free-text field and list is a string in `text`; a list or an assessment that can also be
 * answered as a table keeps both layouts and `modes` says which one counts; a fixed choice (the plan's own options) is in `picks`.
 */
export type FreeRoute = {
  text: Record<string, string>;
  modes: Record<string, "text" | "table">;
  rows: Record<string, Record<string, string>[]>;
  assessText: Record<string, Record<string, string>>;
  assessRows: Record<string, Record<string, Record<string, string>>>;
  picks: Record<string, string | null>;
};
export type FreeState = { r1: FreeRoute; r2: FreeRoute };
