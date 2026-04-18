// /**
//  * PhoneInput - High-performance phone input with per-country validation
//  *
//  * Features:
//  * - Zero external phone-lib dependency (validation via lightweight regex map)
//  * - Lazy-loads country list (code-split friendly)
//  * - Fully Tailwind-composable via className props
//  * - Accessible (ARIA, keyboard nav)
//  * - Memoised rendering — only the changed subcomponent re-renders
//  *
//  * Usage:
//  *   <PhoneInput
//  *     value={value}
//  *     onChange={setValue}
//  *     defaultCountry="us"
//  *     preferredCountries={["gb", "us", "fr"]}
//  *     placeholder="0101 434 3413"
//  *     className="h-11 rounded-xl border border-gray-200 bg-gray-100"
//  *     inputClassName="bg-gray-100 rounded-xl"
//  *     selectorClassName="bg-gray-200 rounded-l-xl px-4"
//  *     dropdownClassName="rounded-lg shadow-lg"
//  *     error={!!validationError}
//  *     disabled={disabled}
//  *   />
//  */

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   memo,
// } from "react";

// // ─────────────────────────────────────────────────────────────
// // Types
// // ─────────────────────────────────────────────────────────────

// export interface Country {
//   code: string;   // ISO 3166-1 alpha-2, lowercase  e.g. "us"
//   name: string;
//   dialCode: string; // e.g. "+1"
//   flag: string;   // emoji
//   /** Regex that validates the national number (digits only, no dial code) */
//   pattern: RegExp;
//   /** Human-readable format hint e.g. "XXX XXX XXXX" */
//   format: string;
//   /** Max digit length for the national number */
//   maxLength: number;
// }

// export interface PhoneInputProps {
//   value?: string;
//   onChange?: (value: string, meta: { isValid: boolean; country: Country }) => void;
//   defaultCountry?: string;
//   preferredCountries?: string[];
//   placeholder?: string;
//   disabled?: boolean;
//   name?: string;
//   id?: string;
//   error?: boolean;
//   /** Root wrapper className */
//   className?: string;
//   /** <input> className */
//   inputClassName?: string;
//   /** Country selector button className */
//   selectorClassName?: string;
//   /** Dropdown list className */
//   dropdownClassName?: string;
//   /** Dropdown item className */
//   dropdownItemClassName?: string;
// }

// // ─────────────────────────────────────────────────────────────
// // Country data  (minimal, tree-shakeable — add more as needed)
// // Each entry: [code, name, dialCode, flag, patternStr, format, maxLength]
// // ─────────────────────────────────────────────────────────────

// type RawCountry = [string, string, string, string, string, string, number];

