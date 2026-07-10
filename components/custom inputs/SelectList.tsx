"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OptionType } from "./search";
import { ErrorMessage } from "../BookingForm/vip-inputs";

interface SelectDropdownProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  options: OptionType[];
  value?: OptionType | null;
  storedServiceLabel?: string;
  errorMsg?: string;
  onSelect?: (option: OptionType) => void;
}

const SelectDropdown = ({
  id,
  name,
  placeholder = "Select option",
  className,
  inputClassName,
  disabled = false,
  icon,
  iconPosition = "left",
  options,
  value,
  errorMsg,
  storedServiceLabel,
  onSelect,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null);

  const inputValue = selectedValue?.label ?? storedServiceLabel ?? ""; // Close on outside click

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: OptionType) => {
    setIsOpen(false);
    onSelect?.(option);
    setSelectedValue(option);
  };

  const validationError = errorMsg && !selectedValue;
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-4">
      <div className={className}>
        <div ref={wrapperRef} className="relative h-full">
          {/* Input */}
          <div
            className="relative h-full flex items-center cursor-pointer"
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
          >
            {icon && iconPosition === "left" && (
              <span className="absolute left-3 text-gray-400 pointer-events-none">
                {icon}
              </span>
            )}

            <Input
              id={id}
              name={name}
              disabled={disabled}
              readOnly
              value={value?.label ?? inputValue ?? ""}
              placeholder={placeholder}
              className={cn(
                "cursor-pointer bg-white",
                inputClassName,
                validationError &&
                  "ring-2 ring-red-500 placeholder:text-red-500",
                icon && iconPosition === "left" && "pl-10",
                icon && iconPosition === "right" && "pr-10",
              )}
            />

            <ChevronDown
              className={cn(
                "absolute right-3 h-5 w-5 text-gray-400 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </div>

          {/* Dropdown */}
          {isOpen && !disabled && (
            <div className="absolute overflow-hidden w-full mt-2 bg-white border rounded-lg shadow-lg z-50">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center gap-2 ${option.color ? option.color : ""}`}
                >
                  {option.icon && option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {validationError ? (
        <div id="serviceType-error" role="alert">
          <ErrorMessage message={errorMsg} />
        </div>
      ) : null}
    </div>
  );
};

export default SelectDropdown;
