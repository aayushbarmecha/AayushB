import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Auth.js JWTs persist by default. This session-only marker makes the admin
  // inaccessible after the browser is closed, without weakening the JWT check.
  const hasBrowserSession = req.cookies.get("admin-browser-session")?.value === "1";
  const isLoggedIn = !!req.auth && hasBrowserSession;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (!isLoggedIn && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
