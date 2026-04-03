// import { useState } from "react";
// import { OptionType } from "@/components/custom inputs/search";
// import TimePickerInput from "@/components/custom inputs/TimePicker";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFlightFormStore } from "@/store/useFlightFormStore";
// import { useServiceStore, useSingleAirportStore } from "@/store/vipInputsStore";
// import ServiceDurationInput from "../ServiceDurationInput";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useCurrencyStore } from "@/store/currencyStore";
// import AirlineSearchInput from "@/components/custom inputs/AirlineSearchInput";

// interface StepsProps {
//   onFocus?: () => void;
// }

// interface validationErrors {
//   airline?: boolean;
//   flightNumber?: boolean;
//   arrivalTime?: boolean;
//   serviceDuration?: boolean;
// }

// export type FlightFormData = {
//   selectedAirline: OptionType | null;
//   flightNumber: string;
//   arrivalTime: OptionType | null;
//   serviceDuration: OptionType | null;
//   fastTrackChecked: boolean;
// };
// const FlightForm = ({ onFocus }: StepsProps) => {
//   const selectedAirline = useFlightFormStore((state) => state.airline);
//   const flightNumber = useFlightFormStore((state) => state.flightNumber);
//   const fastTrackActive = useSingleAirportStore(
//     (state) => state.singleAirport?.is_fast_track_active,
//   );
//   const serviceType = useServiceStore((state) => state.serviceType);
//   const setSelectedAirline = useFlightFormStore((state) => state.setAirline);
//   const setFlightNumber = useFlightFormStore((state) => state.setFlightNumber);
//   const setServiceDuration = useFlightFormStore(
//     (state) => state.setServiceDuration,
//   );
//   const [validationErrors, setValidationErrors] = useState<validationErrors>(
//     {},
//   );
  
//   return (
//     <div
//       onClick={() => onFocus?.()}
//       className="px-10 py-6 bg-white rounded-2xl"
//       style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
//     >
//       <h4 className="font-manrope font-medium text-[18.75px]">
//         Flight Information
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
//         <div className="space-y-2">
//           <Label className={validationErrors.airline ? "text-red-500" : ""}>
//             {serviceType === "connection" && "Arrival"} Airline{" "}
//             {validationErrors?.airline && "*"}
//           </Label>
//           <AirlineSearchInput
//             label="Airline"
//             value={selectedAirline}
//             placeholder="Search airline…"
//             onSelect={(airline) => {
//               console.log(airline);
//               setSelectedAirline(airline);
//             }}
//             // error={errors?.airline}
//           />
//         </div>

//         {/* Flight Number */}
//         <FlightNumberInput
//           disabled={selectedAirline === null}
//           airline={selectedAirline?.airline_code ?? ""}
//           validationErrors={validationErrors}
//           className={`bg-[#F4F4F4] ${
//             validationErrors.flightNumber ? "border-red-500 border" : ""
//           }`}
//           value={flightNumber ?? ""}
//           onChange={setFlightNumber}
//         />
//         <TimeRow
//           onServiceDurationChange={(d) => {
//             setServiceDuration(d);
//           }}
//           validationErrors={validationErrors}
//         />

//         {/* Fast Track */}
//         {fastTrackActive && <FastTrackCheckBox />}
//       </div>
//     </div>
//   );
// };

// // FlightForm.displayName = "FlightForm";
// export default FlightForm;

// const FastTrackCheckBox = () => {
//   const fastTrackCost = useSingleAirportStore(
//     (state) => state.singleAirport?.fast_track_cost,
//   );

//   const fastTrackChecked = useFlightFormStore((state) => state.fastTrack);
//   const checkfastTrack = useFlightFormStore((state) => state.setFastTrack);
//   const currencyMark = useCurrencyStore((state) => state.currencyMark);
//   const handleCheck = (checked: boolean | "indeterminate") => {
//     checkfastTrack(checked === true);
//   };

//   return (
//     <div className="flex items-start col-span-2 gap-3">
//       <Checkbox
//         id="fastTrack"
//         checked={fastTrackChecked}
//         onCheckedChange={handleCheck}
//         className="w-6 h-6 rounded-md shadow-xs bg-[#F4F4F4] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
//       />

//       <Label
//         htmlFor="fastTrack"
//         className="font-medium leading-relaxed cursor-pointer"
//       >
//         Include Fast Track Service{" "}
//         <span>
//           (+{currencyMark} {fastTrackCost}, Per PAX)
//         </span>
//       </Label>
//     </div>
//   );
// };

// interface TimeRowProps {
//   onDepartureChange?: (val: OptionType) => void;
//   onServiceDurationChange: (val: OptionType) => void;
//   validationErrors?: {
//     arrivalTime?: boolean;
//     serviceDuration?: boolean;
//   };
// }

// const TimeRow = ({ validationErrors }: TimeRowProps) => {
//   const serviceType = useServiceStore((state) => state.serviceType);
//   const setArrivalTime = useFlightFormStore((state) => state.setArrivalTime);
//   const arrivalTime = useFlightFormStore((state) => state.arrivalTime);

//   const handleTimeSelect = (hour: number, minute: number) => {
//     setArrivalTime({
//       label: `${hour}:${String(minute).padStart(2, "0")}`,
//       value: `${hour}:${String(minute).padStart(2, "0")}`,
//     });
//   };
//   console.log(arrivalTime);

//   return (
//     <>
//       {/* Arrival Time */}
//       <div className="space-y-2">
//         <Label
//           className={`capitalize ${validationErrors?.arrivalTime ? "text-red-500" : ""}`}
//         >
//           {serviceType} Time
//           {validationErrors?.arrivalTime && "*"}
//         </Label>
//         <TimePickerInput
//           value={arrivalTime?.value}
//           onSelect={handleTimeSelect}
//           className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
//           inputClassName={`px-10 h-9 bg-[#F4F4F4] w-full rounded-lg ${
//             validationErrors?.arrivalTime ? "border-red-500 border" : ""
//           }`}
//         />
//       </div>
//       <ServiceDurationInput />
//     </>
//   );
// };

// interface Props {
//   value: string;
//   onChange: (value: string) => void;
//   className?: string;
//   validationErrors: validationErrors;
//   airline: string;
//   disabled?: boolean;
//   withoutLabel?: boolean;
//   label?: string; // ← أضف دي
// }
// export function FlightNumberInput({
//   validationErrors,
//   value,
//   onChange,
//   airline,
//   withoutLabel,
//   disabled,
//   label = "Flight Number",
//   className = "",
// }: Props) {
//   const airlinePrefix = airline?.slice(0, 2).toUpperCase() || "";

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // خد بس الأرقام اللي يدخلها المستخدم
//     let input = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);

//     // دمج مع الـ airline prefix
//     const formatted = `${airlinePrefix} ${input}`;

//     onChange(formatted);
//   };
//   return (
//     <div className="space-y-2">
//       {withoutLabel ? null : (
//         <Label className={validationErrors.flightNumber ? "text-red-500" : ""}>
//           {label} {validationErrors?.flightNumber && "*"}
//         </Label>
//       )}
//       <Input
//         disabled={disabled}
//         type="text"
//         value={value}
//         onChange={handleChange}
//         placeholder={`${airlinePrefix || "EX"} 1234`}
//         maxLength={7} // 2 letters + space + 4 numbers
//         className={`bg-[#F4F4F4] ${className}`}
//       />
//     </div>
//   );
// }
