"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FaRegHeart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

import Link from "next/link";

dayjs.extend(relativeTime);

const ItemDetails = ({ item }) => {
  const [showText, setShowText] = useState("details");
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    setSelectedModel(() => {
      let mod = {};
      for (let i = 0; i < item?.models?.length; i++) {
        mod = { ...mod, [item?.models[i]?.name]: "" };
      }
      return mod;
    });
  }, [item]);

  console.log(selectedModel);
  const handleSubmit = async ()=>{
    alert(JSON.stringify(selectedModel))
  }

  return (
    <div className="flex-1 h-1/2 w-full p-5 flex flex-col justify-start items-start gap-1 md:h-full ">
      <div className="h-fit overflow-y-auto w-full">
        <Link
          href={`/store/${item?.user_id}`}
          className="font-poppins font-normal text-xs text-text hover:underline"
        >
          {item?.user_id || "Alpha blondy Textile"}
        </Link>
        <h1 className="w-11/12 text-text text-wrap text-3xl font-semibold font-playfair tracking-tight leading-none capitalize md:text-5xl">
          {item?.title} of course alerady in the mood to add some Code
        </h1>
        <div className="flex justify-start items-center gap-1">
          <p className="text-sm font-poppins font-normal">5.0</p>
          <IoIosStar className="" />
          <p className="text-xs text-text-secondary font-poppins font-normal cursor-pointer hover:underline">{`(495 reviews)`}</p>
        </div>
        <p className="py-5 text-text text-wrap text-3xl font-normal font-poppins tracking-tight capitalize md:text-5xl">
          63 200,00 DA
        </p>
        {item?.models.map((model) => (
          <div key={model.name} className="mb-3">
            <p className="capitalize font-playfair font-normal text-xl text-text tracking-tighter md:text-2xl">
              {model?.name}
            </p>
            <div className="flex flex-wrap justify-start items-center gap-3 py-3 md:gap-5">
              {model?.name === "colours"
                ? model?.values.map((color) => (
                    <div
                      key={color}
                      onClick={() =>
                        setSelectedModel((perv) => ({
                          ...perv,
                          [model?.name]: color,
                        }))
                      }
                      className={`p-3 border-b-2 border-transparent [&.active]:border-primary ${
                        selectedModel?.[model?.name] === color && "active"
                      }`}
                    >
                      <p
                        className="size-10 rounded-full border-4 border-transparent "
                        style={{ backgroundColor: color }}
                      ></p>
                    </div>
                  ))
                : model?.values.map((value) => (
                    <div
                      onClick={() =>
                        setSelectedModel((perv) => ({
                          ...perv,
                          [model?.name]: value,
                        }))
                      }
                      className={`rounded uppercase font-playfair font-normal text-base text-text tracking-tighter border px-5 py-1 cursor-pointer duration-300 hover:bg-primary hover:text-white [&.active]:bg-primary [&.active]:text-white md:text-xl 
                        ${selectedModel?.[model?.name] === value && "active"}
                          `}
                      key={value}
                    >
                      {value}
                    </div>
                  ))}
            </div>
          </div>
        ))}
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-start">
            <p
              onClick={() => setShowText("details")}
              className={`px-4 border-b-2 font-poppins  cursor-pointer  duration-300 hover:text-text ${
                showText === "details" ? "text-text" : "text-text-secondary "
              }`}
            >
              Details
            </p>
            <p
              onClick={() => setShowText("specs")}
              className={`px-4 border-b-2 font-poppins font-medium cursor-pointer  duration-300 hover:text-text ${
                showText === "specs" ? "text-text" : "text-text-secondary"
              }`}
            >
              Specs
            </p>
            <p
              onClick={() => setShowText("return")}
              className={`px-4 border-b-2 font-poppins font-medium cursor-pointer  duration-300 hover:text-text ${
                showText === "return" ? "text-text" : "text-text-secondary"
              }`}
            >
              Shipping & return
            </p>
          </div>
          <div className="w-full min-h-56 py-3">
            <p
              className={`text-text-secondary text-xs font-poppins text-justify ${
                showText === "details" ? "block" : "hidden"
              }`}
            >
              {item?.description}
            </p>
            <p
              className={`text-text-secondary text-xs font-poppins text-justify ${
                showText === "specs" ? "block" : "hidden"
              }`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est unde
              mollitia optio fugit fugiat commodi, molestias distinctio, facere
              nam necessitatibus rem nisi? Consequatur, possimus quasi?
            </p>
            <p
              className={`text-text-secondary text-xs font-poppins text-justify ${
                showText === "return" ? "block" : "hidden"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
              odio culpa eius. Autem modi, nostrum doloremque magni, itaque
              saepe, nemo dignissimos tenetur quaerat inventore odio optio enim!
              Eum impedit aut enim repellendus vero praesentium reprehenderit
              natus fugit totam quidem deleniti et cumque asperiores illo
              adipisci iste, dolorum officiis. Dignissimos, alias?
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full flex justify-end gap-3">
        <button className="border border-primary p-3 px-5 rounded text-primary text-xl cursor-pointer">
          <FaRegHeart />
        </button>
        <button onClick={()=>handleSubmit()} className="bg-primary w-full py-3  rounded text-white font-medium font-poppins hover:bg-primary-hover transition duration-300 cursor-pointer">
          Buy
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
