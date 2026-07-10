// "use client";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import { PackageCardProps, pkgData } from "./services-data";
// import { useState, useRef, useCallback } from "react";
// import { gsap } from "gsap";

// export default function PackageCard({
//   pkg,
//   // index,
//   serviceImage,
// }: PackageCardProps) {
//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const imageWrapperRef = useRef<HTMLDivElement>(null);
//   const serviceTagRef = useRef<HTMLParagraphElement>(null);
//   const descriptionRef = useRef<HTMLParagraphElement>(null);
//   const serviceTitleRef = useRef<HTMLParagraphElement>(null);
//   const featuresRef = useRef<HTMLUListElement>(null);

//   const pkgContent = pkgData[pkg.package.package_slug] || pkgData.elite;
//   console.log(pkgContent);

//   const navigate = useCallback(
//     (dir: "left" | "right") => {
//       if (isAnimating) return;

//       const nextIndex =
//         dir === "right"
//           ? Math.min(currentServiceIndex + 1, 2)
//           : Math.max(currentServiceIndex - 1, 0);

//       if (nextIndex === currentServiceIndex) return;

//       setIsAnimating(true);

//       const xOut = dir === "right" ? -30 : 30;
//       const xIn = dir === "right" ? 30 : -30;

//       const tl = gsap.timeline({
//         onComplete: () => {
//           setIsAnimating(false);
//         },
//       });

//       // ─── EXIT: كل عنصر بتوقيت مختلف ───────────────────────────────────

//       // الصورة تطلع أول — بتأخير أبطأ وحركة أكبر
//       tl.to(
//         imageWrapperRef.current,
//         {
//           x: xOut * 1.6,
//           opacity: 0,
//           duration: 0.3,
//           ease: "power2.in",
//         },
//         0,
//       );

//       // الوصف بعديها بشوية
//       tl.to(
//         descriptionRef.current,
//         {
//           x: xOut,
//           opacity: 0,
//           duration: 0.22,
//           ease: "power2.in",
//         },
//         0.04,
//       );

//       // العنوان بعد الوصف
//       tl.to(
//         serviceTitleRef.current,
//         {
//           x: xOut * 0.8,
//           opacity: 0,
//           duration: 0.2,
//           ease: "power2.in",
//         },
//         0.09,
//       );

//       // الفيتشرز آخر شيء يطلع
//       tl.to(
//         featuresRef.current,
//         {
//           x: xOut * 0.6,
//           opacity: 0,
//           duration: 0.18,
//           ease: "power2.in",
//         },
//         0.15,
//       );

//       // ─── تحديث الـ state في منتصف الـ timeline ────────────────────────
//       tl.add(() => {
//         setCurrentServiceIndex(nextIndex);
//       });

//       // ─── إعادة تعيين المواضع قبل الدخول (فورية) ──────────────────────
//       tl.set(imageWrapperRef.current, { x: xIn * 1.6, opacity: 0 });
//       tl.set(descriptionRef.current, { x: xIn, opacity: 0 });
//       tl.set(serviceTitleRef.current, { x: xIn * 0.8, opacity: 0 });
//       tl.set(featuresRef.current, { x: xIn * 0.6, opacity: 0 });

//       // ─── ENTER: كل عنصر يدخل بتوقيت مختلف ───────────────────────────

//       // الصورة تدخل أول وبتأخير خاص
//       tl.to(
//         imageWrapperRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.45,
//           ease: "power3.out",
//         },
//         "+=0",
//       );

//       // الوصف بعد الصورة بشوية
//       tl.to(
//         descriptionRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.38,
//           ease: "power3.out",
//         },
//         "-=0.35",
//       );

//       // العنوان بعد الوصف
//       tl.to(
//         serviceTitleRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.35,
//           ease: "power3.out",
//         },
//         "-=0.28",
//       );

//       // الفيتشرز آخر شيء يدخل
//       tl.to(
//         featuresRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.32,
//           ease: "power3.out",
//         },
//         "-=0.22",
//       );
//     },
//     [currentServiceIndex, isAnimating],
//   );

//   return (
//     <div
//       className={`${
//         // isEven ? "bg-white" : "bg-[#1A1A1A] text-white"
//         "bg-white"
//       } px-12 py-8 rounded-xl shadow-sm overflow-hidden`}
//     >
//       {/* <h2 className={`text-[48px] ${isEven ? "text-[#0A0A0A]" : "text-white"}`}> */}
//       <h2 className={`text-[48px]  text-[#0A0A0A]`}>
//         {/* {pkgContent.title} */}
//         {pkg.package.package_name}
//       </h2>

