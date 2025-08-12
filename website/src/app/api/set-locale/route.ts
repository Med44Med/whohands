import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const COOKIE_NAME = "NEXT_LOCALE";
  const { searchParams } = new URL(request.url);
  
  const locale = searchParams.get("locale") || "en";
  const path = searchParams.get("path")

  
  const url = request.nextUrl.clone()
  url.pathname = path
   
  const response = NextResponse.redirect(url)
  response.cookies.set(COOKIE_NAME, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
