import React from "react";
import { createClient } from "@/supabase/server";
import Sidebar from "./_components/sidebar";
import Contents from "./_components/Contents";
import { Title, Text } from "@/components/typography";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  console.log(params);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id,title,descreption,sub_category,photos,owner(id,username,avatar_url),ratings_avg,ratings_count"
    );

  if (error) {
    console.log(error);
  }

  const products = await fetch("https://fakestoreapi.in/api/products").then(
    (res) => res.json()
  );

  return (
    <main className="w-dvw pt-14 pb-5  flex flex-col justify-start items-start bg-background">
      <div className="relative h-36 w-full bg-primary flex justify-center items-center gap-1">
        <Text className="uppercase !font-black !text-background" size="big">
          {params.category}
          {params.sub_category && ` / ${params.sub_category}`}
        </Text>
      </div>
      <div className="sticky flex-1 w-full px-5 ">
        <Sidebar />
        <Contents products={products.products} />
      </div>
    </main>
  );
};

export default Page;
