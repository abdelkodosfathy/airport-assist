// import { forwardRef, useImperativeHandle, useRef, useState } from "react";
// import SearchWithDropdown, {
//   OptionType,
// } from "@/components/custom inputs/search";
// import SelectDropdown from "@/components/custom inputs/SelectList";
// import TimePickerInput from "@/components/custom inputs/TimePicker";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAirlines } from "@/lib/hooks/useAirlines";

// interface StepsProps {
//   onFocus?: () => void;
//   fastTrackCost: number | "not_active";
// }

// export type FlightFormHandle = {
//   isValid: () => boolean;
// };

// const FlightForm = forwardRef<FlightFormHandle, StepsProps>(
//   ({ onFocus, fastTrackCost }, ref) => {

//     const { data, isLoading } = useAirlines();

//     const airlineOptions: OptionType[] =
//       data?.data.airlines.map((airline) => ({
//         label: `${airline.airline_name} (${airline.airline_code})`,
//         value: airline.airline_id?.toString(),
//       })) || [];

//     const [selectedAirline, setSelectedAirline] = useState<OptionType | null>(
//       null,
//     );
//     const [flightNumber, setFlightNumber] = useState("");
//     const [arrivalTime, setArrivalTime] = useState<OptionType | null>(null);
//     const [serviceDuration, setServiceDuration] = useState<OptionType | null>(
//       null,
//     );
//     const [fastTrackChecked, setFastTrackChecked] = useState(false);

//     // Track validation errors
//     const [validationErrors, setValidationErrors] = useState<{
//       airline?: boolean;
//       flightNumber?: boolean;
//       arrivalTime?: boolean;
//       serviceDuration?: boolean;
//     }>({});

//     const validateInputs = () => {
//       const errors: typeof validationErrors = {};

//       if (!selectedAirline) errors.airline = true;
//       if (!flightNumber.trim()) errors.flightNumber = true;
//       if (!arrivalTime) errors.arrivalTime = true;
//       if (!serviceDuration) errors.serviceDuration = true;

//       setValidationErrors(errors);

//       return Object.keys(errors).length === 0;
//     };
//     useImperativeHandle(ref, () => ({
//       isValid: () => {
//         // If any error exists, form is invalid
//         return validateInputs();
//       },

//       getData: () => {
//         return {
//           selectedAirline,
//           flightNumber,
//           arrivalTime,
//           serviceDuration,
//           fastTrackChecked,
//         };
//       },
//     }));

//     const buildServiceDuration = (
//       hour: number,
//       minute: number,
//       period?: "AM" | "PM",
//     ) => {
//       const options: OptionType[] = [];
//       const baseDate = new Date();
//       let adjustedHour = hour;

//       if (period === "PM" && hour !== 12) adjustedHour += 12;
//       if (period === "AM" && hour === 12) adjustedHour = 0;

//       baseDate.setHours(adjustedHour, minute, 0, 0);

//       for (let i = 2; i <= 6; i++) {
//         const newDate = new Date(baseDate);
//         newDate.setMinutes(newDate.getMinutes() + i * 60);

//         const formattedTime = newDate.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });

//         options.push({
//           label: `${formattedTime} (${i * 60} mins)`,
//           value: i.toString(),
//         });
//       }
//       return options;
//     };

//     return (
//       <div
//         onClick={() => onFocus?.()}
//         className="px-10 py-6 bg-white rounded-2xl"
//         style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
//       >
//         <h4 className="font-manrope font-medium text-[18.75px]">
//           Flight Information
//         </h4>
//         <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//         <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
//           {/* Airline */}
//           <div className="space-y-2">
//             <Label className={validationErrors.airline ? "text-red-500" : ""}>
//               Airline {validationErrors?.airline && "*"}
//             </Label>
//             <SearchWithDropdown
//               disabled={isLoading}
//               options={airlineOptions}
//               onSelect={setSelectedAirline}
//               showRecentSearches={false}
//               placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
//               className="h-9 rounded-md"
//               inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
//                 validationErrors.airline ? "border-red-500" : "border-[#E0E0E0]"
//               }`}
//             />
//           </div>

