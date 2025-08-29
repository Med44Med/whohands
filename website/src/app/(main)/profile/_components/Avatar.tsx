"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { fromBlob, blobToURL } from "image-resize-compress";
import { useRouter } from "next/navigation";
import { Text } from '@/components/typography';

const Avatar = ({ profile }) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [upload_error, setUpload_error] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleUpload = async () => {
      if (!avatar) {
        return;
      }

      const quality = 80;
      const width = 200;
      const height = "auto";
      const format = "webp";

      const resizedBlob = await fromBlob(
        avatar,
        quality,
        width,
        height,
        format
      );

      const supabase = createClient();

      const uploadAvatar = await supabase.storage
        .from("avatars")
        .upload(`${profile.id}/profile.webp`, resizedBlob, {
          upsert: true,
          cacheControl: "0",
        });

      if (uploadAvatar.error) {
        console.log(uploadAvatar.error);
        setUpload_error(uploadAvatar.error.message);
        return;
      }

      const { data: publicUrl } = await supabase.storage
        .from("avatars")
        .getPublicUrl(uploadAvatar.data.path);

      const updateProfile = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl.publicUrl })
        .eq("id", profile.id);
      if (updateProfile.error) {
        console.log(updateProfile.error);
        setUpload_error(updateProfile.error.message);
        return;
      } else {
         window.location.reload()
      }
    };
    handleUpload();
  }, [avatar]);

  return (
    <div className="relative size-40 md:size-[320px] rounded-full bg-surface shadow flex flex-col items-center justify-center ">
      <picture className="size-36 md:size-72 rounded-full bg-center bg-cover">
        <source
          srcSet={profile.avatar_url}
          type="image/webp"
          className="size-36 md:size-72 bg-red-300 rounded-full bg-center bg-cover"
        />
        <img
          src="https://picsum.photos/id/237/200/300"
          alt="avatar"
          className="size-36 md:size-72 rounded-full bg-center bg-cover"
        />
      </picture>
      <button
        onClick={() => inputRef.current.click()}
        className="group absolute bottom-0 right-4 md:right-12 size-8 md:size-12 rounded-full bg-surface shadow cursor-pointer flex justify-center items-center"
      >
        <FaEdit className="text-text-muted text-lg md:text-2xl duration-300 group-hover:text-primary" />
      </button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        value={undefined}
        onChange={(e) => setAvatar(e.target.files[0])}
        accept="image/*"
      />
      {upload_error && <Text size='normal'>{upload_error}</Text>}
    </div>
  );
};

export default Avatar;
