import { Label } from "@/components/ui/label";
import React from "react";

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
  const handleSelect = (item: string) => {
    if (value.includes(item)) {
      setFieldValue(id, value.filter((selected) => selected !== item));
    } else {
      setFieldValue(id, [...value, item]);
    }
  };

  return (
    <div className="my-3">
      <Label className="ms-1 font-normal dark:text-gray-400 text-gray-600">
        {label}
      </Label>
      <div className="flex flex-wrap gap-2 my-1">
        {list.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handleSelect(item.value)}
            className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 text-sm transition-all ${
              value.includes(item.value)
                ? "from-blue-500 to-blue-700 bg-gradient-to-b text-white "
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-white/5 dark:text-gray-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {error && touched && (
        <p className="text-red-500 dark:text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default CustomMultiSelector;
