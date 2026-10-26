/**
 * Central site configuration. Contact details are NOT invented:
 * set them via environment variables (see .env.example). Unset values are hidden.
 */
const env = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : undefined);

export const siteConfig = {
  name: "Smashing Views",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",
  locale: "pl_PL",
  contact: {
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    address: env(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
    companyLegalName: env(process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME),
  },
  social: {
    facebook: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    instagram: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    tiktok: env(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK),
    youtube: env(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
  },
} as const;

export const nav = [
  { key: "home", href: "/" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
] as const;

export const legalLinks = [
  { key: "privacy", href: "/legal/privacy" },
  { key: "terms", href: "/legal/terms" },
  { key: "platforms", href: "/legal/platform-disclosure" },
] as const;