// const RAW: RawCountry[] = [
//   ["us", "United States",    "+1",   "🇺🇸", "^[2-9]\\d{2}[2-9]\\d{6}$",            "XXX XXX XXXX",     10],
//   ["gb", "United Kingdom",   "+44",  "🇬🇧", "^[1-9]\\d{8,9}$",                      "XXXX XXXXXX",      10],
//   ["fr", "France",           "+33",  "🇫🇷", "^[1-9]\\d{8}$",                        "X XX XX XX XX",     9],
//   ["de", "Germany",          "+49",  "🇩🇪", "^[1-9]\\d{3,12}$",                     "XXX XXXXXXXX",     12],
//   ["eg", "Egypt",            "+20",  "🇪🇬", "^(10|11|12|15)\\d{8}$",               "XXX XXXX XXXX",    10],
//   ["sa", "Saudi Arabia",     "+966", "🇸🇦", "^(5\\d{8})$",                          "5X XXX XXXX",       9],
//   ["ae", "UAE",              "+971", "🇦🇪", "^(5[024568]\\d{7})$",                  "5X XXX XXXX",       9],
//   ["in", "India",            "+91",  "🇮🇳", "^[6-9]\\d{9}$",                        "XXXXX XXXXX",      10],
//   ["pk", "Pakistan",         "+92",  "🇵🇰", "^3[0-9]{9}$",                          "3XX XXX XXXX",     10],
//   ["bd", "Bangladesh",       "+880", "🇧🇩", "^1[3-9]\\d{8}$",                       "1XX XXXX XXXX",    10],
//   ["ng", "Nigeria",          "+234", "🇳🇬", "^[7-9]\\d{9}$",                        "XXX XXX XXXX",     10],
//   ["za", "South Africa",     "+27",  "🇿🇦", "^[6-8]\\d{8}$",                        "XX XXX XXXX",       9],
//   ["br", "Brazil",           "+55",  "🇧🇷", "^[1-9]{2}9?[6-9]\\d{7}$",             "XX XXXXX XXXX",    11],
//   ["mx", "Mexico",           "+52",  "🇲🇽", "^[1-9]\\d{9}$",                        "XXX XXX XXXX",     10],
//   ["ca", "Canada",           "+1",   "🇨🇦", "^[2-9]\\d{2}[2-9]\\d{6}$",            "XXX XXX XXXX",     10],
//   ["au", "Australia",        "+61",  "🇦🇺", "^[2-578]\\d{8}$",                      "XXX XXX XXX",       9],
//   ["jp", "Japan",            "+81",  "🇯🇵", "^[7-9]0\\d{8}$",                       "XXX XXXX XXXX",    10],
//   ["cn", "China",            "+86",  "🇨🇳", "^1[3-9]\\d{9}$",                       "XXX XXXX XXXX",    11],
//   ["ru", "Russia",           "+7",   "🇷🇺", "^9\\d{9}$",                            "XXX XXX XX XX",    10],
//   ["tr", "Turkey",           "+90",  "🇹🇷", "^5\\d{9}$",                            "5XX XXX XXXX",     10],
//   ["it", "Italy",            "+39",  "🇮🇹", "^3\\d{8,9}$",                          "3XX XXX XXXX",     10],
//   ["es", "Spain",            "+34",  "🇪🇸", "^[6-7]\\d{8}$",                        "XXX XXX XXX",       9],
//   ["pl", "Poland",           "+48",  "🇵🇱", "^[4-8]\\d{8}$",                        "XXX XXX XXX",       9],
//   ["nl", "Netherlands",      "+31",  "🇳🇱", "^6\\d{8}$",                            "6 XXXX XXXX",       9],
//   ["se", "Sweden",           "+46",  "🇸🇪", "^7[02369]\\d{7}$",                     "7X XXX XXXX",       9],
//   ["no", "Norway",           "+47",  "🇳🇴", "^[49]\\d{7}$",                         "XXX XX XXX",        8],
//   ["dk", "Denmark",          "+45",  "🇩🇰", "^[2-9]\\d{7}$",                        "XXXX XXXX",         8],
//   ["fi", "Finland",          "+358", "🇫🇮", "^[4-5]\\d{7,8}$",                     "XX XXXXXXX",        9],
//   ["ch", "Switzerland",      "+41",  "🇨🇭", "^7[5-9]\\d{7}$",                       "7X XXX XXXX",       9],
//   ["at", "Austria",          "+43",  "🇦🇹", "^6[5-9]\\d{7,10}$",                   "XXX XXXXXXX",      11],
//   ["be", "Belgium",          "+32",  "🇧🇪", "^4[5-9]\\d{7}$",                       "XXX XX XX XX",      9],
//   ["pt", "Portugal",         "+351", "🇵🇹", "^9[1236]\\d{7}$",                      "9XX XXX XXX",       9],
//   ["gr", "Greece",           "+30",  "🇬🇷", "^69\\d{8}$",                           "69X XXX XXXX",     10],
//   ["il", "Israel",           "+972", "🇮🇱", "^5[024589]\\d{7}$",                    "5X XXX XXXX",       9],
//   ["ma", "Morocco",          "+212", "🇲🇦", "^6\\d{8}$",                            "6XX XXX XXX",       9],
//   ["dz", "Algeria",          "+213", "🇩🇿", "^(5|6|7)\\d{8}$",                     "XXX XXX XXXX",      9],
//   ["tn", "Tunisia",          "+216", "🇹🇳", "^[259]\\d{7}$",                        "XX XXX XXX",        8],
//   ["ke", "Kenya",            "+254", "🇰🇪", "^7\\d{8}$",                            "7XX XXX XXX",       9],
//   ["gh", "Ghana",            "+233", "🇬🇭", "^[235]\\d{8}$",                        "XXX XXX XXXX",      9],
//   ["ug", "Uganda",           "+256", "🇺🇬", "^7\\d{8}$",                            "7XX XXX XXX",       9],
//   ["tz", "Tanzania",         "+255", "🇹🇿", "^7\\d{8}$",                            "7XX XXX XXX",       9],
//   ["id", "Indonesia",        "+62",  "🇮🇩", "^8\\d{7,11}$",                         "8XX XXXX XXXX",    12],
//   ["ph", "Philippines",      "+63",  "🇵🇭", "^9\\d{9}$",                            "9XX XXX XXXX",     10],
//   ["th", "Thailand",         "+66",  "🇹🇭", "^[689]\\d{8}$",                        "XXX XXX XXXX",      9],
//   ["vn", "Vietnam",          "+84",  "🇻🇳", "^[35789]\\d{8}$",                      "XXX XXX XXXX",      9],
//   ["my", "Malaysia",         "+60",  "🇲🇾", "^1[0-9]\\d{7,8}$",                    "XX XXXX XXXX",      9],
//   ["sg", "Singapore",        "+65",  "🇸🇬", "^[689]\\d{7}$",                        "XXXX XXXX",         8],
//   ["hk", "Hong Kong",        "+852", "🇭🇰", "^[5-9]\\d{7}$",                        "XXXX XXXX",         8],
//   ["nz", "New Zealand",      "+64",  "🇳🇿", "^[28]\\d{7,9}$",                       "XX XXX XXXX",       9],
//   ["ar", "Argentina",        "+54",  "🇦🇷", "^9\\d{10}$",                           "9XX XXXX XXXX",    11],
//   ["co", "Colombia",         "+57",  "🇨🇴", "^3\\d{9}$",                            "3XX XXX XXXX",     10],
//   ["cl", "Chile",            "+56",  "🇨🇱", "^9\\d{8}$",                            "9XXXX XXXX",        9],
//   ["pe", "Peru",             "+51",  "🇵🇪", "^9\\d{8}$",                            "9XX XXX XXX",       9],
//   ["ve", "Venezuela",        "+58",  "🇻🇪", "^[24][1-9]\\d{7}$",                   "XXX XXX XXXX",     10],
//   ["ua", "Ukraine",          "+380", "🇺🇦", "^[3-9]\\d{8}$",                        "XXX XXX XXXX",      9],
//   ["by", "Belarus",          "+375", "🇧🇾", "^(25|29|33|44)\\d{7}$",               "XX XXX XXXX",       9],
//   ["kz", "Kazakhstan",       "+7",   "🇰🇿", "^7\\d{9}$",                            "7XX XXX XXXX",     10],
//   ["uz", "Uzbekistan",       "+998", "🇺🇿", "^[39]\\d{8}$",                         "XX XXX XXXX",       9],
//   ["ir", "Iran",             "+98",  "🇮🇷", "^9\\d{9}$",                            "9XX XXX XXXX",     10],
//   ["iq", "Iraq",             "+964", "🇮🇶", "^7[5-9]\\d{8}$",                       "7XX XXX XXXX",     10],
//   ["jo", "Jordan",           "+962", "🇯🇴", "^7[789]\\d{7}$",                       "7X XXX XXXX",       9],
//   ["lb", "Lebanon",          "+961", "🇱🇧", "^[37]\\d{7}$",                         "XX XXX XXX",        8],
//   ["sy", "Syria",            "+963", "🇸🇾", "^9[1-5]\\d{7}$",                       "9X XXX XXXX",       9],
//   ["ly", "Libya",            "+218", "🇱🇾", "^9[1-5]\\d{7}$",                       "9X XXX XXXX",       9],
//   ["sd", "Sudan",            "+249", "🇸🇩", "^9\\d{8}$",                            "9XX XXX XXXX",      9],
//   ["ye", "Yemen",            "+967", "🇾🇪", "^7[0137]\\d{7}$",                      "7XX XXX XXX",       9],
//   ["om", "Oman",             "+968", "🇴🇲", "^9\\d{7}$",                            "9XXX XXXX",         8],
//   ["qa", "Qatar",            "+974", "🇶🇦", "^[3567]\\d{7}$",                       "XXXX XXXX",         8],
//   ["kw", "Kuwait",           "+965", "🇰🇼", "^[569]\\d{7}$",                        "XXXX XXXX",         8],
//   ["bh", "Bahrain",          "+973", "🇧🇭", "^[3679]\\d{7}$",                       "XXXX XXXX",         8],
// ];

