import { StaticImageData } from "next/image";
import Section from "./section";
import carImage from "@/public/v_class.jpg";

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
    </div>
  );
}
