"use client";

import React, { useState, useRef, useEffect, ReactNode, useMemo } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface OptionType {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface SearchWithDropdownProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  options?: OptionType[];
  value?: OptionType | null;
  onChange: (text: string) => void;
  onSelect?: (option: OptionType) => void;
  showRecentSearches?: boolean;
  isLoading?: boolean;
}

const AirportSearch = ({
  name = "",
  id,
  placeholder,
  className,
  inputClassName,
  disabled = false,
  icon,
  iconPosition = "left",
  options = [],
  value: controlledValue,
  onChange,
  onSelect,
  isLoading: externalLoading = false,
}: SearchWithDropdownProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter options based on search input
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;

    const searchLower = search.toLowerCase();
    return options.filter(
      (item) =>
        item.label.toLowerCase().includes(searchLower) ||
        item.value.toLowerCase().includes(searchLower),
    );
  }, [search, options]);

  // Sync with controlled value
  useEffect(() => {
    if (
      controlledValue?.label !== undefined &&
      controlledValue.label !== null
    ) {
      setSearch(controlledValue.label);
    }
  }, [controlledValue]);

  // Close dropdown when clicking outside
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    setIsOpen(true);
    onChange(newValue);
  };

  const handleSelect = (option: OptionType) => {
    setSearch(option.label);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className={className}>
      <div ref={wrapperRef} className="relative h-full">
        {/* Input Wrapper */}
        <div className="relative h-full flex items-center">
          {icon && iconPosition === "left" && (
            <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          <Input
            name={name}
            disabled={disabled || externalLoading}
            id={id}
            placeholder={placeholder}
            value={search}
            onChange={handleInputChange}
            onFocus={() => !disabled && !externalLoading && setIsOpen(true)}
            className={cn(
              "h-full bg-white rounded-none",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              (disabled || externalLoading) && "cursor-not-allowed opacity-60",
              inputClassName,
            )}
          />

          {icon && iconPosition === "right" && (
            <span className="absolute right-10 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          {/* Loading indicator or Chevron */}
          {externalLoading ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 animate-spin" />
          ) : (
            <ChevronDown
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none transition-transform",
                isOpen && "rotate-180",
              )}
            />
          )}
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && !externalLoading && (
          // <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto scrollbar-minimal">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                {search ? "No airports found" : "Start typing to search"}
              </div>
            ) : (
              <div className="py-2">
                {search && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                    {filteredOptions.length}{" "}
                    {filteredOptions.length === 1 ? "Result" : "Results"}
                  </div>
                )}

                {filteredOptions.map((option, index) => (
                  <button
                    key={`${option.value}-${index}`}
                    onClick={() => handleSelect(option)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    <Search className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportSearch;
