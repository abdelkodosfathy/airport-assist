// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import image from "@/public/services-image.jpg";

// type Props = {};

// const dataList: CardProps[] = [
//   {
//     title: "Enjoy Luxury and Comfort",
//     content:
//       "Private aviation redefines the way you travel. Free from crowded terminals and delays, you experience total privacy and freedom — to work, meet, relax, or sleep in complete comfort. With bespoke service and refined luxury at every altitude, flying privately offers an experience far beyond commercial travel.",
//     dir: "left",
//     imagePosition: "bottom",
//   },
//   {
//     title: "Travel with your furry companion right by your side.",
//     content:
//       "Your pet isn’t cargo — they’re family. Private jet travel lets your furry companion stay right beside you, enjoying a calm, comfortable journey free from stress, separation, or compromise.",
//     dir: "right",
//     imagePosition: "bottom",
//   },
//   {
//     title: "Travel Faster, Travel Smarter",
//     content:
//       "Avoid queues and unnecessary delays, boarding your private charter jet just minutes before take-off — saving valuable time.",
//     dir: "left",
//     imagePosition: "mid",
//   },
//   {
//     title: "Customise Your Itinerary",
//     content:
//       "Your journey, your way. We design itineraries around your lifestyle, giving you the freedom to personalise every detail.",
//     dir: "right",
//     imagePosition: "top",
//   },
//   {
//     title: "Cuisine Tailored to Your Taste",
//     content:
//       "ndulge your cravings at altitude. Whether it’s haute cuisine with champagne or your favourite dim sum, private flying places every culinary choice in your hands — down to the finest detail.",
//     dir: "left",
//     imagePosition: "bottom",
//   },
//   {
//     title: "Unrivalled Access to Private Airports Worldwide",
//     content:
//       "Fly beyond scheduled routes, accessing remote locations and landing closer to your final destination.",
//     dir: "right",
//     imagePosition: "bottom",
//   },
//   {
//     title: "The Aircraft, Exclusively Yours",
//     content:
//       "Imagine complete privacy at altitude. With only your chosen guests onboard, private flying lets you work, meet, or relax together without distraction.",
//     dir: "left",
//     imagePosition: "bottom",
//   },
//   {
//     title: "Explore Our Aircraft Fleet",
//     content:
//       "With access to thousands of aircraft across a wide range of types, we always source the right jet to match your exact requirements.",
//     dir: "right",
//     imagePosition: "top",
//   },
// ];

// const page = (props: Props) => {
//   return (
//     <>
//       <section className="py-18">
//         {dataList.map((card, index) => (
//           <Card key={index} {...card} />
//         ))}
//       </section>
//       <CTA />
//     </>
//   );
// };

// export default page;

// const CTA = () => {
//   return (
//     // <section className="relative bg-[#614129] h-[525px] overflow-hidden">
//     <section className="relative bg-[#1A1A1A] h-[340px] overflow-hidden">
//       <Circle className="left-1/2 -translate-x-1/2 -top-50" />
//       <Circle className="right-120 translate-x-full top-30" />
//       <Circle className="left-100 -translate-x-full top-60" />

//       <CircleLeftBulr className="-left-10" />
//       <CircleRightBulr className="right-0" />

//       <div className="text-start flex flex-col justify-between py-12.5 mx-32 h-full">
//         <div>
//           <p
//             style={{
//               fontFamily: "Manrope",
//               fontWeight: 400,
//               fontStyle: "regular",
//               fontSize: "40px",
//               lineHeight: "100%",
//               letterSpacing: "1.6px",
//               verticalAlign: "middle",
//               color: "#fff",
//               marginBottom: "24px",
//             }}
//             className=""
//           >
//             HOW TO FLY
//           </p>
//           <p
//             style={{
//               fontFamily: "Manrope",
//               fontWeight: 400,
//               fontStyle: "Regular",
//               fontSize: "19px",
//               width: "996px",
//               lineHeight: "150%",
//               letterSpacing: "0%",
//               color: "#A7A7A7",
//             }}
//           >
//             We offer an unrivalled selection of private jets worldwide. Through
//             our VIP Charter Fleet and global brokerage network, we provide
//             access to thousands of aircraft — from light jets to large airliners
//             — ensuring the perfect choice for every journey.
//           </p>
//         </div>

