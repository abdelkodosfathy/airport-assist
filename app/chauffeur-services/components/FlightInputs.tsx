// import { FlightNumberInput } from "@/app/vip-meet-and-greet/components/flight-information";
// import SearchWithDropdown, {
//   OptionType,
// } from "@/components/custom inputs/search";
// import { useAirlines } from "@/lib/hooks/useAirlines";
// import { useTripErrors } from "@/store/tripErrorsStore";
// import { useFlightStore } from "@/store/useFlightStore";

// const FlightInputs = () => {
//   const validationErrors = {
//     airline: false,
//     flightNumber: false,
//     arrivalTime: false,
//     serviceDuration: false,
//   };

//   const { errors, clearError } = useTripErrors();

//   const { data, isLoading } = useAirlines();

//   const selectedAirline = useFlightStore((state) => state.airline);
//   const setSelectedAirline = useFlightStore((state) => state.setAirline);

//   const flightNumber = useFlightStore((state) => state.flightNumber);
//   const setFlightNumber = useFlightStore((state) => state.setFlightNumber);

//   const airlineOptions: OptionType[] =
//     data?.data.airlines.map((airline) => ({
//       label: `${airline.airline_name} (${airline.airline_code})`,
//       value: airline.airline_id?.toString(),
//     })) || [];

//   return (
//     <>
//       <SearchWithDropdown
//         disabled={isLoading}
//         options={airlineOptions}
//         onSelect={setSelectedAirline}
//         showRecentSearches={false}
//         placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
//         className="h-11.25 rounded-md"
//         inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
//           validationErrors.airline ? "border-red-500" : "border-[#E0E0E0]"
//         }`}
//       />

//       <FlightNumberInput
//         withoutLabel
//         disabled={selectedAirline === null}
//         airline={selectedAirline?.label ?? ""}
//         validationErrors={validationErrors}
//         className={`bg-[#F4F4F4] h-11.25 ${
//           validationErrors.flightNumber ? "border-red-500 border" : ""
//         }`}
//         value={flightNumber || ""}
//         onChange={setFlightNumber}
//       />
//     </>
//   );
// };

// export default FlightInputs;

import { FlightNumberInput } from "@/app/vip-meet-and-greet/components/FlightForm/flight-number-input";
import SearchWithDropdown, {
  OptionType,
} from "@/components/custom inputs/search";
import { useAirlines } from "@/lib/hooks/useAirlines";
import { useTripErrors } from "@/store/tripErrorsStore";
import { useFlightStore } from "@/store/useFlightStore";

const FlightInputs = () => {
  const { errors, clearError } = useTripErrors();

  const { data, isLoading } = useAirlines();

  const selectedAirline = useFlightStore((state) => state.airline);
  const setSelectedAirline = useFlightStore((state) => state.setAirline);

  const flightNumber = useFlightStore((state) => state.flightNumber);
  const setFlightNumber = useFlightStore((state) => state.setFlightNumber);

  const airlineOptions: OptionType[] =
    data?.data.airlines.map((airline) => ({
      label: `${airline.airline_name} (${airline.airline_code})`,
      value: airline.airline_id?.toString(),
    })) || [];

  return (
    <>
      <SearchWithDropdown
        disabled={isLoading}
        options={airlineOptions}
        onSelect={(value) => {
          setSelectedAirline(value);
          if (value) clearError("airline");
        }}
        showRecentSearches={false}
        placeholder={isLoading ? "Loading airlines..." : "Choose Airline"}
        className="h-11.25 rounded-md"
        inputClassName={`rounded-md pl-4 pr-10 bg-[#F4F4F4] border ${
          errors.airline ? "border-red-500" : "border-[#E0E0E0]"
        }`}
      />

      <FlightNumberInput
        withoutLabel
        validationErrors={errors}
        disabled={selectedAirline === null}
        airline={selectedAirline?.label ?? ""}
        className={`bg-[#F4F4F4] h-11.25 border ${
          errors.flightNumber ? "border-red-500" : "border-[#E0E0E0]"
        }`}
        value={flightNumber || ""}
        onChange={(value) => {
          setFlightNumber(value);
          if (value) clearError("flightNumber");
        }}
      />
    </>
  );
};

export default FlightInputs;
