import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { getTheme } from "./theme.config";

type Props = {
  label: string;
  id: string;
  type: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  error?: string;
  touched?: boolean;
  placeholder: string;
  disabled?: boolean
};

function CustomInput({ handleChange, value, error, touched, type, id, label, placeholder, disabled }: Props) {
  const config = getTheme();
  return (
    <div className="my-3">
      <Label
        htmlFor={id}
        className={config.label}
      >
        {label}
      </Label>
      <Input
        type={type}
        onChange={handleChange}
        value={value}
        id={id}
        name={id}
        disabled={disabled}
        placeholder={placeholder}
        className={`${error && touched ? config.inputErrorBorder : config.inputBorder} ${config.inputBg} ${config.inputText} ${config.inputFocus} my-1 w-full`}
      />
      {error && touched && (
        <span className="text-red-500 text-sm block dark:text-red-600 mt-1">{error}</span>
      )}
    </div>
  );
}

export default CustomInput;
