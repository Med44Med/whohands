import React from "react";

const Price = ({ value }) => {
  const lang = "en";
  console.log(value);

  const handleValue = (x) => {
    if (isNaN(x)) return "Invalid number";
    console.log(x);

    const num = parseFloat(x).toFixed(2);
    const parts = num.split(".");
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      lang === "ar" ? "٬" : " "
    );
    const decimalPart = parts[1];
    const currencySymbol = lang === "ar" ? "د.ج" : "DA";
    return lang === "ar"
      ? `${currencySymbol} ${integerPart},${decimalPart}`
      : `${integerPart},${decimalPart} ${currencySymbol}`;
  };

  return handleValue(value);
};

export default Price;
