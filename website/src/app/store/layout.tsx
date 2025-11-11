"use server";

import React from "react";
import Link from "next/link";
import { Text } from "@/components/typography";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientEffect from "./_components/clienteffect";
import Button from "@/components/Button";
import NotStore from './_components/NotStore';
import NavLink from '@/components/NavLink';

const layout = async ({ children }) => {
  const supabase = await createClient();

  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser();
  if (!id) {
    redirect("/login");
  }

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("owner", id);
  if (store.length === 0) {
    return <NotStore />
  }

  const store_id = store[0].id;

  // await setStoreId(store_id);

  // const res = await fetch(
  //   "http://127.0.0.1:3000/api/set-store-id-cookie?value=" + store_id,
  //   {
  //     headers: { Cookie: (await cookies()).toString() },
  //   }
  // );
  // console.log(res);

  return (
    <>
      <ClientEffect store_id={store_id} />
      <aside className="fixed top-0 left-0 h-screen w-56 bg-surface shadow">
        <nav className="w-full flex flex-col">
          <Link href="/store">
            <Text size="large">Dashboard</Text>
          </Link>
          <Link href="/store/products">
            <Text size="large">Products</Text>
          </Link>
          <Link href="/store/orders">
            <Text size="large">Orders</Text>
          </Link>
          <Link href="/store/messages">
            <Text size="large">Messages</Text>
          </Link>
          <NavLink href="/store/settings" className="mt-auto " activeClassName="font-bold bg-primary/10 text-primary ">
            <Text size="large">Settings</Text>
          </NavLink>
        </nav>
      </aside>
      <main className="w-full pl-[264px] pr-10 py-5 min-h-screen flex flex-col">
        {children}
      </main>
    </>
  );
};

export default layout;
