import Image from "next/image";
import hero from "@/public/bg.jpg";
import { Button } from "@/components/ui/button";
import LanguageSelect from "@/components/ui/LanguageSelector";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HoverExpandCards from "@/components/carusol/HoverExpandCards";
import AirportInvitation from "@/components/EnteringSection";
import HeroContent from "@/components/HeroContent";
import PopularDestinations from "@/components/PopularDestinations";
import PrivateSuites from "@/components/PrivateSuits";
import ChoosePackages from "@/components/ChoosePackages";
import { Card } from "@/components/ui/card";
import ServicesList from "@/components/ServicesList";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-screen w-full text-white">
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
                // "linear-gradient(14.45deg, rgba(0, 0, 0, 0) -17.37%, rgba(16, 7, 1, 0.78) 21.48%)",
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        {/* Header */}
        <header className="w-full py-6 px-28 flex items-center relative">
          {/* Left: Logo */}
          <div className="shrink-0">
            <Image
              src="/logo.png"
              alt="Airport Assist"
              width={223}
              height={108}
              className="h-auto"
            />
          </div>

          {/* Center: Nav */}
          <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-10 text-lg">
            <Link
              href={"/services"}
              className="text-[24px] font-normal text-white hover:text-gray-300 transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href={"/locations"}
              className="text-[24px] font-normal text-white hover:text-gray-300 transition-colors duration-300"
            >
              Locations
            </Link>
          </nav>

          {/* Right: Language + Login + Contact */}
          <div className="ml-auto flex items-center gap-4 text-lg">
            <LanguageSelect />
            <span className="inline-block w-0.75 h-12 rounded-3xl  bg-linear-to-b from-white to-white/10"></span>

            <Button
              variant="ghost"
              className="text-2xl font-light hover:bg-transparent hover:text-white cursor-pointer"
            >
              Login
            </Button>
            <Button className="h-16 backdrop-blur-md hover:backdrop-blur-2xl transform duration-300 cursor-pointer bg-white/10 border-2 border-white/20 px-8 py-4 rounded-3xl font-light text-xl leading-8 tracking-[0px] hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </header>

        {/* Hero section */}

        <HeroContent />
      </section>
      <section className="min-h-118.75 px-28 flex items-center gap-10">
        {/* Left Text */}
        <div className="flex-2">
          <h1 className="flex flex-wrap font-[Manrope] font-semibold text-[40px] leading-[128%] tracking-[10px] uppercase">
            <span>Airport Concierge</span>
            <span>Luxurious & tailored For you.</span>
          </h1>
        </div>

        {/* Right Text */}
        <div className="flex-1 h-full">
          <p className="font-[Manrope] font-normal max-w-140 text-[25px] leading-[1.6] tracking-[2.25px] text-[#959595] max-w-md:">
            AIRPORT Assists Private Travel Division provides discreet, luxury
            concierge travel for VIP clients worldwide.
          </p>
          <Button
            variant="outline"
            className="mt-8 h-15 w-45 rounded-xl border-black text-[20px] flex items-center justify-center gap-2"
          >
            <p>About Us</p>
            <ArrowUpRight className="size-md" />
          </Button>
        </div>
      </section>
      <section>
        <div className="max-w-screen h-200 flex items-center bg-neutral-900 py-8">
          <HoverExpandCards />
        </div>
      </section>
      <section className="pb-15">
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
        <Button variant="outline" className="border-black mx-auto my-10 py-6 px-6 rounded-xl">
          <p className="text-xl">
          Read more 
          </p>
          <ArrowUpRight/>
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

          <ServicesList/>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
