import Image from "next/image";
import hero from "@/public/bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import HoverExpandCards from "@/components/carusol/HoverExpandCards";
import AirportInvitation from "@/components/EnteringSection";
import HeroContent from "@/components/HeroContent";
import PopularDestinations from "@/components/PopularDestinations";
import PrivateSuites from "@/components/PrivateSuits";
import ChoosePackages from "@/components/ChoosePackages";
import ServicesList from "@/components/ServicesList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="relative min-h-screen w-full text-white flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={hero} // ضع الصورة هنا
            alt="background"
            fill
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>
        {/* Hero section */}
        <HeroContent />
      </section>
      <section className="min-h-118.75 px-28 flex items-center">
        <div className="max-w-360 mx-auto flex items-center gap-10">
          {/* Left Text */}
          <div className="flex-2">
            <h2 className="uppercase tracking-[0.3em] leading-[150%] text-[2.5rem] whitespace-normal justify-start">
              Airport Concierge Luxurious & tailored For you.
            </h2>
          </div>

          {/* Right Text */}
          <div className="flex-1 h-full">
            <p className="font-[Manrope] font-normal max-w-140 text-[1rem] leading-[150%] text-[#959595] max-w-md:">
              AIRPORT Assists Private Travel Division provides discreet, luxury
              concierge travel for VIP clients worldwide.
            </p>
            <Button
              variant="outline"
              className="hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none hover:mb-10.5  border-black mx-auto my-10 py-6 px-6 rounded-xl duration-0 "
            >
              <p>About Us</p>
              <ArrowUpRight className="size-md" />
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-neutral-900">
        <div className="max-w-360 mx-auto h-200 flex items-center py-8">
          <HoverExpandCards />
        </div>
      </section>
      <section className="pb-6">
        <AirportInvitation
          heading="Airport by Invitation"
          content="It is our most exclusive service, delivering the highest level of luxury airport assistance in over 100 destinations worldwide"
          imgOne="/sections/img1.jpg"
          imgTwo="/sections/img2.jpg"
        />
        <AirportInvitation
          heading="Premium Airport Concierge"
          content="With Airport Assist, travel effortlessly with personalised Meet & Greet, Fast-Track Security & Immigration, and seamless support from curbside to gate"
          imgOne="/sections/img3.jpg"
          imgTwo="/sections/img4.jpg"
          left
        />
      </section>

      <ChoosePackages />
      <PopularDestinations />
      <PrivateSuites />
      <section className="min-h-screen px-28 py-16 flex flex-col items-center">
        <h2 className="font-manrope text-center font-normal text-[56px] leading-[100%] tracking-[10px] uppercase">
          Discover exclusive content
        </h2>
        <p className="font-manrope mx-auto w-[776px] pt-6 text-[rgb(122,122,122)] font-normal text-[28px] leading-[150%] tracking-[0.1em] text-center">
          Receive insider tips on VIP airport services, fast-track travel
          advice, and exclusive updates.
        </p>
        <Button
          variant="outline"
          className="hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white hover:border-none hover:mb-10.5  border-black mx-auto my-10 py-6 px-6 rounded-xl duration-0 "
        >
          <p className="text-xl">Read more</p>
          <ArrowUpRight />
        </Button>
        <div className="gap-4 w-full flex">
          {/* Card 1 */}
          <div className="flex-1">
            <div className="overflow-hidden rounded-lg aspect-square group">
              <img
                src="/sections/river.jpg"
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-manrope font-extrabold text-[22px] tracking-[0.27em]">
                VIP Fast Track at Heathrow
              </h3>
              <p className="text-[rgb(100,96,125)] font-manrope font-medium text-[22px] leading-[168%] tracking-[-0.02em]">
                Experience Ultimate Luxury and Convenience with VIP Services at
                London Heathrow Airport
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1">
            <div className="overflow-hidden rounded-lg aspect-square group">
              <img
                src="/sections/river.jpg"
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-manrope font-extrabold text-[22px] tracking-[0.27em]">
                VIP Fast Track at Charles de Gaulle Airport
              </h3>
              <p className="text-[rgb(100,96,125)] font-manrope font-medium text-[22.9px] leading-[168%] tracking-[-0.02em]">
                Avoid long waits at security and immigration with Airport
                Assist’s CDG Fast Track
              </p>
            </div>
          </div>

          <ServicesList />
        </div>
      </section>

      <Footer />
    </main>
  );
}
