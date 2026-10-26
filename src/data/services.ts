/**
 * Public service catalog (marketing layer).
 * - `enabled`: set to false to hide a category/offer everywhere on the site.
 * - `retailPrice`: PLN retail price, or null → "Wycena indywidualna".
 * Never store supplier (wholesale) costs here. Supplier mapping lives in
 * `src/lib/livepanel/mapping.ts` (server only).
 *
 * OWNER: confirm each enabled entry against the real, currently available offer.
 */

import type { Locale } from "@/content";

export type Localized = Record<Locale, string>;

export type ServiceCategoryId =
  | "facebook-live"
  | "youtube-live"
  | "facebook-video"
  | "instagram"
  | "tiktok"
  | "other";

export type ServiceOffer = {
  id: string;
  /** Polish label shown to customers. */
  label: Localized;
  /** Retail price in PLN. null = individual quote. */
  retailPrice: number | null;
  enabled: boolean;
};

export type ServiceCategory = {
  id: Exclude<ServiceCategoryId, "facebook-live">;
  platform: Localized;
  enabled: boolean;
  offers: ServiceOffer[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "youtube-live",
    platform: { pl: "YouTube LIVE", en: "YouTube LIVE" },
    enabled: true,
    offers: [
      { id: "yt-live-viewers", label: { pl: "Widzowie transmisji LIVE", en: "LIVE broadcast viewers" }, retailPrice: null, enabled: true },
      { id: "yt-live-duration", label: { pl: "Dobór czasu trwania usługi", en: "Choice of service duration" }, retailPrice: null, enabled: true },
    ],
  },
  {
    id: "facebook-video",
    platform: { pl: "Facebook — wideo", en: "Facebook — video" },
    enabled: true,
    offers: [
      { id: "fb-video-views", label: { pl: "Wyświetlenia materiałów wideo", en: "Video content views" }, retailPrice: null, enabled: true },
      { id: "fb-reels-views", label: { pl: "Wyświetlenia Reels", en: "Reels views" }, retailPrice: null, enabled: true },
    ],
  },
  {
    id: "instagram",
    platform: { pl: "Instagram", en: "Instagram" },
    enabled: true,
    offers: [
      { id: "ig-reels-views", label: { pl: "Wyświetlenia Reels", en: "Reels views" }, retailPrice: null, enabled: true },
      { id: "ig-live", label: { pl: "Widzowie transmisji LIVE", en: "LIVE broadcast viewers" }, retailPrice: null, enabled: true },
    ],
  },
  {
    id: "tiktok",
    platform: { pl: "TikTok", en: "TikTok" },
    enabled: true,
    offers: [
      { id: "tt-video-views", label: { pl: "Wyświetlenia wideo", en: "Video views" }, retailPrice: null, enabled: true },
      { id: "tt-live", label: { pl: "Widzowie transmisji LIVE", en: "LIVE broadcast viewers" }, retailPrice: null, enabled: true },
    ],
  },
  {
    id: "other",
    platform: { pl: "Pozostałe usługi social media", en: "Other social media services" },
    enabled: true,
    offers: [{ id: "other-custom", label: { pl: "Usługi spoza katalogu — na zapytanie", en: "Services outside the catalog — on request" }, retailPrice: null, enabled: true }],
  },
];

export const enabledCategories = () =>
  SERVICE_CATEGORIES.filter((c) => c.enabled)
    .map((c) => ({ ...c, offers: c.offers.filter((o) => o.enabled) }))
    .filter((c) => c.offers.length > 0);

/** Platform choices for the contact form select. */
export const CONTACT_PLATFORMS = [
  { value: "facebook-live", label: { pl: "Facebook LIVE", en: "Facebook LIVE" } },
  { value: "youtube-live", label: { pl: "YouTube LIVE", en: "YouTube LIVE" } },
  { value: "facebook-video", label: { pl: "Facebook — wideo", en: "Facebook — video" } },
  { value: "instagram", label: { pl: "Instagram", en: "Instagram" } },
  { value: "tiktok", label: { pl: "TikTok", en: "TikTok" } },
  { value: "other", label: { pl: "Inna usługa / jeszcze nie wiem", en: "Other service / not sure yet" } },
] as const;

export type ContactPlatformValue = (typeof CONTACT_PLATFORMS)[number]["value"];
