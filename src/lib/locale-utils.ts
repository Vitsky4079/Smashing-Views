import { defaultLocale, locales, type Locale } from "@/content";

const intl: Record<Locale, string> = { pl: "pl-PL", en: "en-GB" };

export const localeNumberFormat = (locale: Locale, digits = 0) =>
  new Intl.NumberFormat(intl[locale], { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** Path as seen by the user: Polish is unprefixed, other locales use /<locale>. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (locale === defaultLocale) return href;
  const m = href.match(/^(\/[^?#]*)(.*)$/);
  if (!m) return href;
  const [, path, rest] = m;
  return `/${locale}${path === "/" ? "" : path}${rest}`;
}

/** Removes a leading locale segment (/en/pricing → /pricing). */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export function currencyLabel(value: number, locale: Locale, digits = 0): string {
  const n = localeNumberFormat(locale, digits).format(value);
  return locale === "pl" ? `${n} zł` : `PLN ${n}`;
}

/** Absolute-path alternates for hreflang. `path` is locale-free, e.g. "/pricing". */
export function alternatesFor(path: string, locale: Locale) {
  return {
    canonical: localizeHref(path, locale),
    languages: {
      pl: localizeHref(path, "pl"),
      en: localizeHref(path, "en"),
      "x-default": localizeHref(path, "pl"),
    },
  };
}
