import { createClient } from "@/supabase/server";
import Sidebar from "./_components/sidebar";
import Contents from "./_components/Contents";
import { Title, Text } from "@/components/typography";
import { categories } from "../../../../public/categories";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const supabase = await createClient();

  let filterParams;

  const { category, subcategory, filter, sort } = await searchParams;
  if (filter) {
    filterParams = JSON.parse(filter);
    console.log(filterParams);
  }

  let query = supabase
    .from("products")
    .select("title,photos,price,stores(title,avatar)", { count: "estimated" });

  if (category) {
    query = query.eq("category", category);
  }
  if (subcategory) {
    query = query.eq("sub_category", subcategory);
  }

  //Filter here

  if (sort) {
    switch (sort) {
      case "newest":
        query = query.order("created_at", { ascending: false });
      case "popular":
        query = query.order("views", { ascending: false });
      case "asc":
        query = query.order("price", { ascending: false });
      case "dsc":
        query = query.order("price", { ascending: true });
      default:
        break;
    }
  }

  const { count, data, error } = await query.limit(10);

  if (error) {
    console.log(error);
  }
  console.log(data);
  

  return (
    <main className="w-full min-h-screen pt-24 pb-5  flex flex-col justify-start items-start bg-background">
      <div className="relative h-24 w-full bg-primary-hover flex justify-center items-center gap-1">
        <Text size="big" className="uppercase !font-black !text-4xl text-white">
          {category}
          {subcategory && ` / ${subcategory}`}
        </Text>
      </div>
      <Contents data={data} count={count} />
    </main>
  );
};

export default Page;
