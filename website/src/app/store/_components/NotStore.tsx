import React from "react";
import Button from "@/components/Button";
import { Text } from "@/components/typography";
import Link from 'next/link';

const NotStore = () => {
  return (
    <div className="h-dvh w-full flex flex-col justify-center items-center gap-3">
      <Text>Please create an account</Text>
      <Link href='createstore' className='transition-all shadow-xl hover:shadow bg-primary hover:bg-primary-hover p-2 px-10 text-white font-bold rounded'>Create</Link>
    </div>
  );
};

export default NotStore;
