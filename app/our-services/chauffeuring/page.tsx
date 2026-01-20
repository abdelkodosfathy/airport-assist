import Image, { StaticImageData } from "next/image";
import Section from "./section";
import carImage from "@/public/v_class.jpg";
import car from "@/public/front-face.png";
import DarkSection from "./DarkSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Props = {};

type ServiceItem = {
  serviceName: string;
  content: string;
  image: StaticImageData;
};

const SERVICES_DATA: ServiceItem[] = [
  {
    serviceName: "Service Name",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: carImage,
  },
  {
    serviceName: "Service Name",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: carImage,
  },
  {
    serviceName: "Service Name",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: carImage,
  },
];

export default function page(props: Props) {
  return (
    <div className="bg-white">
      <Section
        name="Choose how to travel"
        sectionHeader="OUR FLEET"
        services={SERVICES_DATA}
      />
      <DarkSection
        name="Choose how to travel"
        sectionHeader="OUR FLEET"
        services={SERVICES_DATA}
      />

      {/* Car Cards Section - Now Responsive */}
      <section className="relative font-[Manrope] bg-[#1a1a1a] py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16">
        <span
          className="
            absolute left-0 right-0 -top-8 h-0.75 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
        />

        <h3 className="font-manrope font-normal mb-4 md:mb-6 text-base sm:text-lg md:text-[20px] text-white leading-[100%] flex items-center tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[7.5px] capitalize">
          WHERE EVERY DETAIL TRANSFORMS THE JOURNEY
        </h3>

        <p className="font-[Manrope] font-normal mb-8 md:mb-12 lg:mb-15 text-xs sm:text-sm md:text-[14px] leading-[170%] text-[#C8C8C8]">
          <span className="block sm:inline">
            Thoughtfully designed with understated elegance, our services offer
            a refined setting to relax, work, or spend
          </span>
          <span className="block sm:inline">
            {" "}
            meaningful time with guests and family.
          </span>
        </p>

        {/* <div className="mb-32 flex justify-between">
          <CarCard className="max-w-[426px]" />
          <CarCard className="max-w-[426px]" />
          <CarCard className="max-w-[426px]" />
        </div> */}
        <div className="relative flex gap-6">
          <span
            className="
            absolute left-0 right-0 -top-16 h-0.75 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
          />
          <CarCard className="flex-1"/>
          <CarCard className="flex-1"/>
          <CarCard className="flex-1"/>
        </div>
      </section>

      {/* Exclusive Tiers Section - Now Responsive */}
      <section className="min-h-[400px] md:min-h-[500px] lg:min-h-118.75 gap-4 flex items-center px-6 sm:px-10 md:px-16 lg:px-26 py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="w-full max-w-360 mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-6 md:gap-8 lg:gap-10">
          {/* Left Text */}
          <div className="flex-2 w-full lg:w-auto">
            <h2 className="uppercase flex flex-col tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] leading-[130%] md:leading-[150%] text-xl sm:text-2xl md:text-3xl whitespace-normal justify-start">
              <span>EXCLUSIVE TIERS THAT TAKE</span>
              <span>YOU BEYOND</span>
            </h2>
          </div>

          {/* Right Text */}
          <div className="flex-1 w-full lg:w-auto">
            <p className="font-[Manrope] font-normal max-w-full lg:max-w-90 text-sm md:text-base leading-[150%] text-[#959595] mb-4 md:mb-6">
              Airport Assist concierge services welcome all travellers, while
              our exclusive plans unlock the service's most refined and
              personalised experience.
            </p>
            <Button
              variant="outline"
              className="w-full sm:w-auto min-w-[140px] rounded-xl py-4 md:py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <p>Contact Us</p>
              <ArrowUpRight className="size-4 md:size-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const CarCard = ({className}: {className?: string}) => {
  return (
    <div className={`font-[Manrope] bg-white overflow-hidden rounded-md w-full mx-auto lg:mx-0 flex flex-col ${className}`}>
      <div className="relative w-full aspect-[427/278]">
        <Image
          src={car}
          alt="front facing car"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="pb-6 pt-6 md:pt-9 px-4 sm:px-5 md:px-6.25 flex flex-col flex-1">
        <p className="font-medium text-lg sm:text-xl md:text-[24.18px] mb-4 md:mb-8 leading-[100%] tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.31em]">
          FLY BY HELICOPTER
        </p>

        <p className="font-normal text-xs sm:text-sm mb-6 md:mb-15 text-[#6D6D6D] leading-[150%] flex-1">
          Our clients predominately choose to travel by charted jet for reasons
          of convenience and ease
        </p>

        {/* <Button className="w-full sm:w-auto mb-4 md:mb-7 mt-auto">
          Enquire Now <ArrowUpRight className="ml-2" />
        </Button> */}

        <Button
          variant="outline"
          className="w-max px-16 rounded-xl py-4 md:py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
        >
          <p>Enquire Now</p>
          <ArrowUpRight className="size-4 md:size-5" />
        </Button>
      </div>
    </div>
  );
};
