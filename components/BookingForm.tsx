"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

import IconInput from "@/components/custom inputs/customInput";
import Plane from "./custom icons/plane";
import Calender from "./custom icons/calender";
import Adults from "./custom icons/adults";
import Autocomplete from "./custom inputs/Autocomplete";
import { Search } from "lucide-react";
import SearchWithDropdown from "./custom inputs/search";

const airports = [
  { id: 1, label: "JFK – John F. Kennedy Intl" },
  { id: 2, label: "LAX – Los Angeles Intl" },
  { id: 3, label: "DXB – Dubai Intl" },
  // …
];

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">(
    "vip"
  );

  const handleSelect = (airport: { id: number; label: string }) => {
    console.log("Selected:", airport);
  };

  return (
    <Card
      className="
        booking-form opacity-0 
        mx-auto
        
        backdrop-blur-md bg-white/10 border-white/20 
        mt-8 md:mt-12
        
        w-full 
        max-w-[1272px]
        p-7.5
        "
      // p-6 sm:p-10 lg:p-12
      // max-w-7xl
    >
      {/* Tabs */}
      <div
        className="
          flex flex-wrap gap-2 sm:gap-4 
          justify-center sm:justify-start
        "
      >
        <Button
          variant={"ghost"}
          onClick={() => setActiveTab("vip")}
          className="
            cursor-pointer relative px-3 sm:px-4 py-2 
            text-white font-medium text-[20.25px] 
            hover:bg-transparent
            hover:text-[#AB9B90]
            "
          // sm:text-lg
        >
          VIP Meet & Greet Service
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.75 rounded-full transition-opacity duration-300",
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
          className="
            cursor-pointer relative px-3 sm:px-4 py-2 
            text-white font-medium text-[20.25px]
            hover:bg-transparent
            hover:text-[#AB9B90]
            "
          // sm:text-lg
        >
          Chauffeur Services
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-0.75 rounded-full transition-opacity duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#EBA068] to-[#99785F00]/0"
                : "opacity-0"
            )}
          />
        </Button>
      </div>

      {/* Form Inputs */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-6
          gap-3 sm:gap-4 lg:gap-1 
          h-12
          "
      >
        {activeTab === "vip" ? (
          <>
            {/* <IconInput
              icon={<Plane />}
              placeholder="Select Airport"
              className="col-span-2"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-l-xl lg:h-full col-span-2"
              /> */}
            <SearchWithDropdown
              id="firstName"
              placeholder="First Name"
              // className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              className=" h-full bg-white rounded-lg lg:rounded-none lg:rounded-l-xl lg:h-full col-span-2"
            />
            {/* <Autocomplete
              icon={<Plane />}
              placeholder="Select Airport"
              className="col-span-2"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-l-xl lg:h-full col-span-2"
              // options={airports}
              onSelect={(airport) => console.log("Selected:", airport)}
            /> */}
            <Input
              placeholder="Service Type"
              className="bg-white col-span-2 lg:col-span-1 rounded-lg lg:rounded-none lg:h-full"
            />
            <IconInput
              icon={<Calender />}
              placeholder="Select Date"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
            {/* <DatePickerWithIconDemo /> */}
            <IconInput
              icon={<Adults />}
              type="number"
              placeholder="1 Adult - 0 Children"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
          </>
        ) : (
          <>
            {/* <IconInput
              icon={<Plane />}
              placeholder="Select Airport"
              className="col-span-2"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-l-2xl lg:h-full col-span-2"
            /> */}
            <SearchWithDropdown
              id="firstName"
              placeholder="First Name"
              // className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              className=" h-full bg-white rounded-lg lg:rounded-none lg:rounded-l-xl lg:h-full col-span-2"
            />
            <Input
              placeholder="Service Type"
              className="bg-white rounded-lg lg:rounded-none lg:h-full "
            />
            <IconInput
              icon={<Calender />}
              placeholder="Select Date"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
            {/* <DatePickerWithIconDemo /> */}
            <IconInput
              icon={<Adults />}
              placeholder="1 Adult - 0 Children"
              inputClassName="bg-white rounded-lg lg:rounded-none lg:rounded-none lg:h-full"
            />
          </>
        )}

        <Button
          className="
            w-full 
            h-full
            rounded-lg lg:rounded-none lg:rounded-r-xl 
            border text-lg font-light border-white/30 text-white 
            px-6 py-3
            bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:opacity-90 
            mt-2 sm:mt-0 col-span-2 lg:col-span-1
            cursor-pointer
          "
        >
          <p className="text-normal font-light">BOOK NOW</p>
        </Button>
      </div>
    </Card>
  );
}
