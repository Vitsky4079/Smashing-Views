import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { alternatesFor, localizeHref } from "@/lib/locale-utils";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactGraphic } from "@/components/contact/ContactGraphic";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);
  return {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    alternates: alternatesFor("/contact", locale),
    openGraph: { title: t.meta.contactTitle, description: t.meta.contactDescription, url: localizeHref("/contact", locale) },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const c = siteConfig.contact;
  const hasContact = Boolean(c.email || c.phone || c.address);
  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} visual={<ContactGraphic />} accentLine={2} />

      <section id="formularz" className="relative scroll-mt-24 pb-28 pt-6 md:pb-40" aria-label={t.contact.form.title}>
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="panel h-[40rem]" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:col-span-4">
            <Reveal>
              <div className="border border-line p-6">
                <p className="label label-green mb-5">{t.contact.info.title}</p>
                {hasContact ? (
                  <ul className="space-y-4 text-sm">
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
                  <p className="text-sm leading-relaxed text-mute">{t.contact.info.missing}</p>
                )}
              </div>
              <p className="mt-4 flex items-start gap-3 border border-line px-5 py-4 text-sm text-ink/85">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green" strokeWidth={1.5} aria-hidden />
                {t.process.note}
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
