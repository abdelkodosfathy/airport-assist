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
    <div
      className={`container mx-auto flex gap-12 items-center
     ${reverse ? "flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <ImageContainer image={image} serviceName={serviceName} />

      {/* Text Content */}
      <div className="max-w-141.25 flex-1">
        <h3 className="mb-6 font-normal text-[16px] leading-[46.04px] tracking-[4.6px] uppercase text-[#878989]">
          {serviceName}
        </h3>

        <p className="font-manrope mb-8 font-normal text-[21px] leading-[39.14px] tracking-[0%]">
          {content}
        </p>
        <Button
          variant="outline"
          className="w-max py-6 px-10 rounded-[16px] border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-[#664F31] duration-0"
        >
          <p className="font-[Manrope] leading-10 text-normal">Book Now</p>
        </Button>
      </div>
    </div>
  );
};

const ImageContainer = ({
  image,
  serviceName,
}: {
  image: StaticImageData;
  serviceName: string;
}) => {
  return (
    <div className="relative flex-1 h-105 overflow-hidden">
      <BorderBox />
      <Image
        src={image}
        alt={serviceName}
        width={542}
        height={376}
        className="absolute z-10 border border-[#E0E0E0] object-cover left-[43px] top-[21px]"
        priority
      />
      <DarkerBox />
    </div>
  );
};

const DarkerBox: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    className="absolute right-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    width="196"
    height="150"
    fill="none"
    viewBox="0 0 196 150"
  >
    <g clipPath="url(#clip0_1549_1579)">
      <rect
        width="196"
        height="150"
        fill="url(#paint0_linear_1549_1579)"
        fillOpacity="0.49"
        rx="9"
      ></rect>
      <rect
        width="84"
        height="84"
        x="156"
        y="82"
        fill="#fff"
        fillOpacity="0.11"
        rx="42"
      ></rect>
      <rect
        width="84"
        height="84"
        x="105"
        y="120"
        fill="#fff"
        fillOpacity="0.11"
        rx="42"
      ></rect>
      <rect
        width="84"
        height="84"
        x="48"
        y="96"
        fill="#fff"
        fillOpacity="0.11"
        rx="42"
      ></rect>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1549_1579"
        x1="139"
        x2="84"
        y1="162"
        y2="-158"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7B5A41"></stop>
        <stop offset="1" stopColor="#090909"></stop>
      </linearGradient>
      <clipPath id="clip0_1549_1579">
        <rect width="196" height="150" fill="#fff" rx="9"></rect>
      </clipPath>
    </defs>
  </svg>
);

const BorderBox: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    className="        absolute
        top-0
        left-0"
    xmlns="http://www.w3.org/2000/svg"
    width="225"
    height="150"
    fill="none"
    viewBox="0 0 225 150"
  >
    <rect
      width="223.07"
      height="148.07"
      x="0.965"
      y="0.965"
      fill="url(#paint0_linear_1549_1360)"
      fillOpacity="0.1"
      rx="8.035"
    ></rect>
    <rect
      width="223.07"
      height="148.07"
      x="0.965"
      y="0.965"
      stroke="url(#paint1_linear_1549_1360)"
      strokeWidth="1.93"
      rx="8.035"
    ></rect>
    <rect
      width="223.07"
      height="148.07"
      x="0.965"
      y="0.965"
      stroke="url(#paint2_linear_1549_1360)"
      strokeOpacity="0.8"
      strokeWidth="1.93"
      rx="8.035"
    ></rect>
    <defs>
      <linearGradient
        id="paint0_linear_1549_1360"
        x1="112.5"
        x2="115.43"
        y1="0"
        y2="339.044"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#664F31"></stop>
        <stop offset="1" stopColor="#DFB08D"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_1549_1360"
        x1="54.358"
        x2="31.201"
        y1="3.241"
        y2="-28.127"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity="0"></stop>
        <stop offset="1" stopColor="#A16538"></stop>
      </linearGradient>
      <linearGradient
        id="paint2_linear_1549_1360"
        x1="190.596"
        x2="191.934"
        y1="137.731"
        y2="150.009"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.016" stopColor="#fff" stopOpacity="0"></stop>
        <stop offset="1" stopColor="#A16538"></stop>
      </linearGradient>
    </defs>
  </svg>
);
