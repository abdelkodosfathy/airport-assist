// import serviceImage from "@/public/services-image.jpg";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  sectionHeader: string;
  className?: string;
  services: {
    serviceName: string;
    content: string;
    image: StaticImageData;
  }[];
};

const Section = ({ name, sectionHeader, services, className }: Props) => {
  return (
    <section className={`font-[Manrope] py-20 ${className}`}>
      <div className="overflow-visible max-w-310 mx-auto mt-20 mb-26 relative">
        <p className="text-[#8E8E93] font-medium text-[15.53px] mb-3.5 leading-[130%] tracking-[0px]">
          {name}
        </p>

        <h2 className="font-normal text-[22.6px] mb-10 leading-[100%] tracking-[7.06px] uppercase">
          {sectionHeader}
        </h2>
        <div className="space-y-12">
          {services.map((service, index) => (
            <Service key={index} {...service} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
type ServiceProps = {
  serviceName: string;
  content: string;
  image: StaticImageData;
  reverse?: boolean;
};
const Service = ({ serviceName, content, image, reverse }: ServiceProps) => {
  return (
    <div>
      {/* Text Content */}
      <div className="ml-auto relative w-[867px] p-[2px] bg-[linear-gradient(125deg,#A16538a8_0%,transparent_10%),linear-gradient(315deg,#A16538a8_0%,transparent_10%)]">
        <div className="bg-white py-12.5 flex justify-end">
          <div className="w-[570px] mx-24">
            <h3 className="mb-6 font-normal text-[16px] leading-[46.04px] tracking-[4.6px] uppercase text-[#878989]">
              {serviceName}
            </h3>

            <p className="font-manrope mb-8 font-normal text-[21px] leading-[39.14px] tracking-[0%]">
              {content}
            </p>
            <Button
              variant="outline"
              className="w-max py-6 px-10 rounded-3xl border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-[#664F31] duration-0"
            >
              <p className="font-[Manrope] leading-10 text-normal">Book Now</p>
            </Button>
          </div>
        </div>
        {/* Image */}
        <Image
          src={image}
          alt={serviceName}
          width={542}
          height={376}
          className="absolute z-10 border border-[#E0E0E0] object-cover left-35 top-1/2 -translate-y-1/2 -translate-x-full"
          priority
        />
      </div>
    </div>
  );
};
