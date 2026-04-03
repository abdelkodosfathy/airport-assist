"use client";

import { useEffect } from "react";
import SideInformationCard from "../side-informatio-card"; // SideInformationCardRef,
import { Button } from "@/components/ui/button";
import Steps from "../components/steps";
import FlightSection from "../components/flight-section";
import { useSingleAirportStore } from "@/store/vipInputsStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
export type currentPage = "packages" | "flight" | "billing" | "summry";

const Page = () => {
  const storedAirport = useSingleAirportStore((state) => state.singleAirport);

  const router = useRouter();
  useEffect(() => {
    if (!storedAirport) {
      router.replace("/");
    }
  }, [storedAirport, router]);

  if (!storedAirport) return null;

  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>

      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>

      <Steps currentPage="flight" />

      <div className="flex gap-4 capitalize">
        {/* airportResponse && */}
        {<FlightSection />}

        <SideInformationCard />
        {/* )} */}
      </div>

      <div className="flex gap-4">
        <Button
          asChild
          type="button"
          variant="outline"
          className="mt-6 w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
        >
          <Link href="/vip-meet-and-greet/billing-info">
            <p className="text-lg font-normal font-[Manrope]">Continue</p>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Page;
