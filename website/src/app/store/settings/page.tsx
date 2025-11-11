import React from "react";
import { createClient } from "@/supabase/server";
import DeleteStore from './_components/DeleteStore';
import StoreSettingsHeader from './_components/StoreSettingsHeader';
import StoreSettingsInfo from './_components/StoreSettingsInfo';

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { id } = user;
  const { data } = await supabase.from("stores").select().eq("owner", id);
  const store = data[0];

  return <>
  <StoreSettingsHeader store={store} />
  <StoreSettingsInfo store={store} />
  <DeleteStore store={store} />
  </>
};

export default page;
