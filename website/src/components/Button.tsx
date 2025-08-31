import React from "react";
import clsx from "clsx";

const Button = ({ title, onClick, className, icon, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "w-fit shadow-xl rounded px-5 py-2 bg-primary cursor-pointer duration-300 hover:bg-primary-hover flex justify-center items-center gap-3 last:text-white last:text-2xl",
        className
      )}
    >
      <p className="text-white text-base  font-normal capitalize not-last:pl-2">
        {title}
      </p>
      {icon}
    </button>
  );
};

export default Button;
