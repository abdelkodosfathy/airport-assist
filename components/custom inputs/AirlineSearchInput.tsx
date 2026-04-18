// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Loader2, AlertCircle, Plane } from "lucide-react";
// import { useAirlines } from "@/lib/hooks/useAirlines";
// import { Airline } from "@/lib/types/airline";

// // ── Types ─────────────────────────────────────────────────────────────────────

// interface AirlineSearchInputProps {
//   label?: string;
//   placeholder?: string;
//   onSelect?: (airline: Airline) => void;
//   value: Airline | null;
//   error?: string;
//   disabled?: boolean;
//   className?: string;
// }

// // ── Component ─────────────────────────────────────────────────────────────────

// export default function AirlineSearchInput({
//   placeholder = "Search airline…",
//   onSelect,
//   error,
//   disabled,
//   value,
//   className,
// }: AirlineSearchInputProps) {
//   const [query, setQuery] = useState(value?.airline_name ?? "");
//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState<Airline | null>(value ?? null);

//   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // ── Sync external value prop changes ─────────────────────────────────────
//   useEffect(() => {
//     if (value) {
//       setSelected(value);
//       setQuery(value.airline_name ?? "");
//     } else {
//       setSelected(null);
//       setQuery("");
//     }
//   }, [value]);

//   // ── Backend search — same pattern as airports ─────────────────────────────
//   const { data, isFetching } = useAirlines(
//     debouncedQuery,
//     debouncedQuery.trim().length > 0,
//   );
//   const airlines: Airline[] = data?.data?.airlines ?? [];

//   // ── Close on outside click ────────────────────────────────────────────────
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // ── Open dropdown when results arrive ────────────────────────────────────
//   useEffect(() => {
//     if (airlines.length > 0 && debouncedQuery.trim()) setOpen(true);
//   }, [airlines.length, debouncedQuery]);

//   // ── Input change with debounce ────────────────────────────────────────────
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const q = e.target.value;
//     setQuery(q);
//     setSelected(null);

//     if (!q.trim()) {
//       setDebouncedQuery("");
//       setOpen(false);
//       return;
//     }

//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => {
//       setDebouncedQuery(q);
//     }, 300);
//   };

//   // ── Select ────────────────────────────────────────────────────────────────
//   const handleSelect = (airline: Airline) => {
//     setQuery(airline.airline_name);
//     setSelected(airline);
//     setOpen(false);
//     onSelect?.(airline);
//   };

//   const displayValue = selected ? selected.airline_name : query;

//   return (
//     <div
//       className={`flex flex-col gap-1.5 ${className ?? ""}`}
//       ref={containerRef}
//     >
//       <div className="relative">
//         {/* Input row */}
//         <div
//           className={`relative flex items-center h-11 rounded-lg border bg-[#F4F4F4] transition-colors ${
//             error
//               ? "border-red-400"
//               : open
//                 ? "border-[#1A1A1A]"
//                 : "border-[#E0E0E0]"
//           }`}
//         >
//           {/* Leading icon: selected airline logo or generic placeholder */}
//           <span className="pl-3 pr-2 flex-shrink-0 w-9 flex items-center justify-center">
//             <div className="p-1 w-6 h-6 rounded-sm bg-[#E0E0E0] flex items-center justify-center">
//               <Plane size={16} color="#ACACAC" />
//             </div>
//           </span>

//           <input
//             disabled={disabled || isFetching}
//             value={displayValue}
//             onChange={handleChange}
//             onFocus={() => airlines.length > 0 && setOpen(true)}
//             placeholder={isFetching ? "Loading airlines…" : placeholder}
//             className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#ACACAC] outline-none truncate"
//             style={{
//               paddingRight: selected?.airline_code ? "4.5rem" : "2.25rem",
//             }}
//           />

//           {/* Airline code badge when selected */}
//           {selected?.airline_code && (
//             <span className="mr-8 flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#E8E8E8] px-1.5 py-0.5 rounded">
//               {selected.airline_code}
//             </span>
//           )}

//           {/* Spinner */}
//           {isFetching && (
//             <Loader2
//               size={14}
//               className="absolute right-3 text-[#ACACAC] animate-spin"
//             />
//           )}
//         </div>

//         {/* Dropdown */}
//         {open && airlines.length > 0 && (
//           <ul
//             className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl overflow-hidden"
//             style={{ maxHeight: 280, overflowY: "auto" }}
//           >
//             <li className="px-3.5 pt-2.5 pb-1">
//               <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ACACAC]">
//                 {airlines.length}{" "}
//                 {airlines.length === 1 ? "airline" : "airlines"} found
//               </span>
//             </li>

//             {airlines.map((airline, i) => (
//               <li key={`${airline.airline_id}-${i}`}>
//                 <button
//                   type="button"
//                   onMouseDown={(e) => e.preventDefault()}
//                   onClick={() => handleSelect(airline)}
//                   className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-[#F7F7F7] transition-colors"
//                 >
//                   {/* Airline name + country */}
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-medium text-[#1A1A1A] truncate leading-tight">
//                       {airline.airline_name}
//                     </p>
//                     {airline.country?.country_name && (
//                       <p className="text-xs text-[#ACACAC] truncate mt-0.5 flex items-center gap-1">
//                         {airline.country.country_name}
//                       </p>
//                     )}
//                   </div>

//                   {/* Airline code */}
//                   {airline.airline_code && (
//                     <span className="ml-auto flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#F0F0F0] px-1.5 py-0.5 rounded">
//                       {airline.airline_code}
//                     </span>
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Empty state */}
//         {open &&
//           debouncedQuery.trim() &&
//           !isFetching &&
//           airlines.length === 0 && (
//             <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl px-4 py-6 text-center">
//               <div className="w-8 h-8 rounded-full bg-[#F4F4F4] flex items-center justify-center mx-auto mb-2">
//                 <Plane size={16} color="#DEDEDE" />
//               </div>
//               <p className="text-sm text-[#ACACAC]">
//                 No airlines found for "{debouncedQuery}"
//               </p>
//             </div>
//           )}
//       </div>

