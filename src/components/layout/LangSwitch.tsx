"use client";

import { usePathname } from "next/navigation";
import { locales } from "@/content";
import { useLocale, useT } from "@/lib/i18n";
import { localizeHref, stripLocale } from "@/lib/locale-utils";
import { cn } from "@/lib/cn";
import { usePageTransition } from "@/components/motion/PageTransition";

/** PL / EN switch. Keeps the current page, query string and hash. */
export function LangSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const { navigate } = usePageTransition();

  const go = (target: (typeof locales)[number]) => {
    if (target === locale) return;
    navigate(localizeHref(stripLocale(pathname) + window.location.search + window.location.hash, target));
  };

  return (
    <div role="group" aria-label={t.lang.label} className={cn("flex items-center border border-line-strong", className)}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          aria-label={t.lang[l]}
          onClick={() => go(l)}
          className={cn(
            "min-h-10 min-w-10 px-2.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-colors",
            l === locale ? "bg-green text-bg" : "text-ink/70 hover:text-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
