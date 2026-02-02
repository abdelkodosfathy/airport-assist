import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import serviceImage from "@/public/services-image.jpg";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import heroImage from "@/public/why-us-hero.jpg";

export default function ServicesLayout() {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="bg-[#1A1A1A] relative w-full h-140 text-white flex items-center overflow-hidden">
        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-340 px-12 flex gap-4 w-full justify-between">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#959595] text-[15.53px] font-medium">why</p>
            <h1 className=" font-[Manrope] mb-6 text-[25.31px] tracking-[5.63px]">
              Airport Assist
            </h1>
            <p className=" font-[Manrope] font-normal mb-8 text-sm leading-[150%] tracking-[1.5px] text-[#959595]">
              Luxury Airport Concierge & Bespoke Travel Solutions Worldwide
              AIRPORT ASSIST is a leading provider of luxury airport concierge
              services and bespoke travel solutions for individuals, VIPs,
              celebrities, and corporate travellers. With decades of experience
              in premium travel management, we deliver discreet, seamless, and
              fully personalised journeys—from airport arrival to final
              destination.
            </p>
          </div>
          <div className="flex-1">
            <Image
              alt="room image"
              className="w-140 ml-auto rounded-lg"
              src={heroImage}
            />
          </div>
        </div>
      </section>
      <section className="my-8">
        <div className="flex items-center justify-between gap-16 mb-8 px-16 max-w-440 mx-auto">
          <TopCard
            title="Stress-Free Airport Travel"
            content="Avoid long queues and delays with personalised VIP airport services at departure and arrival."
          />
          <div className="bg-[#E5E5E5] min-w-0.75 h-22.5"></div>
          <TopCard
            title="Prompt, End-to-End Assistance"
            content="From curbside arrival and check-in to VIP lounges and aircraft boarding, we support you every step of the way."
          />
          <div className="bg-[#E5E5E5] min-w-0.75 h-22.5"></div>
          <TopCard
            title="Luxury, Discretion & Reliability"
            content="Our experienced VIP agents are professional, discreet, and committed to delivering a premium airport concierge experience."
          />
        </div>

        <div className="flex px-10 gap-8 max-w-410 mx-auto">
          <div className="flex-1 py-6.5 px-4 bg-white rounded-xl">
            <ul className="*:p-2.5 space-y-1">
              <li className="rounded-lg hover:bg-[#7B5A4133] bg-[#7B5A4133]">WHY AIRPORT ASSIST </li>
              <li className="rounded-lg hover:bg-[#7B5A4133]">OUR PRICING </li>
              <li className="rounded-lg hover:bg-[#7B5A4133]">VIP MEET & GREET</li>
              <li className="rounded-lg hover:bg-[#7B5A4133]">PRIVATE SUITE</li>
              <li className="rounded-lg hover:bg-[#7B5A4133]">CHAUFFEUR</li>
              <li className="rounded-lg hover:bg-[#7B5A4133]">HOTEL</li>
            </ul>
          </div>
          <div className="flex-3 bg-white px-8 py-5 rounded-xl">
            {/* changable content here */}
            <InfoSection
              title="Why Choose AIRPORT ASSIST for Airport Concierge Services?"
              content="
               Why Choose AIRPORT ASSIST for Airport Concierge Services?
               AIRPORT ASSIST’s Private Travel division specialises in VIP airport assistance,
               luxury travel concierge services, and tailored travel experiences.

               We are trusted globally for our:
               • Discreet and professional service
               • Fast-track airport assistance
               • Personalised travel planning
               • Worldwide airport coverage
              "
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

const TopCard = ({ title, content }: { title: string; content: string }) => {
  return (
    <div>
      <h3 className="font-semibold tracking-[2.25px] mb-3">{title}</h3>
      <p className="text-sm text-[#6D6D6D]">{content}</p>
    </div>
  );
};

const InfoSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div>
      <h3 className="font-semibold tracking-[2.25px] mb-3">{title}</h3>
      {/* <pre className="text-sm text-[#6D6D6D]">{content}</pre> */}
      <p className="text-sm text-[#6D6D6D]">
        AIRPORT ASSIST’s Private Travel division specialises in VIP airport
        assistance, luxury travel concierge services, and tailored travel
        experiences for high-profile and discerning clients.
      </p>
      <p className="mt-3 text-sm text-[#6D6D6D]">We are trusted globally for our:</p>
      <ul className="mb-3 list-disc ml-5">
        <li className="text-sm text-[#6D6D6D]">Discreet and professional service</li>
        <li className="text-sm text-[#6D6D6D]">Fast-track airport assistance</li>
        <li className="text-sm text-[#6D6D6D]">Personalised travel planning</li>
        <li className="text-sm text-[#6D6D6D]">Worldwide airport coverage</li>
      </ul>
      <p className="text-sm text-[#6D6D6D]">
        From departure to arrival, we provide a smooth and stress-free journey
        for travellers who value efficiency, privacy, and world-class service.
      </p>
    </div>
  );
};
