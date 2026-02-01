// // components/BookingForm.tsx
// "use client";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import clsx from "clsx";
// import IconInput from "@/components/custom inputs/customInput";
// import Plane from "./custom icons/plane";
// import Calender from "./custom icons/calender";
// import Adults from "./custom icons/adults";
// import SearchWithDropdown, { OptionType } from "./custom inputs/search";
// import Link from "next/link";
// import { useAirports } from "@/lib/hooks/useAirports";
// import { Loader2 } from "lucide-react";
// import DatePickerInput from "./custom inputs/DatePickerInputs";
// import AdultsPicker from "./custom inputs/AdultsPicker";

// export default function BookingForm() {
//   const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">(
//     "vip",
//   );

//   // VIP form states
//   const [selectedAirport, setSelectedAirport] = useState<string>("");
//   const [selectedServiceType, setSelectedServiceType] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [adultsCount, setAdultsCount] = useState<number>(1);
//   const [childrenCount, setChildrenCount] = useState<number>(0);

//   // Chauffeur form states
//   const [pickUpLocation, setPickUpLocation] = useState<string>("");
//   const [dropOffLocation, setDropOffLocation] = useState<string>("");
//   const [chauffeurDate, setChauffeurDate] = useState<string>("");
//   const [pickupTime, setPickupTime] = useState<string>("");

//   const { data, isLoading, isError, error } = useAirports();

//   if (isError) {
//     console.error("Error fetching airports:", error);
//   }

//   // Convert airports to options format
//   const airportOptions: OptionType[] =
//     data?.data.airports.map((airport) => ({
//       label: `${airport.airport_name} (${airport.airport_code})`,
//       value: airport.airport_id.toString(),
//     })) || [];

//   const handleAirportSelect = (option: OptionType) => {
//     setSelectedAirport(option.value);
//     console.log("Selected airport:", option);
//   };

//   const handleServiceTypeSelect = (option: OptionType) => {
//     setSelectedServiceType(option.value);
//   };

//   const handlePickUpSelect = (option: OptionType) => {
//     setPickUpLocation(option.value);
//   };

//   const handleDropOffSelect = (option: OptionType) => {
//     setDropOffLocation(option.value);
//   };

//   // Build URL with query params
//   const buildBookingUrl = () => {
//     if (activeTab === "vip") {
//       const params = new URLSearchParams();
//       if (selectedAirport) params.append("airport", selectedAirport);
//       if (selectedServiceType)
//         params.append("serviceType", selectedServiceType);
//       if (selectedDate) params.append("date", selectedDate);
//       if (adultsCount) params.append("adults", adultsCount.toString());
//       if (childrenCount) params.append("children", childrenCount.toString());

//       return `/meet-and-greet${params.toString() ? `?${params.toString()}` : ""}`;
//     } else {
//       const params = new URLSearchParams();
//       if (pickUpLocation) params.append("pickUp", pickUpLocation);
//       if (dropOffLocation) params.append("dropOff", dropOffLocation);
//       if (chauffeurDate) params.append("date", chauffeurDate);
//       if (pickupTime) params.append("time", pickupTime);

//       return `/chauffeur-services${params.toString() ? `?${params.toString()}` : ""}`;
//     }
//   };

//   return (
//     <Card className="booking-form opacity-0 mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-7.5">
//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
//         <Button
//           variant={"ghost"}
//           onClick={() => setActiveTab("vip")}
//           className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium text-[20.25px] hover:bg-transparent hover:text-[#AB9B90]"
//         >
//           VIP Meet & Greet Service
//           <span
//             className={clsx(
//               "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-opacity duration-300",
//               activeTab === "vip"
//                 ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
//                 : "opacity-0",
//             )}
//           />
//         </Button>

//         <span className="inline-block w-0.75 h-9 rounded-3xl bg-linear-to-b from-white to-white/10"></span>

