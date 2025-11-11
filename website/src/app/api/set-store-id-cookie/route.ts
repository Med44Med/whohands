import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("value");

  if (!id) {
    return NextResponse.json({ message: "no id provided" }, { status: 400 });
  }

  const res = NextResponse.json({ message: "cookie set", storeId: id });

  res.cookies.set("STORE_ID", id, {
    name: "STORE_ID",
    value: id,
    httpOnly: false, // set to true if you don't need to access it from client JS
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax", // good for normal same-site requests        // works for same-site requests
    secure: false, // required for SameSite=None
  });

  return res;
}
