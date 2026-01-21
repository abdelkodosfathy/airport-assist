// app/choose-services/layout.tsx
import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import serviceImage from "@/public/services-image.jpg";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesLayout() {
  const dataList: CardProps[] = [
    {
      title: "Enjoy Luxury and Comfort",
      content:
        "Private aviation redefines the way you travel. Free from crowded terminals and delays, you experience total privacy and freedom — to work, meet, relax, or sleep in complete comfort. With bespoke service and refined luxury at every altitude, flying privately offers an experience far beyond commercial travel.",
      dir: "left",
      imagePosition: "bottom",
    },
    {
      title: "Travel with your furry companion right by your side.",
      content:
        "Your pet isn’t cargo — they’re family. Private jet travel lets your furry companion stay right beside you, enjoying a calm, comfortable journey free from stress, separation, or compromise.",
      dir: "right",
      imagePosition: "bottom",
    },
    {
      title: "Travel Faster, Travel Smarter",
      content:
        "Avoid queues and unnecessary delays, boarding your private charter jet just minutes before take-off — saving valuable time.",
      dir: "left",
      imagePosition: "mid",
    },
    {
      title: "Customise Your Itinerary",
      content:
        "Your journey, your way. We design itineraries around your lifestyle, giving you the freedom to personalise every detail.",
      dir: "right",
      imagePosition: "top",
    },
    {
      title: "Cuisine Tailored to Your Taste",
      content:
        "ndulge your cravings at altitude. Whether it’s haute cuisine with champagne or your favourite dim sum, private flying places every culinary choice in your hands — down to the finest detail.",
      dir: "left",
      imagePosition: "bottom",
    },
    {
      title: "Unrivalled Access to Private Airports Worldwide",
      content:
        "Fly beyond scheduled routes, accessing remote locations and landing closer to your final destination.",
      dir: "right",
      imagePosition: "bottom",
    },
    {
      title: "The Aircraft, Exclusively Yours",
      content:
        "Imagine complete privacy at altitude. With only your chosen guests onboard, private flying lets you work, meet, or relax together without distraction.",
      dir: "left",
      imagePosition: "bottom",
    },
    {
      title: "Explore Our Aircraft Fleet",
      content:
        "With access to thousands of aircraft across a wide range of types, we always source the right jet to match your exact requirements.",
      dir: "right",
      imagePosition: "top",
    },
  ];

  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="bg-[#1A1A1A] relative w-full h-140 text-white flex items-center overflow-hidden">
        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-290">
          <h1 className=" font-[Manrope] mt-56.25 mb-6 text-[40px] tracking-[1.6px]">
            Private Jet Charter
          </h1>

          <p className=" font-[Manrope] font-normal mb-8 text-[19px] flex flex-col leading-[150%] text-[rgb(200,200,200)]">
            <span>
              rafted with understated elegance, our private lounges provide an
              exclusive setting to relax, work in privacy, or spend time with
              your
            </span>
            <span>
              guests and family, surrounded by carefully curated artwork.
            </span>
          </p>

          <Button
            asChild
            variant="outline"
            className="
            col-span-2
            mt-auto
            min-w-40
            py-5
            cursor-pointer 
            border-[#D1D1D1] 
            text-white 
            rounded-xl
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
          >
            <Link
              className="bg-transparent"
              href={"/chauffeur-services/billing-information/checkout"}
            >
              Enquire Now <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
      <section>
        <div className="overflow-hidden py-18">
          {dataList.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <CTA />
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
      <Footer />
    </main>
  );
}

const CTA = () => {
  return (
    // <section className="relative bg-[#614129] h-[525px] overflow-hidden">
    <section className="relative bg-[#1A1A1A] h-[340px] overflow-hidden">
      <Circle className="left-1/2 -translate-x-1/2 -top-50" />
      <Circle className="right-120 translate-x-full top-30" />
      <Circle className="left-100 -translate-x-full top-60" />

      <CircleLeftBulr className="-left-10" />
      <CircleRightBulr className="right-0" />

      <div className="text-start flex flex-col justify-between py-12.5 mx-32 h-full">
        <div>
          <p
            style={{
              fontFamily: "Manrope",
              fontWeight: 400,
              fontStyle: "regular",
              fontSize: "40px",
              lineHeight: "100%",
              letterSpacing: "1.6px",
              verticalAlign: "middle",
              color: "#fff",
              marginBottom: "24px",
            }}
            className=""
          >
            HOW TO FLY
          </p>
          <p
            style={{
              fontFamily: "Manrope",
              fontWeight: 400,
              fontStyle: "Regular",
              fontSize: "19px",
              width: "996px",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#A7A7A7",
            }}
          >
            We offer an unrivalled selection of private jets worldwide. Through
            our VIP Charter Fleet and global brokerage network, we provide
            access to thousands of aircraft — from light jets to large airliners
            — ensuring the perfect choice for every journey.
          </p>
        </div>

        <div>
          <Button
            asChild
            variant="outline"
            className="
            col-span-2
            mt-auto
            min-w-40
            py-5
            cursor-pointer 
            border-[#D1D1D1] 
            text-white 
            rounded-xl
            hover:border-[#664F31]  
            hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
            hover:text-white 
            duration-0
          "
          >
            <Link
              className="bg-transparent"
              href={"/chauffeur-services/billing-information/checkout"}
            >
              Enquire Now <ArrowUpRight />
            </Link>
          </Button>
        </div>
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

interface CardProps {
  title: string;
  content: string;
  dir: "left" | "right";
  imagePosition: "bottom" | "top" | "mid";
}
const Card = ({ title, content, dir, imagePosition }: CardProps) => {
  // Determine image positioning classes based on imagePosition prop
  const getImagePositionClass = () => {
    switch (imagePosition) {
      case "top":
        return "bottom-30";
      case "mid":
        return "top-1/2 -translate-y-1/2";
      case "bottom":
        return "top-21.75";
      default:
        return "top-1/2 -translate-y-1/2";
    }
  };

  const positionClass = getImagePositionClass();
  return (
    <div className="relative w-full h-120">
      <div
        className={`absolute top-0 ${dir === "right" ? "right-2/7 pr-46.75" : "left-2/7 pl-46.75"} h-80 flex flex-col justify-center bg-white py-13.5 font-Manrope w-full`}
      >
        <div className={`${dir === "right" && "ml-auto"}`}>
          <p className={`tracking-[4.6px] text-[20px]`}>{title}</p>
          <p className={` leading-10 mt-2 text-lg text-[#6D6D6D] w-162.5`}>
            {content}
          </p>
        </div>
        <Image
          src={serviceImage}
          alt="service name"
          className={`w-95 h-66.25 absolute -${dir}-60.25 ${positionClass}`}
        />
      </div>
    </div>
  );
};
