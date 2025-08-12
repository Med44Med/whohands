import React from "react";
import Header from "../../components/Header";
import { createClient } from "@/supabase/server";

const MainLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  
  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();

  return (
    <>
      <Header user={user} />
      {children}
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
            <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
              <a
                className="text-[#60758a] text-base font-normal leading-normal min-w-40"
                href="#"
              >
                About
              </a>
              <a
                className="text-[#60758a] text-base font-normal leading-normal min-w-40"
                href="#"
              >
                Contact
              </a>
              <a
                className="text-[#60758a] text-base font-normal leading-normal min-w-40"
                href="#"
              >
                FAQ
              </a>
            </div>
            <p className="text-[#60758a] text-base font-normal leading-normal">
              @2024 joysMaker. All rights reserved.
            </p>
          </footer>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
