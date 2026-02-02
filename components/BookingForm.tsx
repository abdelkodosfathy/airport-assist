// "use client";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import clsx from "clsx";
// import Plane from "./custom icons/plane";
// import Adults from "./custom icons/adults";
// import SearchWithDropdown, { OptionType } from "./custom inputs/search";
// import { useAirports } from "@/lib/hooks/useAirports";
// import { Loader2 } from "lucide-react";
// import DatePickerInput from "./custom inputs/DatePickerInputs";
// import AdultsPicker from "./custom inputs/AdultsPicker";

// export interface VipBookingData {
//   airport_id: string;
//   airport_name: string;
//   serviceType: string;
//   date: string;
//   adults: number;
//   children: number;
// }

// export default function BookingForm() {
//   const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">("vip");

//   // VIP form states
//   const [selectedAirport, setSelectedAirport] = useState<string | null | undefined>("");
//   const [selectedAirportID, setSelectedAirportID] = useState<string | null | undefined>("");
//   const [selectedAirportName, setSelectedAirportName] = useState<string | null | undefined>("");
//   const [selectedServiceType, setSelectedServiceType] = useState<string | null | undefined>("");
//   const [selectedDate, setSelectedDate] = useState<string | null | undefined>("");
//   const [adultsCount, setAdultsCount] = useState<number>(1);
//   const [childrenCount, setChildrenCount] = useState<number>(0);

//   // Chauffeur form states
//   const [pickUpLocation, setPickUpLocation] = useState<string | null | undefined>("");
//   const [dropOffLocation, setDropOffLocation] = useState<string | null | undefined>("");
//   const [chauffeurDate, setChauffeurDate] = useState<string>("");
//   const [pickupTime, setPickupTime] = useState<string>("");

//   // Validation states
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [attemptedSubmit, setAttemptedSubmit] = useState(false);

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
//     setSelectedAirportID(option.value);
//     setSelectedAirportName(option.label);
//     if (attemptedSubmit) {
//       setErrors((prev) => ({ ...prev, airport: "" }));
//     }
//   };

//   const handleServiceTypeSelect = (option: OptionType) => {
//     setSelectedServiceType(option.value);
//     if (attemptedSubmit) {
//       setErrors((prev) => ({ ...prev, serviceType: "" }));
//     }
//   };

//   const handlePickUpSelect = (option: OptionType) => {
//     setPickUpLocation(option.value);
//     if (attemptedSubmit) {
//       setErrors((prev) => ({ ...prev, pickUp: "" }));
//     }
//   };

//   const handleDropOffSelect = (option: OptionType) => {
//     setDropOffLocation(option.value);
//     if (attemptedSubmit) {
//       setErrors((prev) => ({ ...prev, dropOff: "" }));
//     }
//   };

//   // Validation function
//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (activeTab === "vip") {
//       if (!selectedAirport) {
//         newErrors.airport = "Please select an airport";
//       }
//       if (!selectedServiceType) {
//         newErrors.serviceType = "Please select a service type";
//       }
//       if (!selectedDate) {
//         newErrors.date = "Please select a date";
//       }
//     } else {
//       if (!pickUpLocation) {
//         newErrors.pickUp = "Please enter pick up location";
//       }
//       if (!dropOffLocation) {
//         newErrors.dropOff = "Please enter drop off location";
//       }
//       if (!chauffeurDate) {
//         newErrors.chauffeurDate = "Please select a date";
//       }
//       if (!pickupTime) {
//         newErrors.pickupTime = "Please select pickup time";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveBookingToSession = () => {
//     if (activeTab === "vip") {
//       const vipBookingData = {
//         airport_id: selectedAirportID,
//         airport_name: selectedAirportName,
//         serviceType: selectedServiceType,
//         date: selectedDate,
//         adults: adultsCount,
//         children: childrenCount,
//       };

//       sessionStorage.setItem("vipBooking", JSON.stringify(vipBookingData));
//     } else {
//       const chauffeurBookingData = {
//         pickUp: pickUpLocation,
//         dropOff: dropOffLocation,
//         date: chauffeurDate,
//         time: pickupTime,
//       };

