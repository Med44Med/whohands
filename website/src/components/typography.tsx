import React from "react";
import clsx from "clsx";

const Text = ({ size, children, className, muted=false }) => {
  const handleSize = (size) => {
    switch (size) {
      case "small":
        return "text-xs";
      case "normal":
        return "text-base";
      case "large":
        return "text-xl";
      case "big":
        return "text-2xl";
      default:
        break;
    }
  };
  return (
    <p
      className={clsx(
        "font-normal tracking-normal leading-normal",
        handleSize(size),
        muted ? "text-text-muted" : "text-text",
        className
      )}
    >
      {children}
    </p>
  );
};

const Title = ({ children, size, className }) => {
  const handleSize = (size) => {
    switch (size) {
      case "big":
        return "text-5xl leading-12";
      case "small":
        return "text-2xl leading-6";
      default:
        break;
    }
  };

  return (
    <h1
      className={clsx(
        "text-text !font-playfair font-black tracking-tight  capitalize ",
        handleSize(size),
        className
      )}
    >
      {children}
    </h1>
  );
};

export { Text, Title };
