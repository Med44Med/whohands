"use client";

import React from "react";
import { useState, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineGpsFixed } from "react-icons/md";


const ShopsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showCategory, setShowCategory] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);

  const hideAll = () => {
    setShowCategory(false);
    setShowLocation(false);
    setShowRating(false);
    setShowSortBy(false);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return pathname + "?" + params.toString();
    },
    [searchParams, pathname]
  );

  const handleUrl = (name: string, value: string) => {
    const url = createQueryString(name, value);
    setShowCategory(false);
    router.push(url);
  };

  return (
    <div className="w-full flex justify-start items-center gap-5">
      <div className="relative bg-text-secondary px-3 py-2 rounded-lg ">
        <div
          onClick={() => {
            hideAll();
            setShowCategory(!showCategory);
          }}
          className="flex justify-center items-center gap-5 cursor-pointer duration-300 hover:bg-text-secondary-hover"
        >
          <p className="text-sm  font-medium select-none">
            Category
          </p>
          <IoIosArrowDown
            className={`text-lg  font-medium duration-300 ${
              showCategory && "rotate-180"
            }`}
          />
        </div>
        {showCategory && (
          <div className="absolute top-full left-0 w-[calc(100vw-90px)] h-72 bg-surface mt-2 rounded shadow-lg p-3">
            <p onClick={() => handleUrl("category", "candies")}>candies</p>
            <p onClick={() => handleUrl("category", "spoon")}>spoon</p>
          </div>
        )}
      </div>
      <div className="relative bg-text-secondary px-3 py-2 rounded-lg">
        <div
          onClick={() => {
            hideAll();
            setShowLocation(!showLocation);
          }}
          className="flex justify-center items-center gap-5 cursor-pointer duration-300 hover:bg-text-secondary-hover"
        >
          <p className="text-sm  font-medium select-none">
            Location
          </p>
          <IoIosArrowDown
            className={`text-lg  font-medium duration-300 ${
              showLocation && "rotate-180"
            }`}
          />
        </div>
        {showLocation && (
          <div className="absolute top-full left-0 w-96 h-72 bg-surface mt-2 rounded shadow-lg p-3 flex flex-col gap-1">
            <div className='w-full flex flex-col justify-start items-start gap-1'>
              <p>Wilaya :</p>
                <select className="w-full py-2 ">
                  <option value="ain defla">Ain Defla</option>
                  <option value="ain defla">Alger</option>
                  <option value="ain defla">Setif</option>
                  <option value="ain defla">Oran</option>
                </select>
            </div>
            <div className='w-full flex flex-col justify-start items-start gap-1'>
              <p>Commune :</p>
                <select className="w-full py-2 ">
                  <option value="ain defla">Ain Defla</option>
                  <option value="ain defla">Alger</option>
                  <option value="ain defla">Setif</option>
                  <option value="ain defla">Oran</option>
                </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsFilter;
