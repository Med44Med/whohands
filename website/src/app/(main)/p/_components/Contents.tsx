"use client";
import React from "react";
import Sidebar from "./sidebar";
import { useState, useEffect, useCallback } from "react";
import Products from "./Products";
import { createClient } from "@/supabase/client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Text } from "@/components/typography";

const Contents = ({ data, count }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(data);
  const [productPage, setProductPage] = useState(1);
  const [sort, setSort] = useState(searchParams.get("Sort") || "Newest");

  useEffect(() => {
    setProducts(data)
  }, [data])
  

  const loadMore = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .range(productPage * 10, productPage * 10 + 9);
    if (error) {
      console.log(error);
      return;
    }
    setProducts((perv) => [...perv, ...data]);
    setProductPage(productPage + 1);
    setLoading(false);
  };

  console.log(products);
  

  return (
    <div className="w-full">
      <div className="w-full h-20 bg-surface px-20 p-3 flex justify-end items-end gap-5 shadow">
        <div className="flex justify-center items-center gap-3">
          <label htmlFor="">
            <Text>Sort :</Text>
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded outline-0 border border-gray-400 py-0 px-3  duration-150 focus:border-primary"
          >
            <option value="Newest">Newest</option>
            <option value="Popular">Popular</option>
            <option value="ASC">Ascending Price</option>
            <option value="DSC">Descending Price</option>
          </select>
        </div>
        <div className='flex justify-center items-center gap-3'>
          <Text>2X2</Text>
          <Text>3X3</Text>
          <Text>4X4</Text>
        </div>
      </div>
      <div className="w-full px-5 py-10 min-h-[calc(100vh-192px)] flex">
        <Sidebar />
        <Products products={products} />
      </div>
    </div>
  );
};

export default Contents;
