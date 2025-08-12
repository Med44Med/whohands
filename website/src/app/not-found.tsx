import React from "react";
import Link from "next/link";

const Notfound = async () => {
  return (
    <main className="w-full h-screen flex justify-center items-center flex-col">
      <p className="font-playfair font-black tracking-tight text-text text-3xl">
        Oups
      </p>
      <p className="font-playfair font-black tracking-tight text-text text-5xl">
        This Page in not available
      </p>
      <div className="mt-5 flex justify-center items-center gap-5 ">
        <Link href="/" replace className='bg-primary hover:bg-primary-hover p-3 px-10 text-base font-poppins font-medium text-white rounded transition-colors duration-300'>
          Homepage
        </Link>
      </div>
    </main>
  );
};

export default Notfound;
