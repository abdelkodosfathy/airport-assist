// "use client";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import { PackageCardProps, pkgData } from "./services-data";
// import { useState } from "react";

// export default function PackageCard({
//   pkg,
//   index,
//   serviceImage,
// }: PackageCardProps) {
//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

//   const isEven = index % 2 === 0;
//   const wrapperGradient = isEven
//     ? "linear-gradient(120deg, rgba(161,101,56) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(161,101,56,1) 100%)"
//     : "linear-gradient(130deg,#FFFFFF98 0%,#1a1a1a 20%,#1a1a1a 80%,#ffffff98 100%)";

//   const innerBg = isEven ? "bg-[#f2f1ef]" : "bg-[#1a1a1a]";
//   const borderColor = isEven ? "border-gray-300" : "border-[#1a1a1a]";

//   const pkgContent = pkgData[pkg.package.package_slug];
//   console.log(pkgContent);

//   return (
//     <div
//       className={`${
//         isEven ? "bg-white" : "bg-[#1A1A1A] text-white"
//       } px-8 py-5 rounded-xl shadow-sm`}
//     >
//       <h2
//         className={`text-[20px] leading-[40px] ${isEven ? "text-[#0A0A0A]" : "text-white"}`}
//       >
//         {pkgContent?.title}
//       </h2>

//       <p
//         className={`text-xs uppercase ${isEven ? "text-[#7B5A41]" : "text-[white]"}`}
//       >
//         VIP Meet & Greet
//       </p>

//       <p
//         className={`text-xs my-6 leading-[28px] ${isEven ? "text-[#6D6D6D]" : "text-[#BFBFBF]"}`}
//       >
//         {pkgContent?.service[currentServiceIndex].description}
//       </p>

//       <div className="flex gap-24 relative">
//         {/* Image Section */}
//         <div
//           className="h-93.25 w-41.5 p-0.5"
//           style={{ background: wrapperGradient }}
//         >
//           <div className={`relative w-full h-full ${innerBg}`}>
//             <Image
//               alt="service image"
//               src={serviceImage}
//               width={180}
//               height={258}
//               className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-45 h-64.5 object-cover border ${borderColor}`}
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div>
//           <p
//             className={`uppercase font-bold leading-[46px] tracking-[4.6px] ${isEven ? "text-[#878989]" : "text-white"}`}
//           >
//             {pkgContent?.service[currentServiceIndex].title}
//           </p>

