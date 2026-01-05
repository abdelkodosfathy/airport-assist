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
    title: "LONDON HEATHROW",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
  {
    title: "PARIS CHARLES DE GAULLE",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
  {
    title: "JOHN F. KENNEDY",
    content:
      "Airport Assist provides premium airport assistance with Meet & Greet, Fast-Track departures and arrivals, and seamless VIP concierge support from curbside through to the boarding gate.",
    img: "/sections/suite.jpg",
    price: "£250",
  },
];

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

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
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1 },
      0
    );
    tl.fromTo(scrollRef.current, { width: "250%" }, { width: "100%" }, 0.4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const scrollingRight = e.deltaY > 0 || e.deltaX > 0;
      const scrollingLeft = e.deltaY < 0 || e.deltaX < 0;

      // سكرول لليمين بس لو !scrolled
      if (!scrolled && scrollingRight) {
        el.scrollTo({
          left: el.scrollWidth - el.clientWidth,
          behavior: "smooth",
        });
        setScrolled(true);
      }
      // سكرول لليسار بس لو scrolled
      else if (scrolled && scrollingLeft) {
        el.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrolled(false);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, [scrolled]);

  return (
    <section className="py-20 pl-20 flex bg-[#1a1a1a] text-white overflow-hidden">
      {/* ------------ LEFT TEXT ------------ */}
      <div className="w-1/2 relative">
        <span
          className="
            absolute left-0 right-0 -top-6 h-0.75 rounded-full
            transition-opacity duration-300 opacity-100
            max-w-150
            mx-auto
            bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
          "
        />

        <h2 className="text-[30px] leading-[128%] tracking-[7.5px] uppercase">
          <span className="block">Popular</span>
          <span className="block">Destinations</span>
        </h2>

        <p className="text-[15px] traking-[1.5px] leading-[160%] w-137.5 text-[#959595] mt-9">
          Travel in comfort with our VIP Airport Meet & Greet service, featuring
          fast-track security & immigration and dedicated airport concierge
          assistance from curbside to gate.
        </p>
      </div>

      {/* ------------ CARDS GRID ------------ */}
      <div className="flex w-1/2 flex-col gap-4">
        <div
          ref={scrollRef}
          className="flex-1 flex overflow-x-auto gap-4 scrollbar-none scroll-smooth"
        >
          {data.map((item, i) => (
            <DestinationCard key={i} {...item} />
          ))}
        </div>
        <div className="flex gap-2">
          <span
            className={`bg-white/22 rounded-full ${
              !scrolled ? "w-16" : "w-2"
            } duration-300 h-2`}
          ></span>
          <span
            className={`bg-white/22 rounded-3xl ${
              scrolled ? "w-16" : "w-2"
            } duration-300 h-2`}
          ></span>
        </div>
      </div>
    </section>
  );
}

type CardProps = Destination;

