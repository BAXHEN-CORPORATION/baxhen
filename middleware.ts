import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set cookie if not already present
  if (!request.cookies.has("lang")) {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const prefersPortuguese = /^pt\b|pt-[A-Z]{2}/i.test(
      acceptLanguage.split(",")[0]?.trim() ?? "",
    );
    const lang = prefersPortuguese ? "pt" : "en";

    response.cookies.set("lang", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: "/((?!_next|api|audios|images|favicon).*)",
};
