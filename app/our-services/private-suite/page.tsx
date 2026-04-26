// import ServiceSection from "@/app/services/components/services-section";
import ServiceSection from "@/app/our-services/components/services-section";
import Image from "next/image";
import { ReactNode } from "react";

import arrivalArrival from "@/public/private-suite/Arrival/Arrival.webp";
import arrivalExclusiveLounge from "@/public/private-suite/Arrival/EXCLUSIVE LOUNGE.webp";
import arrivalSeamlessExit from "@/public/private-suite/Arrival/Leaving the Airport – Seamless Exit .webp";

import connectionArrival from "@/public/private-suite/Connection/Arrival.webp";
import connectionDeparture from "@/public/private-suite/Connection/Departure.webp";

import departureBoarding from "@/public/private-suite/Departure/BOARDING.webp";
import departureExclusiveLounge from "@/public/private-suite/Departure/EXCLUSIVE LOUNGE.webp";
import departureFineDiningLuxuryShopping from "@/public/private-suite/Departure/FINE DINING & LUXURY SHOPPING.webp";
import departureGreetingCurbside from "@/public/private-suite/Departure/Greeting – Curbside .webp";

import checkingInImage from "@/public/private-suite/Checking In.webp";
import immigrationAndCustomsImage from "@/public/private-suite/IMMIGRATION AND CUSTOMS.webp";
import securityImage from "@/public/private-suite/Security.webp";
import { Card } from "../vip-meet-and-greet/page";

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
            image={departureGreetingCurbside}
            left
            title={"Greeting – Curbside"}
            content={
              "You will be welcomed at our private suite by a dedicated doorman and escorted inside to your personal butler. Until your flight is called, relax in your private lounge and enjoy the experience at your own pace"
            }
          />
          <ServiceSection
            image={departureExclusiveLounge}
            title="EXCLUSIVE LOUNGE"
            content="Each private lounge is thoughtfully curated to provide an elegant, tranquil setting for relaxation, focused work, or time spent with guests and family."
          />
          <ServiceSection
            image={departureFineDiningLuxuryShopping}
            left
            title="FINE DINING & LUXURY SHOPPING"
            content="From exquisite light bites to indulgent dishes, everything is freshly prepared daily and complemented by a premium drinks service. Relax in refined comfort, where every detail is designed to make you feel at home, and enhance your experience with a personalised shopping journey through the terminals."
          />
          <ServiceSection
            image={departureBoarding}
            title="BOARDING"
            content="Security formalities are completed discreetly within the Private Suite, before a private luxury drive delivers you directly to your aircraft."
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
            image={arrivalArrival}
            left
            title={"Arrival"}
            content={
              "Step off the aircraft to a personal welcome, a luxury transfer to your private lounge, and seamless luggage handling—effortless from the very first moment."
            }
          />
          <ServiceSection
            image={arrivalExclusiveLounge}
            title="EXCLUSIVE LOUNGE"
            content="
            Settle into your private lounge, enjoy refined hospitality and à la carte dining, or spend time with guests as immigration formalities are handled discreetly within the suite.
            "
          />
          <ServiceSection
            image={arrivalSeamlessExit}
            left
            title="Leaving the Airport – Seamless Exit"
            content="With immigration complete and luggage returned, your chauffeur-driven vehicle awaits to take you seamlessly to your destination."
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
            image={connectionArrival}
            left
            title={"Arrival"}
            content={
              "Step off the aircraft to a personal welcome and be escorted to your private lounge. Thoughtfully designed for comfort and elegance, the space invites you to unwind or focus on work, while our seasonal menu offers a refined dining experience at your leisure."
            }
          />
          <ServiceSection
            image={connectionDeparture}
            title="Departure"
            content="When it’s time to depart, you’ll move seamlessly through private security and be driven in comfort directly to your aircraft."
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
              Your time is yours. Every detail is seamlessly managed within our
              exclusive private suite, away from
            </span>
            <span>the bustle of the main airport.</span>
          </p>
        </div>
        <div className="relative w-full">
          <Card
            title={"Checking In"}
            image={checkingInImage}
            content={
              "Upon arrival, we’ll take care of your passports, flight details, and luggage. Your airline will weigh and tag your bags and issue your boarding pass and baggage tags, all of which are returned to you before your flight. Every step is handled while you relax in the comfort of your private lounge."
            }
            imagePosition={"mid"}
            dir={"left"}
          />
          <Card
            image={securityImage}
            title={"Security"}
            content={
              "For our VIP guests, private security is conducted within the exclusive suite, allowing you to remain in a discreet and comfortable environment at all times. While all security procedures fully comply with standard aviation regulations, they are carried out privately within the suite, ensuring the same level of safety with added comfort, privacy, and ease."
            }
            dir="right"
            imagePosition={"mid"}
          />
          <Card
            image={immigrationAndCustomsImage}
            title={"IMMIGRATION AND CUSTOMS"}
            content={
              "While you relax in the comfort of your private lounge, your passport is presented to on-site Border Force officers on your behalf, with any additional checks handled discreetly in private if required. All customs formalities are seamlessly managed for you, including any declarations, allowing your arrival to remain calm, effortless, and entirely discreet."
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
            allowing us to tailor every aspect of the journey to their needs. 
            \n
            From the moment your chauffeur arrives, every stage of your transfer is
            managed with precision, comfort, and style. Enjoy a smooth, stress-free,
            door-to-door experience in a luxury vehicle, ensuring the perfect start
            or finish to your travel.."
          />
          <AdditionalServicesItem
            title="Special Requests"
            content="Your booking includes up to two hours of service for departures
              and one hour for arrivals. If you wish to extend your time with
              us, please let us know at the time of booking so we can make the
              necessary arrangements. 
              \n
              For suite access, your booking allows for
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
            experience, our team will curate the perfect stay for you. 
            \n
            Simply
            share your requirements with us before you arrive, and we will
            handle every detail — from securing the ideal room category to
            arranging special requests and personalised amenities. 
            \n
            Relax in
            complete confidence, knowing your stay has been crafted for
            comfort, style, and an effortlessly seamless experience."
          />

          <AdditionalServicesItem
            title="Private Jet"
            content=" Indulge in the highest level of personalised air travel with our
              private jet booking service. Whether you require a last-minute
              charter, a tailored itinerary, or a specific aircraft type, our
              team will curate a seamless and discreet experience from start to
              finish. 
              \n
              Simply let us know your preferences before you arrive, and
              we will handle every detail — from securing your preferred jet to
              coordinating ground services and on-board comforts. 
              \n
              Enjoy a truly
              elevated journey, defined by privacy, exclusivity, and effortless
              luxury."
          />
        </div>
      </section>
    </>
  );
};

