"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "../../supabase/client";
import { useState, useEffect } from "react";
import { Text, Title } from "@/components/typography";
import Skeleton from "@/components/Skeleton";
import Button from "../../components/Button";
import LangSwitcher from "../../components/LangSwitcher";
import { useRouter } from "next/navigation";
import { fromBlob, blobToURL } from "image-resize-compress";

const Page = () => {
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

      const resizedBlob = await fromBlob(
        blob,
        quality,
        width,
        height,
        format
      );
      const url = await blobToURL(resizedBlob);
      setNewdBlob(url)

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
      <div className="min-h-screen bg-background w-full flex flex-col justify-center items-center gap-3">
        <input
          type="file"
          onChange={(e) => setBlob(e.target.files[0])}
        />
        <picture>
          <img src={newBlob} alt="resized" />
        </picture>
      </div>

      <div className="bg-green-100 min-h-screen w-full flex flex-col justify-center items-center gap-3">
        <LangSwitcher lang="ar" />
        <LangSwitcher lang="fr" />
        <LangSwitcher lang="en" />
        <Title size="big" className="w-2/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
          exercitationem!
        </Title>
        <Text size="normal" className="w-1/2">
          abcd ipsum dolor sit amet, consectetur adipisicing elit. Fuga iste at
          dolores neque assumenda maiores aut iure illum ad consequatur tenetur
          doloribus, veniam hic, laboriosam cum dolor, officia molestiae. Illo!
        </Text>
        <Text size="big" className="text-4xl">
          عربي
        </Text>
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
