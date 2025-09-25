"use client";
import React from "react";
import { Title, Text } from "@/components/typography";
import Button from "@/components/Button";
import { useState } from "react";
import ProgressBySteps from "@/components/ProgressBySteps";
import General from "./General";
import Variants from "./Variants";

const Contents = ({ store }: { store: string }) => {
  const pages = ["general", "variants", "prices", "images"];
  const [currentPage, setCurrentPage] = useState(1);
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
        <div className="w-full flex-1 relative mt-10 overflow-hidden bg-amber-300">
          <div
            className="absolute h-full w-[300%] flex transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${-(currentPage - 1) * 33.33}%)` }}
          >
            <General store={store} nextPage={nextPage} setId={setId} />
            <Variants
              store={store}
              product={id}
              pervPage={pervPage}
              nextPage={nextPage}
            />
            <div className="flex-1 px-20 flex flex-col gap-1">b</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contents;
