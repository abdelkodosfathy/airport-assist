"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function HoverExpandCards() {
  const cards = [
    {
      id: 1,
      title: "PRIVATE ENTRANCE",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/check-in-despacho.png",
    },
    {
      id: 2,
      title: "Assisted check-in and baggage drop-off",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/concierge-dedicado.png",
    },
    {
      id: 3,
      title: "DEDICATED CONCIERGE",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/entrada-privada.png",
    },
    {
      id: 4,
      title: " On-site security and immigration",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/raiox.png",
    },
    {
      id: 5,
      title: "On-site security and immigration",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/transfer.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [key, setKey] = useState(0);

  // ------------------------------------------
  // GSAP overlay animation refs
  // ------------------------------------------
  // const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const timelines = useRef<gsap.core.Timeline[]>([]);

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  useLayoutEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;

      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        el,
        { x: -600, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );

      timelines.current[i] = tl;
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
    setKey((prev) => prev + 1);

    // تشغيل الأنيميشن
    timelines.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    setIsPaused(false);
    setKey((prev) => prev + 1);

    // رجّع overlay للشمال
    timelines.current[index]?.reverse();
  };

  // ------------------------------------------
  // Auto-play slider
  // ------------------------------------------
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
      setKey((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, cards.length]);

  return (
    <div className="w-full h-full max-h-[620px] max-w-[1440px] mx-auto flex flex-nowrap gap-4 p-4">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="flex flex-col gap-3"
          style={{
            alignSelf: index % 2 === 0 ? "flex-end" : "flex-start",
            flexGrow: index === activeIndex ? 5 : 1,
            flexBasis: 0,
            transition: "flex-grow 500ms ease-in-out",
            minWidth: "60px",
          }}
        >
          <div
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="relative overflow-hidden h-125 cursor-pointer"
          >
            <div className="w-full h-full relative">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay — أضف ref هنا */}
              <div
                className="absolute bottom-0 left-0 w-full text-white p-10 pt-12 
             bg-gradient-to-t from-black to-transparent"
              >
                {/* Container النصوص — اللي عليه الأنيميشن بس */}
                <div
                  ref={(el) => {textRefs.current[index] = el}}
                  style={{ opacity: 0 }}
                >
                  <h2 className="text-xl tracking-[0.3em] mb-10 w-120">
                    {card.title}
                  </h2>

                  <p className="w-150">{card.textContent}</p>
                </div>
              </div>
            </div>

            {/* Timeline bar */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
              {index === activeIndex && (
                <div
                  key={key}
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

          <p className="text-white max-w-38 m-auto text-center px-2">
            {card.title}
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
  );
}
