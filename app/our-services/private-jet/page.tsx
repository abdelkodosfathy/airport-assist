import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import dog from "@/public/private-jet/dog.webp";
import fruits_dish from "@/public/private-jet/fruits-dish.webp";
import handshake_in_front_of_private_jet from "@/public/private-jet/handshake-in-front-of-private-jet.webp";
import in_flight_luxury_meal from "@/public/private-jet/in-flight-luxury-meal.webp";
import man_reading from "@/public/private-jet/man-reading.webp";
import night_airport from "@/public/private-jet/night-airport.webp";
import private_jet from "@/public/private-jet/private-jet.webp";
import family_moment from "@/public/private-jet/family-moment-in-a-cozy-jet-cabin.webp";

const dataList: CardProps[] = [
  {
    title: "Enjoy Luxury and Comfort",
    content:
      "Private aviation redefines the way you travel. Free from crowded terminals and delays, you experience total privacy and freedom — to work, meet, relax, or sleep in complete comfort. With bespoke service and refined luxury at every altitude, flying privately offers an experience far beyond commercial travel.",
    dir: "left",
    imagePosition: "bottom",
    imgSrc: dog,
  },
  {
    title: "Travel with your furry companion right by your side.",
    content:
      "Your pet isn’t cargo — they’re family. Private jet travel lets your furry companion stay right beside you, enjoying a calm, comfortable journey free from stress, separation, or compromise.",
    dir: "right",
    imagePosition: "bottom",
    imgSrc: fruits_dish,
  },
  {
    title: "Travel Faster, Travel Smarter",
    content:
      "Avoid queues and unnecessary delays, boarding your private charter jet just minutes before take-off — saving valuable time.",
    dir: "left",
    imagePosition: "mid",
    imgSrc: handshake_in_front_of_private_jet,
  },
  {
    title: "Customise Your Itinerary",
    content:
      "Your journey, your way. We design itineraries around your lifestyle, giving you the freedom to personalise every detail.",
    dir: "right",
    imagePosition: "top",
    imgSrc: in_flight_luxury_meal,
  },
  {
    title: "Cuisine Tailored to Your Taste",
    content:
      "ndulge your cravings at altitude. Whether it’s haute cuisine with champagne or your favourite dim sum, private flying places every culinary choice in your hands — down to the finest detail.",
    dir: "left",
    imagePosition: "bottom",
    imgSrc: man_reading,
  },
  {
    title: "Unrivalled Access to Private Airports Worldwide",
    content:
      "Fly beyond scheduled routes, accessing remote locations and landing closer to your final destination.",
    dir: "right",
    imagePosition: "bottom",
    imgSrc: night_airport,
  },
  {
    title: "The Aircraft, Exclusively Yours",
    content:
      "Imagine complete privacy at altitude. With only your chosen guests onboard, private flying lets you work, meet, or relax together without distraction.",
    dir: "left",
    imagePosition: "bottom",
    imgSrc: family_moment,
  },
  {
    title: "Explore Our Aircraft Fleet",
    content:
      "With access to thousands of aircraft across a wide range of types, we always source the right jet to match your exact requirements.",
    dir: "right",
    imagePosition: "top",
    imgSrc: private_jet,
  },
];

const page = () => {
  return (
    <>
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
            <p className="normal-case font-[Manrope] font-normal normal-case max-w-full lg:max-w-90 text-sm md:text-base leading-[150%] text-[#959595] mb-4 md:mb-6">
              Airport Assist concierge services welcome all travellers, while
              our exclusive plans unlock the service's most refined and
              personalised experience.
            </p>

            <Button
              asChild
              variant="outline"
              className=" min-w-[140px] py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
            >
              <Link className="bg-transparent" href={"/contact-us"}>
                Contact Us
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

interface CardProps {
  title: string;
  content: string;
  dir: "left" | "right";
  imagePosition: "bottom" | "top" | "mid";
  imgSrc: StaticImageData;
}

const CTA = () => {
  return (
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
              fontSize: "20px",
              width: "996px",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#A7A7A7",
              textTransform: "none",
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
            className=" min-w-[140px] py-5 text-white border-white hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
          >
            <Link className="bg-transparent" href={"/contact-us"}>
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
  imgSrc: StaticImageData;
}
const Card = ({ title, content, dir, imagePosition, imgSrc }: CardProps) => {
  // Determine image positioning classes based on imagePosition prop
  const getImagePositionClass = () => {
    switch (imagePosition) {
      case "top":
        return "lg:bottom-30";
      case "mid":
        return "lg:top-1/2 lg:-translate-y-1/2";
      case "bottom":
        return "lg:top-21.75";
      default:
        return "lg:top-1/2 lg:-translate-y-1/2";
    }
  };

  const positionClass = getImagePositionClass();
  return (
    <div className="relative lg:h-120">
      {/* <div
        className={`absolute top-0 left-0 right-0 ${dir === "right" ? "right-2/7 pl-8 pr-46" : "left-2/7 pl-46.75 pr-1"} h-80 flex flex-col justify-center bg-white py-13.5 font-Manrope`}
      > */}
      <div
        className={`lg:absolute flex flex-col-reverse lg:block p-4 top-0 left-0 right-0 ${dir === "right" ? "right-2/7 lg:pl-8 lg:pr-46" : "left-2/7 lg:pl-46.75 lg:pr-1"} my-6 mx-4 lg:my-one lg: mx-none  lg:h-80 flex flex-col justify-center bg-white lg:py-13.5 font-Manrope`}
      >
        <div className={`${dir === "right" && "ml-auto"} max-w-full`}>
          <p className="tracking-[4.6px] text-[20px] uppercase">{title}</p>
          <p className="leading-10 mt-2 text-lg text-[#6D6D6D] max-w-162.5 normal-case">
            {content}
          </p>
        </div>
        <Image
          src={imgSrc}
          alt="service name"
          className={`mx-auto mb-6 lg:mx-none lg:mb-none w-95 h-66.25 lg:absolute ${dir === "right" ? "-right-60.25" : "-left-60.25"} ${positionClass}`}
        />
      </div>
    </div>
  );
};