function DestinationCard({ title, content, img, price }: CardProps) {
  return (
    <Card
      className="shrink-0 w-2/5  [@media(min-width:1921px)]:shrink [@media(min-width:1921px)]:shrink
      bg-white border border-[#333] rounded-2xl overflow-hidden p-0
      hover:shadow-xl hover:shadow-black/40 transition-all font-[Manrope] duration-300
    "
    >
      {/* IMAGE */}
      <div className="aspect-3/2  max-h-[330px] w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="px-6 flex flex-col">
        <h3 className="  text-normal h-10 leading-[130%] tracking-[3px] text-black">
          {title}
        </h3>

        <p className="text-[#7a7a7a] font-manrope leading-[150%] mt-3 text-sm">
          {content}
        </p>

        <p className="mt-8 mb-4 text-[#7B5A41] text-[18px] leading-[100%] tracking-[31%]">
          From £250
        </p>

        <Button
          variant="outline"
          className="w-max mb-6 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
        >
          Book now <ArrowUpRight />
        </Button>
      </div>
    </Card>
  );
}

//   return (
//     <section className="bg-[#1a1a1a] ">
//     {/* <div className="w-full mx-auto max-w-360 px-28  gap-2 2xl:gap-4 pt-28 pb-16  flex bg-[#1a1a1a] text-white overflow-hidden"> */}
//     <div className="w-full max-w-360 mx-auto pl-19  gap-2 2xl:gap-4 pt-28 pb-10  flex bg-[#1a1a1a] text-white">

//       {/* ------------ LEFT TEXT ------------ */}
//       <div className="w-3/8 relative">
//         <span
//           className="
//             absolute left-0 right-0 -top-8 h-1 rounded-full
//             transition-opacity duration-300 opacity-100
//             bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)]
//           "
//         />

//         <h2 className="text-[30px] leading-[128%] tracking-[10px] uppercase">
//           Popular Destinations
//         </h2>

//         <p className="font-manrope font-normal text-normal leading-8 text-[#959595] mt-6">
//           Travel in comfort with our VIP Airport Meet & Greet service, featuring
//           fast-track security & immigration and dedicated airport concierge
//           assistance from curbside to gate.
//         </p>
//       </div>

//       {/* ------------ CARDS GRID ------------ */}
//       <div className="w-5/8 flex flex-col gap-4">
//         <div
//           ref={scrollRef}
//           className="flex-1 flex overflow-x-auto gap-4 scrollbar-none scroll-smooth"
//         >
//           {data.map((item, i) => (
//             <DestinationCard key={i} {...item} />
//           ))}
//         </div>
//         <div className="flex gap-2 [@media(min-width:1921px)]:hidden">
//           <span
//             className={`bg-white/22 rounded-full ${
//               !scrolled ? "w-16" : "w-2"
//             } duration-300 h-2`}
//           ></span>
//           <span
//             className={`bg-white/22 rounded-3xl ${
//               scrolled ? "w-16" : "w-2"
//             } duration-300 h-2`}
//           ></span>
//         </div>
//       </div>
//     </div>
//     </section>
//   );
// }

// type CardProps = Destination;

// function DestinationCard({ title, content, img, price }: CardProps) {
//   return (
//     <Card
//       className="shrink-0 w-2/5  [@media(min-width:1921px)]:shrink [@media(min-width:1921px)]:shrink
//       bg-white border border-[#333] rounded-2xl overflow-hidden p-0
//       hover:shadow-xl hover:shadow-black/40 transition-all font-[Manrope] duration-300
//     "
//     >
//       {/* IMAGE */}
//       <div className="aspect-3/2 w-full overflow-hidden">
//         <img
//           src={img}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>

//       {/* TEXT CONTENT */}
//       <div className="px-6 flex flex-col">
//         <h3 className="  text-normal h-10 leading-[130%] tracking-[3px] text-black">
//           {title}
//         </h3>

//         <p className="text-[#7a7a7a] font-manrope leading-[150%] mt-3 text-sm">
//           {content}
//         </p>

//         <p className="mt-4 mb-4 text-[#7B5A41] text-[18px] leading-[100%] tracking-[31%]">
//           From £250
//         </p>

//         <Button variant="outline" className="w-max mb-6 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0">
//           Book now <ArrowUpRight/>
//         </Button>
//       </div>
//     </Card>
//   );
// }

// ============================================
// === the old section after render on the browser
// ============================================
// <section className="h-[800px] p-28 flex bg-[#1a1a1a] text-white gap-14 overflow-hidden">
//   <div className="flex-1 relative">
//     <span className=" absolute left-0 right-0 -top-8 h-1 rounded-full transition-opacity duration-300 opacity-100 bg-[linear-gradient(90deg,rgba(153,120,95,0)_0%,rgba(171,155,144,0.4)_50%,rgba(153,120,95,0)_100%)] "></span>
//     <h2 className="font-manrope font-normal text-[56px] leading-[128%] tracking-[10px] uppercase">
//       Popular Destinations
//     </h2>
//     <p className="font-manrope font-normal text-[24px] leading-[32px] w-[650px] text-[#959595] mt-6">
//       Travel in comfort with our VIP Airport Meet &amp; Greet service, featuring
//       fast-track security &amp; immigration and dedicated airport concierge
//       assistance from curbside to gate.
//     </p>
//   </div>
//   <div className="flex flex-1 flex-col gap-4">
//     <div
//       className="flex-1 flex overflow-x-auto gap-4 scrollbar-none scroll-smooth"
//       style={{
//         opacity: 1,
//         transform: "translate(0%, 0px)",
//         width: "100%",
//       }}
//     >
//       <div
//         data-slot="card"
//         className="text-card-foreground flex flex-col gap-6 shadow-sm shrink-0 w-2/5 bg-white border border-[#333] rounded-2xl overflow-hidden p-0 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
//       >
//         <div className="h-90 w-full overflow-hidden">
//           <img
//             src="/sections/suite.jpg"
//             alt="LONDON HEATHROW"
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//           />
//         </div>
//         <div className="px-6 h-full flex flex-col">
//           <h3 className="font-manrope font-bold text-[24px] leading-[100%] tracking-[31%] text-black">
//             LONDON HEATHROW
//           </h3>
//           <p className="text-[#c0c0c0] font-manrope text-[16px] leading-[150%] mt-3">
//             Airport Assist provides premium airport assistance with Meet &amp;
//             Greet, Fast-Track departures and arrivals, and seamless VIP
//             concierge support from curbside through to the boarding gate.
//           </p>
//           <p className="my-auto font-manrope font-bold text-[18px] leading-[100%] tracking-[31%]">
//             From £250
//           </p>
//           <button
//             data-slot="button"
//             data-variant="outline"
//             data-size="default"
//             className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-max mb-6 border-black"
//           >
//             Book now
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               className="lucide lucide-arrow-up-right"
//               aria-hidden="true"
//             >
//               <path d="M7 7h10v10"></path>
//               <path d="M7 17 17 7"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div
//         data-slot="card"
//         className="text-card-foreground flex flex-col gap-6 shadow-sm shrink-0 w-2/5 bg-white border border-[#333] rounded-2xl overflow-hidden p-0 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
//       >
//         <div className="h-90 w-full overflow-hidden">
//           <img
//             src="/sections/suite.jpg"
//             alt="PARIS CHARLES DE GAULLE"
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//           />
//         </div>
//         <div className="px-6 h-full flex flex-col">
//           <h3 className="font-manrope font-bold text-[24px] leading-[100%] tracking-[31%] text-black">
//             PARIS CHARLES DE GAULLE
//           </h3>
//           <p className="text-[#c0c0c0] font-manrope text-[16px] leading-[150%] mt-3">
//             Airport Assist provides premium airport assistance with Meet &amp;
//             Greet, Fast-Track departures and arrivals, and seamless VIP
//             concierge support from curbside through to the boarding gate.
//           </p>
//           <p className="my-auto font-manrope font-bold text-[18px] leading-[100%] tracking-[31%]">
//             From £250
//           </p>
//           <button
//             data-slot="button"
//             data-variant="outline"
//             data-size="default"
//             className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-max mb-6 border-black"
//           >
//             Book now{" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               className="lucide lucide-arrow-up-right"
//               aria-hidden="true"
//             >
//               <path d="M7 7h10v10"></path>
//               <path d="M7 17 17 7"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div
//         data-slot="card"
//         className="text-card-foreground flex flex-col gap-6 shadow-sm shrink-0 w-2/5 bg-white border border-[#333] rounded-2xl overflow-hidden p-0 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
//       >
//         <div className="h-90 w-full overflow-hidden">
//           <img
//             src="/sections/suite.jpg"
//             alt="JOHN F. KENNEDY"
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//           />
//         </div>
//         <div className="px-6 h-full flex flex-col">
//           <h3 className="font-manrope font-bold text-[24px] leading-[100%] tracking-[31%] text-black">
//             JOHN F. KENNEDY
//           </h3>
//           <p className="text-[#c0c0c0] font-manrope text-[16px] leading-[150%] mt-3">
//             Airport Assist provides premium airport assistance with Meet &amp;
//             Greet, Fast-Track departures and arrivals, and seamless VIP
//             concierge support from curbside through to the boarding gate.
//           </p>
//           <p className="my-auto font-manrope font-bold text-[18px] leading-[100%] tracking-[31%]">
//             From £250
//           </p>

//           <button
//             data-slot="button"
//             data-variant="outline"
//             data-size="default"
//             className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-max mb-6 border-black"
//           >
//             Book now
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               className="lucide lucide-arrow-up-right"
//               aria-hidden="true"
//             >
//               <path d="M7 7h10v10"></path>
//               <path d="M7 17 17 7"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//     <div className="flex gap-2">
//       <span className="bg-white/22 rounded-full w-16 duration-300 h-2"></span>
//       <span className="bg-white/22 rounded-3xl w-2 duration-300 h-2"></span>
//     </div>
//   </div>
// </section>;
