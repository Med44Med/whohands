"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {
  IoSearch,
  IoHeartOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

import { FaRegHeart } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

import { categories } from "../../public/categories";
import logo from "../../public/icon.png";
import HeaderResponsiveSidebar from "./HeaderResponsiveSidebar";
import SearchPopup from "./SearchPopup";
import { Text } from "@/components/typography";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

const Header = ({ data }) => {
  const router = useRouter();
  const supabase = createClient();

  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [showSearchBanner, setShowSearchBanner] = useState(false);
  const [showResponsiveSidear, setShowResponsiveSidear] = useState(false);

  const [profile, setProfile] = useState(null);
  const currentScrollRef = useRef<number>(0);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!data || error) {
        return;
      }

      const { id }: { id: string } = data?.user;

      const { data: user } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id);

      setProfile(user[0]);
    };
    getUser();
  }, [supabase]);

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    setprofile(null);
  };

  return (
    <>
      <header
        className={clsx(
          "fixed z-50 top-0 left-0 w-full transition-all duration-300 bg-background flex flex-col items-start justify-start whitespace-nowrap shadow "
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
            <div className="hidden md:flex items-center gap-5 ">
              <button onClick={() => setShowSearchBanner(true)}>
                <IoSearch className="text-text text-2xl" />
              </button>
              <Link href="/favorites">
                <FaRegHeart className="text-text text-2xl" />
              </Link>
              {profile ? (
                <>
                  <div className="px-1 relative group">
                    <picture>
                      <img
                        src={profile.avatar_url}
                        alt="profile"
                        className="size-8 rounded-full bg-surface shadow-2xl border-2 border-white"
                      />
                    </picture>
                    <div className="group-hover:flex absolute right-0 top-[100%] w-72 bg-white rounded shadow hidden flex-col justify-start items-center">
                      <Link
                        href="profile"
                        className="w-full p-3 group/profile flex flex-col justify-center items-center gap-1 border-b border-gray-300"
                      >
                        <picture>
                          <img
                            src={profile.avatar_url}
                            alt="profile"
                            className="size-28 rounded-full bg-surface shadow-2xl border-2 border-white"
                          />
                        </picture>
                        <p className="group-hover/profile:text-primary group-hover/profile:underline">
                          {profile.username ? profile.username : profile.email} (Edit)
                        </p>
                      </Link>
                      <Link href='/notifications' className='w-full text-center p-3 hover:text-primary hover:bg-gray-100 duration-150'>Notifications</Link>
                      {profile?.role === "user" ? (
                        <Link href="/createstore" className='w-full text-center p-3 hover:text-primary hover:bg-gray-100 duration-150'>Create a Store</Link>
                      ) : (
                        <Link href="/store" className='w-full text-center p-3 hover:text-primary hover:bg-gray-100 duration-150'>Store</Link>
                      )}
                      <button onClick={handleLogout} className='w-full text-center p-3 hover:text-primary hover:bg-gray-100 duration-150 cursor-pointer'>Log out</button>
                    </div>
                  </div>

                  
                </>
              ) : (
                <Link href="login">
                  <IoPersonCircleOutline className="text-text text-3xl" />
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
        <Link
          href="/favorites"
          className="flex flex-col justify-center items-center gap-1"
        >
          <FaRegHeart className="text-2xl" />
          <Text size="small">Liked</Text>
        </Link>
        <Link
          href="profile"
          className="flex flex-col justify-center items-center gap-1"
        >
          <MdOutlinePersonOutline className="text-2xl" />
          <Text size="small">Account</Text>
        </Link>
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
