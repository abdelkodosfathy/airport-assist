// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Plane, Loader2, AlertCircle } from "lucide-react";
// import { useAirportSearch } from "@/lib/hooks/useAirports";
// import { useAirportStore } from "@/store/vipInputsStore";
// import { Airport } from "@/lib/types/airport";

// // ── Types ─────────────────────────────────────────────────────────────────────

// interface AirportSearchInputProps {
//   label?: string;
//   placeholder?: string;
//   onSelect?: (airport: Airport) => void;
//   error?: string;
//   disabled?: boolean;
//   className?: string;
// }

// // ── Component ─────────────────────────────────────────────────────────────────

// export default function AirportSearchInput({
//   label,
//   placeholder = "Search airport…",
//   onSelect,
//   error,
//   disabled,
//   className,
// }: AirportSearchInputProps) {
//   const [query, setQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState<Airport | null>(null);

//   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const storeAirport = useAirportStore((state) => state.setAirport);
//   const storedAirport = useAirportStore((state) => state.airport);

//   // ── Sync display with store (e.g. pre-filled from outside) ────────────────
//   useEffect(() => {
//     if (storedAirport && !selected) {
//       setQuery(storedAirport.airport_name);
//       setSelected(storedAirport);
//     }
//   }, [storedAirport]);

//   // ── Close on outside click ────────────────────────────────────────────────
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // ── Backend search ────────────────────────────────────────────────────────
//   const { data, isLoading } = useAirportSearch(
//     debouncedQuery,
//     debouncedQuery.trim().length > 0,
//   );
//   const airports: Airport[] = data?.data?.airports ?? [];

//   // ── Open dropdown when results arrive ────────────────────────────────────
//   useEffect(() => {
//     if (airports.length > 0 && debouncedQuery.trim()) setOpen(true);
//   }, [airports.length, debouncedQuery]);

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
//   const handleSelect = (airport: Airport) => {
//     setQuery(airport.airport_name);
//     setSelected(airport);
//     setOpen(false);
//     storeAirport(airport);
//     onSelect?.(airport);
//   };

//   const displayValue = selected ? selected.airport_name : query;

//   return (
//     <div className={`flex flex-col gap-1.5 ${className ?? ""}`} ref={containerRef}>
//       {/* Label */}
//       {label && (
//         <label className="text-xs font-medium text-[#747474] uppercase tracking-widest">
//           {label}
//         </label>
//       )}

//       <div className="relative">
//         {/* Input row */}
//         <div
//           className={`relative flex items-center h-11 rounded-lg border bg-[#F4F4F4] transition-colors ${
//             error
//               ? "border-red-400"
//               : open
//               ? "border-[#1A1A1A]"
//               : "border-[#E0E0E0]"
//           }`}
//         >
//           {/* Icon */}
//           <span className="pl-3 pr-2 flex-shrink-0">
//             <Plane
//               size={15}
//               className={selected ? "text-[#1A1A1A]" : "text-[#ACACAC]"}
//             />
//           </span>

//           <input
//             disabled={disabled}
//             value={displayValue}
//             onChange={handleChange}
//             onFocus={() => airports.length > 0 && setOpen(true)}
//             placeholder={placeholder}
//             className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#ACACAC] outline-none pr-9 truncate"
//           />

//           {/* IATA badge when selected */}
//           {selected?.airport_code && (
//             <span className="mr-3 flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#E8E8E8] px-1.5 py-0.5 rounded">
//               {selected.airport_code}
//             </span>
//           )}

//           {/* Spinner */}
//           {isLoading && (
//             <Loader2
//               size={14}
//               className="absolute right-3 text-[#ACACAC] animate-spin"
//             />
//           )}
//         </div>

//         {/* Dropdown */}
//         {open && airports.length > 0 && (
//           <ul
//             className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl overflow-hidden"
//             style={{ maxHeight: 280, overflowY: "auto" }}
//           >
//             <li className="px-3.5 pt-2.5 pb-1">
//               <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ACACAC]">
//                 {airports.length} {airports.length === 1 ? "airport" : "airports"} found
//               </span>
//             </li>

//             {airports.map((airport, i) => (
//               <li key={`${airport.airport_id ?? airport.airport_code}-${i}`}>
//                 <button
//                   type="button"
//                   onMouseDown={(e) => e.preventDefault()}
//                   onClick={() => handleSelect(airport)}
//                   className="w-full flex items-start gap-3 px-3.5 py-2.5 text-left hover:bg-[#F7F7F7] transition-colors"
//                 >
//                   {/* Airport icon badge */}
//                   <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-md bg-[#1A1A1A] text-white flex items-center justify-center">
//                     <Plane size={12} />
//                   </span>

//                   {/* Names */}
//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-medium text-[#1A1A1A] truncate leading-tight">
//                       {airport.airport_name}
//                     </p>
//                     {(airport.city) && (
//                       <p className="text-xs text-[#ACACAC] truncate mt-0.5">
//                         {[airport.city.city_name, airport.city.country_name].filter(Boolean).join(", ")}
//                       </p>
//                     )}
//                   </div>

//                   {/* IATA code */}
//                   {airport.airport_code && (
//                     <span className="ml-auto flex-shrink-0 text-[10px] font-bold tracking-widest text-[#747474] bg-[#F0F0F0] px-1.5 py-0.5 rounded mt-0.5">
//                       {airport.airport_code}
//                     </span>
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Empty state */}
//         {open && debouncedQuery.trim() && !isLoading && airports.length === 0 && (
//           <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E8E8E8] bg-white shadow-xl px-4 py-6 text-center">
//             <Plane size={20} className="mx-auto text-[#DEDEDE] mb-2" />
//             <p className="text-sm text-[#ACACAC]">No airports found for "{debouncedQuery}"</p>
//           </div>
//         )}
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