import React from "react";
import { createClient } from "@/supabase/server";

import ShopsFilter from '../../../components/categories/ShopsFilter';
import Articles from '../../../components/categories/Articles';

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = await createClient();
  const params = await searchParams;

  const data = [{ name: "alpha" }, { name: "beta" }, { name: "gama" }];

  return (
    <main className="w-full min-h-screen mt-20 px-10 flex flex-col justify-start items-start gap-3">
      <ShopsFilter />
      <Articles data={data} />
    </main>
  );
};

export default Page;
