"use client";
import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

const ArtistInfo = ({ artist }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("liked_artists"));
    if (!likes) {
      localStorage.setItem("liked_artists", JSON.stringify([]));
      setLiked(false);
      return;
    }
    if (likes.includes(artist?.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [artist]);

  const toggleLike = () => {
    const likes = JSON.parse(localStorage.getItem("liked_artists"));

    if (liked) {
      const newLikes = likes.filter((like) => like !== artist.id);
      console.log();

      localStorage.setItem("liked_artists", JSON.stringify(newLikes));
      setLiked(false);
    } else {
      const newLikes = [...likes, artist.id];
      localStorage.setItem("liked_artists", JSON.stringify(newLikes));
      setLiked(true);
    }
  };

  return (
    <div className="bg-primary p-5 rounded-xl w-full flex flex-col justify-center items-center select-none">
      <div className="py-3 w-full flex justify-end items-center">
        {liked ? (
          <FaHeart
            className="text-2xl text-red-500 cursor-pointer"
            onClick={() => toggleLike()}
          />
        ) : (
          <FaRegHeart
            className="text-2xl text-white cursor-pointer"
            onClick={() => toggleLike()}
          />
        )}
      </div>
      <picture>
        <img
          src={artist?.avatar}
          alt="Artist Avatar"
          className="border-8 border-white bg-center bg-cover rounded-full "
        />
      </picture>
      <h1 className="mt-3 font-playfair font-black text-4xl text-white tracking-tighter">
        {artist?.name}
      </h1>
      <Link
        href={`/items?categories=${artist?.category}`}
        className="font-poppins font-normal text-xs text-white tracking-tighter capitalize hover:underline"
      >
        {artist?.category}
      </Link>
      <p className="mt-3 text-white text-xs font-poppins text-center line-clamp-5 text-ellipsis">
        {artist?.descreption}
      </p>
    </div>
  );
};

export default ArtistInfo;
