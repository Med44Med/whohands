import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Text } from "@/components/typography";
import { productProperties } from '../../../../../../public/constants';

const AddProperties = ({ show, setShow, setProperties }) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "beige",
    "green",
    "black",
    "white",
    "gray",
    "brown",
    "pink",
    "purple",
    "blue",
  ];
  const [type, setType] = useState("");
  const [property, setProperty] = useState("");
  const [values, setValues] = useState([]);
  const [sizeType, setSizeType] = useState(null);

  useEffect(() => {
    if (type === "other" || type === "") {
      setProperty("");
      return;
    }
    setProperty(type);
    setValues([])
  }, [type]);

  const addToggleColor = (index) => {
    if (values.includes(colors[index])) {
      setValues((prev) => prev.filter((v) => v !== colors[index]));
    } else {
      setValues((perv) => [...perv, colors[index]]);
    }
  };

  const addToggleSize = (index) => {
    if (values.includes(productProperties.size[sizeType][index])) {
      setValues((perv) =>
        perv.filter((v) => v !== productProperties.size[sizeType][index])
      );
    } else {
      setValues((perv) => [...perv, productProperties.size[sizeType][index]]);
    }
  };
  useEffect(() => {
    setValues([]);
  }, [sizeType]);

  //handle packs
  const addTogglePacks = (index) => {
    if (values.includes(productProperties.pack[index])) {
      setValues(perv=>perv.filter(v=>v!==productProperties.pack[index]))
    } else {
      setValues(perv=>[...perv,productProperties.pack[index]])
    }
  };

  const handleProperties = () => {
    if (!property || values.length === 0) {
      return;
    }
    setProperties((perv) => ({ ...perv, [property]: values }));
    setType("");
    setProperty("");
    setValues([]);
    setShow(false);
    setSizeType("");
  };

  console.log(values);

  return (
    show && (
      <div className="fixed inset-0 z-[900]">
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,.2)]"
          onClick={() => setShow(false)}
        ></div>
        <div className="absolute top-1/2 left-1/2 bg-surface w-2/3 h-2/3 -translate-1/2 rounded-xl shadow-2xl p-10 flex justify-center items-start">
          <form className="h-full flex flex-col w-2/3">
            <label className="pb-1">Type of Property :</label>
            <select
              className="p-2 bg-white outline-0 border border-gray-300 rounded mb-3 duration-150 capitalize focus:border-text"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" className="text-gray-400">
                Property type
              </option>
              <option value="color">Colors</option>
              <option value="size">Sizes</option>
              <option value="pack">Packs</option>
              <option value="other">Other</option>
            </select>
            <label className="pb-1">Property Name :</label>
            <input
              type="text"
              className={clsx(
                "p-2 bg-white outline-0 border border-gray-300 rounded mb-3 duration-150 capitalize focus:border-text disabled:bg-transparent"
              )}
              disabled={type !== "other"}
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            />
            {type === "color" && (
              <>
                <label className="pb-1">Values :</label>
                <div className="bg-white w-full h-56 rounded-xl flex flex-wrap justify-center items-center gap-3 p-5 overflow-y-auto">
                  {colors.map((c, index) => (
                    <div
                      key={index}
                      className={clsx(
                        " p-5 min-w-28 flex flex-col justify-center items-center gap-1 rounded-xl border-2 border-gray-300 cursor-pointer duration-300 hover:border-primary",
                        values.includes(c) ? "bg-primary" : "bg-transparent"
                      )}
                      onClick={() => addToggleColor(index)}
                    >
                      <div
                        className="size-8 border border-text rounded-full"
                        style={{ background: c }}
                      ></div>
                      <Text
                        className={clsx(
                          values.includes(c) ? "text-white" : "text-text"
                        )}
                      >
                        {c}
                      </Text>
                    </div>
                  ))}
                </div>
              </>
            )}
            {type === "size" && (
              <>
                <label className="pb-1">Type of size :</label>
                <select
                  className="p-2 bg-white outline-0 border border-gray-300 rounded mb-3 duration-150 capitalize focus:border-text"
                  onChange={(e) => setSizeType(e.target.value)}
                >
                  <option value={null} className="text-gray-400">
                    size type
                  </option>
                  <option value="letters">XS,S,M,L,XL,XXL</option>
                  <option value="numbers">34,35,36,37,38...</option>
                  <option value="words">Small,Normal,Large</option>
                </select>
                {sizeType && (
                  <>
                    <label className="pb-1">Values :</label>
                    <div className="bg-white w-full h-56 rounded-xl flex flex-wrap justify-start items-start gap-3 p-5 overflow-y-auto">
                      {productProperties?.size[sizeType].map((p, i) => (
                        <div
                          key={i}
                          onClick={() => addToggleSize(i)}
                          className={clsx(
                            " py-1 px-3 rounded min-w-16 text-center uppercase cursor-pointer duration-150 border border-transparent hover:border-primary",
                            values.includes(p)
                              ? "bg-primary text-white"
                              : "bg-background text-text"
                          )}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            {type === "pack" && (
              <>
                <label className="pb-1">Number of Packs :</label>
                <div className="bg-white w-full h-56 rounded-xl flex flex-wrap justify-start items-start gap-3 p-5 overflow-y-auto">
                  {productProperties?.pack.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => addTogglePacks(i)}
                      className={clsx(
                        "bg-background py-1 px-3 rounded min-w-16 text-center capitalize cursor-pointer duration-150 border border-transparent hover:border-primary",
                        values.includes(p)
                          ? "bg-primary text-white"
                          : "bg-background text-text"
                      )}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </>
            )}
            <button
              onClick={() => handleProperties()}
              className="bg-primary mt-auto py-3 px-10 rounded w-36 flex justify-center items-center  "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddProperties;
