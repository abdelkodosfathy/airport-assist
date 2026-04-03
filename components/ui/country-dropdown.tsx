// "use client";
// import React, { useCallback, useState, forwardRef, useEffect } from "react";

// // shadcn
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// // utils
// import { cn } from "@/lib/utils";

// // assets
// import { ChevronDown, CheckIcon, Globe } from "lucide-react";
// import { CircleFlag } from "react-circle-flags";

// // data
// import { countries } from "country-data-list";

// // Country interface
// export interface Country {
//   alpha2: string;
//   alpha3: string;
//   countryCallingCodes: string[];
//   currencies: string[];
//   emoji?: string;
//   ioc: string;
//   languages: string[];
//   name: string;
//   status: string;
// }

// // Dropdown props
// interface CountryDropdownProps {
//   options?: Country[];
//   onChange?: (country: Country) => void;
//   defaultValue?: string;
//   className?: string;
//   disabled?: boolean;
//   placeholder?: string;
//   slim?: boolean;
// }

// const CountryDropdownComponent = (
//   {
//     options = countries.all.filter(
//       (country: Country) =>
//         country.emoji && country.status !== "deleted" && country.ioc !== "PRK",
//     ),
//     onChange,
//     defaultValue,
//     className,
//     disabled = false,
//     placeholder = "Select a country",
//     slim = false,
//     ...props
//   }: CountryDropdownProps,
//   ref: React.ForwardedRef<HTMLButtonElement>,
// ) => {
//   const [open, setOpen] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
//     undefined,
//   );

//   useEffect(() => {
//     if (defaultValue) {
//       const initialCountry = options.find(
//         (country) => country.alpha3 === defaultValue,
//       );
//       if (initialCountry) {
//         setSelectedCountry(initialCountry);
//       } else {
//         // Reset selected country if defaultValue is not found
//         setSelectedCountry(undefined);
//       }
//     } else {
//       // Reset selected country if defaultValue is undefined or null
//       setSelectedCountry(undefined);
//     }
//   }, [defaultValue, options]);

//   const handleSelect = useCallback(
//     (country: Country) => {
//       console.log("🌍 CountryDropdown value: ", country);
//       setSelectedCountry(country);
//       onChange?.(country);
//       setOpen(false);
//     },
//     [onChange],
//   );

//   const triggerClasses = cn(
//     "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
//     className,
//     slim === true && "w-20",
//   );

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger
//         ref={ref}
//         className={triggerClasses}
//         disabled={disabled}
//         {...props}
//       >
//         {selectedCountry ? (
//           <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
//             <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
//               <CircleFlag
//                 countryCode={selectedCountry.alpha2.toLowerCase()}
//                 height={20}
//               />
//             </div>
//             {slim === false && (
//               <span className="overflow-hidden text-ellipsis whitespace-nowrap">
//                 {selectedCountry.name}
//               </span>
//             )}
//           </div>
//         ) : (
//           <span>
//             {slim === false ? (
//               placeholder || setSelectedCountry.name
//             ) : (
//               <Globe size={20} />
//             )}
//           </span>
//         )}
//         <ChevronDown size={16} />
//       </PopoverTrigger>
//       <PopoverContent
//         collisionPadding={10}
//         side="bottom"
//         className="min-w-[--radix-popper-anchor-width] p-0"
//       >
//         <Command className="w-full max-h-[200px] sm:max-h-[270px]">
//           <CommandList>
//             <div className="sticky top-0 z-10 bg-popover">
//               <CommandInput placeholder="Search country..." />
//             </div>
//             <CommandEmpty>No country found.</CommandEmpty>
//             <CommandGroup>
//               {options
//                 .filter((x) => x.name)
//                 .map((option, key: number) => (
//                   <CommandItem
//                     className="flex items-center w-full gap-2"
//                     key={key}
//                     onSelect={() => handleSelect(option)}
//                   >
//                     <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
//                       <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
//                         <CircleFlag
//                           countryCode={option.alpha2.toLowerCase()}
//                           height={20}
//                         />
//                       </div>
//                       <span className="overflow-hidden text-ellipsis whitespace-nowrap">
//                         {option.name}
//                       </span>
//                     </div>
//                     <CheckIcon
//                       className={cn(
//                         "ml-auto h-4 w-4 shrink-0",
//                         option.name === selectedCountry?.name
//                           ? "opacity-100"
//                           : "opacity-0",
//                       )}
//                     />
//                   </CommandItem>
//                 ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// CountryDropdownComponent.displayName = "CountryDropdownComponent";

// export const CountryDropdown = forwardRef(CountryDropdownComponent);

"use client";
import React, {
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useEffect,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, CheckIcon, Globe, Search } from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import { countries } from "country-data-list";

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

interface CountryDropdownProps {
  options?: Country[];
  onChange?: (country: Country) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
}

// Pre-filtered once at module level — never recomputed
const DEFAULT_COUNTRIES: Country[] = countries.all.filter(
  (c: Country) => c.emoji && c.status !== "deleted" && c.ioc !== "PRK",
);

const MAX_RESULTS = 8;

const CountryDropdownComponent = (
  {
    options = DEFAULT_COUNTRIES,
    onChange,
    defaultValue,
    className,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  useEffect(() => {
    if (!defaultValue) {
      setSelectedCountry(undefined);
      return;
    }
    const found = options.find((c) => c.alpha3 === defaultValue);
    setSelectedCountry(found);
  }, [defaultValue, options]);

  // Only filter + slice when query changes — memoized
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return options
      .filter((c) => c.name && c.name.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS);
  }, [query, options]);

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onChange?.(country);
      setOpen(false);
      setQuery("");
    },
    [onChange],
  );

  const handleOpenChange = useCallback((val: boolean) => {
    setOpen(val);
    if (!val) setQuery("");
  }, []);

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    slim && "w-20",
    className,
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <CircleFlag
              countryCode={selectedCountry.alpha2.toLowerCase()}
              height={5}
              className="w-5 h-5"
            />
            {!slim && <span className="truncate">{selectedCountry.name}</span>}
          </div>
        ) : (
          <span className="text-muted-foreground">
            {slim ? <Globe size={18} /> : placeholder}
          </span>
        )}
        <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        collisionPadding={10}
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-2 border-b">
          <Search size={14} className="text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Results */}
        <div className="max-h-52 overflow-y-auto">
          {!query.trim() ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              Start typing to search
            </p>
          ) : results.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              No country found
            </p>
          ) : (
            results.map((country) => (
              <button
                key={country.alpha2}
                type="button"
                onClick={() => handleSelect(country)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
              >
                <CircleFlag
                  countryCode={country.alpha2.toLowerCase()}
                  height={5}
                  className="w-5 h-5"
                />
                <span className="flex-1 truncate">{country.name}</span>
                {selectedCountry?.alpha2 === country.alpha2 && (
                  <CheckIcon size={14} className="shrink-0 text-[#664F31]" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdown";
export const CountryDropdown = forwardRef(CountryDropdownComponent);
