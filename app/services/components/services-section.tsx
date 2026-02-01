"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Check } from "lucide-react";
import serviceImage from "@/public/services-image.jpg";

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = ({ left }: { left?: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const imagesBoxRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const secondImageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Star rotate
      gsap.fromTo(
        starRef.current,
        { rotation: 0, transformOrigin: "50% 50%" },
        {
          rotation: 180,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // Timeline للصور
      const imagesTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Gradient container box slide in from right
      imagesTl.from(imagesBoxRef.current, {
        duration: 0.8,
        ease: "power3.out",
        onUpdate: function () {
          const progress = this.progress(); // 0 → 1
          const startAngle = 210; // زاوية البداية
          const endAngle = startAngle + -90; // زاوية النهاية +90
          const rotateAngle = startAngle + (endAngle - startAngle) * progress;

          imagesBoxRef.current!.style.background = `linear-gradient(${rotateAngle}deg, rgba(161,101,56,1) 0%, #f2f1ef 15%, #f2f1ef 85%, rgba(161,101,56,1) 100%)`;
        },
        opacity: 0, // لو عايز fade
      });

      // First image slide in from top-left
      imagesTl.from(
        firstImageRef.current,
        {
          x: left ? 150 : -150,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );

      // Second image slide in from top-left
      imagesTl.from(
        secondImageRef.current,
        {
          x: left ? 150 : -150,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Texts slide in from right to left
      gsap.from(textsRef.current, {
        x: left ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Features grid slide in from right to left
      gsap.from(boxRef.current, {
        x: left ? -100 : 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden w-full max-w-[1214px] mx-auto mt-20 mb-26 px-4 lg:px-0 relative"
    >
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-gray-400 mb-3">
        Services
      </p>
      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Departure
      </h2>

      <div
        className={`flex ${
          left ? "flex-row-reverse" : "flex-row"
        } gap-8 lg:gap-28 relative`}
      >
        {/* Images */}
        <div className="flex-1 relative">
          <div
            ref={imagesBoxRef}
            className="w-max p-[2px]"
            style={{
              background:
                "linear-gradient(120deg, rgba(161, 101, 56) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(161,101,56,1) 100%)",
            }}
          >
            <div
              className="relative w-[315px] h-[625px] bg-[#f2f1ef]"
              // style={{
              //   background:
              //     "linear-gradient(179.26deg, #f9f9fa 0.64%, #fefcfa 223.79%)",
              // }}
            >
              <Image
                ref={firstImageRef}
                alt="service image"
                src={serviceImage}
                width={427.42}
                height={390.75}
                className="absolute top-[99.38px] left-[88.76px] w-[427.42px] h-[390.75px] object-cover border border-gray-300"
              />
              <Image
                ref={secondImageRef}
                alt="service image"
                src={serviceImage}
                width={427.42}
                height={390.75}
                className="absolute top-[303.92px] left-[270px] w-[283.77px] h-[259.43px] object-cover border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Star */}
        <div className="absolute left-1/2 top-0 flex items-center h-full -translate-x-1/2 z-10">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gray-300 -z-10"></span>
          <Star ref={starRef} />
        </div>

        {/* Text & Gradient Box */}
        <div className="flex-1 space-y-6">
          <div ref={textsRef}>
            <h3 className="font-[Manrope] font-normal text-[1rem] leading-11.5 tracking-[4.6px] uppercase mb-6 text-gray-500">
              Service Name
            </h3>
            <p className="font-[Manrope] font-normal  text-[1.1rem] leading-9.75 mb-8 text-gray-700 max-w-[525px]">
              Carefully constructed with style and sophistication – each of our
              private lounges are designed to help you unwind, concentrate on
              work or relax with your invited guest or family. The beautiful
              artwork is curated by our partner
            </p>
          </div>

          <div ref={boxRef} className="grid grid-cols-2 gap-4 mb-8">
            {[
              "Professional Drivers",
              "Always on Time",
              "Luxury Vehicles",
              "Smooth rides",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black group-hover:bg-gradient-to-b from-[#664F31] to-[#DFB08D] transition-all duration-300 flex-shrink-0">
                  <Check className="w-5 h-5 text-white stroke-3" />
                </div>
                <span className="font-[Manrope] text-[16px] leading-[160%] text-gray-600">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="px-10 py-2 rounded-[16px] border-2 border-[rgb(150,107,75)] text-white font-normal text-base bg-gradient-to-b from-[rgb(123,90,65)] to-[rgb(201,139,92)]">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

const Star = ({ ref }: any) => (
  <svg
    ref={ref}
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.8425 29.032L23.1906 41.9901C23.0767 42.301 22.8713 42.5697 22.6021 42.7601C22.3329 42.9505 22.0127 43.0534 21.6847 43.055C21.3566 43.0567 21.0363 42.9569 20.7669 42.7692C20.4974 42.5815 20.2917 42.3148 20.1773 42.005L15.508 29.0929C15.4265 28.8704 15.298 28.6685 15.1314 28.5013C14.9648 28.3341 14.7641 28.2056 14.5431 28.1245L1.72326 23.4842C1.41562 23.3705 1.15022 23.1644 0.962723 22.8935C0.775224 22.6226 0.674605 22.2999 0.674382 21.9688C0.67416 21.6377 0.774346 21.314 0.96148 21.0413C1.14861 20.7685 1.41373 20.5598 1.72122 20.443L14.5347 15.6761C14.7556 15.5928 14.9561 15.4623 15.1225 15.2934C15.2889 15.1246 15.4171 14.9215 15.4983 14.6981L20.1503 1.74003C20.2642 1.42906 20.4696 1.16034 20.7388 0.969961C21.008 0.779583 21.3281 0.67667 21.6562 0.675049C21.9843 0.673428 22.3046 0.773175 22.574 0.960891C22.8435 1.14861 23.0492 1.4153 23.1636 1.72514L27.8329 14.6372C27.9144 14.8597 28.0429 15.0616 28.2095 15.2288C28.3761 15.3959 28.5768 15.5245 28.7978 15.6056L41.6176 20.2459C41.9253 20.3596 42.1907 20.5657 42.3782 20.8366C42.5657 21.1075 42.6663 21.4302 42.6665 21.7613C42.6667 22.0924 42.5665 22.416 42.3794 22.6888C42.1923 22.9615 41.9272 23.1703 41.6197 23.287L28.8062 28.054C28.5853 28.1373 28.3848 28.2678 28.2184 28.4367C28.052 28.6055 27.9238 28.8086 27.8425 29.032Z"
      fill="white"
      stroke="url(#paint0_linear_1338_714)"
      strokeOpacity="0.41"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1338_714"
        x1="21.6562"
        y1="0.675049"
        x2="23.3822"
        y2="96.4436"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#664F31" />
        <stop offset="1" stopColor="#DFB08D" />
      </linearGradient>
    </defs>
  </svg>
);
