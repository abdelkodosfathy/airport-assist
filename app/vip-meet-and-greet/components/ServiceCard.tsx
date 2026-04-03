"use client";

import saloon from "@/public/sections/saloon.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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

interface ServiceCardProps {
  service: AirportPackage;
  selectedService?: boolean;
  // AirportCost: number;
  onSelect: () => void; // pass the value on selection
}

export default function ServiceCard({
  service,
  selectedService,
  onSelect,
}: ServiceCardProps) {
  // const currencyMark = useCurrencyStore((s) => s.currencyMark);
  const currency = useCurrencyStore((s) => s.currency);

  const airport = useAirportStore((s) => s.airport);
  const serviceType = useServiceStore((s) => s.serviceType);
  const [showMore, setShowMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Animate on showMore toggle
  useEffect(() => {
    if (!detailsRef.current) return;

    if (showMore) {
      // Expand section
      gsap.to(detailsRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      // Collapse section
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [showMore]);

  const prices = {
    adult_cost: service.adult_cost,
  };

  const packageCost = prices.adult_cost;

  // const featuresList =
  //   packageFeatures[service.package.package_slug][serviceType as ServiceType]; // remove (element.whereAvailable === true) if the isFastTrackActive === false || 0
  const isFastTrackActive = airport?.is_fast_track_active;
  const isGolfCartActive = airport?.is_golf_cart_active;

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
  return (
    <div className="*:font-[Manrope] mt-8 rounded-xl p-3 bg-[#F4F4F4] border border-[#E0E0E0]">
      {/* Top Section */}
      <div className="flex gap-4">
        <div className="p-2 flex-2 flex flex-col">
          <div className="flex justify-between items-center">
            <div
              onClick={onSelect}
              className="cursor-pointer flex gap-2 items-center"
            >
              <Radio selected={selectedService} />
              <div>
                <p className="font-semibold">{service.package.package_name}</p>
                <p className="text-[#7B5A41] text-sm">
                  {/* {service.package.package_description} */}
                  {fixedPackageData.subTitle}
                </p>
              </div>
            </div>
            <div className="min-w-max py-1 px-2 h-fit rounded-md font-semibold text-lg bg-[#7B5A411F] text-[#7B5A41]">
              {/* {currencyMark} */}
              <p>
                <span className="text-xs">{currency} </span>
                {formatedCost}
              </p>
            </div>
          </div>
          <span className="my-2 h-px bg-[#CFCFCF] w-full" />
          <p className="text-sm text-[#7A7A7A]">
            {fixedPackageService.description}
          </p>
        </div>
        <div className="flex-1">
          <Image
            src={saloon}
            className="rounded-lg w-full"
            width={249.25}
            height={139.81}
            alt=""
          />
        </div>
      </div>

      {/* Hidable Section */}
      <div
        ref={detailsRef}
        className="mt-6 mb-4 grid grid-cols-2 gap-4 overflow-hidden"
        style={{ height: 0, opacity: 0 }}
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

      {/* Toggle Button */}
      <Button
        variant={showMore ? "outline" : "default"} // outline when open
        style={
          showMore
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
          showMore ? "border-black text-black" : "border-[#966B4B] text-white"
        }`}
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Hide info" : "Show More >"}
      </Button>
    </div>
  );
}

interface RadioProps {
  selected?: boolean;
}

function Radio({ selected }: RadioProps) {
  return (
    <div
      className={`min-w-6 min-h-6 rounded-full border-2 flex items-center justify-center border-[#7A7A7A] cursor-pointer`}
    >
      {selected && <span className="w-4 h-4 rounded-full bg-[#7A7A7A]"></span>}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
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
};
