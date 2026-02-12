"use client";

import saloon from "@/public/sections/saloon.jpg";
import {
  Baggage,
  Exiting,
  FastTrack,
  Person,
} from "@/components/custom icons/service-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
// import { Service } from "@/types/service";
// import { Package } from "@/lib/types/package";
import { AirportPackage } from "@/lib/types/airport";
// import { VipBookingData } from "../page";

interface ServiceCardProps {
  service: AirportPackage;
  selectedService?: boolean;
  AirportCost: number;
  adults_count: number;
  child_count: number;
  // bookingData: VipBookingData;
  onSelect: (slug:string, packageCost: number) => void; // pass the value on selection
}

export default function ServiceCard({
  // bookingData,
  AirportCost,
  adults_count,
  child_count,
  service,
  selectedService,
  onSelect,
}: ServiceCardProps) {
  const [showMore, setShowMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Animate on showMore toggle
  useEffect(() => {
    if (!detailsRef.current) return;

    if (showMore) {
      // Expand section
      gsap.to(detailsRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      // Collapse section
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [showMore]);

  const getAdditionalAdultsCost = () => {
    if (adults_count > service.included_adults_count) {
      return (
        (adults_count - service.included_adults_count) *
        service.additional_adult_cost
      );
    }
    return 0;
  };
  const prices = {
    adult_cost: service.adult_cost,
    child_cost: service.child_cost * child_count,
    additional_adult_cost: getAdditionalAdultsCost(),
  };

  const packageCost =
    prices.additional_adult_cost +
    prices.adult_cost +
    prices.child_cost +
    AirportCost;


    
  return (
    <div className="*:font-[Manrope] mt-8 rounded-xl p-3 bg-[#F4F4F4] border border-[#E0E0E0]">
      {/* Top Section */}
      <div className="flex gap-4">
        <div className="p-2 flex-2 flex flex-col">
          <div className="flex justify-between items-center">
            <div
              onClick={() => {
                const slug = service.package.package_slug;
                onSelect(slug, packageCost)
              }}
              className="cursor-pointer flex gap-2 items-center"
            >
              {/* <Radio selected={service.package_slug === selectedService} /> */}
              <Radio
                selected={selectedService}
              />
              <div>
                <p className="font-semibold">{service.package.package_name}</p>
                <p className="text-[#7B5A41] text-sm">
                  {service.package.package_description}
                </p>
              </div>
            </div>
            <div className="w-fit py-1 px-2 h-fit rounded-md font-semibold text-lg bg-[#7B5A411F] text-[#7B5A41]">
              {/* {totalPrice} $ */}
              {packageCost.toFixed(2)}$
            </div>
          </div>
          <span className="my-2 h-px bg-[#CFCFCF] w-full" />
          <p className="text-sm text-[#7A7A7A]">
            Seamless airport experience, breeze through terminals effortlessly
            Seamless
          </p>
        </div>
        <div className="flex-1">
          <Image
            src={saloon}
            className="rounded-lg"
            width={249.25}
            height={139.81}
            alt=""
          />
        </div>
      </div>

      {/* Hidable Section */}
      <div
        ref={detailsRef}
        className="mt-6 mb-4 grid grid-cols-2 gap-4 overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <Person />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Personal Greeting
            </p>
            <p className="text-sm text-[#7A7A7A]">
              at the arrival gate with a name sign
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <Person />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Personal Greeting
            </p>
            <p className="text-sm text-[#7A7A7A]">
              at the arrival gate with a name sign
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <Person />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Personal Greeting
            </p>
            <p className="text-sm text-[#7A7A7A]">
              at the arrival gate with a name sign
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <Person />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Personal Greeting
            </p>
            <p className="text-sm text-[#7A7A7A]">
              at the arrival gate with a name sign
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <FastTrack />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Fast Track - Special lane{" "}
            </p>
            <p className="text-sm text-[#7A7A7A]">
              through the airport formalities
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <Baggage />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Baggage Handling
            </p>
            <p className="text-sm text-[#7A7A7A]">
              luggage assistance upon request
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
            <Exiting />
          </div>
          <div className="space-y-1">
            <p className="tracking-0 font-[Manrope] font-bold">
              Airport Exiting
            </p>
            <p className="text-sm text-[#7A7A7A]">
              accompanying to the curbside
            </p>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant={showMore ? "outline" : "default"} // outline when open
        style={
          showMore
            ? {
                border: "1px solid #000",
                color: "#000",
                background: "transparent",
              }
            : {
                background:
                  "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
                border: "1.26px solid #966B4B",
              }
        }
        className={`cursor-pointer h-7 font-[Manrope] font-normal py-0 rounded-full mt-2 ${
          showMore ? "border-black text-black" : "border-[#966B4B] text-white"
        }`}
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Hide info" : "Show More >"}
      </Button>
    </div>
  );
}

interface RadioProps {
  selected?: boolean;
}

function Radio({ selected }: RadioProps) {
  return (
    <div
      className={`min-w-6 min-h-6 rounded-full border-2 flex items-center justify-center border-[#7A7A7A] cursor-pointer`}
    >
      {selected && <span className="w-4 h-4 rounded-full bg-[#7A7A7A]"></span>}
    </div>
  );
}
