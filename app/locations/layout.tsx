"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import hero from "@/public/our-sercives-hero.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAirports, useSingleAirport } from "@/lib/hooks/useAirports";

type Props = { children: ReactNode };

const HeroContent = () => {
  const pathname = usePathname();
  const isAirportPage = pathname.startsWith("/locations/airport");
  const searchParams = useSearchParams();
  const airport_id = searchParams.get("airport");
  const { data, isLoading, error } = useSingleAirport(airport_id ?? "");
  const airport = data?.data.airport;
  const airportName =
    airport?.airport_name?.replace(/airport/gi, "").trim() || "Loading...";

  return (
    // <div className="relative z-10 w-full max-w-410 px-10 mx-auto">
    <div className="relative z-10 w-full max-w-410 mx-auto px-0 sm:px-4 lg:px-10">
      {isAirportPage ? (
        <>
          {/* <h1 className="font-[Manrope] text-[45px] leading-[130%] tracking-[3px] text-start mb-4.25"> */}
          <h1
            className="
              font-[Manrope]
              text-xl
              sm:text-4xl
              lg:text-5xl
              xl:text-6xl
              leading-[120%]
              tracking-[2px]
              lg:tracking-[3px]
              mb-4
            "
          >
            {airportName}
          </h1>
          {/* <p className="font-[Manrope] font-normal w-130 text-start text-[14.25px] tracking-[1.5px] text-[rgb(200,200,200)]"> */}
          <p
            className="font-[Manrope] font-normal     max-w-xl
          text-start
    text-sm
    sm:text-base
    leading-7
    text-[rgb(200,200,200)]
     tracking-[1.5px] text-[rgb(200,200,200)]"
          >
            We enhance every stage of your journey, from arrival and departure
            to connecting flights, with professional VIP assistance—available to
            all passengers, across all airlines and travel classes.
          </p>
          <div className="absolute -right-20 text-[160px] -translate-1/2 top-1/2 opacity-15">
            {airport?.airport_code}
          </div>
        </>
      ) : (
        <>
          <h1 className="font-[Manrope] text-xl lg:text-[30px] leading-[130%] tracking-[3px] text-center mb-4.25">
            Premium Airport Meet & Greet Services
          </h1>
          <p className="font-[Manrope] font-normal text-lg lg:text-[25px] text-center text-[rgb(200,200,200)]">
            Available in the following locations.
          </p>
          <div className="relative mx-auto lg:w-[820px] xl:w-[960px] px-4">
            <AirportSearchInput />
          </div>
        </>
      )}
    </div>
  );
};

// ← الـ layout الرئيسي
const layout = ({ children }: Props) => {
  return (
    <main className="relative font-[Manrope] max-w-screen overflow-hidden bg-[#F7F7F6]">
      <Header />

      <section
        className="relative 
      
      relative
            after:content-['']
            after:absolute
            after:inset-x-0
            after:bottom-0
            after:h-60
            after:pointer-events-none
            after:bg-[repeating-linear-gradient(to_right,rgba(255,255,255,.15)_0_1px,transparent_1px_60px)]
            after:[mask-image:linear-gradient(to_top,white,transparent)]
      
      w-full min-h-[420px] sm:min-h-[520px] lg:h-[620px] xl:h-[700px] px-5 sm:px-8 lg:px-10 text-white flex items-center"
      >
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
          <HeroContent />
        </Suspense>

        {/* <div className="w-screen absolute bottom-0 flex justify-between">
          {Array.from({ length: 30 }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-1 h-60 bg-linear-to-t from-white/50 to-transparent opacity-20"
              ></div>
            );
          })}
        </div> */}
        
      </section>

      {children}
      <Footer />
    </main>
  );
};

export default layout;

import { useState } from "react";
import { Plane, Loader2 } from "lucide-react";

type Airport = {
  airport_id?: number;
  airport_name: string;
  airport_code?: string;
  city?: {
    city_name?: string;
    country_name?: string;
  };
};

type AirportProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMsg?: string;
  className?: string;

  onSelect?: (airport: Airport) => void;
};

function AirportSearchInput({
  label,
  placeholder = "Search airport…",
  disabled,
  errorMsg,
  className,
}: AirportProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Airport | null>(null);

  const { data, isFetching } = useAirports(query);
  const airports: Airport[] = data?.data?.airports ?? [];

  const displayValue = selected?.airport_name ?? query;

  const handleSelect = (airport: Airport) => {
    setSelected(airport);
    setQuery(airport.airport_name);
    setOpen(false);
    router.push(
      `/locations/airport?airport=${airport.airport_id}&name=${encodeURIComponent(airport.airport_name)}`,
    );
  };
  return (
    <div
      className={` col-span-1 sm:col-span-2 lg:col-span-6 ${
        errorMsg && !selected ? "ring-2 ring-red-500" : ""
      }`}
    >
      <div className={` flex flex-col gap-1.5 ${className ?? ""}`}>
        {/* Label */}
        {label && (
          <label className="text-xs font-medium text-[#ACACAC] uppercase">
            {label}
          </label>
        )}

        <div className="relative ">
          {/* Input */}
          <div className="flex items-center h-11 rounded-lg bg-white">
            <span className="pl-3 pr-2">
              <Plane size={15} className="text-[#ACACAC]" />
            </span>

            <input
              value={displayValue}
              disabled={disabled}
              placeholder={placeholder}
              onFocus={() => setOpen(true)}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-black text-sm outline-none placeholder:text-[#ACACAC]"
            />

            {isFetching && <Loader2 size={14} className="animate-spin mr-3" />}
          </div>

          {/* Dropdown */}
          {open && airports.length > 0 && (
            <ul
              data-lenis-prevent
              className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-[280px] overflow-auto"
            >
              {airports.map((airport, i) => (
                <li key={airport.airport_id ?? i}>
                  <button
                    type="button"
                    onClick={() => handleSelect(airport)}
                    className="w-full text-left flex gap-2 items-center cursor-pointer px-3 py-2 hover:bg-gray-100"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-md bg-[#1A1A1A] text-white flex items-center justify-center">
                      <Plane size={12} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {airport.airport_name}
                      </p>

                      {airport.city && (
                        <p className="text-xs text-gray-400">
                          {[airport.city.city_name, airport.city.country_name]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Empty */}
          {open && query && !isFetching && airports.length === 0 && (
            <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl p-4 text-center text-sm text-gray-400">
              No airports found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