//       <p
//         ref={serviceTagRef}
//         className={`text-xs tracking-[0.2rem] uppercase text-[#7B5A41]`}
//       >
//         VIP Meet & Greet
//       </p>

//       {/* Description */}
//       {/* <p
//         ref={descriptionRef}
//         className={`text-[15px] normal-case my-6 leading-[28px] max-w-125 text-[#6D6D6D]`}
//       >
//         {pkgContent.service[currentServiceIndex].description}
//       </p> */}
//       <p
//         ref={descriptionRef}
//         className="text-[15px] normal-case my-4 leading-[28px] max-w-125 text-[#6D6D6D] min-h-[112px]"
//       >
//         {pkgContent.service[currentServiceIndex].description}
//       </p>

//       <div className="flex gap-11 relative mt-8">
//         {/* Image Section */}
//         {/* <div
//           ref={imageWrapperRef}
//           className="h-93.25 w-41.5 p-0.5 flex-shrink-0"
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
//         </div> */}
//         <div>
//           <Image
//             alt="service image"
//             src={serviceImage}
//             width={240}
//             height={320}
//           />
//         </div>

//         {/* Content */}
//         <div className="flex flex-col">
//           <p
//             ref={serviceTitleRef}
//             className={`uppercase text-sm font-semibold leading-[46px] tracking-[4.6px] text-[#878989]`}
//           >
//             {pkgContent.service[currentServiceIndex].title}
//           </p>

//           <ul ref={featuresRef} className="">
//             {pkgContent.features.map((featureText: string, index: number) => (
//               <li
//                 key={featureText}
//                 className={`py-3.25 flex gap-4 normal-case ${pkgContent.features.length !== index + 1 ? " border-b-1 border-[#a7a7a7a0]" : ""}`}
//               >
//                 {/* convert 1,2,.. to 01,02,... */}
//                 <span className="font-semibold text-[#878989]">
//                   {String(index + 1).padStart(2, "0")}
//                 </span>

//                 {featureText}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="flex justify-between w-full max-w-full mx-auto">
//         <Button
//           variant="outline"
//           className={`w-max px-10 py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
//             border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white
//           `}
//           onClick={() => navigate("left")}
//           disabled={currentServiceIndex === 0 || isAnimating}
//         >
//           <ChevronLeft />
//         </Button>
//         <Button
//           variant="outline"
//           className={`w-max px-10 py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
// border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white
//       `}
//           onClick={() => navigate("right")}
//           disabled={currentServiceIndex === 2 || isAnimating}
//         >
//           <ChevronRight />
//         </Button>
//       </div>
//     </div>
//   );
// }

// ===================================================================
// ===================================================================
// ===================================================================

// "use client";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import { PackageCardProps, pkgData } from "./services-data";
// import { useState, useRef, useCallback } from "react";
// import { gsap } from "gsap";

// export default function PackageCard({
//   pkg,
//   // index,
//   serviceImage,
// }: PackageCardProps) {
//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const imageWrapperRef = useRef<HTMLDivElement>(null);
//   const serviceTagRef = useRef<HTMLParagraphElement>(null);
//   const descriptionRef = useRef<HTMLParagraphElement>(null);
//   const serviceTitleRef = useRef<HTMLParagraphElement>(null);
//   const featuresRef = useRef<HTMLUListElement>(null);

//   const pkgContent = pkgData[pkg.package.package_slug] || pkgData.elite;
//   console.log(pkgContent);

//   const navigate = useCallback(
//     (dir: "left" | "right") => {
//       if (isAnimating) return;

//       const nextIndex =
//         dir === "right"
//           ? Math.min(currentServiceIndex + 1, 2)
//           : Math.max(currentServiceIndex - 1, 0);

//       if (nextIndex === currentServiceIndex) return;

//       setIsAnimating(true);

//       const xOut = dir === "right" ? -30 : 30;
//       const xIn = dir === "right" ? 30 : -30;

//       const tl = gsap.timeline({
//         onComplete: () => {
//           setIsAnimating(false);
//         },
//       });

//       // ─── EXIT: كل عنصر بتوقيت مختلف ───────────────────────────────────

