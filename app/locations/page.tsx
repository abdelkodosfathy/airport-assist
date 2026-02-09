"use client";

import { PrivateSuites } from "@/components/sections";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Search } from "lucide-react";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";
import CardsList from "./CardsList";
import AirportSearchInput from "@/components/AirportSearchInput";
import { useState } from "react";
import { OptionType } from "@/components/custom inputs/search";
import { useRouter } from "next/navigation";

export default function Locations() {
  const [selectedAirportID, setSelectedAirportID] = useState<string>();
  const router = useRouter();

  const handleAirportSelect = (option: OptionType) => {
    setSelectedAirportID(option.value);
  };

  const handleSearch = () => {
    if (!selectedAirportID) return;

    router.push(`/locations/airport?airport=${selectedAirportID}`);
  };
  return (
    <main className="relative font-[Manrope] max-w-screen overflow-hidden">
      <Header />
      <section className="relative w-full h-114 text-white flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover object-[50%_20%] w-full h-full"
            priority
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          <h1 className=" font-[Manrope] text-[30px] leading-[130%] tracking-[3px] text-center mb-4.25">
            Premium Airport Meet & Greet Services
          </h1>

          <p className=" font-[Manrope] font-normal text-[24px] text-center text-[rgb(200,200,200)]">
            Available in the following locations.
          </p>
          <div className="relative lg:w-[820px] xl:w-[960px] px-4">
            <AirportSearchInput
              onSelect={handleAirportSelect}
              inputClassName="p-4 pl-10 rounded-lg w-full lg:w-[820px] xl:w-[960px] text-black"
              className="bg-white text-black rounded-md mt-4 relative w-full flex items-center"
            />

            <Button
              variant="ghost"
              className="absolute right-12 top-1/2 -translate-y-1/2 w-fit h-fit"
              onClick={handleSearch}
              disabled={!selectedAirportID}
            >
              <Search color="gray" />
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="mb-12.5 w-full ">
          <h2 className="font-normal text-[30px] leading-[128%] tracking-[7.5px] text-center uppercase mb-4">
            Airport Assist meet & greet
          </h2>
          <p className="font-normal text-[18.75px] max-w-250 mx-auto leading-[128%] tracking-[7.5px] text-center uppercase">
            From boarding to arrival, every moment is professionally handled.
          </p>
        </div>
        <div>
          <div>
            <p className="font-medium text-[#8E8E93] text-[15.53px] leading-[130%] tracking-normal mb-4">
              Choose how to travel
            </p>
            <h4 className="font-normal text-[22.5px] leading-[128%] tracking-[7.5px] mb-7 uppercase">
              Popular Destinations
            </h4>
          </div>
          <CardsList />
        </div>
      </section>
      <PrivateSuites />
      <section className="min-h-[400px] md:min-h-[500px] lg:min-h-118.75 gap-4 flex items-center px-6 sm:px-10 md:px-16 lg:px-26 py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="w-full max-w-360 mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-6 md:gap-8 lg:gap-10">
          {/* Left Text */}
          <div className="flex-2 w-full lg:w-auto">
            <h2 className="uppercase flex flex-col tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] leading-[130%] md:leading-[150%] text-xl sm:text-2xl md:text-3xl whitespace-normal justify-start">
              <span>EXCLUSIVE TIERS THAT TAKE</span>
              <span>YOU BEYOND</span>
            </h2>
          </div>

          {/* Right Text */}
          <div className="flex-1 w-full lg:w-auto">
            <p className="font-[Manrope] font-normal max-w-full lg:max-w-90 text-sm md:text-base leading-[150%] text-[#959595] mb-4 md:mb-6">
              Airport Assist concierge services welcome all travellers, while
              our exclusive plans unlock the service's most refined and
              personalised experience.
            </p>
            <Button
              variant="outline"
              className="w-full sm:w-auto min-w-[140px] rounded-xl py-4 md:py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <p>Contact Us</p>
              <ArrowUpRight className="size-4 md:size-5" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
