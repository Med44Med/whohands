"use client"
import React from "react";
import { FaEdit } from "react-icons/fa";

const Avatar = ({data}) => {
  return (
    <div className="relative size-40 md:size-[320px] rounded-full bg-surface shadow flex items-center justify-center ">
      <picture className="size-36 md:size-72 rounded-full bg-center bg-cover">
        <source
          src={data}
          className="size-36 md:size-72 bg-red-300 rounded-full bg-center bg-cover"
        />
        <img
          src="https://picsum.photos/id/237/200/300"
          alt="avatar"
          className="size-36 md:size-72 rounded-full bg-center bg-cover"
        />
      </picture>
      <button className="group absolute bottom-0 right-4 md:right-12 size-8 md:size-12 rounded-full bg-surface shadow cursor-pointer flex justify-center items-center">
        <FaEdit className="text-text-muted text-lg md:text-2xl duration-300 group-hover:text-primary" />
      </button>
    </div>
  );
};

export default Avatar;
