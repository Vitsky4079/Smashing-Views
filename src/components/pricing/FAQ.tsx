"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { MaskText } from "@/components/motion/MaskText";

export function FAQ() {
  const t = useT();
  const f = t.pricing.faq;
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-line py-24 md:py-32" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label label-green mb-5">{f.eyebrow}</p>
          <MaskText id="faq-title" lines={f.title} className="h-lg" lineClassName={(i) => (i === 1 ? "text-green" : undefined)} />
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {f.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${base}-p${i}`}
                      id={`${base}-b${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={cn("font-display text-lg font-semibold transition-colors md:text-2xl", isOpen ? "text-green" : "text-ink group-hover:text-lime")}>{item.q}</span>
                      <span className={cn("flex size-10 shrink-0 items-center justify-center border transition-all duration-500", isOpen ? "rotate-45 border-green text-green" : "border-line-strong")}>
                        <Plus className="size-4" strokeWidth={1.75} aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${base}-p${i}`}
                        role="region"
                        aria-labelledby={`${base}-b${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 leading-relaxed text-mute">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
