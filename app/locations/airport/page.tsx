"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";

export default function Locations() {
  return (
    <main className="relative font-[Manrope] bg-[#F7F7F6] max-w-screen overflow-hidden">
      <Header />
      <section className="relative w-full h-114 text-white flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover object-[50%_20%] w-full h-full"
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
        <div className="relative z-10">
          <h1 className=" font-[Manrope] text-[30px] leading-[130%] tracking-[3px] text-center mb-4.25">
            London Gatwick Airport - LGW
          </h1>

          <p className=" font-[Manrope] font-normal w-250 mx-auto text-[14.25px] tracking-[1.5px] text-center text-[rgb(200,200,200)]">
            We enhance every stage of your journey, from arrival and departure
            to connecting flights, with professional VIP assistance—available to
            all passengers, across all airlines and travel classes.
          </p>
        </div>
      </section>
      <section className="my-8 px-8">
        <div className=" max-w-410 mx-auto px-10">
          <p className="text-[#8E8E93] font-medium">Choose how to travel</p>
          <h3 className="text-[22px] tracking-[7px] uppercase">
            Services Level Available{" "}
          </h3>
          <div className="flex gap-6">
            <div className="flex-3 bg-white px-8 py-5 rounded-xl"></div>
            <div className="flex-1 py-6.5 px-4 h-fit bg-white rounded-xl">
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
