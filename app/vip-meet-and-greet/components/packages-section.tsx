"use client";

import { AirportPackage } from "@/lib/types/airport";
import ServiceCard from "./ServiceCard";

const PackagesSection = ({
  packagesList,
  AirportCost,
  adults_count,
  child_count,
  selectedPackageSlug,
  onSelectPackage,

  // onUpdate,
}: {
  onSelectPackage: (slug: string, packageCost: number, name: string) => void;
  packagesList: AirportPackage[];
  selectedPackageSlug: string;
  adults_count: number;
  AirportCost: number;
  child_count: number;

  // onUpdate: (path: string, value: any) => void;
}) => {
  // const [selectedPackageSlug ,setSelectedPackageSlug] = useState<string>();
  function handleSelectedPackage(slug: string, packageCost: number, name: string) {
    onSelectPackage(slug, packageCost, name);
  }
  return (
    <div className="flex-2 h-full">
      <div
        className="px-10 shadow-md py-6 bg-white rounded-2xl h-full"
      >
        <h4 className="text-normal">
          Kindly review the service descriptions below and confirm your
          selection.
        </h4>

        {packagesList?.map((pkg) => (
          <ServiceCard
            selectedService={selectedPackageSlug === pkg.package.package_slug}
            adults_count={adults_count}
            child_count={child_count}
            AirportCost={AirportCost}
            key={`package_${pkg.package.package_slug}`}
            service={pkg}
            onSelect={handleSelectedPackage}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesSection;
