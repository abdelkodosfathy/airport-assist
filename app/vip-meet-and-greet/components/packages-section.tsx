"use client";

import { AirportPackage } from "@/lib/types/airport";
import ServiceCard from "./ServiceCard";
import { useAirportPackageStore } from "@/store/packageStore";
import { useChauffeurDestinationStore } from "@/store/vipInputsStore";
import { useCarStore } from "@/store/chauffeurStore";

const PackagesSection = ({
  packagesList,
}: {
  packagesList: AirportPackage[];
}) => {
  
  const airportPackage = useAirportPackageStore((state) => state.airportPackage);
  const setPackage = useAirportPackageStore((state) => state.setAirportPackage);
  const resetChauffeur = useChauffeurDestinationStore(s => s.resetChauffeurDestination);
  const setCar = useCarStore(s => s.setCar);
  return (
    <div className="flex-2 h-full">
      <div className="px-10 shadow-md py-6 bg-white rounded-2xl h-full">
        <h4 className="text-normal">
          Kindly review the service descriptions below and confirm your
          selection.
        </h4>

        {packagesList.map((pkg, i) => (
          <ServiceCard
            selectedService={
              (airportPackage?.package.package_slug ?? "s") === pkg.package.package_slug
            }
            key={`package_${pkg.package.package_slug}`}
            service={pkg}
            onSelect={() => {
              setPackage(pkg);
              resetChauffeur();
              setCar(null);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
