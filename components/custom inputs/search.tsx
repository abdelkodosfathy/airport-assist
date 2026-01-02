"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Clock, TrendingUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchWithDropdownProps {
  id?: string;
  placeholder?: string;
  className?: string;
}

const SearchWithDropdown = ({
  id,
  placeholder,
  className,
}: SearchWithDropdownProps) => {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sample data for recommendations
  const recentSearches: string[] = [
    "EgyptAir",
    "Saudi Airlines",
    "Fly Dubai",
    "Air France",
    "British Airways",
  ];

  // const trendingSearches: string[] = [
  //   "Next.js 14",
  //   "Tailwind CSS",
  //   "shadcn/ui components",
  // ];

  // const allSuggestions: string[] = [...recentSearches, ...trendingSearches];
  const allSuggestions: string[] = [...recentSearches];

  // Filter suggestions based on search input
  const filteredSuggestions: string[] = search
    ? allSuggestions.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : // : [...recentSearches, ...trendingSearches];
      [...recentSearches];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
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

  const handleSelect = (value: string): void => {
    setSearch(value);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <div className="relative" ref={wrapperRef}>
        <div className="relative">
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className={className}
          />
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
        </div>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {filteredSuggestions.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No results found.
              </div>
            ) : (
              <div className="py-2">
                {!search && recentSearches.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Recent Searches
                    </div>
                    {recentSearches.map((item: string, index: number) => (
                      <button
                        key={`recent-${index}`}
                        onClick={() => handleSelect(item)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{item}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* {!search && trendingSearches.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Trending
                    </div>
                    {trendingSearches.map((item: string, index: number) => (
                      <button
                        key={`trending-${index}`}
                        onClick={() => handleSelect(item)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{item}</span>
                      </button>
                    ))}
                  </div>
                )} */}

                {search && (
                  <div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Suggestions
                    </div>
                    {filteredSuggestions.map((item: string, index: number) => (
                      <button
                        key={`suggestion-${index}`}
                        onClick={() => handleSelect(item)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{item}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWithDropdown;
