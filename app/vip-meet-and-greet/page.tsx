"use client";

import { useEffect } from "react";
import SideInformationCard from "./side-informatio-card";
import { useSingleAirport } from "@/lib/hooks/useAirports";
import { Button } from "@/components/ui/button";
import PackagesSection from "./components/packages-section";
import Steps from "./components/steps";
import ServiceCardSkeleton from "./components/ServiceSkeletonCard";
import { useAirportStore, useSingleAirportStore } from "@/store/vipInputsStore";
import Link from "next/link";
import { toast } from "sonner";
import { useAirportPackageStore } from "@/store/packageStore";
import { useRouter } from "next/navigation";
export type currentPage = "packages" | "flight" | "billing" | "summry";

const Page = () => {
  const router = useRouter();

  const airportPackage = useAirportPackageStore(
    (state) => state.airportPackage,
  );
  const storedAirport = useAirportStore((state) => state.airport);

  useEffect(() => {
    if (!storedAirport) {
      router.replace("/");
    }
  }, [storedAirport, router]);

  if (!storedAirport) return null;

  const setSingleAirport = useSingleAirportStore(
    (state) => state.setSingleAirport,
  );

  const {
    data: airportQuery,
    isLoading,
    isError,
  } = useSingleAirport(storedAirport?.airport_id.toString() ?? "");
  const airportResponse = airportQuery?.data?.airport;

  useEffect(() => {
    if (airportResponse) {
      setSingleAirport(airportResponse);
    }
  }, [airportResponse, setSingleAirport]);

  const singleAirport = useSingleAirportStore((state) => state.singleAirport);
  const packagesList = singleAirport?.airport_packages;

  // حصل خطأ في المطار
  if (isError) {
    return <div className="p-10">Something went wrong.</div>;
  }

  // validation on the packaages
  const handleContinue = (e: React.MouseEvent) => {
    if (!airportPackage) {
      toast.error("Please select a pacakgae", { position: "top-center" });
      e.preventDefault(); // يمنع الانتقال
    }
  };
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

      <div className="flex gap-4">
        <Button
          asChild
          type="button"
          variant="outline"
          onClick={handleContinue}
          className="mt-6 w-max cursor-pointer border-black text-black hover:border-[#664F31] hover:bg-[linear-gradient(179.26deg,#664F31_0.64%,#DFB08D_223.79%)] hover:text-white duration-0"
        >
          <Link href="/vip-meet-and-greet/passenger-details">
            <p className="text-lg font-normal font-[Manrope]">Continue</p>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Page;