//       // الصورة تطلع أول — بتأخير أبطأ وحركة أكبر
//       tl.to(
//         imageWrapperRef.current,
//         {
//           x: xOut * 1.6,
//           opacity: 0,
//           duration: 0.3,
//           ease: "power2.in",
//         },
//         0,
//       );

//       // الوصف بعديها بشوية
//       tl.to(
//         descriptionRef.current,
//         {
//           x: xOut,
//           opacity: 0,
//           duration: 0.22,
//           ease: "power2.in",
//         },
//         0.04,
//       );

//       // العنوان بعد الوصف
//       tl.to(
//         serviceTitleRef.current,
//         {
//           x: xOut * 0.8,
//           opacity: 0,
//           duration: 0.2,
//           ease: "power2.in",
//         },
//         0.09,
//       );

//       // الفيتشرز آخر شيء يطلع
//       tl.to(
//         featuresRef.current,
//         {
//           x: xOut * 0.6,
//           opacity: 0,
//           duration: 0.18,
//           ease: "power2.in",
//         },
//         0.15,
//       );

//       // ─── تحديث الـ state في منتصف الـ timeline ────────────────────────
//       tl.add(() => {
//         setCurrentServiceIndex(nextIndex);
//       });

//       // ─── إعادة تعيين المواضع قبل الدخول (فورية) ──────────────────────
//       tl.set(imageWrapperRef.current, { x: xIn * 1.6, opacity: 0 });
//       tl.set(descriptionRef.current, { x: xIn, opacity: 0 });
//       tl.set(serviceTitleRef.current, { x: xIn * 0.8, opacity: 0 });
//       tl.set(featuresRef.current, { x: xIn * 0.6, opacity: 0 });

//       // ─── ENTER: كل عنصر يدخل بتوقيت مختلف ───────────────────────────

//       // الصورة تدخل أول وبتأخير خاص
//       tl.to(
//         imageWrapperRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.45,
//           ease: "power3.out",
//         },
//         "+=0",
//       );

//       // الوصف بعد الصورة بشوية
//       tl.to(
//         descriptionRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.38,
//           ease: "power3.out",
//         },
//         "-=0.35",
//       );

//       // العنوان بعد الوصف
//       tl.to(
//         serviceTitleRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.35,
//           ease: "power3.out",
//         },
//         "-=0.28",
//       );

//       // الفيتشرز آخر شيء يدخل
//       tl.to(
//         featuresRef.current,
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.32,
//           ease: "power3.out",
//         },
//         "-=0.22",
//       );
//     },
//     [currentServiceIndex, isAnimating],
//   );

//   return (
//     // <div className="bg-white px-12 py-8 rounded-xl shadow-sm overflow-hidden">
//     <div
//       className="
//     bg-white
//     rounded-xl
//     shadow-sm
//     overflow-hidden
//     px-5
//     py-6
//     sm:px-8
//     lg:px-12
//     lg:py-8
//   "
//     >
//       {/* <h2 className={`text-[48px] ${isEven ? "text-[#0A0A0A]" : "text-white"}`}> */}
//       <h2
//         className="
// text-3xl
// sm:text-4xl
// lg:text-[48px]
// text-[#0A0A0A]
// leading-tight
// "
//       >
//         {/* {pkgContent.title} */}
//         {pkg.package.package_name}
//       </h2>

//       <p
//         ref={serviceTagRef}
//         className={`text-xs tracking-[0.2rem] uppercase text-[#7B5A41]`}
//       >
//         VIP Meet & Greet
//       </p>

//       {/* Description */}
//       {/* <p
//         ref={descriptionRef}
//         className={`text-[15px] normal-case my-6 leading-[28px] max-w-125 text-[#6D6D6D]`}
//       >
//         {pkgContent.service[currentServiceIndex].description}
//       </p> */}
//       <p
//         ref={descriptionRef}
//         // className="text-[15px] normal-case my-4 leading-[28px] max-w-125 text-[#6D6D6D] min-h-[112px]"
//         className="
// text-sm
// lg:text-[15px]
// normal-case
// my-4
// leading-7
// text-[#6D6D6D]
// max-w-full
// lg:max-w-125
// lg:min-h-[112px]
// "
//       >
//         {pkgContent.service[currentServiceIndex].description}
//       </p>

