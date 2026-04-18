import Image from "next/image";
import a_night_on_us from "@/public/hotel/cards/a-night-on-us.webp";
import london_calling from "@/public/hotel/cards/london-calling.webp";
import stay_savour from "@/public/hotel/cards/stay&savour.webp";

export default function ExclusiveCards() {
  return (
    <div className="flex mb-22.5 justify-center mt-8 flex-col lg:flex-row px-4 sm:px-8 lg:px-12 xl:px-28 flex-wrap">
      <div className="relative w-1/3 px-3">
        <Image
          src={a_night_on_us}
          className="h-147.5 aspect-2/3 object-cover"
          alt="women helping man"
        />
        <div className="absolute  bg-white/75 uppercase text-xl tracking-[3px] text-center py-4 z-10 left-8 right-8 bottom-4">
          <p>A Night on us</p>
        </div>
      </div>
      <div className="relative w-1/3 px-3">
        <Image
          src={london_calling}
          className="h-147.5 aspect-2/3 object-cover"
          alt="women helping man"
        />
        <div className="absolute  bg-white/75 uppercase text-xl tracking-[3px] text-center py-4 z-10 left-9 right-8 bottom-4">
          <p>London Calling</p>
        </div>
      </div>
      <div className="relative w-1/3 px-3">
        <Image
          src={stay_savour}
          className="h-147.5 aspect-2/3 object-cover"
          alt="women helping man"
        />
        <div className="absolute  bg-white/75 uppercase text-xl tracking-[3px] text-center py-4 z-10 left-9 right-8 bottom-4">
          <p>Stay & Savour</p>
        </div>
      </div>
    </div>
  );
}
