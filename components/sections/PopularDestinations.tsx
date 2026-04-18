// "use client";

// import { useRef, useEffect, useState, useLayoutEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import gsap from "gsap";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import { getPopularAirports } from "@/lib/api/popular";
// import { fixedDescription, popularAirports } from "@/lib/fixed-populars";
// import { Airport } from "@/lib/types/airport";

// type Destination = {
//   title: string;
//   content: string;
//   img: string;
//   price: string;
//   code: string;
// };

// export const mapAirportsToCards = (
//   apiAirports: (Airport & { starting_price: number })[],
// ) => {
//   return apiAirports
//     .map((airport) => {
//       const staticData = popularAirports.find(
//         (item) => item.iata === airport.airport_code,
//       );

//       // لو مفيش match → تجاهل
//       if (!staticData) return null;

//       return {
//         title: airport.airport_name.toUpperCase(),
//         content: staticData.description ?? fixedDescription,
//         img: `/sections/popular/${airport.airport_code.toLowerCase()}.webp`,
//         price: `£${airport.starting_price}`,
//         code: airport.airport_code,
//       };
//     })
//     .filter(Boolean); // 🔥 يشيل الـ null
// };

// export default function PopularDestinations() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [data, setData] = useState<Destination[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🎬 GSAP Animation
//   useLayoutEffect(() => {
//     if (!scrollRef.current) return;

//     const tl = gsap.timeline({
//       defaults: { duration: 1, ease: "power3.out" },
//       scrollTrigger: {
//         trigger: scrollRef.current.parentElement,
//         end: "bottom top",
//         toggleActions: "play reverse play reverse",
//         invalidateOnRefresh: true,
//       },
//     });

//     tl.fromTo(
//       scrollRef.current,
//       { x: "100%", opacity: 0 },
//       { x: "0%", opacity: 1 },
//       0,
//     );

//     tl.fromTo(scrollRef.current, { width: "250%" }, { width: "100%" }, 0.4);
//   }, []);

//   // 🖱️ Scroll logic
//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();

//       const scrollingRight = e.deltaY > 0 || e.deltaX > 0;
//       const scrollingLeft = e.deltaY < 0 || e.deltaX < 0;

//       if (!scrolled && scrollingRight) {
//         el.scrollTo({
//           left: el.scrollWidth - el.clientWidth,
//           behavior: "smooth",
//         });
//         setScrolled(true);
//       } else if (scrolled && scrollingLeft) {
//         el.scrollTo({
//           left: 0,
//           behavior: "smooth",
//         });
//         setScrolled(false);
//       }
//     };

//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => el.removeEventListener("wheel", onWheel);
//   }, [scrolled]);

//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const airports = await getPopularAirports();

//         // 🔥 1. فلترة الأول
//         // const mapped = mapAirportsToCards(airports);
//         const mapped = mapAirportsToCards(airports).filter(
//           (item): item is Destination => item !== null,
//         );

//         // 🔥 2. shuffle + take 3 من المفلتر
//         const shuffleArray = <T,>(array: T[]) => {
//           const arr = [...array];
//           for (let i = arr.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [arr[i], arr[j]] = [arr[j], arr[i]];
//           }
//           return arr;
//         };

//         const randomThree = shuffleArray(mapped).slice(0, 3);

//         setData(randomThree);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <section className="bg-[#1a1a1a] pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26 text-white overflow-hidden">
//       <div className="max-w-360 mx-auto flex flex-col gap-15 lg:flex-row">
//         {/* LEFT TEXT */}
//         <div className="lg:w-4/13">
//           <h2 className="text-[30px] tracking-[7.5px] uppercase">
//             <span className="block">Popular</span>
//             <span className="block">Destinations</span>
//           </h2>

//           <p className="text-[15px] text-[#959595] mt-9">
//             Travel in comfort with our VIP Airport Meet & Greet service,
//             featuring fast-track security & immigration and dedicated airport
//             concierge assistance from curbside to gate.
//           </p>
//         </div>

//         {/* CARDS */}
//         <div className="flex lg:w-9/13 flex-col gap-4">
//           <div
//             ref={scrollRef}
//             className="w-full flex overflow-x-auto gap-4 scrollbar-none scroll-smooth"
//           >
//             {loading
//               ? //  [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
//                 null
//               : data.map((item) => (
//                   <DestinationCard key={item.code} {...item} />
//                 ))}
//           </div>

