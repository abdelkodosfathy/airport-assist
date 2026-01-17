import { StaticImageData } from "next/image";
import Section from "./section";
import serviceImage from "@/public/services-image.jpg";

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
    image: serviceImage,
  },
  {
    serviceName: "Service Name",
    content:
      "Carefully constructed with style and sophistication – each of our private lounges are designed to help you unwind, concentrate on work or relax with your invited guest or family. The beautiful artwork is curated by our partner",
    image: serviceImage,
  },
];
export default function page(props: Props) {
  return (
    <div className="">

      <Section
        name="Our Services"
        sectionHeader="Premium Experience"
        services={SERVICES_DATA}
      />
      <Section 
        className="bg-[#96754B0A]"
        name="Our Services"
        sectionHeader="Premium Experience"
        services={SERVICES_DATA}
      />

    </div>
  );
}
