"use client";

import { PrivateSuites } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import CardsList from "./CardsList";

export default function Locations() {

  return (
    <>
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
    </>
  );
}
