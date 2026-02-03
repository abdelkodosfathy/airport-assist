import { Button } from "@/components/ui/button";
import cardImage from "@/public/ex.webp";
import Image from "next/image";

export default function ExclusiveCards() {
  return (
    <div className="flex mb-22.5 justify-center mt-8 flex-col lg:flex-row px-4 sm:px-8 lg:px-12 xl:px-28 flex-wrap">
      <div className="relative w-1/3 px-3">
        <Image
          src={cardImage}
          className="h-147.5 aspect-2/3 object-cover"
          alt="women helping man"
        />
        <div className="absolute bg-white/75 uppercase text-xl tracking-[3px] text-center py-4 z-10 left-8 right-8 bottom-4">A Night on us</div>

      </div>
      <div className="relative w-1/3 px-3">
        <Image
          src={cardImage}
          className="h-147.5 aspect-2/3 object-cover"
          alt="women helping man"
        />
        <div className="absolute bg-white/75 uppercase text-xl tracking-[3px] text-center py-4 z-10 left-9 right-8 bottom-4">A Night on us</div>

      </div>
      <div className="relative w-1/3 px-3">
        <Image
          src={cardImage}
          className="h-147.5 aspect-2/3 object-cover"
          alt="women helping man"
        />
        <div className="absolute bg-white/75 uppercase text-xl tracking-[3px] text-center py-4 z-10 left-9 right-8 bottom-4">A Night on us</div>
      </div>
    </div>
  );
}
