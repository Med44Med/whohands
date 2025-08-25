"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "../../supabase/client";
import { useState, useEffect } from "react";
import { Text, Title } from "@/components/typography";
import Skeleton from "@/components/Skeleton";
import Button from '../../components/Button';
import LangSwitcher from '../../components/LangSwitcher';
import { useRouter } from 'next/navigation';
const Page = () => {
  const router= useRouter()
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
    router.push('/')
  };

  return (
    <>
     
      <div className="bg-green-100 min-h-screen w-full flex flex-col justify-center items-center gap-3">
        <LangSwitcher lang='ar' />
        <LangSwitcher lang='fr' />
        <LangSwitcher lang='en' />
        <Title size="big" className="w-2/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
          exercitationem!
        </Title>
        <Title size="small" className="w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
          exercitationem!
        </Title>
        <Text size="big" className="w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iste at
          dolores neque assumenda maiores aut iure illum ad consequatur tenetur
          doloribus, veniam hic, laboriosam cum dolor, officia molestiae. Illo!
        </Text>
        <Text size="large" className="w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iste at
          dolores neque assumenda maiores aut iure illum ad consequatur tenetur
          doloribus, veniam hic, laboriosam cum dolor, officia molestiae. Illo!
        </Text>
        <Text size="normal" className="w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iste at
          dolores neque assumenda maiores aut iure illum ad consequatur tenetur
          doloribus, veniam hic, laboriosam cum dolor, officia molestiae. Illo!
        </Text>
        <Text size="small" className="w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iste at
          dolores neque assumenda maiores aut iure illum ad consequatur tenetur
          doloribus, veniam hic, laboriosam cum dolor, officia molestiae. Illo!
        </Text>
        <p className="text-4xl"></p>
      </div>
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-3 bg-background">
        <button className="bg-gradient hover:bg-gradient-hover border-white p-50 rounded-xl cursor-pointer">
          <p className="text-white">dzhands</p>
        </button>
      </div>
      <div>{t("title")}</div>
      <p>{profile?.email}</p>
      <button onClick={() => handleLogout()}>Log out</button>
    </>
  );
};

export default Page;
