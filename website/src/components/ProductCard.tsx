"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { RiArrowDropRightLine } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { Text, Title } from "@/components/typography";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const ProductCard = ({ data }) => {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false);
  const [someValue, reRender] = useState(0)

  useEffect(() => {
    const wishlist: string[] = JSON.parse(localStorage.getItem("wishlist"));
    if (wishlist.includes(data?.id)) {
      return setIsLiked(true)
    } else {
      return setIsLiked(false)
    }
  }, [someValue,data?.id]);
  
  const handleWishlist = (id: string) => {
    const wishlist: string[] = JSON.parse(localStorage.getItem("wishlist"));
    if (!wishlist) {
      localStorage.setItem("wishlist", JSON.stringify([id]));
      return;
    }
    if (wishlist.includes(id)) {
      const newWishlist = wishlist.filter((item) => item !== id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      reRender(nothing=>nothing+1)
    } else {
      const newWishlist = [...wishlist, id];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      reRender(nothing=>nothing+1)
    }
  };
  return (
    <div
      href={`p/${data.id}`}
      className="h-96 bg-surface rounded-lg p-3 shadow flex flex-col duration-300 hover:shadow-lg cursor-pointer "
    >
      <div className="relative w-full h-1/2 overflow-hidden rounded-md mb-1">
        <picture className="w-full h-full">
          <img
            src={data.owner.avatar_url}
            alt="store img"
            className="shadow-xl w-full h-full bg-cover bg-center"
          />
        </picture>
        <div
          onClick={() => handleWishlist(data.id)}
          className="absolute right-2 top-2 size-8 bg-[hsla(0,0,0,.4)] hover:bg-[hsla(0,0,0,.8)] rounded-full flex justify-center items-center pt-0.5 duration-300"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 text-base" />
          ) : (
            <FaRegHeart className="text-white text-base" />
          )}
        </div>
      </div>
      <Title size="small" className="line-clamp-1">
        {data.title} of being a lot of persons in the middles east
      </Title>
      <div
        onClick={()=>router.push(`s/${data.owner.id}`)}
        className="group w-full flex items-center justify-start gap-1"
      >
        <picture>
          <img
            src={data.owner.avatar_url}
            alt="store img"
            className="size-5 rounded-full shadow"
          />
        </picture>
        <Text size='small' muted className="capitalize group-hover:text-text">
          {data.descreption}
        </Text>
      </div>
      <Button
        title="details"
        className="mt-auto self-end"
        icon={<RiArrowDropRightLine />}
      />
    </div>
  );
};

export default ProductCard;