//         <Button
//           variant={"ghost"}
//           onClick={() => setActiveTab("chauffeur-services")}
//           className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium text-[20.25px] hover:bg-transparent hover:text-[#AB9B90]"
//         >
//           Chauffeur Services
//           <span
//             className={clsx(
//               "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-opacity duration-300",
//               activeTab === "chauffeur-services"
//                 ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
//                 : "opacity-0",
//             )}
//           />
//         </Button>
//       </div>

//       {/* Form Inputs */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-20 gap-3 sm:gap-4 lg:gap-1 h-12">
//         {activeTab === "vip" ? (
//           <>
//             <SearchWithDropdown
//               icon={<Plane />}
//               id="airport"
//               placeholder={isLoading ? "Loading airports..." : "Select Airport"}
//               inputClassName="rounded-lg lg:rounded-none lg:rounded-l-xl"
//               className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl col-span-6"
//               disabled={isLoading}
//               options={airportOptions}
//               onSelect={handleAirportSelect}
//               showRecentSearches={false}
//             />
//             <SearchWithDropdown
//               id="serviceType"
//               placeholder="Service Type"
//               inputClassName="rounded-lg lg:rounded-none"
//               className="h-full bg-white lg:h-full rounded-lg lg:rounded-none col-span-4"
//               onSelect={handleServiceTypeSelect}
//             />

//             <DatePickerInput
//               className="col-span-3"
//               onDateChange={(date) => setSelectedDate(date)}
//             />

//             <AdultsPicker
//               icon={<Adults />}
//               placeholder="1 Adult - 0 Children"
//               className="col-span-3"
//               inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
//               onAdultsChange={(adults) => setAdultsCount(adults)}
//               onChildrenChange={(children) => setChildrenCount(children)}
//             />
//           </>
//         ) : (
//           <>
//             <SearchWithDropdown
//               id="pickUp"
//               placeholder="Pick Up from"
//               inputClassName="rounded-lg lg:rounded-none lg:rounded-l-xl"
//               className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl col-span-5"
//               onSelect={handlePickUpSelect}
//             />
//             <SearchWithDropdown
//               id="dropOff"
//               placeholder="Drop off"
//               inputClassName="rounded-lg lg:rounded-none"
//               className="h-full bg-white lg:h-full rounded-lg lg:rounded-none col-span-5"
//               onSelect={handleDropOffSelect}
//             />
//             <IconInput
//               icon={<Calender />}
//               placeholder="Select Date"
//               className="col-span-3"
//               inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
//               onChange={(e) => setChauffeurDate(e.target.value)}
//             />
//             <IconInput
//               icon={<Adults />}
//               type="time"
//               className="col-span-3"
//               placeholder="Pickup Time"
//               inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
//               onChange={(e) => setPickupTime(e.target.value)}
//             />
//           </>
//         )}

//         <Link
//           href={buildBookingUrl()}
//           className="w-full h-full rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 mt-2 sm:mt-0 cursor-pointer col-span-1 lg:col-span-4"
//         >
//           <p className="text-normal font-light flex items-center justify-center gap-2">
//             {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//             BOOK NOW
//           </p>
//         </Link>
//       </div>
//     </Card>
//   );
// }

"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Plane from "./custom icons/plane";
import Adults from "./custom icons/adults";
import SearchWithDropdown, { OptionType } from "./custom inputs/search";
import { useAirports } from "@/lib/hooks/useAirports";
import { Loader2 } from "lucide-react";
import DatePickerInput from "./custom inputs/DatePickerInputs";
import AdultsPicker from "./custom inputs/AdultsPicker";

