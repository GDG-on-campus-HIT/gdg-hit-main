
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type Props = {
  label: string;
  id: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  error?: string;
  touched?: boolean;
  placeholder: string;
  rows: number;
};

function CustomTextArea({
  handleChange,
  value,
  error,
  touched,
  id,
  label,
  placeholder,
  rows,
}: Props) {
  return (
    <div className="my-3">
      <Label
        htmlFor={id}
        className="ms-1 font-normal dark:text-gray-400 text-gray-600"
      >
        {label}
      </Label>
      <Textarea
        rows={rows}
        onChange={handleChange}
        value={value}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`${error && touched ? "border-red-500 dark:border-red-600" : ""
          } my-1 bg-transparent focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600`}
      />
      {error && touched && (
        <span className="text-red-500 dark:text-red-600 text-sm block">{error}</span>
      )}
    </div>
  );
}

export default CustomTextArea;
