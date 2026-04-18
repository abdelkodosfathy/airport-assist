// import { CarSlider } from "@/lib/types/carSlider";
// import { Button } from "@/components/ui/button";
// import {
//   Briefcase,
//   Clock4,
//   Crown,
//   Droplet,
//   HandHelping,
//   Phone,
//   Sparkles,
//   UserCheck,
//   Users,
//   Wifi,
// } from "lucide-react";
// import { StaticImageData } from "next/image";
// import CarImageSlider from "./CarSlider";

// type Props = {
//   name: string;
//   sectionHeader: string;
//   className?: string;
//   dark?: boolean;
//   services: {
//     serviceName: string;
//     content: string;
//     image: StaticImageData;
//   }[];
//   cars: CarSlider[];
// };

// const Section = ({
//   name,
//   sectionHeader,
//   className,
//   cars,
//   dark = false,
// }: Props) => {
//   return (
//     <section
//       className={`font-[Manrope] ${dark ? "bg-[#1a1a1a]" : "bg-[#f7f7f6]"} py-20 ${className}`}
//     >
//       <div className="overflow-visible max-w-310 mx-auto mt-20 mb-26 relative">
//         {!dark && (
//           <>
//             <p className="text-[#8E8E93] font-medium text-[22px] mb-3.5">
//               {name}
//             </p>
//             <h2 className="font-normal text-[22.6px] mb-5 tracking-[7.06px] uppercase">
//               {sectionHeader}
//             </h2>
//           </>
//         )}
//         <div className="space-y-16">
//           {cars.map((car, i) => (
//             // <CarPreview key={car.id} car={car} left={i % 2 !== 0} />
//             <CarPreview key={car.id} car={car} left={i % 2 !== 0} dark={dark} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Section;
// interface CarPreviewProps {
//   left?: boolean;
// }

// interface CarPreviewProps {
//   car: CarSlider;
//   left?: boolean;
//   dark?: boolean;
// }

// const CarPreview = ({ car, left = false, dark = false }: CarPreviewProps) => {
//   return (
//     <div className={`relative ${dark ? "text-white" : "text-black"}`}>
//       <div
//         className={`${left ? "mr-auto" : "ml-auto"} w-[867px] p-[2px] ${
//           dark
//             ? "bg-[linear-gradient(170deg,#FFFFFF98_0%,#1a1a1a_10%,#1a1a1a_90%,#ffffff98_100%)]"
//             : "bg-[linear-gradient(125deg,#A16538a8_0%,#f4f4f2_10%,#f4f4f2_90%,#A16538a8_100%)]"
//         }`}
//       >
//         <div
//           className={`${dark ? "bg-[#1a1a1a]" : "bg-[#f4f4f2]"} py-8 flex justify-end`}
//         >
//           <div
//             className={`w-[470px] ${left ? "mr-auto ml-37.5" : "ml-auto mr-37.5"}`}
//           >
//             <h3
//               className={`mb-6 font-bold text-[25px] ${dark ? "text-white" : "text-black" }`}
//             >
//               {car.name}
//             </h3>
//             <p className="font-manrope mb-8 leading-[25px] text-[16px]">
//               {car.desc}
//             </p>

//             <div className="flex justify-between">
//               <div className="space-y-3 mb-4">
//                 <div className="flex gap-2">
//                   <Users className="text-[#7B5A41]" />
//                   <p>{car.passengers} passengers</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Briefcase className="text-[#7B5A41]" />
//                   <p>{car.luggage} luggage pieces</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <HandHelping className="text-[#7B5A41]" />
//                   <p className="">Luggage assist</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <UserCheck className="text-[#7B5A41]" />
//                   <p className="">Licensed chauffeurs</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Droplet className="text-[#7B5A41]" />
//                   <p className="">Complimentary water</p>
//                 </div>
//                 {/* باقي الـ features ثابتة */}
//               </div>
//               <div className="space-y-3 mb-4">
//                 <div className="flex gap-2">
//                   <Sparkles className="text-[#7B5A41]" />
//                   <p className="">Interior sanitizing</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Phone className="text-[#7B5A41]" />
//                   <p className="">Cell phone chargers</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Clock4 className="text-[#7B5A41]" />
//                   <p className="">Punctual service</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Crown className="text-[#7B5A41]" />
//                   <p className="">Luxury & Comfort</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Wifi className="text-[#7B5A41]" />
//                   <p className="">Complimentary Wi-Fi</p>
//                 </div>
//               </div>
//             </div>

//             <Button
//               variant="outline"
//               className={`w-max py-4 px-10 rounded-3xl duration-0
//               hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
//               hover:border-[#664F31]
//               border-black
//               text-black
//               hover:text-white
//               leading-10

//               `}
//             >
//               Select Now
//             </Button>
//           </div>
//         </div>

//         <CarImageSlider dark={dark} slides={car.slides} left={left} />
//       </div>
//     </div>
//   );
// };

