import React from "react";
import Link from "next/link";

import { BsGrid3X3GapFill } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import ArtistInfo from "./_components/artistInfo";
import ArtistItems from "./_components/artistItems";

const artist = {
  id: "52",
  name: "Bob Marely",
  avatar: "https://picsum.photos/id/44/200/200",
  category: "jewelrys",
  descreption:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate fuga aperiam esse eos sint porro quos similique. Ipsum animi ipsam, non consequatur earum libero ad harum quaerat! Rerum sunt dignissimos quo aspernatur. Delectus id, natus ad dicta fuga accusamus sed ab odio, maxime, sint nesciunt animi commodi mollitia? Aliquid, quod.",
};

const items = ["hello", "hello", "hello", "hello", "hello", "hello"];

const Page = async ({
  params,
}: {
  params: { [key: string]: string | undefined };
}) => {
  const { id } = await params;

  return (
    <main className="w-full min-h-screen mt-20 px-3 flex flex-col justify-start items-start gap-3">
      <ArtistInfo artist={artist} />
      <ArtistItems items={items} />
    </main>
  );
};

export default Page;
