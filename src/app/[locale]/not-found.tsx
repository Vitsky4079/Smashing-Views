"use client";

import { useT } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useT();
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-start justify-center gap-8 pt-24">
      <p className="label label-green">404</p>
      <h1 className="display text-[clamp(2.5rem,9vw,8rem)]">{t.notFound.title}</h1>
      <ButtonLink href="/">{t.notFound.back}</ButtonLink>
    </section>
  );
}
