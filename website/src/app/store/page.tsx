import React from "react";
import { createClient } from "@/supabase/server";
import Link from "next/link";

const page = async () => {
  const supabase = await createClient();
  const { count: products } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  console.log(products);

  return (
    <>
      <Link className="w-full bg-primary" href="/store/products/new">
        {products + " Products"}
      </Link>
      <Link className="w-full bg-primary" href="/store/products/new">
        {products + " Orders"}
      </Link>
      <Link className="w-full bg-primary" href="/store/products/new">
        {products + " Messages"}
      </Link>
    </>
  );
};

export default page;
