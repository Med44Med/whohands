import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/supabase/server";
import { categories } from "../../../public/categories";

const MainLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const supabase = await createClient();
  // const kitchen = await supabase
  //   .from("products")
  //   .select("id,title,thumbnail,price")
  //   .eq("category", "kitchen")
  //   .limit(2)
  //   .order("views", { ascending: false });
  // if (kitchen.error) {
  //   console.log(kitchen.error);
  // }

  // const fetchData = async () => {
  //   let headerData = {};
  //   for (let i = 0; i < categories.length; i++) {
  //     const { data, error } = await supabase
  //       .from("products")
  //       .select("id, title, thumbnail, price")
  //       .eq("category", categories[i].slug)
  //       .limit(2)
  //       .order("views", { ascending: false });

  //     if (error) {
  //       console.error("Supabase error:", error);
  //       continue; // skip this category instead of stopping everything
  //     }

  //     headerData = { ...headerData, [categories[i].slug]: data };
  //     return headerData;
  //   }

  //   return headerData;
  // };
  // const data = fetchData()
  // console.log(data);

  const results = await Promise.all(
    categories.map(async (cat) => {
      const { data, error } = await supabase
        .from("products")
        .select("id, title, thumbnail, price")
        .eq("category", cat.slug)
        .limit(2)
        .order("views", { ascending: false });

      if (error) {
        console.error(`Error fetching ${cat.slug}:`, error);
        return { [cat.slug]: [] };
      }

      return { [cat.slug]: data };
    })
  );

  const headerData = Object.assign({}, ...results);

  return (
    <>
      <Header data={headerData} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