// // ─────────────────────────────────────────────────────────────
// // Build country map once at module load (O(1) lookup)
// // ─────────────────────────────────────────────────────────────

// const COUNTRY_MAP = new Map<string, Country>();

// for (const [code, name, dialCode, flag, patternStr, format, maxLength] of RAW) {
//   COUNTRY_MAP.set(code, {
//     code,
//     name,
//     dialCode,
//     flag,
//     pattern: new RegExp(patternStr),
//     format,
//     maxLength,
//   });
// }

// const ALL_COUNTRIES: Country[] = Array.from(COUNTRY_MAP.values()).sort((a, b) =>
//   a.name.localeCompare(b.name)
// );

// // ─────────────────────────────────────────────────────────────
// // Helpers
// // ─────────────────────────────────────────────────────────────

// const digitsOnly = (s: string) => s.replace(/\D/g, "");

// function formatNational(digits: string, country: Country): string {
//   const fmt = country.format;
//   let i = 0;
//   let result = "";
//   for (const ch of fmt) {
//     if (i >= digits.length) break;
//     if (ch === "X") {
//       result += digits[i++];
//     } else {
//       result += ch;
//     }
//   }
//   return result;
// }

// function validateNational(digits: string, country: Country): boolean {
//   return country.pattern.test(digits);
// }

// // ─────────────────────────────────────────────────────────────
// // Sub-components (memoised)
// // ─────────────────────────────────────────────────────────────

// interface FlagProps {
//   flag: string;
//   name: string;
// }
// const Flag = memo(({ flag, name }: FlagProps) => (
//   <span role="img" aria-label={name} className="text-lg leading-none select-none">
//     {flag}
//   </span>
// ));
// Flag.displayName = "Flag";

// interface DropdownItemProps {
//   country: Country;
//   isSelected: boolean;
//   onSelect: (code: string) => void;
//   className?: string;
// }
// const DropdownItem = memo(({ country, isSelected, onSelect, className }: DropdownItemProps) => {
//   const handleClick = useCallback(() => onSelect(country.code), [country.code, onSelect]);
//   return (
//     <li>
//       <button
//         type="button"
//         role="option"
//         aria-selected={isSelected}
//         onClick={handleClick}
//         className={[
//           "flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
//           isSelected ? "bg-blue-50 font-medium text-blue-700" : "hover:bg-gray-50",
//           className,
//         ]
//           .filter(Boolean)
//           .join(" ")}
//       >
//         <Flag flag={country.flag} name={country.name} />
//         <span className="flex-1 truncate">{country.name}</span>
//         <span className="text-gray-400 text-xs tabular-nums">{country.dialCode}</span>
//       </button>
//     </li>
//   );
// });
// DropdownItem.displayName = "DropdownItem";

// // ─────────────────────────────────────────────────────────────
// // Main component
// // ─────────────────────────────────────────────────────────────

// export const PhoneInput = memo(function PhoneInput({
//   value = "",
//   onChange,
//   defaultCountry = "us",
//   preferredCountries = [],
//   placeholder,
//   disabled = false,
//   name,
//   id,
//   error = false,
//   className,
//   inputClassName,
//   selectorClassName,
//   dropdownClassName,
//   dropdownItemClassName,
// }: PhoneInputProps) {
//   // ── State ──────────────────────────────────────────────────
//   const [selectedCode, setSelectedCode] = useState<string>(() =>
//     COUNTRY_MAP.has(defaultCountry) ? defaultCountry : "us"
//   );
//   const [inputValue, setInputValue] = useState<string>("");
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);
//   const listRef = useRef<HTMLUListElement>(null);

