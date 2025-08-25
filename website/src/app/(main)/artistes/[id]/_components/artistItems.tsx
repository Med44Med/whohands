"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { IoIosStar } from "react-icons/io";
import { SlGrid } from "react-icons/sl";
import { TfiViewList } from "react-icons/tfi";

const ArtistItems = ({ items }) => {
  const [displayGrid, setDisplayGrid] = useState(false);

  useEffect(() => {
    const ux = JSON.parse(localStorage.getItem("UX"));
    if (!ux) {
      localStorage.setItem("UX", JSON.stringify({ grid: false }));
      return
    }
    
    const { grid } = ux;
    if (!grid) {
        localStorage.setItem("UX", JSON.stringify({ grid: false }));
        return
    }

    if (grid) {
      setDisplayGrid(true);
    } else {
      setDisplayGrid(false);
    }
  }, []);

  const toggleGrid = () => {
    const ux = JSON.parse(localStorage.getItem("UX"));

    if (displayGrid) {
      const newUX = { ...ux, grid: false };
      localStorage.setItem("UX", JSON.stringify(newUX));
      setDisplayGrid(false);
    } else {
      const newUX = { ...ux, grid: true };
      localStorage.setItem("UX", JSON.stringify(newUX));
      setDisplayGrid(true);
    }
  };

  return (
    <div className="w-full px-3 flex flex-col select-none">
      <div className="py-1 w-full flex justify-between items-center">
        <h1 className="font-playfair font-black text-4xl text-text tracking-tighter">
          Products
        </h1>
        <div onClick={() => toggleGrid()} className="cursor-pointer">
          {displayGrid ? <TfiViewList /> : <SlGrid />}
        </div>
      </div>
      <div
        className={`w-full grid ${
          displayGrid
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        } gap-3`}
      >
        {items.length === 0 ? (
          <p className="w-full text-center py-3  font-light text-base text-text">
            there is no itemes.
          </p>
        ) : (
          items.map((item, index) => (
            <Link
              href={`#`}
              key={index}
              className={`group bg-primary rounded p-2 flex shadow duration-300 hover:shadow-xl gap-3 overflow-hidden ${
                displayGrid ? "flex-col w-[300px]" : "flex-row w-full"
              }`}
            >
              <picture className="overflow-hidden w-[300px] h-[300px] aspect-square rounded bg-red-500">
                <img
                  src="https://picsum.photos/id/95/300/300"
                  alt=""
                  className="bg-center bg-cover duration-300 group-hover:scale-105"
                />
              </picture>
              <div className="flex flex-col justify-start items-start gap-0">
                <p className="font-playfair font-black text-3xl text-white tracking-tighter">
                  {item}
                </p>
                <div className="flex justify-start items-center gap-1">
                  <IoIosStar className="text-white text-xs" />
                  <p className="text-white text-sm  font-bold">
                    5.0
                  </p>
                </div>
                <p className="mt-1  font-light text-xs text-white tracking-tight line-clamp-2 text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  et, expedita fuga perferendis at libero doloremque dolorum
                  praesentium repellat animi.
                </p>
                <p className="w-full mt-auto py-3  font-bold text-base text-white tracking-tighter text-end">
                  3 000,00 DA
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtistItems;
