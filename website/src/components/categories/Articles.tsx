import React from "react";
import Link from "next/link";

type itemType = {
  name: string;
};

const Articles = ({ data }: { data: itemType[] }) => {
  return data ? (
    <div className="mt-5 w-full min-h-96 flex justify-start items-start flex-wrap gap-y-10">
      {data?.map((item, index) => (
        <div
          key={index}
          className="w-full h-96   flex sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <Link
            href={`/items/${item.name}`}
            className="h-full w-full mr-3 bg-surface rounded-xl shadow p-3 flex flex-col justify-start items-center gap-3"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full min-h-96 flex flex-col justify-center items-center gap-3">
      <p className="text-xl font-poppins font-light text-text">
        there is no items
      </p>
      <Link
        className="bg-primary p-5 px-10 rounded text-base font-poppins font-medium text-white"
        href="/categories"
      >
        Clear Filters
      </Link>
    </div>
  );
};

export default Articles;
