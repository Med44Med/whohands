import React from "react";
import { createClient } from "../../../supabase/server";

const Page = async () => {
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();
  const id = auth?.data?.user?.id;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error);
  }
  const profile = data[0]
  return (
    <main className="w-screen h-fit pt-20 pb-5 px-5 flex flex-col justify-start items-start gap-3 overflow-hidden bg-background md:h-screen md:px-10">
        <picture><img src={profile.avatar_url} alt="" className="size-72 rounded-full" /></picture>
        <p>{profile.email}</p>
    </main>
  );
};

export default Page;
