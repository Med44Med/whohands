import React from "react";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import Contents from "./_components/contents";
import { Title } from "@/components/typography";

const page = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const { value } = cookieStore.get("STORE_ID");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store", value);
  if (error) {
    console.log(error);
  }
  console.log(data);

  return (
    <>
      
      <Contents data={data} />
    </>
  );
};

export default page;
