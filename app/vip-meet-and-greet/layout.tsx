"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import hero from "@/public/booking-hero.webp";
import { useRouter } from "next/navigation";
import {
  useAirportStore,
  useDateStore,
  usePassengersStore,
  useServiceStore,
} from "@/store/vipInputsStore";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleChangeServices = () => {
    router.push("/");
  };

  const storedAirport = useAirportStore((state) => state.airport);
  const storedServiceType = useServiceStore((state) => state.serviceType);
  const storedDate = useDateStore((state) => state.bookingDate);
  const storedAdults = usePassengersStore((state) => state.adults);
  const storedChildren = usePassengersStore((state) => state.children);

  const totalPassengers =
    Number(storedAdults || 0) + Number(storedChildren || 0);

  const passengersText =
    totalPassengers === 1 ? "1 Passenger" : `${totalPassengers} Passengers`;

  // useEffect(() => {
  //   if (storedAirport?.airport_name) {
  //     const slug = storedAirport.airport_name
  //       .toLowerCase()
  //       .replace(/\s+/g, "-") // spaces → dashes
  //       .replace(/[^a-z0-9-]/g, ""); // remove special chars

  //     // router.replace(`/vip-meet-and-greet?airport=${slug}`, { scroll: false });
  //     router.replace(
  //       `/vip-meet-and-greet?airport=${slug}&service=${storedServiceType}`,
  //       { scroll: false },
  //     );
  //   }
  // }, [storedAirport?.airport_name]);

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
            className="object-[50%_10%] object-cover w-full h-full"
            priority
          />

          {/* Gradient overlay */}
          {/* <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          /> */}
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-center mx-auto">
          <p className="text-center mb-7.5 font-[Manrope] text-normal uppercase">
            {storedServiceType}
          </p>
          <h1 className="font-[Manrope] font-light text-3xl leading-[130%] tracking-[8.25px] text-center mb-7.5">
            {storedAirport?.airport_name}
          </h1>
          <div className="flex justify-between gap-20 max-w-150 mx-auto">
            <p className="font-[Manrope] font-normal text-[18px] leading-[100%] tracking-[8.25px] text-center text-[rgb(200,200,200)]">
              {storedDate?.date}
            </p>
            <p className="font-[Manrope] font-normal text-[18px] leading-[100%] tracking-[8.25px] text-center text-[rgb(200,200,200)]">
              {passengersText}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleChangeServices}
            className=" absolute bottom-6 h-[48px] bg-white/10 border border-white/20 rounded-[12px] px-[24px] py-[12px] flex items-center justify-center gap-[8px] backdrop-blur-md hover:bg-white/20 left-1/2 -translate-x-1/2
            "
          >
            <p className="text-white font-normal text-[16px] leading-[24px] tracking-[0px] font-[Manrope]">
              Change Services
            </p>
          </Button>
        </div>
      </section>

      <section className="overflow-visible w-full max-w-350 mx-auto mt-20 mb-26 px-4 relative">
        {children}
      </section>

      <Footer />
    </main>
  );
}
