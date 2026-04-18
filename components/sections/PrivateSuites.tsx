// "use client";

// import { useRef, useEffect, useState, useLayoutEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import gsap from "gsap";
// import { ArrowUpRight } from "lucide-react";

// type Destination = {
//   title: string;
//   content: string;
//   img: string;
//   price: string;
// };

// const data: Destination[] = [
//   {
//     title: "WINDSOR SUITE",
//     content:
//       "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
//     img: "/sections/private_suits/private_charles_do_gaulle.webp",
//     price: "£3,177",
//   },
//   {
//     title: "Paris-Charles de Gaulle Saloon",
//     content:
//       "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
//     img: "/sections/private_suits/private_charles_do_gaulle.webp",
//     // img: "/sections/saloon.jpg",
//     price: "£3,177",
//   },
//   {
//     title: "Paris-Charles de Gaulle Saloon",
//     content:
//       "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
//     img: "/sections/private_suits/private_charles_do_gaulle.webp",
//     // img: "/sections/suite.jpg",
//     price: "£3,177",
//   },
// ];

// export default function PrivateSuites() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [scrolled, setScrolled] = useState(false);

//   useLayoutEffect(() => {
//     if (!scrollRef.current) return;

//     const tl = gsap.timeline({
//       defaults: { duration: 1, ease: "power3.out" },
//       scrollTrigger: {
//         trigger: scrollRef.current.parentElement, // الكونتينر العام للصور
//         end: "bottom top",
//         toggleActions: "play reverse play reverse", // كل مرة يدخل/يخرج
//         invalidateOnRefresh: true,
//       },
//     });

//     // الصورة الأولى: تبدأ 80% → 100%
//     tl.fromTo(
//       scrollRef.current,
//       { y: "100%", opacity: 0 },
//       { y: "0%", opacity: 1 },
//       0,
//     );
//     tl.fromTo(scrollRef.current, { height: "150%" }, { height: "100%" }, 0.4);
//   }, []);

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();

//       const scrollingDown = e.deltaY > 0;
//       const scrollingUp = e.deltaY < 0;

//       // سكرول لتحت بس لو !scrolled
//       if (!scrolled && scrollingDown) {
//         el.scrollTo({
//           top: el.scrollHeight - el.clientHeight,
//           behavior: "smooth",
//         });
//         setScrolled(true);
//       }
//       // سكرول لفوق بس لو scrolled
//       else if (scrolled && scrollingUp) {
//         el.scrollTo({
//           top: 0,
//           behavior: "smooth",
//         });
//         setScrolled(false);
//       }
//     };

//     el.addEventListener("wheel", onWheel, { passive: false });

//     return () => el.removeEventListener("wheel", onWheel);
//   }, [scrolled]);

//   return (
//     // <section className=" px-8 xl:px-10 2xl:px-16 bg-[#1a1a1a] text-white overflow-hidden">
//     <section className=" bg-[#1a1a1a]">
//       {/* <div className="mx-auto flex gap-6 h-full max-w-360"> */}
//       {/* <div className="w-full max-w-331  pl-26 pt-28 pb-16  flex bg-[#1a1a1a] text-white overflow-hidden"> */}
//       <div className="mx-auto w-full max-w-360  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26 pt-28 pb-16  flex flex-col lg:flex-row bg-[#1a1a1a] text-white overflow-hidden">
//         {/* ------------ LEFT TEXT ------------ */}
//         <div className="lg:w-1/2 relative">
//           {/* <span
//             className="
//             absolute w-150 -top-8 h-0.75 rounded-full
//             transition-opacity duration-300 opacity-100
//             bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
//           "
//           /> */}

//           <h2 className="text-3xl leading-[128%] tracking-[10px] uppercase">
//             <span className="block">
//               TARMAC
//             </span>
//             PRIVATE SUITS
//           </h2>

//           <p className="leading-8 text-[#959595] my-6 max-w-125">
//             Our most exclusive service, delivering the highest level of luxury
//             airport assistance in over 500 destinations worldwide.
//           </p>
//         </div>

