"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { RiArrowDropRightLine } from "react-icons/ri";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";

import { Text, Title } from "@/components/typography";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ data }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [someValue, reRender] = useState(0);

  useEffect(() => {
    const wishlist: string[] = JSON.parse(localStorage.getItem("wishlist"));
    if (!wishlist) {
      localStorage.setItem("wishlist", JSON.stringify([]));
      return;
    }
    if (wishlist.includes(data?.id)) {
      return setIsLiked(true);
    } else {
      return setIsLiked(false);
    }
  }, [someValue, data?.id]);

  const handleWishlist = (id: string) => {
    const wishlist: string[] = JSON.parse(localStorage.getItem("wishlist"));
    if (!wishlist) {
      localStorage.setItem("wishlist", JSON.stringify([id]));
      return;
    }
    if (wishlist.includes(id)) {
      const newWishlist = wishlist.filter((item) => item !== id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      reRender((nothing) => nothing + 1);
    } else {
      const newWishlist = [...wishlist, id];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      reRender((nothing) => nothing + 1);
    }
  };
  return (
    <div
      href={`p/${data.id}`}
      className="aspect-[5/8] bg-surface rounded-lg p-3 shadow flex flex-col duration-300 hover:shadow-lg cursor-pointer "
    >
      <div className="relative w-full flex-1 overflow-hidden rounded-md mb-1 select-none">
        <picture className="w-full h-full">
          <img
            src={data.owner.avatar_url}
            alt="store img"
            className="shadow-xl w-full h-full bg-cover bg-center"
          />
        </picture>
        <div className="absolute bottom-3 right-2 flex justify-center items-center gap-2">
          <div
            onClick={() => handleWishlist(data.id)}
            className="size-8 bg-[hsla(0,0,0,.4)] hover:bg-[hsla(0,0,0,.8)] rounded-full flex justify-center items-center pt-0.5 duration-300"
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-base" />
            ) : (
              <FaRegHeart className="text-white text-base" />
            )}
          </div>
          <div
            onClick={() => handleWishlist(data.id)}
            className="rounded-full shadow"
          >
            <picture>
              <img
                src={data.owner.avatar_url}
                alt="store img"
                className="size-8 rounded-full shadow border-1 border-white"
              />
            </picture>
          </div>
        </div>
      </div>
      <Title size="small" className="line-clamp-1">
        {data.title} of being a lot of persons in the middles east
      </Title>
      <div className="flex justify-start items-center gap-0.5">
        <div
          onClick={() => router.push(`s/${data.owner.id}`)}
          className="group w-full flex items-center justify-start gap-1"
        >
          <Text
            size="small"
            muted
            className="capitalize group-hover:text-text group-hover:underline"
          >
            {data.sub_category}
          </Text>
        </div>
        <div className="flex justify-center items-center gap-0.5">
          <Text size="small" muted>
            4.5
          </Text>
          <FaStar className="mb-0.5 text-sm text-text-muted" />
        </div>
      </div>
      <Text
        size="small"
        muted
        className="capitalize group-hover:text-text line-clamp-3 my-5"
      >
        {data.descreption}
      </Text>
      <div className="mt-auto w-full flex justify-between items-center">
        <Text
          size="large"
          className="bg-gray-200 px-5 py-2 shadow-xs rounded font-black "
        >
          6 000,00 DA
        </Text>
        <Button
          title="details"
          className="mt-auto self-end"
          icon={<RiArrowDropRightLine />}
        />
      </div>
    </div>
  );
};

export default ProductCard;
