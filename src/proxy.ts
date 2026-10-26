import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing: Polish (default) lives at unprefixed URLs (rewritten to /pl/...),
 * English lives under /en. `/pl/...` is redirected to the clean URL.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/pl" || pathname.startsWith("/pl/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/pl${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|opengraph-image|.*\\..*).*)"],
};
