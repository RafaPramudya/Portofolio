import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Every page lives under /id or /en. The bare root goes to Indonesian, and any
 * unknown top-level path is redirected into the default locale so it renders
 * the localized 404 instead of a bare framework one.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (isLocale(segment)) {
    return NextResponse.next();
  }

  const localizedPath = pathname === "/" ? "" : pathname;
  const target = new URL(`/${defaultLocale}${localizedPath}`, request.url);
  target.search = search;

  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|.*\\..*).*)"],
};
