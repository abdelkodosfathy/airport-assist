// app/choose-services/layout.tsx
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import hero from "@/public/our-sercives-hero.jpg";
// import Link from "next/link";
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F7F7F6] font-[Manrope]">
      <Header />

      <section className="relative w-full h-114 text-white flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover w-full h-full"
            priority
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          <h1 className="font-[Manrope] font-light text-3xl tracking-[8.25px] text-center mb-7.5">
            Frequently Asked Questions
          </h1>
            <p className="font-[Manrope] font-normal text-2xl text-center text-[rgb(200,200,200)]">
              Home/FAQ
            </p>

        </div>
      </section>

      <section className="overflow-visible w-full max-w-340 mx-auto mt-20 mb-26 px-4 relative">
        {children}
      </section>

      <Footer />
    </main>
  );
}