//         {/* ------------ CARDS GRID ------------ */}
//         <div className="lg:w-1/2  relative overflow-visible max-h-[650px] flex flex-row gap-2">
//           <div
//             ref={scrollRef}
//             className="flex-1 flex flex-col overflow-y-auto gap-4  scrollbar-none scroll-smooth"
//           >
//             {data.map((item, i) => (
//               <DestinationCard key={i} {...item} />
//             ))}
//           </div>
//           <div className="absolute z-10 bottom-0 -right-4 w-2 flex flex-col gap-2 mt-auto ">
//             <span
//               className={`bg-white/22 rounded-full ${
//                 !scrolled ? "h-16" : "h-2"
//               } duration-300 w-2`}
//             ></span>
//             <span
//               className={`bg-white/22 rounded-3xl ${
//                 scrolled ? "h-16" : "h-2"
//               } duration-300 w-2`}
//             ></span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// type CardProps = Destination;

// function DestinationCard({ title, content, img, price }: CardProps) {
//   return (
//     <Card
//       className="shrink-0 flex flex-row gap-0
//       bg-white border border-none rounded-2xl overflow-hidden p-0
//       hover:shadow-xl hover:shadow-black/40 transition-all duration-300
//       "
//       style={{
//         height: "calc(40% - 16px)",
//       }}
//       // h-3/7
//     >
//       {/* IMAGE - LEFT */}
//       <div className="w-4/9 overflow-hidden">
//         <img
//           src={img}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>

//       {/* TEXT CONTENT - RIGHT */}
//       <div className="w-5/9 flex flex-col px-4 pt-6 pb-2">
//         <div>
//           <h3 className="leading-[130%] font-semibold tracking-[3px] text-black">
//             {title}
//           </h3>

//           <p className="text-[#7a7a7a] font-[Manrope] text-[12px] leading-[150%] mt-3 max-w-90">
//             {content}
//           </p>
//         </div>

//         <p className="font-[Manrope] mt-auto mb-2 text-[#7B5A41] leading-[100%]text-[#7B5A41]">
//           From {price}
//         </p>

//         <Button
//           variant="outline"
//           className="border-black w-max text-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
//         >
//           Book now <ArrowUpRight />
//         </Button>
//       </div>
//     </Card>
//   );
// }
"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

type Destination = {
  title: string;
  content: string;
  img: string;
  price: string;
};

const data: Destination[] = [
  {
    title: "WINDSOR SUITE",
    content:
      "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
    img: "/sections/private_suits/private_charles_do_gaulle.webp",
    price: "£3,177",
  },
  {
    title: "Paris-Charles de Gaulle Saloon",
    content:
      "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
    img: "/sections/private_suits/private_charles_do_gaulle.webp",
    // img: "/sections/saloon.jpg",
    price: "£3,177",
  },
  {
    title: "Paris-Charles de Gaulle Saloon",
    content:
      "Private, personal, and luxurious concierge assistance through Heathrow — seamless from curbside to gate.",
    img: "/sections/private_suits/private_charles_do_gaulle.webp",
    // img: "/sections/suite.jpg",
    price: "£3,177",
  },
];

