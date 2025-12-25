"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { DatePickerWithIconDemo } from "./DateTimeInputs";

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<"vip" | "chauffeur-services">(
    "vip"
  );

  return (
    <Card
      className="
        backdrop-blur-md bg-white/10 border-white/20 
        w-full 
        p-6 sm:p-10 lg:p-12 
        mt-8 md:mt-12
      "
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
            text-white font-medium text-base sm:text-lg
            hover:bg-transparent
            hover:text-[#AB9B90]
          "
        >
          VIP Meet & Greet Service
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-1 rounded-full transition-opacity duration-300",
              activeTab === "vip"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
                : "opacity-0"
            )}
          />
        </Button>

        <span className="inline-block w-px h-7 rounded-3xl bg-white/40"></span>

        <Button
          variant={"ghost"}
          onClick={() => setActiveTab("chauffeur-services")}
          className="
            cursor-pointer relative px-3 sm:px-4 py-2 
            text-white font-medium text-base sm:text-lg
            hover:bg-transparent
            hover:text-[#AB9B90]
          "
        >
          Chauffeur Services
          <span
            className={clsx(
              "absolute left-0 right-0 -bottom-2 h-1 rounded-full transition-opacity duration-300",
              activeTab === "chauffeur-services"
                ? "opacity-100 bg-linear-to-r from-[#99785F00]/0 via-[#AB9B90] to-[#99785F00]/0"
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
          lg:grid-cols-5
          gap-3 sm:gap-4 lg:gap-1 
          mt-6
        "
      >
        {activeTab === "vip" ? (
          <>
            <Input
              placeholder="From Airport"
              className="bg-white rounded-xl lg:rounded-none lg:rounded-l-3xl lg:h-full"
            />
            <Input placeholder="Drop Off" className="bg-white rounded-xl lg:rounded-none lg:h-full" />
            <DatePickerWithIconDemo />
            <Input
              type="number"
              placeholder="Pickup Time"
              className="bg-white rounded-xl h-full lg:rounded-none "
            />
          </>
        ) : (
          <>
            <Input
              placeholder="From"
              className="bg-white lg:h-full rounded-xl lg:rounded-none lg:rounded-l-3xl"
            />
            <Input placeholder="To" className="bg-white lg:h-full rounded-xl lg:rounded-none" />
            <DatePickerWithIconDemo />
            <Input
              type="number"
              placeholder="Pickup Time"
              className="bg-white rounded-xl h-full lg:rounded-none "
            />
          </>
        )}

        <Button
          className="
            w-full 
            h-full
            rounded-xl lg:rounded-none lg:rounded-r-3xl 
            border text-lg font-light border-white/30 text-white 
            px-6 py-3 
            bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:opacity-90 
            mt-2 sm:mt-0 col-span-2 lg:col-span-1
          "
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}
