// Shared types for the CityHelp Voice playground.
// Kept in one place so every component/lib file agrees on shape.

export type LensId =
  | "comprehensibility"
  | "error_robustness"
  | "user_control"
  | "predictability"
  | "mental_relief"
  | "trust";

export type Direction = "strengthens" | "weakens";

export interface Lens {
  id: LensId;
  name: string;
  question: string;
}

export type ChatRole = "user" | "system";

export interface ChatLine {
  role: ChatRole;
  text: string;
}

export interface Moment {
  id: string; // "T1" .. "T6"
  title: string;
  lines: ChatLine[];
  feeling: string;
  primaryLens: LensId;
  direction: Direction;
  expertReading: string;
}

export interface SortingItem {
  id: string;
  text: string;
  lens: LensId;
  direction: Direction;
  why: string;
}

export type VariantId = "A" | "B" | "C";

export type RatingLevel = "High" | "Medium" | "Low";

export interface VariantProfile {
  id: VariantId;
  name: string;
  subtitle: string;
  comfort: RatingLevel;
  comprehensibility: RatingLevel;
  robustness: RatingLevel;
  control: RatingLevel;
  cost: RatingLevel;
}

export type UserPersona = "tech_savvy" | "elderly_first_time";

export interface RiskUseCase {
  id: string;
  label: string;
  frequency: "high" | "low";
  risk: "high" | "low";
}