//       sessionStorage.setItem(
//         "chauffeurBooking",
//         JSON.stringify(chauffeurBookingData),
//       );
//     }
//   };

//   const handleBookNow = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setAttemptedSubmit(true);

//     if (!validateForm()) return;

//     // Save data in session storage
//     saveBookingToSession();

//     // Redirect without query params
//     if (activeTab === "vip") {
//       window.location.href = "/meet-and-greet";
//     } else {
//       window.location.href = "/chauffeur-services";
//     }
//   };

//   return (
//     <Card className="booking-form opacity-0 mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-7.5">
//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
//         <Button
//           variant={"ghost"}
//           onClick={() => {
//             setActiveTab("vip");
//             setErrors({});
//             setAttemptedSubmit(false);
//           }}
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
//           onClick={() => {
//             setActiveTab("chauffeur-services");
//             setErrors({});
//             setAttemptedSubmit(false);
//           }}
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
//             <div className="col-span-6">
//               <SearchWithDropdown
//                 icon={<Plane />}
//                 id="airport"
//                 placeholder={
//                   isLoading ? "Loading airports..." : "Select Airport"
//                 }
//                 inputClassName={clsx(
//                   "rounded-lg lg:rounded-none lg:rounded-l-xl",
//                   errors.airport && "placeholder:text-red-500",
//                 )}
//                 className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
//                 disabled={isLoading}
//                 options={airportOptions}
//                 onSelect={handleAirportSelect}
//                 showRecentSearches={false}
//               />
//             </div>

//             <div className="col-span-4">
//               <SearchWithDropdown
//                 id="serviceType"
//                 placeholder="Service Type"
//                 inputClassName={clsx(
//                   "rounded-lg lg:rounded-none",
//                   errors.serviceType && "placeholder:text-red-500",
//                 )}
//                 className="h-full bg-white lg:h-full rounded-lg lg:rounded-none"
//                 onSelect={handleServiceTypeSelect}
//               />
//             </div>

//             <div className="col-span-3">
//               <DatePickerInput
//                 className="h-full"
//                 inputClassName={clsx(
//                   "h-full",
//                   errors.date && "placeholder:text-red-500",
//                 )}
//                 onDateChange={(date) => {
//                   setSelectedDate(date);
//                   if (attemptedSubmit) {
//                     setErrors((prev) => ({ ...prev, date: "" }));
//                   }
//                 }}
//               />
//             </div>

//             <div className="col-span-3">
//               <AdultsPicker
//                 icon={<Adults />}
//                 placeholder="1 Adult - 0 Children"
//                 className="h-full"
//                 inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
//                 onAdultsChange={(adults) => setAdultsCount(adults)}
//                 onChildrenChange={(children) => setChildrenCount(children)}
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="col-span-5">
//               <SearchWithDropdown
//                 id="pickUp"
//                 placeholder="Pick Up from"
//                 inputClassName={clsx(
//                   "rounded-lg lg:rounded-none lg:rounded-l-xl",
//                   errors.pickUp && "placeholder:text-red-500",
//                 )}
//                 className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
//                 onSelect={handlePickUpSelect}
//               />
//             </div>

//             <div className="col-span-5">
//               <SearchWithDropdown
//                 id="dropOff"
//                 placeholder="Drop off"
//                 inputClassName={clsx(
//                   errors.dropOff && "placeholder:text-red-500",
//                 )}
//                 className="h-full bg-white lg:h-full rounded-lg lg:rounded-none"
//                 onSelect={handleDropOffSelect}
//               />
//             </div>

//             <div className="col-span-3">
//               <DatePickerInput
//                 inputClassName={clsx(
//                   errors.chauffeurDate && "placeholder:text-red-500",
//                 )}
//                 className="h-full "
//                 onDateChange={(date) => {
//                   setSelectedDate(date);
//                   if (attemptedSubmit) {
//                     setErrors((prev) => ({ ...prev, date: "" }));
//                   }
//                 }}
//               />
//             </div>
//             <div className="col-span-3">
//               <AdultsPicker
//                 inputClassName={clsx(
//                   "bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full",
//                 )}
//                 icon={<Adults />}
//                 placeholder="1 Adult - 0 Children"
//                 className="h-full"
//                 onAdultsChange={(adults) => setAdultsCount(adults)}
//                 onChildrenChange={(children) => setChildrenCount(children)}
//               />
//             </div>
//           </>
//         )}

