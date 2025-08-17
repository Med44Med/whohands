import React from "react";
import { createClient } from "../../../supabase/server";
import Sidebar from "../../../components/productsPage/sidebar";
import Contents from "../../../components/productsPage/Contents";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id,title,descreption,sub_category,owner(id,username,avatar_url)");

  if (error) {
    console.log(error);
  }

  return (
    <main className="w-screen pt-20 pb-5 px-5 flex justify-start items-start gap-10  bg-background md:h-screen md:px-10">
      <Sidebar />
      <Contents data={data} />
    </main>
  );
};

export default Page;
