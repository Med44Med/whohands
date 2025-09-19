import React from "react";
import { createClient } from "@/supabase/server";

const page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select('*').eq('store',)
  return <div>Products</div>;
};

export default page;
