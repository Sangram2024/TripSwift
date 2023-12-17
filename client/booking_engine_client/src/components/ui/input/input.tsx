// InputFields.tsx
import React from "react";

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFields: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        name={label.toLowerCase()}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-5 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </div>
  );
};

export default InputFields;
