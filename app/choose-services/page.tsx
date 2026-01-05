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

// export const SideInfo = () => (
//   <div className="h-full flex-1 space-y-4">
//     <div className="bg-[#7B5A411C] rounded-2xl p-5">
//       <h4 className="font-[Manrope]">Quote for Elite Package</h4>
//       <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
//       <ul className="space-y-3">
//         <li className="text-[#62697D] my-2">London Gatwick Airport - LGW</li>
//         <li className="flex gap-2 items-center text-[#62697D]">
//           <Arraival /> Arraival
//         </li>
//         <li className="flex gap-2 items-center text-[#62697D]">
//           <Calender /> 30 Nov 2025
//         </li>
//       </ul>
//       <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
//       <ul className="space-y-3">
//         <li className="flex gap-2 items-center font-semibold text-[#62697D]">
//           <Adults /> 1 Adult
//         </li>
//         <li className="flex gap-2 items-center font-semibold text-[#62697D]">
//           <Adults /> 2 Children
//         </li>
//       </ul>
//       <span className="block w-full h-0.5 my-2 bg-[#CFCFCF]"></span>
//       <p className="flex justify-between font-semibold">
//         Total: <span>100$</span>
//       </p>
//     </div>

//     <div className="bg-white rounded-2xl p-5">
//       <h4 className="font-[Manrope] font-semibold">Steps</h4>
//       <ul className="space-y-2 mt-2">
//         <li className="p-2 flex items-center bg-[#7B5A4133] rounded-md">
//           <p>
//             <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#7B5A41] text-white">
//               1
//             </span>{" "}
//             Choose Service
//           </p>
//         </li>
//         <li className="p-2 flex items-center">
//           <p>
//             <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
//               2
//             </span>
//             Flight Information
//           </p>
//         </li>
//         <li className="p-2 flex items-center">
//           <p>
//             <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
//               3
//             </span>
//             Passengers details
//           </p>
//         </li>
//         <li className="p-2 flex items-center">
//           <p>
//             <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
//               4
//             </span>
//             Additional Services
//           </p>
//         </li>
//         <li className="p-2 flex items-center">
//           <p>
//             <span className="inline-block text-center rounded-full w-6 h-6 mr-2 bg-[#F4F4F4] text-[#7a7a7a]">
//               5
//             </span>
//             Billing Information
//           </p>
//         </li>
//       </ul>
//     </div>

//     <div className="bg-white rounded-2xl p-5">
//       <h4 className="font-[Manrope] font-semibold">Need more information?</h4>
//       <p className="text-sm text-[#7a7a7a] leading-[27px]">
//         Our dedicated team are available to discuss all aspects of our service.
//       </p>
//       <ul className="text-[#7a7a7a] space-y-2 mt-2">
//         <li className="flex gap-2">
//           <Mail />
//           <p>Contact@airport-assist.com</p>
//         </li>
//         <li className="flex gap-2">
//           <Mail />
//           <p>+44 20 4517 7711</p>
//         </li>
//         <li className="flex gap-2">
//           <Mail />
//           <p>Contact us via WhatsApp</p>
//         </li>
//       </ul>
//     </div>
//   </div>
// );

