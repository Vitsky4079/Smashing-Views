import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { alternatesFor, localizeHref } from "@/lib/locale-utils";
import { isDurationOption, isViewerOption } from "@/data/pricing";
import { PageHero } from "@/components/ui/PageHero";
import { PricingHeroVisual } from "@/components/pricing/PricingHeroVisual";
import { Configurator } from "@/components/pricing/Configurator";
import { AdditionalServices } from "@/components/pricing/AdditionalServices";
import { FAQ } from "@/components/pricing/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);
  return {
    title: t.meta.pricingTitle,
    description: t.meta.pricingDescription,
    alternates: alternatesFor("/pricing", locale),
    openGraph: { title: t.meta.pricingTitle, description: t.meta.pricingDescription, url: localizeHref("/pricing", locale) },
  };
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function PricingPage({ params, searchParams }: { params: Params; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const sp = await searchParams;
  const v = Number(first(sp.viewers));
  const d = Number(first(sp.duration));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.pricing.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
        }}
      />
      <PageHero
        eyebrow={t.pricing.eyebrow}
        title={t.pricing.title}
        sub={t.pricing.sub}
        visual={<PricingHeroVisual />}
        labels={["PLN", "60 / 90 / 120 / 150 MIN", "100 — 1000"]}
      />
      <Configurator initialViewers={isViewerOption(v) ? v : undefined} initialDuration={isDurationOption(d) ? d : undefined} />
      <AdditionalServices />
      <FAQ />
      <FinalCTA />
    </>
  );
}
