import "server-only";
import { CONTACT_PLATFORMS } from "@/data/services";
import { getFacebookLivePrice, isDurationOption, isViewerOption } from "@/data/pricing";
import type { ContactData } from "./contact-schema";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

export function isDeliveryConfigured() {
  const resend = process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL;
  return Boolean(resend || process.env.FORMSPREE_ENDPOINT);
}

/** Re-derives the price server-side; never trust the client-quoted amount. */
function verifiedPrice(d: ContactData): string {
  if (d.platform === "facebook-live" && d.viewers && d.duration && isViewerOption(d.viewers) && isDurationOption(d.duration)) {
    const price = getFacebookLivePrice(d.viewers, d.duration);
    return `${price} PLN (zgodnie z cennikiem)`;
  }
  return "wycena indywidualna";
}

function toPlain(d: ContactData): string {
  const platform = CONTACT_PLATFORMS.find((p) => p.value === d.platform)?.label.pl ?? d.platform;
  return [
    `Imię i nazwisko: ${d.name}`,
    `E-mail: ${d.email}`,
    `Firma: ${d.company ?? "-"}`,
    `Platforma / usługa: ${platform}`,
    `Liczba widzów: ${d.viewers ?? "-"}`,
    `Czas trwania: ${d.duration ? `${d.duration} min` : "-"}`,
    `Data i godzina transmisji: ${d.broadcastAt ?? "-"}`,
    `Link: ${d.link ?? "-"}`,
    `Cena: ${verifiedPrice(d)}`,
    "",
    "Wiadomość:",
    d.message,
  ].join("\n");
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function deliverContact(d: ContactData): Promise<DeliveryResult> {
  const text = toPlain(d);

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL,
          to: [process.env.CONTACT_TO_EMAIL],
          reply_to: d.email,
          subject: `Zapytanie ze strony: ${d.name}`,
          text,
          html: `<pre style="font-family:inherit;white-space:pre-wrap">${esc(text)}</pre>`,
        }),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "failed" };
    } catch {
      return { ok: false, reason: "failed" };
    }
  }

  if (process.env.FORMSPREE_ENDPOINT) {
    try {
      const res = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: d.name, email: d.email, message: text }),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "failed" };
    } catch {
      return { ok: false, reason: "failed" };
    }
  }

  return { ok: false, reason: "not_configured" };
}

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // optional layer
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}
