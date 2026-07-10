"use client";

import { useLayoutEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceSectionProps = {
  left?: boolean;
  title: string;
  content: string;
  image: StaticImageData; // الصورة جاية من props
};

const ServiceSection = ({
  left,
  title,
  content,
  image,
}: ServiceSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const textsRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

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

      const imagesTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      imagesTl.from(firstImageRef.current, {
        x: left ? 150 : -150,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

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
    }, sectionRef);

    return () => ctx.revert();
  }, [left]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden w-full max-w-340 relative"
    >
      <div
        className={`
          flex flex-col lg:flex-row
          py-10 lg:py-15.75
          gap-8 lg:gap-20 xl:gap-40
          relative
          ${left ? "lg:flex-row-reverse" : ""}
        `}
      >
        {/* Images */}
        <div className="flex-1 flex relative">
          <Image
            ref={firstImageRef}
            alt={title}
            src={image}
            width={414}
            height={231}
            className="
              w-full
              max-w-full
              lg:max-w-110
              aspect-116/69
              rounded-lg
              object-cover
              border border-gray-300
            "
          />
        </div>

        {/* Star */}
        <div className="hidden lg:flex absolute left-1/2 top-0 items-center h-full -translate-x-1/2 z-10">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[160%] w-px bg-gray-300 -z-10" />
          <Star ref={starRef} />
        </div>

        {/* Text */}
        <div className="flex-1 space-y-6">
          <div ref={textsRef} className="flex flex-col">
            <h3 className="font-[Manrope] text-[#7B5A41] tracking-[4.6px] uppercase mb-4 lg:mb-6">
              {title}
            </h3>

            <p className="font-[Manrope] leading-[1.6] mb-8 max-w-131.25 normal-case">
              {content}
            </p>
          </div>
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
    {" "}
    <path
      d="M27.8425 29.032L23.1906 41.9901C23.0767 42.301 22.8713 42.5697 22.6021 42.7601C22.3329 42.9505 22.0127 43.0534 21.6847 43.055C21.3566 43.0567 21.0363 42.9569 20.7669 42.7692C20.4974 42.5815 20.2917 42.3148 20.1773 42.005L15.508 29.0929C15.4265 28.8704 15.298 28.6685 15.1314 28.5013C14.9648 28.3341 14.7641 28.2056 14.5431 28.1245L1.72326 23.4842C1.41562 23.3705 1.15022 23.1644 0.962723 22.8935C0.775224 22.6226 0.674605 22.2999 0.674382 21.9688C0.67416 21.6377 0.774346 21.314 0.96148 21.0413C1.14861 20.7685 1.41373 20.5598 1.72122 20.443L14.5347 15.6761C14.7556 15.5928 14.9561 15.4623 15.1225 15.2934C15.2889 15.1246 15.4171 14.9215 15.4983 14.6981L20.1503 1.74003C20.2642 1.42906 20.4696 1.16034 20.7388 0.969961C21.008 0.779583 21.3281 0.67667 21.6562 0.675049C21.9843 0.673428 22.3046 0.773175 22.574 0.960891C22.8435 1.14861 23.0492 1.4153 23.1636 1.72514L27.8329 14.6372C27.9144 14.8597 28.0429 15.0616 28.2095 15.2288C28.3761 15.3959 28.5768 15.5245 28.7978 15.6056L41.6176 20.2459C41.9253 20.3596 42.1907 20.5657 42.3782 20.8366C42.5657 21.1075 42.6663 21.4302 42.6665 21.7613C42.6667 22.0924 42.5665 22.416 42.3794 22.6888C42.1923 22.9615 41.9272 23.1703 41.6197 23.287L28.8062 28.054C28.5853 28.1373 28.3848 28.2678 28.2184 28.4367C28.052 28.6055 27.9238 28.8086 27.8425 29.032Z"
      fill="white"
      stroke="url(#paint0_linear_1338_714)"
      strokeOpacity="0.41"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <defs>
      {" "}
      <linearGradient
        id="paint0_linear_1338_714"
        x1="21.6562"
        y1="0.675049"
        x2="23.3822"
        y2="96.4436"
        gradientUnits="userSpaceOnUse"
      >
        {" "}
        <stop stopColor="#664F31" />{" "}
        <stop offset="1" stopColor="#DFB08D" />{" "}
      </linearGradient>{" "}
    </defs>{" "}
  </svg>
);
