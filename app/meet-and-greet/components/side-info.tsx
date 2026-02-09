"use client";

import Adults from "@/components/custom icons/adults";
import Arraival from "@/components/custom icons/arraival";
import Calender from "@/components/custom icons/calender";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { VipBookingData } from "../page";
import Steps from "./steps";

const SideInfoContent = ({
  isElite,
  focusedStep = 1,
}: {
  isElite?: boolean;
  focusedStep?: number;
}) => {
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const isMainPage = pathname === "/meet-and-greet";

  // // Get URL parameters
  // const airportNumber = searchParams.get("airport_id");
  // const airportName = searchParams.get("airport_name");
  // // const airport = searchParams.get("airport");
  // const serviceType = searchParams.get("serviceType");
  // const date = searchParams.get("date");
  // const adults = searchParams.get("adults") || "1";
  // const children = searchParams.get("children") || "0";

  // // For chauffeur services
  // const pickUp = searchParams.get("pickUp");
  // const dropOff = searchParams.get("dropOff");
  // const time = searchParams.get("time");
  const [airportNumber, setAirportNumber] = useState<string | null>(null);
  const [airportName, setAirportName] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [adults, setAdults] = useState<string>("1");
  const [children, setChildren] = useState<string>("0");
  const [pickUp, setPickUp] = useState<string | null>(null);
  const [dropOff, setDropOff] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const vipBookingData = sessionStorage.getItem("vipBooking");
    if (vipBookingData) {
      const data = JSON.parse(vipBookingData);
      setAirportNumber(data.airport_id?.toString() || null);
      setAirportName(data.airport_name || null);
      setServiceType(data.serviceType || null);
      setAdults(data.adults?.toString() || "1");
      setChildren(data.children?.toString() || "0");
      setDate(data.date || null);

      setPickUp(data.pickUp || null);
      setDropOff(data.dropOff || null);
      setTime(data.time || null);
    }
  }, []);


  console.log("rendered SideInfoContent: ", isElite);

  // You might want to fetch airport name based on ID
  // For now, displaying the raw values
  const displayAirport = airportNumber
    ? `Airport: ${airportName}`
    : "No airport selected";
  const displayServiceType = serviceType
    ? `Service: ${serviceType}`
    : "Elite Package";
  const displayDate = date || "30 Nov 2025";

  return (
    <div className="h-full flex-1 space-y-4 sticky top-26">
      <div className="bg-[#7B5A411C] rounded-2xl p-5">
        <h4 className="font-[Manrope]">Quote for {displayServiceType}</h4>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          <li className="text-[#62697D] my-2">{displayAirport}</li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Arraival /> Arrival
          </li>
          <li className="flex gap-2 items-center text-[#62697D]">
            <Calender /> {displayDate}
          </li>
          {pickUp && <li className="text-[#62697D] my-2">Pick up: {pickUp}</li>}
          {dropOff && (
            <li className="text-[#62697D] my-2">Drop off: {dropOff}</li>
          )}

          {time && (
            <li className="flex gap-2 items-center text-[#62697D]">
              Time: {time}
            </li>
          )}
        </ul>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <ul className="space-y-3">
          {parseInt(adults) > 0 && (
            <li className="flex gap-2 items-center font-semibold text-[#62697D]">
              <Adults /> {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
            </li>
          )}
          {parseInt(children) > 0 && (
            <li className="flex gap-2 items-center font-semibold text-[#62697D]">
              <Adults /> {children}{" "}
              {parseInt(children) === 1 ? "Child" : "Children"}
            </li>
          )}
        </ul>
        <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
        <p className="flex justify-between font-semibold">
          Total: <span>100$</span>
        </p>
      </div>
      <Steps isElite={isElite} currentStep={isMainPage ? 0 : focusedStep} />
      {isMainPage && (
        <div className="bg-white rounded-2xl p-5">
          <h4 className="font-[Manrope] font-semibold">
            Need more information?
          </h4>
          <p className="text-sm text-[#7a7a7a] leading-[27px]">
            Our dedicated team are available to discuss all aspects of our
            service.
          </p>
          <ul className="text-[#7a7a7a] space-y-2 mt-2">
            <li className="flex gap-2">
              <Mail />
              <p>Contact@airport-assist.com</p>
            </li>
            <li className="flex gap-2">
              <Mail />
              <p>+44 20 4517 7711</p>
            </li>
            <li className="flex gap-2">
              <Mail />
              <p>Contact us via WhatsApp</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Wrap with Suspense boundary
const SideInfo = ({
  focusedStep = 1,
  isElite,
}: {
  bookingData?: VipBookingData;
  focusedStep?: number;
  isElite?: boolean;
}) => {

  console.log("SideInfo ", isElite);
  return (
    <Suspense fallback={<SideInfoSkeleton />}>
      <SideInfoContent isElite={isElite} focusedStep={focusedStep} />
    </Suspense>
  );
};

// Loading skeleton while params are being read
const SideInfoSkeleton = () => {
  return (
    <div className="h-full flex-1 space-y-4 sticky top-4">
      <div className="bg-[#7B5A411C] rounded-2xl p-5 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SideInfo;

// const Steps = ({
//   currentStep = 0,
//   isElite = false,
// }: {
//   isElite?: boolean;
//   currentStep: number;
// }) => {

  
  
//   const steps = [
//     "Choose Service",
//     "Flight Information",
//     "Primary passenger",
//     ...((isElite) ? [] : ["Chauffeur Services"]),
//     "Additional Services",
//     "Billing Information",
//   ];
//   return (
//     <div className="bg-white rounded-2xl p-5">
//       <h4 className="font-[Manrope] font-semibold">Steps</h4>
//       <ul className="space-y-2 mt-2">
//         {steps.map((step, i) => {
//           return (
//             <li
//               key={step}
//               className={`p-2 flex items-center ${
//                 i === currentStep ? "bg-[#7B5A4133]" : ""
//               } rounded-md`}
//             >
//               <p>
//                 <span
//                   className={`inline-block text-center rounded-full w-6 h-6 mr-2 ${
//                     i === currentStep
//                       ? "bg-[#7B5A41] text-white"
//                       : "bg-[#F4F4F4] text-[#7a7a7a]"
//                   }`}
//                 >
//                   {i + 1}
//                 </span>
//                 {step}
//               </p>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
