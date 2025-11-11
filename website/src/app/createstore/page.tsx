import React from "react";
import CreateStoreForm from "./_components/CreateStoreForm";
import { FaStoreAlt } from "react-icons/fa";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { id } = user;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id);

  if (profile[0]?.role === "seller") {
    redirect("/store");
  }

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center">
      <FaStoreAlt className="size-56 text-primary" />
      <p>Create a Store</p>
      <CreateStoreForm id={id} />
    </main>
  );
};

export default page;
