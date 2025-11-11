"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "../../supabase/client";
import { useState, useEffect } from "react";
import { Text, Title } from "@/components/typography";
import Skeleton from "@/components/Skeleton";
import LangSwitcher from "../../components/LangSwitcher";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { fromBlob, blobToURL } from "image-resize-compress";
import Link from "next/link";
import Button from "@/components/Button";
import ProgressBySteps from "../../components/ProgressBySteps";
import NavLink from "@/components/NavLink";
const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("HomePage");

  console.log(locale);

  const supabase = createClient();

  const [profile, setProfile] = useState(null);

  const [blob, setBlob] = useState<File | null>(null);
  const [newBlob, setNewdBlob] = useState("");

  useEffect(() => {
    const handleBlob = async () => {
      const quality = 80; // For webp and jpeg formats
      const width = 80; // Original width
      const height = "auto"; // Original height
      const format = "webp"; // Output format

      const resizedBlob = await fromBlob(blob, quality, width, height, format);
      const url = await blobToURL(resizedBlob);
      setNewdBlob(url);
    };
    if (!blob) {
      return;
    }
    handleBlob(blob);
  }, [blob]);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setProfile(user);
    };
    fetch();
  }, []);

  console.log(profile);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    router.push("/");
  };

  return (
    <>
      <button onClick={() => handleLogout()}>Log out</button>
      <br />
      <div className="flex-1 bg-red-200 h-96 flex flex-col justify-start items-center p-3">
        <NavLink
          href="/example"
          className="bg-primary p-3 px-10 rounded text-white"
          activeClassName='bg-red-500'
        >
          Example
        </NavLink>
      </div>
    </>
  );
};

export default Page;
