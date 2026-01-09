"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import car1 from "@/public/car1.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SearchWithDropdown from "@/components/custom inputs/search";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDownToLineIcon,
  ArrowLeft,
  Clock4,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import SideInfo from "../components/side-info";
import { useState } from "react";
import InnerToast from "@/components/ui/InnerToast";

enum Steps {
  Flight = 2,
  Passenger = 3,
  Chauffeur = 4,
  Additional = 5,
}

export default function FlightInformation() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step: number) => {
    setCurrentStep(step - 1);
  };

  console.log(currentStep);

  return (
    <div className="">
      <Link
        href={"/choose-services"}
        className="flex gap-2 mb-2 text-[#8E8E93]"
      >
        <ArrowLeft />
        <p> back to Choose Service</p>
      </Link>
      <div className="flex gap-4">
        <form className="flex-2 space-y-4 h-auto">
          <FlightForm onFocus={() => handleStepChange(Steps.Flight)} />
          <PrimaryPassengerForm
            onFocus={() => handleStepChange(Steps.Passenger)}
          />
          <ChauffeurServices
            onFocus={() => handleStepChange(Steps.Chauffeur)}
          />
          <AdditionalServices
            onFocus={() => handleStepChange(Steps.Additional)}
          />
        </form>
        <SideInfo focusedStep={currentStep} />
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
        <Link href="/choose-services/flight-information/billing-information">
          <p className="text-lg font-normal font-[Manrope]">Continue</p>
        </Link>
      </Button>
    </div>
  );
}

interface StepsProps {
  onFocus?: () => void;
}

const FlightForm = ({ onFocus }: StepsProps) => {
  return (
    <div
      onClick={() => {
        onFocus?.();
      }}
      className="px-10 py-6 bg-white rounded-2xl"
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Flight Information
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 space-y-6 grid grid-cols-2 grid-rows-2 gap-x-6 w-full">
        {/* Airline */}
        <div className=" space-y-2">
          <Label htmlFor="Airline">Airline</Label>
          <SearchWithDropdown
            className="h-9 rounded-md"
            id="Airline"
            inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            placeholder="Choose Airline"
          />
        </div>

        {/* Flight Number */}
        <div className="space-y-2">
          <Label htmlFor="flightNumber">Flight Number</Label>
          <Input
            id="flightNumber"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            placeholder="BA 777"
          />
        </div>

        {/* Arrival Time */}
        <div className="space-y-2">
          <Label htmlFor="arrivalTime">Arrival Time</Label>
          <Input
            id="arrivalTime"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            type="time"
            placeholder="Choose Arrival Time"
          />
        </div>

        {/* Service Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration">Service Duration</Label>
          <Input
            id="duration"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>

        {/* Fast Track Checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="fastTrack"
            className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
          />
          <Label
            htmlFor="fastTrack"
            className="font-medium leading-relaxed cursor-pointer"
          >
            Include Fast Track Service <span>(+£25.00, Per PAX)</span>
          </Label>
        </div>
      </div>
    </div>
  );
};
const PrimaryPassengerForm = ({ onFocus }: StepsProps) => {
  return (
    <div
      onClick={() => {
        onFocus?.();
      }}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Primary passenger
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <SearchWithDropdown
              className="h-9 rounded-md"
              id="firstName"
              inputClassName="rounded-md pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              placeholder="First Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              id="dob"
              type="date"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelClass">Class of travel</Label>
            <Input
              id="travelClass"
              placeholder="Select"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email address"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Phone"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          {/* Full width */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="pages">Number Of Pages</Label>
            <Input
              id="pages"
              placeholder="Number Of Pages"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>
              Other passengers Information{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              placeholder="Passengers Information"
              className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const ChauffeurServices = ({ onFocus }: StepsProps) => {
  return (
    <div
      onClick={() => {
        onFocus?.();
      }}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      className="px-10 py-6 bg-white rounded-2xl"
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Chauffeur Services
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
      <div className="flex gap-4 items-center py-8">
        <Image alt="car image" src={car1} width={216} height={108.75} />
        <div>
          <p className="font-semibold">S -Class Mercedes</p>
          <p>
            <span className="font-semibold">Drop Off Address:</span> 1256
            Maidenhead Road SL6 1RN
          </p>
          <p>
            <span className="font-semibold">Destination:</span> 25.5 km / 19.3
            mi - 1hrs 20min{" "}
          </p>
        </div>
      </div>
      {/* <div className="mb-4 flex gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
        <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
          <Clock4 className="w-5 h-5 text-white" />
        </div>
        <p>Chauffeur will wait 15 minutes free of charge</p>
      </div> */}
      <InnerToast
        icon={
          <div className="min-w-6 min-h-6 w-6 h-6 bg-[#7B5A41] rounded-full grid place-content-center">
            <Clock4 className="w-5 h-5 text-white" />
          </div>
        }
        text="Chauffeur will wait 15 minutes free of charge"
      />

      <Button
        style={{
          background:
            "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
          border: "1.26px solid #966B4B",
        }}
        className={
          "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
        }
      >
        Remove
      </Button>
    </div>
  );
};
const AdditionalServices = ({ onFocus }: StepsProps) => {
  return (
    <div
      onClick={() => {
        onFocus?.();
      }}
      style={{
        boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
      }}
      // className="px-10 py-6 bg-white rounded-2xl cursor-not-allowed opacity-50"
      className="px-10 py-6 bg-white rounded-2xl "
    >
      <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
        Additional Services & Information
      </h4>
      <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
      <div className="space-y-4 mt-4">
        <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
          <p className="text-sm">
            Please download the passenger data form, fill it out, and upload it
            below:
          </p>
          <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
            <ArrowDownToLineIcon className="inline" /> Download passenger data
            file
          </p>
          <Button
            style={{
              background:
                "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
              border: "1.26px solid #966B4B",
            }}
            className={
              "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
            }
          >
            Choose File <UploadCloud />
          </Button>
        </div>
        <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
          <p className="text-sm">
            Please download the passenger data form, fill it out, and upload it
            below:
          </p>
          <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
            <ArrowDownToLineIcon className="inline" /> Download passenger data
            file
          </p>
          <Button
            style={{
              background:
                "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
              border: "1.26px solid #966B4B",
            }}
            className={
              "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
            }
          >
            Choose File <UploadCloud />
          </Button>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="wheelchair"
            className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
          />
          <Label
            htmlFor="wheelchair"
            className="text-sm leading-relaxed cursor-pointer"
          >
            Wheelchair requested from the airline
          </Label>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
          <div className="min-w-6 w-6 min-h-6 h-6 text-lg bg-[#7B5A41] rounded-full grid place-content-center">
            <p className="text-white">!</p>
          </div>
          <p>
            Wheelchair assistance must be arranged directly with your airline.
            By ticking this box, you confirm that you have selected wheelchair
            assistance on your flight booking.
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="gap-0">
            Additional requirements
            <span className="text-sm text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            placeholder="Any Special Notes"
            className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
          />
        </div>
      </div>
    </div>
  );
};
