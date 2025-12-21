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
    title: "WINDSOR SUITE",
    content:
      "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
    img: "/sections/suite.jpg",
    price: "£3,177",
  },
  {
    title: "Paris-Charles de Gaulle Saloon",
    content:
      "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
    img: "/sections/saloon.jpg",
    price: "£3,177",
  },
  {
    title: "Paris-Charles de Gaulle Saloon",
    content:
      "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
    img: "/sections/suite.jpg",
    price: "£3,177",
  },
];

export default function PrivateSuites() {
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
      { y:"100%", opacity: 0 },{ y:"0%", opacity: 1 },0
    );
    tl.fromTo(
      scrollRef.current,
      { height:"150%" },{ height:"100%"},0.4
    );
  }, []);


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // سكرول لتحت بس لو !scrolled
      if (!scrolled && scrollingDown) {
        el.scrollTo({
          top: el.scrollHeight - el.clientHeight,
          behavior: "smooth",
        });
        setScrolled(true);
      }
      // سكرول لفوق بس لو scrolled
      else if (scrolled && scrollingUp) {
        el.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setScrolled(false);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, [scrolled]);

  return (
    <section className="h-[800px] p-28 flex bg-[#1a1a1a] text-white gap-14 overflow-hidden">
      {/* ------------ LEFT TEXT ------------ */}
      <div className="flex-1 relative">
        <span
          className="
            absolute left-0 right-0 -top-8 h-1 rounded-full
            transition-opacity duration-300 opacity-100
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
        />

        <h2 className="font-manrope font-normal text-[56px] leading-[128%] tracking-[10px] uppercase">
          PRIVATE SUITS
        </h2>

        <p className="font-manrope font-normal text-[24px] leading-[32px] w-[600px] text-[#959595] mt-6">
          Our most exclusive service, delivering the highest level of luxury
          airport assistance in over 500 destinations worldwide.
        </p>
      </div>

      {/* ------------ CARDS GRID ------------ */}
      <div className="flex flex-1 flex-row gap-4">
        <div
          ref={scrollRef}
          className="flex-1 flex flex-col overflow-y-auto gap-4 scrollbar-none scroll-smooth"
        >
          {data.map((item, i) => (
            <DestinationCard key={i} {...item} />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <span
            className={`bg-white/22 rounded-full ${
              !scrolled ? "h-16" : "h-2"
            } duration-300 w-2`}
          ></span>
          <span
            className={`bg-white/22 rounded-3xl ${
              scrolled ? "h-16" : "h-2"
            } duration-300 w-2`}
          ></span>
        </div>
      </div>
    </section>
  );
}

type CardProps = Destination;

function DestinationCard({ title, content, img, price }: CardProps) {
  return (
    <Card
      className="shrink-0 flex flex-row
      bg-white border border-[#333] rounded-2xl overflow-hidden p-0
      hover:shadow-xl hover:shadow-black/40 transition-all duration-300
      h-3/7
    "
    >
      {/* IMAGE - LEFT */}
      <div className="w-4/9 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* TEXT CONTENT - RIGHT */}
      <div className="w-5/9 py-6 px-2  flex flex-col">
        <div>
          <h3 className="font-manrope font-bold text-[24px] leading-[100%] tracking-[31%] text-black">
            {title}
          </h3>

          <p className="text-[#c0c0c0] font-manrope text-[16px] leading-[150%] mt-3">
            {content}
          </p>
        </div>

        <p className="font-manrope my-auto font-bold text-[18px] leading-[100%] tracking-[31%] text-black">
          From {price}
        </p>

        <Button
          variant="outline"
          className="border-black w-max text-black hover:bg-black hover:text-white"
        >
          Book now <ArrowUpRight/>
        </Button>
      </div>
    </Card>
  );
}