//         <button
//           onClick={handleBookNow}
//           className="w-full h-full rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 mt-2 sm:mt-0 cursor-pointer col-span-1 lg:col-span-4"
//         >
//           <p className="text-normal font-light flex items-center justify-center gap-2">
//             {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//             BOOK NOW
//           </p>
//         </button>
//       </div>
//     </Card>
//   );
// }

"use client";
import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Plane from "./custom icons/plane";
import Adults from "./custom icons/adults";
import SearchWithDropdown, { OptionType } from "./custom inputs/search";
import { useAirports } from "@/lib/hooks/useAirports";
import { Loader2, AlertCircle } from "lucide-react";
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

export interface ChauffeurBookingData {
  pickUp: string;
  dropOff: string;
  date: string;
  time: string;
  adults: number;
  children: number;
}

type TabType = "vip" | "chauffeur-services";

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<TabType>("vip");

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isError, error } = useAirports();

  // Convert airports to options format with memoization
  const airportOptions: OptionType[] = useMemo(
    () =>
      data?.data.airports.map((airport) => ({
        label: `${airport.airport_name} (${airport.airport_code})`,
        value: airport.airport_id.toString(),
      })) || [],
    [data],
  );

  // Handler functions with useCallback for optimization
  const clearError = useCallback(
    (field: string) => {
      if (attemptedSubmit) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [attemptedSubmit],
  );

  const handleAirportSelect = useCallback(
    (option: OptionType) => {
      setSelectedAirport(option.value);
      setSelectedAirportID(option.value);
      setSelectedAirportName(option.label);
      clearError("airport");
    },
    [clearError],
  );

  const handleServiceTypeSelect = useCallback(
    (option: OptionType) => {
      setSelectedServiceType(option.value);
      clearError("serviceType");
    },
    [clearError],
  );

  const handlePickUpSelect = useCallback(
    (option: OptionType) => {
      setPickUpLocation(option.value);
      clearError("pickUp");
    },
    [clearError],
  );

  const handleDropOffSelect = useCallback(
    (option: OptionType) => {
      setDropOffLocation(option.value);
      clearError("dropOff");
    },
    [clearError],
  );

  const handleDateChange = useCallback(
    (date: string) => {
      if (activeTab === "vip") {
        setSelectedDate(date);
        clearError("date");
      } else {
        setChauffeurDate(date);
        clearError("chauffeurDate");
      }
    },
    [activeTab, clearError],
  );

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setErrors({});
    setAttemptedSubmit(false);
  }, []);

  // Validation function
  const validateForm = useCallback((): boolean => {
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
  }, [
    activeTab,
    selectedAirport,
    selectedServiceType,
    selectedDate,
    pickUpLocation,
    dropOffLocation,
    chauffeurDate,
    pickupTime,
  ]);

  const saveBookingToSession = useCallback(() => {
    try {
      if (activeTab === "vip") {
        const vipBookingData: VipBookingData = {
          airport_id: selectedAirportID,
          airport_name: selectedAirportName,
          serviceType: selectedServiceType,
          date: selectedDate,
          adults: adultsCount,
          children: childrenCount,
        };

        sessionStorage.setItem("vipBooking", JSON.stringify(vipBookingData));
      } else {
        const chauffeurBookingData: ChauffeurBookingData = {
          pickUp: pickUpLocation,
          dropOff: dropOffLocation,
          date: chauffeurDate,
          time: pickupTime,
          adults: adultsCount,
          children: childrenCount,
        };

        sessionStorage.setItem(
          "chauffeurBooking",
          JSON.stringify(chauffeurBookingData),
        );
      }
    } catch (err) {
      console.error("Failed to save booking to session storage:", err);
    }
  }, [
    activeTab,
    selectedAirportID,
    selectedAirportName,
    selectedServiceType,
    selectedDate,
    adultsCount,
    childrenCount,
    pickUpLocation,
    dropOffLocation,
    chauffeurDate,
    pickupTime,
  ]);

  const handleBookNow = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setAttemptedSubmit(true);

      if (!validateForm()) {
        // Scroll to first error
        const firstErrorField = Object.keys(errors)[0];
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      setIsSubmitting(true);

      try {
        // Save data in session storage
        saveBookingToSession();

        // Small delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Redirect without query params
        if (activeTab === "vip") {
          window.location.href = "/meet-and-greet";
        } else {
          window.location.href = "/chauffeur-services";
        }
      } catch (err) {
        console.error("Booking failed:", err);
        setIsSubmitting(false);
      }
    },
    [validateForm, errors, saveBookingToSession, activeTab],
  );

  // Error display helper
  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-1 text-red-500 text-sm mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
        <AlertCircle className="w-3 h-3" />
        <span>{message}</span>
      </div>
    );
  };

  // Loading state
  if (isError) {
    return (
      <Card className="mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-7.5">
        <div className="flex items-center justify-center gap-2 text-red-400 py-8">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load airports. Please try again later.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="booking-form opacity-0 mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-6 lg:p-7.5 transition-all duration-300 hover:shadow-2xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start lg:mb-6">
        <Button
          variant="ghost"
          onClick={() => handleTabChange("vip")}
          className="truncate cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium md:text-lg lg:text-xl hover:bg-transparent hover:text-[#AB9B90] transition-all duration-300"
          aria-pressed={activeTab === "vip"}
          aria-label="VIP Meet & Greet Service Tab"
        >
          VIP Meet & Greet Service
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-all duration-300",
              activeTab === "vip"
                ? "opacity-100 scale-x-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0 scale-x-0",
            )}
          />
        </Button>

        <span className="inline-block w-0.75 h-9 rounded-3xl bg-linear-to-b from-white to-white/10" />

        <Button
          variant="ghost"
          onClick={() => handleTabChange("chauffeur-services")}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium md:text-lg lg:text-xl hover:bg-transparent hover:text-[#AB9B90] transition-all duration-300"
          aria-pressed={activeTab === "chauffeur-services"}
          aria-label="Chauffeur Services Tab"
        >
          Chauffeur Services
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-all duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 scale-x-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0 scale-x-0",
            )}
          />
        </Button>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-20 gap-0.5 lg:gap-1">
          {activeTab === "vip" ? (
            <>
              <div className="col-span-1 sm:col-span-2 lg:col-span-6">
                <SearchWithDropdown
                  icon={<Plane />}
                  id="airport"
                  placeholder={
                    isLoading ? "Loading airports..." : "Select Airport"
                  }
                  inputClassName={clsx(
                    "rounded-t-lg lg:rounded-l-xl transition-all duration-200",
                    errors.airport &&
                      "ring-2 ring-red-500 placeholder:text-red-500",
                  )}
                  className="bg-white h-10 lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
                  disabled={isLoading}
                  options={airportOptions}
                  onSelect={handleAirportSelect}
                  showRecentSearches={false}
                  aria-invalid={!!errors.airport}
                  aria-describedby={
                    errors.airport ? "airport-error" : undefined
                  }
                />
                {errors.airport && (
                  <div id="airport-error" role="alert">
                    <ErrorMessage message={errors.airport} />
                  </div>
                )}
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                <SearchWithDropdown
                  id="serviceType"
                  placeholder="Service Type"
                  inputClassName={clsx(
                    "rounded-none transition-all duration-200",
                    // "rounded-lg lg:rounded-none transition-all duration-200",
                    errors.serviceType &&
                      "ring-2 ring-red-500 placeholder:text-red-500",
                  )}
                  className=" bg-white h-10 lg:h-full rounded-lg lg:rounded-none"
                  onSelect={handleServiceTypeSelect}
                  aria-invalid={!!errors.serviceType}
                  aria-describedby={
                    errors.serviceType ? "serviceType-error" : undefined
                  }
                />
                {errors.serviceType && (
                  <div id="serviceType-error" role="alert">
                    <ErrorMessage message={errors.serviceType} />
                  </div>
                )}
              </div>

              <div className="col-span-1 sm:col-span-1 lg:col-span-3">
                <DatePickerInput
                  className="h-full"
                  inputClassName={clsx(
                    "rounded-bl-lg lg:rounded-none  h-10 lg:h-full transition-all duration-200",
                    errors.date &&
                      "ring-2 ring-red-500 placeholder:text-red-500",
                  )}
                  onDateChange={handleDateChange}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                />
                {errors.date && (
                  <div id="date-error" role="alert">
                    <ErrorMessage message={errors.date} />
                  </div>
                )}
              </div>

              <div className="col-span-1 sm:col-span-1 lg:col-span-3">
                <AdultsPicker
                  icon={<Adults />}
                  placeholder="1 Adult - 0 Children"
                  className="h-full"
                  inputClassName="bg-white rounded-br-lg lg:rounded-none lg:rounded-none h-10 lg:h-full"
                  onAdultsChange={setAdultsCount}
                  onChildrenChange={setChildrenCount}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-span-1 sm:col-span-2 lg:col-span-5">
                <SearchWithDropdown
                  id="pickUp"
                  placeholder="Pick Up from"
                  inputClassName={clsx(
                    "rounded-t-lg lg:rounded-none lg:rounded-l-xl transition-all duration-200",
                    errors.pickUp &&
                      "ring-2 ring-red-500 placeholder:text-red-500",
                  )}
                  className="bg-white h-10 lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl"
                  onSelect={handlePickUpSelect}
                  aria-invalid={!!errors.pickUp}
                  aria-describedby={errors.pickUp ? "pickUp-error" : undefined}
                />
                {errors.pickUp && (
                  <div id="pickUp-error" role="alert">
                    <ErrorMessage message={errors.pickUp} />
                  </div>
                )}
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-5">
                <SearchWithDropdown
                  id="dropOff"
                  placeholder="Drop off"
                  inputClassName={clsx(
                    "rounded-none transition-all duration-200",
                    errors.dropOff &&
                      "ring-2 ring-red-500 placeholder:text-red-500",
                  )}
                  className="bg-white h-10 lg:h-full rounded-lg lg:rounded-none"
                  onSelect={handleDropOffSelect}
                  aria-invalid={!!errors.dropOff}
                  aria-describedby={
                    errors.dropOff ? "dropOff-error" : undefined
                  }
                />
                {errors.dropOff && (
                  <div id="dropOff-error" role="alert">
                    <ErrorMessage message={errors.dropOff} />
                  </div>
                )}
              </div>

              <div className="col-span-1 sm:col-span-1 lg:col-span-3">
                <DatePickerInput
                  inputClassName={clsx(
                    "rounded-bl-lg lg:rounded-none h-10 lg:h-full transition-all duration-200",
                    errors.chauffeurDate &&
                      "ring-2 ring-red-500 placeholder:text-red-500",
                  )}
                  className="h-full"
                  onDateChange={handleDateChange}
                  aria-invalid={!!errors.chauffeurDate}
                  aria-describedby={
                    errors.chauffeurDate ? "chauffeurDate-error" : undefined
                  }
                />
                {errors.chauffeurDate && (
                  <div id="chauffeurDate-error" role="alert">
                    <ErrorMessage message={errors.chauffeurDate} />
                  </div>
                )}
              </div>

              <div className="col-span-1 sm:col-span-1 lg:col-span-3">
                <AdultsPicker
                  inputClassName="bg-white rounded-br-lg lg:rounded-none h-10 lg:h-full"
                  icon={<Adults />}
                  placeholder="1 Adult - 0 Children"
                  className="h-full"
                  onAdultsChange={setAdultsCount}
                  onChildrenChange={setChildrenCount}
                />
              </div>
            </>
          )}

          <button
            onClick={handleBookNow}
            disabled={isSubmitting || isLoading}
            className="w-full h-10 lg:min-h-12 rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform cursor-pointer col-span-1 sm:col-span-2 lg:col-span-4"
            aria-label="Book now"
          >
            <p className="text-normal h-full font-light flex items-center justify-center gap-2">
              {(isLoading || isSubmitting) && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {isSubmitting ? "BOOKING..." : "BOOK NOW"}
            </p>
          </button>
        </div>

        {/* Global error message */}
        {attemptedSubmit && Object.keys(errors).length > 0 && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Please fix the errors above before proceeding
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
