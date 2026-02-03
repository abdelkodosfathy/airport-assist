import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import HoverExpandCards from "./HoverExpandCards";
import ExclusiveCards from "./ExclusiveCards";
import serviceImage from "@/public/services-image.jpg";
import Image from "next/image";

type Props = {};

export default function page(props: Props) {
  return (
    <>
      <section className=" px-28 py-16 flex flex-col items-center">
        {/* <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[10px] uppercase"> */}
        <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[1.6px]">
          Explore London Grand Hotel
        </h2>
        <Button
          variant="outline"
          className="my-10 min-w-[140px] mb-6 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
        >
          <p className="text-sm">Book your Stay</p>
          <ArrowUpRight />
        </Button>
      </section>
      <section className=" px-28 pt-18 pb-45 flex gap-35 bg-white">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl flex flex-col tracking-[7.5px] uppercase">
            <span>A Luxury Hotel</span>
            <span>in the Heart of London</span>
          </h2>
          {/* <p className="text-[#74747A] leading-[39px] my-10 w-122.5"> */}
          <p className="text-[#74747A] leading-9.75 my-10">
            Thoughtfully designed with style and sophistication, our hotel
            spaces offer a refined and welcoming environment where guests can
            unwind, focus on work, or enjoy meaningful moments with family and
            friends. Each area is carefully curated to balance comfort and
            elegance, featuring beautifully crafted interiors, premium
            furnishings, and a calm, inviting atmosphere. Complemented by
            thoughtfully selected artwork, our spaces create a sense of serenity
            and understated luxury, ensuring every moment of your stay feels
            effortless and considered.
          </p>
          <Button
            variant="outline"
            className="w-max py-4 px-10 rounded-xl border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-[#664F31] duration-0"
          >
            <p className="font-[Manrope] leading-10 text-normal">
              Book your Stay
            </p>
          </Button>
        </div>
        <div className="flex-1 relative">
          <Image
            src={serviceImage}
            alt="A Luxury Hotel in the Heart of London"
            className="aspect-9/10 w-100 object-cover shadow-2xl absolute top-0 left-0 z-10"
          />
          <Image
            src={serviceImage}
            alt="A Luxury Hotel in the Heart of London"
            className="aspect-9/10 w-100 object-cover absolute top-20 left-20"
          />
        </div>
      </section>
      <HoverExpandCards />
      <section className=" px-28 py-16 flex flex-col items-center">
        <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[1.6px]">
          Special Offers & Experiences
        </h2>
        <Button
          variant="outline"
          className="my-10  min-w-[140px] mb-6 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
        >
          <p className="text-sm">Book your Stay</p>
          <ArrowUpRight />
        </Button>
      </section>
      <section className="bg-white pt-10">
        <h2 className="font-manrope text-center font-normal my-0 text-3xl leading-[100%] tracking-[1.6px]">
          An exclusive penthouse collection
        </h2>
        <p className="text-[#74747A] text-center mx-auto max-w-233 leading-[170%] my-8">
          High above the streets of central London, our hotel’s penthouses offer
          a rare blend of privacy and prestige. Each is uniquely designed,
          featuring expansive outdoor terraces, captivating city views, and a
          distinct character of its own. From regal suites to literary-inspired
          retreats, discover unrivalled stays and refined luxury living in the
          very heart of the capital.
        </p>
        <ExclusiveCards />
      </section>
    </>
  );
}
