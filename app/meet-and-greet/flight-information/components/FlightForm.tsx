// "use client";
// import SearchWithDropdown, {
//   OptionType,
// } from "@/components/custom inputs/search";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAirlines } from "@/lib/hooks/useAirlines";
// import { useState } from "react";

// interface StepsProps {
//   onFocus?: () => void;
// }

// const FlightForm = ({ onFocus }: StepsProps) => {
//   const [selectedAirport, setSelectedAirport] = useState<string>("");

//   const { data, isLoading, isError, error } = useAirlines();

//   if (isError) {
//     console.error("Error fetching airports:", error);
//   }

//   // Convert airports to options format
//   const airlineOptions: OptionType[] =
//     data?.data.airlines.map((airline) => ({
//       label: `${airline.airline_name} (${airline.country?.country_name})`,
//       value: airline.airline_id?.toString(),
//     })) || [];

//   const handleAirlineSelect = (option: OptionType) => {
//     setSelectedAirport(option.value);
//     console.log("Selected airport:", option);
//   };

//   return (
//     <div
//       onClick={() => {
//         onFocus?.();
//       }}
//       className="px-10 py-6 bg-white rounded-2xl"
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Flight Information
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

//       <div className="mt-4 space-y-6 grid grid-cols-2 grid-rows-2 gap-x-6 w-full">
//         {/* Airline */}
//         <div className=" space-y-2">
//           <Label htmlFor="Airline">Airline</Label>
//           <SearchWithDropdown
//             name="airline"
//             disabled={isLoading}
//             options={airlineOptions}
//             onSelect={handleAirlineSelect}
//             showRecentSearches={false}
//             className="h-9 rounded-md"
//             inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             id="Airline"
//             placeholder={isLoading ? "Loading airports..." : "Choose Airline"}
//           />
//         </div>

//         {/* Flight Number */}
//         <div className="space-y-2">
//           <Label htmlFor="flightNumber">Flight Number</Label>
//           <Input
//             id="flightNumber"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             placeholder="BA 777"
//           />
//         </div>

//         {/* Arrival Time */}
//         <div className="space-y-2">
//           <Label htmlFor="arrivalTime">Arrival Time</Label>
//           <Input
//             id="arrivalTime"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             type="time"
//             placeholder="Choose Arrival Time"
//           />
//         </div>

//         {/* Service Duration */}
//         <div className="space-y-2">
//           <Label htmlFor="duration">Service Duration</Label>
//           <Input
//             id="duration"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>

//         {/* Fast Track Checkbox */}
//         <div className="flex items-start col-span-2 gap-3">
//           <Checkbox
//             id="fastTrack"
//             className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
//           />
//           <Label
//             htmlFor="fastTrack"
//             className="font-medium leading-relaxed cursor-pointer"
//           >
//             Include Fast Track Service <span>(+£25.00, Per PAX)</span>
//           </Label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlightForm;
"use client";

import { useEffect, useState } from "react";
import SearchWithDropdown, {
  OptionType,
} from "@/components/custom inputs/search";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAirlines } from "@/lib/hooks/useAirlines";

interface StepsProps {
  onFocus?: () => void;
}

const STORAGE_KEY = "flightInfo";

export interface FlightInfo {
  airline_id?: string;
  airline_name?: string;
  flight_number?: string;
  arrival_time?: string;
  service_duration?: string;
  fast_track_enabled?: boolean;
}

const FlightForm = ({ onFocus }: StepsProps) => {
  const { data, isLoading, isError, error } = useAirlines();
console.log(data);

  const [flightInfo, setFlightInfo] = useState<FlightInfo>({
    fast_track_enabled: false,
  });

  // Load from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFlightInfo(JSON.parse(stored));
    }
  }, []);

  // Save to session storage
  const updateSession = (updated: Partial<FlightInfo>) => {
    const newData = { ...flightInfo, ...updated };
    setFlightInfo(newData);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  if (isError) {
    console.error("Error fetching airlines:", error);
  }

  // Convert airlines to options
  const airlineOptions: OptionType[] =
    data?.data.airlines.map((airline) => ({
      label: `${airline.airline_name} (${airline.airline_code})`,
      value: airline.airline_id?.toString(),
    })) || [];

  const handleAirlineSelect = (option: OptionType) => {
    updateSession({
      airline_id: option.value!,
      airline_name: option.label!,
    });
  };

  return (
    <div
      onClick={() => onFocus?.()}
      className="px-10 py-6 bg-white rounded-2xl"
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
    >
      <h4 className="font-manrope font-medium text-[18.75px]">
        Flight Information
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
        {/* Airline */}
        <div className="space-y-2">
          <Label>Airline</Label>
          <SearchWithDropdown
            disabled={isLoading}
            options={airlineOptions}
            onSelect={handleAirlineSelect}
            showRecentSearches={false}
            placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
            className="h-9 rounded-md"
            inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            value={
              flightInfo.airline_id
                ? {
                    value: flightInfo.airline_id,
                    label: flightInfo.airline_name!,
                  }
                : undefined
            }
          />
        </div>

        {/* Flight Number */}
        <div className="space-y-2">
          <Label>Flight Number</Label>
          <Input
            maxLength={255}
            placeholder="BA 777"
            className="bg-[#F4F4F4]"
            value={flightInfo.flight_number || ""}
            onChange={(e) => updateSession({ flight_number: e.target.value })}
          />
        </div>

        {/* Arrival Time */}
        <div className="space-y-2">
          <Label>Arrival Time</Label>
          <Input
            type="time"
            className="bg-[#F4F4F4]"
            value={flightInfo.arrival_time || ""}
            onChange={(e) => updateSession({ arrival_time: e.target.value })}
          />
        </div>

        {/* Service Duration */}
        <div className="space-y-2">
          <Label>Service Duration</Label>
          <Input
          type="number"
            placeholder="e.g. 2 hours"
            className="bg-[#F4F4F4]"
            value={flightInfo.service_duration || ""}
            onChange={(e) =>
              updateSession({ service_duration: e.target.value })
            }
          />
        </div>

        {/* Fast Track Checkbox */}
        <div className="flex items-start col-span-2 gap-3">
          <Checkbox
            checked={!!flightInfo.fast_track_enabled}
            onCheckedChange={(checked) =>
              updateSession({ fast_track_enabled: Boolean(checked) })
            }
            id="fastTrack"
            className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
          />
          <Label
            htmlFor="fastTrack"
            className="font-medium leading-relaxed cursor-pointer"
          >
            Include Fast Track Service <span>(+£25.00, Per PAX)</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default FlightForm;
