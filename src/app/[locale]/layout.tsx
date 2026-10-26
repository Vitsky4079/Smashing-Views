import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getContent, isLocale, locales, type Locale } from "@/content";
import { LocaleProvider } from "@/lib/i18n";
import { alternatesFor, localizeHref } from "@/lib/locale-utils";
import { IntroProvider } from "@/components/motion/IntroLoader";
import { PageTransitionProvider } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin", "latin-ext"], display: "swap" });
const sans = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin", "latin-ext"], display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.title, template: "%s | Smashing Views" },
    description: t.meta.description,
    applicationName: siteConfig.name,
    alternates: alternatesFor("/", locale),
    openGraph: {
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_GB",
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      url: localizeHref("/", locale),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#080a08",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Runs before first paint: returning visitors never see the intro overlay. */
const introScript = `try{if(sessionStorage.getItem("sv-intro-seen"))document.documentElement.dataset.intro="seen"}catch(e){}`;

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getContent(locale);
  return (
    <html lang={locale} suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
        <style>{`html[data-intro="seen"] .intro{display:none}`}</style>
      </head>
      <body>
        <Script id="intro-flag" strategy="beforeInteractive">{introScript}</Script>
        <LocaleProvider locale={locale}>
        <IntroProvider>
          <PageTransitionProvider>
            <SmoothScroll />
            <a
              href="#main"
              className="fixed left-4 top-4 z-[110] -translate-y-24 bg-green px-4 py-2 font-display text-sm font-semibold text-bg focus:translate-y-0"
            >
              {t.nav.skip}
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <div className="grain" aria-hidden="true" />
          </PageTransitionProvider>
        </IntroProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
