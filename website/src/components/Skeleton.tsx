import React from "react";
import clsx from "clsx";

const Skeleton = ({ className }) => {
  return (
    <div
      className={clsx(
        className,
        "shadow animate-pulse"
      )}
    />
  );
};

export default Skeleton;
