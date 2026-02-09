// "use client";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import AirportSearch from "./custom inputs/AirportSearch";
// import clsx from "clsx";
// import { useAirportSearch } from "@/lib/hooks/useAirports";
// import { OptionType } from "./custom inputs/search";
// import Plane from "./custom icons/plane";

// const AirportSearchInput = ({
//   attemptedSubmit,
//   errors,
//   setErrors,
// }: {
//   attemptedSubmit: boolean;
//   errors: Record<string, string>;
//   setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectedAirportID, setSelectedAirportID] = useState<string>("");
//   const [selectedAirportName, setSelectedAirportName] = useState<string>("");

//   const { data, isLoading, isError } = useAirportSearch(debouncedSearch);
// //   console.log(data);
//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const airports = data?.data?.airports;
//   const airportOptions: OptionType[] = useMemo(
//     () =>
//       airports?.map((airport) => ({
//         label: `${airport.airport_name} (${airport.airport_code})`,
//         value: airport.airport_id.toString(),
//       })) || [],
//     [airports],
//   );

//   const clearError = useCallback(
//     (field: string) => {
//       if (attemptedSubmit) {
//         setErrors((prev) => ({ ...prev, [field]: "" }));
//       }
//     },
//     [attemptedSubmit],
//   );
//   const handleAirportSelect = useCallback(
//     (option: OptionType) => {
//       setSelectedAirportID(option.value);
//       setSelectedAirportName(option.label);
//       //   clearError("airport");
//     },
//     [clearError],
//     // [],
//   );

//   console.log(airportOptions);

//   return (
//     <AirportSearch
//       onChange={setSearchQuery}
//       icon={<Plane />}
//       id="airport"
//       placeholder={isLoading ? "Loading airports..." : "Select Airport"}
//       inputClassName={clsx(
//         "rounded-t-lg lg:rounded-l-xl lg:rounded-t-none transition-all duration-200",
//         errors.airport && "ring-2 ring-red-500 placeholder:text-red-500",
//       )}
//       className="bg-white h-10 lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
//       disabled={isLoading}
//       options={airportOptions}
//       onSelect={handleAirportSelect}
//       showRecentSearches={false}
//       aria-invalid={!!errors.airport}
//       aria-describedby={errors.airport ? "airport-error" : undefined}
//     />
//   );
// };

// export default AirportSearchInput;

"use client";
import { useEffect, useMemo, useState } from "react";
import AirportSearch from "./custom inputs/AirportSearch";
import { useAirportSearch } from "@/lib/hooks/useAirports";
import { OptionType } from "./custom inputs/search";
import Plane from "./custom icons/plane";

const AirportSearchInput = ({
  onSelect,
  inputClassName,
  className,
  // attemptedSubmit,
  errors,
  // setErrors,
}: {
  onSelect?: (option: OptionType) => void;
  inputClassName: string;
  className: string;
  attemptedSubmit?: boolean;
  errors?: Record<string, string>;
  // setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // const [selectedAirportID, setSelectedAirportID] = useState<string>("");
  // const [selectedAirportName, setSelectedAirportName] = useState<string>("");
  const [cachedOptions, setCachedOptions] = useState<OptionType[]>([]);

  const { data, isLoading, isError } = useAirportSearch(debouncedSearch);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const airports = data?.data?.airports;
  const airportOptions: OptionType[] = useMemo(
    () =>
      airports?.map((airport) => ({
        label: `${airport.airport_name} (${airport.airport_code})`,
        value: airport.airport_id.toString(),
      })) || [],
    [airports],
  );

  // Update cached options when new data arrives
  useEffect(() => {
    if (airportOptions.length > 0) {
      setCachedOptions(airportOptions);
    }
  }, [airportOptions]);

  // const clearError = useCallback(
  //   (field: string) => {
  //     if (attemptedSubmit && setErrors) {
  //       setErrors((prev) => ({ ...prev, [field]: "" }));
  //     }
  //   },
  //   [attemptedSubmit, setErrors],
  // );

  // const handleAirportSelect = useCallback(
  //   (option: OptionType) => {
  //     setSelectedAirportID(option.value);
  //     setSelectedAirportName(option.label);
  //     clearError("airport");
  //   },
  //   [clearError],
  // );

  console.log(cachedOptions);

  return (
    <AirportSearch
      onChange={setSearchQuery}
      icon={<Plane />}
      id="airport"
      placeholder={isLoading ? "Loading airports..." : "Select Airport"}
      //   inputClassName={clsx(
      //     "rounded-t-lg lg:rounded-l-xl lg:rounded-t-none transition-all duration-200",
      //     errors.airport && "ring-2 ring-red-500 placeholder:text-red-500",
      //   )}
      //   className="bg-white h-10 lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"

      inputClassName={inputClassName}
      className={className}
      disabled={isLoading}
      options={cachedOptions} // Use cached options instead
      onSelect={onSelect}
      showRecentSearches={false}
      aria-invalid={!!errors?.airport}
      aria-describedby={errors?.airport ? "airport-error" : undefined}
    />
  );
};

export default AirportSearchInput;
