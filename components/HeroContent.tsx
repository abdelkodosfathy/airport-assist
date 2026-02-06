"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BookingForm from "@/components/BookingForm";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll<HTMLElement>(
      "h1, .hero-text, .booking-form"
    );

    gsap.set(elements, { opacity: 0, y: 50 });
    // gsap.set(".booking-form", { backgroundColor: "rgba(255,255,255,0)" });

    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" },
    });

    tl.to(elements, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        w-full flex flex-col items-center justify-center text-center
        px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28  
        mt-16 md:mt-24 lg:mt-32
      "
    >
      <h1
        className="
          font-[Manrope] font-normal leading-[140%] tracking-[2.7px] 
          text-[30px] 
          opacity-0
          "
          // sm:text-3xl md:text-4xl 
      >
        WELCOME TO AIRPORT ASSIST
      </h1>

      <p
        className="
          hero-text font-[Manrope] text-[#A8A8A8] font-light leading-[150%] 
          tracking-[2px] sm:tracking-[6%] md:tracking-[9%]
          mt-4 sm:mt-5
          opacity-0
          text-[21.75px]
          "
          // text-base sm:text-sm md:text-xl lg:text-2xl
          // max-w-[90%] sm:max-w-[650px]
      >
        Luxury Airport VIP Concierge — seamless, private, stress-free travel.
      </p>

        <BookingForm />
    </div>
  );
}