//           {/* pagination dots */}
//           <div className="flex gap-2">
//             <span
//               className={`bg-white/22 rounded-full ${
//                 !scrolled ? "w-16" : "w-2"
//               } duration-300 h-2`}
//             ></span>
//             <span
//               className={`bg-white/22 rounded-full ${
//                 scrolled ? "w-16" : "w-2"
//               } duration-300 h-2`}
//             ></span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function DestinationCard({ title, content, img, price }: Destination) {
//   return (
//     <Card className="snap-start bg-white min-w-[calc(40%-12px)] border-none rounded-2xl  p-0 transition-all  font-[Manrope]  duration-300">
//       {/* Inner wrapper with overflow-hidden for image */}
//       <div className="overflow-hidden rounded-t-2xl">
//         {/* IMAGE */}
//         <div className="aspect-[3/2] w-full">
//           <Image
//             width={320}
//             height={217}
//             src={img}
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//           />
//         </div>
//       </div>

//       {/* TEXT CONTENT */}
//       <div className="px-3 flex flex-col">
//         <h3 className="text-normal leading-[130%] truncate tracking-[3px] text-[15px] mb-4 text-black">
//           {title}
//         </h3>

//         <p className="text-[#7a7a7a] font-manrope leading-[150%] text-[12px]">
//           {content}
//         </p>

//         <p className="mt-16 2xl:mt-20 mb-4 text-[#7B5A41] leading-[100%]">
//           From {price}
//         </p>

//         <Button
//           variant="outline"
//           className="w-max mb-3 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
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
import Image from "next/image";
import { getPopularAirports } from "@/lib/api/popular";
import { fixedDescription, popularAirports } from "@/lib/fixed-populars";
import { Airport, SingleAirport } from "@/lib/types/airport";
import { useRouter } from "next/navigation";
import { useAirportStore, useSingleAirportStore } from "@/store/vipInputsStore";

type Destination = {
  id: number;
  title: string;
  content: string;
  img: string;
  price: string;
  code: string;
};