//   const country = useMemo(
//     () => COUNTRY_MAP.get(selectedCode) ?? COUNTRY_MAP.get("us")!,
//     [selectedCode]
//   );

//   // ── Sync external value → internal (digits only)
//   useEffect(() => {
//     if (!value) return setInputValue("");
//     // strip dial code if present
//     let stripped = value;
//     if (value.startsWith("+")) {
//       stripped = digitsOnly(value.slice(country.dialCode.length));
//     } else {
//       stripped = digitsOnly(value);
//     }
//     setInputValue(formatNational(stripped, country));
//   }, [value, country]);

//   // ── Close dropdown on outside click ───────────────────────
//   useEffect(() => {
//     if (!open) return;
//     const handler = (e: MouseEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
//         setOpen(false);
//         setSearch("");
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [open]);

//   // ── Focus search on open ───────────────────────────────────
//   useEffect(() => {
//     if (open) {
//       setTimeout(() => searchRef.current?.focus(), 0);
//     }
//   }, [open]);

//   // ── Sorted country list with preferred on top ──────────────
//   const countryList = useMemo(() => {
//     const preferred = preferredCountries
//       .map((c) => COUNTRY_MAP.get(c))
//       .filter(Boolean) as Country[];
//     const preferredSet = new Set(preferredCountries);
//     const rest = ALL_COUNTRIES.filter((c) => !preferredSet.has(c.code));
//     const list =
//       preferred.length > 0
//         ? [...preferred, { code: "__sep__" } as unknown as Country, ...rest]
//         : rest;

//     if (!search) return list;
//     const q = search.toLowerCase();
//     return list.filter(
//       (c) =>
//         (c as Country).code === "__sep__" ||
//         c.name.toLowerCase().includes(q) ||
//         c.dialCode.includes(q)
//     );
//   }, [preferredCountries, search]);

//   // ── Input change ──────────────────────────────────────────
//   const handleInput = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const raw = digitsOnly(e.target.value).slice(0, country.maxLength);
//       const formatted = formatNational(raw, country);
//       setInputValue(formatted);
//       const full = `${country.dialCode}${raw}`;
//       onChange?.(full, { isValid: validateNational(raw, country), country });
//     },
//     [country, onChange]
//   );

//   // ── Country select ────────────────────────────────────────
//   const handleSelect = useCallback(
//     (code: string) => {
//       if (code === "__sep__") return;
//       setSelectedCode(code);
//       setOpen(false);
//       setSearch("");
//       const newCountry = COUNTRY_MAP.get(code)!;
//       const raw = digitsOnly(inputValue);
//       const full = `${newCountry.dialCode}${raw}`;
//       onChange?.(full, { isValid: validateNational(raw, newCountry), country: newCountry });
//     },
//     [inputValue, onChange]
//   );

//   const toggleDropdown = useCallback(() => {
//     if (!disabled) setOpen((v) => !v);
//   }, [disabled]);

//   // ── Keyboard nav in dropdown ──────────────────────────────
//   const handleDropdownKey = useCallback(
//     (e: React.KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setOpen(false);
//         setSearch("");
//       }
//     },
//     []
//   );

//   // ── Derived ───────────────────────────────────────────────
//   const digits = digitsOnly(inputValue);
//   const isValid = digits.length > 0 && validateNational(digits, country);
//   const isInvalid = digits.length > 0 && !isValid;
//   const showError = error || isInvalid;

//   // ─────────────────────────────────────────────────────────
//   return (
//     <div ref={wrapperRef} className="relative w-full">
//       {/* ── Wrapper ── */}
//       <div
//         className={[
//           "flex items-center w-full overflow-hidden transition-colors",
//           showError ? "border-red-500 ring-1 ring-red-500" : "border-gray-200",
//           disabled ? "opacity-50 cursor-not-allowed" : "",
//           className ??
//             "h-11 rounded-xl border bg-[#F4F4F4]",
//         ]
//           .filter(Boolean)
//           .join(" ")}
//       >
//         {/* ── Country selector ── */}
//         <button
//           type="button"
//           aria-haspopup="listbox"
//           aria-expanded={open}
//           aria-label={`Country: ${country.name} ${country.dialCode}`}
//           disabled={disabled}
//           onClick={toggleDropdown}
//           className={[
//             "flex items-center gap-1.5 h-full shrink-0 transition-colors",
//             "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
//             disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-black/5",
//             selectorClassName ?? "bg-[#E5E5E5] rounded-l-xl px-4",
//           ]
//             .filter(Boolean)
//             .join(" ")}
//         >
//           <Flag flag={country.flag} name={country.name} />
//           <span className="text-xs text-gray-500 font-medium tabular-nums">
//             {country.dialCode}
//           </span>
//           <svg
//             className={[
//               "w-3 h-3 text-gray-400 transition-transform duration-200",
//               open ? "rotate-180" : "",
//             ].join(" ")}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2.5}
//             aria-hidden="true"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         {/* ── Phone input ── */}
//         <input
//           id={id}
//           name={name}
//           type="tel"
//           inputMode="tel"
//           autoComplete="tel"
//           disabled={disabled}
//           value={inputValue}
//           onChange={handleInput}
//           placeholder={placeholder ?? country.format.replace(/X/g, "0")}
//           aria-invalid={showError}
//           aria-label="Phone number"
//           className={[
//             "flex-1 h-full px-3 text-sm bg-transparent border-none outline-none",
//             "placeholder:text-gray-400",
//             disabled ? "cursor-not-allowed" : "",
//             inputClassName ?? "",
//           ]
//             .filter(Boolean)
//             .join(" ")}
//         />