export interface VipBookingData {
  airport_id: string;
  airport_name: string;
  serviceType: string;
  date: string;
  adults: number;
  children: number;
}

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">(
    "vip",
  );

  // VIP form states
  const [selectedAirport, setSelectedAirport] = useState<string>("");
  const [selectedAirportID, setSelectedAirportID] = useState<string>("");
  const [selectedAirportName, setSelectedAirportName] = useState<string>("");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  // Chauffeur form states
  const [pickUpLocation, setPickUpLocation] = useState<string>("");
  const [dropOffLocation, setDropOffLocation] = useState<string>("");
  const [chauffeurDate, setChauffeurDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("");

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const { data, isLoading, isError, error } = useAirports();

  if (isError) {
    console.error("Error fetching airports:", error);
  }

  // Convert airports to options format
  const airportOptions: OptionType[] =
    data?.data.airports.map((airport) => ({
      label: `${airport.airport_name} (${airport.airport_code})`,
      value: airport.airport_id.toString(),
    })) || [];

  const handleAirportSelect = (option: OptionType) => {
    setSelectedAirport(option.value);
    setSelectedAirportID(option.value);
    setSelectedAirportName(option.label);
    if (attemptedSubmit) {
      setErrors((prev) => ({ ...prev, airport: "" }));
    }
  };

  const handleServiceTypeSelect = (option: OptionType) => {
    setSelectedServiceType(option.value);
    if (attemptedSubmit) {
      setErrors((prev) => ({ ...prev, serviceType: "" }));
    }
  };

  const handlePickUpSelect = (option: OptionType) => {
    setPickUpLocation(option.value);
    if (attemptedSubmit) {
      setErrors((prev) => ({ ...prev, pickUp: "" }));
    }
  };

  const handleDropOffSelect = (option: OptionType) => {
    setDropOffLocation(option.value);
    if (attemptedSubmit) {
      setErrors((prev) => ({ ...prev, dropOff: "" }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (activeTab === "vip") {
      if (!selectedAirport) {
        newErrors.airport = "Please select an airport";
      }
      if (!selectedServiceType) {
        newErrors.serviceType = "Please select a service type";
      }
      if (!selectedDate) {
        newErrors.date = "Please select a date";
      }
    } else {
      if (!pickUpLocation) {
        newErrors.pickUp = "Please enter pick up location";
      }
      if (!dropOffLocation) {
        newErrors.dropOff = "Please enter drop off location";
      }
      if (!chauffeurDate) {
        newErrors.chauffeurDate = "Please select a date";
      }
      if (!pickupTime) {
        newErrors.pickupTime = "Please select pickup time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveBookingToSession = () => {
    if (activeTab === "vip") {
      const vipBookingData = {
        airport_id: selectedAirportID,
        airport_name: selectedAirportName,
        serviceType: selectedServiceType,
        date: selectedDate,
        adults: adultsCount,
        children: childrenCount,
      };

      sessionStorage.setItem("vipBooking", JSON.stringify(vipBookingData));
    } else {
      const chauffeurBookingData = {
        pickUp: pickUpLocation,
        dropOff: dropOffLocation,
        date: chauffeurDate,
        time: pickupTime,
      };

      sessionStorage.setItem(
        "chauffeurBooking",
        JSON.stringify(chauffeurBookingData),
      );
    }
  };

  const handleBookNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!validateForm()) return;

    // Save data in session storage
    saveBookingToSession();

    // Redirect without query params
    if (activeTab === "vip") {
      window.location.href = "/meet-and-greet";
    } else {
      window.location.href = "/chauffeur-services";
    }
  };

  return (
    <Card className="booking-form opacity-0 mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-7.5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
        <Button
          variant={"ghost"}
          onClick={() => {
            setActiveTab("vip");
            setErrors({});
            setAttemptedSubmit(false);
          }}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium text-[20.25px] hover:bg-transparent hover:text-[#AB9B90]"
        >
          VIP Meet & Greet Service
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-opacity duration-300",
              activeTab === "vip"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0",
            )}
          />
        </Button>

        <span className="inline-block w-0.75 h-9 rounded-3xl bg-linear-to-b from-white to-white/10"></span>

        <Button
          variant={"ghost"}
          onClick={() => {
            setActiveTab("chauffeur-services");
            setErrors({});
            setAttemptedSubmit(false);
          }}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium text-[20.25px] hover:bg-transparent hover:text-[#AB9B90]"
        >
          Chauffeur Services
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-opacity duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0",
            )}
          />
        </Button>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-20 gap-3 sm:gap-4 lg:gap-1 h-12">
        {activeTab === "vip" ? (
          <>
            <div className="col-span-6">
              <SearchWithDropdown
                icon={<Plane />}
                id="airport"
                placeholder={
                  isLoading ? "Loading airports..." : "Select Airport"
                }
                inputClassName={clsx(
                  "rounded-lg lg:rounded-none lg:rounded-l-xl",
                  errors.airport && "placeholder:text-red-500",
                )}
                className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
                disabled={isLoading}
                options={airportOptions}
                onSelect={handleAirportSelect}
                showRecentSearches={false}
              />
              {/* {errors.airport && (
                <p className="text-red-500 text-sm mt-1">{errors.airport}</p>
              )} */}
            </div>

            <div className="col-span-4">
              <SearchWithDropdown
                id="serviceType"
                placeholder="Service Type"
                inputClassName={clsx(
                  "rounded-lg lg:rounded-none",
                  errors.serviceType && "placeholder:text-red-500",
                )}
                className="h-full bg-white lg:h-full rounded-lg lg:rounded-none"
                onSelect={handleServiceTypeSelect}
              />
              {/* {errors.serviceType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serviceType}
                </p>
              )} */}
            </div>

            <div className="col-span-3">
              <DatePickerInput
                className="h-full"
                inputClassName={clsx(
                  "h-full",
                  errors.date && "placeholder:text-red-500",
                )}
                onDateChange={(date) => {
                  setSelectedDate(date);
                  if (attemptedSubmit) {
                    setErrors((prev) => ({ ...prev, date: "" }));
                  }
                }}
              />
            </div>

            <div className="col-span-3">
              <AdultsPicker
                icon={<Adults />}
                placeholder="1 Adult - 0 Children"
                className="h-full"
                inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
                onAdultsChange={(adults) => setAdultsCount(adults)}
                onChildrenChange={(children) => setChildrenCount(children)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-5">
              <SearchWithDropdown
                id="pickUp"
                placeholder="Pick Up from"
                inputClassName={clsx(
                  "rounded-lg lg:rounded-none lg:rounded-l-xl",
                  errors.pickUp && "placeholder:text-red-500",
                )}
                className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
                onSelect={handlePickUpSelect}
              />
              {/* {errors.pickUp && (
                <p className="text-red-500 text-sm mt-1">{errors.pickUp}</p>
              )} */}
            </div>

            <div className="col-span-5">
              <SearchWithDropdown
                id="dropOff"
                placeholder="Drop off"
                inputClassName={clsx(
                  errors.dropOff && "placeholder:text-red-500",
                )}
                className="h-full bg-white lg:h-full rounded-lg lg:rounded-none"
                onSelect={handleDropOffSelect}
              />
              {/* {errors.dropOff && (
                <p className="text-red-500 text-sm mt-1">{errors.dropOff}</p>
              )} */}
            </div>

            <div className="col-span-3">
              <DatePickerInput
                inputClassName={clsx(
                  errors.chauffeurDate && "placeholder:text-red-500",
                )}
                className="h-full "
                onDateChange={(date) => {
                  setSelectedDate(date);
                  if (attemptedSubmit) {
                    setErrors((prev) => ({ ...prev, date: "" }));
                  }
                }}
              />
            </div>
            <div className="col-span-3">
              <AdultsPicker
                inputClassName={clsx(
                  "bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full",
                  // errors.pickupTime && "placeholder:text-red-500",
                )}
                icon={<Adults />}
                placeholder="1 Adult - 0 Children"
                className="h-full"
                onAdultsChange={(adults) => setAdultsCount(adults)}
                onChildrenChange={(children) => setChildrenCount(children)}
              />
            </div>
          </>
        )}

        <button
          onClick={handleBookNow}
          className="w-full h-full rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 mt-2 sm:mt-0 cursor-pointer col-span-1 lg:col-span-4"
        >
          <p className="text-normal font-light flex items-center justify-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            BOOK NOW
          </p>
        </button>
      </div>
    </Card>
  );
}
