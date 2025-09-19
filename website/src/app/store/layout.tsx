import React from "react";
import Link from "next/link";
import { Text } from "@/components/typography";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
const layout = async ({ children }) => {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();
  if (user?.error) {
    redirect("/login");
  }
  const id = user.data.user.id;

  const store = await supabase.from("stores").select("*").eq("owner", id);
  if (store?.error) {
    throw new Error("please create a store");
  }
  const store_id = store.data[0].id;

  const res = await fetch(
    `http://127.0.0.1:3000/api/set-store-id-cookie?value=${store_id}`,
    { method: "GET", credentials: "include" }
  );
  console.log(res);

  //   const { data, error } = await supabase
  //     .from("stores")
  //     .select("*")
  //     .eq("owner", id);

  //   if (error) {
  //     console.log(error);
  //   }

  //   const store_id = data[0].id;

  //   const res = await fetch(`http://192.168.1.44:3000/api/set-store-id-cookie?value=${store_id}`
  //   );
  //   console.log(await res.json());

  return (
    <>
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
          <Link href="/store/settings">
            <Text size="large">Settings</Text>
          </Link>
        </nav>
      </aside>
      <main className="w-full pl-[236px] pr-3 py-5 min-h-screen flex flex-col">
        {children}
      </main>
    </>
  );
};

export default layout;
