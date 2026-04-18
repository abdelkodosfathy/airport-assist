"use client";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image, { StaticImageData } from "next/image";

import { useSelectedLayoutSegment } from "next/navigation";
import chauffeur from "@/public/static-pages/chauffeur.webp";
import hotel from "@/public/static-pages/hotel.webp";
import meet_greet from "@/public/static-pages/meet_greet.webp";
import private_jet from "@/public/static-pages/private_jet.webp";
import private_suite from "@/public/static-pages/private_suite.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  type LayoutItem = {
    img: StaticImageData;
    title: string;
    bodyContent: string;
  };
  const layoutMap: Record<string, LayoutItem> = {
    chauffeuring: {
      img: chauffeur,
      title: "Luxury Chauffeur Services",
      bodyContent:
        "An elevated chauffeur experience designed for refined space, exceptional comfort, and effortless journeys.",
    },
    "private-jet": {
      img: private_jet,
      title: "Private Jet Charter",
      bodyContent:
        "Crafted with understated elegance, our private lounges offer an exclusive space to relax, work in privacy, or spend time with guests and family.",
    },
    hotel: {
      img: hotel,
      title: "Luxury Hotel",
      bodyContent:
        "Designed with style and sophistication, our spaces offer a refined environment to unwind.",
    },
    "private-suite": {
      img: private_suite,
      title: "Private Suite Services",
      bodyContent:
        "For the discerning traveller, the Private Suite experience is the ultimate way to travel, offering exceptional privacy, comfort, and personalised service.",
    },
    "vip-meet-and-greet": {
      img: meet_greet,
      title: "Meet & Greet Services",
      bodyContent:
        "From boarding to arrival, every step of your journey is expertly managed for a truly seamless airport experience.",
    },
  };
  const currentLayout = layoutMap[segment ?? ""];
  return (
    // <main className="bg-[#F7F7F6] font-[Manrope]">
    //   <Header />

    //   <section className="bg-[#1A1A1A] relative w-full h-114 text-white flex items-center overflow-hidden">
    //     {/* Hero content */}
    //     <div className="relative z-10 mx-auto max-w-340 px-12 flex gap-4 w-full justify-between">
    //       <div className="flex-1 flex flex-col justify-center">
    //         <p className="text-[#959595] text-[15.53px] font-medium">why</p>
    //         <h1 className=" font-[Manrope] mb-6 text-[25.31px] tracking-[5.63px]">
    //           {currentLayout.title}
    //         </h1>
    //         <p className="normal-case font-[Manrope] font-normal mb-8 text-sm leading-[150%] tracking-[1.5px] text-[#959595]">
    //           {currentLayout.bodyContent}
    //         </p>
    //         <Button
    //           asChild
    //           variant="outline"
    //           className=" w-fit py-5 border-white bg-one  hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-transparent duration-0"
    //         >
    //           <Link href={"/contact-us"}>
    //             <p>Enquire Now</p>
    //             <ArrowUpRight className="size-md" />
    //           </Link>
    //         </Button>
    //       </div>
    //       <div className="flex-1">
    //         <Image
    //           alt="room image"
    //           className="h-68 w-125 object-cover ml-auto rounded-lg"
    //           src={currentLayout.img}
    //         />
    //       </div>
    //     </div>
    //   </section>

    //   {children}

    //   <Footer />
    // </main>
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="bg-[#1A1A1A] relative w-full min-h-[300px] lg:min-h-114 text-white flex items-center overflow-hidden pb-10 xl:py-10 pt-24 xl:pt-10">
        <div className="relative z-10 mx-auto max-w-340 px-4 sm:px-8 xl:px-12 flex flex-col xl:flex-row gap-8 xl:gap-6 w-full justify-between items-center">
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center text-center xl:text-left w-full">
            <p className="text-[#959595] text-sm xl:text-[15.53px] font-medium">
              why
            </p>
            <h1 className="font-[Manrope] mb-4 xl:mb-6 text-xl sm:text-2xl xl:text-[25.31px] tracking-[3px] xl:tracking-[5.63px]">
              {currentLayout.title}
            </h1>
            <p className="normal-case font-[Manrope] font-normal mb-6 xl:mb-8 text-sm leading-[150%] tracking-[1px] xl:tracking-[1.5px] text-[#959595] max-w-md mx-auto xl:mx-0">
              {currentLayout.bodyContent}
            </p>
            <Button
              asChild
              variant="outline"
              className="w-fit mx-auto xl:mx-0 py-5 border-white bg-transparent hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-transparent duration-0"
            >
              <Link href={"/contact-us"}>
                <p>Enquire Now</p>
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="flex-1 w-full flex justify-center xl:justify-end">
            <Image
              alt="room image"
              className="w-full max-w-sm sm:max-w-md xl:max-w-none xl:w-full xl:h-68 lg:w-125 object-cover rounded-lg"
              src={currentLayout.img}
            />
          </div>
        </div>
      </section>

      {children}

      <Footer />
    </main>
  );
}

// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import InfoContainer from "./InfoContainer";
// export default function ServicesLayout() {
//   return (
//     <main className="bg-[#F7F7F6] font-[Manrope]">
//       <Header />

//       <section className="bg-[#1A1A1A] relative w-full h-140 text-white flex items-center overflow-hidden">
//         {/* Hero content */}
//         <div className="relative z-10 mx-auto max-w-340 px-12 flex gap-4 w-full justify-between">
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-[#959595] text-[15.53px] font-medium">why</p>
//             <h1 className=" font-[Manrope] mb-6 text-[25.31px] tracking-[5.63px]">
//               Airport Assist
//             </h1>
//             <p className=" font-[Manrope] font-normal mb-8 text-sm leading-[150%] tracking-[1.5px] text-[#959595]">
//               Luxury Airport Concierge & Bespoke Travel Solutions Worldwide
//               AIRPORT ASSIST is a leading provider of luxury airport concierge
//               services and bespoke travel solutions for individuals, VIPs,
//               celebrities, and corporate travellers. With decades of experience
//               in premium travel management, we deliver discreet, seamless, and
//               fully personalised journeys—from airport arrival to final
//               destination.
//             </p>
//           </div>
//           <div className="flex-1">
//             <Image
//               alt="room image"
//               className="w-140 ml-auto rounded-lg"
//               src={heroImage}
//             />
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// }
