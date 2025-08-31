import React from "react";
import Header from "@/components/Header";
import Footer from '@/components/Footer';

const MainLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  

  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