import { CarSlider } from "@/lib/types/carSlider";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Clock4,
  Crown,
  Droplet,
  HandHelping,
  Phone,
  Sparkles,
  UserCheck,
  Users,
  Wifi,
} from "lucide-react";
import { StaticImageData } from "next/image";
import CarImageSlider from "./CarSlider";
import Link from "next/link";

type Props = {
  name: string;
  sectionHeader: string;
  className?: string;
  dark?: boolean;
  services: {
    serviceName: string;
    content: string;
    image: StaticImageData;
  }[];
  cars: CarSlider[];
};

const Section = ({
  name,
  sectionHeader,
  className,
  cars,
  dark = false,
}: Props) => {
  return (
    <section
      className={`font-[Manrope] ${dark ? "bg-[#1a1a1a]" : "bg-[#f7f7f6]"} py-10 md:py-16 lg:py-20 ${className}`}
    >
      <div className="overflow-visible max-w-310 mx-auto px-2 sm:px-6 md:px-8 mt-8 md:mt-14 lg:mt-20 mb-12 md:mb-18 lg:mb-26 relative">
        {!dark && (
          <>
            <p className="text-[#8E8E93] font-medium text-lg md:text-[22px] mb-3">
              {name}
            </p>
            <h2 className="font-normal text-lg md:text-[22.6px] mb-5 tracking-[4px] md:tracking-[7.06px] uppercase">
              {sectionHeader}
            </h2>
          </>
        )}
        <div className="space-y-10 md:space-y-16">
          {cars.map((car, i) => (
            <CarPreview key={car.id} car={car} left={i % 2 !== 0} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;

interface CarPreviewProps {
  car: CarSlider;
  left?: boolean;
  dark?: boolean;
}

const CarPreview = ({ car, left = false, dark = false }: CarPreviewProps) => {
  return (
    <div className={`relative ${dark ? "text-white" : "text-black"}`}>
      <div
        className={`w-full lg:w-[867px] ${left ? "lg:mr-auto" : "lg:ml-auto"} p-[2px] ${
          dark
            ? "bg-[linear-gradient(170deg,#FFFFFF98_0%,#1a1a1a_10%,#1a1a1a_90%,#ffffff98_100%)]"
            : "bg-[linear-gradient(125deg,#A16538a8_0%,#f4f4f2_10%,#f4f4f2_90%,#A16538a8_100%)]"
        }`}
      >
        <div
          className={`${dark ? "bg-[#1a1a1a]" : "bg-[#f4f4f2]"} py-6 md:py-8 flex flex-col lg:flex-row`}
        >
          {/* Image — shows first on mobile */}
          <div className="block lg:hidden w-full mb-6">
            <CarImageSlider dark={dark} slides={car.slides} left={false} />
          </div>

          {/* Text content */}
          <div
            className={`w-full lg:w-[470px] px-5 sm:px-8  ${
              left
                ? "ml-0 mr-auto xl:mr-auto xl:ml-37.5"
                : "mr-0 ml-auto xl:ml-auto xl:mr-37.5"
            }`}
          >
            <h3
              className={`mb-4 md:mb-6 font-bold text-xl md:text-[25px] ${dark ? "text-white" : "text-black"}`}
            >
              {car.name}
            </h3>
            <p className="font-manrope mb-6 md:mb-8 leading-[25px] text-sm md:text-[16px]">
              {car.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6 md:mb-8">
              <div className="flex gap-2 items-center">
                <Users className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">
                  {car.passengers} passengers
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Sparkles className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Interior sanitizing</p>
              </div>
              <div className="flex gap-2 items-center">
                <Briefcase className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">
                  {car.luggage} luggage pieces
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Cell phone chargers</p>
              </div>
              <div className="flex gap-2 items-center">
                <HandHelping className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Luggage assist</p>
              </div>
              <div className="flex gap-2 items-center">
                <Clock4 className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Punctual service</p>
              </div>
              <div className="flex gap-2 items-center">
                <UserCheck className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Licensed chauffeurs</p>
              </div>
              <div className="flex gap-2 items-center">
                <Crown className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Luxury & Comfort</p>
              </div>
              <div className="flex gap-2 items-center">
                <Droplet className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Complimentary water</p>
              </div>
              <div className="flex gap-2 items-center">
                <Wifi className="text-[#7B5A41] size-4 md:size-5 shrink-0" />
                <p className="text-sm md:text-base">Complimentary Wi-Fi</p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-max py-4 px-8 md:px-10 rounded-3xl duration-0
                hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
                hover:border-[#664F31]
                border-black
                text-black
                hover:text-white
                text-sm md:text-base"
            >
              <Link href={"/chauffeur-services"}>Select Now</Link>
            </Button>
          </div>
        </div>

        {/* Image — shows on desktop in original position */}
        <div className="hidden lg:block">
          <CarImageSlider dark={dark} slides={car.slides} left={left} />
        </div>
      </div>
    </div>
  );
};
