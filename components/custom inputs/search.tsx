"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Search, Clock, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface OptionType {
  label: string;
  value: string;
}

interface SearchWithDropdownProps {
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  options?: OptionType[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: OptionType) => void;
  showRecentSearches?: boolean;
}

const SearchWithDropdown = ({
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
  showRecentSearches = true,
}: SearchWithDropdownProps) => {
  const [search, setSearch] = useState(controlledValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Default recent searches (fallback)
  const defaultRecentSearches: OptionType[] = [
    { label: "Arrival", value: "Arrival" },
    { label: "Depature", value: "Depature" },
    { label: "Connection", value: "Connection" },
  ];

  // Use provided options or fall back to default recent searches
  const availableOptions = options.length > 0 ? options : defaultRecentSearches;

  // Filter options based on search input
  const filteredOptions = search
    ? availableOptions.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : availableOptions;

  // Sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSearch(controlledValue);
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
    onChange?.(newValue);
  };

  const handleSelect = (option: OptionType) => {
    setSearch(option.label);
    setIsOpen(false);
    onChange?.(option.label);
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
            disabled={disabled}
            id={id}
            value={search}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            className={cn(
              "h-full bg-white rounded-none",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              disabled && "cursor-not-allowed opacity-60",
              inputClassName
            )}
          />

          {icon && iconPosition === "right" && (
            <span className="absolute right-10 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          {/* Chevron */}
          <ChevronDown
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No results found
              </div>
            ) : (
              <div className="py-2">
                {!search && showRecentSearches && options.length === 0 && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Recent Searches
                  </div>
                )}

                {search && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                    {options.length > 0 ? "Results" : "Suggestions"}
                  </div>
                )}

                {filteredOptions.map((option, index) => (
                  <button
                    key={`${option.value}-${index}`}
                    onClick={() => handleSelect(option)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    {!search && showRecentSearches && options.length === 0 ? (
                      <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
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

export default SearchWithDropdown;