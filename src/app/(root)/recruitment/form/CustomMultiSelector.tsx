import { Label } from "@/components/ui/label";
import React from "react";
import { getTheme } from "./theme.config";

interface CustomMultiSelectorProps {
  id: string;
  label: string;
  value: string[];
  error?: any;
  touched?: any;
  setFieldValue: (field: string, value: any) => void;
  list: { label: string; value: string }[];
}

const CustomMultiSelector: React.FC<CustomMultiSelectorProps> = ({
  id,
  label,
  value,
  error,
  touched,
  setFieldValue,
  list,
}) => {
  const config = getTheme();
  const handleSelect = (item: string) => {
    if (value.includes(item)) {
      setFieldValue(id, value.filter((selected) => selected !== item));
    } else {
      setFieldValue(id, [...value, item]);
    }
  };

  return (
    <div className="my-3">
      <Label className={config.labelSelect}>
        {label}
      </Label>
      <div className="flex flex-wrap gap-2 my-2">
        {list.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handleSelect(item.value)}
            className={`px-4 py-2 transition-all duration-300 ${value.includes(item.value)
                ? config.tagActive
                : config.tagInactive
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {error && touched && (
        <p className="text-red-500 dark:text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomMultiSelector;
