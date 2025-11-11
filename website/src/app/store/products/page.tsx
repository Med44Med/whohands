import React from "react";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import Contents from "./_components/contents";

const page = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const STORE_ID = cookieStore.get("STORE_ID");
  if (!STORE_ID) {
    return;
  }
  const { value } = STORE_ID;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store", value);
  if (error) {
    console.log(error);
  }

  return (
    <>
      <Contents data={data} />
    </>
  );
};

export default page;
