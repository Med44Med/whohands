"use client";

import React from "react";
import { Title, Text } from "@/components/typography";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import ProgressBySteps from "@/components/ProgressBySteps";
import General from "./General";
import Proprites from "./Proprites";
import AddProperties from "./AddProperties";
import Prices from "./Prices";
import { createClient } from "@/supabase/client";

const Contents = ({ store }: { store: string }) => {
  const pages = ["general", "variants", "prices", "images"];
  const [currentPage, setCurrentPage] = useState(2);

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

  const [properties, setProperties] = useState({});
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState(null);

  const [showNewPopup, setShowNewPopup] = useState(true);
  const [Loading, setLoading] = useState(false);

  // this handle if ther is a saved draft and if we want to use it back
  useEffect(() => {
    const draft = localStorage.getItem("NEW_PRODUCT_DRAFT");
    if (draft) {
      if (confirm("There is a saved draft\ndo want to continue with it ?")) {
        const parsed = JSON.parse(draft);

        if (parsed?.images) {
          setImages(parsed?.images);
          setVariants(parsed?.variants);
          setProperties(parsed?.properties);
          setCurrentPage(4);
          return;
        }
        if (parsed?.variants) {
          setVariants(parsed?.variants);
          setProperties(parsed?.properties);
          setCurrentPage(3);
          return;
        }
        if (parsed?.proprites) {
          setProperties(parsed?.properties);
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

  const handleNewProduct = async () => {
    const supabase = createClient();
    const insertProduct = await supabase
      .from("products")
      .insert([product])
      .select();
    if (insertProduct.error) {
      console.log(insertProduct.error);
      return;
    }

    //insert variants
    const newArrayVariants = variants.map((v) => {
      return { ...v, product: insertProduct.data.id, store };
    });
    const insertVariants = await supabase
      .from("products_variants")
      .insert(newArrayVariants)
      .select();

    if (insertVariants.error) {
      console.log(insertVariants.error);
      return;
    }
    
    //insert images

  };

  return (
    <>
      <header className="w-full pt-10 py-3 flex justify-between items-center">
        <Title size="big">Add new Products</Title>
      </header>
      <div className="flex-1 w-full bg-surface rounded-2xl p-10 flex flex-col justify-start items-center">
        <ProgressBySteps steps={pages} progress={currentPage} />
        <AddProperties
          show={showNewPopup}
          setShow={setShowNewPopup}
          setProperties={setProperties}
        />
        <div className="w-full flex-1 relative mt-10 overflow-hidden">
          <div
            className="absolute h-full w-[400%] flex transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${-(currentPage - 1) * 25}%)` }}
          >
            <General
              product={product}
              setProduct={setProduct}
              nextPage={nextPage}
            />
            <Proprites
              properties={properties}
              setProperties={setProperties}
              setShowNewPopup={setShowNewPopup}
              pervPage={pervPage}
              nextPage={nextPage}
            />
            <Prices
              properties={properties}
              pervPage={pervPage}
              nextPage={nextPage}
              variants={variants}
              setVariants={setVariants}
            />
            <div className="rounded-xl overflow-hidden w-1/4 flex flex-col gap-3">
              b
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contents;
