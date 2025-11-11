"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ClientEffect = ({ store_id }: { store_id: string }) => {
  useEffect(() => {
    const id = Cookies.get("STORE_ID");

    if (!id) {
      fetch("/api/set-store-id-cookie?value=" + store_id, {
        credentials: "include",
      });
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    }
  }, [store_id]);

  return;
};

export default ClientEffect;
