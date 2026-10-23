import { NextResponse, type NextRequest } from "next/server";

// English lives at the root ("/studio"), Arabic under "/ar" ("/ar/studio").
// Internally every route sits under app/[lang], so root paths are rewritten
// to "/en/…" and any explicit "/en/…" URL is redirected to its clean form.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ar" || pathname.startsWith("/ar/")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and anything that looks like a file (photos, logo, favicon).
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
