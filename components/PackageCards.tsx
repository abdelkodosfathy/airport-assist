"use client";

import { useRef, useLayoutEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

interface Package {
  id: string;
  image: string;
  heading: string;
  description: string;
  price: string;
  features: string[];
}

const packages: Package[] = [
  {
    id: "elite",
    image: "/packages/elite.jpg",
    heading: "ELITE",
    description: "Your gateway to a seamless and exclusive journey.",
    price: "£250",
    features: [
      "Exclusive one-to-one service",
      "Electric Golf Buggy (Where Available)",
      "Fast Track through Immigration & Security",
      "Assistance with luggage collection",
      "Escort to/from your vehicle",
    ],
  },
  {
    id: "elite-plus",
    image: "/packages/elite plus.jpg",
    heading: "ELITE PLUS",
    description: "Where luxury meets efficiency at every terminal.",
    price: "£350",
    features: [
      "Exclusive one-to-one service",
      "Electric Golf Buggy (Where Available)",
      "Fast Track through Immigration & Security",
      "Assistance with luggage collection",
      "Escort to/from your vehicle",
    ],
  },
  {
    id: "signature",
    image: "/packages/signature.jpg",
    heading: "SIGNATURE",
    description: "A seamless, private, crafted exclusively for you.",
    price: "£1,500",
    features: [
      "Our most luxurious VIP experience",
      "Private airport entrance and exit",
      "Dedicated security and immigration formalities",
      "Exclusive private lounge access",
      "Luxury chauffeur vehicles from & to the plane",
    ],
  },
];

export default function PackageCards() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!cardsRef.current) return;

    cardsRef.current.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        cardsRef.current.forEach((c, i) => {
          if (i === index) {
            gsap.to(c, { flex: "1.2 1 0%", duration: 0.5 });
          } else {
            gsap.to(c, { flex: "0.9 1 0%", duration: 0.5 });
          }
        });
      });

      card.addEventListener("mouseleave", () => {
        cardsRef.current.forEach((c) => {
          gsap.to(c, { flex: "1 1 0%", duration: 0.5 });
        });
      });
    });
  }, []);

  return (
    <div className="flex gap-6 justify-center mt-8 px-28 flex-wrap">
  {packages.map((pkg, i) => (
    <Card
      key={`card-${i}`}
      ref={(el) => {
        cardsRef.current[i] = el!;
      }}
      className="group flex flex-col min-w-[0] p-0 gap-0 overflow-hidden border border-outline-base bg-neutral-base flex-1"
    >
      {/* Image */}
      <div className="relative w-full h-[273px] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.heading}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 2xl:p-6">
        <div>
          <h3 className="font-manrope text-xl font-semibold leading-[150%] tracking-widest uppercase">
            {pkg.heading}
          </h3>
          <p className="font-manrope mt-2 text-md leading-[150%] font-normal text-[#61686e] min-h-10.5">
            {pkg.description}
          </p>
        </div>

        <p className="flex flex-col mt-auto text-gray-900">
          <span className="font-nunito font-bold text-lg leading-[115%] tracking-[0.06em] truncate">
            From
          </span>
          <span className="font-manrope font-bold text-3xl leading-[115%] tracking-[0%]">
            {pkg.price}
          </span>
        </p>

        <span className="w-full h-[0.5px] bg-gray-300 mb-4 block"></span>

        <ul className="space-y-2 mb-4">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black group-hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] transition-all duration-300 flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-white stroke-3" />
              </div>
              <span className="font-manrope text-sm text-gray-700 truncate">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          className="w-max cursor-pointer border-black text-black group-hover:border-0 group-hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] group-hover:text-white hover:text-white duration-0"
        >
          Book Now <ArrowUpRight />
        </Button>
      </div>
    </Card>
  ))}
</div>

  );
}
