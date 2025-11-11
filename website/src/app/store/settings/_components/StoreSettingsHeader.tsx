"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import imageConverter from "@/utilis/imageConverter";
import Button from "@/components/Button";

const StoreSettingsHeader = ({ store }) => {
  const supabase = createClient();

  const [storeAvatar, setStoreAvatar] = useState<File>();
  const storeAvatarRef = useRef(null);

  useEffect(() => {
    if (!storeAvatar) {
      return;
    }
    console.log("here");

    const handleUpload = async () => {
      const convertedImage = await imageConverter(storeAvatar, 200);

      const { error: uploadError } = await supabase.storage
        .from("stores_avatar")
        .upload(`${store.id}.webp`, convertedImage, { upsert: true });
      if (uploadError) {
        console.log("error uploading image:", uploadError);
        return;
      }

      const {
        data: { publicUrl: url },
      } = supabase.storage
        .from("stores_avatar")
        .getPublicUrl(`${store.id}.webp`);

      const { data, error: updateUrlError } = await supabase
        .from("stores")
        .update({ avatar: url })
        .eq("id", store.id)
        .select();

      if (updateUrlError) {
        console.log("error updating store avatar url:", updateUrlError);
        return;
      }
    };
    handleUpload();
  }, [storeAvatar, store, supabase]);

  return (
    <header className="w-full bg-primary/10 shadow p-4 rounded-2xl flex ">
      <div className="mr-4 relative  rounded-full hover:opacity-80 transition">
        <picture>
          <img
            src={store.avatar}
            alt={store.name}
            className="size-48 rounded-full object-cover object-center border-2 border-primary"
          />
        </picture>
        <button
          onClick={() => storeAvatarRef.current.click()}
          className="absolute bottom-0 right-2 size-8 rounded-full bg-primary hover:bg-primary flex justify-center items-center cursor-pointer"
        >
          <FaEdit className="text-md  text-white/50" />
        </button>
      </div>
      <div className="flex-1  flex flex-col justify-start ml-4">
        <h1 className="text-text font-bold text-4xl capitalize cursor-default">
          {store.name}
        </h1>
        <h4 className="text-lg text-text/70 capitalize ml-1 cursor-default">{`${store.category} - ${store.subCategory}`}</h4>
        <p className="text-text/70 mt-2 ml-1 cursor-default line-clamp-4">
          {store.description ? store.description : "No description available."}
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-start ml-4 mt-4">
        <h4>{`Location: ${store.wilaya} - ${store.commune}`}</h4>
        <h4>{`Phone: ${store.phone}`}</h4>
        <h4>{`Email: ${store.email}`}</h4>

      </div>
      <button className="flex items-center gap-3 bg-primary hover:bg-primary-hover px-4 py-2 rounded cursor-pointer transition-all shadow-lg">
        <p className="text-white">Edit</p>
        <FaEdit className="text-white" />
      </button>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={storeAvatarRef}
        // value={storeAvatar}
        onChange={(e) => setStoreAvatar(e.target.files[0])}
      />
    </header>
  );
};

export default StoreSettingsHeader;
