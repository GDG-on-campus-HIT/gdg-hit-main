import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { getTheme } from "./theme.config";

type Props = {
  label: string;
  id: string;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
  value: string;
  error?: string;
  touched?: boolean;
  list: string[];
};

function CustomSelector({ value, error, touched, id, label, setFieldValue, list }: Props) {
  const config = getTheme();
  return (
    <div className="my-3">
      <Label htmlFor={id} className={config.labelSelect}>
        {label}
      </Label>
      <Select onValueChange={(e) => setFieldValue(id, e, true)} value={value}>
        <SelectTrigger
          className={`${error && touched ? config.inputErrorBorder : config.inputBorder} ${config.inputBg} ${config.inputText} ${config.inputFocus} my-1 w-full`}
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className={config.dropdownBg}>
          {list.map((name) => (
            <SelectItem key={name} value={name} className="focus:bg-gray-100 dark:focus:bg-white/10 cursor-pointer transition-colors">
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && touched && <span className="text-red-500 dark:text-red-600 text-sm block mt-1">{error}</span>}
    </div>
  );
}

export default CustomSelector;
