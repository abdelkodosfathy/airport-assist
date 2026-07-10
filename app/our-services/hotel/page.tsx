import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import ExclusiveCards from "./ExclusiveCards";
import image1 from "@/public/hotel/Private Image-1.webp";
import image2 from "@/public/hotel/Private Image.webp";
import image3 from "@/public/hotel/Private Image-2.webp";
import Image from "next/image";
import ExpandingCards from "./HoverExpandCards";
import MainButton from "@/components/MainButton";

type Props = {};

export default function page(props: Props) {
  return (
    <>
      <section className="px-3 py-10 lg:py-16 flex flex-col items-center">
        {/* <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[10px] uppercase"> */}
        <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[1.6px]">
          Explore London Grand Hotel
        </h2>
        <MainButton className="mt-8">
          Book your Stay
          <ArrowUpRight />
        </MainButton>
      </section>

      <section className=" overflow-hidden w-full px-4 md:px-8 lg:px-16 xl:px-28 pt-6 lg:pt-22 pb-10 lg:pb-46.25 bg-white">
        <div className="max-w-360 w-full flex mx-auto flex flex-col-reverse xl:flex-row gap-20 ">
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl flex flex-col leading-[128%] tracking-[7.5px] uppercase">
              <span>A Luxury Hotel</span>
              <span>in the Heart of</span>
              <span>London</span>
            </h2>
            <p className="text-[#74747A] leading-9.75 my-12 normal-case max-w-122.25">
              Thoughtfully designed with style and sophistication, our hotel
              spaces offer a refined and welcoming environment where guests can
              unwind, focus on work, or enjoy meaningful moments with family and
              friends. Each area is carefully curated to balance comfort and
              elegance, featuring beautifully crafted interiors, premium
              furnishings, and a calm, inviting atmosphere. Complemented by
              thoughtfully selected artwork, our spaces create a sense of
              serenity and understated luxury, ensuring every moment of your
              stay feels effortless and considered.
            </p>
            <MainButton>Book your Stay</MainButton>
          </div>
          <div className="flex-1 relative mx-auto xl:mx-none px-4 lg:px-0">
            <Image
              src={image1}
              alt="A Luxury Hotel in the Heart of London"
              // className="lg:w-100 aspect-6/7 object-cover shadow-2xl absolute top-0 left-0 z-10"
              className="lg:w-100 aspect-6/7 object-cover shadow-2xl lg:absolute top-0 left-0 z-10"
            />
            {/* <div className="absolute flex gap-2 top-38 left-30"> */}
            <div className="hidden lg:flex gap-2 ml-0 mt-0 lg:ml-30 lg:mt-38 max-w-full">
              <Image
                src={image2}
                alt="A Luxury Hotel in the Heart of London"
                className="lg:w-81.5 lg:h-116.25"
              />
              <Image
                src={image3}
                alt="A Luxury Hotel in the Heart of London"
                className="lg:w-35 lg:h-98.5"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <HoverExpandCards /> */}
      <section className="bg-[#1A1A1A] px-4 lg:px-28 pt-8 lg:pt-16 pb-10 lg:pb-31.25 flex flex-col items-center">
        <h2 className="text-white text-[25px] flex flex-col tracking-[7.5px] uppercase">
          Rooms & Suite
        </h2>
        <p className="max-w-246 text-center text-white text-normal leading-8 mt-4 mb-14 normal-case">
          Carefully constructed with style and sophistication, each of our
          private lounges is designed to help you unwind, focus on work, or
          relax with your invited guests or family. The space is enriched with
          beautiful artwork, thoughtfully curated by our partners, creating an
          atmosphere of calm, comfort, and understated luxury.
        </p>
        <ExpandingCards />
      </section>
      <section className=" px-4 lg:px-28 py-10 lg:py-16 flex flex-col items-center">
        <h2 className="font-manrope text-center font-normal text-3xl leading-[100%] tracking-[1.6px]">
          Special Offers & Experiences
        </h2>
        <MainButton className="mt-10">
          Book your Stay
          <ArrowUpRight />
        </MainButton>
        {/* <Button
          variant="outline"
          className="my-10  min-w-[140px] mb-6 py-5 border-black hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-white duration-0"
        >
          <p className="text-sm">Book your Stay</p>
          <ArrowUpRight />
        </Button> */}
      </section>
      <section className="bg-white pt-10 w-full pb-22.5 px-4">
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