//           <ul className="list-disc ml-5">
//             {pkgContent?.features.map((f: string) => (
//               <li key={f}>{f}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="flex justify-between w-full max-w-full mx-auto">
//         <Button
//           variant="outline"
//           className="w-max mt-4 px-10 py-5 cursor-pointer  border-[#D1D1D1]  text-[#7A7A7A]  bg-[#ECECEC] hover:border-[#664F31]   hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)]  hover:text-white  duration-0 rounded-xl "
//           onClick={() => {
//             setCurrentServiceIndex((prev) => Math.max(prev - 1, 0));
//           }}
//         >
//           <ChevronLeft />
//         </Button>
//         <Button
//           variant="outline"
//           className="w-max mt-4 px-10 py-5 cursor-pointer border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0 rounded-xl"
//           onClick={() => {
//             setCurrentServiceIndex((prev) => Math.min(prev + 1, 2));
//           }}
//         >
//           <ChevronRight />
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PackageCardProps, pkgData } from "./services-data";
import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function PackageCard({
  pkg,
  index,
  serviceImage,
}: PackageCardProps) {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const serviceTagRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const serviceTitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  const isEven = index % 2 === 0;
  const wrapperGradient = isEven
    ? "linear-gradient(120deg, rgba(161,101,56) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(161,101,56,1) 100%)"
    : "linear-gradient(130deg,#FFFFFF98 0%,#1a1a1a 20%,#1a1a1a 80%,#ffffff98 100%)";

  const innerBg = isEven ? "bg-[#f2f1ef]" : "bg-[#1a1a1a]";
  const borderColor = isEven ? "border-gray-300" : "border-[#1a1a1a]";

  const pkgContent = pkgData[pkg.package.package_slug] || pkgData.elite;

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (isAnimating) return;

      const nextIndex =
        dir === "right"
          ? Math.min(currentServiceIndex + 1, 2)
          : Math.max(currentServiceIndex - 1, 0);

      if (nextIndex === currentServiceIndex) return;

      setIsAnimating(true);

      const xOut = dir === "right" ? -30 : 30;
      const xIn = dir === "right" ? 30 : -30;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      // ─── EXIT: كل عنصر بتوقيت مختلف ───────────────────────────────────

      // الصورة تطلع أول — بتأخير أبطأ وحركة أكبر
      tl.to(
        imageWrapperRef.current,
        {
          x: xOut * 1.6,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0,
      );

      // الوصف بعديها بشوية
      tl.to(
        descriptionRef.current,
        {
          x: xOut,
          opacity: 0,
          duration: 0.22,
          ease: "power2.in",
        },
        0.04,
      );

      // العنوان بعد الوصف
      tl.to(
        serviceTitleRef.current,
        {
          x: xOut * 0.8,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0.09,
      );

      // الفيتشرز آخر شيء يطلع
      tl.to(
        featuresRef.current,
        {
          x: xOut * 0.6,
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
        },
        0.15,
      );

      // ─── تحديث الـ state في منتصف الـ timeline ────────────────────────
      tl.add(() => {
        setCurrentServiceIndex(nextIndex);
      });

      // ─── إعادة تعيين المواضع قبل الدخول (فورية) ──────────────────────
      tl.set(imageWrapperRef.current, { x: xIn * 1.6, opacity: 0 });
      tl.set(descriptionRef.current, { x: xIn, opacity: 0 });
      tl.set(serviceTitleRef.current, { x: xIn * 0.8, opacity: 0 });
      tl.set(featuresRef.current, { x: xIn * 0.6, opacity: 0 });

      // ─── ENTER: كل عنصر يدخل بتوقيت مختلف ───────────────────────────

      // الصورة تدخل أول وبتأخير خاص
      tl.to(
        imageWrapperRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        "+=0",
      );

      // الوصف بعد الصورة بشوية
      tl.to(
        descriptionRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.38,
          ease: "power3.out",
        },
        "-=0.35",
      );

      // العنوان بعد الوصف
      tl.to(
        serviceTitleRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
        },
        "-=0.28",
      );

      // الفيتشرز آخر شيء يدخل
      tl.to(
        featuresRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.32,
          ease: "power3.out",
        },
        "-=0.22",
      );
    },
    [currentServiceIndex, isAnimating],
  );

  return (
    <div
      className={`${
        isEven ? "bg-white" : "bg-[#1A1A1A] text-white"
      } px-8 py-5 rounded-xl shadow-sm overflow-hidden`}
    >
      <h2
        className={`text-[20px] leading-[40px] ${isEven ? "text-[#0A0A0A]" : "text-white"}`}
      >
        {/* {pkgContent.title} */}
        {pkg.package.package_name}
      </h2>

      <p
        ref={serviceTagRef}
        className={`text-xs uppercase ${isEven ? "text-[#7B5A41]" : "text-white"}`}
      >
        VIP Meet & Greet
      </p>

      {/* Description */}
      <p
        ref={descriptionRef}
        className={`text-xs my-6 leading-[28px] ${isEven ? "text-[#6D6D6D]" : "text-[#BFBFBF]"}`}
      >
        {pkgContent.service[currentServiceIndex].description}
      </p>

      <div className="flex gap-24 relative">
        {/* Image Section */}
        <div
          ref={imageWrapperRef}
          className="h-93.25 w-41.5 p-0.5 flex-shrink-0"
          style={{ background: wrapperGradient }}
        >
          <div className={`relative w-full h-full ${innerBg}`}>
            <Image
              alt="service image"
              src={serviceImage}
              width={180}
              height={258}
              className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-45 h-64.5 object-cover border ${borderColor}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <p
            ref={serviceTitleRef}
            className={`uppercase font-bold leading-[46px] tracking-[4.6px] ${isEven ? "text-[#878989]" : "text-white"}`}
          >
            {pkgContent.service[currentServiceIndex].title}
          </p>

          <ul ref={featuresRef} className="list-disc ml-5">
            {pkgContent.features.map((f: string) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-full mx-auto">
        <Button
          variant="outline"
          className={`w-max mt-4 px-10 py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
      ${
        isEven
          ? "border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white"
          : "border-white text-white bg-[#2A2A2A] hover:border-[#DFB08D] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white"
      }`}
          onClick={() => navigate("left")}
          disabled={currentServiceIndex === 0 || isAnimating}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className={`w-max mt-4 px-10 py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
      ${
        isEven
          ? "border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white"
          : "border-white text-white bg-[#2A2A2A] hover:border-[#DFB08D] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white"
      }`}
          onClick={() => navigate("right")}
          disabled={currentServiceIndex === 2 || isAnimating}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
