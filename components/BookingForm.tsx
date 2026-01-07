// components/BookingForm.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import IconInput from "@/components/custom inputs/customInput";
import Plane from "./custom icons/plane";
import Calender from "./custom icons/calender";
import Adults from "./custom icons/adults";
import SearchWithDropdown, { OptionType } from "./custom inputs/search";
import Link from "next/link";
import { useAirports } from "@/lib/hooks/useAirports";
import { Loader2 } from "lucide-react";

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">("vip");
  const [selectedAirport, setSelectedAirport] = useState<string>("");
  
  const { data, isLoading, isError, error } = useAirports();

  if (isError) {
    console.error("Error fetching airports:", error);
  }

  // Convert airports to options format
  const airportOptions: OptionType[] = data?.data.airports.map((airport) => ({
    label: `${airport.airport_name} (${airport.airport_code})`,
    value: airport.airport_id.toString(),
  })) || [];

  const handleAirportSelect = (option: OptionType) => {
    setSelectedAirport(option.value);
    console.log("Selected airport:", option);
  };

  return (
    <Card className="booking-form opacity-0 mx-auto backdrop-blur-md bg-white/10 border-white/20 mt-8 md:mt-12 w-full max-w-[1272px] p-7.5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
        <Button
          variant={"ghost"}
          onClick={() => setActiveTab("vip")}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium text-[20.25px] hover:bg-transparent hover:text-[#AB9B90]"
        >
          VIP Meet & Greet Service
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-opacity duration-300",
              activeTab === "vip"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0"
            )}
          />
        </Button>

        <span className="inline-block w-0.75 h-9 rounded-3xl bg-linear-to-b from-white to-white/10"></span>

        <Button
          variant={"ghost"}
          onClick={() => setActiveTab("chauffeur-services")}
          className="cursor-pointer relative px-3 sm:px-4 py-2 text-white font-medium text-[20.25px] hover:bg-transparent hover:text-[#AB9B90]"
        >
          Chauffeur Services
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.5 rounded-full transition-opacity duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0"
            )}
          />
        </Button>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-20 gap-3 sm:gap-4 lg:gap-1 h-12">
        {activeTab === "vip" ? (
          <>
            <SearchWithDropdown
              icon={<Plane />}
              id="airport"
              placeholder={isLoading ? "Loading airports..." : "Select Airport"}
              inputClassName="rounded-lg lg:rounded-none lg:rounded-l-xl"
              className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl col-span-6"
              disabled={isLoading}
              options={airportOptions}
              onSelect={handleAirportSelect}
              showRecentSearches={false}
            />
            <SearchWithDropdown
              id="serviceType"
              placeholder="Service Type"
              inputClassName="rounded-lg lg:rounded-none"
              className="h-full bg-white lg:h-full rounded-lg lg:rounded-none col-span-4"
            />
            <IconInput
              icon={<Calender />}
              placeholder="Select Date"
              className="col-span-3"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
            <IconInput
              icon={<Adults />}
              type="number"
              placeholder="1 Adult - 0 Children"
              className="col-span-3"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
          </>
        ) : (
          <>
            <SearchWithDropdown
              id="pickUp"
              placeholder="Pick Up from"
              inputClassName="rounded-lg lg:rounded-none lg:rounded-l-xl"
              className="h-full bg-white lg:h-full rounded-lg lg:rounded-none lg:rounded-l-xl col-span-5"
            />
            <SearchWithDropdown
              id="dropOff"
              placeholder="Drop off"
              inputClassName="rounded-lg lg:rounded-none"
              className="h-full bg-white lg:h-full rounded-lg lg:rounded-none col-span-5"
            />
            <IconInput
              icon={<Calender />}
              placeholder="Select Date"
              className="col-span-3"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
            <IconInput
              icon={<Adults />}
              type="number"
              className="col-span-3"
              placeholder="Pickup Time"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
          </>
        )}

        <Link
          href={activeTab === "vip" ? "/choose-services" : "/chauffeur-services"}
          className="w-full h-full rounded-lg lg:rounded-none lg:rounded-r-xl border text-lg font-light border-white/30 text-white px-6 py-3 bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:opacity-90 mt-2 sm:mt-0 cursor-pointer col-span-1 lg:col-span-4"
        >
          <p className="text-normal font-light flex items-center justify-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            BOOK NOW
          </p>
        </Link>
      </div>
    </Card>
  );
}