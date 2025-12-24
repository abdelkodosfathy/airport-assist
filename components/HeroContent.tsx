"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BookingForm from "@/components/BookingForm";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll<HTMLElement>(
      "h1, .hero-text, .booking-form, form-card"
    );

    // خلي العناصر مخفية من البداية
    gsap.set(elements, { opacity: 0, y: 50 });

    gsap.set(".booking-form", { backgroundColor: "rgba(255,255,255,0)" });

    // Timeline
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
      // className="w-full flex flex-col items-center justify-center text-center mt-32 px-28"
      className="w-full flex flex-col items-center justify-center text-center px-28"
    >
      {/* شيل opacity-0 من هنا */}
      <h1 className="font-[Manrope] font-normal leading-[150%] tracking-[9%] text-4xl max-w-225 opacity-0">
        WELCOME TO AIRPORT ASSIST
      </h1>
      <p className="hero-text font-[Manrope] text-[#A8A8A8] font-light mt-4 leading-[150%] tracking-[9%] text-[29px] max-w-225 opacity-0">
        Luxury Airport VIP Concierge — seamless, private, stress-free travel.
      </p>

      <div className="mt-8 w-full booking-form opacity-0">
        <BookingForm />
      </div>
    </div>
  );
}
