import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden h-[calc(100vh-100px)] flex-col gap-6 flex items-center justify-center">
      <picture>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1TYtu-LNAAGlQXprEs9xZmux_uOXArfYxxpKkCSbsxF2SK3kX-DtiqDceHtx-jmf-Dhpakw6PA6xyySO_NRGFJY5_xcsywnD0cdK3fQQoB9TE5KsLUC7NaNGE7AcMLGKCuF-92nXet-yIJTwDMDh1hkQ-XlEIwTLHPH8KloV68b_FAoYXk2A0lK48nacjSmo1OyUfIxPdRo9KfrY01WTWz7p36b3-JZhhubn6wHfHybh_VTKfq5udUOZVwJdokrM4RsXFA6PE5x4"
          alt="hero"
          className="absolute left-0 top-0 w-full aspect-video bg-cover bg-center bg-no-repeat -z-10"
        />
      </picture>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white text-5xl font-black font-playfair leading-tight tracking-tight ">
          Discover Unique Handmade Creations
        </h1>
        <h2 className="text-white text-sm font-normal leading-normal font-poppins">
          Explore a curated collection of handcrafted items from talented
          artisans.
        </h2>
      </div>
      <Link
        href="login"
        className="bg-primary p-2 px-10 rounded flex justify-center items-center gap-2 hover:bg-primary-hover"
      >
        <p className="text-surface text-xl font-medium font-poppins uppercase shadow ">
          Shop
        </p>
      </Link>
    </div>
  );
};

export default Hero;