//         <div>
//           <Button
//             asChild
//             variant="outline"
//             className="
//             col-span-2
//             mt-auto
//             min-w-40
//             py-5
//             cursor-pointer 
//             border-[#D1D1D1] 
//             text-white 
//             rounded-xl
//             hover:border-[#664F31]  
//             hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] 
//             hover:text-white 
//             duration-0
//           "
//           >
//             <Link
//               className="bg-transparent"
//               href={"/chauffeur-services/billing-information/checkout"}
//             >
//               Enquire Now <ArrowUpRight />
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// type CircleDivProps = {
//   size?: number; // width & height
//   top?: number; // position top
//   left?: number; // position left
//   angle?: number; // rotation in degrees
//   opacity?: number; // 0 to 1
//   color?: string; // background color
//   className?: string; // أي class إضافي
// };

// const Circle: React.FC<CircleDivProps> = ({
//   size = 1244,
//   opacity = 1,
//   color = "#ffffff0a",
//   className = "",
// }) => {
//   return (
//     <div
//       className={`absolute pointer-events-none ${className}`}
//       style={{
//         width: `${size}px`,
//         height: `${size}px`,
//         backgroundColor: color,
//         opacity: opacity,
//         borderRadius: "50%", // دايرة كاملة
//       }}
//     ></div>
//   );
// };

// const CircleLeftBulr = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       className={`absolute pointer-events-none ${className}`}
//       xmlns="http://www.w3.org/2000/svg"
//       width="848"
//       height="527"
//       fill="none"
//       viewBox="0 0 848 527"
//     >
//       <g filter="url(#filter0_f_1535_1160)">
//         <path
//           fill="url(#paint0_linear_1535_1160)"
//           d="m236.113-264 81.563 444.923-649.864 199.826-81.562-444.924z"
//         ></path>
//       </g>
//       <defs>
//         <linearGradient
//           id="paint0_linear_1535_1160"
//           x1="-437.75"
//           x2="-479.856"
//           y1="323.25"
//           y2="-234.891"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stopColor="#443A33"></stop>
//           <stop offset="0.8" stopColor="#fff" stopOpacity="1"></stop>
//         </linearGradient>
//         <filter
//           id="filter0_f_1535_1160"
//           width="1791.43"
//           height="1704.75"
//           x="-943.753"
//           y="-794.003"
//           colorInterpolationFilters="sRGB"
//           filterUnits="userSpaceOnUse"
//         >
//           <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
//           <feBlend
//             in="SourceGraphic"
//             in2="BackgroundImageFix"
//             result="shape"
//           ></feBlend>
//           <feGaussianBlur
//             result="effect1_foregroundBlur_1535_1160"
//             stdDeviation="265.001"
//           ></feGaussianBlur>
//         </filter>
//       </defs>
//     </svg>
//   );
// };

