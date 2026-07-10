"use client";
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
import MainButton from "@/components/MainButton";
import { useEffect, useRef, useState } from "react";

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
      <div className="overflow-visible max-w-360 mx-auto px-2 sm:px-6 md:px-8 mt-8 md:mt-14 lg:mt-20 mb-12 md:mb-18 lg:mb-26 relative">
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
        <div className="space-y-10 md:space-y-31">
          {cars.map((car, i) => (
            <CarDetailedCard
              key={car.id}
              car={car}
              left={i % 2 !== 0}
              dark={dark}
            />
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
  newShape?: boolean;
}

const CarPreview = ({
  car,
  left = false,
  dark = false,
  newShape = false,
}: CarPreviewProps) => {
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
              className={`uppercase mb-4 md:mb-6 font-bold text-xl md:text-[25px] ${dark ? "text-white" : "text-black"}`}
            >
              {car.name}{" "}
              {car.newShape && (
                <span className="text-sm font-light text-[#7A7A7A] normal-case">
                  (New Shape)
                </span>
              )}
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

const CarDetailedCard = ({
  car,
  left = false,
  dark = false,
  // newShape = false,
}: CarPreviewProps) => {
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const updateHeight = () => {
      setTextHeight(textRef.current?.offsetHeight ?? 0);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(textRef.current);

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      className={`relative max-w-308 mx-auto ${dark ? "text-white" : "text-black"}`}
    >
      <div
        className={`relative z-10 lg:flex gap-11  ${left ? "flex-row-reverse" : ""}`}
      >
        <CarImageSlider dark={dark} slides={car.slides} left={left} />

        {/* Text content */}
        <div
          ref={textRef}
          className={`max-w-158.5 ${left ? "pl-2 lg:pl-8" : "pl-2 lg:pl-auto"}`}
        >
          <h3
            className={`uppercase mb-4 md:mb-6 font-bold text-xl md:text-[25px] ${dark ? "text-white" : "text-black"}`}
          >
            {car.name}{" "}
            {car.newShape && (
              <span className="text-sm font-light text-[#7A7A7A] normal-case">
                (New Shape)
              </span>
            )}
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

          <MainButton href={"/chauffeur-services"}>Select Now</MainButton>
        </div>
      </div>

      {/* <BackBorder dark={dark} left={left} /> */}
      <BackBorder dark={dark} left={left} textHeight={textHeight} />
    </div>
  );
};

// const BackBorder = ({ dark, left }: { dark: boolean; left: boolean }) => {
//   return (
//     <div
//       className={`w-full -bottom-2 lg:bottom-auto lg:-top-8.25 lg:w-216.75 h-110.5 absolute z-0 ${left ? "left-0" : "right-0"} p-0.5 ${
//         dark
//           ? "bg-[linear-gradient(170deg,#FFFFFF98_0%,#1a1a1a_10%,#1a1a1a_90%,#ffffff98_100%)]"
//           : "bg-[linear-gradient(125deg,#A16538a8_0%,#f4f4f2_10%,#f4f4f2_90%,#A16538a8_100%)]"
//       }`}
//     >
//       <div
//         className={`w-full h-full ${dark ? "bg-[#1a1a1a]" : "bg-[#f4f4f2]"}`}
//       ></div>
//     </div>
//   );
// };

const BackBorder = ({
  dark,
  left,
  textHeight,
}: {
  dark: boolean;
  left: boolean;
  textHeight: number;
}) => {
  const DEFAULT_HEIGHT = 442;

  return (
    <div
      style={{
        minHeight: Math.max(DEFAULT_HEIGHT, textHeight + 40),
      }}
      className={`w-full -bottom-2 lg:bottom-auto lg:-top-8.25 lg:w-216.75 h-110.5 absolute z-0 ${left ? "left-0" : "right-0"} p-0.5 ${
        dark
          ? "bg-[linear-gradient(170deg,#FFFFFF98_0%,#1a1a1a_10%,#1a1a1a_90%,#ffffff98_100%)]"
          : "bg-[linear-gradient(125deg,#A16538a8_0%,#f4f4f2_10%,#f4f4f2_90%,#A16538a8_100%)]"
      }`}
    >
      <div
        className={`w-full h-full ${dark ? "bg-[#1a1a1a]" : "bg-[#f4f4f2]"}`}
      ></div>
    </div>
  );
};
