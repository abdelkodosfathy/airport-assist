import { Check } from "lucide-react";
import serviceImage from "@/public/services-image.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <PrivateJetSection />
      <PrivateJetSection />
      <CTA />
    </>
  );
};

export default page;

const PrivateJetSection = ({ left }: { left?: boolean }) => {
  return (
    <section
      // ref={sectionRef}
      className="overflow-hidden w-full max-w-[1214px] mx-auto my-20 px-4 lg:px-0 relative"
    >
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-gray-400 mb-3">
        Name
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Section 1
      </h2>

      <div
        className={`flex bg-[#EBEBEB] items-center rounded-2xl mb-8 p-6 ${
          left ? "flex-row-reverse" : "flex-row"
        } gap-4 lg:gap-4 relative`}
      >
        {/* Images */}

        <div className="flex-1">
          <Image
            alt="service image"
            src={serviceImage}
            width={582}
            height={532}
            className="w-[580px] h-[530px] object-cover rounded-xl"
          />
        </div>
        {/* Text & Gradient Box */}
        <div className="flex-1 space-y-6 ml-10">
          <div
          // ref={textsRef}
          >
            <h3 className="font-[Manrope] font-normal text-[1rem] leading-11.5 tracking-[4.6px] uppercase mb-6 text-gray-500">
              Service Name
            </h3>
            <p className="font-[Manrope] font-normal  text-[1.1rem] leading-9.75 mb-8 text-gray-700 max-w-[525px]">
              Carefully constructed with style and sophistication – each of our
              private lounges are designed to help you unwind, concentrate on
              work or relax with your invited guest or family. The beautiful
              artwork is curated by our partner
            </p>
          </div>

          <div
            // ref={boxRef}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              "Professional Drivers",
              "Always on Time",
              "Luxury Vehicles",
              "Smooth rides",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black group-hover:bg-gradient-to-b from-[#664F31] to-[#DFB08D] transition-all duration-300 flex-shrink-0">
                  <Check className="w-5 h-5 text-white stroke-3" />
                </div>
                <span className="font-[Manrope] text-[16px] leading-[160%] text-gray-600">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="px-10 py-2 rounded-[16px] border-2 border-[rgb(150,107,75)] text-white font-normal text-base bg-gradient-to-b from-[rgb(123,90,65)] to-[rgb(201,139,92)]">
            Book Now
          </button>
        </div>
      </div>
      <div
        className={`flex bg-[#EBEBEB] items-center rounded-2xl p-6 ${
          left ? "flex-row-reverse" : "flex-row"
        } gap-4 lg:gap-4 relative`}
      >
        {/* Text & Gradient Box */}
        <div className="flex-1 space-y-6 mr-10">
          <div
          // ref={textsRef}
          >
            <h3 className="font-[Manrope] font-normal text-[1rem] leading-11.5 tracking-[4.6px] uppercase mb-6 text-gray-500">
              Service Name
            </h3>
            <p className="font-[Manrope] font-normal  text-[1.1rem] leading-9.75 mb-8 text-gray-700 max-w-[525px]">
              Carefully constructed with style and sophistication – each of our
              private lounges are designed to help you unwind, concentrate on
              work or relax with your invited guest or family. The beautiful
              artwork is curated by our partner
            </p>
          </div>

          <div
            // ref={boxRef}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              "Professional Drivers",
              "Always on Time",
              "Luxury Vehicles",
              "Smooth rides",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black group-hover:bg-gradient-to-b from-[#664F31] to-[#DFB08D] transition-all duration-300 flex-shrink-0">
                  <Check className="w-5 h-5 text-white stroke-3" />
                </div>
                <span className="font-[Manrope] text-[16px] leading-[160%] text-gray-600">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="px-10 py-2 rounded-[16px] border-2 border-[rgb(150,107,75)] text-white font-normal text-base bg-gradient-to-b from-[rgb(123,90,65)] to-[rgb(201,139,92)]">
            Book Now
          </button>
        </div>

        {/* Images */}
        <div className="flex-1">
          <Image
            alt="service image"
            src={serviceImage}
            width={582}
            height={532}
            className="w-[580px] h-[530px] object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="relative bg-[#614129] h-[525px] overflow-hidden">
      <Circle className="left-1/2 -translate-x-1/2 -top-50" />
      <Circle className="right-120 translate-x-full top-30" />
      <Circle className="left-100 -translate-x-full top-60" />

      <CircleLeftBulr className="-left-10" />
      <CircleRightBulr className="right-0" />

      <div className="text-center flex items-center justify-center h-full flex-col">
        <p
          style={{
            fontFamily: "Manrope",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: "45px",
            lineHeight: "120%",
            letterSpacing: "0%",
            color: "#fff",
          }}
          className=""
        >
          Ready to Discover Beautiful Journeys
        </p>
        <p
          style={{
            fontFamily: "Manrope",
            fontWeight: 400,
            fontStyle: "Regular",
            fontSize: "18px",
            lineHeight: "150%",
            letterSpacing: "0%",
            textAlign: "center",
            color: "#A7A7A7",
          }}
        >
          Contact us to know our last offers now
        </p>
        <Button
          asChild
          variant="outline"
          className="
          
            col-span-2
            mt-4
            px-10
            py-5
            cursor-pointer 
            border-[#D1D1D1] 
            text-[#7A7A7A] 
            bg-[#ECECEC]
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
        >
          <Link href={"/chauffeur-services/billing-information/checkout"}>
            Continue
          </Link>
        </Button>
      </div>
    </section>
  );
};

type CircleDivProps = {
  size?: number; // width & height
  top?: number; // position top
  left?: number; // position left
  angle?: number; // rotation in degrees
  opacity?: number; // 0 to 1
  color?: string; // background color
  className?: string; // أي class إضافي
};

const Circle: React.FC<CircleDivProps> = ({
  size = 1244,
  opacity = 1,
  color = "#ffffff0a",
  className = "",
}) => {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity: opacity,
        borderRadius: "50%", // دايرة كاملة
      }}
    ></div>
  );
};

const CircleLeftBulr = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="848"
      height="527"
      fill="none"
      viewBox="0 0 848 527"
    >
      <g filter="url(#filter0_f_1535_1160)">
        <path
          fill="url(#paint0_linear_1535_1160)"
          d="m236.113-264 81.563 444.923-649.864 199.826-81.562-444.924z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1535_1160"
          x1="-437.75"
          x2="-479.856"
          y1="323.25"
          y2="-234.891"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#443A33"></stop>
          <stop offset="0.8" stopColor="#fff" stopOpacity="1"></stop>
        </linearGradient>
        <filter
          id="filter0_f_1535_1160"
          width="1791.43"
          height="1704.75"
          x="-943.753"
          y="-794.003"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_1535_1160"
            stdDeviation="265.001"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

const CircleRightBulr = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="932"
      height="527"
      fill="none"
      viewBox="0 0 932 527"
    >
      <g filter="url(#filter0_f_1535_1144)">
        <path
          fill="url(#paint0_linear_1535_1144)"
          d="m1179.87-426 81.56 444.923L611.565 218.75l-81.563-444.924z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1535_1144"
          x1="506.002"
          x2="1423.61"
          y1="161.25"
          y2="-396.891"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#443A33"></stop>
          <stop offset="0.8" stopColor="#fff" stopOpacity="1"></stop>
        </linearGradient>
        <filter
          id="filter0_f_1535_1144"
          width="1791.43"
          height="1704.75"
          x="-0.001"
          y="-956.003"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_1535_1144"
            stdDeviation="265.001"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
