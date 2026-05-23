import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboards/admin", "/public/user"];

const ADMIN_DASHBOARD_ROUTE = "/dashboards/admin";
const ADMIN_HOME_ROUTE = "/dashboards/admin/home";
const PUBLIC_ROUTE = "/public";

type TokenPayload = {
  role?: "USER" | "ADMIN";
  user?: {
    role?: "USER" | "ADMIN";
  };
};

const isRouteMatched = (pathname: string, route: string) => {
  return pathname === route || pathname.startsWith(`${route}/`);
};

const decodeTokenPayload = (token: string): TokenPayload | null => {
  try {
    const payload = token.split(".")[1];

    if (!payload) return null;

    const decodedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8"),
    ) as TokenPayload;

    return decodedPayload;
  } catch {
    return null;
  }
};

const getUserRoleFromToken = (token?: string) => {
  if (!token) return null;

  const payload = decodeTokenPayload(token);

  return payload?.role || payload?.user?.role || null;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    isRouteMatched(pathname, route),
  );

  const isPublicRoute = isRouteMatched(pathname, PUBLIC_ROUTE);
  const userRole = getUserRoleFromToken(token);
  const isAuthenticatedAdmin = Boolean(token) && userRole === "ADMIN";

  if (isAuthenticatedAdmin && isPublicRoute) {
    return NextResponse.redirect(new URL(ADMIN_HOME_ROUTE, request.url));
  }

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/public/auth/sign-in", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboards/admin/:path*", "/public/:path*"],
};
