"use client";

import saloon from "@/public/sections/saloon.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { AirportPackage } from "@/lib/types/airport";
import { useCurrencyStore } from "@/store/currencyStore";
import {
  ServiceType,
  useAirportStore,
  useServiceStore,
} from "@/store/vipInputsStore";
import { packageFeatures } from "@/lib/fixed-features";
import { formatNumber } from "@/lib/formatNumbers";
import Link from "next/link";
import InnerToast from "@/components/ui/InnerToast";

const alertMessages = {
  arrival:
    "International arrival gate services are not available at this airport. For international arrivals, our team will meet you outside immigration or customs in the arrivals hall.  ",
  arrivalOrDeparture:
    "Guests must be 21+ to use the salon. Main terminal check-in requirements: Condor (not required), Iberia (required), Korean Air (not required). Reservations are not accepted for Advanced Air, Air Premia, Air Transat, Allegiant, Asiana, French Bee, Hainan Airlines, Horizon, Level Airlines, Norse, Norwegian Air Shuttle, Norwegian Air UK, Sichuan Airlines, Sun Country, and Viva Aerobus.",
  departure:
    "Main terminal check-in requirements: Condor (not required), Iberia (required), Korean Air (not required). Reservations are not accepted for Advanced Air, Air Premia, Air Transat, Allegiant, Asiana, China Southern, French Bee, Hainan Airlines, Horizon, Level Airlines, Norse, Norwegian Air Shuttle, Norwegian Air UK, Sichuan Airlines, Sun Country, Viva Aerobus, Air Canada, American Airlines, Etihad Airways, Ethiopian Airlines, Frontier Airlines, LATAM, Scandinavian Airlines, Southwest, Spirit Airlines, and WestJet.",
};

interface ServiceCardProps {
  service: AirportPackage;
  selectedService?: boolean;
  isCollapsed?: boolean;
  isLHR?: boolean;
  onSelect: () => void;
}

