"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FixedOptionType {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface CurrencyDropdownProps {
  options: FixedOptionType[];
  value: FixedOptionType | null;
  onSelect: (option: FixedOptionType) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const CurrencyDropdown = ({
  options,
  value,
  onSelect,
  placeholder,
  className,
  inputClassName,
  disabled = false,
}: CurrencyDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (option: FixedOptionType) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Input / Trigger */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between cursor-pointer rounded-md border bg-white px-3 py-2 text-sm shadow-sm",
          disabled && "cursor-not-allowed opacity-60",
          inputClassName
        )}
      >
        <span>{value ? value.label : placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100"
            >
              {option.icon && <span>{option.icon}</span>}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;