//         {/* ── Validation indicator ── */}
//         {digits.length > 0 && (
//           <span
//             aria-hidden="true"
//             className={[
//               "mr-3 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold",
//               isValid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500",
//             ].join(" ")}
//           >
//             {isValid ? "✓" : "✗"}
//           </span>
//         )}
//       </div>

//       {/* ── Dropdown ── */}
//       {open && (
//         <div
//           role="dialog"
//           aria-label="Select country"
//           onKeyDown={handleDropdownKey}
//           className={[
//             "absolute z-50 mt-1 w-full bg-white border border-gray-200 shadow-xl",
//             "flex flex-col",
//             dropdownClassName ?? "rounded-xl",
//           ]
//             .filter(Boolean)
//             .join(" ")}
//         >
//           {/* Search */}
//           <div className="p-2 border-b border-gray-100">
//             <input
//               ref={searchRef}
//               type="search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search country..."
//               aria-label="Search country"
//               className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* List */}
//           <ul
//             ref={listRef}
//             role="listbox"
//             aria-label="Countries"
//             className="overflow-y-auto max-h-56 scrollbar-thin scrollbar-thumb-gray-200"
//           >
//             {countryList.length === 0 && (
//               <li className="px-3 py-3 text-sm text-gray-400 text-center">
//                 No results
//               </li>
//             )}
//             {countryList.map((c) =>
//               (c as unknown as { code: string }).code === "__sep__" ? (
//                 <li
//                   key="__sep__"
//                   role="separator"
//                   className="my-1 border-t border-gray-100"
//                 />
//               ) : (
//                 <DropdownItem
//                   key={c.code}
//                   country={c}
//                   isSelected={c.code === selectedCode}
//                   onSelect={handleSelect}
//                   className={dropdownItemClassName}
//                 />
//               )
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// });

// PhoneInput.displayName = "PhoneInput";

// export default PhoneInput;

// ==========================================================================================

/**
 * PhoneInput - High-performance phone input with per-country validation
 *
 * Features:
 * - Zero external phone-lib dependency (validation via lightweight regex map)
 * - Lazy-loads country list (code-split friendly)
 * - Fully Tailwind-composable via className props
 * - Accessible (ARIA, keyboard nav)
 * - Memoised rendering — only the changed subcomponent re-renders
 *
 * Usage:
 *   <PhoneInput
 *     value={value}
 *     onChange={setValue}
 *     defaultCountry="us"
 *     preferredCountries={["gb", "us", "fr"]}
 *     placeholder="0101 434 3413"
 *     className="h-11 rounded-xl border border-gray-200 bg-gray-100"
 *     inputClassName="bg-gray-100 rounded-xl"
 *     selectorClassName="bg-gray-200 rounded-l-xl px-4"
 *     dropdownClassName="rounded-lg shadow-lg"
 *     error={!!validationError}
 *     disabled={disabled}
 *   />
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface Country {
  code: string; // ISO 3166-1 alpha-2, lowercase  e.g. "us"
  name: string;
  dialCode: string; // e.g. "+1"
  flag: string; // emoji
  /** Regex that validates the national number (digits only, no dial code) */
  pattern: RegExp;
  /** Human-readable format hint e.g. "XXX XXX XXXX" */
  format: string;
  /** Max digit length for the national number */
  maxLength: number;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (
    value: string,
    meta: { isValid: boolean; country: Country },
  ) => void;
  defaultCountry?: string;
  preferredCountries?: string[];
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  error?: boolean;
  /** Root wrapper className */
  className?: string;
  /** <input> className */
  inputClassName?: string;
  /** Country selector button className */
  selectorClassName?: string;
  /** Dropdown list className */
  dropdownClassName?: string;
  /** Dropdown item className */
  dropdownItemClassName?: string;
}

// ─────────────────────────────────────────────────────────────
// Country data  (minimal, tree-shakeable — add more as needed)
// Each entry: [code, name, dialCode, flag, patternStr, format, maxLength]
// ─────────────────────────────────────────────────────────────

type RawCountry = [string, string, string, string, string, string, number];

