// app/choose-services/page.tsx

import ChooseService from "./components/choose-service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SideInfo from "./components/side-info";


export default function ChooseServicesPage() {
  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>
      <div className="flex gap-4">
        <ChooseService />
        <SideInfo />
      </div>
      <Button
        asChild
        variant="outline"
        className="
             mt-6
             w-max 
             cursor-pointer 
             border-black 
             text-black 
             hover:border-[#664F31]  
             hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
             hover:text-white 
             duration-0
           "
      >
        <Link href="/choose-services/flight-information">
          <p className="text-lg font-normal font-[Manrope]">Continue</p>
        </Link>
      </Button>
    </>
  );
}
