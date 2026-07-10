// app/meet-and-greet/layout.tsx
"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image, { StaticImageData } from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
// import hero from "@/public/our-sercives-hero.jpg";
import hero from "@/public/contact-us-hero.webp";
// import chaufferingHero from "@/public/chauffeuring.webp";

export default function Layout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();

  const imageMap: Record<string, StaticImageData> = {
    // "frequently-asked-questions": hero, // Replace with faqHero
    "contact-us": hero, // Replace with contactHero
    // "chauffeuring": chaufferingHero, // Replace with chaufferingHero
    // "private-suite": hero, // Replace with privateSuiteHero
    // "vip-meet-and-greet": hero, // Replace with vipMeetHero
    // "hotel": hero, // Replace with hotelHero
  };

  const currentImage = imageMap[segment ?? ""] ?? hero;

  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="relative w-full h-114 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={currentImage}
            alt="background"
            fill
            className="object-cover"
            priority
          />

         
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          {/* <HeroTitle /> */}
          <h1 className="uppercase font-normal text-3xl tracking-[8.25px] text-center mb-7.5">
            {/* {titleMap[segment ?? ""] ?? ""} */}
            Contact Us
          </h1>

          <p className="font-[Manrope] text-[15px] normal-case max-w-250 text-center tracking-[1.09] text-[rgb(200,200,200)]">
            {/* {breadcrumbMap[segment ?? ""] ?? ""} */}
            Our dedicated team is available to discuss all aspects of our
            service.
          </p>
        </div>
      </section>

      <section className="w-full max-w-340 mx-auto mt-20 mb-26 px-4 relative">
        {children}
      </section>

      <Footer />
    </main>
  );
}