export default page;

// const AdditionalServicesItem = ({
//   title,
//   content,
// }: {
//   title: string;
//   content: string;
// }) => {
//   return (
//     <div className="px-10 py-6">
//       <h3 className="font-semibold text-[18px] tracking-[2.8px] mb-3">
//         {title}
//       </h3>
//       <p className="text-[#6D6D6D] leading-[130%] whitespace-pre-line">{content}</p>
//     </div>
//   );
// };
const AdditionalServicesItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="px-6 md:px-10 py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors duration-300">
      {/* العنوان بلمسة فخمة: Uppercase + Tracking */}
      <h3 className="font-bold text-[16px] uppercase tracking-[3px] text-[#1a1a1a] mb-4">
        {title}
      </h3>

      {/* النص بمسافات مريحة للعين */}
      <p className="flex flex-col gap-4 text-[#6D6D6D] normal-case leading-[1.6]">
        {content.split("\\n").map((line, index) => (
          <span key={index}>
            {line}
            {/* <br /> */}
          </span>
        ))}
      </p>
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
//           <p className="tracking-[4.6px] text-[20px] uppercase">{title}</p>
//           <p className="leading-10 mt-2 text-lg text-[#6D6D6D] w-162.5">
//             {content}
//           </p>
//         </div>
//         <Image
//           src={serviceImage}
//           alt="service name"
//           className={`w-95 h-66.25 absolute -${dir}-60.25 ${positionClass}`}
//         />
//       </div>
//     </div>
//   );
// };