//       {/* <div className="flex gap-11 relative mt-8"> */}
//       <div
//         className="
//         mt-8
//         flex
//         flex-col
//         lg:flex-row
//         gap-8
//         lg:gap-11
//         items-start
//     "
//       >
//         {/* Image Section */}
//         {/* <div
//           ref={imageWrapperRef}
//           className="h-93.25 w-41.5 p-0.5 flex-shrink-0"
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
//         </div> */}
//         {/* <div>
//           <Image
//             alt="service image"
//             src={serviceImage}
//             width={240}
//             height={320}
//           />
//         </div> */}
//         <div className="w-full lg:w-auto flex justify-center">
//           <Image
//             alt="service image"
//             src={serviceImage}
//             width={240}
//             height={320}
//             className="
//             w-full
//             max-w-[240px]
//             h-auto
//             object-cover
//         "
//           />
//         </div>

//         {/* Content */}
//         {/* <div className="flex flex-col"> */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <p
//             ref={serviceTitleRef}
//             // className={`uppercase text-sm font-semibold leading-[46px] tracking-[4.6px] text-[#878989]`}
//             className="
// uppercase
// text-xs
// sm:text-sm
// font-semibold
// tracking-[3px]
// sm:tracking-[4.6px]
// leading-8
// sm:leading-[46px]
// text-[#878989]
// "
//           >
//             {pkgContent.service[currentServiceIndex].title}
//           </p>

//           <ul ref={featuresRef} className="">
//             {pkgContent.features.map((featureText: string, index: number) => (
//               <li
//                 key={featureText}
//                 // className={`py-3.25 flex gap-4 normal-case ${pkgContent.features.length !== index + 1 ? " border-b-1 border-[#a7a7a7a0]" : ""}`}
//                 className={`
//                   py-3
//                   flex
//                   items-start
//                   gap-4
//                   text-sm
//                   lg:text-base
//                   normal-case
//                   break-words
//                   border-[#a7a7a7a0]
//                   ${pkgContent.features.length !== index + 1 ? "border-b" : ""}`}
//               >
//                 {/* convert 1,2,.. to 01,02,... */}
//                 <span className="font-semibold text-[#878989] shrink-0">
//                   {String(index + 1).padStart(2, "0")}
//                 </span>

