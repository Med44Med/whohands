import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("value");

  if (!id) {
    return NextResponse.json({ message: "no id" });
  }

  const res = NextResponse.json({ message: "cookie set" });

  res.headers.set("Access-Control-Allow-Origin", "http://127.0.0.1");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers","Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  res.cookies.set("STORE_ID", id, {
    sameSite: "None",
    path: "/",
    secure:false,
      httpOnly: false,
  });

  return res;
}
