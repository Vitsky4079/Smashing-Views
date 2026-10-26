/**
 * Single source of truth for public RETAIL pricing (PLN).
 * Independent from supplier prices — never import supplier data here.
 */

import { currencyLabel } from "@/lib/locale-utils";
import type { Locale } from "@/content";

export const VIEWER_OPTIONS = [100, 200, 500, 1000] as const;
export const DURATION_OPTIONS = [60, 90, 120, 150] as const;

export type ViewerOption = (typeof VIEWER_OPTIONS)[number];
export type DurationOption = (typeof DURATION_OPTIONS)[number];

/** Retail price in whole PLN, indexed by duration then viewers. */
export const FACEBOOK_LIVE_PRICES: Record<DurationOption, Record<ViewerOption, number>> = {
  60: { 100: 50, 200: 100, 500: 250, 1000: 500 },
  90: { 100: 75, 200: 150, 500: 375, 1000: 750 },
  120: { 100: 100, 200: 200, 500: 500, 1000: 1000 },
  150: { 100: 125, 200: 250, 500: 625, 1000: 1250 },
};

export const DEFAULT_VIEWERS: ViewerOption = 500;
export const DEFAULT_DURATION: DurationOption = 90;

export function isViewerOption(v: number): v is ViewerOption {
  return (VIEWER_OPTIONS as readonly number[]).includes(v);
}
export function isDurationOption(v: number): v is DurationOption {
  return (DURATION_OPTIONS as readonly number[]).includes(v);
}

export function getFacebookLivePrice(viewers: ViewerOption, duration: DurationOption): number {
  return FACEBOOK_LIVE_PRICES[duration][viewers];
}

export function formatPLN(value: number, fractionDigits = 0, locale: Locale = "pl"): string {
  return currencyLabel(value, locale, fractionDigits);
}

/** Representative packages shown on the homepage (looked up from the matrix, not duplicated). */
export const PREVIEW_PACKAGES = [
  { id: "start", name: "START", viewers: 100, duration: 60 },
  { id: "boost", name: "BOOST", viewers: 500, duration: 90 },
  { id: "max", name: "MAX", viewers: 1000, duration: 120 },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  viewers: ViewerOption;
  duration: DurationOption;
}>;
