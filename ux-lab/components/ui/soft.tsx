"use client";

import { createContext, useContext } from "react";

/**
 * UX-STANDARD 2.22: on a day where no question is required, the "At least N characters." sentences in the help texts and the minimum in the
 * character counter would still read like a rule. This context tells the shared field components to drop them. The text is cut after it has been
 * translated, so it works in English and German alike.
 */
const SoftContext = createContext(false);
export const SoftProvider = SoftContext.Provider;
export const useSoft = () => useContext(SoftContext);

/** Removes "At least 60 characters." / "At least 2 complete rows." / "Mindestens 60 Zeichen." from a help text. */
export const softHelp = (s: string) => s.replace(/\s*(?:At least|Mindestens) \d+[^.]*\./g, "").trim();
