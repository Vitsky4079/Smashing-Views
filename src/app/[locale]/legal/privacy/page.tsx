import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { alternatesFor } from "@/lib/locale-utils";
import { LegalPage } from "@/components/ui/LegalPage";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: getContent(locale).legal.privacy.title,
    robots: { index: false, follow: true },
    alternates: alternatesFor("/legal/privacy", locale),
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage doc={getContent(locale).legal.privacy} />;
}
