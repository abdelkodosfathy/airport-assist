"use client";

import BookingForm from "@/components/BookingForm/BookingForm";

export default function HeroContent() {

  return (
    <div
      className="
        w-full flex flex-col items-center justify-center text-center
        px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28  
        mt-16 md:mt-24 lg:mt-32
      "
    >
      <h1
        className="
          font-[Manrope] font-normal leading-[140%] tracking-[2.7px] 
          text-[20px] 
          lg:text-[30px] 
          uppercase
          "
      >
        {/* WELCOME TO AIRPORT ASSIST */}
        Experience a New Travel Concept
      </h1>

      <p
        className="
          hero-text font-[Manrope] text-[#A8A8A8] font-light leading-[150%] 
          tracking-[2px] sm:tracking-[6%] md:tracking-[9%]
          mt-4 sm:mt-5
          text-md
          lg:text-xl
          normal-case
          "
      >
        Luxury Airport VIP Concierge — seamless, private, stress-free travel.
      </p>
      <BookingForm />
    </div>
  );
}
