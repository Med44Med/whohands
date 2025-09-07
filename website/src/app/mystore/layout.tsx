import React from "react";
import Link from 'next/link';

const MyStoreLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="w-full h-screen flex justify-start items-start">
      <aside className="bg-amber-300 w-fit p-10 h-screen flex flex-col justify-start items-start">
        <Link href='/mystore'>OverView</Link>
        <Link href='/mystore'>Analytics</Link>
        <Link href='/mystore'>Products</Link>
        <Link href='/mystore'>Sales</Link>
      </aside>
      {children}
    </main>
  );
};

export default MyStoreLayout;
