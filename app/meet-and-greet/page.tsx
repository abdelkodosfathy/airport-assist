"use client";

import ChooseService from "./components/choose-service";
import SideInfo from "./components/side-info";
import ContinueButton from "./components/Continue";
import { useEffect, useState } from "react";

export interface VipBookingData {
  airport_id: number;
  airport_name: string;
  serviceType: string;
  date: string;
  adults: number;
  children: number;
  pickUp?: string;
  dropOff?: string;
  time?: string;
}

export default function ChooseServicesPage() {
  const [bookingData, setBookingData] = useState<VipBookingData | null>(null);
  const [isElite, setIsElite] = useState<boolean>(false);

  useEffect(() => {
    const storedPackage = sessionStorage.getItem("vipSelectedPackage"); //for initial value if there is one

    if (storedPackage !== "elite") {
      setIsElite(false);
    } else {
      setIsElite(true);
    }
    const vipBookingData = sessionStorage.getItem("vipBooking");
    if (vipBookingData) {
      setBookingData(JSON.parse(vipBookingData));
    }
  }, []);

  if (!bookingData) return null;

  console.log("renderd the state: ", isElite);

  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>
      <div className="flex gap-4">
        <ChooseService
          onSelectElitePackage={(value: boolean) => {
            setIsElite(value);
          }}
          bookingData={bookingData}
        />
        <SideInfo isElite={isElite} bookingData={bookingData} />
      </div>
      <ContinueButton />
    </>
  );
}
