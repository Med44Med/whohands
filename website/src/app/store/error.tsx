"use client";
import React from "react";

const Error = ({ error, reset }) => {
  console.log(error);

  return <div>{error}</div>;
};

export default Error;
