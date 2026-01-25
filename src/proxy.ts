import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

const isProd = process.env.NODE_ENV === "production";
const USE_SUBDOMAIN_ROUTING = process.env.USE_SUBDOMAIN_ROUTING === "true";
const AUTH_HOST = process.env.BETTER_AUTH_URL
  ? new URL(process.env.BETTER_AUTH_URL).hostname
  : "localhost";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /images (inside /public for static files)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|images/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const search = url.search;
  const hostname = req.headers.get("host") || "";

  const sessionCookie = getCookieCache(req, {
    cookieName: "better_auth_session",
  });

  const isHomeHost = hostname === AUTH_HOST || hostname.startsWith("localhost");

  /**
   * --------------------------------
   * 🌍 PROD — SUBDOMAIN MODE
   * --------------------------------
   * Enable by setting USE_SUBDOMAIN_ROUTING=true and BASE_DOMAIN in .env
   */
  if (isProd && USE_SUBDOMAIN_ROUTING) {
    // 🏠 Home routes (main domain)
    if (isHomeHost) {
      return NextResponse.rewrite(
        new URL(`/home${pathname}${search}`, req.url),
      );
    }

    // 🔒 All app subdomains require auth
    if (!sessionCookie) {
      const callbackUrl = encodeURIComponent(req.url);

      return NextResponse.redirect(
        `https://${AUTH_HOST}/sign-in?callbackUrl=${callbackUrl}`,
      );
    }

    // 🛠 admin subdomain → /admin routes
    // Uncomment when you add admin pages
    // if (hostname.startsWith("admin.")) {
    //   return NextResponse.rewrite(
    //     new URL(`/admin${pathname}${search}`, req.url),
    //   );
    // }

    return NextResponse.next();
  }

  /**
   * --------------------------------
   * 🚧 LOCAL DEV — PATH MODE
   * --------------------------------
   * Routes are accessed via path prefixes (e.g., /admin/*)
   */

  // 🏠 Home routes (everything not under /admin)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL(`/home${pathname}${search}`, req.url));
  }

  // 🔒 Protected routes require auth
  // Uncomment when you add protected pages
  // if (!sessionCookie) {
  //   const callbackUrl = encodeURIComponent(req.url);
  //   return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, req.url));
  // }

  return NextResponse.next();
}
