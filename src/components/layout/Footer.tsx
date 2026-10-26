"use client";

import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { legalLinks, nav, siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import { LogoMark, Wordmark } from "@/components/brand/Logo";
import { TLink } from "@/components/ui/TLink";

export function Footer() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const c = siteConfig.contact;
  const hasContact = Boolean(c.email || c.phone || c.address);

  // Giant wordmark emerges from below as the footer scrolls into view.
  useGsapContext(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      "[data-giant]",
      { yPercent: 38, opacity: 0.4 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
      },
    );
    return () => ScrollTrigger.getAll().forEach((s) => s.trigger === root.current && s.kill());
  }, root);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-bg">
      <div className="wrap relative z-10 grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark className="w-12" />
            <Wordmark className="!text-lg" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.navTitle} className="md:col-span-2">
          <p className="label mb-5">{t.footer.navTitle}</p>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <TLink href={n.href} className="u-link text-sm text-ink/85 hover:text-ink">
                  {t.nav[n.key]}
                </TLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label mb-5">{t.footer.contactTitle}</p>
          {hasContact ? (
            <ul className="space-y-3 text-sm text-ink/85">
              {c.email && (
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-green" strokeWidth={1.75} aria-hidden />
                  <a className="u-link" href={`mailto:${c.email}`}>{c.email}</a>
                </li>
              )}
              {c.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-green" strokeWidth={1.75} aria-hidden />
                  <a className="u-link" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
                </li>
              )}
              {c.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={1.75} aria-hidden />
                  <span>{c.address}</span>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-mute">{t.footer.contactMissing}</p>
          )}
          <TLink href="/contact" className="u-link mt-5 inline-block text-sm text-green">
            {t.footer.contactFormLink}
          </TLink>
        </div>

        <div className="md:col-span-2">
          <p className="label mb-5">{t.footer.legalTitle}</p>
          <ul className="space-y-3">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <TLink href={l.href} className="u-link text-sm text-ink/85 hover:text-ink">
                  {t.footer.legal[l.key]}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        data-giant
        aria-hidden="true"
        className="display pointer-events-none select-none whitespace-nowrap text-center leading-[0.8] text-transparent"
        style={{ fontSize: "clamp(3rem, 15.2vw, 15rem)", WebkitTextStroke: "1.5px rgba(127,227,75,0.85)" }}
      >
        SMASHING VIEWS
      </div>

      <div className="wrap relative z-10 flex flex-col gap-4 border-t border-line py-7 text-sm text-mute md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl leading-relaxed text-mute">{t.footer.disclaimer}</p>
        <p className="shrink-0 text-ink/70">
          © {new Date().getFullYear()} {siteConfig.contact.companyLegalName ?? siteConfig.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