//           {/* Flight Number */}
//           <div className="space-y-2">
//             <Label
//               className={validationErrors.flightNumber ? "text-red-500" : ""}
//             >
//               Flight Number {validationErrors?.flightNumber && "*"}
//             </Label>
//             <Input
//               value={flightNumber}
//               onChange={(e) => setFlightNumber(e.target.value)}
//               maxLength={9}
//               placeholder="BA 777"
//               className={`bg-[#F4F4F4] ${
//                 validationErrors.flightNumber ? "border-red-500 border" : ""
//               }`}
//             />
//           </div>

//           <TimeRow
//             onArrivalChange={setArrivalTime}
//             onServiceDurationChange={setServiceDuration}
//             buildServiceDuration={buildServiceDuration}
//             validationErrors={validationErrors}
//           />

//           {/* Fast Track */}
//           {fastTrackCost !== "not_active" && (
//             <div className="flex items-start col-span-2 gap-3">
//               <Checkbox
//                 id="fastTrack"
//                 checked={fastTrackChecked}
//                 onCheckedChange={(val) => setFastTrackChecked(!!val)}
//                 className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
//               />
//               <Label
//                 htmlFor="fastTrack"
//                 className="font-medium leading-relaxed cursor-pointer"
//               >
//                 Include Fast Track Service{" "}
//                 <span>(+£{fastTrackCost}, Per PAX)</span>
//               </Label>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   },
// );

// FlightForm.displayName = "FlightForm";
// export default FlightForm;

// interface TimeRowProps {
//   onArrivalChange: (val: OptionType) => void;
//   onServiceDurationChange: (val: OptionType) => void;
//   buildServiceDuration: (
//     hour: number,
//     minute: number,
//     period?: "AM" | "PM",
//   ) => OptionType[];
//   validationErrors?: {
//     arrivalTime?: boolean;
//     serviceDuration?: boolean;
//   };
// }

// const TimeRow = ({
//   onArrivalChange,
//   onServiceDurationChange,
//   buildServiceDuration,
//   validationErrors,
// }: TimeRowProps) => {
//   const [arrival, setArrival] = useState<OptionType | null>(null);
//   const [serviceOptions, setServiceOptions] = useState<OptionType[]>([
//     { label: "06:20 PM (120 mins)", value: "2" },
//   ]);
//   const [serviceDuration, setServiceDuration] = useState<OptionType | null>(
//     null,
//   );

//   const handleTimeSelect = (
//     hour: number,
//     minute: number,
//     period?: "AM" | "PM",
//   ) => {
//     const options = buildServiceDuration(hour, minute, period);
//     setServiceOptions(options);
//     setServiceDuration(options[0]);
//     onArrivalChange({
//       label: `${hour}:${minute} ${period}`,
//       value: `${hour}:${minute}`,
//     });
//     onServiceDurationChange(options[0]);
//   };

//   return (
//     <>
//       {/* Arrival Time */}
//       <div className="space-y-2">
//         <Label className={validationErrors?.arrivalTime ? "text-red-500" : ""}>
//           Arrival Time {validationErrors?.arrivalTime && "*"}
//         </Label>
//         <TimePickerInput
//           onSelect={handleTimeSelect}
//           className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
//           inputClassName={`px-10 h-9 bg-[#F4F4F4] w-full rounded-lg ${
//             validationErrors?.arrivalTime ? "border-red-500 border" : ""
//           }`}
//         />
//       </div>

//       {/* Service Duration */}
//       <div className="space-y-2">
//         <Label
//           className={validationErrors?.serviceDuration ? "text-red-500" : ""}
//         >
//           Service Duration {validationErrors?.serviceDuration && "*"}
//         </Label>
//         <SelectDropdown
//           disabled={serviceOptions.length === 1}
//           inputClassName={`bg-[#F4F4F4] focus-visible:border focus-visible:outline ${
//             validationErrors?.serviceDuration ? "border-red-500" : ""
//           }`}
//           placeholder="e.g. 2 hours"
//           options={serviceOptions}
//           value={serviceDuration}
//           onSelect={(val) => {
//             setServiceDuration(val);
//             onServiceDurationChange(val);
//           }}
//         />
//       </div>
//     </>
//   );
// };

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import SearchWithDropdown, {
  OptionType,
} from "@/components/custom inputs/search";
import SelectDropdown from "@/components/custom inputs/SelectList";
import TimePickerInput from "@/components/custom inputs/TimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAirlines } from "@/lib/hooks/useAirlines";

