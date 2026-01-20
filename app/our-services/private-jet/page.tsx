import { ArrowUpRight, Check } from "lucide-react";
import serviceImage from "@/public/services-image.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <CTA />
    </>
  );
};

export default page;

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
