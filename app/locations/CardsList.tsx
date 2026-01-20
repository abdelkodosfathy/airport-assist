// "use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

export default function CardsList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex overflow-x-auto overflow-y-visible snap-x snap-mandatory scrollbar-none gap-4 pb-2 py-4 -my-4">
        {data.map((item, i) => (
          <DestinationCard key={i} {...item} />
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-8">
        {data.map((_, i) => (
          <span
            key={i}
            className={`inline-block bg-[#c9bfb4] rounded-lg duration-300 h-1 w-8`}
            //  ${activeIndex === i ? 'bg-black' : 'bg-[#c9bfb4]'}
          />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  content: string;
  img: string;
  price: string;
}

function DestinationCard({ title, content, img, price }: CardProps) {
  return (
    <Card
      className="
        snap-start
        shrink-0 
        w-[calc(25%-12px)] 
        bg-white 
        rounded-2xl 
        p-0
        transition-all 
        font-[Manrope] 
        duration-300
      "
    >
      {/* Inner wrapper with overflow-hidden for image */}
      <div className="overflow-hidden rounded-t-2xl">
        {/* IMAGE */}
        <div className="aspect-[3/2] max-h-[330px] w-full">
          <img
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

        <p className="mt-8 mb-4 text-[#7B5A41] text-[18px] leading-[100%] tracking-[0.31em]">
          From £{price}
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

// Sample data
const data = [
  {
    title: "LONDON HEATHROW",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
  {
    title: "LONDON HEATHROW",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
  {
    title: "LONDON HEATHROW",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
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
