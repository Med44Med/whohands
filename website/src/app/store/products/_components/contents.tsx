"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Title, Text } from "@/components/typography";
import Button from "@/components/Button";
import { FaSort, FaExternalLinkAlt } from "react-icons/fa";
import Price from "../../../../components/Price";
import Link from "next/link";
import ProductsHeader from "./ProductsHeader";

const Contents = ({ data }) => {
  const [products, setProducts] = useState(data);
  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <>
      <ProductsHeader />
      <div className="bg-surface w-full flex-1 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-start items-start gap-5">
        <table className="w-full">
          <thead className="bg-primary ">
            <tr>
              <th className="py-3 text-white">
                <button className="w-full flex justify-center items-center gap-3 cursor-pointer">
                  <Text size="large" className="!text-white  !font-semibold">
                    Title
                  </Text>
                  <FaSort className="!text-white" />
                </button>
              </th>
              <th className="py-3 text-white">
                <button className="w-full flex justify-center items-center gap-3 cursor-pointer">
                  <Text size="large" className="!text-white  !font-semibold">
                    Price
                  </Text>
                  <FaSort className="!text-white" />
                </button>
              </th>
              <th className="py-3 text-white">
                <button className="w-full flex justify-center items-center gap-3 cursor-pointer">
                  <Text size="large" className="!text-white  !font-semibold">
                    Views
                  </Text>
                  <FaSort className="!text-white" />
                </button>
              </th>
              <th className="py-3 text-white">
                <button className="w-full flex justify-center items-center gap-3 cursor-pointer">
                  <Text size="large" className="!text-white  !font-semibold">
                    Ordered
                  </Text>
                  <FaSort className="!text-white" />
                </button>
              </th>
              <th className="py-3 text-white"></th>
              <th className="py-3 text-white"></th>
              <th className="py-3 text-white"></th>
              <th className="py-3 text-white"></th>
              <th className="py-3 text-white"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr
                key={index}
                className="border-b-2 border-gray-300 duration-150 hover:bg-gray-200"
              >
                <td className="w-full p-5">
                  <div className="flex justify-start items-center gap-3">
                    <picture>
                      <img
                        src="https://picsum.photos/200/300"
                        alt={prod.title}
                        className="size-10 bg-amber-300 rounded-full "
                      />
                    </picture>
                    <Text size="large">{prod.title}</Text>
                  </div>
                </td>
                <td className="w-fit py-3 px-20 text-center">
                  <Text size="normal" className="!text-gray-500 !font-medium">
                    {prod.price}
                  </Text>
                </td>
                <td className="w-fit py-3 px-20 text-center">
                  <Text size="normal" className="!text-gray-500 !font-medium">
                    {prod.views}
                  </Text>
                </td>
                <td className="w-fit py-3 px-20 text-center">
                  <Text size="normal" className="!text-gray-500 !font-medium">
                    {prod.ordered || 0}
                  </Text>
                </td>
                <td className="py-3 px-20 w-fit">
                  <div className="w-fit flex justify-center items-center gap-3">
                    <Button title="Details" icon={<FaExternalLinkAlt />} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="py-10 text-center ">
                <div className="w-full flex justify-center items-center ">
                  <Link href="/store/products/new">Add a Product</Link>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Contents;