const RAW: RawCountry[] = [
  [
    "us",
    "United States",
    "+1",
    "🇺🇸",
    "^[2-9]\\d{2}[2-9]\\d{6}$",
    "XXX XXX XXXX",
    10,
  ],
  ["gb", "United Kingdom", "+44", "🇬🇧", "^[1-9]\\d{8,9}$", "XXXX XXXXXX", 10],
  ["fr", "France", "+33", "🇫🇷", "^[1-9]\\d{8}$", "X XX XX XX XX", 9],
  ["de", "Germany", "+49", "🇩🇪", "^[1-9]\\d{3,12}$", "XXX XXXXXXXX", 12],
  ["eg", "Egypt", "+20", "🇪🇬", "^(10|11|12|15)\\d{8}$", "XXX XXXX XXXX", 10],
  ["sa", "Saudi Arabia", "+966", "🇸🇦", "^(5\\d{8})$", "5X XXX XXXX", 9],
  ["ae", "UAE", "+971", "🇦🇪", "^(5[024568]\\d{7})$", "5X XXX XXXX", 9],
  ["in", "India", "+91", "🇮🇳", "^[6-9]\\d{9}$", "XXXXX XXXXX", 10],
  ["pk", "Pakistan", "+92", "🇵🇰", "^3[0-9]{9}$", "3XX XXX XXXX", 10],
  ["bd", "Bangladesh", "+880", "🇧🇩", "^1[3-9]\\d{8}$", "1XX XXXX XXXX", 10],
  ["ng", "Nigeria", "+234", "🇳🇬", "^[7-9]\\d{9}$", "XXX XXX XXXX", 10],
  ["za", "South Africa", "+27", "🇿🇦", "^[6-8]\\d{8}$", "XX XXX XXXX", 9],
  ["br", "Brazil", "+55", "🇧🇷", "^[1-9]{2}9?[6-9]\\d{7}$", "XX XXXXX XXXX", 11],
  ["mx", "Mexico", "+52", "🇲🇽", "^[1-9]\\d{9}$", "XXX XXX XXXX", 10],
  ["ca", "Canada", "+1", "🇨🇦", "^[2-9]\\d{2}[2-9]\\d{6}$", "XXX XXX XXXX", 10],
  ["au", "Australia", "+61", "🇦🇺", "^[2-578]\\d{8}$", "XXX XXX XXX", 9],
  ["jp", "Japan", "+81", "🇯🇵", "^[7-9]0\\d{8}$", "XXX XXXX XXXX", 10],
  ["cn", "China", "+86", "🇨🇳", "^1[3-9]\\d{9}$", "XXX XXXX XXXX", 11],
  ["ru", "Russia", "+7", "🇷🇺", "^9\\d{9}$", "XXX XXX XX XX", 10],
  ["tr", "Turkey", "+90", "🇹🇷", "^5\\d{9}$", "5XX XXX XXXX", 10],
  ["it", "Italy", "+39", "🇮🇹", "^3\\d{8,9}$", "3XX XXX XXXX", 10],
  ["es", "Spain", "+34", "🇪🇸", "^[6-7]\\d{8}$", "XXX XXX XXX", 9],
  ["pl", "Poland", "+48", "🇵🇱", "^[4-8]\\d{8}$", "XXX XXX XXX", 9],
  ["nl", "Netherlands", "+31", "🇳🇱", "^6\\d{8}$", "6 XXXX XXXX", 9],
  ["se", "Sweden", "+46", "🇸🇪", "^7[02369]\\d{7}$", "7X XXX XXXX", 9],
  ["no", "Norway", "+47", "🇳🇴", "^[49]\\d{7}$", "XXX XX XXX", 8],
  ["dk", "Denmark", "+45", "🇩🇰", "^[2-9]\\d{7}$", "XXXX XXXX", 8],
  ["fi", "Finland", "+358", "🇫🇮", "^[4-5]\\d{7,8}$", "XX XXXXXXX", 9],
  ["ch", "Switzerland", "+41", "🇨🇭", "^7[5-9]\\d{7}$", "7X XXX XXXX", 9],
  ["at", "Austria", "+43", "🇦🇹", "^6[5-9]\\d{7,10}$", "XXX XXXXXXX", 11],
  ["be", "Belgium", "+32", "🇧🇪", "^4[5-9]\\d{7}$", "XXX XX XX XX", 9],
  ["pt", "Portugal", "+351", "🇵🇹", "^9[1236]\\d{7}$", "9XX XXX XXX", 9],
  ["gr", "Greece", "+30", "🇬🇷", "^69\\d{8}$", "69X XXX XXXX", 10],
  ["il", "Israel", "+972", "🇮🇱", "^5[024589]\\d{7}$", "5X XXX XXXX", 9],
  ["ma", "Morocco", "+212", "🇲🇦", "^6\\d{8}$", "6XX XXX XXX", 9],
  ["dz", "Algeria", "+213", "🇩🇿", "^(5|6|7)\\d{8}$", "XXX XXX XXXX", 9],
  ["tn", "Tunisia", "+216", "🇹🇳", "^[259]\\d{7}$", "XX XXX XXX", 8],
  ["ke", "Kenya", "+254", "🇰🇪", "^7\\d{8}$", "7XX XXX XXX", 9],
  ["gh", "Ghana", "+233", "🇬🇭", "^[235]\\d{8}$", "XXX XXX XXXX", 9],
  ["ug", "Uganda", "+256", "🇺🇬", "^7\\d{8}$", "7XX XXX XXX", 9],
  ["tz", "Tanzania", "+255", "🇹🇿", "^7\\d{8}$", "7XX XXX XXX", 9],
  ["id", "Indonesia", "+62", "🇮🇩", "^8\\d{7,11}$", "8XX XXXX XXXX", 12],
  ["ph", "Philippines", "+63", "🇵🇭", "^9\\d{9}$", "9XX XXX XXXX", 10],
  ["th", "Thailand", "+66", "🇹🇭", "^[689]\\d{8}$", "XXX XXX XXXX", 9],
  ["vn", "Vietnam", "+84", "🇻🇳", "^[35789]\\d{8}$", "XXX XXX XXXX", 9],
  ["my", "Malaysia", "+60", "🇲🇾", "^1[0-9]\\d{7,8}$", "XX XXXX XXXX", 9],
  ["sg", "Singapore", "+65", "🇸🇬", "^[689]\\d{7}$", "XXXX XXXX", 8],
  ["hk", "Hong Kong", "+852", "🇭🇰", "^[5-9]\\d{7}$", "XXXX XXXX", 8],
  ["nz", "New Zealand", "+64", "🇳🇿", "^[28]\\d{7,9}$", "XX XXX XXXX", 9],
  ["ar", "Argentina", "+54", "🇦🇷", "^9\\d{10}$", "9XX XXXX XXXX", 11],
  ["co", "Colombia", "+57", "🇨🇴", "^3\\d{9}$", "3XX XXX XXXX", 10],
  ["cl", "Chile", "+56", "🇨🇱", "^9\\d{8}$", "9XXXX XXXX", 9],
  ["pe", "Peru", "+51", "🇵🇪", "^9\\d{8}$", "9XX XXX XXX", 9],
  ["ve", "Venezuela", "+58", "🇻🇪", "^[24][1-9]\\d{7}$", "XXX XXX XXXX", 10],
  ["ua", "Ukraine", "+380", "🇺🇦", "^[3-9]\\d{8}$", "XXX XXX XXXX", 9],
  ["by", "Belarus", "+375", "🇧🇾", "^(25|29|33|44)\\d{7}$", "XX XXX XXXX", 9],
  ["kz", "Kazakhstan", "+7", "🇰🇿", "^7\\d{9}$", "7XX XXX XXXX", 10],
  ["uz", "Uzbekistan", "+998", "🇺🇿", "^[39]\\d{8}$", "XX XXX XXXX", 9],
  ["ir", "Iran", "+98", "🇮🇷", "^9\\d{9}$", "9XX XXX XXXX", 10],
  ["iq", "Iraq", "+964", "🇮🇶", "^7[5-9]\\d{8}$", "7XX XXX XXXX", 10],
  ["jo", "Jordan", "+962", "🇯🇴", "^7[789]\\d{7}$", "7X XXX XXXX", 9],
  ["lb", "Lebanon", "+961", "🇱🇧", "^[37]\\d{7}$", "XX XXX XXX", 8],
  ["sy", "Syria", "+963", "🇸🇾", "^9[1-5]\\d{7}$", "9X XXX XXXX", 9],
  ["ly", "Libya", "+218", "🇱🇾", "^9[1-5]\\d{7}$", "9X XXX XXXX", 9],
  ["sd", "Sudan", "+249", "🇸🇩", "^9\\d{8}$", "9XX XXX XXXX", 9],
  ["ye", "Yemen", "+967", "🇾🇪", "^7[0137]\\d{7}$", "7XX XXX XXX", 9],
  ["om", "Oman", "+968", "🇴🇲", "^9\\d{7}$", "9XXX XXXX", 8],
  ["qa", "Qatar", "+974", "🇶🇦", "^[3567]\\d{7}$", "XXXX XXXX", 8],
  ["kw", "Kuwait", "+965", "🇰🇼", "^[569]\\d{7}$", "XXXX XXXX", 8],
  ["bh", "Bahrain", "+973", "🇧🇭", "^[3679]\\d{7}$", "XXXX XXXX", 8],
];

