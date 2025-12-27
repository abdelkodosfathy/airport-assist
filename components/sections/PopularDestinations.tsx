"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";


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
    img: "/sections/suite.jpg",
    price: "£250",
  },
  {
    title: "PARIS CHARLES DE GAULLE",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
  {
    title: "JOHN F. KENNEDY",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
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
      { x:"100%", opacity: 0 },{ x:"0%", opacity: 1 },0
    );
    tl.fromTo(
      scrollRef.current,
      { width:"250%" },{ width:"100%"},0.4
    );
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
          behavior: "smooth"
        });
        setScrolled(true);
      } 
      // سكرول لليسار بس لو scrolled
      else if (scrolled && scrollingLeft) {
        el.scrollTo({
          left: 0,
          behavior: "smooth"
        });
        setScrolled(false);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, [scrolled]);

  return (
    <section className="bg-[#1a1a1a]">
    {/* <div className="w-full mx-auto max-w-360 px-28  gap-2 2xl:gap-4 pt-28 pb-16  flex bg-[#1a1a1a] text-white overflow-hidden"> */}
    <div className="w-full mx-auto px-28  gap-2 2xl:gap-4 pt-28 pb-16  flex bg-[#1a1a1a] text-white overflow-hidden">

      {/* ------------ LEFT TEXT ------------ */}
      <div className="w-3/8 relative">
        <span
          className="
            absolute left-0 right-0 -top-8 h-1 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
        />

        <h2 className="font-manrope font-normal text-4xl leading-[128%] tracking-[10px] uppercase">
          Popular Destinations
        </h2>

        <p className="font-manrope font-normal text-lg leading-8 text-[#959595] mt-6">
          Travel in comfort with our VIP Airport Meet & Greet service, featuring
          fast-track security & immigration and dedicated airport concierge
          assistance from curbside to gate.
        </p>
      </div>

      {/* ------------ CARDS GRID ------------ */}
      <div className="w-5/8 flex flex-col gap-4">
        <div
          ref={scrollRef}
          className="flex-1 flex overflow-x-auto gap-4 scrollbar-none scroll-smooth"
        >
          {data.map((item, i) => (
            <DestinationCard key={i} {...item} />
          ))}
        </div>
        <div className="flex gap-2 [@media(min-width:1921px)]:hidden">
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
    <Card
      className="shrink-0 w-2/5  [@media(min-width:1921px)]:shrink [@media(min-width:1921px)]:shrink 
      bg-white border border-[#333] rounded-2xl overflow-hidden p-0
      hover:shadow-xl hover:shadow-black/40 transition-all duration-300
    "
    >
      {/* IMAGE */}
      <div className="aspect-3/2 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="px-6 flex flex-col">
        <h3 className="font-manrope font-bold text-lg h-10 leading-[100%] tracking-[31%] text-black">
          {title}
        </h3>

        <p className="text-[#7a7a7a] font-manrope leading-[150%] mt-3">
          {content}
        </p>

        <p className="mt-4 mb-4 font-manrope font-bold text-[18px] leading-[100%] tracking-[31%]">
          From £250
        </p>

        <Button variant="outline" className="w-max mb-6 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0">
          Book now <ArrowUpRight/>
        </Button>
      </div>
    </Card>
  );
}