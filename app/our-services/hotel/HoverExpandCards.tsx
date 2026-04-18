"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import gsap from "gsap";
import river from "@/public/hotel/expand/river.webp";
import royal from "@/public/hotel/expand/royal.webp";
import granville from "@/public/hotel/expand/granville.webp";
import sutherland from "@/public/hotel/expand/sutherland.webp";

const data = [
  { title: "River Suite", subtitle: "View River Suite", img: river },
  { title: "Royal Suite", subtitle: "View Royal Suite", img: royal },
  { title: "The Granville Suite", subtitle: "View The Granville Suite", img: granville },
  { title: "Sutherland Suite", subtitle: "View Sutherland Suite", img: sutherland },
];

export default function ExpandingCards() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const activeRef = useRef(0);
  const [, forceRender] = useState(0);

  const setRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  useEffect(() => {
    animate(0);
  }, []);

  const animate = (index: number) => {
    cardsRef.current.forEach((card, i) => {
      const content = card?.querySelector(".content") as HTMLElement | null;
      if (!card || !content) return;

      const isActive = i === index;

      // ✅ Kill any running tweens on these elements before starting new ones
      gsap.killTweensOf(card);
      gsap.killTweensOf(content);

      gsap.to(card, {
        flex: isActive ? 7 : 1,
        duration: 0.6,
        ease: "power3.out",
      });

      if (isActive) {
        gsap.set(content, { display: "block" });
        gsap.fromTo(
          content,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.15,
            ease: "power3.out",
          }
        );
      } else {
        // ✅ Set display:none immediately if it was already hidden
        if (content.style.opacity === "0" || content.style.display === "none") {
          gsap.set(content, { display: "none", opacity: 0, x: 0 });
          return;
        }

        gsap.to(content, {
          opacity: 0,
          x: -20,
          duration: 0.2, // ✅ أسرع شوية عشان ما يتراكمش
          onComplete: () => {
            gsap.set(content, { display: "none" });
          },
        });
      }
    });
  };

  const handleHover = (i: number) => {
    if (activeRef.current === i) return; // ✅ نفس الكارت؟ ignore
    activeRef.current = i;
    forceRender(i); // optional: لو محتاج re-render
    animate(i);
  };

  return (
    <div className="flex w-full gap-3 h-[550px]">
      {data.map((item, i) => (
        <Card
          key={i}
          ref={(el) => setRef(el as HTMLDivElement, i)}
          onMouseEnter={() => handleHover(i)}
          className="relative flex-1 overflow-hidden border-none rounded-none cursor-pointer"
        >
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover"
          />

          <div className="content absolute left-4 bottom-4 min-w-70 bg-white/75 px-4 py-2 hidden opacity-0">
            <h4 className="text-xl tracking-[2px]">{item.title}</h4>
            <p className="text-sm uppercase tracking-widest">
              {item.subtitle}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}