export const mapAirportsToCards = (
  // apiAirports: (Airport & { starting_price: number })[],
  apiAirports: SingleAirport[],
) => {
  return apiAirports
    .map((airport) => {
      const staticData = popularAirports.find(
        (item) => item.iata === airport.airport_code,
      );

      // لو مفيش match → تجاهل
      if (!staticData) return null;

      return {
        id: airport.airport_id,
        title: airport.airport_name.toUpperCase(),
        content: staticData.description ?? fixedDescription,
        img: `/sections/popular/${airport.airport_code.toLowerCase()}.webp`,
        price: `£${airport.starting_price}`,
        code: airport.airport_code,
      };
    })
    .filter(Boolean); // 🔥 يشيل الـ null
};

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // const [scrolled, setScrolled] = useState(false);

  const [fetchedAirports, setFetchedAirports] = useState<SingleAirport[]>([]);
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const setAiport = useAirportStore((s) => s.setAirport);
  const setSingleAiport = useSingleAirportStore((s) => s.setSingleAirport);

  const router = useRouter();

  // 🎬 GSAP Animation
  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" },
      scrollTrigger: {
        trigger: scrollRef.current.parentElement,
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      scrollRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1 },
      0,
    );

    tl.fromTo(scrollRef.current, { width: "250%" }, { width: "100%" }, 0.4);
  }, []);

  // 🖱️ Scroll logic
  // useEffect(() => {
  //   const el = scrollRef.current;
  //   if (!el) return;

  //   const onScroll = () => {
  //     const children = Array.from(el.children) as HTMLElement[];

  //     let closestIndex = 0;
  //     let minDistance = Infinity;

  //     const containerCenter = el.scrollLeft + el.clientWidth / 2;

  //     children.forEach((child, i) => {
  //       const childCenter = child.offsetLeft + child.clientWidth / 2;
  //       const distance = Math.abs(containerCenter - childCenter);

  //       if (distance < minDistance) {
  //         minDistance = distance;
  //         closestIndex = i;
  //       }
  //     });

  //     // children.forEach((child, i) => {
  //     //   const distance = Math.abs(child.offsetLeft - el.scrollLeft);

  //     //   if (distance < minDistance) {
  //     //     minDistance = distance;
  //     //     closestIndex = i;
  //     //   }
  //     // });

  //     setActiveIndex(closestIndex);
  //   };

  //   el.addEventListener("scroll", onScroll);
  //   return () => el.removeEventListener("scroll", onScroll);
  // }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];

      const scrollLeft = el.scrollLeft;
      const scrollRight = scrollLeft + el.clientWidth;

      // ✅ أول كارد ظاهر بالكامل
      const first = children[0];
      if (first && first.offsetLeft >= scrollLeft) {
        setActiveIndex(0);
        return;
      }

      // ✅ آخر كارد ظاهر بالكامل
      const lastIndex = children.length - 1;
      const last = children[lastIndex];
      if (last && last.offsetLeft + last.clientWidth <= scrollRight) {
        setActiveIndex(lastIndex);
        return;
      }

      // ✅ fallback: center detection
      const containerCenter = scrollLeft + el.clientWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const airports = await getPopularAirports();
        setFetchedAirports(airports);

        // 🔥 1. فلترة الأول
        const mapped = mapAirportsToCards(airports).filter(
          (item): item is Destination => item !== null,
        );

        // 🔥 2. shuffle + take 3 من المفلتر
        const shuffleArray = <T,>(array: T[]) => {
          const arr = [...array];
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        };

        const randomThree = shuffleArray(mapped).slice(0, 3);

        setData(randomThree);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("cursor-grabbing");

      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleBookNow = (id: number) => {
    const selectedAiport = fetchedAirports.find(
      (airport) => airport.airport_id === id,
    );
    if (selectedAiport) {
      setAiport(selectedAiport);
      setSingleAiport(selectedAiport);
      scrollToTop();
      // router.push("/vip-meet-and-greet");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#1a1a1a] pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-26 text-white overflow-hidden">
      <div className="max-w-360 mx-auto flex flex-col gap-15 lg:flex-row">
        {/* LEFT TEXT */}
        <div className="lg:w-4/13">
          <h2 className="text-[30px] tracking-[7.5px] uppercase">
            <span className="block">Popular</span>
            <span className="block">Destinations</span>
          </h2>

          <p className="text-[15px] text-[#959595] mt-9">
            Travel in comfort with our VIP Airport Meet & Greet service,
            featuring fast-track security & immigration and dedicated airport
            concierge assistance from curbside to gate.
          </p>
        </div>

        {/* CARDS */}
        <div className="flex lg:w-9/13 flex-col gap-4">
          <div
            ref={scrollRef}
            className="w-full will-change-scroll h-125 flex overflow-x-auto gap-4 scrollbar-none scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          >
            {loading
              ? //  [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
                null
              : data.map((item) => (
                  <DestinationCard
                    onBookNow={handleBookNow}
                    key={item.code}
                    {...item}
                  />
                ))}
          </div>

          {/* pagination dots */}
          <div className="flex gap-1 w-full">
            {/* {[0, 1, 2].map((i) => ( */}
            {data.map((_, i) => (
              <span
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;

                  const cardWidth = el.firstElementChild?.clientWidth || 0;
                  const gap = 16;

                  el.scrollTo({
                    left: i * (cardWidth + gap),
                    behavior: "smooth",
                  });
                }}
                className={`h-2 bg-white/22 rounded-full cursor-pointer transition-all duration-300
                  ${activeIndex === i ? "w-16" : "w-2"}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({
  onBookNow,
  id,
  title,
  content,
  img,
  price,
}: Destination & { onBookNow: (id: number) => void }) {
  return (
    <Card className="snap-start select-none bg-white min-w-[75%] sm:min-w-[60%] lg:min-w-[calc(40%-12px)] border-none rounded-2xl  p-0 transition-all  font-[Manrope]  duration-300">
      {/* Inner wrapper with overflow-hidden for image */}
      <div className="overflow-hidden rounded-t-2xl">
        {/* IMAGE */}
        <div className="aspect-[3/2] w-full">
          <Image
            width={320}
            height={217}
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="px-3 flex flex-col">
        <h3 className="text-normal leading-[130%] truncate tracking-[3px] text-[15px] mb-4 text-black">
          {title}
        </h3>

        <p className="text-[#7a7a7a] font-manrope leading-[150%] text-[12px]">
          {content}
        </p>

        <p className="mt-16 2xl:mt-20  mb-4 text-[#7B5A41] leading-[100%]">
          From {price}
        </p>

        <Button
          onClick={() => onBookNow(id)}
          variant="outline"
          className="w-max mb-3 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none duration-0"
        >
          Book now <ArrowUpRight />
        </Button>
      </div>
    </Card>
  );
}
