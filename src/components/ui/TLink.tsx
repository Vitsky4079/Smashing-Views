"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/motion/PageTransition";
import { useLocale } from "@/lib/i18n";
import { localizeHref } from "@/lib/locale-utils";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** next/link with animated route transitions. External / modified clicks fall through. */
export function TLink({ href: rawHref, onClick, children, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const href = localizeHref(rawHref, useLocale());
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
