"use client";
import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Alert from "./Alert";
import { Text } from "@/components/typography";
import { IoClose } from "react-icons/io5";
import Button from "@/components/Button";

const LayoutConfig = () => {
  const [CookiesBanner, setCookiesBanner] = useState(false);

  useEffect(() => {
    const cookies_access = Cookies.get("cookies_access");
    if (!cookies_access) {
      setCookiesBanner(true);
    } else {
      Cookies.set("cookies_access", cookies_access, { expires: 365, path: "" });
    }
  }, []);

  const handleCookiesSuccess = () => {
    Cookies.set("cookies_access", "success", { expires: 365, path: "" });
    const data = JSON.stringify({
      last_searched: [],
      visited_products: [],
      visited_store: [],
    });
    Cookies.set("user_history", data, { expires: 365, path: "" });
    setCookiesBanner(false);
  };

  const handleCookiesDenied = () => {
    Cookies.set("cookies_access", "denied", { expires: 1, path: "" });
    setCookiesBanner(false);
  };

  return (
    <Alert
      show={CookiesBanner}
      className="flex flex-col justify-start items-start gap-3"
    >
      <div className="w-full flex justify-between items-center">
        <Text className="!text-background font-bold text-xl">
          Cookies Settings
        </Text>
        <IoClose
          onClick={() => handleCookiesDenied()}
          className="!text-background font-bold text-xl"
        />
      </div>
      <Text size="small" className="!text-background w-full">
        We use cookies Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Aliquam, iusto! Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Laboriosam iste libero placeat necessitatibus eum, vel deserunt
        doloremque molestiae animi aspernatur!{" "}
      </Text>
      <Button
        title="accept"
        className="!bg-surface ml-auto [&>*]:text-text"
        onClick={() => handleCookiesSuccess()}
      />
    </Alert>
  );
};

export default LayoutConfig;
