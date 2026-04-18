"use client";
import { CarSlide } from "@/lib/types/carSlider";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface CarImageSliderProps {
  slides: CarSlide[];
  left?: boolean;
  dark?: boolean;
}

export default function CarImageSlider({
  dark,
  slides,
  left = false,
}: CarImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const animating = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (animating.current) return;
      animating.current = true;

      gsap.to(overlayRef.current, {
        opacity: 0.4,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
        },
      });

      setCurrent(next);
      gsap.to(trackRef.current, {
        xPercent: -(next / slides.length) * 100,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          animating.current = false;
          gsap.fromTo(
            labelRef.current,
            { opacity: 0, y: 3 },
            { opacity: 1, y: 0, duration: 0.25 },
          );
        },
      });
    },
    [slides.length],
  );

  // ── Drag / Swipe ──────────────────────────────────────────────────────────
  const onDragStart = useCallback((clientX: number) => {
    if (animating.current) return;
    dragStart.current = clientX;
    isDragging.current = false;
  }, []);

  const onDragEnd = useCallback(
    (clientX: number) => {
      if (dragStart.current === null) return;
      const diff = dragStart.current - clientX;
      dragStart.current = null;

      if (Math.abs(diff) < 40) return; // too small → ignore
      isDragging.current = true;
      diff > 0
        ? goTo((current + 1) % slides.length)
        : goTo((current - 1 + slides.length) % slides.length);
    },
    [current, slides.length, goTo],
  );

  // prevent click firing after drag
  const onClickGuard = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      e.stopPropagation();
      isDragging.current = false;
    }
  }, []);

  return (
    <div
      className={`relative ml-none max-w-full md:max-w-fit mx-auto md:ml-8 lg:ml-none lg:absolute h-70 w-120  lg:h-80 lg:w-122  xl:h-95 xl:w-135 overflow-hidden border ${dark ? "border-none" : "border-[#E0E0E0]"}
        z-10 ${left ? "right-0" : "lg:-left-8 xl:left-0"} top-1/2 lg:-translate-y-1/2 select-none`}
      onClick={onClickGuard}
      // Mouse drag
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseUp={(e) => onDragEnd(e.clientX)}
      onMouseLeave={() => {
        dragStart.current = null;
      }}
      // Touch swipe
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${slides.length * 100}%` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{ width: `${100 / slides.length}%`, flexShrink: 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              className="h-full w-full object-cover"
              loading={"lazy"}
            />
          </div>
        ))}
      </div>

      {/* Flash overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />

      {/* Drag cursor hint */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goTo((current - 1 + slides.length) % slides.length);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 items-center
          justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm
          hover:bg-black/50 transition-colors md:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goTo((current + 1) % slides.length);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 items-center
          justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm
          hover:bg-black/50 transition-colors md:flex"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            className={`h-1.5 rounded-full bg-white transition-all duration-300
              ${i === current ? "w-4 opacity-90" : "w-1.5 opacity-30"}`}
          />
        ))}
      </div>

      {/* Label */}
      {/* <span
        ref={labelRef}
        className="absolute top-3 left-3 z-10 rounded bg-black/40 px-2.5 py-1
          text-[11px] tracking-widest text-white/75 border border-white/10"
      >
        {slides[current].label}
      </span> */}
    </div>
  );
}
