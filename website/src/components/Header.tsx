"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import { createClient } from "../supabase/client";
import { categories } from "../../public/categories";

const Header = ({ user }) => {
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [showSearchBanner, setShowSearchBanner] = useState(false);
  const [showResponsiveSidear, setShowResponsiveSidear] = useState(false);

  const currentScrollRef = useRef<number>(0);

  const searchInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (showSearchBanner) {
      searchInputRef.current.focus();
    }
  }, [showSearchBanner]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

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
        "fixed z-50 top-0 left-0 w-full h-14  transition-all duration-300 bg-background  px-3 flex items-center justify-start gap-5 whitespace-nowrap shadow md:px-5",
        hideHeader && "-translate-y-full"
      )}
    >
      <IoMdMenu
        className="text-text text-5xl cursor-pointer md:hidden"
        onClick={() => setShowResponsiveSidear(!showResponsiveSidear)}
      />
      <Link className="flex items-center gap-4 text-[#111418]" href="/">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <h2 className="text-[#111418] text-4xl font-black font-playfair -tracking-wider">
          JoysMaker
        </h2>
      </Link>
      <nav className="flex-1 h-full px-5 hidden md:flex items-center justify-end gap-10">
        <div className="group h-full">
          <Link
            className="px-1 h-full flex justify-center items-center text-gray-700 text-base transition-all font-medium hover:text-text font-poppins leading-normal border-b-2 border-background hover:border-text"
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
                  className="font-poppins font-bold text-xl text-text text-start w-full"
                >
                  {category.name}
                </Link>
                {category?.subCategories && (
                  <ul className="w-full h-48 flex flex-col justify-start items-start gap-1 gap-x-10 flex-wrap">
                    {category?.subCategories.map((subc, i) => (
                      <li key={i}>
                        <Link
                          href={`/p?sub_category=${subc.slug}`}
                          className="font-poppins font-medium text-xs text-wrap text-text-muted duration-300 hover:text-primary hover:underline"
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
          className="px-1 h-full flex justify-center items-center text-gray-700 text-base transition-all font-medium hover:text-text font-poppins leading-normal border-b-2 border-background hover:border-text"
          href="artists"
        >
          Artists
        </Link>
        <Link
          className="px-1 h-full flex justify-center items-center text-gray-700 text-base transition-all font-medium hover:text-text font-poppins leading-normal border-b-2 border-background hover:border-text"
          href="/blogs"
        >
          Blogs
        </Link>
      </nav>
      <div className="flex justify-end items-center h-full ml-auto">
        <div className="flex gap-2">
          <button
            onClick={() => setShowSearchBanner(true)}
            className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <IoIosSearch className="text-text text-xl" />
          </button>
          <Link
            href="/cart"
            className="flex transition-all duration-300 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-text-secondary hover:bg-text-secondary-hover text-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <IoCartOutline className="text-text text-xl" />
          </Link>
        </div>
        {user ? (
          <Link href="profile">
            <picture>
              <img
                src="a"
                alt="profile"
                className="size-8 rounded-full bg-surface"
              />
            </picture>
          </Link>
        ) : (
          <Link
            href="login"
            className="p-2 px-5 rounded flex justify-center items-center gap-2 hover:bg-primary-hover md:bg-primary md:ml-5"
          >
            <IoPersonOutline className="text-primary text-xl md:text-surface" />
            <p className="text-surface text-base font-medium uppercase hidden md:block">
              Log in
            </p>
          </Link>
        )}
      </div>

      <div
        className={clsx(
          "z-[999] absolute top-0 left-0 h-screen w-full",
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
            "absolute z-50 bg-background top-0 left-0 h-full w-4/5 delay-300 duration-300 ease-out p-3 flex flex-col justify-start items-center gap-3",
            showResponsiveSidear ? "-translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-center items-end gap-5">
              <p className="text-text text-4xl transition-all font-medium">
                Categories
              </p>
              <IoIosArrowDown className="text-text text-3xl transition-all font-medium" />
            </div>
            <div className="w-full text-wrap h-96 overflow-hidden max-h-96 duration-300 ease-out">
              {categories.map((item,index)=><div key={index}>{item.name}</div>)}
            </div>
          </div>
          <div>Artists</div>
          <div>Blogs</div>
          <div>Instagram</div>
        </div>
      </div>

      {showSearchBanner && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div
            onClick={() => setShowSearchBanner(false)}
            className="absolute inset-0 bg-[rgba(0,0,0,.6)] cursor-pointer"
          ></div>
          <div className="z-10 bg-surface w-4/5 h-4/5 rounded-xl shadow-xl p-3 flex flex-col justify-start items-center">
            <input
              name=""
              ref={searchInputRef}
              value={searchText}
              onChange={(e) => handleSearch(e)}
              className="w-4/5 p-3 mt-3 rounded border outline-none "
              type="text"
              placeholder="Search..."
              autofocus //check it later
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
