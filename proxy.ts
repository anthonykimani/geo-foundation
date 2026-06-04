import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  if (host.includes("geo-foundation.vercel.app")) {
    return NextResponse.next();
  }

  const now = Date.now();
  const start = new Date("2026-06-04T00:00:00+03:00").getTime();
  const end = new Date("2026-06-04T16:00:00+03:00").getTime();

  if (now >= start && now < end) {
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon|coming-soon).*)"],
};
