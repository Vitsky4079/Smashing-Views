"use client";

import { useLocale, useT } from "@/lib/i18n";
import { enabledCategories } from "@/data/services";
import { formatPLN } from "@/data/pricing";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** Only enabled categories/offers are rendered; null price → "Wycena indywidualna". */
export function AdditionalServices() {
  const t = useT();
  const locale = useLocale();
  const a = t.pricing.additional;
  const categories = enabledCategories();
  if (categories.length === 0) return null;

  return (
    <section id="uslugi" className="relative scroll-mt-24 border-t border-line py-24 md:py-32" aria-labelledby="additional-title">
      <div className="wrap">
        <p className="label label-green mb-5">{a.eyebrow}</p>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <MaskText id="additional-title" lines={a.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />
          <p className="max-w-xs text-mute">{a.sub}</p>
        </div>

        <Reveal stagger={0.08} className="mt-14 divide-y divide-line border-y border-line">
          {categories.map((cat, i) => (
            <article key={cat.id} className="group grid gap-6 py-8 transition-colors duration-500 hover:bg-surface/50 md:grid-cols-12 md:items-center md:px-4">
              <div className="flex items-baseline gap-5 md:col-span-4">
                <span className="label transition-colors group-hover:text-green">0{i + 1}</span>
                <h3 className="display text-[clamp(1.5rem,2.4vw,2.2rem)]">{cat.platform[locale]}</h3>
              </div>
              <ul className="space-y-3 md:col-span-5">
                {cat.offers.map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-4 border-b border-line/60 pb-3 text-sm last:border-0 last:pb-0">
                    <span className="text-ink/85">{o.label[locale]}</span>
                    <span className="label shrink-0 !text-ink/90">{o.retailPrice === null ? a.quote : formatPLN(o.retailPrice, 2, locale)}</span>
                  </li>
                ))}
              </ul>
              <div className="md:col-span-3 md:text-right">
                <ButtonLink href={`/contact?service=${cat.id}#formularz`} variant="ghost" className="w-full md:w-auto">
                  {a.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
