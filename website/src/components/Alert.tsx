import React from "react";
import clsx from "clsx";

const Alert = ({ children, show = true, className }) => {
  return (
    <div
      className={clsx(
        "fixed bottom-5 right-10 bg-primary rounded-xl shadow-2xl min-h-20 w-sm duration-500 transition-transform p-5",
        show ? "translate-y-[0%]" : "translate-y-[200%]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
