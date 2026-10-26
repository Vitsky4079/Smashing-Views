import { pl, type Content } from "./pl";
import { en } from "./en";

export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

const dictionaries: Record<Locale, Content> = { pl, en };

export function getContent(locale: Locale = defaultLocale): Content {
  return dictionaries[locale];
}

export type { Content };
