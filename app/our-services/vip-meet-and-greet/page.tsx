// import ServiceSection from "../components/services-section";

// type Props = {};

// const page = (props: Props) => {
//   return (
//     <>
//       <ServiceSection/>
//       <ServiceSection left />
//       <ServiceSection />
//     </>
//   );
// };

// export default page;

import ServiceSection from "@/app/our-services/components/services-section";
import Image from "next/image";
import { ReactNode } from "react";
import serviceImage from "@/public/services-image.jpg";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <section className="overflow-hidden w-full mt-12 pb-12 relative px-10">
        <h2 className="text-center text-[22.6px] tracking-[7.06px] uppercase">
          OUR Private Suite Services
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

      <section className="overflow-hidden w-full px-4  lg:px-10 relative bg-white">
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
