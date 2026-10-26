import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { LiveDemo } from "@/components/home/LiveDemo";
import { Process } from "@/components/home/Process";
import { Why } from "@/components/home/Why";
import { PricingPreview } from "@/components/home/PricingPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
        }}
      />
      <Hero />
      <Services />
      <LiveDemo />
      <Process />
      <Why />
      <PricingPreview />
      <FinalCTA />
    </>
  );
}
