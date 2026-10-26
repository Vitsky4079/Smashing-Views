import "server-only";
import {
  LivePanelError,
  type LivePanelBalance,
  type LivePanelOrderStatus,
  type LivePanelService,
} from "./types";

/**
 * Minimal, server-only LivePanel API client (HTTP POST + API key in body).
 * - API key is read from env at call time and never logged or returned.
 * - Errors are normalised to LivePanelError with a generic message (no key, no raw body).
 * - Orders (`add`) are hard-gated: the website never places supplier orders from public
 *   interactions. See `assertOrdersEnabled`.
 */

const DEFAULT_URL = "https://livepanel.pro/api/v1";
const TIMEOUT_MS = 10_000;

function config() {
  const key = process.env.LIVEPANEL_API_KEY?.trim();
  if (!key) throw new LivePanelError("not_configured", "LivePanel API key is not configured.");
  return { key, url: process.env.LIVEPANEL_API_URL?.trim() || DEFAULT_URL };
}

export function isLivePanelConfigured(): boolean {
  return Boolean(process.env.LIVEPANEL_API_KEY?.trim());
}

async function call<T>(action: string, params: Record<string, string | number> = {}): Promise<T> {
  const { key, url } = config();
  const body = new URLSearchParams({ key, action, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal,
      cache: "no-store",
    });
    if (res.status === 429) throw new LivePanelError("rate_limited", "Supplier rate limit reached.", 429);
    if (res.status === 401 || res.status === 403) throw new LivePanelError("unauthorized", "Supplier rejected credentials.", res.status);
    if (!res.ok) throw new LivePanelError("upstream_error", "Supplier request failed.", res.status);

    let json: unknown;
    try {
      json = await res.json();
    } catch {
      throw new LivePanelError("invalid_response", "Supplier returned an unreadable response.");
    }
    if (json && typeof json === "object" && "error" in json) {
      // Do not forward supplier error text verbatim.
      throw new LivePanelError("upstream_error", "Supplier reported an error.");
    }
    return json as T;
  } catch (e) {
    if (e instanceof LivePanelError) throw e;
    if (e instanceof Error && e.name === "AbortError") throw new LivePanelError("timeout", "Supplier request timed out.");
    throw new LivePanelError("upstream_error", "Supplier request failed.");
  } finally {
    clearTimeout(timer);
  }
}

export const livePanel = {
  services: () => call<LivePanelService[]>("services"),
  status: (order: number) => call<LivePanelOrderStatus>("status", { order }),
  balance: () => call<LivePanelBalance>("balance"),

  /**
   * Submits a supplier order. INTENTIONALLY NOT WIRED to any public route.
   * Future use only from an authenticated, payment-confirmed workflow.
   */
  async add(input: { service: number; link: string; quantity: number }) {
    assertOrdersEnabled();
    return call<{ order: number }>("add", input);
  },
};

function assertOrdersEnabled() {
  if (process.env.LIVEPANEL_ORDERS_ENABLED !== "true") {
    throw new LivePanelError("orders_disabled", "Automated supplier orders are disabled.");
  }
}
