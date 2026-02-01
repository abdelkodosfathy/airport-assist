"use client";

import ChooseService from "./components/choose-service";
import SideInfo from "./components/side-info";
import ContinueButton from "./components/Continue";
import { Package } from "@/lib/types/package";
import { useState } from "react";

export default function ChooseServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState<Package>();
  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>
      <div className="flex gap-4">
        {/* <ChooseService /> */}
        <ChooseService
          // selectedPackage={selectedPackage}
          // setSelectedPackage={setSelectedPackage}
        />

        <SideInfo />
      </div>
      {/* <ContinueButton selectedPackage={selectedPackage} /> */}
      <ContinueButton />
    </>
  );
}
