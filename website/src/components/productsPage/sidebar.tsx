"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { Text } from "@/components/typography";
import Button from "@/components/Button";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState("Newest");
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of params.keys()) {
      setFilter((perv) => ({ ...perv, [key]: params.get(key) }));
    }
  }, []);

  const handleQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.replace(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  useEffect(() => {
    handleQueryString("Sort", sort);
  }, [sort]);

  const jsob = { name: "hello", username: "also hello" };
  const stringy = "brand_name:opel;author:mohammed";
  const stringo = stringy.split(";");
  for (const item in stringo) {
    console.log(item);
  }

  return (
    <div className="w-1/6 h-full rounded-xl p-3 shadow bg-surface overflow-y-auto flex flex-col justify-start items-start gap-3">
      <Text size="normal">Sort</Text>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="Newest">Newest</option>
        <option value="Popular">Popular</option>
        <option value="ASC">Asending Price</option>
        <option value="DSC">Decending Price</option>
      </select>
      <Text size="normal">Filter</Text>

      <div className="mt-auto w-full flex justify-center items-center gap-1">
        <button
          className="px-3 text-primary cursor-pointer hover:text-primary-hover"
          onClick={() => router.replace(`${pathname}?${newparams}`)}
        >
          Reset
        </button>
        <Button
          className="flex-1"
          title="Filter"
          onClick={() => router.replace(`${pathname}?${newparams}`)}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
