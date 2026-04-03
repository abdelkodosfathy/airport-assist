"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_BASE =
  "https://airportassist-backend.aqaralex.com/storage/images/car-types-images/";

type CarSlide = {
  img: string;
  name: string;
};

type CarImageCarouselProps = {
  cars: CarSlide[];
};

const CarImageCarousel = ({ cars }: CarImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);

      setTimeout(() => {
        setCurrent((prev) =>
          dir === "right"
            ? (prev + 1) % cars.length
            : (prev - 1 + cars.length) % cars.length,
        );
        setAnimating(false);
        setDirection(null);
      }, 350);
    },
    [animating, cars.length],
  );

  const prev = (prev: number) => (prev - 1 + cars.length) % cars.length;
  const next = (prev: number) => (prev + 1) % cars.length;

  if (!cars.length) return null;

  return (
    <div className="w-full select-none">
      {/* Main stage */}
      <div className="relative flex items-center justify-center gap-4">
        {/* Main card */}
        <div className="relative flex-shrink-0 w-full md:w-[400px]">
          <div
            className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#f9f5f1] to-white shadow-lg"
            style={{ minHeight: 220 }}
          >
            <div
              key={current}
              style={{
                animation: animating
                  ? direction === "right"
                    ? "slideInRight 0.35s ease forwards"
                    : "slideInLeft 0.35s ease forwards"
                  : undefined,
              }}
              className="flex flex-col items-center p-6"
            >
              <Image
                src={`${IMAGE_BASE}${cars[current].img}`}
                alt={cars[current].name}
                width={360}
                height={180}
                className="w-full object-contain drop-shadow-md"
                style={{ maxHeight: 160 }}
                priority
              />
            </div>
          </div>

          {/* Arrow buttons — overlaid on the card edges */}
          <button
            onClick={() => navigate("left")}
            aria-label="Previous"
            className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-[#e5e0d8] flex items-center justify-center text-[#664F31] hover:bg-[#664F31] hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("right")}
            aria-label="Next"
            className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-[#e5e0d8] flex items-center justify-center text-[#664F31] hover:bg-[#664F31] hover:text-white transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {cars.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === current) return;
              navigate(i > current ? "right" : "left");
              // jump directly after animation
              setTimeout(() => setCurrent(i), 360);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-[#664F31]"
                : "w-2 h-2 bg-[#D5C8B8] hover:bg-[#a8916f]"
            }`}
          />
        ))}
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CarImageCarousel;

// "use client";

// import { useState, useCallback } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const IMAGE_BASE =
//   "https://airportassist-backend.aqaralex.com/storage/images/car-types-images/";

// type CarSlide = {
//   img: string;
//   name: string;
// };

// type CarImageCarouselProps = {
//   cars: CarSlide[];
// };

// const CarImageCarousel = ({ cars }: CarImageCarouselProps) => {
//   const [current, setCurrent] = useState(0);
//   const [direction, setDirection] = useState<"left" | "right" | null>(null);
//   const [animating, setAnimating] = useState(false);

//   const navigate = useCallback(
//     (dir: "left" | "right") => {
//       if (animating) return;
//       setDirection(dir);
//       setAnimating(true);
//       setTimeout(() => {
//         setCurrent((prev) =>
//           dir === "right"
//             ? (prev + 1) % cars.length
//             : (prev - 1 + cars.length) % cars.length,
//         );
//         setAnimating(false);
//         setDirection(null);
//       }, 350);
//     },
//     [animating, cars.length],
//   );

//   if (!cars.length) return null;

//   const showControls = cars.length > 1;

//   return (
//     <div className="w-full flex flex-col gap-3 select-none">
//       {/* Image area */}
//       <div className="relative flex items-center justify-center">
//         {/* Prev arrow */}
//         {showControls && (
//           <button
//             onClick={() => navigate("left")}
//             aria-label="Previous"
//             className="absolute left-0 z-10 w-7 h-7 rounded-full bg-white shadow border border-[#e5e0d8] flex items-center justify-center text-[#664F31] hover:bg-[#664F31] hover:text-white transition-colors duration-200"
//           >
//             <ChevronLeft className="w-3.5 h-3.5" />
//           </button>
//         )}

//         {/* Image */}
//         <div className="w-full overflow-hidden px-8">
//           <div
//             key={current}
//             style={{
//               animation: animating
//                 ? direction === "right"
//                   ? "slideInRight 0.35s ease forwards"
//                   : "slideInLeft 0.35s ease forwards"
//                 : undefined,
//             }}
//           >
//             <Image
//               src={`${IMAGE_BASE}${cars[current].img}`}
//               alt={cars[current].name}
//               width={400}
//               height={200}
//               className="w-full h-48 object-contain drop-shadow-sm"
//               priority
//             />
//           </div>
//         </div>

//         {/* Next arrow */}
//         {showControls && (
//           <button
//             onClick={() => navigate("right")}
//             aria-label="Next"
//             className="absolute right-0 z-10 w-7 h-7 rounded-full bg-white shadow border border-[#e5e0d8] flex items-center justify-center text-[#664F31] hover:bg-[#664F31] hover:text-white transition-colors duration-200"
//           >
//             <ChevronRight className="w-3.5 h-3.5" />
//           </button>
//         )}
//       </div>

//       {/* Dots */}
//       {showControls && (
//         <div className="flex justify-center gap-1.5">
//           {cars.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 if (i === current) return;
//                 navigate(i > current ? "right" : "left");
//                 setTimeout(() => setCurrent(i), 360);
//               }}
//               aria-label={`Go to slide ${i + 1}`}
//               className={`rounded-full transition-all duration-300 ${
//                 i === current
//                   ? "w-5 h-1.5 bg-[#664F31]"
//                   : "w-1.5 h-1.5 bg-[#D5C8B8] hover:bg-[#a8916f]"
//               }`}
//             />
//           ))}
//         </div>
//       )}

//       <style>{`
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-30px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CarImageCarousel;
