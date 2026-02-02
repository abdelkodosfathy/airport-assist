// "use client";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// import { ArrowDownToLineIcon, ArrowLeft, UploadCloud } from "lucide-react";
// import Link from "next/link";
// import SideInfo from "../components/side-info";
// import { useEffect, useState } from "react";
// import ChauffeurServices from "./components/ChauffeurServices";
// import ChauffeurServicesCars from "./components/ChaffeurServicesCars";
// import FlightForm from "./components/FlightForm";
// import PrimaryPassengerForm from "./components/PrimaryPassengerForm";
// import { useSearchParams } from "next/navigation";

// enum Steps {
//   Flight = 2,
//   Passenger = 3,
//   Chauffeur = 4,
//   Additional = 5,
// }

// export default function FlightInformation() {
//   // ======= change steps (UI) =======
//   const [currentStep, setCurrentStep] = useState(1);
//   const handleStepChange = (step: number) => {
//     setCurrentStep(step - 1);
//   };

//   // ======= get data from the url parameters =======
//   const [paramFormData, setFormData] = useState<FormData | null>(null);

//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const fd = new FormData();

//     // read all params from URL
//     searchParams.forEach((value, key) => {
//       fd.append(key, value);
//     });

//     setFormData(fd);

//     // persist for next pages
//     sessionStorage.setItem(
//       "booking_form_data",
//       JSON.stringify(Object.fromEntries(fd.entries())),
//     );
//   }, [searchParams]);

//   // debug (optional)
//   useEffect(() => {
//     if (!paramFormData) return;
//     console.log("FormData from URL:");
//     for (const [key, value] of paramFormData.entries()) {
//       console.log(key, value);
//     }
//   }, [paramFormData]);

//   // ======= Submiting =======

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;
//     const formData = new FormData(form);

//     const bookingPayload = {
//       // ===== From URL params =====
//       airport_id: paramFormData?.get("airport_id"),
//       service_type: paramFormData?.get("serviceType"),
//       booking_timestamp: paramFormData?.get("date"),
//       adult_passengers: paramFormData?.get("adults"),
//       child_passengers: paramFormData?.get("child"),
//       inflant_passengers: 0, // always = 0
//       package_slug: paramFormData?.get("package_slug"),
//       user_notes: formData.get("additionalRequirements"),
//       number_of_bags: formData.get("number_of_bags"),
//       fast_track_enabled: formData.get("fastTrack") ? 1 : 0,
//       wheelchair_assistance: formData.get("wheelchair") ? 1 : 0,
//       additional_hours: formData.get("serviceDuration"),

//       // ===== Flight info =====
//       flight: {
//         airline_id: formData.get("airline"),
//         flight_number: formData.get("flightNumber"),
//         passenger_arrival_time: formData.get("arrivalTime"),
//       },


//       // ===== Passenger =====
//       passenger: {
//         first_name: formData.get("firstName"),
//         last_name: formData.get("lastName"),
//         phone: formData.get("phone"),
//         email: formData.get("email"),
//         birthdate: formData.get("birthdate"),
//         class: formData.get("travelClass"),
//         other_passengers: formData.get("user_notes"),
//         // passengers_data_file:
//         // tickets_files[0]:
//       },
//       car_type_id: formData.get("car_type_id"),
//     };

//     console.log("FINAL BOOKING PAYLOAD 👇");
//     console.log(bookingPayload);
//   }

  
//   return (
//     <div className="">
//       <Link
//         href={"/meet-and-greet"}
//         className="flex gap-2 mb-2 text-[#8E8E93] w-fit"
//       >
//         <ArrowLeft />
//         <p> back to Choose Service</p>
//       </Link>
//       <div className="flex gap-4">
//         {/* <form onSubmit={handleSubmit} className="flex-2 space-y-4 h-auto"> */}
//         <form className="flex-2 space-y-4 h-auto">
//           <FlightForm onFocus={() => handleStepChange(Steps.Flight)} />
//           <PrimaryPassengerForm
//             onFocus={() => handleStepChange(Steps.Passenger)}
//           />
//           <ChauffeurServicesCars
//             onFocus={() => handleStepChange(Steps.Chauffeur)}
//           />
          
//           <ChauffeurServices
//             onFocus={() => handleStepChange(Steps.Chauffeur)}
//           />
//           <AdditionalServices
//             onFocus={() => handleStepChange(Steps.Additional)}
//           />
//           <button type="submit">submit</button>
//         </form>
//         <SideInfo focusedStep={currentStep} />
//       </div>
//       <Button
//         asChild
//         variant="outline"
//         className=" mt-6 w-max  cursor-pointer  border-black  text-black  hover:border-[#664F31]   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]  hover:text-white  duration-0"
//       >
//         <Link href="/meet-and-greet/flight-information/billing-information">
//           <p className="text-lg font-normal font-[Manrope]">Continue</p>
//         </Link>
//       </Button>
//     </div>
//   );
// }

// interface StepsProps {
//   onFocus?: () => void;
// }

// const AdditionalServices = ({ onFocus }: StepsProps) => {
//   return (
//     <div
//       onClick={() => {
//         onFocus?.();
//       }}
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl "
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Additional Services & Information
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
//       <div className="space-y-4 mt-4">
//         <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
//           <p className="text-sm">
//             Please download the passenger data form, fill it out, and upload it
//             below:
//           </p>
//           <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
//             <ArrowDownToLineIcon className="inline" /> Download passenger data
//             file
//           </p>
//           <Button
//             style={{
//               background:
//                 "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//               border: "1.26px solid #966B4B",
//             }}
//             className={
//               "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
//             }
//           >
//             Choose File <UploadCloud />
//           </Button>
//         </div>
//         <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
//           <p className="text-sm">
//             Please download the passenger data form, fill it out, and upload it
//             below:
//           </p>
//           <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
//             <ArrowDownToLineIcon className="inline" /> Download passenger data
//             file
//           </p>
//           <Button
//             style={{
//               background:
//                 "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//               border: "1.26px solid #966B4B",
//             }}
//             className={
//               "cursor-pointer h-7 font-[Manrope] font-normal py-0 px-8 rounded-full mt-2 border-[#966B4B] text-white"
//             }
//           >
//             Choose File <UploadCloud />
//           </Button>
//         </div>
//         <div className="flex items-start gap-3">
//           <Checkbox
//             id="wheelchair"
//             name="wheelchair"
//             className="w-6 h-6 rounded-md bg-[#F4F4F4] data-[state=checked]:bg-[#664F31] data-[state=checked]:border-[#664F31]"
//           />
//           <Label
//             htmlFor="wheelchair"
//             className="text-sm leading-relaxed cursor-pointer"
//           >
//             Wheelchair requested from the airline
//           </Label>
//         </div>
//         <div className="flex items-center gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
//           <div className="min-w-6 w-6 min-h-6 h-6 text-lg bg-[#7B5A41] rounded-full grid place-content-center">
//             <p className="text-white">!</p>
//           </div>
//           <p>
//             Wheelchair assistance must be arranged directly with your airline.
//             By ticking this box, you confirm that you have selected wheelchair
//             assistance on your flight booking.
//           </p>
//         </div>

//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="additionalRequirements" className="gap-0">
//             Additional requirements
//             <span className="text-sm text-muted-foreground">(optional)</span>
//           </Label>
//           <Textarea
//             id="additionalRequirements"
//             name="additionalRequirements"
//             placeholder="Any Special Notes"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
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