// const CircleRightBulr = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       className={`absolute pointer-events-none ${className}`}
//       xmlns="http://www.w3.org/2000/svg"
//       width="932"
//       height="527"
//       fill="none"
//       viewBox="0 0 932 527"
//     >
//       <g filter="url(#filter0_f_1535_1144)">
//         <path
//           fill="url(#paint0_linear_1535_1144)"
//           d="m1179.87-426 81.56 444.923L611.565 218.75l-81.563-444.924z"
//         ></path>
//       </g>
//       <defs>
//         <linearGradient
//           id="paint0_linear_1535_1144"
//           x1="506.002"
//           x2="1423.61"
//           y1="161.25"
//           y2="-396.891"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stopColor="#443A33"></stop>
//           <stop offset="0.8" stopColor="#fff" stopOpacity="1"></stop>
//         </linearGradient>
//         <filter
//           id="filter0_f_1535_1144"
//           width="1791.43"
//           height="1704.75"
//           x="-0.001"
//           y="-956.003"
//           colorInterpolationFilters="sRGB"
//           filterUnits="userSpaceOnUse"
//         >
//           <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
//           <feBlend
//             in="SourceGraphic"
//             in2="BackgroundImageFix"
//             result="shape"
//           ></feBlend>
//           <feGaussianBlur
//             result="effect1_foregroundBlur_1535_1144"
//             stdDeviation="265.001"
//           ></feGaussianBlur>
//         </filter>
//       </defs>
//     </svg>
//   );
// };

// interface CardProps {
//   title: string;
//   content: string;
//   dir: "left" | "right";
//   imagePosition: "bottom" | "top" | "mid";
// }
// const Card = ({ title, content, dir, imagePosition }: CardProps) => {
//   // Determine image positioning classes based on imagePosition prop
//   const getImagePositionClass = () => {
//     switch (imagePosition) {
//       case "top":
//         return "bottom-30";
//       case "mid":
//         return "top-1/2 -translate-y-1/2";
//       case "bottom":
//         return "top-21.75";
//       default:
//         return "top-1/2 -translate-y-1/2";
//     }
//   };

//   const positionClass = getImagePositionClass();
//   return (
//     <div className="relative w-full h-120">
//       <div
//         className={`absolute top-0 ${dir === "right" ? "right-2/7 pr-46.75" : "left-2/7 pl-46.75"} h-80 flex flex-col justify-center bg-white py-13.5 font-Manrope w-full`}
//       >
//         <div className={`${dir === "right" && "ml-auto"}`}>
//           <p
//             className={`tracking-[4.6px] text-[20px]`}
//           >
//             {title}
//           </p>
//           <p
//             className={` leading-10 mt-2 text-lg text-[#6D6D6D] w-162.5`}
//           >
//             {content}
//           </p>
//         </div>
//         <Image
//           src={image}
//           alt="service name"
//           className={`w-95 h-66.25 absolute -${dir}-60.25 ${positionClass}`}
//         />
//       </div>
//     </div>
//   );
// };

