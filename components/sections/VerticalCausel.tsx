// import React from "react";

// type Props = {};

// const VerticalCausel = () => {
//   const cards = [
//     {
//       id: 1,
//       title: "PRIVATE ENTRANCE",
//       textContent:
//         "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
//       image: "/carousel/check-in-despacho.png",
//     },
//     {
//       id: 2,
//       title: "Assisted check-in and baggage drop-off",
//       textContent:
//         "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
//       image: "/carousel/concierge-dedicado.png",
//     },
//     {
//       id: 3,
//       title: "DEDICATED CONCIERGE",
//       textContent:
//         "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
//       image: "/carousel/entrada-privada.png",
//     },
//     {
//       id: 4,
//       title: " On-site security and immigration",
//       textContent:
//         "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
//       image: "/carousel/raiox.png",
//     },
//     {
//       id: 5,
//       title: "On-site security and immigration",
//       textContent:
//         "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
//       image: "/carousel/transfer.png",
//     },
//   ];
//   return (
//     <section className="relative bg-neutral-900 p-4 h-max">
//       <div className="sticky top-10 bg-neutral-900 h-max space-y-20">
//         <div className="sticky top-25 h-80 z-30 w-full bg-red-500 flex items-center justify-center text-white text-xl">Sticky Element</div>
//         <div className="sticky top-35 h-80 z-30 w-full bg-green-800 flex items-center justify-center text-white text-xl">
//           Sticky Element
//         </div>
//         <div className="sticky top-45 h-80 z-30 w-full bg-blue-800 flex items-center justify-center text-white text-xl">
//           Sticky Element
//         </div>
//         <div className="sticky top-55 h-80 z-30 w-full bg-gray-800 flex items-center justify-center text-white text-xl">
//           Sticky Element
//         </div>
//         <div className="sticky top-65 h-80 z-30 w-full bg-yellow-800 flex items-center justify-center text-white text-xl">
//           Sticky Element
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VerticalCausel;

import Image from "next/image";

const VerticalCausel = () => {
  const cards = [
    {
      id: 1,
      title: "PRIVATE ENTRANCE",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/check-in-despacho.webp",
      top:"top-30"
    },
    {
      id: 2,
      title: "Assisted check-in and baggage drop-off",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/concierge-dedicado.webp",
      top:"top-40"
    },
    {
      id: 3,
      title: "DEDICATED CONCIERGE",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/entrada-privada.webp",
      top:"top-50"
    },
    {
      id: 4,
      title: "On-site security and immigration",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/raiox.webp",
      top:"top-60"
    },
    {
      id: 5,
      title: "Transfer",
      textContent:
        "Arrive at the Terminal through an independent access point, ensuring complete privacy and security.",
      image: "/carousel/transfer.webp",
      top:"top-70"
    },
  ];

  
  return (
    <section className="xl:hidden relative bg-neutral-900 p-4 h-max py-6 md:py-10">
      <div className="sticky top-10 bg-neutral-900 h-max space-y-4 sm:space-y-10 md:space-y-16 lg:space-y-20">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`px-4 md:px-6 sticky ${card.top} rounded-lg overflow-hidden h-80 z-30 w-full flex items-end pb-10 justify-center text-white text-normal sm:text-xl`}
          >
            {/* الصورة */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Overlay */}
            <div className="absolute inset-0 shadow-lg bg-gradient-to-t from-black to-transparent" />

            {/* المحتوى */}
            <div className="relative w-full text-white">
              <h3 className="text-xl sm:text-2xl text-start tracking-[0.3em] mb-4 sm:mb-8 w-full">{card.title}</h3>
              <p className="text-sm sm:text-lg tracking-wide">
                {card.textContent}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VerticalCausel;
