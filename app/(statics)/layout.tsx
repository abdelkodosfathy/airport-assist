// app/meet-and-greet/layout.tsx
"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image, { StaticImageData } from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import hero from "@/public/our-sercives-hero.jpg";
// Import your other hero images
// import faqHero from "@/public/faq-hero.jpg";
// import contactHero from "@/public/contact-hero.jpg";
import chaufferingHero from "@/public/chauffeuring.webp";
// import privateSuiteHero from "@/public/private-suite-hero.jpg";
// import vipMeetHero from "@/public/vip-meet-hero.jpg";
// import hotelHero from "@/public/hotel-hero.jpg";
import HeroTitle from "./HeroTitle";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  const imageMap: Record<string, StaticImageData> = {
    "frequently-asked-questions": hero, // Replace with faqHero
    "contact-us": hero, // Replace with contactHero
    "chauffeuring": chaufferingHero, // Replace with chaufferingHero
    "private-suite": hero, // Replace with privateSuiteHero
    "vip-meet-and-greet": hero, // Replace with vipMeetHero
    "hotel": hero, // Replace with hotelHero
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

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          <HeroTitle />
        </div>
      </section>

      <section className="w-full max-w-340 mx-auto mt-20 mb-26 px-4 relative">
        {children}
      </section>

      <Footer />
    </main>
  );
}