"use client";
import React from "react";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";
import { Title, Text } from "@/components/typography";

const Contents = ({ products }) => {
  return (
    <div className="flex-1 rounded-xl grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
      {products.map((p, index) => (
        <div key={index} className="w-full flex flex-col">
          <div className="w-full bg-white h-96 flex justify-center items-center rounded-xl overflow-hidden">
            <picture>
              <source srcSet={p.image} />
              <img
                src="../../../public/icon.png"
                alt={p.title}
                className=" w-full h-auto bg-cover bg-center"
              />
            </picture>
          </div>
          <Text size="normal" className="pl-1 pt-3 line-clamp-2">
            {p.title}
          </Text>
          <Text size="large" className="pl-1 !text-text-muted ">
            {p.price} $
          </Text>
        </div>
      ))}
    </div>
  );
};

export default Contents;
