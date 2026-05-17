import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboards/admin", "/public/user"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/public/auth/sign-in", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboards/admin/:path*", "/public/user/:path*"],
};
