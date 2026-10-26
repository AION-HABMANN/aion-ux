"use client";

import { createContext, useContext } from "react";

/**
 * The day a page belongs to. Shared components (the material card, the "Draws on" chips, the reference list) read the day's own cards
 * through it, so they never fork per day. Day 1 is the default, so a page without a provider still works.
 */
const DayCtx = createContext<number>(1);

export const DayProvider = DayCtx.Provider;
export const useDay = () => useContext(DayCtx);
