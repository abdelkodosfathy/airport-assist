"use client";

import { AirportPackage } from "@/lib/types/airport";
import ServiceCard from "./ServiceCard";
import { useAirportPackageStore } from "@/store/packageStore";
import { useChauffeurDestinationStore, useSingleAirportStore } from "@/store/vipInputsStore";
import { useCarStore } from "@/store/chauffeurStore";
import { useCallback } from "react";

const PackagesSection = ({
  packagesList,
}: {
  packagesList: AirportPackage[];
}) => {
  const airportCode = useSingleAirportStore(s => s.singleAirport?.airport_code);
  const packageSlug = useAirportPackageStore(
    (state) => state.airportPackage?.package.package_slug,
  );
  const setPackage = useAirportPackageStore((state) => state.setAirportPackage);
  const resetChauffeur = useChauffeurDestinationStore(
    (s) => s.resetChauffeurDestination,
  );
  const setCar = useCarStore((s) => s.setCar);

  const handleSelect = useCallback(
    (pkg: AirportPackage) => {
      setPackage(pkg);
      resetChauffeur();
      setCar(null);
    },
    [setPackage, resetChauffeur, setCar],
  );

  const isLHR =  airportCode?.toLocaleLowerCase() === "lhr";

  console.log(packageSlug);
  
  
  return (
    <div className="flex-2 h-full">
      <div className="p-4 lg:px-10 lg:py-6 shadow-sm bg-white rounded-2xl h-full">
        <h4 className="text-normal">
          Kindly review the service descriptions below and confirm your
          selection.
        </h4>
        {packagesList.map((pkg) => (
          <ServiceCard
            isLHR={isLHR} 
            key={`package_${pkg.package.package_slug}`}
            service={pkg}
            selectedService={
              (packageSlug ?? "") ===
              pkg.package.package_slug
            }
            isCollapsed={
              (packageSlug ?? null)!== null &&
              packageSlug !== pkg.package.package_slug
            }
            onSelect={() => handleSelect(pkg)}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
