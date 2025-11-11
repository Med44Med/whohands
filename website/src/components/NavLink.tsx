"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, className, activeClassName }) => {
  const pathname = usePathname();
  const isActive = href === pathname;  
  return (
    <Link href={href} className={clsx(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
};

export default NavLink;
