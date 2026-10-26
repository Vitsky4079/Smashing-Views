import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { isLivePanelConfigured, livePanel } from "@/lib/livepanel/client";
import { validateMapping } from "@/lib/livepanel/mapping";
import { LivePanelError } from "@/lib/livepanel/types";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorised(req: Request): boolean {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) return false;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Read-only mapping health check. Returns NO supplier rates / balances.
 * Requires `Authorization: Bearer $ADMIN_API_TOKEN`.
 */
export async function GET(req: Request) {
  if (!authorised(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!rateLimit("admin-livepanel", 20, 60_000)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  if (!isLivePanelConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const catalog = await livePanel.services();
    return NextResponse.json({ mappings: validateMapping(catalog) });
  } catch (e) {
    const code = e instanceof LivePanelError ? e.code : "upstream_error";
    return NextResponse.json({ error: code }, { status: code === "rate_limited" ? 429 : 502 });
  }
}
