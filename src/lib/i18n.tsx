"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getContent, type Content, type Locale } from "@/content";
import { localeNumberFormat } from "@/lib/locale-utils";

const LocaleContext = createContext<Locale>("pl");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/** Translated content for the active locale. */
export const useT = (): Content => getContent(useLocale());

/** Locale-aware integer formatter (1 000 vs 1,000). */
export function useNf(): Intl.NumberFormat {
  const locale = useLocale();
  return useMemo(() => localeNumberFormat(locale), [locale]);
}