//       {/* Error */}
//       {error && (
//         <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
//           <AlertCircle size={11} />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import { Loader2, AlertCircle, Plane } from "lucide-react";
import { useAirlines } from "@/lib/hooks/useAirlines";
import { Airline } from "@/lib/types/airline";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AirlineSearchInputProps {
  label?: string;
  placeholder?: string;
  onSelect?: (airline: Airline) => void;
  value: Airline | null;
  error?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AirlineSearchInput({
  placeholder = "Search airline…",
  onSelect,
  error,
  disabled,
  value,
  inputClassName,
  className,
}: AirlineSearchInputProps) {
  const [query, setQuery] = useState(value?.airline_name ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Airline | null>(value ?? null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Sync external value prop ──────────────────────────────────────────────
  useEffect(() => {
    if (value) {
      setSelected(value);
      setQuery(value.airline_name ?? "");
    } else {
      setSelected(null);
      setQuery("");
    }
  }, [value]);

  // ── Backend search ────────────────────────────────────────────────────────
  const { data, isFetching } = useAirlines(
    debouncedQuery,
    debouncedQuery.trim().length > 0,
  );
  const airlines: Airline[] = data?.data?.airlines ?? [];

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Open dropdown when results arrive ────────────────────────────────────
  useEffect(() => {
    if (airlines.length > 0 && debouncedQuery.trim()) setOpen(true);
  }, [airlines.length, debouncedQuery]);

  // ── Input change with debounce ────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    setSelected(null);

    if (!q.trim()) {
      setDebouncedQuery("");
      setOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(q);
    }, 300);
  };

  // ── Select — keep focus on input after selection ──────────────────────────
  const handleSelect = (airline: Airline) => {
    setQuery(airline.airline_name);
    setSelected(airline);
    setOpen(false);
    onSelect?.(airline);
    // return focus to input so keyboard users aren't lost
    inputRef.current?.focus();
  };

  const displayValue = selected ? selected.airline_name : query;

  return (
    <div
      className={`flex flex-col gap-1.5 ${className ?? ""}`}
      ref={containerRef}
    >
      <div className="relative">
        {/* Input row */}
        <div
          className={`relative flex items-center  rounded-lg border bg-[#F4F4F4] transition-colors ${inputClassName ? inputClassName : "h-11"} ${
            error
              ? "border-red-400"
              : open
                ? "border-[#1A1A1A]"
                : "border-[#E0E0E0]"
          }`}
        >
          <span className="pl-3 pr-2 flex-shrink-0 w-9 flex items-center justify-center">
            <div className="p-1 w-6 h-6 rounded-sm bg-[#E0E0E0] flex items-center justify-center">
              <Plane size={16} color="#ACACAC" />
            </div>
          </span>

          <input
            ref={inputRef}
            disabled={disabled}
            value={displayValue}
            onChange={handleChange}
            onFocus={() => airlines.length > 0 && setOpen(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#ACACAC] outline-none truncate"

          />

          {selected?.airline_code && (
            <span className="mr-2 flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#E8E8E8] px-1.5 py-0.5 rounded">
              {selected.airline_code}
            </span>
          )}

          {isFetching && (
            <Loader2
              size={14}
              className="absolute right-3 text-[#ACACAC] animate-spin"
            />
          )}
        </div>

        {/* Dropdown */}
        {open && airlines.length > 0 && (
          <ul
            // ↓ THE FIX: prevent the list itself from stealing focus on mousedown
            onMouseDown={(e) => e.preventDefault()}
            className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl overflow-hidden"
            style={{ maxHeight: 280, overflowY: "auto" }}
          >
            <li className="px-3.5 pt-2.5 pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ACACAC]">
                {airlines.length}{" "}
                {airlines.length === 1 ? "airline" : "airlines"} found
              </span>
            </li>

            {airlines.map((airline, i) => (
              <li key={`${airline.airline_id}-${i}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(airline)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-[#F7F7F7] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate leading-tight">
                      {airline.airline_name}
                    </p>
                    {airline.country?.country_name && (
                      <p className="text-xs text-[#ACACAC] truncate mt-0.5 flex items-center gap-1">
                        {airline.country.country_name}
                      </p>
                    )}
                  </div>

                  {airline.airline_code && (
                    <span className="ml-auto flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#F0F0F0] px-1.5 py-0.5 rounded">
                      {airline.airline_code}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {open &&
          debouncedQuery.trim() &&
          !isFetching &&
          airlines.length === 0 && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl px-4 py-6 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#F4F4F4] flex items-center justify-center mx-auto mb-2">
                <Plane size={16} color="#DEDEDE" />
              </div>
              <p className="text-sm text-[#ACACAC]">
                No airlines found for "{debouncedQuery}"
              </p>
            </div>
          )}
      </div>

      {/* Error */}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}