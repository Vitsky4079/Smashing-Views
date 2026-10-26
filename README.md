# Smashing Views — marketing website

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion · Lenis · Lucide.
Polish (default, unprefixed URLs) and English (`/en/...`) with a PL/EN switch.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

Copy `.env.example` → `.env.local` and fill what you need. The site works with **no** env vars; the contact form then reports honestly that delivery is not configured.

## Where things live

| What | Where |
|---|---|
| Retail prices (PLN matrix, durations, viewer options) | `src/data/pricing.ts` — the only place prices exist |
| Additional services / `enabled` flags / "Wycena indywidualna" | `src/data/services.ts` |
| Contact details, social links (env-driven, hidden when empty) | `src/config/site.ts` + `.env.example` |
| All copy (PL + EN, same typed shape) | `src/content/pl/index.ts`, `src/content/en/index.ts` — add a locale by adding a dictionary and extending `src/content/index.ts` |
| Locale routing | `src/proxy.ts` (Polish rewritten to `/pl`, `/en` untouched), `src/app/[locale]/*`, helpers in `src/lib/locale-utils.ts`, switch in `src/components/layout/LangSwitch.tsx` |
| Design tokens (colours, type, grid, grain, glow) | `src/app/globals.css` |
| Motion system | `src/components/motion/*`, `src/lib/gsap.ts`, `src/lib/lenis.ts` |
| Hero choreography | `src/components/home/Hero.tsx`, `NetworkCanvas.tsx`, `LiveDashboard.tsx` |
| Contact form (client + server validation share one zod schema) | `src/lib/contact-schema.ts`, `src/app/api/contact/route.ts` |
| LivePanel supplier layer (server-only) | `src/lib/livepanel/*` |

## Contact form delivery

Set one of: `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`, or `FORMSPREE_ENDPOINT`. Optional Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`). Built-in: honeypot, minimum fill time, per-IP rate limit (in-memory — swap for Redis/Upstash on multi-instance hosting), server-side re-derivation of the quoted price.

## LivePanel integration (future automation)

Server-only (`import "server-only"`). The API key is read from `LIVEPANEL_API_KEY` at call time and never logged or returned. Supplier `rate` is never copied into public data. `livePanel.add()` is not wired to any route and throws unless `LIVEPANEL_ORDERS_ENABLED=true`; real ordering needs a separate authenticated, payment-confirmed workflow. `GET /api/admin/livepanel` (Bearer `ADMIN_API_TOKEN`) validates the package→service-ID mapping against the live catalog and returns no pricing. Details: `src/lib/livepanel/README.md`.

## Before going live

- Fill the real contact details (env), review `/legal/*` — they are drafts marked as such.
- Confirm every enabled entry in `src/data/services.ts` against what you can really deliver.
- Validate supplier service IDs (`src/lib/livepanel/mapping.ts`) against the live catalog.
- Set `NEXT_PUBLIC_SITE_URL` to the production origin (canonical URLs, sitemap, Open Graph).