// import ServiceSection from "@/app/services/components/services-section";
import ServiceSection from "@/app/our-services/components/services-section";
import Image from "next/image";
import { ReactNode } from "react";
import serviceImage from "@/public/services-image.jpg";
import { title } from "process";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <section className="overflow-hidden w-full mt-12 pb-12 relative px-10">
        <h2 className="text-center text-[22.6px] tracking-[7.06px] uppercase">
          OUR Private Suite Services{" "}
        </h2>
        <div className="mx-auto w-max mt-7.5">
          <ul className="flex gap-17 mb-7.5">
            <ListItem href={"#departure"}>Departure</ListItem>
            <ListItem href={"#arrival"}>Arrival </ListItem>
            <ListItem href={"#connection"}>Connection</ListItem>
            <ListItem href={"#formalities"}>Formalities</ListItem>
            <ListItem href={"#additional-services"}>
              Additional services
            </ListItem>
          </ul>
        </div>
        <div id="departure" className="max-w-340 mx-auto">
          <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-gray-400 mb-3">
            Services
          </p>
          <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase">
            Departure
          </h2>
          <ServiceSection
            left
            title={"Greeting – Curbside Meet & Greet "}
            content={
              "Enjoy a personalised curbside welcome with luggage assistance and seamless escort into the terminal. We handle check-in, baggage drop, and boarding passes for a smooth, stress-free departure."
            }
          />
          <ServiceSection
            title="Security – Fast-Track Escort"
            content="Enjoy fast-track security with personal escort, followed by seamless guidance to your airport lounge for a calm, stress-free pre-flight experience."
          />
          <ServiceSection
            left
            title="Boarding – Escort to Gate"
            content="When boarding begins, your greeter escorts you to the gate, ensuring a smooth and timely boarding experience."
          />
          <div className="flex justify-center my-4">
            <button className=" px-10 py-2 rounded-[16px] border-2 border-[#966B4B] text-white font-normal text-base bg-gradient-to-b from-[#7B5A41] to-[#b98761]">
              Book Now
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden w-full px-4 lg:px-0 relative bg-white">
        <div id="arrival" className="max-w-340 mx-auto  mt-22 mb-11">
          <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-gray-400 mb-3">
            Services
          </p>
          <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase">
            Arrival
          </h2>
          <ServiceSection
            left
            title={"Arrival – Personal Meet & Greet"}
            content={
              "Be welcomed on arrival by a personal greeter holding a nameboard at the jet bridge, providing seamless guidance from the moment you disembark."
            }
          />
          <ServiceSection
            title="Immigration Formalities – Fast-Track "
            content="When boarding begins, your greeter escorts you to the gate, ensuring a smooth and timely boarding experience."
          />
          <ServiceSection
            left
            title="FINE DINING & LUXURY SHOPPING"
            content="From exquisite light bites to indulgent dishes, everything is freshly prepared daily and complemented by a premium drinks service. Relax in refined comfort, where every detail is designed to make you feel at home, and enhance your experience with a personalised shopping journey through the terminals."
          />
          <ServiceSection
            title="Leaving the Airport – Seamless Exit "
            content="Porter-assisted baggage collection with seamless escort through customs and arrivals to your onward transportation."
          />
          <div className="flex justify-center my-4">
            <button className=" px-10 py-2 rounded-[16px] border-2 border-[#966B4B] text-white font-normal text-base bg-gradient-to-b from-[#7B5A41] to-[#b98761]">
              Book Now
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden w-full mt-12 pb-12 px-4 relative">
        <div id="departure" className="max-w-340 mx-auto">
          <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-gray-400 mb-3">
            Services
          </p>
          <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase">
            Connection
          </h2>
          <ServiceSection
            left
            title={"Seamless Gate-to-Gate Transfer"}
            content={
              "Seamless gate-to-gate assistance with personal escort, ensuring a smooth and stress-free flight connection."
            }
          />
          <ServiceSection
            title="Arrival"
            content="Be welcomed at the jet bridge by a personal greeter with a nameboard, offering seamless guidance from the moment you disembark."
          />
          <ServiceSection
            title="Connecting – Same Terminal Transfers"
            content="Same-terminal connections with personal escort through security and seamless guidance to your departure gate."
          />
          <ServiceSection
            title="Connecting – Different Terminal"
            content="Inter-terminal connections with shuttle or private transfer, security escort, and seamless guidance to the lounge or boarding gate."
          />

          <div className="flex justify-center my-4">
            <button className=" px-10 py-2 rounded-[16px] border-2 border-[#966B4B] text-white font-normal text-base bg-gradient-to-b from-[#7B5A41] to-[#b98761]">
              Book Now
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#1a1a1a] overflow-hidden w-full mt-12 pb-12 px-4 relative">
        <div
          id="departure"
          className="max-w-340 mx-auto text-white pt-17 mb-18"
        >
          <h2 className="text-[22.6px]  tracking-[7.06px] text-center uppercase">
            Formalities Taken Care Of
          </h2>
          <p className="text-center flex flex-col mt-3.5 font-medium ">
            <span>
              With Airport Assist, every airport formality is expertly managed on your behalf, ensuring a seamless,
            </span>
            <span>stress-free journey from start to finish.</span>
          </p>
        </div>
        <div className="relative w-full">
          <Card
            title={"Checking In"}
            content={
              "Smooth, Comfortable, and Hassle-Free We handle your passports, luggage, and boarding passes, ensuring a smooth, queue-free check-in experience. Enjoy a queue-free check-in experience while we handle all formalities on your behalf."
            }
            imagePosition={"mid"}
            dir={"left"}
          />
          <Card
            title={"Security Fast-Track Escort"}
            content={
              "Personal fast-track escort through security with seamless guidance to your airport lounge."
            }
            dir="right"
            imagePosition={"mid"}
          />
          <Card
            title={"Immigration Fast-Track Assistance"}
            content={
              "Passengers will be escorted directly to the immigration area upon arrival. Our greeter will guide them through the fast-track immigration lane, ensuring a smooth, efficient, and stress-free process from the moment they land."
            }
            dir={"left"}
            imagePosition={"mid"}
          />
        </div>
      </section>
      <section className="overflow-hidden w-full mt-15.75 pb-12 px-4 relative">
        <h2 className="mx-24 text-[22.6px] uppercase tracking-[7px] mb-6">
          Additional Service
        </h2>
        <div className="rounded-lg bg-white shadow-sm mx-24">
          <AdditionalServicesItem
            title="Chauffeur Service"
            content=" Experience true convenience and elegance with our premium chauffeur
            service, offering effortless collection and drop-off between the airport
            and your home. Guests booking our Elite Plus Service will be invited to
            provide their pick-up or drop-off details during the booking process,
            allowing us to tailor every aspect of the journey to their needs. From
            the moment your chauffeur arrives, every stage of your transfer is
            managed with precision, comfort, and style. Enjoy a smooth, stress-free,
            door-to-door experience in a luxury vehicle, ensuring the perfect start
            or finish to your travel.."
          />
          <AdditionalServicesItem
            title="Special Requests"
            content="Your booking includes up to two hours of service for departures
              and one hour for arrivals. If you wish to extend your time with
              us, please let us know at the time of booking so we can make the
              necessary arrangements. For suite access, your booking allows for
              up to two hours of use. If you would like to extend your stay or
              enhance your services, please speak to us before you arrive, and
              we will be happy to assist."
          />
          <AdditionalServicesItem
            title="Hotel Booking"
            content="Enhance your journey with our bespoke hotel booking service,
            designed to secure the finest luxury and designer accommodations
            tailored to your preferences. Whether you seek elegant comfort,
            contemporary sophistication, or a world-renowned five-star
            experience, our team will curate the perfect stay for you. Simply
            share your requirements with us before you arrive, and we will
            handle every detail — from securing the ideal room category to
            arranging special requests and personalised amenities. Relax in
            complete confidence, knowing your stay has been crafted for
            comfort, style, and an effortlessly seamless experience."
          />

          <AdditionalServicesItem
            title="Private Jet"
            content=" Indulge in the highest level of personalised air travel with our
              private jet booking service. Whether you require a last-minute
              charter, a tailored itinerary, or a specific aircraft type, our
              team will curate a seamless and discreet experience from start to
              finish. Simply let us know your preferences before you arrive, and
              we will handle every detail — from securing your preferred jet to
              coordinating ground services and on-board comforts. Enjoy a truly
              elevated journey, defined by privacy, exclusivity, and effortless
              luxury."
          />
        </div>
      </section>
    </>
  );
};

export default page;

const AdditionalServicesItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="px-10 py-6">
      <h3 className="font-semibold text-[18px] tracking-[2.8px] mb-3">
        {title}
      </h3>
      <p className="text-[#6D6D6D] leading-[130%]">{content}</p>
    </div>
  );
};

const ListItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <li className="text-[18px] leading-[1.6] mb-2 text-[#6D6D6D] hover:border-b-2 hover:mb-0 hover:border-b-[#7B5A41]">
      <a href={href}>{children}</a>
    </li>
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
          <p className="tracking-[4.6px] text-[20px] uppercase">{title}</p>
          <p className="leading-10 mt-2 text-lg text-[#6D6D6D] w-162.5">
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
