// import { useState, useRef, useEffect, useCallback } from "react";
// import { COUNTRIES } from "./countries";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface CountryData {
//   code: string; // ISO 2-letter
//   name: string;
//   flag: string;
//   dialCode: string;
//   phoneMask: string; // X = digit, ' ' = space, '-' = dash, etc.
//   mobilePrefix?: string[];
//   landlinePrefix?: string[];
//   example: {
//     mobile: string;
//     landline?: string;
//   };
// }

// type LineType = "mobile" | "landline" | "unknown";

// interface PhoneResult {
//   raw: string;
//   formatted: string;
//   dialCode: string;
//   nationalNumber: string;
//   country: CountryData | null;
//   lineType: LineType;
//   isValid: boolean;
// }

// // ─── Country Database ─────────────────────────────────────────────────────────

// // dial-code → country (longest match first for ambiguous codes like +1)
// const DIAL_CODE_MAP = new Map<string, CountryData>(
//   [...COUNTRIES]
//     .sort((a, b) => b.dialCode.length - a.dialCode.length)
//     .map((c) => [c.dialCode, c]),
// );

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function detectCountryFromDialCode(input: string): CountryData | null {
//   const normalized = input.startsWith("+") ? input : "+" + input;
//   for (const [dc, country] of DIAL_CODE_MAP) {
//     if (normalized.startsWith(dc)) return country;
//   }
//   return null;
// }

// function detectLineType(
//   country: CountryData | null,
//   nationalNumber: string,
// ): LineType {
//   if (!country) return "unknown";
//   const digits = nationalNumber.replace(/\D/g, "");
//   if (country.mobilePrefix) {
//     for (const p of country.mobilePrefix) {
//       if (digits.startsWith(p)) return "mobile";
//     }
//   }
//   if (country.landlinePrefix) {
//     for (const p of country.landlinePrefix) {
//       if (digits.startsWith(p)) return "landline";
//     }
//   }
//   return "unknown";
// }

// function formatNational(digits: string, mask: string): string {
//   let result = "";
//   let di = 0;
//   for (let mi = 0; mi < mask.length && di < digits.length; mi++) {
//     if (mask[mi] === "X") {
//       result += digits[di++];
//     } else {
//       result += mask[mi];
//     }
//   }
//   return result;
// }

// function parsePhone(raw: string): PhoneResult {
//   const stripped = raw.replace(/\s/g, "");
//   const country = detectCountryFromDialCode(stripped) || null;

//   let nationalNumber = stripped;
//   if (country) {
//     nationalNumber = stripped.slice(country.dialCode.length);
//   }

//   const digits = nationalNumber.replace(/\D/g, "");
//   const lineType = detectLineType(country, nationalNumber);

//   const maskDigits = country?.phoneMask.replace(/[^X]/g, "").length ?? 0;
//   const isValid = country
//     ? digits.length >= maskDigits - 1 && digits.length <= maskDigits + 1
//     : digits.length >= 6;

//   const formatted = country
//     ? country.dialCode + " " + formatNational(digits, country.phoneMask)
//     : raw;

//   return {
//     raw,
//     formatted,
//     dialCode: country?.dialCode ?? "",
//     nationalNumber: digits,
//     country,
//     lineType,
//     isValid,
//   };
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────
// // function CountryPicker({
// //   selected,
// //   onChange,
// // }: {
// //   selected: CountryData | null;
// //   onChange: (c: CountryData) => void;
// // }) {
// function CountryPicker({
//   selected,
//   onChange,
//   buttonClassName,
//   dropdownClassName,
// }: {
//   selected: CountryData | null;
//   onChange: (c: CountryData) => void;
//   buttonClassName?: string;
//   dropdownClassName?: string;
// }){
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const ref = useRef<HTMLDivElement>(null);

//   const filtered = COUNTRIES.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.dialCode.includes(search) ||
//       c.code.toLowerCase().includes(search.toLowerCase()),
//   );

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <div ref={ref} style={{ position: "relative" }}>
//       <button
//         type="button"
//         onClick={() => setOpen((o) => !o)}
//         // style={{
//         //   display: "flex",
//         //   alignItems: "center",
//         //   gap: "6px",
//         //   padding: "0 12px",
//         //   height: "100%",
//         //   background: "transparent",
//         //   border: "none",
//         //   cursor: "pointer",
//         //   borderRight: "1px solid var(--border)",
//         //   minWidth: "90px",
//         //   fontFamily: "inherit",
//         //   fontSize: "14px",
//         //   color: "var(--text)",
//         //   transition: "background 0.15s",
//         //   borderRadius: "10px 0 0 10px",
//         // }}
//         className={`country-btn ${buttonClassName ?? ""}`}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.background = "var(--hover)")
//         }
//         onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//       >
//         <span style={{ fontSize: "20px" }}>{selected?.flag ?? "🌍"}</span>
//         <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>
//           {selected?.dialCode ?? "+?"}
//         </span>
//         <svg
//           width="10"
//           height="6"
//           viewBox="0 0 10 6"
//           style={{
//             opacity: 0.5,
//             transform: open ? "rotate(180deg)" : "none",
//             transition: "transform 0.2s",
//           }}
//         >
//           <path
//             d="M1 1l4 4 4-4"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             fill="none"
//             strokeLinecap="round"
//           />
//         </svg>
//       </button>

//       {open && (
//         <div
//           style={{
//             position: "absolute",
//             top: "calc(100% + 8px)",
//             left: 0,
//             width: "280px",
//             background: "var(--surface)",
//             border: "1px solid var(--border)",
//             borderRadius: "12px",
//             boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
//             zIndex: 100,
//             overflow: "hidden",
//             animation: "dropIn 0.15s ease",
//           }}
//         >
//           {/* <div style={{ padding: "10px" }}> */}
//           <div className={`country-dropdown ${dropdownClassName ?? ""}`}>
//             <input
//               autoFocus
//               placeholder="Search country…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "8px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid var(--border)",
//                 background: "var(--bg)",
//                 color: "var(--text)",
//                 fontFamily: "inherit",
//                 fontSize: "13px",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>
//           <div style={{ maxHeight: "240px", overflowY: "auto" }}>
//             {filtered.map((c) => (
//               <button
//                 key={c.code}
//                 type="button"
//                 onClick={() => {
//                   onChange(c);
//                   setOpen(false);
//                   setSearch("");
//                 }}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   width: "100%",
//                   padding: "9px 14px",
//                   background:
//                     selected?.code === c.code
//                       ? "var(--accent-faint)"
//                       : "transparent",
//                   border: "none",
//                   cursor: "pointer",
//                   fontFamily: "inherit",
//                   fontSize: "13px",
//                   color: "var(--text)",
//                   textAlign: "left",
//                   transition: "background 0.1s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "var(--hover)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background =
//                     selected?.code === c.code
//                       ? "var(--accent-faint)"
//                       : "transparent")
//                 }
//               >
//                 <span style={{ fontSize: "18px" }}>{c.flag}</span>
//                 <span style={{ flex: 1 }}>{c.name}</span>
//                 <span style={{ opacity: 0.5, fontSize: "12px" }}>
//                   {c.dialCode}
//                 </span>
//               </button>
//             ))}
//             {filtered.length === 0 && (
//               <div
//                 style={{
//                   padding: "16px",
//                   textAlign: "center",
//                   opacity: 0.4,
//                   fontSize: "13px",
//                 }}
//               >
//                 No results
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function LineTypeBadge({ type }: { type: LineType }) {
//   const config = {
//     mobile: { label: "Mobile", icon: "📱", color: "#22c55e" },
//     landline: { label: "Landline", icon: "☎️", color: "#3b82f6" },
//     unknown: { label: "Unknown", icon: "❓", color: "#94a3b8" },
//   }[type];

//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "4px",
//         padding: "2px 8px",
//         borderRadius: "20px",
//         fontSize: "11px",
//         fontWeight: 600,
//         letterSpacing: "0.05em",
//         background: config.color + "18",
//         color: config.color,
//         border: `1px solid ${config.color}33`,
//         transition: "all 0.2s",
//       }}
//     >
//       {config.icon} {config.label}
//     </span>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// // interface PhoneInputProps {
// //   label?: string;
// //   placeholder?: string;
// //   defaultDialCode?: string;
// //   onChange?: (result: PhoneResult) => void;
// //   theme?: "light" | "dark";
// // }
// interface PhoneInputProps {
//   label?: string;
//   placeholder?: string;
//   defaultDialCode?: string;
//   onChange?: (result: PhoneResult) => void;

//   // 👇 الجديد
//   className?: string;
//   inputClassName?: string;
//   wrapperClassName?: string;
//   countryButtonClassName?: string;
//   dropdownClassName?: string;
//   theme?: "light" | "dark";
// }

// export function PhoneInput({
//   label = "Phone Number",
//   placeholder,
//   defaultDialCode = "+20",
//   onChange,
//   // theme = "dark",

//   className,
//   inputClassName,
//   wrapperClassName,
//   // countryButtonClassName,
//   // dropdownClassName,
// }: PhoneInputProps) {
//   const defaultCountry = DIAL_CODE_MAP.get(defaultDialCode) ?? COUNTRIES[0];
//   const [country, setCountry] = useState<CountryData>(defaultCountry);
//   const [inputValue, setInputValue] = useState("");
//   const [focused, setFocused] = useState(false);
//   const [touched, setTouched] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const result = parsePhone(country.dialCode + inputValue.replace(/\D/g, ""));

//   // Re-detect country if user types a full international number
//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       let val = e.target.value;

//       // If user pastes a full number starting with +
//       if (val.startsWith("+")) {
//         const detected = detectCountryFromDialCode(val);
//         if (detected) {
//           setCountry(detected);
//           const national = val
//             .slice(detected.dialCode.length)
//             .replace(/\D/g, "");
//           val = formatNational(national, detected.phoneMask);
//           setInputValue(val);
//           onChange?.(parsePhone(detected.dialCode + national));
//           return;
//         }
//       }

//       // Format as user types
//       const raw = val.replace(/\D/g, "");
//       const formatted = formatNational(raw, country.phoneMask);
//       setInputValue(formatted);
//       onChange?.(parsePhone(country.dialCode + raw));
//     },
//     [country, onChange],
//   );

//   const handleCountryChange = (c: CountryData) => {
//     setCountry(c);
//     const raw = inputValue.replace(/\D/g, "");
//     const formatted = formatNational(raw, c.phoneMask);
//     setInputValue(formatted);
//     inputRef.current?.focus();
//   };

//   const ph = placeholder ?? `e.g. ${country.example.mobile}`;
//   const digits = inputValue.replace(/\D/g, "");
//   const maskLen = country.phoneMask.replace(/[^X]/g, "").length;
//   const progress = Math.min(digits.length / maskLen, 1);
//   const showError = touched && !focused && digits.length > 0 && !result.isValid;
//   // const showSuccess = touched && result.isValid;

//   return (
//     <>
//       {/* <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

//         @keyframes dropIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(4px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%,100% { opacity:1 } 50% { opacity:.5 }
//         }
//         .phone-wrapper * {
//           box-sizing: border-box;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .phone-wrapper input::placeholder { color: var(--text-muted); }
//         .phone-wrapper input:focus { outline: none; }
//       `}</style> */}

//       {/* <div
//         className="phone-wrapper"
//         style={{
//           ...(vars as React.CSSProperties),
//           maxWidth: "420px",
//           width: "100%",
//         }}
//       > */}
//       <div className={`${wrapperClassName ?? ""}`}>
//         {/* Label */}
//         {/* <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "8px",
//           }}
//         >
//           <label
//             style={{
//               fontSize: "13px",
//               fontWeight: 600,
//               letterSpacing: "0.05em",
//               color: "var(--text-muted)",
//               textTransform: "uppercase",
//             }}
//           >
//             {label}
//           </label>
//           {digits.length > 0 && <LineTypeBadge type={result.lineType} />}
//         </div> */}

//         {/* Input box */}
//         {/* <div
//           style={{
//             display: "flex",
//             alignItems: "stretch",
//             height: "52px",
//             background: "var(--surface)",
//             border: `1.5px solid ${focused ? "var(--border-focus)" : showError ? "var(--error)" : showSuccess ? "var(--success)" : "var(--border)"}`,
//             borderRadius: "12px",
//             boxShadow: focused ? "var(--shadow)" : "none",
//             transition: "border-color 0.2s, box-shadow 0.2s",
//             overflow: "visible",
//             position: "relative",
//           }}
//         > */}
//         <div className={`phone-container ${className ?? ""}`}>
//           <CountryPicker selected={country} onChange={handleCountryChange} />

//           <input
//             ref={inputRef}
//             type="tel"
//             value={inputValue}
//             onChange={handleChange}
//             onFocus={() => setFocused(true)}
//             onBlur={() => {
//               setFocused(false);
//               setTouched(true);
//             }}
//             placeholder={ph}
//             // style={{
//             //   flex: 1,
//             //   padding: "0 14px",
//             //   background: "transparent",
//             //   border: "none",
//             //   fontSize: "16px",
//             //   fontWeight: 500,
//             //   color: "var(--text)",
//             //   letterSpacing: "0.04em",
//             // }}

//             className={`phone-input ${inputClassName ?? ""}`}
//           />

//           {/* Status icon */}
//           {/* {digits.length > 0 && (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 paddingRight: "14px",
//                 fontSize: "18px",
//                 animation: "slideUp 0.2s ease",
//               }}
//             >
//               {result.isValid ? "✅" : showError ? "❌" : "⋯"}
//             </div>
//           )} */}
//         </div>

//         {/* Progress bar */}
//         {/* <div
//           style={{
//             height: "3px",
//             background: "var(--border)",
//             borderRadius: "4px",
//             marginTop: "6px",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               height: "100%",
//               width: `${progress * 100}%`,
//               background: showError
//                 ? "var(--error)"
//                 : result.isValid
//                   ? "var(--success)"
//                   : "var(--accent)",
//               borderRadius: "4px",
//               transition: "width 0.2s, background 0.3s",
//             }}
//           />
//         </div> */}

//         {/* Hint / Error */}
//         {/* <div
//           style={{
//             marginTop: "6px",
//             minHeight: "18px",
//             fontSize: "12px",
//             color: showError ? "var(--error)" : "var(--text-muted)",
//             animation: "slideUp 0.15s ease",
//           }}
//         >
//           {showError
//             ? `Invalid ${country.name} number. Expected format: ${country.example.mobile}`
//             : digits.length === 0
//               ? country.example.landline
//                 ? `Mobile: ${country.example.mobile} · Landline: ${country.example.landline}`
//                 : `e.g. ${country.example.mobile}`
//               : `${country.dialCode} ${inputValue}`}
//         </div> */}

//         {/* Full result card (shown when valid) */}
//         {/* {result.isValid && (
//           <div
//             style={{
//               marginTop: "12px",
//               padding: "12px 16px",
//               background: "var(--surface2)",
//               borderRadius: "10px",
//               border: "1px solid var(--border)",
//               animation: "slideUp 0.2s ease",
//             }}
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "8px",
//               }}
//             >
//               {[
//                 ["Country", `${country.flag} ${country.name}`],
//                 ["Dial Code", country.dialCode],
//                 [
//                   "Line Type",
//                   result.lineType === "mobile"
//                     ? "📱 Mobile"
//                     : result.lineType === "landline"
//                       ? "☎️ Landline"
//                       : "❓ Unknown",
//                 ],
//                 ["Formatted", result.formatted],
//               ].map(([k, v]) => (
//                 <div key={k}>
//                   <div
//                     style={{
//                       fontSize: "10px",
//                       fontWeight: 700,
//                       letterSpacing: "0.08em",
//                       color: "var(--text-muted)",
//                       textTransform: "uppercase",
//                       marginBottom: "2px",
//                     }}
//                   >
//                     {k}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 600,
//                       color: "var(--text)",
//                     }}
//                   >
//                     {v}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )} */}
//       </div>
//     </>
//   );
// }



import React, { useState, useRef, useEffect, useCallback } from "react";
import { COUNTRIES } from "./countries";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CountryData {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  phoneMask: string;
  mobilePrefix?: string[];
  landlinePrefix?: string[];
  example: {
    mobile: string;
    landline?: string;
  };
}

type LineType = "mobile" | "landline" | "unknown";

interface PhoneResult {
  raw: string;
  formatted: string;
  dialCode: string;
  nationalNumber: string;
  country: CountryData | null;
  lineType: LineType;
  isValid: boolean;
}

const DIAL_CODE_MAP = new Map<string, CountryData>(
  [...COUNTRIES]
    .sort((a, b) => b.dialCode.length - a.dialCode.length)
    .map((c) => [c.dialCode, c])
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function detectCountryFromDialCode(input: string): CountryData | null {
  const normalized = input.startsWith("+") ? input : "+" + input;
  for (const [dc, country] of DIAL_CODE_MAP) {
    if (normalized.startsWith(dc)) return country;
  }
  return null;
}

function formatNational(digits: string, mask: string): string {
  let result = "";
  let di = 0;
  for (let mi = 0; mi < mask.length && di < digits.length; mi++) {
    if (mask[mi] === "X") {
      result += digits[di++];
    } else {
      result += mask[mi];
    }
  }
  return result;
}

function parsePhone(raw: string): PhoneResult {
  const stripped = raw.replace(/\s/g, "");
  const country = detectCountryFromDialCode(stripped) || null;

  let nationalNumber = stripped;
  if (country) {
    nationalNumber = stripped.slice(country.dialCode.length);
  }

  const digits = nationalNumber.replace(/\D/g, "");
  const maskDigits = country?.phoneMask.replace(/[^X]/g, "").length ?? 0;
  const isValid = country
    ? digits.length >= maskDigits - 1 && digits.length <= maskDigits + 1
    : digits.length >= 6;

  return {
    raw,
    formatted: country ? country.dialCode + " " + formatNational(digits, country.phoneMask) : raw,
    dialCode: country?.dialCode ?? "",
    nationalNumber: digits,
    country,
    lineType: "unknown",
    isValid,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function CountryPicker({
  selected,
  onChange,
  radius,
  disabled,
}: {
  selected: CountryData | null;
  onChange: (c: CountryData) => void;
  radius?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "flex", alignItems: "stretch" }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 16px",
          height: "100%",
          background: "#e5e5e5", // لون مشابه للقديم
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          fontSize: "15px",
          color: "#52525b",
          transition: "background 0.15s",
          outline: "none",
          borderTopLeftRadius: radius ?? "12px",
          borderBottomLeftRadius: radius ?? "12px",
          opacity: disabled ? 0.6 : 1,
        }}
        onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = "#d4d4d8")}
        onMouseLeave={(e) => !disabled && (e.currentTarget.style.background = "#e5e5e5")}
      >
        <span style={{ fontSize: "18px", display: "flex", alignItems: "center" }}>
          {selected?.flag ?? "🌍"}
        </span>
        <span style={{ fontWeight: 500, letterSpacing: "0.02em" }}>
          {selected?.dialCode ?? "+?"}
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: "280px",
            background: "#ffffff",
            border: "1px solid #e4e4e7",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "10px" }}>
            <input
              autoFocus
              placeholder="Search country…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #e4e4e7",
                background: "#fafafa",
                color: "#18181b",
                fontFamily: "inherit",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                  setSearch("");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "9px 14px",
                  background: selected?.code === c.code ? "#f4f4f5" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "13px",
                  color: "#18181b",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f4f4f5")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    selected?.code === c.code ? "#f4f4f5" : "transparent")
                }
              >
                <span style={{ fontSize: "18px" }}>{c.flag}</span>
                <span style={{ flex: 1 }}>{c.name}</span>
                <span style={{ opacity: 0.5, fontSize: "12px" }}>{c.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export interface CustomPhoneInputProps {
  value?: string;
  onChange?: (phone: string) => void;
  validationClass?: boolean;
  className?: string;
  radius?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultDialCode?: string;
}

const CustomPhoneInput = React.memo(({
  value,
  onChange,
  validationClass = false,
  className = "",
  radius = "12px",
  disabled = false,
  placeholder,
  defaultDialCode = "+20",
}: CustomPhoneInputProps) => {
  
  // دمج القيمة الأولية لتحديد الدولة
  const initialParsed = parsePhone(value || defaultDialCode);
  const [country, setCountry] = useState<CountryData>(
    initialParsed.country ?? DIAL_CODE_MAP.get(defaultDialCode) ?? COUNTRIES[0]
  );
  
  const [inputValue, setInputValue] = useState(
    value ? formatNational(initialParsed.nationalNumber, country.phoneMask) : ""
  );
  
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // تحديث المكون إذا تغير الـ value من الخارج (Controlled Component)
  useEffect(() => {
    if (value !== undefined) {
      const parsed = parsePhone(value);
      if (parsed.country && parsed.country.code !== country.code) {
        setCountry(parsed.country);
      }
      const newFormatted = formatNational(parsed.nationalNumber, parsed.country?.phoneMask || country.phoneMask);
      if (newFormatted !== inputValue) {
        setInputValue(newFormatted);
      }
    }
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      if (val.startsWith("+")) {
        const detected = detectCountryFromDialCode(val);
        if (detected) {
          setCountry(detected);
          const national = val.slice(detected.dialCode.length).replace(/\D/g, "");
          val = formatNational(national, detected.phoneMask);
          setInputValue(val);
          onChange?.(detected.dialCode + national);
          return;
        }
      }

      const raw = val.replace(/\D/g, "");
      const formatted = formatNational(raw, country.phoneMask);
      setInputValue(formatted);
      onChange?.(country.dialCode + raw); // نرجع الرقم الكامل مثل القديم (ex: +201012345678)
    },
    [country, onChange]
  );

  const handleCountryChange = (c: CountryData) => {
    setCountry(c);
    const raw = inputValue.replace(/\D/g, "");
    const formatted = formatNational(raw, c.phoneMask);
    setInputValue(formatted);
    onChange?.(c.dialCode + raw);
    inputRef.current?.focus();
  };

  const digits = inputValue.replace(/\D/g, "");
  const result = parsePhone(country.dialCode + digits);
  
  // دمج الـ validationClass الخارجي مع التحقق الداخلي
  const isInvalid = validationClass || (touched && !focused && digits.length > 0 && !result.isValid);

  return (
    <div
      className={`flex items-stretch overflow-hidden bg-[#F4F4F4] border transition-colors duration-200 ${
        isInvalid ? "border-red-500" : focused ? "border-blue-400" : "border-[#E0E0E0]"
      } ${className}`}
      style={{
        borderRadius: radius,
        // إزالة height الثابت من هنا ليأخذ الـ className (h-9 مثلاً) دوره
        minHeight: "36px", 
        width: "100%",
      }}
    >
      <CountryPicker 
        selected={country} 
        onChange={handleCountryChange} 
        radius={radius}
        disabled={disabled} 
      />

      <input
        ref={inputRef}
        type="tel"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
        disabled={disabled}
        placeholder={placeholder ?? `e.g. ${country.example.mobile}`}
        className="w-full bg-transparent border-none outline-none text-[#3f3f46]"
        style={{
          padding: "0 16px",
          fontSize: "15px",
          letterSpacing: "1px",
          opacity: disabled ? 0.6 : 1,
        }}
      />
    </div>
  );
});

CustomPhoneInput.displayName = "CustomPhoneInput";
export default CustomPhoneInput;