interface StepsProps {
  onFocus?: () => void;
  fastTrackCost: number | "not_active";
  hourCost: number;
  onEnableFastTrack: (status: boolean) => void;
  setDuration: (val: OptionType) => void;
}

export type FlightFormData = {
  selectedAirline: OptionType | null;
  flightNumber: string;
  arrivalTime: OptionType | null;
  serviceDuration: OptionType | null;
  fastTrackChecked: boolean;
};

export type FlightFormHandle = {
  isValid: () => boolean;
  getData: () => FlightFormData;
};

const FlightForm = forwardRef<FlightFormHandle, StepsProps>(
  (
    { onFocus, fastTrackCost, hourCost, setDuration, onEnableFastTrack },
    ref,
  ) => {
    const { data, isLoading } = useAirlines();

    const airlineOptions: OptionType[] =
      data?.data.airlines.map((airline) => ({
        label: `${airline.airline_name} (${airline.airline_code})`,
        value: airline.airline_id?.toString(),
      })) || [];

    const [selectedAirline, setSelectedAirline] = useState<OptionType | null>(
      null,
    );
    const [flightNumber, setFlightNumber] = useState("");
    const [arrivalTime, setArrivalTime] = useState<OptionType | null>(null);
    const [serviceDuration, setServiceDuration] = useState<OptionType | null>(
      null,
    );
    const [fastTrackChecked, setFastTrackChecked] = useState(false);

    // useEffect(() => {
    //   onEnableFastTrack(fastTrackChecked);
    // }, [fastTrackChecked]);
    // Track validation errors
    const [validationErrors, setValidationErrors] = useState<{
      airline?: boolean;
      flightNumber?: boolean;
      arrivalTime?: boolean;
      serviceDuration?: boolean;
    }>({});

    const validateInputs = () => {
      const errors: typeof validationErrors = {};

      if (!selectedAirline) errors.airline = true;
      if (!flightNumber.trim()) errors.flightNumber = true;
      if (!arrivalTime) errors.arrivalTime = true;
      if (!serviceDuration) errors.serviceDuration = true;

      setValidationErrors(errors);

      return Object.keys(errors).length === 0;
    };

    useImperativeHandle(ref, () => ({
      isValid: () => {
        // If any error exists, form is invalid
        return validateInputs();
      },

      getData: (): FlightFormData => {
        return {
          selectedAirline,
          flightNumber,
          arrivalTime,
          serviceDuration,
          fastTrackChecked,
        };
      },
    }));

    const buildServiceDuration = (
      hour: number,
      minute: number,
      period?: "AM" | "PM",
    ) => {
      const options: OptionType[] = [];
      const baseDate = new Date();
      let adjustedHour = hour;

      if (period === "PM" && hour !== 12) adjustedHour += 12;
      if (period === "AM" && hour === 12) adjustedHour = 0;

      baseDate.setHours(adjustedHour, minute, 0, 0);

      for (let i = 2; i <= 6; i++) {
        const newDate = new Date(baseDate);
        newDate.setMinutes(newDate.getMinutes() + i * 60);

        const formattedTime = newDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const extraHours = i - 2;
        const calculatedCost = hourCost ? hourCost * extraHours : 0;

        const label =
          extraHours === 0
            ? `${formattedTime} (${i * 60} mins)`
            : `${formattedTime} (${i * 60} mins) +${calculatedCost} USD`;

        options.push({
          label,
          value: i.toString(),
          cost: calculatedCost, // 👈 رجعنا الكوست هنا
        });
      }

      return options;
    };

    const handleChange = (val: boolean | "indeterminate") => {
      const checked = val === true;

      // 1️⃣ ده يحصل فورًا عشان الـ UI يتحدث
      setFastTrackChecked(checked);

      // 2️⃣ ده يتنفذ في الخلفية
      setTimeout(() => {
        onEnableFastTrack(checked);
      }, 0);
    };

    return (
      <div
        onClick={() => onFocus?.()}
        className="px-10 py-6 bg-white rounded-2xl"
        style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
      >
        <h4 className="font-manrope font-medium text-[18.75px]">
          Flight Information
        </h4>
        <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
          {/* Airline */}
          <div className="space-y-2">
            <Label className={validationErrors.airline ? "text-red-500" : ""}>
              Airline {validationErrors?.airline && "*"}
            </Label>
            <SearchWithDropdown
              disabled={isLoading}
              options={airlineOptions}
              onSelect={setSelectedAirline}
              showRecentSearches={false}
              placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
              className="h-9 rounded-md"
              inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
                validationErrors.airline ? "border-red-500" : "border-[#E0E0E0]"
              }`}
            />
          </div>

          {/* Flight Number */}
          <div className="space-y-2">
            <Label
              className={validationErrors.flightNumber ? "text-red-500" : ""}
            >
              Flight Number {validationErrors?.flightNumber && "*"}
            </Label>
            <Input
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              maxLength={9}
              placeholder="BA 777"
              className={`bg-[#F4F4F4] ${
                validationErrors.flightNumber ? "border-red-500 border" : ""
              }`}
            />
          </div>

          <TimeRow
            onArrivalChange={setArrivalTime}
            onServiceDurationChange={(d) => {
              setServiceDuration(d);
              setDuration(d);
            }}
            buildServiceDuration={buildServiceDuration}
            validationErrors={validationErrors}
          />

          {/* Fast Track */}
          {fastTrackCost !== "not_active" && (
            <div className="flex items-start col-span-2 gap-3">
              <Checkbox
                id="fastTrack"
                checked={fastTrackChecked}
                onCheckedChange={handleChange}
                className="w-6 h-6 rounded-md shadow-xs bg-[#F4F4F4] data-[state=checked]:bg-[#7B5A41] data-[state=checked]:border-[#7B5A41]"
              />

              <Label
                htmlFor="fastTrack"
                className="font-medium leading-relaxed cursor-pointer"
              >
                Include Fast Track Service{" "}
                <span>(+£{fastTrackCost}, Per PAX)</span>
              </Label>
            </div>
          )}
        </div>
      </div>
    );
  },
);

FlightForm.displayName = "FlightForm";
export default FlightForm;

interface TimeRowProps {
  onArrivalChange: (val: OptionType) => void;
  onServiceDurationChange: (val: OptionType) => void;
  buildServiceDuration: (
    hour: number,
    minute: number,
    period?: "AM" | "PM",
  ) => OptionType[];
  validationErrors?: {
    arrivalTime?: boolean;
    serviceDuration?: boolean;
  };
}

const TimeRow = ({
  onArrivalChange,
  onServiceDurationChange,
  buildServiceDuration,
  validationErrors,
}: TimeRowProps) => {
  // const [arrival, setArrival] = useState<OptionType | null>(null);
  const [serviceOptions, setServiceOptions] = useState<OptionType[]>([
    { label: "06:20 PM (120 mins)", value: "2" },
  ]);
  const [serviceDuration, setServiceDuration] = useState<OptionType | null>(
    null,
  );

  const handleTimeSelect = (
    hour: number,
    minute: number,
    period?: "AM" | "PM",
  ) => {
    const options = buildServiceDuration(hour, minute, period);
    setServiceOptions(options);
    setServiceDuration(options[0]);
    onArrivalChange({
      label: `${hour}:${minute} ${period}`,
      value: `${hour}:${minute}`,
    });
    onServiceDurationChange(options[0]);
  };

  return (
    <>
      {/* Arrival Time */}
      <div className="space-y-2">
        <Label className={validationErrors?.arrivalTime ? "text-red-500" : ""}>
          Arrival Time {validationErrors?.arrivalTime && "*"}
        </Label>
        <TimePickerInput
          onSelect={handleTimeSelect}
          className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
          inputClassName={`px-10 h-9 bg-[#F4F4F4] w-full rounded-lg ${
            validationErrors?.arrivalTime ? "border-red-500 border" : ""
          }`}
        />
      </div>

      {/* Service Duration */}
      <div className="space-y-2">
        <Label
          className={validationErrors?.serviceDuration ? "text-red-500" : ""}
        >
          Service Duration {validationErrors?.serviceDuration && "*"}
        </Label>
        <SelectDropdown
          disabled={serviceOptions.length === 1}
          inputClassName={`bg-[#F4F4F4] focus-visible:border focus-visible:outline ${
            validationErrors?.serviceDuration ? "border-red-500" : ""
          }`}
          placeholder="e.g. 2 hours"
          options={serviceOptions}
          value={serviceDuration}
          onSelect={(val) => {
            setServiceDuration(val);
            onServiceDurationChange(val);
          }}
        />
      </div>
    </>
  );
};
