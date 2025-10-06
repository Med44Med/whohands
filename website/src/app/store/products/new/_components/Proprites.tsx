import React from "react";
import { useState } from "react";

const Row = ({ proprety, values }) => {
  return (
    <tr
      onClick={() => console.log("hello")}
      className="border-b border-gray-300 h-20 duration-300 cursor-pointer hover:bg-gray-100"
    >
      <td className="text-center border-r border-gray-200 text-xl font-bold capitalize">
        {proprety}
      </td>
      <td className="px-10 py-3">
        <ul className="flex justify-start items-center flex-wrap gap-3">
          {values.map((val, index) => (
            <li
              key={index}
              className="px-3 py-1 bg-background rounded-xl min-w-16 text-center uppercase duration-300 hover:bg-gray-300"
            >
              {val}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const Properties = ({
  properties,
  setProperties,
  setShowNewPopup,
  pervPage,
  nextPage,
}) => {
  const handlePerv = () => {
    if (Object.keys(properties).length === 0) {
      pervPage();
    } else {
      const confirmed = window.confirm("Do you want to discard changes?");
      if (confirmed) {
        setProperties({});
        pervPage();
      }
    }
  };

 

  return (
    <div className=" overflow-hidden w-1/4 flex flex-col gap-5 ">
      <div className="flex-1 rounded-xl overflow-y-auto shadow">
        <table className="w-full h-full bg-white">
          <thead className="bg-primary">
            <tr className="border-b border-gray-300">
              <td className="text-white  py-3 px-36 text-center">Property</td>

              <td className="w-full text-white p-3 text-center ">Values</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="">
            {Object.keys(properties).map((p, index) => (
              <Row
                key={index}
                proprety={p}
                values={properties[p]}
                setProperties={setProperties}
              />
            ))}
            <tr>
              <td colSpan="3">
                <button
                  onClick={() => setShowNewPopup(true)}
                  className="p-2 px-10 bg-primary rounded text-white font-semibold cursor-pointer duration-150 hover:bg-primary-hover"
                >
                  Add Proprety
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePerv()}
          className="bg-primary min-w-36 p-2 px-10 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover"
        >
          Perv
        </button>
        <button
          onClick={() => nextPage()}
          className="bg-primary min-w-36 p-2 px-10 text-white rounded duration-150 cursor-pointer hover:bg-primary-hover"
        >
          {Object.keys(properties).length === 0 ? "Skip" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Properties;
