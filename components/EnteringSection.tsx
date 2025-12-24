"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AirportInvitation({
  left = false,
  imgOne,
  imgTwo,
  heading,
  content,
}: {
  left?: boolean;
  imgOne: string;
  imgTwo: string;
  heading: string
  content: string
}) {
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!img1Ref.current || !img2Ref.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" },
      scrollTrigger: {
        trigger: img1Ref.current.parentElement, // الكونتينر العام للصور
        start: "top 80%", // يبدأ الانيميشن عندما يصل أعلى الكونتينر إلى 75% من الشاشة
        end: "bottom top",
        toggleActions: "play reverse play reverse", // كل مرة يدخل/يخرج
        invalidateOnRefresh: true,
      },
    });

    // الصورة الأولى: تبدأ 80% → 100%
    tl.fromTo(
      img1Ref.current,
      { width: left ? "65%" : "100%", x: left ? "-100%" : "100%", opacity: 0 },
      { width: left ? "100%" : "65%", x: left ? "0%" : "0%", opacity: 1 },
      0
    );

    // الصورة الثانية: تبدأ 100% → 80%
    tl.fromTo(
      img2Ref.current,
      { width: left ? "100%" : "65%", x: left ? "-100%" : "100%", opacity: 0 },
      { width: left ? "65%" : "100%", x: left ? "0%" : "0%", opacity: 1 },
      0
    );
  // }, []);


      const hover1 = () => {
      gsap.to(img1Ref.current, { width: "100%", duration: 0.5, ease: "power3.out" });
      gsap.to(img2Ref.current, { width: "65%", duration: 0.5, ease: "power3.out" });
    };
    const hover2 = () => {
      gsap.to(img2Ref.current, { width: "100%", duration: 0.5, ease: "power3.out" });
      gsap.to(img1Ref.current, { width: "65%", duration: 0.5, ease: "power3.out" });
    };
    const reset = () => {
      gsap.to(img1Ref.current, { width: left ? "100%" : "65%", duration: 0.5, ease: "power3.out" });
      gsap.to(img2Ref.current, { width: left ? "65%" : "100%", duration: 0.5, ease: "power3.out" });
    };
    if(img1Ref.current && img2Ref.current){

      img1Ref.current.addEventListener("mouseenter", hover1);
      img2Ref.current.addEventListener("mouseenter", hover2);
      img1Ref.current.addEventListener("mouseleave", reset);
      img2Ref.current.addEventListener("mouseleave", reset);
      
      return () => {
        img1Ref.current?.removeEventListener("mouseenter", hover1);
        img2Ref.current?.removeEventListener("mouseenter", hover2);
        img1Ref.current?.removeEventListener("mouseleave", reset);
        img2Ref.current?.removeEventListener("mouseleave", reset);
      };
    }
  }, [left]);


  return (
    <section
      className="px-28 py-16 flex items-center"
    >
      <div className={`flex max-w-360 mx-auto ${
        left ? "flex-row-reverse" : ""
      } gap-14 items-center overflow-hidden`}>

        {/* ------------ LEFT TEXT ------------ */}
        <div className="flex-3">
          <h2 className="font-[Manrope] font-normal text-3xl leading-[128%] tracking-[10px] uppercase">
            {heading}
          </h2>

          <p className="mt-6 font-[Manrope] font-normal text-md leading-[150%] tracking-[9%] text-[#555] max-w-[520px]">
            {content}
          </p>
        </div>

        {/* ------------ RIGHT IMAGES ------------ */}
        <div className="flex flex-4 gap-4">
          {/* الصورة الأولى */}
          <div ref={img1Ref} className="overflow-hidden rounded-2xl h-64">
            <img
              // src="/sections/img1.jpg"
              src={imgOne}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* الصورة الثانية */}
          <div ref={img2Ref} className="overflow-hidden rounded-2xl h-64">
            <img
              src={imgTwo}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
