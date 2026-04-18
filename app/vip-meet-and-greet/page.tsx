"use client";

import { useEffect } from "react";
import SideInformationCard from "./side-informatio-card";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import PackagesSection from "./components/packages-section";
import Steps from "./components/steps";
import ServiceCardSkeleton from "./components/ServiceSkeletonCard";
import { useAirportStore, useSingleAirportStore } from "@/store/vipInputsStore";
import { useRouter } from "next/navigation";
export type currentPage = "packages" | "flight" | "billing" | "summry";

const Page = () => {
  const router = useRouter();
  const storedAirport = useAirportStore((state) => state.airport);
  const setSingleAirport = useSingleAirportStore(
    (state) => state.setSingleAirport,
  );

  const {
    data: airportQuery,
    isLoading,
    isError,
  } = useSingleAirport(storedAirport?.airport_id.toString() ?? "");

  const airportResponse = airportQuery?.data?.airport;
  const packagesList = airportResponse?.airport_packages; // ← مباشرة من React Query

  // الـ store بس للصفحات التانية
  useEffect(() => {
    if (airportResponse) {
      setSingleAirport(airportResponse);
    }
  }, [airportResponse]);

  useEffect(() => {
    if (!storedAirport) {
      router.replace("/");
    }
  }, [storedAirport, router]);

  if (!storedAirport) return null;
  if (isError) return <div className="p-10">Something went wrong.</div>;

  console.log(airportResponse);
  
  return (
    <>
      <p className="font-[Manrope] font-medium text-[15.53px] leading-[130%] text-[#8E8E93] mb-3">
        Choose how to travel
      </p>

      <h2 className="font-[Manrope] font-normal text-[22.6px] leading-[100%] tracking-[7.06px] uppercase mb-6">
        Services Level Available
      </h2>

      <Steps currentPage="packages" />

      <div className="flex gap-4">
        {isLoading || !packagesList ? (
          <ServiceCardSkeleton />
        ) : (
          <PackagesSection packagesList={packagesList} />
        )}

        <SideInformationCard />
      </div>
    </>
  );
};

export default Page;
