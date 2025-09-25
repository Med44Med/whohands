import React from "react";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import Button from "@/components/Button";
import Price from "../../../../../components/Price";

const Variants = ({ pervPage, nextPage, product, store }) => {
  const supabase = createClient();
  const [variants, setVariants] = useState([]);
  const [properties, setProperties] = useState<string[]>([]);
  const [addProperty, setAddProperty] = useState<string>("");
  const handleProperties = () => {
    if (!addProperty) {
      alert("please add property name");
      return;
    }
    setProperties(properties.push(addProperty));
    setAddProperty("");
  };

  const handleVariants = async () => {
    const results = await Promise.all(
      variants.map(async (v) => {
        const { error } = await supabase
          .from("products_variants")
          .insert([{ product, store, variant: v }]);
        if (error) {
          console.log(error);
          return error;
        }
        return {};
      })
    );
  };
  return (
    <div className="overflow-y-auto flex-1 px-0 flex flex-col gap-1 md:px-20">
      <table className="overflow-hidden rounded-xl shadow mb-5">
        <thead className="bg-primary">
          <tr>
            <td className="text-white  py-3 text-center w-full">Variant</td>
            <td className="text-white px-24 p-3 text-center ">Price</td>
            <td className="text-white px-16 p-3 text-center text-nowrap ">
              Promoted Price
            </td>

            <td></td>
          </tr>
        </thead>
        <tbody className="bg-surface">
          {variants.length === 0 ? (
            <tr>
              <td className='font-medium text-xl p-3'>Default Variant</td>
              <td>2000,00</td>
              <td> - </td>
            </tr>
          ) : (
            <tr>b</tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <div className="p-10 w-full flex justify-center items-center gap-3 ">
                <input
                  type="text"
                  placeholder="Add a Variant"
                  className="bg-background px-3 py-1 rounded outline-0 border border-gray-300"
                />
                <button className="bg-primary px-5 py-1 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover">
                  Add
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-between items-center">
        <button className="bg-primary px-5 py-1 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover">
          Perv
        </button>
        <button className="bg-primary px-5 py-1 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover">
          Next
        </button>
      </div>
    </div>
  );
};

export default Variants;
