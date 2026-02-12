"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SideInfo from "../components/side-info";
import { useState } from "react";
import ChauffeurServices from "./components/ChauffeurServices";
import ChauffeurServicesCars from "./components/ChaffeurServicesCars";
import FlightForm from "./components/FlightForm";
import PrimaryPassengerForm from "./components/PrimaryPassengerForm";
import AdditionalServices from "./components/AdditionalServices";
import { Car } from "@/lib/types/car";

enum Steps {
  Flight = 2,
  Passenger = 3,
  Chauffeur = 4,
  Additional = 5,
}

export default function FlightInformation() {
  // ======= change steps (UI) =======
  const [selectedCarData, setSelectedCarData] = useState<Car>();
  
  const [currentStep, setCurrentStep] = useState(1);
  const handleStepChange = (step: number) => {
    setCurrentStep(step - 1);
  };

  return (
    <div className="">
      <Link
        href={"/meet-and-greet"}
        className="flex gap-2 mb-2 text-[#8E8E93] w-fit"
      >
        <ArrowLeft />
        <p> back to Choose Service</p>
      </Link>
      <div className="flex gap-4">
        {/* <form onSubmit={handleSubmit} className="flex-2 space-y-4 h-auto"> */}
        <form className="flex-2 space-y-4 h-auto">
          <FlightForm onFocus={() => handleStepChange(Steps.Flight)} />
          <PrimaryPassengerForm onFocus={() => handleStepChange(Steps.Passenger)}/>
          <ChauffeurServicesCars selectCar={setSelectedCarData} onFocus={() => handleStepChange(Steps.Chauffeur)}/>
          <ChauffeurServices selectedCar={selectedCarData || undefined} onFocus={() => handleStepChange(Steps.Chauffeur)}/>
            
          <AdditionalServices onFocus={() => handleStepChange(Steps.Additional)}/>
        </form>
        <SideInfo focusedStep={currentStep} />
      </div>
      <Button
        asChild
        variant="outline"
        className=" mt-6 w-max  cursor-pointer  border-black  text-black  hover:border-[#664F31]   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]  hover:text-white  duration-0"
      >
        <Link href="/meet-and-greet/flight-information/billing-information">
          <p className="text-lg font-normal font-[Manrope]">Continue</p>
        </Link>
      </Button>
    </div>
  );
}

