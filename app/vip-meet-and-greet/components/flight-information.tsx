// import SearchWithDropdown, {
//   OptionType,
// } from "@/components/custom inputs/search";
// import SelectDropdown from "@/components/custom inputs/SelectList";
// import TimePickerInput from "@/components/custom inputs/TimePicker";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAirlines } from "@/lib/hooks/useAirlines";
// import { useState } from "react";

// interface StepsProps {
//   onFocus?: () => void;

//   // onUpdate: (path: string, valkue: any) => void;
//   fastTrackCost: number | "not_active";
// }

// const FlightForm = ({ onFocus, fastTrackCost,  }: StepsProps) => {
//   const { data, isLoading, isError, error } = useAirlines();

//   // Convert airlines to options
//   const airlineOptions: OptionType[] =
//     data?.data.airlines.map((airline) => ({
//       label: `${airline.airline_name} (${airline.airline_code})`,
//       value: airline.airline_id?.toString(),
//     })) || [];

//   const handleAirlineSelect = (e: OptionType) => {
//     // onUpdate("flight[airline_id]", e.value);
//   };
//   return (
//     <div
//       onClick={() => onFocus?.()}
//       className="px-10 py-6 bg-white rounded-2xl"
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//     >
//       <h4 className="font-manrope font-medium text-[18.75px]">
//         Flight Information
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
//         {/* Airline */}
//         <div className="space-y-2">
//           <Label>Airline</Label>
//           <SearchWithDropdown
//             disabled={isLoading}
//             options={airlineOptions}
//             onSelect={handleAirlineSelect}
//             showRecentSearches={false}
//             placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
//             className="h-9 rounded-md"
//             inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         {/* Flight Number */}
//         <div className="space-y-2">
//           <Label>Flight Number</Label>
//           <Input
//             maxLength={9}
//             placeholder="BA 777"
//             className="bg-[#F4F4F4]"
//           />
//         </div>

//         <TimeRow />

//         {/* Fast Track Checkbox */}
//         {fastTrackCost !== "not_active" && (
//           <div className="flex items-start col-span-2 gap-3">
//             <Checkbox
//               id="fastTrack"
//               className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
//             />

//             <Label
//               htmlFor="fastTrack"
//               className="font-medium leading-relaxed cursor-pointer"
//             >
//               Include Fast Track Service{" "}
//               <span>(+£{fastTrackCost}, Per PAX)</span>
//             </Label>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlightForm;

// const TimeRow = () => {
//   const [sercivesDurationOptions, setSercivesDurationOptions] = useState<
//     OptionType[]
//   >([
//     {
//       label: "06:20 PM (120 mins)",
//       value: "2",
//     },
//   ]);

//   const [pickUp, setPickUp] = useState<OptionType | null>(null);

//   const buildServiceDuration = (
//     hour: number,
//     minute: number,
//     period?: "AM" | "PM",
//   ) => {
//     const options = [];
//     const baseDate = new Date();

//     // نحول الوقت لـ 24h system
//     let adjustedHour = hour;

//     if (period === "PM" && hour !== 12) {
//       adjustedHour += 12;
//     }
//     if (period === "AM" && hour === 12) {
//       adjustedHour = 0;
//     }

//     baseDate.setHours(adjustedHour, minute, 0, 0);

//     // نبدأ من ساعتين زي المثال (2 → 5)
//     for (let i = 2; i <= 6; i++) {
//       const newDate = new Date(baseDate);
//       newDate.setMinutes(newDate.getMinutes() + i * 60);

//       const formattedTime = newDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });

//       options.push({
//         label: `${formattedTime} (${i * 60} mins)`,
//         value: i.toString(),
//       });
//     }
//     console.log(options);
//     setSercivesDurationOptions(options);
//     return options;
//   };

//   return (
//     <>
//       {/* Arrival Time */}
//       <div className="space-y-2">
//         <Label>Arrival Time</Label>
//         <TimePickerInput
//           onSelect={buildServiceDuration}
//           className="bg-[#F4F4F4] border-none shadow-none rounded-lg"
//           inputClassName="px-10 h-9 bg-[#F4F4F4] w-full rounded-lg"
//         />
//       </div>

//       {/* Service Duration */}
//       <div className="space-y-2">
//         <Label>Service Duration</Label>

//         <SelectDropdown
//           disabled={sercivesDurationOptions.length === 1}
//           inputClassName="bg-[#F4F4F4] focus-visible:border focus-visible:outline"
//           className=""
//           placeholder="e.g. 2 hours"
//           options={sercivesDurationOptions}
//           value={pickUp}
//           onSelect={setPickUp}
//         />
//       </div>
//     </>
//   );
// };
import React, {
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
import { isValid } from "date-fns";

interface StepsProps {
  onFocus?: () => void;
  fastTrackCost: number | "not_active";
}

export type FlightFormHandle = {
  isValid: () => boolean;
};

const FlightForm = forwardRef<FlightFormHandle, StepsProps>(
  ({ onFocus, fastTrackCost }, ref) => {
    const isFirstRender = useRef(true);

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
    }));

    // useEffect(() => {
    //   if (isFirstRender.current) {
    //     isFirstRender.current = false; //prevent first run
    //     return;
    //   }
    //   validateInputs();
    // }, [selectedAirline, flightNumber, arrivalTime, serviceDuration]);

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

        options.push({
          label: `${formattedTime} (${i * 60} mins)`,
          value: i.toString(),
        });
      }
      return options;
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
            onServiceChange={setServiceDuration}
            buildServiceDuration={buildServiceDuration}
            validationErrors={validationErrors}
          />

          {/* Fast Track */}
          {fastTrackCost !== "not_active" && (
            <div className="flex items-start col-span-2 gap-3">
              <Checkbox
                id="fastTrack"
                checked={fastTrackChecked}
                onCheckedChange={(val) => setFastTrackChecked(!!val)}
                className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
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
  onServiceChange: (val: OptionType) => void;
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
  onServiceChange,
  buildServiceDuration,
  validationErrors,
}: TimeRowProps) => {
  const [arrival, setArrival] = useState<OptionType | null>(null);
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
    onServiceChange(options[0]);
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
            onServiceChange(val);
          }}
        />
      </div>
    </>
  );
};
