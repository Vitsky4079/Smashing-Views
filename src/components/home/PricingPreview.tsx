"use client";

import { motion } from "motion/react";
import { useLocale, useNf, useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { PREVIEW_PACKAGES, formatPLN, getFacebookLivePrice } from "@/data/pricing";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";


/** Three representative Facebook LIVE packages; prices are looked up from the central matrix. */
export function PricingPreview() {
  const t = useT();
  const nf = useNf();
  const locale = useLocale();
  const p = t.preview;
  return (
    <section id="cennik" className="relative border-t border-line py-28 md:py-40" aria-labelledby="preview-title">
      <div className="wrap">
        <p className="label label-green mb-6">{p.eyebrow}</p>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <MaskText id="preview-title" lines={p.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />
          <Reveal className="max-w-sm">
            <p className="text-sm leading-relaxed text-mute">{p.note}</p>
          </Reveal>
        </div>

        <Reveal stagger={0.12} className="mt-16 grid items-stretch gap-4 md:grid-cols-3">
          {PREVIEW_PACKAGES.map((pkg) => {
            const featured = pkg.id === "boost";
            const price = getFacebookLivePrice(pkg.viewers, pkg.duration);
            return (
              <motion.article
                key={pkg.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={cn(
                  "tick-corners lum-border relative flex flex-col justify-between p-7 lg:p-9",
                  featured ? "border border-green bg-surface shadow-[0_0_0_1px_rgba(127,227,75,.25),0_30px_90px_-40px_rgba(127,227,75,.55)] md:-my-5 md:py-14" : "panel",
                )}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className={cn("display text-3xl", featured && "text-green")}>{pkg.name}</h3>
                    <span className="label">Facebook LIVE</span>
                  </div>
                  <dl className="mt-10 space-y-5">
                    <div>
                      <dt className="label">{p.viewers}</dt>
                      <dd className="display mt-1 text-5xl tabular-nums">{nf.format(pkg.viewers)}</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-line pt-5">
                      <dt className="label">{pkg.duration} {p.minutes}</dt>
                    </div>
                  </dl>
                </div>
                <div className="mt-12">
                  <p className="display text-[clamp(2.4rem,4vw,3.4rem)] tabular-nums text-ink">{formatPLN(price, 0, locale)}</p>
                  <ButtonLink href={`/pricing?viewers=${pkg.viewers}&duration=${pkg.duration}#kalkulator`} variant={featured ? "primary" : "ghost"} className="mt-6 w-full">
                    {p.pick}
                  </ButtonLink>
                </div>
              </motion.article>
            );
          })}
        </Reveal>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/pricing" variant="ghost">
            {p.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
