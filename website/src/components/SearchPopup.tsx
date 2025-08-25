"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";

const SearchPopup = ({ showSearchBanner, setShowSearchBanner }: {}) => {
  const searchInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [recentlySearched, setRecentlySearched] = useState<string[]>([]);

  const handleSearch = async () => {
    const strg = JSON.parse(localStorage.getItem("recentlySearched"));
    localStorage.setItem(
      "recentlySearched",
      JSON.stringify([...strg, searchText])
    );
    setSearchText("");
  };

  const handleEnterKey = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    if (searchText.length > 3) {
      handleSearch();
    } else {
      setError("must be more than 3 letter");
    }
  };

  useEffect(() => {
    searchInputRef.current.focus();
    const data = JSON.parse(localStorage.getItem("recentlySearched"));
    if (!data) {
      localStorage.setItem("recentlySearched", JSON.stringify([]));
      setRecentlySearched([]);
      return;
    }
    setRecentlySearched(data);
  }, []);

  useEffect(() => {
    //add search suggestion when search text is more than 4 letters
    setError("");
  }, [searchText]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        onClick={() => setShowSearchBanner(false)}
        className="absolute inset-0 bg-[rgba(0,0,0,.6)] cursor-pointer"
      ></div>
      <div className="z-10 bg-background w-10/12 h-10/12 md:w-4/5 md:h-4/5 rounded-xl shadow-xl py-3 px-5 flex flex-col justify-start items-center gap-2">
        <input
          ref={searchInputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
          className="w-full p-3 px-5 mt-3 rounded-2xl border outline-none bg-surface shadow text-base text-text  font-medium"
          type="text"
          placeholder="Search..."
          autoFocus //check it later
        />
        {error && (
          <p className="w-full px-3 text-start text-base text-red-500 ">
            {error}
          </p>
        )}
        {searchText.length <= 3 ? (
          <>
            <div className="w-full bg-surface p-3 rounded-2xl flex flex-col gap-3">
              <p className="w-full text-text text-xl md:text-3xl font-black font-playfair tracking-tight capitalize">
                recently searched
              </p>
              <div className="flex justify-start items-center gap-3 flex-wrap">
                {recentlySearched.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center rounded-4xl p-1 px-3 border"
                  >
                    <p className="text-base text-text  capitalize">
                      {item}
                    </p>
                    <IoMdClose className="cursor-pointer"/>
                  </div>
                ))}
              </div>
              <p className="text-base text-primary  underline self-end">
                Clear All
              </p>
            </div>
            <div className="w-full bg-surface p-3 rounded-2xl flex flex-col gap-3">
              <p className="w-full text-text text-xl md:text-3xl font-black font-playfair tracking-tight capitalize">
                most searched
              </p>
              <div className="flex justify-start items-center gap-3 flex-wrap">
                <div className="flex gap-3 items-center rounded-4xl p-1 px-3 border">
                  <p className="text-base text-text ">hello</p>
                </div>
                <div className="flex gap-3 items-center rounded-4xl p-1 px-3 border">
                  <p className="text-base text-text ">
                    hello world
                  </p>
                </div>
                <div className="flex gap-3 items-center rounded-4xl p-1 px-3 border">
                  <p className="text-base text-text ">be kind</p>
                </div>
                <div className="flex gap-3 items-center rounded-4xl p-1 px-3 border">
                  <p className="text-base text-text ">fork</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full bg-surface p-3 rounded-2xl flex flex-col gap-3">
            <p className="w-full text-text text-xl md:text-3xl font-black font-playfair tracking-tight capitalize">
              suggestions
            </p>
            <div className="flex justify-start items-center gap-3 flex-wrap"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
