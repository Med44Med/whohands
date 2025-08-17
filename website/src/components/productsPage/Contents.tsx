"use client";
import React from "react";
import ProductCard from "../ProductCard";

const Contents = ({ data }) => {
  console.log(data);
  const past = [...data, ...data, ...data, ...data, ...data,...data, ...data, ...data, ...data, ...data];
  return (
    <div className="flex-1 rounded-xl grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
      {past.map((p, index) => (
        <ProductCard key={index} data={p} />
      ))}
    </div>
  );
};

export default Contents;
