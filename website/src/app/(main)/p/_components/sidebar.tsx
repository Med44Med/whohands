"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { Text } from "@/components/typography";
import Button from "@/components/Button";
import { IoIosArrowDown } from "react-icons/io";
import { categories } from "../../../../../public/categories";

import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { ImBin } from "react-icons/im";

import clsx from "clsx";
import { communes, wilayas } from "../../../../../public/location";
import {
  CategoryMenu,
  PriceMenu,
  LocationMenu,
} from "../_components/SideBarItems";

const Sidebar = ({ min = 1000, max = 8000 }: { min: number; max: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState({
    category: "all",
    subcategory: "all",
    min_price: min,
    max_price: max,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    for (const key of params.keys()) {
      setFilter((perv) => ({ ...perv, [key]: params.get(key) }));
    }
  }, [searchParams]);

  return (
    <div className="h-fit rounded-xl shadow w-1/5 bg-surface p-5 overflow-y-auto flex flex-col justify-start items-start gap-3">
      <CategoryMenu filter={filter} setFilter={setFilter} />
      <PriceMenu filter={filter} setFilter={setFilter} min={min} max={max} />
      <LocationMenu filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Sidebar;
