import React from "react";
import { Text } from "@/components/typography";
import clsx from 'clsx';

const InputField = ({ label,value,onChange,className, error }) => {
  return (
    <div className={className}>
      <div className="relative w-full border rounded-xl">
        <input
          type="text"
          id={label}
          className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-sm text-text bg-surface outline-0 appearance-none   peer"
          placeholder=" "
          value={value}
          onChange={e=>onChange(e)}
        />
        <label
          htmlFor={label}
          className="absolute bg-surface px-2 text-sm text-text-muted font-outfit capitalize duration-300 transform -translate-y-7 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-text peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
        >
          {label}
        </label>
      </div>
      {error && <Text size='small' className='!text-red-600 m-2'>{error}</Text>}
    </div>
  );
};

export default InputField;