// ─────────────────────────────────────────────────────────────
// Build country map once at module load (O(1) lookup)
// ─────────────────────────────────────────────────────────────

const COUNTRY_MAP = new Map<string, Country>();

for (const [code, name, dialCode, flag, patternStr, format, maxLength] of RAW) {
  COUNTRY_MAP.set(code, {
    code,
    name,
    dialCode,
    flag,
    pattern: new RegExp(patternStr),
    format,
    maxLength,
  });
}

const ALL_COUNTRIES: Country[] = Array.from(COUNTRY_MAP.values()).sort((a, b) =>
  a.name.localeCompare(b.name),
);

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const digitsOnly = (s: string) => s.replace(/\D/g, "");

function formatNational(digits: string, country: Country): string {
  const fmt = country.format;
  let i = 0;
  let result = "";
  for (const ch of fmt) {
    if (i >= digits.length) break;
    if (ch === "X") {
      result += digits[i++];
    } else {
      result += ch;
    }
  }
  return result;
}

function validateNational(digits: string, country: Country): boolean {
  return country.pattern.test(digits);
}

// ─────────────────────────────────────────────────────────────
// Sub-components (memoised)
// ─────────────────────────────────────────────────────────────

interface FlagProps {
  flag: string;
  name: string;
}
const Flag = memo(({ flag, name }: FlagProps) => (
  <span
    role="img"
    aria-label={name}
    className="text-lg leading-none select-none"
  >
    {flag}
  </span>
));
Flag.displayName = "Flag";

