"use state";
import React from "react";
import { Text } from "@/components/typography";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type,
  value,
  onChange=()=>{return},
  className,
  error,
  required = false,
}) => {
  const [inputType, setInputType] = useState(type);
  return (
    <div className={className}>
      <div className="relative w-full border rounded">
        <input
          type={inputType}
          id={label}
          name={label}
          className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-text bg-surface outline-0 appearance-none   peer"
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
        />
        <label
          htmlFor={label}
          className="absolute bg-surface px-2 text-sm text-text-muted font-outfit capitalize duration-300 transform -translate-y-7 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-text peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
        >
          {label}
        </label>
        {type === "password" && (
          <div className="absolute right-4 top-4 cursor-pointer select-none">
            {inputType === "password" ? (
              <FaEye onClick={() => setInputType("text")} />
            ) : (
              <FaEyeSlash onClick={() => setInputType("password")} />
            )}
          </div>
        )}
      </div>
      {error && (
        <Text size="small" className="!text-red-600 m-2">
          {error}
        </Text>
      )}
    </div>
  );
};

export default InputField;
