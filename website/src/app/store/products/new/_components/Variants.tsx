import React from "react";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import Button from "@/components/Button";
import Price from "../../../../../components/Price";

const Variants = ({ proprites, setProprites, pervPage, nextPage }) => {
  const [addProperty, setAddProperty] = useState<string>("");
  const [addValue, setAddValue] = useState<string>("");

  const hadnleValue = (prop) => {
    if (!addValue) {
      return;
    }
    setProprites((perv) => ({
      ...perv,
      [prop]: [...perv[prop], addValue],
    }));
    setAddValue("");
  };
  const hadnleProprety = () => {
    if (!addProperty) {
      return;
    }
    setProprites((perv) => ({ ...perv, [addProperty]: [] }));
    setAddProperty("");
  };

  // const handleVariants = async () => {
  //   const results = await Promise.all(
  //     variants.map(async (v) => {
  //       const { error } = await supabase
  //         .from("products_variants")
  //         .insert([{ product, store, variant: v }]);
  //       if (error) {
  //         console.log(error);
  //         return error;
  //       }
  //       return {};
  //     })
  //   );
  // };
  return (
    <div className="overflow-y-auto flex-1 px-0 flex flex-col gap-3 md:px-20">
      <div className="pt-10  flex justify-end items-center">
        <button className="p-2 px-10 bg-primary rounded text-white font-semibold cursor-pointer duration-150 hover:bg-primary-hover">
          Add
        </button>
      </div>
      <table className="flex-1 overflow-y-auto rounded-xl shadow mb-5">
        <thead className="bg-primary">
          <tr className="border-b border-gray-300">
            <td className="text-white  py-3 px-36 text-center">Property </td>
            <td className="w-full text-white p-3 text-center ">Values</td>
            <td></td>
          </tr>
        </thead>
        <tbody >
          <tr >
            <td colSpan="3">
              <div className='flex flex-col justify-center items-center w-full ' >
                <p className='text-xl '>There is no propreties of your product</p>
                <div className='flex gap-3'>
                  <buttun className="p-2 px-10 bg-primary rounded text-white font-semibold cursor-pointer duration-150 hover:bg-primary-hover">Add Proprety</buttun>
                  <buttun className="p-2 px-10 bg-primary rounded text-white font-semibold cursor-pointer duration-150 hover:bg-primary-hover">Skip Propreties</buttun>
                </div>
              </div>
            </td>
          </tr>
          {/* {Object.keys(proprites).map((pr, index) => (
            <tr key={index}>
              <td className="py-3 text-center">{pr}</td>
              <td className="py-3 text-start">
                <div className="px-3">
                  {proprites[pr].toString()}
                  <input
                    type="text"
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                    className="bg-background px-3 py-1 rounded-xl outline-0 border border-b-gray-300"
                  />
                  <button onClick={() => hadnleValue(pr)}>Add</button>
                </div>
              </td>
              <td className="py-3 px-10 text-start">...</td>
            </tr>
          ))} */}
        </tbody>
        {/* <tfoot>
          <tr>
            <td colSpan="3">
              <div className="p-10 w-full flex justify-center items-center gap-3 ">
                <input
                  type="text"
                  placeholder="Add a Property"
                  className="bg-background px-3 py-1 rounded outline-0 border border-gray-300"
                  value={addProperty}
                  onChange={(e) => setAddProperty(e.target.value)}
                />
                <button
                  onClick={() => hadnleProprety()}
                  className="bg-primary px-5 py-1 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover"
                >
                  Add
                </button>
              </div>
            </td>
          </tr>
        </tfoot> */}
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
