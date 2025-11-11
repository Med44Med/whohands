import React from "react";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";

import { Title } from "@/components/typography";
import Button from "@/components/Button";
import { useState } from "react";

const ProductsHeader = () => {
  const [display, setDisplay] = useState<boolean>(false);
  return (
    <header className="w-full bg-white p-3 flex justify-between items-center rounded-xl mb-3">
      <div className="shadow flex justify-center items-center bg-gray-300 rounded-xl relative">
        <div
          style={{ transform: display ? "translateX(100%)" : "translateX(0%)" }}
          className="absolute bg-white left-1 top-1 w-[calc(50%-4px)] h-[calc(100%-8px)] z-0 rounded-xl transition-all shadow"
        />
        <FaList className="z-10 m-3 cursor-pointer flex-1"  onClick={()=>setDisplay(false)}/>
        <IoGridOutline className="z-10 m-3 cursor-pointer flex-1 " onClick={()=>setDisplay(true)} />
      </div>
      <div className="w-full flex justify-end items-center gap-3">
        <input
          type="text"
          className="outline-0 border border-text-muted px-3 py-1 rounded"
          placeholder="Search..."
        />
      </div>
        <Button title="Add a Product" />
    </header>
  );
};

export default ProductsHeader;
