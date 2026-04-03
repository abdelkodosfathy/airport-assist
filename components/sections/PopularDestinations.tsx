"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Destination = {
  title: string;
  content: string;
  img: string;
  price: string;
};

const data: Destination[] = [
  {
    title: "LONDON HEATHROW",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/popular/popular_lhr.webp",
    price: "£250",
  },
  {
    title: "PARIS CHARLES DE GAULLE",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/popular/paris.webp",

    price: "£250",
  },
  {
    title: "JOHN F. KENNEDY",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/popular/rome.webp",
    price: "£250",
  },
];

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" },
      scrollTrigger: {
        trigger: scrollRef.current.parentElement, // الكونتينر العام للصور
        end: "bottom top",
        toggleActions: "play reverse play reverse", // كل مرة يدخل/يخرج
        invalidateOnRefresh: true,
      },
    });

    // الصورة الأولى: تبدأ 80% → 100%
    tl.fromTo(
      scrollRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1 },
      0,
    );
    tl.fromTo(scrollRef.current, { width: "250%" }, { width: "100%" }, 0.4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const scrollingRight = e.deltaY > 0 || e.deltaX > 0;
      const scrollingLeft = e.deltaY < 0 || e.deltaX < 0;

      // سكرول لليمين بس لو !scrolled
      if (!scrolled && scrollingRight) {
        el.scrollTo({
          left: el.scrollWidth - el.clientWidth,
          behavior: "smooth",
        });
        setScrolled(true);
      }
      // سكرول لليسار بس لو scrolled
      else if (scrolled && scrollingLeft) {
        el.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrolled(false);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, [scrolled]);

  return (
    // <section className="bg-[#1a1a1a] py-20 pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-26 text-white overflow-hidden">
    <section className="bg-[#1a1a1a] pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26 text-white overflow-hidden">
      {/* ------------ LEFT TEXT ------------ */}
      <div className="max-w-360 mx-auto flex flex-col gap-15 2xl:gap-30 lg:flex-row">
        <div className="lg:w-4/13 relative">
          <h2 className="text-[30px] leading-[128%] tracking-[7.5px] uppercase">
            <span className="block">Popular</span>
            <span className="block">Destinations</span>
          </h2>

          <p className="text-[15px] traking-[1.6px] leading-[160%] text-[#959595] max-w-87.5 mt-9 whitespace-break-spaces">
            Travel in comfort with our VIP Airport Meet & Greet service,
            featuring fast-track security & immigration and dedicated airport
            concierge assistance from curbside to gate.
          </p>
        </div>

        {/* ------------ CARDS GRID ------------ */}
        <div className="flex lg:w-9/13 flex-col gap-4 ">
          <div
            ref={scrollRef}
            className="w-full flex overflow-x-auto gap-4 scrollbar-none scroll-smooth"
          >
            {data.map((item, i) => (
              <DestinationCard key={i} {...item} />
            ))}
          </div>
          <div className="flex gap-2">
            <span
              className={`bg-white/22 rounded-full ${
                !scrolled ? "w-16" : "w-2"
              } duration-300 h-2`}
            ></span>
            <span
              className={`bg-white/22 rounded-3xl ${
                scrolled ? "w-16" : "w-2"
              } duration-300 h-2`}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
}

type CardProps = Destination;

function DestinationCard({ title, content, img, price }: CardProps) {
  return (
    <Card className="snap-start bg-white min-w-[calc(40%-12px)] border-none rounded-2xl  p-0 transition-all  font-[Manrope]  duration-300">
      {/* Inner wrapper with overflow-hidden for image */}
      <div className="overflow-hidden rounded-t-2xl">
        {/* IMAGE */}
        <div className="aspect-[3/2] w-full">
          <Image
            width={320}
            height={217}
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="px-3 flex flex-col">
        <h3 className="text-normal leading-[130%] truncate tracking-[3px] text-[15px] mb-4 text-black">
          {title}
        </h3>

        <p className="text-[#7a7a7a] font-manrope leading-[150%] text-[12px]">
          {content}
        </p>

        <p className="mt-16 2xl:mt-20 mb-4 text-[#7B5A41] leading-[100%]">
          From {price}
        </p>

        <Button
          variant="outline"
          className="w-max mb-3 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
        >
          Book now <ArrowUpRight />
        </Button>
      </div>
    </Card>
  );
}
