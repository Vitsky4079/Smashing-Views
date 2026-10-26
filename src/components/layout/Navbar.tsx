"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { nav } from "@/config/site";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { LogoMark, Wordmark } from "@/components/brand/Logo";
import { TLink } from "@/components/ui/TLink";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { LangSwitch } from "./LangSwitch";
import { stripLocale } from "@/lib/locale-utils";

export function Navbar() {
  const t = useT();
  const pathname = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between transition-all duration-500 ease-out",
            scrolled
              ? "border border-line bg-bg/80 px-4 py-2.5 backdrop-blur-md sm:px-6"
              : "border border-transparent px-1 py-3 sm:px-3",
          )}
        >
          <TLink href="/" className="flex items-center gap-3" aria-label="Smashing Views">
            <LogoMark className="w-9" strokeWidth={9} />
            <Wordmark />
          </TLink>

          <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <TLink
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="u-link font-display text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink/80 transition-colors hover:text-ink"
              >
                {t.nav[item.key]}
              </TLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch className="hidden md:flex" />
            <div className="hidden md:block">
              <ButtonLink href="/pricing" className="!min-h-10 !px-5">
                {t.nav.cta}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              className="flex size-11 items-center justify-center border border-line-strong text-ink md:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}
