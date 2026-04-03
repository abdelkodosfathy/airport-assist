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
    image: "/sections/our_service_packages/elite.webp",
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
    image: "/sections/our_service_packages/elite_plus.webp",
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
    image: "/sections/our_service_packages/signature.webp",

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

  function splitTextAndBracket(text: string): {
    mainFeatureText: string;
    bracket: string;
  } {
    const match = text.match(/^(.*?)\s*(\(.+\))$/);

    if (!match) {
      return {
        mainFeatureText: text,
        bracket: "",
      };
    }

    return {
      mainFeatureText: match[1].trim(),
      bracket: match[2],
    };
  }
  return (
    // <div className="flex gap-6 justify-center mt-8 flex-col lg:flex-row px-4 sm:px-8 lg:px-12 xl:px-28 flex-wrap">
    <div className="mx-auto max-w-360 flex gap-6 justify-center flex-col lg:flex-row sflex-wrap">
      {packages.map((pkg, i) => (
        <Card
          key={`card-${i}`}
          ref={(el) => {
            cardsRef.current[i] = el!;
          }}
          className="group flex flex-col p-0 gap-0 overflow-hidden border border-outline-base bg-neutral-base flex-1"
        >
          {/* Image */}
          <div className="font-[Manrope] relative w-full h-[260px] 2xl:h-[290px] overflow-hidden">
            <Image
              src={pkg.image}
              alt={pkg.heading}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute bottom-0 w-full px-4 pt-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2">
              <h3 className=" font-normal text-white text-xl xl:text-[25px] leading-[150%] tracking-widest uppercase">
                {pkg.heading}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4 2xl:p-6">
            <div className="mb-4">
              <p className="font-manrope truncate mt-2 text-sm 2xl:text-md font-normal text-[#61686e]">
                {pkg.description}
              </p>
            </div>

            <p className="flex flex-col mt-auto text-gray-900">
              <span className="font-nunito  mb-1.5 text-sm 2xl:text-lg leading-[115%] tracking-[0.06em] truncate">
                From
              </span>
              <span className="font-[Manrope] text-2xl mb-3 leading-[115%] tracking-[0%]">
                {pkg.price}
              </span>
            </p>

            <span className="w-full h-[0.5px] bg-gray-300 mb-4 block"></span>

            <ul className="space-y-4 mb-4">
              {pkg.features.map((feature, index) => {
                const { mainFeatureText, bracket } =
                  splitTextAndBracket(feature);

                return (
                  <li key={index} className="flex items-start gap-2 2xl:gap-4">
                    <div className="flex items-center justify-center w-3.75 h-3.75 rounded-full bg-black group-hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] transition-all duration-300 flex-shrink-0">
                      <Check className="w-2.25 h-2.25 text-white  stroke-4" />
                    </div>
                    <div className="font-manrope text-sm text-gray-700 truncate">
                      <p>
                        {mainFeatureText} {bracket && <span className="text-xs">{bracket}</span>}
                      </p>
                      {/* {feature} */}
                    </div>
                  </li>
                );
              })}
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
