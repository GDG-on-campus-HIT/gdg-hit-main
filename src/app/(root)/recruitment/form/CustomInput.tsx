import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type Props = {
  label:string;
  id:string;
  type:string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string; 
  error?: string; 
  touched?: boolean; 
  placeholder:string;
  disabled?:boolean
};

function CustomInput({ handleChange, value, error, touched,type,id,label,placeholder,disabled }: Props) {
  return (
    <div className="my-3">
      <Label
        htmlFor={id}
        className="ms-1 font-normal dark:text-gray-300 text-gray-600"
      >
        {label}
      </Label>
      <Input
        type={type}
        onChange={handleChange}
        value={value}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={`${
          error && touched ? "border-red-500 dark:border-red-600" : ""
        } my-1 bg-transparent focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600`}
      />
      {error && touched && (
        <span className="text-red-500 text-sm block dark:text-red-600">{error}</span>
      )}
    </div>
  );
}

export default CustomInput;
