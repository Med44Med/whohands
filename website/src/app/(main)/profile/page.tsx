import React from "react";

import { createClient } from "../../../supabase/server";
import Avatar from "./_components/Avatar";
import CredentialsForm from "./_components/CredentialsForm";
import ResetPasswordForm from "./_components/ResetPasswordForm";
import EraseAccount from './_components/EraseAccount';

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
  const profile = data[0];

  return (
    <main className="w-screen min-h-screen pt-20 pb-5 px-5 flex flex-col justify-start items-center gap-10 overflow-hidden bg-background md:px-10">
      <Avatar profile={profile} />
      <CredentialsForm data={profile} />
      <ResetPasswordForm />
      <EraseAccount />
    </main>
  );
};

export default Page;
