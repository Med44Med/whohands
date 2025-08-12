"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import { createClient } from "../../supabase/client";
import { useState, useEffect } from "react";

const Page = () => {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  console.log(locale);

  const supabase = createClient();

  const [profile, setProfile] = useState(null);

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
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-3 bg-background">
        <button className="bg-gradient hover:bg-gradient-hover border-white p-50 rounded-xl cursor-pointer">
          <p className="text-white">dzhands</p>
        </button>
      </div>
      <div>{t("title")}</div>
      <LocaleSwitcher />
      <p>{profile?.email}</p>
      <button onClick={() => handleLogout()}>Log out</button>
    </>
  );
};

export default Page;
