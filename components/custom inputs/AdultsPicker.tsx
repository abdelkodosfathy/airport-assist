"use client";

// import React, { useState, useRef, useEffect, ReactNode } from "react";
// import { ChevronDown, Minus, Plus } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

// interface AdultsPickerProps {
//   id?: string;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
//   inputClassName?: string;
//   icon?: ReactNode;
//   iconPosition?: "left" | "right";
// }

// const AdultsPicker = ({
//   id,
//   placeholder,
//   className,
//   inputClassName,
//   disabled = false,
//   icon,
//   iconPosition = "left",
// }: AdultsPickerProps) => {
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   const displayValue = `${adults} Adult - ${children} Children`;

//   const [isOpen, setIsOpen] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className={className}>
//       <div ref={wrapperRef} className="relative h-full">
//         {/* Input */}
//         <div className="relative h-full flex items-center">
//           {icon && iconPosition === "left" && (
//             <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
//               {icon}
//             </span>
//           )}

//           <Input
//             disabled={disabled}
//             id={id}
//             value={displayValue}
//             placeholder={placeholder}
//             readOnly
//             onFocus={() => !disabled && setIsOpen(true)}
//             className={cn(
//               "h-full bg-white rounded-none cursor-pointer",
//               icon && iconPosition === "left" && "pl-10",
//               icon && iconPosition === "right" && "pr-10",
//               disabled && "cursor-not-allowed opacity-60",
//               inputClassName,
//             )}
//           />

//           {icon && iconPosition === "right" && (
//             <span className="absolute right-10 text-gray-400 pointer-events-none z-10">
//               {icon}
//             </span>
//           )}

//           <ChevronDown
//             className={cn(
//               "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 transition-transform",
//               isOpen && "rotate-180",
//             )}
//           />
//         </div>

//         {/* Dropdown */}
//         {isOpen && !disabled && (
//           <div className="absolute w-max mt-2 p-4 space-y-4 bg-white border rounded-lg shadow-lg z-50">
//             {/* <PickerRow
//               title="Adults"
//               subtitle="Over 12yrs old"
//             />
//             <PickerRow
//               title="Children"
//               subtitle="0-12yrs old"
//             /> */}
//             <PickerRow
//               title="Adults"
//               subtitle="Over 12yrs old"
//               value={adults}
//               onChange={setAdults}
//             />

//             <PickerRow
//               title="Children"
//               subtitle="0-12yrs old"
//               value={children}
//               onChange={setChildren}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdultsPicker;

// /* ---------------- Helpers ---------------- */

const PickerRow = ({
  title,
  subtitle,
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="flex justify-between gap-4">
    <div className="text-start">
      <p>{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    <NumberInput value={value} onChange={onChange} />
  </div>
);

const NumberInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={decrement}
        disabled={value === 0}
        className="grid place-content-center w-8 h-8 rounded-full
        text-white bg-[#7B5A41]
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={14} />
      </button>

      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-16 text-center bg-[#F2F3F5] rounded-lg
        appearance-none
        [&::-webkit-outer-spin-button]:appearance-none
        [&::-webkit-inner-spin-button]:appearance-none
        [&::-moz-appearance]:textfield"
      />

      <button
        type="button"
        onClick={increment}
        className="grid place-content-center w-8 h-8 rounded-full
        text-white bg-[#7B5A41]"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};


import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AdultsPickerProps {
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onAdultsChange?: (adults: number) => void;
  onChildrenChange?: (children: number) => void;
}

const AdultsPicker = ({
  id,
  placeholder,
  className,
  inputClassName,
  disabled = false,
  icon,
  iconPosition = "left",
  onAdultsChange,
  onChildrenChange,
}: AdultsPickerProps) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const displayValue = `${adults} Adult - ${children} Children`;

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleAdultsChange = (value: number) => {
    setAdults(value);
    onAdultsChange?.(value);
  };

  const handleChildrenChange = (value: number) => {
    setChildren(value);
    onChildrenChange?.(value);
  };

  return (
    <div className={className}>
      <div ref={wrapperRef} className="relative h-full">
        {/* Input */}
        <div className="relative h-full flex items-center">
          {icon && iconPosition === "left" && (
            <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          <Input
            disabled={disabled}
            id={id}
            value={displayValue}
            placeholder={placeholder}
            readOnly
            onFocus={() => !disabled && setIsOpen(true)}
            className={cn(
              "h-full bg-white rounded-none cursor-pointer",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              disabled && "cursor-not-allowed opacity-60",
              inputClassName,
            )}
          />

          {icon && iconPosition === "right" && (
            <span className="absolute right-10 text-gray-400 pointer-events-none z-10">
              {icon}
            </span>
          )}

          {/* <ChevronDown
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 transition-transform",
              isOpen && "rotate-180",
            )}
          /> */}
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute w-max mt-2 p-4 space-y-4 bg-white border rounded-lg shadow-lg z-50">
            <PickerRow
              title="Adults"
              subtitle="Over 12yrs old"
              value={adults}
              onChange={handleAdultsChange}
            />

            <PickerRow
              title="Children"
              subtitle="0-12yrs old"
              value={children}
              onChange={handleChildrenChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdultsPicker;