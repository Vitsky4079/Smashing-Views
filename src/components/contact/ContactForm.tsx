"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useLocale, useNf, useT } from "@/lib/i18n";
import { CONTACT_PLATFORMS } from "@/data/services";
import { DURATION_OPTIONS, VIEWER_OPTIONS, formatPLN, getFacebookLivePrice, isDurationOption, isViewerOption } from "@/data/pricing";
import { contactSchema, toFieldErrors, type ContactFieldErrors } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";
import { TLink } from "@/components/ui/TLink";

type Status = "idle" | "sending" | "success" | "error" | "not_configured" | "rate_limited";
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2 block !text-[0.68rem]">
        {label}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-mute">{hint}</p>}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#ff8a7e]">
          <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const t = useT();
  const f = t.contact.form;
  const nf = useNf();
  const locale = useLocale();
  const params = useSearchParams();
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  // Prefill from pricing — values are validated; the displayed price is re-derived from the central matrix.
  const prefill = useMemo(() => {
    const service = params.get("service");
    const platform = CONTACT_PLATFORMS.some((p) => p.value === service) ? service! : "";
    const v = Number(params.get("viewers"));
    const d = Number(params.get("duration"));
    const viewers = Number.isInteger(v) && v > 0 && v <= 1_000_000 ? v : undefined;
    const duration = isDurationOption(d) ? d : undefined;
    const price = platform === "facebook-live" && viewers && duration && isViewerOption(viewers) ? getFacebookLivePrice(viewers, duration) : undefined;
    return { platform, viewers, duration, price };
  }, [params]);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const err = (k: keyof typeof f.errors) => (errors[k as keyof ContactFieldErrors] ? f.errors[k] : undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      platform: fd.get("platform"),
      viewers: fd.get("viewers"),
      duration: fd.get("duration"),
      broadcastAt: fd.get("broadcastAt"),
      link: fd.get("link"),
      message: fd.get("message"),
      quotedPrice: prefill.price,
      consent: fd.get("consent") === "on",
      website: fd.get("website") ?? "",
      startedAt: startedAt.current,
      turnstileToken: (fd.get("cf-turnstile-response") as string | null) ?? undefined,
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fe = toFieldErrors(parsed.error);
      setErrors(fe);
      setStatus("idle");
      requestAnimationFrame(() => {
        const first = Object.keys(fe)[0];
        (formRef.current?.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      });
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(raw) });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: ContactFieldErrors };
      if (res.status === 422 && body.fields) {
        setErrors(body.fields);
        setStatus("idle");
      } else if (body.error === "not_configured") setStatus("not_configured");
      else if (res.status === 429) setStatus("rate_limited");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="panel tick-corners p-8 sm:p-12" role="status">
        <CheckCircle2 className="size-10 text-green" strokeWidth={1.4} aria-hidden />
        <h3 className="display mt-6 text-3xl">{f.success.title}</h3>
        <p className="mt-3 max-w-md text-mute">{f.success.text}</p>
        <Button variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
          {f.success.again}
        </Button>
      </div>
    );
  }

  const banner =
    status === "error" ? f.failure : status === "not_configured" ? f.notConfigured : status === "rate_limited" ? f.rateLimited : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="panel tick-corners space-y-6 p-6 sm:p-10" key={params.toString()}>
      {TURNSTILE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}
      <h2 className="display text-[clamp(1.6rem,2.6vw,2.2rem)]">{f.title}</h2>

      {prefill.platform && (
        <div className="border border-green/40 bg-green/5 px-4 py-3 text-sm">
          <p className="label label-green">{f.prefill}</p>
          <p className="mt-1 text-ink/90">
            {CONTACT_PLATFORMS.find((p) => p.value === prefill.platform)?.label[locale]}
            {prefill.viewers ? ` · ${nf.format(prefill.viewers)}` : ""}
            {prefill.duration ? ` · ${prefill.duration} min` : ""}
            {prefill.price !== undefined && (
              <>
                {" · "}
                <span className="font-semibold text-green">{formatPLN(prefill.price, 2, locale)}</span>
              </>
            )}
          </p>
          {prefill.price !== undefined && <p className="mt-1 text-xs text-mute">{f.prefillPrice}</p>}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={f.name} error={err("name")}>
          <input id="name" name="name" autoComplete="name" required className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        </Field>
        <Field id="email" label={f.email} error={err("email")}>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        </Field>
        <Field id="company" label={f.company}>
          <input id="company" name="company" autoComplete="organization" className="field" />
        </Field>
        <Field id="platform" label={f.platform} error={err("platform")}>
          <select id="platform" name="platform" required defaultValue={prefill.platform} className="field" aria-invalid={!!errors.platform} aria-describedby={errors.platform ? "platform-err" : undefined}>
            <option value="" disabled>
              {f.platformPlaceholder}
            </option>
            {CONTACT_PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label[locale]}
              </option>
            ))}
          </select>
        </Field>
        <Field id="viewers" label={f.viewers} error={err("viewers")}>
          <input id="viewers" name="viewers" type="number" inputMode="numeric" min={1} list="viewer-presets" defaultValue={prefill.viewers ?? ""} className="field" aria-invalid={!!errors.viewers} aria-describedby={errors.viewers ? "viewers-err" : undefined} />
          <datalist id="viewer-presets">
            {VIEWER_OPTIONS.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>
        </Field>
        <Field id="duration" label={f.duration}>
          <select id="duration" name="duration" defaultValue={prefill.duration ?? ""} className="field">
            <option value="">{f.anyOption}</option>
            {DURATION_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d} min
              </option>
            ))}
          </select>
        </Field>
        <Field id="broadcastAt" label={f.date}>
          <input id="broadcastAt" name="broadcastAt" type="datetime-local" className="field" />
        </Field>
        <div className="sm:col-span-2">
          <Field id="link" label={f.link} hint={f.linkHint} error={err("link")}>
            <input id="link" name="link" type="url" inputMode="url" placeholder="https://" className="field" aria-invalid={!!errors.link} aria-describedby={errors.link ? "link-err" : "link-hint"} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="message" label={f.message} error={err("message")}>
            <textarea id="message" name="message" rows={5} required className="field resize-y" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
          </Field>
        </div>
      </div>

      {/* honeypot — hidden from humans and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {TURNSTILE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="dark" />}

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/85">
          <input type="checkbox" name="consent" className="peer sr-only" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-line-strong transition-all peer-checked:border-green peer-checked:bg-green peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
            <svg viewBox="0 0 12 12" className="size-3 text-bg opacity-0" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6l3 3 5-6" />
            </svg>
          </span>
          <span>
            {f.consent}{" "}
            <TLink href="/legal/privacy" className="u-link text-green">
              ({t.footer.legal.privacy})
            </TLink>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-err" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-[#ff8a7e]">
            <TriangleAlert className="size-3.5" aria-hidden />
            {f.errors.consent}
          </p>
        )}
      </div>

      {banner && (
        <p role="alert" className="flex items-start gap-3 border border-[#ff6b5e]/50 bg-[#ff6b5e]/10 px-4 py-3 text-sm text-ink">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#ff8a7e]" aria-hidden />
          {banner}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} icon={status !== "sending"} className="w-full sm:w-auto">
        {status === "sending" ? (
          <span className="flex items-center gap-3">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {f.sending}
          </span>
        ) : (
          f.submit
        )}
      </Button>
    </form>
  );
}
