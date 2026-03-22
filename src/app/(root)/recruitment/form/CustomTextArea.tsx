import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { getTheme } from "./theme.config";

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
  const config = getTheme();
  return (
    <div className="my-3">
      <Label
        htmlFor={id}
        className={config.label}
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
        className={`${error && touched ? config.inputErrorBorder : config.inputBorder} ${config.inputBg} ${config.inputText} ${config.inputFocus} my-1`}
      />
      {error && touched && (
        <span className="text-red-500 dark:text-red-600 text-sm block mt-1">{error}</span>
      )}
    </div>
  );
}

export default CustomTextArea;
