"use client";

import serviceImage from "@/public/arravial package.jpg";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import { AirportPackage } from "@/lib/types/airport";
import PackageCard from "./pkg-card";
import AirportForm from "./airport-form";
import { useQueryParam } from "@/lib/hooks/useParams";
import CMail from "@/components/custom icons/CMail";
import CPhone from "@/components/custom icons/CPhone";
import CWhatsapp from "@/components/custom icons/c-whatsapp";
import { useEffect } from "react";
import { useAirportStore } from "@/store/vipInputsStore";

export default function Locations() {
  // const airportId = useAirportStore((state) => state.airport?.airport_id);

  const airportId = useQueryParam("airport");
  const { data, isLoading, isError } = useSingleAirport(
    airportId?.toString() || "",
  );
  const setAirport = useAirportStore((s) => s.setAirport);
  useEffect(() => {
    if (!data?.data.airport) return;
    setAirport(data.data.airport);
  }, [data]);

  if (isLoading) {
  }

  if (isError || !data) {
  }

  return (
    <section className="my-11.25 px-8">
      <div className=" max-w-410 mx-auto px-10">
        <p className="text-[#8E8E93] font-medium">Choose how to travel</p>
        <h3 className="text-[22px] tracking-[7px] uppercase mb-7">
          Services Level Available{" "}
        </h3>
        <div className="flex gap-6">
          {(isLoading || !data) && <PackagesListSkeleton />}

          {!isLoading && data && (
            <PackagesList packages={data.data.airport.airport_packages} />
          )}

          {!isLoading && isError && (
            <p className="text-red-500">Something went wrong</p>
          )}

          <div className="flex-1 h-fit space-y-6">
            <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
              <AirportForm />
            </div>
            <div className="py-6.5 px-4 h-fit bg-white rounded-xl shadow-sm">
              <div className="">
                <h4 className="font-[Manrope] font-semibold">
                  Need more information?
                </h4>
                <p className="normal-case text-sm text-[#7a7a7a] leading-[27px]">
                  Our dedicated team are available to discuss all aspects of our
                  service.
                </p>
                <ul className="normal-case text-[#7a7a7a] space-y-2 mt-2">
                  <li className="flex gap-2 items-center">
                    <CMail />
                    <p>Contact@airport-assist.com</p>
                  </li>
                  <li className="flex gap-2 items-center">
                    {/* <Mail /> */}
                    <CPhone />

                    <p>+44 20 4517 7711</p>
                  </li>
                  <li className="flex gap-2 items-center">
                    {/* <Mail /> */}
                    <CWhatsapp />

                    <p>Contact us via WhatsApp</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PackagesList = ({ packages }: { packages: AirportPackage[] }) => {
  return (
    <div className="flex-3 space-y-6">
      {packages.map((pkg, i) => {
        const slug = pkg.package.package_slug;
        if (slug === "elite_plus" || slug === "vip") return;
        return (
          <PackageCard
            key={slug}
            pkg={pkg}
            index={i}
            serviceImage={serviceImage}
          />
        );
      })}
    </div>
  );
};

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const PackageCardSkeleton = ({ dark = false }) => {
  return (
    <div
      className={`px-8 py-5 rounded-xl shadow-sm ${
        dark ? "bg-[#1A1A1A]" : "bg-white"
      }`}
    >
      {/* Title */}
      <SkeletonBox className="h-6 w-32 mb-3" />

      {/* Subtitle */}
      <SkeletonBox className="h-4 w-40 mb-4" />

      {/* Description lines */}
      <div className="space-y-2 mb-6">
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-4/5" />
      </div>

      <div className="flex gap-24">
        {/* Image skeleton */}
        <SkeletonBox className="h-[373px] w-[166px]" />

        {/* List skeleton */}
        <div className="space-y-3 w-full">
          <SkeletonBox className="h-4 w-24 mb-3" />
          <SkeletonBox className="h-3 w-3/4" />
          <SkeletonBox className="h-3 w-2/3" />
          <SkeletonBox className="h-3 w-4/5" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};
const PackagesListSkeleton = () => {
  return (
    <div className="flex-3 space-y-6">
      <PackageCardSkeleton />
      <PackageCardSkeleton dark />
    </div>
  );
};
