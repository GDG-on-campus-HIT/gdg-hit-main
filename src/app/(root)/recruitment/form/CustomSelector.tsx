import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

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
  return (
    <div className="my-3">
      <Label htmlFor={id} className="ms-1 font-normal dark:text-gray-400 text-gray-600 linec">
        {label}
      </Label>
      <Select onValueChange={(e) => setFieldValue(id, e, true)} value={value}>
        <SelectTrigger
          className={`${
            error && touched ? "border-red-500 dark:border-red-600" : ""
          } my-1 bg-transparent focus-visible:ring-gray-500 dark:focus-visible:ring-gray-600 w-full`}
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {list.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && touched && <span className="text-red-500 dark:text-red-600 text-sm block">{error}</span>}
    </div>
  );
}

export default CustomSelector;
