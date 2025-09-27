"use client";

import React from "react";
import { Title, Text } from "@/components/typography";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import ProgressBySteps from "@/components/ProgressBySteps";
import General from "./General";
import Variants from "./Variants";

const Contents = ({ store }: { store: string }) => {
  const pages = ["general", "variants", "prices", "images"];
  const [currentPage, setCurrentPage] = useState(2);
  const [id, setId] = useState<string>("");

  const nextPage = () => {
    if (currentPage === pages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const pervPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const [product, setProduct] = useState({
    title: "",
    descreption: "",
    category: "",
    sub_category: "",
  });

  const [proprites, setProprites] = useState({});
  const [variants, setVariants] = useState(null);
  const [images, setImages] = useState(null);

  // this handle if ther is a saved draft and if we want to use it back
  useEffect(() => {
    const draft = localStorage.getItem("NEW_PRODUCT_DRAFT");
    if (draft) {
      if (confirm("There is a saved draft\ndo want to continue with it ?")) {
        const parsed = JSON.parse(draft);

        if (parsed?.images) {
          setImages(parsed?.images);
          setVariants(parsed?.variants);
          setProprites(parsed?.proprites);
          setCurrentPage(4);
          return;
        }
        if (parsed?.variants) {
          setVariants(parsed?.variants);
          setProprites(parsed?.proprites);
          setCurrentPage(3);
          return;
        }
        if (parsed?.proprites) {
          setProprites(parsed?.proprites);
          setCurrentPage(2);
          return;
        }
        setProduct(parsed?.product);
        setCurrentPage(1);
      } else {
        localStorage.removeItem("NEW_PRODUCT_DRAFT");
      }
    }
  }, []);

console.log(proprites);

  return (
    <>
      <header className="w-full pt-10 py-3 flex justify-between items-center">
        <Title size="big">Add new Products</Title>
        <div className="flex justify-center items-center gap-3">
          <Button title="Save Draft" />
          <Button title="add Product" />
        </div>
      </header>
      <div className="flex-1 w-full bg-surface rounded-2xl p-10 flex flex-col justify-start items-center">
        <ProgressBySteps steps={pages} progress={currentPage} />
        <div className="w-full flex-1 relative mt-10 overflow-hidden ">
          <div
            className="absolute h-full w-[400%] flex transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${-(currentPage - 1) * 25}%)` }}
          >
            <General
              product={product}
              setProduct={setProduct}
              nextPage={nextPage}
            />
            <Variants
              proprites={proprites}
              setProprites={setProprites}
              pervPage={pervPage}
              nextPage={nextPage}
            />
            <div className="bg-red-200 flex-1 px-20 flex flex-col gap-1">b</div>
            <div className="bg-red-500 flex-1 px-20 flex flex-col gap-1">b</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contents;
