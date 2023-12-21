// InputFields.tsx
import Item from "antd/es/list/Item";
import React from "react";
import { Input } from "@nextui-org/react";

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const placements = "outside-left";

const InputFields: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-2 ">
      <>
        {/* <label>{label}</label> */}
        <Input
          variant="bordered"
          type={type}
          // name={label.toLowerCase()}
          label={label}
          value={value}
          onChange={onChange}
          className="focus:bg-none"
        />
      </>
    </div>
  );
};

export default InputFields;
