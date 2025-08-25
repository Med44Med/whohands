"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

import { createClient } from "../supabase/client";
import { categories } from "../../public/categories";
import logo from "../../public/icon.png";
import HeaderResponsiveSidebar from "./HeaderResponsiveSidebar";
import HeaderSearchPopup from "./HeaderSearchPopup";
import SearchPopup from "./SearchPopup";

const Header = ({ user }) => {
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [showSearchBanner, setShowSearchBanner] = useState(false);
  const [showResponsiveSidear, setShowResponsiveSidear] = useState(false);

  const currentScrollRef = useRef<number>(0);

  
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
    <header
      className={clsx(
        "fixed z-50 top-0 left-0 w-full h-14  transition-all duration-300 bg-background  px-3 flex items-center justify-start gap-2 whitespace-nowrap shadow md:px-5",
        hideHeader && "-translate-y-full"
      )}
    >
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

        <h2 className="text-text text-3xl md:text-5xl font-black font-playfair tracking-tighter select-none">
          Who
          <span className="text-primary text-2xl md:text-4xl font-black   tracking-tighter">
            Hands.
          </span>
        </h2>
      </Link>
      <nav className="flex-1 h-full px-5 hidden md:flex items-center justify-end gap-10">
        <div className="group h-full">
          <Link
            className="px-1 h-full flex justify-center items-center text-gray-700 text-base transition-all font-medium hover:text-text  leading-normal border-b-2 border-background hover:border-text"
            href="categories"
          >
            Categories
          </Link>
          <div className="fixed bg-white w-full h-96 max-h-0 top-14 left-0 overflow-hidden invisible *:opacity-0 transition-all duration-300 delay-300 group-hover:visible group-hover:max-h-72 group-hover:*:opacity-100 shadow-xl flex justify-around items-start gap-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-1 mt-3 delay-300 duration-300 ease-out"
              >
                <Link
                  href={`/p?category=${category.slug}`}
                  className=" font-bold text-xl text-text text-start w-full"
                >
                  {category.name}
                </Link>
                {category?.subCategories && (
                  <ul className="w-full h-48 flex flex-col justify-start items-start gap-1 gap-x-10 flex-wrap">
                    {category?.subCategories.map((subc, i) => (
                      <li key={i}>
                        <Link
                          href={`/p?sub_category=${subc.slug}`}
                          className=" font-medium text-xs text-wrap text-text-muted duration-300 hover:text-primary hover:underline"
                        >
                          {subc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        <Link
          className="px-1 h-full flex justify-center items-center text-gray-700 text-base transition-all font-medium hover:text-text  leading-normal border-b-2 border-background hover:border-text"
          href="artists"
        >
          Artists
        </Link>
        <Link
          className="px-1 h-full flex justify-center items-center text-gray-700 text-base transition-all font-medium hover:text-text  leading-normal border-b-2 border-background hover:border-text"
          href="/blogs"
        >
          Blogs
        </Link>
      </nav>
      <div className="flex justify-end items-center h-full ml-auto">
        <div className="flex">
          <button
            onClick={() => setShowSearchBanner(true)}
            className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 md:px-2.5"
          >
            <IoIosSearch className="text-text text-xl" />
          </button>
          <Link
            href="/cart"
            className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 md:px-2.5"
          >
            <IoCartOutline className="text-text text-xl" />
          </Link>
        </div>
        {user ? (
          <Link href="profile">
            <picture>
              <img
                src={user.user_metadata.avatar_url}
                alt="profile"
                className="size-8 rounded-full bg-surface border-2 border-primary"
              />
            </picture>
          </Link>
        ) : (
          <Link
            href="login"
            className="p-2 px-2.5 rounded flex justify-center items-center gap-2 hover:bg-primary-hover md:bg-primary md:ml-5"
          >
            <IoPersonOutline className="text-primary text-xl md:text-surface" />
            <p className="text-surface text-base font-medium uppercase hidden md:block">
              Log in
            </p>
          </Link>
        )}
      </div>
      <IoMdMenu
        className="text-text text-3xl cursor-pointer md:hidden"
        onClick={() => setShowResponsiveSidear(!showResponsiveSidear)}
      />
      <HeaderResponsiveSidebar
        showResponsiveSidear={showResponsiveSidear}
        setShowResponsiveSidear={setShowResponsiveSidear}
      />
      {showSearchBanner && (
        <SearchPopup
          showSearchBanner={showSearchBanner}
          setShowSearchBanner={setShowSearchBanner}
        />
      )}
    </header>
  );
};

export default Header;
