import Image, { StaticImageData } from "next/image";
import Section from "./section";
import flyByPrivateJetImage from "@/public/chauffeur/flyByPrivateJet.webp";
import flyByHelicopterImage from "@/public/chauffeur/flyByHelicopter.webp";
import privateConnectionImage from "@/public/chauffeur/privateConnection.webp";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CARS } from "@/lib/fixed-cars-sliders";
import Link from "next/link";

type Props = {};

type ServiceItem = {
  serviceName: string;
  content: string;
  image: StaticImageData;
};

const SERVICES_DATA: ServiceItem[] = [
  {
    serviceName: "Fly By PrivateJetImage",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: flyByPrivateJetImage,
  },
  {
    serviceName: "Fly By HelicopterImage",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: flyByHelicopterImage,
  },
  {
    serviceName: "private ConnectionImage",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: privateConnectionImage,
  },
];

export default function page(props: Props) {
  return (
    <div className="bg-white">
      <Section
        // cars={CARS}
        cars={[CARS[0], CARS[1], CARS[2], CARS[3]]}
        name="Choose how to travel"
        sectionHeader="OUR FLEET"
        services={SERVICES_DATA}
      />
      <Section
        cars={[CARS[4], CARS[5]]}
        name="Choose how to travel"
        sectionHeader="OUR FLEET"
        dark
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

        <p className="font-[Manrope] font-normal flex-col mb-8 md:mb-12 lg:mb-15 text-xs sm:text-sm md:text-normal leading-[170%] text-[#C8C8C8]">
          <span className="block normal-case">
            Thoughtfully designed with understated elegance, our services offer
            a refined setting to relax, work, or spend
          </span>
          <span className="block">meaningful time with guests and family.</span>
        </p>
        <div className="relative flex flex-wrap gap-6">
          <FlyByCard
            image={flyByPrivateJetImage}
          />
          <FlyByCard
            image={flyByHelicopterImage}
          />
          <FlyByCard
            image={privateConnectionImage}
          />
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
            <p className="font-[Manrope] font-normal normal-case max-w-full lg:max-w-90 text-sm md:text-base leading-[150%] text-[#959595] mb-4 md:mb-6">
              Airport assist concierge services welcome all travellers, while
              our exclusive plans unlock the service's most refined and
              personalised experience.
            </p>

            <Button
              variant="outline"
              className=" min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <Link href={"/contact-us"}>
              <p>Contact Us</p>
              </Link>
              <ArrowUpRight className="size-4 md:size-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// const FlyByCard = ({
//   image,
//   className,
// }: {
//   image: StaticImageData;
//   className?: string;
// }) => {
//   return (
//     <div
//       className={`font-[Manrope] bg-white overflow-hidden rounded-md w-full mx-auto lg:mx-0 flex flex-col ${className}`}
//     >
//       <div className="relative w-full aspect-[427/278]">
//         <Image
//           src={image}
//           alt="front facing car"
//           className="object-cover w-full h-full"
//         />
//       </div>

//       <div className="pb-6 pt-6 md:pt-9 px-4 sm:px-5 md:px-6.25 flex flex-col flex-1">
//         <p className="font-medium text-lg sm:text-xl md:text-[24.18px] mb-4 md:mb-8 leading-[100%] tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.31em]">
//           FLY BY HELICOPTER
//         </p>

//         <p className="font-normal text-xs sm:text-sm mb-6 md:mb-15 text-[#6D6D6D] leading-[150%] flex-1">
//           Our clients predominately choose to travel by charted jet for reasons
//           of convenience and ease
//         </p>

//         <Button
//           variant="outline"
//           className="w-max cursor-pointer border-black text-black hover:border-0 hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:text-white duration-0"
//         >
//           <p>Enquire Now</p>
//           <ArrowUpRight className="size-4 md:size-5" />
//         </Button>
//       </div>
//     </div>
//   );
// };

const FlyByCard = ({
  image,
  className,
}: {
  image: StaticImageData;
  className?: string;
}) => {
  return (
    <div
      className={`font-[Manrope] bg-white overflow-hidden rounded-md w-full flex flex-col 
        flex-1 min-w-70 max-w-60 mx-auto sm:mx-0 sm:max-w-[calc(50%-12px)]
        ${className}`}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-4/3 sm:aspect-427/278">
        <Image
          src={image}
          alt="front facing helicopter"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-4 md:px-6 py-5 sm:py-7 md:py-9">
        <p
          className="font-medium text-base sm:text-normal md:text-[18x] lg:text-[20px]
          mb-3 sm:mb-5 md:mb-8 leading-tight tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]"
        >
          FLY BY HELICOPTER
        </p>

        <p
          className="font-normal text-xs sm:text-sm md:text-base text-[#6D6D6D]
          leading-relaxed flex-1 mb-6 md:mb-10 normal-case"
        >
          Our clients predominantly choose to travel by chartered jet for
          reasons of convenience and ease.
        </p>

        {/* BUTTON */}
        <Button
          variant="outline"
          className="w-full sm:w-max flex items-center justify-center gap-2
          border-black text-black
          hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]
          hover:text-white transition-all duration-300"
        >
          <span className="text-sm sm:text-base">Enquire Now</span>
          <ArrowUpRight className="size-4 sm:size-5" />
        </Button>
      </div>
    </div>
  );
};
