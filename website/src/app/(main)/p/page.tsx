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
  const params = await searchParams;

  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select(`
      title,
      photos,
      stores(title,avatar)   
      `);

  if (error) {
    console.log(error);
  }

  
  return (
    <main className="w-dvw min-h-screen pt-14 pb-5  flex flex-col justify-start items-start bg-background">
      <div className="relative h-36 w-full bg-primary flex justify-center items-center gap-1">
        <Title size='big' className="uppercase !font-black !text-background">
          {categories.filter((cat) => cat.slug===params.category)[0].name}
          {params.sub_category &&
            ` / ${categories.filter((cat) => cat.slug===params.category)[0].subCategories.filter(sub=> sub.slug === params.sub_category)[0].name}`}
        </Title>
      </div>
      <div className="sticky flex-1 w-full px-5 ">
        <Sidebar />
        <Contents products={data} />
      </div>
    </main>
  );
};

export default Page;