export default memo(function ServiceCard({
  service,
  selectedService,
  isCollapsed,
  isLHR = false,
  onSelect,
}: ServiceCardProps) {
  const currency = useCurrencyStore((s) => s.currency);
  const serviceType = useServiceStore((s) => s.serviceType);
  const [showMore, setShowMore] = useState(false);

  const detailsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLSpanElement>(null);
  // const btnRef = useRef<HTMLButtonElement>(null); // if Button forwards ref, else wrap in div
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  const expandFeatures = showMore || (selectedService && !isCollapsed);

  // ── Show More toggle ──────────────────────────────────────────────
  useEffect(() => {
    if (!detailsRef.current) return;
    if (expandFeatures) {
      gsap.to(detailsRef.current, {
        height: "auto",
        opacity: 1,
        marginTop: "1.5rem", // mt-6
        marginBottom: "1rem", // mb-4
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [expandFeatures, showMore]);

  // ── Collapse / Expand ─────────────────────────────────────────────
  useEffect(() => {
    // skip animation on first mount
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (isCollapsed) {
        // set initial collapsed state instantly (no animation)
        if (imageWrapperRef.current)
          gsap.set(imageWrapperRef.current, {
            width: 0,
            opacity: 0,
            marginLeft: 0,
          });
        if (descRef.current)
          gsap.set(descRef.current, { height: 0, opacity: 0 });
        if (dividerRef.current)
          gsap.set(dividerRef.current, {
            height: 0,
            opacity: 0,
            marginTop: 0,
            marginBottom: 0,
          });
        if (btnWrapRef.current)
          gsap.set(btnWrapRef.current, { height: 0, opacity: 0, marginTop: 0 });
        if (priceRef.current) gsap.set(priceRef.current, { x: 0 }); // no offset needed, layout handles it
      }
      return;
    }

    if (isCollapsed) {
      // collapse: image shrinks → price floats right naturally
      gsap.to(imageWrapperRef.current, {
        width: 0,
        opacity: 0,
        marginLeft: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(descRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(dividerRef.current, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(btnWrapRef.current, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      // also collapse features if open
      // if (showMore && detailsRef.current) {
      //   gsap.to(detailsRef.current, { height: 0, opacity: 0, duration: 0.3 });
      // }
      if (showMore && detailsRef.current) {
        gsap.to(detailsRef.current, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          marginBottom: 0,
          duration: 0.3,
        });
      }
    } else {
      // expand
      gsap.to(imageWrapperRef.current, {
        width: "auto",
        opacity: 1,
        marginLeft: "1rem", // gap-4 equivalent
        duration: 0.45,
        ease: "power2.out",
      });
      gsap.to(descRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dividerRef.current, {
        height: 1,
        opacity: 1,
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(btnWrapRef.current, {
        height: "auto",
        opacity: 1,
        marginTop: "0.5rem",
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [isCollapsed]);

  const packageCost = isLHR ? service.adult_cost + service.connection_fees : service.adult_cost ;
  // const packageCost =  service.adult_cost + service.connection_fees;

  const isFastTrackActive = useAirportStore((s) => s.airport?.is_fast_track_active);
  const isGolfCartActive = useAirportStore((s) => s.airport?.is_golf_cart_active);

  const fixedPackageData = packageFeatures[service.package.package_slug];
  const fixedPackageService =
    packageFeatures[service.package.package_slug][serviceType as ServiceType];
  const featuresList = fixedPackageService.features.filter((f) => {
    const name = f.icon.displayName ?? f.icon.name;
    if (name.includes("FastTrack") && !isFastTrackActive) return false;
    if (name.includes("GolfCart") && !isGolfCartActive) return false;
    return true;
  });
  const formatedCost = formatNumber(Math.ceil(packageCost));

  // for yellow alert box
  const airportISO2 = useAirportStore((s) => s.airport?.city.iso2);
  const airportCode = useAirportStore((s) => s.airport?.airport_code);
  const isUSA = airportISO2?.toLocaleLowerCase() === "us";
  const isBOSorDFW =
    airportCode === "BOS" || airportCode === "DFW";

  const getAlertMessage = () => {
    const slug = service.package.package_slug;
    const isArrival = serviceType === "arrival" || "connection";
    const isDeparture = serviceType === "departure" || "connection";
    switch (slug) {
      case "elite":
      case "elite_plus":
        // not in BOS, DFW
        if (isUSA && !isBOSorDFW && isArrival) {
          return alertMessages["arrival"];
        }
        break;

      case "signature":
        //  in all USA's airportts
        if (isUSA && isDeparture) {
          return alertMessages["departure"];
        }
        break;

      case "vip":
        // in all USA's airprots
        if (
          isUSA 
          // &&  (isArrival || isDeparture)
        ) {
          return alertMessages["arrivalOrDeparture"];
        }
        break;
    }
  };

  const alertMessage = getAlertMessage() || null;

  return (
    <div className="*:font-[Manrope] mt-8 rounded-xl p-3 bg-[#F4F4F4] border border-[#E0E0E0]">
      {/* ── Top Row: always visible ── */}
      <div className="flex">
        {/* Left: radio + name + subtitle + divider + desc */}
        <div className="flex-2 flex flex-col px-2 min-w-0">
          {/* Header row inside left col */}
          <div className="flex justify-between items-center">
            {/* Radio + name */}
            <div
              onClick={onSelect}
              className="cursor-pointer flex gap-2 items-center"
            >
              <Radio selected={selectedService} />
              <div>
                <p className="font-semibold uppercase">
                  {service.package.package_name}
                </p>
                <p className="text-[#7B5A41] text-sm">
                  {fixedPackageData.subTitle}
                </p>
              </div>
            </div>

            {/* Price — stays in this flex row, floats right when image gone */}
            <div
              ref={priceRef}
              className="min-w-max py-1 px-2 h-fit rounded-md font-semibold text-lg bg-[#7B5A411F] text-[#7B5A41]"
            >
              <p>
                <span className="text-xs">{currency} </span>
                {formatedCost}
              </p>
            </div>
          </div>

          {/* Divider */}
          <span
            ref={dividerRef}
            className="my-2 bg-[#CFCFCF] w-full block"
            style={{ height: 1 }}
          />

          {/* Description */}
          <div ref={descRef} className="overflow-hidden">
            <p className="text-sm text-[#7A7A7A]">
              {fixedPackageService.description}
            </p>
          </div>
        </div>

        {/* Right: image — width animates to 0 */}
        <div
          ref={imageWrapperRef}
          className="flex-none overflow-hidden"
          style={{ width: "auto", marginLeft: "1rem" }}
        >
          <Image
            src={fixedPackageData.image}
            className="rounded-lg"
            width={249.25}
            height={139.81}
            alt=""
            style={{ display: "block" }}
          />
        </div>
      </div>

      {/* ── Features (show more) ── */}
      <div
        ref={detailsRef}
        className="grid grid-cols-2 gap-4 overflow-hidden"
        style={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
      >
        {serviceType &&
          packageFeatures &&
          featuresList.map((f, i) => (
            <FeatureCard
              key={`${i}-${f.title}-${service.package.package_slug}`}
              title={f.title}
              icon={f.icon}
              description={f.description}
            />
          ))}
      </div>
      {alertMessage && selectedService && (
        <div className="mt-2">
          <InnerToast text={alertMessage} />
        </div>
      )}
      {/* ── Toggle Button ── */}
      <div ref={btnWrapRef} className="overflow-hidden">
        {!selectedService ? (
          <Button
            variant={expandFeatures ? "outline" : "default"}
            style={
              expandFeatures
                ? {
                    border: "1px solid #000",
                    color: "#000",
                    background: "transparent",
                  }
                : {
                    background:
                      "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
                    border: "1.26px solid #966B4B",
                  }
            }
            className={`cursor-pointer h-7 font-[Manrope] font-normal py-0 rounded-full mt-2 ${
              expandFeatures
                ? "border-black text-black"
                : "border-[#966B4B] text-white"
            }`}
            onClick={() => setShowMore((prev) => !prev)}
          >
            {expandFeatures ? "Hide info" : "Show More >"}
          </Button>
        ) : (
          <Button
            asChild
            type="button"
            variant="outline"
            className="w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
          >
            <Link href="/vip-meet-and-greet/passenger-details">
              <p className="text-lg font-normal font-[Manrope]">Continue</p>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
})

// ── Radio ──────────────────────────────────────────────────────────
interface RadioProps {
  selected?: boolean;
}
function Radio({ selected }: RadioProps) {
  return (
    <div className="min-w-6 min-h-6 rounded-full border-2 flex items-center justify-center border-[#7A7A7A] cursor-pointer">
      {selected && <span className="w-4 h-4 rounded-full bg-[#7A7A7A]" />}
    </div>
  );
}

// ── FeatureCard ────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}
const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="flex gap-2.5">
    <div className="bg-black w-12 h-12 rounded-lg grid place-content-center">
      <Icon />
    </div>
    <div className="space-y-1">
      <p className="tracking-0 font-[Manrope] font-bold">{title}</p>
      <p className="text-sm text-[#7A7A7A]">{description}</p>
    </div>
  </div>
);
