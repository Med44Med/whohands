import { cache } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/supabase/server";

import Link from "next/link";

import Slider from "../../../../components/itemPage/Slider";
import ItemDetails from "../../../../components/itemPage/ItemDetails";

const getItem = cache(async (item: string,from:string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(from)
    .select("*")
    .eq("title", item); // to change to ID later

  return { data, error };
});

type Props = {
  params: Promise<{ item: string }>;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const item = (await params).item;
//   const { data, error } = await getItem(item);
//   if (error) {
//     console.log(error);
//   }

//   console.log(data);

//   // const description = data[0]?.description;

//   // function capitalizeFirstLetter(str) {
//   //   if (typeof str !== "string" || str.length === 0) {
//   //     return str;
//   //   }
//   //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   // }

//   // return {
//   //   title: `JoysMaker | ${capitalizeFirstLetter(item)}`,
//   //   description,
//   // };
// }

const Page = async ({ params }: { params: { item: string } }) => {
  const { item } = await params;
  const { data, error } = await getItem(item,"articles");
  if (error) {
    console.log(error);
  }

  console.log(data);
  
  const article = data[0];

  return (
    <main className="w-screen h-fit pt-20 pb-5 px-5 flex flex-col justify-start items-start gap-3 overflow-hidden bg-background md:h-screen md:px-10">
      <div className="flex justify-center items-center gap-2">
        <Link
          className="text-text-text text-base font-medium font-poppins leading-normal"
          href="/"
        >
          Home
        </Link>
        <span className="text-text-text text-xs font-medium font-poppins leading-normal">
          /
        </span>
        <Link
          className="text-text-text text-base font-medium font-poppins leading-normal"
          href="/"
        >
          Dresses
        </Link>
      </div>
      <div className="w-full h-[calc(100vh-200px)] bg-surface shadow rounded-xl overflow-hidden flex flex-col justify-start items-start md:flex-row">
        <Slider
          images={[
            "https://picsum.photos/id/236/1000/600",
            "https://picsum.photos/id/250/1000/600",
            "https://picsum.photos/id/44/1000/600",
            "https://picsum.photos/id/1/1000/600",
            "https://picsum.photos/id/99/1000/600",
          ]}
        />
        <ItemDetails item={article} />
      </div>
    </main>
  );
};

export default Page;
