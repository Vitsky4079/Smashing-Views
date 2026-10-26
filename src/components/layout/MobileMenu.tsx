"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { nav } from "@/config/site";
import { useT } from "@/lib/i18n";
import { getLenis } from "@/lib/lenis";
import { LogoMark, Wordmark } from "@/components/brand/Logo";
import { TLink } from "@/components/ui/TLink";
import { ButtonLink } from "@/components/ui/Button";
import { LangSwitch } from "./LangSwitch";

const ease = [0.76, 0, 0.24, 1] as const;

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const t = useT();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock scroll, ESC to close, focus management.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      getLenis()?.start();
    };
  }, [open, onClose]);

  // Close when the route changes.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-bg md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative flex items-center justify-between px-5 pt-6">
            <div className="flex items-center gap-3">
              <LogoMark className="w-9" />
              <Wordmark />
            </div>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.nav.closeMenu} className="flex size-11 items-center justify-center border border-line-strong">
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav aria-label="Menu" className="relative mt-16 flex flex-1 flex-col gap-1 px-5">
            {nav.map((item, i) => (
              <div key={item.href} className="overflow-hidden">
                <motion.div
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "105%" }}
                  transition={{ duration: 0.7, ease, delay: 0.12 + i * 0.07 }}
                >
                  <TLink
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="display flex items-baseline gap-4 py-3 text-[clamp(2.6rem,13vw,4.5rem)] text-ink aria-[current=page]:text-green"
                  >
                    <span className="label !text-[0.65rem]">0{i + 1}</span>
                    {t.nav[item.key]}
                  </TLink>
                </motion.div>
              </div>
            ))}
          </nav>

          <motion.div
            className="relative px-5 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5 } }}
            exit={{ opacity: 0 }}
          >
            <LangSwitch className="mb-4 w-fit" />
            <ButtonLink href="/pricing" onClick={onClose} className="w-full">
              {t.nav.cta}
            </ButtonLink>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
