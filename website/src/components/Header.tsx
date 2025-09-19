"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";

import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

import { categories } from "../../public/categories";
import logo from "../../public/icon.png";
import HeaderResponsiveSidebar from "./HeaderResponsiveSidebar";
import SearchPopup from "./SearchPopup";
import { Title, Text } from "@/components/typography";

const Header = ({ data }) => {
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [showSearchBanner, setShowSearchBanner] = useState(false);
  const [showResponsiveSidear, setShowResponsiveSidear] = useState(false);

  const currentScrollRef = useRef<number>(0);

  const avatar = null;

  useEffect(() => {
    const handlescroll = () => {
      const scroll = window.scrollY;
      const prevScroll = currentScrollRef.current;

      if (scroll < 200) {
        setHideHeader(false);
      } else if (scroll > prevScroll) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      currentScrollRef.current = scroll;
    };

    window.addEventListener("scroll", handlescroll);

    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed z-50 top-0 left-0 w-full transition-all duration-300 bg-background flex flex-col items-start justify-start whitespace-nowrap shadow ",
          // hideHeader ? " -translate-y-full" : "translate-y-0"
        )}
        >
        <div className="w-full h-14 flex justify-between items-center px-3 md:px-5">
          <Link className="flex items-center gap-1" href="/">
            <div className="h-7 w-7 md:w-8 md:h-8 flex justify-center items-center">
              <picture>
                <img
                  src={logo.src}
                  alt="logo"
                  className="h-7 w-7 md:w-8 md:h-8 rounded-full bg-cover bg-center"
                />
              </picture>
            </div>

            <h2 className="text-text text-3xl md:text-5xl font-black tracking-tighter select-none">
              Who
              <span className="text-primary">Hands.</span>
            </h2>
          </Link>
          <div className="flex justify-end items-center h-full ml-auto">
            <div className="hidden md:flex ">
              <button
                onClick={() => setShowSearchBanner(true)}
                className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 md:px-2.5"
              >
                <span className="material-icons-outlined">search</span>
              </button>
              <Link
                href="/favorites"
                className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 md:px-2.5"
              >
                <FaRegHeart className="text-text text-xl" />
              </Link>
              {avatar ? (
                <Link href="profile">
                  <picture>
                    <img
                      src={avatar}
                      alt="profile"
                      className="size-10 rounded-full bg-surface shadow-2xl"
                    />
                  </picture>
                </Link>
              ) : (
                <Link
                  href="login"
                  className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 md:px-2.5"
                >
                  <MdOutlinePersonOutline className="text-text text-3xl" />
                </Link>
              )}
            </div>
          </div>
          <IoMdMenu
            className="text-text text-3xl cursor-pointer md:hidden"
            onClick={() => setShowResponsiveSidear(!showResponsiveSidear)}
          />
        </div>
        <div className="w-full h-10 bg-primary justify-center items-center gap-20 hidden md:flex">
          {categories.map((cat, index) => (
            <div key={index} className="group">
              <Link
                href={`/p?category=${cat.slug}&sort=newest`}
                className="flex justify-center items-center gap-1"
              >
                <Text size="normal" className="!text-white">
                  {cat.name}
                </Text>
                <IoIosArrowDown className="duration-300 group-hover:rotate-180 text-white" />
              </Link>
              <div className="fixed bg-background shadow-2xl left-0 top-24 w-full max-h-0 h-72 overflow-hidden transition-all duration-300 *:opacity-0 *:transition-opacity *:delay-300 group-hover:max-h-72 group-hover:*:opacity-100 flex">
                <div className="h-full p-5 px-20 flex flex-col justify-start items-start gap-10 flex-wrap">
                  {cat.subCategories.map((sub, index) => (
                    <Link
                      href={`/p?category=${cat.slug}&subcategory=${sub.slug}&sort=newest`}
                      key={index}
                    >
                      <Text className="hover:text-primary hover:underline">
                        {sub.name}
                      </Text>
                    </Link>
                  ))}
                </div>
                <div className="flex-1 p-5 flex flex-col gap-3">
                  <Text>Most Popular</Text>
                  <div className="flex-1 flex justify-start gap-5">
                    {data[cat.slug] &&
                      data[cat.slug].map((item, index) => (
                        <Link
                          key={index}
                          href={`/p/${item.id}`}
                          className="group/link w-36 flex flex-col justify-start items-start"
                        >
                          <div className="w-full overflow-hidden rounded-2xl  pb-1">
                            <picture>
                              <img
                                src="https://picsum.photos/200/200"
                                className="w-full h-auto duration-1000 group-hover/link:scale-110"
                                alt="article"
                              />
                            </picture>
                          </div>
                          <Text className="">Shampoo</Text>
                          <Text className="!font-black">250 da</Text>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>
      <HeaderResponsiveSidebar
        showResponsiveSidear={showResponsiveSidear}
        setShowResponsiveSidear={setShowResponsiveSidear}
      />
      <div className="fixed z-50 bottom-0 left-0 w-full h-16 bg-surface flex justify-around items-end md:hidden">
        <button
          onClick={() => setShowResponsiveSidear(!showResponsiveSidear)}
          className="flex flex-col justify-center items-center gap-1"
        >
          <IoGridOutline className="text-text text-2xl" />
          <Text size="small">Categories</Text>
        </button>
        <button
          onClick={() => setShowSearchBanner(true)}
          className="flex flex-col justify-center items-center gap-1"
        >
          <span className="material-icons-outlined scale-125">search</span>
          <Text size="small">Search</Text>
        </button>
        <Link href='/favorites' className="flex flex-col justify-center items-center gap-1">
          <FaRegHeart className="text-2xl"/>
          <Text size="small">Liked</Text>
        </Link>
        <div className="flex flex-col justify-center items-center gap-1">
          <MdOutlinePersonOutline className="text-2xl" />
          <Text size="small">Account</Text>
        </div>
      </div>
      {showSearchBanner && (
        <SearchPopup
          showSearchBanner={showSearchBanner}
          setShowSearchBanner={setShowSearchBanner}
        />
      )}
    </>
  );
};

export default Header;
