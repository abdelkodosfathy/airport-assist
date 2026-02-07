// "use client";

// import ChooseService from "./components/choose-service";
// import SideInfo from "./components/side-info";
// import ContinueButton from "./components/Continue";
// import { Package } from "@/lib/types/package";
// import { useEffect, useState } from "react";

// export default function ChooseServicesPage() {
//   const [airportNumber, setAirportNumber] = useState<string | null>(null);
//   const [airportName, setAirportName] = useState<string | null>(null);
//   const [serviceType, setServiceType] = useState<string | null>(null);
//   const [date, setDate] = useState<string | null>(null);
//   const [adults, setAdults] = useState<number>(1);
//   const [children, setChildren] = useState<number>(0);

//   const [pickUp, setPickUp] = useState<string | null>(null);
//   const [dropOff, setDropOff] = useState<string | null>(null);
//   const [time, setTime] = useState<string | null>(null);

//   useEffect(() => {
//     const vipBookingData = sessionStorage.getItem("vipBooking");
//     if (vipBookingData) {
//       const data = JSON.parse(vipBookingData);
//       setAirportNumber(data.airport_id?.toString() || null);
//       setAirportName(data.airport_name || null);
//       setServiceType(data.serviceType || null);
//       setAdults(data.adults || 1);
//       setChildren(data.children || 0);
//       setDate(data.date || null);

//       setPickUp(data.pickUp || null);
//       setDropOff(data.dropOff || null);
//       setTime(data.time || null);
//     }
//   }, []);

//   return (
//     <>
//       <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
//         Choose how to travel
//       </p>
//       <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
//         Services Level Available
//       </h2>
//       <div className="flex gap-4">
//         <ChooseService />

//         <SideInfo />
//       </div>
//       <ContinueButton />
//     </>
//   );
// }

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

  useEffect(() => {
    const vipBookingData = sessionStorage.getItem("vipBooking");
    if (vipBookingData) {
      setBookingData(JSON.parse(vipBookingData));
    }
  }, []);

  if (!bookingData) return null;

  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>
      <div className="flex gap-4">
        <ChooseService bookingData={bookingData} />
        <SideInfo bookingData={bookingData} />
      </div>
      <ContinueButton />
    </>
  );
}