import { z } from "zod";
import { CONTACT_PLATFORMS } from "@/data/services";
import { DURATION_OPTIONS } from "@/data/pricing";

const platformValues = CONTACT_PLATFORMS.map((p) => p.value) as [string, ...string[]];

const emptyToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120),
  email: z.string().trim().email("email").max(200),
  company: z.preprocess(emptyToUndefined, z.string().trim().max(160).optional()),
  platform: z.enum(platformValues, { message: "platform" }),
  viewers: z.preprocess(
    emptyToUndefined,
    z.coerce.number({ message: "viewers" }).int("viewers").min(1, "viewers").max(1_000_000, "viewers").optional(),
  ),
  duration: z.preprocess(
    emptyToUndefined,
    z.coerce
      .number()
      .refine((n) => (DURATION_OPTIONS as readonly number[]).includes(n), "duration")
      .optional(),
  ),
  broadcastAt: z.preprocess(emptyToUndefined, z.string().trim().max(40).optional()),
  link: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(500)
      .refine((v) => {
        try {
          return new URL(v).protocol === "https:";
        } catch {
          return false;
        }
      }, "link")
      .optional(),
  ),
  message: z.string().trim().min(10, "message").max(4000),
  /** Quoted price from the calculator — informational only, re-validated server side. */
  quotedPrice: z.preprocess(emptyToUndefined, z.coerce.number().int().min(0).max(1_000_000).optional()),
  consent: z.literal(true, { message: "consent" }),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional(),
  /** Epoch ms when the form was rendered — rejects instant bot submissions. */
  startedAt: z.coerce.number().optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

/** Maps zod issues to { field: messageKey } (message key = issue message set above). */
export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out as ContactFieldErrors;
}
