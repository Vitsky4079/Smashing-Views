import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/content";
import { localizeHref } from "@/lib/locale-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/pricing", "/contact"].map((path) => ({
    url: `${siteConfig.url}${localizeHref(path, "pl")}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${localizeHref(path, l)}`])),
    },
  }));
}
