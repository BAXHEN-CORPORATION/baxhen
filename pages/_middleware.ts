import { NextRequest, NextResponse } from "next/server";
import { getSerializedLocale } from "utils";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  try {
    const userLocale =
      request.headers.get("accept-language")?.split(",")[0] || "";
    const locale = getSerializedLocale(userLocale);

    const shouldHandleLocale =
      !PUBLIC_FILE.test(request.nextUrl.pathname) &&
      !request.nextUrl.pathname.includes("/api/") &&
      request.nextUrl.locale === "default";

    if (shouldHandleLocale) {
      const url = request.nextUrl.clone();

      url.locale = locale;

      return NextResponse.redirect(url);
    }
  } catch (e) {
    console.log({ e });
  }

  return undefined;
}
