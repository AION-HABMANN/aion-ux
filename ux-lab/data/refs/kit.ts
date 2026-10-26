import { t } from "@/lib/lang";

/** One source: the short chip shown on a card ("Norman 2013") and the full entry with what it is used for. English first; German when it is written. */
export const r = (chip: string, en: string, de?: string) => ({ chip, full: t(en, de) });
