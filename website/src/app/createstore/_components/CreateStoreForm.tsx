"use client";
import React from "react";
import InputField from "../../../components/InputField";
import { createClient } from "@/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { wilayas, communes } from "../../../../public/location";
import { categories } from "../../../../public/categories";

const CreateStoreForm = ({ id }: { id: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [store, setStore] = useState({ name: "", owner: id });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlecreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error: storeErr } = await supabase
      .from("stores")
      .insert([store])
      .select();
    if (storeErr) {
      setErrorMessage(storeErr.message);
      setLoading(false);
      return;
    }
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({ role: "seller" })
      .eq("id", store.owner)
      .select();
    if (updateErr) {
      console.log(updateErr);
    }
    setLoading(false);
    router.push("/store");
  };
  console.log(store);

  return (
    <form
      // action={createStoreAction}
      className=" w-2/3 p-5 flex flex-col justify-start items-center gap-3"
      onSubmit={(e) => handlecreate(e)}
    >
      <InputField
        className="w-full"
        label="store name"
        value={store.name}
        onChange={(e) =>
          setStore((perv) => ({ ...perv, name: e.target.value }))
        }
      />
      <select
        onChange={(e) =>
          setStore((perv) => ({
            ...perv,
            category: e.target.value,
            subCategory: null,
          }))
        }
      >
        {/* <option>Select a category</option> */}
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) =>
          setStore((perv) => ({ ...perv, subCategory: e.target.value }))
        }
        disabled={!store.category}
      >
        {categories
          .filter((c) => c.slug === store.category)[0]
          ?.subCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
      </select>
      <select
        onChange={(e) => {
          setStore((perv) => ({ ...perv, wilaya: e.target.value }));
        }}
      >
        {wilayas.map((w) => (
          <option key={w.id}>{w.name}</option>
        ))}
      </select>
      {/* <select name="" id="" disabled={!store.wilaya}>
        {communes.filter(c=>c.wilaya_id === wilayas[]).map((c) => (
          <option key={c.id}>{c.name}</option>
        ))}
      </select> */}
      <button type="submit">{loading ? "Loading..." : "Create"}</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CreateStoreForm;
