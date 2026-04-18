import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import ExclusiveCards from "./ExclusiveCards";
import image1 from "@/public/hotel/Private Image-1.webp";
import image2 from "@/public/hotel/Private Image.webp";
import image3 from "@/public/hotel/Private Image-2.webp";
import Image from "next/image";
import ExpandingCards from "./HoverExpandCards";

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
          <p className="text-[#74747A] leading-9.75 my-10 normal-case">
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
            className="w-fit my-10 mb-6 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
          >
            <p className="font-[Manrope] leading-10 text-normal">
              Book your Stay
            </p>
          </Button>
        </div>
        <div className="flex-1 relative">
          <Image
            src={image1}
            alt="A Luxury Hotel in the Heart of London"
            className="w-100 object-cover shadow-2xl absolute top-0 left-0 z-10"
          />
          <div className="absolute flex gap-2 top-20 left-30">
            <Image
              src={image2}
              alt="A Luxury Hotel in the Heart of London"
              className="w-80 object-cover"
            />
            <Image
              src={image3}
              alt="A Luxury Hotel in the Heart of London"
              className="w-35 h-98"
            />
          </div>
        </div>
      </section>
      {/* <HoverExpandCards /> */}
      <section className="bg-[#1A1A1A] px-28 py-16 flex flex-col items-center">
        <h2 className="text-white text-[25px] flex flex-col tracking-[7.5px] uppercase">
          Rooms & Suite
        </h2>
        <p className="max-w-237 text-center text-white text-normal leading-8 mt-4 mb-14 normal-case">
          Carefully constructed with style and sophistication, each of our
          private lounges is designed to help you unwind, focus on work, or
          relax with your invited guests or family. The space is enriched with
          beautiful artwork, thoughtfully curated by our partners, creating an
          atmosphere of calm, comfort, and understated luxury.
        </p>
        <ExpandingCards />
      </section>
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
        <p className="text-[#74747A] normal-case text-center mx-auto max-w-240 leading-[170%] my-8">
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
