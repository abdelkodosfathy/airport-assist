"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import hero from "@/public/our-sercives-hero.jpg";
import { useRouter } from "next/navigation";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [booking, setBooking] = React.useState<any>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("vipBooking");

    if (!storedData) {
      // لو مفيش داتا → رجّع المستخدم للصفحة الرئيسية
      router.push("/");
      return;
    }

    const parsedBooking = JSON.parse(storedData);
    setBooking(parsedBooking);

  }, []);

  if (!booking) return null;

  // Derived values
  const totalPassengers =
    Number(booking.adults || 0) + Number(booking.children || 0);

  const passengersText =
    totalPassengers === 1 ? "1 Passenger" : `${totalPassengers} Passengers`;

  const airportName = booking.airport_name || "Airport";
  const serviceTypeText = booking.serviceType || "Service";
  const formattedDate = booking.date || "Date not selected";

  const handleChangeServices = () => {
    sessionStorage.removeItem("vipBooking");
    router.push("/");
  };

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
          <p className="text-center mb-7.5 font-[Manrope] text-normal uppercase">
            {serviceTypeText}
          </p>
          <h1 className="font-[Manrope] font-light text-3xl leading-[130%] tracking-[8.25px] text-center mb-7.5">
            {airportName}
          </h1>
          <div className="flex justify-around gap-8">
            <p className="font-[Manrope] font-normal text-[18px] leading-[100%] tracking-[8.25px] text-center text-[rgb(200,200,200)]">
              {formattedDate}
            </p>
            <p className="font-[Manrope] font-normal text-[18px] leading-[100%] tracking-[8.25px] text-center text-[rgb(200,200,200)]">
              {passengersText}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleChangeServices}
            className="
              absolute
              bottom-6
              h-[48px]
              bg-white/10
              border border-white/20
              rounded-[12px]
              px-[24px]
              py-[12px]
              flex items-center justify-center gap-[8px]
              backdrop-blur-md
              hover:bg-white/20
              left-1/2 -translate-x-1/2
            "
          >
            <p className="text-white font-normal text-[16px] leading-[24px] tracking-[0px] font-[Manrope]">
              Change Services
            </p>
          </Button>
        </div>
      </section>

      <section className="overflow-visible w-full max-w-360 mx-auto mt-20 mb-26 px-4 relative">
        {children}
      </section>

      <Footer />
    </main>
  );
}