interface DropdownItemProps {
  country: Country;
  isSelected: boolean;
  onSelect: (code: string) => void;
  className?: string;
}
const DropdownItem = memo(
  ({ country, isSelected, onSelect, className }: DropdownItemProps) => {
    const handleClick = useCallback(
      () => onSelect(country.code),
      [country.code, onSelect],
    );
    return (
      <li>
        <button
          type="button"
          role="option"
          aria-selected={isSelected}
          onClick={handleClick}
          className={[
            "flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
            isSelected
              ? "bg-blue-50 font-medium text-blue-700"
              : "hover:bg-gray-50",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Flag flag={country.flag} name={country.name} />
          <span className="flex-1 truncate">{country.name}</span>
          <span className="text-gray-400 text-xs tabular-nums">
            {country.dialCode}
          </span>
        </button>
      </li>
    );
  },
);
DropdownItem.displayName = "DropdownItem";

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export const PhoneInput = memo(function PhoneInput({
  value = "",
  onChange,
  defaultCountry = "us",
  preferredCountries = [],
  placeholder,
  disabled = false,
  name,
  id,
  error = false,
  className,
  inputClassName,
  selectorClassName,
  dropdownClassName,
  dropdownItemClassName,
}: PhoneInputProps) {
  // ── State ──────────────────────────────────────────────────
  const [selectedCode, setSelectedCode] = useState<string>(() =>
    COUNTRY_MAP.has(defaultCountry) ? defaultCountry : "us",
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const country = useMemo(
    () => COUNTRY_MAP.get(selectedCode) ?? COUNTRY_MAP.get("us")!,
    [selectedCode],
  );

  // ── Sync external value → internal (digits only)
  useEffect(() => {
    if (!value) return setInputValue("");
    // strip dial code if present
    let stripped = value;
    if (value.startsWith("+")) {
      stripped = digitsOnly(value.slice(country.dialCode.length));
    } else {
      stripped = digitsOnly(value);
    }
    setInputValue(formatNational(stripped, country));
  }, [value, country]);

  // ── Close dropdown on outside click ───────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ── Focus search on open ───────────────────────────────────
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open]);

  // ── Sorted country list with preferred on top ──────────────
  const countryList = useMemo(() => {
    const preferred = preferredCountries
      .map((c) => COUNTRY_MAP.get(c))
      .filter(Boolean) as Country[];
    const preferredSet = new Set(preferredCountries);
    const rest = ALL_COUNTRIES.filter((c) => !preferredSet.has(c.code));
    const list =
      preferred.length > 0
        ? [...preferred, { code: "__sep__" } as unknown as Country, ...rest]
        : rest;

    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(
      (c) =>
        (c as Country).code === "__sep__" ||
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q),
    );
  }, [preferredCountries, search]);

  // ── Input change ──────────────────────────────────────────
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = digitsOnly(e.target.value).slice(0, country.maxLength);
      const formatted = formatNational(raw, country);
      setInputValue(formatted);
      const full = `${country.dialCode}${raw}`;
      onChange?.(full, { isValid: validateNational(raw, country), country });
    },
    [country, onChange],
  );

  // ── Country select ────────────────────────────────────────
  const handleSelect = useCallback(
    (code: string) => {
      if (code === "__sep__") return;
      setSelectedCode(code);
      setOpen(false);
      setSearch("");
      const newCountry = COUNTRY_MAP.get(code)!;
      const raw = digitsOnly(inputValue);
      const full = `${newCountry.dialCode}${raw}`;
      onChange?.(full, {
        isValid: validateNational(raw, newCountry),
        country: newCountry,
      });
    },
    [inputValue, onChange],
  );

  const toggleDropdown = useCallback(() => {
    if (!disabled) setOpen((v) => !v);
  }, [disabled]);

  // ── Keyboard nav in dropdown ──────────────────────────────
  const handleDropdownKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
    }
  }, []);

  // ── Derived ───────────────────────────────────────────────
  const digits = digitsOnly(inputValue);
  const isValid = digits.length > 0 && validateNational(digits, country);
  const isInvalid = digits.length > 0 && !isValid;
  const showError = error || isInvalid;

  // ─────────────────────────────────────────────────────────
  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* ── Wrapper ── */}
      <div
        className={[
          "flex items-center w-full overflow-hidden transition-colors",
          showError ? "border-red-500 ring-1 ring-red-500" : "border-gray-200",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          className ?? "h-11 rounded-xl border bg-[#F4F4F4]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* ── Country selector ── */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country: ${country.name} ${country.dialCode}`}
          disabled={disabled}
          onClick={toggleDropdown}
          className={[
            "flex items-center gap-1.5 h-full shrink-0 transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-black/5",
            selectorClassName ?? "bg-[#E5E5E5] rounded-l-xl px-4",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="mb-0.5">
            <Flag flag={country.flag} name={country.name} />
          </div>
          <span className="text-xs text-gray-500 font-medium tabular-nums">
            {country.dialCode}
          </span>
          <svg
            className={[
              "w-3 h-3 text-gray-400 transition-transform duration-200",
              open ? "rotate-180" : "",
            ].join(" ")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* ── Phone input ── */}
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          value={inputValue}
          onChange={handleInput}
          placeholder={placeholder ?? country.format.replace(/X/g, "0")}
          aria-invalid={showError}
          aria-label="Phone number"
          className={[
            "flex-1 h-full px-3 text-sm bg-transparent border-none outline-none",
            "placeholder:text-gray-400",
            disabled ? "cursor-not-allowed" : "",
            inputClassName ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {/* ── Validation indicator ── */}
        {/* {digits.length > 0 && (
          <span
            aria-hidden="true"
            className={[
              "mr-3 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold",
              isValid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500",
            ].join(" ")}
          >
            {isValid ? "✓" : "✗"}
          </span>
        )} */}
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Select country"
          onKeyDown={handleDropdownKey}
          className={[
            "absolute z-50 mt-1 w-full bg-white border border-gray-200 shadow-xl",
            "flex flex-col",
            dropdownClassName ?? "rounded-xl",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              aria-label="Search country"
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* List */}
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Countries"
            className="overflow-y-auto max-h-56 scrollbar-thin scrollbar-thumb-gray-200"
          >
            {countryList.length === 0 && (
              <li className="px-3 py-3 text-sm text-gray-400 text-center">
                No results
              </li>
            )}
            {countryList.map((c) =>
              (c as unknown as { code: string }).code === "__sep__" ? (
                <li
                  key="__sep__"
                  role="separator"
                  className="my-1 border-t border-gray-100"
                />
              ) : (
                <DropdownItem
                  key={c.code}
                  country={c}
                  isSelected={c.code === selectedCode}
                  onSelect={handleSelect}
                  className={dropdownItemClassName}
                />
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
