"use client";
import React from "react";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";

const Contents = ({ products }) => {

  return (
    <div className="flex-1 rounded-xl grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
      {products.map((p, index) => (
        <ProductCard key={index} data={p} />
      ))}
      <Skeleton circle width={48} height={48} />
    </div>
  );
};

export default Contents;
