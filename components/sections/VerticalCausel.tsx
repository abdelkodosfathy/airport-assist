import Image from "next/image";

const VerticalCausel = () => {
  const cards = [
    {
      id: 1,
      title: "VIP Meet & Greet Services",
      link: "/our-services/vip-meet-and-greet",
      textContent:
        "Enhancing your journey with private greeter assistance and fast-track airport procedures.",
      image: "/carousel/VipMeetAndGreet.webp",
      top: "top-30",
    },
    {
      id: 2,
      title: "Tarmac Services",
      link: "/our-services/private-suite",
      textContent:
        "Our most exclusive offering, providing the highest level of luxury airport assistance across 500+ destinations worldwide.",
      image: "/carousel/TarmacServices.webp",
      top: "top-40",
    },
    {
      id: 3,
      title: "Luxury Chauffeur Services",
      link: "/our-services/chauffeuring",
      textContent:
        "Experience seamless chauffeur-driven transfers between the airport and your destination.",
      image: "/carousel/LuxuryChauffeur.webp",
      top: "top-50",
    },

    {
      id: 4,
      title: "Private Jet Services",
      link: "/private-jet",
      textContent:
        "Experience seamless travel with private airport assistance and priority fast-track procedures.",
      image: "/carousel/PrivateJetServices.webp",
      top: "top-60",
    },

    {
      id: 5,
      title: "A Truly Magical Grand Hotel",
      link: "/our-services/hotel",
      textContent:
        "Our elegant rooms and suites blend space, style, and tranquility, creating a refined city retreat for ultimate comfort and relaxation.",
      image: "/carousel/ATrulyMagicalGrandHotel.webp",
      top: "top-70",
    },
  ];

  return (
    <section className="xl:hidden relative bg-neutral-900 p-4 h-max py-6 md:py-10">
      {/* <div className="sticky top-10 bg-neutral-900 h-max space-y-4 sm:space-y-10 md:space-y-16 lg:space-y-20"> */}
      <div className="sticky top-10 bg-neutral-900 h-max flex flex-col gap-4 sm:gap-10 md:gap-16 lg:gap-20">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`px-4 md:px-6 sticky ${card.top} rounded-lg overflow-hidden max-w-250 mx-auto aspect-3/2 z-30 w-full flex items-end pb-5 justify-center text-white text-normal sm:text-xl`}
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
              <h3 className="text-md sm:text-xl md:text-2xl text-start tracking-[0.3em] mb-4 sm:mb-8 w-full">
                {card.title}
              </h3>
              <p className="text-sm sm:text-lg tracking-wide normal-case">
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
