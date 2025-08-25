import React from "react";

const Price = ({ value, className }) => {
  const lang = "en";

  const handleValue = (x) => {
    if (isNaN(x)) return "Invalid number";
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

  return <p className={className}>{handleValue(value)}</p>;
};

export default Price;
