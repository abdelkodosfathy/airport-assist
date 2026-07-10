import Image from "next/image";
import a_night_on_us from "@/public/hotel/cards/a-night-on-us.webp";
import london_calling from "@/public/hotel/cards/london-calling.webp";
import stay_savour from "@/public/hotel/cards/stay&savour.webp";

const cards = [
  {
    image: a_night_on_us,
    title: "A Night on us",
  },
  {
    image: london_calling,
    title: "London Calling",
  },
  {
    image: stay_savour,
    title: "Stay & Savour",
  },
];

export default function ExclusiveCards() {
  return (
    // px-4 sm:px-8 lg:px-12 xl:px-28
    <div className="mt-8 flex flex-col lg:flex-row flex-wrap justify-center max-w-308 mx-auto gap-6.25">
      {cards.map((card) => (
        <div key={card.title} className="relative flex-1">
          <Image
            src={card.image}
            alt={card.title}
            className="h-136 aspect-5/7 object-cover"
          />

          <div className="absolute left-8 right-8 bottom-4 z-10 bg-white/75 py-4 text-center text-xl uppercase tracking-[3px]">
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}