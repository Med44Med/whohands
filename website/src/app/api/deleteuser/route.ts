import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";


export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { error } = await supabase.auth.admin.deleteUser(user.id);
  console.log(error);
  

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Account deleted successfully ✅" });
}
