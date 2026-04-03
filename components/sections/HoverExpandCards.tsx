"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
export const cards = [
  {
    id: 1,
    title: "VIP Meet & Greet Services",
    link: "/our-services/vip-meet-and-greet",
    textContent:
      "Enhancing your journey with private greeter assistance and fast-track airport procedures.",
    image: "/carousel/VipMeetAndGreet.png",
    top: "top-30",
  },
  {
    id: 2,
    title: "Tarmac Services",
    link: "/our-services/private-suite",
    textContent:
      "Our most exclusive offering, providing the highest level of luxury airport assistance across 500+ destinations worldwide.",
    image: "/carousel/TarmacServices.png",
    top: "top-40",
  },
  {
    id: 3,
    title: "Luxury Chauffeur Services",
    link: "/our-services/chauffeuring",
    textContent:
      "Experience seamless chauffeur-driven transfers between the airport and your destination.",
    image: "/carousel/LuxuryChauffeur.webp",
    top: "top-50",
  },

  {
    id: 4,
    title: "Private Jet Services",
    link: "/private-jet",
    textContent:
      "Experience seamless travel with private airport assistance and priority fast-track procedures.",
    image: "/carousel/PrivateJetServices.webp",
    top: "top-60",
  },

  {
    id: 5,
    title: "A Truly Magical Grand Hotel",
    link: "/our-services/hotel",
    textContent:
      "Our elegant rooms and suites blend space, style, and tranquility, creating a refined city retreat for ultimate comfort and relaxation.",
    image: "/carousel/ATrulyMagicalGrandHotel.webp",
    top: "top-70",
  },
];

export default function HoverExpandCards() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ------------------------------------------
  // GSAP overlay animation refs
  // ------------------------------------------
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const titleTimelines = useRef<gsap.core.Timeline[]>([]);

  useLayoutEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;

      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        el,
        { x: -600, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 },
      );

      timelines.current[i] = tl;
    });

    // Title animation timelines
    titleRefs.current.forEach((el, i) => {
      if (!el) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(el, { opacity: 0, duration: 0.3, ease: "power2.inOut" });

      titleTimelines.current[i] = tl;
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    timelines.current[activeIndex]?.reverse();
    titleTimelines.current[activeIndex]?.reverse();
    setIsPaused(true);

    setActiveIndex(index);
    timelines.current[index]?.play();
    titleTimelines.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    setIsPaused(false);
  };

  // ------------------------------------------
  // Auto-play slider
  // ------------------------------------------
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => {
        timelines.current[activeIndex]?.reverse();
        titleTimelines.current[activeIndex]?.reverse();
        return (prev + 1) % cards.length;
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, cards.length]);

  useEffect(() => {
    timelines.current[activeIndex]?.play();
    titleTimelines.current[activeIndex]?.play();
  }, [activeIndex]);

  return (
    <section className="hidden xl:block bg-neutral-900 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26 overflow-visible">
      <div className="max-w-360 mx-auto h-200 flex items-center overflow-visible">
        <div className="w-full pt-10 h-150 max-h-150 mx-auto flex flex-nowrap gap-4">
          {cards.map((card, index) => (
            <div
              onClick={() => {
                router.push(card.link);
              }}
              key={card.id}
              className={`relative flex flex-col gap-3 ${index % 2 === 0 ? "-mt-10" : "mt-0"}`}
              style={{
                // alignSelf: index % 2 === 0 ? "flex-end" : "flex-start",
                flexGrow: index === activeIndex ? 5 : 1,
                flexBasis: 0,
                transition: "flex-grow 500ms ease-in-out",
                minWidth: "60px",
              }}
            >
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="relative overflow-hidden h-125 rounded-md cursor-pointer"
              >
                <div className="w-full h-full relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute bottom-0 left-0 w-full text-white p-10 pt-12 
                      bg-gradient-to-t from-black/90 via-black/80  to-transparent"
                  >
                    {/* Container النصوص */}
                    <div
                      ref={(el) => {
                        textRefs.current[index] = el;
                      }}
                      style={{ opacity: 0 }}
                    >
                      <h2 className="text-xl uppercase tracking-[3px] mb-4 w-120">
                        {card.title}
                      </h2>

                      <p className="w-150">{card.textContent}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline bar */}
                <div className="absolute bottom-1 left-5 right-5 rounded-full  h-0.5 bg-white/20">
                  {index === activeIndex && (
                    <div
                      className="h-full bg-white"
                      style={{
                        animation: isPaused
                          ? "none"
                          : "fillTimeline 3s linear forwards",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Title below card with fade animation */}
              <p
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="text-white max-w-38 mx-auto text-center px-2"
              >
                {index !== activeIndex && card.title}
              </p>
            </div>
          ))}

          <style>{`
        @keyframes fillTimeline {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
        </div>
      </div>
    </section>
  );
}
