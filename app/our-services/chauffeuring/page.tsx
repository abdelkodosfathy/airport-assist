import Image, { StaticImageData } from "next/image";
import Section from "./section";
import carImage from "@/public/v_class.jpg";
import car from "@/public/front face car.png";
import DarkSection from "./DarkSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <section className="font-[Manrope] bg-[#1a1a1a] py-20 px-16">
        <span
          className="
            absolute left-0 right-0 -top-8 h-0.75 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
        />
        <h3 className="font-manrope font-normal mb-6 text-[20px] text-white leading-[100%] flex items-center tracking-[7.5px] capitalize">
          WHERE EVERY DETAIL TRANSFORMS THE JOURNEY
        </h3>

        <p className="font-[Manrope] font-normal text-[14px] leading-[170%] flex flex-col text-[#C8C8C8]">
          <span>
            Thoughtfully designed with understated elegance, our services offer
            a refined setting to relax, work, or spend
          </span>
          <span>meaningful time with guests and family.</span>
        </p>

        <div className="flex">
          <CarCard/>
          <CarCard/>
          <CarCard/>
        </div>
      </section>
    </div>
  );
}
const CarCard = () => {
  return (
    <div className="bg-white overflow-hidden rounded-md w-[426px]">
      <Image src={car} alt="front facing car" className="w-[426px] h-[289px]" />

      <p className="font-manrope font-medium text-[24.18px] leading-[100%] tracking-[0.31em]">
        FLY BY HELICOPTER
      </p>

      <p className="font-manrope font-normal text-[16px] leading-[150%]">
        Discover the world through inspiring travel stories, detailed guides
      </p>

      <Button>
        Enquire Now <ArrowRight />
      </Button>
    </div>
  );
};
