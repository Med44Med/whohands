import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { categories } from "../../public/categories";
import clsx from 'clsx';

const HeaderResponsiveSidebar = ({
  showResponsiveSidear,
  setShowResponsiveSidear
}: {
  showResponsiveSidear: boolean;
  setShowResponsiveSidear:()=>void
}) => {
  return (
    <div
      className={clsx(
        "z-[999] absolute top-0 left-0 h-dvh w-full",
        showResponsiveSidear ? "-translate-x-0" : "-translate-x-full"
      )}
    >
      <div
        className={clsx(
          "-z-0 absolute top-0 left-0 h-full w-full transition-colors duration-300 ease-out",
          showResponsiveSidear ? "bg-[hsla(0,0,0,.4)]" : "bg-transparent"
        )}
        onClick={() => setShowResponsiveSidear(false)}
      ></div>
      <div
        className={clsx(
          "absolute z-50 bg-background top-0 left-0 h-full w-4/5 delay-300 duration-300 ease-out p-3 flex flex-col justify-start items-start gap-3",
          showResponsiveSidear ? "-translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <p className="text-text text-4xl transition-all font-black tracking-tight font-playfair">
            Categories
          </p>
          <div className="w-full text-wrap duration-300 ease-out grid grid-cols-2 gap-3">
            {categories.map((item, index) => (
              <div
                key={index}
                className="w-full aspect-square bg-surface shadow flex flex-col justify-end items-center"
              >
                <p className="text-center py-5 px-3">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <Link href="/">
          <p className="w-full text-text text-4xl transition-all font-black tracking-tight font-playfair">
            Artists
          </p>
        </Link>
        <Link href="/blogs">
          <p className="w-full text-text text-4xl transition-all font-black tracking-tight font-playfair">
            Blogs
          </p>
        </Link>
        <div className="mt-auto p-3 w-full flex justify-center items-center gap-10">
          <Link href="/">
            <FaInstagram className="text-text text-2xl" />
          </Link>
          <Link href="/">
            <FaFacebook className="text-text text-2xl" />
          </Link>
          <Link href="/">
            <FaTiktok className="text-text text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderResponsiveSidebar;
