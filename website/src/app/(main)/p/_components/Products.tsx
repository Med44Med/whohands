"use client";
import React from "react";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";
import { Title, Text } from "@/components/typography";
import { useEffect, useState } from "react";

const Products = ({products}) => {
  
  // console.log(products);
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const data = await fetch("https://fakestoreapi.com/products").then(
  //       (res) => res.json()
  //     );
  //     setProducts(data);
  //   };
  //   fetchProduct();
  // }, []);

  if (products?.length === 0) {
    return (
      <div className="bg-red-500 flex-1  h-full p-20">
        <Title size="big" className="w-full text-center ">
          No Products found !
        </Title>
        <Text size="normal" className="w-full text-center ">
          Please try to use another departement
        </Text>
      </div>
    );
  } else {
    return (
      <div className="flex-1 h-full px-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
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
  }
};

export default Products;
