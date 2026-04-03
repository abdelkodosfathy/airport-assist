"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import AirportSearchInput from "@/components/AirportSearchInput";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useSingleAirport } from "@/lib/hooks/useAirports";

type Props = { children: ReactNode };
// ... باقي imports

// ← component منفصل للـ hero content
const HeroContent = ({ onSelect }: { onSelect: (a: any) => void }) => {
  const pathname = usePathname();
  const isAirportPage = pathname.startsWith("/locations/airport");
  const searchParams = useSearchParams();
  // const airportName = searchParams.get("airport");
  const airport_id = searchParams.get("airport");
  const { data, isLoading, error } = useSingleAirport(airport_id ?? "");
  const airport = data?.data.airport;

  return (
    <div className="relative z-10">
      {isAirportPage ? (
        <>
          <h1 className="font-[Manrope] text-[30px] leading-[130%] tracking-[3px] text-center mb-4.25">
            {airport?.airport_name || "Loading..."}
          </h1>
          <p className="font-[Manrope] font-normal w-250 mx-auto text-[14.25px] tracking-[1.5px] text-center text-[rgb(200,200,200)]">
            We enhance every stage of your journey, from arrival and departure
            to connecting flights, with professional VIP assistance—available to
            all passengers, across all airlines and travel classes.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-[Manrope] text-[30px] leading-[130%] tracking-[3px] text-center mb-4.25">
            Premium Airport Meet & Greet Services
          </h1>
          <p className="font-[Manrope] font-normal text-[24px] text-center text-[rgb(200,200,200)]">
            Available in the following locations.
          </p>
          <div className="relative lg:w-[820px] xl:w-[960px] px-4">
            <AirportSearchInput
              onSelect={onSelect}
              className="w-full bg-white text-black rounded-md mt-4 relative flex items-center"
            />
          </div>
        </>
      )}
    </div>
  );
};

// ← الـ layout الرئيسي
const layout = ({ children }: Props) => {
  const router = useRouter();

  const handleSelect = (a: any) => {
    router.push(
      `/locations/airport?airport=${a.airport_id}&name=${encodeURIComponent(a.airport_name)}`,
    );
  };

  return (
    <main className="relative font-[Manrope] max-w-screen overflow-hidden bg-[#F7F7F6]">
      <Header />

      <section className="relative w-full h-114 text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="background"
            fill
            className="object-cover object-[50%_20%] w-full h-full"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(14.45deg, rgba(2, 2, 2, 0.0546) -17.37%, rgba(11, 11, 11, 0.78) 21.48%)",
            }}
          />
        </div>

        {/* ← لف الـ component بـ Suspense */}
        <Suspense
          fallback={<div className="relative z-10 text-white">Loading...</div>}
        >
          <HeroContent onSelect={handleSelect} />
        </Suspense>
      </section>

      {children}
      <Footer />
    </main>
  );
};

export default layout;
