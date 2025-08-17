"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.replace(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  return (
    <div className="w-1/6 h-full rounded-xl p-3 bg-surface shadow">
      <ul>
        <li>
          <button onClick={() => handleQueryString("sort", "asc")}>ASC</button>
        </li>
        <li>
          <button onClick={() => handleQueryString("sort", "dsc")}>DSC</button>
        </li>
      </ul>
      <button onClick={() => router.replace(`${pathname}?${newparams}`)}>
        Sidebar
      </button>
    </div>
  );
};

export default Sidebar;
