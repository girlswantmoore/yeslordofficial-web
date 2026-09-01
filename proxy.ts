import { NextResponse, type NextRequest } from "next/server";
import { maintenanceAccessToken } from "./lib/maintenance-auth";

const PUBLIC_PATHS = ["/coming-soon", "/api/site-access"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/coming-soon") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-yeslord-maintenance-page", "1");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("yl_site_access")?.value;
  if (token === (await maintenanceAccessToken())) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-yeslord-maintenance-page", "1");
  return NextResponse.rewrite(new URL("/coming-soon", request.url), {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|m4v)$).*)"],
};