//                 {featureText}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* <div className="flex justify-between w-full max-w-full mx-auto"> */}
//       <div
//         className="
//         mt-8
//         flex
//         justify-between
//         sm:justify-end
//         gap-4
//     "
//       >
//         <Button
//           variant="outline"
//           className={`h-12 w-12 sm:px-10 sm:py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
//             border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white`}
//           onClick={() => navigate("left")}
//           disabled={currentServiceIndex === 0 || isAnimating}
//         >
//           <ChevronLeft />
//         </Button>
//         <Button
//           variant="outline"
//           className={`h-12 w-12 sm:px-10 sm:py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
//           border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white
//           `}
//           onClick={() => navigate("right")}
//           disabled={currentServiceIndex === 2 || isAnimating}
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
  // index,
  serviceImage,
}: PackageCardProps) {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const serviceTagRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const serviceTitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  const pkgContent = pkgData[pkg.package.package_slug] || pkgData.elite;
  console.log(pkgContent);

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
    // <div className="bg-white px-12 py-8 rounded-xl shadow-sm overflow-hidden">
    <div
      className="
relative
overflow-hidden

bg-white

border

rounded-[28px]

px-6
sm:px-8
xl:px-10

py-7
xl:py-9

shadow-[0_12px_40px_rgba(0,0,0,.05)]
"
    >
      {/* <h2 className={`text-[48px] ${isEven ? "text-[#0A0A0A]" : "text-white"}`}> */}
      <h2
        className="
font-[Fraunces]
font-light

text-[34px]
lg:text-[42px]
xl:text-[48px]

tracking-[-0.03em]

leading-none

text-[#1A1A1A]
"
      >
        {/* {pkgContent.title} */}
        {pkg.package.package_name}
      </h2>

      <p
        ref={serviceTagRef}
        // className={`text-xs tracking-[0.2rem] uppercase text-[#7B5A41]`}
        className="
mt-3

uppercase

text-[11px]

tracking-[0.32em]

font-semibold

text-[#8D8D92]
"
      >
        VIP Meet & Greet
      </p>

      {/* Description */}
      {/* <p
        ref={descriptionRef}
        className={`text-[15px] normal-case my-6 leading-[28px] max-w-125 text-[#6D6D6D]`}
      >
        {pkgContent.service[currentServiceIndex].description}
      </p> */}
      <p
        ref={descriptionRef}
        // className="text-[15px] normal-case my-4 leading-[28px] max-w-125 text-[#6D6D6D] min-h-[112px]"
        className="
        mt-5
leading-7
text-[15px]

max-w-[720px]



text-[#6F6A63]

font-light
"
      >
        {pkgContent.service[currentServiceIndex].description}
      </p>

      {/* <div className="flex gap-11 relative mt-8"> */}
      <div
        className="
        mt-8
gap-7
xl:gap-10

    grid
    grid-cols-1
    lg:grid-cols-[200px_minmax(0,1fr)]
    xl:grid-cols-[220px_minmax(0,1fr)]
    items-start
  "
      >
        {/* Image Section */}
        {/* <div
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
        </div> */}
        {/* <div>
          <Image
            alt="service image"
            src={serviceImage}
            width={240}
            height={320}
          />
        </div> */}
        {/* <div className="w-full lg:w-auto flex justify-center">
          <Image
            alt="service image"
            src={serviceImage}
            width={240}
            height={320}
            className="
            w-full
            max-w-[240px]
            h-auto
            object-cover
        "
          />
        </div> */}
        <div
          ref={imageWrapperRef}
          className="
        relative

        w-full
        max-w-[220px]

        aspect-[3/4]

        rounded-2xl

        overflow-hidden

        bg-gradient-to-br
        from-[#3B3B3B]
        to-[#111111]

        mx-auto
        lg:mx-0
    "
        >
          <div className="absolute inset-4 rounded-xl border border-white/20" />

          <Image
            src={serviceImage}
            alt=""
            fill
            className="
            object-cover
            opacity-90
        "
          />

          <div
            className="
            absolute
            inset-0
            bg-radial
            from-white/10
            to-transparent
        "
          />

          <div
            className="
            absolute
            bottom-6
            left-6
            right-6

            text-white

            font-serif

            italic

            text-xl
        "
          >
            {pkgContent.service[currentServiceIndex].title}
          </div>
        </div>

        {/* Content */}
        {/* <div className="flex flex-col"> */}
        <div className="flex flex-col flex-1 min-w-0">
          <p
            ref={serviceTitleRef}
            // className={`uppercase text-sm font-semibold leading-[46px] tracking-[4.6px] text-[#878989]`}
            className="
uppercase
text-xs
sm:text-sm
font-semibold
tracking-[3px]
sm:tracking-[4.6px]
text-[15px]

leading-7

text-[#2D2D2D]
"
          >
            {pkgContent.service[currentServiceIndex].title}
          </p>

          <ul
            ref={featuresRef}
            className="
                  mt-4

        divide-y

        divide-[#D9D2C7]
          "
          >
            {pkgContent.features.map((featureText: string, index: number) => (
              <li
                key={featureText}
                // className={`py-3.25 flex gap-4 normal-case ${pkgContent.features.length !== index + 1 ? " border-b-1 border-[#a7a7a7a0]" : ""}`}
                className={`
                  text-sm
                  lg:text-base
                  normal-case
                  break-words
                  border-[#a7a7a7a0]


py-3.5

flex

gap-5

items-start

                  ${pkgContent.features.length !== index + 1 ? "border-b" : ""}`}
              >
                {/* convert 1,2,.. to 01,02,... */}
                {/* <span className="font-semibold text-[#878989] shrink-0"> */}
                <span
                  className="
                
text-[#8D8D92]

font-serif

text-[15px]

min-w-8

                "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {featureText}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className="flex justify-between w-full max-w-full mx-auto"> */}
      <div
        className="
        mt-7
        flex
        justify-between
        sm:justify-end
        gap-4
    "
      >
        <Button
          variant="outline"
          // className={`h-12 w-12 sm:px-10 sm:py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
          //   border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white`}
          className={`h-12 w-12 sm:px-10 sm:py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
          border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white
          `}
          onClick={() => navigate("left")}
          disabled={currentServiceIndex === 0 || isAnimating}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className={`h-12 w-12 sm:px-10 sm:py-5 cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed duration-0
          border-[#D1D1D1] text-[#7A7A7A] bg-[#ECECEC] hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white
          `}
          onClick={() => navigate("right")}
          disabled={currentServiceIndex === 2 || isAnimating}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