export default function PrivateSuites() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" },
      scrollTrigger: {
        trigger: scrollRef.current.parentElement, // الكونتينر العام للصور
        end: "bottom top",
        toggleActions: "play reverse play reverse", // كل مرة يدخل/يخرج
        invalidateOnRefresh: true,
      },
    });

    // الصورة الأولى: تبدأ 80% → 100%
    tl.fromTo(
      scrollRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1 },
      0,
    );
    tl.fromTo(scrollRef.current, { height: "150%" }, { height: "100%" }, 0.4);
  }, []);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateActive = () => {
      const children = Array.from(el.children) as HTMLElement[];

      const containerRect = el.getBoundingClientRect();

      // ✅ أول كارد fully visible
      const first = children[0];
      if (first) {
        const rect = first.getBoundingClientRect();
        if (
          rect.top >= containerRect.top &&
          rect.bottom <= containerRect.bottom
        ) {
          setActiveIndex(0);
          return;
        }
      }

      // ✅ آخر كارد fully visible
      const lastIndex = children.length - 1;
      const last = children[lastIndex];
      if (last) {
        const rect = last.getBoundingClientRect();
        if (
          rect.top >= containerRect.top &&
          rect.bottom <= containerRect.bottom
        ) {
          setActiveIndex(lastIndex);
          return;
        }
      }

      // ✅ center detection (الأدق)
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;

        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    el.addEventListener("scroll", updateActive);

    // ✅ مهم جدًا
    updateActive();

    return () => el.removeEventListener("scroll", updateActive);
  }, []);
  return (
    // <section className=" px-8 xl:px-10 2xl:px-16 bg-[#1a1a1a] text-white overflow-hidden">
    <section className=" bg-[#1a1a1a]">
      {/* <div className="mx-auto flex gap-6 h-full max-w-360"> */}
      {/* <div className="w-full max-w-331  pl-26 pt-28 pb-16  flex bg-[#1a1a1a] text-white overflow-hidden"> */}
      <div className="mx-auto w-full max-w-360  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26 pt-28 pb-16  flex flex-col lg:flex-row bg-[#1a1a1a] text-white overflow-hidden">
        {/* ------------ LEFT TEXT ------------ */}
        <div className="lg:w-1/2 relative">

          <h2 className="text-3xl leading-[128%] tracking-[10px] uppercase">
            <span className="block">TARMAC</span>
            PRIVATE SUITS
          </h2>

          <p className="leading-8 text-[#959595] my-6 max-w-125">
            Our most exclusive service, delivering the highest level of luxury
            airport assistance in over 500 destinations worldwide.
          </p>
        </div>

        {/* ------------ CARDS GRID ------------ */}
        <div className="lg:w-1/2  relative overflow-visible max-h-[650px] flex flex-row gap-2">
          <div
            ref={scrollRef}
            // className="flex-1 flex flex-col overflow-y-auto gap-4  scrollbar-none scroll-smooth"
            className="flex-1 flex flex-col overflow-y-auto gap-4 scrollbar-none scroll-smooth snap-y snap-mandatory cursor-grab active:cursor-grabbing"
          >
            {data.map((item, i) => (
              <DestinationCard key={i} {...item} />
            ))}
          </div>
          {/* <div className="absolute z-10 bottom-0 -right-4 w-2 flex flex-col gap-2 mt-auto ">
            <span
              className={`bg-white/22 rounded-full ${
                !scrolled ? "h-16" : "h-2"
              } duration-300 w-2`}
            ></span>
            <span
              className={`bg-white/22 rounded-3xl ${
                scrolled ? "h-16" : "h-2"
              } duration-300 w-2`}
            ></span>
          </div> */}
          <div className="absolute z-10 bottom-0 -right-4 w-2 flex flex-col gap-2">
            {data.map((_, i) => (
              <span
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;

                  const child = el.children[i] as HTMLElement;

                  el.scrollTo({
                    top: child.offsetTop,
                    behavior: "smooth",
                  });
                }}
                className={`w-2 rounded-full cursor-pointer transition-all duration-300
                  ${activeIndex === i ? "bg-white h-16" : "bg-white/30 h-3"}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CardProps = Destination;

function DestinationCard({ title, content, img, price }: CardProps) {
  return (
    <Card
      className="snap-start shrink-0 flex flex-row gap-0 
      bg-white border border-none rounded-2xl overflow-hidden p-0
      hover:shadow-xl hover:shadow-black/40 transition-all duration-300
      "
      style={{
        height: "calc(40% - 16px)",
      }}
      // h-3/7
    >
      {/* IMAGE - LEFT */}
      <div className="w-4/9 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* TEXT CONTENT - RIGHT */}
      <div className="w-5/9 flex flex-col px-4 pt-6 pb-2">
        <div>
          <h3 className="leading-[130%] font-semibold tracking-[3px] text-black">
            {title}
          </h3>

          <p className="text-[#7a7a7a] font-[Manrope] text-[12px] leading-[150%] mt-3 max-w-90">
            {content}
          </p>
        </div>

        <p className="font-[Manrope] mt-auto mb-2 text-[#7B5A41] leading-[100%]text-[#7B5A41]">
          From {price}
        </p>

        <Button
          variant="outline"
          className="border-black w-max text-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
        >
          Book now <ArrowUpRight />
        </Button>
      </div>
    </Card>
  );
}
