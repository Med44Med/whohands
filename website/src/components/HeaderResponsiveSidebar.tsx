import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { categories } from "../../public/categories";
import clsx from "clsx";
import { Text } from "@/components/typography";
import { useState } from "react";

const HeaderResponsiveSidebar = ({
  showResponsiveSidear,
  setShowResponsiveSidear,
}: {
  showResponsiveSidear: boolean;
  setShowResponsiveSidear: () => void;
}) => {
  const [subList, setSubList] = useState("");

  const handleSubList = (sub) => {
    if (subList === sub) {
      setSubList("");
    } else {
      setSubList(sub);
    }
  };

  return (
    <div
      className={clsx(
        "z-[999] fixed top-0 left-0 h-screen w-full overflow-hidden duration-75",
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
          "absolute z-50 bg-background top-0 left-0 h-screen w-4/5 delay-300 duration-300 ease-out ",
          showResponsiveSidear ? "-translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-dvh duration-200 w-full p-3 flex flex-col justify-start items-start gap-3 bg-background">
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <p className="text-text text-4xl transition-all font-black tracking-tight font-playfair">
              Categories
            </p>
            <div className="w-full px-2  text-wrap duration-300 ease-out flex flex-col">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className="w-full pl-5 flex flex-col justify-start items-center pb-1 border-b border-gray-300"
                >
                  <div
                    onClick={() => {
                      handleSubList(item.slug);
                    }}
                    className="py-1 pt-5 w-full flex justify-between items-end gap-1"
                  >
                    <Text size="large" className="text-start !font-bold">
                      {item.name}
                    </Text>
                    <IoIosArrowDown
                      className={clsx(
                        "text-xl duration-200",
                        subList === item.slug ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </div>
                  <div
                    className={clsx(
                      "w-full flex flex-col justify-start items-start gap-3  overflow-hidden duration-200",
                      subList === item.slug ? "max-h-96" : "max-h-0"
                    )}
                  >
                    {item.subCategories.map((sub, index) => (
                      <Link
                        key={index}
                        onClick={() => {
                          setShowResponsiveSidear(false);
                          setSubList(false);
                        }}
                        href={`/p?category=${item.slug}%${sub.slug}&sort=newest`}
                        className="py-1 px-3 pt-2"
                      >
                        <Text size="normal">{sub.name}</Text>
                      </Link>
                    ))}
                  </div>
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
    </div>
  );
};

export default HeaderResponsiveSidebar;
